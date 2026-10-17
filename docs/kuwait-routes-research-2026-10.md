# Kuwait Routes — Inventory, Keyword Research & Priority Plan

**Date:** 18 October 2026
**Scope:** Phases 1–3 of the Kuwait route brief. Research and audit only — no code changed.
**Status:** Awaiting approval before implementation.

Every claim below is labelled:

| Label | Meaning |
| --- | --- |
| ✅ **VERIFIED** | Read directly from this repo, or from the project's own GSC export. |
| 🔍 **RESEARCH** | From an external source, cited with its date. Treat as an estimate. |
| ⚠️ **NEEDS CONFIRMATION** | The business must confirm before it can be published. |
| 🛑 **DEFECT** | Something currently wrong or misleading on the live site. |

---

## 0. The three things that matter most

Read these before the detail.

### 0.1 🛑 Twelve fabricated customer reviews are live on the six Kuwait pages

`src/lib/routeData.ts` carries two invented testimonials per Kuwait route — named people, stated occupations, specific praise. Examples:

> "Waleed H. · Delegation Member, Kuwait City — Arranged a three-car convoy for our group…"
> "Mansour A. · KJO Contractor, Khafji — Cross this border every few weeks for work…"

These were previously confirmed as placeholder data, not real customers. They render publicly in a "What travellers say" section on all six pages.

The brief's own ground rule is "No fake reviews, invented badges or unsupported service claims." **This should be removed before any work that drives more traffic to these pages**, independent of everything else in this document. Twelve of them, on six pages, is a pattern a reviewer would read as deliberate.

**Recommendation:** delete the `reviews` array from all six Kuwait routes now. Reinstate per-route when real, attributable reviews exist. (The same issue likely affects the other ~30 route pages — worth a separate sweep.)

### 0.2 ✅ The brief's flagship page is the *lowest*-demand page of the six

The brief names Kuwait → Riyadh as the reference implementation. The project's own GSC data says that corridor currently has the least search demand of any Kuwait route on the site:

| Page | Clicks | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| `/khafji-to-kuwait-taxi-service` | 8 | **298** | 2.68% | 6.36 |
| `/kuwait-to-khafji-taxi-service` | 1 | 85 | 1.18% | **4.74** |
| `/kuwait-to-riyadh-taxi-service` | 4 | 49 | 8.16% | 5.90 |
| `/riyadh-to-kuwait-taxi-service` | 5 | 31 | **16.13%** | 6.97 |
| `/kuwait-to-dammam-taxi-service` | 2 | 23 | 8.70% | 5.30 |
| `/dammam-to-kuwait-taxi-service` | 1 | 22 | 4.55% | 13.50 |
| `/distance/riyadh-to-kuwait` | 0 | **286** | **0%** | 8.47 |
| `/distance/dammam-to-kuwait` | 0 | **128** | **0%** | 8.20 |

*Source: `docs/seo-action-plan-2026-10.md`, GSC 28 days to 12 Oct 2026. Cross-checked against `docs/gsc-28-day-2026-08-17-to-2026-09-13.xlsx`, which shows the same shape a month earlier.*

This does **not** mean skip Kuwait → Riyadh. It means set expectations correctly:

- Kuwait ↔ Riyadh is where the **confirmed 300 KWD price** exists, so it is the right page to build and prove the new template on. Both directions already convert well (8.16% and 16.13% CTR) — they are *starved of impressions*, not failing.
- The **first measurable traffic wins will come from Khafji and the two distance pages**, which between them hold 797 impressions converting at or near zero.

### 0.3 ⚠️ The confirmed fleet contradicts what the site currently says

The business confirms **two** vehicles: Toyota Land Cruiser Prado and GMC Yukon.

- ✅ `GMC Yukon` exists in `src/lib/fleetVehicles.ts` — 6 passengers, 6 bags, photo at `/fleet/gmc-yukon-at4.avif`.
- 🛑 **`Toyota Land Cruiser Prado` does not exist anywhere in the fleet data.** The only mention is a tier label in `fleetConfig.ts` ("Toyota Land Cruiser / Prado"). There is **no Prado photo** in `public/fleet/`.
- 🛑 The six Kuwait route pages currently advertise **Sedan / SUV / Van** (and "Executive Sedan" on the Riyadh pair) with capacities like "6–10 passengers" — vehicles the business has not confirmed are available.
- 🛑 `fleetVehicles.ts` lists **16 vehicles** including Mercedes S-Class, BMW 7 Series, Cadillac Escalade and a 22-seat Coaster, all presented site-wide as bookable.

This is the largest trust gap in the project. See §6.

---

## 1. Route inventory ✅

### 1.1 Commercial route pages — six, three corridors, both directions

All six render through one component (`src/components/RoutePage.tsx`) from one data file (`src/lib/routeData.ts`). The reusable architecture the brief asks for **already exists** — it needs extending, not building.

| URL | Origin → Dest | Distance (stored) | Time (stored) | Border named | Priority | `reviewed` |
| --- | --- | --- | --- | --- | :-: | :-: |
| `/kuwait-to-riyadh-taxi-service` | Kuwait → Riyadh | ~639 km (inland crossing) | "Most of a day" | Saudi–Kuwait Land Border | 2 | unset |
| `/riyadh-to-kuwait-taxi-service` | Riyadh → Kuwait | ~639 km (inland crossing) | "Most of a day" | Saudi–Kuwait Land Border | 2 | **false** |
| `/kuwait-to-dammam-taxi-service` | Kuwait → Dammam | ~530 km 🛑 | 5.5–6.5 h | Al Nuwaiseeb / Khafji | 2 | unset |
| `/dammam-to-kuwait-taxi-service` | Dammam → Kuwait | ~530 km 🛑 | 5.5–6.5 h | Al Khafji / Al Nuwaiseeb | 2 | unset |
| `/kuwait-to-khafji-taxi-service` | Kuwait → Khafji | ~180 km | 2.5–3 h | Al Nuwaiseeb / Al Khafji | 2 | **false** |
| `/khafji-to-kuwait-taxi-service` | Khafji → Kuwait | ~15 km to border / ~180 km to Kuwait City | 2.5–3 h | Al Khafji / Al Nuwaiseeb | 2 | unset |

**Both directions exist for every corridor.** The gap analysis in `docs/page-gap-analysis.md` listing Kuwait↔Riyadh and Khafji↔Kuwait as "one-directional gaps" is **out of date** — the reverse pages were since built.

### 1.2 Supporting pages

| URL | Role | GSC impressions |
| --- | --- | ---: |
| `/distance/riyadh-to-kuwait` | Informational | 286 (0 clicks) |
| `/distance/dammam-to-kuwait` | Informational | 128 (0 clicks) |
| `/distance/khafji-to-kuwait` | Informational | — |
| `/destinations/kuwait-city` | Destination landing | 3 |
| `/border-crossing` | Hub | — |
| `/ar/riyadh-to-kuwait-taxi-service` | Arabic — **only Kuwait page in Arabic** | — |

### 1.3 🛑 Defects found in the audit

| # | Defect | Where | Impact |
| --- | --- | --- | --- |
| D1 | 12 fabricated reviews | `routeData.ts`, 6 routes | Trust / policy |
| D2 | **Dammam–Kuwait distance overstated ~25%** — stored as ~530 km; real road distance is ~395–425 km 🔍 | `routeData.ts` ×2 | Factual error. Also contradicts the site's *own* Khafji figures (180 km + ~180 km ≈ 360 km, not 530). |
| D3 | **WhatsApp CTA sends no message.** `waLink` is imported into `RoutePage.tsx` and never used; the only CTA is a bare `WHATSAPP_URL`. Every route opens an empty chat. | `RoutePage.tsx:830` | Direct conversion loss. The brief's §2 requirement is entirely unimplemented. |
| D4 | **4 of 6 meta descriptions are one template with the city names swapped** — "Reliable {X} to {Y} taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service." | 4 `page.tsx` files | The brief explicitly forbids this. |
| D5 | **"Fixed rates" is claimed in the closing CTA of every route page, with no price anywhere on the site.** | `RoutePage.tsx:821` | Unsupported claim + a conversion gap. |
| D6 | Closing CTA paragraph is hardcoded English — it renders untranslated on `/ar/riyadh-to-kuwait-taxi-service`. | `RoutePage.tsx:821` | Arabic quality bug. |
| D7 | Vehicle options are generic tiers, not the confirmed fleet | `routeData.ts`, 6 routes | See §0.3 |
| D8 | `/kuwait-to-riyadh-taxi-service` has **no `hreflangPath`** while its reverse does | `page.tsx` | Minor i18n inconsistency |
| D9 | Travel time on the Riyadh pair is "Most of a day" | `routeData.ts` ×2 | A searcher asking "how long" gets a non-answer. Competitors say "7–8 hours". |
| D10 | `/dammam-to-kuwait-taxi-service` title uses a "→" arrow | `page.tsx` | Renders unpredictably in SERPs |

---

## 2. Keyword research

### 2.1 ⚠️ Stated limitation

**No keyword volume or difficulty tool was available for this work.** No search volumes, KD scores or traffic estimates appear in this document, and none should be inferred. What follows is built from:

1. ✅ The project's own Google Search Console exports (real impressions, clicks, CTR, position).
2. 🔍 Live SERP inspection, October 2026.
3. 🔍 The competitor page supplied in the brief.

If volume data is wanted, an Ahrefs/Semrush/Keyword Planner export for the listed terms would slot straight into §2.3.

### 2.2 ✅ What the site actually ranks for today

Every Kuwait-related query in the GSC export, 28 days to 13 Sep 2026:

| Query | Impr | Clicks | Position | Intent |
| --- | ---: | ---: | ---: | --- |
| `khafji to kuwait distance` | 6 | 0 | 8.00 | Informational |
| `khafji to kuwait border distance` | 4 | 0 | 5.75 | Informational |
| `kuwait to khafji` | 4 | 0 | 6.00 | Mixed |
| `khafji to dammam` | 4 | 0 | 10.00 | Mixed |
| `khafji to kuwait` | 3 | 0 | 7.67 | Mixed |
| `khafji kuwait` | 3 | 0 | 23.67 | Mixed |
| `khafji border kuwait` | 2 | 0 | 6.00 | Informational |
| `khafji border` | 2 | 0 | 8.50 | Informational |
| `dammam to khafji` | 1 | 0 | 8.00 | Mixed |

And from the later export (to 12 Oct), the Riyadh corridor:

| Query | Impr | Clicks | Position | Intent |
| --- | ---: | ---: | ---: | --- |
| `riyadh to kuwait by road` | 26 | 0 | 8.81 | Informational |
| `riyadh to kuwait distance by road` | 13 | 0 | 8.85 | Informational |
| `saudi to kuwait distance by road` | 7 | 0 | 9.71 | Informational |
| `kuwait to riyadh distance by road` | 4 | 0 | 10.50 | Informational |
| `riyadh to kuwait city` | 2 | 0 | 41.50 | Mixed |
| `kuwait to riyadh by car` | 1 | 0 | 10.00 | Mixed |
| `kuwait to riyadh by road` | 1 | 0 | 40.00 | Mixed |

**Two findings from this, both important:**

1. **Every logged Kuwait query is informational or mixed intent. Not one is commercial.** `kuwait to riyadh taxi`, `riyadh to kuwait taxi`, `taxi kuwait to saudi`, and every price phrasing are completely absent from the export. The site is invisible for the phrasings that produce bookings.

2. **The commercial demand is real and this site can win it — the Bahrain corridor proves it.** Same site, same cross-border service, commercial phrasings:

   | Query | Impr | Clicks | CTR | Position |
   | --- | ---: | ---: | ---: | ---: |
   | `bahrain to saudi taxi` | 23 | 4 | **17.39%** | 11.26 |
   | `taxi service from bahrain to dammam` | 11 | 1 | 9.09% | 3.36 |
   | `bahrain to dammam taxi` | 29 | 1 | 3.45% | 7.41 |

   Bahrain earns commercial impressions; Kuwait earns none. The difference is what the Kuwait pages say, not whether the demand exists.

### 2.3 Keyword → URL map

Primary intent, one per page. Terms marked 🔍 are SERP-observed phrasings with **no volume data** — they are targets to earn, not measured demand.

#### `/kuwait-to-riyadh-taxi-service`

| Field | Value |
| --- | --- |
| **Primary keyword** | `kuwait to riyadh taxi` 🔍 |
| **Intent** | Transactional |
| **Secondary** | `kuwait to riyadh private car`, `kuwait to riyadh transfer`, `taxi kuwait to saudi arabia`, `kuwait to riyadh by car` ✅ (1 impr, pos 10.0) |
| **Mixed-intent to capture** | `kuwait to riyadh distance by road` ✅ (4 impr, pos 10.5), `kuwait to riyadh by road` ✅ (1 impr, pos 40) |
| **Entities** | Al Nuwaiseeb, Al Khafji, Al Ruqi'i, Al Salmi, GCC ID, Saudi e-visa, Manafith insurance, KWD |
| **Current GSC** | 4 clicks / 49 impr / 8.16% / pos 5.90 |
| **Competing URLs** | `taxiserviceksa.com/routes/kuwait-riyadh/`, `daytrip.com/en/transfers/kuwait-city-kw/riyadh-sa`, `rome2rio.com/s/Riyadh/Kuwait-Country` |
| **Content gaps** | No price. No stated hours. No vehicle named. No travel checklist. Generic vehicle tiers. No prefilled WhatsApp. |
| **Recommended title** | `Kuwait to Riyadh Taxi — Private Transfer from 300 KWD` ⚠️ *(price pending confirmation)* |
| **Recommended H1** | `Private Taxi from Kuwait to Riyadh` |
| **Internal links in** | `/distance/riyadh-to-kuwait`, `/border-crossing`, `/destinations/kuwait-city`, `/services/riyadh` |
| **Verdict** | **Improve — reference implementation** |

#### `/riyadh-to-kuwait-taxi-service`

| Field | Value |
| --- | --- |
| **Primary keyword** | `riyadh to kuwait taxi` 🔍 |
| **Intent** | Transactional |
| **Secondary** | `riyadh to kuwait by road` ✅ (26 impr — the single biggest logged Kuwait query), `riyadh to kuwait distance by road` ✅ (13), `riyadh to kuwait city` ✅ (2) |
| **Current GSC** | 5 clicks / 31 impr / **16.13%** / pos 6.97 — **the best CTR on the entire site** |
| **Content gaps** | Same as above, plus `reviewed: false` |
| **Recommended title** | ⛔ **Do not change.** 16.13% at position 6.97 is the site's best result. Change the body, leave the title and meta alone. |
| **Recommended H1** | `Private Taxi from Riyadh to Kuwait` (current H1 is fine; low-risk change only) |
| **Verdict** | **Improve body only — protect the title** |

#### `/khafji-to-kuwait-taxi-service`

| Field | Value |
| --- | --- |
| **Primary keyword** | `khafji to kuwait` ✅ (3 impr, pos 7.67) |
| **Intent** | Mixed — the surrounding queries are distance/border informational |
| **Secondary** | `khafji to kuwait distance` ✅ (6), `khafji to kuwait border distance` ✅ (4), `khafji border kuwait` ✅ (2), `khafji border` ✅ (2) |
| **Current GSC** | 8 clicks / **298 impr** / 2.68% / pos 6.36 — **the most-seen Kuwait page** |
| **Content gaps** | CTR is low for position 6.36. The page answers "taxi"; the queries ask "distance" and "border". |
| **Recommended title** | `Khafji to Kuwait — Border Crossing, Distance & Private Taxi` |
| **Verdict** | **Improve — highest real traffic, best quick win** |

#### `/kuwait-to-khafji-taxi-service`

| Field | Value |
| --- | --- |
| **Primary keyword** | `kuwait to khafji` ✅ (4 impr, pos 6.00) |
| **Current GSC** | 1 click / 85 impr / 1.18% / **pos 4.74** |
| **Diagnosis** | Position 4.74 with 1.18% CTR is a **snippet problem, not a ranking problem.** Highest-leverage title/meta rewrite of the six. |
| **Recommended title** | `Kuwait to Khafji Taxi — Al Nuwaiseeb Border Crossing` |
| **Verdict** | **Improve — CTR-focused** |

#### `/kuwait-to-dammam-taxi-service` · `/dammam-to-kuwait-taxi-service`

| Field | Value |
| --- | --- |
| **Primary keywords** | `kuwait to dammam taxi` 🔍 · `dammam to kuwait taxi` 🔍 |
| **Secondary** | `dammam to khafji` ✅ (1 impr), `khafji to dammam` ✅ (4 impr) — both currently landing on the Khafji airport pages |
| **Current GSC** | 2 clicks / 23 impr / 8.70% / pos 5.30 · 1 click / 22 impr / 4.55% / pos 13.50 |
| **Content gaps** | 🛑 **Distance is wrong (D2).** No price. Generic vehicles. |
| **Recommended titles** | `Kuwait to Dammam Taxi — Private Cross-Border Transfer` · `Dammam to Kuwait Taxi — Private Cross-Border Transfer` (drop the "→" arrow) |
| **Verdict** | **Improve — fix the distance first** |

### 2.4 Research candidates NOT recommended

The brief lists Kuwait ↔ Jeddah / Makkah / Madinah as candidates.

| Candidate | Verdict | Reason |
| --- | --- | --- |
| Kuwait ↔ Makkah | ⚠️ **Do not create yet** | 🔍 >1,200 km, a genuine multi-day drive. No GSC demand. No confirmed service. No price. Would be a thin doorway page. |
| Kuwait ↔ Jeddah | ⚠️ **Do not create yet** | 🔍 ~1,400 km. Same reasoning. Flying dominates this corridor. |
| Kuwait ↔ Madinah | ⚠️ **Do not create yet** | Same. |
| Kuwait ↔ Khobar/Dhahran | 🔍 **Worth investigating later** | Rome2Rio shows Khobar–Kuwait at ~4 h; it is a shorter, more plausible corridor than Dammam. Needs demand evidence first. |

**Recommendation: create no new Kuwait route pages in this phase.** All six corridors that matter already exist and all six are under-built. Adding pages before fixing the existing ones would multiply the problems in §1.3, not solve them.

---

## 3. Competitor research 🔍

### 3.1 `taxiserviceksa.com/routes/kuwait-riyadh/` — the brief's reference

*Inspected 18 Oct 2026.*

**What it does well, and we should match:**

- States a **price in the hero** ("300 KD per SUV") alongside Licensed Drivers and 24/7 badges.
- States **distance and duration concretely**: "~650 km via Nuwaiseeb Border", "approximately 7-8 hours, depending on traffic and border processing" — properly hedged, but an actual answer.
- A **"Your trip at a glance"** row: Route, Duration, Distance, Border, Transfer type, Availability.
- A **"What Can Change Your Fare?"** section — genuinely useful, and pre-empts the top objection.
- A **Kuwait–Saudi travel checklist** (passport, Iqama, visa, vehicle documentation, luggage).
- Explicit **cancellation policy**, **prohibited items**, **one-way vs return**.
- Named **pickup areas in Kuwait** and **drop-off areas in Riyadh**.
- States passengers remain responsible for their own passport, visa and immigration — honest framing we should copy in substance.

**Where it is weak, and we can beat it:**

| Weakness | Our opportunity |
| --- | --- |
| **Self-contradictory**: the price table says the route "runs with a private SUV only", while "Choose Your Ride" lists six vehicles including a 14-seat Sprinter. | One authoritative pricing source; two vehicles; no contradiction. |
| **"Verified Reviews" badge over a section that renders "Loading reviews…"** — no reviews actually display. | Show no review section at all until we have real ones. Honest beats broken. |
| Claims the crossing "operates around the clock every day of the year" — an absolute claim about a government facility. | Say it is generally 24/7 🔍 and that processing time varies. |
| Cites "80-150 KD per person" for flights with no source. | Either source a comparison or omit it. |
| Luggage guidance is vague: "2 Large suitcases per person in SUV as a general guide." | State per-vehicle capacity, once confirmed. |

**Their stated capacities** (🔍 their claims, unverified by us): Toyota Camry 4 pax/2 bags · GMC Yukon XL/Denali 7/5 · Cadillac Escalade 7/4 · Mercedes S-Class 3/2 · Hyundai Staria VIP 7/4 · Mercedes Sprinter 14/4.

⚠️ Note their GMC Yukon is listed at **7 passengers**; our `fleetVehicles.ts` says **6**. Ours is likelier correct for a standard Yukon (the XL/Denali trim seats more). **Do not copy their number.**

### 3.2 The wider SERP 🔍

Searching `kuwait to riyadh taxi private car transfer` and `riyadh to kuwait taxi service by road` in October 2026, the results are dominated by **aggregators, not operators**:

- `daytrip.com` — private transfers, Kuwait City ↔ Riyadh, "from US$102 per person", 636 km / ~6 h 50 m
- `rome2rio.com` — route planner, 628.5 km / ~8 h 11 m
- `cleartrip.com` — 711.5 km / ~8 h 47 m
- Flight comparison sites (wingie, kupi, avionero)

**The single clearest opportunity in this research:** no operator in the organic results publishes a transparent, confirmed cross-border fare. Every result either omits price or says "ask the operator". One search for a cross-border price returned, verbatim, *"you would need to ask a Kuwaiti or Saudi transfer company directly, since prices are usually negotiated."*

A page that answers the price question plainly, with what is and is not included, is differentiated against the entire first page of results.

### 3.3 🔍 Distance and duration — independent sources

| Corridor | Sources | Consensus | Site currently says |
| --- | --- | --- | --- |
| Kuwait ↔ Riyadh | Rome2Rio 628.5 km/8h11 · Daytrip 636 km/6h50 · AirMiles 714.8 km/7h39 · Cleartrip 711.5 km/8h47 · competitor ~650 km/7–8 h | **~630–715 km, 7–9 h driving** before the border | ~639 km ✅ in range; **"Most of a day"** 🛑 too vague |
| Dammam ↔ Kuwait | Rome2Rio 424.8 km/4h08 · Cleartrip 409 km/4h53 · AirMiles 395 km/4h20 | **~395–425 km, ~4–5 h** before the border | **~530 km / 5.5–6.5 h** 🛑 **overstated** |
| Khafji ↔ Kuwait City | — | — | ~180 km / 2.5–3 h — consistent with the above |

### 3.4 🔍 Border facts — verified externally

| Claim | Status | Source |
| --- | --- | --- |
| Nuwaiseeb and Salmi crossings operate 24/7 | 🔍 Supported | Netherlands government travel advisory (~7 months old) |
| Third-party vehicle insurance is **mandatory** for foreign vehicles entering Saudi Arabia; buy at the border or online via **Manafith** | 🔍 Supported | Border guide + government advisory |
| Kuwait also requires third-party insurance, sold at kiosks in the border complex | 🔍 Supported | Border crossing guide |
| Non-GCC nationals need a Saudi e-visa; Kuwait offers e-visa or visa on arrival | 🔍 Supported | Government advisory |
| GCC nationals cross on national ID | 🔍 Supported | Multiple |
| Saudi TGA added Khafji → Dammam airport bus routes (12 daily trips) in April 2026 | 🔍 Confirmed | Saudi Press Agency |
| **Passengers never need to leave the vehicle** | ⚠️ **NOT verifiable externally** | — |

⚠️ **On the last point:** the business confirms "no requirement for passengers to walk across the border", and that is what we will say. But no external source confirms passengers can remain seated through immigration, and the brief itself warns against implying a bypass of mandatory checks. **Proposed wording:**

> "You stay with the same vehicle and the same driver for the whole journey — there is no walking across the border and no changing cars. Passengers still present their own passports and complete immigration at the crossing; your driver handles the vehicle paperwork, insurance and tolls."

That is honest, keeps the benefit, and cannot be read as promising a skipped checkpoint.

---

## 4. Prioritised plan

Ordered by **evidence of return**, not by page importance.

### P0 — Do before anything else (trust)

| # | Action | Effort | Why first |
| --- | --- | --- | --- |
| **P0-1** | Delete the 12 fabricated reviews from the six Kuwait routes | 10 min | §0.1. Non-negotiable. |
| **P0-2** | Fix the Dammam–Kuwait distance (~530 → ~400 km) and drive time | 15 min | §1.3 D2. A plain factual error, currently live. |
| **P0-3** | Remove or substantiate "Fixed rates" in the closing CTA | 10 min | D5. Becomes true for Kuwait↔Riyadh once the price ships. |

### P1 — Reference implementation: Kuwait ↔ Riyadh

| # | Action | Evidence |
| --- | --- | --- |
| **P1-1** | **Prefilled, route-aware WhatsApp CTA**, high on the page | D3 — currently sends an empty chat. Likely the single largest conversion gain available. |
| **P1-2** | **Publish the 300 KWD starting price** on Kuwait → Riyadh with full inclusions | §3.2 — no competitor in the SERP does this. ⚠️ pending §6. |
| **P1-3** | **Two-vehicle comparison** (Prado + Yukon) replacing the generic tiers | §0.3. ⚠️ pending Prado data + photo. |
| **P1-4** | **"Journey at a glance"** strip + state the duration as **7–9 hours** instead of "most of a day" | D9; §3.3 |
| **P1-5** | **Travel checklist** and **what's included**, per §7 of the brief | Competitor has both; we have neither |
| **P1-6** | **FAQs rewritten to the real GSC query phrasings** ("by road", "how long", "which border") | §2.2 — captures the informational demand on the commercial page |
| **P1-7** | Add `hreflangPath` to `/kuwait-to-riyadh-taxi-service` | D8 |

### P2 — Highest actual traffic: the Khafji corridor + distance pages

| # | Action | Evidence |
| --- | --- | --- |
| **P2-1** | Title/meta rewrite on `/kuwait-to-khafji-taxi-service` | Position **4.74**, CTR **1.18%** — a snippet problem on an already-ranking page. Best effort:return ratio in this document. |
| **P2-2** | Title/meta rewrite on `/khafji-to-kuwait-taxi-service` + answer the distance/border queries on-page | 298 impressions, 2.68% CTR |
| **P2-3** | Title rewrite on `/distance/riyadh-to-kuwait` (286 impr, **0%** CTR) | Already specified in `seo-action-plan-2026-10.md` §P1-B. Do it as part of this work. |
| **P2-4** | Same for `/distance/dammam-to-kuwait` (128 impr, 0% CTR) | — |
| **P2-5** | Fix the 4 duplicate meta descriptions | D4 |

### P3 — Roll the template across the remaining routes

Apply the validated structure to Kuwait↔Dammam and Kuwait↔Khafji, with **"Request a Quote"** instead of a price until per-route fares are confirmed.

### P4 — Not now

- No new Kuwait route pages (§2.4).
- No URL changes, no redirects. Every slug stays.
- Arabic versions of the other five Kuwait pages — worth doing, but after the English template is validated.

---

## 5. Proposed route-page structure

Extending the existing `RouteData` type and `RoutePage.tsx` — **not a new component**. New fields are all optional, so the other ~30 routes are untouched and render exactly as they do now.

```
1  Hero — H1, subtitle, route tags (distance · duration · border)
2  WhatsApp CTA        ← NEW, route-aware prefilled message
3  Journey at a glance ← NEW, from existing route data
4  Booking form        ← existing QuickBookForm, unchanged
5  Route overview      ← existing
6  Vehicle comparison  ← REPLACES generic tiers: Prado + Yukon
7  Pricing table       ← NEW: vehicle | capacity | from-price | CTA
8  What's included     ← extend existing, per-route inclusions
9  How the journey works ← existing 5-step
10 Border process      ← existing (cross-border only)
11 Travel checklist    ← NEW (cross-border only)
12 Route details       ← existing pickup/drop-off
13 FAQs                ← existing, rewritten to GSC phrasings
14 Final CTA           ← route + vehicle carried into WhatsApp
```

Proposed new optional fields on `RouteData`:

```ts
pricing?: {
  currency: "KWD" | "SAR";
  basis: "starting" | "fixed";
  direction: "one-way" | "return";
  perVehicle: { vehicleSlug: string; amount: number | null }[];  // null → "Request a Quote"
  includes: string[];
  excludes: string[];
  confirmedOn: string;      // so a stale price is visible as stale
}
vehicleSlugs?: string[];    // FLEET_VEHICLES slugs — one source of truth
checklist?: { title: string; detail: string }[];
durationHours?: string;     // "7–9 hours" — replaces vague travelTime
```

Pricing lives in **one** place and feeds the pricing table, the vehicle cards, the WhatsApp messages, the FAQ answer and the metadata. That satisfies the brief's "single authoritative source" requirement structurally rather than by discipline.

---

## 6. ⚠️ Needs business confirmation before implementation

**These block P1-2 and P1-3. Everything else can proceed without them.**

### 6.1 Pricing

| Question | Why it matters |
| --- | --- |
| **Is 300 KWD one-way or return?** | The competitor sells 300 KD as one-way. Publishing the wrong basis is a refund dispute. |
| **Does 300 KWD apply to both Prado and Yukon, or Yukon only?** | The brief says show it on both *if* confirmed. Not yet confirmed. |
| **Does it apply to Riyadh → Kuwait as well as Kuwait → Riyadh?** | Reverse-direction pricing is often different. |
| **What exactly is included?** Border fees, vehicle insurance, tolls, fuel, waiting time, rest stops | "No hidden fees" requires us to list them. |
| **What is excluded?** Extra stops, overnight waits, luggage beyond capacity | Must be disclosed per the brief. |
| **Is there a waiting-time charge beyond a threshold?** | Competitor discloses this; we should. |
| **Cancellation policy?** | Competitor publishes one. |

⚠️ **Note a conflict in the brief itself:** the original text cited "Starting from SAR 3,000" *and* "300 KWD". These are not the same number — 300 KWD ≈ **3,650 SAR** (competitor's own conversion). Your latest instruction resolves this to 300 KWD, which I will use. **If "SAR 3,000" appears anywhere else in your materials, it should be corrected to avoid two prices circulating.**

### 6.2 Vehicles

| Question | Why |
| --- | --- |
| **Toyota Land Cruiser Prado — passenger and luggage capacity?** | Not in the fleet data at all. Will not be invented. Depends on the actual seating configuration. |
| **A Prado photo** | `public/fleet/` has none. Until supplied, a clearly-labelled placeholder is used. |
| **GMC Yukon — confirm 6 passengers / 6 bags** | That is what `fleetVehicles.ts` says; the competitor claims 7. Ours should be verified against the actual vehicle. |
| **Are Prado and Yukon the only two vehicles for *all* Kuwait routes, or only Kuwait↔Riyadh?** | Determines whether the other five pages also drop to two vehicles. |
| **The other 14 vehicles in `fleetVehicles.ts`** (S-Class, BMW 7, Escalade, Sprinter, 22-seat Coaster…) — still offered site-wide? | If only two vehicles exist, the Fleet page is overstating the fleet. Bigger than this brief, but it follows from the same instruction. |

### 6.3 Service claims

| Question | Why |
| --- | --- |
| **Is WhatsApp support genuinely 24/7?** | "24/7" appears on every route page already. Only claim it if it is true. |
| **Are drivers licensed for *both* Kuwaiti and Saudi operation on these routes?** | "Licensed driver" is confirmed; the cross-border scope is what should be stated precisely. |
| **Do the same two vehicles operate the Khafji and Dammam corridors?** | Determines P3. |

---

## 7. Metrics to watch

### 7.1 Baseline — 28 days to 12 Oct 2026 ✅

| URL | Clicks | Impr | CTR | Pos |
| --- | ---: | ---: | ---: | ---: |
| `/khafji-to-kuwait-taxi-service` | 8 | 298 | 2.68% | 6.36 |
| `/kuwait-to-khafji-taxi-service` | 1 | 85 | 1.18% | 4.74 |
| `/kuwait-to-riyadh-taxi-service` | 4 | 49 | 8.16% | 5.90 |
| `/riyadh-to-kuwait-taxi-service` | 5 | 31 | 16.13% | 6.97 |
| `/kuwait-to-dammam-taxi-service` | 2 | 23 | 8.70% | 5.30 |
| `/dammam-to-kuwait-taxi-service` | 1 | 22 | 4.55% | 13.50 |
| `/distance/riyadh-to-kuwait` | 0 | 286 | 0% | 8.47 |
| `/distance/dammam-to-kuwait` | 0 | 128 | 0% | 8.20 |
| **Kuwait (market)** | **9** | **332** | **2.71%** | **6.80** |

### 7.2 What to measure, and when

| Metric | Where | Check at |
| --- | --- | --- |
| WhatsApp clicks per route page | Analytics event on the CTA | 2 weeks |
| Impressions for **commercial** phrasings (`kuwait to riyadh taxi` etc.) — currently **zero** | GSC query filter | 6–8 weeks |
| CTR on `/kuwait-to-khafji-taxi-service` — from 1.18% | GSC | 4 weeks |
| CTR on the two distance pages — from 0% | GSC | 4 weeks |
| Kuwait market clicks — from 9 | GSC country filter | 8 weeks |
| Bookings/enquiries citing a Kuwait route | Admin bookings | ongoing |

⚠️ **Honest expectation-setting:** the Kuwait corridor currently produces ~9 clicks per 28 days. Doubling or tripling that is realistic within two months. It will not become a major traffic source on its own — the value is that these are **high-intent cross-border enquiries worth ~300 KWD each**, so a handful of extra bookings matters more than the click count suggests.

---

## 8. What happens next

On approval, implementation runs in the P0 → P1 → P2 → P3 order above, with a build, lint, type-check and a browser pass over every modified route and CTA at each stage.

**P0 and the technical half of P1 (D3, D4, D8, D9, FAQs, checklist, journey strip) need nothing from you and can start immediately.**
**P1-2 and P1-3 (price and vehicles) are blocked on §6.**
