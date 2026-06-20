import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { khobar } from "@/lib/cityData2";

export const metadata = generatePageMetadata({
  title: "Taxi Service in Khobar | Corporate & Airport Transfers | Gulf Trip Service",
  description: "Premium taxi in Al Khobar. King Fahd Airport pickups, Dammam & Dhahran transfers, Corniche rides, and Jubail corporate routes. Professional, fixed-rate service.",
  path: "/services/khobar",
  keywords: ["Khobar taxi", "Al Khobar taxi service", "Khobar airport transfer", "Khobar Dammam taxi", "Eastern Province taxi"],
});

export default function KhobarPage() {
  return <CityServicePage data={khobar} />;
}
