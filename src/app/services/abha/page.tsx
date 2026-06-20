import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { abha } from "@/lib/cityData2";

export const metadata = generatePageMetadata({
  title: "Taxi Service in Abha | Mountain Tours & Airport Transfers | Gulf Trip Service",
  description: "Premium taxi in Abha. Airport pickups, Habala village tours, Al-Soudah cable car transfers, Rijal Alma heritage trips, and Asir mountain exploration. Book now.",
  path: "/services/abha",
  keywords: ["Abha taxi", "Abha airport transfer", "Habala village tour taxi", "Asir mountain taxi", "Al-Soudah transfer"],
});

export default function AbhaPage() {
  return <CityServicePage data={abha} />;
}
