// Scrambles text nodes into the text they already hold: random letters that settle one by one. Used by a post's
// language switch (BlogPost.astro) and the Go to menu's easter eggs (Shortcuts.astro).
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = LOWER.toUpperCase();
const SCRAMBLE_MS = 400;
const SCRAMBLE_TICK = 40; // ms between glyph changes; changing every frame reads as flicker
const LETTER = /[\p{L}\p{N}]/u;

export function scramble(textNodes: Text[]) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // each letter settles at its own time: mostly left to right, with some jitter so it doesn't read as a wipe
  const nodes = textNodes.map((node) => ({
    node,
    text: node.data,
    at: [...node.data].map((_, i, a) => (i / a.length) * 0.6 + Math.random() * 0.4),
  }));
  const start = performance.now();
  let lastTick = -1;
  const frame = (now: number) => {
    const p = Math.min((now - start) / SCRAMBLE_MS, 1);
    const tick = Math.floor((now - start) / SCRAMBLE_TICK);
    if (tick === lastTick && p < 1) return void requestAnimationFrame(frame);
    lastTick = tick;
    for (const n of nodes) {
      // only letters and digits scramble, so spaces and punctuation keep the shape of the text
      const out = [...n.text]
        .map((c, i) => {
          if (p >= n.at[i] || !LETTER.test(c)) return c;
          const set = c === c.toLowerCase() ? LOWER : UPPER;
          return set[(Math.random() * set.length) | 0];
        })
        .join('');
      if (n.node.data !== out) n.node.data = out;
    }
    if (p < 1) requestAnimationFrame(frame);
  };
  frame(start); // first frame right away, so the new text never shows unscrambled
}
