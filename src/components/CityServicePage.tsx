import Link from "next/link";
import Image from "next/image";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { AIRPORTS } from "@/lib/airportRoutesData";
import { WhatsAppIcon, ChevronRightIcon, PlaneIcon, MapPinIcon, CalendarIcon } from "@/components/Icons";
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
