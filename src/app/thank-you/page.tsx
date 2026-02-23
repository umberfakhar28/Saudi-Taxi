import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Thank You | Saudi Taxi Service",
    description: "Thank you for booking with Saudi Taxi. Your booking has been received and we will confirm shortly.",
};

export default function ThankYou() {
    return (
        <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            <section style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8rem 1rem',
                background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 60%, var(--primary-light) 100%)',
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'center',
            }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(var(--secondary) 1px, transparent 1px)',
                    backgroundSize: '40px 40px', opacity: 0.05,
                }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
                    <div style={{
                        width: '100px', height: '100px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--secondary), var(--secondary-light))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 2rem',
                        fontSize: '3rem',
                        boxShadow: '0 8px 30px rgba(212,175,55,0.4)',
                        animation: 'pulse 2s infinite',
                    }}>
                        ✅
                    </div>
                    <h1 style={{ color: 'var(--white)', fontSize: '3rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                        Thank You!
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.3rem', marginBottom: '1rem' }}>
                        Your booking request has been successfully received.
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginBottom: '3rem', lineHeight: '1.8' }}>
                        Our team will review your request and send you a confirmation within <strong style={{ color: 'var(--secondary)' }}>30 minutes</strong> via WhatsApp or email. Please keep your phone nearby.
                    </p>

                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '2rem',
                        border: '1px solid rgba(255,255,255,0.15)',
                        marginBottom: '2.5rem',
                    }}>
                        <h3 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>What Happens Next?</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                            {[
                                { step: "1", text: "Our team reviews your booking details" },
                                { step: "2", text: "We assign a dedicated driver to your trip" },
                                { step: "3", text: "You receive confirmation via WhatsApp/Email" },
                                { step: "4", text: "Your driver contacts you 1 hour before pickup" },
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{
                                        width: '36px', height: '36px', borderRadius: '50%',
                                        background: 'var(--secondary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 700, color: 'var(--primary)', flexShrink: 0,
                                        fontSize: '0.9rem',
                                    }}>
                                        {item.step}
                                    </div>
                                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://wa.me/966501234567" className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
                            💬 WhatsApp Us
                        </a>
                        <Link href="/" className="btn btn-outline btn-lg">
                            Back to Home
                        </Link>
                    </div>

                    <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '2rem', fontSize: '0.9rem' }}>
                        Questions? Call us: <a href="tel:+966501234567" style={{ color: 'var(--secondary)' }}>+966 50 123 4567</a>
                    </p>
                </div>
            </section>

            {/* Related Services */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Explore Our Other Services</h2>
                    <div className="grid-3" style={{ maxWidth: '950px', margin: '0 auto' }}>
                        {[
                            { icon: "🌙", title: "Ziyarat Tours", link: "/ziyarat-services-in-saudi-arabia", desc: "Guided visits to holy sites in Makkah & Madinah" },
                            { icon: "🌆", title: "Jeddah City Tour", link: "/jeddah-city-tour-services-in-saudi-arabia", desc: "Explore the vibrant coastal city of Jeddah" },
                            { icon: "🏔️", title: "AlUla Tour", link: "/reliable-alula-tour-taxi-service-in-saudi-arabia", desc: "Ancient wonders of northwestern Saudi Arabia" },
                        ].map((svc, i) => (
                            <Link key={i} href={svc.link} className="card" style={{ textAlign: 'center', textDecoration: 'none' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{svc.icon}</div>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '0.4rem' }}>{svc.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{svc.desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
