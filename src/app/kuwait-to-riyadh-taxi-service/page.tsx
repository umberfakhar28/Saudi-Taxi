import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { kuwaitToRiyadh } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Kuwait to Riyadh Taxi by Road from 220 KWD | Private Car",
  brandSuffix: false,
  description: "Private taxi from Kuwait to Riyadh by road, from 220 KWD per car one way: about 648 km via the Khafji border, 7 h 40 min driving. Book on WhatsApp.",
  path: "/kuwait-to-riyadh-taxi-service",
  // No hreflangPath: it emits an alternate at /ar<path>, and the Arabic
  // twin of this page does not exist yet. Add both together, not one.
  keywords: ["Kuwait to Riyadh taxi", "Kuwait to Riyadh transfer", "Kuwait to Riyadh private car", "taxi Kuwait to Saudi Arabia", "Kuwait to Riyadh by road"],
});

export default function Page() {
  return <RoutePage data={kuwaitToRiyadh} />;
}
