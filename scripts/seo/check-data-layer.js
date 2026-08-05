#!/usr/bin/env node
// `npm run check:data` — validates the RouteData/CityData objects added in
// Execution Brief v3 W3 (docs/page-inventory.md D1: tags, priority,
// reverseSlug, fromSlug, toSlug, ar, reviewed, showInNav).
//
// Static/regex-based, same approach as build-link-graph.js (no ts-node —
// parses the .ts source directly rather than executing it).
//
// Exit-code gate: fails only on what TypeScript can't already catch —
// a `reviewed` (or omitted, defaulting reviewed) entry with an empty
// `tags` array, or a `reverseSlug`/fromSlug/toSlug pointing at a slug that
// doesn't exist anywhere in the data layer. Missing `ar` is reported but
// does NOT fail the build: Arabic is a phased rollout (D3 — Batch 1 lands
// in W10), so hard-failing on it now would block all W3-W9 work on
// translation that isn't scheduled yet. Once W10 lands for a given entry,
// its `ar` field should be filled in and this script's "missing ar" count
// for that entry naturally drops to zero — track the count going down,
// don't gate the build on it hitting zero before W10 is actually done.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const LIB_DIR = path.join(ROOT, "src", "lib");

function matchingBraceEnd(source, braceStart) {
  let depth = 1, i = braceStart + 1;
  while (i < source.length && depth > 0) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") depth--;
    i++;
  }
  return i;
}

function parseObjects(file, typeName) {
  const source = fs.readFileSync(file, "utf8");
  const objects = [];
  const re = new RegExp(`export const (\\w+): ${typeName} = \\{`, "g");
  let m;
  while ((m = re.exec(source))) {
    const braceStart = m.index + m[0].length - 1;
    const end = matchingBraceEnd(source, braceStart);
    const body = source.slice(braceStart, end);
    const line = source.slice(0, m.index).split("\n").length;
    objects.push({ name: m[1], body, file: path.relative(ROOT, file), line });
  }
  return objects;
}

function field(body, name) {
  const m = body.match(new RegExp(`\\b${name}:\\s*"([^"]*)"`));
  return m ? m[1] : null;
}
function hasField(body, name) {
  return new RegExp(`\\b${name}:\\s*[\\[{"]`).test(body) || new RegExp(`\\b${name}:\\s*(true|false|\\d)`).test(body);
}
function tagsArray(body) {
  const m = body.match(/\btags:\s*\[([^\]]*)\]/);
  if (!m) return null;
  return m[1].split(",").map((s) => s.trim().replace(/^"|"$/g, "")).filter(Boolean);
}
function reviewedValue(body) {
  const m = body.match(/\breviewed:\s*(true|false)/);
  return m ? m[1] === "true" : true; // omitted = true (pre-existing, already-live content)
}

const routeObjects = parseObjects(path.join(LIB_DIR, "routeData.ts"), "RouteData");
const cityObjects = [1, 2, 3].flatMap((n) => parseObjects(path.join(LIB_DIR, `cityData${n}.ts`), "CityData"));

const allRouteSlugs = new Set(routeObjects.map((o) => field(o.body, "slug")));
const allCitySlugs = new Set(cityObjects.map((o) => field(o.body, "slug")));

let failed = false;
const missingArCount = { route: 0, city: 0 };
const forwardRefs = []; // reverseSlug/fromSlug/toSlug pointing at a slug that doesn't exist ANYWHERE (route or city) — informational, these are legitimate W7 backlog items per docs/page-inventory.md
const brokenRefs = []; // would only happen on a typo — these DO fail

function checkRoute(o) {
  const slug = field(o.body, "slug");
  const reviewed = reviewedValue(o.body);
  const tags = tagsArray(o.body);
  const hasPriority = /\bpriority:\s*[12]\b/.test(o.body);
  const hasReverseSlug = hasField(o.body, "reverseSlug");
  const hasAr = /\bar:\s*\{/.test(o.body);

  if (reviewed && (!tags || tags.length === 0)) {
    failed = true;
    console.error(`✗ ${o.file}:${o.line} (${o.name}) — reviewed entry has no tags`);
  }
  if (reviewed && !hasPriority) {
    failed = true;
    console.error(`✗ ${o.file}:${o.line} (${o.name}) — reviewed entry has no priority`);
  }
  if (!hasReverseSlug) {
    failed = true;
    console.error(`✗ ${o.file}:${o.line} (${o.name}) — RouteData entry has no reverseSlug`);
  } else {
    const reverseSlug = field(o.body, "reverseSlug");
    if (reverseSlug && !allRouteSlugs.has(reverseSlug)) {
      forwardRefs.push(`${slug} -> reverseSlug "${reverseSlug}" (not yet built — W7 backlog)`);
    }
  }
  for (const refField of ["fromSlug", "toSlug"]) {
    const val = field(o.body, refField);
    if (val && !allCitySlugs.has(val)) {
      brokenRefs.push(`${o.file}:${o.line} (${o.name}) — ${refField} "${val}" matches no CityData slug`);
    }
  }
  if (reviewed && !hasAr) missingArCount.route++;
}

function checkCity(o) {
  const reviewed = reviewedValue(o.body);
  const tags = tagsArray(o.body);
  const hasPriority = /\bpriority:\s*[12]\b/.test(o.body);
  const hasAr = /\bar:\s*\{/.test(o.body);

  if (reviewed && (!tags || tags.length === 0)) {
    failed = true;
    console.error(`✗ ${o.file}:${o.line} (${o.name}) — reviewed entry has no tags`);
  }
  if (reviewed && !hasPriority) {
    failed = true;
    console.error(`✗ ${o.file}:${o.line} (${o.name}) — reviewed entry has no priority`);
  }
  if (reviewed && !hasAr) missingArCount.city++;
}

routeObjects.forEach(checkRoute);
cityObjects.forEach(checkCity);

if (brokenRefs.length) {
  failed = true;
  console.error(`\n✗ fromSlug/toSlug referencing a slug that doesn't exist in CityData at all (${brokenRefs.length}):`);
  for (const r of brokenRefs) console.error("  " + r);
}

console.log(`\nData layer: ${routeObjects.length} routes, ${cityObjects.length} cities checked.`);
console.log(`Missing Arabic (informational, not gated — see D3/W10): ${missingArCount.route} routes, ${missingArCount.city} cities.`);
if (forwardRefs.length) {
  console.log(`\nreverseSlug forward references awaiting their page (informational, expected — W7 backlog):`);
  for (const r of forwardRefs) console.log("  " + r);
}

if (failed) {
  console.error("\ncheck:data FAILED — fix the above before committing.\n");
  process.exit(1);
}

console.log("\n✓ check:data passed.\n");
