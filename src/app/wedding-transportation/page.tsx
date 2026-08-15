import { generatePageMetadata } from "@/lib/seo";
import CoreServicePage from "@/components/CoreServicePage";
import { weddingTransportation } from "@/lib/serviceData";

export const metadata = generatePageMetadata({
    title: "Wedding Transportation & Bridal Car Service | 24/7",
    description: "Wedding transportation service in Saudi Arabia: luxury bridal cars, guest shuttles, event logistics. Professional, elegant drivers, 24/7. Book on WhatsApp.",
    path: "/wedding-transportation",
    keywords: ["wedding transportation Saudi Arabia", "luxury bridal car", "wedding taxi", "guest shuttle Saudi Arabia"],
});

export default function WeddingTransportation() {
    return <CoreServicePage data={weddingTransportation} />;
}
