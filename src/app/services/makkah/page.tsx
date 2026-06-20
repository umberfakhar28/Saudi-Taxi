import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { makkah } from "@/lib/cityData1";

export const metadata = generatePageMetadata({
  title: "Taxi Service in Makkah | Umrah Transfers & Ziyarat Tours | Gulf Trip Service",
  description: "Dedicated taxi service in Makkah for Umrah and Hajj pilgrims. Hotel-to-Haram transfers, Jeddah Airport pickups, Ziyarat tours, and Makkah–Madinah intercity routes.",
  path: "/services/makkah",
  keywords: ["Makkah taxi", "Umrah taxi Makkah", "Makkah Haram transfer", "Ziyarat taxi Makkah", "Jeddah to Makkah taxi"],
});

export default function MakkahPage() {
  return <CityServicePage data={makkah} />;
}
