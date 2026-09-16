import { generatePageMetadata } from "@/lib/seo";
import BorderPage from "@/components/BorderPage";
import { saudiToJordan } from "@/lib/borderData";

export const metadata = generatePageMetadata({
  title: "Saudi Arabia to Jordan by Road | Private Transfer",
  description: "Door-to-door private transfers between Saudi Arabia and Jordan — Tabuk, Madinah, Jeddah or Riyadh to Amman, Aqaba and Petra, with the border crossing planned in advance.",
  path: "/saudi-arabia-to-jordan-land-transfer",
  keywords: ["Saudi to Jordan taxi", "Halat Ammar border crossing", "Jordan overland transfer", "Saudi to Jordan car"],
});

export default function SaudiToJordan() {
  return <BorderPage data={saudiToJordan} />;
}
