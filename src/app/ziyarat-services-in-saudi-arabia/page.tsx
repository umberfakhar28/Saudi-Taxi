import { generatePageMetadata } from "@/lib/seo";
import CoreServicePage from "@/components/CoreServicePage";
import { ziyaratServices } from "@/lib/serviceData";

export const metadata = generatePageMetadata({
    title: "Ziyarat Taxi Service in Saudi Arabia | Guided Transfers",
    description: "Guided Ziyarat taxi service to the holy and historical sites of Makkah and Madinah. Experienced drivers, flexible itineraries, 24/7. Book on WhatsApp today.",
    path: "/ziyarat-services-in-saudi-arabia",
    keywords: ["Ziyarat services", "holy sites tour", "Makkah Madinah Ziyarat taxi", "Ziyarat tour Saudi Arabia"],
});

export default function ZiyaratServices() {
    return <CoreServicePage data={ziyaratServices} />;
}
