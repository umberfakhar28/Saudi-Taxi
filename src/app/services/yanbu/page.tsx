import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { yanbu } from "@/lib/cityData3";

export const metadata = generatePageMetadata({
  title: "Taxi Service in Yanbu | Red Sea Coast & Airport Transfers | Gulf Trip Service",
  description: "Professional taxi in Yanbu. Airport pickups, petrochemical corporate transfers, Madinah connections, and Red Sea dive site drop-offs. Fixed rates, 24/7.",
  path: "/services/yanbu",
  keywords: ["Yanbu taxi", "Yanbu airport transfer", "Yanbu Industrial City taxi", "Yanbu to Madinah taxi"],
});

export default function YanbuPage() {
  return <CityServicePage data={yanbu} />;
}
