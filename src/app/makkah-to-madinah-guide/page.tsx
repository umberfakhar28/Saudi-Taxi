import { generatePageMetadata } from "@/lib/seo";
import { readContentFile } from "@/lib/readContent";

export const metadata = generatePageMetadata({
  title: "Makkah → Madinah Private Transfer & Chauffeur | Gulf Trip",
  description: "Makkah to Madinah by private taxi — about 450 km and 4 to 5 hours via the Haramain Expressway, with licensed drivers and 24/7 departures for Umrah itineraries.",
  path: "/makkah-to-madinah-guide",
  keywords: ["makkah to madinah taxi", "taxi between holy cities", "madinah makkah transfer", "umrah transport holy cities"],
});

export default function MakkahToMadinahGuide() {
  const html = readContentFile("makkah-to-madinah-taxi.html");
  return <div className="guide-content" data-page-template="content-guide" dangerouslySetInnerHTML={{ __html: html }} />;
}
