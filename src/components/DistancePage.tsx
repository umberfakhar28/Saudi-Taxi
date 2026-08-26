'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { faqSchema, breadcrumbSchema, jsonLd } from '@/lib/jsonld';
import {
  MapPinIcon, ClockIcon, GlobeIcon, ArrowRightIcon, MountainIcon,
  CheckCircleIcon, MessageIcon, ChevronDownIcon, CalendarIcon, CarIcon,
} from '@/components/Icons';
import { WHATSAPP_URL } from '@/lib/contact';
import type { DistanceRouteData } from '@/lib/distanceRouteData';
import { distanceRoutes } from '@/lib/distanceRouteData';
import routeStyles from './RoutePage.module.css';
import faqStyles from './FAQSection.module.css';

function bookingHref(from: string, to: string): string {
  const params = new URLSearchParams({ mode: 'transfers', from, to });
  return `/book-online?${params.toString()}`;
}

function DistanceFAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={faqStyles.accordion}>
      {faqs.map((f, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className={`${faqStyles.accordionItem} ${isOpen ? faqStyles.accordionItemOpen : ''}`}>
            <button
              className={faqStyles.accordionTrigger}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className={faqStyles.accordionQuestion}>{f.q}</span>
              <ChevronDownIcon size={20} className={`${faqStyles.accordionIcon} ${isOpen ? faqStyles.accordionIconOpen : ''}`} />
            </button>
            <div className={`${faqStyles.accordionBody} ${isOpen ? faqStyles.accordionBodyOpen : ''}`} style={isOpen ? { maxHeight: 400 } : undefined}>
              <p className={faqStyles.accordionAnswer}>{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function DistancePage({ data }: { data: DistanceRouteData }) {
  const schemas = [
    faqSchema(data.faqs.map((f) => ({ question: f.q, answer: f.a }))),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Distance Guides', path: '/distance' },
      { name: data.breadcrumbLabel, path: `/distance/${data.slug}` },
    ]),
  ];

  const relatedDistance = data.relatedDistanceSlugs
    .map((slug) => distanceRoutes[slug])
    .filter((r): r is DistanceRouteData => Boolean(r));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main>
        {/* Hero — route, distance, time and the primary CTA are all above
            the fold, per the brief's above-the-fold requirement. */}
        <section className="page-hero">
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <span className="section-eyebrow">{data.eyebrow}</span>
            <h1>{data.h1}</h1>
            <p>{data.intro}</p>
            <div className="breadcrumb">
              <Link href="/">Home</Link> / <Link href="/distance">Distance Guides</Link> / <span>{data.breadcrumbLabel}</span>
            </div>
            <div style={{ marginTop: 'var(--space-6)' }}>
              <Link href={bookingHref(data.origin, data.destination)} className="btn btn-primary btn-lg">
                Get a Private Transfer Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Route facts strip */}
        <section style={{ background: 'var(--bg-dark)', padding: '1.75rem 0' }}>
          <div className="container">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--on-dark)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                <MapPinIcon size={16} /> {data.roadDistance}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--on-dark)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                <ClockIcon size={16} /> {data.driveTime}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--on-dark)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                <GlobeIcon size={16} /> {data.routeType}
              </div>
            </div>
          </div>
        </section>

        {data.heroImage && (
          <section style={{ padding: 'var(--space-8) 0 0' }}>
            <div className="container">
              <div style={{ position: 'relative', width: '100%', height: 360, borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
                <Image
                  src={data.heroImage}
                  alt={data.heroImageAlt ?? `${data.origin} to ${data.destination} route`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            </div>
          </section>
        )}

        {/* Journey path — same visual language as RoutePage.tsx's corridor
            chip chain, standing in for a map (no mapping dependency exists
            in the project — see RoutePage.tsx's own note on this). */}
        <section style={{ padding: 'var(--space-8) 0 0' }}>
          <div className="container">
            <div className={routeStyles.journeyPath}>
              <span className={routeStyles.journeyPoint}>{data.origin}</span>
              <ArrowRightIcon size={18} className={routeStyles.journeyArrow} />
              <span className={`${routeStyles.journeyPoint} ${routeStyles.journeyDestination}`}>{data.destination}</span>
            </div>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', marginTop: 'var(--space-3)' }}>
              Route shown for orientation — road distance and drive time above reflect the actual driving route, not a straight line.
            </p>
          </div>
        </section>

        {/* Route Overview */}
        <section className="section-lg">
          <div className="container">
            <div className="grid-60-40">
              <div>
                <span className="section-eyebrow">Route Overview</span>
                <h2 className="section-title">{data.origin} to {data.destination}: What the Journey Involves</h2>
                {data.overviewParagraphs.map((p, i) => (
                  <p key={i} style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>{p}</p>
                ))}
              </div>
              <div className="card">
                <div className="card-icon"><MountainIcon size={22} /></div>
                <h3>Route Characteristics</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
                  {data.routeCharacteristics.map((c, i) => (
                    <li key={i} style={{ color: 'var(--text-body)', fontSize: 'var(--text-sm)', display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--navy)', flexShrink: 0 }}>›</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Distance & Driving Time */}
        <section className="section" style={{ background: 'var(--bg-subtle)' }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Distance & Driving Time</span>
              <h2 className="section-title">Road Distance vs. Driving Time</h2>
            </div>
            <div className="grid-2">
              <div className="card">
                <div className="card-icon"><MapPinIcon size={22} /></div>
                <h3>Road Distance</h3>
                <p style={{ color: 'var(--navy)', fontWeight: 700, fontSize: 'var(--text-xl)' }}>{data.roadDistance}</p>
                {data.straightLineDistance && (
                  <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                    Straight-line distance: {data.straightLineDistance}. The gap between the two figures reflects the actual road network, not an inefficient route.
                  </p>
                )}
              </div>
              <div className="card">
                <div className="card-icon"><ClockIcon size={22} /></div>
                <h3>Estimated Drive Time</h3>
                <p style={{ color: 'var(--navy)', fontWeight: 700, fontSize: 'var(--text-xl)' }}>{data.driveTime}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Pure driving estimate — add time for rest, meal and prayer stops.</p>
              </div>
            </div>
            <div style={{ marginTop: 'var(--space-8)' }}>
              <h3 style={{ marginBottom: 'var(--space-4)' }}>What Affects Travel Time on This Route</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {data.factorsAffectingTime.map((f, i) => (
                  <li key={i} style={{ color: 'var(--text-body)', display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                    <CheckCircleIcon size={18} style={{ color: 'var(--success)', flexShrink: 0, marginTop: 3 }} /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Travel Options */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Travel Options</span>
              <h2 className="section-title">Ways to Travel from {data.origin} to {data.destination}</h2>
            </div>
            <div className="grid-3">
              {data.travelOptions.map((o) => (
                <div key={o.title} className="card">
                  <div className="card-icon"><CarIcon size={22} /></div>
                  <h3>{o.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>{o.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Private Transfer — pivots the informational intent to Gulf Trip
            Service's actual offering, per the brief's commercial-connection
            requirement. */}
        <section className="section" style={{ background: 'var(--bg-subtle)' }}>
          <div className="container">
            <div className="grid-2">
              <div>
                <span className="section-eyebrow">Private Transfer</span>
                <h2 className="section-title">Book a Private {data.origin} to {data.destination} Transfer</h2>
                <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
                  If you&apos;d rather not drive the distance yourself, Gulf Trip Service arranges private, door-to-door transfers for this route.
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                  <Link href={bookingHref(data.origin, data.destination)} className="btn btn-primary">Book Your Private Transfer</Link>
                  <a href={WHATSAPP_URL} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                    <MessageIcon size={16} /> Ask on WhatsApp
                  </a>
                </div>
              </div>
              <div className="card">
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {data.transferBenefits.map((b, i) => (
                    <li key={i} style={{ color: 'var(--text-body)', display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', fontSize: 'var(--text-sm)' }}>
                      <CheckCircleIcon size={18} style={{ color: 'var(--success)', flexShrink: 0, marginTop: 2 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Planning */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Journey Planning</span>
              <h2 className="section-title">Planning Your {data.origin} to {data.destination} Trip</h2>
            </div>
            <div className="grid-3">
              {data.journeyPlanning.map((j) => (
                <div key={j.title} className="card">
                  <div className="card-icon"><CalendarIcon size={22} /></div>
                  <h3 style={{ fontSize: 'var(--text-base)' }}>{j.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>{j.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Time to Travel */}
        <section className="section" style={{ background: 'var(--bg-subtle)' }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Best Time to Travel</span>
              <h2 className="section-title">When to Travel from {data.origin} to {data.destination}</h2>
            </div>
            <div style={{ maxWidth: 780, margin: '0 auto' }}>
              {data.bestTimeToTravel.map((p, i) => (
                <p key={i} style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: 'var(--space-5)' }}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">FAQ</span>
              <h2 className="section-title">{data.origin} to {data.destination} — Frequently Asked Questions</h2>
            </div>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <DistanceFAQAccordion faqs={data.faqs} />
            </div>
          </div>
        </section>

        {/* Related Distance Guides — only rendered once another entry
            actually resolves, same defensive pattern as RoutePage.tsx's
            reverseRoute callout (never a link to a page that doesn't exist). */}
        {relatedDistance.length > 0 && (
          <section className="section" style={{ background: 'var(--bg-subtle)' }}>
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Explore More</span>
                <h2 className="section-title">Related Distance Guides</h2>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'center' }}>
                {relatedDistance.map((r) => (
                  <Link key={r.slug} href={`/distance/${r.slug}`} className="btn btn-outline-gold">
                    {r.origin} → {r.destination}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Cities, Airports & Services */}
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-10)' }}>
              {(data.originCitySlug || data.destinationCitySlug) && (
                <div>
                  <h3 style={{ marginBottom: 'var(--space-4)' }}>Related Cities</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                    {data.originCitySlug && <Link href={`/services/${data.originCitySlug}`} className="btn btn-outline-gold btn-sm">{data.origin} transfer service</Link>}
                    {data.destinationCitySlug && <Link href={`/services/${data.destinationCitySlug}`} className="btn btn-outline-gold btn-sm">{data.destination} transfer service</Link>}
                  </div>
                </div>
              )}
              {(data.originAirportHref || data.destinationAirportHref) && (
                <div>
                  <h3 style={{ marginBottom: 'var(--space-4)' }}>Related Airports</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                    {data.originAirportHref && <Link href={data.originAirportHref} className="btn btn-outline-gold btn-sm">{data.origin} airport transfer</Link>}
                    {data.destinationAirportHref && <Link href={data.destinationAirportHref} className="btn btn-outline-gold btn-sm">{data.destination} airport transfer</Link>}
                  </div>
                </div>
              )}
              <div>
                <h3 style={{ marginBottom: 'var(--space-4)' }}>Related Services</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                  {data.relatedServiceLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="btn btn-outline-gold btn-sm">{l.label}</Link>
                  ))}
                  <Link href="/fleet" className="btn btn-outline-gold btn-sm">Our Fleet</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section style={{ background: 'var(--bg-dark)', padding: 'var(--space-20) 0', textAlign: 'center' }}>
          <div className="container">
            <span className="section-eyebrow" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'var(--line-dark)', color: 'var(--on-dark)' }}>Book Now</span>
            <h2 style={{ color: 'var(--on-dark)', fontSize: 'var(--text-4xl)', margin: 'var(--space-4) 0' }}>{data.ctaText}</h2>
            <p style={{ color: 'var(--on-dark-muted)', fontSize: 'var(--text-lg)', maxWidth: 560, margin: '0 auto var(--space-8)' }}>
              Private, door-to-door transfers for {data.origin} to {data.destination} — fixed quote before you travel.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={bookingHref(data.origin, data.destination)} className="btn btn-primary btn-lg">Get a Quote</Link>
              <a href={WHATSAPP_URL} className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer">
                <MessageIcon size={18} /> WhatsApp Quote
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
