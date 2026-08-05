import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { abuDhabiToDammam } from "@/lib/routeData";

// W7 P1.5 reciprocal of /dammam-to-abu-dhabi-taxi-service (docs/page-gap-analysis.md).
export const metadata = generatePageMetadata({
  title: "Abu Dhabi to Dammam Taxi — Executive Transfer | Gulf Trip",
  description: "Private long-distance taxi from Abu Dhabi to Dammam via the Al Batha/Ghuwaifat border. Executive vehicles, 24/7. Book on WhatsApp.",
  path: "/abu-dhabi-to-dammam-taxi-service",
  keywords: ["Abu Dhabi to Dammam taxi", "Abu Dhabi to Saudi Arabia transfer", "Ghuwaifat border taxi"],
});

export default function AbuDhabiToDammam() {
  return <RoutePage data={abuDhabiToDammam} />;
}
