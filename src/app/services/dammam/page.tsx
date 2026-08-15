import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { dammam } from "@/lib/cityData1";

export const metadata = generatePageMetadata({
  title: "Private Taxi & Chauffeur Service in Dammam",
  description: "Book a private taxi, airport transfer or chauffeur in Dammam. Professional drivers, meet-and-greet, 24/7 availability. Reserve on WhatsApp in minutes.",
  path: "/services/dammam",
  keywords: ["Dammam taxi", "King Fahd Airport taxi", "Dammam Khobar transfer", "Eastern Province taxi", "Dammam Riyadh taxi"],
  ogImage: dammam.heroImage,
  ogImageAlt: dammam.heroImageAlt,
});

export default function DammamPage() {
  return <CityServicePage data={dammam} />;
}
