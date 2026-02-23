import Link from 'next/link';
import { ShieldCheck, MessageCircle, Clock, Tag, UserCheck } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <div className={styles.badge}>
                    <ShieldCheck size={16} className={styles.badgeIcon} /> Trusted by 15,000+ Pilgrims
                </div>
                <h1 className={styles.title}>
                    #1 Rated Taxi Service <br />
                    in Makkah &amp; Jeddah
                </h1>
                <p className={styles.subtitle}>
                    Get instant Jeddah Airport transfers and Holy City transport. We provide fixed-rate, reliable taxi services for Umrah pilgrims 24/7 with zero hidden fees.
                </p>
                <div className={styles.ctaGroup}>
                    <Link href="/booking" className={styles.ctaButton}>
                        Book Your Ride
                    </Link>
                    <a href="https://wa.me/966123456789" className={styles.ctaSecondary} target="_blank" rel="noopener noreferrer">
                        <MessageCircle size={20} /> WhatsApp Us
                    </a>
                </div>
                <div className={styles.trustBadges}>
                    <span><Clock size={16} /> 24/7 Available</span>
                    <span><Tag size={16} /> Fixed Prices</span>
                    <span><UserCheck size={16} /> Professional Drivers</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
