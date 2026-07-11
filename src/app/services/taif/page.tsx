import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { taif } from "@/lib/cityData2";

export const metadata = generatePageMetadata({
  title: "Taxi Service in Taif",
  description: "Scenic taxi in Taif. Airport pickups, Makkah–Taif day trips, Al-Hada cable car transfers, rose farm tours, and mountain resort connections. Fixed rates 24/7.",
  path: "/services/taif",
  keywords: ["Taif taxi", "Taif airport transfer", "Makkah to Taif taxi", "Taif rose farm tour", "Al-Hada taxi"],
});

export default function TaifPage() {
  return <CityServicePage data={taif} />;
}
