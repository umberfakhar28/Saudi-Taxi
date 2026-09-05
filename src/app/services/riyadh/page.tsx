import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { riyadh } from "@/lib/cityData1";

export const metadata = generatePageMetadata({
  // Keyword ownership (Search Console cannibalization fix): this page owns
  // the city/chauffeur queries it actually ranks for — "chauffeur service
  // riyadh", "riyadh taxi service". The airport-taxi terms it used to list
  // ("Riyadh airport transfer", "King Khalid Airport taxi") are owned by
  // /riyadh-airport-taxi-service and were removed here — three URLs were
  // competing for them and Google was surfacing this one, the weakest match
  // for airport intent. The airport section on this page still links there.
  title: "Private Taxi & Chauffeur Service in Riyadh",
  description: "Private chauffeur and taxi service across Riyadh — KAFD, Olaya, Diriyah and the Diplomatic Quarter. Executive vehicles, professional drivers, 24/7. Reserve on WhatsApp in minutes.",
  path: "/services/riyadh",
  keywords: ["Riyadh taxi", "chauffeur service Riyadh", "Riyadh taxi service", "corporate taxi Riyadh", "KAFD transfer"],
  ogImage: riyadh.heroImage,
  ogImageAlt: riyadh.heroImageAlt,
});

export default function RiyadhPage() {
  return <CityServicePage data={riyadh} />;
}
