import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Doha to Riyadh Distance: 580 km by Road",
  description: "Doha to Riyadh is about 580 km by road via the Salwa / Abu Samra border, typically 6.5 to 7.5 hours including crossing time.",
  path: "/distance/doha-to-riyadh",
});

export default function DohaToRiyadhDistance() {
  return <DistancePage data={distanceRoutes["doha-to-riyadh"]} />;
}
