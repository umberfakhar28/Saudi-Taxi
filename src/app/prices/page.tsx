import Link from "next/link";
import type { Metadata } from "next";
import { MessageIcon, CheckCircleIcon, ShieldIcon, CarIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "Transparent Pricing & Quotes | Saudi Taxi Service",
    description: "Learn about our transparent quoting system. We provide honest, upfront rates for all taxi services in Makkah, Jeddah and Madinah with no hidden fees.",
};

const pillars = [
    {
        icon: <ShieldIcon size={32} />,
        title: "Transparent Quoting",
        desc: "We believe in honesty. When you request a quote, the price we give is the price you pay. No meters, no surprises."
    },
    {
        icon: <CheckCircleIcon size={32} />,
        title: "All-Inclusive Rates",
        desc: "Our quotes include fuel, tolls, parking fees, and driver service. You won't be asked for extra at the end of your journey."
    },
    {
        icon: <CarIcon size={32} />,
        title: "No Surge Pricing",
        desc: "Unlike ride-sharing apps, our rates don't spike during busy hours or holidays. We offer stable, competitive rates 24/7."
    }
];

export default function Prices() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Transparent Pricing</h1>
                <p>
                    We provide customized, all-inclusive quotes for your specific journey, ensuring the best value and zero surprises.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Pricing Policy</span>
                </div>
            </section>

            {/* Philosophy */}
            <section className="section-lg">
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 className="section-title">Our Pricing Philosophy</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '3rem' }}>
                            At Saudi Taxi Service, we have moved away from static price lists to a dynamic, quote-based system. This allows us to provide you with the most competitive rates based on your specific requirements, vehicle preference, and travel dates.
                        </p>
                        
                        <div className="grid-3">
                            {pillars.map((p, i) => (
                                <div key={i} style={{ textAlign: 'center' }}>
                                    <div style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>{p.icon}</div>
                                    <h3 style={{ color: 'var(--primary)', fontSize: '1.2rem', marginBottom: '1rem' }}>{p.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section style={{ background: 'var(--bg-subtle)', padding: '5rem 0' }}>
                <div className="container">
                    <div className="card" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', padding: '4rem' }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Get Your Personalised Quote Today</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                            Contact our 24/7 support team on WhatsApp or use our online form to receive a detailed quote within minutes.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="https://wa.me/966501234567" className="btn btn-primary btn-lg">
                                <MessageIcon size={20} /> Get Quote on WhatsApp
                            </a>
                            <Link href="/quote" className="btn btn-outline btn-lg">Online Quote Form</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Quote? */}
            <section className="section-lg">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <h2 className="section-title">Why we use a Quote System?</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="card">
                            <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>1. Customised to Your Group Size</h3>
                            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Whether you are a solo traveler or a group of 50, we provide the right vehicle at the right price, rather than a generic one-size-fits-all rate.</p>
                        </div>
                        <div className="card">
                            <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>2. Real-Time Availability</h3>
                            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Our quotes reflect real-time fleet availability, ensuring that the vehicle you book is available and ready for your journey.</p>
                        </div>
                        <div className="card">
                            <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>3. Multi-Stop Journeys</h3>
                            <p style={{ color: 'var(--text-muted)', margin: 0 }}>If you need additional stops or specific routes, a manual quote allows us to factor everything in, so there are no unexpected charges later.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
