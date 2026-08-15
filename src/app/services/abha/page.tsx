import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { abha } from "@/lib/cityData2";

export const metadata = generatePageMetadata({
  title: "Private Taxi & Chauffeur Service in Abha | Gulf Trip Service",
  description: "Book a private taxi, airport transfer or chauffeur in Abha. Professional drivers, meet-and-greet, 24/7 availability. Reserve on WhatsApp in minutes.",
  path: "/services/abha",
  keywords: ["Abha taxi", "Abha airport transfer", "Habala village tour taxi", "Asir mountain taxi", "Al-Soudah transfer"],
  ogImage: abha.heroImage,
  ogImageAlt: abha.heroImageAlt,
});

export default function AbhaPage() {
  return <CityServicePage data={abha} />;
}
