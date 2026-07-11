import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamToKuwait } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dammam to Kuwait Taxi Service | Al Nuwaiseeb Border | Gulf Trip Service",
  description: "Direct door-to-door taxi from Dammam and the Eastern Province to Kuwait via the Al Nuwaiseeb border crossing at Khafji. Book your cross-border transfer today.",
  path: "/dammam-to-kuwait-taxi-service",
  keywords: ["Dammam to Kuwait taxi", "Eastern Province to Kuwait transfer", "Al Nuwaiseeb border taxi", "Saudi Arabia to Kuwait taxi"],
});

export default function Page() {
  return <RoutePage data={dammamToKuwait} />;
}
