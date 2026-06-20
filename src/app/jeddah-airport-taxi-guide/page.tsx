import { generatePageMetadata } from "@/lib/seo";
import { readContentFile } from "@/lib/readContent";

export const metadata = generatePageMetadata({
  title: "Jeddah Airport Taxi Service | King Abdulaziz International | Book Online",
  description: "Professional Jeddah Airport taxi from King Abdulaziz International (JED). 24/7 transfers to Makkah, Madinah & Jeddah city. Meet & greet, flight tracking, fixed prices.",
  path: "/jeddah-airport-taxi-guide",
  keywords: ["jeddah airport taxi", "jeddah airport transfer", "king abdulaziz airport taxi", "JED to makkah taxi"],
});

export default function JeddahAirportGuide() {
  const html = readContentFile("jeddah-airport-taxi-service.html");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
