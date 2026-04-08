import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircleIcon, MapPinIcon, CarIcon, ShieldIcon, MessageIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "Saudi Arabia to UAE Taxi | Land Transfer to Dubai & Abu Dhabi | Saudi Taxi",
    description: "Premium taxi service from Saudi Arabia to UAE (Dubai, Abu Dhabi). Safe overland transfers via Al Batha border crossing. Comfortable family vehicles and professional drivers.",
};

export default function SaudiToUae() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Saudi Arabia to UAE Transfer</h1>
                <p>
                    Premium door-to-door taxi service to Dubai and Abu Dhabi. 
                    Safe, comfortable, and efficient overland travel across the Al Batha border.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <Link href="/border-crossing">Border Crossing</Link> / <span>UAE</span>
                </div>
            </section>

            {/* Content */}
            <section className="section-lg">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <h2 className="section-title">Saudi to UAE Land Transfers</h2>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
                                Connecting the two largest economies in the GCC, our Saudi to UAE land transport service is the preferred choice for business travellers and families alike. We provide direct transfers via the Al Batha / Ghuwaifat border crossing, ensuring a seamless transition from Saudi Arabia to Dubai or Abu Dhabi.
                            </p>
                            
                            <div style={{ marginTop: '2rem' }}>
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '1rem' }}>Why Choose Our UAE Transfer?</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {[
                                        "Professional chauffeurs with GCC-wide experience",
                                        "Modern fleet of SUVs and luxury sedans",
                                        "Assistance with customs and immigration procedures",
                                        "Fixed, transparent pricing inclusive of all border fees",
                                        "Direct hotel-to-hotel or airport-to-hotel service",
                                    ].map((li, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '1rem', color: 'var(--text-main)' }}>
                                            <span style={{ color: 'var(--secondary)', fontWeight: 800 }}>✓</span>
                                            {li}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ background: 'var(--bg-subtle)', boxShadow: 'var(--shadow-md)' }}>
                            <h3 style={{ borderBottom: '1px solid var(--gray-200)', paddingBottom: '1rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Route Snapshot</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <MapPinIcon size={20} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Main Border Crossing</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Al Batha (KSA) / Ghuwaifat (UAE)</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <ShieldIcon size={20} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Documentation</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Visa for UAE (if not GCC national) & Passport</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <CarIcon size={20} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Fleet Options</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sedans, Premium SUVs, Large Vans</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--white)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontStyle: 'italic', borderLeft: '3px solid var(--secondary)' }}>
                                Note: We recommend booking at least 72 hours in advance for UAE transfers.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'var(--primary)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>Plan Your Trip to Dubai or Abu Dhabi</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.1rem' }}>
                        Ready for a comfortable ride across the border? Send us a message on WhatsApp for instant rates.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://wa.me/966501234567" className="btn btn-primary btn-lg">
                            <MessageIcon size={18} /> WhatsApp UAE Quote
                        </a>
                        <Link href="/quote" className="btn btn-outline btn-lg">Contact Form</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
