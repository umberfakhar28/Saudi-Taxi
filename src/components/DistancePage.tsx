import { Fragment } from "react";
import Link from "@/components/IntentLink";
import {
  MapPin, Clock, Landmark, Tag, Info, ChevronDown, ArrowRight, CircleCheck, Route as RouteIcon,
  Coffee, Car, ShieldCheck, House, Luggage, Fuel, MessageCircle, Users, Briefcase, Plane, FileCheck,
  BadgeCheck, CalendarCheck, Navigation, Headset, CreditCard, Banknote, Mail, Receipt, Building2,
  Languages, Anchor, type LucideIcon,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import { faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { waLink } from "@/lib/contact";
import { distanceRoutes, kmLabel, type DistanceRouteData } from "@/lib/distanceRouteData";
import { distanceFare, fillFare } from "@/lib/distanceFare";
import type { LandingIcon } from "@/lib/routeLanding";
import s from "./RouteLanding.module.css";
import d from "./DistancePage.module.css";

const ICONS: Record<LandingIcon, LucideIcon> = {
  mapPin: MapPin, clock: Clock, landmark: Landmark, route: RouteIcon, coffee: Coffee, tag: Tag,
  car: Car, shieldCheck: ShieldCheck, home: House, luggage: Luggage, fuel: Fuel,
  messageCircle: MessageCircle, users: Users, briefcase: Briefcase, plane: Plane,
  fileCheck: FileCheck, badgeCheck: BadgeCheck, calendarCheck: CalendarCheck,
  navigation: Navigation, headset: Headset, creditCard: CreditCard, banknote: Banknote,
  mail: Mail, receipt: Receipt, building: Building2, languages: Languages, anchor: Anchor,
};

function Icon({ name, size = 20, chip }: { name: LandingIcon; size?: number; chip?: boolean }) {
  const Svg = ICONS[name];
  return (
    <span className={chip ? s.chip : s.icon} aria-hidden="true">
      <Svg size={size} strokeWidth={2} aria-hidden="true" focusable="false" />
    </span>
  );
}

/** **bold** and [anchor](/path), as on the route pages. */
const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\((\/[^)\s]*)\)/g;
function rich(text: string): React.ReactNode {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(m[1] !== undefined ? <strong key={at} className={s.em}>{m[1]}</strong> : <Link key={at} href={m[3]}>{m[2]}</Link>);
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
const plain = (text: string) => text.replace(INLINE, (_, bold, anchor) => bold ?? anchor);

function Head({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className={`${s.head} ${s.headCenter}`}>
      <span className={s.eyebrow}>{eyebrow}</span>
      <h2 className={s.title}>{title}</h2>
      {intro && <p className={`${s.sub} ${s.inlineLink}`}>{rich(intro)}</p>}
    </div>
  );
}

const bookOnlineFallback = (from: string, to: string) =>
  `/book-online?${new URLSearchParams({ mode: "transfers", from, to }).toString()}`;

/**
 * The /distance/[pair] template (docs/seo/distance/distance-audit.md):
 * answer first, booking box beside it, then the reverse direction, the
 * road, the border, ways to travel, tips, FAQ and related routes.
 *
 * Built from one record per pair (lib/distanceRouteData.ts); the fare
 * comes from the route page's own data (lib/distanceFare.ts). Same design
 * tokens and section styles as the redesigned route pages. A server
 * component: the FAQ uses <details>, so no client JavaScript is needed.
 */
export default function DistancePage({ data }: { data: DistanceRouteData }) {
  const A = data.origin;
  const B = data.destination;
  const f = (t: string) => fillFare(t, data);
  const fare = distanceFare(data);
  const km = kmLabel(data);
  const message = `Hi, I want to book ${A} to ${B}`;
  const bookHref = data.routeForward ? `${data.routeForward.href}#booking` : bookOnlineFallback(A, B);
  const reverseHref = data.routeReverse?.href ?? bookOnlineFallback(B, A);

  const answer = `The road distance from ${A} to ${B} is about **${data.km.toLocaleString("en-US")} km**, around **${data.drive}** by car${data.border ? `, plus border time at the ${data.border.name}` : ""}.`;

  const faqs = [...data.faqs, ...(data.arabic?.faqs ?? [])].map((x) => ({ q: f(x.q), a: f(x.a) }));
  const schemas = [
    faqSchema(faqs.map((x) => ({ question: x.q, answer: plain(x.a) }))),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Distance Guides", path: "/distance" },
      { name: data.breadcrumbLabel, path: `/distance/${data.slug}` },
    ]),
  ];

  const related = data.relatedDistanceSlugs.map((x) => distanceRoutes[x]).filter((x): x is DistanceRouteData => Boolean(x));
  const routeCards = [data.routeForward, data.routeReverse].filter((x): x is { href: string; label: string } => Boolean(x));

  /* Sections after the hero, in order. Backgrounds alternate by position. */
  const sections: { key: string; render: (bg: string) => React.ReactNode }[] = [
    {
      key: "reverse",
      render: (bg) => (
        <section className={`section ${bg}`}>
          <div className="container">
            <div className={d.reverse}>
              <div>
                <span className={s.eyebrow}>Both directions</span>
                <h2 className={s.title}>{B} to {A} Distance by Road</h2>
                <p className={`${s.lead} ${s.inlineLink}`}>{rich(f(data.reverse))}</p>
              </div>
              <Link href={reverseHref} className={`btn btn-primary ${d.reverseCta}`}>
                {data.routeReverse?.label ?? `Book ${B} to ${A}`} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      ),
    },
    ...(data.table
      ? [{
          key: "table",
          render: (bg: string) => (
            <section className={`section ${bg}`}>
              <div className="container">
                <Head eyebrow="Compare" title={data.table!.heading} intro={data.table!.intro} />
                <div className={d.tableWrap}>
                  <table className={d.table}>
                    <thead><tr>{data.table!.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
                    <tbody>
                      {data.table!.rows.map((r) => (
                        <tr key={r[0]}>{r.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{f(c)}</td>))}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {data.table!.note && <p className={s.smallNote}>{data.table!.note}</p>}
              </div>
            </section>
          ),
        }]
      : []),
    {
      key: "route",
      render: (bg) => (
        <section className={`section ${bg}`}>
          <div className="container">
            <div className={s.head}>
              <span className={s.eyebrow}>Route &amp; highways</span>
              <h2 className={s.title}>The Road from {A} to {B}</h2>
              <p className={s.sub}>{data.routeIntro}</p>
            </div>
            <div className={s.timelineSolo}>
              <ol className={s.timeline}>
                {data.steps.map((st, i) => (
                  <li key={st.title} className={s.timelineStep}>
                    <span className={`${s.chip} ${d.stepNo}`} aria-hidden="true">{i + 1}</span>
                    <div>
                      <h3 className={s.timelineTitle}>{st.title}</h3>
                      <p className={s.timelineBody}>{st.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <p className={d.highways}><Icon name="route" size={18} /> <span><strong>Main roads:</strong> {data.highways}</span></p>
            {data.altRoute && (
              <p className={s.callout} role="note"><span className={s.icon} aria-hidden="true"><Info size={20} aria-hidden="true" /></span>{data.altRoute}</p>
            )}
          </div>
        </section>
      ),
    },
    ...(data.border
      ? [{
          key: "border",
          render: (bg: string) => {
            const b = data.border!;
            return (
              <section className={`section ${bg}`}>
                <div className="container">
                  <Head eyebrow="Border crossing" title={`Crossing at the ${b.name}`} intro={b.posts} />
                  <div className={s.crossingGrid}>
                    <div className={s.card}>
                      <div className={s.cardHead}><Icon name="clock" chip /><h3>Waiting time</h3></div>
                      <p className={s.inlineLink}>{rich(b.wait)}</p>
                      <p className={d.cardNote}>You stay in the same car at both posts; your driver handles the vehicle&apos;s papers and fees.</p>
                    </div>
                    <div className={s.card}>
                      <div className={s.cardHead}><Icon name="fileCheck" chip /><h3>Documents</h3></div>
                      <ul className={s.checkList}>
                        {b.documents.map((x) => (
                          <li key={x}><span className={s.icon} aria-hidden="true"><CircleCheck size={18} aria-hidden="true" /></span> {x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className={s.callout} role="note"><span className={s.icon} aria-hidden="true"><Info size={20} aria-hidden="true" /></span>Entry rules change. Please verify with official authorities before travel.</p>
                  <div className={s.linkRow}>
                    {b.links.map((x) => <Link key={x.href} href={x.href} className="btn btn-outline-gold btn-sm">{x.label}</Link>)}
                  </div>
                </div>
              </section>
            );
          },
        }]
      : []),
    {
      key: "options",
      render: (bg) => (
        <section className={`section ${bg}`}>
          <div className="container">
            <Head eyebrow="Compare options" title={`Ways to Travel from ${A} to ${B}`} />
            <table className={s.compare}>
              <thead><tr>{["Option", "Door to door", "Time", "Connections", "Best for"].map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
              <tbody>
                {data.options.map((r) => (
                  <tr key={r.option} className={r.recommended ? s.compareOurs : undefined}>
                    <th scope="row">{r.option}{r.recommended && <span className={s.recommended}>Recommended</span>}</th>
                    <td data-label="Door to door">
                      <span className={r.doorToDoor ? s.yes : s.no} aria-hidden="true">{r.doorToDoor ? "✔" : "✖"}</span>
                      <span className="sr-only">{r.doorToDoor ? "Yes" : "No"}</span>
                    </td>
                    <td data-label="Time">{r.time}</td>
                    <td data-label="Connections">{r.transfers}</td>
                    <td data-label="Best for">{r.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ),
    },
    {
      key: "tips",
      render: (bg) => (
        <section className={`section ${bg}`}>
          <div className="container">
            <Head eyebrow="Travel tips" title={`Tips for the ${A} to ${B} Drive`} />
            <div className={`${s.includedGrid} ${data.tips.length === 5 ? d.tipsFive : ""}`}>
              {data.tips.map((t) => (
                <div key={t.title} className={s.revealItem}>
                  <div className={s.includedItem}>
                    <Icon name={t.icon} chip />
                    <h3>{t.title}</h3>
                    <p>{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },
    {
      key: "faq",
      render: (bg) => (
        <section className={`section ${bg}`}>
          <div className="container">
            <Head eyebrow="FAQ" title={`${A} to ${B} Distance: Your Questions Answered`} />
            <div className={s.faqList}>
              {faqs.map((x, i) => {
                const ar = /[؀-ۿ]/.test(x.q);
                return (
                  <details key={x.q} className={s.faq} open={i === 0} {...(ar ? { lang: "ar", dir: "rtl" } : {})}>
                    <summary>
                      <h3>{x.q}</h3>
                      <span className={`${s.icon} ${s.faqChevron}`} aria-hidden="true"><ChevronDown size={18} aria-hidden="true" /></span>
                    </summary>
                    <p className={s.inlineLink}>{rich(x.a)}</p>
                  </details>
                );
              })}
            </div>
            <p className={s.reviewed}>
              Distances checked against map routing on {new Date(data.verified).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}.
            </p>
          </div>
        </section>
      ),
    },
    {
      key: "related",
      render: (bg) => (
        <section className={`section ${bg}`}>
          <div className="container">
            <Head eyebrow="More routes" title="Book or Explore More Routes" />
            <div className={s.routeGrid}>
              {routeCards.map((r) => (
                <Link key={r.href} href={r.href} className={s.routeCard}>
                  <span className={s.routeTag}>Private taxi</span>
                  <h3 className={s.routeName}>{r.label}</h3>
                  <span className={s.viewLink}>View route and fares <ArrowRight size={14} aria-hidden="true" /></span>
                </Link>
              ))}
              {related.map((r) => (
                <Link key={r.slug} href={`/distance/${r.slug}`} className={s.routeCard}>
                  <span className={s.routeTag}>Distance · {kmLabel(r)}</span>
                  <h3 className={s.routeName}>
                    {r.origin} <ArrowRight size={16} aria-hidden="true" className={s.routeArrow} /><span className="sr-only">to</span> {r.destination}
                  </h3>
                  <span className={s.viewLink}>{r.origin} to {r.destination} distance <ArrowRight size={14} aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
            <div className={s.servicesRow}>
              <h3>Related pages</h3>
              {data.relatedLinks.map((x) => <Link key={x.href} href={x.href} className="btn btn-outline-gold btn-sm">{x.label}</Link>)}
              <Link href="/distance" className="btn btn-outline-gold btn-sm">All distance guides</Link>
            </div>
          </div>
        </section>
      ),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main data-page-template="distance" className={s.page}>
        {/* Hero: the answer first, the booking box beside it (under it on a
            phone, before the stat tiles). */}
        <section className={s.hero}>
          <div className="container">
            <nav aria-label="Breadcrumb" className={`breadcrumb ${s.breadcrumb}`}>
              <ol>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/distance">Distance Guides</Link></li>
                <li aria-current="page">{data.breadcrumbLabel}</li>
              </ol>
            </nav>
            <div className={d.heroGrid}>
              <div className={d.heroText}>
                <span className={s.heroEyebrow}>Distance guide</span>
                <h1 className={s.heroTitle}>{A} to {B} Distance by Road</h1>
                <p className={d.answer} data-distance-answer>{rich(answer)}</p>
                {data.arabic && <p className={d.arabic} lang="ar" dir="rtl">{f(data.arabic.answer)}</p>}
              </div>

              <aside className={d.booking} aria-label={`Book a taxi from ${A} to ${B}`}>
                <h2 className={d.bookingTitle}>Need a ride from {A} to {B}?</h2>
                <p className={d.bookingText}>
                  {fare ? <>Private taxi <strong>from {fare.en}</strong>, door to door.</> : <>Private taxi, door to door. We confirm your fare on WhatsApp.</>}
                </p>
                <div className={d.bookingButtons}>
                  <a href={waLink(message)} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer" data-wa-cta="distance-booking-box">
                    <span className={s.icon} aria-hidden="true"><WhatsAppIcon size={16} /></span> Book on WhatsApp
                  </a>
                  <Link href={bookHref} className="btn btn-primary">Book Online</Link>
                </div>
                <Link href={reverseHref} className={d.reverseLink}>
                  Travelling {B} to {A}? <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </aside>

              <ul className={d.tiles}>
                <li>
                  <span className={d.tileLabel}><MapPin size={14} aria-hidden="true" /> Distance</span>
                  <span className={d.tileValue}>{km}</span>
                </li>
                <li>
                  <span className={d.tileLabel}><Clock size={14} aria-hidden="true" /> Driving time</span>
                  <span className={d.tileValue}>{data.drive.replace(/^about /, "~")}</span>
                  {data.withBorder && <span className={d.tileSub}>{data.withBorder} with the border</span>}
                </li>
                <li>
                  <span className={d.tileLabel}><Landmark size={14} aria-hidden="true" /> Border</span>
                  <span className={d.tileValue}>{data.border ? data.border.name : "None"}</span>
                </li>
                <li>
                  <span className={d.tileLabel}><Tag size={14} aria-hidden="true" /> Private taxi</span>
                  <span className={d.tileValue}>{fare ? `From ${fare.en}` : "Quote on WhatsApp"}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {sections.map((x, i) => <Fragment key={x.key}>{x.render(i % 2 === 0 ? s.surface : s.tint)}</Fragment>)}

        <section className={s.finalCta}>
          <div className="container">
            <div className={s.finalInner}>
              <span className={s.heroEyebrow}>Private taxi</span>
              <h2 className={s.finalTitle}>Book Your {A} to {B} Taxi</h2>
              <p className={s.finalBody}>{fare ? `From ${fare.en} per car, ` : ""}one car and one driver, door to door, 24/7.</p>
              <div className={`${s.ctaRow} ${s.finalButtons}`}>
                <a href={waLink(message)} className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer" data-wa-cta="final-cta">
                  <span className={s.icon} aria-hidden="true"><WhatsAppIcon size={18} /></span> Book on WhatsApp
                </a>
                <Link href={bookHref} className={`btn btn-lg ${s.btnOnDark}`}>Book Online</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
