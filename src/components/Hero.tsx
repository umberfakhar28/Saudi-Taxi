import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <div className={styles.badge}>🕌 Trusted by 15,000+ Pilgrims</div>
                <h1 className={styles.title}>
                    Reliable Taxi Service <br />
                    in Makkah &amp; Jeddah
                </h1>
                <p className={styles.subtitle}>
                    Professional taxi services for Umrah pilgrims. Airport transfers, inter-city travel, and Ziyarat tours — all at transparent, fixed prices.
                </p>
                <div className={styles.ctaGroup}>
                    <Link href="/booking" className={styles.ctaButton}>
                        Book Your Ride
                    </Link>
                    <a href="https://wa.me/966123456789" className={styles.ctaSecondary} target="_blank" rel="noopener noreferrer">
                        💬 WhatsApp Us
                    </a>
                </div>
                <div className={styles.trustBadges}>
                    <span>✓ 24/7 Available</span>
                    <span>✓ Fixed Prices</span>
                    <span>✓ Professional Drivers</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
