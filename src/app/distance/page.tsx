import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { MapPinIcon, ClockIcon, ChevronRightIcon, WhatsAppIcon } from "@/components/Icons";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { waLink } from "@/lib/contact";
import { allDistanceRoutes } from "@/lib/distanceRouteData";

/**
 * Distance-guide hub — reads `allDistanceRoutes` directly (same pattern as
 * /routes reading allRoutes) so a new /distance/[route] page becomes visible
 * here the moment it's added to distanceRouteData.ts, with no second list to
 * keep in sync. Exists specifically so DistancePage.tsx's own breadcrumb
 * link ("Distance Guides") resolves to a real page instead of a dead link.
 */
export const metadata = generatePageMetadata({
  title: "Distance & Travel Time Guides | Saudi Arabia Routes",
  description: "Road distance, driving time, and private transfer options for major Saudi Arabia city-to-city routes.",
  path: "/distance",
});

const schemas = [breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Distance Guides", path: "/distance" }])];

export default function DistanceHubPage() {
  const routes = [...allDistanceRoutes].sort((a, b) => a.origin.localeCompare(b.origin));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main>
        <section className="page-hero">
          <h1>Distance & Travel Time Guides</h1>
          <p>
            Road distance, estimated driving time, and private transfer options for major routes across Saudi Arabia —
            plan your journey before you book.
          </p>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <span>Distance Guides</span>
          </div>
        </section>

        <section className="section-lg">
          <div className="container">
            <div className="grid-3">
              {routes.map((route) => (
                <div key={route.slug} className="card" style={{ display: "flex", flexDirection: "column" }}>
                  <div className="card-icon"><MapPinIcon size={22} /></div>
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
              ))}
            </div>
          </div>
        </section>

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
