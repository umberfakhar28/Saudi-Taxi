import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { PlaneIcon, UserIcon, ClockIcon, TagIcon, ShieldIcon, MapPinIcon, ChevronRightIcon, MessageIcon } from "@/components/Icons";
import RelatedLinks from "@/components/RelatedLinks";
import { WHATSAPP_URL, TEL_URL, PHONE_DISPLAY, waLink } from "@/lib/contact";

export const metadata = generatePageMetadata({
    title: "Jeddah Airport (KAIA) Taxi Service",
    description: "Premium airport taxi services from Jeddah Airport (KAIA). Reliable transfers to Makkah, Madinah, and any destination in Jeddah with professional drivers.",
    path: "/jeddah-airport-taxi-service",
    keywords: ["Jeddah airport taxi", "KAIA taxi", "Jeddah airport transfer Makkah", "Jeddah airport to Makkah"],
});

export default function JeddahAirportTaxi() {
    return (
        <main>
            <section className="page-hero">
                <h1>Jeddah Airport Taxi Service</h1>
                <p>
                    Licensed transports from King Abdulaziz International Airport (KAIA). 
                    Reliable 24/7 service connecting the airport to the Holy Cities and Jeddah city.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <Link href="/airport-transfers">Airport Transfers</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <span>Jeddah</span>
                </div>
            </section>

            <section className="section-lg">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <h2 className="section-title">Arrivals at King Abdulaziz International Airport</h2>
                            <p style={{ lineHeight: 1.8, color: 'var(--text-body)' }}>
                                As the primary gateway for Umrah and Hajj pilgrims, Jeddah Airport (KAIA) is one of the busiest in the world. Our dedicated taxi service ensures that your arrival is stress-free, with a professional driver ready to greet you at Terminal 1 or the North Terminal.
                            </p>
                            <div className="card" style={{ marginTop: '2rem', borderLeft: '4px solid var(--secondary)' }}>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <li>✓ Meet & Greet at all KAIA terminals</li>
                                    <li>✓ Best rates to Makkah and Madinah</li>
                                    <li>✓ 24/7 availability for all domestic and international flights</li>
                                    <li>✓ Fleet of premium SUVs, Sedans and Vans</li>
                                </ul>
                            </div>
                        </div>
                        <div className="card" style={{ background: 'var(--bg-subtle)' }}>
                            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Estimated Travel Times</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-200)', paddingBottom: '0.5rem' }}>
                                    <span>Jeddah Airport ↔ Makkah Hotels</span>
                                    <span style={{ fontWeight: 700 }}>~1.5 hrs</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-200)', paddingBottom: '0.5rem' }}>
                                    <span>Jeddah Airport ↔ Jeddah City</span>
                                    <span style={{ fontWeight: 700 }}>~30 mins</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-200)', paddingBottom: '0.5rem' }}>
                                    <span>Jeddah Airport ↔ Obhur</span>
                                    <span style={{ fontWeight: 700 }}>~40 mins</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ background: 'var(--primary)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>Book Your Jeddah Airport Transfer</h2>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book Now</Link>
                        <a href={WHATSAPP_URL} className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white' }}>
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>

            <RelatedLinks
                title="More Jeddah Taxi Services"
                links={[
                    { href: "/jeddah-airport-taxi-guide", label: "Jeddah Airport Taxi Guide" },
                    { href: "/jeddah-to-makkah-taxi-service", label: "Jeddah to Makkah Taxi" },
                    { href: "/jeddah-to-makkah-guide", label: "Jeddah to Makkah Travel Guide" },
                    { href: "/services/jeddah", label: "Jeddah Taxi Services Overview" },
                    { href: "/jeddah-city-tour-services-in-saudi-arabia", label: "Jeddah City Tours" },
                ]}
            />
        </main>
    );
}
