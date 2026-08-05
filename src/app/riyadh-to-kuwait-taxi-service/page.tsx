import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { riyadhToKuwait } from "@/lib/routeData";

// W7 P1.5 reciprocal of /kuwait-to-riyadh-taxi-service (docs/page-gap-analysis.md).
export const metadata = generatePageMetadata({
  title: "Riyadh to Kuwait Taxi & Cross-Border Transfer | Gulf Trip",
  description: "Private door-to-door taxi from Riyadh to Kuwait City via the Haradh/Wajir border. One vehicle, no layovers. Book on WhatsApp.",
  path: "/riyadh-to-kuwait-taxi-service",
  keywords: ["Riyadh to Kuwait taxi", "Riyadh to Kuwait City transfer", "Haradh border taxi"],
});

export default function RiyadhToKuwait() {
  return <RoutePage data={riyadhToKuwait} />;
}
