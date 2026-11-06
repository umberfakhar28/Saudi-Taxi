import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Abha to Madinah Distance: 980–1,060 km",
  description: "Abha to Madinah is roughly 980 to 1,060 km by road, about 11 to 12.5 hours of driving up the western side of the country.",
  path: "/distance/abha-to-madinah",
  ogImage: distanceRoutes["abha-to-madinah"].heroImage,
  ogImageAlt: distanceRoutes["abha-to-madinah"].heroImageAlt,
});

export default function AbhaToMadinahDistance() {
  return <DistancePage data={distanceRoutes["abha-to-madinah"]} />;
}
