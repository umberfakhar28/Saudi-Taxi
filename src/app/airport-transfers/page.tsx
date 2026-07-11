import Link from "next/link";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/seo";
import { PlaneIcon, ChevronRightIcon } from "@/components/Icons";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import BookingWidget from "@/components/BookingWidget";
import RoutesGrid from "@/components/RoutesGrid";
import IncludedStrip from "@/components/IncludedStrip";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import PolicyStrip from "@/components/PolicyStrip";
import ReviewsStrip, { type ReviewItem } from "@/components/ReviewsStrip";
import StickyMobileBar from "@/components/StickyMobileBar";
import RelatedLinks from "@/components/RelatedLinks";
import { AIRPORTS, AIRPORT_ROUTES } from "@/lib/airportRoutesData";
import { AIRPORT_FAQS } from "@/lib/airportFaqs";

export const metadata = generatePageMetadata({
    title: "Airport Transfers — JED, MED, DMM, RUH",
    description: "Book airport transfers from Jeddah, Madinah, Dammam and Riyadh airports to Makkah, Madinah, Riyadh, Dammam and Bahrain. Fixed rates via WhatsApp, 24/7.",
    path: "/airport-transfers",
    keywords: ["airport transfer Saudi Arabia", "Jeddah airport taxi", "Madinah airport taxi", "Dammam airport taxi", "Riyadh airport taxi", "KAIA transfer"],
});

// Reviews genuinely tagged/about airport transfers in the existing testimonials
// data (src/components/TestimonialsSection.tsx) — not fabricated. Only one entry
// in that source is explicitly tagged "Airport Transfer"; shown as-is rather
// than padded out with unrelated reviews.
const airportReviews: ReviewItem[] = [
    {
        name: "Omar Sheikh",
        location: "Karachi, Pakistan",
        rating: 5,
        service: "Airport Transfer",
        text: "Arrived at Jeddah airport at 2 AM and the driver was already waiting with a smile. Helped with all our bags, drove smoothly, and the AC was perfect. Made our first Umrah stress-free from the moment we landed.",
    },
];

const schemas = [
    serviceSchema({
        name: "Airport Transfers in Saudi Arabia",
        description: "Professional airport transfer services from Jeddah, Madinah, Dammam and Riyadh airports across Saudi Arabia and to GCC cross-border destinations.",
        url: "/airport-transfers",
        areaServed: ["Jeddah", "Madinah", "Dammam", "Riyadh", "Saudi Arabia"],
    }),
    faqSchema(AIRPORT_FAQS.map((f) => ({ question: f.q, answer: f.a }))),
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Airport Transfers", path: "/airport-transfers" }]),
];

export default function AirportTransfers() {
    return (
        <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Airport Transfers Across Saudi Arabia</h1>
                <p>
                    Reliable taxi transfers from Jeddah, Madinah, Dammam, and Riyadh airports — meet-and-greet
                    pickup, real-time flight tracking, and 24/7 availability across the Kingdom and beyond.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <span>Airport Transfers</span>
                </div>
            </section>

            <section style={{ padding: 'var(--space-8) 0 0' }}>
                <div className="container">
                    <div style={{
                        position: 'relative', width: '100%', height: '360px',
                        borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)',
                    }}>
                        <Image
                            src="/images/airport-terminal.jpg"
                            alt="Airport arrivals terminal — meet-and-greet pickup point for Gulf Trip Service airport transfers in Jeddah, Madinah, Dammam and Riyadh"
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, 1200px"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Intro */}
            <section className="section-lg" style={{ paddingBottom: 0 }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                    <h2 className="section-title">Hassle-Free Arrival, Anywhere in Saudi Arabia</h2>
                    <p className="section-subtitle">
                        Avoid the stress of airport crowds and unreliable transport. Our pre-arranged airport
                        transfer service covers Jeddah (JED), Madinah (MED), Dammam (DMM), and Riyadh (RUH) —
                        with a driver waiting for you the moment you land.
                    </p>
                </div>
            </section>

            {/* Booking Widget */}
            <section className="section-lg">
                <div className="container">
                    <BookingWidget />
                </div>
            </section>

            {/* What's included */}
            <IncludedStrip />

            {/* Policy strip */}
            <PolicyStrip />

            {/* Per-airport sections */}
            {AIRPORTS.map((airport) => {
                const routes = AIRPORT_ROUTES.filter((r) => r.airportCode === airport.code);
                return (
                    <section key={airport.code} className="section-lg" id={`airport-${airport.code.toLowerCase()}`}>
                        <div className="container">
                            <div style={{ marginBottom: 'var(--space-8)' }}>
                                <span className="section-eyebrow">{airport.code}</span>
                                <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <PlaneIcon size={26} style={{ color: 'var(--accent)' }} />
                                    {airport.name} — {airport.fullName}
                                </h2>
                                <p style={{ color: 'var(--text-body)', fontSize: 'var(--text-base)', maxWidth: 760, lineHeight: 1.8 }}>
                                    {airport.intro}
                                </p>
                            </div>
                            <RoutesGrid routes={routes} />
                            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-6)' }}>
                                {airport.relatedLinks.map((l) => (
                                    <Link key={l.href} href={l.href} className="btn btn-outline-gold btn-sm">
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* How it works */}
            <HowItWorksSteps />

            {/* Reviews */}
            <ReviewsStrip items={airportReviews} title="What Airport Transfer Riders Say" />

            {/* FAQ */}
            <section className="section" style={{ background: "var(--bg-subtle)" }}>
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">FAQ</span>
                        <h2 className="section-title">Airport Transfer — Frequently Asked Questions</h2>
                    </div>
                    <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                        {AIRPORT_FAQS.map((f, i) => (
                            <div key={i} className="card" style={{ padding: "var(--space-6) var(--space-8)" }}>
                                <h3 style={{ color: "var(--accent)", fontSize: "var(--text-base)", marginBottom: "var(--space-3)" }}>{f.q}</h3>
                                <p style={{ color: "var(--text-body)", marginBottom: 0 }}>{f.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related links */}
            <RelatedLinks
                title="Explore More Transfer Options"
                links={[
                    { href: "/umrah-transport-package", label: "Umrah Transport Package" },
                    { href: "/border-crossing", label: "GCC Border Crossing Routes" },
                    { href: "/jeddah-to-makkah-taxi-service", label: "Jeddah to Makkah Taxi" },
                    { href: "/services/riyadh", label: "Riyadh Taxi Service" },
                    { href: "/our-services", label: "All Services" },
                ]}
            />

            {/* CTA Section */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)',
                padding: '6rem 0',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, insetInlineStart: 0, width: '100%', height: '100%',
                    backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.05
                }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem', fontSize: '2.5rem' }}>Ready to Land?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Book your airport transfer now and have a professional driver waiting for you.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="#booking-widget" className="btn btn-primary btn-lg" style={{ minWidth: '200px' }}>
                            Check Rates
                        </a>
                        <Link href="/book-online" className="btn btn-outline btn-lg" style={{ minWidth: '200px', color: 'var(--white)', borderColor: 'rgba(255,255,255,0.5)' }}>
                            Book Now
                        </Link>
                    </div>
                </div>
            </section>

            <StickyMobileBar />
        </main>
        </>
    );
}
