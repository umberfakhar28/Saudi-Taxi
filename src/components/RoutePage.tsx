import Link from "next/link";
import Image from "next/image";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import {
  CheckCircleIcon, MapPinIcon, CarIcon, ClockIcon, ShieldIcon, MessageIcon, GlobeIcon, ArrowRightIcon,
  PlaneIcon,
} from "@/components/Icons";
import RelatedLinks from "@/components/RelatedLinks";
import { WHATSAPP_URL, TEL_URL, PHONE_DISPLAY, waLink } from "@/lib/contact";
// Value import (not just the RouteData type) so the reverse-route callout
// below can confirm `reverseSlug` resolves to a real, live page before
// linking to it — reverseSlug is allowed to forward-reference a route that
// doesn't exist yet (see the field's doc comment), so this check is what
// keeps that safe instead of shipping a broken link.
import { allRoutes } from "@/lib/routeData";
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
}

/** Always-true service inclusions, not per-route — the border-crossing item
 * only appears for routes that actually cross one. */
function includedItemsFor(data: RouteData): string[] {
  const items = [
    "Private vehicle, exclusively for your group",
    "Professional, licensed driver",
    "Door-to-door pickup and drop-off",
    "Route coordination and flight/schedule tracking",
    "Luggage assistance",
  ];
  if (data.isCrossBorder) items.push("Border-crossing support and document guidance");
  return items;
}

/** Same 5-step flow the booking widget and WhatsApp path already follow. */
const HOW_IT_WORKS = [
  { n: "1", label: "Request Your Route", text: "Share your pickup point, destination, date and passenger count." },
  { n: "2", label: "Confirm Trip Details", text: "We confirm vehicle, driver and route before you travel." },
  { n: "3", label: "Booking Confirmation", text: "You receive your driver and vehicle details ahead of pickup." },
  { n: "4", label: "Driver Pickup", text: "Your driver meets you at the agreed location, on time." },
  { n: "5", label: "Destination Drop-off", text: "A direct, private journey to your exact destination." },
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

export default function RoutePage({ data }: { data: RouteData }) {
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
  const originAirport = airportPageFor(data.origin);
  const destinationAirport = airportPageFor(data.destination);
  const relatedCities = relatedCitiesFor(data);
  const routeDestination = destinationPageFor(data);
  // Data-driven — automatically picks up any hotel added for either endpoint
  // city later (Phase 19 internal-linking pass), no per-route hardcoding.
  const routeHotels = [
    ...(data.fromSlug ? hotelsForCity(data.fromSlug) : []),
    ...(data.toSlug ? hotelsForCity(data.toSlug) : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main>
        {/* Hero */}
        <section className="page-hero">
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <span className="section-eyebrow">{data.eyebrow}</span>
            <h1>{data.h1}</h1>
            <p>{data.intro}</p>
            <div className="breadcrumb">
              <Link href="/">Home</Link> /{" "}
              {data.isCrossBorder ? (
                <Link href="/border-crossing">Border Crossing</Link>
              ) : (
                <Link href="/routes">Routes</Link>
              )}{" "}
              / <span>{data.breadcrumbLabel}</span>
            </div>
          </div>
        </section>

        {data.heroImage && (
          <section style={{ padding: "var(--space-8) 0 0" }}>
            <div className="container">
              <div style={{
                position: "relative",
                width: "100%",
                height: "360px",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                boxShadow: "var(--shadow-xl)",
              }}>
                <Image
                  src={data.heroImage}
                  alt={`${data.origin} to ${data.destination} taxi service`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority={false}
                />
              </div>
            </div>
          </section>
        )}

        {/* Quick facts strip */}
        <section style={{ background: "linear-gradient(135deg, var(--accent-dark), var(--accent))", padding: "1.75rem 0" }}>
          <div className="container">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-6)", justifyContent: "center", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--accent-on-light)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
                <MapPinIcon size={16} /> {data.distance}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--accent-on-light)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
                <ClockIcon size={16} /> {data.travelTime}
              </div>
              {data.borderCrossingName && (
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--accent-on-light)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
                  <GlobeIcon size={16} /> {data.borderCrossingName}
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--accent-on-light)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
                <ShieldIcon size={16} /> 24/7 Availability
              </div>
            </div>
          </div>
        </section>

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
                href={`/${reverseRoute.slug}`}
                className="card"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap", padding: "var(--space-5) var(--space-8)" }}
              >
                <span style={{ color: "var(--text-body)", fontSize: "var(--text-base)" }}>
                  Traveling the other way? See our <strong style={{ color: "var(--accent)" }}>{reverseRoute.origin} to {reverseRoute.destination}</strong> taxi service.
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)", color: "var(--accent)", fontWeight: 700, whiteSpace: "nowrap" }}>
                  View route <ArrowRightIcon size={16} />
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
                <span className="section-eyebrow">Travel Overview</span>
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
                  <h3>Journey Details</h3>
                  <p>Distance: <strong style={{ color: "var(--accent)" }}>{data.distance}</strong></p>
                  <p>Travel time: <strong style={{ color: "var(--accent)" }}>{data.travelTime}</strong></p>
                  {data.borderCrossingName && <p>Crossing: <strong style={{ color: "var(--accent)" }}>{data.borderCrossingName}</strong></p>}
                </div>
                <div className="card">
                  <div className="card-icon"><MapPinIcon size={22} /></div>
                  <h3>Pickup Points</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
                    {data.pickupPoints.map((pt, i) => (
                      <li key={i} style={{ color: "var(--text-body)", fontSize: "var(--text-sm)", display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
                        <span style={{ color: "var(--accent)" }}>›</span> {pt}
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
                <span className="section-eyebrow">Airport</span>
                <h2 className="section-title">Airport Information for This Route</h2>
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
                <span className="section-eyebrow">Journey Breaks</span>
                <h2 className="section-title">Stops Along the Way</h2>
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
                  <span className="section-eyebrow">Crossing Process</span>
                  <h2 className="section-title">{data.borderProcessTitle}</h2>
                  {data.borderProcessParagraphs?.map((p, i) => (
                    <p key={i} style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-5)" }}>{p}</p>
                  ))}
                  <p style={{ color: "var(--text-body)", lineHeight: 1.8 }}>{data.dropoffInfo}</p>
                </div>
                <div style={{ border: "1px solid var(--gray-200)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
                  <div style={{ background: "var(--primary)", padding: "1.5rem", color: "var(--white)" }}>
                    <h3 style={{ margin: 0, fontSize: "1.2rem" }}>Required Documents Checklist</h3>
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
                Border and document requirements can change — always verify current entry requirements with the relevant embassy or border authority before you travel.
                {data.lastReviewed && <> Page last reviewed: {data.lastReviewed}.</>}
              </p>
            </div>
          </section>
        )}

        {/* What's Included */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">What&apos;s Included</span>
              <h2 className="section-title">Every {data.origin} to {data.destination} Booking Includes</h2>
            </div>
            <div className="grid-3">
              {includedItemsFor(data).map((item) => (
                <div key={item} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
                  <CheckCircleIcon size={20} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: "var(--text-body)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicle options */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Choose Your Ride</span>
              <h2 className="section-title">Vehicle Options for {data.origin} to {data.destination}</h2>
            </div>
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
                    <p style={{ color: "var(--accent)", fontWeight: 700, margin: "var(--space-2) 0" }}>{v.capacity}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{v.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "var(--space-10)" }}>
              <Link href="/quote" className="btn btn-primary btn-lg">Get a Quote for This Route</Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">How It Works</span>
              <h2 className="section-title">Booking Your {data.origin} to {data.destination} Transfer</h2>
            </div>
            <div className="grid-4">
              {HOW_IT_WORKS.map((step) => (
                <div key={step.n} style={{ textAlign: "center" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%", background: "var(--accent-subtle)", color: "var(--accent-primary)",
                    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto var(--space-4)",
                    fontWeight: 800, fontSize: "var(--text-xl)", fontFamily: "var(--font-heading)", border: "1px solid rgba(12,32,122,0.18)",
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
                <span className="section-eyebrow">Good to Know</span>
                <h2 className="section-title">Practical Information for This Route</h2>
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
                <span className="section-eyebrow">Customer Reviews</span>
                <h2 className="section-title">What Travelers Say About This Route</h2>
              </div>
              <div className={styles.reviewGrid}>
                {data.reviews.map((r, i) => (
                  <div key={i} className="card">
                    <div style={{ display: "flex", gap: "var(--space-1)", marginBottom: "var(--space-3)", color: "var(--accent)" }}>★★★★★</div>
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
              <h2 className="section-title">{data.origin} to {data.destination} — Frequently Asked Questions</h2>
            </div>
            <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {data.faqs.map((f, i) => (
                <div key={i} className="card" style={{ padding: "var(--space-6) var(--space-8)" }}>
                  <h3 style={{ color: "var(--accent)", fontSize: "var(--text-base)", marginBottom: "var(--space-3)" }}>{f.q}</h3>
                  <p style={{ color: "var(--text-body)", marginBottom: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related routes */}
        <RelatedLinks title="Related Routes You May Need" links={data.relatedRoutes} />

        {/* Related Cities, Airports, Hotels, Destination & Services */}
        <section className="section">
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-10)" }}>
              {relatedCities.length > 0 && (
                <div>
                  <h3 style={{ marginBottom: "var(--space-4)" }}>Related Cities</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                    {relatedCities.map((c) => (
                      <Link key={c.slug} href={`/services/${c.slug}`} className="btn btn-outline-gold btn-sm">{c.city}</Link>
                    ))}
                  </div>
                </div>
              )}
              {(originAirport || destinationAirport) && (
                <div>
                  <h3 style={{ marginBottom: "var(--space-4)" }}>Related Airports</h3>
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
                  <h3 style={{ marginBottom: "var(--space-4)" }}>Related Hotels</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                    {routeHotels.map((h) => (
                      <Link key={h.slug} href={`/hotels/${h.citySlug}/${h.slug}`} className="btn btn-outline-gold btn-sm">{h.hotelName}</Link>
                    ))}
                  </div>
                </div>
              )}
              {routeDestination && (
                <div>
                  <h3 style={{ marginBottom: "var(--space-4)" }}>Related Destination</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                    <Link href={routeDestination.href} className="btn btn-outline-gold btn-sm">{routeDestination.name}</Link>
                  </div>
                </div>
              )}
              <div>
                <h3 style={{ marginBottom: "var(--space-4)" }}>Related Services</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                  {relatedServicesFor(data).map((l) => (
                    <Link key={l.href} href={l.href} className="btn btn-outline-gold btn-sm">{l.label}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "linear-gradient(135deg, var(--bg-dark), var(--accent-dark))", padding: "var(--space-20) 0", textAlign: "center" }}>
          <div className="container">
            <span className="section-eyebrow">Book Now</span>
            <h2 style={{ color: "var(--white)", fontSize: "var(--text-4xl)", margin: "var(--space-4) 0" }}>{data.ctaText}</h2>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-8)" }}>
              Fixed rates, professional drivers, and 24/7 availability for {data.origin} to {data.destination}.
            </p>
            <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={WHATSAPP_URL} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
                <MessageIcon size={18} /> WhatsApp Quote
              </a>
              <Link href="/book-online" className="btn btn-outline btn-lg">Book Online</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
