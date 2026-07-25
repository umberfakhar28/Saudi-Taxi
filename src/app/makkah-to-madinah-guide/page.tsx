import { generatePageMetadata } from "@/lib/seo";
import { readContentFile } from "@/lib/readContent";

export const metadata = generatePageMetadata({
  title: "Makkah → Madinah Private Transfer & Chauffeur | Gulf Trip",
  description: "Reliable Makkah to Madinah taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/makkah-to-madinah-guide",
  keywords: ["makkah to madinah taxi", "taxi between holy cities", "madinah makkah transfer", "umrah transport holy cities"],
});

export default function MakkahToMadinahGuide() {
  const html = readContentFile("makkah-to-madinah-taxi.html");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
