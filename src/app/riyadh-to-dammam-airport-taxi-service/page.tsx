import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { riyadhToDammamAirport } from "@/lib/routeData";

// W7 P1 reciprocal of /dammam-airport-to-riyadh-taxi-service (docs/page-gap-analysis.md).
export const metadata = generatePageMetadata({
  title: "Riyadh to Dammam Airport Taxi — Executive Transfer | Gulf Trip",
  description: "Executive taxi from Riyadh to King Fahd International Airport (DMM). Flight-timed pickup, 24/7 availability. Book on WhatsApp.",
  path: "/riyadh-to-dammam-airport-taxi-service",
  keywords: ["Riyadh to Dammam airport taxi", "Riyadh to DMM transfer", "Riyadh to King Fahd airport"],
});

export default function RiyadhToDammamAirport() {
  return <RoutePage data={riyadhToDammamAirport} />;
}
