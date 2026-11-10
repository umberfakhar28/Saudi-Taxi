/**
 * Cookie consent for Google Analytics — option A of the November 2026 audit
 * (docs/seo/seo-audit-2026-11-09.md §9).
 *
 * ── The rule ──
 * GA4 is the only non-essential cookie on this site. Visitors from the EU/EEA,
 * the UK and Switzerland are asked first, and GA does not load at all for them
 * until they press Accept (Consent Mode v2 "basic" behaviour: no cookieless
 * pings, nothing sent to Google before a yes). Everyone else gets GA exactly as
 * before, unless they have themselves pressed Reject via "Cookie settings" in
 * the footer — a stored choice is always honoured, whatever the region.
 *
 * ── Where the region comes from ──
 * proxy.ts reads Vercel's x-vercel-ip-country header and writes it to the
 * gts_region cookie. Doing that in the proxy rather than a layout is what keeps
 * every page statically generated: the HTML is identical for everyone, and only
 * this small client-side check differs.
 *
 * ── Saudi Arabia ──
 * Not in the list. Whether Saudi PDPL requires prior consent for analytics
 * cookies is an open question for the owner's privacy adviser (audit §9.1).
 * If the answer is yes, add "SA" (and any other country) to CONSENT_COUNTRIES;
 * nothing else needs to change.
 */

/** EEA (EU 27 + Iceland, Liechtenstein, Norway), plus the UK and Switzerland. */
export const CONSENT_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES",
  "SE", "IS", "LI", "NO", "GB", "CH",
]);

/** "eu" = consent required before analytics; "other" = not required. */
export const REGION_COOKIE = "gts_region";
/** "granted" or "denied", set only by the visitor's own choice. */
export const CONSENT_COOKIE = "gts_consent";
/** How long a choice is remembered: 12 months. */
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

export type ConsentChoice = "granted" | "denied";

/** Dispatched on window to reopen the banner (footer "Cookie settings"). */
export const OPEN_COOKIE_SETTINGS_EVENT = "gts:cookie-settings";

export function regionForCountry(country: string | null | undefined): "eu" | "other" {
  return country && CONSENT_COUNTRIES.has(country.toUpperCase()) ? "eu" : "other";
}

/* ───────────────────────── browser-only helpers ───────────────────────── */

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function consentRequired(): boolean {
  return readCookie(REGION_COOKIE) === "eu";
}

export function storedChoice(): ConsentChoice | null {
  const value = readCookie(CONSENT_COOKIE);
  return value === "granted" || value === "denied" ? value : null;
}

/** May GA load on this page view? */
export function analyticsAllowed(): boolean {
  const choice = storedChoice();
  if (choice) return choice === "granted";
  return !consentRequired();
}

export function saveChoice(choice: ConsentChoice): void {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${choice}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
}

/**
 * GA's own cookies (_ga, _ga_<id>) are set on the registrable domain, with a
 * leading dot. Withdrawing consent deletes them on both the bare host and the
 * dotted domain, so nothing GA wrote survives a Reject.
 */
export function deleteAnalyticsCookies(): void {
  const names = document.cookie
    .split("; ")
    .map((c) => c.split("=")[0])
    .filter((n) => n === "_ga" || n.startsWith("_ga_"));
  const host = location.hostname;
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  for (const name of names) {
    for (const domain of domains) {
      const d = domain ? `; Domain=${domain}` : "";
      document.cookie = `${name}=; Path=/; Max-Age=0${d}`;
    }
  }
}

/* ───────────────────────── the GA loader ───────────────────────── */

/**
 * The GA4 property. Hardcoded as the default rather than env-only: the env
 * variable was once never set in any environment and production shipped no
 * gtag at all for months. The ID is public (gtag prints it in every page), so
 * there is nothing to protect. NEXT_PUBLIC_GA_MEASUREMENT_ID still wins when
 * set, so a staging property can override it.
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-TQZY85DG7H";

let loaded = false;

/**
 * Load GA4 once. Idempotent: the footer link, the banner and the page-load
 * check can all call it, and only the first does anything.
 *
 * For a visitor who was asked, the ad signals are declared denied before the
 * config call — the site runs no ads, so a yes to analytics is a yes to
 * analytics only. For everyone else nothing about consent is declared, which
 * keeps GA behaving exactly as it did before this module existed.
 */
export function loadGoogleAnalytics(measurementId: string = GA_MEASUREMENT_ID): void {
  if (loaded || typeof window === "undefined") return;
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  // gtag must push the arguments object itself, not an array copy: gtag.js
  // treats the two differently. Hence a function expression, not an arrow.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  if (consentRequired()) {
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

/**
 * Stop GA collecting on this page view and remove what it stored.
 * ga-disable-<id> is GA's documented opt-out switch: once set, gtag sends
 * nothing more for that property, including the page views it would record
 * on later client-side navigations.
 */
export function revokeAnalytics(measurementId: string = GA_MEASUREMENT_ID): void {
  (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = true;
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", { analytics_storage: "denied" });
  }
  deleteAnalyticsCookies();
}

/**
 * Start (or resume) GA after a yes. If the visitor rejected and then accepted
 * again without leaving the page, gtag is already there with the opt-out flag
 * set, so the flag is cleared and consent updated rather than loading twice.
 */
export function grantAnalytics(measurementId: string = GA_MEASUREMENT_ID): void {
  if (!loaded) {
    loadGoogleAnalytics(measurementId);
    return;
  }
  (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = false;
  window.gtag?.("consent", "update", { analytics_storage: "granted" });
}
