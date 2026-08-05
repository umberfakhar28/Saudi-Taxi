import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { riyadhToMakkah } from "@/lib/routeData";

// W7 P1 — new long-distance Umrah corridor, includes the Qarn al-Manazil
// Miqat stop (docs/page-gap-analysis.md).
export const metadata = generatePageMetadata({
  title: "Riyadh to Makkah Taxi & Umrah Transfer | Gulf Trip",
  description: "Private taxi from Riyadh to Makkah, including the Qarn al-Manazil Miqat stop. SUV and Van options for the long-distance drive. Book on WhatsApp.",
  path: "/riyadh-to-makkah-taxi-service",
  keywords: ["Riyadh to Makkah taxi", "Riyadh to Makkah Umrah transfer", "Qarn al-Manazil Miqat taxi"],
});

export default function RiyadhToMakkah() {
  return <RoutePage data={riyadhToMakkah} />;
}
