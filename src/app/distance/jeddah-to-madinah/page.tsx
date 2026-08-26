import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Jeddah to Madinah Distance & Travel Time",
  description: "Jeddah to Madinah distance from King Abdulaziz Airport, driving time, and private transfer options for a Madinah-first Umrah itinerary.",
  path: "/distance/jeddah-to-madinah",
});

export default function JeddahToMadinahDistance() {
  return <DistancePage data={distanceRoutes["jeddah-to-madinah"]} />;
}
