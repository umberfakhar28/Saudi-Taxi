import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircleIcon, MapPinIcon, CarIcon, ShieldIcon, MessageIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "Saudi Arabia to Qatar Taxi Service | Salwa Border Crossing | Saudi Taxi",
    description: "Reliable and premium taxi service from Saudi Arabia to Qatar. Direct transfers via the Salwa border crossing. Perfect for business, tourism and family travel. Book your Qatar trip today.",
};

export default function SaudiToQatar() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Saudi Arabia to Qatar Transfer</h1>
                <p>
                    Safe and comfortable land transfers via the Salwa border. 
                    Direct service from Riyadh, Dammam, or any Saudi city to Doha.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <Link href="/border-crossing">Border Crossing</Link> / <span>Qatar</span>
                </div>
            </section>

            {/* Content */}
            <section className="section-lg">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <h2 className="section-title">Salwa Border Crossing Transfers</h2>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
                                The Salwa border is the key land crossing between Saudi Arabia and the State of Qatar. Our professional taxi service provides a seamless connection between the two nations, offering door-to-door transfers that are both reliable and comfortable.
                            </p>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: 'var(--space-8)' }}>
                                Whether you are heading to Doha for a business meeting, a sporting event, or visiting family, our drivers ensure a smooth transit across the border. We handle all vehicle-related formalities, allowing you to relax during the journey.
                            </p>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="card" style={{ padding: '1.5rem' }}>
                                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Fixed Pricing</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>All-inclusive rates with no hidden border fees.</p>
                                </div>
                                <div className="card" style={{ padding: '1.5rem' }}>
                                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>24/7 Service</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Day or night pickups tailored to your schedule.</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                            <div style={{ background: 'var(--primary)', padding: '1.5rem', color: 'var(--white)' }}>
                                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Qatar Journey Checklist</h3>
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {[
                                        "Valid Passport (6+ months validity)",
                                        "Hayya Card or valid Qatar Visa (non-GCC)",
                                        "GCC ID for Saudi/Qatari nationals",
                                        "Confirmed pickup and drop-off addresses",
                                        "Flight details (if heading to Hamad Int'l Airport)",
                                    ].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                                            <CheckCircleIcon size={18} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                                    <CarIcon size={32} style={{ color: 'var(--secondary)', opacity: 0.3 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>Experience a Smooth Ride to Qatar</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.1rem' }}>
                        Ready to book your private transfer to Doha? WhatsApp us now for a quick quote and availability.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://wa.me/966501234567" className="btn btn-primary btn-lg">
                            <MessageIcon size={18} /> WhatsApp Qatar Quote
                        </a>
                        <Link href="/contact-us" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white' }}>Contact Us</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
