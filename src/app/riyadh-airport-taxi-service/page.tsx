import { generatePageMetadata } from "@/lib/seo";
import AirportPage from "@/components/AirportPage";
import { AIRPORTS } from "@/lib/airportRoutesData";

// Renders through the shared AirportPage template (Airport Page Spec,
// addendum to Execution Brief v3 §W2) — see docs/page-inventory.md D1/D4.
export const metadata = generatePageMetadata({
    title: "Riyadh Airport (KKIA) Taxi & Private Transfer | 24/7",
    description: "Private taxi from King Khalid International Airport (RUH) — meet & greet at every terminal, flight tracking, transfers to Riyadh City, the Diplomatic Quarter, Diriyah, and beyond. Book on WhatsApp.",
    path: "/riyadh-airport-taxi-service",
    keywords: ["Riyadh airport taxi", "KKIA taxi", "Riyadh airport transfer", "King Khalid airport taxi"],
});

const riyadh = AIRPORTS.find((a) => a.code === "RUH")!;

export default function RiyadhAirportTaxi() {
    return <AirportPage data={riyadh} />;
}
