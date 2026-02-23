import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Features from "@/components/Features";
import KeyTakeaways from "@/components/KeyTakeaways";
import TrustBadges from "@/components/TrustBadges";
import FAQSection from "@/components/FAQSection";
import Link from "next/link";
import { Landmark, Plane, Car } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Makkah Taxi Service | Reliable Taxi Service in Makkah & Jeddah",
  description: "Book reliable taxi services in Makkah, Jeddah & Madinah. Airport transfers, Umrah taxi, Jeddah to Makkah transport. Professional drivers, 24/7 availability.",
};

const services = [
  {
    icon: <Landmark size={48} />,
    title: "Umrah Taxi Services",
    description: "Direct transport between Holy sites. Our licensed drivers ensure a comfortable, safe, and efficient journey for all Umrah pilgrims.",
    link: "/umrah-taxi-services",
  },
  {
    icon: <Plane size={48} />,
    title: "Airport Transfers",
    description: "Instant Jeddah Airport (KAIA) pickups. We provide 24/7 meet-and-greet services with real-time flight tracking for zero wait time.",
    link: "/airport-transfer-for-umrah",
  },
  {
    icon: <Car size={48} />,
    title: "Jeddah to Makkah",
    description: "The fastest way to reach Makkah from Jeddah. Enjoy fixed-rate, direct transfers with professional chauffeurs in premium vehicles.",
    link: "/jeddah-to-makkah-taxi-service",
  },
];

const stats = [
  { number: "15,000+", label: "Happy Pilgrims" },
  { number: "10+", label: "Years Experience" },
  { number: "24/7", label: "Availability" },
  { number: "100%", label: "Satisfaction Rate" },
];

const routes = [
  { from: "Jeddah Airport", to: "Makkah", price: "150 SAR", time: "~1.5 hrs" },
  { from: "Jeddah City", to: "Makkah", price: "200 SAR", time: "~1.5 hrs" },
  { from: "Makkah", to: "Madinah", price: "600 SAR", time: "~4.5 hrs" },
  { from: "Makkah", to: "Jeddah Airport", price: "150 SAR", time: "~1.5 hrs" },
];

export default function Home() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <div className="container">
        <KeyTakeaways
          items={[
            "Fixed Prices: No hidden charges or peak hour surcharges.",
            "24/7 Service: Available for Jeddah Airport transfers and Holy City travel anytime.",
            "Licensed Fleet: All vehicles are modern, insured, and Ministry authorized.",
            "Professional Drivers: Local experts with multilingual communication skills."
          ]}
        />
      </div>
      <Features />
      <TrustBadges />

      {/* Services Section */}
      <section className="section-lg bg-light">
        <div className="container">
          <h2 className="section-title">Professional Transportation Services</h2>
          <p className="section-subtitle">
            Get the most reliable transportation in Saudi Arabia. We provide direct Jeddah Airport transfers and Holy City taxi services with 100% fixed pricing.
          </p>
          <div className="grid-3">
            {services.map((service, i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{service.icon}</div>
                <h3 style={{ color: 'var(--primary)', marginBottom: '0.75rem', fontSize: '1.3rem' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.7' }}>{service.description}</p>
                <Link href={service.link} className="btn btn-outline-gold btn-sm">
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))',
        padding: '4rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.05,
        }} />
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-heading)',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}>
                  {stat.number}
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="section-lg">
        <div className="container">
          <h2 className="section-title">Popular Routes & Prices</h2>
          <p className="section-subtitle">
            Transparent pricing with no hidden fees. All prices are inclusive of tolls, fuel, and professional driver services.
          </p>
          <div style={{
            overflowX: 'auto',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'var(--white)',
              minWidth: '500px',
            }}>
              <thead>
                <tr style={{
                  background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))',
                  color: 'var(--white)',
                }}>
                  <th style={{ padding: '1.2rem 1.5rem', textAlign: 'left', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.5px' }}>From</th>
                  <th style={{ padding: '1.2rem 1.5rem', textAlign: 'left', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.5px' }}>To</th>
                  <th style={{ padding: '1.2rem 1.5rem', textAlign: 'center', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.5px' }}>Est. Time</th>
                  <th style={{ padding: '1.2rem 1.5rem', textAlign: 'center', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.5px' }}>Starting From</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route, i) => (
                  <tr key={i} style={{
                    borderBottom: '1px solid var(--gray-200)',
                    transition: 'background 0.2s',
                  }}>
                    <td style={{ padding: '1.1rem 1.5rem', fontWeight: 500 }}>{route.from}</td>
                    <td style={{ padding: '1.1rem 1.5rem', fontWeight: 500 }}>{route.to}</td>
                    <td style={{ padding: '1.1rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>{route.time}</td>
                    <td style={{ padding: '1.1rem 1.5rem', textAlign: 'center' }}>
                      <span style={{
                        background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
                        color: 'var(--primary)',
                        padding: '0.4rem 1rem',
                        borderRadius: '20px',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                      }}>
                        {route.price}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-3">
            <Link href="/prices" className="btn btn-primary">
              View All Prices
            </Link>
          </div>
        </div>
      </section>

      <FAQSection />

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 50%, var(--primary-light) 100%)',
        padding: '5rem 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.04,
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ color: 'var(--white)', marginBottom: '1rem', fontSize: '2.5rem' }}>Ready to Book Your Ride?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Book your comfortable and reliable taxi service today. Available 24/7 for all your transportation needs in Saudi Arabia.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/booking" className="btn btn-primary btn-lg">
              Book Now
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
