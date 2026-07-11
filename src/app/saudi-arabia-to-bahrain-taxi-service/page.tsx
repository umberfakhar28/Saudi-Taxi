import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { CheckCircleIcon, MapPinIcon, CarIcon, ShieldIcon, MessageIcon } from "@/components/Icons";
import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";

export const metadata = generatePageMetadata({
    title: "Saudi Arabia to Bahrain Taxi",
    description: "Taxi to Bahrain from anywhere in Saudi Arabia — Riyadh, Khobar, Jubail, Dammam or your city — via King Fahd Causeway. Door-to-door pickup, licensed drivers. Book today.",
    path: "/saudi-arabia-to-bahrain-taxi-service",
    keywords: ["Saudi to Bahrain taxi", "King Fahd Causeway transfer", "Bahrain border taxi", "Saudi to Bahrain car"],
});

const schemas = [
    serviceSchema({ name: "Saudi Arabia to Bahrain Taxi", description: "Taxi to Bahrain from anywhere in Saudi Arabia — Riyadh, Khobar, Jubail, Dammam or your city — via King Fahd Causeway. Door-to-door pickup, licensed drivers. Book today.", url: "/saudi-arabia-to-bahrain-taxi-service", areaServed: ["Bahrain", "Saudi Arabia"] }),
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Border Crossing", path: "/border-crossing" }, { name: "Bahrain", path: "/saudi-arabia-to-bahrain-taxi-service" }]),
];

const features = [
    { title: "Pickup From Any Saudi City", desc: "Riyadh, Khobar, Jubail, Dhahran, Dammam city — or wherever you're starting from." },
    { title: "Door-to-Door", desc: "Pick up from your home, hotel, or office and drop off anywhere in Bahrain." },
    { title: "Causeway Expertise", desc: "Drivers familiar with King Fahd Causeway procedures and peak hours." },
];

export default function SaudiToBahrain() {
    return (
        <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Saudi Arabia to Bahrain Taxi — Any City Pickup</h1>
                <p>
                    Premium land transfer service across the King Fahd Causeway, with pickup
                    from Riyadh, Khobar, Jubail, Dammam city, or anywhere else in Saudi Arabia.
                    Comfortable, private vehicles for family and business travel.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <Link href="/border-crossing">Border Crossing</Link> / <span>Bahrain</span>
                </div>
            </section>

            {/* Content */}
            <section className="section-lg">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <h2 className="section-title">King Fahd Causeway Transfers From Any City</h2>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
                                The King Fahd Causeway is the primary land link between the Eastern Province of Saudi Arabia and the Island Kingdom of Bahrain. Wherever your journey starts — Riyadh, Khobar, Jubail, Dammam city, or another Saudi city — our professional taxi service picks you up and takes you all the way to the causeway.
                            </p>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
                                Our drivers assist with vehicle documentation and guide you through the border procedures. We offer a range of vehicles from luxury sedans to spacious SUVs and vans, perfect for all group sizes.
                            </p>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: 'var(--space-8)' }}>
                                Flying into King Fahd International Airport first? Our{" "}
                                <Link href="/dammam-airport-to-bahrain-taxi-service" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                                    Dammam Airport to Bahrain transfer
                                </Link>{" "}
                                is built specifically for that route, with meet-and-greet pickup and flight tracking.
                            </p>

                            <div className="card" style={{ borderLeft: '4px solid var(--secondary)', background: 'var(--bg-subtle)' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Key Information</h3>
                                <ul style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <li>• Distance: ~25 km (Causeway length)</li>
                                    <li>• Typical Duration: 1–2 hours (traffic dependent)</li>
                                    <li>• Requirements: Valid Passport & Visa (or GCC ID)</li>
                                    <li>• Vehicle border insurance included</li>
                                </ul>
                            </div>
                        </div>

                        <div className="grid-1" style={{ gap: '1.5rem' }}>
                            {features.map((f, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1.5rem', background: 'var(--white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                                    <div style={{ color: 'var(--secondary)', flexShrink: 0 }}>
                                        <CheckCircleIcon size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ color: 'var(--primary)', marginBottom: '0.25rem', fontSize: '1rem' }}>{f.title}</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                            <div style={{ display: 'flex', gap: '1rem', padding: '1.5rem', background: 'var(--white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                                <div style={{ color: 'var(--secondary)', flexShrink: 0 }}>
                                    <CheckCircleIcon size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Transparent Pricing</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Clear, agreed-upon rates with no hidden border fees.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'var(--primary)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>Book Your Bahrain Transfer Today</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.1rem' }}>
                        Need an instant quote? WhatsApp us your pickup location and travel date, and we&apos;ll get back to you in minutes.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://wa.me/966501234567" className="btn btn-primary btn-lg">
                            <MessageIcon size={18} /> WhatsApp for Quote
                        </a>
                        <Link href="/quote" className="btn btn-outline btn-lg">Contact Us</Link>
                    </div>
                </div>
            </section>
        </main>
        </>
    );
}
