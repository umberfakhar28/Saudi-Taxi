import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ziyarat Services in Saudi Arabia | Holy Sites Tour | Saudi Taxi",
    description: "Explore the holy and historical sites of Makkah and Madinah with our professional Ziyarat tour services. Experienced guides, comfortable vehicles, flexible itineraries.",
};

const makkahZiyarat = [
    { name: "Masjid Al-Haram", description: "The Grand Mosque surrounding the Holy Kaaba — the most sacred site in Islam." },
    { name: "Jabal Al-Nour", description: "The Mountain of Light, where the first Quranic revelation descended in the Cave of Hira." },
    { name: "Jabal Thawr", description: "The mountain where the Prophet ﷺ and Abu Bakr sought refuge during the Hijra." },
    { name: "Jannat Al-Mualla", description: "The historic cemetery in Makkah, resting place of many family members of the Prophet ﷺ." },
    { name: "Mina", description: "The tent city where pilgrims stay during Hajj and perform the symbolic stoning of Shaitan." },
    { name: "Arafat (Mount Mercy)", description: "The plain where pilgrims gather on the 9th of Dhul Hijja — the climax of Hajj." },
    { name: "Muzdalifah", description: "Where pilgrims collect pebbles and spend the night during Hajj." },
    { name: "Masjid Al-Jinn", description: "Built at the place where a group of Jinn listened to the Quran and accepted Islam." },
    { name: "Masjid Al-Rayah", description: "Also known as the Mosque of the Flag, marking a historic battle site." },
    { name: "Birthplace of Prophet ﷺ", description: "The historic site believed to be the birthplace of Prophet Muhammad ﷺ." },
];

const madinahZiyarat = [
    { name: "Masjid Al-Nabawi", description: "The Prophet's Mosque — the second most sacred mosque in Islam, built by the Prophet ﷺ himself." },
    { name: "Raudhah Al-Sharif", description: "The blessed garden between the Prophet's ﷺ pulpit and his tomb — 'a garden from the gardens of Paradise.'" },
    { name: "Jannat Al-Baqi", description: "The main cemetery of Madinah, where many Companions and family of the Prophet ﷺ rest." },
    { name: "Masjid Quba", description: "The first mosque ever built in Islam — praying 2 rakat here equals the reward of Umrah." },
    { name: "Masjid Al-Qiblatayn", description: "The Mosque of Two Qiblas, where the direction of prayer changed from Jerusalem to Makkah." },
    { name: "Masjid Al-Ghamamah", description: "Where the Prophet ﷺ offered Eid prayers and where clouds appeared to shade him." },
    { name: "Mount Uhud", description: "The site of the famous Battle of Uhud. Visit the graves of the martyrs and walk historic ground." },
    { name: "Seven Mosques", description: "A cluster of historic mosques commemorating the Battle of the Trench (Khandaq)." },
];

const packages = [
    {
        title: "Makkah Ziyarat Tour",
        duration: "Full Day (8-10 hrs)",
        price: "350 SAR",
        includes: ["Jabal Al-Nour", "Jabal Thawr", "Arafat & Mina", "Muzdalifah", "Jannat Al-Mualla", "Historic Sites"],
        icon: "🕌",
    },
    {
        title: "Madinah Ziyarat Tour",
        duration: "Full Day (8-10 hrs)",
        price: "350 SAR",
        includes: ["Masjid Quba", "Masjid Qiblatayn", "Mount Uhud", "Jannat Al-Baqi", "Seven Mosques", "Dates Market"],
        icon: "🌙",
    },
    {
        title: "Makkah + Taif Tour",
        duration: "2 Days",
        price: "700 SAR",
        includes: ["Full Makkah Ziyarat", "Taif Scenic Drive", "Al-Shafa Garden", "Rose Farms Visit", "Taif Souq"],
        icon: "🌹",
    },
];

export default function ZiyaratServices() {
    return (
        <main>
            <section className="page-hero">
                <h1>Ziyarat Services in Saudi Arabia</h1>
                <p>Visit the revered holy and historical sites of Makkah and Madinah with knowledgeable guides and comfortable transportation.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Ziyarat Services</span>
                </div>
            </section>

            {/* Intro */}
            <section className="section-lg">
                <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
                    <h2>Explore the Holy Cities with Reverence & Comfort</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                        Ziyarat — the visitation of sacred sites — is a spiritually enriching experience for every Muslim. Our dedicated Ziyarat tour services provide comfortable, informative, and respectful visits to the blessed sites of Makkah and Madinah. Our experienced drivers serve as knowledgeable guides, sharing the history and significance of each site in your language.
                    </p>
                </div>
            </section>

            {/* Packages */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Ziyarat Tour Packages</h2>
                    <p className="section-subtitle">Choose a package or request a custom itinerary tailored to your schedule.</p>
                    <div className="grid-3">
                        {packages.map((pkg, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{pkg.icon}</div>
                                <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{pkg.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{pkg.duration}</p>
                                <ul style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                                    {pkg.includes.map((item, j) => (
                                        <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>✓</span> {item}
                                        </li>
                                    ))}
                                </ul>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                                    {pkg.price} <span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--text-muted)' }}>/ vehicle</span>
                                </div>
                                <Link href="/book-online" className="btn btn-primary" style={{ width: '100%', display: 'block' }}>Book This Tour</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Makkah Sites */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Makkah Ziyarat Sites</h2>
                    <p className="section-subtitle">Explore the blessed sites surrounding the Holy Kaaba in the city of Makkah Al-Mukarramah.</p>
                    <div className="grid-2">
                        {makkahZiyarat.map((site, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: '1.5rem', padding: '1.5rem',
                                background: 'var(--white)', borderRadius: 'var(--radius-md)',
                                boxShadow: 'var(--shadow-sm)',
                                borderLeft: '4px solid var(--secondary)',
                            }}>
                                <div>
                                    <h3 style={{ color: 'var(--primary)', fontSize: '1.05rem', marginBottom: '0.3rem' }}>{site.name}</h3>
                                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>{site.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Madinah Sites */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Madinah Ziyarat Sites</h2>
                    <p className="section-subtitle">Visit the sacred sites of Madinah Al-Munawwarah — the City of the Prophet ﷺ.</p>
                    <div className="grid-2">
                        {madinahZiyarat.map((site, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: '1.5rem', padding: '1.5rem',
                                background: 'var(--white)', borderRadius: 'var(--radius-md)',
                                boxShadow: 'var(--shadow-sm)',
                                borderLeft: '4px solid var(--primary)',
                            }}>
                                <div>
                                    <h3 style={{ color: 'var(--primary)', fontSize: '1.05rem', marginBottom: '0.3rem' }}>{site.name}</h3>
                                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>{site.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Start Your Ziyarat Journey</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
                        Book your Ziyarat tour with us and experience these sacred sites in peace, comfort and with deep understanding.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book Ziyarat Tour</Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
