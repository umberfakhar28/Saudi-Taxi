import { generatePageMetadata } from "@/lib/seo";
import AirportPage from "@/components/AirportPage";
import { AIRPORTS } from "@/lib/airportRoutesData";

// Renders through the shared AirportPage template (Airport Page Spec,
// addendum to Execution Brief v3 §W2) — see docs/page-inventory.md D1/D4 for
// why this isn't hand-authored per airport. Also absorbs the former
// /jeddah-airport-taxi-guide (now 301'd here — see next.config.ts).
export const metadata = generatePageMetadata({
    title: "Jeddah Airport (KAIA) Taxi & Private Transfer | 24/7",
    description: "Private taxi from King Abdulaziz International Airport (JED) — all 3 terminals, meet & greet, flight tracking, direct transfers to Makkah, Madinah and Jeddah city. Book on WhatsApp.",
    path: "/jeddah-airport-taxi-service",
    keywords: ["Jeddah airport taxi", "KAIA taxi", "King Abdulaziz airport transfer", "Jeddah airport to Makkah", "Jeddah airport to Madinah"],
});

const jeddah = AIRPORTS.find((a) => a.code === "JED")!;

export default function JeddahAirportTaxi() {
    return <AirportPage data={jeddah} />;
}
