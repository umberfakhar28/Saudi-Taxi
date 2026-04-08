import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AlUla Tour Taxi Service | Reliable AlUla Tours | Saudi Taxi",
    description: "Reliable taxi and tour service to AlUla — Saudi Arabia's ancient wonder. Explore Hegra, Elephant Rock, Jabal Ikmah and the Nabataean tombs. Book your AlUla tour now.",
};

const attractions = [
    { icon: "🏛️", name: "Hegra (Al-Hijr / Madain Saleh)", description: "Saudi Arabia's first UNESCO World Heritage Site — magnificent Nabataean tombs carved into rose-colored sandstone cliffs, dating back 2,000 years." },
    { icon: "🐘", name: "Elephant Rock (Jabal AlFil)", description: "A breathtaking natural rock formation resembling an elephant — one of AlUla's most iconic and photographed landmarks." },
    { icon: "📜", name: "Jabal Ikmah", description: "An open-air library with over 450 ancient inscriptions carved into cliffs in Dadanite, Minaic, Aramaic, Thamudic, and Nabataean scripts." },
    { icon: "🏙️", name: "Old Town Al-Ula", description: "A fascinating abandoned 13th-century mud-brick town with a labyrinth of 900 houses and a historic mosque." },
    { icon: "🌄", name: "Dadan (Dedan)", description: "The ancient capital of the Lihyanite and Dadanite kingdoms, featuring striking carved lions and royal tombs." },
    { icon: "🌿", name: "Oasis of AlUla", description: "A lush palm oasis carving its way through the dramatic sandstone landscape — a green paradise in the desert." },
    { icon: "⛏️", name: "AlUla Museum", description: "Discover 200,000 years of human history through interactive exhibits, artifacts and the story of Arabia's ancient civilizations." },
    { icon: "🎭", name: "Winter at Tantora Festival", description: "The magical annual arts and culture festival held in AlUla (November–March) with world-class performances under the stars." },
];

const packages = [
    {
        title: "Day Trip from Jeddah",
        duration: "1 Day",
        note: "By air. Flight not included.",
        includes: ["Private Transfer (AlUla)", "Hegra Entry", "Elephant Rock", "Old Town Tour", "Return Transfer"],
        icon: "✈️",
    },
    {
        title: "2-Day AlUla Explorer",
        duration: "2 Days",
        note: "Private vehicle + driver for 2 days",
        includes: ["Airport/Hotel Pickup", "Hegra & Dadan", "Elephant Rock", "Jabal Ikmah", "Old Town", "Oasis Visit", "AlUla Museum"],
        icon: "🏜️",
        popular: true,
    },
    {
        title: "3-Day Complete AlUla",
        duration: "3 Days",
        note: "Private vehicle + dedicated driver",
        includes: ["All 2-Day Sites", "Sunrise Desert Drive", "Nabataean Trail Hike", "Vintage Train Ride", "Sunset Photo Session", "Festival (seasonal)"],
        icon: "⭐",
    },
];

const faqs = [
    { q: "How far is AlUla from Jeddah / Makkah?", a: "AlUla is approximately 1,000 km from Jeddah (about 10 hours by road) or 1 hour by flight. We recommend flying for day trips. We handle all ground transportation in AlUla." },
    { q: "Do I need a permit to visit Hegra?", a: "Yes. Entry to Hegra requires a ticket booked through the official Saudi Heritage platform. We can assist you with booking tickets as part of your package." },
    { q: "What is the best time to visit AlUla?", a: "October to March is the ideal season — cool weather (5-25°C), clear skies and the Winter at Tantora festival. Avoid June through August due to extreme heat." },
    { q: "Is AlUla safe to visit?", a: "Absolutely. AlUla is a premier Saudi tourism destination with excellent infrastructure, security and hospitality. It is one of the safest destinations in the world." },
];

export default function AlulaTourTaxi() {
    return (
        <main>
            <section className="page-hero">
                <h1>Reliable AlUla Tour Taxi Service in Saudi Arabia</h1>
                <p>Explore the ancient wonders of AlUla — Hegra, Elephant Rock, and 200,000 years of history — with our reliable private taxi and tour service.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>AlUla Tour</span>
                </div>
            </section>

            {/* Intro */}
            <section className="section-lg">
                <div className="container" style={{ maxWidth: '850px', textAlign: 'center' }}>
                    <h2>AlUla — Arabia&apos;s Ancient Wonder</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                        Hidden in the northwest of Saudi Arabia, AlUla is one of the most extraordinary destinations on Earth. This ancient oasis city is home to the Kingdom&apos;s first UNESCO World Heritage Site, Hegra — a city of over 100 magnificent Nabataean tombs carved into rose sandstone mountains. Alongside Hegra, AlUla offers the iconic Elephant Rock, ancient inscriptions, a 13th-century old town, and jaw-dropping desert landscapes. Our private taxi and tour service will take you from your hotel or airport directly to this remarkable destination with comfort, safety and expert local knowledge.
                    </p>
                </div>
            </section>

            {/* Packages */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">AlUla Tour Packages</h2>
                    <p className="section-subtitle">All-inclusive private taxi and tour packages.</p>
                    <div className="grid-3">
                        {packages.map((pkg, i) => (
                            <div key={i} className="card" style={{
                                textAlign: 'center', position: 'relative',
                                border: pkg.popular ? '2px solid var(--secondary)' : undefined,
                                overflow: 'visible',
                            }}>
                                {pkg.popular && (
                                    <div style={{
                                        position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                                        background: 'linear-gradient(135deg, var(--secondary), var(--secondary-light))',
                                        color: 'var(--primary)', padding: '0.3rem 1.2rem', borderRadius: '20px',
                                        fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap',
                                    }}>
                                        Most Popular
                                    </div>
                                )}
                                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{pkg.icon}</div>
                                <h3 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>{pkg.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{pkg.duration}</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '1rem' }}>{pkg.note}</p>
                                <ul style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                                    {pkg.includes.map((item, j) => (
                                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            <span style={{ color: 'var(--secondary)', fontWeight: 700, flexShrink: 0 }}>✓</span> {item}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/book-online" className={`btn ${pkg.popular ? 'btn-primary' : 'btn-outline-gold'}`} style={{ display: 'block' }}>
                                    Book This Package
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Attractions */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Must-See AlUla Attractions</h2>
                    <div className="grid-2">
                        {attractions.map((attr, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: '1.5rem', padding: '1.5rem',
                                background: 'var(--white)', borderRadius: 'var(--radius-md)',
                                boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid var(--secondary)',
                            }}>
                                <div style={{ fontSize: '2rem', minWidth: '44px', textAlign: 'center' }}>{attr.icon}</div>
                                <div>
                                    <h3 style={{ color: 'var(--primary)', fontSize: '1rem', marginBottom: '0.3rem' }}>{attr.name}</h3>
                                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>{attr.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="section-lg bg-light">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 className="section-title">AlUla FAQs</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {faqs.map((faq, i) => (
                            <div key={i} style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1rem', marginBottom: '0.5rem' }}>Q: {faq.q}</h3>
                                <p style={{ color: 'var(--text-muted)', margin: 0, lineHeight: '1.7', fontSize: '0.95rem' }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Begin Your AlUla Adventure</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
                        Let us take you on an unforgettable journey through 200,000 years of human history. Book your AlUla tour today.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book AlUla Tour</Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
