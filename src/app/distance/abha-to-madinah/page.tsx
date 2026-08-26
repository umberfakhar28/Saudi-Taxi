import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Abha to Madinah Distance & Travel Time",
  description: "Abha to Madinah distance by road, estimated driving time, and private transfer options. Plan your trip or book a private taxi for this route.",
  path: "/distance/abha-to-madinah",
  ogImage: distanceRoutes["abha-to-madinah"].heroImage,
  ogImageAlt: distanceRoutes["abha-to-madinah"].heroImageAlt,
});

export default function AbhaToMadinahDistance() {
  return <DistancePage data={distanceRoutes["abha-to-madinah"]} />;
}
