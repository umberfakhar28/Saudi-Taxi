import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { taif } from "@/lib/cityData2";

export const metadata = generatePageMetadata({
  // Was "Taif Airport Taxi & Private Transfers", the same target as
  // /taif-airport-taxi-service. The two pages split one query between them
  // and ranked 40.8 and 35.6 (GSC, 11 Oct - 7 Nov 2026). This page is about
  // the city, so its title now says so and leaves the airport to the airport page.
  title: "Taif Taxi & Private Car Service | Al Hada & Shafa",
  description: "Book a private taxi, airport transfer or chauffeur in Taif. Professional drivers, meet-and-greet, 24/7 availability. Reserve on WhatsApp in minutes.",
  path: "/services/taif",
  keywords: ["Taif taxi", "Taif airport transfer", "Makkah to Taif taxi", "Taif rose farm tour", "Al-Hada taxi"],
  ogImage: taif.heroImage,
  ogImageAlt: taif.heroImageAlt,
});

export default function TaifPage() {
  return <CityServicePage data={taif} />;
}
