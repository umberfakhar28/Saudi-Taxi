/**
 * GA4 event helpers — every event this site sends goes through gaEvent()
 * below, so there is one place to read what is tracked.
 *
 * Everything here has to survive gtag not being there at all: an ad blocker,
 * a privacy browser, a local `next dev` run, or the split second before the
 * tag has loaded. A missing gtag is the normal case for a meaningful slice of
 * real traffic, so each function is a no-op rather than a thrown error —
 * analytics must never be the reason a WhatsApp button stops working.
 *
 * There is exactly one GA4 loader on this site, in components/GoogleAnalytics
 * via lib/consent (property G-TQZY85DG7H). Nothing here loads a second one or
 * reconfigures the first; these functions only send events to the tag that is
 * already there.
 *
 * ── The event set (Nov 2026; mapping from the old names in
 *    docs/perf/perf-report.md, "GA4 event mapping") ──
 *   generate_lead   a booking, contact or destination enquiry was SAVED
 *   whatsapp_click  any WhatsApp link pressed
 *   email_click     any mailto: link pressed
 *   form_start      first interaction with a lead form, once per page view
 *
 * Nothing a customer typed is ever sent: no name, email, phone, message,
 * address or date. Route and vehicle are sent only when they come from the
 * site's own fixed lists.
 *
 * The page language goes out as `site_language` (en/ar), not `language`:
 * gtag treats `language` as its own field — the visitor's BROWSER language
 * behind GA's Language report — so sending "en" there would overwrite it.
 * page_path and page_location are likewise read by gtag as the page itself
 * (GA's Page path / Page location dimensions), not as custom parameters.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type GaParams = Record<string, string | number | boolean | undefined>;

/**
 * GA4 silently drops a parameter value longer than 100 characters. Clamping
 * means an unusually long slug degrades to a truncated value instead of
 * losing the whole event.
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

/* ───────────────────────── Shared page context ───────────────────────── */

/** "ar" for the Arabic tree, "en" everywhere else. */
export function pageLanguage(pathname: string): "ar" | "en" {
  return /^\/ar(\/|$)/.test(pathname) ? "ar" : "en";
}

/**
 * Page family for the handful of pages that are not rendered by a shared
 * template component. The 120-odd template pages declare their own family
 * with a data-page-template attribute, read straight off the DOM; this short
 * exact-path list covers the one-off pages, and anything else is "other"
 * (page_path is sent alongside, so it stays attributable).
 */
const EXACT_PATHS: Record<string, string> = {
  "/": "home",
  "/contact-us": "contact",
  "/contact": "contact",
  "/book-online": "booking",
  "/distance": "distance-index",
  "/routes": "route-index",
  "/locations": "location-index",
  "/destinations": "destination-index",
  "/services": "service-index",
};

export function pageTemplateFromPath(pathname: string): string {
  const path = (pathname.replace(/^\/ar(?=\/|$)/, "") || "/").replace(/\/+$/, "") || "/";
  return EXACT_PATHS[path] ?? "other";
}

/** "riyadh" → "Riyadh", "dammam-airport" → "Dammam Airport". */
function titleCase(slug: string): string {
  return slug.split("-").filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}

/**
 * The route a page is about, read from its URL: /riyadh-to-bahrain-taxi-service,
 * /ar/riyadh-to-bahrain-taxi-service and /distance/riyadh-to-dammam all give
 * "Riyadh-Bahrain" / "Riyadh-Dammam". Pages that are not about one route
 * return undefined, so the parameter is simply left off.
 */
export function routeFromPath(pathname: string): string | undefined {
  const slug = pathname.replace(/^\/ar(?=\/|$)/, "").replace(/^\/distance(?=\/)/, "").replace(/^\//, "").replace(/\/+$/, "");
  const m = /^([a-z-]+?)-to-([a-z-]+?)(?:-(?:airport-)?taxi-service|-land-transfer|-guide)?$/.exec(slug);
  if (!m || slug.includes("/")) return undefined;
  return `${titleCase(m[1])}-${titleCase(m[2])}`;
}

/* ───────────────────────── Button positions ───────────────────────── */

/**
 * Where a WhatsApp or email button sits, in the fixed vocabulary reports
 * use: header, hero, sticky, floating, vehicle_card, price_card, form,
 * footer, in_page — or "other" when the button carries no label at all.
 *
 * The granular label comes from data-wa-cta on the button (sent as
 * cta_source, so a report can drill from "in_page" into "which in-page
 * CTA?"). Labels not listed here are CTAs in the body of a page: in_page.
 */
const BUTTON_LOCATIONS: Record<string, string> = {
  navbar: "header",
  "unlabelled-nav": "header",
  hero: "hero",
  "hero-search-bar": "hero",
  "sticky-mobile-bar": "sticky",
  "mobile-bottom-nav": "sticky",
  "floating-button": "floating",
  "vehicle-card": "vehicle_card",
  "pricing-table": "price_card",
  "quick-book-form": "form",
  "booking-widget": "form",
  "booking-form-alternative": "form",
  "booking-success": "form",
  "enquiry-form": "form",
  "enquiry-form-success": "form",
  "contact-form-success": "form",
  "unlabelled-form": "form",
  "booking-methods": "booking_methods",
  "hotel-card": "hotel_card",
  "final-cta": "final_cta",
  "booking-box": "booking_box",
  "distance-booking-box": "distance_booking_box",
  "footer-social": "footer",
  "footer-contact": "footer",
  "unlabelled-footer": "footer",
};

export function buttonLocationFor(source: string): string {
  if (BUTTON_LOCATIONS[source]) return BUTTON_LOCATIONS[source];
  if (!source || source.startsWith("unlabelled")) return "other";
  return "in_page";
}

/**
 * The same tap reported twice within a second is one action: a double-tap,
 * or a click that bubbles through two tracked elements. Keyed by event +
 * button + destination.
 */
const recentClicks = new Map<string, number>();
function isRepeat(key: string): boolean {
  const now = Date.now();
  const last = recentClicks.get(key);
  recentClicks.set(key, now);
  return last !== undefined && now - last < 1000;
}

/* ───────────────────────── WhatsApp clicks ───────────────────────── */

/**
 * A WhatsApp click is *interest*, not a confirmed enquiry and certainly not
 * a booking: someone can open the chat and never send a word. Marked as a
 * Key event in GA alongside generate_lead because, on this site, most real
 * enquiries arrive this way.
 */
export const WHATSAPP_CLICK_EVENT = "whatsapp_click";

/**
 * Strip everything after the path from a WhatsApp URL.
 *
 * This is a privacy requirement, not tidiness. A wa.me link carries the
 * pre-filled message in ?text=, and on several of these buttons that message
 * is built from what the customer just typed — their name and phone number
 * on /book-online, their enquiry reference on /contact-us, their route and
 * dates in the hero search bar. None of that belongs in Google Analytics, so
 * the query string is dropped before the URL is reported and only the
 * destination itself survives.
 */
export function whatsAppDestination(href: string): string {
  try {
    const url = new URL(href, typeof window === "undefined" ? undefined : window.location.href);
    return `${url.origin}${url.pathname}`;
  } catch {
    return "";
  }
}

export interface ClickContext {
  /** Pathname of the page the click happened on. */
  pagePath: string;
  /** Page URL without query or hash — see whatsAppDestination on why. */
  pageLocation: string;
}

/**
 * Record a WhatsApp click. Fire-and-forget: no preventDefault, no waiting on
 * a callback, so the hand-off to WhatsApp is never delayed. Delivery rides on
 * the beacon transport, which survives the page being left behind.
 */
export function trackWhatsAppClick(
  source: string,
  pageTemplate: string,
  context: ClickContext & { linkUrl: string; vehicle?: string },
): void {
  if (isRepeat(`wa|${source}|${context.pagePath}|${context.linkUrl}|${context.vehicle ?? ""}`)) return;
  gaEvent(WHATSAPP_CLICK_EVENT, {
    button_location: buttonLocationFor(source),
    cta_source: source,
    route: routeFromPath(context.pagePath),
    vehicle: context.vehicle,
    page_path: context.pagePath,
    page_template: pageTemplate,
    page_location: context.pageLocation,
    link_url: context.linkUrl,
    site_language: pageLanguage(context.pagePath),
    transport_type: "beacon",
  });
}

/* ───────────────────────── Email clicks ───────────────────────── */

export const EMAIL_CLICK_EVENT = "email_click";

/** A mailto: link pressed. The address itself is never sent. */
export function trackEmailClick(source: string, context: ClickContext): void {
  if (isRepeat(`email|${source}|${context.pagePath}`)) return;
  gaEvent(EMAIL_CLICK_EVENT, {
    button_location: buttonLocationFor(source),
    cta_source: source,
    page_path: context.pagePath,
    page_location: context.pageLocation,
    site_language: pageLanguage(context.pagePath),
    transport_type: "beacon",
  });
}

/* ───────────────────────── Lead forms ───────────────────────── */

/** Which form: lets reports separate the three kinds of lead. */
export type LeadFormType = "booking" | "contact" | "destination_enquiry";

export const FORM_START_EVENT = "form_start";

/** form_start fires once per form per page view; cleared on navigation. */
const startedForms = new Set<string>();
let startedOnPath = "";

/**
 * The visitor first touched a lead form (focused or typed in a field).
 * Once per form per page view: moving between fields, or a second form of
 * the same kind on the page, is not a second start.
 */
export function trackFormStart(formType: LeadFormType, pagePath: string): void {
  if (pagePath !== startedOnPath) {
    startedForms.clear();
    startedOnPath = pagePath;
  }
  if (startedForms.has(formType)) return;
  startedForms.add(formType);
  gaEvent(FORM_START_EVENT, {
    form_type: formType,
    form_location: formType === "contact" ? "contact" : pagePath,
    page_path: pagePath,
    site_language: pageLanguage(pagePath),
  });
}

/**
 * GA4's recommended lead event. It fires at exactly one point per form —
 * immediately after the API call that SAVES the record returns ok — never on
 * a click, a validation failure, a failed request or an intermediate step.
 * Email is deliberately not part of the condition: the record is saved first
 * and notifications may fail without the lead being lost, so the event
 * follows the database.
 */
export const LEAD_EVENT = "generate_lead";

export interface LeadOptions {
  formType: LeadFormType;
  /** Pathname the form was submitted from. */
  pagePath: string;
  /**
   * Something unique to this submission (the saved row's id or reference).
   * The same key never fires twice — a double submit, a retried promise or
   * a re-render cannot produce a second lead.
   */
  submitKey: string;
  /** A fixed-list value: the service chosen, or the destination's name. */
  detail?: string;
  /** "Riyadh-Bahrain" — only when both ends came from the site's own list. */
  route?: string;
  /** Vehicle name from the site's own fleet list. */
  vehicle?: string;
  /** Quoted price in SAR, when the form knew one. */
  value?: number;
}

const sentLeads = new Set<string>();

/**
 * Record a saved lead.
 *
 * form_location is the page path for booking and destination enquiries and
 * "contact" for the contact forms (EN and AR), as agreed with the owner;
 * form_type separates the three kinds whichever way a report slices it.
 * value + currency are sent only together, and only when a price is known.
 */
export function trackLead(o: LeadOptions): void {
  const key = `${o.formType}|${o.submitKey}`;
  if (sentLeads.has(key)) return;
  sentLeads.add(key);
  const hasValue = typeof o.value === "number" && Number.isFinite(o.value) && o.value > 0;
  gaEvent(LEAD_EVENT, {
    form_type: o.formType,
    form_location: o.formType === "contact" ? "contact" : o.pagePath,
    form_detail: o.detail,
    route: o.route,
    vehicle: o.vehicle,
    value: hasValue ? o.value : undefined,
    currency: hasValue ? "SAR" : undefined,
    page_path: o.pagePath,
    page_template: pageTemplateFromPath(o.pagePath),
    site_language: pageLanguage(o.pagePath),
    transport_type: "beacon",
  });
}
