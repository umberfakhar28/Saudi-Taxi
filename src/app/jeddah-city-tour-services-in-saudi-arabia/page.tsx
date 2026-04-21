import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jeddah City Tour Services | Guided Jeddah Tour | Saudi Taxi",
    description: "Explore the vibrant city of Jeddah with our expert-guided city tour. Al-Balad Old Town, Jeddah Corniche, Floating Mosque, markets and more. Book your Jeddah tour today.",
};

const attractions = [
    { icon: "🏛️", name: "Al-Balad Historic District", description: "UNESCO World Heritage Site — explore centuries-old coral buildings, traditional souqs and historic merchant houses." },
    { icon: "🌊", name: "Jeddah Corniche", description: "A stunning 30km coastal promenade along the Red Sea, featuring parks, cafes and the iconic King Fahd Fountain." },
    { icon: "🕌", name: "Al-Rahma Floating Mosque", description: "The Mercy Mosque that appears to float on the Red Sea — one of Jeddah's most photographed landmarks." },
    { icon: "🛍️", name: "Jeddah Souq Al-Alawi", description: "A bustling traditional market in the heart of Al-Balad, selling spices, perfumes, gold, fabrics and souvenirs." },
    { icon: "🏛️", name: "Jeddah Regional Museum", description: "Discover 7,000 years of history through fascinating artifacts, manuscripts and archaeological exhibits." },
    { icon: "🌺", name: "Al-Shallal Theme Park", description: "A waterfront entertainment complex with rides, an ice rink, restaurants and stunning Red Sea views." },
    { icon: "🦁", name: "Fakieh Aquarium", description: "The popular marine attraction featuring Red Sea fish, dolphins, sharks and entertaining shows." },
    { icon: "🌅", name: "King Fahd Fountain", description: "The world's tallest fountain, shooting water 312 meters into the air — spectacular at night." },
];

const tourPackages = [
    {
        title: "Jeddah Half Day Tour",
        duration: "5 Hours",
        sites: ["Al-Balad Old Town", "Jeddah Corniche", "Floating Mosque", "King Fahd Fountain"],
        icon: "🌆",
    },
    {
        title: "Jeddah Full Day Tour",
        duration: "10 Hours",
        sites: ["Al-Balad Old Town", "Jeddah Corniche", "Floating Mosque", "Al-Shallal", "Fakieh Aquarium", "Jeddah Museum", "Souq Al-Alawi"],
        icon: "🌃",
        popular: true,
    },
    {
        title: "Jeddah + Red Sea Tour",
        duration: "Full Day",
        sites: ["All City Sites", "Red Sea Beach", "Seafood Lunch", "Sunset Corniche Walk", "Night City View"],
        icon: "🌊",
    },
];

export default function JeddahCityTour() {
    return (
        <main>
            <section className="page-hero">
                <h1>Jeddah City Tour Services in Saudi Arabia</h1>
                <p>Discover the Pearl of the Red Sea — explore Jeddah&apos;s UNESCO heritage, stunning coastline and vibrant culture with our expert guides.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Jeddah City Tour</span>
                </div>
            </section>

            {/* Intro */}
            <section className="section-lg">
                <div className="container" style={{ maxWidth: '850px', textAlign: 'center' }}>
                    <h2>Discover the Magic of Jeddah</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                        Jeddah — the gateway city of Saudi Arabia — is a captivating blend of ancient history and modern cosmopolitan life. From the narrow alleys of UNESCO-listed Al-Balad to the glittering Red Sea Corniche, every corner of Jeddah tells a story. Our guided city tours take you to the best landmarks with a comfortable private vehicle and a knowledgeable local driver.
                    </p>
                </div>
            </section>

            {/* Tour Packages */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Jeddah Tour Packages</h2>
                    <p className="section-subtitle">All packages include private vehicle, driver/guide, and flexible itinerary.</p>
                    <div className="grid-3">
                        {tourPackages.map((pkg, j) => (
                            <div key={j} className="card" style={{
                                textAlign: 'center', position: 'relative',
                                border: pkg.popular ? '2px solid var(--secondary)' : undefined,
                                overflow: pkg.popular ? 'visible' : undefined,
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
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{pkg.duration}</p>
                                <ul style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                                    {pkg.sites.map((site, j) => (
                                        <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>✓</span> {site}
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
                    <h2 className="section-title">Top Jeddah Attractions We Visit</h2>
                    <p className="section-subtitle">Our experienced drivers guide you through Jeddah&apos;s most iconic and historic landmarks.</p>
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

            {/* Tips */}
            <section className="section-lg bg-light">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 className="section-title">Jeddah Travel Tips</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { tip: "Best Time to Visit", detail: "October to April offers the most pleasant weather. Avoid outdoor tours during summer midday (June–September)." },
                            { tip: "Dress Code", detail: "Jeddah is relatively cosmopolitan, but modest clothing is still recommended, especially when visiting mosques and Al-Balad." },
                            { tip: "Currency", detail: "Saudi Riyal. Most places accept credit cards, but having some cash is useful in traditional souqs." },
                            { tip: "Language", detail: "Arabic is the official language. English is widely understood in hotels, malls and tourist areas. Our drivers speak both." },
                        ].map((item, i) => (
                            <div key={i} style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1rem', marginBottom: '0.4rem' }}>💡 {item.tip}</h3>
                                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Ready to Explore Jeddah?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
                        Book your Jeddah city tour today and discover the Pearl of the Red Sea with a trusted local guide.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book Jeddah Tour</Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
