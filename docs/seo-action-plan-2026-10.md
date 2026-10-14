# SEO Action Plan — October 2026

Source data: Google Search Console export, **2026-09-14 → 2026-10-11** (28 days, web search only). Cross-checked against the live codebase at commit `234cb5a`.

**Status: §7 items 1–3 implemented 2026-10-14 (see §10). Everything else remains a proposal awaiting approval.**

Conventions used below:

- ✅ **Verified** — measured in the GSC export, or confirmed by reading the code.
- 🔍 **Needs investigation** — a hypothesis consistent with the data, not yet proven. Named as such everywhere.
- Figures are quoted exactly as exported. Where a number is a sum I computed, the components are shown.

---

## 0. Read this before interpreting anything else

The 28-day window contains **two completely different traffic regimes**, and every aggregate number in the export is a blend of them.

| Period | Days | Clicks | Impressions | Clicks/day | Avg position (range) |
| --- | --- | --- | --- | --- | --- |
| 2026-09-14 → 2026-10-07 | 24 | **80** | 5,390 | 3.3 | 8.9 – 16.6 |
| 2026-10-08 → 2026-10-11 | 4 | **120** | 3,030 | 30.0 | 7.3 – 11.4 |

✅ **60% of the period's clicks and 36% of its impressions landed in the final four days.** Daily clicks went from ~3 to 59 (Oct 11 alone). Average position improved from the 11–13 range to 7.3–8.2 at the same time, so this is a genuine ranking/visibility shift, not a reporting artifact.

**Three consequences, and they shape the whole plan:**

1. **Every "average CTR" and "average position" figure in this export is a weighted blend of a weak regime and a strong one.** Per-page CTR numbers below are directionally useful but should not be treated as a stable baseline.
2. **Something is working.** Before changing anything broadly, we should understand what moved, so we don't undo it. This matches your own instruction to preserve existing rankings.
3. **A 4-day run is not a trend.** It could be a core update, a seasonal spike, or something that reverts. The plan below is sequenced so the low-risk, high-certainty work happens first and the risky rewrites wait for a cleaner baseline.

🔍 **Hypothesis for the spike — needs investigation, do not act on it yet.** The query export contains a distinct cluster of conversational fragments that are not search phrasings: `yes` (4 impressions), `most reputable one`, `yes like`, `yes please`, `i mean routes`, `which border`, `how is it done`, `at what speed`, `company nams`, `my friend car`, `evet`, `نعم`, `كل شي`, `تفاصيل اكثر`. These read as follow-up turns in an assistant conversation rather than queries typed into a search box. That pattern is consistent with traffic from Google's AI-assisted search surfaces being reported in the Web search type. **This is inference from query shape alone — it is not confirmed.** To confirm: check GSC's Search Appearance / Insights breakdown in the UI (the exported `Search appearance.csv` is empty, so the export cannot answer it), and check referrer data in analytics.

**Recommended first action: none of the content work below. Re-export GSC for 2026-10-08 → onward once ~14 clean days exist, and compare.** Everything else can proceed in parallel, but the big title rewrites (§3) should be judged against that cleaner baseline.

---

## 1. Headline findings

### 1.1 The `/distance/*` cluster is the single biggest structural problem ✅

| | Pages | Clicks | Impressions | CTR |
| --- | --- | --- | --- | --- |
| `/distance/*` | 15 | **6** | **3,567** | **0.17%** |
| Root route pages (`/x-to-y-taxi-service`) | 46 | 147 | 3,184 | 4.62% |
| `/services/*` | 15 | 26 | 1,284 | 2.02% |
| `/destinations/*` | 14 | 6 | 125 | 4.80% |
| `/blog/*` | 8 | 5 | 270 | 1.85% |
| `/guides/*` | 8 | 2 | 69 | 2.90% |

**41% of all site impressions go to `/distance/*`, which produces 3% of clicks.** The positions are not the problem — most of these pages sit at 7–9, which is page one:

| URL | Impressions | Clicks | Position |
| --- | --- | --- | --- |
| `/distance/bahrain-to-riyadh` | 858 | 3 | 7.23 |
| `/distance/riyadh-to-dubai` | 586 | 0 | 8.85 |
| `/distance/riyadh-to-jeddah` | 463 | 0 | 8.15 |
| `/distance/riyadh-to-kuwait` | 286 | 0 | 8.47 |
| `/distance/riyadh-to-makkah` | 279 | 0 | 8.93 |
| `/distance/bahrain-to-jubail` | 173 | 0 | 7.86 |
| `/distance/doha-to-riyadh` | 174 | 1 | 7.01 |
| `/distance/riyadh-to-dammam` | 155 | 0 | 10.66 |
| `/distance/dammam-to-dubai` | 153 | 1 | 7.47 |
| `/distance/doha-to-dammam` | 146 | 0 | 6.90 |
| `/distance/dammam-to-kuwait` | 128 | 0 | 8.20 |
| `/distance/dammam-to-abu-dhabi` | 112 | 0 | 7.87 |

**Diagnosis.** Two causes, both real:

1. **The query intent is satisfied in the SERP.** The matching queries are overwhelmingly `riyadh to jeddah distance`, `bahrain to riyadh by road`, `how far is riyadh from dubai`. Google answers these with its own distance panel. A page-one organic result below that answer earns very few clicks no matter how good it is. **Some of this impression volume is structurally unconvertible, and we should not pretend otherwise.**
2. **The title gives no reason to click.** ✅ All 20 distance pages use one formula: `"{Origin} to {Destination} Distance & Travel Time"` (verified in each `src/app/distance/*/page.tsx`). That promises exactly the thing the SERP already showed. The page content is substantially better than the title implies — the `riyadh-to-kuwait` entry alone runs ~6,300 characters covering border crossings, route characteristics, timing factors and travel options.

So the opportunity is real but bounded: we can realistically target the minority of searchers who want more than the number — the ones actually planning the trip — by promising the thing Google's panel does not provide (border crossings, route choice, what the drive is actually like).

**This is not a content-quality problem.** The pages are well-built, genuinely differentiated per route, and already carry strong CTAs and internal links (verified in `src/components/DistancePage.tsx`: breadcrumb, hero CTA, mid-page booking block, related-route links, city/airport cross-links, closing CTA). Do not rewrite the bodies.

### 1.2 The site's real strength is cross-border GCC routes ✅

Top performers are all cross-border or long-distance corridors:

| URL | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| `/riyadh-to-qatar-taxi-service` | 31 | 230 | 13.48% | 4.63 |
| `/bahrain-to-dammam-taxi-service` | 22 | 528 | 4.17% | 9.55 |
| `/qatar-to-riyadh-taxi-service` | 21 | 245 | 8.57% | 7.04 |
| `/riyadh-to-dubai-taxi-service` | 14 | 166 | 8.43% | 5.65 |
| `/dammam-airport-to-qatar-taxi-service` | 9 | 145 | 6.21% | 6.94 |
| `/khafji-to-kuwait-taxi-service` | 8 | 298 | 2.68% | 6.36 |

Meanwhile the big-city head terms are nowhere:

| URL | Impressions | Position |
| --- | --- | --- |
| `/riyadh-airport-taxi-service` | 229 | **28.78** |
| `/services/riyadh` | 96 | **28.54** |
| `/jeddah-airport-taxi-service` | 79 | **44.01** |
| `/taif-airport-taxi-service` | 64 | **54.69** |
| `/services/jeddah` | 48 | **51.60** |
| `/services/madinah` | 20 | **51.70** |
| `/airport-transfer-for-umrah` | 8 | **91.62** |

**Strategic read.** The site ranks 4th–7th for `riyadh to qatar taxi` and 29th for `riyadh airport taxi`. That is the difference between a niche where it has genuine authority and a head term owned by aggregators, Careem/Uber and major OTAs. **Recommendation: lean into the cross-border corridors and the specific long-tail, and stop treating the Jeddah/Makkah/Madinah head terms as near-term targets.** They are a multi-year investment at current authority. This contradicts the usual instinct to fix the worst-ranking pages first, and it is deliberate.

### 1.3 Mobile is the majority and ranks better ✅

| Device | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Mobile | 147 (73%) | 5,885 | 2.50% | **8.78** |
| Desktop | 53 (27%) | 2,476 | 2.14% | **13.92** |
| Tablet | 0 | 59 | 0% | 6.34 |

Mobile ranks ~5 positions better and drives three-quarters of clicks. Any UX or layout regression on mobile is a revenue issue, not a cosmetic one. (Relevant: the announcement-bar fix shipped in `234cb5a` hides the email top bar below 640px specifically to avoid eating mobile viewport.)

### 1.4 Markets ✅

| Country | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Saudi Arabia | 102 | 3,352 | 3.04% | 11.59 |
| Bahrain | 19 | 752 | 2.53% | 7.26 |
| Qatar | 15 | 396 | 3.79% | 7.11 |
| UAE | 10 | 563 | 1.78% | 7.95 |
| United States | 9 | 404 | 2.23% | 11.73 |
| **Kuwait** | **9** | **332** | **2.71%** | **6.80** |
| United Kingdom | 4 | 465 | 0.86% | 11.80 |

Kuwait already converts at 2.71% from position 6.8 — the market is live and the site is competitive in it. That is a good sign for Priority 1.

**One market to ignore deliberately** 🔍: France (position 47.65), Germany, Spain and Switzerland impressions come from car-**rental** queries — `location voiture aeroport taïf` (18 impressions, pos 88.6), `autovermietung taif flughafen` (9, pos 47.1), `alquiler coche aeropuerto de taif` (5, pos 63.8). These land mostly on `/taif-airport-taxi-service`. They are not prospective customers for a chauffeur service and the positions are unwinnable. Recommend no action. (Note: commit `537b88d` already added rental-query handling — worth confirming it did not over-target this.)

---

## 2. Priority 1 — Kuwait ↔ Riyadh

### 2.1 Current state ✅

| URL | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| `/riyadh-to-kuwait-taxi-service` | 5 | 31 | **16.13%** | 6.97 |
| `/kuwait-to-riyadh-taxi-service` | 4 | 49 | **8.16%** | 5.90 |
| `/distance/riyadh-to-kuwait` | 0 | **286** | **0%** | 8.47 |
| `/khafji-to-kuwait-taxi-service` | 8 | 298 | 2.68% | 6.36 |
| `/kuwait-to-khafji-taxi-service` | 1 | 85 | 1.18% | 4.74 |
| `/kuwait-to-dammam-taxi-service` | 2 | 23 | 8.70% | 5.30 |
| `/dammam-to-kuwait-taxi-service` | 1 | 22 | 4.55% | 13.50 |
| `/distance/dammam-to-kuwait` | 0 | 128 | 0% | 8.20 |

### 2.2 The actual problem — it is not what it looks like

**`/riyadh-to-kuwait-taxi-service` has the highest CTR on the entire site (16.13%).** `/kuwait-to-riyadh-taxi-service` is at 8.16% from position 5.9. These two pages are not underperforming — **they are starved of impressions.** Between them they got 80 impressions in 28 days, while the informational distance page for the same corridor got 286 and converted none of them.

Query-level, the Riyadh↔Kuwait demand GSC shows is almost entirely informational phrasing:

| Query | Impressions | Clicks | Position |
| --- | --- | --- | --- |
| `riyadh to kuwait by road` | 26 | 0 | 8.81 |
| `riyadh to kuwait distance by road` | 13 | 0 | 8.85 |
| `saudi to kuwait distance by road` | 7 | 0 | 9.71 |
| `kuwait to riyadh distance by road` | 4 | 0 | 10.50 |
| `riyadh to kuwait city` | 2 | 0 | 41.50 |
| `kuwait to riyadh by car` | 1 | 0 | 10.00 |
| `kuwait to riyadh by road` | 1 | 0 | 40.00 |
| **Total** | **54** | **0** | |

✅ **Commercial phrasings — `kuwait to riyadh taxi`, `riyadh to kuwait taxi`, `taxi kuwait to saudi` — do not appear in the query export at all.** The site is essentially invisible for the Kuwait phrasings that would actually produce a booking.

**That commercial demand exists and converts — the Bahrain corridor proves it on this same site:**

| Query | Impressions | Clicks | CTR | Position |
| --- | --- | --- | --- | --- |
| `bahrain to saudi taxi` | 23 | 4 | **17.39%** | 11.26 |
| `taxi service from bahrain to dammam` | 11 | 1 | 9.09% | 3.36 |
| `bahrain to dammam taxi` | 29 | 1 | 3.45% | 7.41 |
| `taxi bahrain to dammam` | 22 | 1 | 4.55% | 10.41 |

So the diagnosis is: **the corridor's informational demand is captured by a page that converts nobody, and the corridor's commercial demand is not being captured at all.**

### 2.3 Recommendations

**P1-A — Do not touch `/riyadh-to-kuwait-taxi-service`'s title or meta.** 16.13% CTR at position 6.97 is the best-performing result on the site. Leave it alone. Any change is downside risk with negligible upside. *(Reason: protect what works.)*

**P1-B — Rewrite the title and meta description of `/distance/riyadh-to-kuwait`.** This is the highest-leverage single change for this corridor: 286 impressions at 0% CTR.

- Current title: `Riyadh to Kuwait Distance & Travel Time`
- Proposed: `Riyadh to Kuwait by Road — Distance, Border Crossings & Drive Time`
- Reason: the page genuinely covers both Al Khafji / Al Nuwaiseeb and Al Ruqi'i / Al Salmi crossings and what determines the journey length. Google's distance panel does not. The title should promise the part the panel cannot answer. This is honest, not keyword-stuffed — it describes real page content.
- Realistic outcome: 0% → 1.5–3% CTR. On current volume that is roughly 4–9 clicks/month, landing on a page that already links to the commercial page.
- ⚠️ Risk: title changes on a page-one result can move rankings either way. See §3.1 for why this should be tested on a small batch first.

**P1-C — Extend the two commercial pages to answer the "by road / how long / which border" questions directly**, so they can compete for the mixed-intent queries currently going to the distance page.

- Pages: `/kuwait-to-riyadh-taxi-service`, `/riyadh-to-kuwait-taxi-service`
- ✅ Both already contain genuine border-process content (verified in `src/lib/routeData.ts:756+` — `borderProcessParagraphs`, `documents`, both crossings named). The gap is that this content is not surfaced in a form that matches how people search ("how many hours", "which border is faster", "can I cross with GCC ID").
- Change: add FAQ entries in the existing `faqs` field using the real question phrasings from the GSC export. No new page, no duplicated content, no invented facts.
- ⛔ **Do not state a distance in km, a drive time in hours, a price, or a border wait time that isn't already sourced.** The existing content deliberately uses ranges and qualitative phrasing ("most of a day, including border processing"); keep that discipline.
- Reason: targets real logged demand with content the site can honestly support.

**P1-D — Strengthen the handoff from the distance page to the commercial page.** ✅ `DistancePage.tsx` already renders related-route, city and airport links. Confirm the Riyadh↔Kuwait distance entry sets `destinationCitySlug` — it currently sets only `originCitySlug: "riyadh"` and `originAirportHref`, so the Kuwait end of the route has no city cross-link. *(Verified in `src/lib/distanceRouteData.ts`.)*

**P1-E — Reconsider the Khafji sub-corridor.** `/khafji-to-kuwait-taxi-service` quietly earns 8 clicks from 298 impressions at position 6.36 — more clicks than either Riyadh↔Kuwait page. `/kuwait-to-khafji-taxi-service` sits at position **4.74** with only 1 click from 85 impressions, which suggests a title/snippet problem on a page that is already ranking near the top. Worth a CTR-focused look as part of P1.

---

## 3. Priority 2 — Low-impression pages

### 3.1 The `/distance/*` title formula — the big one

Covered in §1.1. The recommendation:

**Rewrite titles on three pages first, not all twenty.** Measure for 4 weeks, then roll out or revert.

Suggested test batch (highest volume, so fastest signal):

| URL | Current title | Proposed title | Impressions |
| --- | --- | --- | --- |
| `/distance/bahrain-to-riyadh` | Bahrain to Riyadh Distance & Travel Time | Bahrain to Riyadh by Road — Causeway Crossing, Distance & Drive Time | 858 |
| `/distance/riyadh-to-dubai` | Riyadh to Dubai Distance & Travel Time | Riyadh to Dubai by Road — Route, Border Crossings & Drive Time | 586 |
| `/distance/riyadh-to-jeddah` | Riyadh to Jeddah Distance & Travel Time | Riyadh to Jeddah by Road — Distance, Drive Time & Stops | 463 |

Reason for a staged test rather than a bulk rewrite: these 20 pages are 41% of site impressions at positions 7–9. A bulk change that goes wrong costs more than the upside of the ones that go right. ⚠️ Also note §0 — with the traffic regime mid-shift, attributing the result of a bulk change would be impossible.

### 3.2 `/riyadh-alternative-airports` is an orphan ✅ — concrete bug, fix now

The page added in commit `b49839b` is:

- ❌ **Not in the sitemap.** `grep -c "riyadh-alternative-airports" src/lib/sitemapData.ts` → `0`. The sitemap is hand-maintained per page family (`src/lib/sitemapData.ts`), and this page belongs to no generated family, so it was never added.
- ❌ **Has exactly one internal link site-wide** — the announcement bar I added yesterday (`src/components/AnnouncementSlider.tsx:13`). Before that it had zero.
- ❌ **Zero impressions** in the export, consistent with the above.

**Fix:** add it to `staticPages` in `sitemapData.ts`, and link it from `/riyadh-airport-taxi-service` and `/services/riyadh`. Low effort, unambiguous. *(Reason: a page Google cannot discover cannot rank.)*

This is worth a broader check — ✅ I verified the other families (`/distance/*`, `/services/*`, `/guides/*`, `/blog/*`, `/destinations/*`, `/hotels/*`) are all generated from arrays and are correctly covered. This was the only orphan found.

### 3.3 The RUH terminal query cluster — the best unexploited opportunity ✅

A coherent, high-intent, low-competition cluster where the site shows up and converts nothing:

| Query | Impressions | Position |
| --- | --- | --- |
| `ruh terminal 4 pickup` | 15 | 16.87 |
| `ruh terminal 3 pickup` | 14 | 18.00 |
| `ruh terminal 3 car service` | 13 | 26.77 |
| `ruh terminal 1 pickup` | 11 | 16.45 |
| `ruh terminal 1 car service` | 8 | 23.50 |
| `ruh terminal 2 pickup` | 8 | 27.38 |
| `ruh terminal 5 pickup` | 5 | 14.40 |
| `car to ruh terminal 3` | 4 | 27.75 |
| `ruh terminal 5 taxi` | 3 | 11.67 |
| `ruh terminal 1 taxi` | 2 | 14.00 |
| `ruh terminal 2 car service` | 2 | 27.00 |
| `car to ruh terminal 4` | 1 | 20.00 |
| `ruh terminal 5 car service` | 1 | 15.00 |
| `terminal 1 taxi pick up` | 1 | 15.00 |
| **Total** | **88** | **~11–28** |

Plus closely related: `riyadh airport pickup` (12, pos 39.9), `king khalid international airport car service` (11, pos 28.7), `king khalid international airport transfer` (7, pos 45.3).

**Why this matters:** someone searching `ruh terminal 4 pickup` is standing in an airport, or about to be. That is the highest booking intent in the entire dataset. The site ranks 11–28 — close enough that focused work can reach page one, and the competition is weak (these are not terms aggregators optimise for).

**Recommendation:** build genuine per-terminal pickup content on `/riyadh-airport-taxi-service` (which is at position 28.78 with 229 impressions and needs the help anyway) — real, verifiable terminal-by-terminal pickup guidance. ⛔ Only if the operational facts can be confirmed; do not invent meeting points, parking bays or wait times. **This requires your input on what is operationally true.**

🔍 Needs investigation: whether `/guides/king-khalid-airport` (13 impressions, position 9.69 — the best position of any RUH-related page) should be the target instead. It already ranks well; it may be the stronger host.

### 3.4 Pages with zero impressions

✅ 30+ top-level pages recorded no impressions. They fall into distinct groups, and the right response differs per group:

| Group | Pages | Assessment |
| --- | --- | --- |
| **Umrah / Ziyarat / Hajj** | `/umrah-taxi-services`, `/umrah-transport-package`, `/ziyarat-services-in-saudi-arabia`, `/taif-ziyarat-taxi-service`, `/makkah-umrah-taxi-guide`, `/madinah-umrah-taxi-guide` | Highly competitive vertical where the site has no foothold (`/airport-transfer-for-umrah` is at position **91.62**). **Recommend: no near-term investment.** |
| **Makkah / Madinah / Jeddah routes** | `/makkah-to-madinah-taxi-service`, `/madinah-to-makkah-taxi-service`, `/jeddah-to-makkah-taxi-service`, `/makkah-to-jeddah-taxi-service`, `/makkah-to-riyadh-taxi-service` | Same vertical, same verdict. Note `/distance/makkah-to-madinah` does get 20 impressions at position 26.45 — the demand is real, the authority is not. |
| **Occasion / B2B services** | `/wedding-transportation`, `/corporate-transportation-services`, `/educational-tours-transport`, `/school-buses-services` | Not organic-search-led businesses. `/school-buses-services` does get 9 impressions / 1 click. **Recommend: leave; these likely convert through other channels.** |
| **Genuine gaps worth fixing** | `/riyadh-alternative-airports` (§3.2), `/airport-transfers`, `/saudi-arabia-to-jordan-land-transfer`, `/reliable-alula-tour-taxi-service-in-saudi-arabia` | See §3.2 and §5. |

⚠️ **`/reliable-alula-tour-taxi-service-in-saudi-arabia`** — this URL is keyword-stuffed in a way that reads as spam to both users and search engines, and it duplicates intent with three other AlUla pages (§5.1). Flagging for a decision, not acting on it.

---

## 4. Priority 3 — Protecting and improving top performers

### 4.1 The Bahrain–Dammam corridor is the site's biggest asset ✅

Aggregated across the corridor:

| URL | Clicks | Impressions | Position |
| --- | --- | --- | --- |
| `/bahrain-to-dammam-taxi-service` | 22 | 528 | 9.55 |
| `/distance/bahrain-to-riyadh` | 3 | 858 | 7.23 |
| `/blog/bahrain-to-dammam-travel-options` | 4 | 213 | 10.77 |
| `/distance/bahrain-to-jubail` | 0 | 173 | 7.86 |
| `/riyadh-to-bahrain-taxi-service` | 7 | 151 | 10.21 |
| `/guides/bahrain-saudi-commuter-guide` | 2 | 44 | 6.00 |
| `/bahrain-to-riyadh-taxi-service` | 1 | 49 | 7.98 |
| **Total** | **39** | **2,016** | |

**24% of all site impressions and 20% of clicks.** Protect this above all else.

**Highest-value single opportunity on the site:** `/bahrain-to-dammam-taxi-service` is at **position 9.55** — the bottom of page one — with 528 impressions. Moving it into the top 5 would plausibly double its clicks without any new demand. It already converts at 4.17% from that position.

Recommended approach: strengthen internal links into it from the three sibling pages above (which rank *better* but convert less), rather than editing the page itself. *(Reason: it is working; the lever is authority, not content.)*

⚠️ **Cannibalization risk to investigate** 🔍: `/bahrain-to-dammam-taxi-service` (pos 9.55), `/distance/bahrain-to-dammam`, and `/blog/bahrain-to-dammam-travel-options` (pos 10.77) all target the same corridor. The blog post earns 4 clicks from 213 impressions. Worth checking in GSC which URL Google returns for `bahrain to dammam taxi` and whether they are competing with each other.

### 4.2 Protect, do not touch ⛔

| URL | Why |
| --- | --- |
| `/riyadh-to-qatar-taxi-service` | 31 clicks, 13.48% CTR, position 4.63. Best page on the site. |
| `/riyadh-to-kuwait-taxi-service` | 16.13% CTR — highest on the site. |
| `/qatar-to-riyadh-taxi-service` | 21 clicks at 8.57%. |
| `/riyadh-to-dubai-taxi-service` | 14 clicks at 8.43%, position 5.65. |

No title, meta or content changes to these without a specific measured reason.

### 4.3 Near-miss pages — ranking well, converting poorly

| URL | Impressions | Clicks | Position | Note |
| --- | --- | --- | --- | --- |
| `/services/jubail` | 128 | 1 | 11.91 | 0.78% CTR |
| `/services/dhahran` | 123 | 1 | 7.92 | 0.81% CTR at position 8 — anomalous |
| `/services/al-ahsa` | 246 | 6 | 9.30 | 2.44%, best of the `/services/*` set |
| `/kuwait-to-khafji-taxi-service` | 85 | 1 | **4.74** | Position 4.7 with 1.18% CTR — strong anomaly |

`/services/dhahran` and `/kuwait-to-khafji-taxi-service` both rank in the top 8 but convert under 1.2%. That combination usually indicates a title/snippet mismatch with the query, and it is cheap to investigate. 🔍 Needs query-level drill-down in the GSC UI (the export does not map queries to pages).

---

## 5. Priority 4 — Tourist destinations

### 5.1 AlUla has four overlapping pages ✅ — resolve before adding content

| URL | Clicks | Impressions | Position |
| --- | --- | --- | --- |
| `/services/alula` | 3 | 54 | 11.74 |
| `/alula-airport-taxi-service` | 2 | 39 | 22.72 |
| `/reliable-alula-tour-taxi-service-in-saudi-arabia` | 0 | 0 | — |
| `/destinations/alula` | 0 | 0 | — |
| `/blog/alula-complete-guide` | 0 | 0 | — |

**Five URLs targeting AlUla, two of which get any impressions at all.** Queries `al ula transfer` (3 impressions, position 35) and `alula taxi` (2, position 48) show the site is not competitive despite five pages — which is itself evidence of split authority.

**Recommendation: consolidate before creating anything new.** Decide on one commercial page (`/services/alula`, currently the strongest) and one editorial page, and redirect or de-emphasise the rest. ⚠️ **This needs your decision** — it involves retiring URLs, and `next.config.ts` already has an established 301 pattern for this (verified: 10+ existing redirects).

Adding more AlUla content before consolidating would make the problem worse. This directly serves your "avoid creating duplicate pages targeting the same search intent" requirement.

### 5.2 Tabuk is the one tourist area that is working ✅

| URL | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| `/services/tabuk` | 6 | 104 | 5.77% | 10.21 |
| `/tabuk-airport-taxi-service` | 0 | 39 | 0% | 16.49 |

`/services/tabuk` is the 11th-best page on the site by clicks. It is at position 10.21 — one or two places from a meaningful step up. **Recommend treating Tabuk as the template for the tourist-destination work**, since it is the one with proven traction.

### 5.3 NEOM has latent demand ✅

`/services/neom` — 2 clicks, 72 impressions, position 11.44. Queries: `neom taxi` (13 impressions, position **9.46**), `airport transfers in neom` (3, position **4.00**). Small volume but the site already ranks top-10. Low-effort upside.

### 5.4 Jordan and Red Sea — be honest about these ⚠️

- ✅ `/saudi-arabia-to-jordan-land-transfer` **exists** and is correctly in the sitemap, but recorded **zero impressions** and no Jordan-related query appears anywhere in the export.
- ✅ **No Red Sea destination page exists.** No Red Sea / Umluj query appears in the export either.

**These are speculative bets, not data-driven opportunities.** There is no demand signal for either in this dataset. That does not make them wrong — they may be strategically important, and GSC only shows queries where the site already appears, so absence of a page guarantees absence of data. But they should be ranked *below* the Kuwait, RUH-terminal and Bahrain-corridor work, which all have measured demand.

🔍 **Needs external keyword research** (not possible from GSC alone) before committing effort. If you want these built regardless for business reasons, say so and I will treat them as a product decision rather than an SEO one.

---

## 6. Priority 5 — Internal linking

### 6.1 Current state is better than expected ✅

Measured inbound internal links (`grep` across `src/`):

| Target | Inbound links |
| --- | --- |
| `/kuwait-to-riyadh-taxi-service` | 12 |
| `/khafji-to-kuwait-taxi-service` | 12 |
| `/kuwait-to-dammam-taxi-service` | 11 |
| `/riyadh-to-kuwait-taxi-service` | 9 |
| `/distance/riyadh-to-kuwait` | 7 |
| `/riyadh-alternative-airports` | **1** |

The link graph is in reasonable shape. ⛔ **Recommend against a site-wide internal-linking overhaul** — there is no evidence it is the bottleneck, and the templates already cross-link systematically (`DistancePage.tsx` alone emits related-route, city, airport, service and fleet links).

### 6.2 Targeted link work worth doing

1. **`/riyadh-alternative-airports`** — 1 inbound link. Add to sitemap + link from `/riyadh-airport-taxi-service`, `/services/riyadh`. (§3.2)
2. **`/bahrain-to-dammam-taxi-service`** — push authority from the three better-ranking Bahrain-corridor pages into the one that converts. (§4.1)
3. **Distance → commercial handoff** for the Kuwait corridor. (§P1-D)

### 6.3 Small fix I introduced yesterday ⚠️

The announcement bar links to `/contact`, which ✅ **301-redirects to `/contact-us`** (`next.config.ts`). It works, but it wastes a redirect hop on a site-wide link. Should point at `/contact-us` directly. My error — will fix with whatever else is approved.

---

## 7. Prioritized backlog

Ordered by **(measured demand × confidence) ÷ effort**, not by your priority numbering — the two differ in places, and where they do, the reason is given.

| # | Action | Effort | Confidence | Why this rank |
| --- | --- | --- | --- | --- |
| 1 | Re-export GSC once ~14 clean days exist post-spike (§0) | None | ✅ | Everything else is measured against the wrong baseline until this exists |
| 2 | Add `/riyadh-alternative-airports` to sitemap + 2 internal links (§3.2) | Trivial | ✅ | Verified bug, zero risk, page is currently undiscoverable |
| 3 | Fix `/contact` → `/contact-us` in announcement bar (§6.3) | Trivial | ✅ | My error from yesterday |
| 4 | Rewrite `/distance/riyadh-to-kuwait` title + meta (§P1-B) | Small | Medium | Your #1 priority; 286 impressions at 0% CTR |
| 5 | Kuwait commercial pages — FAQ extension for "by road" intent (§P1-C) | Medium | Medium | Your #1 priority; targets logged demand |
| 6 | Internal links into `/bahrain-to-dammam-taxi-service` (§4.1) | Small | Medium | Biggest single ranking opportunity (pos 9.55, 528 impr) |
| 7 | Distance title A/B on 3 highest-volume pages (§3.1) | Small | Medium | 41% of impressions at 0.17% CTR — but staged, because risk |
| 8 | RUH terminal content on `/riyadh-airport-taxi-service` (§3.3) | Medium | Medium | Highest booking intent in the dataset — **needs your operational input** |
| 9 | AlUla consolidation decision (§5.1) | Medium | ✅ problem | Must precede any new AlUla content — **needs your decision** |
| 10 | `/services/dhahran`, `/kuwait-to-khafji-taxi-service` CTR drill-down (§4.3) | Small | 🔍 | Top-8 rankings converting under 1.2% |
| 11 | NEOM / Tabuk incremental work (§5.2, §5.3) | Medium | Medium | Proven small traction |
| 12 | Jordan / Red Sea content (§5.4) | Large | 🔍 low | No demand signal; needs keyword research first |
| — | Umrah / Makkah / Madinah head terms | Large | ⛔ | Explicitly **not recommended** near-term (§3.4) |
| — | Site-wide internal linking overhaul | Large | ⛔ | **Not recommended** — not the bottleneck (§6.1) |

---

## 8. What I need from you before implementing

1. **Approval of the ranking in §7**, or a reordering. Items 1–3 are safe and I would do them first regardless.
2. **Operational facts for the RUH terminal work (§3.3)** — what is actually true about pickup at each RUH terminal. I will not invent this.
3. **A decision on AlUla consolidation (§5.1)** — it involves retiring URLs.
4. **A decision on Jordan / Red Sea (§5.4)** — business bet or park it?
5. **Confirmation on the §0 hypothesis** — can you check GSC's Insights/Search Appearance view for what drove the Oct 8–11 spike? It would change how much weight to put on the whole dataset.

---

## 9. Things I did not do

- ⛔ No production changes. Nothing in this document is implemented.
- ⛔ No invented distances, drive times, prices, border wait times or service claims.
- ⛔ No new pages proposed that duplicate an existing page's intent — the one duplication issue found (AlUla) is flagged for consolidation, not expansion.
- ⛔ No keyword-stuffed title proposals; every proposed title describes content the page actually contains.
- 🔍 Query-to-page mapping is **not** in the GSC export. Several hypotheses above (cannibalization in §4.1, CTR anomalies in §4.3) need the GSC UI to confirm, and are labelled accordingly.

---

## 10. Changelog — safe fixes, 2026-10-14

Approved and implemented. Both are reversible single-line changes; neither touches page content, URLs or rankings.

### 10.1 `/riyadh-alternative-airports` added to the sitemap ✅

- **File:** `src/lib/sitemapData.ts`, appended to the `airportTransferPages` array.
- **Priority 0.75**, `changeFrequency: "monthly"` — matching the `/tabuk-…`/`/yanbu-airport-taxi-service` convention for supporting airport pages, rather than `/riyadh-airport-taxi-service`'s 0.85. The page compares DMM/BAH/DOH as alternatives to RUH and funnels into existing route pages, so it is a supporting page, not an airport hub of its own.
- **Pre-check before adding:** the page is a real 341-line page with `generatePageMetadata` (title, description, canonical path) and no `noindex` / robots exclusion, so it qualifies for inclusion. Verified it was in neither the sitemap nor `robots.ts` exclusions.
- **Verified in the build output** (`.next/server/app/sitemap.xml.body`):
  ```xml
  <url>
    <loc>https://gulftripservice.com/riyadh-alternative-airports</loc>
    <lastmod>2026-10-09T10:10:49.000Z</lastmod>
    <changefreq>monthly</changefreq>
  ```
  Sitemap entry count **167 → 168**. The `lastmod` is correctly derived from the page's real git commit date (`b49839b`, when the page shipped), confirming `lastMod()` resolved it rather than falling back.

### 10.2 Announcement-bar `/contact` → `/contact-us` ✅

- **File:** `src/components/AnnouncementSlider.tsx` — two of the four messages pointed at `/contact`, which 301-redirects to `/contact-us` (`next.config.ts`). Introduced by me in `234cb5a`; now corrected.
- **Audited all four** bar targets against the full redirect-source list in `next.config.ts`. All four now resolve directly with no hop: `/riyadh-alternative-airports`, `/contact-us`, `/airport-transfers`, `/contact-us`.
- **Verified in the built HTML** (`.next/server/app/index.html`): zero occurrences of `href="/contact"`, both `/contact-us` links present. `data-announcement-bar` is present in the SSR output, confirming the `body:has(…)` top-padding applies on first paint with no hydration layout shift.

### 10.3 Tests

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | ✅ pass, 0 errors |
| `npx eslint` (both changed files) | ✅ pass, 0 warnings |
| `npx next build` | ✅ pass, all routes prerendered |
| Sitemap contains new URL | ✅ verified in build artifact |
| No `/contact` links remain | ✅ verified in built HTML |

**Not deployed.** Committed locally only, pending a deploy decision.

### 10.4 GSC re-export timing — verified, action is yours ⚠️

✅ **There is no Search Console API integration in this project** — `grep` for `searchconsole|search-console|webmasters` across `src/`, `scripts/` and `package.json` returns nothing; the only Google credential is `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (the verification meta tag). The existing `docs/*.xlsx` files are manual exports. **So I cannot pull this data myself — it needs you.**

Timing, given the spike began 2026-10-08 and today is 2026-10-14:

| When | What to pull | Why |
| --- | --- | --- |
| **Now** | GSC → **Insights**, and the **Search Appearance** breakdown for Oct 8–11 | Needs no new data. This is what would confirm or kill the §0 AI-surface hypothesis — the exported `Search appearance.csv` was empty, so only the UI can answer it. |
| **~2026-10-24** | Re-export 28 days, and separately Oct 8 → Oct 21 | Gives **14 clean post-spike days**. GSC finalises with a ~2–3 day lag, so Oct 21 data is settled by roughly Oct 24. |

Until the second export exists, §7 item 7 (the bulk distance-title test) has no trustworthy baseline to measure against — which is why it sits below the Kuwait work in the ordering.
