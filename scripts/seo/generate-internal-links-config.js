#!/usr/bin/env node
// Generates config/internal-links.json from the link graph's page inventory:
// for every page, its cluster membership and 2-3 preferred anchor-text
// variants (exact, partial, semantic) to rotate through when linking to it,
// per the audit's "no repeated exact-match anchor" rule.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const graph = JSON.parse(fs.readFileSync(path.join(ROOT, "seo-audit", "link-graph.json"), "utf8"));

const CLUSTER_BY_TYPE = {
  "destination (city hub)": "city-destinations",
  "destination (city airport)": "airport-transfers",
  "service (cross-border route)": "cross-border-routes",
  "service (cross-border hub)": "cross-border-routes",
  "service (domestic route)": "domestic-routes",
  "service (route guide, duplicate content)": "domestic-routes",
  "service": "services",
  "service (tour)": "tours",
  "service (guide, duplicate content)": "umrah-ziyarat",
  "guide": "guides",
  "blog": "blog",
  "legal": "legal",
  "utility": "utility",
  "arabic": "arabic",
  "home": "home",
};

// Hand-picked anchor variants for the highest-traffic destinations —
// exact / partial / semantic, so links to the same page don't repeat the
// identical phrase (the audit flagged 10 destinations getting >8 identical
// exact-match anchors sitewide, all from templated CTA buttons, which are
// intentionally exempt — see internal-link-audit.md). This file covers
// in-body prose anchors specifically.
const ANCHOR_VARIANTS = {
  "/border-crossing": ["border crossing taxi service", "all border crossing routes", "GCC cross-border transfers"],
  "/airport-transfers": ["airport transfers", "airport taxi service", "meet-and-greet airport pickup"],
  "/our-services": ["our services", "full service directory", "everything we offer"],
  "/book-online": ["book online", "book your ride", "reserve a transfer"],
  "/quote": ["get a quote", "request a fare estimate", "instant quote"],
  "/fleet": ["our fleet", "vehicle options", "browse vehicles"],
  "/blog": ["travel blog", "travel tips and guides", "destination stories"],
};

function anchorsFor(route, label) {
  if (ANCHOR_VARIANTS[route]) return ANCHOR_VARIANTS[route];
  const base = label || route.replace(/^\//, "").replace(/-/g, " ");
  return [base, `${base} service`, `see ${base}`];
}

const entries = {};
for (const p of graph.pageInventory) {
  const slug = p.route;
  const cluster = CLUSTER_BY_TYPE[p.type] || "other";
  entries[slug] = {
    cluster,
    type: p.type,
    anchorVariants: anchorsFor(slug),
  };
}

const output = {
  generatedBy: "scripts/seo/generate-internal-links-config.js — re-run after adding/removing pages",
  clusters: [...new Set(Object.values(entries).map((e) => e.cluster))].sort(),
  pages: entries,
};

const outDir = path.join(ROOT, "config");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "internal-links.json"), JSON.stringify(output, null, 2));
console.log("Wrote config/internal-links.json —", Object.keys(entries).length, "pages,", output.clusters.length, "clusters");
