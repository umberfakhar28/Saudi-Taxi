import { generatePageMetadata } from "@/lib/seo";
import AirportPage from "@/components/AirportPage";
import { AIRPORTS } from "@/lib/airportRoutesData";

// Renders through the shared AirportPage template (Airport Page Spec,
// addendum to Execution Brief v3 §W2) — see docs/page-gap-analysis.md W7 P1.
export const metadata = generatePageMetadata({
    title: "Tabuk Airport (TUU) Taxi & Private Transfer | 24/7",
    description: "Private taxi from Tabuk Regional Airport (TUU) — meet & greet, flight tracking, NEOM contractor transfers, and Wadi Disah day-trip pickups. Book on WhatsApp.",
    path: "/tabuk-airport-taxi-service",
    keywords: ["Tabuk airport taxi", "Tabuk airport transfer", "Tabuk regional airport", "Tabuk to NEOM taxi"],
});

const tabuk = AIRPORTS.find((a) => a.code === "TUU")!;

export default function TabukAirportTaxi() {
    return <AirportPage data={tabuk} />;
}
