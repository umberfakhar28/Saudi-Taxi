import { generatePageMetadata } from "@/lib/seo";
import CoreServicePage from "@/components/CoreServicePage";
import { privateTaxi } from "@/lib/serviceData";

export const metadata = generatePageMetadata({
    title: "Private Taxi Service in Saudi Arabia | Chauffeur & Car Hire",
    description: "Private taxi and chauffeur hire across Saudi Arabia for local, inter-city and long-distance travel. Professional drivers, 24/7 availability. Book on WhatsApp.",
    path: "/private-taxi",
    keywords: ["private taxi Saudi Arabia", "hire private driver Makkah", "private car hire", "private taxi Makkah"],
});

export default function PrivateTaxi() {
    return <CoreServicePage data={privateTaxi} />;
}
