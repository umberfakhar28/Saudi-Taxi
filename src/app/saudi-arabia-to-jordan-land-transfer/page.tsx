import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircleIcon, MapPinIcon, CarIcon, ShieldIcon, MessageIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "Saudi Arabia to Jordan Taxi Service | Overland Border Crossing | Saudi Taxi",
    description: "Safe and reliable taxi service from Saudi Arabia to Jordan. Specialized in overland border crossings for Hajj pilgrims, families, and business travellers. Fixed rates and expert drivers.",
};

export default function SaudiToJordan() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Saudi Arabia to Jordan Transfer</h1>
                <p>
                    Dependable long-distance taxi service to the Jordan border and beyond. 
                    Expert drivers for a safe overland journey.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <Link href="/border-crossing">Border Crossing</Link> / <span>Jordan</span>
                </div>
            </section>

            {/* Intro */}
            <section className="section-lg">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <h2 className="section-title">Jordan Border Crossing (Durra)</h2>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
                                Travelling from Saudi Arabia to Jordan by land is a journey that requires comfort and reliability, especially for pilgrims and families. Our service connects major Saudi cities like Tabuk, Medina, and Jeddah directly to the Jordanian borders (Durra and Halat Ammar).
                            </p>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
                                We provide well-maintained vehicles equipped for long-distance travel, ensuring you arrive at the border refreshed. Our drivers are knowledgeable about the desert routes and border documentation requirements for a hassle-free experience.
                            </p>
                            
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                                {[
                                    "Specialized Hajj & Umrah overland support",
                                    "Private air-conditioned SUVs and Vans",
                                    "Transparent pricing with no border surcharges",
                                    "24/7 coordination and tracking",
                                ].map((text, i) => (
                                    <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'var(--text-main)', fontWeight: 500 }}>
                                        <CheckCircleIcon size={20} style={{ color: 'var(--secondary)' }} />
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-xl)', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <MapPinIcon size={64} style={{ color: 'var(--secondary)', opacity: 0.5 }} />
                            </div>
                            <h3 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '1.5rem' }}>Travel Requirements</h3>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                <p>• <strong>Visa:</strong> Ensure you have a valid Jordanian visa or are eligible for visa-free entry.</p>
                                <p>• <strong>Documents:</strong> Passport with at least 6 months validity from travel date.</p>
                                <p>• <strong>Health:</strong> Check latest border health protocols and insurance requirements.</p>
                                <p>• <strong>Timing:</strong> Border hours can vary; we recommend travel during daylight for smoothest processing.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'var(--primary-dark)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>Ready to Book Your Journey to Jordan?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.1rem' }}>
                        Contact our travel specialists today to get a customised quote for your overland transfer.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://wa.me/966501234567" className="btn btn-primary btn-lg">
                            <MessageIcon size={18} /> WhatsApp for Jordan Quote
                        </a>
                        <Link href="/contact-us" className="btn btn-outline btn-lg">Contact Us</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
