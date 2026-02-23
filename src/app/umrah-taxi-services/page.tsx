import Link from "next/link";
import type { Metadata } from "next";
import styles from "./umrah-taxi.module.css";

export const metadata: Metadata = {
    title: "Umrah Taxi Services | Reliable Transport for Umrah Pilgrims",
    description: "Professional Umrah taxi services in Makkah & Madinah. Airport transfers, inter-city travel, and Ziyarat tours. Book your reliable Umrah transport today.",
};

const services = [
    {
        icon: "✈️",
        title: "Airport Pickup & Drop-off",
        description: "Seamless transfers from Jeddah King Abdulaziz International Airport (KAIA) to your hotel in Makkah or Madinah. Our drivers track your flight and wait for you at arrivals.",
    },
    {
        icon: "🕌",
        title: "Makkah to Madinah Transfer",
        description: "Comfortable and direct transfers between the two Holy Cities. Travel in peace with experienced drivers who know the best routes for a smooth journey.",
    },
    {
        icon: "🏨",
        title: "Hotel to Haram Transfer",
        description: "Quick and convenient rides from your hotel to Masjid Al-Haram in Makkah or Masjid An-Nabawi in Madinah. Available round the clock.",
    },
    {
        icon: "🗺️",
        title: "Ziyarat Tours",
        description: "Visit the sacred and historical sites around Makkah and Madinah with our guided Ziyarat tours. Comfortable vehicles with knowledgeable drivers.",
    },
    {
        icon: "👨‍👩‍👧‍👦",
        title: "Family & Group Transport",
        description: "Spacious vehicles for families and groups. From sedans to large vans, we accommodate groups of all sizes with child seats available on request.",
    },
    {
        icon: "🔄",
        title: "Multi-Day Packages",
        description: "Book a dedicated vehicle and driver for the duration of your Umrah stay. Flexible scheduling, priority service, and significant savings on daily rates.",
    },
];

const process_steps = [
    {
        step: "01",
        title: "Book Online or Call",
        description: "Contact us via WhatsApp, phone, or fill out our booking form with your travel details and preferred vehicle.",
    },
    {
        step: "02",
        title: "Confirmation",
        description: "Receive instant confirmation with your driver's details, vehicle information, and pickup time.",
    },
    {
        step: "03",
        title: "Enjoy Your Ride",
        description: "Your driver arrives on time, assists with luggage, and ensures a comfortable journey to your destination.",
    },
    {
        step: "04",
        title: "Arrive Safely",
        description: "Reach your destination relaxed and ready. Rate your experience and book your return trip easily.",
    },
];

export default function UmrahTaxiServices() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Umrah Taxi Services</h1>
                <p>
                    Trusted transportation for Umrah pilgrims. Travel between Makkah, Madinah & Jeddah Airport with comfort, safety, and peace of mind.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Umrah Taxi Services</span>
                </div>
            </section>

            {/* Intro */}
            <section className="section-lg">
                <div className="container">
                    <div className={styles.introGrid}>
                        <div className={styles.introContent}>
                            <h2>Your Trusted Umrah Transport Partner</h2>
                            <p>
                                Performing Umrah is a sacred journey, and the last thing you should worry about is transportation. Our specialized Umrah taxi services ensure that every part of your journey — from the airport to the Holy Mosque and back — is smooth, comfortable, and stress-free.
                            </p>
                            <p>
                                With over 10 years of experience serving Umrah pilgrims from around the world, we understand the unique needs of pilgrims. Our drivers are not only professional and experienced, but they are also familiar with the sacred sites and can guide you throughout your stay.
                            </p>
                            <ul className={styles.checkList}>
                                <li>✅ Meet & greet at Jeddah Airport</li>
                                <li>✅ Multilingual drivers (Arabic, English, Urdu)</li>
                                <li>✅ Clean, air-conditioned vehicles</li>
                                <li>✅ 24/7 customer support</li>
                                <li>✅ Fixed prices with no hidden charges</li>
                                <li>✅ Free cancellation up to 24 hours</li>
                            </ul>
                            <div style={{ marginTop: '2rem' }}>
                                <Link href="/booking" className="btn btn-primary">
                                    Book Your Umrah Taxi
                                </Link>
                            </div>
                        </div>
                        <div className={styles.introImage}>
                            <div className={styles.imageCard}>
                                <div className={styles.imagePlaceholder}>
                                    <span style={{ fontSize: '5rem' }}>🕋</span>
                                    <p style={{ marginTop: '1rem', fontWeight: 600 }}>Serving the Holy Cities</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Our Umrah Transport Services</h2>
                    <p className="section-subtitle">
                        Comprehensive transportation solutions designed specifically for Umrah pilgrims. Every service is tailored to ensure your spiritual journey is hassle-free.
                    </p>
                    <div className="grid-3">
                        {services.map((service, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon}</div>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>{service.title}</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <p className="section-subtitle">
                        Booking your Umrah taxi is simple and straightforward. Follow these 4 easy steps.
                    </p>
                    <div className={styles.processGrid}>
                        {process_steps.map((step, i) => (
                            <div key={i} className={styles.processCard}>
                                <div className={styles.stepNumber}>{step.step}</div>
                                <h3 className={styles.processTitle}>{step.title}</h3>
                                <p className={styles.processDesc}>{step.description}</p>
                                {i < process_steps.length - 1 && <div className={styles.processConnector} />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)',
                padding: '5rem 0',
                textAlign: 'center',
            }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Start Your Umrah Journey With Us</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Join thousands of satisfied pilgrims who trust us for their Umrah transportation needs.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/booking" className="btn btn-primary btn-lg">
                            Book Now
                        </Link>
                        <Link href="/prices" className="btn btn-outline btn-lg">
                            View Prices
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
