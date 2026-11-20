# New route pages: research and plan

Branch `routes-phase-a`, 20 November 2026.

**Sources:**
- Search Console export for 19 November 2026 (`seo-audit/…2026-11-19.xlsx`, 28 days, queries and pages).
- OSRM road routing (router.project-osrm.org), run on 20 November from several pickup points per pair. Raw output is in §8.
- The published facts in `src/lib/distanceRouteData.ts` and `src/lib/routeData.ts`.

**Scope this round:**

| Phase | Pages | This round |
|---|---|---|
| A | Jubail → Bahrain; Dammam → Bahrain (EN + AR) | Build and deploy after this checkpoint |
| B | Riyadh → Jeddah; Jeddah → Riyadh | Research and outline only (§5) |
| C | Jeddah ↔ Madinah (city to city); Dammam → Qatar | Research and outline only (§6) |
| Deferred | Abha → Riyadh / Jeddah / Madinah | Not built (§7) |

---

## 1. Slug and existing-page check

| New slug | Exists? | Redirect? | Already linked? | Follows convention? |
|---|---|---|---|---|
| /jubail-to-bahrain-taxi-service | no (404) | none | `bahrainToJubail.reverseSlug` already points to it. RoutePage only renders the link once the page exists, so nothing is broken today. | yes, `{a}-to-{b}-taxi-service` |
| /dammam-to-bahrain-taxi-service | no | none | no | yes |
| /ar/dammam-to-bahrain-taxi-service | no | none | no | yes, `/ar/` + the same slug |
| /riyadh-to-jeddah-taxi-service, /jeddah-to-riyadh-taxi-service | no | none | no | yes |
| /jeddah-to-madinah-taxi-service, /madinah-to-jeddah-taxi-service | no | none | no | yes. They sit alongside the airport slugs `/jeddah-airport-to-madinah-…` and `/madinah-to-jeddah-airport-…`. |
| /dammam-to-qatar-taxi-service | no | none | no | yes. The existing pages use "qatar" in the slug (`/qatar-to-dammam-…`, `/dammam-airport-to-qatar-…`). |

**Pages that already get the same searches.** In each case the page in the right-hand column keeps its role, and the new page does not take its queries.

| Query family (28 days) | Impr. | Page getting it today | Position | Plan |
|---|---|---|---|---|
| bahrain → dammam taxi / by road / distance (the Bahrain → Saudi direction) | 343 | /bahrain-to-dammam-taxi-service (44 clicks, 1,117 impr.), plus the blog post /blog/bahrain-to-dammam-travel-options (36 clicks) | 6.2 | **Keep.** The new page targets only Dammam → Bahrain. Both pages link to each other as reverse routes. |
| dammam → bahrain (taxi, سيارة, distance) | 118 | No route page. "من الدمام إلى البحرين سيارة" is at position 27, and "dammam to bahrain taxi service" at position 55. | 14–55 | **New page** (the gap is real) |
| khobar → bahrain / bahrain airport | 110 | No dedicated page; positions 8–43 | 8–43 | Covered by the new Dammam page as a secondary keyword (Khobar pickup table and Bahrain Airport FAQ). A separate Khobar page is listed as optional (decision 4). |
| jubail → bahrain (taxi, airport distance) | 105 | /distance/bahrain-to-jubail (893 impr.) for distance queries; nothing for "taxi" (position 8.6) | 4.6–10 | **New page** for taxi intent. The distance page keeps the distance queries. |
| dammam → doha / qatar taxi | 16 | Probably /dammam-airport-to-qatar-taxi-service (291 impr., position 7.1). "dammam to doha taxi" is at position 6.3. | 6–8 | **Phase C, decide later:** improve and retarget the airport page or build a city page (see §6). |
| riyadh ↔ jeddah | 13 (query) + 177 (distance page) | /distance/riyadh-to-jeddah | 8.2 | Phase B |
| jeddah ↔ madinah (city) | ~1 | none | – | Phase C; there is almost no demand (§6) |

---

## 2. Verified facts: Phase A

The causeway wait used below is the figure already published on the site: "usually **45–75 minutes** for the whole crossing", from the `CAUSEWAY` record in `distanceRouteData.ts`.

### Jubail → Bahrain

**OSRM road distance and driving time:**

| From | To | Distance | Driving time |
|---|---|---|---|
| Jubail city centre | Manama | 157 km | 1 h 51 min |
| Jubail Industrial City | Manama | 168 km | 2 h |
| Al Fanateer | Manama | 171 km | 2 h |
| Jubail city | Bahrain International Airport | 163 km | – |
| Jubail city | Amwaj | 169 km | – |
| Jubail Industrial City | Seef | 162 km | – |

- **Roads:** Route 613 (Dhahran–Jubail highway) south → Route 95 → the King Fahd Causeway → Bahrain Route 80 into Manama.
- **Published today:**
  - the distance page says 150 km and 2–2.5 h including the causeway;
  - /bahrain-to-jubail-taxi-service says ~150 km and 2–2.5 h.
- ⚠ **The published time is low.** About 2 h of driving plus a 45–75 min crossing comes to roughly **2.5–3 h** door to door, and the distance is 155–170 km depending on the pickup. **Decision 1.**
- **Airports:** Jubail has no airport. The nearest are King Fahd International (DMM, about 90 km) and Bahrain International (BAH, 163 km).

### Dammam (city) → Bahrain

**OSRM road distance and driving time:**

| From | To | Distance | Driving time |
|---|---|---|---|
| Al Khobar | Manama | 52 km | 43 min |
| Dhahran | Manama | 65 km | 56 min |
| Dammam centre | Manama | 75 km | 59 min |
| Dammam centre | Seef | 70 km | – |
| Dammam centre | Bahrain International Airport | 81 km | 1 h 6 min |
| Al Khobar | Bahrain International Airport | 58 km | 50 min |
| Dammam centre | Bahrain International Circuit | 81 km | – |
| Al Khobar | Bahrain International Circuit | 58 km | – |
| DMM airport | Manama | 105 km | 1 h 16 min |

- **Roads:** Route 619/613 → the King Fahd Causeway (Route 80 on the Bahrain side).
- **Published today:**
  - 65 km and 1–1.5 h including the causeway, on the distance page and /bahrain-to-dammam;
  - the airport page says ~100 km and 1.5–2.5 h.
- **The 65 km is fine.** It is the middle of the Dammam–Dhahran–Khobar range, and the page will show the per-area table.
- ⚠ **The 1–1.5 h needs checking.** About 45–60 min of driving plus a 45–75 min crossing comes to roughly **1.5–2 h**, so 1–1.5 h is the best case. **Decision 1.**
- **Fare:** starting from 500 SAR, per vehicle, one way (owner, brief). **Decision 2.**

---

## 3. Page outlines: Phase A

### Shared parts on every new page

These are reused components, not reused copy:
- hero with the booking form, under the heading "Online Booking for {A} to {B} Taxi" (banner style);
- one compact trust strip: 24/7 · Flight tracking · English & Arabic drivers · Payment: cash / bank transfer / payment link · Invoice issued;
- a "Route at a glance" tile row;
- FAQ, with FAQPage schema using the same text;
- related links and a closing call to action.

**Build:** both pages use the designed `RouteLanding` layout, each with its own section order. Five new section types will be added for these pages:

| Section type | Used on |
|---|---|
| `compare`: a comparison table | Dammam |
| `pickupAreas`: pickup cards or table with km | Jubail cards, Dammam table |
| `checklist`: numbered steps with documents | Dammam |
| `timingGuide`: when to leave and return | Jubail |
| `ideas`: audience or day-trip cards | Dammam |

The existing types (timeline, crossing, destinations, faq) are reused where they fit.

### Page 1: /jubail-to-bahrain-taxi-service (EN, no price)

| | |
|---|---|
| **Angle** | "From Jubail Industrial City to Bahrain": an outbound trip for residents. It is not the contractor-arrival angle of the reverse page. |
| **Audience** | Engineers and expat workers going to Bahrain for the weekend, families, and residents flying out of Bahrain International Airport |
| **Primary keyword** | jubail to bahrain taxi |
| **Secondary keywords** | jubail to bahrain distance by road · jubail to bahrain airport (distance) · al jubail to bahrain |
| **Arabic** | كم تبعد الجبيل عن البحرين (FAQ only) |
| **Title** | Jubail to Bahrain Taxi: Private Car via the Causeway (51) |
| **Meta** | Private taxi from Jubail to Bahrain, door to door: about 160 km via Al Khobar and the King Fahd Causeway. Fare confirmed on WhatsApp before you book. (149) |
| **H1** | Jubail to Bahrain Taxi: From Jubail Industrial City to Manama |
| **Breadcrumb** | Home › Border Crossing › Jubail to Bahrain Taxi |

**Sections, in order:**
1. **Hero and form,** then the trust strip.
2. **Route at a glance:** ~160 km · ~2 h driving · causeway 45–75 min · Fare: "Get your fare on WhatsApp".
3. **Pickup zones in Jubail** *(new, cards)*: Jubail Industrial City (Royal Commission districts), Al Fanateer, Jubail old city, and camp or compound gates, each with its km to Manama.
4. **The route, step by step** *(timeline)*:
   - Jubail → Route 613 south past Dammam;
   - Al Khobar → the causeway → passport posts on the island;
   - Route 80 into Manama.
5. **Weekend timing guide** *(new, table)*: Thursday afternoon or evening out and the Saturday return, with when the causeway is busiest. Leave before about 2 pm or after the evening peak.
   - Wording is limited to what is already published: "Thursday and Friday evenings are busiest".
6. **Same-day return** *(new, short block)*: day trips with the driver waiting, or a booked return pickup. **Decision 3.**
7. **Drop-offs in Bahrain** *(destination cards)*: Manama, Seef, Juffair, Amwaj Islands and Bahrain International Airport, each with its km, linking to /destinations/manama, /destinations/amwaj-islands and /destinations/bahrain.
8. **Before you leave Saudi Arabia** *(documents)*: the Iqama-holder points, which the reverse page doesn't cover:
   - a valid **exit/re-entry visa**;
   - the Bahrain eVisa or visa on arrival;
   - GCC nationals cross with their ID.
9. **FAQ** (7–8 questions, from real queries):
   - How far is Jubail from Bahrain? (~160 km)
   - How far is Jubail from Bahrain Airport? (163 km)
   - How long does it take?
   - Can I come back the same day?
   - What do Iqama holders need?
   - How much is a taxi from Jubail to Bahrain? (WhatsApp)
   - Do I stay in the same car?
   - كم تبعد الجبيل عن البحرين؟
10. **Cross-link box:** "Going the other way?" → /bahrain-to-jubail-taxi-service; "Leaving from Dammam or Khobar?" → /dammam-to-bahrain-taxi-service.
11. **Related routes and closing call to action.**

**Different from the reverse page.** /bahrain-to-jubail covers the arrival leg: gate access, SABIC sites and site passes. This page is about leaving from Jubail: where in Jubail you're picked up, when to set off, exit/re-entry, and where in Bahrain you're dropped. The distance page keeps the distance queries; this page answers the distance question in a single FAQ.

### Page 2: /dammam-to-bahrain-taxi-service (EN, from 500 SAR)

| | |
|---|---|
| **Angle** | "The quickest cross-border ride: about 65 km" |
| **Audience** | Eastern Province residents on day trips (shopping, dining, events, business) and people flying out of Bahrain International Airport |
| **Primary keyword** | dammam to bahrain taxi |
| **Secondary keywords** | dammam to bahrain by road / distance · khobar to bahrain taxi · khobar to bahrain airport (distance / taxi) · dhahran to bahrain |
| **Title** | Dammam to Bahrain Taxi from 500 SAR \| Private Car (49) |
| **Meta** | Private taxi from Dammam, Al Khobar or Dhahran to Bahrain across the King Fahd Causeway. About 65 km. Starting from 500 SAR per car, 24/7. (142) |
| **H1** | Dammam to Bahrain Taxi: Private Car Across the Causeway |
| **Breadcrumb** | Home › Border Crossing › Dammam to Bahrain Taxi |

**Sections, in order:**
1. **Hero and form.** The price tag reads "Starting from 500 SAR" with the small print "Per vehicle, one way. Prices may vary by date, vehicle and availability." The trust strip follows.
2. **Route at a glance:** ~65 km · ~1 h driving · causeway 45–75 min · Starting from 500 SAR.
3. **How far from your pickup** *(new, table)*: Al Khobar 52 km · Dhahran 65 km · Dammam centre 75 km to Manama, plus each area to Bahrain Airport. This explains the "about 65 km".
4. **City or airport pickup?** *(new, comparison table)*:
   - Dammam, Khobar or Dhahran: 52–75 km, about 1.5 h, best for residents and hotels.
   - King Fahd International (DMM): about 105 km, longer, best for arriving flights.
   - Links to /dammam-airport-to-bahrain-taxi-service, with the anchor "Dammam Airport to Bahrain taxi".
5. **Crossing the causeway, step by step** *(new, numbered checklist)*:
   1. Saudi exit post: passport or Iqama with exit/re-entry.
   2. Toll and vehicle papers, handled by the driver.
   3. Bahrain entry: eVisa, visa on arrival or GCC ID.
   4. Customs.
   5. Route 80 into Manama.
   - The step about the toll being "handled by the driver" depends on **Decision 2.**
6. **Day-trip ideas** *(new, cards)*:
   - Seef malls;
   - Bab Al Bahrain and the Manama Souq;
   - Bahrain International Circuit on race weekends (81 km from Dammam, 58 km from Khobar);
   - Amwaj Islands.
   - Each card links to its /destinations/* page where one exists.
7. **Beat the queue** *(tips)*: Thursday and Friday evenings are busiest, weekday mornings are quickest, plus race-weekend advice.
8. **FAQ** (8–9 questions):
   - How far is Dammam from Bahrain?
   - How far is Khobar from Bahrain Airport? (58 km)
   - How long by road?
   - How much is a taxi from Dammam to Bahrain? (from 500 SAR)
   - Can I go and come back the same day?
   - Do I need a visa for Bahrain?
   - Can you pick me up from Khobar or Dhahran?
   - Is the causeway open 24 hours?
9. **Cross-link box:** return trip → /bahrain-to-dammam-taxi-service; arriving by air → the Dammam Airport page; from Jubail → /jubail-to-bahrain-taxi-service.
10. **Related routes and closing call to action.**

### Page 3: /ar/dammam-to-bahrain-taxi-service (Arabic)

- **Not a word-for-word translation.** It is written for Arabic searches about the car trip: "من الدمام إلى البحرين سيارة" (36 impr.), "من الخبر إلى البحرين" and "كم ساعة".
- **Title:** تاكسي الدمام إلى البحرين من 500 ريال | سيارة خاصة
- **H1:** تاكسي من الدمام إلى البحرين بالسيارة عبر جسر الملك فهد
- **Sections:** the same section types as the English page, with:
  - its own Arabic FAQ (6–8 questions from Arabic queries);
  - the Saudi exit/re-entry wording residents use;
  - the right-to-left layout already used by /ar/riyadh-to-bahrain.
- **hreflang:** en ↔ ar, with x-default pointing to the English page.

---

## 4. Links: Phase A

**From each new page (in-body, 8–14 links, no repeated anchors):**

| From | To | Anchor |
|---|---|---|
| Jubail → Bahrain | /bahrain-to-jubail-taxi-service | Bahrain to Jubail taxi (return trip) |
| | /distance/bahrain-to-jubail | Jubail to Bahrain distance by road |
| | /dammam-to-bahrain-taxi-service | leaving from Dammam or Khobar instead |
| | /services/jubail | taxi service in Jubail |
| | /border-crossing | Saudi border crossings |
| | /saudi-arabia-to-bahrain-taxi-service | taxis to Bahrain from other Saudi cities |
| | /destinations/manama, /destinations/amwaj-islands, /destinations/bahrain | drop-off cards |
| | /riyadh-to-bahrain-taxi-service, /dammam-airport-to-bahrain-taxi-service | related routes |
| Dammam → Bahrain | /dammam-airport-to-bahrain-taxi-service | Dammam Airport to Bahrain taxi |
| | /bahrain-to-dammam-taxi-service | Bahrain to Dammam taxi for the way back |
| | /distance/bahrain-to-dammam | Dammam to Bahrain distance by road |
| | /services/dammam, /services/khobar | taxi in Dammam · Al Khobar taxi service |
| | /border-crossing | all border crossings |
| | /destinations/manama, /destinations/amwaj-islands | day-trip cards |
| | /blog/bahrain-to-dammam-travel-options | every way to cross the causeway, compared |
| | /jubail-to-bahrain-taxi-service, /riyadh-to-bahrain-taxi-service | related routes |

**Links back to the new pages:**

- **Distance pages:**
  - `/distance/bahrain-to-jubail`: `routeReverse` changes to /jubail-to-bahrain. Its booking box's "Travelling Jubail to Bahrain?" link goes there too.
  - `/distance/bahrain-to-dammam`: `routeReverse` changes from the Dammam Airport page to /dammam-to-bahrain. The airport stays in the copy and the related links.
- **"Book Online" fallback:** pairs with no route page in either direction still fall back to /book-online. The rule is unchanged; these two pairs simply stop using it.
- **Reverse route pages:**
  - /bahrain-to-jubail shows a reverse callout automatically once the page exists.
  - /bahrain-to-dammam: `reverseSlug` changes from the airport page to /dammam-to-bahrain, and the related list gains a link.
- **Airport page:** /dammam-airport-to-bahrain gets a box: "Picking up from Dammam, Khobar or Dhahran instead?"
- **Hubs:**
  - /routes index;
  - /services/jubail, /services/dammam, /services/khobar;
  - /destinations/bahrain, /destinations/manama;
  - /border-crossing (Bahrain card);
  - /saudi-arabia-to-bahrain-taxi-service (related routes);
  - /riyadh-to-bahrain "Other Popular Routes";
  - /site-map;
  - the Arabic Bahrain pages (/ar/riyadh-to-bahrain, /ar/bahrain-to-dammam) link to the Arabic Dammam page.
- **Sitemap and IndexNow:** both lists get the new URLs with `lastmod`.

The full from → to → anchor table goes in the build report.

---

## 5. Phase B outlines (research only, not built)

### Facts

| Pair | OSRM | Roads | Published (distance page) |
|---|---|---|---|
| Riyadh centre → Jeddah centre | 953 km, 10.5 h driving | Route 522 → 40 → Taif ring (267) → 40 → 5 | 950 km, 10–11 h ✔ |
| KAFD → Jeddah Corniche | 969 km, 10.7 h | | |
| RUH airport → Jeddah | 986 km, 10.8 h | | |
| Jeddah → KAFD | 958 km, 10.6 h | | |
| Jeddah → RUH airport | 983 km, 10.8 h | | |
| Riyadh → Taif | 786 km, 8.6 h | | |
| Taif → Jeddah | 175 km, 2.1 h | | |

- **Makkah:** the Taif–Jeddah stretch runs past Makkah. Non-Muslims must take the signposted bypass. Verify at build and word it carefully; the Makkah stop is for Umrah travellers only.
- **Fares (owner):**
  - Riyadh → Jeddah: **starting from 2,400 SAR**.
  - Jeddah → Riyadh: **starting from 2,400 SAR** (owner, 20 November). This updates the brief, which said no price, so both Phase B pages show a price, with the price tag, small print and Offer schema.

### Search demand
- 13 query impressions in 28 days, all family-trip and airport-to-airport questions.
- /distance/riyadh-to-jeddah gets 177 impressions at position 8.2.
- Demand is thin. The case for the pages is booking intent from the distance page, not rankings.

### Outlines

**Riyadh → Jeddah**, "Coast to capital, in one private car":
1. Hero, form, from 2,400 SAR
2. Glance tiles
3. Taxi vs flight vs self-drive *(comparison table: door-to-door time, luggage, cost for a group)*
4. Route and planned stops *(timeline: Highway 40, the Taif option, rest and prayer stops)*
5. Long-journey comfort *(cards: breaks, vehicles for families)*
6. Optional Makkah stop *(for Umrah travellers, with the access-rules note)*
7. Drop-offs (Corniche, Al Balad, Obhur, KAIA)
8. FAQ
9. Links

**Jeddah → Riyadh**, "Heading to the capital": business and relocation:
1. Hero, form, from 2,400 SAR
2. Glance tiles
3. Arriving for a meeting or event *(timing back from the meeting time; Riyadh Season and conferences, with no dates invented)*
4. Drop-off districts *(table: Olaya, KAFD, Diplomatic Quarter, RUH, with km)*
5. Night drive option
6. Moving with luggage *(checklist)*
7. FAQ
8. Links

The two pages share no section types after the tiles.

---

## 6. Phase C outlines (research only, not built)

### Jeddah ↔ Madinah, city to city

- **Facts (OSRM):**
  - Jeddah centre → Prophet's Mosque: 404 km, 4.6 h.
  - Jeddah Corniche → Prophet's Mosque: 404 km.
  - Al Balad → Prophet's Mosque: 412 km.
  - KAIA → Prophet's Mosque: 399 km.
  - Roads: Route 5 north, then Route 15.
- **Published:** the distance page says 420 km. It could be tightened to "about 400–410 km" when Phase C is built.
- **Demand:** almost none. 1 query impression; the distance page has 23 impressions and the airport page /madinah-to-jeddah-airport 1.
- **Risk:** two thin pages competing with the Haramain train and with the airport pages.
- **Recommendation:** when Phase C comes up, build **one direction first** (Jeddah → Madinah) with the train-vs-car comparison, and look at its results before building the return.

**Outline (Jeddah → Madinah):**
1. Road vs Haramain train *(honest comparison; verify the train times then)*
2. Hotel pickup in Jeddah
3. Drop-off at Madinah hotels near Al-Masjid an-Nabawi
4. Miqat and visit notes (verify)
5. Care for elderly travellers and families
6. FAQ
7. Links to the airport page, the reverse page, Umrah pages and the distance page

**Madinah → Jeddah:** after the Madinah visit, on to Jeddah hotels, the Corniche or Al Balad, or the airport, with an airport-timing note linking to the airport page.

### Dammam → Qatar, city

- **Facts (OSRM):**
  - Dammam centre → West Bay: 340 km, 4 h.
  - Khobar → West Bay: 337 km.
  - Dammam → Hamad Airport: 344 km.
  - Dammam → Lusail: 352 km.
  - DMM → West Bay: 356 km.
  - Roads: Route 615 → 95 → Salwa → Abu Samra → Qatar Route 5.
  - Salwa wait: "typically 30–60 minutes" (already published).
- ⚠ **The brief says "via Al-Ahsa (Hofuf)"**, but the fastest road doesn't pass through Hofuf: Dammam → Hofuf is 152 km and Hofuf → Salwa 162 km, which adds about 70 km. The page should say the road runs past the Al-Ahsa region, with Hofuf as an optional stop.
- ⚠ **Possible cannibalisation:** "dammam to doha taxi" (position 6.3) and "dammam to qatar taxi" (position 8) probably land on /dammam-airport-to-qatar-taxi-service (291 impr., 14 clicks).
- **Recommendation:** check the Search Console query → page mapping in Phase C. If the airport page is the one ranking, widen it to "Dammam & Dammam Airport to Qatar" and don't build a competing city page.

**Outline (if built):**
1. Route via Route 95 and Salwa
2. Border steps and documents (no outcome promises)
3. City vs airport pickup
4. Doha drop-offs: West Bay, The Pearl, Lusail, Hamad Airport
5. Event travel
6. FAQ
7. Links to the airport page, /qatar-to-dammam, /distance/doha-to-dammam, /saudi-arabia-to-qatar and /destinations/doha

---

## 7. Deferred

Abha → Riyadh, Abha → Jeddah and Abha → Madinah have no search demand yet (0 impressions on their distance pages). They are not built. Review them after Phase B.

---

## 8. Decisions needed before building Phase A

1. **Door-to-door times.** The published times look short once the 45–75 min causeway crossing is added. Should all related pages switch to the honest range?
   - **Jubail ↔ Bahrain:** "2–2.5 h" → **"2.5–3 h"**, and "150 km" → **"about 160 km"**.
   - **Dammam ↔ Bahrain:** "1–1.5 h" → **"1–2 h"**. 1 h is the quiet-time best case; 2 h is a busy crossing.
   - The change would apply to the distance pages, /bahrain-to-jubail, /bahrain-to-dammam and the Saudi→Bahrain table on /distance/bahrain-to-riyadh, so every page agrees. If your drivers' real times match the current figures, say so and the current figures stay.
2. **The 500 SAR fare.**
   - Which vehicle does it apply to (sedan?), and what does an SUV or van cost?
   - Is it the same from Al Khobar and Dhahran?
   - Is the drop-off at Bahrain International Airport included?
   - Is the causeway toll included?
3. **Same-day return (Jubail and Dammam pages).** Is it offered? Choose one:
   - (a) the driver waits in Bahrain (and if so, is there a waiting charge?);
   - (b) a separate return pickup is booked;
   - (c) don't mention it.
4. **Al Khobar.** The plan covers Khobar inside the Dammam page (110 impressions of Khobar → Bahrain searches). A separate /khobar-to-bahrain-taxi-service could come later, once the Dammam page shows whether it's needed. OK?
5. **Photos.** Each page needs its own image: a causeway or Jubail skyline for Jubail, and a Dammam or Khobar corniche for Dammam. If you have photos, send them. If not, the pages use sized placeholders, with these suggested alt texts:
   - "Private taxi from Jubail to Bahrain on the Dhahran–Jubail highway";
   - "Dammam to Bahrain taxi crossing the King Fahd Causeway".

---

## 9. Raw OSRM output (20 November 2026)

```
jubailCity -> manama: 157 km, 1.85 h | 613 > 95 > 80
jubailInd -> manama: 168 km, 1.99 h | 613 > 95 > 80
fanateer -> manama: 171 km, 1.99 h | 1 > 613 > 95 > 80
jubailCity -> bahAirport: 163 km, 1.96 h
jubailCity -> amwaj: 169 km, 1.99 h
jubailInd -> seef: 162 km, 1.92 h
dammam -> manama: 75 km, 0.99 h | 619 > 613 > 80
dammam -> bahAirport: 81 km, 1.10 h
khobar -> manama: 52 km, 0.72 h | 80
khobar -> bahAirport: 58 km, 0.83 h
dhahran -> manama: 65 km, 0.94 h
dammam -> seef: 70 km, 0.92 h
dammam -> bic: 81 km, 1.09 h
khobar -> bic: 58 km, 0.82 h
dmmAirport -> manama: 105 km, 1.27 h | 605 > 95 > 80
riyadh -> jeddah: 953 km, 10.47 h | 522 > 40 > 267 > 40 > 5
kafd -> corniche: 969 km, 10.72 h
ruh -> jeddah: 986 km, 10.79 h
jeddah -> kafd: 958 km, 10.58 h
jeddah -> ruh: 983 km, 10.79 h
riyadh -> taif: 786 km, 8.59 h
taif -> jeddah: 175 km, 2.14 h | 15 > 40 > 5
jeddah -> madinahHaram: 404 km, 4.56 h | 271 > 5 > 15
corniche -> madinahHaram: 404 km, 4.58 h
balad -> madinahHaram: 412 km, 4.68 h
madinahHaram -> jed: 398 km, 4.76 h
jed -> madinahHaram: 399 km, 4.70 h
dammam -> westBay: 340 km, 3.99 h | 619 > 615 > 95 > 617 > 95 > 615 > Q5
khobar -> westBay: 337 km, 3.99 h
dammam -> doh: 344 km, 4.10 h
dammam -> lusail: 352 km, 4.15 h
dammam -> hofuf: 152 km, 1.77 h
hofuf -> salwa: 162 km, 1.85 h
dmmAirport -> westBay: 356 km, 4.17 h
```
