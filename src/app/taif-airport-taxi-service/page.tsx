import { generatePageMetadata } from "@/lib/seo";
import AirportPage from "@/components/AirportPage";
import { AIRPORTS } from "@/lib/airportRoutesData";

// Renders through the shared AirportPage template (Airport Page Spec,
// addendum to Execution Brief v3 §W2) — see docs/page-inventory.md D1/D4.
export const metadata = generatePageMetadata({
    title: "Taif Airport (TIF) Taxi & Private Transfer | 24/7",
    description: "Private taxi from Taif Regional Airport (TIF) — meet & greet, flight tracking, mountain-route transfers to Taif city, Makkah, and Al Shafa/Al Hada. Book on WhatsApp.",
    path: "/taif-airport-taxi-service",
    keywords: ["Taif airport taxi", "Taif airport transfer", "Taif regional airport", "Taif to Makkah taxi"],
});

const taif = AIRPORTS.find((a) => a.code === "TIF")!;

export default function TaifAirportTaxi() {
    return <AirportPage data={taif} />;
}
