/**
 * Thin, safe wrapper around GA4's gtag.
 *
 * Everything here has to survive gtag not being there at all: an ad blocker,
 * a privacy browser, a local `next dev` run with no measurement ID, or the
 * split second before the afterInteractive script has loaded. A missing
 * gtag is the normal case for a meaningful slice of real traffic, so each
 * function is a no-op rather than a thrown error — an analytics call must
 * never be the reason a WhatsApp button stops working.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type GaParams = Record<string, string | number | boolean | undefined>;

/**
 * GA4 silently drops a parameter value longer than 100 characters, and the
 * whole event if a name is over 40. Clamping here means a long pre-filled
 * WhatsApp message or an unusually long slug degrades to a truncated value
 * instead of losing the entire click.
 */
const MAX_VALUE_LENGTH = 100;

function clamp(value: string): string {
  return value.length > MAX_VALUE_LENGTH ? value.slice(0, MAX_VALUE_LENGTH) : value;
}

/** Send a GA4 event. Does nothing, quietly, when GA is unavailable. */
export function gaEvent(name: string, params: GaParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const clean: GaParams = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    clean[key] = typeof value === "string" ? clamp(value) : value;
  }

  try {
    window.gtag("event", name, clean);
  } catch {
    // Analytics is never allowed to break a user action.
  }
}

/**
 * Which page family a path belongs to, so clicks can be compared across a
 * whole template instead of one URL at a time — "do route pages convert
 * better than distance pages?" is the question this answers.
 *
 * The mapping was derived from the actual directory layout rather than
 * guessed: /distance/*, /services/*, /guides/*, /blog/*, /destinations/* and
 * /hotels/* are real route prefixes, border pages are all /saudi-arabia-to-*,
 * the nine airport pages are /<city>-airport-taxi-service with no "-to-" in
 * them, and the 39 route pages are the remaining *-to-*-taxi-service slugs.
 *
 * Anything unrecognised returns "other" rather than being forced into a
 * bucket it does not belong in. page_path is sent alongside this on every
 * event, so an "other" click is still fully attributable — the template is a
 * convenience grouping, not the source of truth.
 */

/**
 * The two page families whose URLs share no pattern.
 *
 * Everything else is recognisable from its path, but these nine service
 * pages and three tour pages are flat slugs with nothing in common, and they
 * are too commercially important to leave pooled in "other" alongside the
 * cart and the privacy policy. The lists come from the pages that actually
 * render CoreServicePage and TourPage, not from guesswork.
 *
 * A new service page added later lands in "other" until it is added here.
 * That is a visible, harmless fallback — page_path is still exact — and it
 * is the reason this is a lookup rather than a pattern that would quietly
 * mis-sort pages it was never checked against.
 */
const CORE_SERVICE_PAGES = new Set([
  "airport-transfer-for-umrah",
  "corporate-transportation-services",
  "educational-tours-transport",
  "private-taxi",
  "school-buses-services",
  "umrah-taxi-services",
  "umrah-transport-package",
  "wedding-transportation",
  "ziyarat-services-in-saudi-arabia",
]);

const TOUR_PAGES = new Set([
  "jeddah-city-tour-services-in-saudi-arabia",
  "reliable-alula-tour-taxi-service-in-saudi-arabia",
  "taif-ziyarat-taxi-service",
]);

export function pageTemplate(pathname: string): string {
  const path = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";

  if (path === "/") return "home";

  const slug = path.replace(/^\//, "").replace(/\/$/, "");
  const [first] = slug.split("/");

  if (first === "distance") return slug.includes("/") ? "distance" : "distance-index";
  if (first === "services") return slug.includes("/") ? "city-service" : "service-index";
  if (first === "guides") return "guide";
  if (first === "blog") return "blog";
  if (first === "destinations") return slug.includes("/") ? "destination" : "destination-index";
  if (first === "hotels") return "hotel";

  if (CORE_SERVICE_PAGES.has(slug)) return "core-service";
  if (TOUR_PAGES.has(slug)) return "tour";

  if (/^saudi-arabia-to-/.test(slug)) return "border";
  if (/-airport-taxi-service$/.test(slug) && !slug.includes("-to-")) return "airport";
  if (slug.includes("-to-") && /-taxi-service$/.test(slug)) return "route";

  // The five long-form guides built from the raw HTML in content/ — the only
  // pages on the site whose slug ends in "-guide".
  if (/-guide$/.test(slug)) return "content-guide";

  return "other";
}

/** "ar" for the Arabic tree, "en" everywhere else. */
export function pageLanguage(pathname: string): "ar" | "en" {
  return /^\/ar(\/|$)/.test(pathname) ? "ar" : "en";
}
