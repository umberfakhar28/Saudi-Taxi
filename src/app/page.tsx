import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import TrendingDestinations from "@/components/TrendingDestinations";
import Features from "@/components/Features";
import FAQSection from "@/components/FAQSection";
import VehiclesSection from "@/components/VehiclesSection";
import VehicleTypeCarousel from "@/components/VehicleTypeCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import Link from "next/link";
import Image from "next/image";
import { LandmarkIcon, PlaneIcon, CarIcon, HotelIcon, CompassIcon, CheckCircleIcon, ArrowRightIcon, GlobeIcon } from "@/components/Icons";
import { generatePageMetadata } from "@/lib/seo";
import AnimatedCounter from "@/components/AnimatedCounter";
import QuickBookingForm from "@/components/QuickBookingForm";
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

const services = [
  {
    icon: <LandmarkIcon size={26} />,
    title: "Umrah Taxi Services",
    description:
      "Direct transport between Holy sites. Our licensed drivers ensure a comfortable, safe, and efficient journey for all Umrah pilgrims.",
    link: "/umrah-taxi-services",
    highlights: ["Makkah · Madinah · Jeddah", "Licensed Drivers", "Fixed Fare"],
  },
  {
    icon: <PlaneIcon size={26} />,
    title: "Airport Transfers",
    description:
      "Instant Jeddah Airport (KAIA) pickups with 24/7 meet-and-greet services and real-time flight tracking for zero wait time.",
    link: "/airport-transfer-for-umrah",
    highlights: ["KAIA · REHF", "Flight Tracking", "Meet & Greet"],
  },
  {
    icon: <CarIcon size={26} />,
    title: "Jeddah to Makkah",
    description:
      "The fastest way to reach Makkah from Jeddah. Enjoy fixed-rate, direct transfers with professional chauffeurs in premium vehicles.",
    link: "/jeddah-to-makkah-taxi-service",
    highlights: ["~1.5 hrs", "No Hidden Fees", "Premium Cars"],
  },
  {
    icon: <HotelIcon size={26} />,
    title: "Hotel Transfers",
    description:
      "Seamless hotel-to-hotel and hotel-to-Haram transfers. We handle your luggage so you can focus on your pilgrimage.",
    link: "/hotel-transfers",
    highlights: ["Door-to-Door", "Luggage Help", "24/7"],
  },
  {
    icon: <CompassIcon size={26} />,
    title: "Ziyarat Services",
    description:
      "Guided visits to important Islamic historical sites in and around Makkah and Madinah with knowledgeable, courteous drivers.",
    link: "/ziyarat-services-in-saudi-arabia",
    highlights: ["Historic Sites", "Guided Routes", "Group Options"],
  },
  {
    icon: <CarIcon size={26} />,
    title: "Private Taxi",
    description:
      "Exclusive private vehicle bookings for families and groups. Your car, your schedule — full comfort and privacy guaranteed.",
    link: "/private-taxi",
    highlights: ["Exclusive Vehicle", "Flexible Hours", "Family Friendly"],
  },
];

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
          SOCIAL PROOF — Repetition: consistent logo/badge strip
          ═══════════════════════════════════════════════════════════════════ */}
      <SocialProof />

      {/* ═══════════════════════════════════════════════════════════════════
          TRENDING DESTINATIONS — Popular Gulf cities, above the vehicle-type
          cards per the Popular Destinations brief §2
          ═══════════════════════════════════════════════════════════════════ */}
      <TrendingDestinations />

      {/* ═══════════════════════════════════════════════════════════════════
          BOOK BY VEHICLE TYPE — carousel of vehicles from /public/vehicles
          ═══════════════════════════════════════════════════════════════════ */}
      <VehicleTypeCarousel />

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
          FEATURES — from Features component (Repetition: consistent feature cards)
          ═══════════════════════════════════════════════════════════════════ */}
      <Features />

      {/* ═══════════════════════════════════════════════════════════════════
          WHY CHOOSE US / OUR PROMISE — the navy card is the dominant
          element; the photo is a small supporting accent beside it, not a
          second equal-sized panel. A flex row (not the 60/40 grid) so the
          card can grow to fill the space the compact image doesn't need,
          and so the image wraps onto its own line — still compact, never
          full-width — once the viewport can't fit both side by side.
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
                <span className="section-eyebrow" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'var(--line-dark)', color: 'var(--on-dark)' }}>Our Promise</span>
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

              {/* Checklist — Proximity: each item is a self-contained unit; consistent spacing */}
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {whyUs.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--space-3)',
                      fontSize: 'var(--text-base)',
                      color: 'var(--on-dark)',
                      lineHeight: 1.6,
                    }}
                  >
                    {/* Success-green checkmark, not gold — six of these appear in one
                        section, and gold is capped at 1-2 marks per section. A
                        checkmark is semantically a success indicator anyway, which
                        the token set has a dedicated colour for. */}
                    <CheckCircleIcon
                      size={20}
                      style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Supporting photo — a real, intentional visual component of
                the section (not a small floating thumbnail): 4:3, sized to
                ~34% of the container's usable width on desktop, scaling
                down proportionally on tablet and going full-width once the
                layout stacks on mobile. See page.module.css for the
                breakpoints. */}
            <div className={styles.ourPromiseImage}>
              <Image
                src="/images/private-chauffeur-luggage-assistance-saudi-arabia.webp"
                alt="Professional Gulf Trip Service chauffeur assisting a guest with luggage at a Saudi Arabia hotel entrance"
                title="Private Chauffeur & Luggage Assistance Service in Saudi Arabia"
                fill
                sizes="(max-width: 680px) 100vw, (max-width: 1100px) 300px, 400px"
                style={{ objectFit: 'cover' }}
              />
            </div>
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
                <span className="section-eyebrow" style={{ background: 'var(--ivory-200)', borderColor: 'var(--ivory-300)', color: 'var(--text-muted)' }}>Beyond the Holy Cities</span>
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
          VEHICLES — Vehicle showcase with images, descriptions & CTA
          ═══════════════════════════════════════════════════════════════════ */}
      <VehiclesSection />

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
          {/* Badge — on-light, matching every other ivory-section eyebrow */}
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
