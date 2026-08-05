import { generatePageMetadata } from "@/lib/seo";
import AirportPage from "@/components/AirportPage";
import { AIRPORTS } from "@/lib/airportRoutesData";

// Slug spelling note: this route is "madina" (no H) while every other
// reference to the city on this site spells it "Madinah" — kept as-is per
// the no-slug-changes rule (docs/page-inventory.md). Don't propagate this
// spelling elsewhere; new pages/fields should always use "Madinah".
//
// Renders through the shared AirportPage template (Airport Page Spec,
// addendum to Execution Brief v3 §W2) — see docs/page-inventory.md D1/D4.
export const metadata = generatePageMetadata({
    title: "Madinah Airport (MED) Taxi & Private Transfer | 24/7",
    description: "Private taxi from Prince Mohammad Bin Abdulaziz International Airport (MED) — meet & greet, flight tracking, direct transfers to Al-Masjid an-Nabawi hotels, Makkah, and Yanbu. Book on WhatsApp.",
    path: "/madina-airport-taxi-service",
    keywords: ["Madinah airport taxi", "Madinah airport transfer", "Prince Mohammad Airport taxi", "MED airport taxi"],
});

const madinah = AIRPORTS.find((a) => a.code === "MED")!;

export default function MadinaAirportTaxi() {
    return <AirportPage data={madinah} />;
}
