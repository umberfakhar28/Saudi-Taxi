import Link from "next/link";
import Image from "next/image";
import { preload } from "react-dom";
import {
  MapPin, Clock, Landmark, Route, Coffee, Tag, Car, ShieldCheck, House, Luggage, Fuel,
  MessageCircle, Users, Briefcase, Plane, FileCheck, BadgeCheck, CalendarCheck, Navigation,
  Headset, ArrowRight, ChevronDown, Info, CircleCheck, type LucideIcon,
} from "lucide-react";
// Lucide ships no brand logos, so WhatsApp buttons keep the WhatsApp mark.
import { WhatsAppIcon } from "@/components/Icons";
import QuickBookForm from "@/components/QuickBookForm";
import Reveal from "@/components/Reveal";
import type { RouteData } from "@/components/RoutePage";
import { serviceSchema, faqSchema, breadcrumbSchema, videoSchema, jsonLd } from "@/lib/jsonld";
import { waLink, pageWhatsAppMessage } from "@/lib/contact";
import { formatRoutePrice } from "@/lib/routePricing";
import type { LandingIcon, LandingImage, LandingVehicle } from "@/lib/routeLanding";
import s from "./RouteLanding.module.css";

/** The only icons this page bundles: imported by name, so Lucide's other
 *  icons are tree-shaken out. */
const ICONS: Record<LandingIcon, LucideIcon> = {
  mapPin: MapPin, clock: Clock, landmark: Landmark, route: Route, coffee: Coffee, tag: Tag,
  car: Car, shieldCheck: ShieldCheck, home: House, luggage: Luggage, fuel: Fuel,
  messageCircle: MessageCircle, users: Users, briefcase: Briefcase, plane: Plane,
  fileCheck: FileCheck, badgeCheck: BadgeCheck, calendarCheck: CalendarCheck,
  navigation: Navigation, headset: Headset,
};

/** Decorative icon in a tinted chip (or bare). Hidden from screen readers,
 *  which read the text beside it. */
function Icon({ name, size = 20, chip }: { name: LandingIcon; size?: number; chip?: boolean }) {
  const Svg = ICONS[name];
  return (
    <span className={chip ? s.chip : s.icon} aria-hidden="true">
      <Svg size={size} strokeWidth={2} aria-hidden="true" focusable="false" />
    </span>
  );
}

/** [anchor](/path) links and **bold** figures. Bold renders in the accent
 *  ink, which is how the page highlights its key data. */
const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\((\/[^)\s]*)\)/g;
function rich(text: string): React.ReactNode {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(m[1] !== undefined
      ? <strong key={at} className={s.em}>{m[1]}</strong>
      : <Link key={at} href={m[3]}>{m[2]}</Link>);
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
/** The same text without markup, for JSON-LD. */
const plain = (text: string) => text.replace(INLINE, (_, bold, anchor) => bold ?? anchor);

/**
 * A photo, or the slot for one, in a box of fixed aspect ratio so swapping
 * a slot for its photo later shifts nothing. Photos with their own srcSet
 * are served as-is (already sized WebP); others go through next/image.
 */
function Media({ image, ratio, sizes, className }: { image: LandingImage; ratio: string; sizes: string; className?: string }) {
  if ("src" in image && image.srcSet) {
    return (
      <div className={`${s.media} ${className ?? ""}`} style={{ aspectRatio: ratio }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          srcSet={image.srcSet.map((x) => `${x.src} ${x.width}w`).join(", ")}
          sizes={sizes}
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }
  if ("src" in image) {
    return (
      <div className={`${s.media} ${className ?? ""}`} style={{ aspectRatio: ratio }}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} style={{ objectFit: "cover" }} />
      </div>
    );
  }
  return (
    // TODO: add image — see data-image-todo for the size, and aria-label for the alt text.
    <div
      className={`${s.placeholder} ${className ?? ""}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={image.alt}
      data-image-todo={`${image.todo} | alt="${image.alt}"`}
    >
      <Icon name="mapPin" size={28} />
      <span className={s.placeholderLabel} aria-hidden="true">Photo coming soon</span>
    </div>
  );
}

function SectionHeader({ eyebrow, title, intro, align = "center" }: { eyebrow: string; title: string; intro?: string; align?: "center" | "start" }) {
  return (
    <div className={`${s.head} ${align === "center" ? s.headCenter : ""}`}>
      <span className={s.eyebrow}>{eyebrow}</span>
      <h2 className={s.title}>{title}</h2>
      {intro && <p className={`${s.sub} ${s.inlineLink}`}>{rich(intro)}</p>}
    </div>
  );
}

const article = (word: string) => (/^[aeiou]/i.test(word) ? "an" : "a");

/** A generic "Book on WhatsApp" button with the page's fixed message. */
function WhatsAppButton({ message, cta }: { message: string; cta: string }) {
  return (
    <a href={waLink(message)} className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer" data-wa-cta={cta}>
      <span className={s.icon} aria-hidden="true"><WhatsAppIcon size={18} /></span> Book on WhatsApp
    </a>
  );
}

/**
 * The designed route layout: hero, booking form, highlights, prices,
 * videos, journey, border, inclusions, booking steps, destinations, FAQ,
 * return trip and other routes, each its own section. Used by routes that set
 * `RouteData.landing`; every other route keeps RoutePage.
 *
 * Colours come only from the page tokens at the top of
 * RouteLanding.module.css (primary navy, gold accent, ivory tint, white
 * surface, muted text, border); sections alternate white and ivory.
 */
export default function RouteLanding({ data }: { data: RouteData }) {
  const L = data.landing!;
  const { hero, prices } = L;
  const route = `${data.origin} to ${data.destination}`;
  const vehicles = prices.groups.flatMap((g) => g.vehicles);
  const priceText = (v: LandingVehicle) => (v.amount !== null ? formatRoutePrice(v.amount, prices.currency) : null);

  // Generic buttons send the page's one fixed message (lib/contact.ts), the
  // same one the header, floating button and mobile bar send.
  const genericMessage = pageWhatsAppMessage(`/${data.slug}`) ?? `Hi, I want to book ${route}`;
  const vehicleWhatsApp = (v: LandingVehicle) => {
    const price = priceText(v);
    return waLink(price
      ? `Hi, I want to book ${route} in ${article(v.name)} ${v.name} (${price})`
      : `Hi, I want to book ${route} in ${article(v.name)} ${v.name}. Please send me the price.`);
  };

  // The hero photo is the largest thing above the fold on desktop: fetch it
  // first, at the size the browser will actually use.
  const heroSizes = "(max-width: 1024px) calc(100vw - 32px), 640px";
  const heroSrcSet = hero.image.srcSet.map((x) => `${x.src} ${x.width}w`).join(", ");
  preload(hero.image.src, { as: "image", imageSrcSet: heroSrcSet, imageSizes: heroSizes, fetchPriority: "high" });

  const schemas = [
    serviceSchema({
      name: `${route} Taxi Service`,
      description: plain(data.intro),
      url: `/${data.slug}`,
      areaServed: [data.origin, data.destination],
      airportsServed: L.airportsServed,
      image: hero.image.src,
      // One Offer per vehicle with a confirmed fare, as shown on the page.
      offers: vehicles.filter((v) => v.amount !== null).map((v) => ({
        name: `${v.name}, ${route}, one-way`,
        price: v.amount as number,
        priceCurrency: prices.currency,
      })),
    }),
    faqSchema(data.faqs.map((f) => ({ question: f.q, answer: plain(f.a) }))),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Border Crossing", path: "/border-crossing" },
      { name: data.breadcrumbLabel, path: `/${data.slug}` },
    ]),
    ...(L.videos?.items.map((v) => videoSchema({
      name: v.title, description: v.description, contentUrl: v.src, thumbnailUrl: v.poster,
      uploadDate: v.uploadDate, duration: v.duration,
    })) ?? []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main data-page-template="route-landing" className={s.page}>

        {/* 1. Hero. The cover image carries its own headline and icons, so it
            sits beside the H1 rather than behind it: text over text would be
            unreadable. */}
        <section className={s.hero}>
          <div className="container">
            <nav aria-label="Breadcrumb" className={`breadcrumb ${s.breadcrumb}`}>
              <ol>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/border-crossing">Border Crossing</Link></li>
                <li aria-current="page">{data.breadcrumbLabel}</li>
              </ol>
            </nav>
            <div className={s.heroGrid}>
              <div>
                <span className={s.heroEyebrow}>{data.eyebrow}</span>
                <h1 className={s.heroTitle}>{data.h1}</h1>
                <p className={s.heroLead}>{hero.subheading}</p>
                <ul className={s.heroChips}>
                  {hero.chips.map((c) => (
                    <li key={c.label} className={s.heroChip}><Icon name={c.icon} size={16} /> {c.label}</li>
                  ))}
                </ul>
                <div className={s.priceRow}>
                  <span className={s.priceBadge}>{hero.priceBadge}</span>
                  <span className={s.priceNote}>one way, per vehicle · <strong>{data.travelTime.replace(" (incl. causeway)", "").replace(/ – /, "–")}</strong> · {data.distance}</span>
                </div>
                <div className={s.ctaRow}>
                  <WhatsAppButton message={genericMessage} cta="hero" />
                  <Link href={hero.bookOnlineHref} className={`btn btn-lg ${s.btnOnDark}`}>Book Online</Link>
                </div>
              </div>
              <figure className={s.heroFigure}>
                {/* Plain <img> with our own WebP sizes: the files are already
                    optimised, and this keeps eager loading, fetchpriority and
                    the preload above pointing at the same URLs. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={hero.image.src}
                  srcSet={heroSrcSet}
                  sizes={heroSizes}
                  width={hero.image.width}
                  height={hero.image.height}
                  alt={hero.image.alt}
                  title={hero.image.title}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* 2. Booking form */}
        <section className={s.formSection}>
          <div className="container">
            <QuickBookForm
              defaultFrom={data.origin}
              defaultTo={data.destination}
              heading={L.form.heading}
              headingAs="h2"
              subheading={L.form.subheading}
              vehicles={vehicles.map((v) => ({ value: v.name, label: `${v.name} – ${priceText(v) ?? "price on request"}` }))}
              maxPassengers={L.form.maxPassengers}
              footerNote={L.form.footerNote}
              whatsappIntro={genericMessage}
            />
          </div>
        </section>

        {/* 3. Route highlights: text left, stat cards right. */}
        <section className={`section ${s.tint}`}>
          <div className="container">
            <div className={s.highlights}>
              <div className={s.highlightsText}>
                <span className={s.eyebrow}>Route highlights</span>
                <h2 className={s.title}>{L.highlights.heading}</h2>
                <p className={s.lead}>{rich(L.highlights.intro)}</p>
                <Link href={L.highlights.link.href} className={s.guideLink}>
                  {L.highlights.link.label} <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
                </Link>
                <p className={s.smallNote}>{L.highlights.note}</p>
              </div>
              <ul className={s.statGrid}>
                {L.highlights.items.map((it) => (
                  <li key={it.label} className={`${s.stat} ${it.emphasis ? s.statEmphasis : ""}`}>
                    <Icon name={it.icon} chip />
                    <div>
                      <span className={s.statLabel}>{it.label}</span>
                      <span className={s.statValue}>{it.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Prices and vehicles, grouped by fare. */}
        <section id="price" className={`section ${s.surface}`}>
          <div className="container">
            <SectionHeader eyebrow="Prices" title={prices.heading} intro={prices.intro} />
            {prices.groups.map((g) => {
              const [kind, fare] = g.heading.split(" · ");
              return (
                <div key={g.heading} className={s.carGroup}>
                  <h3 className={s.carGroupTitle}>
                    {kind} {fare && <span className={s.carGroupFare}>· {fare}</span>}
                  </h3>
                  <div className={s.carGrid}>
                    {g.vehicles.map((v) => {
                      const price = priceText(v);
                      return (
                        <article key={v.name} className={s.car}>
                          <div className={s.carMedia}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={v.image.src}
                              srcSet={v.image.srcSet.map((x) => `${x.src} ${x.width}w`).join(", ")}
                              sizes="(max-width: 640px) 140px, (max-width: 1024px) 50vw, 380px"
                              width={v.image.width}
                              height={v.image.height}
                              alt={v.image.alt}
                              loading="lazy"
                              decoding="async"
                            />
                            <span className={s.carBadge}>{v.category}</span>
                          </div>
                          <div className={s.carBody}>
                            <h4 className={s.carName}>{v.name}</h4>
                            <ul className={s.carSpecs}>
                              <li><Icon name="users" size={16} /> {v.passengers} passengers</li>
                              <li><Icon name="luggage" size={16} /> {v.luggage ? `${v.luggage} bags` : "Bags: ask us"}</li>
                            </ul>
                            <p className={s.carPrice}>
                              {price ? <><strong>{price}</strong> <span>one way</span></> : <strong>Price on request</strong>}
                            </p>
                            <a href={vehicleWhatsApp(v)} className={`btn btn-whatsapp ${s.carCta}`} target="_blank" rel="noopener noreferrer" data-wa-cta="vehicle-card">
                              <span className={s.icon} aria-hidden="true"><WhatsAppIcon size={16} /></span>
                              {price ? "Book this car" : "Get a price"}<span className="sr-only">: {v.name}</span>
                            </a>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {(prices.privateVsShared || prices.fareFactors) && (
              <div className={s.fareExtras}>
                {prices.privateVsShared && (
                  <div className={s.noteCard} role="note">
                    <span className={s.icon} aria-hidden="true"><Info size={20} aria-hidden="true" /></span>
                    <div>
                      <h3>{prices.privateVsShared.title}</h3>
                      <p>{prices.privateVsShared.body}</p>
                    </div>
                  </div>
                )}
                {prices.fareFactors && (
                  <div className={s.factorCard}>
                    <h3>{prices.fareFactors.heading}</h3>
                    <ul>
                      {prices.fareFactors.items.map((it) => (
                        <li key={it.label}><Icon name={it.icon} size={18} chip /> {it.label}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            <p className={`${s.priceFootnote} ${s.inlineLink}`}>{rich(prices.note)}</p>
            <p className={s.reviewed}>Prices confirmed {prices.confirmedOn}.</p>
          </div>
        </section>

        {/* 5. Videos: real cars, plates covered. Nothing downloads until play. */}
        {L.videos && (
          <section className={`section ${s.tint}`}>
            <div className="container">
              <SectionHeader eyebrow="Real cars" title={L.videos.heading} intro={L.videos.intro} />
              <div className={s.videoGrid}>
                {L.videos.items.map((v) => (
                  <figure key={v.src} className={s.videoCard}>
                    <video
                      controls
                      playsInline
                      preload="none"
                      poster={v.poster}
                      width={v.width}
                      height={v.height}
                      aria-label={v.title}
                    >
                      <source src={v.src} type="video/mp4" />
                      <track kind="captions" src={v.captions} srcLang="en" label="English" />
                    </video>
                    <figcaption>{v.title}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. Journey timeline */}
        <section className={`section ${s.surface}`}>
          <div className="container">
            <SectionHeader eyebrow="Journey" title={L.timeline.heading} intro={L.timeline.intro} align="start" />
            <div className={s.timelineGrid}>
              <ol className={s.timeline}>
                {L.timeline.steps.map((st) => (
                  <li key={st.title} className={s.timelineStep}>
                    <Icon name={st.icon} chip />
                    <div>
                      <h3 className={s.timelineTitle}>{st.title}</h3>
                      <p className={s.timelineBody}>{st.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <figure className={s.timelineFigure}>
                <Media image={L.timeline.image} ratio="16 / 9" sizes="(max-width: 1024px) calc(100vw - 32px), 560px" />
              </figure>
            </div>

            {/* Airport sub-block: part of the journey, not its own section. */}
            {L.timeline.airport && (
              <div className={s.airport}>
                <h3 className={s.airportTitle}>
                  <Icon name="plane" chip /> {L.timeline.airport.heading}
                </h3>
                <div className={s.airportGrid}>
                  <div className={s.card}>
                    <h4>{L.timeline.airport.pickup.title}</h4>
                    <ul className={s.checkList}>
                      {L.timeline.airport.pickup.points.map((x) => (
                        <li key={x}><span className={s.icon} aria-hidden="true"><CircleCheck size={18} aria-hidden="true" /></span> {x}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={s.card}>
                    <h4>{L.timeline.airport.dropoff.title}</h4>
                    <p>{L.timeline.airport.dropoff.body}</p>
                  </div>
                </div>
                <div className={s.airportFoot}>
                  <p className={s.inlineLink}>{rich(L.timeline.airport.links)}</p>
                  <a href={waLink(L.timeline.airport.whatsappMessage)} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer" data-wa-cta="airport-block">
                    <span className={s.icon} aria-hidden="true"><WhatsAppIcon size={16} /></span> {L.timeline.airport.ctaLabel}
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 7. King Fahd Causeway crossing */}
        <section className={`section ${s.tint}`}>
          <div className="container">
            <SectionHeader eyebrow="Border crossing" title={L.crossing.heading} intro={L.crossing.intro} />
            <div className={s.crossingGrid}>
              <div className={s.card}>
                <div className={s.cardHead}>
                  <Icon name="car" chip />
                  <h3>{L.crossing.driverHeading}</h3>
                </div>
                <ul className={s.checkList}>
                  {L.crossing.driver.map((x) => (
                    <li key={x}><span className={s.icon} aria-hidden="true"><ShieldCheck size={18} aria-hidden="true" /></span> {x}</li>
                  ))}
                </ul>
              </div>
              <div className={s.card}>
                <div className={s.cardHead}>
                  <Icon name="fileCheck" chip />
                  <h3>{L.crossing.passengerHeading}</h3>
                </div>
                <ul className={s.checkList}>
                  {L.crossing.passenger.map((x) => (
                    <li key={x}><span className={s.icon} aria-hidden="true"><CircleCheck size={18} aria-hidden="true" /></span> {x}</li>
                  ))}
                </ul>
              </div>
            </div>
            {L.crossing.selfDrive && <p className={s.selfDrive}>{L.crossing.selfDrive}</p>}
            <p className={s.callout} role="note">
              <span className={s.icon} aria-hidden="true"><Info size={20} aria-hidden="true" /></span>
              {L.crossing.callout}
            </p>
            <p className={`${s.sectionNote} ${s.inlineLink}`}>{rich(L.crossing.outro)}</p>
          </div>
        </section>

        {/* 7b. Ways to travel: a real table on wide screens, stacked cards
            on phones (CSS). Our row carries the accent and a badge. */}
        {L.waysToTravel && (
          <section className={`section ${s.surface}`}>
            <div className="container">
              <SectionHeader eyebrow={L.waysToTravel.eyebrow} title={L.waysToTravel.heading} intro={L.waysToTravel.intro} />
              <table className={s.compare}>
                <thead>
                  <tr>{L.waysToTravel.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {L.waysToTravel.rows.map((r) => (
                    <tr key={r.option} className={r.recommended ? s.compareOurs : undefined}>
                      <th scope="row">
                        {r.option}
                        {r.recommended && <span className={s.recommended}>Recommended</span>}
                      </th>
                      <td data-label={L.waysToTravel!.head[1]}>
                        <span className={r.doorToDoor ? s.yes : s.no} aria-hidden="true">{r.doorToDoor ? "✔" : "✖"}</span>
                        <span className="sr-only">{r.doorToDoor ? "Yes" : "No"}</span>
                      </td>
                      <td data-label={L.waysToTravel!.head[2]}>{r.connections}</td>
                      <td data-label={L.waysToTravel!.head[3]}>{r.time}</td>
                      <td data-label={L.waysToTravel!.head[4]}>{r.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={s.takeaway}>{L.waysToTravel.takeaway}</p>
              <div className={`${s.ctaRow} ${s.stepsCta}`}>
                <WhatsAppButton message={genericMessage} cta="ways-to-travel" />
                <Link href={hero.bookOnlineHref} className="btn btn-primary btn-lg">Book Online</Link>
              </div>
            </div>
          </section>
        )}

        {/* 8. What's included: staggered fade-up as it scrolls in. */}
        <section className={`section ${s.tint}`}>
          <div className="container">
            <SectionHeader eyebrow="What's included" title={L.included.heading} />
            <Reveal className={s.includedGrid}>
              {L.included.items.map((it, i) => (
                <div key={it.title} className={s.revealItem} style={{ "--i": i } as React.CSSProperties}>
                  <div className={s.includedItem}>
                    <Icon name={it.icon} chip />
                    <h3>{it.title}</h3>
                    <p>{it.body}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* 9. How to book */}
        <section className={`section ${s.surface}`}>
          <div className="container">
            <SectionHeader eyebrow="How it works" title={L.howToBook.heading} />
            <ol className={s.steps}>
              {L.howToBook.steps.map((st, i) => (
                <li key={st.title} className={s.step}>
                  <span className={s.stepNumber} aria-hidden="true">{i + 1}</span>
                  <Icon name={st.icon} chip />
                  <h3>{st.title}</h3>
                  <p>{st.body}</p>
                </li>
              ))}
            </ol>
            <div className={`${s.ctaRow} ${s.stepsCta}`}>
              <WhatsAppButton message={genericMessage} cta="how-to-book" />
              <Link href={hero.bookOnlineHref} className="btn btn-primary btn-lg">Book Online</Link>
            </div>
          </div>
        </section>

        {/* 10. Nearby destinations */}
        <section className={`section ${s.tint}`}>
          <div className="container">
            <SectionHeader eyebrow="Explore" title={L.nearby.heading} intro={L.nearby.intro} />
            <div className={s.destGrid}>
              {L.nearby.items.map((d) => (
                <Link key={d.href} href={d.href} className={s.destCard}>
                  <Media image={d.image} ratio="3 / 2" sizes="(max-width: 640px) calc(100vw - 32px), 280px" />
                  <div className={s.destBody}>
                    <h3>{d.name}</h3>
                    <p>{d.blurb}</p>
                    <span className={s.viewLink}>View {d.name} <ArrowRight size={14} aria-hidden="true" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 11. FAQ. Answers are in the HTML whether or not a question is open. */}
        <section className={`section ${s.surface}`}>
          <div className="container">
            <SectionHeader eyebrow="FAQ" title={`${route} Taxi: Your Questions Answered`} />
            <div className={s.faqList}>
              {data.faqs.map((f, i) => (
                <details key={f.q} className={s.faq} open={i === 0}>
                  <summary>
                    <h3>{f.q}</h3>
                    <span className={`${s.icon} ${s.faqChevron}`} aria-hidden="true"><ChevronDown size={18} aria-hidden="true" /></span>
                  </summary>
                  <p className={s.inlineLink}>{rich(f.a)}</p>
                </details>
              ))}
            </div>
            {data.lastReviewed && <p className={s.reviewed}>Page last reviewed: {data.lastReviewed}.</p>}
          </div>
        </section>

        {/* 12. Return trip and other popular routes */}
        <section className={`section ${s.tint}`}>
          <div className="container">
            <div className={s.returnStrip}>
              <p>{L.returnTrip.text}</p>
              <Link href={L.returnTrip.href} className="btn btn-primary">
                {L.returnTrip.label} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <SectionHeader eyebrow="More routes" title={L.popularRoutes.heading} />
            <div className={s.routeGrid}>
              {L.popularRoutes.items.map((r) => (
                <Link key={r.href} href={r.href} className={s.routeCard}>
                  <span className={s.routeTag}>{r.tag}</span>
                  <h3 className={s.routeName}>
                    {r.from} <ArrowRight size={16} aria-hidden="true" className={s.routeArrow} />
                    <span className="sr-only">to</span> {r.to}
                  </h3>
                  <span className={s.viewLink}>View route <ArrowRight size={14} aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
            <div className={s.servicesRow}>
              <h3>{L.popularRoutes.servicesHeading}</h3>
              {L.popularRoutes.services.map((x) => (
                <Link key={x.href} href={x.href} className="btn btn-outline-gold btn-sm">{x.label}</Link>
              ))}
            </div>
          </div>
        </section>
        {/* No closing CTA band: the owner removed it (12 Nov). The page ends
            with the routes section, then the footer. */}
      </main>
    </>
  );
}
