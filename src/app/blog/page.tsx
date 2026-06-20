import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Travel Blog | Saudi Arabia Transportation Tips & Guides | Gulf Trip Service",
  description: "Expert travel tips, airport guides, Umrah transportation advice, and destination content for Saudi Arabia travelers — by Gulf Trip Service.",
  path: "/blog",
  keywords: ["Saudi Arabia travel blog", "Umrah travel tips", "Saudi transportation guide", "Riyadh Jeddah travel"],
});

export const posts = [
  { slug: "airport-transfer-tips",        category: "Travel Tips",       title: "10 Airport Transfer Tips Every Saudi Arabia Traveler Should Know",       excerpt: "Avoid common pitfalls and arrive stress-free with these expert airport transfer tips for Saudi Arabia's busiest airports." },
  { slug: "private-vs-rental-car",        category: "Travel Tips",       title: "Private Taxi vs Rental Car in Saudi Arabia: Which Is Better?",           excerpt: "We break down the real costs, convenience, and risks of each option so you can decide what's right for your trip." },
  { slug: "umrah-travel-planning",        category: "Religious Travel",  title: "The Complete Umrah Travel Planning Checklist",                           excerpt: "A step-by-step checklist covering visas, accommodation, transport, and packing for your Umrah trip to Saudi Arabia." },
  { slug: "top-attractions-riyadh",       category: "Destinations",      title: "Top 10 Attractions in Riyadh You Must Visit",                            excerpt: "From Diriyah's UNESCO mud-brick palaces to the futuristic Boulevard — Riyadh's best sights for every type of traveler." },
  { slug: "jeddah-hidden-gems",           category: "Destinations",      title: "Hidden Gems in Jeddah Most Tourists Miss",                               excerpt: "Al-Balad is just the beginning. Discover Jeddah's secret Corniche spots, local souqs, and Red Sea pearls." },
  { slug: "alula-complete-guide",         category: "Destinations",      title: "AlUla Complete Travel Guide: Hegra, Elephant Rock & Beyond",             excerpt: "Everything you need to plan the perfect AlUla trip — itinerary, transport, best times, and insider tips." },
  { slug: "benefits-private-airport-transfer", category: "Transportation", title: "5 Reasons Private Airport Transfers Beat Every Other Option",         excerpt: "Flight tracking, fixed pricing, zero waiting — here's exactly why pre-booked private transfers win every time." },
  { slug: "hajj-transport-guide",         category: "Religious Travel",  title: "Hajj 2025 Transportation Guide: Mina, Arafat & Beyond",                 excerpt: "How to plan your transport logistics for the five days of Hajj — including group options and official site access." },
  { slug: "family-saudi-destinations",   category: "Travel Tips",        title: "Best Family Destinations in Saudi Arabia in 2025",                       excerpt: "AlUla, Abha, Taif, and the Red Sea coast — the top spots for Saudi family vacations and how to get there." },
  { slug: "vip-transport-saudi",         category: "Luxury Travel",      title: "VIP & Executive Transportation in Saudi Arabia: What to Expect",         excerpt: "From Mercedes chauffeur service to dedicated executive accounts — the premium transport experience explained." },
  { slug: "riyadh-to-jeddah-travel",     category: "Transportation",     title: "Riyadh to Jeddah: All Your Travel Options Compared",                     excerpt: "Fly, drive, or take the train? We compare every Riyadh–Jeddah route by cost, time, and comfort." },
  { slug: "safe-travel-tips-saudi",      category: "Travel Tips",        title: "Safe Travel Tips for First-Time Visitors to Saudi Arabia",               excerpt: "Everything a first-time visitor needs to know about staying safe, navigating transport, and respecting local customs." },
];

const categories = [...new Set(posts.map((p) => p.category))];

export default function BlogIndex() {
  return (
    <main>
      <section className="page-hero">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="section-eyebrow">Travel Blog</span>
          <h1>Saudi Arabia Travel & Transportation Blog</h1>
          <p>Expert guides, destination content, and transport tips from Gulf Trip Service.</p>
        </div>
      </section>

      <section className="section-lg">
        <div className="container">
          {categories.map((cat) => (
            <div key={cat} style={{ marginBottom: "var(--space-16)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginBottom: "var(--space-8)" }}>
                <h2 style={{ color: "var(--text-main)", fontSize: "var(--text-2xl)" }}>{cat}</h2>
                <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
              </div>
              <div className="grid-3">
                {posts.filter((p) => p.category === cat).map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                    <div className="card" style={{ height: "100%" }}>
                      <span className="badge badge-gold" style={{ marginBottom: "var(--space-4)", display: "inline-flex" }}>{post.category}</span>
                      <h3 style={{ color: "var(--text-main)", fontSize: "var(--text-lg)", marginBottom: "var(--space-3)", lineHeight: 1.4 }}>{post.title}</h3>
                      <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.7, marginBottom: 0 }}>{post.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
