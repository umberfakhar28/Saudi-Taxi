import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
export default function Layout({ children }: { children: React.ReactNode }) {
    const schemas = [
        serviceSchema({ name: "Madinah Airport Taxi Service", description: "Reliable taxi transfers to and from Prince Mohammad Bin Abdulaziz Airport (MED) in Madinah. 24/7 service for Umrah pilgrims.", url: "/madina-airport-taxi-service", areaServed: ["Madinah"] }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Airport Transfers", path: "/airport-transfers" }, { name: "Madinah Airport Taxi", path: "/madina-airport-taxi-service" }]),
    ];
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />{children}</>;
}
