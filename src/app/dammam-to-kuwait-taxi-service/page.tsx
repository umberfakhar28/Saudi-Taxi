import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamToKuwait } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dammam to Kuwait Taxi — Private Cross-Border Transfer",
  description: "Private taxi from Dammam to Kuwait via the Al Nuwaiseeb border — about 410 km along the Gulf coast, 5–6 hours including the crossing. Licensed driver, door to door, quote on WhatsApp.",
  path: "/dammam-to-kuwait-taxi-service",
  keywords: ["Dammam to Kuwait taxi", "Eastern Province to Kuwait transfer", "Al Nuwaiseeb border taxi", "Saudi Arabia to Kuwait taxi"],
});

export default function Page() {
  return <RoutePage data={dammamToKuwait} />;
}
