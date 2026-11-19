import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  // Answers the search in the title (distance, time) and invites the click
  // with the fare (docs/seo/kuwait/keyword-map.md, Step 3). Owner-confirmed
  // figures, 19 Nov 2026. No brand suffix: it would push past 60 chars.
  title: "Riyadh to Kuwait Distance by Road: 648 km, 7h 40m, Taxi Fare",
  brandSuffix: false,
  description: "Riyadh to Kuwait is about 648 km by road, roughly 7 h 40 min of driving via the Al Khafji–Al Nuwaiseeb border. Private taxi door to door from 220 KWD.",
  path: "/distance/riyadh-to-kuwait",
});

export default function RiyadhToKuwaitDistance() {
  return <DistancePage data={distanceRoutes["riyadh-to-kuwait"]} />;
}
