import { generatePageMetadata } from "@/lib/seo";
import AirportPage from "@/components/AirportPage";
import { AIRPORTS } from "@/lib/airportRoutesData";

// Renders through the shared AirportPage template (Airport Page Spec,
// addendum to Execution Brief v3 §W2) — see docs/page-gap-analysis.md W7 P1.
export const metadata = generatePageMetadata({
    title: "Yanbu Airport (YNB) Taxi & Private Transfer | 24/7",
    description: "Private taxi from Yanbu Airport (YNB) — meet & greet, flight tracking, Red Sea dive-site transfers, and routes to Madinah and Jeddah. Book on WhatsApp.",
    path: "/yanbu-airport-taxi-service",
    keywords: ["Yanbu airport taxi", "Yanbu airport transfer", "Yanbu to Madinah taxi"],
});

const yanbu = AIRPORTS.find((a) => a.code === "YNB")!;

export default function YanbuAirportTaxi() {
    return <AirportPage data={yanbu} />;
}
