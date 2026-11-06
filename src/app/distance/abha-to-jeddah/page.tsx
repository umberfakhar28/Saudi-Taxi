import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Abha to Jeddah Distance: 620–680 km",
  description: "Abha to Jeddah is around 620 to 680 km by road via Taif, about 7 to 7.5 hours between the Asir mountains and the Red Sea coast.",
  path: "/distance/abha-to-jeddah",
  ogImage: distanceRoutes["abha-to-jeddah"].heroImage,
  ogImageAlt: distanceRoutes["abha-to-jeddah"].heroImageAlt,
});

export default function AbhaToJeddahDistance() {
  return <DistancePage data={distanceRoutes["abha-to-jeddah"]} />;
}
