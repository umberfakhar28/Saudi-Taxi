import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { riyadhToKuwait } from "@/lib/routeData";

// W7 P1.5 reciprocal of /kuwait-to-riyadh-taxi-service (docs/page-gap-analysis.md).
export const metadata = generatePageMetadata({
  title: "Riyadh to Kuwait Taxi & Cross-Border Transfer | Gulf Trip",
  description: "Private door-to-door transfer from Riyadh to Kuwait City by road. One vehicle, a planned rest stop and executive options. Book on WhatsApp.",
  path: "/riyadh-to-kuwait-taxi-service",
  hreflangPath: "/riyadh-to-kuwait-taxi-service",
  keywords: ["Riyadh to Kuwait taxi", "Riyadh to Kuwait City transfer", "Riyadh to Kuwait by road"],
});

export default function RiyadhToKuwait() {
  return <RoutePage data={riyadhToKuwait} />;
}
