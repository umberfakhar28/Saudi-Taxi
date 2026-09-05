import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { madinah } from "@/lib/cityData1";

export const metadata = generatePageMetadata({
  // Keyword ownership (Search Console cannibalization fix): this page's
  // title was itself an airport title ("Madinah Airport Taxi & Private
  // Transfers"), competing directly with /madina-airport-taxi-service —
  // and Google was surfacing this city page for "madinah airport transfer"
  // while the dedicated airport page didn't appear at all. Airport terms
  // now belong to that page; this one owns the city/Ziyarat intent.
  title: "Madinah Taxi & Ziyarat Transfers | Available 24/7",
  description: "Private taxi and chauffeur service in Madinah — Prophet's Mosque hotel transfers, Ziyarat tours to Quba and Uhud, and intercity routes to Makkah. Reserve on WhatsApp in minutes.",
  path: "/services/madinah",
  keywords: ["Madinah taxi", "Prophet mosque taxi", "Ziyarat Madinah", "Madinah to Makkah taxi", "Madinah chauffeur service"],
  ogImage: madinah.heroImage,
  ogImageAlt: madinah.heroImageAlt,
});

export default function MadinahPage() {
  return <CityServicePage data={madinah} />;
}
