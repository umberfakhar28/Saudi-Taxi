import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Saudi Taxi Service - Your Trusted Transport Partner in Saudi Arabia",
    description: "Learn about Saudi Taxi Service — over 10 years of professional, reliable taxi and transport services for Umrah pilgrims, tourists and travelers across Saudi Arabia.",
};

const values = [
    { icon: "🛡️", title: "Safety First", description: "Your safety is our top priority. All our vehicles are regularly maintained, fully insured, and equipped with modern safety features. Our drivers undergo thorough background checks and safety training." },
    { icon: "💎", title: "Reliability", description: "When we say we'll be there, we'll be there. Punctuality and dependability are the cornerstones of our service. We track flights, plan for traffic, and always arrive on time." },
    { icon: "🤲", title: "Service with Heart", description: "We understand the spiritual significance of Umrah and Hajj. Our team is trained to serve pilgrims with respect, patience, and genuine care." },
    { icon: "💰", title: "Transparent Pricing", description: "No surprises, no hidden fees. We believe in honest, upfront pricing. The price you're quoted is the price you pay." },
    { icon: "🌍", title: "Multilingual Support", description: "We serve pilgrims from all over the world. Our team and drivers speak Arabic, English, Urdu, Hindi, Turkish, and more." },
    { icon: "⭐", title: "Excellence", description: "We continuously strive to exceed expectations. From vehicle cleanliness to driver professionalism, every detail matters to us." },
];

const stats = [
    { number: "15,000+", label: "Happy Customers" },
    { number: "10+", label: "Years Experience" },
    { number: "50+", label: "Fleet Vehicles" },
    { number: "50+", label: "Countries Served" },
];

const milestones = [
    { year: "2014", event: "Founded in Makkah with a small fleet of vehicles dedicated to Umrah service" },
    { year: "2016", event: "Expanded operations to Madinah, Jeddah and surrounding regions" },
    { year: "2018", event: "Fleet grew to 25+ vehicles, including luxury sedan options" },
    { year: "2019", event: "Launched dedicated airport transfer service from King Abdulaziz International Airport" },
    { year: "2021", event: "Partnered with major Umrah travel agencies across Pakistan, India and UK" },
    { year: "2023", event: "Proudly served over 10,000 customers from 50+ countries" },
    { year: "2025", event: "Expanded to AlUla, Taif and Jeddah city tour services" },
];

export default function AboutUs() {
    return (
        <main>
            <section className="page-hero">
                <h1>About Saudi Taxi Service</h1>
                <p>Dedicated to serving pilgrims and travelers with reliable, comfortable, and affordable transportation since 2014.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>About Us</span>
                </div>
            </section>

            {/* Story */}
            <section className="section-lg">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <h2>Our Story</h2>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                                Saudi Taxi was founded with a simple mission: to make transportation hassle-free for Umrah and Hajj pilgrims visiting the Holy Cities of Makkah and Madinah.
                            </p>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                                What started as a small operation has grown into one of the most trusted taxi services in Saudi Arabia. We recognized that pilgrims — many visiting for the first time — needed a reliable, transparent, and caring transport service they could trust completely.
                            </p>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                                Today, we operate a fleet of 50+ vehicles, employ over 40 professional drivers, and have proudly served more than 15,000 customers from over 50 countries. Despite our growth, we remain committed to our founding values: safety, reliability, and heartfelt service.
                            </p>
                            <Link href="/book-online" className="btn btn-primary">Book Your Ride</Link>
                        </div>
                        <div style={{
                            background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))',
                            borderRadius: 'var(--radius-lg)',
                            padding: '3rem',
                            textAlign: 'center',
                            color: 'var(--white)',
                        }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🕌</div>
                            <h3 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>Serving the Holy Cities</h3>
                            <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>Since 2014 — Your trusted transport partner in Saudi Arabia</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', padding: '4rem 0' }}>
                <div className="container">
                    <div className="grid-4" style={{ textAlign: 'center' }}>
                        {stats.map((stat, i) => (
                            <div key={i}>
                                <div style={{ fontSize: '2.8rem', fontWeight: 700, color: 'var(--secondary)', fontFamily: 'var(--font-heading)', lineHeight: 1, marginBottom: '0.5rem' }}>{stat.number}</div>
                                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-lg bg-light">
                <div className="container">
                    <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
                            <h3 style={{ color: 'var(--primary)' }}>Our Mission</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                                To provide every pilgrim and traveler in Saudi Arabia with safe, comfortable, and reliable transportation services — removing the stress of travel so they can focus on their spiritual journey.
                            </p>
                        </div>
                        <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👁️</div>
                            <h3 style={{ color: 'var(--primary)' }}>Our Vision</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                                To become the #1 trusted taxi and transport service across Saudi Arabia, ensuring every pilgrim has access to world-class transportation from arrival to departure.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Our Core Values</h2>
                    <p className="section-subtitle">These values guide everything we do — from how we hire drivers to how we set prices.</p>
                    <div className="grid-3">
                        {values.map((value, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{value.icon}</div>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1.15rem', marginBottom: '0.75rem' }}>{value.title}</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.9rem' }}>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section-lg bg-light">
                <div className="container">
                    <h2 className="section-title">Our Journey</h2>
                    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                        {milestones.map((milestone, i) => (
                            <div key={i} style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{
                                    minWidth: '80px',
                                    background: 'linear-gradient(135deg, var(--secondary), var(--secondary-light))',
                                    color: 'var(--primary)',
                                    fontWeight: 700,
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    textAlign: 'center',
                                    fontSize: '0.9rem',
                                }}>
                                    {milestone.year}
                                </div>
                                <div style={{
                                    background: 'var(--white)',
                                    borderRadius: 'var(--radius-md)',
                                    padding: '1rem 1.5rem',
                                    flex: 1,
                                    boxShadow: 'var(--shadow-sm)',
                                    color: 'var(--text-dark)',
                                    lineHeight: '1.6',
                                }}>
                                    {milestone.event}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Experience Our Service Today</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Join the 15,000+ satisfied customers who trust Saudi Taxi for their transportation needs.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book a Ride</Link>
                        <Link href="/contact-us" className="btn btn-outline btn-lg">Contact Us</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
