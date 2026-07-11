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
} from './Icons';
import styles from './Hero.module.css';
import { waLink } from '@/lib/contact';

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
            {/* LEFT COLUMN — Text Content */}
            <div className={styles.content}>
                <div className={styles.badge}>
                    <ShieldIcon size={14} className={styles.badgeIcon} />
                    Trusted by 15,000+ Travelers
                </div>

                <h1 className={styles.title}>
                    Saudi Arabia&apos;s Most Trusted<br />
                    <em>Luxury Transfer Service</em>
                </h1>

                <p className={styles.subtitle}>
                    Airport transfers, intercity travel, Umrah &amp; Hajj transport — 
                    across all of Saudi Arabia. Professional chauffeurs, fixed rates, 
                    zero hidden fees. Available 24/7.
                </p>

                <div className={styles.ctaGroup}>
                    <Link href="/book-online" className={styles.ctaButton}>
                        <CarIcon size={16} />
                        Book Your Ride
                    </Link>
                    <Link href="/quote" className={styles.ctaSecondary}>
                        <TagIcon size={16} />
                        Get Instant Quote
                    </Link>
                </div>

                <div className={styles.trustStrip}>
                    <span className={styles.trustItem}>
                        <PlaneIcon size={15} /> Flight Tracking
                    </span>
                    <span className={styles.trustItem}>
                        <ClockIcon size={15} /> 24/7 Service
                    </span>
                    <span className={styles.trustItem}>
                        <TagIcon size={15} /> Fixed Pricing
                    </span>
                    <span className={styles.trustItem}>
                        <ShieldIcon size={15} /> Licensed Fleet
                    </span>
                    <span className={styles.trustItem}>
                        <UserIcon size={15} /> 15,000+ Customers
                    </span>
                </div>
            </div>

            {/* RIGHT COLUMN — Glass Booking Card */}
            <div className={styles.visual}>
                <div className={styles.featureCard}>
                    
                    <h3>
                        <CarIcon size={24} />
                        Quick Booking
                    </h3>

                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            const target = e.target as any;
                            const message = `Assalamu Alaikum, I would like to book a ride.\nFrom: ${target.pickup.value}\nTo: ${target.dropoff.value}\nDate: ${target.date.value}`;
                            window.open(waLink(message), '_blank');
                        }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                    >
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" style={{ fontSize: '0.8rem' }}>Pickup</label>
                            <input name="pickup" type="text" className="form-input" placeholder="Airport, Hotel, etc." required style={{ padding: '12px 14px', fontSize: '0.9rem' }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" style={{ fontSize: '0.8rem' }}>Dropoff</label>
                            <input name="dropoff" type="text" className="form-input" placeholder="Destination" required style={{ padding: '12px 14px', fontSize: '0.9rem' }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" style={{ fontSize: '0.8rem' }}>Date</label>
                            <input name="date" type="date" className="form-input" required style={{ padding: '12px 14px', fontSize: '0.9rem' }} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '14px' }}>
                            Check Rates & Book
                        </button>
                    </form>

                    <div className={styles.serviceList}>
                        {services.map((s, i) => (
                            <div key={i} className={styles.serviceItem}>
                                <div className={styles.serviceItemIcon}>
                                    {s.icon}
                                </div>
                                <div className={styles.serviceItemText}>
                                    <span className={styles.serviceItemName}>{s.name}</span>
                                    <span className={styles.serviceItemDesc}>{s.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
