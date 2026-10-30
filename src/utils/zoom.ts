// Windows 3.1-style "zoom rect": a bare outline grows in steps from `from`, then the real dialog appears.
let zooming = false;

export function zoomOpen(dialog: HTMLDialogElement, from: Element) {
  if (zooming) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return dialog.showModal();
  // measure the final box; nothing paints between show and close
  dialog.showModal();
  const to = dialog.getBoundingClientRect();
  dialog.close();
  const start = from.getBoundingClientRect();
  const box = document.body.appendChild(document.createElement('div'));
  box.className = 'zoom-rect';
  zooming = true;
  const steps = 8;
  let i = 1;
  // setInterval, not CSS transitions: the jumpy steps are the point
  const tick = setInterval(() => {
    if (i > steps) {
      clearInterval(tick);
      box.remove();
      zooming = false;
      dialog.showModal();
      return;
    }
    const t = i++ / steps;
    const at = (a: number, b: number) => `${a + (b - a) * t}px`;
    Object.assign(box.style, {
      left: at(start.left, to.left),
      top: at(start.top, to.top),
      width: at(start.width, to.width),
      height: at(start.height, to.height),
    });
  }, 35);
}
