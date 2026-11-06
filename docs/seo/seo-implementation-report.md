# SEO Implementation Report — 2026-11-06

Work done against the Oct 1 – Nov 3, 2026 GSC report
(`docs/Performance2026-11-06.xlsx`).

**Nothing has been committed, pushed or deployed.** All changes are in the
working tree awaiting review.

---

## Scope of the diff

```
29 files changed, 71 insertions(+), 53 deletions(-)
```

Broken down by what kind of line changed:

| Line type | Count |
|---|---:|
| `description:` replaced | 28 |
| `title:` replaced | 25 |
| `<li>` internal links added | 3 |
| Explanatory comment added | 1 block |

**Nothing else.** Verified by inspecting the diff for each category:

| Guard | Result |
|---|---|
| `path:` or `hreflangPath:` changed | **none** — no URL or canonical moved |
| `noindex` changed | **none** |
| `next.config` / `middleware` / redirects touched | **none** |
| `sitemapData.ts` / `routeData.ts` / `distanceRouteData.ts` touched | **none** |
| Pages deleted | **none** |
| Content sections removed | **none** |
| Dependencies added | **none** |
| Database / booking / payment logic touched | **none** |

Sitemap still serves 176 URLs.

---

## 1. Distance family metadata — 20 pages

Titles and descriptions now lead with the verified road distance; descriptions
add the drive time.

| Page | Old title | New title |
|---|---|---|
| /distance/bahrain-to-riyadh | Bahrain to Riyadh Distance & Travel Time | **Bahrain to Riyadh Distance: 470 km by Road** |
| /distance/riyadh-to-kuwait | Riyadh to Kuwait by Road — Distance & Time | Riyadh to Kuwait by Road: 639 km |
| /distance/bahrain-to-jubail | Bahrain to Jubail Distance & Travel Time | Bahrain to Jubail Distance: 150 km by Road |
| /distance/riyadh-to-dubai | Riyadh to Dubai Distance & Travel Time | Riyadh to Dubai Distance: 1,100 km by Road |
| /distance/doha-to-riyadh | Doha to Riyadh Distance & Travel Time | Doha to Riyadh Distance: 580 km by Road |
| /distance/riyadh-to-jeddah | Riyadh to Jeddah Distance & Travel Time | Riyadh to Jeddah Distance: 950–1,000 km |
| /distance/doha-to-dammam | Doha to Dammam Distance & Travel Time | Doha to Dammam Distance: 440 km by Road |
| /distance/dammam-to-dubai | Dammam to Dubai Distance & Travel Time | Dammam to Dubai Distance: 1,100 km by Road |
| /distance/dammam-to-kuwait | Dammam to Kuwait by Road — Distance, Border & Drive Time | Dammam to Kuwait Distance: 410 km by Road |
| /distance/riyadh-to-dammam | Riyadh to Dammam Distance & Travel Time | Riyadh to Dammam Distance: 400 km, 4 Hours |
| /distance/riyadh-to-makkah | Riyadh to Makkah Distance & Travel Time | Riyadh to Makkah Distance: 870 km by Road |
| /distance/dammam-to-abu-dhabi | Dammam to Abu Dhabi Distance & Travel Time | Dammam to Abu Dhabi Distance: 950 km |
| /distance/bahrain-to-dammam | Bahrain to Dammam Distance & Travel Time | Bahrain to Dammam Distance: 65 km |
| /distance/khafji-to-kuwait | Khafji to Kuwait Distance & Travel Time | Khafji to Kuwait: 180 km via Al Nuwaiseeb |
| /distance/abha-to-madinah | Abha to Madinah Distance & Travel Time | Abha to Madinah Distance: 980–1,060 km |
| /distance/abha-to-riyadh | Abha to Riyadh Distance & Travel Time | Abha to Riyadh Distance: 780–850 km |
| /distance/abha-to-jeddah | Abha to Jeddah Distance & Travel Time | Abha to Jeddah Distance: 620–680 km |
| /distance/jeddah-to-makkah | Jeddah to Makkah Distance & Travel Time | Jeddah to Makkah Distance: 80 km by Road |
| /distance/makkah-to-madinah | Makkah to Madinah Distance & Travel Time | Makkah to Madinah Distance: 450 km by Road |
| /distance/jeddah-to-madinah | Jeddah to Madinah Distance & Travel Time | Jeddah to Madinah Distance: 420 km by Road |

Seventeen of those twenty previously shared one template. They no longer do.

### Figure accuracy — verified programmatically, not by eye

A check extracted every numeric token from each new title and description and
asserted it also appears in that route's own `roadDistance` / `driveTime` /
`routeType` fields in `src/lib/distanceRouteData.ts`.

**Result: 0 mismatches across all 20 pages.** No figure in any snippet is
absent from the page it describes.

That check caught one real error of mine. My first draft of the
`/distance/riyadh-to-dammam` description said "roughly 4 hours of driving on
**Highway 40**". Highway 40 is a well-established claim for that corridor
elsewhere on the site (`src/lib/routeData.ts` uses it repeatedly, including an
FAQ answer), but the *distance* page never names it — it says "central Saudi
highway network" and "flat, open highway". A snippet promising a road name the
page does not mention is a snippet/page mismatch, so it was changed to "across
open highway".

### Length check

All 20 descriptions are now ≤160 characters (was: 13 over).

Titles: 10 of 20 run 61–62 characters including the ` | Gulf Trip Service`
suffix, against a ~60-character display budget. **This is a deliberate
trade-off and it moved the wrong way on paper** — the site-wide count of titles
over 60 characters went from 104 to 109 because five distance titles crossed
from exactly 60 to 62.

It is harmless, and that was verified rather than assumed. At a 60-character
cut the worst case loses **"ce"** from the end of "…Gulf Trip Service". The
figure — the entire point of the rewrite — ends by character 33 in every one of
the twenty titles, so it is never at risk:

```
distance titles over the 60-char budget:        10
distance titles where the FIGURE would be cut:   0
```

---

## 2. Four high-gap pages

| Page | Changed | Before → after |
|---|---|---|
| /border-crossing | title + description | Title 84 → 61 chars; description 168 → 147 |
| /riyadh-alternative-airports | title + description | Title 75 → 64; description 177 → 153, now naming Dammam, Bahrain, Doha and Dubai |
| /blog/family-saudi-destinations | description | 167 → 161, now opening "Which Saudi destinations suit a first family trip" to match the 41-impression query it ranks 4.6 for |
| /bahrain-to-dammam-taxi-service | description only | 169 → 151. **Trim only** — every word and both figures kept, just the trailing "Book your ride on WhatsApp." removed so nothing is cut |

`/border-crossing` old title: `Saudi Arabia Border Crossing Taxi — Bahrain, UAE,
Qatar & Kuwait` (84 with brand, so the country list was cut mid-phrase). New:
`Saudi Arabia Border Crossing Taxi Service`, with the countries moved into the
description where they fit.

---

## 3. Factual corrections — four false cross-border claims

Four **domestic** Saudi routes advertised cross-border service. All four are
`isCrossBorder: false` in `src/lib/routeData.ts`, so the metadata contradicted
the site's own data and promised paperwork handling for a border the journey
never crosses.

| Page | What it claimed | isCrossBorder | Impr |
|---|---|---|---:|
| /jeddah-to-makkah-guide | Title "Cross-Border Car Service 24/7" + "Cross-border paperwork handled" | `false` | 0 |
| /makkah-to-madinah-guide | "Cross-border paperwork handled" | `false` | 0 |
| /dammam-airport-to-riyadh-taxi-service | Title "Border Crossing Made Easy" + "Cross-border paperwork handled" | `false` | 85 |
| /dammam-airport-to-khafji-taxi-service | Title "Cross-Border Car Service 24/7" + "Cross-border paperwork handled" | `false` | 6 |

Replacements use the distance and travel time already published on each route
page (`~80 km / 1–1.5 h`, `~450 km / 4–5 h`, `~400 km / 3.5–4.5 h`,
`~180 km / 2–2.5 h`).

**Verified after the fix:** every remaining cross-border claim in page metadata
sits on a route whose `isCrossBorder` is `true`.

```
domestic routes still claiming cross-border: 0
```

Ten pages legitimately keep the claim: bahrain-to-riyadh,
dammam-airport-to-bahrain, dammam-airport-to-qatar, dammam-to-abu-dhabi,
dammam-to-dubai, dammam-to-kuwait, dubai-to-dammam, dubai-to-riyadh,
kuwait-to-dammam, qatar-to-dammam, qatar-to-riyadh, riyadh-to-bahrain,
riyadh-to-dubai, riyadh-to-kuwait, riyadh-to-qatar — all `isCrossBorder: true`.

---

## 4. Internal linking — Arabic footer

`src/components/ArabicFooter.tsx`: three links added to the
الرحلات عبر الحدود (cross-border routes) column.

| Added | Label | Impressions before |
|---|---|---:|
| /ar/qatar-to-riyadh-taxi-service | الدوحة ← الرياض | 1 |
| /ar/riyadh-to-bahrain-taxi-service | الرياض ← البحرين | 114 (10 clicks, 8.77% CTR) |
| /ar/riyadh-to-kuwait-taxi-service | الرياض ← الكويت | **0** |

The footer previously listed 7 of the 10 Arabic pages, and the three it omitted
were the three least visible. `routeDataAr.ts` documents that
`/ar/qatar-to-riyadh-taxi-service` had **no inbound internal link at all** —
Google derived the URL from the hreflang pair on the opposite direction and was
served a 404 before the page existed.

Labels are the reviewed `breadcrumbLabel` strings already in `routeDataAr.ts`,
not new wording. **No Arabic prose was written or altered in this task.**

**Verified in rendered HTML:** all three appear on `/ar`, and all 7 Arabic
route pages now interlink:

```
/ar/bahrain-to-dammam-taxi-service
/ar/dammam-airport-to-bahrain-taxi-service
/ar/dammam-airport-to-qatar-taxi-service
/ar/qatar-to-riyadh-taxi-service
/ar/riyadh-to-bahrain-taxi-service
/ar/riyadh-to-kuwait-taxi-service
/ar/riyadh-to-qatar-taxi-service
```

---

## 5. Arabic SEO — what was and was not done

**Done:** the three footer links above.

**Deliberately not done:** nothing was changed on
`/ar/riyadh-to-qatar-taxi-service`, the 6th best page on the site (44 clicks,
8.41% CTR). About 50 Arabic impressions ask "كم ساعة" (how many hours) and get
zero clicks, which argued for putting the duration in its description. The page
already answers it in content — `travelTime: "6.5 إلى 7.5 ساعات"` plus a
"كم تستغرق الرحلة؟" FAQ — so the change would have been a snippet gamble
against a working 8.41% CTR for an unmeasurable gain.

**No Arabic wording was authored or reviewed in this task.** Item B in the plan
(an Arabic Dammam→Bahrain page, 17 impressions at position 29 with no matching
page) needs native Arabic authoring and is listed for approval, not drafted.

---

## 6. Technical verification

Every check below was executed. Nothing is reported as passing that was not run.

| Check | Command / method | Result |
|---|---|---|
| TypeScript | `npx tsc --noEmit` | **exit 0** |
| Production build | `npm run build` | **exit 0**, 221/221 pages generated |
| Build log error scan | grep for `module not found`, `failed to compile`, `type error`, `cannot find`, `ERR_`, `error:` | **0 matches** |
| ESLint, changed files only | `npx eslint <29 files>` | **0 errors**, 3 warnings |
| Figure accuracy | 20 distance pages cross-checked against `distanceRouteData.ts` | **0 mismatches** |
| Cross-border accuracy | all metadata claims vs `isCrossBorder` | **0 domestic routes still claiming it** |
| Rendered titles/descriptions | read from `.next/server/app/**/*.html` | new values present |
| Canonicals | rendered HTML, 5 changed pages | all **self-canonical**, correct |
| Hreflang reciprocity | EN and AR sides of `riyadh-to-qatar` and `bahrain-to-dammam` | **reciprocal and identical** |
| Arabic canonical | `.next/server/app/ar/riyadh-to-qatar-taxi-service.html` | self-canonical to `/ar/...` |
| Sitemap | live `sitemap.xml` | **176 URLs**, unchanged; 0 `noindex` pages present |
| robots.txt | `src/app/robots.ts` | allows all, disallows `/admin/` `/api/`, declares sitemap |
| Description lengths | all 20 distance pages | all ≤160 |
| Title truncation risk | figure position vs 60-char budget | figure safe in **20/20** |

The 3 ESLint warnings are pre-existing unused imports (`TEL_URL` and
`PHONE_DISPLAY` in `border-crossing/page.tsx`, `waLink` in `ArabicFooter.tsx`).
Confirmed not introduced here — the diff touches no import line.

### Not verified

- **Live URL status codes for the changed pages.** The changes are not deployed,
  so there is nothing new to check live. Existing URLs are untouched, and no
  `path:` value changed, so no status code can have moved.
- **Structured data validity against Google's Rich Results Test.** No schema was
  modified in this task. `/border-crossing` keeps its original
  `serviceSchema` wording, which still carries the old long title string — that
  is internal schema text, not a page title, and it remains accurate.
- **Whether the distance metadata actually lifts CTR.** That needs a follow-up
  GSC pull. See the caveat below.

---

## 7. Remaining issues

### The main honest caveat on this work

The distance-family rewrite is a **hypothesis, not a fix**, and the evidence
inside this very dataset is mixed. Two distance pages already carried their
figures in the metadata before today:

- `/distance/riyadh-to-kuwait` — 0.59% CTR, nearly double the family average
- `/distance/dammam-to-kuwait` — **0.00%** CTR from 264 impressions

One above average, one at zero. The 173 "modelled missed clicks" on
`/distance/bahrain-to-riyadh` is an upper bound computed against commercial-page
CTR, and these are informational queries Google often answers in the results
page itself. The honest expectation is a modest improvement at best.

It was still the right place to act: 34.5% of site impressions, 27 clicks at
risk.

### Unexplained and more important than anything changed here

Clicks fell from **69/day on Oct 12 to 16/day in early November** while
impressions held near 800/day. Oct 15 and Nov 3 have near-identical impressions
(734 vs 795) and four times different clicks (64 vs 16). This export does not
contain the per-day per-page breakdown needed to attribute it. **Check this in
GSC directly before judging any of today's work.**

### Still open

| # | Issue | Status |
|---|---|---|
| 1 | Umrah corridor (6 pages, Jeddah↔Makkah and Makkah↔Madinah) has **zero impressions** | Needs a GSC indexation check before any page change — plan item C |
| 2 | "bahrain to dammam" bare query ranks 21.6 with 4 candidate pages | Needs GSC query→page view — plan item D |
| 3 | Airport family weighted position **16.0**; "jeddah airport transfer" at 41.9, "ruh terminal 4 pickup" at 16.4 | Content project, not metadata — plan item 3.3 |
| 4 | City family weighted position **13.1** | Content project — CTR is normal for the position, so titles were left alone |
| 5 | `/distance/riyadh-to-bahrain` does not exist; ~175 impressions of reverse-direction queries land on the forward page | Needs approval — plan item A |
| 6 | 23 descriptions still over 165 characters | Left alone: mostly on performing pages, no evidence for change |
| 7 | 109 titles still over 60 characters including the brand suffix | Mostly cuts only the brand; a site-wide fix would mean changing the brand suffix behaviour in `seo.ts`, which is a high-risk change on 169 pages |
| 8 | `/services` is `noindex` while its children earn 3,207 impressions | Needs a yes/no — plan item E |
| 9 | 7 dead `layout.tsx` metadata blocks | Housekeeping — plan item F |
| 10 | `/contact` and `/contact-us` share title and description | `/contact` is `noindex` and out of the sitemap; lowest priority — plan item G |
| 11 | Query-level data covers only 9% of clicks | A permanent limitation of GSC exports, not fixable |
| 12 | `/ar/` pages still render `<html lang="en">` with RTL on an inner wrapper | Pre-existing, documented in `docs/backlog-ar-root-html-lang.md`, out of scope here |

### Approval-required recommendations

Full evidence in `seo-optimization-plan.md`. None executed:

- **A** — create `/distance/riyadh-to-bahrain` (~175 impressions of reverse queries)
- **B** — create an Arabic Dammam→Bahrain page (17 impressions, position 29, no matching page)
- **C** — investigate the zero-visibility Umrah corridor before changing anything
- **D** — resolve the "bahrain to dammam" position-21.6 ambiguity
- **E** — confirm `/services` should stay `noindex`
- **F** — remove 7 dead `layout.tsx` metadata blocks
- **G** — deduplicate `/contact` / `/contact-us`

---

## 8. Files changed

### Modified (29)

**Distance metadata (20):**
```
src/app/distance/abha-to-jeddah/page.tsx
src/app/distance/abha-to-madinah/page.tsx
src/app/distance/abha-to-riyadh/page.tsx
src/app/distance/bahrain-to-dammam/page.tsx
src/app/distance/bahrain-to-jubail/page.tsx
src/app/distance/bahrain-to-riyadh/page.tsx
src/app/distance/dammam-to-abu-dhabi/page.tsx
src/app/distance/dammam-to-dubai/page.tsx
src/app/distance/dammam-to-kuwait/page.tsx
src/app/distance/doha-to-dammam/page.tsx
src/app/distance/doha-to-riyadh/page.tsx
src/app/distance/jeddah-to-madinah/page.tsx
src/app/distance/jeddah-to-makkah/page.tsx
src/app/distance/khafji-to-kuwait/page.tsx
src/app/distance/makkah-to-madinah/page.tsx
src/app/distance/riyadh-to-dammam/page.tsx
src/app/distance/riyadh-to-dubai/page.tsx
src/app/distance/riyadh-to-jeddah/page.tsx
src/app/distance/riyadh-to-kuwait/page.tsx
src/app/distance/riyadh-to-makkah/page.tsx
```

**CTR-gap pages (4):**
```
src/app/bahrain-to-dammam-taxi-service/page.tsx     (description trim only)
src/app/blog/family-saudi-destinations/page.tsx     (description)
src/app/border-crossing/page.tsx                    (title + description)
src/app/riyadh-alternative-airports/page.tsx        (title + description)
```

**Factual corrections (4):**
```
src/app/dammam-airport-to-khafji-taxi-service/page.tsx
src/app/dammam-airport-to-riyadh-taxi-service/page.tsx
src/app/jeddah-to-makkah-guide/page.tsx
src/app/makkah-to-madinah-guide/page.tsx
```

**Internal linking (1):**
```
src/components/ArabicFooter.tsx                     (3 links + comment)
```

### Added (4 documents)

```
docs/seo/gsc-performance-analysis.md
docs/seo/seo-optimization-plan.md
docs/seo/seo-implementation-report.md
docs/seo/seo-baseline.md
```

### Deleted

**None.**

### Pre-existing untracked files — all preserved, none modified

```
docs/Performance2026-11-06.xlsx        (your GSC report)
docs/phase-0-db-verification-2026-11-04.md
docs/phase-1-task-1-contact-forms-2026-11-04.md
docs/phase-3-cta-form-audit-2026-11-04.md
docs/system-audit-2026-11-04.md
public/vehicles/Land Cruiser Prado.jpeg
seo-audit/Performance-2026-11-04.xlsx
```
