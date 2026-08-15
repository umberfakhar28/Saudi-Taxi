import Link from "next/link";
import Image from "next/image";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { AIRPORTS } from "@/lib/airportRoutesData";
import { FLEET_TIERS } from "@/lib/fleetConfig";
import {
  WhatsAppIcon, ChevronRightIcon, PlaneIcon, MapPinIcon, CalendarIcon,
  ClockIcon, CarIcon, ShieldCheckIcon, HotelIcon, CheckCircleIcon,
  BriefcaseIcon, MoonIcon,
} from "@/components/Icons";
import { waLink } from "@/lib/contact";
import DestinationEnquiryForm from "@/components/DestinationEnquiryForm";
import styles from "./CityServicePage.module.css";

export interface CityData {
  slug: string;
  city: string;
  h1: string;
  region: string;
  intro: string;
  whyVisit: string;
  challenge: string;
  benefit: string;
  airport?: { name: string; code: string; distance: string };
  /** 2-3 sibling destinations this city is commonly paired with, for one
   * contextual "nearby destinations" sentence — not a link list. */
  nearbyCities: { city: string; slug: string }[];
  popularRoutes: { from: string; to: string; time: string; href?: string }[];
  pickupPoints: string[];
  faqs: { q: string; a: string }[];
  reviews: { name: string; origin: string; text: string }[];
  heroImage?: string;
  /** Alt text for heroImage — falls back to a generic "{city} skyline"
   * description when omitted. Also reused as the Sightseeing cards' image
   * (the project has no per-landmark photography yet), so it should read
   * naturally as a general representation of the city. */
  heroImageAlt?: string;

  /** 3-5 real, city-specific landmarks — breaks the six-field formula every
   * city hub previously shared (Execution Brief v3 W5). Facts only, no
   * pricing (ground rule 9) — these are sightseeing notes, not tour ads. */
  landmarks: { name: string; description: string }[];
  /** One paragraph about a season, event, or travel pattern that's actually
   * specific to this city — not a generic "book ahead for holidays" line
   * that would read the same on every city page. */
  seasonalNote: string;

  // --- Phase 1 City Template additions (standardization pass) — all
  // optional so every field degrades gracefully instead of forcing a
  // section into a city where it doesn't genuinely apply. Each is real,
  // city-specific content, not a templated find/replace of the city name. ---
  /** Real districts/areas actually covered, each with one sentence of
   * genuine context — richer than `pickupPoints` (kept as-is for the
   * existing right-rail card) and powers its own dedicated section. */
  serviceAreas?: { name: string; note: string; href?: string }[];
  /** Hotel/accommodation districts served — deliberately district-level
   * rather than named-property partnership claims that can't be verified. */
  hotelZones?: { name: string; note: string }[];
  /** One extra sentence of airport-experience context, only rendered for
   * cities that already have a real `airport` field. */
  airportNote?: string;
  /** Present only where corporate/business travel is a genuine use case for
   * this city — omitted entirely elsewhere rather than padded in. */
  businessTravel?: { intro: string; areas: { name: string; note: string }[] };
  /** Present only where Umrah/Ziyarat travel is genuinely relevant to this
   * city — links out to the dedicated service pages instead of duplicating
   * their content here. */
  religiousTravel?: { intro: string; links: { href: string; label: string }[] };
  /** 3 practical, non-invented travel considerations specific to this city
   * (traffic patterns, airport quirks, family/luggage notes, etc.). */
  practicalInfo?: { title: string; note: string }[];

  // --- Execution Brief v3 D1 additions (RouteData's reverseSlug/fromSlug/
  // toSlug don't apply here — nearbyCities already covers the relational
  // side for location pages) ---
  /** Commercial-intent tags — drives nav curation (config/navigation.ts, W9)
   * and the gap-analysis groupings in docs/page-gap-analysis.md. */
  tags: ("umrah" | "airport" | "business" | "gcc" | "tourism")[];
  /** 1 = top commercial intent, 2 = secondary/long-tail. */
  priority: 1 | 2;
  /** Arabic mirror of the page-critical strings. Omitted (not machine-
   * translated as a placeholder) until a human writes it — see D3/W10. */
  ar?: {
    h1: string;
    intro: string;
  };
  /** Defaults to true when omitted — every pre-existing entry here is
   * already live, human-written content. New W7 drafts start explicitly
   * `false` until a human reviews them (see scripts/seo/check-data-layer.js). */
  reviewed?: boolean;
  /** Defaults to true when omitted (matches current sitewide behavior).
   * Wired into config/navigation.ts in W9 — setting it now is prep, not yet
   * functional. */
  showInNav?: boolean;
}

const FALLBACK_HERO_IMAGE = "/hero-slider/saudi-arabia-luxury-chauffeur-service.webp";

/** Pre-fills the multi-step booking flow — same query-param contract
 * BookOnlineClient.tsx already reads from the homepage search bar and every
 * vehicle "Book Now" button, so a rider lands straight on Trip Details with
 * their route filled in instead of an empty form. */
function bookingHref({ from, to }: { from?: string; to?: string }): string {
  const params = new URLSearchParams({ mode: "transfers" });
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  return `/book-online?${params.toString()}`;
}

/** Sitewide, always-true claims — not per-city, so nothing here can drift
 * out of sync with reality on a per-page basis. No fleet counts, response
 * times or certifications — only what the booking flow itself supports. */
const TRUST_STRIP = [
  { icon: ClockIcon, label: "24/7 Availability" },
  { icon: CarIcon, label: "Private, Point-to-Point Rides" },
  { icon: PlaneIcon, label: "Airport Meet & Greet" },
  { icon: MapPinIcon, label: "City-to-City Transfers" },
  { icon: ShieldCheckIcon, label: "Professional Drivers" },
  { icon: HotelIcon, label: "Door-to-Door Service" },
];

/** Same 5-step flow the booking widget and WhatsApp path already follow —
 * described here, not reinvented. */
const HOW_IT_WORKS = [
  { n: "1", label: "Request Your Ride", text: "Share your pickup, drop-off, date and passenger count via the form or WhatsApp." },
  { n: "2", label: "Confirm Trip Details", text: "We confirm your vehicle and a fixed price before you travel — no surprises later." },
  { n: "3", label: "Booking Confirmation", text: "You receive your driver and vehicle details ahead of pickup." },
  { n: "4", label: "Driver Pickup", text: "Your driver meets you at the agreed point, with flight tracking for airport arrivals." },
  { n: "5", label: "Comfortable Transfer", text: "A direct, private transfer to your destination — no shared stops." },
];

/** Use-case chips computed from data already on every city (tags, airport,
 * landmarks, routes) rather than 16 hand-written near-duplicate lists. */
function useCasesFor(data: CityData): string[] {
  const cases: string[] = ["Hotel & door-to-door transfers", "Family & group travel"];
  if (data.airport) cases.push("Airport arrivals & departures");
  if (data.tags.includes("business")) cases.push("Business & corporate travel");
  if (data.landmarks.length > 0) cases.push("Sightseeing & day trips");
  if (data.popularRoutes.length > 0) cases.push("Intercity travel");
  if (data.tags.includes("umrah")) cases.push("Umrah & religious travel");
  if (data.tags.includes("gcc")) cases.push("Cross-border GCC travel");
  return cases;
}

/** City-tour pages that genuinely exist — only these 3 slugs get a
 * "City Tours" related-service link, so the section never points at a
 * page that doesn't exist for the other 13 cities. */
const TOUR_PAGE_BY_SLUG: Record<string, string> = {
  jeddah: "/jeddah-city-tour-services-in-saudi-arabia",
  alula: "/reliable-alula-tour-taxi-service-in-saudi-arabia",
  taif: "/taif-ziyarat-taxi-service",
};

/** Related-services links computed from data.tags/airport — every href
 * points at a page that already exists (see docs/page-inventory.md); none
 * are invented for this pass. */
function relatedServicesFor(data: CityData): { href: string; label: string }[] {
  const links: { href: string; label: string }[] = [];
  if (data.airport) links.push({ href: "/airport-transfers", label: "Airport Transfers" });
  links.push({ href: "/hotel-transfers", label: "Hotel Transfers" });
  links.push({ href: "/private-taxi", label: "Private Taxi" });
  if (data.tags.includes("business")) links.push({ href: "/corporate-transportation-services", label: "Corporate Transportation" });
  if (data.tags.includes("umrah")) {
    links.push({ href: "/umrah-transport-package", label: "Umrah Transport Package" });
    links.push({ href: "/ziyarat-services-in-saudi-arabia", label: "Ziyarat Services" });
  }
  if (TOUR_PAGE_BY_SLUG[data.slug]) links.push({ href: TOUR_PAGE_BY_SLUG[data.slug], label: "City Tours" });
  return links;
}

export default function CityServicePage({ data }: { data: CityData }) {
  const heroImage = data.heroImage ?? FALLBACK_HERO_IMAGE;
  const heroImageAlt = data.heroImageAlt ?? `${data.city} skyline, Saudi Arabia — private taxi and chauffeur service`;
  const airportInfo = data.airport ? AIRPORTS.find((a) => a.code === data.airport!.code) : undefined;
  const quoteMessage = `Hello GulfTripService, I would like to get a quote for your transportation service in ${data.city}. Please share the available options, pricing, and booking details. Thank you.`;

  const schemas = [
    serviceSchema({
      name: `Taxi Service in ${data.city}`,
      description: `Professional taxi and chauffeur services in ${data.city}, ${data.region}. Airport transfers, intercity travel, hotel transfers, and corporate transportation.`,
      url: `/services/${data.slug}`,
      areaServed: [data.city],
    }),
    faqSchema(data.faqs.map((f) => ({ question: f.q, answer: f.a }))),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/our-services" },
      { name: `${data.city} Taxi Service`, path: `/services/${data.slug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main>
        {/* Hero — city photo background with a navy scrim for text contrast,
            same photo+scrim language as /destinations pages. */}
        <section className={styles.hero}>
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroScrim} />
          <div className={`container ${styles.heroContent}`}>
            <span className="badge" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: "var(--white)" }}>
              Taxi &amp; Chauffeur Service
            </span>
            <h1>{data.h1}</h1>
            <p>{data.intro}</p>
            <div className={styles.heroBreadcrumb}>
              <Link href="/">Home</Link>
              <ChevronRightIcon size={12} style={{ display: "inline", verticalAlign: "middle" }} />
              <Link href="/our-services">Services</Link>
              <ChevronRightIcon size={12} style={{ display: "inline", verticalAlign: "middle" }} />
              <span>{data.city}</span>
            </div>
          </div>
        </section>

        {/* Trust / quick-facts strip — sitewide, always-true claims only
            (TRUST_STRIP), so nothing here can go stale per city. */}
        <section className={styles.trustStrip}>
          <div className="container">
            <div className={styles.trustRow}>
              {TRUST_STRIP.map((t) => (
                <div key={t.label} className={styles.trustItem}>
                  <t.icon size={18} />
                  <span>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking / lead form — destination preselected, right below the
            hero so conversion doesn't require scrolling past the fold. */}
        <section className="section-lg" style={{ paddingTop: "var(--space-10)" }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <DestinationEnquiryForm
              destinationName={data.city}
              countryName="Saudi Arabia"
              sourcePage={`/services/${data.slug}`}
            />
          </div>
        </section>

        {/* Why Visit + right-rail info cards */}
        <section className="section-lg" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className={styles.infoRail}>
              <div>
                <span className="section-eyebrow">Destination</span>
                <h2 className="section-title">Why Travelers Visit {data.city}</h2>
                <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>{data.whyVisit}</p>
                <h3 style={{ color: "var(--text-main)", marginBottom: "var(--space-4)", fontSize: "var(--text-xl)" }}>Transportation in {data.city}</h3>
                <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>{data.challenge}</p>
                <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: data.nearbyCities.length ? "var(--space-6)" : 0 }}>{data.benefit}</p>
                {data.nearbyCities.length > 0 && (
                  <p style={{ color: "var(--text-body)", lineHeight: 1.8 }}>
                    Many riders combine {data.city} with a trip to{" "}
                    {data.nearbyCities.map((n, i) => (
                      <span key={n.slug}>
                        {i > 0 && (i === data.nearbyCities.length - 1 ? " or " : ", ")}
                        <Link href={`/services/${n.slug}`} style={{ color: "var(--accent)", fontWeight: 600 }}>{n.city}</Link>
                      </span>
                    ))}
                    , both reachable with the same driver and vehicle.
                  </p>
                )}
                <div className={styles.useCaseRow}>
                  {useCasesFor(data).map((label) => (
                    <span key={label} className={styles.useCaseChip}>
                      <CheckCircleIcon size={14} /> {label}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.infoRailCards}>
                {data.airport && (
                  <div className="card">
                    <div className="card-icon"><PlaneIcon size={24} /></div>
                    <h3>{data.airport.name}</h3>
                    <p>IATA: <strong style={{ color: "var(--accent)" }}>{data.airport.code}</strong></p>
                    <p>City distance: {data.airport.distance}</p>
                    <Link
                      href={airportInfo?.pageHref ?? bookingHref({ from: data.airport.name, to: data.city })}
                      className="btn btn-secondary"
                      style={{ marginTop: "var(--space-4)" }}
                    >
                      Book Airport Transfer
                    </Link>
                  </div>
                )}
                <div className="card">
                  <div className="card-icon"><MapPinIcon size={24} /></div>
                  <h3>Popular Pickup Points</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
                    {data.pickupPoints.map((pt, i) => (
                      <li key={i} style={{ color: "var(--text-body)", fontSize: "var(--text-sm)", display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
                        <span style={{ color: "var(--accent)" }}>›</span> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card" style={{ background: "var(--bg-subtle)" }}>
                  <div className="card-icon"><CalendarIcon size={24} /></div>
                  <h3>Good to Know</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.7 }}>{data.seasonalNote}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Coverage / Pickup Areas — richer than the right-rail
            pickup-points card; each area gets real context and, where a
            page already exists for it, a link. */}
        {data.serviceAreas && data.serviceAreas.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Coverage</span>
                <h2 className="section-title">Areas We Cover in {data.city}</h2>
              </div>
              <div className="grid-3">
                {data.serviceAreas.map((area) => (
                  <div key={area.name} className="card">
                    <div className="card-icon"><MapPinIcon size={22} /></div>
                    <h3>{area.name}</h3>
                    <p>{area.note}</p>
                    {area.href && (
                      <Link href={area.href} style={{ color: "var(--accent)", fontWeight: 600, fontSize: "var(--text-sm)" }}>
                        Learn more →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Airport Connections — overview only; the dedicated airport page
            (linked below) owns the full terminal/meet-and-greet detail. */}
        {data.airport && (
          <section className="section" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
              <div className="grid-60-40">
                <div>
                  <span className="section-eyebrow">Airport</span>
                  <h2 className="section-title">{data.city} Airport Transfers</h2>
                  <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>
                    {data.airportNote ?? `${data.airport.name} (${data.airport.code}) is the main air gateway to ${data.city}, ${data.airport.distance.toLowerCase().startsWith("within") ? data.airport.distance.toLowerCase() : `about ${data.airport.distance.toLowerCase()}`}. We track your flight and meet you at arrivals for a direct transfer into the city.`}
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
                    {[
                      `${data.airport.name} to ${data.city} hotels`,
                      "Airport to nearby cities and connecting routes",
                      "Return hotel-to-airport transfers for departures",
                    ].map((item) => (
                      <li key={item} style={{ display: "flex", gap: "var(--space-2)", alignItems: "flex-start", color: "var(--text-body)" }}>
                        <CheckCircleIcon size={16} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 3 }} /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={airportInfo?.pageHref ?? bookingHref({ from: data.airport.name, to: data.city })} className="btn btn-secondary">
                    Full {data.airport.name} Guide
                  </Link>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                  {data.popularRoutes
                    .filter((r) => r.from.toLowerCase().includes("airport") || r.to.toLowerCase().includes("airport"))
                    .slice(0, 3)
                    .map((r, i) => {
                      const content = (
                        <>
                          <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-1)" }}>{r.from} → {r.to}</p>
                          <p style={{ color: "var(--accent)", fontWeight: 700 }}>⏱ {r.time}</p>
                        </>
                      );
                      return r.href ? (
                        <Link key={i} href={r.href} className="card" style={{ padding: "var(--space-5) var(--space-6)" }}>{content}</Link>
                      ) : (
                        <div key={i} className="card" style={{ padding: "var(--space-5) var(--space-6)" }}>{content}</div>
                      );
                    })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Hotels & Accommodation Areas — district-level, not named-property
            partnership claims we can't verify. */}
        {data.hotelZones && data.hotelZones.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Accommodation</span>
                <h2 className="section-title">Hotel &amp; Accommodation Areas We Serve</h2>
              </div>
              <div className="grid-3">
                {data.hotelZones.map((zone) => (
                  <div key={zone.name} className="card">
                    <div className="card-icon"><HotelIcon size={22} /></div>
                    <h3>{zone.name}</h3>
                    <p>{zone.note}</p>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: "var(--space-8)" }}>
                <Link href="/hotel-transfers" className="btn btn-outline-gold">All Hotel Transfer Services</Link>
              </div>
            </div>
          </section>
        )}

        {/* Sightseeing — image + title + description + CTA cards */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Sightseeing</span>
              <h2 className="section-title">Landmarks Worth Seeing in {data.city}</h2>
            </div>
            <div className={styles.sightGrid}>
              {data.landmarks.map((l) => (
                <div key={l.name} className={styles.sightCard}>
                  <div className={styles.sightImageWrap}>
                    <Image
                      src={heroImage}
                      alt={`${data.city}, Saudi Arabia — near ${l.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={styles.sightImage}
                    />
                  </div>
                  <div className={styles.sightBody}>
                    <h3 className={styles.sightTitle}>{l.name}</h3>
                    <p className={styles.sightDesc}>{l.description}</p>
                    <Link href={bookingHref({ to: `${l.name}, ${data.city}` })} className={styles.sightCta}>
                      Book Your Ride
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Business & Corporate Travel — only rendered where genuinely
            relevant (data.businessTravel present), not forced onto every city. */}
        {data.businessTravel && (
          <section className="section" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Business Travel</span>
                <h2 className="section-title">Corporate Transportation in {data.city}</h2>
              </div>
              <p style={{ color: "var(--text-body)", lineHeight: 1.8, maxWidth: 760, margin: "0 auto var(--space-8)", textAlign: "center" }}>
                {data.businessTravel.intro}
              </p>
              <div className="grid-3">
                {data.businessTravel.areas.map((area) => (
                  <div key={area.name} className="card">
                    <div className="card-icon"><BriefcaseIcon size={22} /></div>
                    <h3>{area.name}</h3>
                    <p>{area.note}</p>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: "var(--space-8)" }}>
                <Link href="/corporate-transportation-services" className="btn btn-outline-gold">Corporate Transportation Services</Link>
              </div>
            </div>
          </section>
        )}

        {/* Religious Travel — only rendered where genuinely relevant
            (data.religiousTravel present); links to the dedicated Umrah/
            Ziyarat pages rather than duplicating their content. */}
        {data.religiousTravel && (
          <section className="section">
            <div className="container" style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
              <MoonIcon size={32} style={{ color: "var(--accent)", marginBottom: "var(--space-4)" }} />
              <span className="section-eyebrow">Religious Travel</span>
              <h2 className="section-title" style={{ textAlign: "center" }}>Umrah &amp; Ziyarat Transport in {data.city}</h2>
              <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>{data.religiousTravel.intro}</p>
              <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
                {data.religiousTravel.links.map((l) => (
                  <Link key={l.href} href={l.href} className="btn btn-secondary">{l.label}</Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Popular Routes */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Routes</span>
              <h2 className="section-title">Popular Routes from {data.city}</h2>
            </div>
            <div className={styles.routeGrid}>
              {data.popularRoutes.map((r, i) => (
                <div key={i} className={`card ${styles.routeCard}`}>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-2)" }}>FROM</p>
                  <h3 style={{ color: "var(--accent)", fontSize: "var(--text-xl)" }}>{r.from}</h3>
                  <p style={{ color: "var(--text-muted)", margin: "var(--space-2) 0" }}>↓</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-2)" }}>TO</p>
                  <h3 style={{ color: "var(--text-main)", fontSize: "var(--text-xl)" }}>{r.to}</h3>
                  <div className="divider" style={{ margin: "var(--space-4) 0" }} />
                  <p style={{ color: "var(--accent)", fontWeight: 700 }}>⏱ {r.time}</p>
                  <Link href={r.href ?? bookingHref({ from: r.from, to: r.to })} className={`btn btn-primary ${styles.routeCta}`}>
                    Book Your Ride
                  </Link>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "var(--space-10)" }}>
              <a href={waLink(quoteMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                <WhatsAppIcon size={18} /> Get a Quote on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Vehicle Options — shared fleet data (FLEET_TIERS), real images
            and capacities already used by the booking widget elsewhere, not
            invented per city. */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Fleet</span>
              <h2 className="section-title">Vehicle Options in {data.city}</h2>
            </div>
            <div className="grid-4">
              {FLEET_TIERS.map((tier) => (
                <div key={tier.id} className="card" style={{ textAlign: "center", padding: 0, overflow: "hidden" }}>
                  <div style={{ position: "relative", width: "100%", height: 160 }}>
                    <Image
                      src={tier.image}
                      alt={`${tier.name} — ${tier.models}`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div style={{ padding: "var(--space-6)" }}>
                    <h3 style={{ fontSize: "var(--text-lg)" }}>{tier.name}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)", marginBottom: "var(--space-2)" }}>{tier.models}</p>
                    <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "var(--text-sm)", marginBottom: "var(--space-2)" }}>
                      Up to {tier.maxPassengers} passengers · {tier.maxLuggage} bags
                    </p>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{tier.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works — the existing 3-step booking flow / WhatsApp path,
            described rather than reinvented. */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">How It Works</span>
              <h2 className="section-title">Booking a {data.city} Transfer</h2>
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

        {/* Practical City Travel Information */}
        {data.practicalInfo && data.practicalInfo.length > 0 && (
          <section className="section" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Good to Know</span>
                <h2 className="section-title">Practical {data.city} Travel Information</h2>
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

        {/* Reviews */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Customer Reviews</span>
              <h2 className="section-title">What Customers Say About Our {data.city} Service</h2>
            </div>
            <div className="grid-3">
              {data.reviews.map((r, i) => (
                <div key={i} className="card">
                  <div style={{ display: "flex", gap: "var(--space-1)", marginBottom: "var(--space-3)", color: "var(--accent)" }}>★★★★★</div>
                  <p style={{ color: "var(--text-body)", fontStyle: "italic", lineHeight: 1.75, marginBottom: "var(--space-4)" }}>&ldquo;{r.text}&rdquo;</p>
                  <p style={{ color: "var(--text-main)", fontWeight: 600 }}>{r.name}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{r.origin}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">FAQ</span>
              <h2 className="section-title">{data.city} Taxi — Frequently Asked Questions</h2>
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

        {/* Related Services & Nearby Cities */}
        <section className="section">
          <div className="container">
            <div className="grid-2" style={{ gap: "var(--space-10)" }}>
              <div>
                <h3 style={{ marginBottom: "var(--space-4)" }}>Related Services</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                  {relatedServicesFor(data).map((l) => (
                    <Link key={l.href} href={l.href} className="btn btn-outline-gold btn-sm">{l.label}</Link>
                  ))}
                </div>
              </div>
              {data.nearbyCities.length > 0 && (
                <div>
                  <h3 style={{ marginBottom: "var(--space-4)" }}>Nearby Cities We Serve</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                    {data.nearbyCities.map((n) => (
                      <Link key={n.slug} href={`/services/${n.slug}`} className="btn btn-outline-gold btn-sm">{n.city}</Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "linear-gradient(135deg, var(--bg-dark), var(--accent-dark))", padding: "var(--space-20) 0", textAlign: "center" }}>
          <div className="container">
            <span className="section-eyebrow">Book Now</span>
            <h2 style={{ color: "var(--white)", fontSize: "var(--text-4xl)", margin: "var(--space-4) 0" }}>Ready to Travel in {data.city}?</h2>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-8)" }}>Professional chauffeurs, fixed rates, 24/7 availability across {data.city} and beyond.</p>
            <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href={bookingHref({ to: data.city })} className="btn btn-primary btn-lg">Book Your Ride</Link>
              <a href={waLink(quoteMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                <WhatsAppIcon size={18} /> Get a Quote
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
