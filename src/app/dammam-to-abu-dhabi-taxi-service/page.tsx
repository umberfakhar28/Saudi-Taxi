import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamToAbuDhabi } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dammam to Abu Dhabi Taxi Service",
  description: "Private long-distance overland transfer from Dammam to Abu Dhabi via the Al Batha (Ghuwaifat) border crossing. Executive vehicles for the ~950 km journey. Book now.",
  path: "/dammam-to-abu-dhabi-taxi-service",
  keywords: ["Dammam to Abu Dhabi taxi", "Saudi Arabia to Abu Dhabi transfer", "Ghuwaifat border taxi", "Dammam to UAE taxi"],
});

export default function Page() {
  return <RoutePage data={dammamToAbuDhabi} />;
}
