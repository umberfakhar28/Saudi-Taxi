import { generatePageMetadata } from "@/lib/seo";
import BlogPost from "@/components/BlogPost";
export const metadata = generatePageMetadata({ title: "Hidden Gems in Jeddah Most Tourists Miss | Gulf Trip Service", description: "Beyond Al-Balad — the secret Jeddah spots locals love and tourists rarely find.", path: "/blog/jeddah-hidden-gems", keywords: ["Jeddah hidden gems", "secret places Jeddah", "Jeddah local guide", "things to do Jeddah"] });
export default function Post() {
  return <BlogPost data={{ path: "/blog/jeddah-hidden-gems", title: "Hidden Gems in Jeddah Most Tourists Miss", category: "Destinations", date: "June 2025", excerpt: "Al-Balad is magnificent, but Jeddah's real character lives in its lesser-known corners.", body: [
    { heading: "Al-Shallal Theme Park at Night", text: "Jeddah's waterfront theme park transforms after sunset. The Ferris wheel over the Red Sea, laser shows, and cooler temperatures make evenings here magical — and visitor numbers are a fraction of the weekend afternoon crowds." },
    { heading: "Al-Balad's Interior Courtyards", text: "Most visitors photograph Al-Balad's famous coral-stone facades from the street. The real treasures are inside the historic merchant houses — the rawasheen (ornate wooden balconies), courtyard gardens, and traditional Hejazi coffee ceremonies offered by some heritage homeowners." },
    { heading: "Corniche Fishing Village at Dawn", text: "The northern end of the Jeddah Corniche has an active small-boat fishing community. Arrive before 6am to watch the night's catch being unloaded, sold, and cooked on the spot. One of Saudi Arabia's most authentic food experiences." },
    { heading: "Al-Rahma Mosque (Floating Mosque)", text: "The Al-Rahma Mosque appears to float on the Red Sea at high tide — one of Jeddah's most photographed but often passed-by landmarks. Visit at high tide for the full floating effect and stay for the sunset call to prayer." },
    { heading: "Jeddah's Outdoor Sculpture Trail", text: "Jeddah has one of the world's longest outdoor sculpture collections running along its Corniche — works by Miró, Calder, and Henry Moore alongside contemporary Saudi artists. Few visitors know this exists. A walking tour along the Corniche reveals an open-air museum of international art." },
  ]}} />;
}
