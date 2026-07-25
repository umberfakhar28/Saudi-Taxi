import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamToAbuDhabi } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Taxi Dammam to Abu Dhabi | Cross-Border Car Service 24/7",
  description: "Reliable Dammam to Abu Dhabi taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/dammam-to-abu-dhabi-taxi-service",
  keywords: ["Dammam to Abu Dhabi taxi", "Saudi Arabia to Abu Dhabi transfer", "Ghuwaifat border taxi", "Dammam to UAE taxi"],
});

export default function Page() {
  return <RoutePage data={dammamToAbuDhabi} />;
}
