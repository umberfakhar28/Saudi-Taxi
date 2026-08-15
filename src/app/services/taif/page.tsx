import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { taif } from "@/lib/cityData2";

export const metadata = generatePageMetadata({
  title: "Taif Airport Taxi & Private Transfers | Available 24/7",
  description: "Book a private taxi, airport transfer or chauffeur in Taif. Professional drivers, meet-and-greet, 24/7 availability. Reserve on WhatsApp in minutes.",
  path: "/services/taif",
  keywords: ["Taif taxi", "Taif airport transfer", "Makkah to Taif taxi", "Taif rose farm tour", "Al-Hada taxi"],
  ogImage: taif.heroImage,
  ogImageAlt: taif.heroImageAlt,
});

export default function TaifPage() {
  return <CityServicePage data={taif} />;
}
