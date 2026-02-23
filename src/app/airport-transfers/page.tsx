import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Airport Transfers Saudi Arabia | Jeddah Airport Taxi | Saudi Taxi",
    description: "Professional airport transfer services from Jeddah's King Abdulaziz International Airport (KAIA) to Makkah, Madinah, Taif and beyond. Meet & greet, flight tracking, 24/7.",
};

const features = [
    { icon: "✈️", title: "Flight Tracking", description: "We monitor your flight in real time, adjusting pickup time automatically in case of delays or early arrivals." },
    { icon: "👋", title: "Meet & Greet", description: "Our driver will meet you at the arrivals hall with a name sign, helping you navigate the airport with ease." },
    { icon: "🧳", title: "Luggage Assistance", description: "Our professional drivers will handle your luggage and help you get settled into the vehicle comfortably." },
    { icon: "💱", title: "Fixed Prices", description: "No surge pricing, no hidden fees. Your fare is confirmed at the time of booking, regardless of traffic." },
    { icon: "🚗", title: "Modern Fleet", description: "Travel in clean, comfortable, modern vehicles — sedans, SUVs, minivans — suited to your group size." },
    { icon: "🌐", title: "Multilingual Drivers", description: "Our drivers communicate in Arabic, English, Urdu and Hindi to ensure smooth communication for all passengers." },
];

const routes = [
    { from: "Jeddah Airport (KAIA)", to: "Makkah", time: "~1.5 hrs", price: "150 SAR" },
    { from: "Jeddah Airport (KAIA)", to: "Madinah", time: "~5 hrs", price: "550 SAR" },
    { from: "Jeddah Airport (KAIA)", to: "Jeddah City", time: "~30 min", price: "80 SAR" },
    { from: "Jeddah Airport (KAIA)", to: "Taif", time: "~2.5 hrs", price: "280 SAR" },
    { from: "Makkah", to: "Jeddah Airport (KAIA)", time: "~1.5 hrs", price: "150 SAR" },
    { from: "Madinah", to: "Jeddah Airport (KAIA)", time: "~5 hrs", price: "550 SAR" },
];

const steps = [
    { step: "1", title: "Book Online or WhatsApp", description: "Complete our simple booking form or send us a WhatsApp with your travel details." },
    { step: "2", title: "Receive Confirmation", description: "You'll receive a booking confirmation with your driver's details and contact number." },
    { step: "3", title: "Land & Be Greeted", description: "Your driver will meet you at arrivals with your name sign — no waiting or searching." },
    { step: "4", title: "Arrive in Comfort", description: "Sit back and enjoy a smooth, comfortable ride to your destination." },
];

export default function AirportTransfers() {
    return (
        <main>
            <section className="page-hero">
                <h1>Airport Transfer Services in Saudi Arabia</h1>
                <p>Seamless, professional airport transfers from Jeddah's King Abdulaziz International Airport to Makkah, Madinah, and beyond.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Airport Transfers</span>
                </div>
            </section>

            {/* Features */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Why Choose Our Airport Transfer?</h2>
                    <p className="section-subtitle">We arrange hassle-free transfers with professional drivers so you can focus entirely on your journey.</p>
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

            {/* Routes Table */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Popular Airport Transfer Routes</h2>
                    <p className="section-subtitle">Transparent fixed pricing — confirmed at the time of booking, no surprises.</p>
                    <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--white)', minWidth: '500px' }}>
                            <thead>
                                <tr style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', color: 'var(--white)' }}>
                                    <th style={{ padding: '1.2rem 1.5rem', textAlign: 'left', fontWeight: 600, fontSize: '0.9rem' }}>From</th>
                                    <th style={{ padding: '1.2rem 1.5rem', textAlign: 'left', fontWeight: 600, fontSize: '0.9rem' }}>To</th>
                                    <th style={{ padding: '1.2rem 1.5rem', textAlign: 'center', fontWeight: 600, fontSize: '0.9rem' }}>Est. Time</th>
                                    <th style={{ padding: '1.2rem 1.5rem', textAlign: 'center', fontWeight: 600, fontSize: '0.9rem' }}>Starting From</th>
                                </tr>
                            </thead>
                            <tbody>
                                {routes.map((route, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                                        <td style={{ padding: '1.1rem 1.5rem', fontWeight: 500 }}>{route.from}</td>
                                        <td style={{ padding: '1.1rem 1.5rem', fontWeight: 500 }}>{route.to}</td>
                                        <td style={{ padding: '1.1rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>{route.time}</td>
                                        <td style={{ padding: '1.1rem 1.5rem', textAlign: 'center' }}>
                                            <span style={{ background: 'linear-gradient(135deg, var(--secondary), var(--secondary-light))', color: 'var(--primary)', padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.9rem' }}>
                                                {route.price}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center mt-3">
                        <Link href="/book-online" className="btn btn-primary">Book Your Airport Transfer</Link>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <div className="grid-4">
                        {steps.map((step, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '60px', height: '60px', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--secondary), var(--secondary-light))',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)',
                                    fontFamily: 'var(--font-heading)',
                                }}>
                                    {step.step}
                                </div>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Book Your Airport Transfer Now</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
                        Available 24/7. Fixed prices. Professional drivers. Book now and travel with complete peace of mind.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book Now</Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
