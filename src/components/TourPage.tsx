import Link from "next/link";
import Image from "next/image";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { WhatsAppIcon, CheckCircleIcon, MapPinIcon } from "@/components/Icons";
import { waLink } from "@/lib/contact";
import { FLEET_TIERS } from "@/lib/fleetConfig";
import { allCities } from "@/lib/cityData3";
import { AIRPORTS } from "@/lib/airportRoutesData";
import { allRoutes } from "@/lib/routeData";
import { allTourPages } from "@/lib/tourPageData";
import styles from "./TourPage.module.css";

/**
 * Shared template for the Tour / Ziyarat / Religious Travel page family
 * (Phase 6 standardization pass). Like Core Service, this family previously
 * had no shared component — each of the 3 pages (Taif Ziyarat, Jeddah City
 * Tour, AlUla Tour) was hand-authored independently, none with bespoke
 * interactive components worth preserving, so all three are migrated onto
 * this template (same approach as Phase 4).
 *
 * These pages sell private transportation to/around tour and ziyarat sites,
 * not a guided-tour or travel-agency product — "included" therefore only
 * ever lists transport-side items (vehicle, driver, pickup). Site entrance
 * tickets, permits, meals and guiding are never claimed as included unless
 * a given tour's data explicitly and genuinely says so.
 */

export interface TourPageData {
  slug: string;
  title: string;
  h1: string;
  breadcrumbLabel: string;
  intro: string;
  heroImage?: string;
  heroImageAlt?: string;

  /** Primary city this tour departs from/covers — drives cross-family links. */
  citySlug: string;
  city: string;

  overviewTitle: string;
  overviewParagraphs: string[];

  /** Quick facts strip — verified only, no invented guarantees. */
  quickFacts: { label: string; value: string }[];

  audience: { icon: string; title: string; description: string }[];

  /** Transport-side inclusions only — never tickets/meals/guiding. */
  included: string[];

  /** Route-length options (was "packages") — stops describe sites typically
   * covered on that option, not included tickets. */
  tourOptions: { icon: string; title: string; duration: string; note?: string; stops: string[]; popular?: boolean }[];

  /** Real, named site/landmark cards for this tour. */
  destinations: { icon: string; name: string; description: string }[];
  /** "Order may vary" style disclaimer rather than a fixed fake itinerary. */
  itineraryNote: string;

  /** Respectful historical/religious context paragraph — only where a site
   * genuinely has religious significance; never invents authority or claims. */
  religiousNote?: string;

  pickupInfo: string;
  dropoffInfo: string;
  familyGroupNote?: string;

  seasons?: { season: string; highlight: string; description: string }[];
  practicalInfo?: { title: string; note: string }[];

  reviews?: { name: string; origin: string; text: string }[];
  faqs: { q: string; a: string }[];

  relatedServices: { href: string; label: string }[];

  ctaText: string;
}

export default function TourPage({ data }: { data: TourPageData }) {
  const quoteMessage = `Hello GulfTripService, I would like to get a quote for the ${data.title} in Saudi Arabia. Please share the available options and booking details. Thank you.`;

  const cityPage = allCities.find((c) => c.slug === data.citySlug);
  const cityAirports = AIRPORTS.filter((a) => a.city.toLowerCase() === data.city.toLowerCase());
  const cityRoutes = allRoutes.filter((r) => r.fromSlug === data.citySlug || r.toSlug === data.citySlug).slice(0, 6);
  const nearbyCities = cityPage?.nearbyCities ?? [];
  const relatedTours = allTourPages.filter((t) => t.slug !== data.slug);

  const schemas = [
    serviceSchema({
      name: data.title,
      description: data.intro,
      url: `/${data.slug}`,
      areaServed: [data.city],
    }),
    faqSchema(data.faqs.map((f) => ({ question: f.q, answer: f.a }))),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: `${data.city} Taxi Service`, path: `/services/${data.citySlug}` },
      { name: data.breadcrumbLabel, path: `/${data.slug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main>
        {/* Hero — plain page-hero, matching this family's existing convention
            (none of the 3 pages ever used a photo hero). */}
        <section className="page-hero">
          <h1>{data.h1}</h1>
          <p>{data.intro}</p>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href={`/services/${data.citySlug}`}>{data.city} Taxi Service</Link> / <span>{data.breadcrumbLabel}</span>
          </div>
        </section>

        {/* Quick Facts strip */}
        <section className={styles.quickFacts}>
          <div className="container">
            <div className={styles.factRow}>
              {data.quickFacts.map((f) => (
                <div key={f.label} className={styles.factItem}>
                  <span className={styles.factLabel}>{f.label}</span>
                  <span className={styles.factValue}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="section-lg">
          <div className="container" style={{ maxWidth: 850, textAlign: "center" }}>
            <span className="section-eyebrow">Overview</span>
            <h2 className="section-title">{data.overviewTitle}</h2>
            {data.overviewParagraphs.map((p, i) => (
              <p key={i} style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "1.05rem", marginTop: i === 0 ? "var(--space-4)" : "var(--space-4)" }}>{p}</p>
            ))}
          </div>
        </section>

        {/* Who This Tour Is For */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Who It&apos;s For</span>
              <h2 className="section-title">Who Books the {data.title}?</h2>
            </div>
            <div className="grid-3">
              {data.audience.map((a) => (
                <div key={a.title} className="card" style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2.2rem", marginBottom: "var(--space-3)" }}>{a.icon}</div>
                  <h3 style={{ fontSize: "var(--text-base)" }}>{a.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tour Options — duration + sites typically covered, no pricing, no ticket claims. */}
        <section className="section-lg">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Options</span>
              <h2 className="section-title">{data.title} Options</h2>
              <p className="section-subtitle">Private vehicle and driver for the full duration. Entrance tickets for paid attractions, where applicable, are handled by travelers directly unless agreed in advance.</p>
            </div>
            <div className="grid-3">
              {data.tourOptions.map((opt) => (
                <div key={opt.title} className="card" style={{
                  textAlign: "center", position: "relative",
                  border: opt.popular ? "2px solid var(--accent)" : undefined,
                  overflow: "visible",
                }}>
                  {opt.popular && (
                    <div style={{
                      position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
                      background: "var(--accent)", color: "var(--white)", padding: "0.3rem 1.2rem",
                      borderRadius: 20, fontSize: "0.8rem", fontWeight: 700, whiteSpace: "nowrap",
                    }}>
                      Most Popular
                    </div>
                  )}
                  <div style={{ fontSize: "2.5rem", marginBottom: "var(--space-2)" }}>{opt.icon}</div>
                  <h3 style={{ fontSize: "var(--text-base)" }}>{opt.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "4px" }}>{opt.duration}</p>
                  {opt.note && <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontStyle: "italic", marginBottom: "var(--space-3)" }}>{opt.note}</p>}
                  <ul style={{ textAlign: "left", marginTop: "var(--space-3)" }}>
                    {opt.stops.map((s) => (
                      <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.4rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                        <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>✓</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Destinations / Site Cards */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Destinations</span>
              <h2 className="section-title">Sites You Can Visit</h2>
              <p className="section-subtitle">{data.itineraryNote}</p>
            </div>
            <div className="grid-2">
              {data.destinations.map((d) => (
                <div key={d.name} style={{
                  display: "flex", gap: "1.5rem", padding: "1.5rem",
                  background: "var(--card, var(--surface-1))", borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-sm)", borderInlineStart: "4px solid var(--accent)",
                }}>
                  <div style={{ fontSize: "2rem", minWidth: 44, textAlign: "center" }}>{d.icon}</div>
                  <div>
                    <h3 style={{ color: "var(--text-main)", fontSize: "1rem", marginBottom: "0.3rem" }}>{d.name}</h3>
                    <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>{d.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Religious/historical context — respectful, only when genuinely present. */}
        {data.religiousNote && (
          <section className="section-lg">
            <div className="container" style={{ maxWidth: 780 }}>
              <div className="card" style={{ padding: "var(--space-8)", borderInlineStart: "4px solid var(--accent)" }}>
                <h3 style={{ marginBottom: "var(--space-3)" }}>Historical & Religious Context</h3>
                <p style={{ color: "var(--text-body)", lineHeight: 1.8, margin: 0 }}>{data.religiousNote}</p>
              </div>
            </div>
          </section>
        )}

        {/* Vehicle Options — the commercial core of the page. */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Transportation</span>
              <h2 className="section-title">Your Private Vehicle & Driver</h2>
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

        {/* What's Included + Pickup/Drop-off */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="grid-60-40">
              <div>
                <span className="section-eyebrow">What&apos;s Included</span>
                <h2 className="section-title">Every {data.title} Booking Includes</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
                  {data.included.map((item) => (
                    <div key={item} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
                      <CheckCircleIcon size={20} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                      <span style={{ color: "var(--text-body)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                <div className="card">
                  <h3 style={{ fontSize: "var(--text-base)" }}>Pickup</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{data.pickupInfo}</p>
                </div>
                <div className="card">
                  <h3 style={{ fontSize: "var(--text-base)" }}>Drop-off</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{data.dropoffInfo}</p>
                </div>
                {data.familyGroupNote && (
                  <div className="card">
                    <h3 style={{ fontSize: "var(--text-base)" }}>Family & Group Travel</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{data.familyGroupNote}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal / weather considerations */}
        {data.seasons && data.seasons.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Timing</span>
                <h2 className="section-title">Best Time to Visit</h2>
              </div>
              <div className="grid-3">
                {data.seasons.map((s) => (
                  <div key={s.season} className="card" style={{ textAlign: "center" }}>
                    <h3 style={{ color: "var(--accent)", marginBottom: "0.25rem", fontSize: "1rem" }}>{s.season}</h3>
                    <h4 style={{ marginBottom: "0.75rem", fontSize: "1.1rem" }}>{s.highlight}</h4>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Practical Information */}
        {data.practicalInfo && data.practicalInfo.length > 0 && (
          <section className="section" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Good to Know</span>
                <h2 className="section-title">Practical Information</h2>
              </div>
              <div className="grid-2">
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

        {/* Hotel / Airport / City / Route Connections */}
        {(cityAirports.length > 0 || cityRoutes.length > 0 || nearbyCities.length > 0) && (
          <section className="section">
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Plan Your Trip</span>
                <h2 className="section-title">Connect Your {data.city} Journey</h2>
              </div>
              <div className="grid-3" style={{ gap: "var(--space-8)" }}>
                {cityAirports.length > 0 && (
                  <div>
                    <h3 style={{ marginBottom: "var(--space-4)" }}>Airport Transfers</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                      {cityAirports.map((a) => (
                        <Link key={a.code} href={`/${a.city.toLowerCase()}-airport-taxi-service`} className="btn btn-outline-gold btn-sm">{a.name} Transfer</Link>
                      ))}
                    </div>
                  </div>
                )}
                {cityRoutes.length > 0 && (
                  <div>
                    <h3 style={{ marginBottom: "var(--space-4)" }}>Popular Routes</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                      {cityRoutes.map((r) => (
                        <Link key={r.slug} href={`/${r.slug}`} className="btn btn-outline-gold btn-sm">{r.breadcrumbLabel}</Link>
                      ))}
                    </div>
                  </div>
                )}
                {nearbyCities.length > 0 && (
                  <div>
                    <h3 style={{ marginBottom: "var(--space-4)" }}>Nearby Cities</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                      {nearbyCities.map((c) => (
                        <Link key={c.slug} href={`/services/${c.slug}`} className="btn btn-outline-gold btn-sm">
                          <MapPinIcon size={14} /> {c.city}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Reviews */}
        {data.reviews && data.reviews.length > 0 && (
          <section className="section" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Customer Reviews</span>
                <h2 className="section-title">What Travelers Say</h2>
              </div>
              <div className={styles.reviewGrid}>
                {data.reviews.map((r, i) => (
                  <div key={i} className="card">
                    <div style={{ display: "flex", gap: "var(--space-1)", marginBottom: "var(--space-3)", color: "var(--accent)" }}>★★★★★</div>
                    <p style={{ color: "var(--text-body)", fontStyle: "italic", lineHeight: 1.75, marginBottom: "var(--space-4)" }}>&ldquo;{r.text}&rdquo;</p>
                    <p style={{ color: "var(--text-main)", fontWeight: 600 }}>{r.name}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{r.origin} · {data.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">FAQ</span>
              <h2 className="section-title">{data.title} — Frequently Asked Questions</h2>
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

        {/* Related Tours & Services */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Explore More</span>
              <h2 className="section-title">Related Tours & Services</h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", justifyContent: "center" }}>
              {relatedTours.map((t) => (
                <Link key={t.slug} href={`/${t.slug}`} className="btn btn-outline-gold">{t.title}</Link>
              ))}
              {data.relatedServices.map((l) => (
                <Link key={l.href} href={l.href} className="btn btn-outline-gold">{l.label}</Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ background: "linear-gradient(135deg, var(--bg-dark), var(--accent-dark))", padding: "var(--space-20) 0", textAlign: "center" }}>
          <div className="container">
            <span className="section-eyebrow">Book Now</span>
            <h2 style={{ color: "var(--white)", fontSize: "var(--text-4xl)", margin: "var(--space-4) 0" }}>{data.ctaText}</h2>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-8)" }}>
              Private vehicle, professional driver, flexible scheduling.
            </p>
            <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/book-online" className="btn btn-primary btn-lg">Book Your Tour</Link>
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
