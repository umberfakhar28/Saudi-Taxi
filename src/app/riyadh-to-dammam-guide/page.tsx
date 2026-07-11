import { generatePageMetadata } from "@/lib/seo";
import { readContentFile } from "@/lib/readContent";

export const metadata = generatePageMetadata({
  title: "Taxi from Riyadh to Dammam",
  description: "Professional business taxi from Riyadh to Dammam. 400km executive transfer in 4 hours. Corporate accounts, luxury vehicles, WiFi. Fixed prices SAR 400–700. Book now.",
  path: "/riyadh-to-dammam-guide",
  keywords: ["riyadh to dammam taxi", "business taxi saudi", "corporate transport eastern province", "riyadh dammam transfer"],
});

export default function RiyadhToDammamGuide() {
  const html = readContentFile("riyadh-to-dammam-taxi.html");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
