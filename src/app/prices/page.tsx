import Link from "next/link";
import type { Metadata } from "next";
import styles from "./prices.module.css";

export const metadata: Metadata = {
    title: "Taxi Prices & Packages | Makkah Taxi Service",
    description: "View our transparent taxi prices for Makkah, Jeddah & Madinah. Fixed rates, no hidden charges. Airport transfers, inter-city travel, and Umrah packages.",
};

const standardRoutes = [
    { from: "Jeddah Airport (KAIA)", to: "Makkah", sedan: "150 SAR", suv: "250 SAR", van: "350 SAR" },
    { from: "Jeddah City", to: "Makkah", sedan: "200 SAR", suv: "300 SAR", van: "400 SAR" },
    { from: "Makkah", to: "Madinah", sedan: "600 SAR", suv: "800 SAR", van: "1000 SAR" },
    { from: "Madinah Airport", to: "Madinah City", sedan: "80 SAR", suv: "120 SAR", van: "180 SAR" },
    { from: "Makkah", to: "Jeddah Airport", sedan: "150 SAR", suv: "250 SAR", van: "350 SAR" },
    { from: "Makkah", to: "Jeddah City", sedan: "200 SAR", suv: "300 SAR", van: "400 SAR" },
    { from: "Madinah", to: "Makkah", sedan: "600 SAR", suv: "800 SAR", van: "1000 SAR" },
    { from: "Makkah", to: "Taif", sedan: "250 SAR", suv: "350 SAR", van: "450 SAR" },
];

const packages = [
    {
        name: "Basic Umrah Package",
        price: "750 SAR",
        duration: "3 Days",
        features: [
            "Airport pickup from Jeddah",
            "Transfer to Makkah hotel",
            "Makkah to Madinah transfer",
            "Drop-off at Madinah Airport",
            "Standard sedan vehicle",
        ],
        recommended: false,
    },
    {
        name: "Premium Umrah Package",
        price: "1,200 SAR",
        duration: "5 Days",
        features: [
            "Airport pickup (Meet & Greet)",
            "Transfer to Makkah hotel",
            "Daily hotel-to-Haram shuttle",
            "Makkah to Madinah transfer",
            "Ziyarat tour in Madinah",
            "Drop-off at Madinah Airport",
            "Premium sedan vehicle",
            "24/7 on-call driver",
        ],
        recommended: true,
    },
    {
        name: "Family Umrah Package",
        price: "1,800 SAR",
        duration: "7 Days",
        features: [
            "Airport pickup (VIP lane)",
            "SUV/Van for families",
            "Transfer to Makkah hotel",
            "Daily hotel-to-Haram shuttle",
            "Makkah to Madinah transfer",
            "Ziyarat tours (Makkah & Madinah)",
            "Drop-off at any airport",
            "Child seats included",
            "Dedicated driver for entire stay",
        ],
        recommended: false,
    },
];

const ziyaratPrices = [
    { tour: "Makkah Ziyarat Tour", duration: "3-4 hours", price: "200 SAR", details: "Visit historical sites around Makkah including Jabal Al-Noor, Jabal Thawr, and more." },
    { tour: "Madinah Ziyarat Tour", duration: "3-4 hours", price: "200 SAR", details: "Visit Masjid Quba, Uhud Mountain, Qiblatain Mosque, and other significant sites." },
    { tour: "Combined Ziyarat Package", duration: "Both cities", price: "350 SAR", details: "Full Ziyarat tours in both Makkah and Madinah. Best value for comprehensive tours." },
];

export default function Prices() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Prices & Packages</h1>
                <p>
                    Transparent, fixed pricing with no hidden charges. Choose the service that fits your needs and budget.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Prices</span>
                </div>
            </section>

            {/* Price Note */}
            <section style={{ background: 'var(--accent)', padding: '2rem 0' }}>
                <div className="container text-center">
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1rem' }}>
                        💡 All prices are <strong>fixed and final</strong> — no meters, no surge pricing, no hidden fees. Prices include fuel, tolls, and driver service.
                    </p>
                </div>
            </section>

            {/* Route Prices Table */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Standard Route Prices</h2>
                    <p className="section-subtitle">
                        Fixed taxi fares for the most popular routes. Prices are per trip (one-way), not per person.
                    </p>
                    <div className={styles.tableWrapper}>
                        <table className={styles.priceTable}>
                            <thead>
                                <tr>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Sedan <span className={styles.thSub}>(1-3 pax)</span></th>
                                    <th>SUV <span className={styles.thSub}>(1-5 pax)</span></th>
                                    <th>Van <span className={styles.thSub}>(1-9 pax)</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {standardRoutes.map((route, i) => (
                                    <tr key={i}>
                                        <td>{route.from}</td>
                                        <td>{route.to}</td>
                                        <td className={styles.priceCell}>{route.sedan}</td>
                                        <td className={styles.priceCell}>{route.suv}</td>
                                        <td className={styles.priceCell}>{route.van}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Umrah Packages */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Umrah Transport Packages</h2>
                    <p className="section-subtitle">
                        Save money with our all-inclusive Umrah transport packages. Everything bundled for a hassle-free journey.
                    </p>
                    <div className="grid-3">
                        {packages.map((pkg, i) => (
                            <div key={i} className={`${styles.packageCard} ${pkg.recommended ? styles.packageRecommended : ''}`}>
                                {pkg.recommended && <div className={styles.recommendedBadge}>Best Value</div>}
                                <h3 className={styles.packageName}>{pkg.name}</h3>
                                <div className={styles.packagePrice}>{pkg.price}</div>
                                <div className={styles.packageDuration}>{pkg.duration} package</div>
                                <ul className={styles.packageFeatures}>
                                    {pkg.features.map((feature, j) => (
                                        <li key={j}>
                                            <span className={styles.checkmark}>✓</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/booking" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                                    Book This Package
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ziyarat Prices */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Ziyarat Tour Prices</h2>
                    <p className="section-subtitle">
                        Explore the historical and sacred sites of Makkah and Madinah with our guided Ziyarat tours.
                    </p>
                    <div className="grid-3">
                        {ziyaratPrices.map((tour, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center' }}>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{tour.tour}</h3>
                                <div style={{
                                    fontSize: '2rem',
                                    fontWeight: 700,
                                    color: 'var(--secondary)',
                                    fontFamily: 'var(--font-heading)',
                                    margin: '1rem 0',
                                }}>{tour.price}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                    Duration: {tour.duration}
                                </div>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.9rem' }}>{tour.details}</p>
                                <Link href="/booking" className="btn btn-outline-gold btn-sm" style={{ marginTop: '1rem' }}>
                                    Book Tour
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Custom Quote */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)',
                padding: '5rem 0',
                textAlign: 'center',
            }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Need a Custom Quote?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Have a specific route or requirement not listed above? Contact us for a personalized quote.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/contact-us" className="btn btn-primary btn-lg">
                            Get a Quote
                        </Link>
                        <a href="https://wa.me/966123456789" className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">
                            💬 WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
