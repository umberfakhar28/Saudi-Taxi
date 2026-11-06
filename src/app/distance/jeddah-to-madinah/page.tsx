import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Jeddah to Madinah Distance: 420 km by Road",
  description: "Jeddah to Madinah is about 420 km by road and roughly 4.5 hours of driving — the usual first leg of a Madinah-first Umrah itinerary from King Abdulaziz Airport.",
  path: "/distance/jeddah-to-madinah",
});

export default function JeddahToMadinahDistance() {
  return <DistancePage data={distanceRoutes["jeddah-to-madinah"]} />;
}
