import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { MapPinIcon, ChevronRightIcon, StarIcon, WhatsAppIcon } from "@/components/Icons";
import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { waLink } from "@/lib/contact";
import { allCities } from "@/lib/cityData3";

/**
 * Location hub (Execution Brief v3 W8). Reads `allCities` directly rather
 * than a hand-maintained list, so a new W7 city hub becomes visible here the
 * moment it's added to cityData3.ts's allCities export — no second list to
 * keep in sync (ground rule 6).
 */
export const metadata = generatePageMetadata({
  title: "Taxi Services by Location in Saudi Arabia | All Cities",
  description: "Every city and destination Gulf Trip Service covers — Riyadh, Jeddah, Makkah, Madinah, the Eastern Province, Asir, and more. Find your city's taxi service.",
  path: "/locations",
  keywords: ["Saudi Arabia taxi by city", "taxi service locations Saudi Arabia", "Gulf Trip Service cities"],
});

const schemas = [
  serviceSchema({
    name: "Taxi Services by Location in Saudi Arabia",
    description: "Directory of every city and destination covered by Gulf Trip Service's private taxi and transfer network.",
    url: "/locations",
    areaServed: allCities.map((c) => c.city),
  }),
  breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }]),
];

// Province order chosen for commercial intent (Holy Cities and the capital
// first), not alphabetically — same principle as docs/page-gap-analysis.md.
const REGION_ORDER = [
  "Makkah Province",
  "Madinah Province",
  "Riyadh Province",
  "Eastern Province",
  "Asir Province",
  "Tabuk Province",
];

export default function LocationsPage() {
  const byRegion = new Map<string, typeof allCities>();
  for (const city of allCities) {
    const list = byRegion.get(city.region) ?? [];
    list.push(city);
    byRegion.set(city.region, list);
  }
  const regions = REGION_ORDER.filter((r) => byRegion.has(r));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main>
        <section className="page-hero">
          <h1>Taxi & Transfer Services, by Location</h1>
          <p>
            Every city and destination we cover across Saudi Arabia — from the Holy Cities and the capital
            to the Eastern Province, Asir highlands, and the Red Sea coast.
          </p>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <span>Locations</span>
          </div>
        </section>

        {regions.map((region) => {
          const cities = byRegion.get(region)!.sort((a, b) => a.priority - b.priority);
          return (
            <section key={region} className="section-lg">
              <div className="container">
                <div className="section-header centered">
                  <span className="section-eyebrow">{region}</span>
                  <h2 className="section-title">{region} Taxi Services</h2>
                </div>
                <div className="grid-3">
                  {cities.map((city) => (
                    <div key={city.slug} className="card" style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div className="card-icon"><MapPinIcon size={22} /></div>
                        {city.priority === 1 && <span className="badge badge-gold"><StarIcon size={12} /> Major City</span>}
                      </div>
                      <h3>
                        <Link href={`/services/${city.slug}`} style={{ color: "var(--text-main)" }}>{city.city}</Link>
                      </h3>
                      <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", flexGrow: 1 }}>{city.intro}</p>
                      <Link href={`/services/${city.slug}`} style={{ color: "var(--accent)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "var(--space-2)", marginTop: "var(--space-2)" }}>
                        View {city.city} taxi service <ChevronRightIcon size={14} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <section style={{ background: "linear-gradient(135deg, var(--bg-dark), var(--accent-dark))", padding: "5rem 0", textAlign: "center" }}>
          <div className="container">
            <h2 style={{ color: "var(--white)", marginBottom: "1rem" }}>Don't See Your City?</h2>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-8)" }}>
              We cover destinations across Saudi Arabia beyond this list — message us on WhatsApp and we'll confirm coverage for your route.
            </p>
            <a href={waLink("Hi, I'd like to check taxi coverage for my city.")} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
              <WhatsAppIcon size={18} /> Ask About Your City
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
