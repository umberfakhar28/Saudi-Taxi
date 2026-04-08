'use client';

import Link from 'next/link';
import {
    ShieldIcon,
    MessageIcon,
    ClockIcon,
    TagIcon,
    UserIcon,
    CarIcon,
    PlaneIcon,
    LandmarkIcon,
    StarIcon,
} from './Icons';
import styles from './Hero.module.css';

/*
  HERO — Balance Principle: Two-column layout.
  Left: text content (lighter visual weight)
  Right: feature card (heavier density, balances the left)

  Alignment Principle:
  - Left column: strict left-alignment for readability
  - Right column: structured card with internal left-alignment

  Proximity Principle:
  - Badge → Title → Subtitle grouped with tight spacing
  - A larger gap separates CTAs from the trust strip
  - Service items are visually grouped inside the card

  Repetition Principle:
  - Same badge pill style as site-wide
  - Same button styles (ctaButton = btn-primary, ctaSecondary = btn-outline)

  Contrast Principle:
  - H1 is 3.8rem / white on dark green = maximum contrast
  - Gold CTA vs dark background = unmissable
  - Muted subtitle text vs bright heading = hierarchy
*/

const services = [
    {
        icon: <LandmarkIcon size={18} />,
        name: 'Umrah Taxi',
        desc: 'Makkah · Madinah · Jeddah',
    },
    {
        icon: <PlaneIcon size={18} />,
        name: 'Airport Transfers',
        desc: 'KAIA · 24/7 Meet & Greet',
    },
    {
        icon: <CarIcon size={18} />,
        name: 'Private Taxi',
        desc: 'Fixed Rate · No Hidden Fees',
    },
];

const Hero = () => {
    return (
        <section className={styles.hero}>
            {/* ============================================================
                LEFT COLUMN — Text Content
                (Alignment: all text left-aligned for clean scanability)
                ============================================================ */}
            <div className={styles.content}>

                {/* Badge — Repetition: same pill style as section eyebrows */}
                <div className={styles.badge}>
                    <ShieldIcon size={14} className={styles.badgeIcon} />
                    Trusted by 15,000+ Pilgrims
                </div>

                {/* H1 — Contrast: largest element, highest visual weight */}
                {/* Proximity: directly follows badge, no wasted space */}
                <h1 className={styles.title}>
                    #1 Rated Taxi in<br />
                    <em>Makkah to Jeddah</em>
                </h1>

                {/* Subtitle — Contrast: muted vs H1, proximity: tight below title */}
                <p className={styles.subtitle}>
                    Fixed-rate, reliable taxi services for Umrah pilgrims and travellers.
                    Jeddah Airport transfers and Holy City transport — 24/7 with zero
                    hidden fees.
                </p>

                {/* CTAs — Balance: two equal-weight actions */}
                <div className={styles.ctaGroup}>
                    <Link href="/book-online" className={styles.ctaButton}>
                        <StarIcon size={16} />
                        Book Your Ride
                    </Link>
                    <a
                        href="https://wa.me/966123456789"
                        className={styles.ctaSecondary}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <MessageIcon size={18} />
                        WhatsApp Us
                    </a>
                </div>

                {/* Trust strip — Proximity: separated from CTAs by border + space */}
                <div className={styles.trustStrip}>
                    <span className={styles.trustItem}>
                        <ClockIcon size={15} /> 24/7 Available
                    </span>
                    <span className={styles.trustItem}>
                        <TagIcon size={15} /> Fixed Prices
                    </span>
                    <span className={styles.trustItem}>
                        <UserIcon size={15} /> Professional Drivers
                    </span>
                </div>
            </div>

            {/* ============================================================
                RIGHT COLUMN — Feature Card with Booking Form
                ============================================================ */}
            <div className={styles.visual}>
                <div className={styles.featureCard} style={{ background: 'rgba(255,255,255,1)', backdropFilter: 'none', border: 'none' }}>
                    
                    <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '1.4rem' }}>
                        <CarIcon size={24} style={{ color: 'var(--accent)' }} />
                        Quick Booking
                    </h3>

                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            const target = e.target as any;
                            const message = `Assalamu Alaikum, I would like to book a ride.%0AFrom: ${target.pickup.value}%0ATo: ${target.dropoff.value}%0ADate: ${target.date.value}`;
                            window.open(`https://wa.me/966501234567?text=${message}`, '_blank');
                        }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pickup</label>
                            <input name="pickup" type="text" className="form-input" placeholder="Airport, Hotel, etc." required style={{ padding: '10px 14px', fontSize: '0.9rem' }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dropoff</label>
                            <input name="dropoff" type="text" className="form-input" placeholder="Destination" required style={{ padding: '10px 14px', fontSize: '0.9rem' }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Date</label>
                            <input name="date" type="date" className="form-input" required style={{ padding: '10px 14px', fontSize: '0.9rem' }} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '14px' }}>
                            Check Rates & Book
                        </button>
                    </form>

                    <div style={{ 
                        marginTop: '1.5rem', 
                        paddingTop: '1rem', 
                        borderTop: '1px solid var(--gray-100)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                            Our Services
                        </div>
                        {services.map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
                                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{s.name}</span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({s.desc})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
