import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
export default function Layout({ children }: { children: React.ReactNode }) {
    const schemas = [
        serviceSchema({ name: "Airport Transfer for Umrah", description: "Dedicated airport transfers for Umrah pilgrims — Jeddah, Madinah, and Taif airports to all Makkah and Madinah hotels.", url: "/airport-transfer-for-umrah", areaServed: ["Jeddah", "Makkah", "Madinah"] }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Umrah Services", path: "/umrah-taxi-services" }, { name: "Airport Transfer for Umrah", path: "/airport-transfer-for-umrah" }]),
    ];
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />{children}</>;
}
