import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircleIcon, PlaneIcon, CarIcon, LandmarkIcon, HotelIcon, CompassIcon, MessageIcon, PhoneIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "Get a Quote | Makkah Taxi Service",
    description: "Request a free quote for taxi services in Makkah, Jeddah & Madinah. Airport transfers, Umrah taxi, inter-city travel. Fixed rates, no hidden charges.",
};

const services = [
    {
        icon: <PlaneIcon size={28} />,
        title: "Airport Transfers",
        details: ["Jeddah Airport (KAIA) ↔ Makkah", "Madinah Airport ↔ Madinah City", "Meet & Greet service", "Flight tracking included"],
    },
    {
        icon: <LandmarkIcon size={28} />,
        title: "Umrah Transport",
        details: ["Makkah ↔ Madinah intercity", "Hotel to Haram shuttle", "Full Umrah packages", "Group & family options"],
    },
    {
        icon: <CarIcon size={28} />,
        title: "Private Taxi",
        details: ["Jeddah City ↔ Makkah", "Custom routes on request", "Hourly hire available", "Sedan, SUV & Van fleet"],
    },
    {
        icon: <HotelIcon size={28} />,
        title: "Hotel Transfers",
        details: ["Hotel to hotel transfers", "Luggage assistance", "Door-to-door service", "24/7 availability"],
    },
    {
        icon: <CompassIcon size={28} />,
        title: "Ziyarat Tours",
        details: ["Makkah historical sites", "Madinah sacred visits", "Guided knowledgeable drivers", "Half-day & full-day tours"],
    },
    {
        icon: <CarIcon size={28} />,
        title: "Border Crossings",
        details: ["Saudi Arabia border routes", "Cross-border transfers", "Document assistance", "Pre-arranged clearance"],
    },
];

const steps = [
    { number: "01", title: "Tell Us Your Route", desc: "Share your pickup location, destination, date, and group size via the form or WhatsApp." },
    { number: "02", title: "Receive Your Quote", desc: "We'll send you a fixed, all-inclusive price within minutes — no hidden fees, ever." },
    { number: "03", title: "Confirm & Relax", desc: "Approve the quote, and your professional driver will be ready at the agreed time." },
];

const vehicles = [
    { type: "Sedan", capacity: "1–3 passengers", features: ["Toyota Camry / Hyundai Sonata", "Air conditioning", "USB charging", "Luggage space"] },
    { type: "SUV", capacity: "1–5 passengers", features: ["Toyota Land Cruiser / Prado", "Spacious interior", "Premium comfort", "Extra luggage"] },
    { type: "Van / MPV", capacity: "1–9 passengers", features: ["Toyota HiAce / Higlux", "Family & group rides", "Fold-flat seats", "Max luggage capacity"] },
];

export default function Quote() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Get a Free Quote</h1>
                <p>
                    Tell us your route, dates, and group size — we'll send you a fixed,
                    all-inclusive price with no hidden charges.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Quote</span>
                </div>
            </section>

            {/* Assurance banner */}
            <section style={{ background: 'var(--accent)', padding: '1.75rem 0' }}>
                <div className="container text-center">
                    <p style={{ margin: 0, color: '#0d1f2d', fontWeight: 600, fontSize: '1rem' }}>
                        ✅ All quotes are <strong>fixed & final</strong> — no meters, no surge pricing, no surprises. Fuel, tolls & driver service included.
                    </p>
                </div>
            </section>

            {/* Services we quote for */}
            <section className="section-lg">
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">What We Cover</span>
                        <h2 className="section-title">Services Available for Quote</h2>
                        <p className="section-subtitle">
                            We provide quotes for all routes across Saudi Arabia. Select the service
                            that fits your journey and request your personalised price.
                        </p>
                    </div>

                    <div className="grid-3">
                        {services.map((service, i) => (
                            <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="card-icon">{service.icon}</div>
                                <h3>{service.title}</h3>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-2)', flex: 1 }}>
                                    {service.details.map((d, j) => (
                                        <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                                            <CheckCircleIcon size={15} style={{ color: 'var(--accent-dark)', flexShrink: 0 }} />
                                            {d}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="section-lg" style={{ background: 'var(--bg-subtle)' }}>
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">Simple Process</span>
                        <h2 className="section-title">How to Get Your Quote</h2>
                        <p className="section-subtitle">
                            Getting a quote takes less than 2 minutes. Choose the channel that works best for you.
                        </p>
                    </div>

                    <div className="grid-3" style={{ marginBottom: 'var(--space-16)' }}>
                        {steps.map((step, i) => (
                            <div key={i} style={{
                                background: 'var(--white)',
                                borderRadius: 'var(--radius-xl)',
                                padding: 'var(--space-10) var(--space-8)',
                                boxShadow: 'var(--shadow-md)',
                                textAlign: 'center',
                                position: 'relative',
                            }}>
                                <div style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'var(--text-5xl)',
                                    fontWeight: 800,
                                    color: 'var(--accent)',
                                    opacity: 0.25,
                                    lineHeight: 1,
                                    marginBottom: 'var(--space-4)',
                                }}>
                                    {step.number}
                                </div>
                                <h3 style={{ color: 'var(--primary)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>{step.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA cards */}
                    <div className="grid-2" style={{ maxWidth: 760, margin: '0 auto' }}>
                        <a
                            href="https://wa.me/966501234567?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20a%20taxi%20service"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                borderRadius: 'var(--radius-xl)',
                                padding: 'var(--space-10) var(--space-8)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 'var(--space-4)',
                                textAlign: 'center',
                                textDecoration: 'none',
                                color: 'white',
                                boxShadow: 'var(--shadow-lg)',
                                transition: 'transform var(--ease-base), box-shadow var(--ease-base)',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <MessageIcon size={28} />
                            </div>
                            <div>
                                <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 4 }}>WhatsApp Quote</div>
                                <div style={{ fontSize: 'var(--text-sm)', opacity: 0.9 }}>Message us instantly — fastest response</div>
                            </div>
                        </a>

                        <Link
                            href="/contact-us"
                            style={{
                                background: 'linear-gradient(135deg, #0d2137, #1a3a52)',
                                borderRadius: 'var(--radius-xl)',
                                padding: 'var(--space-10) var(--space-8)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 'var(--space-4)',
                                textAlign: 'center',
                                textDecoration: 'none',
                                color: 'white',
                                boxShadow: 'var(--shadow-lg)',
                                transition: 'transform var(--ease-base)',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <PhoneIcon size={28} />
                            </div>
                            <div>
                                <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 4 }}>Contact Form</div>
                                <div style={{ fontSize: 'var(--text-sm)', opacity: 0.85 }}>Fill the form — we respond within the hour</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Vehicle types */}
            <section className="section-lg">
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">Our Fleet</span>
                        <h2 className="section-title">Choose Your Vehicle</h2>
                        <p className="section-subtitle">
                            Mention your preferred vehicle type when requesting a quote. All vehicles are Ministry-licensed and fully insured.
                        </p>
                    </div>

                    <div className="grid-3">
                        {vehicles.map((v, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center' }}>
                                <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--space-2)' }}>{v.type}</h3>
                                <div style={{
                                    display: 'inline-block',
                                    background: 'var(--accent-subtle)',
                                    color: 'var(--accent-dark)',
                                    fontWeight: 700,
                                    fontSize: 'var(--text-sm)',
                                    padding: '4px 14px',
                                    borderRadius: 'var(--radius-full)',
                                    marginBottom: 'var(--space-6)',
                                }}>
                                    {v.capacity}
                                </div>
                                <ul style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                                    {v.features.map((f, j) => (
                                        <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>
                                            <CheckCircleIcon size={15} style={{ color: 'var(--accent-dark)', flexShrink: 0 }} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section style={{
                background: 'linear-gradient(140deg, #0d2137 0%, #1a3a52 60%, #1e5f6e 100%)',
                padding: 'var(--space-20) 0',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                    pointerEvents: 'none',
                }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ color: 'var(--white)', fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
                        Ready for Your Journey?
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'var(--text-lg)', maxWidth: 560, margin: '0 auto var(--space-10)', lineHeight: 1.8 }}>
                        Contact us now via WhatsApp or our contact form and get your personalised, fixed-price quote within minutes.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://wa.me/966501234567" className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
                            💬 WhatsApp Us
                        </a>
                        <Link href="/contact-us" className="btn btn-outline btn-lg">
                            Contact Form
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
