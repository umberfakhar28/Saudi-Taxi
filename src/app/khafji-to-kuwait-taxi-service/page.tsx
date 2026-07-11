import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { khafjiToKuwait } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Khafji to Kuwait Taxi Service | Al Nuwaiseeb Border | Gulf Trip Service",
  description: "Direct taxi from Al Khafji, Saudi Arabia to Kuwait via the Al Nuwaiseeb border crossing — the shortest land route between the two countries. Book your transfer today.",
  path: "/khafji-to-kuwait-taxi-service",
  keywords: ["Khafji to Kuwait taxi", "Al Nuwaiseeb border transfer", "Khafji Kuwait border crossing", "Saudi Arabia to Kuwait taxi"],
});

export default function Page() {
  return <RoutePage data={khafjiToKuwait} />;
}
