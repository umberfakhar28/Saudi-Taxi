import Link from "next/link";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/seo";
import { CheckCircleIcon, MapPinIcon, CarIcon, ShieldIcon, ClockIcon, MessageIcon } from "@/components/Icons";
import RelatedLinks from "@/components/RelatedLinks";
import QuickBookForm from "@/components/QuickBookForm";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { WHATSAPP_URL, TEL_URL, PHONE_DISPLAY, waLink } from "@/lib/contact";
import { FLEET_TIERS } from "@/lib/fleetConfig";

export const metadata = generatePageMetadata({
    title: "Saudi Arabia Border Crossing Taxi — Bahrain, UAE, Qatar & Kuwait",
    description: "Private cross-border transfers from Saudi Arabia to Bahrain, UAE, Qatar, Kuwait and Oman. Licensed drivers, document support, executive vehicles. Book on WhatsApp 24/7.",
    path: "/border-crossing",
    keywords: ["border crossing taxi Saudi Arabia", "Saudi border transfer", "cross border taxi", "Saudi Arabia to GCC taxi", "private cross-border transfer"],
    hreflangPath: "/border-crossing",
});

const faqs = [
    { q: "Do you offer help with visa or entry requirements?", a: "We can share general guidance, but we are a transportation provider, not an immigration authority. Visa and entry requirements vary by nationality and can change — always confirm current requirements with the relevant embassy or an official government source before you travel." },
    { q: "Do the same driver and vehicle take me all the way across the border?", a: "On the land routes to Qatar, Kuwait and the UAE, yes — one vehicle and driver take you from your pickup address, through the border, to your destination. The King Fahd Causeway to Bahrain works differently: the journey continues with a licensed driver on the other side, after a handover we arrange in advance." },
    { q: "How far in advance should I book a border crossing transfer?", a: "We recommend at least 48 hours ahead for most crossings, and longer for the UAE and Jordan routes given the distance involved." },
    { q: "Which border crossings do you cover?", a: "The King Fahd Causeway to Bahrain, the Salwa/Abu Samra crossing to Qatar, Al Batha/Ghuwaifat to the UAE, Al Khafji/Al Nuwaiseeb to Kuwait, and the Halat Ammar, Ad-Durra and Al-Haditha crossings to Jordan — see the routes below for journey-specific pages." },
];

const schemas = [
    serviceSchema({ name: "Saudi Arabia Border Crossing Taxi — Bahrain, UAE, Qatar & Kuwait", description: "Private cross-border transfers from Saudi Arabia to Bahrain, UAE, Qatar, Kuwait, Oman and Jordan. Licensed drivers, document support, executive vehicles. Book on WhatsApp 24/7.", url: "/border-crossing", areaServed: ["Saudi Arabia", "Bahrain", "Jordan", "UAE", "Kuwait", "Qatar", "Oman"] }),
    faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Border Crossing", path: "/border-crossing" }]),
];

// Visa/entry notes are deliberately hedged ("may apply", "confirm current
// requirements") rather than stated as settled fact — requirements vary by
// nationality and change over time, and this business has no immigration
// authority (Phase 10 ground rule). The Yemen crossing previously listed
// here has been removed — an active conflict zone is not a journey this
// business can responsibly offer, regardless of caveats.
const borders = [
    {
        name: "King Fahd Causeway (Bahrain)",
        route: "Saudi Arabia ↔ Bahrain",
        distance: "~25 km causeway",
        note: "The most-used crossing to Bahrain. GCC ID may apply for GCC nationals; other nationalities should confirm current Bahrain visa/eVisa eligibility with an official source.",
        highlights: ["Bahrain eVisa available for many nationalities", "Typical crossing ~1–2 hrs", "Open 24 hours", "Duty-free zone at the crossing"],
    },
    {
        // "Durra / Halat Ammar" merged two separate crossings, and the
        // "~340 km from Tabuk" figure could not be verified.
        name: "Halat Ammar · Ad-Durra · Al-Haditha (Jordan)",
        route: "Saudi Arabia ↔ Jordan",
        distance: "Tabuk is the closest major city",
        note: "A key overland route for Hajj/Umrah pilgrims traveling to or from Jordan. Advance planning is recommended given the distance.",
        highlights: ["Popular Hajj/Umrah overland route", "Visa requirements vary by nationality", "Crossing hours can vary", "Daylight travel recommended"],
    },
    {
        name: "Al Batha / Ghuwaifat (UAE)",
        route: "Saudi Arabia ↔ UAE",
        distance: "~330 km from the Riyadh direction",
        note: "The main land route between Saudi Arabia and the UAE. GCC nationals typically cross with a national ID; other nationalities should confirm current UAE visa requirements.",
        highlights: ["GCC ID often sufficient for GCC nationals", "Entry permit may apply for others", "Well-maintained highway route", "Open 24 hours"],
    },
    // Previously labelled "Haradh / Wajir", which is not a Kuwait crossing:
    // Haradh is an inland town south-west of Hofuf, far from Kuwait, and no
    // crossing is called "Wajir". Every Eastern Province route page on this
    // site (Khafji, Dammam and Kuwait-to-Dammam) correctly names Al
    // Nuwaiseeb. The ~530 km figure was right but mislabelled "from Riyadh" —
    // it is this site's own Dammam-to-Kuwait distance via the coastal Highway
    // 95. Every fact below is taken from those pages.
    {
        name: "Al Khafji / Al Nuwaiseeb (Kuwait)",
        route: "Saudi Arabia ↔ Kuwait",
        distance: "~15 km from Khafji / ~530 km from Dammam",
        note: "The primary land crossing between Saudi Arabia and Kuwait, on the coast just north of Khafji. Commonly used by GCC nationals and residents with a valid Kuwait entry status.",
        highlights: ["GCC ID often sufficient for GCC nationals", "Confirm work/residency visa requirements for others", "Open 24 hours — usually 30–90 min outside peak times", "Vehicle insurance is mandatory on the Kuwaiti side"],
    },
    {
        name: "Abu Samra / Salwa (Qatar)",
        route: "Saudi Arabia ↔ Qatar",
        distance: "~100 km from Hofuf / ~580 km from Riyadh",
        note: "The primary land border with Qatar, modernised for higher traffic volumes. Qatar's Hayya platform, a visa, or GCC ID may apply depending on nationality.",
        highlights: ["Hayya Card, visa or GCC ID entry", "Efficient, high-capacity processing", "Direct route to Doha", "Open 24 hours"],
    },
    {
        name: "Aqabat Al Hamra (Oman)",
        route: "Saudi Arabia ↔ Oman",
        distance: "~1,100 km from Riyadh",
        note: "A longer southern crossing into Oman. GCC nationals typically cross with a national ID; other nationalities should confirm current Oman visa requirements.",
        highlights: ["GCC ID often sufficient for GCC nationals", "Confirm visa requirements for others", "Scenic desert route", "Fuel stations en route"],
    },
];

const inclusions = [
    "Ministry-licensed, fully insured vehicles",
    "Experienced drivers familiar with border procedures",
    "Assistance with vehicle documentation at crossings",
    "Sedan, SUV and Van options for all group sizes",
    "Transparent pricing — get a custom quote",
    "Real-time WhatsApp updates throughout journey",
    "Comfortable vehicles for long-distance travel",
    "Pick-up from hotel, home or airport",
];

export default function BorderCrossing() {
    return (
        <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Border Crossing Taxi & Chauffeur Service — Trusted Local Drivers</h1>
                {/* Intro moved below the form (booking-flow brief §1). */}
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Border Crossing</span>
                </div>
            </section>

            {/* Quick booking form. This is the hub page for every crossing, so
                only the pickup side can be determined from it — every journey
                here starts in Saudi Arabia. Drop-off is deliberately left
                empty rather than guessed at, per the fallback rule: the
                visitor picks or types their destination country or city. */}
            <section style={{ padding: 'var(--space-8) 0 0' }}>
                <div className="container">
                    <QuickBookForm
                        defaultFrom="Saudi Arabia"
                        heading="Get a Quick Quote for Your Border Crossing"
                        subheading="Tell us where you are heading — both fields are editable, and you can type a city that isn't listed."
                    />
                </div>
            </section>

            <section style={{ padding: 'var(--space-8) 0 0' }}>
                <div className="container">
                    <p className="lead-intro">
                        Safe, reliable transfer service across Saudi Arabia&apos;s land borders.
                        Licensed drivers and full journey coordination.
                    </p>
                </div>
            </section>

            {/* Trust banner */}
            <section style={{ background: 'linear-gradient(135deg, var(--accent-dark), var(--accent))', padding: '1.75rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', justifyContent: 'center', alignItems: 'center' }}>
                        {["Licensed & Insured Fleet", "Document Assistance", "Transparent Quoting", "24/7 Support"].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--accent-on-light)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                                <ShieldIcon size={16} />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Intro */}
            <section className="section-lg">
                <div className="container">
                    {/* Service scope — a statement of what we don't offer, kept
                        apart from the page copy so it reads as a notice. */}
                    <div role="note" style={{
                        display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)',
                        background: 'linear-gradient(135deg, rgba(184, 148, 91, 0.14), rgba(184, 148, 91, 0.05))',
                        border: '1px solid rgba(184, 148, 91, 0.45)',
                        borderInlineStart: '5px solid var(--gold)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-5) var(--space-6)',
                        marginBottom: 'var(--space-12)',
                        boxShadow: 'var(--shadow-md)',
                    }}>
                        <span aria-hidden="true" style={{
                            flexShrink: 0, width: 40, height: 40, borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'var(--gold)', color: 'var(--navy)',
                            fontWeight: 800, fontSize: '1.15rem', fontFamily: 'var(--font-heading)',
                        }}>i</span>
                        <div style={{ minWidth: 0 }}>
                            <p style={{ margin: '0 0 var(--space-1)', fontSize: 'var(--text-xs)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)' }}>
                                Please note
                            </p>
                            <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.6 }}>
                                We don&apos;t provide short rides just across the border, or short street-to-street
                                rides within a city. Our border service is for planned door-to-door journeys
                                between cities and countries.
                            </p>
                        </div>
                    </div>

                    <div className="grid-60-40">
                        <div>
                            <div className="section-header">
                                <span className="section-eyebrow">Cross-Border Transport</span>
                                <h2 className="section-title">Saudi Arabia Land Border Transfers</h2>
                            </div>
                            <p style={{ color: 'var(--text-body)', fontSize: 'var(--text-lg)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
                                Travelling overland across Saudi Arabia&apos;s borders — whether for Hajj, family visits,
                                work, or tourism — requires careful planning and a trusted transport partner.
                            </p>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: 'var(--space-8)' }}>
                                Our drivers are experienced with all major Saudi border crossings:
                                the Bahrain Causeway, the Jordanian border, UAE, Kuwait and Oman.
                                We coordinate pickup times, understand border procedures, and ensure your
                                journey is as smooth as possible from door to door.
                            </p>
                            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                                <a href={waLink("Hi, I need a border crossing transfer")} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                                    💬 Request a Quote
                                </a>
                                <Link href="/contact-us" className="btn btn-secondary">
                                    Contact Us
                                </Link>
                            </div>
                        </div>

                        <div style={{
                            background: 'linear-gradient(145deg, var(--surface-1), var(--bg-tertiary))',
                            border: '1px solid rgba(20, 23, 31, 0.07)',
                            borderRadius: 'var(--radius-xl)',
                            padding: 'var(--space-10)',
                            color: 'var(--text-primary)',
                            boxShadow: 'var(--shadow-xl)',
                        }}>
                            <h3 style={{ color: 'var(--accent)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-xl)' }}>
                                <ShieldIcon size={22} style={{ display: 'inline', marginRight: 8 }} />
                                What&apos;s Included
                            </h3>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                                {inclusions.map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                        <CheckCircleIcon size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Border routes */}
            <section className="section-lg" style={{ background: 'var(--bg-subtle)' }}>
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">Available Routes</span>
                        <h2 className="section-title">Saudi Border Crossings We Cover</h2>
                        <p className="section-subtitle">
                            We cover all major Saudi land borders. Each crossing has different visa and
                            document requirements — our team will guide you through the specifics.
                        </p>
                    </div>

                    <div className="grid-2">
                        {borders.map((border, i) => (
                            <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                                {/* Header */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
                                    <div className="card-icon" style={{ flexShrink: 0 }}>
                                        <MapPinIcon size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--primary)', marginBottom: 'var(--space-1)' }}>{border.name}</h3>
                                        <span style={{
                                            display: 'inline-block',
                                            background: 'var(--accent-subtle)',
                                            color: 'var(--accent-dark)',
                                            fontWeight: 700,
                                            fontSize: 'var(--text-xs)',
                                            padding: '3px 12px',
                                            borderRadius: 'var(--radius-full)',
                                            letterSpacing: '0.5px',
                                        }}>
                                            {border.route}
                                        </span>
                                    </div>
                                </div>

                                {/* Distance badge */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                                    <CarIcon size={14} />
                                    {border.distance}
                                </div>

                                {/* Note */}
                                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.7, margin: 0 }}>
                                    {border.note}
                                </p>

                                {/* Highlights */}
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
                                    {border.highlights.map((h, j) => (
                                        <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-body)' }}>
                                            <CheckCircleIcon size={13} style={{ color: 'var(--accent-dark)', flexShrink: 0 }} />
                                            {h}
                                        </li>
                                    ))}
                                </ul>

                                {border.name.includes("Bahrain") && (
                                    <Link href="/saudi-arabia-to-bahrain-taxi-service" className="btn btn-outline-gold btn-sm" style={{ alignSelf: 'flex-start' }}>More Details</Link>
                                )}
                                {border.name.includes("UAE") && (
                                    <Link href="/saudi-arabia-to-uae-taxi-service" className="btn btn-outline-gold btn-sm" style={{ alignSelf: 'flex-start' }}>More Details</Link>
                                )}
                                {border.name.includes("Jordan") && (
                                    <Link href="/saudi-arabia-to-jordan-land-transfer" className="btn btn-outline-gold btn-sm" style={{ alignSelf: 'flex-start' }}>More Details</Link>
                                )}
                                {border.name.includes("Qatar") && (
                                    <Link href="/saudi-arabia-to-qatar-taxi-service" className="btn btn-outline-gold btn-sm" style={{ alignSelf: 'flex-start' }}>More Details</Link>
                                )}
                                {border.name.includes("Kuwait") && (
                                    <Link href="/khafji-to-kuwait-taxi-service" className="btn btn-outline-gold btn-sm" style={{ alignSelf: 'flex-start' }}>More Details</Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Important notice */}
            <section className="section-lg">
                <div className="container">
                    <div style={{
                        background: 'linear-gradient(145deg, var(--surface-1), var(--bg-tertiary))',
                        border: '1px solid var(--accent-subtle)',
                        borderLeft: '5px solid var(--accent-primary)',
                        borderRadius: 'var(--radius-xl)',
                        padding: 'var(--space-10)',
                    }}>
                        <h3 style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                            <ClockIcon size={22} /> Important Before You Travel
                        </h3>
                        <div className="grid-2" style={{ gap: 'var(--space-8)' }}>
                            <div>
                                <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)', fontSize: 'var(--text-base)' }}>Documents Required</h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                    {["Valid passport (6+ months validity)", "Saudi residence permit (Iqama) if applicable", "Destination country visa (check in advance)", "Vehicle registration (if using own car)", "Health insurance documentation"].map((d, i) => (
                                        <li key={i} style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', alignItems: 'flex-start' }}>
                                            <span style={{ color: 'var(--accent-primary)', flexShrink: 0 }}>•</span> {d}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)', fontSize: 'var(--text-base)' }}>Our Advice</h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                    {["Check latest travel advisories before booking", "Allow extra time for border formalities", "Notify us of any special requirements", "Book at least 48 hours ahead for border trips", "WhatsApp us for latest crossing conditions"].map((d, i) => (
                                        <li key={i} style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', alignItems: 'flex-start' }}>
                                            <span style={{ color: 'var(--accent-primary)', flexShrink: 0 }}>•</span> {d}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid rgba(20, 23, 31, 0.08)' }}>
                            Visa and entry requirements vary by nationality and can change without notice — always confirm current requirements with the relevant embassy or an official government source before you travel. We are a transportation provider, not an immigration authority.
                        </p>
                    </div>
                </div>
            </section>

            {/* Private chauffeur vs self-driving, and why a private transfer */}
            <section className="section-lg">
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">Choosing How to Cross</span>
                        <h2 className="section-title">Private Chauffeur vs. Self-Driving the Border</h2>
                    </div>
                    <div className="grid-2" style={{ marginBottom: 'var(--space-10)' }}>
                        <div className="card">
                            <h3 style={{ color: 'var(--accent)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>Private Chauffeur</h3>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.75 }}>
                                A licensed driver who already knows each crossing&apos;s checkpoint layout and peak-hour patterns handles the drive, so you&apos;re not learning a foreign country&apos;s road rules mid-journey. Where a route requires a vehicle handover — the King Fahd Causeway to Bahrain, for example — we coordinate the Saudi-side and other-side drivers in advance so the switch is smooth rather than something you have to arrange yourself at the checkpoint.
                            </p>
                        </div>
                        <div className="card">
                            <h3 style={{ color: 'var(--accent)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>Self-Driving or Rental Car</h3>
                            <p style={{ color: 'var(--text-body)', lineHeight: 1.75 }}>
                                A realistic option if you already hold the correct cross-border vehicle insurance and documentation and are comfortable driving unfamiliar roads and checkpoint procedures yourself. On the longer corridors — Riyadh to Dubai or Doha to Riyadh, for instance — that also means several continuous hours behind the wheel rather than being free to rest, work, or manage the trip for a family or group.
                            </p>
                        </div>
                    </div>

                    <div className="section-header centered">
                        <span className="section-eyebrow">The Case for a Private Transfer</span>
                        <h2 className="section-title">Why Choose a Private Cross-Border Transfer?</h2>
                    </div>
                    <div className="grid-2" style={{ gap: 'var(--space-8)' }}>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            {[
                                "One booking covers the full journey, including the vehicle handover on causeway routes, instead of arranging transport separately on each side of the border.",
                                "A driver who already knows the specific checkpoint — not a generic rental-car crossing for the first time.",
                                "Door-to-door pickup and drop-off, from a Saudi hotel or airport straight through to your destination address.",
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', alignItems: 'flex-start' }}>
                                    <CheckCircleIcon size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} /> {item}
                                </li>
                            ))}
                        </ul>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            {[
                                "Executive vehicle options for business travelers and delegations, not just a standard sedan.",
                                "A private vehicle for your group only — comfortable for the multi-hour drives that come with the longer corridors (Riyadh–Dubai, Doha–Riyadh).",
                                "Real-time WhatsApp coordination if a flight is delayed or a crossing is busier than expected.",
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', alignItems: 'flex-start' }}>
                                    <CheckCircleIcon size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Vehicle Options */}
            <section className="section-lg" style={{ background: 'var(--bg-subtle)' }}>
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">Fleet</span>
                        <h2 className="section-title">Vehicle Options for Cross-Border Travel</h2>
                    </div>
                    <div className="grid-4">
                        {FLEET_TIERS.map((tier) => (
                            <div key={tier.id} className="card" style={{ textAlign: 'center', padding: 0, overflow: 'hidden' }}>
                                <div style={{ position: 'relative', width: '100%', height: 160 }}>
                                    <Image
                                        src={tier.image}
                                        alt={`${tier.name} — ${tier.models}`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                </div>
                                <div style={{ padding: 'var(--space-6)' }}>
                                    <h3 style={{ fontSize: 'var(--text-lg)' }}>{tier.name}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', marginBottom: 'var(--space-2)' }}>{tier.models}</p>
                                    <p style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>
                                        Up to {tier.maxPassengers} passengers · {tier.maxLuggage} bags
                                    </p>
                                    <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>{tier.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reviews */}
            <section className="section-lg">
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">Customer Reviews</span>
                        <h2 className="section-title">What Travelers Say</h2>
                    </div>
                    <div className="grid-3">
                        {[
                            { name: "Faisal M.", origin: "Business Traveler, Dammam–Bahrain", text: "Driver was waiting right at pickup and handled the causeway paperwork like clockwork." },
                            { name: "Abdulrahman S.", origin: "Riyadh–Doha", text: "Long drive but the car was comfortable and the driver kept us on schedule for the Salwa crossing." },
                            { name: "Khalid M.", origin: "Riyadh–Dubai", text: "Long journey but well paced with rest stops, and the border crossing was straightforward." },
                        ].map((r, i) => (
                            <div key={i} className="card">
                                <div style={{ display: 'flex', gap: 'var(--space-1)', marginBottom: 'var(--space-3)', color: 'var(--accent)' }}>★★★★★</div>
                                <p style={{ color: 'var(--text-body)', fontStyle: 'italic', lineHeight: 1.75, marginBottom: 'var(--space-4)' }}>&ldquo;{r.text}&rdquo;</p>
                                <p style={{ color: 'var(--text-main)', fontWeight: 600 }}>{r.name}</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>{r.origin}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-lg" style={{ background: 'var(--bg-subtle)' }}>
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">FAQ</span>
                        <h2 className="section-title">Border Crossing — Frequently Asked Questions</h2>
                    </div>
                    <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        {faqs.map((f, i) => (
                            <div key={i} className="card" style={{ padding: 'var(--space-6) var(--space-8)' }}>
                                <h3 style={{ color: 'var(--accent)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-3)' }}>{f.q}</h3>
                                <p style={{ color: 'var(--text-body)', marginBottom: 0 }}>{f.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Country-level journey pages */}
            <RelatedLinks
                title="Plan Your Cross-Border Journey"
                links={[
                    { href: "/saudi-arabia-to-bahrain-taxi-service", label: "Saudi Arabia to Bahrain" },
                    { href: "/saudi-arabia-to-qatar-taxi-service", label: "Saudi Arabia to Qatar" },
                    { href: "/saudi-arabia-to-uae-taxi-service", label: "Saudi Arabia to UAE" },
                    { href: "/saudi-arabia-to-jordan-land-transfer", label: "Saudi Arabia to Jordan" },
                ]}
            />

            {/* Specific route pages */}
            <RelatedLinks
                title="Popular Specific Cross-Border Routes"
                links={[
                    { href: "/dammam-airport-to-bahrain-taxi-service", label: "Dammam Airport → Bahrain" },
                    { href: "/bahrain-to-dammam-taxi-service", label: "Bahrain → Dammam" },
                    { href: "/dammam-airport-to-qatar-taxi-service", label: "Dammam Airport → Qatar" },
                    { href: "/qatar-to-dammam-taxi-service", label: "Qatar → Dammam" },
                    { href: "/qatar-to-riyadh-taxi-service", label: "Qatar → Riyadh" },
                    { href: "/riyadh-to-qatar-taxi-service", label: "Riyadh → Qatar" },
                    { href: "/dammam-airport-to-riyadh-taxi-service", label: "Dammam Airport → Riyadh" },
                    { href: "/dammam-airport-to-khafji-taxi-service", label: "Dammam Airport → Khafji" },
                    { href: "/khafji-to-dammam-airport-taxi-service", label: "Khafji → Dammam Airport" },
                    { href: "/khafji-to-kuwait-taxi-service", label: "Khafji → Kuwait" },
                    { href: "/kuwait-to-khafji-taxi-service", label: "Kuwait → Khafji" },
                    { href: "/dammam-to-kuwait-taxi-service", label: "Dammam → Kuwait" },
                    { href: "/kuwait-to-dammam-taxi-service", label: "Kuwait → Dammam" },
                    { href: "/kuwait-to-riyadh-taxi-service", label: "Kuwait → Riyadh" },
                    { href: "/riyadh-to-kuwait-taxi-service", label: "Riyadh → Kuwait" },
                    { href: "/riyadh-to-bahrain-taxi-service", label: "Riyadh → Bahrain" },
                    { href: "/bahrain-to-riyadh-taxi-service", label: "Bahrain → Riyadh" },
                    { href: "/dammam-to-abu-dhabi-taxi-service", label: "Dammam → Abu Dhabi" },
                    { href: "/abu-dhabi-to-dammam-taxi-service", label: "Abu Dhabi → Dammam" },
                    { href: "/dammam-to-dubai-taxi-service", label: "Dammam → Dubai" },
                    { href: "/dubai-to-dammam-taxi-service", label: "Dubai → Dammam" },
                    { href: "/riyadh-to-dubai-taxi-service", label: "Riyadh → Dubai" },
                    { href: "/dubai-to-riyadh-taxi-service", label: "Dubai → Riyadh" },
                ]}
            />

            {/* CTA Banner */}
            <section style={{
                background: 'linear-gradient(140deg, var(--bg-primary) 0%, var(--bg-dark) 60%, var(--navy-light) 100%)',
                padding: 'var(--space-20) 0',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                    pointerEvents: 'none',
                }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ color: 'var(--white)', fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
                        Planning a Border Crossing?
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'var(--text-lg)', maxWidth: 560, margin: '0 auto var(--space-10)', lineHeight: 1.8 }}>
                        Get in touch now so we can arrange your transport, advise on documents,
                        and ensure a hassle-free journey across the border.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">
                            Book Now
                        </Link>
                        <a href={WHATSAPP_URL} className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer">
                            <MessageIcon size={18} /> WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
        </>
    );
}
