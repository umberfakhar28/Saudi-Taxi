import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Umrah Transport Package | Complete Transportation for Umrah | Saudi Taxi",
    description: "Complete Umrah transport packages covering airport pickup, Makkah & Madinah hotel transfers, Ziyarat tours and inter-city travel. All-inclusive fixed pricing.",
};

const packages = [
    {
        title: "Basic Umrah Package",
        duration: "7 Days",
        price: "850 SAR",
        icon: "🌙",
        includes: [
            "Airport pickup from Jeddah",
            "Makkah hotel drop-off",
            "3 Ziyarat trips in Makkah",
            "Return airport transfer",
            "24/7 driver availability",
        ],
        popular: false,
    },
    {
        title: "Standard Umrah Package",
        duration: "14 Days",
        price: "1,500 SAR",
        icon: "🕌",
        includes: [
            "Airport pickup from Jeddah",
            "Makkah ↔ Madinah transfer",
            "3 Ziyarat trips in Makkah",
            "3 Ziyarat trips in Madinah",
            "Hotel transfers included",
            "Return airport transfer",
            "24/7 driver availability",
        ],
        popular: true,
    },
    {
        title: "Premium Umrah Package",
        duration: "21 Days",
        price: "2,200 SAR",
        icon: "⭐",
        includes: [
            "Airport pickup from Jeddah",
            "Makkah ↔ Madinah transfer",
            "5 Ziyarat trips in Makkah",
            "5 Ziyarat trips in Madinah",
            "Taif day trip",
            "All hotel transfers",
            "Return airport transfer",
            "Luxury SUV vehicle",
            "24/7 dedicated driver",
        ],
        popular: false,
    },
];

const includes = [
    { icon: "✈️", title: "Airport Transfers", description: "Pickup and drop-off at Jeddah KAIA with meet & greet and flight tracking." },
    { icon: "🏨", title: "Hotel Transfers", description: "All transfers to and from your hotel in Makkah and Madinah included." },
    { icon: "🌙", title: "Ziyarat Tours", description: "Guided visits to the holy sites of Makkah and Madinah with your dedicated driver." },
    { icon: "🛣️", title: "Inter-City Travel", description: "Comfortable transfers between Makkah and Madinah at your preferred times." },
    { icon: "👨‍✈️", title: "Dedicated Driver", description: "One driver assigned to your group for the entire package duration." },
    { icon: "📱", title: "24/7 Support", description: "Round-the-clock support via WhatsApp, phone or our online chat." },
];

const steps = [
    { step: "1", title: "Choose Package", description: "Select the Umrah package that suits your duration and group size." },
    { step: "2", title: "Provide Travel Details", description: "Share your flight details, hotel name, and travel dates with us." },
    { step: "3", title: "Receive Confirmation", description: "Get instant confirmation with your driver's details and contact number." },
    { step: "4", title: "Travel with Peace of Mind", description: "Your driver handles all transport — focus on your Umrah journey." },
];

const faqs = [
    { q: "Can the package be customized?", a: "Yes! We can tailor any package to fit your specific travel dates, group size and preferences. Contact us for a custom quote." },
    { q: "How many people does the package cover?", a: "Our standard packages cover 1-4 passengers. For larger groups, we offer minivans and multiple vehicle options — please request a group quote." },
    { q: "What if my flight is delayed?", a: "We monitor all arriving flights and adjust your pickup time accordingly at no extra charge." },
    { q: "Do you provide child seats?", a: "Yes, child seats are available upon request. Please mention this when booking." },
    { q: "What payment methods do you accept?", a: "We accept cash (SAR), bank transfer and major credit cards. Payment can be made upon arrival or in advance." },
];

export default function UmrahTransportPackage() {
    return (
        <main>
            <section className="page-hero">
                <h1>Umrah Transport Package</h1>
                <p>Complete, all-inclusive transportation packages designed for Umrah pilgrims — from arrival to departure.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Umrah Transport Package</span>
                </div>
            </section>

            {/* What's Included */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">What&apos;s Included in Every Package</h2>
                    <p className="section-subtitle">We take care of all your transport needs so you can focus entirely on your spiritual journey.</p>
                    <div className="grid-3">
                        {includes.map((item, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7', margin: 0 }}>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Packages */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Choose Your Umrah Package</h2>
                    <p className="section-subtitle">All prices are per vehicle (1-4 passengers). Contact us for group pricing.</p>
                    <div className="grid-3">
                        {packages.map((pkg, i) => (
                            <div key={i} className="card" style={{
                                textAlign: 'center',
                                position: 'relative',
                                border: pkg.popular ? '2px solid var(--secondary)' : undefined,
                            }}>
                                {pkg.popular && (
                                    <div style={{
                                        position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                                        background: 'linear-gradient(135deg, var(--secondary), var(--secondary-light))',
                                        color: 'var(--primary)', padding: '0.3rem 1.2rem', borderRadius: '20px',
                                        fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap',
                                    }}>
                                        Most Popular
                                    </div>
                                )}
                                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{pkg.icon}</div>
                                <h3 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>{pkg.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{pkg.duration}</p>
                                <ul style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                                    {pkg.includes.map((item, j) => (
                                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            <span style={{ color: 'var(--secondary)', fontWeight: 700, flexShrink: 0 }}>✓</span> {item}
                                        </li>
                                    ))}
                                </ul>
                                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--secondary)', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>
                                    {pkg.price} <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-muted)' }}>/ vehicle</span>
                                </div>
                                <Link href="/book-online" className={`btn ${pkg.popular ? 'btn-primary' : 'btn-outline-gold'}`} style={{ width: '100%', display: 'block' }}>
                                    Book This Package
                                </Link>
                            </div>
                        ))}
                    </div>
                    <p className="text-center mt-3" style={{ color: 'var(--text-muted)' }}>
                        Need a custom package? <Link href="/contact-us" style={{ color: 'var(--secondary)', fontWeight: 600 }}>Contact us</Link> for a personalized quote.
                    </p>
                </div>
            </section>

            {/* Steps */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <div className="grid-4">
                        {steps.map((step, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '60px', height: '60px', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--secondary), var(--secondary-light))',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)',
                                }}>
                                    {step.step}
                                </div>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="section-lg bg-light">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {faqs.map((faq, i) => (
                            <div key={i} style={{
                                background: 'var(--white)', borderRadius: 'var(--radius-md)',
                                padding: '1.5rem', boxShadow: 'var(--shadow-sm)',
                            }}>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1rem', marginBottom: '0.5rem' }}>Q: {faq.q}</h3>
                                <p style={{ color: 'var(--text-muted)', margin: 0, lineHeight: '1.7', fontSize: '0.95rem' }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Book Your Umrah Transport Package</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
                        Let us handle all your transportation needs so you can focus on your blessed Umrah journey.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book Package</Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
