/**
 * Shared logo-click behaviour for the header logos.
 *
 * The problem it solves: a `<Link href="/">` returns to the top fine when it
 * actually navigates, because the App Router resets scroll on a route change.
 * Clicking it while *already* on that route is a no-op — no navigation, no
 * scroll reset — so a visitor who has scrolled halfway down the homepage and
 * clicks the logo appears to get nothing.
 *
 * Only the already-here case is handled; every other page is left to normal
 * routing rather than being intercepted, so there is no second navigation
 * handler competing with the router and no page reload.
 *
 * `scroll-behavior: smooth` is set globally on :root (globals.css), so the
 * scroll is animated by default. Honour prefers-reduced-motion explicitly
 * rather than inheriting an animation someone has asked not to see.
 */
export function scrollToTopIfOn(
  homePath: string,
  currentPath: string | null,
  event?: { preventDefault: () => void },
): void {
  if (currentPath !== homePath) return;
  // Already here: suppress the dead navigation and scroll instead.
  event?.preventDefault();
  if (typeof window === "undefined") return;

  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  window.scrollTo({ top: 0, left: 0, behavior: reduced ? "auto" : "smooth" });
}
