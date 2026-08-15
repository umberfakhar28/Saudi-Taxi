import { generatePageMetadata } from "@/lib/seo";
import CoreServicePage from "@/components/CoreServicePage";
import { airportTransferForUmrah } from "@/lib/serviceData";

export const metadata = generatePageMetadata({
    title: "Airport Transfer for Umrah Pilgrims | 24/7 Service",
    description: "Airport transfer for Umrah pilgrims from Jeddah King Abdulaziz Airport. Meet-and-greet, flight tracking, professional drivers. Reserve on WhatsApp today.",
    path: "/airport-transfer-for-umrah",
    keywords: ["Umrah airport transfer", "Jeddah airport to Makkah", "Hajj airport transfer", "Umrah transportation"],
});

export default function AirportTransferForUmrah() {
    return <CoreServicePage data={airportTransferForUmrah} />;
}
