import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { makkah } from "@/lib/cityData1";

export const metadata = generatePageMetadata({
  title: "Private Car Transfer & Chauffeur in Makkah — Book 24/7",
  description: "Book a private taxi, airport transfer or chauffeur in Makkah. Professional drivers, meet-and-greet, 24/7 availability. Reserve on WhatsApp in minutes.",
  path: "/services/makkah",
  keywords: ["Makkah taxi", "Umrah taxi Makkah", "Makkah Haram transfer", "Ziyarat taxi Makkah", "Jeddah to Makkah taxi"],
  ogImage: makkah.heroImage,
  ogImageAlt: makkah.heroImageAlt,
});

export default function MakkahPage() {
  return <CityServicePage data={makkah} />;
}
