import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
export default function Layout({ children }: { children: React.ReactNode }) {
    const schemas = [
        serviceSchema({ name: "Taif Airport Taxi Service", description: "Taxi transfers to and from Taif Regional Airport. Connecting Taif, Makkah, and Jeddah with professional drivers.", url: "/taif-airport-taxi-service", areaServed: ["Taif", "Makkah"] }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Airport Transfers", path: "/airport-transfers" }, { name: "Taif Airport Taxi", path: "/taif-airport-taxi-service" }]),
    ];
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />{children}</>;
}
