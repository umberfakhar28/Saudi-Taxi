import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Private Taxi Saudi Arabia | Hire Private Cab | Saudi Taxi Service",
    description: "Hire a private taxi in Saudi Arabia for personal comfort, privacy and flexibility. Available for local trips, inter-city travel and long-distance journeys.",
};

const features = [
    { icon: "🔒", title: "100% Private", description: "Your vehicle is exclusively for you and your group. No shared rides, no strangers." },
    { icon: "🗺️", title: "Flexible Routes", description: "Travel where you want, when you want. We adjust to your schedule and itinerary." },
    { icon: "⏳", title: "Hourly & Full Day", description: "Book by the hour for local trips or by the full day for city tours and long journeys." },
    { icon: "🚐", title: "All Vehicle Types", description: "Choose from economy sedans, business class, luxury SUVs or 7-seater minivans." },
    { icon: "🧑‍✈️", title: "Professional Drivers", description: "Experienced, courteous drivers with local knowledge and multilingual capabilities." },
    { icon: "📞", title: "24/7 Availability", description: "Book any time of day or night. We're here whenever you need a ride." },
];

const packages = [
    {
        title: "Half Day (4 hrs)",
        price: "200 SAR",
        vehicle: "Sedan",
        kms: "Up to 80 km",
        icon: "🚗",
    },
    {
        title: "Full Day (10 hrs)",
        price: "450 SAR",
        vehicle: "Sedan",
        kms: "Up to 200 km",
        icon: "🚘",
        popular: true,
    },
    {
        title: "Full Day SUV (10 hrs)",
        price: "650 SAR",
        vehicle: "SUV / Minivan",
        kms: "Up to 200 km",
        icon: "🚙",
    },
];

const useCases = [
    { icon: "🛍️", title: "Shopping Trips", description: "Explore malls, souqs and shopping centers at your convenience." },
    { icon: "🏥", title: "Medical Appointments", description: "Reliable transport for hospital and clinic visits with waiting service." },
    { icon: "🤝", title: "Business Travel", description: "Professional transfer for meetings, conferences and corporate events." },
    { icon: "👨‍👩‍👧‍👦", title: "Family Outings", description: "Comfortable family trips with spacious vehicles for all ages." },
    { icon: "🌆", title: "City Exploration", description: "Explore Makkah, Madinah, Jeddah or Taif at your own leisure pace." },
    { icon: "🕌", title: "Mosque Visits", description: "Visit local mosques, Islamic museums and cultural sites around the Holy Cities." },
];

export default function PrivateTaxi() {
    return (
        <main>
            <section className="page-hero">
                <h1>Private Taxi Services in Saudi Arabia</h1>
                <p>Your own dedicated vehicle and driver — flexible, comfortable and fully private. Available by the hour or for the full day.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Private Taxi</span>
                </div>
            </section>

            {/* Features */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Why Choose a Private Taxi?</h2>
                    <p className="section-subtitle">When you need comfort, flexibility and absolute privacy — private hire is the answer.</p>
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

            {/* Packages */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Private Taxi Packages</h2>
                    <p className="section-subtitle">All-inclusive packages with fixed prices — driver, fuel and vehicle all included.</p>
                    <div className="grid-3" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {packages.map((pkg, i) => (
                            <div key={i} className="card" style={{
                                textAlign: 'center',
                                position: 'relative',
                                border: pkg.popular ? '2px solid var(--secondary)' : undefined,
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
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{pkg.icon}</div>
                                <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{pkg.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{pkg.vehicle}</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{pkg.kms}</p>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--secondary)', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>
                                    {pkg.price}
                                </div>
                                <Link href="/book-online" className={`btn ${pkg.popular ? 'btn-primary' : 'btn-outline-gold'}`} style={{ width: '100%', display: 'block' }}>
                                    Book Now
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Perfect For Every Occasion</h2>
                    <div className="grid-3">
                        {useCases.map((uc, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                                padding: '1.5rem', background: 'var(--white)',
                                borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)',
                            }}>
                                <div style={{ fontSize: '2rem', minWidth: '44px', textAlign: 'center' }}>{uc.icon}</div>
                                <div>
                                    <h3 style={{ color: 'var(--primary)', fontSize: '1rem', marginBottom: '0.3rem' }}>{uc.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: '1.6' }}>{uc.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Hire Your Private Taxi Today</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
                        Book online or WhatsApp us for instant confirmation. We&apos;re available 24/7.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book Private Taxi</Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
