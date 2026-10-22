"""Turn an image into colored ASCII art for the fastfetch hero.

Usage: python3 scripts/ascii-art.py <image> [cols] [--light] [--ansi] > src/data/hero-art.json

--light renders for a white page: near-white areas stay blank (the paper is the light)
and every color is pulled darker and more saturated so it reads as ink on white.

--ansi draws with half blocks like chafa does: every cell is two pixels, the top one in
the text color and the bottom one in the background, so it doubles vertical detail.

--palette prints the image's 8 representative colors (dark to light) instead,
for the color blocks under the fastfetch info: > src/data/hero-palette.json

Output: JSON list of rows; each row is a list of runs, [color, text] for ASCII
and [fg, bg, text] for ANSI (an empty color means none).
"""
import colorsys
import json
import sys

from PIL import Image, ImageEnhance

# dense glyphs only: on a dark page the color draws the picture, thin glyphs would hide it
RAMP = "=+*#%@"
CELL = 0.6  # mono glyph width / line height, so the art keeps the image's aspect
# white page: darker pixels get denser glyphs; only near-white goes blank
LIGHT_RAMP = "@@%%##**++=- "
INK_MAX_L = 0.48  # cap on HLS lightness so every glyph keeps contrast against white
# ANSI on white: solid blocks need far less darkening than thin glyphs
ANSI_LIGHT_MAX_L = 0.74
PAPER_L = 0.9  # pixels this light are left transparent so the page shows through


def ink(r, g, b):
    h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
    r, g, b = colorsys.hls_to_rgb(h, min(l, INK_MAX_L), min(1, s * 1.25))
    return r * 255, g * 255, b * 255


def hex4(r, g, b):
    # 4-bit channels keep the payload small and let neighbours merge into one run
    return f"#{int(r) >> 4:x}{int(g) >> 4:x}{int(b) >> 4:x}"


def ansi(im, cols, light):
    rows = round(cols * im.height / im.width * CELL)
    im = im.resize((cols, rows * 2), Image.LANCZOS)

    def pixel(x, y):
        r, g, b = im.getpixel((x, y))
        h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
        if not light:
            return hex4(r, g, b)
        if l > PAPER_L:
            return ""
        r, g, b = colorsys.hls_to_rgb(h, min(l, ANSI_LIGHT_MAX_L), min(1, s * 1.1))
        return hex4(r * 255, g * 255, b * 255)

    out = []
    for y in range(rows):
        runs = []
        for x in range(cols):
            top, bottom = pixel(x, 2 * y), pixel(x, 2 * y + 1)
            if top and bottom:
                cell = [top, bottom, "▀"]
            elif top:
                cell = [top, "", "▀"]
            elif bottom:
                cell = [bottom, "", "▄"]
            else:
                cell = ["", "", " "]
            if runs and runs[-1][:2] == cell[:2]:
                runs[-1][2] += cell[2]
            else:
                runs.append(cell)
        out.append(runs)
    return out


def main():
    flags = {"--light", "--ansi", "--palette"}
    args = [a for a in sys.argv[1:] if a not in flags]
    light = "--light" in sys.argv
    path = args[0]
    cols = int(args[1]) if len(args) > 1 else 110
    ramp = LIGHT_RAMP if light else RAMP

    im = Image.open(path).convert("RGB")
    im = ImageEnhance.Color(im).enhance(1.35)
    im = ImageEnhance.Contrast(im).enhance(1.15)
    if "--palette" in sys.argv:
        # median cut alone is swamped by the sky; k-means passes pull in the greens and the purple
        pal = im.resize((cols, cols)).quantize(8, method=Image.Quantize.MEDIANCUT, kmeans=8).getpalette()[:24]
        colors = sorted(zip(pal[::3], pal[1::3], pal[2::3]), key=lambda c: 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2])
        json.dump([f"#{r:02x}{g:02x}{b:02x}" for r, g, b in colors], sys.stdout)
        return
    if "--ansi" in sys.argv:
        json.dump(ansi(im, cols, light), sys.stdout, separators=(",", ":"), ensure_ascii=False)
        return
    rows = round(cols * im.height / im.width * CELL)
    im = im.resize((cols, rows), Image.LANCZOS)
    gray = im.convert("L")

    out = []
    for y in range(rows):
        runs = []
        for x in range(cols):
            r, g, b = im.getpixel((x, y))
            char = ramp[min(len(ramp) - 1, gray.getpixel((x, y)) * len(ramp) // 256)]
            if light:
                r, g, b = ink(r, g, b)
            color = hex4(r, g, b)
            if runs and runs[-1][0] == color:
                runs[-1][1] += char
            else:
                runs.append([color, char])
        out.append(runs)

    json.dump(out, sys.stdout, separators=(",", ":"))


if __name__ == "__main__":
    main()
