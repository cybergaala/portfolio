// Turns art from scripts/ascii-art.py into HTML: ASCII runs are [color, text], ANSI runs are [fg, bg, text].
// The art only holds ASCII and hex colors from our own script, so it is safe as raw HTML.
export const artToHtml = (rows: string[][][]) =>
  rows
    .map((row) =>
      row
        .map((run) => {
          const [fg, bg, t] = run.length === 2 ? [run[0], '', run[1]] : run;
          return fg ? `<span style="color:${fg}${bg ? `;background:${bg}` : ''}">${t}</span>` : t;
        })
        .join(''),
    )
    .join('\n');
