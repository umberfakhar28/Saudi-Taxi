import Link from "next/link";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/seo";
import AnimatedCounter from "@/components/AnimatedCounter";
import {
    ShieldIcon, TrendingUpIcon, HeartIcon, CreditCardIcon, GlobeIcon, AwardIcon,
    TargetIcon, EyeIcon, LandmarkIcon, CheckCircleIcon, LinkedInIcon,
} from "@/components/Icons";

export const metadata = generatePageMetadata({
    title: "About Us",
    description: "Learn about Gulf Trip Service — over 10 years of professional, reliable taxi and transport services for Umrah pilgrims, tourists and travelers across Saudi Arabia and the Gulf.",
    path: "/about-us",
    ogImage: "/images/gulftripservice-ceo.png",
    ogImageAlt: "Umber Fakhar, CEO of Gulf Trip Service",
});

const values = [
    { icon: <ShieldIcon size={28} />, title: "Safety First", description: "Your safety is our top priority. All our vehicles are regularly maintained, fully insured, and equipped with modern safety features. Our drivers undergo thorough background checks and safety training." },
    { icon: <TrendingUpIcon size={28} />, title: "Reliability", description: "When we say we'll be there, we'll be there. Punctuality and dependability are the cornerstones of our service. We track flights, plan for traffic, and always arrive on time." },
    { icon: <HeartIcon size={28} />, title: "Service with Heart", description: "We understand the spiritual significance of Umrah and Hajj. Our team is trained to serve pilgrims with respect, patience, and genuine care." },
    { icon: <CreditCardIcon size={28} />, title: "Transparent Pricing", description: "No surprises, no hidden fees. We believe in honest, upfront pricing. The price you're quoted is the price you pay." },
    { icon: <GlobeIcon size={28} />, title: "Multilingual Support", description: "We serve pilgrims from all over the world. Our team and drivers speak Arabic, English, Urdu, Hindi, Turkish, and more." },
    { icon: <AwardIcon size={28} />, title: "Excellence", description: "We continuously strive to exceed expectations. From vehicle cleanliness to driver professionalism, every detail matters to us." },
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

const credentials = [
    { icon: <LandmarkIcon size={28} />, title: "Ministry Licensed", desc: "All vehicles registered with the Saudi Ministry of Transport" },
    { icon: <ShieldIcon size={28} />, title: "Fully Insured", desc: "Comprehensive third-party insurance on every vehicle in our fleet" },
    { icon: <CheckCircleIcon size={28} />, title: "Driver Certified", desc: "Every driver holds a valid Saudi professional driving licence" },
    { icon: <GlobeIcon size={28} />, title: "50+ Countries Served", desc: "Trusted by international travelers from over 50 countries" },
];

export default function AboutUs() {
    return (
        <main>
            <section className="page-hero">
                <h1>About Gulf Trip Service</h1>
                <p>Premium private transportation across Saudi Arabia and the Gulf — trusted by pilgrims, tourists and business travelers for reliable, comfortable journeys since 2014.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>About Us</span>
                </div>
            </section>

            {/* Story + CEO Profile */}
            <section className="section-lg">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
                        <div>
                            <h2>Our Story</h2>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                                Gulf Trip Service began in Makkah in 2014 with a simple purpose: give pilgrims and travelers arriving in Saudi Arabia a transportation partner they could trust from the moment they landed. What started as a small fleet dedicated to Umrah transfers has grown into a private transportation network spanning Saudi Arabia&apos;s major cities, airports and holy sites.
                            </p>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                                That growth has taken us well beyond the Holy Cities. Today we run scheduled meet-and-greet pickups from airports across the Kingdom, intercity transfers connecting Riyadh, Jeddah, Dammam and beyond, and cross-border routes linking Saudi Arabia to the UAE, Qatar, Bahrain, Oman and Kuwait — alongside dedicated Ziyarat and city-tour services for travelers who want to see more of the region they&apos;ve come to visit.
                            </p>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                                None of that scale matters without getting the basics right on every single trip: a driver who shows up on time, a vehicle that&apos;s clean and well maintained, a price agreed before you travel, and a team that speaks your language when it matters most. Those fundamentals — not scripted slogans — are what our drivers are trained on and held to.
                            </p>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                                Today, we operate a fleet of 50+ vehicles and have proudly served more than 15,000 customers from over 50 countries. For travel tips and destination guides drawn from that experience, visit our <Link href="/blog" style={{ color: 'var(--accent)', fontWeight: 600 }}>travel blog</Link>.
                            </p>
                            <Link href="/book-online" className="btn btn-primary">Book Your Ride</Link>
                        </div>

                        {/* Founder / CEO profile card */}
                        <div style={{
                            background: 'linear-gradient(135deg, var(--navy-dark), var(--navy))',
                            borderRadius: 'var(--radius-lg)',
                            padding: '2.5rem 2rem',
                            textAlign: 'center',
                            color: 'var(--white)',
                        }}>
                            <div style={{
                                position: 'relative',
                                width: 132,
                                height: 132,
                                margin: '0 auto 1.25rem',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '3px solid var(--secondary)',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                            }}>
                                <Image
                                    src="/images/gulftripservice-ceo.png"
                                    alt="Umber Fakhar, CEO of Gulf Trip Service"
                                    fill
                                    sizes="132px"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <h3 style={{ color: 'var(--white)', marginBottom: '0.15rem', fontSize: '1.25rem' }}>Umber Fakhar</h3>
                            <p style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                                CEO, Gulf Trip Service
                            </p>
                            <p style={{ color: 'rgba(255,255,255,0.82)', lineHeight: '1.7', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                                Leading Gulf Trip Service&apos;s mission to deliver safe, reliable and comfortable private transportation for pilgrims and travelers across Saudi Arabia and the Gulf.
                            </p>
                            <a
                                href="https://www.linkedin.com/in/umber-fakhar-sqa/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Umber Fakhar on LinkedIn (opens in a new tab)"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.25)',
                                    color: 'var(--white)',
                                }}
                            >
                                <LinkedInIcon size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section style={{ background: 'linear-gradient(135deg, var(--navy-dark), var(--navy))', padding: '5rem 0' }}>
                <div className="container">
                    <div className="grid-4" style={{ textAlign: 'center' }}>
                        {stats.map((stat, i) => (
                            <div key={i}>
                                <div style={{
                                    fontSize: '3.2rem',
                                    fontWeight: 700,
                                    color: 'var(--secondary)',
                                    fontFamily: 'var(--font-heading)',
                                    lineHeight: 1,
                                    marginBottom: '0.75rem',
                                    textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                                }}>
                                    <AnimatedCounter end={stat.number} />
                                </div>
                                <div style={{
                                    color: 'rgba(255,255,255,0.9)',
                                    fontSize: '1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontWeight: 500
                                }}>
                                    {stat.label}
                                </div>
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
                            <div style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}><TargetIcon size={36} /></div>
                            <h3 style={{ color: 'var(--primary)' }}>Our Mission</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                                To provide every pilgrim and traveler in Saudi Arabia and the Gulf with safe, comfortable, and reliable transportation services — removing the stress of travel so they can focus on what brought them here.
                            </p>
                        </div>
                        <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
                            <div style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}><EyeIcon size={36} /></div>
                            <h3 style={{ color: 'var(--primary)' }}>Our Vision</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                                To be the region&apos;s most trusted private transportation partner — the name pilgrims, tourists and business travelers reach for first, from arrival to departure.
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
                                <div style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{value.icon}</div>
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
                    <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 40, top: 8, bottom: 8, width: 2, background: 'var(--secondary)', opacity: 0.35 }} aria-hidden="true" />
                        {milestones.map((milestone, i) => (
                            <div key={i} style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', alignItems: 'flex-start', position: 'relative' }}>
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

            {/* E-E-A-T: Certifications & Trust Signals */}
            <section className="section" style={{ background: 'var(--bg-subtle)' }}>
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">Verified & Trusted</span>
                        <h2 className="section-title">Certifications & Industry Standing</h2>
                        <p className="section-subtitle">Our credentials demonstrate the professional standards we uphold for every customer.</p>
                    </div>
                    <div className="grid-4" style={{ marginBottom: 'var(--space-16)' }}>
                        {credentials.map((item, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center' }}>
                                <div style={{ color: 'var(--accent)', marginBottom: 'var(--space-4)', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                                <h3 style={{ color: 'var(--accent)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginBottom: 0 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    {/* Aggregate Rating Display */}
                    <div style={{ maxWidth: 600, margin: '0 auto', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-8)', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ fontSize: 'var(--text-5xl)', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>4.9</div>
                        <div style={{ color: 'var(--accent)', fontSize: '1.5rem', margin: 'var(--space-2) 0' }}>★★★★★</div>
                        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginBottom: 0 }}>Based on 847+ verified customer reviews across Google, TripAdvisor, and direct bookings</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Book a Ride</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Join the 15,000+ satisfied customers who trust Gulf Trip Service for premium transportation across Saudi Arabia and the Gulf.
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
