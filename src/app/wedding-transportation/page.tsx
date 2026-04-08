import Link from "next/link";
import type { Metadata } from "next";
import { UserIcon, ShieldIcon, StarIcon, MessageIcon, ChevronRightIcon, CarIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "Wedding Transportation Services Saudi Arabia | Luxury Event Transport | Saudi Taxi",
    description: "Premium wedding transportation services in Saudi Arabia. Luxury bridal cars, guest shuttles, and event logistics for your special day. Professional and elegant service.",
};

export default function WeddingTransportation() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Wedding Transportation Services</h1>
                <p>
                    Elegant and reliable transport for your special day. 
                    From luxury bridal cars to guest shuttles, we handle all the logistics with care.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <span>Wedding Transportation</span>
                </div>
            </section>

            {/* Content */}
            <section className="section-lg">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <h2 className="section-title">Luxury Transport for Unforgettable Weddings</h2>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                Your wedding day is a once-in-a-lifetime event, and every detail matters. Saudi Taxi provides premium wedding transportation services that combine elegance with absolute reliability. We ensure that you and your guests arrive in style, comfort, and perfect timing.
                            </p>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '2rem' }}>
                                Our fleet of premium sedans and SUVs is ideal for bridal parties, while our luxury vans and buses can seamlessly transport large groups of guests between hotels and venues.
                            </p>
                            <div className="card" style={{ background: 'var(--bg-subtle)', borderLeft: '4px solid var(--secondary)' }}>
                                <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>Bespoke Wedding Packages</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                                    We offer customized packages tailored to your specific schedule, guest count, and venue requirements across all major Saudi cities.
                                </p>
                            </div>
                        </div>
                        <div className="grid-1" style={{ gap: '1.5rem' }}>
                            <div className="card" style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ color: 'var(--accent)' }}><StarIcon size={24} /></div>
                                <div>
                                    <h4 style={{ marginBottom: '0.25rem' }}>Luxury Bridal Cars</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Make a grand entrance with our range of high-end executive sedans and SUVs.</p>
                                </div>
                            </div>
                            <div className="card" style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ color: 'var(--accent)' }}><UserIcon size={24} /></div>
                                <div>
                                    <h4 style={{ marginBottom: '0.25rem' }}>Guest Logistics</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Coordinated shuttle services to move guests safely between locations.</p>
                                </div>
                            </div>
                            <div className="card" style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ color: 'var(--accent)' }}><CarIcon size={24} /></div>
                                <div>
                                    <h4 style={{ marginBottom: '0.25rem' }}>Honeymoon Transfers</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Door-to-airport transfers in premium comfort for the newlyweds.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'var(--primary-dark)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>Let Us Handle the Wedding Logistics</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Ensure a smooth transportation experience on your wedding day. Contact us to discuss your requirements and receive a personalized quote.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link href="/contact-us" className="btn btn-primary btn-lg">Request a Quote</Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white' }}>
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
