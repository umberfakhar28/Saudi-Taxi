import Link from "next/link";
import Image from "next/image";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { CheckCircleIcon, MapPinIcon, CarIcon, ClockIcon, ShieldIcon, MessageIcon, GlobeIcon, ArrowRightIcon } from "@/components/Icons";
import RelatedLinks from "@/components/RelatedLinks";
import { WHATSAPP_URL, TEL_URL, PHONE_DISPLAY, waLink } from "@/lib/contact";
// Value import (not just the RouteData type) so the reverse-route callout
// below can confirm `reverseSlug` resolves to a real, live page before
// linking to it — reverseSlug is allowed to forward-reference a route that
// doesn't exist yet (see the field's doc comment), so this check is what
// keeps that safe instead of shipping a broken link.
import { allRoutes } from "@/lib/routeData";

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
      { name: "Border Crossing", path: "/border-crossing" },
      { name: data.breadcrumbLabel, path: `/${data.slug}` },
    ]),
  ];

  const reverseRoute = allRoutes.find((r) => r.slug === data.reverseSlug);

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
              <Link href="/">Home</Link> / <Link href="/border-crossing">Border Crossing</Link> / <span>{data.breadcrumbLabel}</span>
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
            </div>
          </section>
        )}

        {/* Vehicle options */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Choose Your Ride</span>
              <h2 className="section-title">Vehicle Options for {data.origin} to {data.destination}</h2>
            </div>
            <div className="grid-3">
              {data.vehicleOptions.map((v, i) => (
                <div key={i} className="card" style={{ textAlign: "center" }}>
                  <div className="card-icon" style={{ margin: "0 auto" }}><CarIcon size={22} /></div>
                  <h3 style={{ color: "var(--text-main)", fontSize: "var(--text-xl)" }}>{v.name}</h3>
                  <p style={{ color: "var(--accent)", fontWeight: 700, margin: "var(--space-2) 0" }}>{v.capacity}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{v.note}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "var(--space-10)" }}>
              <Link href="/quote" className="btn btn-primary btn-lg">Get a Quote for This Route</Link>
            </div>
          </div>
        </section>

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
