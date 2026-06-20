import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";

export default function Layout({ children }: { children: React.ReactNode }) {
    const schemas = [
        serviceSchema({
            name: "Makkah to Madinah Taxi Service",
            description: "Comfortable intercity taxi from Makkah to Madinah. Fixed-rate, direct transfers for Umrah and Hajj pilgrims with professional drivers.",
            url: "/makkah-to-madinah-taxi-service",
            areaServed: ["Makkah", "Madinah"],
        }),
        breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/our-services" },
            { name: "Makkah to Madinah Taxi", path: "/makkah-to-madinah-taxi-service" },
        ]),
    ];
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
            {children}
        </>
    );
}
