import Link from "next/link";
import type { Metadata } from "next";
import { PlaneIcon, UserIcon, ClockIcon, TagIcon, ShieldIcon, MapPinIcon, ChevronRightIcon, MessageIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "Riyadh King Khalid International Airport (KKIA) Taxi | Saudi Taxi",
    description: "Reliable and professional airport transfer services from Riyadh King Khalid International Airport (KKIA). 24/7 availability, and professional drivers.",
};

const benefits = [
    {
        icon: <UserIcon size={32} />,
        title: "Personalized Meet & Greet",
        description: "Our professional drivers wait for you at the KKIA arrivals with a personalized name sign for a stress-free transition.",
    },
    {
        icon: <ClockIcon size={32} />,
        title: "Punctuality Guaranteed",
        description: "We value your time. Our drivers arrive at Riyadh Airport exactly when your flight lands, monitored by flight tracking.",
    },
    {
        icon: <TagIcon size={32} />,
        title: "Transparent Quoting",
        description: "Enjoy transparent pricing from KKIA to any location in Riyadh or beyond. No hidden fees or unexpected surcharges.",
    },
];

export default function RiyadhAirportTaxi() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Riyadh Airport Taxi Service</h1>
                <p>
                    Professional transfers from King Khalid International Airport (KKIA). 
                    Reliable, safe, and available 24/7 across Riyadh.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <Link href="/airport-transfers">Airport Transfers</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <span>Riyadh</span>
                </div>
            </section>

            {/* Intro */}
            <section className="section-lg">
                <div className="container" style={{ textAlign: 'center', maxWidth: '850px' }}>
                    <h2 className="section-title">Seamless Arrival at King Khalid International Airport</h2>
                    <p className="section-subtitle">
                        Experience the finest airport transfer service in the capital. Whether you are visiting for business or leisure, our Riyadh Airport taxi service provides the ultimate comfort and efficiency.
                    </p>
                </div>
            </section>

            {/* Details Section */}
            <section className="section-lg bg-light">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Transparent Pricing to Riyadh Destinations</h2>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '2rem' }}>
                                We provide cost-effective and premium transport solutions from KKIA. Our fleet includes luxury sedans, family SUVs, and spacious vans to accommodate all group sizes and luggage requirements.
                            </p>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <MapPinIcon size={20} style={{ color: 'var(--accent)' }} />
                                    <span>KKIA ↔ Riyadh City Center</span>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <MapPinIcon size={20} style={{ color: 'var(--accent)' }} />
                                    <span>KKIA ↔ Diplomatic Quarter</span>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <MapPinIcon size={20} style={{ color: 'var(--accent)' }} />
                                    <span>KKIA ↔ Diriyah & North Riyadh</span>
                                </li>
                            </ul>
                        </div>
                        <div className="grid-1" style={{ gap: '1.5rem' }}>
                            {benefits.map((benefit, i) => (
                                <div key={i} className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ color: 'var(--accent)', flexShrink: 0 }}>{benefit.icon}</div>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>{benefit.title}</h3>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'var(--primary-dark)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Book Your Riyadh Airport Ride</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Reserve your professional taxi from KKIA today and enjoy a premium arrival experience in Riyadh.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book Now</Link>
                        <a href="https://wa.me/966123456789" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white' }}>
                            <MessageIcon size={18} style={{ marginRight: '8px' }} /> WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
