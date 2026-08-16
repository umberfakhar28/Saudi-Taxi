import { generatePageMetadata } from "@/lib/seo";
import BorderPage from "@/components/BorderPage";
import { saudiToJordan } from "@/lib/borderData";

export const metadata = generatePageMetadata({
  title: "Saudi Arabia to Jordan Taxi | Land Border Transfer 24/7",
  description: "Private overland taxi from Saudi Arabia to Jordan, popular with Hajj pilgrims and families. Licensed drivers, meet-and-greet, 24/7. Reserve on WhatsApp today.",
  path: "/saudi-arabia-to-jordan-land-transfer",
  keywords: ["Saudi to Jordan taxi", "Durra border crossing", "Jordan overland transfer", "Saudi to Jordan car"],
});

export default function SaudiToJordan() {
  return <BorderPage data={saudiToJordan} />;
}
