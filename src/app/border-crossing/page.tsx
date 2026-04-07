import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircleIcon, MapPinIcon, CarIcon, ShieldIcon, ClockIcon, MessageIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "Border Crossing Taxi Service | Saudi Arabia | Makkah Taxi Service",
    description: "Reliable taxi and transport service for Saudi Arabia border crossings. Routes via Bahrain Causeway, Jordan border (Durra), UAE and more. Licensed drivers, fixed rates.",
};

const borders = [
    {
        name: "King Fahd Causeway (Bahrain)",
        route: "Saudi Arabia ↔ Bahrain",
        distance: "~25 km causeway",
        note: "Most popular crossing. Requires valid GCC visa or Bahraini visa on arrival (for some nationals).",
        highlights: ["Bahrain eVisa available for most", "Fast crossing ~1–2 hrs", "Open 24 hours", "Duty-free zone at crossing"],
    },
    {
        name: "Durra / Abu Huraimila (Jordan)",
        route: "Saudi Arabia ↔ Jordan (Aqaba region)",
        distance: "~340 km from Tabuk",
        note: "Key crossing for Hajj overland pilgrim routes from Jordan. Advance planning required.",
        highlights: ["Popular Hajj overland route", "Jordan visa required", "Crossing hours vary", "Border formalities may take time"],
    },
    {
        name: "Al Batha / Ghuwaifat (UAE)",
        route: "Saudi Arabia ↔ UAE (Abu Dhabi)",
        distance: "~330 km from Riyadh direction",
        note: "Main land route between Saudi and UAE. GCC residents and visa holders may cross freely.",
        highlights: ["GCC nationals free crossing", "UV entry permit for others", "Well-maintained road", "Open 24 hours"],
    },
    {
        name: "Haradh / Wajir (Kuwait)",
        route: "Saudi Arabia ↔ Kuwait",
        distance: "~530 km from Riyadh",
        note: "Connects eastern Saudi Arabia to Kuwait. Commonly used by GCC nationals and workers.",
        highlights: ["GCC national crossing", "Work visa holders welcome", "Fuel & services available", "Single-lane highway route"],
    },
    {
        name: "Al Wadiah (Yemen)",
        route: "Saudi Arabia ↔ Yemen (Hadhramaut)",
        distance: "~1,000 km from Riyadh",
        note: "Currently restricted — not recommended for regular travel due to ongoing security situation.",
        highlights: ["Pre-check travel advisories", "Special permits required", "Humanitarian travel only", "Contact us for feasibility"],
    },
    {
        name: "Aqabat Al Hamra (Oman)",
        route: "Saudi Arabia ↔ Oman (Muscat region)",
        distance: "~1,100 km from Riyadh",
        note: "Southern crossing into Oman. GCC residents with Omani visa or GCC passport can cross.",
        highlights: ["Omani visa required (non-GCC)", "Scenic desert route", "Fuel stations en route", "Coordinate with Omani authorities"],
    },
];

const inclusions = [
    "Ministry-licensed, fully insured vehicles",
    "Experienced drivers familiar with border procedures",
    "Assistance with vehicle documentation at crossings",
    "Sedan, SUV and Van options for all group sizes",
    "Fixed rates — no hidden fees at borders",
    "Real-time WhatsApp updates throughout journey",
    "Comfortable vehicles for long-distance travel",
    "Pick-up from hotel, home or airport",
];

export default function BorderCrossing() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Border Crossing Service</h1>
                <p>
                    Safe, reliable transfer service across Saudi Arabia&apos;s land borders.
                    Licensed drivers, fixed rates, and full journey coordination.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Border Crossing</span>
                </div>
            </section>

            {/* Trust banner */}
            <section style={{ background: 'linear-gradient(135deg, var(--accent-dark), var(--accent))', padding: '1.75rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', justifyContent: 'center', alignItems: 'center' }}>
                        {["Licensed & Insured Fleet", "Document Assistance", "Fixed Rates — No Surprises", "24/7 Support"].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: '#0d1f2d', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                                <ShieldIcon size={16} />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Intro */}
            <section className="section-lg">
                <div className="container">
                    <div className="grid-60-40">
                        <div>
                            <div className="section-header">
                                <span className="section-eyebrow">Cross-Border Transport</span>
                                <h2 className="section-title">Saudi Arabia Land Border Transfers</h2>
                            </div>
                            <p style={{ color: 'var(--text-body)', fontSize: 'var(--text-lg)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
                                Travelling overland across Saudi Arabia&apos;s borders — whether for Hajj, family visits,
                                work, or tourism — requires careful planning and a trusted transport partner.
                            </p>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: 'var(--space-8)' }}>
                                Our drivers are experienced with all major Saudi border crossings:
                                the Bahrain Causeway, the Jordanian border, UAE, Kuwait and Oman.
                                We coordinate pickup times, understand border procedures, and ensure your
                                journey is as smooth as possible from door to door.
                            </p>
                            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                                <a href="https://wa.me/966501234567?text=Hi%2C%20I%20need%20a%20border%20crossing%20transfer" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                    💬 Request a Quote
                                </a>
                                <Link href="/contact-us" className="btn btn-secondary">
                                    Contact Us
                                </Link>
                            </div>
                        </div>

                        <div style={{
                            background: 'linear-gradient(145deg, #0d2137, #1a3a52)',
                            borderRadius: 'var(--radius-xl)',
                            padding: 'var(--space-10)',
                            color: 'var(--white)',
                            boxShadow: 'var(--shadow-xl)',
                        }}>
                            <h3 style={{ color: 'var(--accent)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-xl)' }}>
                                <ShieldIcon size={22} style={{ display: 'inline', marginRight: 8 }} />
                                What&apos;s Included
                            </h3>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                                {inclusions.map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.88)', lineHeight: 1.6 }}>
                                        <CheckCircleIcon size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Border routes */}
            <section className="section-lg" style={{ background: 'var(--bg-subtle)' }}>
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">Available Routes</span>
                        <h2 className="section-title">Saudi Border Crossings We Cover</h2>
                        <p className="section-subtitle">
                            We cover all major Saudi land borders. Each crossing has different visa and
                            document requirements — our team will guide you through the specifics.
                        </p>
                    </div>

                    <div className="grid-2">
                        {borders.map((border, i) => (
                            <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                                {/* Header */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
                                    <div className="card-icon" style={{ flexShrink: 0 }}>
                                        <MapPinIcon size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--primary)', marginBottom: 'var(--space-1)' }}>{border.name}</h3>
                                        <span style={{
                                            display: 'inline-block',
                                            background: 'var(--accent-subtle)',
                                            color: 'var(--accent-dark)',
                                            fontWeight: 700,
                                            fontSize: 'var(--text-xs)',
                                            padding: '3px 12px',
                                            borderRadius: 'var(--radius-full)',
                                            letterSpacing: '0.5px',
                                        }}>
                                            {border.route}
                                        </span>
                                    </div>
                                </div>

                                {/* Distance badge */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                                    <CarIcon size={14} />
                                    {border.distance}
                                </div>

                                {/* Note */}
                                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.7, margin: 0 }}>
                                    {border.note}
                                </p>

                                {/* Highlights */}
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                    {border.highlights.map((h, j) => (
                                        <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-body)' }}>
                                            <CheckCircleIcon size={13} style={{ color: 'var(--accent-dark)', flexShrink: 0 }} />
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Important notice */}
            <section className="section-lg">
                <div className="container">
                    <div style={{
                        background: 'linear-gradient(145deg, #fff7ed, #fffbf5)',
                        border: '1px solid #fbbf24',
                        borderLeft: '5px solid #f59e0b',
                        borderRadius: 'var(--radius-xl)',
                        padding: 'var(--space-10)',
                    }}>
                        <h3 style={{ color: '#92400e', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                            <ClockIcon size={22} /> Important Before You Travel
                        </h3>
                        <div className="grid-2" style={{ gap: 'var(--space-8)' }}>
                            <div>
                                <h4 style={{ color: '#78350f', marginBottom: 'var(--space-3)', fontSize: 'var(--text-base)' }}>Documents Required</h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                    {["Valid passport (6+ months validity)", "Saudi residence permit (Iqama) if applicable", "Destination country visa (check in advance)", "Vehicle registration (if using own car)", "Health insurance documentation"].map((d, i) => (
                                        <li key={i} style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: '#92400e', alignItems: 'flex-start' }}>
                                            <span style={{ color: '#f59e0b', flexShrink: 0 }}>•</span> {d}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ color: '#78350f', marginBottom: 'var(--space-3)', fontSize: 'var(--text-base)' }}>Our Advice</h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                    {["Check latest travel advisories before booking", "Allow extra time for border formalities", "Notify us of any special requirements", "Book at least 48 hours ahead for border trips", "WhatsApp us for latest crossing conditions"].map((d, i) => (
                                        <li key={i} style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: '#92400e', alignItems: 'flex-start' }}>
                                            <span style={{ color: '#f59e0b', flexShrink: 0 }}>•</span> {d}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
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
                        Planning a Border Crossing?
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'var(--text-lg)', maxWidth: 560, margin: '0 auto var(--space-10)', lineHeight: 1.8 }}>
                        Get in touch now so we can arrange your transport, advise on documents,
                        and ensure a hassle-free journey across the border.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://wa.me/966501234567" className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
                            <MessageIcon size={18} /> WhatsApp Us
                        </a>
                        <Link href="/quote" className="btn btn-outline btn-lg">
                            Get a Quote
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
