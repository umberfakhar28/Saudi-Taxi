import { generatePageMetadata } from "@/lib/seo";
import { readContentFile } from "@/lib/readContent";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata = generatePageMetadata({
  title: "Jeddah Airport (KAIA) Taxi Guide | 24/7 Transfers",
  description: "Jeddah Airport taxi guide for King Abdulaziz International (JED): transfers to Makkah, Madinah and the city. Meet-and-greet, flight tracking, 24/7.",
  path: "/jeddah-airport-taxi-guide",
  keywords: ["jeddah airport taxi", "jeddah airport transfer", "king abdulaziz airport taxi", "JED to makkah taxi"],
});

export default function JeddahAirportGuide() {
  const html = readContentFile("jeddah-airport-taxi-service.html");
  return (
    <>
      <div className="guide-content" dangerouslySetInnerHTML={{ __html: html }} />
      <RelatedLinks
        title="More Jeddah Taxi Services"
        links={[
          { href: "/jeddah-airport-taxi-service", label: "Jeddah Airport (KAIA) Taxi" },
          { href: "/jeddah-to-makkah-taxi-service", label: "Jeddah to Makkah Taxi" },
          { href: "/jeddah-to-makkah-guide", label: "Jeddah to Makkah Travel Guide" },
          { href: "/services/jeddah", label: "Jeddah Taxi Services Overview" },
          { href: "/jeddah-city-tour-services-in-saudi-arabia", label: "Jeddah City Tours" },
        ]}
      />
    </>
  );
}
