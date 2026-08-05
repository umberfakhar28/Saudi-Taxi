import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { madinahToMakkah } from "@/lib/routeData";

// W7 P1 reciprocal of /makkah-to-madinah-taxi-service (docs/page-gap-analysis.md).
export const metadata = generatePageMetadata({
  title: "Madinah to Makkah Taxi & Chauffeur Service | Gulf Trip",
  description: "Madinah to Makkah private taxi via the Haramain Expressway, with the Dhul Hulaifah Miqat stop built in. Meet-and-greet, 24/7. Book on WhatsApp.",
  path: "/madinah-to-makkah-taxi-service",
  keywords: ["Madinah to Makkah taxi", "Madinah to Makkah transfer", "Dhul Hulaifah Miqat taxi"],
});

export default function MadinahToMakkah() {
  return <RoutePage data={madinahToMakkah} />;
}
