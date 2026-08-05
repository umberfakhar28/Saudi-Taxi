import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";

// FAQ schema kept in sync with the `faqs` array in page.tsx (Execution
// Brief v3 W4/W5) — this is the page's single schema source, so the two
// must not diverge; previously the page also injected its own duplicate
// script tag, which produced conflicting JSON-LD for the same URL.
export default function Layout({ children }: { children: React.ReactNode }) {
    const schemas = [
        serviceSchema({
            name: "Umrah Taxi Services in Makkah & Madinah",
            description: "Professional Umrah taxi and chauffeur services in Makkah and Madinah — Ihram-friendly vehicles, wheelchair-accessible options, airport transfers, and guided Ziyarat tours.",
            url: "/umrah-taxi-services",
            areaServed: ["Makkah", "Madinah", "Jeddah"],
        }),
        faqSchema([
            { question: "Can I book a taxi during Hajj season?", answer: "Yes, but advance booking is essential during Hajj (Dhul-Hijjah) — we recommend at least 2–4 weeks ahead. Availability during peak Hajj days (8th–12th Dhul-Hijjah) is extremely limited without advance booking." },
            { question: "Do you provide separate transportation for men and women?", answer: "We offer family vehicles with privacy partitions, or separate vehicles on request. Female travelers can also request a female driver, subject to availability." },
            { question: "Can your taxis accommodate wheelchair users?", answer: "Yes — we have wheelchair-accessible vans with hydraulic ramps and secure anchoring. Mention this when booking so we can arrange the right vehicle and any assistance you need." },
            { question: "Are your vehicles genuinely Ihram-friendly?", answer: "Yes — no music or entertainment systems, clean and modest interiors, and enough space to sit comfortably in Ihram clothing. We also arrange secure Zamzam water storage separate from your luggage." },
            { question: "Is it safe for solo female travelers?", answer: "Yes. All drivers are background-checked and GPS-tracked, and female travelers can request a female driver or a family-style vehicle. You're welcome to share your trip details with family for extra peace of mind." },
            { question: "What payment methods do you accept?", answer: "Cash (SAR), credit/debit card, Apple Pay, and Google Pay. Online bookings are card-only at the time of booking; corporate accounts with invoiced billing are available for travel agencies and groups." },
        ]),
        breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/our-services" },
            { name: "Umrah Taxi Services", path: "/umrah-taxi-services" },
        ]),
    ];
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
            {children}
        </>
    );
}
