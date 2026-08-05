import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamToRiyadh } from "@/lib/routeData";

// W7 P1 reciprocal of /riyadh-to-dammam-guide (docs/page-gap-analysis.md).
export const metadata = generatePageMetadata({
  title: "Dammam to Riyadh Taxi — Executive Car Transfer | Gulf Trip",
  description: "Executive taxi from Dammam to Riyadh via Highway 40. Onboard WiFi, corporate accounts, 24/7 availability. Book on WhatsApp.",
  path: "/dammam-to-riyadh-taxi-service",
  keywords: ["Dammam to Riyadh taxi", "Dammam to Riyadh transfer", "Eastern Province to Riyadh car service"],
});

export default function DammamToRiyadh() {
  return <RoutePage data={dammamToRiyadh} />;
}
