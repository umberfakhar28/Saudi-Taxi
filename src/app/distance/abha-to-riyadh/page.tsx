import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Abha to Riyadh Distance & Travel Time",
  description: "Abha to Riyadh distance by road, driving time from the Asir highlands to the capital, and private transfer options.",
  path: "/distance/abha-to-riyadh",
  ogImage: distanceRoutes["abha-to-riyadh"].heroImage,
  ogImageAlt: distanceRoutes["abha-to-riyadh"].heroImageAlt,
});

export default function AbhaToRiyadhDistance() {
  return <DistancePage data={distanceRoutes["abha-to-riyadh"]} />;
}
