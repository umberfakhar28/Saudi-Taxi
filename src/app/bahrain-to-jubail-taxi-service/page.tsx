import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { bahrainToJubail } from "@/lib/routeData";

// Search Query Content Map, §D — the one new route page the query audit
// justified. Built on the same shared RoutePage template as every other
// Bahrain <-> Saudi route (bahrain-to-dammam-taxi-service,
// bahrain-to-riyadh-taxi-service), not a bespoke page.
export const metadata = generatePageMetadata({
  title: "Bahrain to Jubail Taxi & Private Transfer",
  description: "Private taxi and chauffeur transfer from Bahrain to Jubail via the King Fahd Causeway. Contractor and business travel covered. Book on WhatsApp.",
  path: "/bahrain-to-jubail-taxi-service",
  ogImage: bahrainToJubail.heroImage,
});

export default function BahrainToJubail() {
  return <RoutePage data={bahrainToJubail} />;
}
