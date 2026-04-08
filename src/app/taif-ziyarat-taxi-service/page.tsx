import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Taif Ziyarat Taxi Service | Taif Tour from Makkah | Saudi Taxi",
    description: "Professional Taif Ziyarat and city tour taxi service from Makkah and Jeddah. Visit rose farms, Al-Shafa gardens, Taif Zoo and historic sites. Book your Taif trip today.",
};

const attractions = [
    { icon: "🌹", name: "Al-Gaith Rose Farm", description: "Taif is famous for its Damask roses — the source of the world's finest rose water and oud. Tour the enchanting rose farms during bloom season (March–May)." },
    { icon: "🏔️", name: "Al-Shafa & Al-Hada Mountain", description: "Breathtaking mountain villages perched 2,000m above sea level, offering cool temperatures and panoramic views above Makkah." },
    { icon: "🦁", name: "Al-Hada Chairlift", description: "Experience stunning aerial views of the Al-Hada valley and surrounding mountains from Saudi Arabia's most famous cable car." },
    { icon: "🦒", name: "Taif Zoo", description: "One of the largest zoos in Saudi Arabia, home to hundreds of species including lions, giraffes, elephants and many exotic animals." },
    { icon: "🕌", name: "Masjid Addas (Mosque of Addas)", description: "The historic mosque commemorating the Prophet's ﷺ stop in Taif, where a young Christian slave named Addas offered him a bunch of grapes." },
    { icon: "🏰", name: "Shubra Palace Museum", description: "A magnificent Italianate palace turned museum, once the residence of King Abdulaziz bin Saud. Explore royal history and Saudi heritage." },
    { icon: "🛍️", name: "Taif Souq Al-Tuffah", description: "The famous Apple Market of Taif, where you can buy fresh produce, honey, rose water, oud perfumes and local handicrafts." },
    { icon: "🌺", name: "Al-Rudaf Park", description: "A beautiful public park in a lush valley, perfect for family picnics, relaxation and enjoying Taif's pleasant mountain climate." },
];

const tourPackages = [
    {
        title: "Taif Day Trip",
        duration: "8-10 Hours",
        from: "From Makkah",
        includes: ["Rose Farm Visit", "Shubra Palace", "Taif Souq", "Al-Hada Mountain", "Lunch Stop"],
        icon: "🌹",
    },
    {
        title: "Taif Ziyarat & Tour",
        duration: "Full Day",
        from: "From Makkah / Jeddah",
        includes: ["Mosque of Addas", "Al-Shafa Mountains", "Rose Farm", "Chairlift Ride", "Taif Zoo", "Souq Visit"],
        icon: "🌿",
        popular: true,
    },
    {
        title: "Taif 2-Day Getaway",
        duration: "2 Days",
        from: "From Makkah / Jeddah",
        includes: ["All Day Trip Sites", "Overnight Stay Included", "Sunset Mountain Drive", "Honey Farm Visit", "Al-Rudaf Park", "Rose Water Purchase"],
        icon: "⭐",
    },
];

const seasons = [
    { season: "March – May", highlight: "Rose Season 🌹", description: "The most popular time to visit — rose farms are in full bloom, producing the world-famous Taif rose water." },
    { season: "June – September", highlight: "Cool Summer ☀️", description: "While the rest of the Kingdom bakes, Taif's mountain altitude keeps temperatures pleasant — a popular summer retreat for Saudis." },
    { season: "October – February", highlight: "Cool Winter 🍃", description: "Perfect hiking and outdoor weather. Visit apple orchards, enjoy fog-covered mountains and cool fresh air." },
];

export default function TaifZiyaratTaxi() {
    return (
        <main>
            <section className="page-hero">
                <h1>Taif Ziyarat Taxi Service</h1>
                <p>Journey to the City of Roses — Taif. Visit rose farms, mountain retreats and Islamic landmarks with our professional taxi service from Makkah and Jeddah.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Taif Ziyarat Taxi</span>
                </div>
            </section>

            {/* Intro */}
            <section className="section-lg">
                <div className="container" style={{ maxWidth: '850px', textAlign: 'center' }}>
                    <h2>Taif — The City of Roses & Mountain Air</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                        Located 1,800 meters above sea level in the Hejaz mountains, Taif is one of Saudi Arabia&apos;s most beloved cities. Known as the &quot;City of Roses,&quot; Taif produces the world&apos;s finest Damask rose water and oud — fragrances used in Islamic tradition for centuries. The city also holds deep Islamic significance as the site where the Prophet Muhammad ﷺ visited during the early years of his prophethood. Our taxi service makes a journey to Taif from Makkah or Jeddah comfortable, safe and memorable.
                    </p>
                </div>
            </section>

            {/* Packages */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Taif Tour Packages</h2>
                    <p className="section-subtitle">All-inclusive private taxi packages.</p>
                    <div className="grid-3">
                        {tourPackages.map((pkg, i) => (
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
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{pkg.duration}</p>
                                <p style={{ color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>{pkg.from}</p>
                                <ul style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                                    {pkg.includes.map((item, j) => (
                                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            <span style={{ color: 'var(--secondary)', fontWeight: 700, flexShrink: 0 }}>✓</span> {item}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/book-online" className={`btn ${pkg.popular ? 'btn-primary' : 'btn-outline-gold'}`} style={{ display: 'block' }}>
                                    Book This Tour
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Attractions */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Taif Attractions & Ziyarat Sites</h2>
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

            {/* Best Seasons */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Best Time to Visit Taif</h2>
                    <div className="grid-3">
                        {seasons.map((s, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center' }}>
                                <h3 style={{ color: 'var(--secondary)', marginBottom: '0.25rem', fontSize: '1rem' }}>{s.season}</h3>
                                <h4 style={{ color: 'var(--primary)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{s.highlight}</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7', margin: 0 }}>{s.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Book Your Taif Taxi Today</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
                        Experience the magic of Taif — from its rose fragrance to its mountain freshness. Book your private taxi from Makkah or Jeddah.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book Taif Trip</Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
