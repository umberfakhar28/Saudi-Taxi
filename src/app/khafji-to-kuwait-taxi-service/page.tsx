import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { khafjiToKuwait } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Khafji to Kuwait Taxi & Al Nuwaiseeb Border Crossing, 24/7",
  brandSuffix: false,
  description: "Private taxi from Khafji to Kuwait via the Al Nuwaiseeb border: 15 km to the crossing, about 125 km to Kuwait City. Licensed driver, 24/7, on WhatsApp.",
  path: "/khafji-to-kuwait-taxi-service",
  keywords: ["Khafji to Kuwait taxi", "Al Nuwaiseeb border transfer", "Khafji Kuwait border crossing", "Saudi Arabia to Kuwait taxi"],
});

export default function Page() {
  return <RoutePage data={khafjiToKuwait} />;
}
