import { generatePageMetadata } from "@/lib/seo";
import AirportPage from "@/components/AirportPage";
import { AIRPORTS } from "@/lib/airportRoutesData";

// Renders through the shared AirportPage template (Airport Page Spec,
// addendum to Execution Brief v3 §W2) — see docs/page-inventory.md D1/D4.
export const metadata = generatePageMetadata({
    title: "Dammam Airport (KFIA) Taxi & Private Transfer | 24/7",
    description: "Private taxi from King Fahd International Airport (DMM) — meet & greet, flight tracking, transfers to Dammam, Khobar, Dhahran, Riyadh, and GCC border crossings. Book on WhatsApp.",
    path: "/dammam-airport-taxi-service",
    keywords: ["Dammam airport taxi", "KFIA airport transfer", "King Fahd airport taxi", "Eastern Province taxi"],
});

const dammam = AIRPORTS.find((a) => a.code === "DMM")!;

export default function DammamAirportTaxi() {
    return <AirportPage data={dammam} />;
}
