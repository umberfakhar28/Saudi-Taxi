import Link from "next/link";

export interface BlogPostData {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  body: { heading?: string; text: string }[];
}

export default function BlogPost({ data }: { data: BlogPostData }) {
  return (
    <main>
      <section className="page-hero">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="section-eyebrow">{data.category}</span>
          <h1>{data.title}</h1>
          <p style={{ opacity: 0.7, fontSize: "var(--text-sm)" }}>{data.date} · Gulf Trip Service</p>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / <span>{data.category}</span>
          </div>
        </div>
      </section>

      <section className="section-lg">
        <div className="container">
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <p style={{ color: "var(--text-body)", fontSize: "var(--text-lg)", lineHeight: 1.85, marginBottom: "var(--space-10)", borderLeft: "3px solid var(--accent)", paddingLeft: "var(--space-6)", fontStyle: "italic" }}>{data.excerpt}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
              {data.body.map((block, i) => (
                <div key={i}>
                  {block.heading && <h2 style={{ color: "var(--text-main)", fontSize: "var(--text-2xl)", marginBottom: "var(--space-4)" }}>{block.heading}</h2>}
                  <p style={{ color: "var(--text-body)", lineHeight: 1.85 }}>{block.text}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "var(--space-16)", padding: "var(--space-8)", background: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
              <h3 style={{ color: "var(--text-main)", marginBottom: "var(--space-3)" }}>Ready to Book Your Transfer?</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "var(--space-6)" }}>Professional, fixed-rate taxi service across Saudi Arabia — 24/7.</p>
              <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/book-online" className="btn btn-primary">Book Now</Link>
                <Link href="/quote" className="btn btn-secondary">Get Instant Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
