import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { MapPinIcon, ClockIcon, ChevronRightIcon, WhatsAppIcon } from "@/components/Icons";
import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { waLink } from "@/lib/contact";
import { allRoutes } from "@/lib/routeData";
import type { RouteData } from "@/components/RoutePage";

/**
 * Route corridor hub (Execution Brief v3 W8). Reads `allRoutes` directly
 * rather than a hand-maintained list, so a new W7 route page becomes visible
 * here the moment it's added to routeData.ts's allRoutes export — no second
 * list to keep in sync (ground rule 6). Airport-to-city transfers already
 * have a dedicated hub at /airport-transfers, so this page focuses on the
 * intercity and cross-border corridors instead of duplicating that content.
 */
export const metadata = generatePageMetadata({
  title: "Intercity & Cross-Border Taxi Routes | All Corridors",
  description: "Every intercity and GCC cross-border taxi route Gulf Trip Service runs — Umrah corridors, Eastern Province business routes, and Bahrain/Qatar/UAE/Kuwait crossings.",
  path: "/routes",
  keywords: ["Saudi Arabia intercity taxi routes", "GCC border crossing taxi routes", "Umrah transfer routes"],
});

const schemas = [
  serviceSchema({
    name: "Intercity & Cross-Border Taxi Routes",
    description: "Directory of every intercity and GCC cross-border route covered by Gulf Trip Service's private taxi network.",
    url: "/routes",
    areaServed: ["Saudi Arabia", "Bahrain", "Qatar", "Kuwait", "UAE"],
  }),
  breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Routes", path: "/routes" }]),
];

type Cluster = "GCC & Cross-Border Routes" | "Umrah & Pilgrimage Routes" | "Business & Executive Routes";

function classify(r: RouteData): Cluster {
  if (r.isCrossBorder || r.tags.includes("gcc")) return "GCC & Cross-Border Routes";
  if (r.tags.includes("umrah")) return "Umrah & Pilgrimage Routes";
  return "Business & Executive Routes";
}

const CLUSTER_ORDER: Cluster[] = [
  "Umrah & Pilgrimage Routes",
  "Business & Executive Routes",
  "GCC & Cross-Border Routes",
];

export default function RoutesPage() {
  const byCluster = new Map<Cluster, RouteData[]>();
  for (const route of allRoutes) {
    const cluster = classify(route);
    const list = byCluster.get(cluster) ?? [];
    list.push(route);
    byCluster.set(cluster, list);
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main>
        <section className="page-hero">
          <h1>Intercity & Cross-Border Taxi Routes</h1>
          <p>
            Every corridor we run door-to-door — Umrah transfers between the Holy Cities, Eastern Province
            business routes, and GCC cross-border crossings to Bahrain, Qatar, Kuwait, and the UAE.
          </p>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <span>Routes</span>
          </div>
        </section>

        {CLUSTER_ORDER.filter((c) => byCluster.has(c)).map((cluster) => {
          const routes = byCluster.get(cluster)!.sort((a, b) => a.priority - b.priority);
          return (
            <section key={cluster} className="section-lg" style={{ background: cluster === "Business & Executive Routes" ? "var(--bg-subtle)" : undefined }}>
              <div className="container">
                <div className="section-header centered">
                  <span className="section-eyebrow">{routes.length} Routes</span>
                  <h2 className="section-title">{cluster}</h2>
                </div>
                <div className="grid-3">
                  {routes.map((route) => (
                    <div key={route.slug} className="card" style={{ display: "flex", flexDirection: "column" }}>
                      <div className="card-icon"><MapPinIcon size={22} /></div>
                      <h3>
                        <Link href={`/${route.slug}`} style={{ color: "var(--text-main)" }}>{route.origin} → {route.destination}</Link>
                      </h3>
                      <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                        <ClockIcon size={14} /> {route.travelTime} · {route.distance}
                      </p>
                      <Link href={`/${route.slug}`} style={{ color: "var(--accent)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "var(--space-2)", marginTop: "auto" }}>
                        View route <ChevronRightIcon size={14} />
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
            <h2 style={{ color: "var(--white)", marginBottom: "1rem" }}>Don't See Your Route?</h2>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-8)" }}>
              We cover corridors beyond this list — message us on WhatsApp with your origin and destination and we'll confirm it.
            </p>
            <a href={waLink("Hi, I'd like to check taxi coverage for a route.")} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
              <WhatsAppIcon size={18} /> Ask About Your Route
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
