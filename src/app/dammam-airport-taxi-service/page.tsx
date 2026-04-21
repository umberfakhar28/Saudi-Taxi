import Link from "next/link";
import type { Metadata } from "next";
import { PlaneIcon, UserIcon, ClockIcon, TagIcon, ShieldIcon, MapPinIcon, ChevronRightIcon, MessageIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "King Fahd International Airport (KFIA) Taxi Service | Dammam | Saudi Taxi",
    description: "Reliable airport taxi services from Dammam King Fahd International Airport (KFIA). Professional drivers, and 24/7 coverage for the Eastern Province.",
};

export default function DammamAirportTaxi() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Dammam Airport Taxi Service</h1>
                <p>
                    Premium transports from King Fahd International Airport (KFIA). 
                    The most reliable taxi service in the Eastern Province, available 24/7.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <Link href="/airport-transfers">Airport Transfers</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <span>Dammam</span>
                </div>
            </section>

            {/* Content */}
            <section className="section-lg">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <h2 className="section-title">King Fahd International Airport (KFIA) Transfers</h2>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                King Fahd International Airport is the world&apos;s largest airport by land area, and navigating transport upon arrival shouldn&apos;t be a challenge. We provide dedicated taxi services from KFIA to Dammam, Khobar, Jubail, and Dahrhan.
                            </p>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '2rem' }}>
                                Our drivers are professional, highly experienced with Eastern Province routes, and committed to providing a safe, punctual, and comfortable journey for every passenger.
                            </p>
                            <div className="card" style={{ background: 'var(--bg-subtle)', border: 'none' }}>
                                <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '1rem' }}>Service Highlights</h3>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
                                    <li>✓ 24/7 Availability for all flight arrivals</li>
                                    <li>✓ Professional service to Dammam, Khobar, and Jubail</li>
                                    <li>✓ Flight tracking for timely pickups</li>
                                    <li>✓ Large SUVs for families and groups</li>
                                </ul>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="card">
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Dammam City</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Rapid transfers to all districts in Dammam including the Corniche and business centers.</p>
                            </div>
                            <div className="card">
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Al Khobar</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Reliable taxi services to Khobar hotels, shopping malls, and residential areas.</p>
                            </div>
                            <div className="card">
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Jubail Industrial City</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Dedicated corporate and private transfers to the industrial and residential sectors of Jubail.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'var(--primary)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>Hassle-Free Dammam Airport Pickup</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Pre-book your Dammam Airport taxi now and have our driver waiting for you at the arrivals hall.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book Now</Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white' }}>
                             WhatsApp Quote
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
