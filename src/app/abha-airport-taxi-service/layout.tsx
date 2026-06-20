import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
export default function Layout({ children }: { children: React.ReactNode }) {
    const schemas = [
        serviceSchema({ name: "Abha Airport Taxi Service", description: "Taxi transfers to and from Abha Regional Airport. Professional drivers, fixed rates across Asir region.", url: "/abha-airport-taxi-service", areaServed: ["Abha"] }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Airport Transfers", path: "/airport-transfers" }, { name: "Abha Airport Taxi", path: "/abha-airport-taxi-service" }]),
    ];
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />{children}</>;
}
