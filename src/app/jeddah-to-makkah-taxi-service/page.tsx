import Link from "next/link";
import type { Metadata } from "next";
import styles from "./jeddah-makkah.module.css";

export const metadata: Metadata = {
    title: "Jeddah to Makkah Taxi Service | Direct Transfer & Fixed Prices",
    description: "Book a reliable Jeddah to Makkah taxi service. Direct transfers from Jeddah Airport or city center to Makkah. Fixed prices, professional drivers, 24/7 service.",
};

const features = [
    {
        icon: "💰",
        title: "Fixed Prices",
        description: "Know exactly what you'll pay before you ride. No surge pricing, no hidden fees, just honest transparent pricing.",
    },
    {
        icon: "⏱️",
        title: "On-Time Pickup",
        description: "Our drivers arrive early and wait for you. We also track flight arrivals so we're ready when you land.",
    },
    {
        icon: "🛡️",
        title: "Safe & Insured",
        description: "All vehicles are fully insured, regularly serviced, and equipped with modern safety features for peace of mind.",
    },
    {
        icon: "🧳",
        title: "Luggage Assistance",
        description: "Our drivers help with your luggage from pickup to drop-off. Spacious boot space for all your bags and belongings.",
    },
    {
        icon: "🌐",
        title: "Multilingual Drivers",
        description: "Our drivers speak Arabic, English, and Urdu. Communication is never a problem for international pilgrims.",
    },
    {
        icon: "📱",
        title: "Easy Booking",
        description: "Book via WhatsApp, phone call, or our online form. Instant confirmation with driver details sent to you.",
    },
];

const pricingOptions = [
    {
        vehicle: "Standard Sedan",
        capacity: "Up to 3 passengers",
        airportToMakkah: "150 SAR",
        cityToMakkah: "200 SAR",
        features: ["Air Conditioning", "Luggage Space", "Water Bottles", "Phone Charger"],
        popular: false,
    },
    {
        vehicle: "Premium Sedan",
        capacity: "Up to 3 passengers",
        airportToMakkah: "250 SAR",
        cityToMakkah: "300 SAR",
        features: ["Luxury Vehicle", "Extra Leg Room", "WiFi", "Refreshments", "Priority Service"],
        popular: true,
    },
    {
        vehicle: "Family Van / SUV",
        capacity: "Up to 6 passengers",
        airportToMakkah: "350 SAR",
        cityToMakkah: "400 SAR",
        features: ["Spacious Interior", "Extra Luggage", "Child Seats Available", "Water & Snacks"],
        popular: false,
    },
];

export default function JeddahToMakkah() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Jeddah to Makkah Taxi Service</h1>
                <p>
                    Direct, comfortable transfers from Jeddah Airport or city center to Makkah. Fixed prices, professional drivers, available 24/7.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Jeddah to Makkah Taxi Service</span>
                </div>
            </section>

            {/* Route Info */}
            <section className="section-lg">
                <div className="container">
                    <div className={styles.routeInfo}>
                        <div className={styles.routeContent}>
                            <h2>Your Direct Route from Jeddah to Makkah</h2>
                            <p>
                                The journey from Jeddah to Makkah is approximately 80 kilometers and takes around 1 to 1.5 hours depending on traffic conditions. Our experienced drivers take the fastest and most comfortable routes, ensuring you arrive at your destination relaxed and on time.
                            </p>
                            <p>
                                Whether you&apos;re arriving at King Abdulaziz International Airport (KAIA) or from anywhere in Jeddah city, we provide door-to-door pickup and drop-off service directly to your hotel in Makkah.
                            </p>
                            <div className={styles.routeHighlights}>
                                <div className={styles.routeCard}>
                                    <h4>📍 Distance</h4>
                                    <p>~80 km</p>
                                </div>
                                <div className={styles.routeCard}>
                                    <h4>⏱️ Duration</h4>
                                    <p>1–1.5 hours</p>
                                </div>
                                <div className={styles.routeCard}>
                                    <h4>💰 Starting From</h4>
                                    <p>150 SAR</p>
                                </div>
                                <div className={styles.routeCard}>
                                    <h4>🕐 Available</h4>
                                    <p>24/7</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Why Choose Our Jeddah to Makkah Taxi?</h2>
                    <p className="section-subtitle">
                        We go above and beyond to make your journey from Jeddah to Makkah as comfortable and worry-free as possible.
                    </p>
                    <div className="grid-3">
                        {features.map((feature, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>{feature.icon}</div>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1.15rem', marginBottom: '0.75rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Jeddah to Makkah Taxi Prices</h2>
                    <p className="section-subtitle">
                        Choose the vehicle that suits your needs. All prices are fixed with no hidden charges.
                    </p>
                    <div className="grid-3">
                        {pricingOptions.map((option, i) => (
                            <div key={i} className={`${styles.priceCard} ${option.popular ? styles.priceCardPopular : ''}`}>
                                {option.popular && <div className={styles.popularBadge}>Most Popular</div>}
                                <h3 className={styles.vehicleName}>{option.vehicle}</h3>
                                <p className={styles.vehicleCapacity}>{option.capacity}</p>
                                <div className={styles.priceRow}>
                                    <span>From Airport:</span>
                                    <strong>{option.airportToMakkah}</strong>
                                </div>
                                <div className={styles.priceRow}>
                                    <span>From Jeddah City:</span>
                                    <strong>{option.cityToMakkah}</strong>
                                </div>
                                <ul className={styles.featureList}>
                                    {option.features.map((f, j) => (
                                        <li key={j}>✓ {f}</li>
                                    ))}
                                </ul>
                                <Link href="/booking" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                                    Book This Vehicle
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                        <details className={styles.faqItem}>
                            <summary className={styles.faqQuestion}>How long does it take from Jeddah Airport to Makkah?</summary>
                            <p className={styles.faqAnswer}>The journey typically takes 1 to 1.5 hours depending on traffic conditions. During Hajj season, it may take slightly longer.</p>
                        </details>
                        <details className={styles.faqItem}>
                            <summary className={styles.faqQuestion}>Can I book a return trip from Makkah to Jeddah?</summary>
                            <p className={styles.faqAnswer}>Yes! You can book a round-trip service. Many customers book both their arrival and departure transfers together for convenience and savings.</p>
                        </details>
                        <details className={styles.faqItem}>
                            <summary className={styles.faqQuestion}>What if my flight is delayed?</summary>
                            <p className={styles.faqAnswer}>Don&apos;t worry — we track all incoming flights. If your flight is delayed, your driver will adjust the pickup time automatically at no extra charge.</p>
                        </details>
                        <details className={styles.faqItem}>
                            <summary className={styles.faqQuestion}>Do you provide child seats?</summary>
                            <p className={styles.faqAnswer}>Yes, child seats and booster seats are available upon request. Please mention this requirement when booking so we can prepare them in advance.</p>
                        </details>
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
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Book Your Jeddah to Makkah Transfer</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Reliable, comfortable, and affordable. Book your transfer today and travel stress-free.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/booking" className="btn btn-primary btn-lg">
                            Book Now
                        </Link>
                        <a href="https://wa.me/966123456789" className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
