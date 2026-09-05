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
    // Designated owner of Madinah airport queries. Title leads with
    // "Transfer" — the phrasing that consistently outranks taxi-phrased
    // variants in Search Console for this site's airport pages.
    title: "Madinah Airport Transfer & Taxi (MED) | 24/7",
    description: "Private Madinah airport transfer from Prince Mohammad Bin Abdulaziz International (MED) — 15 km to the Prophet's Mosque hotel district, meet & greet, flight tracking, plus Makkah and Yanbu routes.",
    path: "/madina-airport-taxi-service",
    keywords: ["Madinah airport transfer", "Madinah airport taxi", "airport transfer Madinah", "Prince Mohammad Airport taxi", "MED airport taxi"],
});

const madinah = AIRPORTS.find((a) => a.code === "MED")!;

export default function MadinaAirportTaxi() {
    return <AirportPage data={madinah} />;
}
