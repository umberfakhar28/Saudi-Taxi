import Link from "@/components/IntentLink";
import Image from "next/image";
import { Fragment } from "react";
import { preload } from "react-dom";
import {
  MapPin, Clock, Landmark, Route, Coffee, Tag, Car, ShieldCheck, House, Luggage, Fuel,
  MessageCircle, Users, Briefcase, Plane, FileCheck, BadgeCheck, CalendarCheck, Navigation,
  Headset, CreditCard, Banknote, Mail, Receipt, Building2, Languages, Anchor,
  ArrowRight, ArrowLeft, ChevronDown, Info, CircleCheck, type LucideIcon,
} from "lucide-react";
// Lucide ships no brand logos, so WhatsApp buttons keep the WhatsApp mark.
import { WhatsAppIcon } from "@/components/Icons";
import QuickBookForm from "@/components/QuickBookForm";
import Reveal from "@/components/Reveal";
import type { RouteData } from "@/components/RoutePage";
import { serviceSchema, faqSchema, breadcrumbSchema, videoSchema, jsonLd } from "@/lib/jsonld";
import { waLink, pageWhatsAppMessage, EMAIL } from "@/lib/contact";
import { formatRoutePrice } from "@/lib/routePricing";
import type { LandingIcon, LandingImage, LandingSection, LandingVehicle } from "@/lib/routeLanding";
import s from "./RouteLanding.module.css";

/** The only icons this page bundles: imported by name, so Lucide's other
 *  icons are tree-shaken out. */
const ICONS: Record<LandingIcon, LucideIcon> = {
  mapPin: MapPin, clock: Clock, landmark: Landmark, route: Route, coffee: Coffee, tag: Tag,
  car: Car, shieldCheck: ShieldCheck, home: House, luggage: Luggage, fuel: Fuel,
  messageCircle: MessageCircle, users: Users, briefcase: Briefcase, plane: Plane,
  fileCheck: FileCheck, badgeCheck: BadgeCheck, calendarCheck: CalendarCheck,
  navigation: Navigation, headset: Headset, creditCard: CreditCard, banknote: Banknote,
  mail: Mail, receipt: Receipt, building: Building2, languages: Languages, anchor: Anchor,
};

type Locale = "en" | "ar";

/**
 * The page's own words, per language. Everything route-specific lives in
 * the route's data; these are the labels the layout adds around it.
 */
const UI = {
  en: {
    home: "Home", homeHref: "/", borderCrossing: "Border Crossing", borderHref: "/border-crossing",
    bookWhatsApp: "Book on WhatsApp", bookOnline: "Book Online", perVehicle: "one way, per vehicle",
    passengers: (n: string) => `${n} passengers`, bags: (n: string) => `${n} bags`, bagsAsk: "Bags: ask us",
    oneWay: "one way", priceOnRequest: "Price on request", priceOnRequestShort: "price on request",
    bookThisCar: "Book this car", getPrice: "Get a price",
    pricesConfirmed: (d: string) => `Prices confirmed ${d}.`, lastReviewed: (d: string) => `Page last reviewed: ${d}.`,
    recommended: "Recommended", yes: "Yes", no: "No", view: (n: string) => `View ${n}`, viewRoute: "View route",
    to: "to", photoSoon: "Photo coming soon",
    faqHeading: (route: string) => `${route} Taxi: Your Questions Answered`,
    fromAirport: "from Kuwait Airport", bookHotel: (origin: string) => `Book ${origin} to this hotel`,
    hotelMessage: (origin: string, hotel: string) => `Hi, I want to book ${origin} to ${hotel}, Kuwait`,
    vehicleMessage: (origin: string, destination: string, name: string, price: string | null) => {
      const route = `${origin} to ${destination}`;
      return price
        ? `Hi, I want to book ${route} in ${/^[aeiou]/i.test(name) ? "an" : "a"} ${name} (${price})`
        : `Hi, I want to book ${route} in ${/^[aeiou]/i.test(name) ? "an" : "a"} ${name}. Please send me the price.`;
    },
    eyebrow: {
      highlights: "Route highlights", prices: "Prices", videos: "Real cars", journey: "Journey",
      crossing: "Border crossing", included: "What's included", howToBook: "How it works", nearby: "Explore",
      faq: "FAQ", moreRoutes: "More routes", bookingMethods: "Ways to book", payment: "Payment",
      documents: "Documents", airport: "Airport", destinations: "Things to see", hotels: "Where to stay",
      finalCta: "Ready when you are",
    },
  },
  ar: {
    home: "الرئيسية", homeHref: "/ar", borderCrossing: "عبور الحدود", borderHref: "/ar/border-crossing",
    bookWhatsApp: "احجز عبر واتساب", bookOnline: "احجز أونلاين", perVehicle: "اتجاه واحد، للسيارة كاملة",
    passengers: (n: string) => `${n} ركاب`, bags: (n: string) => `${n} حقائب`, bagsAsk: "الحقائب: اسألنا",
    oneWay: "اتجاه واحد", priceOnRequest: "السعر عند الطلب", priceOnRequestShort: "السعر عند الطلب",
    bookThisCar: "احجز هذه السيارة", getPrice: "اطلب السعر",
    pricesConfirmed: (d: string) => `الأسعار مؤكدة بتاريخ ${d}.`, lastReviewed: (d: string) => `آخر مراجعة للصفحة: ${d}.`,
    recommended: "الخيار الأفضل", yes: "نعم", no: "لا", view: (n: string) => `عرض ${n}`, viewRoute: "عرض الرحلة",
    to: "إلى", photoSoon: "الصورة قريباً",
    faqHeading: (route: string) => `أسئلة شائعة عن تاكسي ${route}`,
    fromAirport: "من مطار الكويت", bookHotel: (origin: string) => `احجز من ${origin} إلى هذا الفندق`,
    hotelMessage: (origin: string, hotel: string) => `السلام عليكم، أرغب في حجز رحلة من ${origin} إلى ${hotel} في الكويت`,
    vehicleMessage: (origin: string, destination: string, name: string, price: string | null) => price
      ? `السلام عليكم، أرغب في حجز رحلة من ${origin} إلى ${destination} بسيارة ${name} (${price})`
      : `السلام عليكم، أرغب في حجز رحلة من ${origin} إلى ${destination} بسيارة ${name}. أرجو إرسال السعر.`,
    eyebrow: {
      highlights: "الرحلة باختصار", prices: "الأسعار", videos: "سياراتنا", journey: "الرحلة",
      crossing: "عبور الحدود", included: "ما يشمله السعر", howToBook: "طريقة الحجز", nearby: "استكشف",
      faq: "أسئلة شائعة", moreRoutes: "رحلات أخرى", bookingMethods: "طرق الحجز", payment: "الدفع",
      documents: "المستندات", airport: "المطار", destinations: "معالم الكويت", hotels: "أين تقيم",
      finalCta: "جاهزون متى ما كنت جاهزاً",
    },
  },
} as const;

/** "220 KWD" in English; "220 دينار كويتي" in Arabic. */
function money(amount: number, currency: "SAR" | "KWD", locale: Locale): string {
  if (locale === "en") return formatRoutePrice(amount, currency);
  return `${amount.toLocaleString("en-US")} ${currency === "KWD" ? "دينار كويتي" : "ريال"}`;
}

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
function Media({ image, ratio, sizes, className, label }: { image: LandingImage; ratio: string; sizes: string; className?: string; label: string }) {
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
      <span className={s.placeholderLabel} aria-hidden="true">{label}</span>
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

/** A generic "Book on WhatsApp" button with the page's fixed message. */
function WhatsAppButton({ message, cta, label }: { message: string; cta: string; label: string }) {
  return (
    <a href={waLink(message)} className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer" data-wa-cta={cta}>
      <span className={s.icon} aria-hidden="true"><WhatsAppIcon size={18} /></span> {label}
    </a>
  );
}

/** Sections in their original order, for routes that don't set `order`. */
const DEFAULT_ORDER: LandingSection[] = [
  "highlights", "prices", "videos", "timeline", "crossing", "waysToTravel",
  "included", "howToBook", "nearby", "faq", "returnRoutes",
];

/**
 * The designed route layout: hero and booking form, then the sections the
 * route lists in `landing.order` (DEFAULT_ORDER otherwise). Used by routes
 * that set `RouteData.landing`; every other route keeps RoutePage.
 *
 * Colours come only from the page tokens at the top of
 * RouteLanding.module.css (primary navy, gold accent, ivory tint, white
 * surface, muted text, border); sections alternate ivory and white by
 * position, whatever the order.
 *
 * `locale="ar"` renders the same layout in Arabic, right to left (the /ar
 * layout sets dir="rtl"); the route's data then carries Arabic copy.
 */
export default function RouteLanding({ data, locale = "en" }: { data: RouteData; locale?: Locale }) {
  const L = data.landing!;
  const t = UI[locale];
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  const { hero, prices } = L;
  const route = locale === "ar" ? `${data.origin} إلى ${data.destination}` : `${data.origin} to ${data.destination}`;
  const pagePath = locale === "ar" ? `/ar/${data.slug}` : `/${data.slug}`;
  const vehicles = prices.groups.flatMap((g) => g.vehicles);
  const priceText = (v: LandingVehicle) => {
    if (v.amount === null) return null;
    const figure = money(v.amount, prices.currency, locale);
    if (prices.basis !== "starting") return figure;
    return locale === "ar" ? `من ${figure}` : `from ${figure}`;
  };

  // Generic buttons send the page's one fixed message (lib/contact.ts), the
  // same one the header, floating button and mobile bar send.
  const genericMessage = pageWhatsAppMessage(pagePath) ?? `Hi, I want to book ${route}`;
  const vehicleWhatsApp = (v: LandingVehicle) => waLink(t.vehicleMessage(data.origin, data.destination, v.name, priceText(v)));

  // The hero photo is the largest thing above the fold on desktop: fetch it
  // first, at the size the browser will actually use.
  const heroSizes = "(max-width: 1024px) calc(100vw - 32px), 640px";
  const heroSrcSet = hero.image.srcSet.map((x) => `${x.src} ${x.width}w`).join(", ");
  preload(hero.image.src, { as: "image", imageSrcSet: heroSrcSet, imageSizes: heroSizes, fetchPriority: "high" });

  const schemas = [
    serviceSchema({
      name: locale === "ar" ? `تاكسي ${route}` : `${route} Taxi Service`,
      description: plain(data.intro),
      url: pagePath,
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
      { name: t.home, path: t.homeHref },
      { name: t.borderCrossing, path: t.borderHref },
      { name: data.breadcrumbLabel, path: pagePath },
    ]),
    ...(L.videos?.items.map((v) => videoSchema({
      name: v.title, description: v.description, contentUrl: v.src, thumbnailUrl: v.poster,
      uploadDate: v.uploadDate, duration: v.duration,
    })) ?? []),
  ];

  const bookOnline = (cls: string) => <Link href={hero.bookOnlineHref} className={cls}>{t.bookOnline}</Link>;

  /** One renderer per section. `bg` is the alternating background class;
   *  a renderer returns null when the route has no data for it. */
  const SECTIONS: Record<LandingSection, (bg: string) => React.ReactNode> = {
    /* Route highlights: text left, stat cards right. */
    highlights: (bg) => (
      <section className={`section ${bg}`}>
        <div className="container">
          <div className={s.highlights}>
            <div className={s.highlightsText}>
              <span className={s.eyebrow}>{t.eyebrow.highlights}</span>
              <h2 className={s.title}>{L.highlights.heading}</h2>
              <p className={s.lead}>{rich(L.highlights.intro)}</p>
              <Link href={L.highlights.link.href} className={s.guideLink}>
                {L.highlights.link.label} <Arrow size={18} strokeWidth={2.25} aria-hidden="true" />
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
    ),

    /* Prices and vehicles, grouped by fare. */
    prices: (bg) => (
      <section id="price" className={`section ${bg}`}>
        <div className="container">
          <SectionHeader eyebrow={t.eyebrow.prices} title={prices.heading} intro={prices.intro} />
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
                            <li><Icon name="users" size={16} /> {t.passengers(v.passengers)}</li>
                            <li><Icon name="luggage" size={16} /> {v.luggage ? t.bags(v.luggage) : t.bagsAsk}</li>
                          </ul>
                          <p className={s.carPrice}>
                            {price ? <><strong>{price}</strong> <span>{t.oneWay}</span></> : <strong>{t.priceOnRequest}</strong>}
                          </p>
                          <a href={vehicleWhatsApp(v)} className={`btn btn-whatsapp ${s.carCta}`} target="_blank" rel="noopener noreferrer" data-wa-cta="vehicle-card" data-vehicle={v.name}>
                            <span className={s.icon} aria-hidden="true"><WhatsAppIcon size={16} /></span>
                            {price ? t.bookThisCar : t.getPrice}<span className="sr-only">: {v.name}</span>
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
          <p className={s.reviewed}>{t.pricesConfirmed(prices.confirmedOn)}</p>
        </div>
      </section>
    ),

    /* Three ways to book, each card with its own button. */
    bookingMethods: (bg) => L.bookingMethods && (
      <section className={`section ${bg}`}>
        <div className="container">
          <SectionHeader eyebrow={t.eyebrow.bookingMethods} title={L.bookingMethods.heading} intro={L.bookingMethods.intro} />
          <div className={s.methodGrid}>
            {L.bookingMethods.items.map((m) => (
              <div key={m.kind} className={s.method}>
                <Icon name={m.icon} chip />
                <h3>{m.title}</h3>
                <p>{m.body}</p>
                {m.kind === "whatsapp" && (
                  <a href={waLink(genericMessage)} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer" data-wa-cta="booking-methods">
                    <span className={s.icon} aria-hidden="true"><WhatsAppIcon size={16} /></span> {m.cta}
                  </a>
                )}
                {m.kind === "form" && <a href="#booking" className="btn btn-primary">{m.cta}</a>}
                {m.kind === "email" && (
                  <a href={`mailto:${EMAIL}`} className="btn btn-outline-gold" data-wa-cta="booking-methods">{m.cta}</a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    ),

    payment: (bg) => L.payment && (
      <section className={`section ${bg}`}>
        <div className="container">
          <SectionHeader eyebrow={t.eyebrow.payment} title={L.payment.heading} intro={L.payment.intro} />
          <div className={s.methodGrid}>
            {L.payment.items.map((it) => (
              <div key={it.title} className={s.method}>
                <Icon name={it.icon} chip />
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </div>
            ))}
          </div>
          <p className={`${s.callout} ${s.calloutCenter}`} role="note">
            <span className={s.icon} aria-hidden="true"><Receipt size={20} aria-hidden="true" /></span>
            {L.payment.note}
          </p>
        </div>
      </section>
    ),

    /* Videos: real cars, plates covered. Nothing downloads until play. */
    videos: (bg) => L.videos && (
      <section className={`section ${bg}`}>
        <div className="container">
          <SectionHeader eyebrow={t.eyebrow.videos} title={L.videos.heading} intro={L.videos.intro} />
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
    ),

    /* Journey timeline */
    timeline: (bg) => (
      <section className={`section ${bg}`}>
        <div className="container">
          <SectionHeader eyebrow={t.eyebrow.journey} title={L.timeline.heading} intro={L.timeline.intro} align="start" />
          <div className={L.timeline.image ? s.timelineGrid : s.timelineSolo}>
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
            {L.timeline.image && (
              <figure className={s.timelineFigure}>
                <Media image={L.timeline.image} ratio="16 / 9" sizes="(max-width: 1024px) calc(100vw - 32px), 560px" label={t.photoSoon} />
              </figure>
            )}
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
    ),

    /* The border crossing: which crossing when, then driver vs passenger. */
    crossing: (bg) => (
      <section className={`section ${bg}`}>
        <div className="container">
          <SectionHeader eyebrow={L.crossing.eyebrow ?? t.eyebrow.crossing} title={L.crossing.heading} intro={L.crossing.intro} />
          {(L.crossing.image || L.crossing.options) && (
            <div className={s.crossingIntro}>
              {L.crossing.image && (
                <figure className={s.crossingFigure}>
                  <Media image={L.crossing.image} ratio="4 / 3" sizes="(max-width: 1024px) calc(100vw - 32px), 520px" label={t.photoSoon} />
                </figure>
              )}
              {L.crossing.options && (
                <div className={s.optionList}>
                  {L.crossing.options.map((o) => (
                    <div key={o.title} className={s.option}>
                      {o.tag && <span className={s.optionTag}>{o.tag}</span>}
                      <h3>{o.title}</h3>
                      <p className={s.inlineLink}>{rich(o.body)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
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
          {L.crossing.links && (
            <div className={s.linkRow}>
              {L.crossing.links.map((x) => (
                <Link key={x.href} href={x.href} className="btn btn-outline-gold btn-sm">{x.label}</Link>
              ))}
            </div>
          )}
          <p className={`${s.sectionNote} ${s.inlineLink}`}>{rich(L.crossing.outro)}</p>
        </div>
      </section>
    ),

    documents: (bg) => L.documents && (
      <section className={`section ${bg}`}>
        <div className="container">
          <SectionHeader eyebrow={t.eyebrow.documents} title={L.documents.heading} intro={L.documents.intro} />
          <ul className={s.docGrid}>
            {L.documents.items.map((d) => (
              <li key={d.title} className={s.doc}>
                <span className={s.icon} aria-hidden="true"><CircleCheck size={20} aria-hidden="true" /></span>
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className={s.callout} role="note">
            <span className={s.icon} aria-hidden="true"><Info size={20} aria-hidden="true" /></span>
            {L.documents.callout}
          </p>
        </div>
      </section>
    ),

    airport: (bg) => L.airport && (
      <section className={`section ${bg}`}>
        <div className="container">
          <SectionHeader eyebrow={t.eyebrow.airport} title={L.airport.heading} intro={L.airport.intro} />
          <div className={s.methodGrid}>
            {L.airport.items.map((it) => (
              <div key={it.title} className={s.method}>
                <Icon name={it.icon} chip />
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </div>
            ))}
          </div>
          <div className={s.airportFoot}>
            <p className={s.inlineLink}>{rich(L.airport.links)}</p>
            <a href={waLink(L.airport.whatsappMessage)} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer" data-wa-cta="airport-block">
              <span className={s.icon} aria-hidden="true"><WhatsAppIcon size={16} /></span> {L.airport.ctaLabel}
            </a>
          </div>
        </div>
      </section>
    ),

    /* Ways to travel: a real table on wide screens, stacked cards on
       phones (CSS). Our row carries the accent and a badge. */
    waysToTravel: (bg) => L.waysToTravel && (
      <section className={`section ${bg}`}>
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
                    {r.recommended && <span className={s.recommended}>{t.recommended}</span>}
                  </th>
                  <td data-label={L.waysToTravel!.head[1]}>
                    <span className={r.doorToDoor ? s.yes : s.no} aria-hidden="true">{r.doorToDoor ? "✔" : "✖"}</span>
                    <span className="sr-only">{r.doorToDoor ? t.yes : t.no}</span>
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
            <WhatsAppButton message={genericMessage} cta="ways-to-travel" label={t.bookWhatsApp} />
            {bookOnline("btn btn-primary btn-lg")}
          </div>
        </div>
      </section>
    ),

    /* What's included: staggered fade-up as it scrolls in. */
    included: (bg) => (
      <section className={`section ${bg}`}>
        <div className="container">
          <SectionHeader eyebrow={L.included.eyebrow ?? t.eyebrow.included} title={L.included.heading} />
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
    ),

    howToBook: (bg) => L.howToBook && (
      <section className={`section ${bg}`}>
        <div className="container">
          <SectionHeader eyebrow={t.eyebrow.howToBook} title={L.howToBook.heading} />
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
            <WhatsAppButton message={genericMessage} cta="how-to-book" label={t.bookWhatsApp} />
            {bookOnline("btn btn-primary btn-lg")}
          </div>
        </div>
      </section>
    ),

    /* Things to see at the destination: icon cards, linked where we have
       a page for the place. */
    destinations: (bg) => L.destinations && (
      <section className={`section ${bg}`}>
        <div className="container">
          <SectionHeader eyebrow={t.eyebrow.destinations} title={L.destinations.heading} intro={L.destinations.intro} />
          <ul className={s.placeGrid}>
            {L.destinations.items.map((d) => {
              const body = (
                <>
                  <Icon name="landmark" chip />
                  <div>
                    <h3>{d.name}</h3>
                    <p>{d.blurb}</p>
                    {d.href && <span className={s.viewLink}>{t.view(d.name)} <Arrow size={14} aria-hidden="true" /></span>}
                  </div>
                </>
              );
              return (
                <li key={d.name}>
                  {d.href ? <Link href={d.href} className={`${s.place} ${s.placeLink}`}>{body}</Link> : <div className={s.place}>{body}</div>}
                </li>
              );
            })}
          </ul>
          <div className={s.centerLink}>
            <Link href={L.destinations.link.href} className={s.guideLink}>
              {L.destinations.link.label} <Arrow size={18} strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    ),

    /* Hotel cards: name, area, type and time from the airport. Booking a
       hotel opens WhatsApp with the hotel already named. */
    hotels: (bg) => L.hotels && (
      <section className={`section ${bg}`}>
        <div className="container">
          <SectionHeader eyebrow={t.eyebrow.hotels} title={L.hotels.heading} intro={L.hotels.intro} />
          <ul className={s.hotelGrid}>
            {L.hotels.items.map((h) => (
              <li key={h.name} className={s.hotel}>
                <span className={s.hotelType}>{h.type}</span>
                <h3>{h.name}</h3>
                <p className={s.hotelMeta}><Icon name="mapPin" size={16} /> {h.area}</p>
                <p className={s.hotelMeta}><Icon name="plane" size={16} /> {h.fromAirport} {t.fromAirport}</p>
                <a
                  href={waLink(t.hotelMessage(data.origin, h.name))}
                  className={`btn btn-whatsapp btn-sm ${s.hotelCta}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-wa-cta="hotel-card"
                >
                  <span className={s.icon} aria-hidden="true"><WhatsAppIcon size={14} /></span> {t.bookHotel(data.origin)}<span className="sr-only">: {h.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className={s.sectionNote}>{L.hotels.note}</p>
        </div>
      </section>
    ),

    /* Nearby destinations */
    nearby: (bg) => (
      <section className={`section ${bg}`}>
        <div className="container">
          <SectionHeader eyebrow={t.eyebrow.nearby} title={L.nearby.heading} intro={L.nearby.intro} />
          <div className={s.destGrid}>
            {L.nearby.items.map((d) => (
              <Link key={d.href} href={d.href} className={s.destCard}>
                <Media image={d.image} ratio="3 / 2" sizes="(max-width: 640px) calc(100vw - 32px), 280px" label={t.photoSoon} />
                <div className={s.destBody}>
                  <h3>{d.name}</h3>
                  <p>{d.blurb}</p>
                  <span className={s.viewLink}>{t.view(d.name)} <Arrow size={14} aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    ),

    /* FAQ. Answers are in the HTML whether or not a question is open. */
    faq: (bg) => (
      <section className={`section ${bg}`}>
        <div className="container">
          <SectionHeader eyebrow={t.eyebrow.faq} title={L.faqHeading ?? t.faqHeading(route)} />
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
          {data.lastReviewed && <p className={s.reviewed}>{t.lastReviewed(data.lastReviewed)}</p>}
        </div>
      </section>
    ),

    /* Return trip and other popular routes */
    returnRoutes: (bg) => (
      <section className={`section ${bg}`}>
        <div className="container">
          <div className={s.returnStrip}>
            <p>{L.returnTrip.text}</p>
            <Link href={L.returnTrip.href} className="btn btn-primary">
              {L.returnTrip.label} <Arrow size={16} aria-hidden="true" />
            </Link>
          </div>
          <SectionHeader eyebrow={t.eyebrow.moreRoutes} title={L.popularRoutes.heading} />
          <div className={s.routeGrid}>
            {L.popularRoutes.items.map((r) => (
              <Link key={r.href} href={r.href} className={s.routeCard}>
                <span className={s.routeTag}>{r.tag}</span>
                <h3 className={s.routeName}>
                  {r.from} <Arrow size={16} aria-hidden="true" className={s.routeArrow} />
                  <span className="sr-only">{t.to}</span> {r.to}
                </h3>
                <span className={s.viewLink}>{t.viewRoute} <Arrow size={14} aria-hidden="true" /></span>
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
    ),

    /* Closing call to action, for routes that set one. The Bahrain page
       has none (the owner removed it, 12 Nov). */
    finalCta: () => L.finalCta && (
      <section className={s.finalCta}>
        <div className="container">
          <div className={s.finalInner}>
            <span className={s.heroEyebrow}>{t.eyebrow.finalCta}</span>
            <h2 className={s.finalTitle}>{L.finalCta.heading}</h2>
            <p className={s.finalBody}>{L.finalCta.body}</p>
            <div className={`${s.ctaRow} ${s.finalButtons}`}>
              <WhatsAppButton message={genericMessage} cta="final-cta" label={t.bookWhatsApp} />
              {bookOnline(`btn btn-lg ${s.btnOnDark}`)}
            </div>
          </div>
        </div>
      </section>
    ),
  };

  // Render in order, skipping sections the route has no data for, and
  // alternate backgrounds by what is actually on the page.
  const body = (L.order ?? DEFAULT_ORDER)
    .reduce<{ key: LandingSection; node: React.ReactNode }[]>((done, key) => {
      const node = SECTIONS[key](done.length % 2 === 0 ? s.tint : s.surface);
      return node ? [...done, { key, node }] : done;
    }, [])
    .map(({ key, node }) => <Fragment key={key}>{node}</Fragment>);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main data-page-template="route-landing" className={s.page}>

        {/* Hero. The photo sits beside the H1 rather than behind it, so the
            headline never sits on top of a busy image. */}
        <section className={s.hero}>
          <div className="container">
            <nav aria-label={locale === "ar" ? "مسار التنقل" : "Breadcrumb"} className={`breadcrumb ${s.breadcrumb}`}>
              <ol>
                <li><Link href={t.homeHref}>{t.home}</Link></li>
                <li><Link href={t.borderHref}>{t.borderCrossing}</Link></li>
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
                  {hero.priceTag && <span className={s.priceTag}>{hero.priceTag}</span>}
                  <span className={s.priceNote}>
                    {hero.facts ?? <>{t.perVehicle} · <strong>{data.travelTime.replace(" (incl. causeway)", "").replace(/ – /, "–")}</strong> · {data.distance}</>}
                  </span>
                </div>
                <div className={s.ctaRow}>
                  <WhatsAppButton message={genericMessage} cta="hero" label={t.bookWhatsApp} />
                  {bookOnline(`btn btn-lg ${s.btnOnDark}`)}
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

        {/* Booking form. #booking is where every "Book Online" link lands. */}
        <section id="booking" className={s.formSection}>
          <div className="container">
            <QuickBookForm
              defaultFrom={data.origin}
              defaultTo={data.destination}
              heading={L.form.heading}
              headingAs="h2"
              headingStyle={L.form.headingStyle}
              subheading={L.form.subheading}
              locale={locale}
              vehicles={vehicles.map((v) => ({ value: v.name, label: `${v.name} – ${priceText(v) ?? t.priceOnRequestShort}` }))}
              maxPassengers={L.form.maxPassengers}
              footerNote={L.form.footerNote}
              whatsappIntro={genericMessage}
            />
          </div>
        </section>

        {body}
      </main>
    </>
  );
}
