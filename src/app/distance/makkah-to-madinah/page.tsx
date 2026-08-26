import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Makkah to Madinah Distance & Travel Time",
  description: "Makkah to Madinah distance via the Haramain Expressway, driving time, and private transfer options. Plan your Umrah trip or book a private taxi.",
  path: "/distance/makkah-to-madinah",
});

export default function MakkahToMadinahDistance() {
  return <DistancePage data={distanceRoutes["makkah-to-madinah"]} />;
}
