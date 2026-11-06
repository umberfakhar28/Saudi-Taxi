import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Abha to Riyadh Distance: 780–850 km",
  description: "Abha to Riyadh is about 780 to 850 km by road, roughly 8.5 to 9.5 hours of driving from the Asir highlands to the capital.",
  path: "/distance/abha-to-riyadh",
  ogImage: distanceRoutes["abha-to-riyadh"].heroImage,
  ogImageAlt: distanceRoutes["abha-to-riyadh"].heroImageAlt,
});

export default function AbhaToRiyadhDistance() {
  return <DistancePage data={distanceRoutes["abha-to-riyadh"]} />;
}
