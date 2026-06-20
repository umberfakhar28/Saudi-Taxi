import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";

export default function Layout({ children }: { children: React.ReactNode }) {
    const schemas = [
        serviceSchema({
            name: "Umrah Taxi Services",
            description: "Reliable Umrah taxi services in Makkah and Madinah. Airport transfers, hotel-to-Haram, Ziyarat tours, and Makkah–Madinah intercity transport for pilgrims.",
            url: "/umrah-taxi-services",
            areaServed: ["Makkah", "Madinah", "Jeddah"],
        }),
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
