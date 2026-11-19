import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamToKuwait } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dammam to Kuwait Taxi — Private Cross-Border Transfer",
  description: "Private taxi from Dammam to Kuwait via the Al Khafji–Al Nuwaiseeb border: about 410 km up the Gulf coast, 5–6 hours with the crossing. Quote on WhatsApp.",
  path: "/dammam-to-kuwait-taxi-service",
  keywords: ["Dammam to Kuwait taxi", "Eastern Province to Kuwait transfer", "Al Nuwaiseeb border taxi", "Saudi Arabia to Kuwait taxi"],
});

export default function Page() {
  return <RoutePage data={dammamToKuwait} />;
}
