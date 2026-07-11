import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { dammam } from "@/lib/cityData1";

export const metadata = generatePageMetadata({
  title: "Taxi Service in Dammam | Eastern Province",
  description: "Executive taxi in Dammam. King Fahd Airport transfers, Khobar & Dhahran corporate rides, Riyadh intercity routes, and King Fahd Causeway connections. Fixed rates.",
  path: "/services/dammam",
  keywords: ["Dammam taxi", "King Fahd Airport taxi", "Dammam Khobar transfer", "Eastern Province taxi", "Dammam Riyadh taxi"],
});

export default function DammamPage() {
  return <CityServicePage data={dammam} />;
}
