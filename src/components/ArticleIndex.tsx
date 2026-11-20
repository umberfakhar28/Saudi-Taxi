import Link from "@/components/IntentLink";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import { PostCard } from "@/components/ArticlePage";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { waLink } from "@/lib/contact";
import { SITE_CONFIG } from "@/lib/seo";
import { ARTICLES, TOPICS, TOPIC_ORDER } from "@/lib/articles";
import s from "./ArticlePage.module.css";
import x from "./ArticleIndex.module.css";

/**
 * /blog and /guides: posts grouped by topic, featured posts first, and a
 * band pointing to the other index. Both read the one registry in
 * lib/articles.ts.
 */
export default function ArticleIndex({ kind, h1, lead }: { kind: "blog" | "guide"; h1: string; lead: string }) {
  const path = kind === "blog" ? "/blog" : "/guides";
  const name = kind === "blog" ? "Blog" : "Guides";
  const mine = ARTICLES.filter((a) => a.kind === kind);
  const featured = mine.filter((a) => a.featured);
  const topics = TOPIC_ORDER.filter((t) => mine.some((a) => a.topic === t));
  const other = kind === "blog" ? { href: "/guides", label: "Travel guides", body: "Airports, borders, the Red Sea coast, Umrah transport and getting around with a driver." }
    : { href: "/blog", label: "The blog", body: "Family trips, Abha vs Taif, Bahrain to Dammam options and city tips." };

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: h1,
      url: `${SITE_CONFIG.baseUrl}${path}`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: mine.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_CONFIG.baseUrl}${a.path}`, name: a.title })),
      },
    },
    breadcrumbSchema([{ name: "Home", path: "/" }, { name, path }]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main data-page-template={`${kind}-index`} className={s.page}>
        <section className={s.hero}>
          <div className="container">
            <nav aria-label="Breadcrumb" className={s.breadcrumb}>
              <ol>
                <li><Link href="/">Home</Link></li>
                <li aria-current="page">{name}</li>
              </ol>
            </nav>
            <span className={s.heroEyebrow}>{kind === "blog" ? "Travel blog" : "Travel guides"}</span>
            <h1 className={s.heroTitle}>{h1}</h1>
            <p className={s.heroLead}>{lead}</p>
            <ul className={x.topicChips}>
              {topics.map((t) => (
                <li key={t}><a href={`#${t}`}>{TOPICS[t].label}</a></li>
              ))}
            </ul>
          </div>
        </section>

        {featured.length > 0 && (
          <section className={s.bandPlain}>
            <div className="container">
              <div className={s.bandHead}>
                <span className={s.eyebrow}>Most read</span>
                <h2 className={s.bandTitle}>Start here</h2>
              </div>
              <div className={s.postGrid}>
                {featured.map((a) => <PostCard key={a.path} a={a} />)}
              </div>
            </div>
          </section>
        )}

        {topics.map((t, i) => {
          const list = mine.filter((a) => a.topic === t);
          return (
            <section key={t} id={t} className={`${i % 2 === 0 ? s.band : s.bandPlain} ${x.topic}`}>
              <div className="container">
                <div className={s.bandHead}>
                  <span className={s.eyebrow}>{list.length} {list.length === 1 ? (kind === "blog" ? "post" : "guide") : (kind === "blog" ? "posts" : "guides")}</span>
                  <h2 className={s.bandTitle}>{TOPICS[t].label}</h2>
                  <p className={x.topicBlurb}>{TOPICS[t].blurb}</p>
                </div>
                <div className={s.postGrid}>
                  {list.map((a) => <PostCard key={a.path} a={a} />)}
                </div>
              </div>
            </section>
          );
        })}

        <section className={s.bandPlain}>
          <div className="container">
            <Link href={other.href} className={x.crossLink}>
              <span>
                <span className={s.eyebrow}>Also on Gulf Trip Service</span>
                <span className={x.crossTitle}>{other.label}</span>
                <span className={x.crossBody}>{other.body}</span>
              </span>
              <ArrowRight size={22} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className={s.final}>
          <div className="container">
            <div className={s.finalInner}>
              <h2 className={s.finalTitle}>Planning a trip? Book a private car</h2>
              <p className={s.finalBody}>Airport pickups, trips between cities and across the borders to Bahrain, Qatar, Kuwait and the UAE, 24/7.</p>
              <div className={`${s.btnRow} ${s.finalButtons}`}>
                <a href={waLink("Hi, I'd like to book a private car.")} className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer" data-wa-cta="blog-final">
                  <WhatsAppIcon size={18} /> Book on WhatsApp
                </a>
                <Link href="/book-online" className={`btn btn-lg ${s.btnOnDark}`} data-wa-cta="blog-final">Book online</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
