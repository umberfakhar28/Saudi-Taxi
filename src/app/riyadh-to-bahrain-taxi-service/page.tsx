import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { riyadhToBahrain } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Riyadh to Bahrain Taxi Service | King Fahd Causeway | Gulf Trip Service",
  description: "Private long-distance transfer from Riyadh across the King Fahd Causeway into Bahrain. Executive vehicles, coordinated border handover. Book your transfer today.",
  path: "/riyadh-to-bahrain-taxi-service",
  keywords: ["Riyadh to Bahrain taxi", "Riyadh to Manama transfer", "King Fahd Causeway taxi from Riyadh"],
});

export default function Page() {
  return <RoutePage data={riyadhToBahrain} />;
}
