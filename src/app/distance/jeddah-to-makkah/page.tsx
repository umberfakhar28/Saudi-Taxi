import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Jeddah to Makkah Distance: 80 km by Road",
  description: "Jeddah to Makkah is about 80 km by road — 60 to 90 minutes outside peak season, 90 to 120 minutes during Umrah season. Transfer options for pilgrims from KAIA.",
  path: "/distance/jeddah-to-makkah",
});

export default function JeddahToMakkahDistance() {
  return <DistancePage data={distanceRoutes["jeddah-to-makkah"]} />;
}
