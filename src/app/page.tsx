import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Features from "@/components/Features";
import FAQSection from "@/components/FAQSection";
import Link from "next/link";
import { LandmarkIcon, PlaneIcon, CarIcon, HotelIcon, CompassIcon, CheckCircleIcon, ArrowRightIcon } from "@/components/Icons";
import type { Metadata } from "next";
import AnimatedCounter from "@/components/AnimatedCounter";
import QuickBookingForm from "@/components/QuickBookingForm";

export const metadata: Metadata = {
  title: "Makkah Taxi Service | Reliable Taxi Service in Makkah & Jeddah",
  description:
    "Book reliable taxi services in Makkah, Jeddah & Madinah. Airport transfers, Umrah taxi, Jeddah to Makkah transport. Professional drivers, 24/7 availability.",
};

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
  { number: "15,000+", label: "Happy Pilgrims" },
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

export default function Home() {
  return (
    <main>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Balance: 2-col asymmetric layout
          ═══════════════════════════════════════════════════════════════════ */}
      <Hero />

      {/* ═══════════════════════════════════════════════════════════════════
          SOCIAL PROOF — Repetition: consistent logo/badge strip
          ═══════════════════════════════════════════════════════════════════ */}
      <SocialProof />

      {/* ═══════════════════════════════════════════════════════════════════
          QUICK BOOKING FORM — Replaced Services Grid
          ═══════════════════════════════════════════════════════════════════ */}
      <QuickBookingForm />

      {/* ═══════════════════════════════════════════════════════════════════
          STATS BANNER
          Balance: 4 equal-weight stat blocks — symmetric layout
          Contrast: Gold number vs muted label vs dark background
          Repetition: Same stat block format (number → label) for every stat
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--primary-dark), var(--primary-mid))',
          padding: 'var(--space-16) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative dot overlay — Alignment: positioned absolutely, doesn't affect content flow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.05,
            pointerEvents: 'none',
          }}
        />
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            {stats.map((stat, i) => (
              <div key={i}>
                {/* Number — Contrast: gold for visibility, dynamic animation */}
                <div className="stat-number" style={{ color: 'var(--secondary)' }}>
                  <AnimatedCounter end={stat.number} />
                </div>
                {/* Label — Contrast: light, smaller, uppercase */}
                <div className="stat-label">{stat.label}</div>
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
          WHY CHOOSE US — Balance: 60/40 asymmetric split
          Left (60%): explanatory text + checklist
          Right (40%): strong pull-quote + CTA
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-lg bg-subtle">
        <div className="container">
          <div className="grid-60-40">

            {/* Left column — Alignment: left-aligned text block */}
            <div>
              <div className="section-header">
                <span className="section-eyebrow">Our Promise</span>
                <h2 className="section-title">
                  Why Thousands Choose Saudi Taxi
                </h2>
              </div>
              <p style={{ color: 'var(--text-body)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-8)', lineHeight: 1.8 }}>
                We've been serving Umrah pilgrims and travellers in Saudi Arabia for
                over a decade. Every aspect of our service is designed around your
                comfort and peace of mind.
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
                      color: 'var(--text-body)',
                      lineHeight: 1.6,
                    }}
                  >
                    {/* Icon — Contrast: green checkmark pops against grey text */}
                    <CheckCircleIcon
                      size={20}
                      style={{ color: 'var(--primary)', marginTop: '2px', flexShrink: 0 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column — Balance: pull-quote card to counterweight the list */}
            <div
              style={{
                background: 'linear-gradient(145deg, var(--primary-dark), var(--primary))',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-12)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 'var(--space-8)',
                color: 'var(--white)',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              {/* Pull quote — Contrast: large italic quote vs smaller attribution */}
              <blockquote>
                <div
                  style={{
                    fontSize: 'var(--text-6xl)',
                    lineHeight: 1,
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-heading)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  "
                </div>
                <p
                  style={{
                    fontSize: 'var(--text-xl)',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.9)',
                    fontStyle: 'italic',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  The most reliable taxi we've used during Umrah. Driver was on time,
                  courteous, and the car was spotless. Highly recommended.
                </p>
                {/* Proximity: attribution immediately below its quote */}
                <footer
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--accent)',
                    fontWeight: 600,
                    fontStyle: 'normal',
                  }}
                >
                  — Brother Ahmed, Pakistan
                </footer>
              </blockquote>

              {/* Divider — Visual breathing room */}
              <div className="divider-gold" />

              {/* CTA — Contrast: gold on dark, highest visible action inside card */}
              <Link href="/quote" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>



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
          background: 'linear-gradient(140deg, var(--primary-dark) 0%, var(--primary-mid) 60%, var(--primary-light) 100%)',
          padding: 'var(--space-20) 0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decoration — Alignment: positioned absolutely, not in content flow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            opacity: 0.05,
            pointerEvents: 'none',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Badge — Repetition: same pill badge */}
          <div
            className="badge badge-dark"
            style={{ display: 'inline-flex', marginBottom: 'var(--space-6)' }}
          >
            24/7 Available — Call or WhatsApp Anytime
          </div>

          {/* Heading — Contrast: white, 4xl, bold vs dark green bg */}
          <h2
            style={{
              color: 'var(--white)',
              fontSize: 'var(--text-4xl)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Ready to Book Your Ride?
          </h2>

          {/* Body — Contrast: slightly muted vs heading */}
          <p
            style={{
              color: 'rgba(255,255,255,0.78)',
              fontSize: 'var(--text-lg)',
              maxWidth: 580,
              margin: '0 auto var(--space-10)',
              lineHeight: 1.8,
            }}
          >
            Book your comfortable, reliable taxi service today. Available 24/7
            across Makkah, Jeddah, and Madinah with fixed, transparent pricing.
          </p>

          {/* CTA group — Balance: two equal-weight buttons */}
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/book-online" className="btn btn-primary btn-lg">
              Book Now
            </Link>
            <Link href="/contact-us" className="btn btn-outline btn-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
