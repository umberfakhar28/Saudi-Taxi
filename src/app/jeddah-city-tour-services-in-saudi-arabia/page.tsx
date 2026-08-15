import { generatePageMetadata } from "@/lib/seo";
import TourPage from "@/components/TourPage";
import { jeddahCityTour } from "@/lib/tourPageData";

export const metadata = generatePageMetadata({
  title: "Jeddah City Tour by Private Taxi | Half & Full Day",
  description: "Explore Jeddah on a private guided taxi tour: Al-Balad Old Town, Corniche, Floating Mosque and more. Professional drivers, flexible hours. Book on WhatsApp.",
  path: "/jeddah-city-tour-services-in-saudi-arabia",
  keywords: ["Jeddah city tour", "Jeddah guided tour", "Jeddah sightseeing taxi", "Jeddah tour guide"],
});

export default function JeddahCityTour() {
  return <TourPage data={jeddahCityTour} />;
}
