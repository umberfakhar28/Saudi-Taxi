import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { madinah } from "@/lib/cityData1";

export const metadata = generatePageMetadata({
  title: "Taxi Service in Madinah",
  description: "Professional taxi in Madinah. MED Airport transfers, Prophet's Mosque hotel pickups, Ziyarat tours (Quba, Uhud), and Madinah–Makkah intercity routes. 24/7.",
  path: "/services/madinah",
  keywords: ["Madinah taxi", "Prophet mosque taxi", "Madinah airport transfer", "Ziyarat Madinah", "Madinah to Makkah taxi"],
});

export default function MadinahPage() {
  return <CityServicePage data={madinah} />;
}
