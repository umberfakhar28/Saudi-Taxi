import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { bahrainToRiyadh } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Taxi Bahrain to Riyadh | Cross-Border Car Service 24/7",
  description: "Reliable Bahrain to Riyadh taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/bahrain-to-riyadh-taxi-service",
  keywords: ["Bahrain to Riyadh taxi", "Manama to Riyadh transfer", "King Fahd Causeway taxi to Riyadh"],
});

export default function Page() {
  return <RoutePage data={bahrainToRiyadh} />;
}
