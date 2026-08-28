import Image from "next/image";
import { SedanAccentIcon, ChauffeurCapIcon, PlaneIcon, PackageIcon, BriefcaseIcon, NavigationIcon } from "./Icons";
import styles from "./Features.module.css";

/*
  FEATURES ("Built Around Your Comfort") — homepage revision brief §4.
  Each card now carries a real cover photo (not icon-only), so the section
  reads as photographic/editorial rather than a plain icon grid — the icon
  becomes a small accent badge over the image instead of the card's whole
  visual identity. Content rewritten around the six customer concerns the
  brief names explicitly; the previous "Award-Winning ... shortlisted for
  the 2024 Riyadh Excellence in Service Award" card is replaced outright —
  no such award exists to claim, and ground rule 9 (no fabricated
  certifications/awards) rules out keeping it.
*/

const features = [
    {
        icon: <SedanAccentIcon size={20} />,
        title: "Comfortable Vehicles",
        description:
            "Travel in a clean, spacious and professionally maintained vehicle — sedans, SUVs and minivans, all inspected to Ministry standards.",
        image: "/images/fleet-suv.jpg",
        alt: "Premium SUV from the Gulf Trip Service fleet, prepared for a private transfer",
    },
    {
        icon: <ChauffeurCapIcon size={20} />,
        title: "Professional Chauffeurs",
        description:
            "Enjoy a smooth, unhurried journey with experienced, multilingual drivers (Arabic, English, Urdu) focused on punctual, courteous service.",
        image: "/hero-slider/gulftripservice-premium-chauffeur-service.webp",
        alt: "Professional Gulf Trip Service chauffeur standing beside a private vehicle",
    },
    {
        icon: <PlaneIcon size={20} />,
        title: "Airport Pickup & Drop-off",
        description:
            "Flight tracking and meet-and-greet pickup mean your driver is already waiting at arrivals, whatever time you land.",
        image: "/hero-slider/saudi-airport-transfer-service.webp",
        alt: "Private airport transfer vehicle waiting at arrivals in Saudi Arabia",
    },
    {
        icon: <PackageIcon size={20} />,
        title: "Door-to-Door Service",
        description:
            "Travel directly between your chosen pickup point and destination, with luggage assistance handled for you along the way.",
        image: "/images/private-chauffeur-luggage-assistance-saudi-arabia.webp",
        alt: "Gulf Trip Service chauffeur assisting a guest with luggage at a hotel entrance",
    },
    {
        icon: <BriefcaseIcon size={20} />,
        title: "Business & Executive Travel",
        description:
            "Executive-class vehicles and punctual, discreet drivers suited to meetings, delegations and corporate schedules.",
        image: "/images/BMW 7 Series.webp",
        alt: "Executive sedan used for business and corporate chauffeur transfers",
    },
    {
        icon: <NavigationIcon size={20} />,
        title: "City-to-City & Long-Distance Transfers",
        description:
            "One private vehicle for the whole journey between cities, with rest stops planned around your group rather than a fixed timetable.",
        image: "/hero-slider/gulf-cross-border-chauffeur-service.webp",
        alt: "Private chauffeur vehicle on a Gulf highway during a long-distance transfer",
    },
];

const Features = () => {
    return (
        <section className={styles.features}>
            <div className={styles.container}>

                {/* Section header — Alignment: centered axis */}
                <div className={styles.header}>
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
                            <div className={styles.cardImage}>
                                <Image
                                    src={feature.image}
                                    alt={feature.alt}
                                    fill
                                    loading="lazy"
                                    sizes="(max-width: 640px) 92vw, (max-width: 960px) 46vw, 30vw"
                                    className={styles.image}
                                />
                                <span className={styles.icon}>{feature.icon}</span>
                            </div>

                            <div className={styles.cardBody}>
                                <h3 className={styles.cardTitle}>{feature.title}</h3>
                                <p className={styles.cardText}>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
