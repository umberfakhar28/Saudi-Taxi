import { generatePageMetadata } from "@/lib/seo";
import AirportPage from "@/components/AirportPage";
import { AIRPORTS } from "@/lib/airportRoutesData";

// Renders through the shared AirportPage template (Airport Page Spec,
// addendum to Execution Brief v3 §W2) — see docs/page-gap-analysis.md W7 P1.
export const metadata = generatePageMetadata({
    title: "AlUla Airport (ULH) Taxi & Private Transfer | 24/7",
    description: "Private taxi from AlUla Regional Airport (ULH) — meet & greet, flight tracking, Hegra and Old Town transfers, resort pickups. Book on WhatsApp.",
    path: "/alula-airport-taxi-service",
    keywords: ["AlUla airport taxi", "AlUla airport transfer", "AlUla regional airport", "Hegra taxi"],
});

const alula = AIRPORTS.find((a) => a.code === "ULH")!;

export default function AlUlaAirportTaxi() {
    return <AirportPage data={alula} />;
}
