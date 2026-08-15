import { generatePageMetadata } from "@/lib/seo";
import CoreServicePage from "@/components/CoreServicePage";
import { educationalToursTransport } from "@/lib/serviceData";

export const metadata = generatePageMetadata({
    title: "Educational Tour Transport Service | Saudi Arabia",
    description: "Coordinated transport for educational tours and student field trips across Saudi Arabia. Safe vehicles, professional drivers, 24/7. Reserve on WhatsApp today.",
    path: "/educational-tours-transport",
    keywords: ["educational tour transport", "student field trip", "school trip bus", "educational transport Saudi"],
});

export default function EducationalToursTransport() {
    return <CoreServicePage data={educationalToursTransport} />;
}
