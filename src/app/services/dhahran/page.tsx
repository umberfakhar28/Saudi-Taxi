import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { dhahran } from "@/lib/cityData3";

// W7 P2 (docs/page-gap-analysis.md) — Dhahran was previously only a landmark
// mention (Ithra) inside Dammam's hub page, with no dedicated page.
export const metadata = generatePageMetadata({
  title: "Private Car Transfer & Corporate Taxi in Dhahran — Book 24/7",
  description: "Book a private taxi or corporate transfer in Dhahran. Ithra visits, Saudi Aramco and KFUPM transfers, tri-city Eastern Province coverage. Reserve on WhatsApp.",
  path: "/services/dhahran",
  keywords: ["Dhahran taxi", "Dhahran car service", "Ithra transfer", "Saudi Aramco taxi Dhahran"],
  ogImage: dhahran.heroImage,
  ogImageAlt: dhahran.heroImageAlt,
});

export default function DhahranPage() {
  return <CityServicePage data={dhahran} />;
}
