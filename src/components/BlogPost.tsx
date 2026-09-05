import Link from "next/link";
import Image from "next/image";
import { blogPostingSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { posts as allPosts } from "@/app/blog/page";
import { waLink } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/Icons";

export interface BlogPostData {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  path: string;
  /** Optional featured image — a contained, framed image below the hero
   * text (not a full-bleed hero), matching GuidePage's treatment so the
   * two long-form/editorial families read consistently. */
  featuredImage?: string;
  featuredImageAlt?: string;
  body: { heading?: string; text: string; image?: string; imageAlt?: string }[];
  /** Contextual links out to real service/city/route/guide pages. Blog
   * posts previously linked only to other blog posts, which left them
   * topically isolated — they passed no relevance to the commercial pages
   * they're written to support. Every href must resolve to a live page. */
  relatedServiceLinks?: { href: string; label: string; reason: string }[];
}

/** Same-category posts first, then fill to 4 with the rest — every post
 * gets real related reading even if its own category has few members
 * (e.g. the sole "Luxury Travel" post). Relevance-based, capped at 4. */
function relatedPosts(currentSlug: string, category: string) {
  const others = allPosts.filter((p) => p.slug !== currentSlug);
  const sameCategory = others.filter((p) => p.category === category);
  const rest = others.filter((p) => p.category !== category);
  return [...sameCategory, ...rest].slice(0, 4);
}

export default function BlogPost({ data }: { data: BlogPostData }) {
  const slug = data.path.replace("/blog/", "");
  const related = relatedPosts(slug, data.category);
  const schemas = [
    blogPostingSchema({
      headline: data.title,
      description: data.excerpt,
      url: data.path,
      datePublished: data.date,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: data.title, path: data.path },
    ]),
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
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

      {data.featuredImage && (
        <div className="container" style={{ marginTop: "var(--space-10)" }}>
          <div style={{ maxWidth: 780, margin: "0 auto", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
            <Image
              src={data.featuredImage}
              alt={data.featuredImageAlt ?? data.title}
              width={1560}
              height={878}
              priority
              sizes="(max-width: 780px) 100vw, 780px"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      )}

      <section className="section-lg">
        <div className="container">
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <p style={{ color: "var(--text-body)", fontSize: "var(--text-lg)", lineHeight: 1.85, marginBottom: "var(--space-10)", borderLeft: "3px solid var(--accent)", paddingLeft: "var(--space-6)", fontStyle: "italic" }}>{data.excerpt}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
              {data.body.map((block, i) => (
                <div key={i}>
                  {block.heading && <h2 style={{ color: "var(--text-main)", fontSize: "var(--text-2xl)", marginBottom: "var(--space-4)" }}>{block.heading}</h2>}
                  <p style={{ color: "var(--text-body)", lineHeight: 1.85 }}>{block.text}</p>
                  {block.image && (
                    <div style={{ marginTop: "var(--space-6)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
                      <Image
                        src={block.image}
                        alt={block.imageAlt ?? block.heading ?? data.title}
                        width={1200}
                        height={675}
                        sizes="(max-width: 780px) 100vw, 780px"
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {data.relatedServiceLinks && data.relatedServiceLinks.length > 0 && (
              <div style={{ marginTop: "var(--space-16)" }}>
                <h3 style={{ color: "var(--text-main)", fontSize: "var(--text-xl)", marginBottom: "var(--space-5)" }}>Plan Your Trip</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-4)" }}>
                  {data.relatedServiceLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="card" style={{ display: "block", textDecoration: "none" }}>
                      <h4 style={{ color: "var(--text-main)", fontSize: "var(--text-base)", lineHeight: 1.4, marginBottom: "var(--space-2)" }}>{l.label}</h4>
                      <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", margin: 0 }}>{l.reason}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {related.length > 0 && (
              <div style={{ marginTop: "var(--space-16)" }}>
                <h3 style={{ color: "var(--text-main)", fontSize: "var(--text-xl)", marginBottom: "var(--space-5)" }}>Related Reading</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-4)" }}>
                  {related.map((p) => (
                    <Link key={p.slug} href={`/blog/${p.slug}`} className="card" style={{ display: "block", textDecoration: "none", padding: p.featuredImage ? 0 : undefined, overflow: "hidden" }}>
                      {p.featuredImage && (
                        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
                          <Image
                            src={p.featuredImage}
                            alt={p.featuredImageAlt ?? p.title}
                            fill
                            sizes="220px"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      )}
                      <div style={{ padding: p.featuredImage ? "var(--space-5) var(--space-5) var(--space-6)" : undefined }}>
                        <span className="badge badge-gold" style={{ marginBottom: "var(--space-3)", display: "inline-flex" }}>{p.category}</span>
                        <h4 style={{ color: "var(--text-main)", fontSize: "var(--text-base)", lineHeight: 1.4, margin: 0 }}>{p.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: "var(--space-16)", padding: "var(--space-8)", background: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
              <h3 style={{ color: "var(--text-main)", marginBottom: "var(--space-3)" }}>Ready to Book Your Transfer?</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "var(--space-6)" }}>Professional, fixed-rate taxi service across Saudi Arabia — 24/7.</p>
              <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/book-online" className="btn btn-primary">Book Now</Link>
                <a href={waLink("Hi, I'd like to book a ride.")} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={16} /> Book on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
