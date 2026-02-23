import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services | Saudi Taxi - Taxi & Transport Services in Saudi Arabia",
    description: "Explore all taxi and transport services offered by Saudi Taxi — airport transfers, hotel transfers, Umrah packages, Ziyarat tours, private taxis and more across Saudi Arabia.",
};

const services = [
    {
        icon: "✈️",
        title: "Airport Transfers",
        description: "Professional meet & greet airport pickup and drop-off at Jeddah's King Abdulaziz International Airport (KAIA). Flight tracking, fixed prices, 24/7 availability.",
        link: "/airport-transfers",
        features: ["Meet & Greet Service", "Flight Tracking", "Fixed Prices", "24/7 Available"],
    },
    {
        icon: "🏨",
        title: "Hotel Transfers",
        description: "Door-to-door transfers between hotels, holy sites and key destinations in Makkah, Madinah and Jeddah. Reliable, punctual and comfortable.",
        link: "/hotel-transfers",
        features: ["Door-to-Door", "All Major Hotels", "Group & Solo", "Multilingual Drivers"],
    },
    {
        icon: "🕌",
        title: "Umrah Transport Package",
        description: "Comprehensive transportation packages for Umrah pilgrims covering airport pickup, hotel transfers, Ziyarat tours and inter-city travel.",
        link: "/umrah-transport-package",
        features: ["Full Package Deal", "All-Inclusive", "Flexible Dates", "Dedicated Driver"],
    },
    {
        icon: "🌙",
        title: "Ziyarat Services",
        description: "Guided visits to the holy and historical sites of Makkah and Madinah. Explore sacred places with knowledgeable, respectful drivers.",
        link: "/ziyarat-services-in-saudi-arabia",
        features: ["Makkah Ziyarat", "Madinah Ziyarat", "Custom Itinerary", "Experienced Guides"],
    },
    {
        icon: "🚗",
        title: "Private Taxi",
        description: "On-demand private taxi services across Saudi Arabia. Whether inter-city travel or local rides, enjoy comfort and privacy with your own dedicated vehicle.",
        link: "/private-taxi",
        features: ["Private Vehicle", "Flexible Routes", "By Hour or Trip", "Luxury Options"],
    },
    {
        icon: "🌆",
        title: "Jeddah City Tour",
        description: "Discover the vibrant coastal city of Jeddah with our guided city tour — Balad, Jeddah Corniche, Floating Mosque, Al-Shallal and more.",
        link: "/jeddah-city-tour-services-in-saudi-arabia",
        features: ["Historic Old Town", "Jeddah Corniche", "Shopping Areas", "Custom Duration"],
    },
    {
        icon: "🏔️",
        title: "AlUla Tour",
        description: "Explore the ancient wonders of AlUla — Hegra, Elephant Rock, Jabal Ikmah, and the breathtaking desert landscape of northwestern Saudi Arabia.",
        link: "/reliable-alula-tour-taxi-service-in-saudi-arabia",
        features: ["Hegra (Madain Saleh)", "Elephant Rock", "Desert Safari", "Expert Guides"],
    },
    {
        icon: "🌹",
        title: "Taif Ziyarat & Tour",
        description: "Journey to the City of Roses — Taif. Visit rose farms, Al-Shafa gardens, Taif Zoo, Souq and beautiful mountain scenery above Makkah.",
        link: "/taif-ziyarat-taxi-service",
        features: ["Rose Farms", "Al-Shafa Gardens", "Mountain Scenery", "Taif Souq"],
    },
];

const whyChooseUs = [
    { icon: "🛡️", title: "Safe & Licensed", description: "All vehicles are roadworthy, insured and maintained. Drivers are licensed and background-checked." },
    { icon: "💎", title: "Premium Fleet", description: "Modern sedans, SUVs and minivans to suit any group size and travel preference." },
    { icon: "💰", title: "Fixed Transparent Pricing", description: "No hidden fees, no surge pricing. Your quoted price is your final price." },
    { icon: "🌐", title: "Multilingual Support", description: "Arabic, English, Urdu and Hindi — we speak your language." },
];

export default function OurServices() {
    return (
        <main>
            <section className="page-hero">
                <h1>Our Services</h1>
                <p>Comprehensive taxi and transport solutions for pilgrims, tourists and business travelers across Saudi Arabia.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Our Services</span>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Everything You Need to Travel Saudi Arabia</h2>
                    <p className="section-subtitle">From airport arrival to holy site visits — we cover every mile of your journey.</p>
                    <div className="grid-2">
                        {services.map((svc, i) => (
                            <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                    <div style={{
                                        fontSize: '2.5rem',
                                        background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(245,199,93,0.15))',
                                        borderRadius: 'var(--radius-md)',
                                        padding: '1rem',
                                        minWidth: '70px',
                                        textAlign: 'center',
                                    }}>
                                        {svc.icon}
                                    </div>
                                    <div>
                                        <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>{svc.title}</h3>
                                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', margin: 0, fontSize: '0.95rem' }}>{svc.description}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                    {svc.features.map((feat, j) => (
                                        <span key={j} style={{
                                            padding: '0.3rem 0.8rem',
                                            background: 'rgba(0, 77, 0, 0.08)',
                                            color: 'var(--primary)',
                                            borderRadius: 'var(--radius-xl)',
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                        }}>
                                            ✓ {feat}
                                        </span>
                                    ))}
                                </div>
                                <Link href={svc.link} className="btn btn-outline-gold btn-sm" style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>
                                    Learn More →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Why Travel With Saudi Taxi?</h2>
                    <div className="grid-4">
                        {whyChooseUs.map((item, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Ready to Book Your Service?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
                        Choose from any of our services and book online in minutes, or reach us via WhatsApp for instant assistance.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book Now</Link>
                        <Link href="/contact-us" className="btn btn-outline btn-lg">Contact Us</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
