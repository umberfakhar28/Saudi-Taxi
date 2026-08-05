#!/usr/bin/env node
// `npm run seo:links` — fails (non-zero exit) if the internal link graph has
// any of: broken internal links (404s), links not in canonical form
// (wrong protocol/www/trailing-slash/index.html), href="#" in navigation, or
// an orphaned content page (see ORPHAN_WHITELIST below).
// Re-runs the crawler fresh each time so it can't go stale in CI.
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");

execFileSync(process.execPath, [path.join(__dirname, "build-link-graph.js")], { stdio: "inherit" });

const graph = JSON.parse(fs.readFileSync(path.join(ROOT, "seo-audit", "link-graph.json"), "utf8"));
const { brokenLinks, redirectLinks, nonCrawlable } = graph.findings;

// href="#" specifically in nav/footer components — the audit's "href=\"#\" in
// navigation" clause. hashOrJsVoid entries already carry this same shape.
const hashInNav = graph.findings.hashOrJsVoid.filter((h) =>
  /Navbar|Footer|StickyMobileBar/i.test(h.file)
);

// Pages that are *supposed* to be unreachable from anywhere crawlable, so an
// "orphan" finding on them is not a bug:
//   - cart / checkout / my-account / pay-online / thank-you: transactional,
//     session-specific, explicitly noindexed (or, for thank-you, noindexed
//     as of docs/page-inventory.md's W1 hygiene pass) — nothing should ever
//     link into them from content.
//   - about / contact / services / jeddah-airport-taxi-guide: 301-redirect
//     sources (see next.config.ts) kept only per the "nothing gets deleted"
//     rule. A redirect source must never receive fresh inbound links (link
//     to the destination instead), so these are permanent, by-design
//     orphans from here on — add each new guide-consolidation redirect
//     (D2) to this list as it lands.
const ORPHAN_WHITELIST = new Set([
  "/cart", "/checkout", "/my-account", "/pay-online", "/thank-you",
  "/about", "/contact", "/services", "/jeddah-airport-taxi-guide",
  "/madinah-umrah-taxi-guide", "/makkah-umrah-taxi-guide",
]);
const unexpectedOrphans = graph.orphans.filter((p) => !ORPHAN_WHITELIST.has(p.route));

let failed = false;

function report(title, items, formatter) {
  if (!items.length) return;
  failed = true;
  console.error(`\n✗ ${title} (${items.length}):`);
  for (const item of items) console.error("  " + formatter(item));
}

report("Internal links to non-existent routes", brokenLinks, (b) => `${b.file}:${b.line} -> ${b.href}`);
report("Internal links not in canonical form", redirectLinks, (b) => `${b.file}:${b.line} -> ${b.href} [${b.flags.join(", ")}]`);
report('href="#" in navigation', hashInNav, (h) => `${h.file}:${h.line}`);
report("Orphaned content pages (zero inbound internal links)", unexpectedOrphans, (p) => `${p.route} (${p.file})`);

if (failed) {
  console.error("\nseo:links FAILED — fix the above before committing.\n");
  process.exit(1);
}

console.log("\n✓ seo:links passed — no broken links, no non-canonical hrefs, no href=\"#\" in nav, no unexpected orphans.\n");
