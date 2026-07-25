import { generatePageMetadata } from "@/lib/seo";
import { readContentFile } from "@/lib/readContent";

export const metadata = generatePageMetadata({
  title: "Book Riyadh to Dammam Taxi — Border Crossing Made Easy",
  description: "Reliable Riyadh to Dammam taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/riyadh-to-dammam-guide",
  keywords: ["riyadh to dammam taxi", "business taxi saudi", "corporate transport eastern province", "riyadh dammam transfer"],
});

export default function RiyadhToDammamGuide() {
  const html = readContentFile("riyadh-to-dammam-taxi.html");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
