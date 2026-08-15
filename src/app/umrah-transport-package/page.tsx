import { generatePageMetadata } from "@/lib/seo";
import CoreServicePage from "@/components/CoreServicePage";
import { umrahTransportPackage } from "@/lib/serviceData";

export const metadata = generatePageMetadata({
    title: "Umrah Taxi & Transport Package | Makkah–Madinah Transfers",
    description: "Complete Umrah transport package: airport pickup, Makkah and Madinah hotel transfers, guided Ziyarat tours. Licensed drivers, 24/7. Reserve on WhatsApp.",
    path: "/umrah-transport-package",
    keywords: ["Umrah transport package", "Umrah taxi package", "Umrah transfer package", "all-inclusive Umrah transport"],
});

export default function UmrahTransportPackage() {
    return <CoreServicePage data={umrahTransportPackage} />;
}
