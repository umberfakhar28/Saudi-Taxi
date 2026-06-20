import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";

export default function Layout({ children }: { children: React.ReactNode }) {
    const schemas = [
        serviceSchema({
            name: "Jeddah Airport Taxi Service",
            description: "Premium taxi transfers to and from Jeddah King Abdulaziz International Airport (KAIA). Meet & greet, flight tracking, 24/7 service.",
            url: "/jeddah-airport-taxi-service",
            areaServed: ["Jeddah", "Makkah", "Madinah"],
        }),
        breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Airport Transfers", path: "/airport-transfers" },
            { name: "Jeddah Airport Taxi", path: "/jeddah-airport-taxi-service" },
        ]),
    ];
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
            {children}
        </>
    );
}
