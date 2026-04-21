import Link from "next/link";
import type { Metadata } from "next";
import { PlaneIcon, UserIcon, ClockIcon, TagIcon, ShieldIcon, MapPinIcon, ChevronRightIcon, MessageIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "Airport Transfers Saudi Arabia | Jeddah Airport Taxi | Saudi Taxi",
    description: "Professional airport transfer services from Jeddah King Abdulaziz International Airport (KAIA) to Makkah, Madinah, and beyond. Reliable and 24/7 availability.",
};

const benefits = [
    {
        icon: <UserIcon size={32} />,
        title: "Meet & Greet Service",
        description: "Your driver will be waiting at the arrivals hall with a name board. Easy identification, no confusion, even for first-time visitors.",
    },
    {
        icon: <ClockIcon size={32} />,
        title: "Real-Time Flight Tracking",
        description: "We monitor your flight status in real-time. If your flight is early or delayed, we adjust accordingly — at no extra cost.",
    },
    {
        icon: <PlaneIcon size={32} />,
        title: "Domestic & International",
        description: "Seamless transfers from both Terminal 1 and North Terminal at Jeddah Airport to your hotel in Makkah or Madinah.",
    },
    {
        icon: <ShieldIcon size={32} />,
        title: "Licensed & Insured",
        description: "All vehicles are Ministry-licensed and fully insured. Travel with peace of mind knowing you are in safe hands.",
    },
    {
        icon: <TagIcon size={32} />,
        title: "Transparent Quoting",
        description: "No meters, no surprises. Confirm your rate when you book via our quote system. Transparent pricing you can trust.",
    },
    {
        icon: <MapPinIcon size={32} />,
        title: "Door-to-Door Service",
        description: "We take you directly from the airport arrivals to your hotel lobby. No walking with heavy luggage or searching for shuttles.",
    },
];

const airports = [
    {
        name: "Jeddah Airport (KAIA)",
        code: "JED",
        routes: [
            { to: "Makkah Hotels", price: "Check Rates", time: "~1.5 hrs" },
            { to: "Madinah Hotels", price: "Check Rates", time: "~4.5 hrs" },
            { to: "Jeddah City Hotels", price: "Check Rates", time: "~30 min" },
        ],
    },
    {
        name: "Madinah Airport (PMBA)",
        code: "MED",
        routes: [
            { to: "Madinah Hotels", price: "Check Rates", time: "~20 min" },
            { to: "Makkah Hotels", price: "Check Rates", time: "~4.5 hrs" },
        ],
    },
];

export default function AirportTransfers() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Professional Airport Transfers</h1>
                <p>
                    Reliable taxi services from Jeddah and Madinah airports. Professional drivers and 24/7 availability.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <span>Airport Transfers</span>
                </div>
            </section>

            {/* Intro */}
            <section className="section-lg">
                <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                    <h2 className="section-title">Hassle-Free Arrival in Saudi Arabia</h2>
                    <p className="section-subtitle">
                        Avoid the stress of airport crowds and unreliable transport. Our pre-arranged airport transfer service ensures a comfortable journey to the Holy Cities.
                    </p>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="section-lg bg-light">
                <div className="container">
                    <div className="grid-3">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                                <div style={{ color: 'var(--accent)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{benefit.icon}</div>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1.25rem', marginBottom: '1rem' }}>{benefit.title}</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem', margin: 0 }}>{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Airport Routes */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Popular Routes & Quick Quotes</h2>
                    <div className="grid-2" style={{ maxWidth: '1000px', margin: '3rem auto 0' }}>
                        {airports.map((airport, i) => (
                            <div key={i} style={{
                                background: 'var(--white)',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-lg)',
                                overflow: 'hidden',
                                border: '1px solid var(--gray-200)'
                            }}>
                                <div style={{
                                    background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))',
                                    padding: '1.5rem 2rem',
                                    color: 'var(--white)',
                                }}>
                                    <h3 style={{ color: 'var(--accent)', margin: 0, fontSize: '1.2rem' }}>{airport.name}</h3>
                                    <span style={{ opacity: 0.8, fontSize: '0.85rem' }}>Airport Code: {airport.code}</span>
                                </div>
                                <div style={{ padding: '1.5rem 2rem' }}>
                                    {airport.routes.map((route, j) => (
                                        <div key={j} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '1.25rem 0',
                                            borderBottom: j < airport.routes.length - 1 ? '1px solid var(--gray-100)' : 'none',
                                        }}>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>To {route.to}</div>
                                                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Travel Time: {route.time}</div>
                                            </div>
                                            <span style={{
                                                background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
                                                color: 'var(--primary-dark)',
                                                padding: '0.5rem 1.25rem',
                                                borderRadius: '30px',
                                                fontWeight: 800,
                                                fontSize: '0.9rem',
                                                boxShadow: '0 4px 10px rgba(212, 175, 55, 0.2)'
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

            {/* CTA Section */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)',
                padding: '6rem 0',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.05
                }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem', fontSize: '2.5rem' }}>Ready to Land?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Book your airport transfer now and have a professional driver waiting for you.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg" style={{ minWidth: '200px' }}>
                            Book Now
                        </Link>
                        <a href="https://wa.me/966123456789" className="btn btn-outline btn-lg" style={{ minWidth: '200px', color: 'var(--white)', borderColor: 'rgba(255,255,255,0.5)' }}>
                            <MessageIcon size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
