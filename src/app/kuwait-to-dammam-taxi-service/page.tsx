import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { kuwaitToDammam } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Kuwait to Dammam Taxi — Private Cross-Border Transfer",
  description: "Private taxi from Kuwait to Dammam via the Al Nuwaiseeb–Al Khafji border: about 410 km down the Gulf coast, 5–6 hours with the crossing. Quote on WhatsApp.",
  path: "/kuwait-to-dammam-taxi-service",
  keywords: ["Kuwait to Dammam taxi", "Kuwait to Saudi Arabia taxi", "Al Nuwaiseeb border taxi", "Kuwait to Khobar transfer"],
});

export default function Page() {
  return <RoutePage data={kuwaitToDammam} />;
}
