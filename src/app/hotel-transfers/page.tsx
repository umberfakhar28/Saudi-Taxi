import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hotel Transfers Saudi Arabia | Taxi to Hotel from Airport | Saudi Taxi",
    description: "Comfortable and reliable hotel transfer services in Makkah, Madinah and Jeddah. Door-to-door transfers between airports, hotels and holy sites across Saudi Arabia.",
};

const features = [
    { icon: "🏨", title: "Door-to-Door Service", description: "We pick you up directly from your hotel lobby and drop you precisely at your destination — no walking, no confusion." },
    { icon: "⏱️", title: "Punctual & Reliable", description: "We value your time. Our drivers are always on time, ensuring you never miss a prayer, tour, or departure." },
    { icon: "🛞", title: "All Vehicle Sizes", description: "From sedans for solo travelers to large minivans for groups — we have the right vehicle for every need." },
    { icon: "💵", title: "Transparent Pricing", description: "No meter surprises. All hotel transfer rates are agreed upon via quote before your journey begins." },
    { icon: "🗺️", title: "City-Wide Coverage", description: "We cover all major hotels in Makkah, Madinah, Jeddah and surrounding areas." },
    { icon: "☎️", title: "24/7 Support", description: "Our team is available round the clock. Reach us any time via phone, WhatsApp or our booking form." },
];

const routes = [
    { route: "Airport → Makkah Hotels", price: "Check Rates", vehicle: "Sedan / SUV" },
    { route: "Airport → Madinah Hotels", price: "Check Rates", vehicle: "Sedan / SUV" },
    { route: "Makkah → Madinah Hotels", price: "Check Rates", vehicle: "Sedan / SUV" },
    { route: "Jeddah City → Makkah Hotels", price: "Check Rates", vehicle: "Sedan / SUV" },
    { route: "Makkah → Jeddah Hotels", price: "Check Rates", vehicle: "Sedan / SUV" },
    { route: "Madinah → Jeddah Airport", price: "Check Rates", vehicle: "Sedan / SUV" },
];

const hotels = ["Makkah Clock Royal Tower — A Fairmont Hotel", "Hilton Makkah Convention Hotel", "Swissôtel Al Maqam Makkah", "Dar Al-Tawasol Makkah", "Movenpick Hotel & Residences Hajar Tower", "Anwar Al Madinah Mövenpick Hotel", "Pullman Zamzam Madina", "InterContinental Madinah-Dar Al Iman", "Sheraton Makkah Jabal Al Kaaba Hotel", "Conrad Makkah"];

export default function HotelTransfers() {
    return (
        <main>
            <section className="page-hero">
                <h1>Hotel Transfer Services in Saudi Arabia</h1>
                <p>Professional door-to-door transfers between hotels, airports and holy sites across Makkah, Madinah, and Jeddah.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Hotel Transfers</span>
                </div>
            </section>

            {/* Features */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">What Makes Our Hotel Transfers Special?</h2>
                    <p className="section-subtitle">We provide seamless transfer experiences tailored to pilgrims, tourists and business travelers.</p>
                    <div className="grid-3">
                        {features.map((f, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{f.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7', margin: 0 }}>{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Routes */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Popular Hotel Transfer Routes</h2>
                    <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--white)', minWidth: '500px' }}>
                            <thead>
                                <tr style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', color: 'var(--white)' }}>
                                    <th style={{ padding: '1.2rem 1.5rem', textAlign: 'left', fontWeight: 600, fontSize: '0.9rem' }}>Route</th>
                                    <th style={{ padding: '1.2rem 1.5rem', textAlign: 'center', fontWeight: 600, fontSize: '0.9rem' }}>Vehicle</th>
                                    <th style={{ padding: '1.2rem 1.5rem', textAlign: 'center', fontWeight: 600, fontSize: '0.9rem' }}>Pricing</th>
                                </tr>
                            </thead>
                            <tbody>
                                {routes.map((r, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                                        <td style={{ padding: '1.1rem 1.5rem', fontWeight: 500 }}>{r.route}</td>
                                        <td style={{ padding: '1.1rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>{r.vehicle}</td>
                                        <td style={{ padding: '1.1rem 1.5rem', textAlign: 'center' }}>
                                            <span style={{ background: 'linear-gradient(135deg, var(--secondary), var(--secondary-light))', color: 'var(--primary)', padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.9rem' }}>
                                                {r.price}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center mt-3">
                        <Link href="/book-online" className="btn btn-primary">Book Hotel Transfer</Link>
                    </div>
                </div>
            </section>

            {/* Hotels We Serve */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Hotels We Frequently Serve</h2>
                    <p className="section-subtitle">We operate transfers to and from all major hotels in Makkah, Madinah, and Jeddah.</p>
                    <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {hotels.map((hotel, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '1rem',
                                padding: '1rem 1.5rem', background: 'var(--white)',
                                borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)',
                                borderLeft: '4px solid var(--secondary)',
                            }}>
                                <span style={{ fontSize: '1.2rem' }}>🏨</span>
                                <span style={{ color: 'var(--text-dark)', fontWeight: 500, fontSize: '0.95rem' }}>{hotel}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-center mt-3" style={{ color: 'var(--text-muted)' }}>
                        Don&apos;t see your hotel? <Link href="/contact-us" style={{ color: 'var(--secondary)', fontWeight: 600 }}>Contact us</Link> — we cover all hotels!
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Need a Hotel Transfer?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
                        Book in advance or last minute — we&apos;re always ready to take you where you need to go.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book Now</Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
