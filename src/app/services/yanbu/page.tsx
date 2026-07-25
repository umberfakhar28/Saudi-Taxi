import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { yanbu } from "@/lib/cityData3";

export const metadata = generatePageMetadata({
  title: "Yanbu Taxi, Airport Transfer & Car Service | 24/7 | Gulf Trip",
  description: "Book a private taxi, airport transfer or chauffeur in Yanbu. Professional drivers, meet-and-greet, 24/7 availability. Reserve on WhatsApp in minutes.",
  path: "/services/yanbu",
  keywords: ["Yanbu taxi", "Yanbu airport transfer", "Yanbu Industrial City taxi", "Yanbu to Madinah taxi"],
});

export default function YanbuPage() {
  return <CityServicePage data={yanbu} />;
}
