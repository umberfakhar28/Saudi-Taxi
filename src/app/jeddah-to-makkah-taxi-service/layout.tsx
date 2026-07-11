import { serviceSchema, breadcrumbSchema, faqSchema, jsonLd } from "@/lib/jsonld";

export default function Layout({ children }: { children: React.ReactNode }) {
    const schemas = [
        serviceSchema({
            name: "Jeddah to Makkah Taxi Service",
            description: "Direct taxi transfers from Jeddah city and Jeddah Airport (KAIA) to Makkah. Fixed-rate, professional drivers, 24/7 availability.",
            url: "/jeddah-to-makkah-taxi-service",
            areaServed: ["Jeddah", "Makkah"],
        }),
        breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/our-services" },
            { name: "Jeddah to Makkah Taxi", path: "/jeddah-to-makkah-taxi-service" },
        ]),
        faqSchema([
            { question: "How long does it take from Jeddah Airport to Makkah?", answer: "The journey typically takes 1 to 1.5 hours depending on traffic conditions. During Hajj season, it may take slightly longer." },
            { question: "Can I book a return trip from Makkah to Jeddah?", answer: "Yes! You can book a round-trip service. Many customers book both their arrival and departure transfers together for convenience and savings." },
            { question: "What if my flight is delayed?", answer: "Don't worry — we track all incoming flights. If your flight is delayed, your driver will adjust the pickup time automatically at no extra charge." },
            { question: "Do you provide child seats?", answer: "Yes, child seats and booster seats are available upon request. Please mention this requirement when booking so we can prepare them in advance." },
        ]),
    ];
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
            {children}
        </>
    );
}
