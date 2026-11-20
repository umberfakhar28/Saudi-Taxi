import Link from "@/components/IntentLink";
import Image from "next/image";
import {
  Car, Users, Plane, Flag, Map, Clock, Route, ShieldCheck, Sun, Mountain, Waves, Moon, Luggage,
  Baby, Briefcase, TrainFront, Bus, Star, CircleCheck, Calendar, Info, Building2, Wallet, Hotel,
  Lightbulb, TriangleAlert, ArrowRight, ChevronDown, type LucideIcon,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import { faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { waLink } from "@/lib/contact";
import { SITE_CONFIG } from "@/lib/seo";
import {
  ARTICLES, TOPICS, articleByPath,
  type ArticleData, type ArticleBlock, type ArticleIcon, type ArticleSummary,
} from "@/lib/articles";
import s from "./ArticlePage.module.css";

/** Imported by name so the rest of Lucide is tree-shaken out. */
const ICONS: Record<ArticleIcon, LucideIcon> = {
  car: Car, users: Users, plane: Plane, flag: Flag, map: Map, clock: Clock, route: Route,
  shield: ShieldCheck, sun: Sun, mountain: Mountain, waves: Waves, moon: Moon, luggage: Luggage,
  baby: Baby, briefcase: Briefcase, train: TrainFront, bus: Bus, star: Star, check: CircleCheck,
  calendar: Calendar, info: Info, building: Building2, wallet: Wallet, hotel: Hotel,
};

function Icon({ name, size = 20 }: { name: ArticleIcon; size?: number }) {
  const C = ICONS[name];
  return <span className={s.icon} aria-hidden="true"><C size={size} strokeWidth={1.8} /></span>;
}

/* ── Inline text: **bold** and [anchor](/path) ─────────────────────── */

const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export function rich(text: string): React.ReactNode {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(m[1] !== undefined
      ? <strong key={at}>{m[1]}</strong>
      : <Link key={at} href={m[3]}>{m[2]}</Link>);
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** The same text without markup: JSON-LD and word counts. */
export const plain = (text: string) => text.replace(INLINE, (_, bold, anchor) => bold ?? anchor);

const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function blockText(b: ArticleBlock): string {
  switch (b.type) {
    case "p": case "subhead": return b.text;
    case "list": return b.items.join(" ");
    case "table": return [...b.head, ...b.rows.flat(), b.note ?? ""].join(" ");
    case "timeline": return b.items.map((i) => `${i.title} ${i.body}`).join(" ");
    case "cards": return b.items.map((i) => `${i.title} ${i.body}`).join(" ");
    case "callout": return `${b.title ?? ""} ${b.text}`;
    default: return "";
  }
}

function readingMinutes(d: ArticleData): number {
  const text = [d.lead, ...d.sections.flatMap((x) => [x.heading, ...x.blocks.map(blockText)]), ...d.faqs.flatMap((f) => [f.q, f.a])].join(" ");
  return Math.max(3, Math.round(plain(text).split(/\s+/).length / 200));
}

/* ── Buttons ───────────────────────────────────────────────────────── */

function WhatsAppButton({ message, cta, onDark = false }: { message: string; cta: string; onDark?: boolean }) {
  return (
    <a href={waLink(message)} className={`btn btn-whatsapp ${onDark ? "btn-lg" : ""}`} target="_blank" rel="noopener noreferrer" data-wa-cta={cta}>
      <WhatsAppIcon size={18} /> Book on WhatsApp
    </a>
  );
}

function BookButton({ href, cta, className }: { href: string; cta: string; className: string }) {
  return <Link href={href} className={className} data-wa-cta={cta}>Book online</Link>;
}

/* ── Blocks ────────────────────────────────────────────────────────── */

function Block({ b, d }: { b: ArticleBlock; d: ArticleData }) {
  switch (b.type) {
    case "p":
      return <p className={s.p}>{rich(b.text)}</p>;
    case "subhead":
      return <h3 className={s.h3} id={b.id}>{b.text}</h3>;
    case "list": {
      const L = b.ordered ? "ol" : "ul";
      return (
        <L className={b.ordered ? s.olist : s.list}>
          {b.items.map((t, i) => <li key={i}>{rich(t)}</li>)}
        </L>
      );
    }
    case "table":
      return (
        <figure className={s.tableFigure}>
          {b.caption && <figcaption className={s.tableCaption}>{b.caption}</figcaption>}
          <div className={s.tableWrap} role="region" aria-label={b.caption ?? b.head.join(", ")} tabIndex={0}>
            <table className={s.table}>
              <thead><tr>{b.head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
              <tbody>
                {b.rows.map((r, i) => (
                  <tr key={i} className={b.highlightRow === i ? s.rowHighlight : undefined}>
                    {r.map((c, j) => j === 0 ? <th key={j} scope="row">{rich(c)}</th> : <td key={j}>{rich(c)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.note && <p className={s.tableNote}>{rich(b.note)}</p>}
        </figure>
      );
    case "timeline":
      return (
        <ol className={s.timeline}>
          {b.items.map((it, i) => (
            <li key={i} className={s.tlItem}>
              <span className={s.tlWhen}>{it.when}</span>
              <div className={s.tlCard}>
                <h3 className={s.tlTitle}>{it.title}</h3>
                <p>{rich(it.body)}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "cards":
      return (
        <ul className={s.cards}>
          {b.items.map((c, i) => (
            <li key={i} className={s.card}>
              <div className={s.cardHead}>
                {c.icon && <span className={s.chip}><Icon name={c.icon} /></span>}
                <div>
                  {c.tag && <span className={s.cardTag}>{c.tag}</span>}
                  <h3 className={s.cardTitle}>{c.title}</h3>
                </div>
              </div>
              <p className={s.cardBody}>{rich(c.body)}</p>
              {c.href && (
                <Link href={c.href} className={s.cardLink}>
                  {c.linkLabel ?? "Read more"} <ArrowRight size={15} aria-hidden="true" />
                </Link>
              )}
            </li>
          ))}
        </ul>
      );
    case "callout": {
      const C = b.tone === "warn" ? TriangleAlert : b.tone === "tip" ? Lightbulb : Info;
      return (
        <aside className={`${s.callout} ${s[`callout_${b.tone}`]}`}>
          <span className={s.calloutIcon} aria-hidden="true"><C size={20} strokeWidth={1.8} /></span>
          <div>
            {b.title && <p className={s.calloutTitle}>{b.title}</p>}
            <p>{rich(b.text)}</p>
          </div>
        </aside>
      );
    }
    case "cta":
      return (
        <aside className={s.inlineCta} aria-label="Book a private car">
          <div>
            <p className={s.inlineCtaTitle}>{b.heading ?? d.cta.heading}</p>
            <p className={s.inlineCtaBody}>{b.body ?? d.cta.body}</p>
          </div>
          <div className={s.btnRow}>
            <WhatsAppButton message={d.cta.waMessage} cta="blog-inline" />
            <BookButton href={d.cta.bookHref} cta="blog-inline" className={`btn ${s.btnOutline}`} />
          </div>
        </aside>
      );
    case "image":
      return (
        <figure className={s.figure}>
          <Image src={b.image.src} alt={b.image.alt} width={b.image.width} height={b.image.height} sizes="(max-width: 820px) 100vw, 760px" />
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      );
  }
}

/* ── Cards for related posts ───────────────────────────────────────── */

function PostCard({ a }: { a: ArticleSummary }) {
  const topic = TOPICS[a.topic];
  return (
    <Link href={a.path} className={s.postCard}>
      <div className={s.postMedia}>
        {a.cover
          ? <Image src={a.cover.src} alt={a.cover.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px" />
          : <span className={s.postMediaIcon}><Icon name={topic.icon} size={34} /></span>}
      </div>
      <div className={s.postBody}>
        <span className={s.postTag}>{a.kind === "guide" ? "Guide" : "Blog"} · {topic.label}</span>
        <h3 className={s.postTitle}>{a.title}</h3>
        <p className={s.postExcerpt}>{a.excerpt}</p>
      </div>
    </Link>
  );
}

export { PostCard };

/* ── The page ──────────────────────────────────────────────────────── */

export default function ArticlePage({ data: d }: { data: ArticleData }) {
  const base = SITE_CONFIG.baseUrl;
  const url = `${base}${d.path}`;
  const indexPath = d.kind === "blog" ? "/blog" : "/guides";
  const indexName = d.kind === "blog" ? "Blog" : "Guides";
  const topic = TOPICS[d.topic];
  const summary = articleByPath(d.path);
  const crumbLabel = summary?.title ?? d.h1;
  const minutes = readingMinutes(d);
  const image = d.ogImage ?? d.cover?.src ?? SITE_CONFIG.defaultOgImage;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": d.kind === "blog" ? "BlogPosting" : "Article",
      headline: d.h1,
      description: d.description,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      image: `${base}${image}`,
      datePublished: d.published,
      dateModified: d.updated,
      inLanguage: "en",
      articleSection: topic.label,
      author: { "@type": "Organization", name: "Gulf Trip Service travel team", url: `${base}/about-us` },
      publisher: { "@type": "Organization", name: SITE_CONFIG.siteName, logo: { "@type": "ImageObject", url: `${base}/logo.svg` } },
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: indexName, path: indexPath },
      { name: crumbLabel, path: d.path },
    ]),
    ...(d.faqs.length ? [faqSchema(d.faqs.map((f) => ({ question: f.q, answer: plain(f.a) })))] : []),
  ];

  const related = d.related.map((p) => ARTICLES.find((a) => a.path === p)).filter((a): a is ArticleSummary => !!a);

  const stats = (
    <ul className={s.stats}>
      {d.quickAnswer.stats.map((st) => (
        <li key={st.label} className={s.stat}>
          <span className={s.statChip}><Icon name={st.icon} size={18} /></span>
          <span>
            <span className={s.statLabel}>{st.label}</span>
            <span className={s.statValue}>{st.value}</span>
          </span>
        </li>
      ))}
    </ul>
  );

  const toc = d.sections.map((x) => (
    <li key={x.id}><a href={`#${x.id}`}>{x.toc ?? x.heading}</a></li>
  ));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main data-page-template={d.kind} data-route={d.cta.route} className={s.page}>

        <section className={s.hero}>
          <div className="container">
            <nav aria-label="Breadcrumb" className={s.breadcrumb}>
              <ol>
                <li><Link href="/">Home</Link></li>
                <li><Link href={indexPath}>{indexName}</Link></li>
                <li aria-current="page">{crumbLabel}</li>
              </ol>
            </nav>
            <div className={`${s.heroGrid} ${d.cover ? "" : s.heroGridGlance}`}>
              <div>
                <span className={s.heroEyebrow}>{d.kind === "guide" ? "Travel guide" : "Blog"} · {topic.label}</span>
                <h1 className={s.heroTitle}>{d.h1}</h1>
                <p className={s.heroLead}>{rich(d.lead)}</p>
                <p className={s.byline}>
                  <span><Calendar size={15} aria-hidden="true" /> Updated <time dateTime={d.updated}>{longDate(d.updated)}</time></span>
                  <span><Clock size={15} aria-hidden="true" /> {minutes} min read</span>
                  <span>By the Gulf Trip Service travel team</span>
                </p>
                <div className={s.btnRow}>
                  <WhatsAppButton message={d.cta.waMessage} cta="blog-hero" onDark />
                  <BookButton href={d.cta.bookHref} cta="blog-hero" className={`btn btn-lg ${s.btnOnDark}`} />
                </div>
              </div>
              {d.cover ? (
                <figure className={s.heroFigure}>
                  <Image src={d.cover.src} alt={d.cover.alt} width={d.cover.width} height={d.cover.height} priority sizes="(max-width: 1024px) 100vw, 560px" />
                </figure>
              ) : (
                <div className={s.glance}>
                  <p className={s.glanceTitle}>At a glance</p>
                  {stats}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className={s.quick} aria-labelledby="quick-answer">
          <div className="container">
            <div className={s.quickBox}>
              <h2 id="quick-answer" className={s.quickTitle}><CircleCheck size={20} aria-hidden="true" /> Quick answer</h2>
              <ul className={s.quickList}>
                {d.quickAnswer.points.map((p, i) => <li key={i}>{rich(p)}</li>)}
              </ul>
              {d.cover && stats}
            </div>
          </div>
        </section>

        <div className="container">
          <div className={s.layout}>
            <aside className={s.tocAside} aria-label="On this page">
              <p className={s.tocTitle}>On this page</p>
              <ol className={s.tocList}>{toc}</ol>
            </aside>

            <article className={s.article}>
              <details className={s.tocMobile}>
                <summary>On this page <ChevronDown size={18} aria-hidden="true" /></summary>
                <ol className={s.tocList}>{toc}</ol>
              </details>

              {d.sections.map((x) => (
                <section key={x.id} id={x.id} className={s.section}>
                  <h2 className={s.h2}>{x.heading}</h2>
                  {x.blocks.map((b, i) => <Block key={i} b={b} d={d} />)}
                </section>
              ))}

              {d.faqs.length > 0 && (
                <section id="faq" className={s.section}>
                  <h2 className={s.h2}>Frequently asked questions</h2>
                  <div className={s.faqList}>
                    {d.faqs.map((f) => (
                      <details key={f.q} className={s.faq}>
                        <summary><h3>{f.q}</h3><ChevronDown size={18} aria-hidden="true" className={s.faqChevron} /></summary>
                        <p>{rich(f.a)}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              <footer className={s.author}>
                <span className={s.authorMark} aria-hidden="true">GTS</span>
                <div>
                  <p className={s.authorName}>Gulf Trip Service travel team</p>
                  <p className={s.authorBio}>
                    We drive private transfers across Saudi Arabia and to Bahrain, Qatar, Kuwait and the UAE every day.
                    This {d.kind === "guide" ? "guide" : "post"} was last checked on {longDate(d.updated)}. <Link href="/about-us">About us</Link>
                  </p>
                  {d.sourcesNote && <p className={s.sources}>{rich(d.sourcesNote)}</p>}
                </div>
              </footer>
            </article>
          </div>
        </div>

        {d.routes.length > 0 && (
          <section className={s.band}>
            <div className="container">
              <div className={s.bandHead}>
                <span className={s.eyebrow}>Book the trip</span>
                <h2 className={s.bandTitle}>Related routes and services</h2>
              </div>
              <ul className={s.routeGrid}>
                {d.routes.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className={s.routeCard}>
                      <span className={s.chip}><Icon name={r.icon ?? "route"} /></span>
                      <span>
                        <span className={s.routeTitle}>{r.title}</span>
                        <span className={s.routeBody}>{r.body}</span>
                      </span>
                      <ArrowRight size={18} aria-hidden="true" className={s.routeArrow} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className={s.bandPlain}>
            <div className="container">
              <div className={s.bandHead}>
                <span className={s.eyebrow}>Keep reading</span>
                <h2 className={s.bandTitle}>Related guides</h2>
              </div>
              <div className={s.postGrid}>
                {related.map((a) => <PostCard key={a.path} a={a} />)}
              </div>
            </div>
          </section>
        )}

        <section className={s.final}>
          <div className="container">
            <div className={s.finalInner}>
              <h2 className={s.finalTitle}>{d.cta.heading}</h2>
              <p className={s.finalBody}>{d.cta.body}</p>
              <div className={`${s.btnRow} ${s.finalButtons}`}>
                <WhatsAppButton message={d.cta.waMessage} cta="blog-final" onDark />
                <BookButton href={d.cta.bookHref} cta="blog-final" className={`btn btn-lg ${s.btnOnDark}`} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
