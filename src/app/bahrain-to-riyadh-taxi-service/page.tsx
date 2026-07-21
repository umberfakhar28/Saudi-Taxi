import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { bahrainToRiyadh } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Bahrain to Riyadh Taxi Service",
  description: "Coordinated long-distance transfer from Bahrain across the King Fahd Causeway to Riyadh. Executive vehicles, coordinated border handover. Book your transfer today.",
  path: "/bahrain-to-riyadh-taxi-service",
  keywords: ["Bahrain to Riyadh taxi", "Manama to Riyadh transfer", "King Fahd Causeway taxi to Riyadh"],
});

export default function Page() {
  return <RoutePage data={bahrainToRiyadh} />;
}
