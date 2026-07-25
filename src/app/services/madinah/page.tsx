import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { madinah } from "@/lib/cityData1";

export const metadata = generatePageMetadata({
  title: "Madinah Airport Taxi & Private Transfers | Available 24/7",
  description: "Book a private taxi, airport transfer or chauffeur in Madinah. Professional drivers, meet-and-greet, 24/7 availability. Reserve on WhatsApp in minutes.",
  path: "/services/madinah",
  keywords: ["Madinah taxi", "Prophet mosque taxi", "Madinah airport transfer", "Ziyarat Madinah", "Madinah to Makkah taxi"],
});

export default function MadinahPage() {
  return <CityServicePage data={madinah} />;
}
