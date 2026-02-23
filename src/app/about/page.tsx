import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck, TrendingUp, Heart, CreditCard, Languages, Award, Landmark, Target, Eye, ChevronRight } from "lucide-react";
import styles from "./about.module.css";

export const metadata: Metadata = {
    title: "About Us | Makkah Taxi Service - Your Trusted Transport Partner",
    description: "Learn about Makkah Taxi Service - over 10 years of reliable taxi and transport services for Umrah pilgrims in Makkah, Madinah & Jeddah.",
};

const values = [
    {
        icon: <ShieldCheck size={32} />,
        title: "Safety First",
        description: "Your safety is our top priority. All our vehicles are regularly maintained, fully insured, and equipped with modern safety features. Our drivers undergo thorough background checks and safety training.",
    },
    {
        icon: <TrendingUp size={32} />,
        title: "Reliability",
        description: "When we say we'll be there, we'll be there. Punctuality and dependability are the cornerstones of our service. We track flights, plan for traffic, and always arrive on time.",
    },
    {
        icon: <Heart size={32} />,
        title: "Service with Heart",
        description: "We understand the spiritual significance of Umrah and Hajj. Our team is trained to serve pilgrims with respect, patience, and genuine care. It's not just a job — it's a service to the Ummah.",
    },
    {
        icon: <CreditCard size={32} />,
        title: "Transparent Pricing",
        description: "No surprises, no hidden fees. We believe in honest, upfront pricing. The price you're quoted is the price you pay, regardless of traffic conditions or route changes.",
    },
    {
        icon: <Languages size={32} />,
        title: "Multilingual Support",
        description: "We serve pilgrims from all over the world. Our team and drivers speak Arabic, English, Urdu, Hindi, Turkish, and more. Language is never a barrier with us.",
    },
    {
        icon: <Award size={32} />,
        title: "Excellence",
        description: "We continuously strive to exceed expectations. From vehicle cleanliness to driver professionalism, every detail matters to us. Our 4.9/5 rating speaks for itself.",
    },
];

const milestones = [
    { year: "2014", event: "Founded in Makkah with 3 vehicles" },
    { year: "2016", event: "Expanded to Madinah operations" },
    { year: "2018", event: "Fleet grew to 25+ vehicles" },
    { year: "2019", event: "Launched airport transfer service" },
    { year: "2021", event: "Partnered with major Umrah travel agencies" },
    { year: "2023", event: "Served 10,000th customer" },
    { year: "2025", event: "Expanded fleet to 50+ vehicles with premium options" },
];

const team = [
    { name: "Mohammed Al-Harbi", role: "Founder & CEO", credentials: "15+ Years Transport Experience", description: "A Makkah native with 15+ years in the transport industry. Mohammed founded the company with a vision to provide reliable transport for pilgrims." },
    { name: "Omar Abdullah", role: "Operations Manager", credentials: "Logistics Specialist", description: "Oversees daily operations, fleet management, and driver coordination. Ensures every ride meets our quality standards." },
    { name: "Aisha Siddiqui", role: "Customer Relations", credentials: "Multilingual Support Expert", description: "Heads our multilingual customer support team. Available 24/7 to ensure every customer has a positive experience." },
];

export default function About() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>About Makkah Taxi Service</h1>
                <p>
                    Dedicated to serving pilgrims and travelers with reliable, comfortable, and affordable transportation since 2014.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>About Us</span>
                </div>
            </section>

            {/* Story */}
            <section className="section-lg">
                <div className="container">
                    <div className={styles.storyGrid}>
                        <div className={styles.storyContent}>
                            <h2>Our Story</h2>
                            <p>
                                Makkah Taxi Service was founded in 2014 with a simple mission: to make transportation hassle-free for Umrah and Hajj pilgrims visiting the Holy Cities of Makkah and Madinah.
                            </p>
                            <p>
                                What started as a small operation with just 3 vehicles has grown into one of the most trusted taxi services in Saudi Arabia's Hejaz region. Our founder, Mohammed Al-Harbi, recognized that pilgrims — many visiting Saudi Arabia for the first time — needed a reliable, transparent, and caring transport service they could trust completely.
                            </p>
                            <p>
                                Today, we operate a fleet of 50+ vehicles, employ over 40 professional drivers, and have proudly served more than 15,000 customers from over 50 countries. Despite our growth, we remain committed to our founding values: safety, reliability, and heartfelt service.
                            </p>
                        </div>
                        <div className={styles.storyImage}>
                            <div className={styles.imageBox}>
                                <Landmark size={64} className={styles.storyIcon} />
                                <h3 style={{ color: 'var(--white)', margin: '1rem 0 0.5rem' }}>Serving the Holy Cities</h3>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', margin: 0 }}>Since 2014</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-lg bg-light">
                <div className="container">
                    <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <div className={styles.missionCard}>
                            <div className={styles.missionIcon}><Target size={40} /></div>
                            <h3>Our Mission</h3>
                            <p>
                                To provide every pilgrim and traveler in Saudi Arabia with safe, comfortable, and reliable transportation services. We aim to remove the stress of travel so our customers can focus on what truly matters — their spiritual journey and personal experience.
                            </p>
                        </div>
                        <div className={styles.missionCard}>
                            <div className={styles.missionIcon}><Eye size={40} /></div>
                            <h3>Our Vision</h3>
                            <p>
                                To become the #1 trusted taxi and transport service across Saudi Arabia. We envision a future where every pilgrim arriving in the Kingdom has access to world-class, affordable, and caring transportation from the moment they land to the moment they depart.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Our Core Values</h2>
                    <p className="section-subtitle">
                        These values guide everything we do — from how we hire drivers to how we set our prices.
                    </p>
                    <div className="grid-3">
                        {values.map((value, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center' }}>
                                <div className={styles.valueIcon}>{value.icon}</div>
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
                    <div className={styles.timeline}>
                        {milestones.map((milestone, i) => (
                            <div key={i} className={styles.timelineItem}>
                                <div className={styles.timelineYear}>{milestone.year}</div>
                                <div className={styles.timelineDot} />
                                <div className={styles.timelineContent}>
                                    <p>{milestone.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Our Leadership Team</h2>
                    <p className="section-subtitle">
                        Meet the passionate people behind Makkah Taxi Service.
                    </p>
                    <div className="grid-3" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        {team.map((member, i) => (
                            <div key={i} className={styles.teamCard}>
                                <div className={styles.teamAvatar}>
                                    {member.name.charAt(0)}
                                </div>
                                <h3 className={styles.teamName}>{member.name}</h3>
                                <p className={styles.teamRole}>{member.role}</p>
                                <p className={styles.teamCredentials}>{member.credentials}</p>
                                <p className={styles.teamDesc}>{member.description}</p>
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
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Experience Our Service Today</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Join the 15,000+ satisfied customers who trust Makkah Taxi Service for their transportation needs.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/booking" className="btn btn-primary btn-lg">
                            Book a Ride
                        </Link>
                        <Link href="/contact-us" className="btn btn-outline btn-lg">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
