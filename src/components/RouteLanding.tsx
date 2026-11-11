import Link from "next/link";
import Image from "next/image";
import { preload } from "react-dom";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import {
  ShieldIcon, ClockIcon, CarIcon, MessageIcon, MapPinIcon, GlobeIcon, NavigationIcon,
  TimerIcon, TagIcon, UserIcon, HomeIcon, PlaneIcon, PackageIcon, PhoneIcon,
  CheckCircleIcon, FileCheckIcon, CalendarIcon, BriefcaseIcon, LandmarkIcon,
  ArrowRightIcon, ChevronDownIcon, HelpCircleIcon, ShieldCheckIcon, WhatsAppIcon,
} from "@/components/Icons";
import QuickBookForm from "@/components/QuickBookForm";
import { renderInline, plainText, type RouteData } from "@/components/RoutePage";
import { waLink, TEL_URL, PHONE_DISPLAY } from "@/lib/contact";
import { formatRoutePrice } from "@/lib/routePricing";
import type { LandingIcon, LandingImage } from "@/lib/routeLanding";
import s from "./RouteLanding.module.css";

const ICONS: Record<LandingIcon, (p: { size?: number }) => React.ReactElement> = {
  shield: ShieldIcon, clock: ClockIcon, car: CarIcon, message: MessageIcon, mapPin: MapPinIcon,
  globe: GlobeIcon, navigation: NavigationIcon, timer: TimerIcon, tag: TagIcon, user: UserIcon,
  home: HomeIcon, plane: PlaneIcon, package: PackageIcon, phone: PhoneIcon, check: CheckCircleIcon,
  fileCheck: FileCheckIcon, calendar: CalendarIcon, briefcase: BriefcaseIcon, landmark: LandmarkIcon,
};

/** Decorative icon: hidden from screen readers, which read the text beside it. */
function Icon({ name, size = 18, badge }: { name: LandingIcon; size?: number; badge?: boolean }) {
  const Svg = ICONS[name];
  return (
    <span className={badge ? s.iconBadge : s.icon} aria-hidden="true">
      <Svg size={size} />
    </span>
  );
}

/**
 * A photo, or the slot for one. Both sit in a box of fixed aspect ratio,
 * so swapping a slot for its photo later causes no layout shift. A slot's
 * brief (size and alt text) is kept in `data-image-todo` and `aria-label`.
 */
function Media({ image, ratio, sizes, className }: { image: LandingImage; ratio: string; sizes: string; className?: string }) {
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
      <span className={s.icon} aria-hidden="true"><MapPinIcon size={28} /></span>
      <span className={s.placeholderLabel} aria-hidden="true">Photo coming soon</span>
    </div>
  );
}

function SectionHeader({ eyebrow, title, intro, centered = true }: { eyebrow: string; title: string; intro?: string; centered?: boolean }) {
  return (
    <div className={`section-header${centered ? " centered" : ""}`}>
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {intro && <p className={`section-subtitle ${s.inlineLink}`}>{renderInline(intro)}</p>}
    </div>
  );
}

/**
 * The designed route layout: hero, booking form, highlights, prices,
 * journey, border, inclusions, booking steps, destinations, FAQ and
 * closing CTA, each its own section. Used by routes that set
 * `RouteData.landing`; every other route keeps RoutePage.
 */
export default function RouteLanding({ data }: { data: RouteData }) {
  const L = data.landing!;
  const { hero, prices } = L;
  const route = `${data.origin} to ${data.destination}`;
  const priced = prices.vehicles.filter((v) => v.amount !== null);
  const vehicleWhatsApp = (vehicle: string) =>
    waLink(`Hi, I want to book ${route} in the ${vehicle} on [date] for [x] passengers`);

  // The hero photo is the largest thing above the fold on desktop: fetch it
  // first, at the size the browser will actually use.
  const heroSizes = "(max-width: 1024px) calc(100vw - 32px), 640px";
  const heroSrcSet = hero.image.srcSet.map((x) => `${x.src} ${x.width}w`).join(", ");
  preload(hero.image.src, { as: "image", imageSrcSet: heroSrcSet, imageSizes: heroSizes, fetchPriority: "high" });

  const schemas = [
    serviceSchema({
      name: `${route} Taxi Service`,
      description: plainText(data.intro),
      url: `/${data.slug}`,
      areaServed: [data.origin, data.destination],
      image: hero.image.src,
      offers: priced.map((v) => ({
        name: `${v.name}, ${route}, one-way`,
        price: v.amount as number,
        priceCurrency: prices.currency,
      })),
    }),
    faqSchema(data.faqs.map((f) => ({ question: f.q, answer: plainText(f.a) }))),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Border Crossing", path: "/border-crossing" },
      { name: data.breadcrumbLabel, path: `/${data.slug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main data-page-template="route-landing">

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
                <ul className={s.chips}>
                  {hero.chips.map((c) => (
                    <li key={c.label} className={s.chip}><Icon name={c.icon} size={16} /> {c.label}</li>
                  ))}
                </ul>
                <div className={s.priceRow}>
                  <span className={s.priceBadge}>{hero.priceBadge}</span>
                  <span className={s.priceNote}>one way, per vehicle</span>
                </div>
                <div className={s.ctaRow}>
                  <a href={waLink(hero.whatsappMessage)} className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer" data-wa-cta="hero">
                    <span className={s.icon} aria-hidden="true"><WhatsAppIcon size={18} /></span> Book on WhatsApp
                  </a>
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
              vehicles={L.form.vehicles}
              maxPassengers={L.form.maxPassengers}
              footerNote={L.form.footerNote}
            />
          </div>
        </section>

        {/* 3. Route highlights */}
        <section className="section">
          <div className="container">
            <SectionHeader eyebrow="Route highlights" title={L.highlights.heading} intro={data.intro} />
            <div className={s.statGrid}>
              {L.highlights.items.map((it) => (
                <div key={it.label} className={s.stat}>
                  <Icon name={it.icon} size={20} badge />
                  <div>
                    <span className={s.statLabel}>{it.label}</span>
                    <span className={s.statValue}>{it.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className={s.sectionNote}>
              {L.highlights.note}{" "}
              <Link href={L.highlights.link.href} className={s.inlineLink}>{L.highlights.link.label}</Link>
            </p>
          </div>
        </section>

        {/* 4. Prices and vehicles */}
        <section id="price" className={`section ${s.subtle}`}>
          <div className="container">
            <SectionHeader eyebrow="Prices" title={prices.heading} intro={prices.intro} />
            <div className={s.vehicleGrid}>
              {prices.vehicles.map((v) => (
                <article key={v.name} className={s.vehicleCard}>
                  <Media image={v.image} ratio="16 / 10" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" />
                  <div className={s.vehicleBody}>
                    <div className={s.vehicleHead}>
                      <h3 className={s.vehicleName}>{v.name}</h3>
                      <span className={s.fare}>
                        {v.amount !== null ? (
                          <>
                            <span className={s.fareAmount}>{formatRoutePrice(v.amount, prices.currency)}</span>
                            <span className={s.fareBasis}>one way</span>
                          </>
                        ) : (
                          <span className={s.fareOnRequest}>Price on request</span>
                        )}
                      </span>
                    </div>
                    <ul className={s.capacity}>
                      <li><Icon name="user" size={16} /> {v.passengers} passengers</li>
                      <li><Icon name="package" size={16} /> {v.luggage} bags</li>
                    </ul>
                    <p className={s.vehicleNote}>{v.note}</p>
                    <a href={vehicleWhatsApp(v.name)} className={`btn btn-whatsapp ${s.vehicleCta}`} target="_blank" rel="noopener noreferrer" data-wa-cta="vehicle-card">
                      <span className={s.icon} aria-hidden="true"><WhatsAppIcon size={16} /></span>
                      {v.amount !== null ? "Book this car" : "Get a price on WhatsApp"}
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className={s.priceFootnote}>{prices.note}</p>
            <p className={s.reviewed}>Prices confirmed {prices.confirmedOn}.</p>
          </div>
        </section>

        {/* 5. Journey timeline */}
        <section className="section">
          <div className="container">
            <SectionHeader eyebrow="Journey" title={L.timeline.heading} intro={L.timeline.intro} centered={false} />
            <div className={s.timelineGrid}>
              <ol className={s.timeline}>
                {L.timeline.steps.map((st) => (
                  <li key={st.title} className={s.timelineStep}>
                    <Icon name={st.icon} size={20} badge />
                    <div>
                      <h3 className={s.timelineTitle}>{st.title}</h3>
                      <p className={s.timelineBody}>{st.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <figure className={s.timelineFigure}>
                <Media image={L.timeline.image} ratio="4 / 3" sizes="(max-width: 1024px) 100vw, 560px" />
              </figure>
            </div>
          </div>
        </section>

        {/* 6. King Fahd Causeway crossing */}
        <section className={`section ${s.subtle}`}>
          <div className="container">
            <SectionHeader eyebrow="Border crossing" title={L.crossing.heading} intro={L.crossing.intro} />
            <div className={s.crossingGrid}>
              <div className={s.crossingCard}>
                <div className={s.crossingCardHead}>
                  <Icon name="car" size={20} badge />
                  <h3>{L.crossing.driverHeading}</h3>
                </div>
                <ul className={s.checkList}>
                  {L.crossing.driver.map((x) => (
                    <li key={x}><span className={s.icon} aria-hidden="true"><ShieldCheckIcon size={18} /></span> {x}</li>
                  ))}
                </ul>
              </div>
              <div className={s.crossingCard}>
                <div className={s.crossingCardHead}>
                  <Icon name="fileCheck" size={20} badge />
                  <h3>{L.crossing.passengerHeading}</h3>
                </div>
                <ul className={s.checkList}>
                  {L.crossing.passenger.map((x) => (
                    <li key={x}><span className={s.icon} aria-hidden="true"><CheckCircleIcon size={18} /></span> {x}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className={s.callout} role="note">
              <span className={s.icon} aria-hidden="true"><HelpCircleIcon size={20} /></span>
              {L.crossing.callout}
            </p>
            <p className={`${s.sectionNote} ${s.inlineLink}`}>{renderInline(L.crossing.outro)}</p>
          </div>
        </section>

        {/* 7. What's included */}
        <section className="section">
          <div className="container">
            <SectionHeader eyebrow="What's included" title={L.included.heading} />
            <div className={s.includedGrid}>
              {L.included.items.map((it) => (
                <div key={it.title} className={s.includedItem}>
                  <Icon name={it.icon} size={20} badge />
                  <h3>{it.title}</h3>
                  <p>{it.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. How to book */}
        <section className={`section ${s.subtle}`}>
          <div className="container">
            <SectionHeader eyebrow="How it works" title={L.howToBook.heading} />
            <ol className={s.steps}>
              {L.howToBook.steps.map((st, i) => (
                <li key={st.title} className={s.step}>
                  <span className={s.stepNumber} aria-hidden="true">{i + 1}</span>
                  <Icon name={st.icon} size={20} badge />
                  <h3>{st.title}</h3>
                  <p>{st.body}</p>
                </li>
              ))}
            </ol>
            <div className={`${s.ctaRow} ${s.stepsCta}`}>
              <a href={waLink(hero.whatsappMessage)} className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer" data-wa-cta="how-to-book">
                <span className={s.icon} aria-hidden="true"><WhatsAppIcon size={18} /></span> Book on WhatsApp
              </a>
              <Link href={hero.bookOnlineHref} className="btn btn-primary btn-lg">Book Online</Link>
            </div>
          </div>
        </section>

        {/* 9. Nearby destinations */}
        <section className="section">
          <div className="container">
            <SectionHeader eyebrow="Explore" title={L.nearby.heading} intro={L.nearby.intro} />
            <div className={s.destGrid}>
              {L.nearby.items.map((d) => (
                <Link key={d.href} href={d.href} className={s.destCard}>
                  <Media image={d.image} ratio="4 / 3" sizes="(max-width: 640px) 100vw, 280px" />
                  <div className={s.destBody}>
                    <h3>{d.name}</h3>
                    <p>{d.blurb}</p>
                    <span className={s.viewLink}>View {d.name} <span className={s.icon} aria-hidden="true"><ArrowRightIcon size={14} /></span></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 10. FAQ. Answers are in the HTML whether or not a question is open. */}
        <section className={`section ${s.subtle}`}>
          <div className="container">
            <SectionHeader eyebrow="FAQ" title={`${route} Taxi: Your Questions Answered`} />
            <div className={s.faqList}>
              {data.faqs.map((f, i) => (
                <details key={f.q} className={s.faq} open={i === 0}>
                  <summary>
                    <h3>{f.q}</h3>
                    <span className={`${s.icon} ${s.faqChevron}`} aria-hidden="true"><ChevronDownIcon size={18} /></span>
                  </summary>
                  <p className={s.inlineLink}>{renderInline(f.a)}</p>
                </details>
              ))}
            </div>
            {data.lastReviewed && <p className={s.reviewed}>Page last reviewed: {data.lastReviewed}.</p>}
          </div>
        </section>

        {/* 11. Return trip */}
        <section style={{ padding: "var(--space-12) 0 0" }}>
          <div className="container">
            <div className={s.returnStrip}>
              <p>{L.returnTrip.text}</p>
              <Link href={L.returnTrip.href} className="btn btn-primary">
                {L.returnTrip.label} <span className={s.icon} aria-hidden="true"><ArrowRightIcon size={16} /></span>
              </Link>
            </div>
          </div>
        </section>

        {/* 12. Other popular routes */}
        <section className="section">
          <div className="container">
            <SectionHeader eyebrow="More routes" title={L.popularRoutes.heading} />
            <div className={s.routeGrid}>
              {L.popularRoutes.items.map((r) => (
                <Link key={r.href} href={r.href} className={s.routeCard}>
                  <span className={s.routeTag}>{r.tag}</span>
                  <h3 className={s.routeName}>
                    {r.from} <span className={s.icon} aria-hidden="true"><ArrowRightIcon size={16} /></span>
                    <span className="sr-only">to</span> {r.to}
                  </h3>
                  <span className={s.viewLink}>View route <span className={s.icon} aria-hidden="true"><ArrowRightIcon size={14} /></span></span>
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

        {/* 13. Final CTA */}
        <section className={s.finalCta}>
          <div className="container">
            <div className={s.finalGrid}>
              <div>
                <span className={s.heroEyebrow}>Book now</span>
                <h2>{L.finalCta.heading}</h2>
                <div className={s.priceRow}>
                  <span className={s.priceBadge}>{hero.priceBadge}</span>
                  <span className={s.priceNote}>one way, per vehicle</span>
                </div>
                <p>{L.finalCta.blurb}</p>
                <div className={s.ctaRow}>
                  <a href={waLink(hero.whatsappMessage)} className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer" data-wa-cta="closing-cta">
                    <span className={s.icon} aria-hidden="true"><WhatsAppIcon size={18} /></span> Book on WhatsApp
                  </a>
                  <Link href={hero.bookOnlineHref} className="btn btn-primary btn-lg">Book Online</Link>
                  <a href={TEL_URL} className={`btn btn-lg ${s.btnOnDark}`}>
                    <span className={s.icon} aria-hidden="true"><PhoneIcon size={18} /></span> {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
              <figure className={s.finalFigure}>
                <Media image={L.finalCta.image} ratio="3 / 2" sizes="(max-width: 1024px) 100vw, 560px" />
              </figure>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
