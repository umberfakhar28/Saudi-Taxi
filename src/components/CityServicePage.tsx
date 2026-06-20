import Link from "next/link";
import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";

export interface CityData {
  slug: string;
  city: string;
  region: string;
  intro: string;
  whyVisit: string;
  challenge: string;
  benefit: string;
  airport?: { name: string; code: string; distance: string };
  popularRoutes: { from: string; to: string; time: string }[];
  pickupPoints: string[];
  faqs: { q: string; a: string }[];
  reviews: { name: string; origin: string; text: string }[];
}

export default function CityServicePage({ data }: { data: CityData }) {
  const schemas = [
    serviceSchema({
      name: `Taxi Service in ${data.city}`,
      description: `Professional taxi and chauffeur services in ${data.city}, ${data.region}. Airport transfers, intercity travel, hotel transfers, and corporate transportation.`,
      url: `/services/${data.slug}`,
      areaServed: [data.city],
    }),
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
        {/* Hero */}
        <section className="page-hero">
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <span className="section-eyebrow">Taxi Service</span>
            <h1>Premium Taxi Service in {data.city}</h1>
            <p>{data.intro}</p>
            <div className="breadcrumb">
              <Link href="/">Home</Link> / <Link href="/our-services">Services</Link> / <span>{data.city}</span>
            </div>
          </div>
        </section>

        {/* Why Visit */}
        <section className="section-lg">
          <div className="container">
            <div className="grid-60-40">
              <div>
                <span className="section-eyebrow">Destination</span>
                <h2 className="section-title">Why Travelers Visit {data.city}</h2>
                <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>{data.whyVisit}</p>
                <h3 style={{ color: "var(--text-main)", marginBottom: "var(--space-4)", fontSize: "var(--text-xl)" }}>Transportation in {data.city}</h3>
                <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>{data.challenge}</p>
                <p style={{ color: "var(--text-body)", lineHeight: 1.8 }}>{data.benefit}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                {data.airport && (
                  <div className="card">
                    <div className="card-icon">✈️</div>
                    <h3>{data.airport.name}</h3>
                    <p>IATA: <strong style={{ color: "var(--accent)" }}>{data.airport.code}</strong></p>
                    <p>City distance: {data.airport.distance}</p>
                    <Link href={`/airport-transfers`} className="btn btn-secondary" style={{ marginTop: "var(--space-4)" }}>Book Airport Transfer</Link>
                  </div>
                )}
                <div className="card">
                  <div className="card-icon">📍</div>
                  <h3>Popular Pickup Points</h3>
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

        {/* Popular Routes */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Routes</span>
              <h2 className="section-title">Popular Routes from {data.city}</h2>
            </div>
            <div className="grid-3">
              {data.popularRoutes.map((r, i) => (
                <div key={i} className="card" style={{ textAlign: "center" }}>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-2)" }}>FROM</p>
                  <h3 style={{ color: "var(--accent)", fontSize: "var(--text-xl)" }}>{r.from}</h3>
                  <p style={{ color: "var(--text-muted)", margin: "var(--space-2) 0" }}>↓</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-2)" }}>TO</p>
                  <h3 style={{ color: "var(--text-main)", fontSize: "var(--text-xl)" }}>{r.to}</h3>
                  <div className="divider" style={{ margin: "var(--space-4) 0" }} />
                  <p style={{ color: "var(--accent)", fontWeight: 700 }}>⏱ {r.time}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "var(--space-10)" }}>
              <Link href="/quote" className="btn btn-primary btn-lg">Get a Quote for Your Route</Link>
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
        <section style={{ background: "linear-gradient(135deg, var(--bg-dark), var(--bg-base))", padding: "var(--space-20) 0", textAlign: "center" }}>
          <div className="container">
            <span className="section-eyebrow">Book Now</span>
            <h2 style={{ color: "var(--text-main)", fontSize: "var(--text-4xl)", margin: "var(--space-4) 0" }}>Ready to Travel in {data.city}?</h2>
            <p style={{ color: "var(--text-body)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-8)" }}>Professional chauffeurs, fixed rates, 24/7 availability across {data.city} and beyond.</p>
            <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/book-online" className="btn btn-primary btn-lg">Book Your Ride</Link>
              <Link href="/quote" className="btn btn-secondary btn-lg">Get Instant Quote</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
