import Link from "next/link";
import type { Metadata } from "next";
import { CarIcon, MapPinIcon, ShieldIcon, MessageIcon, ChevronRightIcon, CompassIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "Makkah to Madinah Taxi Service | Intercity Transfer | Saudi Taxi",
    description: "Reliable and comfortable taxi service from Makkah to Madinah. Enjoy a seamless intercity transfer with professional drivers and a range of premium vehicles.",
};

export default function MakkahToMadinah() {
    return (
        <main>
            <section className="page-hero">
                <h1>Makkah to Madinah Taxi Service</h1>
                <p>
                    Premium intercity transfers between the Holy Cities. 
                    Safe, comfortable, and reliable door-to-door transport for pilgrims and families.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <span>Makkah to Madinah</span>
                </div>
            </section>

            <section className="section-lg">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <h2 className="section-title">Pilgrim-Focused Intercity Transfers</h2>
                            <p style={{ lineHeight: 1.8, color: 'var(--text-body)', marginBottom: '1.5rem' }}>
                                The journey from Makkah to Madinah is one of the most significant routes for Umrah and Hajj pilgrims. We provide a dedicated taxi service that prioritizes your comfort and spiritual focus, delivering you safely from your Makkah hotel directly to your destination in Madinah.
                            </p>
                            <div className="card" style={{ background: 'var(--bg-subtle)' }}>
                                <h3 style={{ fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>Travel Information</h3>
                                <ul style={{ fontSize: '0.95rem', color: 'var(--text-muted)', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <li>• Distance: ~450 km</li>
                                    <li>• Duration: ~4.5 hours</li>
                                    <li>• Vehicle: Air-conditioned Sedan, SUV or Van</li>
                                    <li>• Routes: Choice of Haramain Expressway or historical route</li>
                                </ul>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <ShieldIcon size={32} style={{ color: 'var(--secondary)' }} />
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Transparent Pricing</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Request a quote for your journey. Includes fuel, tolls, and driver service.</p>
                                </div>
                            </div>
                            <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <CarIcon size={32} style={{ color: 'var(--secondary)' }} />
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Modern Fleet</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Travel in the latest models of Toyota Camry, GMC Yukon, or Toyota HiAce.</p>
                                </div>
                            </div>
                            <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <CompassIcon size={32} style={{ color: 'var(--secondary)' }} />
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Optional Badr Stop</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Customize your trip with a visit to the historic Badr battlefield upon request.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ background: 'var(--primary)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>Ready for Your Intercity Journey?</h2>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book Makkah to Madinah</Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white' }}>
                            WhatsApp Quote
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
