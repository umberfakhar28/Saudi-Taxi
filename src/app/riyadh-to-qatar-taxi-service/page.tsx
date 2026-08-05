import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { riyadhToQatar } from "@/lib/routeData";

// W7 P1 reciprocal of /qatar-to-riyadh-taxi-service (docs/page-gap-analysis.md
// — this is the "Riyadh <-> Doha" gap flagged in the gap analysis).
export const metadata = generatePageMetadata({
  title: "Riyadh to Qatar Taxi & Cross-Border Transfer | Gulf Trip",
  description: "Private door-to-door taxi from Riyadh to Doha, Qatar via the Salwa/Abu Samra border. One vehicle, no layovers. Book on WhatsApp.",
  path: "/riyadh-to-qatar-taxi-service",
  keywords: ["Riyadh to Qatar taxi", "Riyadh to Doha transfer", "Salwa border taxi from Riyadh"],
});

export default function RiyadhToQatar() {
  return <RoutePage data={riyadhToQatar} />;
}
