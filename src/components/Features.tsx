import { SedanAccentIcon, ChauffeurCapIcon, ClockAccentIcon, ShieldCheckAccentIcon, MedalAccentIcon, ChatGlobeAccentIcon } from './Icons';
import styles from './Features.module.css';

/*
  FEATURES ("Our Advantages") — Fix 4, Homepage Colour System brief.
  Heading changed from "Premium Travel, Every Ride" (shared verbatim with
  TrendingDestinations.tsx's heading, a duplicate that made the two
  sections hard to tell apart) to a distinct title tied to this section's
  own subtitle copy. Icons switched from generic solid-fill glyphs to the
  custom stroke-based duotone set in Icons.tsx (navy stroke + one gold
  accent detail each), in 56px circular teal-tinted badges.
*/

const features = [
    {
        icon: <SedanAccentIcon size={26} />,
        title: "Premium Fleet",
        description:
            "Luxury sedans, spacious SUVs, and comfortable minivans — all maintained to Ministry standards and regularly inspected.",
    },
    {
        icon: <ChauffeurCapIcon size={26} />,
        title: "Professional Drivers",
        description:
            "Multilingual chauffeurs (Arabic, English, Urdu) with years of experience navigating Saudi Arabia's Holy Cities.",
    },
    {
        icon: <ClockAccentIcon size={26} />,
        title: "24/7 Availability",
        description:
            "Whether a 3 am airport pickup or a late-night Haram return, we're always available — book anytime, any day.",
    },
    {
        icon: <ShieldCheckAccentIcon size={26} />,
        title: "Safety Certified",
        description:
            "Fully licensed and insured service. Vehicles undergo regular safety checks and drivers carry Ministry credentials.",
    },
    {
        icon: <MedalAccentIcon size={26} />,
        title: "Award-Winning",
        description:
            "Recognised for excellence in pilgrim transportation — shortlisted for the 2024 Riyadh Excellence in Service Award.",
    },
    {
        icon: <ChatGlobeAccentIcon size={26} />,
        title: "Multilingual Support",
        description:
            "Customer support in Arabic, English, Urdu, and Hindi ensures you can communicate comfortably throughout your journey.",
    },
];

const Features = () => {
    return (
        <section className={styles.features}>
            <div className={styles.container}>

                {/* Section header — Alignment: centered axis */}
                <div className={styles.header}>
                    <span className={styles.eyebrow}>Our Advantages</span>
                    <h2 className={styles.title}>Built Around Your Comfort</h2>
                    <p className={styles.subtitle}>
                        Every element of our service is built around your comfort, safety,
                        and peace of mind — from first booking to final drop-off.
                    </p>
                </div>

                {/* Grid — Balance: 3 columns × 2 rows, symmetric */}
                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.card}>

                            <div className={styles.icon}>
                                {feature.icon}
                            </div>

                            <h3 className={styles.cardTitle}>{feature.title}</h3>

                            {/* Body — Contrast: muted, smaller, longer text */}
                            <p className={styles.cardText}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
