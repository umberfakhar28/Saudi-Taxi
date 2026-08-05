import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import RelatedLinks from "@/components/RelatedLinks";
import { jeddah } from "@/lib/cityData1";

export const metadata = generatePageMetadata({
  title: "Jeddah Taxi, Airport Transfer & Car Service | 24/7 | Gulf Trip",
  description: "Book a private taxi, airport transfer or chauffeur in Jeddah. Professional drivers, meet-and-greet, 24/7 availability. Reserve on WhatsApp in minutes.",
  path: "/services/jeddah",
  keywords: ["Jeddah taxi", "Jeddah airport taxi", "KAIA transfer", "Jeddah to Makkah", "Jeddah city tour taxi"],
});

export default function JeddahPage() {
  return (
    <>
      <CityServicePage data={jeddah} />
      <RelatedLinks
        title="More Jeddah Taxi Services"
        links={[
          { href: "/jeddah-airport-taxi-service", label: "Jeddah Airport (KAIA) Taxi" },
          { href: "/jeddah-airport-taxi-service", label: "Jeddah Airport (KAIA) Taxi" },
          { href: "/jeddah-to-makkah-taxi-service", label: "Jeddah to Makkah Taxi" },
          { href: "/jeddah-to-makkah-guide", label: "Jeddah to Makkah Travel Guide" },
          { href: "/jeddah-city-tour-services-in-saudi-arabia", label: "Jeddah City Tours" },
        ]}
      />
    </>
  );
}
