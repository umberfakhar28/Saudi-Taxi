import Link from "next/link";
import type { Metadata } from "next";
import { PlaneIcon, UserIcon, ClockIcon, TagIcon, ShieldIcon, MapPinIcon, ChevronRightIcon, MessageIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "Taif Regional Airport Taxi Service | Saudi Taxi",
    description: "Reliable and professional airport taxi services from Taif Airport (TIF). Fixed rates, specialized in mountain routes and transfers to Makkah.",
};

export default function TaifAirportTaxi() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Taif Airport Taxi Service</h1>
                <p>
                    Premium transports from Taif Regional Airport (TIF). 
                    Safe, reliable, and specialized in mountain routes to Makkah.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <Link href="/airport-transfers">Airport Transfers</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <span>Taif</span>
                </div>
            </section>

            {/* Content */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Reliable Transfers from Taif Regional Airport</h2>
                    <div className="grid-2">
                        <div>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                Taif Airport serves as a key gateway for domestic and international travellers heading to the mountain city and the Holy City of Makkah. Our Taif Airport taxi service provides a comfortable and secure way to reach your destination.
                            </p>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '2rem' }}>
                                Given the mountainous terrain of Taif, we use powerful, well-maintained vehicles and experienced drivers who are experts in navigating the region&apos;s roads safely.
                            </p>
                            <div className="card" style={{ background: 'var(--bg-subtle)' }}>
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '1rem' }}>Mountain Route Experts</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                                    Experience the scenic drive from Taif to Makkah or Madinah with drivers who prioritize your safety and comfort on every climb and descent.
                                </p>
                            </div>
                        </div>
                        <div style={{ padding: '0 2rem' }}>
                            <h3 style={{ borderBottom: '2px solid var(--secondary)', display: 'inline-block', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Popular Taif Routes</h3>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-100)', paddingBottom: '0.5rem' }}>
                                    <span>Taif Airport ↔ Makkah Hotels</span>
                                    <span style={{ fontWeight: 700 }}>~1.5 hrs</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-100)', paddingBottom: '0.5rem' }}>
                                    <span>Taif Airport ↔ Taif City Center</span>
                                    <span style={{ fontWeight: 700 }}>~20 mins</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-100)', paddingBottom: '0.5rem' }}>
                                    <span>Taif Airport ↔ Al Shafa / Al Hada</span>
                                    <span style={{ fontWeight: 700 }}>~45 mins</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'var(--primary-dark)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>Book Your Taif Airport Transfer</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Safe and reliable mountain transfers. WhatsApp us for a custom quote or use our online form.
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
