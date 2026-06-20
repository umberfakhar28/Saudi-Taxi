import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";

export default function Layout({ children }: { children: React.ReactNode }) {
    const schemas = [
        serviceSchema({
            name: "Riyadh Airport Taxi Service",
            description: "Professional taxi transfers to and from King Khalid International Airport (RUH) in Riyadh. Available 24/7 with fixed rates.",
            url: "/riyadh-airport-taxi-service",
            areaServed: ["Riyadh"],
        }),
        breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Airport Transfers", path: "/airport-transfers" },
            { name: "Riyadh Airport Taxi", path: "/riyadh-airport-taxi-service" },
        ]),
    ];
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
            {children}
        </>
    );
}
