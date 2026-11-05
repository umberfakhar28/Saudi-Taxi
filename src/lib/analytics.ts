/**
 * GA4 event helpers.
 *
 * Everything here has to survive gtag not being there at all: an ad blocker,
 * a privacy browser, a local `next dev` run, or the split second before the
 * afterInteractive script has loaded. A missing gtag is the normal case for a
 * meaningful slice of real traffic, so each function is a no-op rather than a
 * thrown error — analytics must never be the reason a WhatsApp button stops
 * working.
 *
 * There is exactly one GA4 loader on this site, in components/GoogleAnalytics
 * (property G-TQZY85DG7H). Nothing here loads a second one or reconfigures
 * the first; these functions only send events to the tag that is already
 * there.
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

/* ───────────────────────── WhatsApp clicks ───────────────────────── */

/**
 * A WhatsApp click is *interest*, not a confirmed enquiry and certainly not
 * a booking. Someone can open the chat and never send a word. Treat this
 * event as "this page made somebody want to talk to us" and nothing more.
 */
export const WHATSAPP_CLICK_EVENT = "whatsapp_click";

/**
 * The six coarse positions, for reporting. Each granular CTA label maps to
 * exactly one of these, so a report can start at "do floating buttons beat
 * in-page CTAs?" and then drill into cta_source for "which in-page CTA?".
 */
export type CtaLocation =
  | "navbar"
  | "footer"
  | "floating"
  | "in_page"
  | "sticky_mobile"
  | "other";

/**
 * Granular label → coarse position.
 *
 * Only the chrome and the two sticky/floating families need naming here;
 * every other label is a CTA sitting in the body of a page, which is what
 * in_page means. An unrecognised or missing label becomes "other" rather
 * than being quietly filed under in_page, so a gap stays visible.
 */
const CTA_LOCATIONS: Record<string, CtaLocation> = {
  navbar: "navbar",
  "footer-social": "footer",
  "footer-contact": "footer",
  "floating-button": "floating",
  "sticky-mobile-bar": "sticky_mobile",
  "mobile-bottom-nav": "sticky_mobile",
};

/** The granular labels that are a deliberate "we could not tell" value. */
const UNLABELLED_PREFIX = "unlabelled";

export function ctaLocationFor(source: string): CtaLocation {
  if (CTA_LOCATIONS[source]) return CTA_LOCATIONS[source];
  if (!source || source.startsWith(UNLABELLED_PREFIX)) return "other";
  return "in_page";
}

/**
 * Page family for the handful of pages that are not rendered by a shared
 * template component.
 *
 * The 120-odd template pages do not come through here at all: RoutePage,
 * DistancePage, CityServicePage and the rest each declare their own family
 * with a data-page-template attribute, which is read straight off the DOM.
 * That is the reliable identifier, so nothing in this file tries to infer a
 * template by pattern-matching a slug — a guess like "any slug containing
 * -to- is a route page" is exactly the kind of rule that mislabels pages it
 * was never checked against.
 *
 * What is left is a short list of one-off pages, matched on their exact
 * path. Anything else returns "other", and page_path is sent alongside on
 * every event, so an "other" click is still fully attributable.
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

/** "ar" for the Arabic tree, "en" everywhere else. */
export function pageLanguage(pathname: string): "ar" | "en" {
  return /^\/ar(\/|$)/.test(pathname) ? "ar" : "en";
}

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

export interface WhatsAppClickContext {
  /** Pathname of the page the click happened on. */
  pagePath: string;
  /** Page URL without query or hash — see whatsAppDestination on why. */
  pageLocation: string;
  /** WhatsApp destination, query stripped. */
  linkUrl: string;
}

/**
 * Record a WhatsApp CTA click.
 *
 * Fire-and-forget by design. It does not call preventDefault, does not wait
 * on an event_callback and does not hold the click, because any of those
 * would risk delaying or losing the WhatsApp hand-off — and a browser that
 * blocks a window opened outside the original gesture is a far worse outcome
 * than a dropped analytics hit. Delivery instead rides on the beacon
 * transport, which survives the page being left behind.
 */
export function trackWhatsAppClick(
  source: string,
  pageTemplate: string,
  context: WhatsAppClickContext,
): void {
  gaEvent(WHATSAPP_CLICK_EVENT, {
    cta_source: source,
    cta_location: ctaLocationFor(source),
    page_template: pageTemplate,
    page_path: context.pagePath,
    page_location: context.pageLocation,
    link_url: context.linkUrl,
    site_language: pageLanguage(context.pagePath),
    transport_type: "beacon",
  });
}

/* ─────────────────────── Form submissions ─────────────────────── */

/**
 * A submitted enquiry, as distinct from a WhatsApp click.
 *
 * `whatsapp_click` says a page created enough interest to open a chat. These
 * events say something stronger and rarer: somebody filled in a form and the
 * record reached the database. That is the first signal on this site that
 * connects a search query to actual business rather than to a button press.
 *
 * Each event fires at exactly one point — immediately after the API call
 * that persists the record returns ok — and never on a click, a validation
 * failure, a failed request or an intermediate step such as the customer
 * upsert that precedes a booking insert.
 *
 * Email is deliberately not part of the condition. Both booking flows save
 * the record first and then try to send notifications, treating an email
 * failure as something to log rather than a failed booking. Waiting for the
 * email would under-report real enquiries every time Resend has a bad
 * minute, so these events follow the database, which is the thing that
 * matters.
 */
export const FORM_EVENTS = {
  contact: "contact_form_submit",
  booking: "booking_form_submit",
  destinationEnquiry: "destination_enquiry_submit",
} as const;

export type FormEventName = (typeof FORM_EVENTS)[keyof typeof FORM_EVENTS];

export interface FormSubmitOptions {
  /** Which form, in a form the GA UI can group: "contact", "booking", … */
  formType: string;
  /** Pathname the form was submitted from. */
  pagePath: string;
  /**
   * Optional non-identifying detail about the request: the service type
   * chosen from a fixed dropdown, or the destination page a form sits on.
   * Never free text a customer typed.
   */
  detail?: string;
}

/**
 * Record a successful form submission.
 *
 * No name, email, phone number, message text, trip detail, date, address or
 * reference id is ever passed here. The parameters are the form's identity
 * and the page it sat on, which is everything needed to answer "which pages
 * produce enquiries?" and nothing that could identify who sent one.
 */
export function trackFormSubmit(
  event: FormEventName,
  { formType, pagePath, detail }: FormSubmitOptions,
): void {
  gaEvent(event, {
    form_type: formType,
    page_path: pagePath,
    page_language: pageLanguage(pagePath),
    page_template: pageTemplateFromPath(pagePath),
    form_detail: detail,
    transport_type: "beacon",
  });
}
