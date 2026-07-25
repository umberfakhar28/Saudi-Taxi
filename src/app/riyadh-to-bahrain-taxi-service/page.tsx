import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { riyadhToBahrain } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Taxi Riyadh to Bahrain | Cross-Border Car Service 24/7",
  description: "Reliable Riyadh to Bahrain taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/riyadh-to-bahrain-taxi-service",
  keywords: ["Riyadh to Bahrain taxi", "Riyadh to Manama transfer", "King Fahd Causeway taxi from Riyadh"],
});

export default function Page() {
  return <RoutePage data={riyadhToBahrain} />;
}
