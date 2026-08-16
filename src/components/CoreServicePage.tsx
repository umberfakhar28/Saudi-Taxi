import Link from "next/link";
import Image from "next/image";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { WhatsAppIcon, CheckCircleIcon, MapPinIcon } from "@/components/Icons";
import { waLink } from "@/lib/contact";
import { FLEET_TIERS } from "@/lib/fleetConfig";
import styles from "./CoreServicePage.module.css";

/**
 * Shared template for the Core Service page family (Phase 4 standardization
 * pass). Unlike City/Route/Airport, this family previously had NO shared
 * component — each page was independently hand-authored (confirmed by
 * direct audit), several with a "Check Rates" pricing-badge pattern that
 * violates the sitewide no-pricing rule. This template gives the family one
 * reusable structure while keeping each page's genuinely unique content.
 *
 * Two pages are deliberately NOT migrated onto this template:
 * /airport-transfers (BookingWidget/RoutesGrid/IncludedStrip/HowItWorksSteps/
 * PolicyStrip/ReviewsStrip/StickyMobileBar — real, richer bespoke components
 * that forcing onto a generic template would regress) and /hotel-transfers
 * (similar reasoning, smaller scale) — both enriched in place instead. See
 * conversation record for the reasoning; forcing every page into one mold
 * would violate the "do not redesign / preserve existing useful components"
 * rule those two pages' custom work earns.
 */

export interface ServiceData {
  slug: string;
  title: string;
  h1: string;
  breadcrumbLabel: string;
  intro: string;
  heroImage?: string;
  heroImageAlt?: string;

  overviewTitle: string;
  overviewParagraphs: string[];

  /** Quick facts strip — verified only, no invented guarantees. */
  quickFacts: { label: string; value: string }[];

  benefits: { icon: string; title: string; description: string }[];
  audience: { icon: string; title: string; description: string }[];

  /** Defaults to a generic 4-step flow when omitted. */
  process?: { title: string; description: string }[];

  /** Real /services/[slug] city links this service genuinely covers. */
  coverage: { slug: string; city: string }[];

  included: string[];
  useCases: { icon: string; title: string; description: string }[];

  /** Only for services where an airport connection is genuinely relevant. */
  airportLinks?: { href: string; label: string }[];
  /** Only for services where specific route pages are genuinely relevant. */
  routeLinks?: { href: string; label: string }[];
  /** The one real hotel-transfer page — only for services where a hotel
   * pickup/drop-off is a genuine part of the trip (Phase 9). No per-property
   * Hotel-family pages exist yet, so this always points at /hotel-transfers. */
  hotelLink?: { href: string; label: string };
  /** Real, named Hotel-family pages (e.g. /hotels/riyadh/the-ritz-carlton-riyadh)
   * — only for services with a genuinely specific match (Phase 15). */
  specificHotelLinks?: { href: string; label: string }[];
  /** Real Tour-family pages (e.g. /taif-ziyarat-taxi-service) — only for
   * services where a genuine match exists (Phase 9). */
  tourLinks?: { href: string; label: string }[];

  practicalInfo?: { title: string; note: string }[];
  /** Only for Ziyarat-type services — a real, named list of sites, not a
   * generic feature list. Kept as its own field rather than folded into
   * useCases so this genuinely valuable, unique content isn't lost. */
  siteGroups?: { title: string; sites: { name: string; description: string }[] }[];
  reviews?: { name: string; origin: string; text: string }[];
  faqs: { q: string; a: string }[];
  relatedServices: { href: string; label: string }[];

  ctaText: string;
}

const DEFAULT_PROCESS = [
  { title: "Choose Your Service", description: "Select the transportation service you need." },
  { title: "Share Trip Details", description: "Provide pickup, destination and travel details." },
  { title: "Confirm Your Booking", description: "Receive booking confirmation with driver details." },
  { title: "Complete Your Journey", description: "Meet your driver and travel directly to your destination." },
];

export default function CoreServicePage({ data }: { data: ServiceData }) {
  const quoteMessage = `Hello GulfTripService, I would like to get a quote for your ${data.title} in Saudi Arabia. Please share the available options, pricing, and booking details. Thank you.`;

  const schemas = [
    serviceSchema({
      name: data.title,
      description: data.intro,
      url: `/${data.slug}`,
      areaServed: data.coverage.length > 0 ? data.coverage.map((c) => c.city) : ["Saudi Arabia"],
    }),
    faqSchema(data.faqs.map((f) => ({ question: f.q, answer: f.a }))),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/our-services" },
      { name: data.breadcrumbLabel, path: `/${data.slug}` },
    ]),
  ];

  const process = data.process && data.process.length > 0 ? data.process : DEFAULT_PROCESS;
  const primaryCity = data.coverage[0];
  const primaryAirport = data.airportLinks?.[0];
  const primaryRoute = data.routeLinks?.[0];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main>
        {/* Hero — plain page-hero, matching this family's existing
            convention (unlike City/Route/Airport, none of these pages have
            ever used a photo hero, so adding one here would be a bigger
            visual change than the "improve, don't redesign" rule intends). */}
        <section className="page-hero">
          <h1>{data.h1}</h1>
          <p>{data.intro}</p>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/our-services">Services</Link> / <span>{data.breadcrumbLabel}</span>
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

        {/* Overview + Why Choose */}
        <section className="section-lg">
          <div className="container">
            <div className="grid-60-40">
              <div>
                <span className="section-eyebrow">Overview</span>
                <h2 className="section-title">{data.overviewTitle}</h2>
                {data.overviewParagraphs.map((p, i) => (
                  <p key={i} style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>{p}</p>
                ))}
                {(primaryCity || primaryAirport || primaryRoute) && (
                  <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>
                    {primaryAirport && (
                      <>
                        Travelers can book this service directly from{" "}
                        <Link href={primaryAirport.href} style={{ color: "var(--accent)", fontWeight: 600 }}>{primaryAirport.label}</Link>.{" "}
                      </>
                    )}
                    {primaryCity && (
                      <>
                        It&apos;s a regular booking in{" "}
                        <Link href={`/services/${primaryCity.slug}`} style={{ color: "var(--accent)", fontWeight: 600 }}>{primaryCity.city}</Link>{" "}
                        and our other coverage cities.{" "}
                      </>
                    )}
                    {primaryRoute && (
                      <>
                        See our{" "}
                        <Link href={primaryRoute.href} style={{ color: "var(--accent)", fontWeight: 600 }}>{primaryRoute.label}</Link>{" "}
                        route for one of the most common journeys booked through this service.
                      </>
                    )}
                  </p>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                {data.benefits.slice(0, 3).map((b) => (
                  <div key={b.title} className="card">
                    <div style={{ fontSize: "2rem", marginBottom: "var(--space-2)" }}>{b.icon}</div>
                    <h3 style={{ fontSize: "var(--text-base)" }}>{b.title}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{b.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Who It&apos;s For</span>
              <h2 className="section-title">Who Uses Our {data.title}?</h2>
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

        {/* How It Works */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">How It Works</span>
              <h2 className="section-title">Booking Your {data.title}</h2>
            </div>
            <div className="grid-4">
              {process.map((step, i) => (
                <div key={step.title} style={{ textAlign: "center" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%", background: "var(--accent-subtle)", color: "var(--accent-primary)",
                    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto var(--space-4)",
                    fontWeight: 800, fontSize: "var(--text-xl)", fontFamily: "var(--font-heading)", border: "1px solid rgba(12,32,122,0.18)",
                  }}>{i + 1}</div>
                  <h3 style={{ fontSize: "var(--text-base)", marginBottom: "var(--space-2)" }}>{step.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Coverage */}
        {data.coverage.length > 0 && (
          <section className="section" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Coverage</span>
                <h2 className="section-title">Where {data.title} Is Available</h2>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", justifyContent: "center" }}>
                {data.coverage.map((c) => (
                  <Link key={c.slug} href={`/services/${c.slug}`} className="btn btn-outline-gold btn-sm">
                    <MapPinIcon size={14} /> {c.city}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Vehicle Options — shared fleet data, real images/capacities. */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Fleet</span>
              <h2 className="section-title">Vehicle Options</h2>
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

        {/* What's Included */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container" style={{ maxWidth: 700 }}>
            <div className="section-header centered">
              <span className="section-eyebrow">What&apos;s Included</span>
              <h2 className="section-title">Every Booking Includes</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {data.included.map((item) => (
                <div key={item} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
                  <CheckCircleIcon size={20} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: "var(--text-body)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Travel Scenarios — full section rather than a truncated
            4-item sidebar list, matching the richer treatment used across
            the site's other page families (Phase 15). */}
        {data.useCases.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Travel Scenarios</span>
                <h2 className="section-title">Common Ways {data.title} Is Booked</h2>
              </div>
              <div className="grid-3">
                {data.useCases.map((uc) => (
                  <div key={uc.title} className="card" style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2.2rem", marginBottom: "var(--space-3)" }}>{uc.icon}</div>
                    <h3 style={{ fontSize: "var(--text-base)" }}>{uc.title}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{uc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Airport / Route / Hotel / Tour connections — only categories with
            genuine content render, so this reads correctly whether 1 or all
            4 are present (Phase 9: added Hotel and Tour connections). */}
        {((data.airportLinks && data.airportLinks.length > 0) || (data.routeLinks && data.routeLinks.length > 0) || data.hotelLink || (data.specificHotelLinks && data.specificHotelLinks.length > 0) || (data.tourLinks && data.tourLinks.length > 0)) && (
          <section className="section">
            <div className="container">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-10)" }}>
                {data.airportLinks && data.airportLinks.length > 0 && (
                  <div>
                    <h3 style={{ marginBottom: "var(--space-4)" }}>Airport Connections</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                      {data.airportLinks.map((l) => (
                        <Link key={l.href} href={l.href} className="btn btn-outline-gold btn-sm">{l.label}</Link>
                      ))}
                    </div>
                  </div>
                )}
                {data.routeLinks && data.routeLinks.length > 0 && (
                  <div>
                    <h3 style={{ marginBottom: "var(--space-4)" }}>Popular Routes</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                      {data.routeLinks.map((l) => (
                        <Link key={l.href} href={l.href} className="btn btn-outline-gold btn-sm">{l.label}</Link>
                      ))}
                    </div>
                  </div>
                )}
                {(data.hotelLink || (data.specificHotelLinks && data.specificHotelLinks.length > 0)) && (
                  <div>
                    <h3 style={{ marginBottom: "var(--space-4)" }}>Hotel Connections</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                      {data.specificHotelLinks?.map((l) => (
                        <Link key={l.href} href={l.href} className="btn btn-outline-gold btn-sm">{l.label}</Link>
                      ))}
                      {data.hotelLink && (
                        <Link href={data.hotelLink.href} className="btn btn-outline-gold btn-sm">{data.hotelLink.label}</Link>
                      )}
                    </div>
                  </div>
                )}
                {data.tourLinks && data.tourLinks.length > 0 && (
                  <div>
                    <h3 style={{ marginBottom: "var(--space-4)" }}>Tours &amp; Experiences</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                      {data.tourLinks.map((l) => (
                        <Link key={l.href} href={l.href} className="btn btn-outline-gold btn-sm">{l.label}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Site groups — Ziyarat-style named site lists only. */}
        {data.siteGroups && data.siteGroups.length > 0 && data.siteGroups.map((group) => (
          <section key={group.title} className="section-lg">
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Sites</span>
                <h2 className="section-title">{group.title}</h2>
              </div>
              <div className="grid-2">
                {group.sites.map((site) => (
                  <div key={site.name} style={{
                    display: "flex", flexDirection: "column", gap: "var(--space-2)", padding: "var(--space-6)",
                    background: "var(--card, var(--surface-1))", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)",
                    borderInlineStart: "4px solid var(--accent)",
                  }}>
                    <h3 style={{ color: "var(--text-main)", fontSize: "var(--text-base)" }}>{site.name}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.6, margin: 0 }}>{site.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Practical Information */}
        {data.practicalInfo && data.practicalInfo.length > 0 && (
          <section className="section" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Good to Know</span>
                <h2 className="section-title">Practical Information</h2>
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
        {data.reviews && data.reviews.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Customer Reviews</span>
                <h2 className="section-title">What Customers Say</h2>
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
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
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

        {/* Related Services */}
        {data.relatedServices.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Explore More</span>
                <h2 className="section-title">Related Services</h2>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", justifyContent: "center" }}>
                {data.relatedServices.map((l) => (
                  <Link key={l.href} href={l.href} className="btn btn-outline-gold">{l.label}</Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section style={{ background: "linear-gradient(135deg, var(--bg-dark), var(--accent-dark))", padding: "var(--space-20) 0", textAlign: "center" }}>
          <div className="container">
            <span className="section-eyebrow">Book Now</span>
            <h2 style={{ color: "var(--white)", fontSize: "var(--text-4xl)", margin: "var(--space-4) 0" }}>{data.ctaText}</h2>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-8)" }}>
              Professional drivers, private vehicles, 24/7 availability.
            </p>
            <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/book-online" className="btn btn-primary btn-lg">Book Your Ride</Link>
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
