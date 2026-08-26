import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Jeddah to Makkah Distance & Travel Time",
  description: "Jeddah to Makkah distance from King Abdulaziz Airport, driving time, and private transfer options for Umrah pilgrims. Plan your trip or book a taxi.",
  path: "/distance/jeddah-to-makkah",
});

export default function JeddahToMakkahDistance() {
  return <DistancePage data={distanceRoutes["jeddah-to-makkah"]} />;
}
