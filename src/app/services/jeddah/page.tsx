import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { jeddah } from "@/lib/cityData1";

export const metadata = generatePageMetadata({
  title: "Taxi Service in Jeddah | KAIA Airport Transfers & City Rides | Gulf Trip Service",
  description: "Professional taxi in Jeddah. King Abdulaziz Airport (KAIA) transfers to Makkah, Madinah & city hotels. Al-Balad tours, Corniche pickups. 24/7, fixed rates.",
  path: "/services/jeddah",
  keywords: ["Jeddah taxi", "Jeddah airport taxi", "KAIA transfer", "Jeddah to Makkah", "Jeddah city tour taxi"],
});

export default function JeddahPage() {
  return <CityServicePage data={jeddah} />;
}
