import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { qatarToDammam } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Qatar to Dammam Taxi Service",
  description: "Direct taxi from Doha, Qatar, to Dammam and the Eastern Province via the Salwa (Abu Samra) border crossing. One driver for the entire trip. Fixed pricing. Book now.",
  path: "/qatar-to-dammam-taxi-service",
  keywords: ["Qatar to Dammam taxi", "Doha to Dammam transfer", "Salwa border taxi", "Qatar to Saudi Arabia taxi"],
});

export default function Page() {
  return <RoutePage data={qatarToDammam} />;
}
