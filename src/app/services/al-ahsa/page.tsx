import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { alAhsa } from "@/lib/cityData3";

// W7 P2 (docs/page-gap-analysis.md) — Al-Ahsa was previously only referenced
// as a rest-stop/waypoint on GCC route pages, never as a destination.
export const metadata = generatePageMetadata({
  title: "Private Car Transfer & Taxi in Al-Ahsa (Hofuf) — Book 24/7",
  description: "Book a private taxi or car transfer in Al-Ahsa and Hofuf. Oasis and old-town visits, business travel, GCC corridor stopovers. Reserve on WhatsApp.",
  path: "/services/al-ahsa",
  keywords: ["Al-Ahsa taxi", "Hofuf taxi", "Al-Ahsa Oasis transfer", "Al-Ahsa car service"],
});

export default function AlAhsaPage() {
  return <CityServicePage data={alAhsa} />;
}
