import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Makkah to Madinah Distance: 450 km by Road",
  description: "Makkah to Madinah is approximately 450 km by road, about 4 to 5 hours via the Haramain Expressway. Compare the train, flying and a private transfer for Umrah.",
  path: "/distance/makkah-to-madinah",
});

export default function MakkahToMadinahDistance() {
  return <DistancePage data={distanceRoutes["makkah-to-madinah"]} />;
}
