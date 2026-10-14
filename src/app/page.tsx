import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import TrendingDestinations from "@/components/TrendingDestinations";
import Features from "@/components/Features";
import FAQSection from "@/components/FAQSection";
import FlightDisruptionBanner from "@/components/FlightDisruptionBanner";
import VehiclesSection from "@/components/VehiclesSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Link from "next/link";
import Image from "next/image";
import { CheckCircleIcon, GlobeIcon } from "@/components/Icons";
import { generatePageMetadata } from "@/lib/seo";
import AnimatedCounter from "@/components/AnimatedCounter";
import { homeFaqs } from "@/lib/homeFaqs";
import { faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import styles from "./page.module.css";

export const metadata = generatePageMetadata({
  title: "Saudi Arabia Taxi & GCC Transfers",
  description: "Premium taxi service in Makkah, Jeddah, Madinah, Riyadh and Dammam, plus GCC cross-border transfers to Bahrain and Qatar. Fixed rates, 24/7 availability.",
  path: "/",
  hreflangPath: "/",
});

/* =======================================================================
   DATA
   ======================================================================= */

const stats = [
  { number: "15,000+", label: "Happy Travelers" },
  { number: "10+",     label: "Years Experience" },
  { number: "24/7",    label: "Availability" },
  { number: "100%",    label: "Satisfaction Rate" },
];


const whyUs = [
  "Ministry-licensed fleet — every vehicle fully insured",
  "Fixed fares displayed upfront — no surge pricing",
  "English, Arabic & Urdu-speaking drivers",
  "Real-time WhatsApp updates for every booking",
  "Modern SUVs, Sedans and Minivans available",
  "Accepts cash, card, and online payment",
];

/* =======================================================================
   PAGE
   ======================================================================= */

const homeSchemas = [
  faqSchema(homeFaqs),
  breadcrumbSchema([{ name: "Home", path: "/" }]),
];

export default function Home() {
  return (
    <main className={styles.homepage}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(homeSchemas) }} />
      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Balance: 2-col asymmetric layout
          ═══════════════════════════════════════════════════════════════════ */}
      <Hero />

      {/* ═══════════════════════════════════════════════════════════════════
          FLIGHT DISRUPTION — entry point for travellers whose Riyadh flight
          has fallen through, routing to /riyadh-alternative-airports.
          ═══════════════════════════════════════════════════════════════════ */}
      <FlightDisruptionBanner />

      {/* ═══════════════════════════════════════════════════════════════════
          TRENDING DESTINATIONS — Popular Gulf cities
          ═══════════════════════════════════════════════════════════════════ */}
      <TrendingDestinations />

      {/* ═══════════════════════════════════════════════════════════════════
          VEHICLES — "Vehicles Available For Convenient Rides", replacing
          the old scrolling "Book by Vehicle Type" carousel in this slot
          (homepage revision brief §2).
          ═══════════════════════════════════════════════════════════════════ */}
      <VehiclesSection />

      {/* ═══════════════════════════════════════════════════════════════════
          WHY CHOOSE US / OUR PROMISE — large editorial photo (brief §3),
          benefit checklist redrawn as compact tiles rather than one long
          list, so the section reads as "multiple benefit cards."
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-lg" style={{ background: 'var(--ivory)' }}>
        <div className="container">
          <div className={styles.ourPromiseRow}>

            {/* Navy card — the primary visual element. */}
            <div
              className={styles.ourPromiseCard}
              style={{
                background: 'var(--navy)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-12)',
                boxShadow: '0 20px 48px rgba(8, 24, 39, 0.25)',
              }}
            >
              <div className="section-header">
                <h2 className="section-title" style={{ color: 'var(--on-dark)' }}>
                  Why Thousands Choose Gulf Trip Service
                </h2>
              </div>
              <p style={{ color: 'var(--on-dark)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)', lineHeight: 1.8 }}>
                We&apos;ve been serving Umrah pilgrims and travellers in Saudi Arabia for
                over a decade. Every aspect of our service is designed around your
                comfort and peace of mind.
              </p>
              <p style={{ color: 'var(--on-dark-muted)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-8)', lineHeight: 1.8 }}>
                Beyond the Holy Cities, we run dedicated services in{' '}
                <Link href="/services/madinah" style={{ color: 'var(--on-dark)', fontWeight: 600, textDecoration: 'underline' }}>Madinah</Link>,{' '}
                <Link href="/services/makkah" style={{ color: 'var(--on-dark)', fontWeight: 600, textDecoration: 'underline' }}>Makkah</Link>,{' '}
                <Link href="/services/taif" style={{ color: 'var(--on-dark)', fontWeight: 600, textDecoration: 'underline' }}>Taif</Link> and{' '}
                <Link href="/services/alula" style={{ color: 'var(--on-dark)', fontWeight: 600, textDecoration: 'underline' }}>AlUla</Link>, with the same fixed-rate, pre-booked chauffeur model.
              </p>

              {/* Benefit tiles — 2-column grid of compact, self-contained cards. */}
              <div className={styles.promiseTiles}>
                {whyUs.map((item, i) => (
                  <div key={i} className={styles.promiseTile}>
                    <CheckCircleIcon
                      size={18}
                      style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }}
                    />
                    <span style={{ color: 'var(--on-dark)', fontSize: 'var(--text-sm)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Large editorial photo — a real, equal-weight visual element,
                not a small accent thumbnail (brief §3, "large imagery"). */}
            <div className={styles.ourPromiseImage}>
              <Image
                src="/images/private-chauffeur-luggage-assistance-madinah.webp"
                alt="Gulf Trip Service chauffeur opening the car door for a guest, with the Prophet's Mosque in Madinah behind them"
                title="Private Chauffeur Service in Madinah, Saudi Arabia"
                fill
                sizes="(max-width: 780px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BUILT AROUND YOUR COMFORT — from Features component (brief §4)
          ═══════════════════════════════════════════════════════════════════ */}
      <Features />

      {/* ═══════════════════════════════════════════════════════════════════
          SOCIAL PROOF — Trustpilot + free-cancellation row
          ═══════════════════════════════════════════════════════════════════ */}
      <SocialProof />

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICES — new section (brief §5), positioned immediately after
          the Trustpilot/cancellation row per the brief's required ordering.
          ═══════════════════════════════════════════════════════════════════ */}
      <ServicesSection />

      {/* ═══════════════════════════════════════════════════════════════════
          STATS BANNER — navy background, gold numbers (Fix 3)
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'var(--navy)',
          padding: 'var(--space-16) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative dot overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(var(--gold) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.06,
            pointerEvents: 'none',
          }}
        />
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            {stats.map((stat, i) => (
              <div key={i}>
                {/* Number — gold-300, verified ~8:1 against navy */}
                <div className="stat-number" style={{ color: 'var(--gold-300)' }}>
                  <AnimatedCounter end={stat.number} />
                </div>
                {/* Label — text-on-dark-muted, verified ~8:1 against navy */}
                <div className="stat-label" style={{ color: 'var(--text-on-dark-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          GCC CROSS-BORDER — supports /border-crossing + route pages beyond
          the Makkah/Jeddah/Madinah core, covering the Eastern Province and
          cross-border transfers to Bahrain and Qatar.
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-lg" style={{ background: 'var(--ivory)' }}>
        <div className="container">
          <div className="grid-60-40" style={{ alignItems: 'center' }}>
            <div>
              <div className="section-header">
                <h2 className="section-title" style={{ color: 'var(--text)' }}>Eastern Province &amp; GCC Cross-Border Transfers</h2>
              </div>
              <p style={{ color: 'var(--text)', fontSize: 'var(--text-lg)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
                Beyond Makkah, Jeddah and Madinah, we run daily routes across the Eastern
                Province — Dammam, Khobar and Dhahran — and connect travelers overland to
                neighboring GCC countries. Direct transfers to Bahrain via the King Fahd
                Causeway and to Qatar via the Salwa border, with meet-and-greet pickup from
                Dammam&apos;s King Fahd International Airport or any Saudi city.
              </p>
              <Link href="/border-crossing" className="btn btn-secondary">
                Explore Border Crossing Routes
              </Link>
            </div>

            {/* Right column — full, uncropped King Fahd Causeway photo at its
                native ~7:5 ratio, centered against the taller text column
                instead of being stretched/clipped to match its height. */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '7 / 5', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: '0 20px 48px rgba(8, 24, 39, 0.18)' }}>
              <Image
                src="/images/king-fahd-causeway-saudi-bahrain-border-crossing.webp"
                alt="Aerial view of the King Fahd Causeway connecting Saudi Arabia and Bahrain across the Gulf"
                title="King Fahd Causeway — Saudi Arabia to Bahrain Border Crossing"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Popular GCC Routes — a compact link row beneath the photo, not a
              second card, so the two-column layout above stays a clean
              text + photo pairing. */}
          <div style={{ marginTop: 'var(--space-10)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--line)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-5)' }}>
              <GlobeIcon size={20} style={{ color: 'var(--navy)', flexShrink: 0 }} /> Popular GCC Routes
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              {[
                { href: '/dammam-airport-to-bahrain-taxi-service', label: 'Dammam Airport → Bahrain' },
                { href: '/dammam-airport-to-qatar-taxi-service', label: 'Dammam Airport → Qatar' },
                { href: '/bahrain-to-dammam-taxi-service', label: 'Bahrain → Dammam' },
                { href: '/qatar-to-riyadh-taxi-service', label: 'Qatar → Riyadh' },
              ].map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  style={{
                    color: 'var(--teal)',
                    fontWeight: 600,
                    fontSize: 'var(--text-sm)',
                    background: 'var(--white)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 16px',
                  }}
                >
                  {r.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS — Real customer stories
          ═══════════════════════════════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ═══════════════════════════════════════════════════════════════════
          FAQ — Repetition: consistent accordion style
          ═══════════════════════════════════════════════════════════════════ */}
      <FAQSection />

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA BANNER
          Balance: centered text block + two side-by-side buttons
          Contrast: white heading & text on dark green gradient background
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'var(--ivory)',
          padding: 'var(--space-20) 0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Badge — a genuine availability/contact fact, not a mechanical
              section-topic label, so it stays despite the sitewide eyebrow
              cleanup (brief §6). */}
          <div
            style={{
              display: 'inline-flex',
              marginBottom: 'var(--space-6)',
              background: 'var(--ivory-200)',
              border: '1px solid var(--ivory-300)',
              color: 'var(--text-muted)',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            24/7 Available — Call or WhatsApp Anytime
          </div>

          {/* Heading */}
          <h2
            style={{
              color: 'var(--text)',
              fontSize: 'var(--text-4xl)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Ready to Book Your Ride?
          </h2>

          {/* Body */}
          <p
            style={{
              color: 'var(--text)',
              fontSize: 'var(--text-lg)',
              maxWidth: 580,
              margin: '0 auto var(--space-10)',
              lineHeight: 1.8,
            }}
          >
            Book your comfortable, reliable taxi service today. Available 24/7
            across Makkah, Jeddah, and Madinah with fixed, transparent pricing.
          </p>

          {/* CTA group — gold primary (the one primary button on this screenful),
              navy secondary — this section sits on ivory, so it needs the
              solid-navy secondary treatment, not the on-navy outline variant. */}
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/book-online" className="btn btn-primary btn-lg">
              Book Now
            </Link>
            <Link href="/contact-us" className="btn btn-secondary btn-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
