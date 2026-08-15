import { generatePageMetadata } from "@/lib/seo";
import CoreServicePage from "@/components/CoreServicePage";
import { schoolBusesServices } from "@/lib/serviceData";

export const metadata = generatePageMetadata({
    title: "School Bus Transport Service in Saudi Arabia | Safe 24/7",
    description: "Safe, reliable school bus transport service in Saudi Arabia with monitored routes and a modern fleet. Professional drivers, 24/7 support. Book on WhatsApp.",
    path: "/school-buses-services",
    keywords: ["school bus Saudi Arabia", "student transport", "school transportation", "school bus service Saudi"],
});

export default function SchoolBusesServices() {
    return <CoreServicePage data={schoolBusesServices} />;
}
