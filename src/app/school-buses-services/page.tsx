import Link from "next/link";
import type { Metadata } from "next";
import { UserIcon, ShieldIcon, MessageIcon, ChevronRightIcon, ClockIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "School Bus Services Saudi Arabia | Safe Student Transport | Saudi Taxi",
    description: "Safe and reliable school bus services in Saudi Arabia. Professional drivers, monitored routes, and modern fleet ensuring the highest standards of student safety.",
};

export default function SchoolBusesServices() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>School Bus Services</h1>
                <p>
                    Safe, reliable student transportation across Saudi Arabia. 
                    Prioritizing safety, punctuality, and comfort for the next generation.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <span>School Bus Services</span>
                </div>
            </section>

            {/* Safety Commitment */}
            <section className="section-lg">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <h2 className="section-title">Our Commitment to Student Safety</h2>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                Saudi Taxi provides comprehensive school bus services that parents and educational institutions can trust. We understand that student transportation is a serious responsibility, which is why we implement the highest safety standards in the industry.
                            </p>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '2rem' }}>
                                Every vehicle in our dedicated school fleet undergoes rigorous daily inspections and is operated by experienced, background-checked drivers who are specifically trained for student transport.
                            </p>
                        </div>
                        <div className="grid-1" style={{ gap: '1.5rem' }}>
                            <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <ShieldIcon size={32} style={{ color: 'var(--accent)' }} />
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Monitored Routes</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>All our school buses are equipped with real-time tracking for peace of mind.</p>
                                </div>
                            </div>
                            <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <UserIcon size={32} style={{ color: 'var(--accent)' }} />
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Trained Drivers</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>Professional drivers with specialized training in student safety and care.</p>
                                </div>
                            </div>
                            <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <ClockIcon size={32} style={{ color: 'var(--accent)' }} />
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Strict Punctuality</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>Reliable pick-up and drop-off times ensuring students never miss a class.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'var(--primary)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>Reliable Transport for Educational Institutions</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Partner with Saudi Taxi for your school&apos;s transportation needs. Contact us to discuss route planning and specialized fleet options.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <Link href="/contact-us" className="btn btn-primary btn-lg">Contact Form</Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white' }}>
                            <MessageIcon size={18} style={{ marginRight: '8px' }} /> WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
