import Link from "next/link";
import type { Metadata } from "next";
import { UserIcon, ShieldIcon, MessageIcon, ChevronRightIcon, CompassIcon, LandmarkIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "Educational Tours Transportation Saudi Arabia | Student Trips | Saudi Taxi",
    description: "Specialized transportation services for educational tours and student field trips in Saudi Arabia. Safe, reliable, and coordinated transport for schools and universities.",
};

export default function EducationalToursTransport() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Educational Tours Transportation</h1>
                <p>
                    Safe and inspiring journeys for students. 
                    Professional group transport solutions for educational trips across Saudi Arabia.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <span>Educational Tours</span>
                </div>
            </section>

            {/* Content */}
            <section className="section-lg">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <h2 className="section-title">Coordinated Transport for Learning</h2>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                Educational tours are vital for student growth, and having a reliable transportation partner is essential for a successful trip. Saudi Taxi specializes in providing safe, coordinated transport for schools, colleges, and universities visiting historic and educational sites across the Kingdom.
                            </p>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '2rem' }}>
                                We manage the logistics of moving large groups of students and faculty, ensuring everyone remains together, on schedule, and safe throughout the tour.
                            </p>
                            <div className="card" style={{ background: 'var(--bg-subtle)' }}>
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '1rem' }}>Tour Coordination</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                                    Our logistics team works closely with educational coordinators to plan efficient routes and schedule pickups across multiple locations if required.
                                </p>
                            </div>
                        </div>
                        <div className="grid-1" style={{ gap: '1.5rem' }}>
                            <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <LandmarkIcon size={32} style={{ color: 'var(--secondary)' }} />
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Historic Site Visits</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Safe transfers to museums, cultural centers, and archaeological landmarks.</p>
                                </div>
                            </div>
                            <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <CompassIcon size={32} style={{ color: 'var(--secondary)' }} />
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Guided Group Logistics</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Expert handling of large-capacity buses and coordinated multi-vehicle convoys.</p>
                                </div>
                            </div>
                            <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <ShieldIcon size={32} style={{ color: 'var(--secondary)' }} />
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Highest Safety Standards</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Background-checked drivers and vehicles with modern safety features.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'var(--primary)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>Plan Your Next Educational Tour</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Need reliable transport for your students? Contact us to discuss your itinerary and group size for a comprehensive quote.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <Link href="/contact-us" className="btn btn-primary btn-lg">Contact Form</Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white' }}>
                            <MessageIcon size={18} style={{ marginRight: '8px' }} /> WhatsApp Enquiries
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
