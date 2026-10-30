// Runs setup on every page load, including after a ClientRouter navigation. Window and document
// listeners registered with the signal are removed before the next page swaps in, so they don't pile up.
export function onPageLoad(setup: (signal: AbortSignal) => void) {
  document.addEventListener('astro:page-load', () => {
    const ctrl = new AbortController();
    document.addEventListener('astro:before-swap', () => ctrl.abort(), { once: true });
    setup(ctrl.signal);
  });
}

// the running navigation's view transition, so an intro can wait for the page flicker to end
let transition: Promise<unknown> = Promise.resolve();
document.addEventListener('astro:before-swap', (e) => (transition = e.viewTransition.finished));
export const transitionDone = () => transition;
