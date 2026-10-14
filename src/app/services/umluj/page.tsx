import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { umluj } from "@/lib/cityData3";

export const metadata = generatePageMetadata({
  // Kept short on purpose: generatePageMetadata appends " | Gulf Trip Service"
  // (20 chars) unconditionally, so this renders at 56. Note that 22 existing
  // pages double the brand ("… | Gulf Trip | Gulf Trip Service") and run
  // 74–89 chars — a pre-existing defect reported separately, not fixed here.
  title: "Umluj Taxi & Red Sea Coast Transfers",
  description: "Private taxi, full-day car and driver, and destination transfers in Umluj on Saudi Arabia's Red Sea coast — plus runs north to Al Wajh and the Red Sea Project.",
  path: "/services/umluj",
  keywords: ["Umluj taxi", "Umluj transfer", "Umluj private driver", "Yanbu to Umluj", "Umluj Red Sea"],
  ogImage: umluj.heroImage,
  ogImageAlt: umluj.heroImageAlt,
});

export default function UmlujPage() {
  return <CityServicePage data={umluj} />;
}
