import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { tabuk } from "@/lib/cityData3";

export const metadata = generatePageMetadata({
  title: "Taxi Service in Tabuk",
  description: "Professional taxi in Tabuk. Airport transfers, NEOM & Haql connections, Wadi Disah canyon excursions, and Aqaba border drop-offs. 24/7 fixed rates.",
  path: "/services/tabuk",
  keywords: ["Tabuk taxi", "Tabuk airport transfer", "Tabuk to NEOM taxi", "Wadi Disah tour taxi", "Tabuk Aqaba transfer"],
});

export default function TabukPage() {
  return <CityServicePage data={tabuk} />;
}
