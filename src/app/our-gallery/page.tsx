import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { WHATSAPP_URL } from "@/lib/contact";
import { FLEET_VEHICLES } from "@/lib/fleetVehicles";
import { allCities } from "@/lib/cityData3";
import { CarIcon, MapPinIcon, EyeIcon, ClockIcon } from "@/components/Icons";
import GalleryGrid, { type GalleryItem } from "./GalleryGrid";
import styles from "./gallery.module.css";

export const metadata = generatePageMetadata({
    title: "Our Gallery",
    description: "Browse our gallery featuring our fleet of vehicles, the Holy sites of Makkah and Madinah, and our satisfied customers from around the world.",
    path: "/our-gallery",
    keywords: ["taxi fleet gallery", "Makkah gallery", "Madinah gallery Saudi Arabia", "Saudi taxi photos"],
});

const schemas = [
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Our Gallery", path: "/our-gallery" }]),
];

const categories = ["All", "Fleet", "Makkah", "Madinah", "Jeddah", "AlUla", "Taif"];

const galleryItems: GalleryItem[] = [
    { emoji: "🕌", title: "Masjid Al-Haram", category: "Makkah", caption: "The Grand Mosque and Holy Kaaba" },
    { emoji: "🚗", title: "Mercedes E-Class", category: "Fleet", caption: "Our premium business class sedan", image: "/images/fleet-sedan2.jpg", objectPosition: "20% center" },
    { emoji: "🌙", title: "Prophet's Mosque", category: "Madinah", caption: "Masjid Al-Nabawi at dawn" },
    { emoji: "🚐", title: "Toyota Hiace", category: "Fleet", caption: "Our 12-seater group minivan", image: "/fleet/toyota-hiace.avif", objectPosition: "center 58%" },
    { emoji: "🏔️", title: "Jabal Al-Nour", category: "Makkah", caption: "Cave of Hira where revelation began" },
    { emoji: "🌅", title: "Jeddah Corniche", category: "Jeddah", caption: "The beautiful Red Sea waterfront", image: "/images/city-jeddah.jpg", objectPosition: "center center" },
    { emoji: "🚙", title: "Toyota Land Cruiser", category: "Fleet", caption: "Our luxury 7-seater SUV", image: "/images/fleet-suv.jpg", objectPosition: "center top" },
    { emoji: "🌿", title: "Jannat Al-Baqi", category: "Madinah", caption: "The sacred cemetery of Madinah" },
    { emoji: "🏜️", title: "Elephant Rock AlUla", category: "AlUla", caption: "The iconic natural rock formation" },
    { emoji: "🌹", title: "Taif Rose Farm", category: "Taif", caption: "The famous rose gardens of Taif" },
    { emoji: "🕌", title: "Masjid Quba", category: "Madinah", caption: "The first mosque built in Islam" },
    { emoji: "🚗", title: "Toyota Camry", category: "Fleet", caption: "Our comfortable economy sedan", image: "/fleet/toyota-camry.avif", objectPosition: "center 62%" },
    { emoji: "🚙", title: "GMC Yukon", category: "Fleet", caption: "Our spacious premium SUV for families", image: "/fleet/gmc-yukon-at4.avif", objectPosition: "center 55%" },
    { emoji: "⛰️", title: "Mount Uhud", category: "Madinah", caption: "Historic site of the Battle of Uhud" },
    { emoji: "🌊", title: "Jeddah Floating Mosque", category: "Jeddah", caption: "Al-Rahma Mosque on the Red Sea" },
    { emoji: "🏰", title: "Al-Balad Old Town", category: "Jeddah", caption: "UNESCO World Heritage Old Town of Jeddah" },
    { emoji: "🌄", title: "Hegra (Madain Saleh)", category: "AlUla", caption: "Ancient Nabataean tombs of Hegra" },
    { emoji: "🚐", title: "GMC Savana", category: "Fleet", caption: "Our executive 8-seater passenger van", image: "/images/chauffeur.jpg", objectPosition: "center 30%" },
    { emoji: "🏔️", title: "Al-Shafa, Taif", category: "Taif", caption: "Cool mountains of Al-Shafa above Makkah" },
    { emoji: "🌃", title: "Makkah Skyline", category: "Makkah", caption: "Makkah Clock Tower and Holy Mosque at night" },
    { emoji: "🚙", title: "Chevrolet Suburban", category: "Fleet", caption: "Our full-size SUV for long journeys", image: "/fleet/chevrolet-suburban.webp", objectPosition: "center 55%" },
    { emoji: "🚐", title: "Hyundai Staria", category: "Fleet", caption: "Our modern premium family van", image: "/fleet/hyundai-staria.avif", objectPosition: "center 62%" },
    { emoji: "🚐", title: "Hyundai Starex", category: "Fleet", caption: "Our group van for airport and Umrah transfers", image: "/fleet/hyundai-starex.avif", objectPosition: "center 60%" },
    { emoji: "🚌", title: "Toyota Coaster", category: "Fleet", caption: "Our minibus for Umrah groups and tours", image: "/fleet/toyota-coaster.avif", objectPosition: "center 60%" },
];

const stats = [
    { Icon: CarIcon, number: String(new Set(FLEET_VEHICLES.map((v) => v.type)).size), label: "Vehicle Types" },
    { Icon: MapPinIcon, number: String(allCities.length), label: "Saudi Cities Served" },
    { Icon: EyeIcon, number: String(galleryItems.length), label: "Gallery Highlights" },
    { Icon: ClockIcon, number: "24/7", label: "Service Available" },
];

export default function OurGallery() {
    return (
        <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
        <main>
            <section className="page-hero">
                <h1>Our Gallery</h1>
                <p>Explore our fleet of vehicles and discover the breathtaking destinations we serve across Saudi Arabia.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Our Gallery</span>
                </div>
            </section>

            <section className="section-lg">
                <div className="container">

                    <GalleryGrid categories={categories} items={galleryItems} />

                    {/* Stats — every figure is counted from the site's own data */}
                    <div className={styles.stats}>
                        {stats.map(({ Icon, number, label }) => (
                            <div key={label} className={styles.stat}>
                                <span className={styles.statIcon}><Icon size={22} /></span>
                                <span className={styles.statText}>
                                    <span className={styles.statNumber}>{number}</span>
                                    <span className={styles.statLabel}>{label}</span>
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* WhatsApp Gallery */}
                    <div style={{
                        marginTop: '4rem', textAlign: 'center',
                        padding: '2.5rem', background: 'var(--gray-100)',
                        borderRadius: 'var(--radius-lg)',
                    }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>Want to See More?</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            We share photos and videos of our fleet and tours on WhatsApp. Message us to get the full gallery! You can also browse our full <Link href="/fleet" style={{ color: 'var(--accent)', fontWeight: 600 }}>vehicle fleet</Link> or read destination stories on our <Link href="/blog" style={{ color: 'var(--accent)', fontWeight: 600 }}>travel blog</Link>.
                        </p>
                        <a href={WHATSAPP_URL} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                            💬 Message Us on WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)', padding: '4rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>Ready to Experience Saudi Arabia?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '500px', margin: '0 auto 2rem', fontSize: '1.05rem' }}>
                        Book your ride and explore the beauty and spirituality of Saudi Arabia with us.
                    </p>
                    <Link href="/book-online" className="btn btn-primary btn-lg">Book Now<span className="sr-only"> your ride</span></Link>
                </div>
            </section>
        </main>
        </>
    );
}
