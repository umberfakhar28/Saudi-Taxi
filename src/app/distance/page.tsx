import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { MapPinIcon, ClockIcon, ChevronRightIcon, WhatsAppIcon, GlobeIcon } from "@/components/Icons";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { waLink } from "@/lib/contact";
import { allDistanceRoutes, type DistanceRouteData } from "@/lib/distanceRouteData";

/**
 * Distance-guide hub — reads `allDistanceRoutes` directly (same pattern as
 * /routes reading allRoutes) so a new /distance/[route] page becomes visible
 * here the moment it's added to distanceRouteData.ts, with no second list to
 * keep in sync. Exists specifically so DistancePage.tsx's own breadcrumb
 * link ("Distance Guides") resolves to a real page instead of a dead link.
 *
 * Routes are grouped into Saudi Arabia / Cross-Border by reading
 * `routeType` (already states "Domestic" or "Cross-border" in plain
 * language for the page itself) rather than a second category field to
 * keep in sync — same principle as /routes' own classify() helper.
 */
export const metadata = generatePageMetadata({
  title: "Distance & Travel Time Guides | Saudi Arabia & Gulf Routes",
  description: "Road distance, driving time, and private transfer options for major Saudi Arabia and Gulf cross-border routes — plan your journey before you book.",
  path: "/distance",
});

const schemas = [breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Distance Guides", path: "/distance" }])];

function isCrossBorder(route: DistanceRouteData): boolean {
  return route.routeType.toLowerCase().includes("cross-border");
}

function RouteCard({ route }: { route: DistanceRouteData }) {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column" }}>
      <div className="card-icon">{isCrossBorder(route) ? <GlobeIcon size={22} /> : <MapPinIcon size={22} />}</div>
      <h3>
        <Link href={`/distance/${route.slug}`} style={{ color: "var(--text-main)" }}>{route.origin} → {route.destination}</Link>
      </h3>
      <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
        <ClockIcon size={14} /> {route.driveTime} · {route.roadDistance}
      </p>
      <Link href={`/distance/${route.slug}`} style={{ color: "var(--accent)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "var(--space-2)", marginTop: "auto" }}>
        View guide <ChevronRightIcon size={14} />
      </Link>
    </div>
  );
}

export default function DistanceHubPage() {
  const saudiRoutes = allDistanceRoutes.filter((r) => !isCrossBorder(r)).sort((a, b) => a.origin.localeCompare(b.origin));
  const crossBorderRoutes = allDistanceRoutes.filter(isCrossBorder).sort((a, b) => a.origin.localeCompare(b.origin));

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

        {saudiRoutes.length > 0 && (
          <section className="section-lg">
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">{saudiRoutes.length} Routes</span>
                <h2 className="section-title">Saudi Arabia Routes</h2>
              </div>
              <div className="grid-3">
                {saudiRoutes.map((route) => <RouteCard key={route.slug} route={route} />)}
              </div>
            </div>
          </section>
        )}

        {crossBorderRoutes.length > 0 && (
          <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">{crossBorderRoutes.length} Routes</span>
                <h2 className="section-title">Cross-Border Routes</h2>
              </div>
              <div className="grid-3">
                {crossBorderRoutes.map((route) => <RouteCard key={route.slug} route={route} />)}
              </div>
            </div>
          </section>
        )}

        <section style={{ background: "linear-gradient(135deg, var(--bg-dark), var(--accent-dark))", padding: "5rem 0", textAlign: "center" }}>
          <div className="container">
            <h2 style={{ color: "var(--white)", marginBottom: "1rem" }}>Don&apos;t See Your Route?</h2>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-8)" }}>
              We cover journeys beyond this list — message us on WhatsApp with your origin and destination for a distance and travel-time estimate.
            </p>
            <a href={waLink("Hi, I'd like to check the distance and travel time for a route.")} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
              <WhatsAppIcon size={18} /> Ask About Your Route
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
