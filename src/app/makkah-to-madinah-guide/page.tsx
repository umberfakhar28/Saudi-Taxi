import { generatePageMetadata } from "@/lib/seo";
import { readContentFile } from "@/lib/readContent";

export const metadata = generatePageMetadata({
  title: "Taxi from Makkah to Madinah",
  description: "Professional taxi from Makkah to Madinah. 450km journey in 4–5 hours. Ihram-friendly vehicles, optional Ziyarat stops. Fixed prices SAR 500–800. Book online.",
  path: "/makkah-to-madinah-guide",
  keywords: ["makkah to madinah taxi", "taxi between holy cities", "madinah makkah transfer", "umrah transport holy cities"],
});

export default function MakkahToMadinahGuide() {
  const html = readContentFile("makkah-to-madinah-taxi.html");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
