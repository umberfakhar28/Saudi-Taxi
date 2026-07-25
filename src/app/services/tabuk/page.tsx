import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { tabuk } from "@/lib/cityData3";

export const metadata = generatePageMetadata({
  title: "Private Taxi & Chauffeur Service in Tabuk",
  description: "Book a private taxi, airport transfer or chauffeur in Tabuk. Professional drivers, meet-and-greet, 24/7 availability. Reserve on WhatsApp in minutes.",
  path: "/services/tabuk",
  keywords: ["Tabuk taxi", "Tabuk airport transfer", "Tabuk to NEOM taxi", "Wadi Disah tour taxi", "Tabuk Aqaba transfer"],
});

export default function TabukPage() {
  return <CityServicePage data={tabuk} />;
}
