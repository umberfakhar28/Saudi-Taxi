import Link from "next/link";
import type { Metadata } from "next";
import { UserIcon, ShieldIcon, ClockIcon, MessageIcon, ChevronRightIcon, CarIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "Corporate Transportation Services Saudi Arabia | Executive Travel | Saudi Taxi",
    description: "Premium corporate transportation services in Saudi Arabia. Executive transfers, staff shuttles, and event transport with professional drivers and high-end vehicles.",
};

const solutions = [
    {
        title: "Executive Transfers",
        desc: "VIP airport pickups and hotel-to-meeting transfers for your key stakeholders and executives."
    },
    {
        title: "Staff Shuttles",
        desc: "Reliable, scheduled transportation for your employees across major Saudi cities."
    },
    {
        title: "Corporate Events",
        desc: "Coordinated transport for large-scale conferences, trade shows, and business events."
    }
];

export default function CorporateTransportation() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Corporate Transportation Services</h1>
                <p>
                    Premium business travel solutions across Saudi Arabia. 
                    Professional, punctual, and tailored to your company&apos;s needs.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <span>Corporate Transportation</span>
                </div>
            </section>

            {/* Intro */}
            <section className="section-lg">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <h2 className="section-title">Professional Business Travel Solutions</h2>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                Saudi Taxi provides comprehensive corporate transportation services designed to meet the high standards of modern business. We understand that punctuality, professionalism, and reliability are the cornerstones of successful corporate travel.
                            </p>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '2rem' }}>
                                From individual executive transfers in luxury sedans to group transport for large events, we manage every detail of the journey so you can focus on your business objectives.
                            </p>
                        </div>
                        <div className="grid-1" style={{ gap: '1.5rem' }}>
                            {solutions.map((s, i) => (
                                <div key={i} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ color: 'var(--secondary)', flexShrink: 0 }}>
                                        <ShieldIcon size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{s.title}</h3>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Corporate */}
            <section className="section-lg bg-light">
                <div className="container">
                    <div className="section-header centered">
                        <h2 className="section-title">Why Partner with Saudi Taxi?</h2>
                    </div>
                    <div className="grid-3">
                        <div className="card text-center">
                            <ClockIcon size={40} style={{ color: 'var(--accent)', marginBottom: '1.5rem' }} />
                            <h3>Strict Punctuality</h3>
                            <p style={{ fontSize: '0.9rem' }}>We ensure your team and guests arrive on time, every time, with zero delays.</p>
                        </div>
                        <div className="card text-center">
                            <UserIcon size={40} style={{ color: 'var(--accent)', marginBottom: '1.5rem' }} />
                            <h3>Professional Drivers</h3>
                            <p style={{ fontSize: '0.9rem' }}>Ministry-licensed chauffeurs with exceptional local knowledge and etiquette.</p>
                        </div>
                        <div className="card text-center">
                            <CarIcon size={40} style={{ color: 'var(--accent)', marginBottom: '1.5rem' }} />
                            <h3>Diverse Fleet</h3>
                            <p style={{ fontSize: '0.9rem' }}>A wide range of premium vehicles from luxury sedans to high-capacity shuttle buses.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'var(--primary)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>Inquire About Corporate Accounts</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Need customized transport solutions for your business? Contact our corporate team for bespoke quotes and account details.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <Link href="/contact-us" className="btn btn-primary btn-lg">Contact Form</Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white' }}>
                            <MessageIcon size={18} style={{ marginRight: '8px' }} /> WhatsApp Business
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
