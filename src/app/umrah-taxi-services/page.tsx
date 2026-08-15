import { generatePageMetadata } from "@/lib/seo";
import CoreServicePage from "@/components/CoreServicePage";
import { umrahTaxiServices } from "@/lib/serviceData";

export const metadata = generatePageMetadata({
    title: "Umrah Taxi Services in Makkah & Madinah | 24/7",
    description: "Professional Umrah taxi services in Makkah and Madinah. Ihram-friendly vehicles, wheelchair-accessible options, airport transfers, guided Ziyarat tours. Licensed drivers, 24/7. Book on WhatsApp.",
    path: "/umrah-taxi-services",
    keywords: ["Umrah taxi", "Makkah taxi", "Umrah transport", "Umrah transfer Saudi Arabia", "Umrah transportation"],
});

export default function UmrahTaxiServices() {
    return <CoreServicePage data={umrahTaxiServices} />;
}
