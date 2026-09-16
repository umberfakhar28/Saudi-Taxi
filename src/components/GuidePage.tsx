import Link from "next/link";
import Image from "next/image";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { waLink } from "@/lib/contact";
import { WhatsAppIcon, CheckCircleIcon, ArrowRightIcon } from "@/components/Icons";

export interface GuideSection {
  heading: string;
  content: string;
  /** Optional supporting image for this section only — a terminal, route
   * landmark, or destination the section is actually about. Omit unless it
   * adds real information; guides stay text-first by design. */
  image?: string;
  imageAlt?: string;
  /** A short bullet list belonging to this section (checklist, practical
   * points) — rendered under the paragraph, not a replacement for it. */
  list?: string[];
  /** A comparison/reference table belonging to this section. Every cell
   * must be genuine, verifiable information — never an invented figure. */
  table?: { headers: string[]; rows: string[][] };
  /** Render a contextual CTA card immediately after this section — used
   * sparingly (informational-blog brief §22: intro → mid-article →
   * closing, never more). */
  cta?: { text: string; link: string; isWhatsapp?: boolean };
}

export interface GuideData {
  title: string;
  subtitle: string;
  eyebrow: string;
  path: string;
  category?: { label: string; href: string };
  /** 3-5 line "Quick Answer" summary box shown right after the hero —
   * answers the core query directly before the full article, for both the
   * reader and featured-snippet eligibility. */
  keyTakeaways?: string[];
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
  /** Closing-section heading — defaults to the original generic line so
   * every existing guide renders exactly as before. */
  closingHeading?: string;
  ctaHelper?: string;
  /** "Related Resources" cards — the article's outbound internal-linking
   * network (informational-blog brief §7): commercial pages, city/airport
   * pages, and other guides, each with a one-line reason a reader would
   * actually click it. */
  relatedLinks?: { href: string; label: string; reason: string }[];
  /** One thematically-paired guide, for a single "see also" sentence —
   * kept for the existing thin guides; new guides should prefer
   * `relatedLinks` for a fuller network. */
  relatedGuide?: { href: string; label: string };
  /** Editorial freshness stamp — only ever set when the content has
   * actually just been reviewed (ground rule against fake update dates). */
  lastReviewed?: string;
}

/** Exported so BlogPost can render the identical checklist markup. */
export function GuideList({ items }: { items: string[] }) {
  return (
    <ul style={{ marginTop: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
      {items.map((item, j) => (
        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)", color: "var(--text-body)", lineHeight: 1.6 }}>
          <CheckCircleIcon size={16} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 3 }} />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Exported so BlogPost can reuse the same table rather than a copy of it. */
export function GuideTable({ table }: { table: NonNullable<GuideSection["table"]> }) {
  return (
    <div style={{ marginTop: "var(--space-6)", overflowX: "auto", borderRadius: "var(--radius-md)", border: "1px solid var(--line)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
        <thead>
          <tr style={{ background: "var(--bg-subtle)" }}>
            {table.headers.map((h) => (
              <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--text-main)", borderBottom: "1px solid var(--line)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < table.rows.length - 1 ? "1px solid var(--line)" : "none" }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "12px 16px", fontSize: "var(--text-sm)", color: "var(--text-body)" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Exported so BlogPost can place the same contextual CTA card mid-article. */
export function SectionCta({ cta }: { cta: NonNullable<GuideSection["cta"]> }) {
  if (cta.isWhatsapp) {
    return (
      <div style={{ marginTop: "var(--space-6)", padding: "var(--space-6)", borderRadius: "var(--radius-md)", background: "var(--bg-subtle)", border: "1px solid var(--line)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)" }}>
        <p style={{ margin: 0, color: "var(--text-main)", fontWeight: 600 }}>{cta.text}</p>
        <a href={waLink(cta.text)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
          <WhatsAppIcon size={15} /> WhatsApp Us
        </a>
      </div>
    );
  }
  return (
    <div style={{ marginTop: "var(--space-6)", padding: "var(--space-6)", borderRadius: "var(--radius-md)", background: "var(--bg-subtle)", border: "1px solid var(--line)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)" }}>
      <p style={{ margin: 0, color: "var(--text-main)", fontWeight: 600 }}>{cta.text}</p>
      <Link href={cta.link} className="btn btn-secondary btn-sm">
        View Service <ArrowRightIcon size={14} />
      </Link>
    </div>
  );
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
            <Link href="/">Home</Link> / <Link href="/our-services">Guides</Link>
            {data.category && <> / <Link href={data.category.href}>{data.category.label}</Link></>}
            {" "}/ <span>{data.title}</span>
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

      {data.keyTakeaways && data.keyTakeaways.length > 0 && (
        <div className="container" style={{ marginTop: "var(--space-10)" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", padding: "var(--space-7) var(--space-8)", borderRadius: "var(--radius-lg)", background: "var(--bg-subtle)", border: "1px solid var(--line)", borderLeft: "4px solid var(--accent)" }}>
            <p style={{ margin: "0 0 var(--space-3)", fontWeight: 700, color: "var(--text-main)", fontSize: "var(--text-sm)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Quick Answer</p>
            <ul style={{ margin: 0, paddingLeft: "var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              {data.keyTakeaways.map((t, i) => (
                <li key={i} style={{ color: "var(--text-body)", lineHeight: 1.7 }}>{t}</li>
              ))}
            </ul>
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
                {s.list && s.list.length > 0 && <GuideList items={s.list} />}
                {s.table && <GuideTable table={s.table} />}
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
                {s.cta && <SectionCta cta={s.cta} />}
              </div>
            ))}
            {data.relatedGuide && (
              <p style={{ color: "var(--text-body)", lineHeight: 1.8 }}>
                See also our <Link href={data.relatedGuide.href} style={{ color: "var(--accent)", fontWeight: 600 }}>{data.relatedGuide.label}</Link>.
              </p>
            )}
            {data.lastReviewed && (
              <p style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)", margin: 0 }}>Last reviewed: {data.lastReviewed}</p>
            )}
          </div>
        </div>
      </section>

      {data.relatedLinks && data.relatedLinks.length > 0 && (
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Related Resources</span>
              <h2 className="section-title">Continue Planning Your Trip</h2>
            </div>
            <div className="grid-3">
              {data.relatedLinks.map((l) => (
                <Link key={l.href} href={l.href} className="card" style={{ display: "block", textDecoration: "none" }}>
                  <h3 style={{ color: "var(--text-main)", fontSize: "var(--text-lg)", marginBottom: "var(--space-2)" }}>{l.label}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", margin: 0 }}>{l.reason}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" style={{ background: data.relatedLinks?.length ? "var(--bg-base)" : "var(--bg-subtle)" }}>
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
          <h2 style={{ color: "var(--text-main)", marginBottom: "var(--space-4)" }}>{data.closingHeading ?? "Ready to Travel? Book with Gulf Trip Service"}</h2>
          {data.ctaHelper && (
            <p style={{ color: "var(--on-dark-muted)", maxWidth: 560, margin: "0 auto var(--space-8)", lineHeight: 1.8 }}>{data.ctaHelper}</p>
          )}
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap", marginTop: data.ctaHelper ? 0 : "var(--space-6)" }}>
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
