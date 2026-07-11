import { generatePageMetadata } from "@/lib/seo";
import BlogPost from "@/components/BlogPost";
export const metadata = generatePageMetadata({ title: "Hajj 2025 Transportation Guide | Gulf Trip Service", description: "Plan your Hajj transport — Mina, Arafat, group options, and post-Hajj departure transfers.", path: "/blog/hajj-transport-guide", keywords: ["Hajj transport 2025", "Mina Arafat transport", "Hajj group taxi"] });
export default function Post() {
  return <BlogPost data={{ path: "/blog/hajj-transport-guide", title: "Hajj 2025 Transportation Guide", category: "Religious Travel", date: "June 2025", excerpt: "The five days of Hajj require precise transport planning. Here's what you need to know.", body: [
    { heading: "Scale of Hajj Transport", text: "Over 2 million pilgrims move between four sites within the same narrow window. The Mashaaer Metro, dedicated bus lanes, and pedestrian bridges form the backbone of the Hajj transport system. Understanding it before arrival reduces anxiety significantly." },
    { heading: "Getting to Makkah Before Hajj", text: "Most pilgrims arrive at KAIA during the first 10 days of Dhul Hijjah. We coordinate multi-vehicle airport convoys for Hajj groups with precise timing to avoid the peak congestion waves on the Makkah expressway." },
    { heading: "Movements Between Hajj Sites", text: "Official Saudi Hajj buses handle most inter-site movement for standard packages. Private vehicles can reach outer zones but not inner Mina and Arafat areas. We position vehicles at designated access boundaries for groups needing private transport." },
    { heading: "Post-Hajj: Madinah & Departure", text: "After 13 Dhul Hijjah, pilgrims begin departing for Madinah or directly to KAIA/MED airports. Book post-Hajj transfers at least 60 days in advance — this is the highest-demand period of the entire year." },
  ]}} />;
}
