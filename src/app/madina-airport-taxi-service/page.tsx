import Link from "next/link";
import type { Metadata } from "next";
import { PlaneIcon, UserIcon, ClockIcon, TagIcon, ShieldIcon, MapPinIcon, ChevronRightIcon, MessageIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "Madinah Airport Taxi Service | Prince Mohammad Bin Abdulaziz Airport | Saudi Taxi",
    description: "Expert airport taxi services from Madinah Airport (MED) to hotels near Al-Masjid an-Nabawi and beyond. Fixed rates, licensed drivers, and 24/7 service.",
};

export default function MadinaAirportTaxi() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Madinah Airport Taxi Service</h1>
                <p>
                    Professional transfers from Prince Mohammad Bin Abdulaziz International Airport (MED). 
                    Reliable door-to-door service to your Madinah hotel.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <Link href="/airport-transfers">Airport Transfers</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <span>Madinah</span>
                </div>
            </section>

            {/* Intro */}
            <section className="section-lg">
                <div className="container" style={{ textAlign: 'center', maxWidth: '850px' }}>
                    <h2 className="section-title">Your Gateway to the Holy City of Madinah</h2>
                    <p className="section-subtitle">
                        Arriving at Prince Mohammad Bin Abdulaziz Airport should be the start of a peaceful visit. Our dedicated Madinah Airport taxi service ensures a smooth, respectful, and efficient journey to your destination.
                    </p>
                </div>
            </section>

            {/* Routes */}
            <section className="section-lg bg-light">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.25rem' }}>Direct Transfers to Madinah Hotels</h2>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '2rem' }}>
                                We specialize in transferring pilgrims and visitors from the airport to hotels around Al-Masjid an-Nabawi. Our drivers are courteous and knowledgeable, assisting with luggage and providing a comfortable ride after your flight.
                            </p>
                            <div className="card" style={{ borderLeft: '4px solid var(--secondary)' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>Service Features</h3>
                                <ul style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <li>• Meet & Greet at arrivals hall</li>
                                    <li>• Assistance with Hajj/Umrah luggage</li>
                                    <li>• Transparent pricing — no hidden border or airport fees</li>
                                    <li>• Multilingual drivers available</li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-1" style={{ gap: '1rem' }}>
                            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 700, color: 'var(--primary)' }}>Madinah Airport ↔ Al-Masjid an-Nabawi Area</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Typical Time: 20–30 mins</div>
                                </div>
                                <span style={{ fontWeight: 800, color: 'var(--secondary)' }}>Check Rates</span>
                            </div>
                            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 700, color: 'var(--primary)' }}>Madinah Airport ↔ Makkah City</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Typical Time: 4.5 hrs</div>
                                </div>
                                <span style={{ fontWeight: 800, color: 'var(--secondary)' }}>Check Rates</span>
                            </div>
                            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 700, color: 'var(--primary)' }}>Madinah Airport ↔ Yanbu</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Typical Time: 2.5 hrs</div>
                                </div>
                                <span style={{ fontWeight: 800, color: 'var(--secondary)' }}>Contact for Price</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'var(--primary)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>Reserve Your Madinah Airport Taxi</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Book now to ensure a professional driver is ready to welcome you to the City of the Prophet.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book Now</Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white' }}>
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
