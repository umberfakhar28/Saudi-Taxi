import { generatePageMetadata } from "@/lib/seo";
import { readContentFile } from "@/lib/readContent";

export const metadata = generatePageMetadata({
  title: "Taxi from Jeddah to Makkah | 100km | 60–90 Min | Book Now",
  description: "Professional taxi from Jeddah to Makkah. 100km journey in 60–90 minutes. Ihram-friendly vehicles, fixed prices SAR 150–400. 24/7 Umrah transfers. Book online instantly.",
  path: "/jeddah-to-makkah-guide",
  keywords: ["jeddah to makkah taxi", "jeddah makkah transfer", "umrah taxi jeddah", "taxi from jeddah airport to makkah"],
});

export default function JeddahToMakkahGuide() {
  const html = readContentFile("jeddah-to-makkah-taxi.html");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
