import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { riyadh } from "@/lib/cityData1";

export const metadata = generatePageMetadata({
  title: "Taxi Service in Riyadh | Airport Transfers & Corporate Rides | Gulf Trip Service",
  description: "Premium taxi and chauffeur service in Riyadh. Airport transfers to King Khalid International (RUH), corporate travel, KAFD, Diriyah, and intercity routes. 24/7 fixed rates.",
  path: "/services/riyadh",
  keywords: ["Riyadh taxi", "Riyadh airport transfer", "King Khalid Airport taxi", "corporate taxi Riyadh", "KAFD transfer"],
});

export default function RiyadhPage() {
  return <CityServicePage data={riyadh} />;
}
