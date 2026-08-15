import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { riyadh } from "@/lib/cityData1";

export const metadata = generatePageMetadata({
  title: "Private Taxi & Chauffeur Service in Riyadh",
  description: "Book a private taxi, airport transfer or chauffeur in Riyadh. Professional drivers, meet-and-greet, 24/7 availability. Reserve on WhatsApp in minutes.",
  path: "/services/riyadh",
  keywords: ["Riyadh taxi", "Riyadh airport transfer", "King Khalid Airport taxi", "corporate taxi Riyadh", "KAFD transfer"],
  ogImage: riyadh.heroImage,
  ogImageAlt: riyadh.heroImageAlt,
});

export default function RiyadhPage() {
  return <CityServicePage data={riyadh} />;
}
