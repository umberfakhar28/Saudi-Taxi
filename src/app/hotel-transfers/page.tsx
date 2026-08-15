import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { WhatsAppIcon } from "@/components/Icons";
import { waLink } from "@/lib/contact";

export const metadata = generatePageMetadata({
    title: "Hotel Transfer Taxi Service | Makkah, Jeddah, Madinah",
    description: "Door-to-door hotel transfer taxi service in Makkah, Madinah and Jeddah. Professional drivers, meet-and-greet, 24/7. Book your transfer on WhatsApp.",
    path: "/hotel-transfers",
    keywords: ["hotel transfer Makkah", "hotel transfer Madinah", "hotel taxi Saudi Arabia", "door to door transfer Saudi"],
});

const faqs = [
    { q: "Can you pick me up directly from my hotel lobby?", a: "Yes — door-to-door is the default for this service. Share your hotel name and we confirm the exact pickup point." },
    { q: "Do you serve hotels outside Makkah, Madinah and Jeddah?", a: "Our primary coverage is the Makkah–Madinah–Jeddah corridor, but contact us to confirm availability for other cities." },
    { q: "Can I book a hotel-to-airport transfer for departure?", a: "Yes — the same door-to-door service works in either direction, including timed pickups around your flight." },
    { q: "What vehicle sizes are available for hotel transfers?", a: "Sedans for solo travelers and couples, up to large minivans for bigger groups — let us know your group size when booking." },
];

const schemas = [
    serviceSchema({ name: "Hotel Transfer Services in Saudi Arabia", description: "Door-to-door hotel transfer taxi service in Makkah, Madinah and Jeddah. Professional drivers, meet-and-greet, 24/7. Book your transfer on WhatsApp.", url: "/hotel-transfers", areaServed: ["Makkah", "Madinah", "Jeddah"] }),
    faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/our-services" }, { name: "Hotel Transfers", path: "/hotel-transfers" }]),
];

const features = [
    { icon: "🏨", title: "Door-to-Door Service", description: "We pick you up directly from your hotel lobby and drop you precisely at your destination — no walking, no confusion." },
    { icon: "⏱️", title: "Punctual & Reliable", description: "We value your time. Our drivers are always on time, ensuring you never miss a prayer, tour, or departure." },
    { icon: "🛞", title: "All Vehicle Sizes", description: "From sedans for solo travelers to large minivans for groups — we have the right vehicle for every need." },
    { icon: "💵", title: "Transparent, Agreed Rates", description: "No meter surprises. Every hotel transfer rate is agreed via quote before your journey begins." },
    { icon: "🗺️", title: "City-Wide Coverage", description: "We cover all major hotels in Makkah, Madinah, Jeddah and surrounding areas." },
    { icon: "☎️", title: "24/7 Support", description: "Our team is available round the clock. Reach us any time via phone, WhatsApp or our booking form." },
];

const routes = [
    { from: "Airport", to: "Makkah Hotels", vehicle: "Sedan / SUV" },
    { from: "Airport", to: "Madinah Hotels", vehicle: "Sedan / SUV" },
    { from: "Makkah", to: "Madinah Hotels", vehicle: "Sedan / SUV" },
    { from: "Jeddah City", to: "Makkah Hotels", vehicle: "Sedan / SUV" },
    { from: "Makkah", to: "Jeddah Hotels", vehicle: "Sedan / SUV" },
    { from: "Madinah", to: "Jeddah Airport", vehicle: "Sedan / SUV" },
];

const hotels = ["Makkah Clock Royal Tower — A Fairmont Hotel", "Hilton Makkah Convention Hotel", "Swissôtel Al Maqam Makkah", "Dar Al-Tawasol Makkah", "Movenpick Hotel & Residences Hajar Tower", "Anwar Al Madinah Mövenpick Hotel", "Pullman Zamzam Madina", "InterContinental Madinah-Dar Al Iman", "Sheraton Makkah Jabal Al Kaaba Hotel", "Conrad Makkah"];

const relatedServices = [
    { href: "/airport-transfers", label: "Airport Transfers" },
    { href: "/private-taxi", label: "Private Taxi" },
    { href: "/umrah-transport-package", label: "Umrah Transport Package" },
    { href: "/corporate-transportation-services", label: "Corporate Transportation" },
];

const relatedCities = [
    { slug: "makkah", city: "Makkah" },
    { slug: "madinah", city: "Madinah" },
    { slug: "jeddah", city: "Jeddah" },
];

export default function HotelTransfers() {
    return (
        <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
        <main>
            <section className="page-hero">
                <h1>Hotel Transfer & Private Car Service — Makkah, Jeddah, Madinah</h1>
                <p>Professional door-to-door transfers between hotels, airports and holy sites across Makkah, Madinah, and Jeddah.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Hotel Transfers</span>
                </div>
            </section>

            {/* Features */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">What Makes Our Hotel Transfers Special?</h2>
                    <p className="section-subtitle">We provide seamless transfer experiences tailored to pilgrims, tourists and business travelers.</p>
                    <p style={{ color: 'var(--text-body)', lineHeight: 1.8, maxWidth: '760px', margin: '0 auto var(--space-8)', textAlign: 'center' }}>
                        Traveling with kids? Our <Link href="/guides/family-travel" style={{ color: 'var(--accent)', fontWeight: 600 }}>family travel guide</Link> has hotel and pacing tips for visiting Saudi Arabia with children.
                    </p>
                    <div className="grid-3">
                        {features.map((f, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{f.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7', margin: 0 }}>{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Routes */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Popular Hotel Transfer Routes</h2>
                    <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--white)', minWidth: '500px' }}>
                            <thead>
                                <tr style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', color: 'var(--white)' }}>
                                    <th style={{ padding: '1.2rem 1.5rem', textAlign: 'left', fontWeight: 600, fontSize: '0.9rem' }}>Route</th>
                                    <th style={{ padding: '1.2rem 1.5rem', textAlign: 'center', fontWeight: 600, fontSize: '0.9rem' }}>Vehicle</th>
                                    <th style={{ padding: '1.2rem 1.5rem', textAlign: 'center', fontWeight: 600, fontSize: '0.9rem' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {routes.map((r, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                                        <td style={{ padding: '1.1rem 1.5rem', fontWeight: 500 }}>{r.from} → {r.to}</td>
                                        <td style={{ padding: '1.1rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>{r.vehicle}</td>
                                        <td style={{ padding: '1.1rem 1.5rem', textAlign: 'center' }}>
                                            <Link
                                                href={`/book-online?mode=transfers&from=${encodeURIComponent(r.from)}&to=${encodeURIComponent(r.to)}`}
                                                style={{ background: 'linear-gradient(135deg, var(--secondary), var(--secondary-light))', color: 'var(--primary)', padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block' }}
                                            >
                                                Book This Route
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center mt-3">
                        <Link href="/book-online" className="btn btn-primary">Book Hotel Transfer</Link>
                    </div>
                </div>
            </section>

            {/* Hotels We Serve */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Hotels We Frequently Serve</h2>
                    <p className="section-subtitle">We operate transfers to and from all major hotels in Makkah, Madinah, and Jeddah.</p>
                    <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {hotels.map((hotel, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '1rem',
                                padding: '1rem 1.5rem', background: 'var(--white)',
                                borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)',
                                borderLeft: '4px solid var(--secondary)',
                            }}>
                                <span style={{ fontSize: '1.2rem' }}>🏨</span>
                                <span style={{ color: 'var(--text-dark)', fontWeight: 500, fontSize: '0.95rem' }}>{hotel}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-center mt-3" style={{ color: 'var(--text-muted)' }}>
                        Don&apos;t see your hotel? <Link href="/contact-us" style={{ color: 'var(--secondary)', fontWeight: 600 }}>Contact us</Link> — we cover all hotels!
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-lg" style={{ background: 'var(--bg-subtle)' }}>
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">FAQ</span>
                        <h2 className="section-title">Hotel Transfers — Frequently Asked Questions</h2>
                    </div>
                    <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        {faqs.map((f, i) => (
                            <div key={i} className="card" style={{ padding: 'var(--space-6) var(--space-8)' }}>
                                <h3 style={{ color: 'var(--accent)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-3)' }}>{f.q}</h3>
                                <p style={{ color: 'var(--text-body)', marginBottom: 0 }}>{f.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Services & Cities */}
            <section className="section-lg">
                <div className="container">
                    <div className="grid-2" style={{ gap: 'var(--space-10)' }}>
                        <div>
                            <h3 style={{ marginBottom: 'var(--space-4)' }}>Related Services</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                                {relatedServices.map((l) => (
                                    <Link key={l.href} href={l.href} className="btn btn-outline-gold btn-sm">{l.label}</Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 style={{ marginBottom: 'var(--space-4)' }}>Related Cities</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                                {relatedCities.map((c) => (
                                    <Link key={c.slug} href={`/services/${c.slug}`} className="btn btn-outline-gold btn-sm">{c.city} Taxi Service</Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Need a Hotel Transfer?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
                        Book in advance or last minute — we&apos;re always ready to take you where you need to go.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book Now<span className="sr-only"> your hotel transfer</span></Link>
                        <a href={waLink("Hello GulfTripService, I would like to get a quote for your hotel transfer service. Please share the available options, pricing, and booking details. Thank you.")} className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon size={18} /> Get a Quote
                        </a>
                    </div>
                </div>
            </section>
        </main>
        </>
    );
}
