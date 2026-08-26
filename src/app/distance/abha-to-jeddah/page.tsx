import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Abha to Jeddah Distance & Travel Time",
  description: "Abha to Jeddah distance by road via Taif, driving time, and private transfer options for combining mountains and coast.",
  path: "/distance/abha-to-jeddah",
  ogImage: distanceRoutes["abha-to-jeddah"].heroImage,
  ogImageAlt: distanceRoutes["abha-to-jeddah"].heroImageAlt,
});

export default function AbhaToJeddahDistance() {
  return <DistancePage data={distanceRoutes["abha-to-jeddah"]} />;
}
