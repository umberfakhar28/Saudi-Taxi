import { generatePageMetadata } from "@/lib/seo";
import AirportPage from "@/components/AirportPage";
import { AIRPORTS } from "@/lib/airportRoutesData";

// Renders through the shared AirportPage template (Airport Page Spec,
// addendum to Execution Brief v3 §W2) — see docs/page-inventory.md D1/D4 for
// why this isn't hand-authored per airport. Also absorbs the former
// /jeddah-airport-taxi-guide (now 301'd here — see next.config.ts).
export const metadata = generatePageMetadata({
    // Title leads with "Jeddah Airport Transfer": it's both the highest-
    // impression query for this page and its best-ranking variant in Search
    // Console, while the taxi-phrased variants sit ~20 positions lower.
    // "Taxi" is kept in the title so the existing term isn't dropped.
    title: "Jeddah Airport Transfer & Taxi (KAIA) | 24/7",
    description: "Private Jeddah airport transfer from King Abdulaziz International (JED) — meet & greet at all 3 terminals, flight tracking, and direct transfers to Makkah, Madinah or the city. Book on WhatsApp.",
    path: "/jeddah-airport-taxi-service",
    keywords: ["Jeddah airport transfer", "Jeddah airport taxi", "airport transfer Jeddah", "KAIA taxi", "King Abdulaziz airport transfer", "Jeddah airport to Makkah"],
});

const jeddah = AIRPORTS.find((a) => a.code === "JED")!;

export default function JeddahAirportTaxi() {
    return <AirportPage data={jeddah} />;
}
