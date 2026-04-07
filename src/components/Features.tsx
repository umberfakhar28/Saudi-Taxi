import { StarIcon, UserIcon, TimerIcon, ShieldIcon, AwardIcon, MessageSquareIcon } from './Icons';
import styles from './Features.module.css';

/*
  FEATURES — 5 Design Principles:
  Balance:    6 features in a 3×2 grid — perfectly symmetric
  Alignment:  All cards' content centered on the same axis
  Proximity:  Icon → Title spaced tightly; Title → Body with more breathing room
  Repetition: Identical icon/title/body slot in every card
  Contrast:   Card (white) on section bg (green tint); icon (green/gold) vs card bg (white)
*/

const features = [
    {
        icon: <StarIcon size={26} />,
        title: "Premium Fleet",
        description:
            "Luxury sedans, spacious SUVs, and comfortable minivans — all maintained to Ministry standards and regularly inspected.",
    },
    {
        icon: <UserIcon size={26} />,
        title: "Professional Drivers",
        description:
            "Multilingual chauffeurs (Arabic, English, Urdu) with years of experience navigating Saudi Arabia's Holy Cities.",
    },
    {
        icon: <TimerIcon size={26} />,
        title: "24/7 Availability",
        description:
            "Whether a 3 am airport pickup or a late-night Haram return, we're always available — book anytime, any day.",
    },
    {
        icon: <ShieldIcon size={26} />,
        title: "Safety Certified",
        description:
            "Fully licensed and insured service. Vehicles undergo regular safety checks and drivers carry Ministry credentials.",
    },
    {
        icon: <AwardIcon size={26} />,
        title: "Award-Winning",
        description:
            "Recognised for excellence in pilgrim transportation — shortlisted for the 2024 Riyadh Excellence in Service Award.",
    },
    {
        icon: <MessageSquareIcon size={26} />,
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
                    {/* Title — Contrast: large dark green on light green tint bg */}
                    <h2 className={styles.title}>Why Choose Saudi Taxi</h2>
                    <p className={styles.subtitle}>
                        Every element of our service is built around your comfort, safety,
                        and peace of mind — from first booking to final drop-off.
                    </p>
                </div>

                {/* Grid — Balance: 3 columns × 2 rows, symmetric */}
                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.card}>

                            {/* Icon — Proximity: close to title, Contrast: green/gold vs white card */}
                            <div className={styles.icon}>
                                {feature.icon}
                            </div>

                            {/* Title — Contrast: dark green, larger than body */}
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
