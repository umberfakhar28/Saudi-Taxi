import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { khobar } from "@/lib/cityData2";

export const metadata = generatePageMetadata({
  title: "Khobar Taxi, Airport Transfer & Car Service | 24/7 | Gulf Trip",
  description: "Book a private taxi, airport transfer or chauffeur in Khobar. Professional drivers, meet-and-greet, 24/7 availability. Reserve on WhatsApp in minutes.",
  path: "/services/khobar",
  keywords: ["Khobar taxi", "Al Khobar taxi service", "Khobar airport transfer", "Khobar Dammam taxi", "Eastern Province taxi"],
});

export default function KhobarPage() {
  return <CityServicePage data={khobar} />;
}
