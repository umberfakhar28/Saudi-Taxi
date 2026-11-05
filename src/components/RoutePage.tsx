import Link from "next/link";
import Image from "next/image";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import {
  CheckCircleIcon, MapPinIcon, CarIcon, ClockIcon, ShieldIcon, MessageIcon, GlobeIcon, ArrowRightIcon,
  PlaneIcon,
} from "@/components/Icons";
import RelatedLinks from "@/components/RelatedLinks";
import QuickBookForm from "@/components/QuickBookForm";
import { ui, type Locale, type UIStrings } from "@/lib/i18n";
import { waLink } from "@/lib/contact";
import {
  directionLabel,
  hasPublishedPrice,
  priceLabel,
  routeVehicles,
  type RoutePricing,
} from "@/lib/routePricing";
// Value import (not just the RouteData type) so the reverse-route callout
// below can confirm `reverseSlug` resolves to a real, live page before
// linking to it — reverseSlug is allowed to forward-reference a route that
// doesn't exist yet (see the field's doc comment), so this check is what
// keeps that safe instead of shipping a broken link.
import { allRoutes } from "@/lib/routeData";
import { AR_ROUTES, AR_PAGE_SLUGS, arEndpointName } from "@/lib/ar/routeDataAr";
import { allCities } from "@/lib/cityData3";
import { AIRPORTS } from "@/lib/airportRoutesData";
import { getDestination } from "@/lib/destinationData";
import { hotelsForCity } from "@/lib/hotelData";
import styles from "./RoutePage.module.css";

/** Maps a route's non-Saudi endpoint name (as written in RouteData's
 * origin/destination strings) to a real Destination-family slug — explicit
 * and verified rather than fuzzy-matched, so it never links somewhere wrong.
 * Country-level names map to that country's featured/capital destination
 * page (Phase 19). */
const GCC_DESTINATION_SLUG_MAP: Record<string, string> = {
  "bahrain": "manama",
  "qatar": "doha",
  "kuwait": "kuwait-city",
  "dubai": "dubai",
  "abu dhabi": "abu-dhabi",
};

/** The real Destination-family page for this route's non-Saudi endpoint —
 * only set where the endpoint genuinely has no Saudi CityData match (i.e.
 * it's the cross-border side) and a mapping exists. */
function destinationPageFor(data: RouteData) {
  const candidate = !data.toSlug ? data.destination : !data.fromSlug ? data.origin : undefined;
  if (!candidate) return undefined;
  const slug = GCC_DESTINATION_SLUG_MAP[candidate.toLowerCase()];
  return slug ? getDestination(slug) : undefined;
}

/** Long-form Guide-family pages that cover this exact corridor in depth.
 * The Guide family (GuidePage.tsx) had no inbound links from anywhere else
 * on the site — this is the fix for the two routes it actually overlaps
 * with (the Riyadh↔Dammam corridor already has its own guide content
 * migrated directly into RoutePage, so it needs no separate link here). */
const ROUTE_GUIDE_MAP: Record<string, { href: string; label: string }> = {
  "jeddah-to-makkah-taxi-service": { href: "/jeddah-to-makkah-guide", label: "Jeddah to Makkah: Full Travel Guide" },
  "makkah-to-madinah-taxi-service": { href: "/makkah-to-madinah-guide", label: "Makkah to Madinah: Full Travel Guide" },
};

/** Maps a commercial route slug to the /distance/[route] page covering the
 * same corridor's informational intent (distance/drive-time research,
 * ahead of the booking decision) — both directions of a pair point at the
 * same canonical distance page, since the underlying geography is
 * identical either way (route-inventory audit, §5). */
const ROUTE_DISTANCE_MAP: Record<string, { href: string; label: string }> = {
  "jeddah-to-makkah-taxi-service": { href: "/distance/jeddah-to-makkah", label: "Jeddah to Makkah: Distance & Travel Time" },
  "makkah-to-jeddah-taxi-service": { href: "/distance/jeddah-to-makkah", label: "Jeddah to Makkah: Distance & Travel Time" },
  "makkah-to-madinah-taxi-service": { href: "/distance/makkah-to-madinah", label: "Makkah to Madinah: Distance & Travel Time" },
  "madinah-to-makkah-taxi-service": { href: "/distance/makkah-to-madinah", label: "Makkah to Madinah: Distance & Travel Time" },
  "jeddah-airport-to-madinah-taxi-service": { href: "/distance/jeddah-to-madinah", label: "Jeddah to Madinah: Distance & Travel Time" },
  "madinah-to-jeddah-airport-taxi-service": { href: "/distance/jeddah-to-madinah", label: "Jeddah to Madinah: Distance & Travel Time" },
  "riyadh-to-dammam-guide": { href: "/distance/riyadh-to-dammam", label: "Riyadh to Dammam: Distance & Travel Time" },
  "dammam-to-riyadh-taxi-service": { href: "/distance/riyadh-to-dammam", label: "Riyadh to Dammam: Distance & Travel Time" },
  "riyadh-to-makkah-taxi-service": { href: "/distance/riyadh-to-makkah", label: "Riyadh to Makkah: Distance & Travel Time" },
  "makkah-to-riyadh-taxi-service": { href: "/distance/riyadh-to-makkah", label: "Riyadh to Makkah: Distance & Travel Time" },
  "bahrain-to-dammam-taxi-service": { href: "/distance/bahrain-to-dammam", label: "Bahrain to Dammam: Distance & Travel Time" },
  "dammam-airport-to-bahrain-taxi-service": { href: "/distance/bahrain-to-dammam", label: "Bahrain to Dammam: Distance & Travel Time" },
  "bahrain-to-riyadh-taxi-service": { href: "/distance/bahrain-to-riyadh", label: "Bahrain to Riyadh: Distance & Travel Time" },
  "riyadh-to-bahrain-taxi-service": { href: "/distance/bahrain-to-riyadh", label: "Bahrain to Riyadh: Distance & Travel Time" },
  "bahrain-to-jubail-taxi-service": { href: "/distance/bahrain-to-jubail", label: "Bahrain to Jubail: Distance & Travel Time" },
  // Batch 2 (route-inventory audit, Priority B backlog)
  "dammam-to-kuwait-taxi-service": { href: "/distance/dammam-to-kuwait", label: "Dammam to Kuwait: Distance & Travel Time" },
  "kuwait-to-dammam-taxi-service": { href: "/distance/dammam-to-kuwait", label: "Dammam to Kuwait: Distance & Travel Time" },
  "riyadh-to-kuwait-taxi-service": { href: "/distance/riyadh-to-kuwait", label: "Riyadh to Kuwait: Distance & Travel Time" },
  "kuwait-to-riyadh-taxi-service": { href: "/distance/riyadh-to-kuwait", label: "Riyadh to Kuwait: Distance & Travel Time" },
  "khafji-to-kuwait-taxi-service": { href: "/distance/khafji-to-kuwait", label: "Khafji to Kuwait: Distance & Travel Time" },
  "kuwait-to-khafji-taxi-service": { href: "/distance/khafji-to-kuwait", label: "Khafji to Kuwait: Distance & Travel Time" },
  "dammam-to-abu-dhabi-taxi-service": { href: "/distance/dammam-to-abu-dhabi", label: "Dammam to Abu Dhabi: Distance & Travel Time" },
  "abu-dhabi-to-dammam-taxi-service": { href: "/distance/dammam-to-abu-dhabi", label: "Dammam to Abu Dhabi: Distance & Travel Time" },
  "dammam-to-dubai-taxi-service": { href: "/distance/dammam-to-dubai", label: "Dammam to Dubai: Distance & Travel Time" },
  "dubai-to-dammam-taxi-service": { href: "/distance/dammam-to-dubai", label: "Dammam to Dubai: Distance & Travel Time" },
  "riyadh-to-dubai-taxi-service": { href: "/distance/riyadh-to-dubai", label: "Riyadh to Dubai: Distance & Travel Time" },
  "dubai-to-riyadh-taxi-service": { href: "/distance/riyadh-to-dubai", label: "Riyadh to Dubai: Distance & Travel Time" },
  "qatar-to-riyadh-taxi-service": { href: "/distance/doha-to-riyadh", label: "Doha to Riyadh: Distance & Travel Time" },
  "riyadh-to-qatar-taxi-service": { href: "/distance/doha-to-riyadh", label: "Doha to Riyadh: Distance & Travel Time" },
  "qatar-to-dammam-taxi-service": { href: "/distance/doha-to-dammam", label: "Doha to Dammam: Distance & Travel Time" },
  "dammam-airport-to-qatar-taxi-service": { href: "/distance/doha-to-dammam", label: "Doha to Dammam: Distance & Travel Time" },
};

export interface RouteData {
  slug: string;
  origin: string;
  destination: string;
  isCrossBorder: boolean;
  borderCrossingName?: string;
  eyebrow: string;
  h1: string;
  intro: string;
  breadcrumbLabel: string;
  distance: string;
  travelTime: string;
  heroImage?: string;
  /** Descriptive alt text for `heroImage`. Falls back to the generic
   * "{origin} to {destination} taxi service" when omitted, which is what
   * every route used before — fine for a stock chauffeur photo, not for an
   * image with its own specific subject. */
  heroImageAlt?: string;
  /** CSS aspect-ratio for the hero frame (e.g. "3 / 2"), replacing the
   * default fixed 360px band.
   *
   * The default band is ~3.3:1 at container width, so a 3:2 source is
   * cropped to roughly half its height — fine for a stock photo where any
   * slice works, wrong for a composed image whose subject spans the full
   * frame. No crop of a 3:2 composition into a 3.3:1 band can keep both a
   * top-left caption and a centre-bottom subject; this lets such a route
   * show the whole image instead, scaled proportionally at every width.
   *
   * Opt-in per route: the 35 routes using stock heroes keep the original
   * fixed band exactly as before. */
  heroImageAspect?: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  borderProcessTitle?: string;
  borderProcessParagraphs?: string[];
  documents: string[];
  pickupPoints: string[];
  dropoffInfo: string;
  vehicleOptions: { name: string; capacity: string; note: string }[];
  faqs: { q: string; a: string }[];
  relatedRoutes: { href: string; label: string }[];
  ctaText: string;

  // --- Execution Brief v3 D1 additions ---
  /** Commercial-intent tags — drives nav curation (config/navigation.ts, W9)
   * and the gap-analysis groupings in docs/page-gap-analysis.md. */
  tags: ("umrah" | "airport" | "business" | "gcc" | "tourism")[];
  /** 1 = top commercial intent, 2 = secondary/long-tail. */
  priority: 1 | 2;
  /** Slug of this corridor's opposite direction. May point at a page that
   * doesn't exist yet (see docs/page-inventory.md, Missing reciprocals) —
   * RoutePage only renders the reverse-route callout once the target is
   * confirmed present in `allRoutes`, so a forward reference here is safe
   * and becomes live automatically the day W7 adds that page. */
  reverseSlug: string;
  /** CityData slug for the origin, where a location page exists — not every
   * origin (e.g. "Bahrain", "Qatar", "Kuwait") has one on this site. */
  fromSlug?: string;
  /** CityData slug for the destination, where a location page exists. */
  toSlug?: string;
  /** Arabic mirror of the page-critical strings. Omitted (not machine-
   * translated as a placeholder) until a human writes it — see D3/W10. */
  ar?: {
    h1: string;
    intro: string;
    breadcrumbLabel: string;
    ctaText: string;
  };
  /** Defaults to true when omitted — every pre-existing entry here is
   * already live, human-written content. New W7 drafts start explicitly
   * `false` until a human reviews them (see scripts/seo/check-data-layer.js). */
  reviewed?: boolean;
  /** Defaults to true when omitted (matches current sitewide behavior).
   * Wired into config/navigation.ts in W9 — setting it now is prep, not yet
   * functional. */
  showInNav?: boolean;

  // --- Phase 2 Route Template additions (standardization pass) — all
  // optional so every field degrades gracefully instead of forcing a
  // section onto a route where it doesn't genuinely apply. ---
  /** 1-2 genuine, route-specific reviews. Omitted entirely rather than
   * padded with a generic quote — see ground rule against fabricated
   * reviews. */
  reviews?: { name: string; origin: string; text: string }[];
  /** Real, named rest/waypoint stops — only present on genuinely
   * long-distance routes where a scheduled stop is already part of how the
   * journey runs (several routes already mention this inline; this field
   * gives it its own section instead of burying it in a paragraph). */
  stops?: { name: string; note: string }[];
  /** 2-3 practical considerations specific to this route, beyond what's
   * already covered in overviewParagraphs/borderProcessParagraphs. */
  practicalInfo?: { title: string; note: string }[];
  /** Editorial freshness stamp for border/document information — only ever
   * set when this content has actually just been reviewed (see ground rule
   * against fake update dates). */
  lastReviewed?: string;

  // --- Kuwait route brief additions. All optional, so the ~30 routes that
  // do not set them render exactly as they did before. ---

  /** This route's confirmed fare. Omitted entirely where the business has
   * not confirmed one — the pricing section then does not render, rather
   * than showing a guess or a placeholder. See lib/routePricing.ts. */
  pricing?: RoutePricing;

  /** FLEET_VEHICLES slugs actually available on this route, in display
   * order. When set, these replace the generic `vehicleOptions` tiers with
   * real named vehicles and their confirmed capacities. */
  vehicleSlugs?: string[];

  /** What a traveller needs ready before a cross-border journey. */
  checklist?: { title: string; detail: string }[];

  /** A concrete duration for the "at a glance" strip, e.g. "7–9 hours".
   * `travelTime` is kept for the existing quick-facts bar; this exists
   * because several routes phrase that field qualitatively. */
  durationHours?: string;

  /** Named pickup areas at the origin end, where the business has
   * confirmed coverage. Distinct from `pickupPoints`, which mixes
   * airports, hotels and districts across both ends. */
  originAreas?: string[];
  /** Named drop-off areas at the destination end. */
  destinationAreas?: string[];
}

/**
 * The WhatsApp message a route opens with.
 *
 * Until now every route page's WhatsApp button pointed at a bare wa.me link
 * and opened an empty chat — `waLink` was imported into this file and
 * never called. The customer then had to type out which journey they
 * wanted, and our team had no idea which page the enquiry came from.
 *
 * The message names the route in the right direction, and the vehicle when
 * the enquiry comes from a specific vehicle or pricing card.
 */
function routeWhatsAppLink(data: RouteData, vehicleName?: string): string {
  const lines = [
    `Hello Gulf Trip Service, I would like a quote for a private transfer from ${data.origin} to ${data.destination}.`,
    vehicleName ? `Vehicle: ${vehicleName}.` : "",
    "Travel date: ",
    "Passengers: ",
  ].filter(Boolean);
  return waLink(lines.join("\n"));
}

/** Always-true service inclusions, not per-route — the border-crossing item
 * only appears for routes that actually cross one. */
function includedItemsFor(data: RouteData, t: UIStrings): string[] {
  const items = [
    t.includedPrivateVehicle,
    t.includedLicensedDriver,
    t.includedDoorToDoor,
    t.includedCoordination,
    t.includedLuggage,
  ];
  if (data.isCrossBorder) items.push(t.includedBorderSupport);
  return items;
}

/** Same 5-step flow the booking widget and WhatsApp path already follow. */
const howItWorksFor = (t: UIStrings) => [
  { n: "1", label: t.step1Label, text: t.step1Text },
  { n: "2", label: t.step2Label, text: t.step2Text },
  { n: "3", label: t.step3Label, text: t.step3Text },
  { n: "4", label: t.step4Label, text: t.step4Text },
  { n: "5", label: t.step5Label, text: t.step5Text },
];

/** Use-case chips computed from data already on every route (tags,
 * isCrossBorder) rather than hand-written near-duplicate lists. */
function useCasesFor(data: RouteData): string[] {
  const cases: string[] = [];
  if (data.tags.includes("business")) cases.push("Business & corporate travel");
  cases.push("Family & group travel");
  if (data.tags.includes("umrah")) cases.push("Umrah & religious travel");
  if (data.tags.includes("tourism")) cases.push("Tourism & sightseeing");
  if (data.isCrossBorder || data.tags.includes("gcc")) cases.push("Cross-border GCC travel");
  if (data.origin.toLowerCase().includes("airport") || data.destination.toLowerCase().includes("airport")) {
    cases.push("Airport transfer");
  }
  return cases;
}

/** Matches a vehicle option's free-text name to a real fleet photo already
 * used elsewhere on the site (VehiclesSection.tsx/fleetConfig.ts) — no new
 * assets, no invented images. */
function vehicleImageFor(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("van")) return "/images/fleet-van.jpg";
  if (n.includes("suv")) return "/images/fleet-suv.jpg";
  if (n.includes("executive") || n.includes("premium") || n.includes("luxury")) return "/images/fleet-sedan2.jpg";
  return "/images/fleet-sedan.jpg";
}

/** If a route endpoint is an airport ("X Airport"), find that airport's own
 * hub page — real hrefs only, from the same AIRPORTS list AirportPage.tsx
 * uses, never a guessed slug. */
function airportPageFor(label: string): { name: string; code: string; pageHref: string } | undefined {
  if (!label.toLowerCase().includes("airport")) return undefined;
  const cityGuess = label.replace(/\s*Airport\s*/i, "").trim();
  const airport = AIRPORTS.find((a) => a.city.toLowerCase() === cityGuess.toLowerCase());
  return airport ? { name: airport.name, code: airport.code, pageHref: airport.pageHref } : undefined;
}

/** Related-services links computed from data.tags/isCrossBorder — every
 * href points at a page that already exists. */
function relatedServicesFor(data: RouteData): { href: string; label: string }[] {
  const links: { href: string; label: string }[] = [{ href: "/private-taxi", label: "Private Taxi" }];
  if (data.origin.toLowerCase().includes("airport") || data.destination.toLowerCase().includes("airport")) {
    links.push({ href: "/airport-transfers", label: "Airport Transfers" });
  }
  if (data.tags.includes("business")) links.push({ href: "/corporate-transportation-services", label: "Corporate Transportation" });
  if (data.tags.includes("umrah")) {
    links.push({ href: "/umrah-transport-package", label: "Umrah Transport Package" });
    links.push({ href: "/ziyarat-services-in-saudi-arabia", label: "Ziyarat Services" });
  }
  if (data.isCrossBorder) links.push({ href: "/border-crossing", label: "All Border Crossing Routes" });
  return links;
}

/** Related /services/[slug] city pages for this route's origin/destination —
 * uses fromSlug/toSlug against the real CityData list, never a guessed slug. */
function relatedCitiesFor(data: RouteData): { slug: string; city: string }[] {
  const slugs = [data.fromSlug, data.toSlug].filter((s): s is string => Boolean(s));
  return slugs
    .map((slug) => allCities.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .map((c) => ({ slug: c.slug, city: c.city }));
}

export default function RoutePage({ data, locale = 'en' }: { data: RouteData; locale?: Locale }) {
  const t = ui(locale);
  // Real fleet vehicles for this route, where it names any. Empty for the
  // routes still using the generic tier cards, which is what switches the
  // vehicle section between its two renderings.
  const namedVehicles = routeVehicles(data.vehicleSlugs);
  const schemas = [
    serviceSchema({
      name: `${data.origin} to ${data.destination} Taxi Service`,
      description: data.intro,
      url: `/${data.slug}`,
      areaServed: [data.origin, data.destination],
    }),
    faqSchema(data.faqs.map((f) => ({ question: f.q, answer: f.a }))),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      data.isCrossBorder ? { name: "Border Crossing", path: "/border-crossing" } : { name: "Routes", path: "/routes" },
      { name: data.breadcrumbLabel, path: `/${data.slug}` },
    ]),
  ];

  const reverseRoute = allRoutes.find((r) => r.slug === data.reverseSlug);
  /**
   * Where the reverse-route callout points.
   *
   * On an Arabic page this used to link to `/<slug>` — the English page,
   * introduced by an Arabic label. An Arabic visitor now goes to the Arabic
   * reciprocal wherever one exists, and falls back to English only where it
   * genuinely does not, which is still the honest destination because it is
   * the only version of that page there is.
   *
   * Existence is asked of AR_PAGE_SLUGS, not AR_ROUTES: two Arabic route
   * pages are hand-written rather than RouteData-driven, so AR_ROUTES does
   * not know them. AR_ROUTES is still what supplies Arabic endpoint names
   * when it has them.
   */
  const reverseArabicPage = reverseRoute !== undefined
    && locale === 'ar'
    && AR_PAGE_SLUGS.has(reverseRoute.slug);
  const reverseArabic = reverseRoute && locale === 'ar'
    ? AR_ROUTES.get(reverseRoute.slug)
    : undefined;
  const reverseHref = reverseRoute
    ? reverseArabicPage
      ? `/ar/${reverseRoute.slug}`
      : `/${reverseRoute.slug}`
    : '';
  /**
   * The endpoint names in the callout's own sentence.
   *
   * `reverseRoute` comes from allRoutes, which is the English data, so an
   * Arabic page was rendering its city names in English inside an Arabic
   * sentence — "اطّلع على خدمة Riyadh إلى Qatar". Where an Arabic twin
   * exists its own origin and destination are used. Where none does the
   * link goes to the English page, but the names in this Arabic sentence
   * still should not: arEndpointName supplies the Arabic form the site's
   * own reviewed copy already uses, and leaves anything it has no reviewed
   * name for in English rather than translating on the fly.
   *
   * Both branches read the direction off the route the href points at, so
   * the label cannot state a direction the target does not serve.
   */
  const reverseLabel = reverseRoute
    ? locale === 'ar'
      ? reverseArabic
        ? `${reverseArabic.origin} إلى ${reverseArabic.destination}`
        : `${arEndpointName(reverseRoute.origin)} إلى ${arEndpointName(reverseRoute.destination)}`
      : `${reverseRoute.origin} to ${reverseRoute.destination}`
    : '';
  const originAirport = locale === 'en' ? airportPageFor(data.origin) : null;
  const destinationAirport = locale === 'en' ? airportPageFor(data.destination) : null;
  // These blocks all point at English-only pages (city hubs, airport pages,
  // hotels, destination pages, guides, distance guides). On an Arabic page
  // they would be dead ends in the wrong language, so they are English-only
  // until those page families have Arabic versions of their own.
  const showEnglishOnlyLinks = locale === 'en';
  const relatedCities = showEnglishOnlyLinks ? relatedCitiesFor(data) : [];
  const routeDestination = showEnglishOnlyLinks ? destinationPageFor(data) : null;
  const routeGuide = showEnglishOnlyLinks ? ROUTE_GUIDE_MAP[data.slug] : undefined;
  const routeDistance = showEnglishOnlyLinks ? ROUTE_DISTANCE_MAP[data.slug] : undefined;
  // Data-driven — automatically picks up any hotel added for either endpoint
  // city later (Phase 19 internal-linking pass), no per-route hardcoding.
  const routeHotels = showEnglishOnlyLinks ? [
    ...(data.fromSlug ? hotelsForCity(data.fromSlug) : []),
    ...(data.toSlug ? hotelsForCity(data.toSlug) : []),
  ] : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main data-page-template="route">
        {/* Hero */}
        <section className="page-hero">
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <span className="section-eyebrow">{data.eyebrow}</span>
            <h1>{data.h1}</h1>
            {/* data.intro moved below the quick-booking form (booking-flow
                brief §1) so the form is visible at first glance; the text
                keeps its styling via .lead-intro. */}
            <div className="breadcrumb">
              <Link href="/">{t.home}</Link> /{" "}
              {data.isCrossBorder ? (
                <Link href="/border-crossing">{t.borderCrossing}</Link>
              ) : (
                <Link href="/routes">{t.routes}</Link>
              )}{" "}
              / <span>{data.breadcrumbLabel}</span>
            </div>
          </div>
        </section>

        {/* Route-specific WhatsApp CTA — the first action on the page.
            WhatsApp is where this business actually converts, and the
            message arrives naming the journey, so the customer types
            nothing and our team knows which route the enquiry came from. */}
        <section style={{ padding: "var(--space-8) 0 0" }}>
          <div className="container">
            <div style={{
              background: "var(--bg-subtle)",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-6)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--space-4)",
            }}>
              <div style={{ flex: "1 1 280px" }}>
                <p style={{ fontWeight: 800, fontSize: "var(--text-lg)", margin: 0 }}>
                  {t.whatsappLeadTitle(data.origin, data.destination)}
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", margin: "var(--space-2) 0 0" }}>
                  {hasPublishedPrice(data.pricing)
                    ? t.whatsappLeadPriced(priceLabel(data.pricing), directionLabel(data.pricing).toLowerCase())
                    : t.whatsappLeadQuote}
                </p>
              </div>
              <a
                href={routeWhatsAppLink(data)}
                className="btn btn-whatsapp btn-lg"
                target="_blank"
                rel="noopener noreferrer"
                data-wa-cta="hero"
              >
                <MessageIcon size={18} /> {t.whatsappQuote}
              </a>
            </div>
          </div>
        </section>

        {/* Journey at a glance — built from this route's own data, so a
            domestic route simply shows one fewer card than a cross-border
            one rather than an empty "Border: n/a". */}
        <section style={{ padding: "var(--space-8) 0 0" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "var(--space-3)",
            }}>
              {[
                { label: t.glanceRoute, value: `${data.origin} → ${data.destination}` },
                { label: t.glanceDistance, value: data.distance },
                { label: t.glanceDuration, value: data.durationHours ?? data.travelTime },
                data.isCrossBorder && data.borderCrossingName
                  ? { label: t.glanceBorder, value: data.borderCrossingName }
                  : null,
                { label: t.glanceTransfer, value: t.glanceTransferValue },
              ].filter(Boolean).map((cell) => {
                const c = cell as { label: string; value: string };
                return (
                  <div key={c.label} style={{
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius-lg)",
                    padding: "var(--space-4)",
                  }}>
                    <div style={{
                      fontSize: "var(--text-xs)", fontWeight: 700, letterSpacing: "0.06em",
                      textTransform: "uppercase", color: "var(--text-muted)",
                    }}>{c.label}</div>
                    <div style={{ fontWeight: 700, marginTop: "var(--space-2)", fontSize: "var(--text-sm)" }}>
                      {c.value}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Distance and duration are estimates, and saying so once here
                is better than hedging every figure individually. */}
            <p style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)", marginTop: "var(--space-3)" }}>
              {data.isCrossBorder ? t.glanceNoteBorder : t.glanceNote}
            </p>
          </div>
        </section>

        {/* Quick booking form — directly under the H1, with pickup/drop-off
            pre-filled from this route's own origin/destination and still
            editable (booking-flow brief §1/§2). */}
        <section style={{ padding: "var(--space-8) 0 0" }}>
          <div className="container">
            <QuickBookForm
              locale={locale}
              defaultFrom={data.origin}
              defaultTo={data.destination}
              heading={t.bookYourTransfer(data.origin, data.destination)}
              subheading={t.quickFormSubheading}
            />
          </div>
        </section>

        {/* Route summary, now below the form. */}
        <section style={{ padding: "var(--space-8) 0 0" }}>
          <div className="container">
            <p className="lead-intro">{data.intro}</p>
          </div>
        </section>

        {data.heroImage && (
          <section style={{ padding: "var(--space-8) 0 0" }}>
            <div className="container">
              <div style={{
                position: "relative",
                width: "100%",
                // With an explicit aspect the frame scales with the viewport
                // and the image is shown whole; without one it keeps the
                // original fixed band, so the other routes are untouched.
                ...(data.heroImageAspect
                  ? { aspectRatio: data.heroImageAspect }
                  : { height: "360px" }),
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                boxShadow: "var(--shadow-xl)",
              }}>
                <Image
                  src={data.heroImage}
                  alt={data.heroImageAlt ?? `${data.origin} to ${data.destination} taxi service`}
                  fill
                  // `contain` only where an aspect is set: the frame already
                  // matches the image, so there is nothing to crop, and it
                  // guarantees nothing is cut at any width.
                  style={{ objectFit: data.heroImageAspect ? "contain" : "cover" }}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority={false}
                />
              </div>
            </div>
          </section>
        )}

        {/* Quick facts strip — flat navy, no gradient; teal never fills a background. */}
        <section style={{ background: "var(--bg-dark)", padding: "1.75rem 0" }}>
          <div className="container">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-6)", justifyContent: "center", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--on-dark)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
                <MapPinIcon size={16} /> {data.distance}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--on-dark)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
                <ClockIcon size={16} /> {data.travelTime}
              </div>
              {data.borderCrossingName && (
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--on-dark)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
                  <GlobeIcon size={16} /> {data.borderCrossingName}
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--on-dark)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
                <ShieldIcon size={16} /> 24/7 Availability
              </div>
            </div>
          </div>
        </section>

        {/* The quick-booking form that used to sit here has moved up to
            directly below the H1 — see above. Not duplicated. */}

        {/* Journey visualization — lightweight text/chip chain, not an
            embedded map (no mapping dependency exists in the project, and
            adding one here would cost more than it's worth for a linear
            two/three-point journey). */}
        <section style={{ padding: "var(--space-8) 0 0" }}>
          <div className="container">
            <div className={styles.journeyPath}>
              <span className={styles.journeyPoint}>{data.origin}</span>
              <ArrowRightIcon size={18} className={styles.journeyArrow} />
              {data.isCrossBorder && data.borderCrossingName && (
                <>
                  <span className={`${styles.journeyPoint} ${styles.journeyBorder}`}>
                    <GlobeIcon size={14} /> {data.borderCrossingName}
                  </span>
                  <ArrowRightIcon size={18} className={styles.journeyArrow} />
                </>
              )}
              {data.stops?.map((s) => (
                <span key={s.name} style={{ display: "contents" }}>
                  <span className={styles.journeyPoint}>{s.name}</span>
                  <ArrowRightIcon size={18} className={styles.journeyArrow} />
                </span>
              ))}
              <span className={`${styles.journeyPoint} ${styles.journeyDestination}`}>{data.destination}</span>
            </div>
          </div>
        </section>

        {/* Reverse-route callout — computed from data.reverseSlug, only
            rendered once the target is confirmed live in allRoutes, so a
            forward reference to a not-yet-built page (see D5/W7) never
            ships as a broken link. */}
        {reverseRoute && (
          <section style={{ padding: "var(--space-6) 0 0" }}>
            <div className="container">
              <Link
                href={reverseHref}
                className="card"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap", padding: "var(--space-5) var(--space-8)" }}
              >
                <span style={{ color: "var(--text-body)", fontSize: "var(--text-base)" }}>
                  {t.reverseRoutePrefix} <strong style={{ color: "var(--accent)" }}>{reverseLabel}</strong>{t.reverseRouteSuffix}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)", color: "var(--accent)", fontWeight: 700, whiteSpace: "nowrap" }}>
                  {t.viewRoute} <ArrowRightIcon size={16} />
                </span>
              </Link>
            </div>
          </section>
        )}

        {/* Overview */}
        <section className="section-lg">
          <div className="container">
            <div className="grid-60-40">
              <div>
                <span className="section-eyebrow">{t.travelOverview}</span>
                <h2 className="section-title">{data.overviewTitle}</h2>
                {data.overviewParagraphs.map((p, i) => (
                  <p key={i} style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>{p}</p>
                ))}
                <div className={styles.useCaseRow}>
                  {useCasesFor(data).map((label) => (
                    <span key={label} className={styles.useCaseChip}>
                      <CheckCircleIcon size={14} /> {label}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                <div className="card">
                  <div className="card-icon"><CarIcon size={22} /></div>
                  <h3>{t.journeyDetails}</h3>
                  <p>Distance: <strong style={{ color: "var(--navy)" }}>{data.distance}</strong></p>
                  <p>{`${t.travelTimeLabel}: `}<strong style={{ color: "var(--navy)" }}>{data.travelTime}</strong></p>
                  {data.borderCrossingName && <p>Crossing: <strong style={{ color: "var(--navy)" }}>{data.borderCrossingName}</strong></p>}
                </div>
                <div className="card">
                  <div className="card-icon"><MapPinIcon size={22} /></div>
                  <h3>{t.pickupPoints}</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
                    {data.pickupPoints.map((pt, i) => (
                      <li key={i} style={{ color: "var(--text-body)", fontSize: "var(--text-sm)", display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
                        <span style={{ color: "var(--navy)" }}>›</span> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Airport Route Information — overview only; the dedicated airport
            page (linked below) owns the full terminal/meet-and-greet detail. */}
        {(originAirport || destinationAirport) && (
          <section className="section" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">{t.airport}</span>
                <h2 className="section-title">{t.airportInfo}</h2>
              </div>
              <div className="grid-2">
                {originAirport && (
                  <div className="card">
                    <div className="card-icon"><PlaneIcon size={22} /></div>
                    <h3>{originAirport.name} ({originAirport.code})</h3>
                    <p>Meet-and-greet pickup at arrivals, with flight tracking so a delayed landing doesn&apos;t mean a missed pickup. Your driver assists with luggage straight to the vehicle.</p>
                    <Link href={originAirport.pageHref} style={{ color: "var(--accent)", fontWeight: 600, fontSize: "var(--text-sm)" }}>
                      Full {originAirport.name} guide →
                    </Link>
                  </div>
                )}
                {destinationAirport && (
                  <div className="card">
                    <div className="card-icon"><PlaneIcon size={22} /></div>
                    <h3>{destinationAirport.name} ({destinationAirport.code})</h3>
                    <p>Direct drop-off at departures, timed around your flight&apos;s check-in window rather than a fixed pickup slot.</p>

                    <Link href={destinationAirport.pageHref} style={{ color: "var(--accent)", fontWeight: 600, fontSize: "var(--text-sm)" }}>
                      Full {destinationAirport.name} guide →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Stops & Rest Areas — only rendered where the route genuinely has
            a scheduled stop (long-distance corridors). */}
        {data.stops && data.stops.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">{t.journeyBreaks}</span>
                <h2 className="section-title">{t.stopsAlongTheWay}</h2>
              </div>
              <div className="grid-3">
                {data.stops.map((s) => (
                  <div key={s.name} className="card">
                    <div className="card-icon"><MapPinIcon size={22} /></div>
                    <h3>{s.name}</h3>
                    <p>{s.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Border process + documents */}
        {data.isCrossBorder && (
          <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
              <div className="grid-2">
                <div>
                  <span className="section-eyebrow">{t.crossingProcess}</span>
                  <h2 className="section-title">{data.borderProcessTitle}</h2>
                  {data.borderProcessParagraphs?.map((p, i) => (
                    <p key={i} style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-5)" }}>{p}</p>
                  ))}
                  <p style={{ color: "var(--text-body)", lineHeight: 1.8 }}>{data.dropoffInfo}</p>
                </div>
                <div style={{ border: "1px solid var(--gray-200)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
                  <div style={{ background: "var(--primary)", padding: "1.5rem", color: "var(--white)" }}>
                    <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{t.requiredDocuments}</h3>
                  </div>
                  <div style={{ padding: "2rem" }}>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      {data.documents.map((item, i) => (
                        <li key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", fontSize: "0.95rem", color: "var(--text-main)" }}>
                          <CheckCircleIcon size={18} style={{ color: "var(--secondary)", flexShrink: 0, marginTop: "2px" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)", marginTop: "var(--space-6)" }}>
                {t.borderDisclaimer}
                {data.lastReviewed && <> Page last reviewed: {data.lastReviewed}.</>}
              </p>
            </div>
          </section>
        )}

        {/* What's Included */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">{t.whatsIncluded}</span>
              <h2 className="section-title">Every {data.origin} to {data.destination} Booking Includes</h2>
            </div>
            <div className="grid-3">
              {includedItemsFor(data, t).map((item) => (
                <div key={item} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
                  <CheckCircleIcon size={20} style={{ color: "var(--success)", flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: "var(--text-body)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicle options.

            Two renderings, one section. A route that names real fleet
            vehicles (`vehicleSlugs`) gets a comparison built from
            FLEET_VEHICLES — real models, confirmed capacities, a per-vehicle
            WhatsApp CTA. Every other route keeps the generic tier cards it
            has always had, unchanged. */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">{t.chooseYourRide}</span>
              <h2 className="section-title">
                {namedVehicles.length > 0
                  ? t.vehiclesHeading(data.origin, data.destination)
                  : t.vehicleOptionsFor(data.origin, data.destination)}
              </h2>
              {namedVehicles.length > 0 && hasPublishedPrice(data.pricing) && (
                <p className="section-subtitle">{t.vehiclesSubheading}</p>
              )}
            </div>

            {namedVehicles.length > 0 ? (
              <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
                gap: "var(--space-6)",
                maxWidth: namedVehicles.length === 2 ? 820 : undefined,
                margin: "0 auto",
              }}>
                {namedVehicles.map((v) => (
                  <div key={v.slug} className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <div style={{
                      position: "relative", width: "100%", height: 190,
                      background: "var(--bg-subtle)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {v.image ? (
                        <Image
                          src={v.image}
                          alt={`${v.name} — ${data.origin} to ${data.destination} private transfer`}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 640px) 100vw, 420px"
                        />
                      ) : (
                        /* No photo of this exact model yet. A labelled
                           placeholder is honest; a stock photo of a
                           different car passed off as ours is not. */
                        <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "var(--space-4)" }}>
                          <CarIcon size={40} />
                          <div style={{ fontSize: "var(--text-xs)", marginTop: "var(--space-2)" }}>
                            {t.photoComingSoon}
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", flex: 1 }}>
                      <h3 style={{ color: "var(--text-main)", fontSize: "var(--text-xl)", marginBottom: "var(--space-3)" }}>{v.name}</h3>
                      <dl style={{ margin: 0, fontSize: "var(--text-sm)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "var(--space-2) 0", borderBottom: "1px solid var(--line)" }}>
                          <dt style={{ color: "var(--text-muted)" }}>{t.passengersLabel}</dt>
                          <dd style={{ margin: 0, fontWeight: 700 }}>{v.passengers}</dd>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "var(--space-2) 0", borderBottom: "1px solid var(--line)" }}>
                          <dt style={{ color: "var(--text-muted)" }}>{t.luggageLabel}</dt>
                          {/* Unconfirmed capacity says so, rather than
                              printing a number nobody has verified. */}
                          <dd style={{ margin: 0, fontWeight: v.luggage === undefined ? 400 : 700, color: v.luggage === undefined ? "var(--text-muted)" : undefined }}>
                            {v.luggage === undefined ? t.luggageUnknown : v.luggage}
                          </dd>
                        </div>
                        {hasPublishedPrice(data.pricing) && data.pricing.vehicleSlugs.includes(v.slug) && (
                          <div style={{ display: "flex", justifyContent: "space-between", padding: "var(--space-2) 0", borderBottom: "1px solid var(--line)" }}>
                            <dt style={{ color: "var(--text-muted)" }}>{t.pricingPriceCol}</dt>
                            <dd style={{ margin: 0, fontWeight: 800, color: "var(--navy)" }}>
                              {priceLabel(data.pricing)}
                            </dd>
                          </div>
                        )}
                      </dl>
                      <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", margin: "var(--space-3) 0 var(--space-5)" }}>
                        {t.bestForLabel}: {v.bestFor}
                      </p>
                      <a
                        href={routeWhatsAppLink(data, v.name)}
                        className="btn btn-whatsapp"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-wa-cta="vehicle-card"
                        style={{ marginTop: "auto", width: "100%", justifyContent: "center" }}
                      >
                        <MessageIcon size={16} /> {t.bookThisVehicle}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid-3">
                {data.vehicleOptions.map((v, i) => (
                  <div key={i} className="card" style={{ textAlign: "center", padding: 0, overflow: "hidden" }}>
                    <div style={{ position: "relative", width: "100%", height: 160 }}>
                      <Image
                        src={vehicleImageFor(v.name)}
                        alt={`${v.name} vehicle for the ${data.origin} to ${data.destination} route`}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div style={{ padding: "var(--space-6)" }}>
                      <h3 style={{ color: "var(--text-main)", fontSize: "var(--text-xl)" }}>{v.name}</h3>
                      <p style={{ color: "var(--navy)", fontWeight: 700, margin: "var(--space-2) 0" }}>{v.capacity}</p>
                      <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{v.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ textAlign: "center", marginTop: "var(--space-10)" }}>
              <Link href={`/book-online?from=${encodeURIComponent(data.origin)}&to=${encodeURIComponent(data.destination)}&mode=transfers`} className="btn btn-primary btn-lg">Book Now</Link>
            </div>
          </div>
        </section>

        {/* Fares — only where the business has confirmed one. A route
            without a confirmed fare renders nothing here rather than a
            placeholder or an estimate carried over from a similar route. */}
        {hasPublishedPrice(data.pricing) && (
          <section className="section" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
              <div className="section-header centered">
                <h2 className="section-title">{t.pricingHeading(data.origin, data.destination)}</h2>
                <p className="section-subtitle">{t.pricingSubheading}</p>
              </div>

              <div style={{ overflowX: "auto", maxWidth: 760, margin: "0 auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--bg-card)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
                  <thead>
                    <tr style={{ background: "var(--bg-dark)", color: "var(--on-dark)" }}>
                      <th style={{ padding: "var(--space-4)", textAlign: "start", fontSize: "var(--text-sm)" }}>{t.pricingVehicleCol}</th>
                      <th style={{ padding: "var(--space-4)", textAlign: "start", fontSize: "var(--text-sm)" }}>{t.pricingCapacityCol}</th>
                      <th style={{ padding: "var(--space-4)", textAlign: "start", fontSize: "var(--text-sm)" }}>{t.pricingPriceCol}</th>
                      <th style={{ padding: "var(--space-4)", textAlign: "start", fontSize: "var(--text-sm)" }}>{t.pricingBookCol}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {namedVehicles.map((v) => {
                      const covered = data.pricing!.vehicleSlugs.includes(v.slug);
                      return (
                        <tr key={v.slug} style={{ borderBottom: "1px solid var(--line)" }}>
                          <td style={{ padding: "var(--space-4)", fontWeight: 700 }}>{v.name}</td>
                          <td style={{ padding: "var(--space-4)" }}>{v.passengers}</td>
                          <td style={{ padding: "var(--space-4)", fontWeight: 800, color: "var(--navy)", whiteSpace: "nowrap" }}>
                            {covered ? priceLabel(data.pricing!) : t.requestQuote}
                          </td>
                          <td style={{ padding: "var(--space-4)" }}>
                            <a
                              href={routeWhatsAppLink(data, v.name)}
                              className="btn btn-whatsapp btn-sm"
                              target="_blank"
                              rel="noopener noreferrer"
                              data-wa-cta="pricing-table"
                            >
                              <MessageIcon size={14} /> {t.whatsappQuote}
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-4)" }}>
                {directionLabel(data.pricing)} · {t.priceConfirmedOn(data.pricing.confirmedOn)}
              </p>

              {/* What the fare does and does not cover, side by side, so
                  "no hidden fees" is a statement the page can back up. */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "var(--space-6)",
                marginTop: "var(--space-10)",
                maxWidth: 900,
                marginInline: "auto",
              }}>
                <div className="card">
                  <h3 style={{ fontSize: "var(--text-lg)", marginBottom: "var(--space-4)" }}>{t.includedHeading}</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-3)" }}>
                    {data.pricing.includes.map((item) => (
                      <li key={item} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start", fontSize: "var(--text-sm)" }}>
                        <CheckCircleIcon size={16} style={{ color: "var(--success, #10b981)", flexShrink: 0, marginTop: 3 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card">
                  <h3 style={{ fontSize: "var(--text-lg)", marginBottom: "var(--space-4)" }}>{t.notIncludedHeading}</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-3)" }}>
                    {data.pricing.excludes.map((item) => (
                      <li key={item} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
                        <span style={{ flexShrink: 0, marginTop: 1 }}>—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Pre-travel checklist — cross-border routes only. */}
        {data.checklist && data.checklist.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-header centered">
                <h2 className="section-title">{t.checklistHeading}</h2>
                <p className="section-subtitle">{t.checklistSubheading}</p>
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "var(--space-5)",
              }}>
                {data.checklist.map((item) => (
                  <div key={item.title} className="card">
                    <h3 style={{ fontSize: "var(--text-base)", marginBottom: "var(--space-2)" }}>{item.title}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", margin: 0 }}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How It Works */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">{t.howItWorks}</span>
              <h2 className="section-title">Booking Your {data.origin} to {data.destination} Transfer</h2>
            </div>
            <div className="grid-4">
              {howItWorksFor(t).map((step) => (
                <div key={step.n} style={{ textAlign: "center" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%", background: "var(--white)", color: "var(--navy)",
                    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto var(--space-4)",
                    fontWeight: 800, fontSize: "var(--text-xl)", fontFamily: "var(--font-heading)", border: "1px solid var(--line)",
                  }}>{step.n}</div>
                  <h3 style={{ fontSize: "var(--text-base)", marginBottom: "var(--space-2)" }}>{step.label}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Practical Travel Information */}
        {data.practicalInfo && data.practicalInfo.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">{t.goodToKnow}</span>
                <h2 className="section-title">{t.practicalInfo}</h2>
              </div>
              <div className="grid-3">
                {data.practicalInfo.map((item) => (
                  <div key={item.title} className="card">
                    <h3 style={{ fontSize: "var(--text-base)" }}>{item.title}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.7 }}>{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Reviews — only rendered where genuine, route-specific reviews
            exist; never padded with a generic quote. */}
        {data.reviews && data.reviews.length > 0 && (
          <section className="section" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">{t.customerReviews}</span>
                <h2 className="section-title">{t.whatTravellersSay}</h2>
              </div>
              <div className={styles.reviewGrid}>
                {data.reviews.map((r, i) => (
                  <div key={i} className="card">
                    <div style={{ display: "flex", gap: "var(--space-1)", marginBottom: "var(--space-3)", color: "var(--gold)" }}>★★★★★</div>
                    <p style={{ color: "var(--text-body)", fontStyle: "italic", lineHeight: 1.75, marginBottom: "var(--space-4)" }}>&ldquo;{r.text}&rdquo;</p>
                    <p style={{ color: "var(--text-main)", fontWeight: 600 }}>{r.name}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{r.origin} · {data.origin} → {data.destination}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">FAQ</span>
              <h2 className="section-title">{locale === 'ar' ? `${data.origin} إلى ${data.destination} — ${t.faqHeading}` : `${data.origin} to ${data.destination} — ${t.faqHeading}`}</h2>
            </div>
            <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {data.faqs.map((f, i) => (
                <div key={i} className="card" style={{ padding: "var(--space-6) var(--space-8)" }}>
                  <h3 style={{ color: "var(--navy)", fontSize: "var(--text-base)", marginBottom: "var(--space-3)" }}>{f.q}</h3>
                  <p style={{ color: "var(--text-body)", marginBottom: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related routes */}
        <RelatedLinks title={t.relatedRoutes} links={data.relatedRoutes} />

        {/* Related Cities, Airports, Hotels, Destination & Services */}
        <section className="section">
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-10)" }}>
              {relatedCities.length > 0 && (
                <div>
                  <h3 style={{ marginBottom: "var(--space-4)" }}>{t.relatedCities}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                    {relatedCities.map((c) => (
                      <Link key={c.slug} href={`/services/${c.slug}`} className="btn btn-outline-gold btn-sm">{c.city}</Link>
                    ))}
                  </div>
                </div>
              )}
              {(originAirport || destinationAirport) && (
                <div>
                  <h3 style={{ marginBottom: "var(--space-4)" }}>{t.relatedAirports}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                    {originAirport && <Link href={originAirport.pageHref} className="btn btn-outline-gold btn-sm">{originAirport.name}</Link>}
                    {destinationAirport && destinationAirport.code !== originAirport?.code && (
                      <Link href={destinationAirport.pageHref} className="btn btn-outline-gold btn-sm">{destinationAirport.name}</Link>
                    )}
                  </div>
                </div>
              )}
              {routeHotels.length > 0 && (
                <div>
                  <h3 style={{ marginBottom: "var(--space-4)" }}>{t.relatedHotels}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                    {routeHotels.map((h) => (
                      <Link key={h.slug} href={`/hotels/${h.citySlug}/${h.slug}`} className="btn btn-outline-gold btn-sm">{h.hotelName}</Link>
                    ))}
                  </div>
                </div>
              )}
              {routeDestination && (
                <div>
                  <h3 style={{ marginBottom: "var(--space-4)" }}>{t.relatedDestination}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                    <Link href={routeDestination.href} className="btn btn-outline-gold btn-sm">{routeDestination.name}</Link>
                  </div>
                </div>
              )}
              {routeGuide && (
                <div>
                  <h3 style={{ marginBottom: "var(--space-4)" }}>{t.travelGuide}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                    <Link href={routeGuide.href} className="btn btn-outline-gold btn-sm">{routeGuide.label}</Link>
                  </div>
                </div>
              )}
              {routeDistance && (
                <div>
                  <h3 style={{ marginBottom: "var(--space-4)" }}>{t.distanceAndTime}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                    <Link href={routeDistance.href} className="btn btn-outline-gold btn-sm">{routeDistance.label}</Link>
                  </div>
                </div>
              )}
              <div>
                <h3 style={{ marginBottom: "var(--space-4)" }}>{t.relatedServices}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                  {(showEnglishOnlyLinks ? relatedServicesFor(data) : []).map((l) => (
                    <Link key={l.href} href={l.href} className="btn btn-outline-gold btn-sm">{l.label}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "var(--bg-dark)", padding: "var(--space-20) 0", textAlign: "center" }}>
          <div className="container">
            <span className="section-eyebrow" style={{ background: "rgba(255,255,255,0.08)", borderColor: "var(--line-dark)", color: "var(--on-dark)" }}>Book Now</span>
            <h2 style={{ color: "var(--on-dark)", fontSize: "var(--text-4xl)", margin: "var(--space-4) 0" }}>{data.ctaText}</h2>
            <p style={{ color: "var(--on-dark-muted)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-8)" }}>
              {hasPublishedPrice(data.pricing)
                ? t.ctaBlurbPriced(priceLabel(data.pricing), directionLabel(data.pricing).toLowerCase(), data.origin, data.destination)
                : t.ctaBlurb(data.origin, data.destination)}
            </p>
            <p style={{ color: "var(--on-dark-muted)", fontSize: "var(--text-sm)", maxWidth: 560, margin: "0 auto var(--space-6)" }}>
              {t.ctaReminder}
            </p>
            <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
              {/* Primary (navy) leads, WhatsApp (green, functional channel)
                  follows as secondary — matching every other page family's
                  closing CTA. WhatsApp previously wore the primary navy
                  class here, with Book Online demoted to an outline button. */}
              <Link href={locale === 'ar' ? "/ar/book-online" : "/book-online"} className="btn btn-primary btn-lg">{t.bookOnline}</Link>
              <a
                href={routeWhatsAppLink(data)}
                className="btn btn-whatsapp btn-lg"
                target="_blank"
                rel="noopener noreferrer"
                data-wa-cta="closing-cta"
              >
                <MessageIcon size={18} /> {t.whatsappQuote}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
