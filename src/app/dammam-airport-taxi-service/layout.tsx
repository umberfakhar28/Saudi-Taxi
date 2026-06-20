import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
export default function Layout({ children }: { children: React.ReactNode }) {
    const schemas = [
        serviceSchema({ name: "Dammam Airport Taxi Service", description: "Taxi transfers to and from King Fahd International Airport (DMM) in Dammam. Fixed rates, professional drivers.", url: "/dammam-airport-taxi-service", areaServed: ["Dammam"] }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Airport Transfers", path: "/airport-transfers" }, { name: "Dammam Airport Taxi", path: "/dammam-airport-taxi-service" }]),
    ];
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />{children}</>;
}
