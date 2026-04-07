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
                RIGHT COLUMN — Feature Card
                (Balance: rich visual weight counterbalances text column)
                ============================================================ */}
            <div className={styles.visual}>
                <div className={styles.featureCard}>

                    {/* Card heading */}
                    <h3>
                        <CarIcon size={22} />
                        Our Services
                    </h3>

                    {/* Service list — Proximity: items grouped, consistent spacing */}
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

                    {/* Inline stats — Repetition: same gold number format as Stats section */}
                    <div className={styles.cardStats}>
                        <div className={styles.cardStat}>
                            <strong>15K+</strong>
                            <span>Pilgrims</span>
                        </div>
                        <div className={styles.cardStat}>
                            <strong>10+</strong>
                            <span>Yrs Exp.</span>
                        </div>
                        <div className={styles.cardStat}>
                            <strong>100%</strong>
                            <span>Satisfied</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
