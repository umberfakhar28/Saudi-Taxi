import Link from "@/components/IntentLink";
import { generatePageMetadata } from "@/lib/seo";
import { WhatsAppIcon } from "@/components/Icons";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { waLink } from "@/lib/contact";
import { allDistanceRoutes, DISTANCE_REGIONS } from "@/lib/distanceRouteData";
import DistanceRouteCard from "@/components/DistanceRouteCard";
import styles from "./distance.module.css";

/**
 * Distance-guide hub — reads `allDistanceRoutes` directly (same pattern as
 * /routes reading allRoutes) so a new /distance/[route] page becomes visible
 * here the moment it's added to distanceRouteData.ts, with no second list to
 * keep in sync. Exists specifically so DistancePage.tsx's own breadcrumb
 * link ("Distance Guides") resolves to a real page instead of a dead link.
 *
 * Routes are grouped by region (Bahrain, Qatar, Kuwait, UAE, within Saudi
 * Arabia), read from each record's `region` field.
 */
export const metadata = generatePageMetadata({
  title: "Distance & Travel Time Guides | Saudi Arabia & Gulf Routes",
  description: "Road distance, driving time, and private transfer options for major Saudi Arabia and Gulf cross-border routes — plan your journey before you book.",
  path: "/distance",
});

const schemas = [breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Distance Guides", path: "/distance" }])];

export default function DistanceHubPage() {
  const groups = DISTANCE_REGIONS.map((g) => ({ ...g, routes: allDistanceRoutes.filter((r) => r.region === g.id) })).filter((g) => g.routes.length > 0);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main>
        <section className="page-hero">
          <h1>Distance & Travel Time Guides</h1>
          <p>
            Road distance, estimated driving time, and private transfer options for major routes across Saudi Arabia
            and the Gulf — plan your journey before you book.
          </p>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <span>Distance Guides</span>
          </div>
        </section>

        {groups.map((g, gi) => (
          <section key={g.id} className="section-lg" style={gi % 2 === 1 ? { background: "var(--bg-subtle)" } : undefined}>
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">{g.routes.length} {g.routes.length === 1 ? "Route" : "Routes"}</span>
                <h2 className="section-title">{g.heading}</h2>
                <p className="section-subtitle">{g.intro}</p>
              </div>
              <div className={styles.grid}>
                {g.routes.map((route, i) => <DistanceRouteCard key={route.slug} route={route} priority={gi === 0 && i < 3} />)}
              </div>
            </div>
          </section>
        ))}

        <section style={{ background: "linear-gradient(135deg, var(--bg-dark), var(--accent-dark))", padding: "5rem 0", textAlign: "center" }}>
          <div className="container">
            <h2 style={{ color: "var(--white)", marginBottom: "1rem" }}>Don&apos;t See Your Route?</h2>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-8)" }}>
              We cover journeys beyond this list — message us on WhatsApp with your origin and destination for a distance and travel-time estimate.
            </p>
            <a data-wa-cta="coverage-prompt" href={waLink("Hi, I'd like to check the distance and travel time for a route.")} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
              <WhatsAppIcon size={18} /> Ask About Your Route
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
