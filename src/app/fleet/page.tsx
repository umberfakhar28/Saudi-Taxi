import type { ComponentType } from 'react';
import styles from './fleet.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { generatePageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { waLink } from "@/lib/contact";
import {
    ShieldIcon, UserIcon, PackageIcon, WhatsAppIcon, ChevronRightIcon,
    BriefcaseIcon, CarIcon, MoonIcon, TargetIcon, PlaneIcon, CompassIcon,
    HeartIcon, ChauffeurCapIcon,
} from "@/components/Icons";
import { FLEET_CATEGORY_GUIDE, FLEET_VEHICLES, vehiclesFor } from "@/lib/fleetVehicles";

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

const CATEGORY_ICONS: Record<string, ComponentType<{ size?: number }>> = {
    executive: BriefcaseIcon,
    "everyday-sedans": CarIcon,
    "premium-suv": UserIcon,
    "premium-van": PackageIcon,
    "group-umrah": MoonIcon,
};

const BENEFITS = [
    {
        icon: TargetIcon,
        title: "Vehicle Matched to Your Group",
        text: "Reserve ahead and we'll match a vehicle to your passenger count, luggage, and journey type — not whatever happens to be free.",
    },
    {
        icon: PackageIcon,
        title: "Enough Space for Passengers & Luggage",
        text: "Avoid arriving to a car that's too small for your group. Confirming a vehicle in advance means the right seating and boot space are ready.",
    },
    {
        icon: ChauffeurCapIcon,
        title: "Professional Chauffeur Service",
        text: "Every vehicle comes with a licensed, professional driver — comfortable, private transportation from pickup to drop-off.",
    },
    {
        icon: PlaneIcon,
        title: "Reliable Airport Pickup & Meet & Greet",
        text: "Pre-booked airport transfers include meet-and-greet pickup and flight tracking, so your driver is waiting regardless of delays.",
    },
    {
        icon: CompassIcon,
        title: "Comfortable Intercity Travel",
        text: "Longer journeys between Saudi cities are more comfortable in a vehicle sized correctly for the trip, booked before you travel.",
    },
    {
        icon: HeartIcon,
        title: "Family-Friendly Transportation",
        text: "From premium SUVs to spacious vans, families can reserve a vehicle with enough room for children, car seats and luggage.",
    },
    {
        icon: MoonIcon,
        title: "Umrah Transportation",
        text: "Pilgrims traveling between airports, Makkah, Madinah and other destinations can pre-book a group van or minibus sized to the party.",
    },
    {
        icon: BriefcaseIcon,
        title: "Corporate & Executive Travel",
        text: "Business travelers can reserve an executive sedan or van in advance for a punctual, professional arrival at every meeting.",
    },
];

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

            {/* 4 — Find the Right Vehicle for Your Journey (category
                recommendations). A different card style from the exterior/
                interior grids above — icon-led, text-first, no photos —
                so it reads as guidance rather than a repeat of the fleet
                grid. */}
            <section className="section-lg">
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">Vehicle Guide</span>
                        <h2 className="section-title">Find the Right Vehicle for Your Journey</h2>
                        <p className="section-subtitle">
                            Not sure which vehicle type fits your trip? Here&apos;s how our fleet categories
                            match up against the journeys travelers book most.
                        </p>
                    </div>

                    <p style={{ maxWidth: 820, margin: '0 auto var(--space-10)', textAlign: 'center', color: 'var(--text-body)', fontSize: 'var(--text-lg)', lineHeight: 1.8 }}>
                        Planning a private <Link href="/airport-transfers" style={{ color: 'var(--teal)', fontWeight: 600 }}>Saudi Arabia airport transfer</Link>, a
                        family trip, or <Link href="/umrah-taxi-services" style={{ color: 'var(--teal)', fontWeight: 600 }}>Umrah transportation</Link> for
                        a larger group? Each category below lists the vehicles best suited to that kind of journey, so you can book
                        the right fit the first time — or explore our <Link href="/routes" style={{ color: 'var(--teal)', fontWeight: 600 }}>intercity transfer routes</Link> if
                        you&apos;re traveling between cities.
                    </p>

                    <div className={styles.recommendGrid}>
                        {FLEET_CATEGORY_GUIDE.map((cat) => {
                            const Icon = CATEGORY_ICONS[cat.id] ?? CarIcon;
                            const vehicles = vehiclesFor(cat.vehicleSlugs);
                            return (
                                <div key={cat.id} className={styles.recommendCard}>
                                    <div className={styles.recommendIcon}><Icon size={24} /></div>
                                    <h3 className={styles.recommendTitle}>{cat.title}</h3>
                                    <p className={styles.recommendTagline}>{cat.tagline}</p>

                                    <div className={styles.recommendLabel}>Recommended Vehicles</div>
                                    <div className={styles.recommendVehicles}>
                                        {vehicles.map((v) => (
                                            <div key={v.slug} className={styles.recommendVehicleRow}>
                                                {v.name} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>· up to {v.passengers} passengers</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={styles.recommendLabel}>Best For</div>
                                    <div className={styles.recommendBestForRow}>
                                        {cat.bestForList.map((b) => (
                                            <span key={b} className={styles.recommendChip}>{b}</span>
                                        ))}
                                    </div>

                                    <Link href="/book-online" className={`btn btn-secondary btn-sm ${styles.recommendCta}`}>
                                        Choose Your Vehicle
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 5 — Compare Vehicles by Capacity, Comfort & Use. A single
                large, responsive comparison table — a different layout
                again from the card grids above. */}
            <section className={`section-lg ${styles.compareSection}`}>
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">Compare</span>
                        <h2 className="section-title">Compare Vehicles by Capacity, Comfort &amp; Use</h2>
                    </div>

                    <p className={styles.compareIntro}>
                        Compare every vehicle in the Gulf Trip Service fleet side by side — passenger capacity,
                        luggage space, comfort level, and the journeys each one suits best — to choose confidently
                        before you book.
                    </p>

                    <div className={styles.compareTableWrapper}>
                        <table className={styles.compareTable}>
                            <caption>Gulf Trip Service fleet comparison — passenger capacity, luggage space and recommended use</caption>
                            <thead>
                                <tr>
                                    <th scope="col">Vehicle</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Passengers</th>
                                    <th scope="col">Luggage</th>
                                    <th scope="col">Comfort</th>
                                    <th scope="col">Best For</th>
                                    <th scope="col"><span className="sr-only">Book</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {FLEET_VEHICLES.map((v) => (
                                    <tr key={v.slug}>
                                        <th scope="row" className={styles.compareVehicleCell}>
                                            <span className={styles.compareVehicle}>
                                                <span className={styles.compareThumb}>
                                                    {v.image ? (
                                                        <Image
                                                            src={v.image}
                                                            alt={`${v.name} — ${v.type.toLowerCase()} in the Gulf Trip Service fleet`}
                                                            fill
                                                            sizes="96px"
                                                            className={styles.compareThumbImage}
                                                        />
                                                    ) : (
                                                        <CarIcon size={22} />
                                                    )}
                                                </span>
                                                {v.name}
                                            </span>
                                        </th>
                                        <td>{v.type}</td>
                                        <td>{v.passengers}</td>
                                        <td>{v.luggage} bags</td>
                                        <td>{v.comfort}</td>
                                        <td>{v.bestFor}</td>
                                        <td>
                                            <Link
                                                href={`/book-online?vehicle=${v.slug}&vehicleName=${encodeURIComponent(v.name)}`}
                                                className={styles.compareBookLink}
                                            >
                                                Book →
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.compareNotes}>
                        <p>
                            <strong>Choosing a vehicle for an airport transfer:</strong> an executive sedan or premium SUV covers
                            most solo and family arrivals comfortably — see our <Link href="/airport-transfers" style={{ color: 'var(--teal)', fontWeight: 600 }}>airport transfer services</Link> for
                            meet-and-greet pickup details at every major Saudi airport.
                        </p>
                        <p>
                            <strong>Choosing a vehicle for families or groups:</strong> luggage is usually the deciding factor
                            more than passenger count — a premium van or SUV gives a family room to breathe, while a minibus or
                            Sprinter suits larger parties traveling together.
                        </p>
                        <p>
                            <strong>Choosing a vehicle for Umrah:</strong> groups traveling between airports, Makkah and Madinah
                            are usually better served by a van or minibus than several sedans — browse our <Link href="/umrah-taxi-services" style={{ color: 'var(--teal)', fontWeight: 600 }}>Umrah transportation options</Link> for
                            package-specific guidance.
                        </p>
                        <p>
                            <strong>Choosing a vehicle for intercity travel:</strong> longer road journeys between cities are
                            more comfortable in an executive sedan or premium van — explore our <Link href="/routes" style={{ color: 'var(--teal)', fontWeight: 600 }}>intercity transfer routes</Link> or <Link href="/private-taxi" style={{ color: 'var(--teal)', fontWeight: 600 }}>private taxi service</Link> for
                            city-to-city options.
                        </p>
                        <p>
                            <strong>Choosing premium chauffeur transportation:</strong> for business travel or VIP arrivals,
                            an executive sedan with a professional chauffeur is the standard choice — see our <Link href="/corporate-transportation-services" style={{ color: 'var(--teal)', fontWeight: 600 }}>corporate transportation services</Link> for
                            details.
                        </p>
                    </div>
                </div>
            </section>

            {/* 6 — Why Reserve Your Vehicle in Advance? Closing benefits +
                CTA, navy band matching the sitewide closing-CTA pattern
                used across every other page family. */}
            <section className={`section-lg ${styles.benefitsSection}`}>
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'var(--line-dark)', color: 'var(--on-dark)' }}>Book Ahead</span>
                        <h2 className="section-title" style={{ color: 'var(--on-dark)' }}>Why Reserve Your Vehicle in Advance?</h2>
                        <p className="section-subtitle" style={{ color: 'var(--on-dark-muted)' }}>
                            Confirming your vehicle before you travel means the right car — and the right driver —
                            is ready when you land.
                        </p>
                    </div>

                    <div className={styles.benefitsGrid}>
                        {BENEFITS.map((b) => (
                            <div key={b.title} className={styles.benefitCard}>
                                <div className={styles.benefitIcon}><b.icon size={20} /></div>
                                <h3 className={styles.benefitTitle}>{b.title}</h3>
                                <p className={styles.benefitText}>{b.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.benefitsCtaRow}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">
                            Book Your Ride
                        </Link>
                        <a
                            href={waLink("Hi, I'd like help choosing the right vehicle for my trip.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp btn-lg"
                        >
                            <WhatsAppIcon size={18} /> WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
