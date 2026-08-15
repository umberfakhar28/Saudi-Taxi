import { generatePageMetadata } from "@/lib/seo";
import TourPage from "@/components/TourPage";
import { aluTour } from "@/lib/tourPageData";

export const metadata = generatePageMetadata({
  title: "AlUla Tour Taxi Service | Private Day Trip from Madinah",
  description: "Private AlUla tour taxi from Madinah: Hegra, Elephant Rock, Jabal Ikmah and the Nabataean tombs. Experienced drivers, flexible itinerary. Book on WhatsApp.",
  path: "/reliable-alula-tour-taxi-service-in-saudi-arabia",
  keywords: ["AlUla tour taxi", "Hegra tour transfer", "AlUla sightseeing", "AlUla private tour"],
});

export default function AlulaTourTaxi() {
  return <TourPage data={aluTour} />;
}
