import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { khamisMushait } from "@/lib/cityData3";

// W7 P2 (docs/page-gap-analysis.md) — Khamis Mushait was previously only
// referenced inside Abha's AIRPORT_ROUTES and FAQs, with no dedicated page.
export const metadata = generatePageMetadata({
  title: "Private Taxi & Airport Transfer in Khamis Mushait — Book 24/7",
  description: "Book a private taxi or Abha Airport transfer in Khamis Mushait. Friday Market visits, Asir Province connections. Reserve on WhatsApp.",
  path: "/services/khamis-mushait",
  keywords: ["Khamis Mushait taxi", "Khamis Mushait airport transfer", "Abha to Khamis Mushait taxi"],
});

export default function KhamisMushaitPage() {
  return <CityServicePage data={khamisMushait} />;
}
