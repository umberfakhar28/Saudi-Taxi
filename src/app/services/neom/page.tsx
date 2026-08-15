import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { neom } from "@/lib/cityData3";

export const metadata = generatePageMetadata({
  title: "NEOM Airport Taxi & Private Transfers | Available 24/7",
  description: "Book a private taxi, airport transfer or chauffeur in NEOM. Professional drivers, meet-and-greet, 24/7 availability. Reserve on WhatsApp in minutes.",
  path: "/services/neom",
  keywords: ["NEOM taxi", "Sharma Airport transfer", "NEOM contractor transport", "Tabuk to NEOM taxi", "NEOM transfer service"],
  ogImage: neom.heroImage,
  ogImageAlt: neom.heroImageAlt,
});

export default function NeomPage() {
  return <CityServicePage data={neom} />;
}
