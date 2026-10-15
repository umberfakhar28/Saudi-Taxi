import { generatePageMetadata } from "@/lib/seo";
import AirportPage from "@/components/AirportPage";
import { AIRPORTS } from "@/lib/airportRoutesData";

// Renders through the shared AirportPage template (Airport Page Spec,
// addendum to Execution Brief v3 §W2) — see docs/page-inventory.md D1/D4.
export const metadata = generatePageMetadata({
    title: "Abha Airport Taxi & Transfer | AHB to Khamis Mushait",
    description: "Private transfers from Abha International Airport (AHB) to Abha city, Khamis Mushait and Al Souda. One arrivals hall, drivers who know the mountain roads.",
    path: "/abha-airport-taxi-service",
    keywords: ["Abha airport taxi", "Abha airport transfer", "Abha airport transportation", "Abha airport to Khamis Mushait", "Khamis Mushait airport transfer", "Asir region taxi"],
});

const abha = AIRPORTS.find((a) => a.code === "AHB")!;

export default function AbhaAirportTaxi() {
    return <AirportPage data={abha} />;
}
