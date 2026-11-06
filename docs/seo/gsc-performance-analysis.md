# GSC Performance Analysis — Oct 1 to Nov 3, 2026

Source: `docs/Performance2026-11-06.xlsx`, exported 2026-11-06. Search type: Web (text-based).
Analysis date: 2026-11-06.

---

## 1. Report summary

| Metric | Value |
|---|---:|
| Date range | **Oct 1 – Nov 3, 2026** (34 days) |
| Clicks | **831** |
| Impressions | **23,782** |
| Average CTR | **3.49%** |
| Average position | **7.0 – 11.2** depending on the day (GSC reports this per row, not as one site figure) |
| Comparison period in the export | **None** — the file has no comparison columns |

The 831 / 23,782 figures are the Devices and Chart sheets, which agree exactly.
The Pages sheet sums slightly higher (838 clicks / 24,544 impressions) because
GSC's page-level rows and its totals are computed differently; both are quoted
where relevant and neither is wrong.

### The query-level data gap — read this before trusting any keyword claim

The Queries sheet has 676 rows totalling **75 clicks and 4,079 impressions**.
That is **9.0% of clicks and 17.2% of impressions**. GSC withholds the rest
(anonymised/rare queries).

Two consequences, both important:

1. **No keyword conclusion here covers more than a sixth of the site's search
   demand.** Query patterns below are real but partial.
2. **This export has no query x page cross-table.** Queries and Pages are
   separate sheets. Every query-to-page attribution in this document is
   *inferred* from slug and topic, and is labelled as such. Where a query could
   plausibly land on two pages, that is stated rather than guessed.

---

## 2. Baseline metrics

| Dimension | Breakdown |
|---|---|
| **Mobile** | 596 clicks · 16,554 impr · 3.60% CTR · pos 7.9 |
| **Desktop** | 231 clicks · 7,043 impr · 3.28% CTR · pos 9.7 |
| **Tablet** | 4 clicks · 185 impr · 2.16% CTR · pos 7.0 |

Mobile is **72% of clicks and 70% of impressions**. Any change that reads badly
on a phone costs roughly three times what the desktop version costs.

### Top countries

| Country | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| Saudi Arabia | 541 | 11,537 | 4.69% | 8.7 |
| UAE | 46 | 1,423 | 3.23% | 7.6 |
| Bahrain | 36 | 1,431 | 2.52% | 6.8 |
| Qatar | 31 | 993 | 3.12% | 7.3 |
| United Kingdom | 24 | 1,136 | 2.11% | 9.6 |
| Kuwait | 19 | 703 | 2.70% | 6.6 |
| India | 17 | 1,583 | 1.07% | 8.4 |
| United States | 15 | 784 | 1.91% | 8.9 |

Saudi Arabia is 65% of clicks at the best CTR of any major market. India
supplies 1,583 impressions at 1.07% — high volume, low intent, and not worth
optimising for.

---

## 3. Growth against the previous comparable period

The export carries no comparison period, so this uses the earlier report
already in `docs/`. Both windows are 28 days, which makes them comparable:

| | Aug 17 – Sep 13 | Oct 7 – Nov 3 | Change |
|---|---:|---:|---:|
| Clicks | 60 | 792 | **+1,220%** |
| Impressions | 2,993 | 21,537 | **+620%** |

Sources: `docs/gsc-28-day-2026-08-17-to-2026-09-13.xlsx` and
`seo-audit/Performance-2026-11-04.xlsx`.

This is the headline fact about the site: it is not a site with an SEO problem,
it is a site that went from negligible to real traffic in about seven weeks.

### Within-period trend — the one thing to watch

| Date | Clicks | Impressions | CTR |
|---|---:|---:|---:|
| Oct 1 | 0 | 157 | 0.00% |
| Oct 8 | 17 | 434 | 3.92% |
| Oct 11 | 59 | 1,459 | 4.04% |
| **Oct 12** | **69** | 1,478 | 4.67% |
| **Oct 15** | 64 | 734 | **8.72%** |
| Oct 25 | 25 | 808 | 3.09% |
| Nov 1 | 16 | 820 | 1.95% |
| Nov 3 | 16 | 795 | 2.01% |

Impressions stepped up around Oct 8–11 and have since held near 800/day. Clicks
peaked at 69 on Oct 12 and have settled at ~16/day. **Oct 15 and Nov 3 have
almost identical impressions (734 vs 795) and four times different clicks (64
vs 16).**

I cannot explain that from this export. Attributing it needs the per-day
per-page or per-query breakdown that the file does not contain. It is flagged
here as the first thing to check in GSC directly, not diagnosed.

---

## 4. Performance by page family

This is the most useful cut of the data.

| Family | Pages | Clicks | Impressions | CTR | Wtd. position | Share of impressions |
|---|---:|---:|---:|---:|---:|---:|
| **distance** | 13 | 27 | 8,469 | **0.32%** | 7.4 | **34.5%** |
| **route** (commercial) | 23 | 475 | 6,657 | **7.14%** | 6.0 | 27.1% |
| city (`/services/*`) | 17 | 72 | 3,207 | 2.25% | 13.1 | 13.1% |
| airport | 13 | 41 | 1,575 | 2.60% | **16.0** | 6.4% |
| blog | 5 | 37 | 1,297 | 2.85% | 7.1 | 5.3% |
| other | 16 | 29 | 1,256 | 2.31% | 8.8 | 5.1% |
| **arabic** | 9 | 67 | 1,023 | **6.55%** | 7.9 | 4.2% |
| home | 1 | 77 | 451 | 17.07% | 10.7 | 1.8% |
| destination | 20 | 9 | 354 | 2.54% | 8.8 | 1.4% |
| guide | 9 | 4 | 246 | 1.63% | 12.5 | 1.0% |
| **Total** | 127 | 838 | 24,544 | 3.41% | | |

Four things fall out of this table:

1. **The distance family holds a third of all impressions and produces 3.2% of
   the clicks.** 8,469 impressions, 27 clicks.
2. **The commercial route family holds a quarter of impressions and produces
   57% of clicks** at 7.14% CTR. This is the business.
3. **Arabic pages convert as well as English commercial pages** (6.55% vs
   7.14%) from only 11 pages and 4.2% of impressions.
4. **Airport pages rank worst of any family** — weighted position 16.0.

---

## 5. Top-performing pages

| # | Page | Clicks | Impr | CTR | Pos |
|---:|---|---:|---:|---:|---:|
| 1 | /riyadh-to-qatar-taxi-service | 143 | 1,313 | 10.89% | 4.6 |
| 2 | /qatar-to-riyadh-taxi-service | 87 | 962 | 9.04% | 5.7 |
| 3 | / (homepage) | 77 | 451 | 17.07% | 10.7 |
| 4 | /bahrain-to-dammam-taxi-service | 59 | 1,452 | 4.06% | 6.2 |
| 5 | /riyadh-to-bahrain-taxi-service | 52 | 828 | 6.28% | 6.8 |
| 6 | **/ar/riyadh-to-qatar-taxi-service** | 44 | 523 | 8.41% | 7.0 |
| 7 | /blog/bahrain-to-dammam-travel-options | 37 | 1,047 | 3.53% | 6.6 |
| 8 | /riyadh-to-dubai-taxi-service | 35 | 462 | 7.58% | 7.6 |
| 9 | /dammam-airport-to-qatar-taxi-service | 29 | 519 | 5.59% | 6.4 |
| 10 | /services/al-ahsa | 26 | 627 | 4.15% | 8.0 |

The Riyadh–Qatar corridor alone (EN both directions + AR) is **274 clicks, 33%
of the site's total**. It is the single most valuable asset on the site.

---

## 6. Newly ranking pages

Pages absent from Aug 17 – Sep 13 and present in Oct 7 – Nov 3:

| Page | Clicks | Impr | Pos | Note |
|---|---:|---:|---:|---|
| /distance/bahrain-to-riyadh | 14 | 3,494 | 7.1 | **Biggest impression gainer on the site, from zero** |
| /blog/bahrain-to-dammam-travel-options | 34 | 941 | 6.4 | Strong newcomer — 3rd best new page by clicks |
| /ar/riyadh-to-qatar-taxi-service | 40 | 478 | 7.1 | **Best new page by clicks; validates Arabic** |
| /distance/doha-to-riyadh | 0 | 433 | 6.9 | Ranks well, no clicks |
| /riyadh-alternative-airports | 5 | 330 | 7.3 | |
| /distance/dammam-to-kuwait | 0 | 210 | 7.0 | |
| /ar/bahrain-to-dammam-taxi-service | 1 | 151 | 11.9 | Weakest Arabic page |
| /services/dammam | 2 | 128 | 31.3 | Poor position |
| /ar/riyadh-to-bahrain-taxi-service | 9 | 90 | 6.8 | 8.77% CTR in the current period |
| /services/umluj | 0 | 77 | 6.3 | |
| /guides/red-sea-coast-travel | 0 | 75 | 9.9 | |
| /guides/rent-a-car-vs-private-driver | 0 | 59 | 22.9 | |
| /ar/contact-us | 1 | 55 | 5.2 | |

**The two Arabic newcomers are the clearest commercial signal in the report.**
`/ar/riyadh-to-qatar-taxi-service` went 0 → 40 clicks at 8.41% CTR, and
`/ar/riyadh-to-bahrain-taxi-service` reached 8.77% CTR. Arabic pages are not a
translation exercise, they are a channel that converts.

---

## 7. Improving pages

| Page | Clicks | Impressions | Position |
|---|---|---|---|
| /riyadh-to-qatar-taxi-service | 2 → 140 | 20 → 1,223 | 11.5 → **4.5** |
| /qatar-to-riyadh-taxi-service | 2 → 83 | 51 → 910 | 8.1 → 5.8 |
| / (homepage) | 3 → 76 | 66 → 398 | 18.3 → 9.8 |
| /bahrain-to-dammam-taxi-service | 5 → 56 | 348 → 1,339 | 23.0 → **6.0** |
| /riyadh-to-bahrain-taxi-service | 2 → 49 | 88 → 808 | 26.4 → **6.7** |
| /riyadh-to-dubai-taxi-service | 2 → 35 | 19 → 446 | 13.1 → 7.3 |
| /dammam-airport-to-qatar-taxi-service | 1 → 28 | 47 → 493 | 8.6 → 6.4 |
| /services/al-ahsa | 6 → 24 | 126 → 572 | 11.3 → 8.0 |
| /riyadh-to-kuwait-taxi-service | 0 → 17 | 10 → 122 | 13.0 → 5.5 |
| /dammam-to-abu-dhabi-taxi-service | 3 → 18 | 65 → 245 | 9.1 → 4.6 |

---

## 8. Declining pages

Only two pages lost clicks between the comparable periods:

| Page | Clicks | Impressions | Position |
|---|---|---|---|
| /services/dhahran | 7 → 3 | 69 → 165 | 13.0 → 7.5 |
| /services/tabuk | 1 → 0 | 81 → 105 | 27.1 → 8.6 |

**Both improved in position and impressions while losing clicks.** Neither is a
ranking loss and neither needs a rewrite. With 7 and 1 starting clicks, both
are inside normal noise.

Fifteen pages present in the earlier report are absent from the later one, all
with 0 clicks and ≤62 impressions, most at position 68–90 — i.e. they were
never really ranking. Largest: `/destinations/abu-dhabi` (62 impr, pos 75.7)
and `/guides/umrah-transportation` (51 impr, pos 90.4).

---

## 9. High-impression / low-CTR opportunities

Modelled against **this site's own** CTR by position band (commercial pages,
≥30 impressions), not a generic industry curve:

| Position band | Site's own CTR |
|---|---:|
| 4–6 | 9.54% |
| 6–8 | 5.03% |
| 8–11 | 5.24% |
| 11–21 | 1.80% |
| 21+ | 0.53% |

Pages ≥150 impressions below their band:

| Impr | Clicks | CTR | Band CTR | Pos | Modelled gap | Page |
|---:|---:|---:|---:|---:|---:|---|
| 3,713 | 14 | 0.38% | 5.03% | 7.1 | **173** | /distance/bahrain-to-riyadh |
| 1,018 | 6 | 0.59% | 5.03% | 7.5 | 45 | /distance/riyadh-to-kuwait |
| 844 | 2 | 0.24% | 5.03% | 6.7 | 40 | /distance/bahrain-to-jubail |
| 659 | 0 | 0.00% | 5.24% | 8.9 | 35 | /distance/riyadh-to-dubai |
| 466 | 0 | 0.00% | 5.03% | 7.0 | 23 | /distance/doha-to-riyadh |
| 381 | 0 | 0.00% | 5.24% | 8.3 | 20 | /distance/riyadh-to-jeddah |
| 1,047 | 37 | 3.53% | 5.03% | 6.6 | 16 | /blog/bahrain-to-dammam-travel-options |
| 362 | 4 | 1.10% | 5.24% | 10.9 | 15 | /services/khobar |
| 1,452 | 59 | 4.06% | 5.03% | 6.2 | 14 | /bahrain-to-dammam-taxi-service |
| 483 | 11 | 2.28% | 5.03% | 7.8 | 13 | /border-crossing |
| 365 | 5 | 1.37% | 5.03% | 7.2 | 13 | /riyadh-alternative-airports |
| 214 | 0 | 0.00% | 5.24% | 8.7 | 11 | /blog/family-saudi-destinations |

Total across all flagged pages: ~551 modelled clicks, **~400 of them in the
distance family**.

### The honest caveat on that 551

**That number is an upper bound and should not be treated as a forecast.** The
distance family's queries are informational — "bahrain to riyadh distance by
road", "how many hours from bahrain to riyadh by car" — and Google frequently
answers them in the results page itself. A page at position 7 for a question
Google has already answered will never reach the 5.03% that a commercial page
at position 7 reaches.

There is also mixed evidence *inside this dataset*. Two distance pages already
carried their figures in the metadata before this work:

- `/distance/riyadh-to-kuwait` ("Riyadh to Kuwait by Road — Distance & Time"):
  0.59% CTR — nearly double the family average of 0.32%.
- `/distance/dammam-to-kuwait` (description already opened "About 410 km…
  roughly 5–6 hours"): **0.00%** CTR from 264 impressions.

One above average, one at zero. That is not evidence that putting figures in
the snippet raises CTR. It is the reason the distance work was chosen as the
place to act anyway: the family holds 34.5% of impressions and risks only 27
clicks, which makes it the cheapest possible place to test the hypothesis.

---

## 10. Query-to-page mapping

Attribution is **inferred** (see §1). Clicks and impressions are measured.

### Queries with clicks

| Query | Clicks | Impr | CTR | Pos | Inferred landing page |
|---|---:|---:|---:|---:|---|
| gulf trip service | 21 | 30 | 70.0% | 1.1 | / (brand) |
| riyadh to doha taxi | 8 | 64 | 12.5% | 3.4 | /riyadh-to-qatar-taxi-service |
| bahrain to dammam taxi | 6 | 46 | 13.0% | 5.5 | /bahrain-to-dammam-taxi-service |
| taxi from riyadh to doha | 4 | 64 | 6.3% | 3.3 | /riyadh-to-qatar-taxi-service |
| bahrain to saudi taxi | 4 | 40 | 10.0% | 5.5 | /bahrain-to-dammam-taxi-service (uncertain) |
| bahrain to dammam by road | 2 | 50 | 4.0% | 7.7 | blog or distance page (ambiguous) |
| taxi from doha to riyadh | 2 | 35 | 5.7% | 5.4 | /qatar-to-riyadh-taxi-service |
| riyadh to dubai taxi | 2 | 27 | 7.4% | 7.1 | /riyadh-to-dubai-taxi-service |
| bahrain to riyadh by car | 1 | 127 | 0.8% | 7.3 | /distance/bahrain-to-riyadh |
| riyadh to bahrain car service | 1 | 21 | 4.8% | 10.1 | /riyadh-to-bahrain-taxi-service |

Brand search ("gulf trip service", 70% CTR at position 1.1) is healthy.

### Zero-click queries, ≥20 impressions — the informational block

| Query | Impr | Pos | Inferred page |
|---|---:|---:|---|
| bahrain to jubail distance | 148 | 8.4 | /distance/bahrain-to-jubail |
| jubail to bahrain distance | 108 | 5.3 | /distance/bahrain-to-jubail (**reverse direction**) |
| bahrain to riyadh by road | 97 | 8.4 | /distance/bahrain-to-riyadh |
| bahrain to riyadh distance by road | 89 | 7.6 | /distance/bahrain-to-riyadh |
| airport chauffuer service in middle east | 87 | 25.3 | homepage or /airport-transfers |
| riyadh to kuwait by road | 85 | 6.5 | /distance/riyadh-to-kuwait |
| bahrain to dammam | 72 | **21.6** | ambiguous — 3 candidate pages |
| riyadh to kuwait distance by road | 52 | 7.5 | /distance/riyadh-to-kuwait |
| kuwait to riyadh distance by road | 46 | 7.7 | /distance/riyadh-to-kuwait (reverse) |
| riyadh to bahrain drive time | 46 | 8.4 | /distance/bahrain-to-riyadh (reverse) |
| distance from riyadh to bahrain by road | 44 | 9.0 | /distance/bahrain-to-riyadh (reverse) |
| which saudi destinations are best for a first family trip? | 41 | **4.6** | /blog/family-saudi-destinations |
| riyadh to bahrain distance by road | 38 | 7.6 | /distance/bahrain-to-riyadh (reverse) |
| bahrain to riyadh distance | 35 | 5.6 | /distance/bahrain-to-riyadh |
| yanbu airport transfers | 31 | 11.8 | /yanbu-airport-taxi-service |
| rent a car with a driver | 28 | 32.4 | /guides/rent-a-car-vs-private-driver |
| location voiture aeroport taïf | 28 | 83.1 | /taif-airport-taxi-service (**French**) |
| jeddah airport transfer | 25 | **41.9** | /jeddah-airport-taxi-service |
| how far is riyadh airport from dubai | 25 | 9.2 | /riyadh-alternative-airports |
| ruh terminal 4 pickup | 20 | 16.4 | /riyadh-airport-taxi-service or /guides/king-khalid-airport |

Three patterns worth naming:

1. **Reverse-direction queries land on forward-direction pages.** Riyadh→Bahrain
   phrasings ("riyadh to bahrain drive time", "distance from riyadh to bahrain
   by road", "riyadh to bahrain distance by road", "riyadh to bahrain drive",
   "riyadh to bahrain distance") total **~175 impressions**, all apparently
   served by `/distance/bahrain-to-riyadh`. There is no
   `/distance/riyadh-to-bahrain`. Same for "jubail to bahrain distance" (108
   impressions) against `/distance/bahrain-to-jubail`.
2. **Two major commercial airport keywords rank terribly** — "jeddah airport
   transfer" at 41.9 and "ruh terminal 4 pickup" at 16.4. These are high-intent
   queries where the site is nowhere.
3. **There is French demand** for Taif airport car hire (53 impressions across
   two queries) at positions 77–83. Noted, not worth pursuing.

### Arabic queries

63 rows, **2 clicks, 168 impressions**.

| Query | Impr | Pos | English meaning |
|---|---:|---:|---|
| من الدمام إلى البحرين سيارة | 17 | 29.0 | Dammam to Bahrain by car |
| من الرياض لقطر كم ساعة بالسياره | 14 | 27.1 | How many hours Riyadh to Qatar by car |
| كم ساعه من الرياض الى قطر سياره | 11 | 7.3 | How many hours Riyadh to Qatar by car |
| السفر من الرياض إلى البحرين بالسيارة | 10 | 15.2 | Travelling Riyadh to Bahrain by car |
| من الرياض إلى قطر بالسيارة | 8 | 10.6 | Riyadh to Qatar by car |
| كم ساعه من البحرين الى الرياض | 7 | 36.1 | How many hours Bahrain to Riyadh |
| المسافة بين الرياض والبحرين بالسيارة | 3 | **3.7** | Distance Riyadh–Bahrain by car |
| من منفذ سلوى الى الدوحة | 3 | **5.0** | From Salwa crossing to Doha |

**The dominant Arabic query shape is "كم ساعة" — "how many hours".** Roughly 50
impressions across Riyadh→Qatar duration variants alone, with zero clicks.
Those pages already answer it: `riyadhToQatarAr` carries
`travelTime: "6.5 إلى 7.5 ساعات"` and an FAQ "كم تستغرق الرحلة؟". The content
is there; the snippet does not show it and the positions range 7 to 27.

Also notable: **`من الدمام إلى البحرين سيارة` (17 impressions, position 29) has
no matching Arabic page.** Only `/ar/dammam-airport-to-bahrain-taxi-service`
exists, which is an airport-origin product, not a Dammam-city one.

---

## 11. Search intent analysis

| Intent | Evidence | Where it lands | Converts? |
|---|---|---|---|
| **Commercial, directional** ("riyadh to doha taxi", "bahrain to dammam taxi") | 8–13% CTR, positions 3–6 | route pages | **Yes — 7.14%** |
| **Informational distance/duration** ("…distance by road", "how many hours") | ~1,000+ visible impressions, near-zero clicks | distance pages | **No — 0.32%** |
| **Brand** ("gulf trip service") | 21 clicks, 70% CTR | homepage | Yes |
| **Arabic duration** ("كم ساعه…") | ~50 impressions, 0 clicks | Arabic route pages | No |
| **Local/city** ("tabuk", "الدمام") | city pages at pos 13.1 | /services/* | Weakly — 2.25% |
| **Question-shaped** ("which saudi destinations are best for a first family trip?") | 41 impr, pos 4.6, 0 clicks | blog | No |

The commercial and informational intents are cleanly separated and each has its
own page family. That separation is working as designed — Google ranks the
distance page for "distance" queries and the route page for "taxi" queries.
The problem is not confusion, it is that the informational half is five times
the volume and converts at a fiftieth of the rate.

---

## 12. Keyword cannibalisation findings

Checked by grouping every page on the directed city pair its slug targets, then
splitting by language and by whether an endpoint is an airport. 16 groups hold
more than one page.

### Not cannibalisation — working as designed

The distance/route pairing is deliberate (documented in
`src/lib/distanceRouteData.ts`) and the data confirms Google distinguishes them.
Clearest case, Qatar→Riyadh:

| Page | Impr | Clicks | Pos |
|---|---:|---:|---:|
| /qatar-to-riyadh-taxi-service | 962 | 87 | 5.7 |
| /distance/doha-to-riyadh | 466 | 0 | 7.0 |

Both rank; the commercial page takes the clicks. No action needed.

### Real concern 1 — the informational page has displaced the commercial one

Six corridors where the distance page vastly out-impresses the route page that
is meant to earn the money:

| Corridor | Distance page | Commercial page |
|---|---|---|
| Bahrain→Jubail | 844 impr, pos 6.7 | **0 impressions** |
| Bahrain→Riyadh | 3,713 impr, pos 7.1 | 187 impr, pos 7.2 |
| Riyadh→Kuwait | 1,018 impr, pos 7.5 | 127 impr, pos 5.5 |
| Dammam→Dubai | 283 impr, pos 7.7 | 12 impr, pos 5.3 |
| Dammam→Kuwait | 264 impr, pos 7.0 | 36 impr, pos 6.7 |
| Riyadh→Makkah | 186 impr, pos 9.6 | 10 impr, pos 9.7 |

`/bahrain-to-jubail-taxi-service` getting **zero impressions** while its
distance sibling gets 844 is the sharpest example. Note the commercial pages
often rank *better* when they do appear (Riyadh→Kuwait: pos 5.5 vs 7.5) — they
simply appear far less often.

### Real concern 2 — the Umrah corridor has no visibility at all

| Corridor | Pages | Total impressions |
|---|---|---:|
| Jeddah→Makkah | /jeddah-to-makkah-taxi-service, /jeddah-to-makkah-guide, /distance/jeddah-to-makkah | **0** |
| Makkah→Madinah | /makkah-to-madinah-taxi-service, /makkah-to-madinah-guide, /distance/makkah-to-madinah | **0** |
| Makkah→Jeddah | /makkah-to-jeddah-taxi-service | 0 |
| Madinah→Makkah | /madinah-to-makkah-taxi-service | 0 |

**Six pages covering the two core religious-travel corridors, zero impressions
between them.** Three pages per corridor is a textbook cannibalisation setup,
but zero impressions means these pages are not competing with each other for
rankings — they are not competing at all. I cannot tell from this export whether
the cause is indexation, authority, or competition. It needs checking in GSC's
Pages report directly.

The guide pages are genuinely distinct content (they read from content files,
not from `routeData`), so this is not duplicate content.

### Real concern 3 — an ambiguous bare query ranking badly

"bahrain to dammam" — 72 impressions, **position 21.6**, 0 clicks — while
`/bahrain-to-dammam-taxi-service` averages position 6.2 overall. Three English
pages plus one Arabic target this pair. Something is ranking at 21.6 for the
bare query and this export cannot say which page. Needs the query x page view
in GSC.

### Duplicate metadata

| Issue | Pages | Severity |
|---|---|---|
| Identical title *and* description | `/contact` and `/contact-us` | Low — `/contact` is `noindex` |
| Template description reused with city names swapped | 14 pages shared "Reliable X to Y taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service." | Medium — 4 were also factually wrong (see implementation report) |

No two indexable pages share a byte-identical title or description.

---

## 13. Technical findings

Verified by reading the rendered HTML in `.next/server/app/`, the live site, and
the live sitemap — not inferred from source.

| Check | Result |
|---|---|
| Sitemap | 176 URLs, valid XML, 11 Arabic entries |
| `noindex` pages in sitemap | **0** — `/cart`, `/checkout`, `/contact`, `/my-account`, `/pay-online`, `/services`, `/thank-you` all correctly excluded |
| Canonicals | Self-canonical on every page checked, including Arabic |
| Hreflang | Reciprocal and identical on both sides of the EN/AR pairs checked |
| robots.txt | Allows all, disallows `/admin/` and `/api/`, declares the sitemap |
| Titles >60 chars incl. brand | 104 of 169 (see note below) |
| Descriptions >165 chars | 28 of 169 |

Three things that look like defects and are not:

1. **Hreflang renders as `hrefLang` (camelCase)** in the HTML. HTML attribute
   names are case-insensitive, so this parses as `hreflang`. Not a defect — my
   first case-sensitive grep was the error, not the site.
2. **`/destinations/[slug]` and `/hotels/[city]/[hotel]` appear to set
   `noindex`** — that branch is the not-found fallback only. Real destination
   pages are indexable, which GSC confirms (they have impressions).
3. **Titles ending "| Gulf Trip Service | Gulf Trip Service"** in a naive scan.
   `generatePageMetadata` strips a trailing brand variant before appending, so
   no page actually renders a doubled brand.

Two genuine observations, neither changed (both need owner approval):

- **`/services` is `noindex`** while its children earn 3,207 impressions. Likely
  deliberate (there is also `/our-services` and `/locations`), but worth
  confirming.
- **7 `layout.tsx` files define metadata that `page.tsx` overrides** —
  `/about-us`, `/book-online`, `/checkout`, `/contact-us`, `/faqs`,
  `/my-account`, `/pay-online`. Dead code, no SEO effect.

---

## 14. Internal linking

Inbound internal links counted by scanning every `.ts`/`.tsx` for `href`
patterns.

**One correction to make up front:** my first pass reported
`/ar/riyadh-to-bahrain-taxi-service` as having zero inbound links. That was my
scanner's fault — it missed the language switcher, which links Arabic pages via
`bilingualPages.ts` using an `ar:` key rather than `href=`. The page is reachable
from its English twin.

The real gap was narrower and more interesting. The **Arabic footer is the only
cross-link hub inside the Arabic section**, and it listed 7 of the 10 Arabic
pages. The three it omitted:

| Omitted Arabic page | Impressions | Clicks |
|---|---:|---:|
| /ar/riyadh-to-bahrain-taxi-service | 114 | 10 (8.77% CTR) |
| /ar/qatar-to-riyadh-taxi-service | 1 | 0 |
| /ar/riyadh-to-kuwait-taxi-service | **0** | 0 |

Against the footer-linked ones: `/ar/riyadh-to-qatar` 523 impressions,
`/ar/bahrain-to-dammam` 162, `/ar/dammam-airport-to-qatar` 24.

`routeDataAr.ts` documents that `/ar/qatar-to-riyadh-taxi-service` had **no
inbound internal link of any kind** — Google found it by deriving the URL from
the hreflang pair on the opposite direction, and served a 404 before the page
existed. The three least-visible Arabic pages were exactly the three the footer
omitted.

Other near-orphans among pages that do earn impressions:

| Page | Inbound | Impr | Pos |
|---|---:|---:|---:|
| /services/dhahran | 1 | 196 | 8.7 |
| /services/umluj | 1 | 89 | 6.3 |
| 20 `/destinations/*` pages | 1 each | 354 total | 8.8 |
| /quote | 0 literal | 13 | 2.9 |
| /blog/private-vs-rental-car | 0 | 19 | 5.0 |

And two counter-examples that prove links are not the whole story:
`/riyadh-airport-taxi-service` has 7 inbound links and sits at position 29.9;
`/jeddah-airport-taxi-service` has 14 and sits at 23.7. Those are competitive
head terms where internal linking is not the binding constraint.
