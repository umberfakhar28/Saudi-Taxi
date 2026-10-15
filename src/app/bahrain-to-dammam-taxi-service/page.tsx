import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { bahrainToDammam } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  // Title keeps "Bahrain to Dammam Taxi" at the front — it's this page's
  // best-performing query pair in Search Console (positions 13 and 16, i.e.
  // striking distance of page one). Description rewritten to surface the
  // concrete journey facts (65 km, 1–1.5 hrs, causeway) that make the
  // snippet more useful than a generic reliability claim.
  title: "Bahrain to Dammam Taxi & Private Transfer | 24/7 Service",
  description: "Bahrain to Dammam taxi and private transfer across the King Fahd Causeway — about 65 km, 1–1.5 hours door to door. One vehicle, licensed drivers, 24/7. Book on WhatsApp.",
  path: "/bahrain-to-dammam-taxi-service",
  hreflangPath: "/bahrain-to-dammam-taxi-service",
  keywords: ["Bahrain to Dammam taxi", "taxi Bahrain to Dammam", "Bahrain to Saudi Arabia taxi", "King Fahd Causeway transfer", "Manama to Dammam taxi"],
});

export default function Page() {
  return <RoutePage data={bahrainToDammam} />;
}
