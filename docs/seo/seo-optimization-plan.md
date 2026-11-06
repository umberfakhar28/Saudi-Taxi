# SEO Optimization Plan — from the Oct 1 – Nov 3, 2026 GSC report

Companion to `gsc-performance-analysis.md`. Evidence for every item is in that
document; this one says what to do, why, what it risks, and what needs your
approval first.

---

## Guiding principle

The site grew from 60 to 792 clicks across comparable 28-day windows. Almost
nothing is declining. **The main risk in this work is breaking something that
is working, not failing to fix something that is broken.** So the plan is
ordered by risk-adjusted value: act hardest where impressions are large and
existing clicks are small, and leave the winners alone.

Risk is rated by *clicks currently at stake on the pages being touched*:

- **Low** — fewer than 30 clicks on the affected pages
- **Medium** — 30 to 100
- **High** — over 100, or a change to site-wide behaviour

---

## Phase 1 — Protect and prioritise (analysis only, no changes)

| Item | Finding |
|---|---|
| Baseline recorded | `seo-baseline.md` |
| Strong performers identified and ring-fenced | Riyadh–Qatar corridor (274 clicks, 33% of site), homepage, `/bahrain-to-dammam-taxi-service`, `/riyadh-to-bahrain-taxi-service`, `/riyadh-to-dubai-taxi-service`, `/ar/riyadh-to-qatar-taxi-service` |
| Emerging opportunities identified | 13 newly ranking pages; the two Arabic newcomers are the strongest signal |
| Technical risks identified | None blocking. Sitemap, canonicals, hreflang and robots all verified correct |
| Query→page map built | Built, and labelled inferred — this export has no query x page cross-table |
| Cannibalisation mapped | 16 multi-page city pairs; 3 real concerns isolated |

---

## Phase 2 — High-impact on-page SEO

### 2.1 Distance family metadata — **IMPLEMENTED**

**Pages:** all 20 `/distance/*`
**Risk: LOW** — 27 clicks across the whole family.

**Reason.** The family holds 34.5% of site impressions (8,469) and converts
0.32%. Seventeen of the twenty pages shared one title template, "X to Y Distance
& Travel Time", and every description promised "distance… travel time" without
ever stating a figure. The queries behind these impressions ask for the figure
explicitly: "bahrain to riyadh distance by road" (89 impressions), "riyadh to
kuwait by road" (85), "how many hours from bahrain to riyadh by car" (23).

**Change.** Title and description now lead with the verified road distance, and
the description adds the drive time. Every figure is copied from the
`roadDistance` / `driveTime` fields already published on that page — verified
programmatically, see the implementation report.

**Expected benefit.** Better query-to-snippet match on about 8,469 impressions
a month. **Not a forecast of clicks** — see the caveat in §9 of the analysis,
where one page that already carried its figures sits at 0.59% CTR and another
at 0.00%.

**Dependencies.** None.

### 2.2 Four specific high-gap pages — **IMPLEMENTED**

| Page | Impr | CTR | Risk | Reason |
|---|---:|---:|---|---|
| /border-crossing | 483 | 2.28% | Low (11 clicks) | Title was 84 chars with the brand, cutting the country list mid-phrase; description 168 |
| /riyadh-alternative-airports | 365 | 1.37% | Low (5 clicks) | Description opened with a vague question and never named the airports the page compares |
| /blog/family-saudi-destinations | 214 | 0.00% | Low (0 clicks) | Ranks 4.6 for "which saudi destinations are best for a first family trip?" with zero clicks; description buried the answer |
| /bahrain-to-dammam-taxi-service | 1,452 | 4.06% | **Medium (59 clicks)** | Description was 169 chars, so its closing line was cut. **Trim only — wording and figures untouched** |

### 2.3 Factual corrections — **IMPLEMENTED**

**Risk: LOW** (0, 0, 6 and 85 impressions). Correct regardless of traffic.

Four domestic Saudi routes advertised cross-border service. All four are
`isCrossBorder: false` in `src/lib/routeData.ts`, so the metadata contradicted
the site's own data and promised paperwork handling for a border the journey
never crosses:

- `/jeddah-to-makkah-guide` — title *and* description
- `/makkah-to-madinah-guide` — description
- `/dammam-airport-to-riyadh-taxi-service` — title said "Border Crossing Made Easy"
- `/dammam-airport-to-khafji-taxi-service` — title *and* description

This is the one item in the plan that is not an optimisation. It is an
unsupported claim being removed.

### 2.4 Arabic — deliberately minimal

**Nothing was changed on `/ar/riyadh-to-qatar-taxi-service`.** It is the 6th
best page on the site (44 clicks, 8.41% CTR). The temptation was to add the
journey duration to its description, because ~50 Arabic impressions ask "كم
ساعة" and get no clicks. I did not, because the page's content *already*
answers it (`travelTime: "6.5 إلى 7.5 ساعات"` plus a "كم تستغرق الرحلة؟" FAQ),
so the gain would be a snippet gamble against a working 8.41% CTR.

What was done instead is internal linking — see 3.1.

---

## Phase 3 — Site-wide content improvements

### 3.1 Arabic internal linking — **IMPLEMENTED**

**Risk: LOW** — additive links only, no content or metadata change.

The Arabic footer is the only cross-link hub inside the Arabic section, and it
listed 7 of 10 Arabic pages. The three it omitted were the three least-visible
Arabic pages (114, 1 and 0 impressions, against 523 and 162 for linked ones),
and `routeDataAr.ts` records that `/ar/qatar-to-riyadh-taxi-service` had never
been linked from anywhere on the site.

All three added, using the reviewed `breadcrumbLabel` strings from
`routeDataAr.ts` rather than new wording. All 7 Arabic route pages now
interlink.

### 3.2 City pages — **DELIBERATELY NOT CHANGED**

17 pages, 3,207 impressions, 2.25% CTR, **weighted position 13.1**.

At position 13, a 2.25% CTR is roughly normal — the site's own 11–21 band runs
1.80%. These pages do not have a CTR problem, they have a **ranking** problem,
and rewriting 17 titles would not move a ranking. Doing so would also mean
re-templating 17 pages on no evidence, which the brief explicitly warns against.

Recommendation: treat as a content-depth project, separately scoped.

### 3.3 Airport pages — **NOT CHANGED, needs a decision**

13 pages, 1,575 impressions, **weighted position 16.0** — the worst of any
family.

| Page | Impr | Clicks | Pos | Inbound links |
|---|---:|---:|---:|---:|
| /riyadh-airport-taxi-service | 305 | **0** | 29.9 | 7 |
| /jeddah-airport-taxi-service | 159 | 1 | 23.7 | 14 |
| /taif-airport-taxi-service | 92 | 1 | 42.7 | 3 |
| /yanbu-airport-taxi-service | 82 | 1 | 11.6 | 3 |

"jeddah airport transfer" ranks 41.9. "ruh terminal 4 pickup" ranks 16.4. These
are high-intent commercial queries where the site is effectively absent. Both
pages already have reasonable internal linking, so this is a content and
authority problem, not a metadata one — and not something a title rewrite fixes.

Recommendation: scope a content project for `/riyadh-airport-taxi-service` and
`/jeddah-airport-taxi-service` specifically. Those two carry 464 impressions
and 1 click between them.

---

## Phase 4 — Technical SEO verification

All verified against rendered HTML and the live site. Results in the
implementation report §Technical verification. Nothing required fixing.

---

## Phase 5 — Regression and QA

Done: TypeScript, production build, ESLint, rendered-HTML metadata check,
canonical check, hreflang reciprocity check, sitemap count, figure-accuracy
cross-check. Results in the implementation report.

---

## Items requiring your approval

None of these were executed.

### A. Create `/distance/riyadh-to-bahrain` (reverse direction)

**Evidence.** Five Riyadh→Bahrain phrasings total **~175 impressions**, all
apparently served by `/distance/bahrain-to-riyadh`: "riyadh to bahrain drive
time" (46), "distance from riyadh to bahrain by road" (44), "riyadh to bahrain
distance by road" (38), "riyadh to bahrain drive" (25), "riyadh to bahrain
distance" (22). There is no reverse-direction distance page.

**Also applies to** "jubail to bahrain distance" (108 impressions, position 5.3)
against `/distance/bahrain-to-jubail`.

**Risk.** Medium. A new page on a corridor where an existing page already draws
3,713 impressions could split signals rather than add to them.

**Recommendation.** Approve the Riyadh→Bahrain one as a test; hold Jubail until
the first is measured. Needs new written content, not a reversed copy.

### B. Create an Arabic Dammam→Bahrain page

**Evidence.** `من الدمام إلى البحرين سيارة` — 17 impressions at position 29 with
no matching Arabic page. Only `/ar/dammam-airport-to-bahrain-taxi-service`
exists, which sells a different product (airport origin, not city).

**Risk.** Low–medium. The Arabic family converts at 6.55% from 11 pages, which
is the best evidence in the report that more Arabic pages pay.

**Recommendation.** Approve, but it needs native Arabic authoring and review —
not a translation of the English page.

### C. Investigate the zero-visibility Umrah corridor

**Evidence.** Six pages covering Jeddah↔Makkah and Makkah↔Madinah, **zero
impressions between them**. Three pages per corridor.

**Risk of acting blind.** High. Consolidating or redirecting on the strength of
"zero impressions" would be guessing at the cause.

**Recommendation.** Before any page change, check GSC's Pages report for these
six URLs and confirm whether they are indexed at all. If they are indexed and
simply not competitive, the fix is content. If they are not indexed, the fix is
technical. **Do not merge or redirect anything until that is known.**

### D. Resolve the "bahrain to dammam" bare query at position 21.6

**Evidence.** 72 impressions, position 21.6, 0 clicks — while
`/bahrain-to-dammam-taxi-service` averages 6.2. Four pages target this pair.

**Recommendation.** One lookup in GSC's query→page view will name the page. No
change until then.

### E. Confirm `/services` should stay `noindex`

Its children earn 3,207 impressions. The hub itself is `noindex` and correctly
excluded from the sitemap. This is probably deliberate, given `/our-services`
and `/locations` both exist and are indexable — but worth a yes/no from you.

### F. Remove 7 dead `layout.tsx` metadata blocks

`/about-us`, `/book-online`, `/checkout`, `/contact-us`, `/faqs`,
`/my-account`, `/pay-online` each define metadata that the sibling `page.tsx`
overrides. No SEO effect; housekeeping only.

### G. Deduplicate `/contact` and `/contact-us`

Identical title and description. `/contact` is `noindex` and out of the
sitemap, so impact is minimal. Lowest priority here.

---

## What was deliberately left alone

| Page | Clicks | CTR | Why untouched |
|---|---:|---:|---|
| /riyadh-to-qatar-taxi-service | 143 | 10.89% | Best page on the site |
| /qatar-to-riyadh-taxi-service | 87 | 9.04% | Second best |
| / (homepage) | 77 | 17.07% | Highest CTR on the site |
| /riyadh-to-bahrain-taxi-service | 52 | 6.28% | Performing; no evidence for change |
| /ar/riyadh-to-qatar-taxi-service | 44 | 8.41% | Best Arabic page — see 2.4 |
| /riyadh-to-dubai-taxi-service | 35 | 7.58% | Performing |
| /dammam-airport-to-qatar-taxi-service | 29 | 5.59% | Performing |
| /blog/bahrain-to-dammam-travel-options | 37 | 3.53% | Title is already question-shaped and compelling; its 3.53% is measured against a *commercial* benchmark that does not fit a comparison article |
| /dammam-to-abu-dhabi-taxi-service | 18 | 6.52% | Performing |

---

## Measurement

Re-pull GSC on or after **2026-12-04** (28 days from the end of the baseline
window) and compare against `seo-baseline.md`.

Read it in this order:

1. **Distance family CTR**, currently 0.32% on 8,469 impressions. This is the
   one number that tests the main hypothesis of this work.
2. **The daily clicks trend.** Clicks fell from 69/day on Oct 12 to 16/day in
   early November on roughly flat impressions. That is unexplained and matters
   more than any change made here.
3. **Arabic family**, currently 6.55% CTR from 11 pages — and specifically
   whether the three newly linked Arabic pages gain impressions.
4. Route family CTR, currently 7.14% — this is the number to protect, not grow.

Expect noise. Four of the pages changed here have fewer than 10 clicks each, so
a month of data will not give a clean read on them individually; judge the
distance family as a block.

No ranking or traffic improvement is promised.
