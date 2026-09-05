import { generatePageMetadata } from "@/lib/seo";
import AirportPage from "@/components/AirportPage";
import { AIRPORTS } from "@/lib/airportRoutesData";

// Renders through the shared AirportPage template (Airport Page Spec,
// addendum to Execution Brief v3 §W2) — see docs/page-inventory.md D1/D4.
export const metadata = generatePageMetadata({
    // This page is the designated owner of Riyadh airport-taxi queries
    // (see the ownership note on /services/riyadh). Description now carries
    // the concrete distance/time facts that make the snippet more useful.
    title: "Riyadh Airport Taxi & Transfer (KKIA) | 24/7",
    description: "Private Riyadh airport taxi and transfer from King Khalid International (RUH) — 35 km to the city, meet & greet at every terminal, flight tracking, and transfers to KAFD, Olaya and Diriyah.",
    path: "/riyadh-airport-taxi-service",
    keywords: ["Riyadh airport taxi", "airport taxi Riyadh", "Riyadh airport taxi service", "KKIA taxi", "Riyadh airport transfer", "King Khalid airport taxi"],
});

const riyadh = AIRPORTS.find((a) => a.code === "RUH")!;

export default function RiyadhAirportTaxi() {
    return <AirportPage data={riyadh} />;
}
