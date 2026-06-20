import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";

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
    ];
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
            {children}
        </>
    );
}
