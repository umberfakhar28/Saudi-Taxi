import styles from './fleet.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { generatePageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { waLink } from "@/lib/contact";
import { ShieldIcon, UserIcon, PackageIcon, WhatsAppIcon, ChevronRightIcon } from "@/components/Icons";

export const metadata = generatePageMetadata({
    title: "Our Fleet",
    description: "Explore Gulf Trip Service's fleet in Saudi Arabia — executive sedans, luxury SUVs, passenger vans, minibuses and touring coaches. Clean, well-maintained vehicles matched to your group size.",
    path: "/fleet",
    keywords: [
        "taxi fleet Saudi Arabia",
        "executive sedan Saudi Arabia",
        "luxury SUV rental Saudi Arabia",
        "passenger van hire Saudi Arabia",
        "minibus rental Saudi Arabia",
        "touring coach rental Saudi Arabia",
        "premium taxi fleet",
    ],
});

/**
 * Five vehicle-type categories (not individual brands/models — see Fleet
 * page refresh brief). Each ties an exterior photo (§2 — Book by Vehicle
 * Type) to a matching interior photo (§3 — Travel in Comfort), both sourced
 * from public/fleet and converted to WebP. Passenger/luggage figures follow
 * the same tiering as src/lib/fleetConfig.ts's sedan/SUV/van rows, extended
 * with a minibus and touring-coach tier for the two larger categories that
 * config doesn't cover.
 */
const FLEET_CATEGORIES = [
    {
        slug: "executive-sedan",
        name: "Executive Sedan",
        exteriorImage: "/fleet/fleet-executive-sedan-exterior.webp",
        interiorImage: "/fleet/fleet-executive-sedan-interior.webp",
        passengers: "1–3",
        luggage: "2",
        description: "Refined, chauffeur-driven sedans for airport transfers and business travel — quiet, comfortable, and always on time.",
    },
    {
        slug: "luxury-suv",
        name: "Luxury SUV",
        exteriorImage: "/fleet/fleet-luxury-suv-exterior.webp",
        interiorImage: "/fleet/fleet-luxury-suv-interior.webp",
        passengers: "1–5",
        luggage: "4",
        description: "Spacious, commanding SUVs with extra legroom and luggage room — a comfortable choice for families and small groups.",
    },
    {
        slug: "passenger-van",
        name: "Passenger Van",
        exteriorImage: "/fleet/fleet-van-exterior.webp",
        interiorImage: "/fleet/fleet-van-interior.webp",
        passengers: "6–9",
        luggage: "8",
        description: "Roomy vans built for medium-size groups and families traveling together with a full set of luggage.",
    },
    {
        slug: "minibus",
        name: "Minibus",
        exteriorImage: "/fleet/fleet-minibus-exterior.webp",
        interiorImage: "/fleet/fleet-minibus-interior.webp",
        passengers: "10–22",
        luggage: "20",
        description: "Comfortable minibuses for Umrah groups and mid-size parties — reclining seats and generous room to move.",
    },
    {
        slug: "touring-coach",
        name: "Touring Coach",
        exteriorImage: "/fleet/fleet-coach-exterior.webp",
        interiorImage: "/fleet/fleet-coach-interior.webp",
        passengers: "23–50",
        luggage: "40",
        description: "Full-size touring coaches for large group transfers and multi-city itineraries — built for long-distance comfort.",
    },
] as const;

export default function FleetPage() {
    const schemas = [
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Fleet", path: "/fleet" }]),
    ];

    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />

            {/* 1 — Fleet Hero */}
            <section className={styles.hero}>
                <Image
                    src="/fleet/fleet-hero.webp"
                    alt="Gulf Trip Service premium fleet lineup — executive sedan, luxury SUV and passenger van in Saudi Arabia"
                    fill
                    priority
                    sizes="100vw"
                    className={styles.heroImage}
                    style={{ objectPosition: "center 70%" }}
                />
                <div className={styles.heroScrim} />
                <div className="container" style={{ position: "relative", zIndex: 2 }}>
                    <span className={styles.heroBadge}>
                        <ShieldIcon size={14} />
                        Our Fleet
                    </span>
                    <h1 className={styles.heroTitle}>
                        Premium Vehicles for <em>Every Journey</em>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        From executive sedans to full-size touring coaches — a fleet of clean, well-maintained
                        vehicles matched to your group size, chosen for comfort and reliability across Saudi Arabia.
                    </p>
                    <div className={styles.heroCtas}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">
                            Book Now
                        </Link>
                        <a
                            href={waLink("Hi, I'd like to know more about your fleet.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp btn-lg"
                        >
                            <WhatsAppIcon size={18} /> WhatsApp
                        </a>
                    </div>
                    <div className={styles.heroBreadcrumb}>
                        <Link href="/">Home</Link>
                        <ChevronRightIcon size={12} style={{ display: "inline", verticalAlign: "middle" }} />
                        <span>Fleet</span>
                    </div>
                </div>
            </section>

            {/* 2 — Fleet / Book by Vehicle Type */}
            <section className="section-lg">
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">Our Fleet</span>
                        <h2 className="section-title">Book by Vehicle Type</h2>
                        <p className="section-subtitle">
                            Choose the ride that fits your journey — from a private sedan to a full-group touring coach.
                        </p>
                    </div>

                    <div className={styles.typeGrid}>
                        {FLEET_CATEGORIES.map((cat) => (
                            <div key={cat.slug} className={styles.typeCard}>
                                <div className={styles.typeImageWrap}>
                                    <Image
                                        src={cat.exteriorImage}
                                        alt={`${cat.name} exterior — Gulf Trip Service fleet vehicle in Saudi Arabia`}
                                        fill
                                        className={styles.typeImage}
                                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                                    />
                                </div>
                                <div className={styles.typeBody}>
                                    <h3 className={styles.typeName}>{cat.name}</h3>
                                    <p className={styles.typeDesc}>{cat.description}</p>
                                    <div className={styles.typeSpecs}>
                                        <span><UserIcon size={15} /> {cat.passengers} Passengers</span>
                                        <span><PackageIcon size={15} /> {cat.luggage} Bags</span>
                                    </div>
                                    <Link href={`/book-online?vehicle=${cat.slug}&vehicleName=${encodeURIComponent(cat.name)}`} className="btn btn-outline-gold btn-sm">
                                        Book Now<span className="sr-only"> the {cat.name}</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3 — Travel in Comfort / Vehicle Interiors */}
            <section className={`section-lg ${styles.interiorSection}`}>
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">Passenger Comfort</span>
                        <h2 className="section-title">Travel in Comfort</h2>
                        <p className="section-subtitle">
                            Step inside — spacious, immaculately kept cabins designed for a smooth, relaxed ride
                            from pickup to destination.
                        </p>
                    </div>

                    <div className={styles.interiorGrid}>
                        {FLEET_CATEGORIES.map((cat) => (
                            <div key={cat.slug} className={styles.interiorCard}>
                                <Image
                                    src={cat.interiorImage}
                                    alt={`${cat.name} interior — premium cabin comfort, Gulf Trip Service`}
                                    fill
                                    className={styles.interiorImage}
                                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                                />
                                <div className={styles.interiorCaption}>
                                    <span>{cat.name} Interior</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
