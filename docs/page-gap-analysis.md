# Page Gap Analysis — gulftripservice.com

Task B (Execution Brief v3, §W6). Compares the current, post-W1–W5 state of the site (110 pages — see `docs/page-inventory.md` for the original audit; several facts below supersede it: W2 added Abha/Taif to the airport data model, W3 migrated 3 hardcoded pages and added 3 route entries, W4 retired 2 more guides, W5 enriched all 13 city hubs) against the candidate master list. Three buckets — **Exists** · **Missing P1** · **Missing P2** — ordered by commercial intent within each section, not alphabetically.

**Reading this document:** "Exists" doesn't always mean "a dedicated page with that exact name." Several candidate items are already covered *contextually* (e.g., inside a city hub's FAQ or an airport page's route table) rather than as their own page — those are called out explicitly so W7 doesn't duplicate content that's already live.

---

## Headline

| Bucket | Location pages | Route corridors | Total |
| --- | --- | --- | --- |
| Exists | 30 | ~20 (incl. both directions where built) | 50 |
| Missing — P1 | 4 | 8 | 12 |
| Missing — P2 | 21 | ~34 | 55 |

(Route corridor counts are approximate — "corridor" and "direction" are counted separately below, matching the brief's "~50 corridors → ~100 pages" framing.)

---

## A — Location pages

### A1. Major cities

| City | Status | Notes |
| --- | --- | --- |
| Jeddah | ✅ Exists | `/services/jeddah` (P1, enriched W5) |
| Riyadh | ✅ Exists | `/services/riyadh` (P1, enriched W5) |
| Makkah | ✅ Exists | `/services/makkah` (P1, enriched W5) |
| Madinah | ✅ Exists | `/services/madinah` (P1, enriched W5, also absorbed the retired Madinah Umrah guide in W4) |
| Dammam | ✅ Exists | `/services/dammam` (P1, enriched W5) |
| Al-Khobar | ✅ Exists | `/services/khobar` (P2, enriched W5) |
| Jubail | ✅ Exists | `/services/jubail` (P2, enriched W5) |
| Taif | ✅ Exists | `/services/taif` (P2, enriched W5) |
| Abha | ✅ Exists | `/services/abha` (P2, enriched W5) |
| Yanbu | ✅ Exists | `/services/yanbu` (P2, enriched W5) |
| Tabuk | ✅ Exists | `/services/tabuk` (P2, enriched W5) |
| Dhahran | ❌ **Missing — P2** | More widely name-dropped than a single landmark entry — it's in Dammam's landmarks (Ithra), the homepage's Eastern Province overview line, Dammam's pickup-points list, and several GCC route pages as a stop/reference point (7 files total) — but every one of those is a passing mention, never its own section. Still no page of its own. Low incremental value given how close it sits to Dammam/Khobar — candidate for a short page or a redirect-style anchor once W9 nav is built, human call either way. |
| Khamis Mushait | ❌ **Missing — P2** | Referenced in Abha's AIRPORT_ROUTES and FAQs (adjacent twin city) but no dedicated page. |
| Al Ahsa (Hofuf) | ❌ **Missing — P2** | Corrected from an earlier draft of this doc, which claimed zero presence — that was wrong. Al-Ahsa/Hofuf is actually named ~11 times across `routeData.ts`, always the same way: as the rest-stop/waypoint on the Riyadh↔Dammam, Riyadh↔Qatar, Riyadh↔Bahrain, and Dammam↔Qatar corridors ("a scheduled rest stop roughly midway, typically near Al-Ahsa or Hofuf"). That's real content, but it's all *transit* framing — nothing treats Al-Ahsa as a destination in its own right. The Hofuf old town / Al-Ahsa Oasis / UNESCO-site angle is still a genuine, unwritten gap. |
| Qassim (Buraidah) | ❌ **Missing — P2** | No page, no airport page, not referenced. |
| Hail | ❌ **Missing — P2** | Same — zero presence. |
| Jazan | ❌ **Missing — P2** | Zero presence; also blocks the Jazan↔Farasan tourism corridor below. |
| Najran | ❌ **Missing — P2** | Zero presence. |
| Al Baha | ❌ **Missing — P2** | Zero presence. |
| Rabigh | ❌ **Missing — P2** | Zero presence; also blocks the Jeddah↔Rabigh/KAEC corridor below. |

**11 of 20 candidate major cities exist. 9 missing, all P2** (Dhahran/Khamis Mushait/Al Ahsa are all name-dropped somewhere on the site — as a landmark, a route waypoint, or an adjacent-city FAQ mention — but none has its own page; Qassim/Hail/Jazan/Najran/Al Baha/Rabigh have zero presence at all).

### A2. Tourism & giga-projects

| Destination | Status | Notes |
| --- | --- | --- |
| AlUla (Hegra) | ✅ Exists | `/services/alula` (P2, enriched W5 — Hegra is its own landmark entry) |
| NEOM / The Line | ✅ Exists | `/services/neom` (P2, enriched W5, includes Sindalah/Trojena) |
| Taif (Al Hada / Al Shafa) | ✅ Exists — covered contextually | Both are landmark entries on `/services/taif`, not separate pages. Matches how the rest of the site handles sub-districts. |
| Abha / Al Soudah | ✅ Exists — covered contextually | Al Souda is a landmark entry on `/services/abha`. |
| Diriyah | ❌ **Missing — P2** | Referenced only as a landmark *within* `/services/riyadh` (At-Turaif). Given its profile (UNESCO site, major Vision 2030 destination), a dedicated page is defensible, but the existing landmark entry already gives it real coverage — this is a "nice to have," not a blank spot. |
| Qiddiya | ❌ **Missing — P2** | Zero presence anywhere on the site. |
| Red Sea Global (Umluj) | ❌ **Missing — P2** | Zero presence; blocks the Jeddah↔Umluj corridor below. |
| Farasan Islands | ❌ **Missing — P2** | Zero presence; blocks the Jazan↔Farasan corridor below (also blocked by Jazan itself being missing). |
| KAEC | ❌ **Missing — P2** | Zero presence; blocks the Jeddah↔Rabigh/KAEC corridor below. |

### A3. Airport transfer pages

The highest-commercial-intent page type per the original brief — worth reading closely.

| Airport | Status | Notes |
| --- | --- | --- |
| Jeddah (JED) | ✅ Exists | `/jeddah-airport-taxi-service` — full `AirportPage` template, W2 |
| Riyadh (RUH) | ✅ Exists | `/riyadh-airport-taxi-service` — full template, multi-terminal, W2 |
| Madinah (MED) | ✅ Exists | `/madina-airport-taxi-service` — full template, W2 |
| Dammam (DMM) | ✅ Exists | `/dammam-airport-taxi-service` — full template, W2 |
| Taif (TIF) | ✅ Exists | `/taif-airport-taxi-service` — full template, W2 |
| Abha (AHB) | ✅ Exists | `/abha-airport-taxi-service` — full template, W2 (also fixed a pre-existing bug: the page used to mislabel itself "(TIF?)") |
| Bahrain Intl. (BAH) | ❌ **Missing — P1** | Causeway traffic is real, existing demand (`/dammam-airport-to-bahrain-taxi-service` already handles the Dammam side) — a BAH-side arrivals page for travelers starting *from* Bahrain is a genuine gap given how much causeway content already exists. |
| Tabuk (TUU) | ❌ **Missing — P1** | Tabuk has a city hub (`/services/tabuk`) but no airport page — same gap pattern the original audit flagged for other cities, now narrowed to just these three. |
| Yanbu (YNB) | ❌ **Missing — P1** | Same — city hub exists, airport page doesn't. |
| AlUla (ULH) | ❌ **Missing — P1** | Same — city hub exists, airport page doesn't, and AlUla is one of the highest-intent tourism destinations on the whole candidate list. |
| NEOM Bay (NUM) | ❌ **Missing — P2** | City hub exists, but NEOM's own content is explicit that most of the project isn't open to general travel yet — lower urgency than the three above until access broadens. |
| Qassim (ELQ) | ❌ **Missing — P2** | No city hub either — blocked behind Qassim itself being missing. |
| Jazan (GIZ) | ❌ **Missing — P2** | Same — blocked behind Jazan. |
| Hail (HAS) | ❌ **Missing — P2** | Same — blocked behind Hail. |

**6 of 14 exist. The 3 P1 gaps (Tabuk, Yanbu, AlUla) are exactly the "city hub but no airport page" pattern the original audit predicted — this is the single most valuable missing-page cluster on this whole list.**

### A4. Cross-border gateways

| Gateway | Status | Notes |
| --- | --- | --- |
| King Fahd Causeway (Bahrain) | ✅ Exists — covered via route pages | `/dammam-airport-to-bahrain-taxi-service`, `/bahrain-to-dammam-taxi-service`, `/border-crossing` hub. This site's pattern is "the route page *is* the gateway page" rather than a separate standalone crossing page — consistent, no gap. |
| Al Raqai / Khafji (Kuwait) | ✅ Exists — covered via route pages | `/dammam-airport-to-khafji-taxi-service`, `/khafji-to-kuwait-taxi-service`. |
| Salwa (Qatar) | ✅ Exists — covered via route pages | `/dammam-airport-to-qatar-taxi-service`, `/qatar-to-dammam-taxi-service`, `/qatar-to-riyadh-taxi-service`. |
| Al Batha (UAE) | ✅ Exists — covered via route pages | Named directly in `/dammam-to-abu-dhabi-taxi-service` and the Dubai route pages' border-process sections. |

**All 4 covered — no gap.** (Listed here for completeness per the brief's own structure; don't generate separate gateway pages, the route pages already do this job.)

### A5. Day tours

Per D4/§7.1 of the header brief, these move to Locations in the nav but the pages themselves are untouched.

| Tour | Status | Notes |
| --- | --- | --- |
| Jeddah City Tour | ✅ Exists | `/jeddah-city-tour-services-in-saudi-arabia` |
| AlUla Day Trip | ✅ Exists | `/reliable-alula-tour-taxi-service-in-saudi-arabia` |
| Taif Day Trip | ✅ Exists — closest match | `/taif-ziyarat-taxi-service` covers this intent under a Ziyarat framing rather than a generic "day trip" framing. |
| Makkah Ziyarat | ✅ Exists — covered contextually | Full site directory on `/ziyarat-services-in-saudi-arabia`, not a Makkah-only page. |
| Madinah Ziyarat | ✅ Exists — covered contextually | Same page, Madinah section. |
| Riyadh City Tour | ❌ **Missing — P2** | Riyadh has no tour page at all — surprising given the capital's Vision 2030 profile (Boulevard, Diriyah, National Museum all already appear as landmarks on `/services/riyadh` with nothing to click through to). |
| Diriyah & Edge of the World | ❌ **Missing — P2** | Both are landmark mentions on `/services/riyadh`; no dedicated tour page. |
| Abha / Al Soudah Tour | ❌ **Missing — P2** | Same pattern — Al Souda is a landmark, no tour page. |

---

## B — Route corridors

Each row is one direction. "✅ Exists" means a real page; "◐ data only" means the corridor is represented in `AIRPORT_ROUTES` or a `popularRoutes` table (so it has a travel-time entry and an internal link target) but has no dedicated page of its own yet — these are lower-effort to promote to full pages than starting from nothing, since the facts are already sourced.

### From Jeddah

| Corridor | Status |
| --- | --- |
| Jeddah → Makkah | ✅ Exists (`/jeddah-to-makkah-taxi-service`, migrated to `RoutePage` in W3) |
| Makkah → Jeddah | ❌ **Missing — P1** (confirmed gap since the original audit; `reverseSlug` on the Jeddah→Makkah entry already forward-references `makkah-to-jeddah-taxi-service`) |
| Jeddah Airport → Madinah | ◐ data only → ❌ **Missing — P1** (in `AIRPORT_ROUTES`, links to `/services/madinah` as a stand-in) |
| Jeddah → Taif | ◐ data only → ❌ **Missing — P2** |
| Jeddah → Abha | ❌ **Missing — P2** |
| Jeddah → Riyadh | ❌ **Missing — P2** (long-distance, lower intent than a flight) |
| Jeddah → Yanbu | ❌ **Missing — P2** |
| Jeddah → AlUla | ❌ **Missing — P2** |
| Jeddah → Rabigh / KAEC | ❌ **Missing — P2** (blocked behind Rabigh/KAEC being missing as locations) |
| Jeddah → Umluj | ❌ **Missing — P2** (blocked behind Red Sea Global/Umluj being missing) |

### From Riyadh

| Corridor | Status |
| --- | --- |
| Riyadh → Dammam | ✅ Exists (`/riyadh-to-dammam-guide`, migrated to `RoutePage` in W3 — slug kept as-is, not renamed) |
| Dammam → Riyadh | ◐ data only → ❌ **Missing — P1** (airport-specific version `/dammam-airport-to-riyadh-taxi-service` exists, but a general city-to-city Dammam→Riyadh page doesn't) |
| Riyadh → Makkah | ◐ data only → ❌ **Missing — P1** (long-distance but very high search intent — Umrah travelers flying into RUH) |
| Riyadh → Madinah | ❌ **Missing — P2** |
| Riyadh → Qassim | ❌ **Missing — P2** (blocked behind Qassim missing) |
| Riyadh → Taif | ❌ **Missing — P2** |
| Riyadh → Abha | ❌ **Missing — P2** |
| Riyadh → AlUla | ❌ **Missing — P2** |
| Riyadh → Diriyah | ❌ **Missing — P2** (intra-region, low distance — arguably better as a tour page, see A5) |
| Riyadh → Al Ahsa | ❌ **Missing — P2** (blocked behind Al Ahsa missing) |

### From Makkah / Madinah

| Corridor | Status |
| --- | --- |
| Makkah → Madinah | ✅ Exists (`/makkah-to-madinah-taxi-service`, migrated to `RoutePage` in W3) |
| Madinah → Makkah | ❌ **Missing — P1** (confirmed gap; `reverseSlug` already forward-references `madinah-to-makkah-taxi-service`) |
| Madinah → Yanbu | ◐ data only → ❌ **Missing — P2** |
| Madinah → AlUla | ❌ **Missing — P2** |
| Madinah → Tabuk | ❌ **Missing — P2** |

### Eastern Province

| Corridor | Status |
| --- | --- |
| Dammam ↔ Khobar / Jubail / Dhahran | ✅ Exists — covered contextually | These are effectively one metro area; each city's own hub already covers the others as `nearbyCities` and FAQ content. No dedicated route pages needed — generating them would be near-duplicate content for a <30-minute drive. |
| Dammam ↔ Riyadh | ✅ Exists (see above) |
| Dammam ↔ King Fahd Causeway | ✅ Exists (see A4) |
| Dammam ↔ Al Ahsa | ❌ **Missing — P2** (blocked behind Al Ahsa missing) |

### Tourism corridors

| Corridor | Status |
| --- | --- |
| Tabuk ↔ NEOM | ❌ **Missing — P2** (both cities' FAQs already reference this connection contextually — same "data exists, page doesn't" pattern) |
| AlUla ↔ Madinah | ❌ **Missing — P2** |
| Abha ↔ Khamis Mushait | ❌ **Missing — P2** (blocked behind Khamis Mushait missing) |
| Jazan ↔ Farasan | ❌ **Missing — P2** (blocked behind both locations missing) |

### GCC / international

| Corridor | Status |
| --- | --- |
| Dammam ↔ Bahrain | ✅ Exists, both directions |
| Dammam ↔ Doha (Qatar) | ✅ Exists, both directions (`/dammam-airport-to-qatar-taxi-service`, `/qatar-to-dammam-taxi-service`) |
| Riyadh ↔ Bahrain | ✅ Exists, both directions |
| Riyadh ↔ Dubai | ✅ Exists, both directions |
| Kuwait ↔ Dammam | ✅ Exists, both directions |
| Dammam ↔ Abu Dhabi | ✅ Exists, one direction only — reverse (Abu Dhabi → Dammam) is a confirmed gap |
| Kuwait ↔ Riyadh | ✅ Exists one direction (Kuwait→Riyadh) — reverse is a confirmed gap |
| Qatar ↔ Riyadh | ✅ Exists one direction (Qatar→Riyadh) — reverse is a confirmed gap |
| Khafji ↔ Kuwait | ✅ Exists one direction — reverse is a confirmed gap |
| Riyadh ↔ Doha | ❌ **Missing — P1** (Riyadh's Qatar connection doesn't exist at all yet — only the Dammam-side Qatar routes do) |
| Riyadh ↔ Abu Dhabi | ❌ **Missing — P2** (only the Dammam-side Abu Dhabi route exists) |
| Jeddah ↔ Amman (Jordan) | ❌ **Missing — P2** (only the generic `/saudi-arabia-to-jordan-land-transfer` hub exists, no dedicated Jeddah-specific route) |

*The 8 confirmed one-directional gaps above (Makkah↔Jeddah, Madinah↔Makkah, Dammam↔Abu Dhabi, Kuwait↔Riyadh, Qatar↔Riyadh, Khafji↔Kuwait, plus Dammam↔Riyadh's general-city version and Dammam-airport↔Khafji's reverse) are the same set `docs/page-inventory.md` and `scripts/seo/check-data-layer.js`'s `reverseSlug` forward-references already track — W7 has a ready-made checklist for these, no re-discovery needed.*

### Executive & pilgrimage

| Corridor / theme | Status |
| --- | --- |
| Umrah Transfers | ✅ Exists | `/umrah-taxi-services`, `/airport-transfer-for-umrah`, `/umrah-transport-package` |
| Corporate Business Travel | ✅ Exists | `/corporate-transportation-services` |
| Hajj Group Transport | ✅ Exists — via guide | `/guides/hajj-transportation` covers this; it's a `GuidePage`-templated informational page rather than a bookable "service," which is a reasonable fit for Hajj group logistics specifically. |
| Multi-city Umrah (JED → Makkah → Madinah → MED) | ❌ **Missing — P2** | `/umrah-transport-package` covers "a package for your whole stay" generically, but there's no page walking through this exact 4-stop itinerary end-to-end. Worth a dedicated page once P1 work is done — it's a natural aggregator that could link every Umrah-relevant page in one place. |

---

## Priority 1 summary (build these first in W7)

**Locations (0 new location pages, 3 airport pages):**
- Tabuk Airport (TUU)
- Yanbu Airport (YNB)
- AlUla Airport (ULH)
- *(Bahrain International (BAH) is arguably P1 too — see A3 — but it's a foreign-airport arrivals page, a different pattern from the rest of the airport template; flagging for a judgment call rather than bucketing it definitively.)*

**Routes (8 pages, all reciprocals of existing routes):**
- Makkah → Jeddah
- Madinah → Makkah
- Jeddah Airport → Madinah
- Dammam → Riyadh (general city-to-city version)
- Riyadh → Makkah
- Riyadh → Doha
- *(Abu Dhabi→Dammam, Kuwait→Riyadh, Qatar→Riyadh, Khafji→Kuwait are also confirmed one-directional gaps, technically P1 by "every corridor ships both directions," but they're secondary GCC corridors — recommend treating as P1.5: right after the 6 above, before the P2 batch.)*

## Priority 2 summary (everything else)

21 location gaps — 9 cities (Dhahran, Khamis Mushait, Al Ahsa, Qassim, Hail, Jazan, Najran, Al Baha, Rabigh — the first three name-dropped on the site already, the rest zero presence), 5 tourism/giga-project destinations (Diriyah, Qiddiya, Red Sea Global/Umluj, Farasan Islands, KAEC), 4 airport pages (NEOM Bay, Qassim, Jazan, Hail), 3 day tours (Riyadh City Tour, Diriyah & Edge of the World, Abha/Al Soudah Tour) — plus roughly 26 route-corridor gaps, almost all of them blocked behind a location that doesn't exist yet (Al Ahsa, Qassim, Hail, Jazan, Najran, Al Baha, Rabigh, Farasan, Khamis Mushait, KAEC, Umluj) — meaning **P2 location pages should be built before their dependent P2 routes**, not in parallel, or the routes will have nothing real to link to on one end.

---

## What this means for W7's order

1. **3 airport pages** (Tabuk, Yanbu, AlUla) — reuses the exact `AirportPage` template from W2, fastest possible P1 wins, each already has a city hub to attach to.
2. **8 reciprocal route pages** — reuses `RoutePage`, content already partially informed by the *forward* direction's existing copy (rewritten per-direction per the brief's copy rules, not mirrored).
3. **New P1 route**: Riyadh ↔ Doha (both directions, since neither exists).
4. Everything else in P2, location pages first, then the routes that depend on them.

Stopping here per the brief — this is the gate. Ready for review before any of the above gets generated.
