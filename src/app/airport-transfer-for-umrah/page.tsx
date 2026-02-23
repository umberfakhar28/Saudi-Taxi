import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Airport Transfer for Umrah | Jeddah Airport Taxi Service",
    description: "Book reliable airport transfer for Umrah from Jeddah King Abdulaziz International Airport. Meet & greet, flight tracking, fixed prices. Available 24/7.",
};

const benefits = [
    {
        icon: "👋",
        title: "Meet & Greet Service",
        description: "Your driver will be waiting at the arrivals hall with a name board. Easy identification, no confusion, even for first-time visitors.",
    },
    {
        icon: "📡",
        title: "Real-Time Flight Tracking",
        description: "We monitor your flight status in real-time. If your flight is early or delayed, we adjust accordingly — at no extra cost.",
    },
    {
        icon: "💼",
        title: "Full Luggage Assistance",
        description: "Our drivers handle your luggage with care from the airport exit to the car and from the car to your hotel doorstep.",
    },
    {
        icon: "🕐",
        title: "24/7 Available",
        description: "Flights don't follow a 9-to-5 schedule, and neither do we. Book your airport transfer for any time, day or night.",
    },
    {
        icon: "🔒",
        title: "Pre-Booked Fixed Price",
        description: "No meters, no surprises. Confirm your price when you book and pay exactly that. Transparent pricing you can trust.",
    },
    {
        icon: "❄️",
        title: "Comfortable Vehicles",
        description: "All vehicles are modern, air-conditioned, and spacious. Arrive at your destination refreshed and ready for your Umrah.",
    },
];

const airports = [
    {
        name: "Jeddah King Abdulaziz International Airport (KAIA)",
        code: "JED",
        routes: [
            { to: "Makkah Hotels", price: "From 150 SAR", time: "~1.5 hrs" },
            { to: "Madinah", price: "From 700 SAR", time: "~4 hrs" },
            { to: "Jeddah City Hotels", price: "From 80 SAR", time: "~30 min" },
        ],
    },
    {
        name: "Madinah Prince Mohammad Airport",
        code: "MED",
        routes: [
            { to: "Madinah Hotels", price: "From 80 SAR", time: "~20 min" },
            { to: "Makkah", price: "From 700 SAR", time: "~4.5 hrs" },
        ],
    },
];

export default function AirportTransfer() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Airport Transfer for Umrah</h1>
                <p>
                    Hassle-free airport transfers from Jeddah & Madinah airports. Meet & greet, flight tracking, and door-to-door service.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Airport Transfer for Umrah</span>
                </div>
            </section>

            {/* Intro */}
            <section className="section-lg">
                <div className="container">
                    <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                        <h2>Seamless Airport Transfers for Your Umrah Journey</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                            After a long international flight, the last thing you want is the stress of finding reliable transport to Makkah. Our specialized airport transfer service for Umrah pilgrims ensures you have a comfortable, pre-arranged ride waiting for you the moment you step out of the airport.
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
                            We serve all major airports in Saudi Arabia, with our primary focus on Jeddah King Abdulaziz International Airport (KAIA) and Madinah Prince Mohammad Bin Abdulaziz Airport. Our professional drivers are trained to assist Umrah pilgrims and make your arrival experience as smooth as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Why Book Airport Transfer With Us?</h2>
                    <p className="section-subtitle">
                        Every detail is taken care of so you can focus on what matters most — your Umrah.
                    </p>
                    <div className="grid-3">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>{benefit.icon}</div>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1.15rem', marginBottom: '0.75rem' }}>{benefit.title}</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Airport Routes */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Airport Transfer Routes & Prices</h2>
                    <p className="section-subtitle">
                        Fixed prices for all airport transfer routes. No hidden fees, no meter charges.
                    </p>
                    <div className="grid-2" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        {airports.map((airport, i) => (
                            <div key={i} style={{
                                background: 'var(--white)',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-lg)',
                                overflow: 'hidden',
                            }}>
                                <div style={{
                                    background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))',
                                    padding: '1.5rem 2rem',
                                    color: 'var(--white)',
                                }}>
                                    <h3 style={{ color: 'var(--secondary)', margin: 0, fontSize: '1.1rem' }}>{airport.name}</h3>
                                    <span style={{ opacity: 0.7, fontSize: '0.85rem' }}>Airport Code: {airport.code}</span>
                                </div>
                                <div style={{ padding: '1.5rem 2rem' }}>
                                    {airport.routes.map((route, j) => (
                                        <div key={j} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '1rem 0',
                                            borderBottom: j < airport.routes.length - 1 ? '1px solid var(--gray-200)' : 'none',
                                        }}>
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>To {route.to}</div>
                                                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{route.time}</div>
                                            </div>
                                            <span style={{
                                                background: 'linear-gradient(135deg, var(--secondary), var(--secondary-light))',
                                                color: 'var(--primary)',
                                                padding: '0.4rem 1rem',
                                                borderRadius: '20px',
                                                fontWeight: 700,
                                                fontSize: '0.85rem',
                                                whiteSpace: 'nowrap',
                                            }}>
                                                {route.price}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How to Book */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">How to Book Your Airport Transfer</h2>
                    <div className="grid-3" style={{ maxWidth: '900px', margin: '2rem auto 0' }}>
                        {[
                            { step: '1', icon: '📝', title: 'Share Flight Details', desc: 'Tell us your flight number, arrival date/time, number of passengers, and hotel name in Makkah.' },
                            { step: '2', icon: '✅', title: 'Get Confirmation', desc: 'We confirm your booking instantly with driver name, phone number, and vehicle details.' },
                            { step: '3', icon: '🚗', title: 'Get Picked Up', desc: 'Your driver meets you at arrivals with a name board, helps with luggage, and drives you to your hotel.' },
                        ].map((item, i) => (
                            <div key={i} style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '70px',
                                    height: '70px',
                                    background: 'linear-gradient(135deg, var(--secondary), var(--secondary-light))',
                                    color: 'var(--primary)',
                                    borderRadius: '50%',
                                    fontSize: '2rem',
                                    marginBottom: '1.5rem',
                                    boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
                                }}>{item.icon}</div>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1.15rem', marginBottom: '0.75rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)',
                padding: '5rem 0',
                textAlign: 'center',
            }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Book Your Airport Transfer Now</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Pre-book your airport pickup and arrive at your destination stress-free and on time.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/booking" className="btn btn-primary btn-lg">
                            Book Transfer
                        </Link>
                        <a href="https://wa.me/966123456789" className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
