import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { khafjiToKuwait } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Khafji to Kuwait Taxi & Private Transfer | 24/7 Service",
  description: "Reliable Khafji to Kuwait taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/khafji-to-kuwait-taxi-service",
  keywords: ["Khafji to Kuwait taxi", "Al Nuwaiseeb border transfer", "Khafji Kuwait border crossing", "Saudi Arabia to Kuwait taxi"],
});

export default function Page() {
  return <RoutePage data={khafjiToKuwait} />;
}
