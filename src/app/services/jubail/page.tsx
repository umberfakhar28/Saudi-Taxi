import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { jubail } from "@/lib/cityData2";

export const metadata = generatePageMetadata({
  title: "Private Car Transfer & Chauffeur in Jubail — Book 24/7",
  description: "Book a private taxi, airport transfer or chauffeur in Jubail. Professional drivers, meet-and-greet, 24/7 availability. Reserve on WhatsApp in minutes.",
  path: "/services/jubail",
  keywords: ["Jubail taxi", "Jubail Industrial City transfer", "Jubail airport taxi", "corporate taxi Jubail"],
  ogImage: jubail.heroImage,
  ogImageAlt: jubail.heroImageAlt,
});

export default function JubailPage() {
  return <CityServicePage data={jubail} />;
}
