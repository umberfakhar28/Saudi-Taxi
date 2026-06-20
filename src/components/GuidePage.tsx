import Link from "next/link";

export interface GuideSection {
  heading: string;
  content: string;
}

export interface GuideData {
  title: string;
  subtitle: string;
  eyebrow: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  ctaText: string;
  ctaLink: string;
}

export default function GuidePage({ data }: { data: GuideData }) {
  return (
    <main>
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

      <section className="section-lg">
        <div className="container">
          <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-12)" }}>
            {data.sections.map((s, i) => (
              <div key={i}>
                <h2 style={{ color: "var(--text-main)", fontSize: "var(--text-2xl)", marginBottom: "var(--space-4)", borderLeft: "3px solid var(--accent)", paddingLeft: "var(--space-5)" }}>{s.heading}</h2>
                <p style={{ color: "var(--text-body)", lineHeight: 1.85 }}>{s.content}</p>
              </div>
            ))}
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
            <Link href="/quote" className="btn btn-secondary btn-lg">Get Instant Quote</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
