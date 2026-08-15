import { generatePageMetadata } from "@/lib/seo";
import CoreServicePage from "@/components/CoreServicePage";
import { corporateTransportation } from "@/lib/serviceData";

export const metadata = generatePageMetadata({
    title: "Corporate Taxi & Transportation Service | Saudi Arabia",
    description: "Corporate transportation service in Saudi Arabia: executive transfers, staff shuttles, event transport. Professional drivers, 24/7. Reserve on WhatsApp today.",
    path: "/corporate-transportation-services",
    keywords: ["corporate transport Saudi Arabia", "executive taxi", "business car hire", "corporate travel Saudi Arabia"],
});

export default function CorporateTransportation() {
    return <CoreServicePage data={corporateTransportation} />;
}
