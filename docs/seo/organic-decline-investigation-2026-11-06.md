# Organic Click Decline — Root-Cause Investigation

Prepared 2026-11-06. **Investigation only. No SEO changes were made for this.**

Question put to me: clicks fell from 69/day on 12 October to 16/day in early
November on relatively flat impressions. Why?

---

## Summary of findings

1. **The decline is real, but the framing needs two corrections.** 12 October
   and 15 October are outliers, and **early October was worse than now** — the
   month opened at 1.20% CTR and 2.1 clicks/day, against 2.23% and 17.8
   clicks/day in the final week. This is the decay of a two-week spike, not a
   fall below where the month started.
2. **It is overwhelmingly a CTR problem, not an impressions problem.** 87% of
   the fall is attributable to CTR, 26% to impressions.
3. **Average position is ruled out as the cause.** Position *improved* over the
   period (9.89 → 8.44). Two days with the **same** average position and
   similar impressions differ 2.8× in CTR.
4. **It is not a GSC data-freshness artifact.** The slide spans three weeks, not
   the final two or three days.
5. **Mix shift toward the informational distance pages is a genuine contributor
   but cannot be the whole explanation** — the week-by-week pattern it would
   require is implausible.
6. **I cannot tell you which specific pages and queries account for it.** This
   export contains no daily-by-page or daily-by-query breakdown. §6 gives the
   exact four reports to pull that will answer it.

**I have not assumed the metadata changes will solve this.** Nothing in this
investigation supports that, and §5 explains why the 2026-11-06 metadata work
is unrelated to the cause.

---

## 1. The daily series

Source: Chart sheet, `docs/Performance2026-11-06.xlsx` (since removed; figures
reproduced here and in `seo-baseline.md`).

| Date | Clicks | Impr | CTR | Avg pos |
|---|---:|---:|---:|---:|
| Oct 1 | 0 | 157 | 0.00% | 11.2 |
| Oct 2 | 5 | 140 | 3.57% | 16.6 |
| Oct 3 | 1 | 155 | 0.65% | 8.9 |
| Oct 4 | 1 | 173 | 0.58% | 11.8 |
| Oct 5 | 4 | 199 | 2.01% | 13.1 |
| Oct 6 | 4 | 208 | 1.92% | 12.5 |
| Oct 7 | 0 | 220 | 0.00% | 12.7 |
| Oct 8 | 17 | 434 | 3.92% | 8.9 |
| Oct 9 | 16 | 353 | 4.53% | 11.4 |
| Oct 10 | 28 | 784 | 3.57% | 8.2 |
| Oct 11 | 59 | 1,459 | 4.04% | 7.3 |
| **Oct 12** | **69** | 1,478 | 4.67% | 7.0 |
| Oct 13 | 53 | 1,153 | 4.60% | 7.3 |
| Oct 14 | 44 | 892 | 4.93% | 7.2 |
| **Oct 15** | 64 | 734 | **8.72%** | 7.0 |
| Oct 16 | 21 | 605 | 3.47% | 8.6 |
| Oct 17 | 23 | 574 | 4.01% | 8.5 |
| Oct 18 | 38 | 712 | 5.34% | 6.9 |
| Oct 19 | 31 | 759 | 4.08% | 8.0 |
| Oct 20 | 28 | 793 | 3.53% | 11.1 |
| Oct 21 | 24 | 773 | 3.10% | 8.1 |
| Oct 22 | 35 | 1,111 | 3.15% | 9.1 |
| Oct 23 | 33 | 882 | 3.74% | 8.5 |
| Oct 24 | 24 | 901 | 2.66% | 8.2 |
| Oct 25 | 25 | 808 | 3.09% | 7.0 |
| Oct 26 | 23 | 772 | 2.98% | 7.6 |
| Oct 27 | 29 | 900 | 3.22% | 10.4 |
| Oct 28 | 25 | 846 | 2.96% | 7.9 |
| Oct 29 | 23 | 875 | 2.63% | 7.8 |
| Oct 30 | 13 | 742 | 1.75% | 8.2 |
| Oct 31 | 23 | 750 | 3.07% | 7.7 |
| Nov 1 | 16 | 820 | 1.95% | 7.2 |
| Nov 2 | 16 | 825 | 1.94% | 9.3 |
| Nov 3 | 16 | 795 | 2.01% | 10.5 |

### Weekly blocks

| Block | Days | Clicks | Impr | CTR | Wtd pos | Clicks/day | Impr/day |
|---|---:|---:|---:|---:|---:|---:|---:|
| Oct 1–7 | 7 | 15 | 1,252 | **1.20%** | 12.4 | **2.1** | 179 |
| Oct 8–14 | 7 | 286 | 6,553 | 4.36% | 7.7 | **40.9** | 936 |
| Oct 15–21 | 7 | 229 | 4,950 | 4.63% | 8.3 | 32.7 | 707 |
| Oct 22–28 | 7 | 194 | 6,220 | 3.12% | 8.5 | 27.7 | 889 |
| Oct 29–Nov 3 | 6 | 107 | 4,807 | **2.23%** | 8.4 | **17.8** | 801 |

---

## 2. Two corrections to the premise

### 2a. 12 and 15 October are outliers

15 October produced **64 clicks from 734 impressions — 8.72% CTR**. That is the
highest CTR of all 34 days by a wide margin; the second highest is 18 October at
5.34%, and the period mean is ~3.2%. 12 October's 69 clicks is the highest
absolute count, on the second-highest impression day of the month.

Measuring from a single outlier day to a quiet day overstates the fall. On a
weekly basis the decline is **40.9 → 17.8 clicks/day, −56%** — large, but not
the −77% a day-to-day comparison implies.

### 2b. Early October was worse than now

| | Oct 1–7 | Oct 29–Nov 3 |
|---|---:|---:|
| Clicks/day | 2.1 | **17.8** |
| Impressions/day | 179 | **801** |
| CTR | 1.20% | **2.23%** |

The month **opened** at 1.20% CTR. The final week is 2.23% — roughly **1.9×
better**. Clicks per day are 8.5× higher than the first week and impressions
4.5× higher.

So the correct description is: the site stepped up sharply around 8–11 October,
spiked for two weeks, and has settled at a level well above where October began.
It has not declined below any prior baseline. The 60→792 click growth against
Aug 17 – Sep 13 still stands.

That does not make the spike unimportant — 515 clicks arrived in Oct 8–21 and
understanding them matters. But "decline" frames it as something lost, when the
evidence says something temporary was gained.

---

## 3. The fall is CTR, not impressions

Comparing the peak week (Oct 8–14) with the final week (Oct 29–Nov 3), on a
per-day basis:

| | Peak week | Final week | Change |
|---|---:|---:|---:|
| Clicks/day | 40.9 | 17.8 | **−56%** |
| Impressions/day | 936 | 801 | −14% |
| CTR | 4.36% | 2.23% | **−49%** |

Since clicks = impressions × CTR, the −23.0 clicks/day splits exactly:

| Component | Effect on clicks/day | Share |
|---|---:|---:|
| CTR effect (impressions held at peak) | **−20.0** | **87%** |
| Impression effect (CTR held at peak) | −5.9 | 26% |
| Interaction | +2.9 | −13% |
| **Total** | **−23.0** | 100% |

**Impressions are broadly flat from 8 October onward** (936 → 707 → 889 → 801
per day), confirming your read. The clicks went somewhere else.

---

## 4. What is *not* the cause

### 4a. Average position — ruled out

Position **improved** across the period:

| | Mean avg position |
|---|---:|
| First 17 days (Oct 1–17) | 9.89 |
| Last 17 days (Oct 18–Nov 3) | **8.44** |

Correlation between daily average position and daily CTR is weak:
**r = −0.424, r² = 0.179.** Position explains under a fifth of the day-to-day
CTR variance.

The decisive evidence is matched-position days:

| Day | Impressions | Avg position | Clicks | CTR |
|---|---:|---:|---:|---:|
| **Oct 15** | 734 | **7.0** | 64 | **8.72%** |
| **Oct 25** | 808 | **7.0** | 25 | **3.09%** |

Same average position. Similar impressions. **2.8× the CTR.** Whatever changed,
it was not where the site ranked.

Two more pairs showing the same thing:

| Pair | Impressions | Position | CTR |
|---|---:|---:|---:|
| Oct 15 vs Oct 31 | 734 vs 750 | 7.0 vs 7.7 | 8.72% vs 3.07% |
| Oct 15 vs Oct 30 | 734 vs 742 | 7.0 vs 8.2 | 8.72% vs 1.75% |

### 4b. GSC data freshness — ruled out

A reporting-lag artifact would sit only in the last one to three days of the
window.

| Window | Clicks/day |
|---|---:|
| Mid-Oct (Oct 11–17) | 47.6 |
| Prior 7 days (Oct 25–31) | 23.0 |
| Final 3 days (Nov 1–3) | 16.0 |

The decay is monotonic across three weeks. The final three days are only
slightly below the week before them. Not an artifact.

### 4c. The 2026-11-06 metadata changes — cannot be the cause

They were deployed on 6 November, three days **after** this window closed. They
can neither have caused the decline nor be credited with anything in it. They
also cannot be assumed to fix it: they target the distance family's 0.32% CTR,
and §5 shows that family is at most a partial contributor.

---

## 5. Mix shift — a real contributor, but not sufficient

The hypothesis: a large block of high-ranking, near-zero-CTR impressions (the
`/distance/*` family) grew as a share of the total, dragging blended CTR down
without anything actually getting worse.

This is attractive because it is the **only** mechanism that moves average
position and CTR in opposite directions — which is exactly what happened.

Two-block model from period totals:

| Block | Impressions | Clicks | CTR | Wtd position |
|---|---:|---:|---:|---:|
| `/distance/*` | 8,469 | 27 | **0.32%** | 7.4 |
| Everything else | 16,075 | 811 | **5.05%** | — |

For mix alone to produce each week's blended CTR, the distance block would have
to be this share of that week's impressions:

| Week | Blended CTR | Required distance share | Required impr/day |
|---|---:|---:|---:|
| Oct 1–7 | 1.20% | **81.4%** | 146 |
| Oct 8–14 | 4.36% | 14.5% | 136 |
| Oct 15–21 | 4.63% | **8.8%** | **62** |
| Oct 22–28 | 3.12% | 40.7% | 362 |
| Oct 29–Nov 3 | 2.23% | **59.6%** | **477** |

**This is why mix alone does not work.** The pattern required is non-monotonic
and erratic: distance impressions would have to fall to 62/day in Oct 15–21,
then jump **7.7×** to 477/day by the final week, having started at 146/day in a
week when the whole site only drew 179 impressions/day. Newly indexed pages do
not behave that way.

It also requires 7,800 of the 8,469 recorded distance impressions — **92% of
the family's entire volume** — to be allocated to this effect alone.

**Verdict:** mix shift is almost certainly a genuine secondary contributor (the
position/CTR divergence is hard to explain otherwise), but it cannot carry the
whole −49% CTR move. Something else is also at work.

Worth noting for context: excluding the distance family entirely, the rest of
the site ran at **5.05% CTR** across the window. The commercial business is
healthy.

---

## 6. What this export cannot answer, and exactly what to pull

You asked for the decline broken down by landing page, query, country, device
and branded/non-branded.

**The export cannot support that.** Its structure is:

| Sheet | Granularity |
|---|---|
| Chart | daily — clicks, impressions, CTR, position **only** |
| Pages | whole period, no dates |
| Queries | whole period, no dates |
| Countries | whole period, no dates |
| Devices | whole period, no dates |

There is no date × page, date × query, date × country or date × device
cross-tab. Attributing a *time-based* change to a *dimension* requires one.
Anyone claiming otherwise from this file is guessing.

Two further limits:

- **Query data covers 75 of 831 clicks — 9%.** Even a daily query view will
  leave most of the decline unattributed.
- **Branded/non-branded can only be computed for the whole period:** branded
  ("gulf trip"/"gulf trip service") = 22 clicks from 31 impressions at 71.0%
  CTR; non-branded = 53 clicks from 4,048 at 1.31%. Branded is **29.3% of
  visible clicks** but only 0.8% of visible impressions. A collapse in branded
  search would hit clicks hard with almost no impression signature — which fits
  the observed pattern and **cannot be tested from this file.**

### The four reports to export

In GSC → Performance → Search results, set the date range to **Oct 1 – Nov 3,
2026**, then for each:

| # | Report | How | Answers |
|---:|---|---|---|
| 1 | **Pages, compared** | Date tab → *Compare*: Oct 8–21 vs Oct 22–Nov 3. Open **Pages** tab | **Which pages lost the clicks** — this is the single most valuable pull |
| 2 | **Queries, compared** | Same comparison, **Queries** tab | Which queries lost them |
| 3 | **Branded split** | **Queries** tab → filter *Query containing* `gulf trip`, then *Query not containing* `gulf trip`; chart each over time | Whether branded search decayed |
| 4 | **Devices + Countries, compared** | Same comparison, **Devices** and **Countries** tabs | Whether it is mobile-specific or Saudi-specific |

Also worth one manual check that no export will show:

5. **Search the live SERP** for `bahrain to riyadh distance by road`,
   `riyadh to kuwait by road` and `bahrain to jubail distance` and look for an
   **AI Overview or featured snippet** above the results. SERP-feature
   encroachment reduces CTR at unchanged position — precisely the signature
   here — and is invisible in GSC exports.

---

## 7. Ranked hypotheses

Given what the data does and does not support:

| Rank | Hypothesis | Evidence for | Evidence against | How to test |
|---:|---|---|---|---|
| **1** | **A temporary visibility burst on high-CTR commercial pages decayed.** Clicks/day went 2.1 → 40.9 in one week while impressions rose only 5×, so CTR quadrupled — consistent with a batch of commercial pages briefly ranking very highly, then settling | 13 pages newly appeared in this window; `/riyadh-to-qatar-taxi-service` moved from position 11.5 to 4.5; the spike is sharp and symmetric | Period-average positions on those pages stayed strong | Report 1 |
| **2** | **SERP-feature encroachment** (AI Overview / featured snippet) on the informational distance queries | Reduces CTR at unchanged position — the exact observed signature; the distance queries are precisely the type that trigger it | Untestable from the export | Manual check 5 |
| **3** | **Mix shift toward the distance family** | Only mechanism that moves position and CTR in opposite directions, which happened | Requires an implausible non-monotonic ramp (§5) | Report 1, filtered to `/distance/` |
| **4** | **A branded-search drop** | Branded is 29.3% of visible clicks but 0.8% of impressions — a fall would cut clicks with almost no impression signal | No daily branded data | Report 3 |
| **5** | **One or two high-CTR pages lost visibility.** `/riyadh-to-qatar-taxi-service` alone holds 143 of 838 clicks (~4.2/day); the shortfall is 23/day, so a swing on two or three such pages covers all of it | Arithmetically sufficient | Period totals cannot confirm | Report 1 |
| **6** | **Seasonality** | — | Three weeks is short; the window contains no major pilgrimage peak | Year-on-year, once available |

Hypotheses 1, 2 and 3 are not mutually exclusive and the honest expectation is
that the answer is a combination.

---

## 8. Recommendation

**Do not act on this yet.** Report 1 — Pages, Oct 8–21 vs Oct 22–Nov 3 — will
most likely name the cause in a single screen, and everything in §7 is testable
against it.

Specifically, do not treat the 2026-11-06 metadata work as a response to this.
It addresses a different, separately evidenced problem (34.5% of impressions
converting at 0.32%), it went live after this window, and §5 shows the distance
family cannot account for the whole CTR move.

One thing that is already clear and useful regardless of the outcome: **stripping
out the distance family, the rest of the site ran at 5.05% CTR over the window.**
The commercial side of the business is not the thing that weakened.
