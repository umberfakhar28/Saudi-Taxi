import { generatePageMetadata } from "@/lib/seo";
import AirportPage from "@/components/AirportPage";
import { AIRPORTS } from "@/lib/airportRoutesData";

// Renders through the shared AirportPage template (Airport Page Spec,
// addendum to Execution Brief v3 §W2) — see docs/page-inventory.md D1/D4.
export const metadata = generatePageMetadata({
    title: "Abha Airport (AHB) Taxi & Private Transfer | 24/7",
    description: "Private taxi from Abha International Airport (AHB) — meet & greet, flight tracking, transfers to Abha city, Khamis Mushait, and Al Souda. Book on WhatsApp.",
    path: "/abha-airport-taxi-service",
    keywords: ["Abha airport taxi", "Abha airport transfer", "Asir region taxi", "Abha international airport"],
});

const abha = AIRPORTS.find((a) => a.code === "AHB")!;

export default function AbhaAirportTaxi() {
    return <AirportPage data={abha} />;
}
