import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { makkahToRiyadh } from "@/lib/routeData";

// Closes the /riyadh-to-makkah-taxi-service reciprocal pair (W7).
export const metadata = generatePageMetadata({
  title: "Makkah to Riyadh Taxi & Executive Transfer | Gulf Trip",
  description: "Private long-distance taxi from Makkah to Riyadh. SUV and Van options for the long-distance drive, 24/7 availability. Book on WhatsApp.",
  path: "/makkah-to-riyadh-taxi-service",
  keywords: ["Makkah to Riyadh taxi", "Makkah to Riyadh transfer"],
});

export default function MakkahToRiyadh() {
  return <RoutePage data={makkahToRiyadh} />;
}
