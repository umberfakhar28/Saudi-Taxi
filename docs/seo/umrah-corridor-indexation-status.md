# Umrah Corridor — Indexation Status Worksheet

Prepared 2026-11-06 for manual inspection in Google Search Console.
**No page, canonical, redirect or index status has been changed.**

Context: these pages cover Jeddah↔Makkah and Makkah↔Madinah — the two core
religious-travel corridors — and recorded **zero impressions between them** in
the Oct 1 – Nov 3, 2026 GSC window.

---

## The headline finding

**Every one of these URLs is technically fine.** All return 200, all are
self-canonical, none carries a `noindex`, all are in the sitemap, and all are
well linked internally (4–11 inbound source files each).

So the zero-impression problem is **not** indexability, not canonicalisation,
not discoverability and not internal linking. If Search Console confirms these
URLs are indexed, the remaining explanation is competitiveness — the pages are
indexed and simply not ranking for the queries. That is a content and authority
problem, and no technical fix addresses it.

That is worth knowing before you inspect, because it narrows what you are
looking for to one question: **"Indexed" or "Crawled – currently not indexed"?**

---

## The six URLs

Paste each into the GSC URL Inspection tool.

### Jeddah ↔ Makkah

| # | URL |
|---:|---|
| 1 | `https://gulftripservice.com/jeddah-to-makkah-taxi-service` |
| 2 | `https://gulftripservice.com/jeddah-to-makkah-guide` |
| 3 | `https://gulftripservice.com/distance/jeddah-to-makkah` |

### Makkah ↔ Madinah

| # | URL |
|---:|---|
| 4 | `https://gulftripservice.com/makkah-to-madinah-taxi-service` |
| 5 | `https://gulftripservice.com/makkah-to-madinah-guide` |
| 6 | `https://gulftripservice.com/distance/makkah-to-madinah` |

### Two adjacent pages worth inspecting at the same time

Both also recorded zero impressions and belong to the same corridors in the
reverse direction:

| # | URL |
|---:|---|
| 7 | `https://gulftripservice.com/makkah-to-jeddah-taxi-service` |
| 8 | `https://gulftripservice.com/madinah-to-makkah-taxi-service` |

---

## Current status, verified on the live site 2026-11-06

| # | URL | HTTP | Canonical | `robots` meta | In sitemap | Inbound source files |
|---:|---|---:|---|---|---:|---:|
| 1 | /jeddah-to-makkah-taxi-service | 200 | self | none | yes | 11 |
| 2 | /jeddah-to-makkah-guide | 200 | self | none | yes | 7 |
| 3 | /distance/jeddah-to-makkah | 200 | self | none | yes | 5 |
| 4 | /makkah-to-madinah-taxi-service | 200 | self | none | yes | 7 |
| 5 | /makkah-to-madinah-guide | 200 | self | none | yes | 6 |
| 6 | /distance/makkah-to-madinah | 200 | self | none | yes | 4 |
| 7 | /makkah-to-jeddah-taxi-service | 200 | self | none | yes | — |
| 8 | /madinah-to-makkah-taxi-service | 200 | self | none | yes | — |

"Canonical: self" means the page declares itself as the canonical URL — none
points at another page. "none" under `robots` means no `noindex` directive is
present, i.e. the page is indexable.

---

## Current titles as served

Three of these changed on 2026-11-06 (marked ★) — two of them because they were
making a false cross-border claim on a domestic route.

| # | Title |
|---:|---|
| 1 | Jeddah → Makkah Private Transfer & Chauffeur \| Gulf Trip Service |
| 2 | ★ Jeddah to Makkah Taxi & Umrah Transfer Guide \| Gulf Trip Service |
| 3 | ★ Jeddah to Makkah Distance: 80 km by Road \| Gulf Trip Service |
| 4 | Book Makkah to Madinah Taxi — Intercity Transfer \| Gulf Trip Service |
| 5 | Makkah → Madinah Private Transfer & Chauffeur \| Gulf Trip Service |
| 6 | ★ Makkah to Madinah Distance: 450 km by Road \| Gulf Trip Service |

---

## GSC data for the window

| URL | Clicks | Impressions | Position |
|---|---:|---:|---:|
| All six | **0** | **0** | n/a |

None of the six appears in the Pages sheet at all, which in a GSC export means
zero impressions in the window — not merely zero clicks.

---

## What to record for each URL

For each of the eight, note from URL Inspection:

1. **Coverage verdict** — "URL is on Google", "URL is not on Google", or
   "URL is on Google, but has issues"
2. **Indexing → Page indexing** — specifically whether it says *Indexed*,
   *Crawled – currently not indexed*, *Discovered – currently not indexed*, or
   *Duplicate, Google chose a different canonical*
3. **Google-selected canonical** vs **User-declared canonical** — if these
   disagree, Google has chosen a different page, which is the one scenario
   where cannibalisation is confirmed rather than suspected
4. **Last crawl date**
5. **Sitemaps** — whether it lists our sitemap as a referring sitemap

### How to read the result

| What GSC says | What it means | What it implies |
|---|---|---|
| **Indexed**, canonical matches | Page is in the index and competing | Content/authority problem. Needs better content, not consolidation |
| **Crawled – currently not indexed** | Google has seen it and chosen not to index | Usually thin or near-duplicate content. Consolidation becomes worth discussing |
| **Duplicate, Google chose a different canonical** | **Cannibalisation confirmed** — and GSC names the winner | Consolidate toward whichever page Google already prefers |
| **Discovered – currently not indexed** | Known but not yet crawled | Crawl-budget/priority issue; usually resolves |

Verdicts 2 and 3 are the ones that would justify merging or redirecting. Verdict
1 would mean consolidation is the wrong tool entirely.

---

## Background: three pages per corridor

Each corridor has a commercial page, a guide and a distance page:

| Corridor | Commercial | Guide | Distance |
|---|---|---|---|
| Jeddah→Makkah | /jeddah-to-makkah-taxi-service | /jeddah-to-makkah-guide | /distance/jeddah-to-makkah |
| Makkah→Madinah | /makkah-to-madinah-taxi-service | /makkah-to-madinah-guide | /distance/makkah-to-madinah |

**They are not duplicate content.** The `-taxi-service` pages render from
`src/lib/routeData.ts` through the shared `RoutePage` template; the `-guide`
pages read their own content files via `readContentFile`; the `/distance/` pages
render from `src/lib/distanceRouteData.ts` through `DistancePage`. Three
genuinely different bodies of text.

Whether three pages per corridor is *too many for one search intent* is a
separate question, and the GSC verdict above is what answers it.

For comparison, the same three-way split works elsewhere on the site —
Qatar→Riyadh has a commercial page at 962 impressions / 87 clicks and a distance
page at 466 impressions / 0 clicks, and both rank. The structure is not
inherently broken.

---

## Nothing was changed

No merging, redirect, deletion or canonical change has been made, per your
instruction. Three of the six had their title or description corrected earlier
on 2026-11-06 — that work is recorded in `seo-implementation-report.md` §3 and
was a factual-accuracy fix, not a consolidation step.
