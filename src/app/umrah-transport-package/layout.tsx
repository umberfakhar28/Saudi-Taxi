import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
export default function Layout({ children }: { children: React.ReactNode }) {
    const schemas = [
        serviceSchema({ name: "Umrah Transport Package", description: "All-inclusive Umrah transport packages including airport pickup, Makkah–Madinah transfers, and daily Haram transfers. Book one package for your entire pilgrimage.", url: "/umrah-transport-package", areaServed: ["Makkah", "Madinah", "Jeddah"] }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Umrah Services", path: "/umrah-taxi-services" }, { name: "Umrah Transport Package", path: "/umrah-transport-package" }]),
    ];
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />{children}</>;
}
