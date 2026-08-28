import Link from "next/link";
import Image from "next/image";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { waLink } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/Icons";

export interface GuideSection {
  heading: string;
  content: string;
  /** Optional supporting image for this section only — a terminal, route
   * landmark, or destination the section is actually about. Omit unless it
   * adds real information; guides stay text-first by design. */
  image?: string;
  imageAlt?: string;
}

export interface GuideData {
  title: string;
  subtitle: string;
  eyebrow: string;
  path: string;
  /** Optional featured image, shown as a contained, framed image below the
   * hero text — not a full-bleed photo hero. Guides are long-form/editorial
   * by design, so this stays a modest accent rather than the family
   * adopting the photo-hero treatment other page families use. */
  heroImage?: string;
  heroImageAlt?: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  ctaText: string;
  ctaLink: string;
  /** One thematically-paired guide, for a single "see also" sentence. */
  relatedGuide?: { href: string; label: string };
}

export default function GuidePage({ data }: { data: GuideData }) {
  const schemas = [
    serviceSchema({
      name: data.title,
      description: data.subtitle,
      url: data.path,
      areaServed: ["Saudi Arabia"],
    }),
    faqSchema(data.faqs.map((f) => ({ question: f.q, answer: f.a }))),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/our-services" },
      { name: data.title, path: data.path },
    ]),
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <section className="page-hero">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="section-eyebrow">{data.eyebrow}</span>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/our-services">Guides</Link> / <span>{data.title}</span>
          </div>
        </div>
      </section>

      {data.heroImage && (
        <div className="container" style={{ marginTop: "var(--space-10)" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
            <Image
              src={data.heroImage}
              alt={data.heroImageAlt ?? data.title}
              width={1600}
              height={900}
              priority
              sizes="(max-width: 820px) 100vw, 820px"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      )}

      <section className="section-lg">
        <div className="container">
          <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-12)" }}>
            {data.sections.map((s, i) => (
              <div key={i}>
                <h2 style={{ color: "var(--text-main)", fontSize: "var(--text-2xl)", marginBottom: "var(--space-4)", borderLeft: "3px solid var(--accent)", paddingLeft: "var(--space-5)" }}>{s.heading}</h2>
                <p style={{ color: "var(--text-body)", lineHeight: 1.85 }}>{s.content}</p>
                {s.image && (
                  <div style={{ marginTop: "var(--space-6)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
                    <Image
                      src={s.image}
                      alt={s.imageAlt ?? s.heading}
                      width={1200}
                      height={675}
                      sizes="(max-width: 820px) 100vw, 820px"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                )}
              </div>
            ))}
            {data.relatedGuide && (
              <p style={{ color: "var(--text-body)", lineHeight: 1.8 }}>
                See also our <Link href={data.relatedGuide.href} style={{ color: "var(--accent)", fontWeight: 600 }}>{data.relatedGuide.label}</Link>.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-subtle)" }}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
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

      <section style={{ background: "var(--bg-dark)", padding: "var(--space-20) 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ color: "var(--text-main)", marginBottom: "var(--space-6)" }}>Ready to Travel? Book with Gulf Trip Service</h2>
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={data.ctaLink} className="btn btn-primary btn-lg">{data.ctaText}</Link>
            <a href={waLink("Hi, I'd like to book a ride.")} className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} /> Book on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
