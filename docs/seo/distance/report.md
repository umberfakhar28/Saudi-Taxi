# Distance pages: build report

Branch `seo-distance-nov`, 20 November 2026. Plan and audit: [distance-audit.md](distance-audit.md).

## 1. What changed

- **One record per pair.** Each pair's figures, copy and sources now sit in one record in `src/lib/distanceRouteData.ts`, and every figure on the page is read from it. The record holds:
  - the distance, driving time, time with the border, highways and border crossing;
  - links to the route pages in both directions;
  - the source of each figure and the date it was verified.
- **Fares are read, never written.** `src/lib/distanceFare.ts` reads the lowest confirmed fare from the route page's own price data. A distance page can't quote a different number from its route page. Pairs without a confirmed fare say "Quote on WhatsApp".
- **New template** (`src/components/DistancePage.tsx`), in page order:
  1. **Hero:** the H1 "{A} to {B} Distance by Road", then a one-sentence answer in English and Arabic.
  2. **Booking box:** WhatsApp, Book Online (opens the route page's booking form) and a reverse-direction link. On phones it sits above the fold.
  3. **Four tiles:** distance, driving time, border, fare.
  4. **Reverse direction** as its own H2.
  5. **"From each city" table** on the Kuwait and Bahrain pages only.
  6. **Route steps and highways.**
  7. **Border card**, on cross-border pairs only.
  8. **Ways-to-travel comparison.**
  9. **Tips.**
  10. **FAQ,** with Arabic questions where Arabic searches exist.
  11. **Related routes and distance pages.**
  12. **Closing call to action.**
- **Schema:** FAQPage + BreadcrumbList only. The FAQ schema uses the same text as the page.
- **Tracking:** WhatsApp clicks in the booking box are reported with `button_location: distance_booking_box` and the route.
- **No phone or call options.** Every page was checked: there are no `tel:` links.

## 2. Titles and meta descriptions

All titles are ≤ 60 characters with no brand suffix, and all meta descriptions are ≤ 155 characters. The figures are taken from the built pages. Old titles are listed in audit §2.

| Page | Title (chars) | Meta description (chars) |
|---|---|---|
| bahrain-to-riyadh | Bahrain to Riyadh Distance by Road: 470 km & Taxi Fare (54) | Bahrain to Riyadh is about 470 km by road, 4.5–5.5 hrs incl. the King Fahd Causeway. Same distance Riyadh to Bahrain. Private taxi from 1,250 SAR, 24/7. (152) |
| riyadh-to-kuwait | Riyadh to Kuwait Distance by Road: 648 km, 7h 40m, Taxi Fare (60) | Riyadh to Kuwait is about 648 km by road, 7 h 40 min driving via the Al Khafji border. Same distance Kuwait to Riyadh. Private taxi from 220 KWD. (145) |
| bahrain-to-jubail | Bahrain to Jubail Distance by Road: 150 km, 2–2.5 hrs (53) | Bahrain to Jubail is about 150 km by road, 2–2.5 hrs incl. the King Fahd Causeway. Same distance Jubail to Bahrain. Private taxi door to door, 24/7. (148) |
| dammam-to-kuwait | Dammam to Kuwait Distance by Road: 410 km, 4.5 hrs + Border (59) | Dammam to Kuwait is about 410 km by road, 4.5 hrs driving (5–6 with the Khafji border). Same distance Kuwait to Dammam. Private taxi door to door, 24/7. (152) |
| doha-to-riyadh | Doha to Riyadh Distance by Road: 580 km & Taxi Fare (51) | Doha to Riyadh is about 580 km by road, 6.5–7.5 hrs incl. the Salwa border. Same distance Riyadh to Doha. Private taxi from 1,700 SAR, 24/7. (140) |
| dammam-to-dubai | Dammam to Dubai Distance by Road: 800 km, 8–9 hrs + Border (58) | Dammam to Dubai is about 800 km by road, 8–9 hrs driving via the Al Batha–Ghuwaifat border. Same distance Dubai to Dammam. Private taxi door to door. (149) |
| doha-to-dammam | Doha to Dammam Distance by Road: 330 km, 4 hrs + Border (55) | Doha to Dammam is about 330 km by road, about 4 hrs driving plus the Salwa–Abu Samra border. Same distance Dammam to Doha. Private taxi door to door, 24/7. (155) |
| riyadh-to-jeddah | Riyadh to Jeddah Distance by Road: 950 km, 10–11 hrs (52) | Riyadh to Jeddah is about 950 km by road, 10–11 hours driving on Highway 40 via Taif. Same distance Jeddah to Riyadh. Private car with driver on request. (153) |
| riyadh-to-makkah | Riyadh to Makkah Distance by Road: 870 km, 9–10 hrs (51) | Riyadh to Makkah is about 870 km on Highway 40 via Taif, 9–10 hours of driving. Same distance Makkah to Riyadh. Private taxi with a Miqat stop, 24/7. (149) |
| riyadh-to-dubai | Riyadh to Dubai Distance by Road: 1,000 km, 10–11 hrs (53) | Riyadh to Dubai is about 1,000 km by road, 10–11 hrs driving plus the Al Batha–Ghuwaifat border. Same distance Dubai to Riyadh. Private taxi door to door. (154) |
| dammam-to-abu-dhabi | Dammam to Abu Dhabi Distance by Road: 700 km, 7–8 hrs (53) | Dammam to Abu Dhabi is about 700 km by road, 7–8 hrs driving plus the Al Batha–Ghuwaifat border. Same distance Abu Dhabi to Dammam. Private taxi, 24/7. (151) |
| riyadh-to-dammam | Riyadh to Dammam Distance by Road: 400 km, 4 hrs (48) | Riyadh to Dammam is about 400 km on Highway 40, around 4 hours of driving with no border. Same distance Dammam to Riyadh. Private taxi door to door, 24/7. (154) |
| jeddah-to-madinah | Jeddah to Madinah Distance by Road: 420 km, 4.5 hrs (51) | Jeddah to Madinah is about 420 km by road, about 4.5 hours of driving on Route 15. Same distance Madinah to Jeddah. Private taxi from Jeddah Airport. (149) |
| bahrain-to-dammam | Bahrain to Dammam Distance by Road: 65 km, 1–1.5 hrs (52) | Bahrain to Dammam is about 65 km by road, 1–1.5 hrs incl. the King Fahd Causeway. Same distance Dammam to Bahrain. Private taxi door to door, 24/7. (147) |
| khafji-to-kuwait | Khafji to Kuwait Distance by Road: 125 km, 1.5 hrs (50) | Khafji is about 15 km from the Al Nuwaiseeb border and 125 km from Kuwait City by road: 1.5 hrs driving, 2–3 hrs with the border. Same distance both ways. (154) |
| jeddah-to-makkah | Jeddah to Makkah Distance by Road: 80 km, 1–1.5 hrs (51) | Jeddah to Makkah is about 80 km by road, 1–1.5 hours on Highway 40, longer in Umrah season. Same distance Makkah to Jeddah. Private taxi from KAIA, 24/7. (153) |
| makkah-to-madinah | Makkah to Madinah Distance by Road: 450 km, 4–5 hrs (51) | Makkah to Madinah is about 450 km on Route 15 (Hijrah Road), 4–5 hours of driving. Same distance Madinah to Makkah. Private taxi hotel to hotel, 24/7. (150) |
| abha-to-riyadh | Abha to Riyadh Distance by Road: 950 km, 11–12 hrs (50) | Abha to Riyadh is about 950 km by road via Khamis Mushait and Bisha, 11–12 hours of driving. Same distance Riyadh to Abha. Private car on request. (146) |
| abha-to-jeddah | Abha to Jeddah Distance by Road: 690 km, 7.5–8.5 hrs (52) | Abha to Jeddah is about 690 km by road along the Red Sea coast, 7.5–8.5 hours of driving. Same distance Jeddah to Abha. Private car with driver on request. (155) |
| abha-to-madinah | Abha to Madinah Distance by Road: 1,080 km, 12–13 hrs (53) | Abha to Madinah is about 1,080 km by road via the Red Sea coast and Jeddah, 12–13 hours of driving. Same distance Madinah to Abha. Private car on request. (154) |

## 3. Facts corrected

Distances were checked against OSRM road routing. Each record's `source` field holds the raw figures. Every page that quoted the old figure now quotes the new one.

| Pair | Was | Now | Also changed on |
|---|---|---|---|
| Dammam ↔ Dubai | 1,100 km, 11.5–13 h | ~800 km, 9–10.5 h with the border | both route pages |
| Riyadh ↔ Dubai | 1,100 km | ~1,000 km, 11–12.5 h with the border | both route pages, /border-crossing, /riyadh-alternative-airports |
| Dammam ↔ Abu Dhabi | 950 km, 10–11.5 h | ~700 km, 8–9.5 h with the border | both route pages, the long-distance guide |
| Doha ↔ Dammam | 440 km, 5–6 h | ~330 km, 4.5–5.5 h with the border | Qatar → Dammam route page, the long-distance guide |
| Dammam Airport → Bahrain | 65 km | ~100 km, 1.5–2.5 h | EN + AR route pages, airport routes list |
| Dammam Airport → Doha | 440 km | ~350 km, 4.5–5.5 h | EN + AR route pages |
| Abha → Riyadh | 780–850 km | ~950 km, 11–12 h | distance page only (no route page) |
| Abha → Jeddah / Madinah | 620–680 / 980–1,060 km | ~690 / ~1,080 km | distance pages only |

**Figures kept on purpose:**
- **Bahrain–Dammam stays at 65 km.** OSRM gives Manama–Dammam 75 km and Manama–Al Khobar 49 km, and 65 km sits between them. The route pages already use 65 km.
- **Jeddah–Makkah stays at 80 km.** OSRM gives 88 km, which is within the rounding.
- **Riyadh–Kuwait stays at 648 km,** the owner's figure.

**Fares are the same in both directions,** as the owner confirmed on 20 November:
- **Bahrain → Riyadh** shows the same fares as Riyadh → Bahrain (from 1,250 SAR).
- **Doha → Riyadh** shows the same fares as Riyadh → Doha (from 1,700 SAR).

Each pair reads its fares from one shared source, and each route page now has a price FAQ.

**City versus airport.** The Bahrain–Dammam and Doha–Dammam distance pages link to the *Dammam Airport* route pages for the reverse direction, because no Dammam-city route page exists. The airport distance is longer: ~100 km to Bahrain and ~350 km to Doha. Both figures are stated on the distance pages, in the reverse section and the FAQ, so the pages don't contradict each other.

## 4. Internal links added

- **Route pages → distance pages:** every English route page whose pair has a distance page links to it under "at a glance". The anchor is "{A} to {B} distance by road", in the route's own direction.
- **Booking anchor:** the route pages' booking form now has `id="booking"`, so the distance page's Book Online button lands on the form.
- **/border-crossing → distance pages:** each crossing card (Bahrain, Qatar, Kuwait, UAE) lists its distance pages under "Distance by road".
- **/distance index:** now grouped into Bahrain, Qatar, Kuwait, UAE and Within Saudi Arabia.
- **Distance pages:** each one links to both route pages, 3–4 distance pages in the same region, and the matching city and border pages.

## 5. QA

- **Build:** `next build` passes. `/distance` and all 20 pairs are static (○).
- **Types and lint:** `tsc` is clean. ESLint shows only the existing `PHONE_DISPLAY` unused warning on /border-crossing.
- **Layout:** checked at 360, 390, 768, 1024 and 1440 px on 28 pages (all distance pages, /distance, /border-crossing and 6 route pages):
  - no horizontal overflow, broken images or JS errors;
  - exactly one H1 per page;
  - JSON-LD parses on every page.
- **Consistency:** each distance page's km figure matches the route pages it links to, except the two city-vs-airport links above. No stale figures (1,100 km Dubai, 950 km Abu Dhabi, 440 km Doha, 780–850 km Abha) remain in the built HTML. No `{{fare}}` placeholders remain.
- **Lighthouse** (mobile), on /distance, bahrain-to-riyadh, doha-to-riyadh, jeddah-to-makkah, riyadh-to-dubai and /border-crossing:
  - **SEO** 100 on every page.
  - **Accessibility** 95 on every page. The three failing checks are all site-wide and were already there before this change:
    - the colour contrast of the WhatsApp-green button;
    - the footer `h4` heading order;
    - the logo `aria-label` not matching its visible text.
- **Tips grid:** pages with five tips show one row of five on desktop, and the fifth card spans the full width on tablets.

## 6. Missing route pages (listed, not built)

From audit §7. These would give the booking box a direct route page instead of `/book-online`:

- **Jubail → Bahrain.** "jubail to bahrain taxi" already gets impressions.
- **Riyadh ↔ Jeddah** (both directions).
- **Jeddah ↔ Madinah city to city.** Only airport pages exist.
- **Dammam city → Bahrain** and **Dammam city → Qatar.** Only the airport pages exist.
- **Abha → Riyadh / Jeddah / Madinah.**

## 7. Owner follow-up after deployment

1. **Request indexing** in Search Console (URL Inspection → Request indexing) for the top five pages:
   - /distance/bahrain-to-riyadh
   - /distance/riyadh-to-kuwait
   - /distance/bahrain-to-jubail
   - /distance/dammam-to-kuwait
   - /distance/doha-to-riyadh
2. **After 3–4 weeks,** compare CTR and clicks per page against the export from 19 November.
3. **In GA4,** watch `whatsapp_click` with `button_location = distance_booking_box`.
4. **Border waiting times.** The pages say "varies", except at the causeway and Khafji, where the route pages already state a range. Send your drivers' ranges and they can be added.
