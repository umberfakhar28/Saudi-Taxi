import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { tabuk } from "@/lib/cityData3";

export const metadata = generatePageMetadata({
  title: "Luxury Chauffeur & Private Taxi Service in Tabuk",
  description: "Book a luxury chauffeur, private taxi, or airport transfer in Tabuk. Executive vehicles, professional drivers, 24/7 availability. Reserve on WhatsApp.",
  path: "/services/tabuk",
  keywords: ["luxury chauffeur service in Tabuk", "Tabuk taxi", "Tabuk airport transfer", "Tabuk to NEOM taxi", "private chauffeur Tabuk"],
  ogImage: tabuk.heroImage,
  ogImageAlt: tabuk.heroImageAlt,
});

export default function TabukPage() {
  return <CityServicePage data={tabuk} />;
}
