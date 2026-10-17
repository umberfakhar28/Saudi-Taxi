import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { kuwaitToRiyadh } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Kuwait to Riyadh Taxi — Private Transfer from 300 KWD",
  description: "Private door-to-door taxi from Kuwait to Riyadh from 300 KWD one way, for the whole vehicle. Border fees, insurance and tolls included. Prado or GMC Yukon, licensed driver, quote on WhatsApp.",
  path: "/kuwait-to-riyadh-taxi-service",
  // No hreflangPath: it emits an alternate at /ar<path>, and the Arabic
  // twin of this page does not exist yet. Add both together, not one.
  keywords: ["Kuwait to Riyadh taxi", "Kuwait to Riyadh transfer", "Kuwait to Riyadh private car", "taxi Kuwait to Saudi Arabia", "Kuwait to Riyadh by road"],
});

export default function Page() {
  return <RoutePage data={kuwaitToRiyadh} />;
}
