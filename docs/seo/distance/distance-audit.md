# Distance pages: audit and plan (Step 1, for checkpoint)

Branch `seo-distance-nov`.

**Sources:**
- Search Console, last 28 days, export of 19 Nov 2026 (`seo-audit/…2026-11-19.xlsx`).
- Map routing: OpenStreetMap (OSRM), city centre to city centre, 19 Nov 2026.

Nothing is built yet. This file is the plan to approve.

---

## 1. Summary

- **There are 20 distance pages** (19 city pairs, plus Khafji to Kuwait), and an index at `/distance`. 13 of them get impressions.
- **The pages earn 8,258 impressions and 28 clicks (0.34%).** They usually rank at positions 6–8.
- **Search demand runs in both directions.** Of the 1,693 impressions for the Bahrain–Riyadh pair, 42% use the opposite word order ("riyadh to bahrain distance", 409 impressions).
  - Today no page has a heading for the reverse direction, except the Kuwait pages built this week.
- **Six pages carry figures that map routing does not support** (see §3).
  - Three of these come from the route pages, so fixing them means updating those route pages too.
- **Only 4 route pages have a confirmed fare:**
  - Riyadh → Bahrain: 1,250 SAR;
  - Riyadh ↔ Kuwait: 220 KWD;
  - Riyadh → Qatar: 1,700 SAR, sedan.

  The brief's title formula "+ Taxi Fare" can only be used truthfully where a fare exists. Every other page uses "+ Border" or the drive time instead.
- **No route page title targets "distance",** so there is no cannibalisation by title. One mild overlap: the `/riyadh-to-qatar-taxi-service` page has an H2 "Riyadh to Doha Distance and Travel Time". That is fine to keep, since the distance page will link to it.
- **There are no Arabic distance pages.**
  - The biggest Arabic demand is "من الرياض لقطر كم ساعة بالسياره" and its variants: 22 queries, about 130 impressions, positions 9–20.
  - Most of it lands on `/ar/riyadh-to-qatar-taxi-service`.
  - The Doha–Riyadh distance page gets an Arabic answer line and an Arabic FAQ. No new `/ar/distance/*` pages are planned (see §8, question 4).

---

## 2. Page inventory

| # | Page | Impr. | Clicks | Pos | Title today (chars) | Road distance on page | Time on page | Border | Forward route page | Reverse route page | Fare |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | bahrain-to-riyadh | 4,520 | 16 | 6.9 | "Bahrain to Riyadh Distance: 470 km by Road \| Gulf Trip Service" (62) | 470 km | 4.5–5.5 h incl. causeway | King Fahd Causeway | /bahrain-to-riyadh-taxi-service | /riyadh-to-bahrain-taxi-service | 1,250 SAR (reverse only) |
| 2 | riyadh-to-kuwait | 1,070 | 5 | 7.2 | "Riyadh to Kuwait Distance by Road: 648 km, 7h 40m, Taxi Fare" (60) | 648 km (owner) | 7 h 40 min + border | Al Khafji / Al Nuwaiseeb | /riyadh-to-kuwait-taxi-service | /kuwait-to-riyadh-taxi-service | 220 KWD both |
| 3 | bahrain-to-jubail | 893 | 4 | 6.4 | "Bahrain to Jubail Distance: 150 km by Road \| …" (62) | 150 km | 2–2.5 h | King Fahd Causeway | /bahrain-to-jubail-taxi-service | **none** | none |
| 4 | dammam-to-kuwait | 392 | 1 | 7.1 | "Dammam to Kuwait Distance by Road: 410 km, 4.5 hrs + Border" (59) | 410 km | 4.5 h (5–6 with border) | Al Khafji / Al Nuwaiseeb | /dammam-to-kuwait-taxi-service | /kuwait-to-dammam-taxi-service | none |
| 5 | doha-to-riyadh | 285 | 0 | 7.0 | "Doha to Riyadh Distance: 580 km by Road \| …" (59) | 580 km | 6.5–7.5 h | Salwa / Abu Samra | /qatar-to-riyadh-taxi-service | /riyadh-to-qatar-taxi-service | 1,700 SAR (reverse only) |
| 6 | dammam-to-dubai | 237 | 0 | 7.4 | "Dammam to Dubai Distance: 1,100 km by Road \| …" (62) | **1,100 km** | **11.5–13 h** | Al Batha / Ghuwaifat | /dammam-to-dubai-taxi-service | /dubai-to-dammam-taxi-service | none |
| 7 | doha-to-dammam | 235 | 0 | 6.8 | "Doha to Dammam Distance: 440 km by Road \| …" (59) | **440 km** | 5–6 h | Salwa / Abu Samra | /qatar-to-dammam-taxi-service | /dammam-airport-to-qatar-taxi-service (airport, not city) | none |
| 8 | riyadh-to-jeddah | 177 | 0 | 8.2 | "Riyadh to Jeddah Distance: 950–1,000 km \| …" (59) | 950–1,000 km | 10–11 h | none | **none** | **none** | none |
| 9 | riyadh-to-makkah | 120 | 2 | 11.6 | "Riyadh to Makkah Distance: 870 km by Road \| …" (61) | 870 km | 9–10 h | none | /riyadh-to-makkah-taxi-service | /makkah-to-riyadh-taxi-service | none |
| 10 | riyadh-to-dubai | 117 | 0 | 8.0 | "Riyadh to Dubai Distance: 1,100 km by Road \| …" (62) | **1,100 km** | **11–12.5 h** | Al Batha / Ghuwaifat | /riyadh-to-dubai-taxi-service | /dubai-to-riyadh-taxi-service | none |
| 11 | dammam-to-abu-dhabi | 103 | 0 | 6.8 | "Dammam to Abu Dhabi Distance: 950 km \| …" (56) | **950 km** | **10–11.5 h** | Al Batha / Ghuwaifat | /dammam-to-abu-dhabi-taxi-service | /abu-dhabi-to-dammam-taxi-service | none |
| 12 | riyadh-to-dammam | 86 | 0 | 8.8 | "Riyadh to Dammam Distance: 400 km, 4 Hours \| …" (62) | 400 km | 4 h | none | /riyadh-to-dammam-guide | /dammam-to-riyadh-taxi-service | none |
| 13 | jeddah-to-madinah | 23 | 0 | 7.9 | "Jeddah to Madinah Distance: 420 km by Road \| …" (62) | 420 km | 4.5 h | none | airport page only (/jeddah-airport-to-madinah-taxi-service) | airport page only | none |
| 14 | bahrain-to-dammam | 0 | 0 | – | "Bahrain to Dammam Distance: 65 km \| …" (53) | 65 km | 1–1.5 h | King Fahd Causeway | /bahrain-to-dammam-taxi-service | /dammam-airport-to-bahrain-taxi-service (airport) | none |
| 15 | khafji-to-kuwait | 0 | 0 | – | "Khafji to Kuwait Distance: 125 km, 1.5 hrs via Nuwaiseeb" (56) | 125 km | 1.5 h | Al Khafji / Al Nuwaiseeb | /khafji-to-kuwait-taxi-service | /kuwait-to-khafji-taxi-service | none |
| 16 | jeddah-to-makkah | 0 | 0 | – | "Jeddah to Makkah Distance: 80 km by Road \| …" (60) | 80 km | 60–120 min | none | /jeddah-to-makkah-taxi-service | /makkah-to-jeddah-taxi-service | none |
| 17 | makkah-to-madinah | 0 | 0 | – | "Makkah to Madinah Distance: 450 km by Road \| …" (62) | 450 km | 4–5 h | none | /makkah-to-madinah-taxi-service | /madinah-to-makkah-taxi-service | none |
| 18 | abha-to-riyadh | 0 | 0 | – | "Abha to Riyadh Distance: 780–850 km \| …" (55) | **780–850 km** | **8.5–9.5 h** | none | none | none | none |
| 19 | abha-to-jeddah | 0 | 0 | – | "Abha to Jeddah Distance: 620–680 km \| …" (55) | 620–680 km | 7–7.5 h | none | none | none | none |
| 20 | abha-to-madinah | 0 | 0 | – | "Abha to Madinah Distance: 980–1,060 km \| …" (58) | 980–1,060 km | 11–12.5 h | none | none | none | none |

**On every page:**
- Canonical: self.
- hreflang: none, since no Arabic twin exists.
- Schema: FAQPage + BreadcrumbList, plus the site-wide LocalBusiness and WebSite.
- H1: "{A} to {B} Distance & Travel Time" (or "… Distance by Road & Travel Time" on the 3 Kuwait pages).
- 9 titles are 61–62 characters with the brand suffix, so Google truncates them.

---

## 3. Facts check: page vs route page vs map routing

Driving time excludes the border.

| Pair | Page / route pages | Map routing | Second source | Verdict | Proposal |
|---|---|---|---|---|---|
| Bahrain–Riyadh | 470 km, 4.5–5.5 h incl. causeway | 472 km, 4.6 h | – | ✔ | 470 km; 4.5–5 h driving, 4.5–5.5 h with the causeway (kept) |
| Riyadh–Kuwait | 648 km, 7 h 40 min | 716 km, 7.6 h | public sites 628–718 km | owner's figure | keep 648 km (owner-confirmed 19 Nov) |
| Bahrain–Jubail | 150 km, 2–2.5 h | 156 km, 1.9 h | – | ✔ | 150 km; about 2 h driving, 2–2.5 h with the causeway |
| Dammam–Kuwait | 410 km, 4.5 h | 413 km, 4.4 h | – | ✔ | keep |
| Doha–Riyadh | 580 km, 6.5–7.5 h | 584 km, 6.5 h | – | ✔ | 580 km; about 6.5 h driving, 6.5–7.5 h with the border |
| **Dammam–Dubai** | **1,100 km, 11.5–13 h** (route pages too) | **803 km, 7.8 h** via Salwa and Al Batha | Rome2Rio 787 km; Air Miles 885 km | ✘ overstated by about 25% | **about 800 km, 8–9 h driving, 9–11 h with the border** |
| **Doha–Dammam** | **440 km, 5–6 h** (route pages too) | **327 km, 3.9 h** | Rome2Rio 329 km; Qatar Living 335 km | ✘ | **about 330 km, about 4 h driving, 4.5–5.5 h with the border** |
| Riyadh–Jeddah | 950–1,000 km, 10–11 h | 955 km, 10.5 h | – | ✔ | 950 km, 10–11 h |
| Riyadh–Makkah | 870 km, 9–10 h | 872 km, 9.6 h | – | ✔ | keep |
| **Riyadh–Dubai** | **1,100 km, 11–12.5 h** (route pages too) | **996 km, 10.4 h** via Al Batha | – | ✘ about 10% high | **about 1,000 km, 10–11 h driving, 11–12.5 h with the border** |
| **Dammam–Abu Dhabi** | **950 km, 10–11.5 h** (route pages too) | **706 km, 6.9 h** via Al Batha | – | ✘ about 35% high | **about 700 km, 7–8 h driving, 8–9.5 h with the border** |
| Riyadh–Dammam | 400 km, 4 h | 410 km, 3.9 h | – | ✔ | keep |
| Jeddah–Madinah | 420 km, 4.5 h | 404 km, 4.6 h | – | ✔ | keep (the airport-to-city distance is about 420 km) |
| Bahrain–Dammam | 65 km, 1–1.5 h | 75 km, 0.9 h | – | small | about 70 km, 1–1.5 h with the causeway |
| Khafji–Kuwait | 125 km, 1.5 h | 124 km, 1.4 h | – | ✔ (fixed this week) | keep |
| Jeddah–Makkah | 80 km, 60–120 min | 88 km, 1.1 h | – | ✔ | about 85 km |
| Makkah–Madinah | 450 km, 4–5 h | 436 km, 4.8 h | – | ✔ | keep |
| **Abha–Riyadh** | **780–850 km, 8.5–9.5 h** | **947 km, 11.5 h** (via Khamis Mushait and Bisha) | – | ✘ | **about 950 km, 10–11.5 h** |
| Abha–Jeddah | 620–680 km, 7–7.5 h | 687 km, 7.9 h | – | edge | about 690 km, 7.5–8 h |
| Abha–Madinah | 980–1,060 km, 11–12.5 h | 1,084 km, 12.3 h | – | edge | about 1,080 km, 12–12.5 h |

**Fixing the ✘ rows** means changing the matching route pages, `/border-crossing` and the long-distance guide table as well, so that every page quotes one figure. Those pages are:
- `/dammam-to-dubai-taxi-service`, `/dubai-to-dammam-taxi-service`;
- `/riyadh-to-dubai-taxi-service`, `/dubai-to-riyadh-taxi-service`;
- `/dammam-to-abu-dhabi-taxi-service`, `/abu-dhabi-to-dammam-taxi-service`;
- `/qatar-to-dammam-taxi-service`, `/dammam-airport-to-qatar-taxi-service`.

---

## 4. Search demand per pair

| Pair | Pair queries | Impr. | Same word order as the page | Main modifier | Taxi-intent impr. (route pages own these) | Arabic |
|---|---|---|---|---|---|---|
| Bahrain–Riyadh | 94 | 1,693 | 58% | distance 820 · by road 276 · by car 229 · hours 103 | 42 | "السفر من الرياض إلى البحرين بالسيارة" 17, "كم ساعه من البحرين الى الرياض" 14, + 6 more |
| Riyadh–Kuwait | 19 | 299 | 67% | by road 151 · distance 117 | 0 | 2 queries, 1 impr. each |
| Bahrain–Jubail | 12 | 324 | 62% | distance 224 · by road 57 | 14 ("jubail to bahrain taxi") | "كم تبعد الجبيل عن البحرين" 4 |
| Dammam–Kuwait | 8 | 86 | 45% | by road 48 · distance 37 | 0 | 1 |
| Doha–Riyadh | 55 | 379 | **25%** (most say "riyadh to qatar/doha") | taxi/other 205 · by road 118 · distance 34 | **162** | **22 queries, about 130 impr.** ("من الرياض لقطر كم ساعة بالسياره" 24, "من الرياض إلى قطر بالسيارة" 18, …) |
| Dammam–Dubai | 2 | 4 | – | taxi | 3 | – |
| Doha–Dammam | 14 | 55 | 47% | taxi 39 · by road 11 | 30 | "من الدمام إلى قطر بالسياره" 4 + 3 |
| Riyadh–Jeddah | 3 | 13 | – | – | 0 | – |
| Riyadh–Makkah | 1 | 4 | – | – | 0 | – |
| Riyadh–Dubai | 9 | 29 | 97% | taxi/car with driver | 24 | – |
| Dammam–Abu Dhabi | 8 | 66 | 92% | **by road 59** | 0 | – |
| Riyadh–Dammam | 1 | 5 | – | taxi | 5 | – |
| Bahrain–Dammam (page has 0 impr.) | 62 | 596 | 62% | distance 159 · by road 115 | 201 | "من الدمام إلى البحرين سيارة" 36 + 4 |
| Saudi Arabia–Bahrain (no page) | 27 | about 300 | – | by road 113 | 76 | 1 |
| Saudi Arabia–Kuwait | 8 | 47 | – | by road 27 | 0 | covered by the new guide |

**What this means for the template:**
- "by road" is the main modifier on every pair, so every H1 becomes "{A} to {B} Distance by Road".
- **Bahrain–Dammam:** 596 impressions for the pair, but the distance page gets none; the route pages take them. The template upgrade gives it the same chance as the others.
- **Saudi Arabia–Bahrain** has no distance page of its own. "bahrain to saudi arabia distance by road" gets 32 impressions at position 4.9; the export doesn't say which page Google shows for it. A short "From other Saudi cities" table on the Bahrain–Riyadh page covers it without a new page.

---

## 5. Template (Step 2): plan

**One data source.**
- `src/lib/distanceRouteData.ts` gains a structured facts block per pair:
  - `distanceKm` and `drivingTime`;
  - `timeWithBorder` and `border` (cross-border pairs only);
  - `highways`, `altRoute`, `flight`;
  - `routeForward` and `routeReverse` (route page slugs).
- The **fare is never written here**: it is read from the route page's own price data (`KUWAIT_RIYADH_FARE`, the Bahrain landing prices, the Qatar fare table), so a distance page can never quote a different number.
- The title, meta, answer box, stat tiles and booking box are generated from those facts.

**Head.**
- Titles follow the brief's formula, with no brand suffix, ≤ 60 characters (§6).
- Meta descriptions: direct answer, both directions, border, and the fare where confirmed; ≤ 155 characters.
- H1: "{A} to {B} Distance by Road".
- Canonical: self. No hreflang.

**Sections, in order** (the same look as the Riyadh to Bahrain/Kuwait pages: stat tiles, cards, alternating backgrounds):
1. **Answer box:** the bold one-sentence answer, then 4 tiles: Distance · Driving time · Border (or "No border") · Taxi fare (or "Quote on WhatsApp").
2. **Booking box,** above the fold on mobile:
   - "Need a ride from {A} to {B}? Private taxi {from fare}, door to door";
   - buttons [Book on WhatsApp] and [Book Online → route page #booking];
   - a "Travelling {B} to {A}? →" link.
   - Pairs with no route page link to `/book-online?from=&to=`.
3. **{B} to {A} Distance by Road:** an H2 with the same facts and a link to the reverse route page.
4. **Route & highways:** a step timeline (cities and highways), plus an alternative route where one exists.
5. **Border crossing** (cross-border pairs only):
   - the crossing's name;
   - waiting time ("varies"; ranges only where a route page already states them);
   - documents;
   - links to `/border-crossing` and the matching route page.
6. **Travel options table:** private taxi (Recommended) / self-drive / bus / flight, only where verified, with no operator names.
7. **Travel tips:** 4–6 icon cards, written per pair.
8. **FAQ:** 6–8 answers (≤ 25 words, key facts bold) built from that pair's real queries, plus an Arabic question where Arabic queries exist (Bahrain–Riyadh, Doha–Riyadh, Bahrain–Jubail, Doha–Dammam, Riyadh–Kuwait). FAQPage schema uses the same text.
9. **Related:** forward and reverse route pages, city pages, and 3–4 distance pages from the same region.
10. **Closing CTA strip.**

**Schema:** BreadcrumbList + FAQPage only. No Service or Offer on distance pages.

**Tracking:** `whatsapp_click` with `button_location: "distance_booking_box"` and the route; Book Online clicks are reported the same way.

**Links:**
- Every route page's "at a glance" section links to its distance page with the anchor "{A} to {B} distance by road".
- `/border-crossing` gets links to the distance pages (it has none today).
- City pages already list them.
- `/distance` is regrouped into Bahrain, Qatar, Kuwait, UAE and Saudi domestic, using intent prefetch.

**Unique text per page,** written in priority order:
- bahrain-to-riyadh → riyadh-to-kuwait → bahrain-to-jubail → dammam-to-kuwait → doha-to-riyadh;
- → dammam-to-dubai → doha-to-dammam → riyadh-to-jeddah → riyadh-to-makkah;
- → riyadh-to-dubai → dammam-to-abu-dhabi → riyadh-to-dammam → jeddah-to-madinah;
- → the remaining 7.

**One production deployment at the end.**

---

## 6. Proposed titles and meta descriptions: top 8 pages

| Page | Title (chars) | Meta description (chars) |
|---|---|---|
| bahrain-to-riyadh | Bahrain to Riyadh Distance by Road: 470 km & Taxi Fare (54) | Bahrain to Riyadh is about 470 km by road, 4.5–5.5 hrs incl. the King Fahd Causeway. Same distance Riyadh to Bahrain. Private taxi from 1,250 SAR, 24/7. (152) |
| riyadh-to-kuwait | Riyadh to Kuwait Distance by Road: 648 km, 7h 40m, Taxi Fare (60) — no change | Riyadh to Kuwait is about 648 km by road, 7 h 40 min driving via the Al Khafji border. Same distance Kuwait to Riyadh. Private taxi from 220 KWD. (145) |
| bahrain-to-jubail | Bahrain to Jubail Distance by Road: 150 km, 2–2.5 hrs (53) | Bahrain to Jubail is about 150 km by road, 2–2.5 hrs incl. the King Fahd Causeway. Same distance Jubail to Bahrain. Private taxi door to door, 24/7. (148) |
| dammam-to-kuwait | Dammam to Kuwait Distance by Road: 410 km, 4.5 hrs + Border (59) — no change | Dammam to Kuwait is about 410 km by road, 4.5 hrs driving (5–6 with the Khafji border). Same distance Kuwait to Dammam. Private taxi door to door, 24/7. (152) |
| doha-to-riyadh | Doha to Riyadh Distance by Road: 580 km & Taxi Fare (51) | Doha to Riyadh is about 580 km by road, 6.5–7.5 hrs incl. the Salwa border. Same distance Riyadh to Doha. Private taxi from 1,700 SAR, 24/7. (140) |
| dammam-to-dubai | Dammam to Dubai Distance by Road: 800 km, 8–9 hrs + Border (58) | Dammam to Dubai is about 800 km by road, 8–9 hrs driving via the Al Batha–Ghuwaifat border. Same distance Dubai to Dammam. Private taxi door to door. (149) |
| doha-to-dammam | Doha to Dammam Distance by Road: 330 km, 4 hrs + Border (55) | Doha to Dammam is about 330 km by road, about 4 hrs driving plus the Salwa–Abu Samra border. Same distance Dammam to Doha. Private taxi door to door, 24/7. (155) |
| riyadh-to-jeddah | Riyadh to Jeddah Distance by Road: 950 km, 10–11 hrs (52) | Riyadh to Jeddah is about 950 km by road, 10–11 hours driving on Highway 40 via Taif. Same distance Jeddah to Riyadh. Private car with driver on request. (153) |

The "& Taxi Fare" titles (Bahrain–Riyadh, Doha–Riyadh) depend on decision 1 in §8.

---

## 7. Missing route pages (the booking box falls back to /book-online)

| Pair | Missing |
|---|---|
| Bahrain–Jubail | **Jubail → Bahrain** route page. "jubail to bahrain taxi" gets 11 impressions, and Jubail → Bahrain is 74 impressions of the pair's demand. |
| Riyadh–Jeddah | Both directions: no Riyadh ↔ Jeddah route page |
| Jeddah–Madinah | City-to-city pages (only airport pages exist) |
| Doha–Dammam | Dammam (city) → Qatar (only Dammam Airport → Qatar exists) |
| Bahrain–Dammam | Dammam (city) → Bahrain (only Dammam Airport → Bahrain exists) |
| Abha–Riyadh, Abha–Jeddah, Abha–Madinah | No route pages; the Abha airport page exists |

These are listed only. No new route pages are built in this task.

---

## 8. Decisions needed

1. **Reverse-direction fares.**
   - Does **1,250 SAR** (Riyadh → Bahrain) also apply to **Bahrain → Riyadh**?
   - Does **1,700 SAR** (Riyadh → Doha, sedan) also apply to **Doha → Riyadh**?
   - If yes, both distance pages say "Private taxi from …" and their titles end "& Taxi Fare". If no, they show "Quote on WhatsApp" and the title uses the drive time instead.
2. **Wrong distances (§3).**
   - The pairs: Dammam–Dubai (1,100 → about 800 km), Riyadh–Dubai (1,100 → about 1,000 km), Dammam–Abu Dhabi (950 → about 700 km), Doha–Dammam (440 → about 330 km), Abha–Riyadh (780–850 → about 950 km).
   - May I correct them on the distance pages **and** the matching route pages, `/border-crossing` and the long-distance guide?
   - If your drivers use a different road (for example via Riyadh for Dammam–Dubai), tell me and I'll use that route's figure instead.
3. **Border waiting times.** The pages will say "varies" and give a range only where a route page already states one: the causeway, and Khafji "30–90 min, longer at peaks". Send ranges from your drivers if you want them on more crossings.
4. **Arabic.** As proposed, Arabic questions and an Arabic answer line go on the English pages; no `/ar/distance/*` pages. Alternatively, build `/ar/distance/riyadh-to-qatar` and `/ar/distance/riyadh-to-bahrain` as Arabic pages; that adds 2 URLs.
5. **The "Saudi Arabia to Bahrain by road" table** on the Bahrain–Riyadh page (from Riyadh, Dammam, Jubail, Al-Ahsa): OK to add?

---

## 9. Clean-up of unused files (to do after the build, on your OK)

**Untracked, never committed (deleting them is permanent):**

| File | Size | Notes |
|---|---|---|
| `SEO_OPTIMIZATION_PROMPT NOV.md` | 24 KB | Old prompt or response |
| `gulf comparison gsc file.xlsx` | 58 KB | Old GSC export |
| `https___gulftripservice.com_-Performance-on-Search-2026-11-09.xlsx` | 38 KB | Old GSC export |
| `Al Khobar Luxury Waterfront Transfer.png`, `Golden Hour Al-Ahsa Journey.png`, `Luxury Riyadh to Bahrain Transfer.png`, `Sunset SUV Drive Across the Desert Causeway.png` | 9.7 MB | Source images, already converted to WebP and used on the Bahrain page |
| `public/images/Black SUV Against Kuwait’s Desert Skyline.png`, `public/images/Coastal Checkpoint at Golden Hour.png` | 4 MB | Source images, already converted to WebP and used on the Kuwait page |
| `bahrain/` (19 WhatsApp photos, 2 videos) | 42 MB | Raw car photos and videos, already processed into the site's images and videos |

**Committed to git (deleting them is reversible from git history):**

| File | Notes |
|---|---|
| `BORDER-CROSSING-TOPICAL-MAP.md`, `CITY-WISE-TOPICAL-MAP.md`, `INTERCITY-ROUTES-TOPICAL-MAP.md`, `MASTER-TOPICAL-MAP-INDEX.md`, `SEO-TOPICAL-AUTHORITY-STRUCTURE.md`, `Gulf-Trip-Service-SEO-UX-Visual-AI-Search-Roadmap.md` | Old SEO planning documents from July and August |
| `CHANGELOG-internal-linking.md`, `gulftrip-h1-mixmatch.md`, `gulftrip-seo-title-audit.md` | Old one-off audits |
| `seo-audit/cluster-map.md`, `seo-audit/post-change-report.md`, `seo-audit/internal-link-audit.md` | Old audits |
| `docs/gsc-28-day-2026-08-17-to-2026-09-13.xlsx`, `docs/https___…-2026-09-12.xlsx` | Old GSC exports |
| `content/riyadh-to-dammam-taxi.html` | No page reads it any more (the page was migrated off it) |

**Kept, because something still uses them:**
- `seo-audit/link-graph.json` (read by `airportRoutesData.ts`);
- `config/internal-links.json` (read by a script);
- the other `content/*.html` files (read by 5 guide pages);
- `docs/` reports, `DEPLOY.md`, `README.md`, `CONFIG.md`.

**Also kept:** the new `seo-audit/…2026-11-19.xlsx`, as this task's data.
