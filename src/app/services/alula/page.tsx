import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { alula } from "@/lib/cityData3";

export const metadata = generatePageMetadata({
  title: "Private Car Transfer & Chauffeur in AlUla — Book 24/7",
  description: "Book a private taxi, airport transfer or chauffeur in AlUla. Professional drivers, meet-and-greet, 24/7 availability. Reserve on WhatsApp in minutes.",
  path: "/services/alula",
  keywords: ["AlUla taxi", "AlUla airport transfer", "Hegra taxi", "Elephant Rock transfer AlUla", "AlUla tour driver"],
});

export default function AlulaPage() {
  return <CityServicePage data={alula} />;
}
