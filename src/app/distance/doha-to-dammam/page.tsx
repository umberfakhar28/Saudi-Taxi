import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Doha to Dammam Distance: 440 km by Road",
  description: "Doha to Dammam is about 440 km by road through the Salwa / Abu Samra border, usually 5 to 6 hours including crossing time.",
  path: "/distance/doha-to-dammam",
});

export default function DohaToDammamDistance() {
  return <DistancePage data={distanceRoutes["doha-to-dammam"]} />;
}
