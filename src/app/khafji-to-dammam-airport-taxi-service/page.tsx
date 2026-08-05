import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { khafjiToDammamAirport } from "@/lib/routeData";

// W7 P1.5 reciprocal of /dammam-airport-to-khafji-taxi-service (docs/page-gap-analysis.md).
export const metadata = generatePageMetadata({
  title: "Khafji to Dammam Airport Taxi | Gulf Trip",
  description: "Direct taxi from Al Khafji to King Fahd International Airport (DMM). Serving KJO staff, residents, and Kuwait-border travelers. Book on WhatsApp.",
  path: "/khafji-to-dammam-airport-taxi-service",
  keywords: ["Khafji to Dammam airport taxi", "Khafji to DMM transfer"],
});

export default function KhafjiToDammamAirport() {
  return <RoutePage data={khafjiToDammamAirport} />;
}
