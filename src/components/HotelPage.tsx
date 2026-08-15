import Link from "next/link";
import Image from "next/image";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { waLink } from "@/lib/contact";
import { FLEET_TIERS } from "@/lib/fleetConfig";
import { AIRPORTS, type AirportCode } from "@/lib/airportRoutesData";
import { allCities } from "@/lib/cityData3";
import { allRoutes } from "@/lib/routeData";
import { WhatsAppIcon, MapPinIcon, PlaneIcon, HotelIcon, ChevronRightIcon } from "@/components/Icons";
import styles from "./HotelPage.module.css";

/**
 * Shared template for the Hotel / Accommodation Transfer page family
 * (Phase 5 standardization pass).
 *
 * IMPORTANT — infrastructure only, no live pages yet. No hotel currently
 * has a real page on this site (confirmed by audit: no /hotels route, no
 * hotel data file, no hotel component existed before this file). Per
 * explicit user direction, this phase builds the reusable template + data
 * model only — no `src/app/hotels/...` route is created, and
 * `src/lib/hotelData.ts` ships with zero entries. A future phase adds the
 * route file and real, researched hotel content once that's authorized.
 *
 * Deliberately mirrors CoreServicePage.tsx's section vocabulary and the
 * same conditional-module pattern used by CityServicePage/RoutePage/
 * AirportPage, so this family reads as part of the same system rather than
 * a new design.
 */

export interface HotelData {
  slug: string;
  hotelName: string;
  /** Links to an existing CityData entry — never a guessed slug. */
  citySlug: string;
  city: string;
  /** Neighborhood/district, e.g. "Corniche waterfront". Optional — omit
   * rather than invent one. */
  area?: string;
  /** e.g. "Hotel", "Resort", "Serviced Apartments" — only if verified. */
  accommodationType?: string;

  heroImage?: string;
  heroImageAlt?: string;
  h1: string;
  intro: string;
  breadcrumbLabel: string;

  overviewParagraphs: string[];
  transferOverviewParagraphs: string[];

  /** Verified facts only — no invented star ratings, room counts, or
   * distances. */
  quickFacts: { label: string; value: string }[];

  useCases: { icon: string; title: string; description: string }[];

  /** Restricts computed airport connections to specific airports (e.g. a
   * hotel equidistant from two cities). Omit to auto-derive every airport
   * whose city matches `citySlug`. */
  nearbyAirportCodes?: AirportCode[];

  /** Real, relevant destinations reachable from the hotel — only linked
   * where a genuine page exists. */
  popularDestinations: { label: string; note: string; href?: string }[];

  process?: { title: string; description: string }[];
  nearbyAttractions?: { name: string; description: string }[];
  practicalInfo?: { title: string; note: string }[];
  reviews?: { name: string; origin: string; text: string }[];
  faqs: { q: string; a: string }[];

  /** Other hotel pages once they exist — empty array today, by design. */
  relatedHotels?: { slug: string; hotelName: string }[];
  relatedServices: { href: string; label: string }[];

  ctaText: string;
}

const DEFAULT_PROCESS = [
  { title: "Share Your Details", description: "Pickup/drop-off point, flight number if relevant, and travel date." },
  { title: "Confirm Your Booking", description: "Receive driver and vehicle details ahead of pickup." },
  { title: "Driver Pickup", description: "Your driver meets you at the agreed point — including flight-tracked airport arrivals." },
  { title: "Arrive at the Hotel", description: "A direct, private transfer straight to the hotel entrance." },
];

export default function HotelPage({ data }: { data: HotelData }) {
  const city = allCities.find((c) => c.slug === data.citySlug);
  const quoteMessage = `Hello GulfTripService, I would like to get a quote for a transfer to ${data.hotelName} in ${data.city}. Please share the available options, pricing, and booking details. Thank you.`;

  const airportCodes = data.nearbyAirportCodes ?? AIRPORTS.filter((a) => a.city.toLowerCase() === data.city.toLowerCase()).map((a) => a.code);
  const airports = AIRPORTS.filter((a) => airportCodes.includes(a.code));

  const cityRoutes = allRoutes.filter((r) => r.fromSlug === data.citySlug || r.toSlug === data.citySlug).slice(0, 4);

  const relatedServices = data.relatedServices.length > 0 ? data.relatedServices : [
    { href: "/hotel-transfers", label: "Hotel Transfers" },
    { href: "/private-taxi", label: "Private Taxi" },
    { href: "/airport-transfers", label: "Airport Transfers" },
  ];

  const process = data.process && data.process.length > 0 ? data.process : DEFAULT_PROCESS;

  const schemas = [
    serviceSchema({
      name: `Private Transfer to ${data.hotelName}`,
      description: data.intro,
      url: `/hotels/${data.citySlug}/${data.slug}`,
      areaServed: [data.city],
    }),
    faqSchema(data.faqs.map((f) => ({ question: f.q, answer: f.a }))),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Hotel Transfers", path: "/hotel-transfers" },
      { name: data.city, path: `/services/${data.citySlug}` },
      { name: data.breadcrumbLabel, path: `/hotels/${data.citySlug}/${data.slug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main>
        {/* Hero — photo hero when a real image is supplied (matching City/
            Route/Airport), plain page-hero otherwise. Never a fabricated
            "generic hotel" stock photo. */}
        {data.heroImage ? (
          <section className={styles.hero}>
            <Image
              src={data.heroImage}
              alt={data.heroImageAlt ?? `${data.hotelName}, ${data.city} — private taxi and transfer service`}
              fill
              priority
              sizes="100vw"
              className={styles.heroImage}
            />
            <div className={styles.heroScrim} />
            <div className={`container ${styles.heroContent}`}>
              <span className="badge" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: "var(--white)" }}>
                Hotel Transfer Service
              </span>
              <h1>{data.h1}</h1>
              <p>{data.intro}</p>
              <div className={styles.heroBreadcrumb}>
                <Link href="/">Home</Link>
                <ChevronRightIcon size={12} style={{ display: "inline", verticalAlign: "middle" }} />
                <Link href="/hotel-transfers">Hotel Transfers</Link>
                <ChevronRightIcon size={12} style={{ display: "inline", verticalAlign: "middle" }} />
                <Link href={`/services/${data.citySlug}`}>{data.city}</Link>
                <ChevronRightIcon size={12} style={{ display: "inline", verticalAlign: "middle" }} />
                <span>{data.hotelName}</span>
              </div>
            </div>
          </section>
        ) : (
          <section className="page-hero">
            <h1>{data.h1}</h1>
            <p>{data.intro}</p>
            <div className="breadcrumb">
              <Link href="/">Home</Link> / <Link href="/hotel-transfers">Hotel Transfers</Link> / <Link href={`/services/${data.citySlug}`}>{data.city}</Link> / <span>{data.hotelName}</span>
            </div>
          </section>
        )}

        {/* Quick Facts */}
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

        {/* Hotel Overview + Transfer Overview */}
        <section className="section-lg">
          <div className="container">
            <div className="grid-60-40">
              <div>
                <span className="section-eyebrow">Overview</span>
                <h2 className="section-title">About {data.hotelName}</h2>
                {data.overviewParagraphs.map((p, i) => (
                  <p key={i} style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>{p}</p>
                ))}
                <h3 style={{ color: "var(--text-main)", marginBottom: "var(--space-4)", fontSize: "var(--text-xl)" }}>Getting To and From {data.hotelName}</h3>
                {data.transferOverviewParagraphs.map((p, i) => (
                  <p key={i} style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>{p}</p>
                ))}
              </div>
              <div className={styles.infoRailCards}>
                <div className="card">
                  <div className="card-icon"><HotelIcon size={22} /></div>
                  <h3>{data.hotelName}</h3>
                  {data.area && <p>Area: <strong style={{ color: "var(--accent)" }}>{data.area}</strong></p>}
                  <p>City: <strong style={{ color: "var(--accent)" }}>{data.city}</strong></p>
                  <Link href="/book-online" className="btn btn-secondary" style={{ marginTop: "var(--space-4)" }}>Book a Transfer</Link>
                </div>
                <div className="card" style={{ background: "var(--bg-subtle)" }}>
                  <div className="card-icon"><MapPinIcon size={22} /></div>
                  <h3>Use Cases</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
                    {data.useCases.slice(0, 4).map((uc) => (
                      <li key={uc.title} style={{ color: "var(--text-body)", fontSize: "var(--text-sm)", display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
                        <span style={{ color: "var(--accent)" }}>{uc.icon}</span> {uc.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Airport Transfers — data-driven, only airports genuinely near this hotel's city. */}
        {airports.length > 0 && (
          <section className="section" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Airport Transfers</span>
                <h2 className="section-title">Airport Connections for {data.hotelName}</h2>
              </div>
              <div className="grid-3">
                {airports.map((a) => (
                  <div key={a.code} className="card">
                    <div className="card-icon"><PlaneIcon size={22} /></div>
                    <h3>{a.name} ({a.code})</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>
                      Meet-and-greet pickup at {a.name} with a direct transfer to {data.hotelName}, and the return trip for departures.
                    </p>
                    <Link href={a.pageHref} style={{ color: "var(--accent)", fontWeight: 600, fontSize: "var(--text-sm)" }}>
                      Full {a.name} guide →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Popular Destinations from the hotel */}
        {data.popularDestinations.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Destinations</span>
                <h2 className="section-title">Popular Destinations from {data.hotelName}</h2>
              </div>
              <div className="grid-3">
                {data.popularDestinations.map((d) => {
                  const content = (
                    <>
                      <h3 style={{ color: "var(--text-main)", fontSize: "var(--text-lg)" }}>{d.label}</h3>
                      <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{d.note}</p>
                    </>
                  );
                  return d.href ? (
                    <Link key={d.label} href={d.href} className="card">{content}</Link>
                  ) : (
                    <div key={d.label} className="card">{content}</div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Vehicle Options — shared fleet data, real images/capacities. */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Fleet</span>
              <h2 className="section-title">Vehicle Options for Your Transfer</h2>
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

        {/* Transfer Process */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">How It Works</span>
              <h2 className="section-title">Booking Your Transfer to {data.hotelName}</h2>
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

        {/* Nearby Attractions — only where genuinely useful. */}
        {data.nearbyAttractions && data.nearbyAttractions.length > 0 && (
          <section className="section" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Nearby</span>
                <h2 className="section-title">Attractions Near {data.hotelName}</h2>
              </div>
              <div className="grid-3">
                {data.nearbyAttractions.map((a) => (
                  <div key={a.name} className="card">
                    <h3 style={{ color: "var(--accent)", fontSize: "var(--text-lg)" }}>{a.name}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{a.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Practical Information */}
        {data.practicalInfo && data.practicalInfo.length > 0 && (
          <section className="section">
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
          <section className="section" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Customer Reviews</span>
                <h2 className="section-title">What Guests Say</h2>
              </div>
              <div className={styles.reviewGrid}>
                {data.reviews.map((r, i) => (
                  <div key={i} className="card">
                    <div style={{ display: "flex", gap: "var(--space-1)", marginBottom: "var(--space-3)", color: "var(--accent)" }}>★★★★★</div>
                    <p style={{ color: "var(--text-body)", fontStyle: "italic", lineHeight: 1.75, marginBottom: "var(--space-4)" }}>&ldquo;{r.text}&rdquo;</p>
                    <p style={{ color: "var(--text-main)", fontWeight: 600 }}>{r.name}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{r.origin} · {data.hotelName} Transfer</p>
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
              <h2 className="section-title">{data.hotelName} Transfer — Frequently Asked Questions</h2>
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

        {/* Related Hotels / City / Routes / Services */}
        <section className="section">
          <div className="container">
            <div className="grid-2" style={{ gap: "var(--space-10)" }}>
              <div>
                <h3 style={{ marginBottom: "var(--space-4)" }}>More in {data.city}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                  <Link href={`/services/${data.citySlug}`} className="btn btn-outline-gold btn-sm">{data.city} Taxi Service</Link>
                  {data.relatedHotels?.map((h) => (
                    <Link key={h.slug} href={`/hotels/${data.citySlug}/${h.slug}`} className="btn btn-outline-gold btn-sm">{h.hotelName}</Link>
                  ))}
                  {cityRoutes.map((r) => (
                    <Link key={r.slug} href={`/${r.slug}`} className="btn btn-outline-gold btn-sm">{r.origin} → {r.destination}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ marginBottom: "var(--space-4)" }}>Related Services</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                  {relatedServices.map((l) => (
                    <Link key={l.href} href={l.href} className="btn btn-outline-gold btn-sm">{l.label}</Link>
                  ))}
                </div>
              </div>
            </div>
            {city && city.nearbyCities.length > 0 && (
              <div style={{ marginTop: "var(--space-10)", paddingTop: "var(--space-10)", borderTop: "1px solid rgba(16,18,26,0.08)" }}>
                <h3 style={{ marginBottom: "var(--space-4)" }}>Nearby Cities</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                  {city.nearbyCities.map((n) => (
                    <Link key={n.slug} href={`/services/${n.slug}`} className="btn btn-outline-gold btn-sm">{n.city}</Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ background: "linear-gradient(135deg, var(--bg-dark), var(--accent-dark))", padding: "var(--space-20) 0", textAlign: "center" }}>
          <div className="container">
            <span className="section-eyebrow">Book Now</span>
            <h2 style={{ color: "var(--white)", fontSize: "var(--text-4xl)", margin: "var(--space-4) 0" }}>{data.ctaText}</h2>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-8)" }}>
              Professional drivers, private vehicles, 24/7 availability to and from {data.hotelName}.
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
