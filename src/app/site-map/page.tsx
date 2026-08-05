import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";

export const metadata = generatePageMetadata({
    title: "Site Map",
    description: "Every page on Gulf Trip Service, grouped by category — city taxi services, GCC cross-border routes, tours, guides and more.",
    path: "/site-map",
});

const schemas = [
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Site Map", path: "/site-map" }]),
];

type Group = { title: string; links: { href: string; label: string }[] };

const groups: Group[] = [
    {
        title: "City Taxi Services",
        links: [
            { href: "/services/riyadh", label: "Riyadh" },
            { href: "/services/jeddah", label: "Jeddah" },
            { href: "/services/makkah", label: "Makkah" },
            { href: "/services/madinah", label: "Madinah" },
            { href: "/services/dammam", label: "Dammam" },
            { href: "/services/khobar", label: "Khobar" },
            { href: "/services/jubail", label: "Jubail" },
            { href: "/services/taif", label: "Taif" },
            { href: "/services/abha", label: "Abha" },
            { href: "/services/yanbu", label: "Yanbu" },
            { href: "/services/alula", label: "AlUla" },
            { href: "/services/neom", label: "NEOM" },
            { href: "/services/tabuk", label: "Tabuk" },
            { href: "/services/al-ahsa", label: "Al-Ahsa (Hofuf)" },
            { href: "/services/dhahran", label: "Dhahran" },
            { href: "/services/khamis-mushait", label: "Khamis Mushait" },
        ],
    },
    {
        title: "Airport Transfers",
        links: [
            { href: "/airport-transfers", label: "All Airport Transfers" },
            { href: "/jeddah-airport-taxi-service", label: "Jeddah Airport (KAIA)" },
            { href: "/riyadh-airport-taxi-service", label: "Riyadh Airport (KKIA)" },
            { href: "/dammam-airport-taxi-service", label: "Dammam Airport (KFIA)" },
            { href: "/madina-airport-taxi-service", label: "Madinah Airport (MED)" },
            { href: "/abha-airport-taxi-service", label: "Abha Airport" },
            { href: "/taif-airport-taxi-service", label: "Taif Airport" },
            { href: "/tabuk-airport-taxi-service", label: "Tabuk Airport (TUU)" },
            { href: "/yanbu-airport-taxi-service", label: "Yanbu Airport (YNB)" },
            { href: "/alula-airport-taxi-service", label: "AlUla Airport (ULH)" },
            { href: "/airport-transfer-for-umrah", label: "Airport Transfer for Umrah" },
        ],
    },
    {
        title: "GCC Cross-Border Routes",
        links: [
            { href: "/border-crossing", label: "All Border Crossings" },
            { href: "/saudi-arabia-to-bahrain-taxi-service", label: "Saudi Arabia to Bahrain" },
            { href: "/saudi-arabia-to-qatar-taxi-service", label: "Saudi Arabia to Qatar" },
            { href: "/saudi-arabia-to-uae-taxi-service", label: "Saudi Arabia to UAE" },
            { href: "/saudi-arabia-to-jordan-land-transfer", label: "Saudi Arabia to Jordan" },
            { href: "/dammam-airport-to-bahrain-taxi-service", label: "Dammam Airport to Bahrain" },
            { href: "/dammam-airport-to-qatar-taxi-service", label: "Dammam Airport to Qatar" },
            { href: "/dammam-airport-to-riyadh-taxi-service", label: "Dammam Airport to Riyadh" },
            { href: "/dammam-airport-to-khafji-taxi-service", label: "Dammam Airport to Khafji" },
            { href: "/bahrain-to-dammam-taxi-service", label: "Bahrain to Dammam" },
            { href: "/bahrain-to-riyadh-taxi-service", label: "Bahrain to Riyadh" },
            { href: "/riyadh-to-bahrain-taxi-service", label: "Riyadh to Bahrain" },
            { href: "/qatar-to-riyadh-taxi-service", label: "Qatar to Riyadh" },
            { href: "/qatar-to-dammam-taxi-service", label: "Qatar to Dammam" },
            { href: "/khafji-to-kuwait-taxi-service", label: "Khafji to Kuwait" },
            { href: "/dammam-to-kuwait-taxi-service", label: "Dammam to Kuwait" },
            { href: "/kuwait-to-dammam-taxi-service", label: "Kuwait to Dammam" },
            { href: "/kuwait-to-riyadh-taxi-service", label: "Kuwait to Riyadh" },
            { href: "/dammam-to-abu-dhabi-taxi-service", label: "Dammam to Abu Dhabi" },
            { href: "/abu-dhabi-to-dammam-taxi-service", label: "Abu Dhabi to Dammam" },
            { href: "/dammam-to-dubai-taxi-service", label: "Dammam to Dubai" },
            { href: "/dubai-to-dammam-taxi-service", label: "Dubai to Dammam" },
            { href: "/riyadh-to-dubai-taxi-service", label: "Riyadh to Dubai" },
            { href: "/dubai-to-riyadh-taxi-service", label: "Dubai to Riyadh" },
            { href: "/riyadh-to-qatar-taxi-service", label: "Riyadh to Qatar" },
            { href: "/riyadh-to-kuwait-taxi-service", label: "Riyadh to Kuwait" },
            { href: "/kuwait-to-khafji-taxi-service", label: "Kuwait to Khafji" },
            { href: "/khafji-to-dammam-airport-taxi-service", label: "Khafji to Dammam Airport" },
        ],
    },
    {
        title: "Domestic Intercity Routes",
        links: [
            { href: "/jeddah-to-makkah-taxi-service", label: "Jeddah to Makkah" },
            { href: "/makkah-to-jeddah-taxi-service", label: "Makkah to Jeddah" },
            { href: "/jeddah-to-makkah-guide", label: "Jeddah to Makkah Travel Guide" },
            { href: "/makkah-to-madinah-taxi-service", label: "Makkah to Madinah" },
            { href: "/madinah-to-makkah-taxi-service", label: "Madinah to Makkah" },
            { href: "/makkah-to-madinah-guide", label: "Makkah to Madinah Travel Guide" },
            { href: "/jeddah-airport-to-madinah-taxi-service", label: "Jeddah Airport to Madinah" },
            { href: "/madinah-to-jeddah-airport-taxi-service", label: "Madinah to Jeddah Airport" },
            { href: "/riyadh-to-makkah-taxi-service", label: "Riyadh to Makkah" },
            { href: "/makkah-to-riyadh-taxi-service", label: "Makkah to Riyadh" },
            { href: "/riyadh-to-dammam-guide", label: "Riyadh to Dammam Travel Guide" },
            { href: "/dammam-to-riyadh-taxi-service", label: "Dammam to Riyadh" },
            { href: "/riyadh-to-dammam-airport-taxi-service", label: "Riyadh to Dammam Airport" },
        ],
    },
    {
        title: "Services",
        links: [
            { href: "/our-services", label: "All Services" },
            { href: "/hotel-transfers", label: "Hotel Transfers" },
            { href: "/private-taxi", label: "Private Taxi" },
            { href: "/umrah-taxi-services", label: "Umrah Taxi Services" },
            { href: "/umrah-transport-package", label: "Umrah Transport Package" },
            { href: "/ziyarat-services-in-saudi-arabia", label: "Ziyarat Services" },
            { href: "/corporate-transportation-services", label: "Corporate Transportation" },
            { href: "/wedding-transportation", label: "Wedding Transportation" },
            { href: "/school-buses-services", label: "School Bus Services" },
            { href: "/educational-tours-transport", label: "Educational Tours Transport" },
        ],
    },
    {
        title: "Tours",
        links: [
            { href: "/jeddah-city-tour-services-in-saudi-arabia", label: "Jeddah City Tour" },
            { href: "/reliable-alula-tour-taxi-service-in-saudi-arabia", label: "AlUla Tour" },
            { href: "/taif-ziyarat-taxi-service", label: "Taif Ziyarat Tour" },
        ],
    },
    {
        title: "Travel Guides",
        links: [
            { href: "/guides/king-khalid-airport", label: "King Khalid International Airport Guide" },
            { href: "/guides/king-abdulaziz-airport", label: "King Abdulaziz International Airport Guide" },
            { href: "/guides/umrah-transportation", label: "Umrah Transportation Guide" },
            { href: "/guides/hajj-transportation", label: "Hajj Transportation Guide" },
            { href: "/guides/business-travel", label: "Business Travel Guide" },
            { href: "/guides/family-travel", label: "Family Travel Guide" },
        ],
    },
    {
        title: "Blog",
        links: [
            { href: "/blog", label: "All Blog Posts" },
            { href: "/blog/airport-transfer-tips", label: "10 Airport Transfer Tips" },
            { href: "/blog/private-vs-rental-car", label: "Private Taxi vs Rental Car" },
            { href: "/blog/umrah-travel-planning", label: "Umrah Travel Planning Checklist" },
            { href: "/blog/top-attractions-riyadh", label: "Top 10 Attractions in Riyadh" },
            { href: "/blog/jeddah-hidden-gems", label: "Hidden Gems in Jeddah" },
            { href: "/blog/alula-complete-guide", label: "AlUla Complete Travel Guide" },
            { href: "/blog/benefits-private-airport-transfer", label: "5 Reasons Private Airport Transfers Win" },
            { href: "/blog/hajj-transport-guide", label: "Hajj 2025 Transportation Guide" },
            { href: "/blog/family-saudi-destinations", label: "Best Family Destinations in Saudi Arabia" },
            { href: "/blog/vip-transport-saudi", label: "VIP & Executive Transportation" },
            { href: "/blog/riyadh-to-jeddah-travel", label: "Riyadh to Jeddah Travel Options" },
            { href: "/blog/safe-travel-tips-saudi", label: "Safe Travel Tips for First-Time Visitors" },
        ],
    },
    {
        title: "Company & Support",
        links: [
            { href: "/locations", label: "All Locations" },
            { href: "/routes", label: "All Routes" },
            { href: "/about-us", label: "About Us" },
            { href: "/our-gallery", label: "Our Gallery" },
            { href: "/fleet", label: "Our Fleet" },
            { href: "/testimonials", label: "Testimonials" },
            { href: "/faqs", label: "FAQs" },
            { href: "/prices", label: "Pricing" },
            { href: "/contact-us", label: "Contact Us" },
            { href: "/book-online", label: "Book Online" },
            { href: "/quote", label: "Get a Quote" },
            { href: "/privacy-policy", label: "Privacy Policy" },
            { href: "/terms-conditions", label: "Terms & Conditions" },
        ],
    },
];

export default function SiteMapPage() {
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
            <section className="page-hero">
                <div className="container" style={{ position: "relative", zIndex: 1 }}>
                    <span className="section-eyebrow">Navigate</span>
                    <h1>Site Map</h1>
                    <p>Every page on Gulf Trip Service, grouped by category.</p>
                    <div className="breadcrumb">
                        <Link href="/">Home</Link> / <span>Site Map</span>
                    </div>
                </div>
            </section>

            <section className="section-lg">
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--space-10)" }}>
                        {groups.map((group) => (
                            <div key={group.title}>
                                <h2 style={{ color: "var(--text-main)", fontSize: "var(--text-xl)", marginBottom: "var(--space-4)", borderBottom: "2px solid var(--accent)", paddingBottom: "var(--space-2)" }}>
                                    {group.title}
                                </h2>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                                    {group.links.map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} style={{ color: "var(--text-body)", textDecoration: "none" }}>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
