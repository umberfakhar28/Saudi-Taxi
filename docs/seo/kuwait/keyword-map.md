# Kuwait cluster: keyword map and plan (Step 1, for checkpoint)

Branch `seo-kuwait-nov`. Data: Search Console, last 28 days, export of 19 Nov 2026.
Nothing is built yet. This file is the plan to approve.

---

## 1. What the data says

59 Kuwait-related queries, 494 impressions, 0 clicks. Grouped by intent:

| Cluster | Queries | Impr. | Avg pos. | Examples |
|---|---|---|---|---|
| A. Riyadh/Saudi → Kuwait distance (EN + AR) | 13 | 168 | 7.7 | riyadh to kuwait distance, distance from riyadh to kuwait by road, saudi to kuwait distance, how far is kuwait from riyadh, المسافة من الرياض الى الكويت بالسيارة, كم كيلو من الرياض الى الكويت |
| B. Kuwait → Riyadh distance | 5 | 88 | 6.7 | kuwait to riyadh distance by road, kuwait to saudi distance by road |
| C. Riyadh/Saudi ↔ Kuwait by road / by car / city | 7 | 88 | 7.2 | riyadh to kuwait by road, riyadh to kuwait by car, saudi to kuwait by road, riyadh to kuwait city |
| D. Dammam ↔ Kuwait | 8 | 86 | 9.3 | dammam to kuwait distance, kuwait to dammam by road, كم المسافه من الدمام الى الكويت |
| E. Khafji / Nuwaiseeb / border | 20 | 41 | 7.9 | khafji border kuwait, nuwaiseeb border kuwait, khafji to kuwait distance, تاكسي الخفجي, النويصيب, دخول الكويت |
| F. Kuwait hub | 6 | 23 | 52.1 | chauffeur service in kuwait (pos 58), private driver kuwait (79), how to go failaka island (43), مطار الكويت |

**Takeaways**
- **70% of the demand (A + B + C, 344 impressions) is "how far / by road".** It is informational, and it lands on `/distance/riyadh-to-kuwait`, which has 1,070 impressions at a 0.47% CTR.
  - The quickest lead win is a better snippet on that page plus a booking box at the top of it.
- **There are no "riyadh to kuwait taxi" queries in the 28 days.** The route page earns its impressions from "by road" and "by car" searches.
  - Its 7% CTR shows people click when it appears, so the job is to send more of the by-road traffic to it.
- **The page list has extra Kuwait pages the brief didn't include:** `/border-crossing` (617 impr, 9 clicks), `/destinations/al-shaheed-park` (72), `/destinations/salmiya` (49 impr, 3 clicks) and `/destinations/failaka-island` (26).
  - `/destinations/failaka-island` already exists, so it, not a new blog, should own "how to go failaka island".

---

## 2. Keyword map: one owner page per cluster

Changes from the brief are marked **[adjusted]**.

| Cluster | Owner page | Role | Note |
|---|---|---|---|
| A. riyadh/saudi to kuwait distance, how far, by road distance (EN + AR) | `/distance/riyadh-to-kuwait` | Informational → booking | As in the brief |
| B. kuwait to riyadh distance | `/distance/riyadh-to-kuwait` (new H2 "Kuwait to Riyadh distance by road") | Informational | Links to `/kuwait-to-riyadh-taxi-service` |
| C. riyadh to kuwait by road / by car / kuwait city; riyadh to kuwait taxi | `/riyadh-to-kuwait-taxi-service` | **Main lead page** | Distance page title leads with "Distance"; route page title leads with "Taxi". Both say "by road", but the intents differ, so no cannibalisation |
| kuwait to riyadh taxi / by road | `/kuwait-to-riyadh-taxi-service` | Transactional | |
| D. dammam ↔ kuwait distance (both directions) | `/distance/dammam-to-kuwait` (new H2 "Kuwait to Dammam distance by road") | Informational → booking | **[adjusted]** All 8 queries are distance or by-road, including "kuwait to dammam by road" |
| dammam ↔ kuwait taxi | `/dammam-to-kuwait-taxi-service`, `/kuwait-to-dammam-taxi-service` | Transactional | |
| khafji to kuwait distance, كم تبعد الخفجي عن الكويت | `/distance/khafji-to-kuwait` | Informational | **[adjusted]** The page exists. Its 180 km figure is wrong (see §3) |
| khafji border kuwait, nuwaiseeb border, khafji border, النويصيب, تاكسي الخفجي | `/khafji-to-kuwait-taxi-service` (new "Al Khafji–Al Nuwaiseeb border" section) | Mixed | **[adjusted]** Only 41 impressions in total, so a route-page section owns these, not a blog |
| saudi to kuwait by road (planning: routes, borders, documents), kuwait saudi border crossing, دخول الكويت | New guide `/guides/saudi-arabia-to-kuwait-by-road` | Informational hub | **[adjusted]** The brief's blogs 1 and 2 merged into one guide (see §6) |
| chauffeur service in kuwait, private driver kuwait, kuwait airport, مطار الكويت | `/destinations/kuwait-city` (Kuwait hub) | Hub | **Needs owner confirmation** that in-Kuwait chauffeur and KWI pickups are sold on their own (see §9) |
| how to go failaka island | `/destinations/failaka-island` (add a "How to get to Failaka" section) | Hub child | **[adjusted]** The page exists; no new blog |
| salmiya, al shaheed park | Existing destination pages | Hub children | Link up to the hub only; no other change |

---

## 3. Facts check

Distances and driving times come from OpenStreetMap routing (OSRM). Drive time excludes the border.

| Fact | On the site now | Map data | Proposal (one figure site-wide) |
|---|---|---|---|
| Riyadh → Kuwait City, fastest road | **639 km "via the inland crossing"**, 7–9 h | **716 km, 7.6 h, via Khafji–Nuwaiseeb (coastal)** | **"about 715 km, 7.5–8.5 hours of driving, plus the border"** |
| Riyadh → Kuwait City via Al Ruqi'i–Salmi (inland) | — | 747 km, 8.4 h (via Al Artawiyah / Hafar Al Batin) | Mention as the alternative: "about 750 km" |
| Riyadh → Kuwait Airport (KWI) | — | 709 km, 7.6 h | Use the same "about 715 km" |
| Straight line Riyadh–Kuwait City | 535 km | 535 km | Keep |
| Dammam → Kuwait City | 410 km; "5–6 h" and "5.5–6.5 h" on the same page | 413 km, 4.4 h, via Khafji | **"about 410 km, about 4.5 hours driving, 5–6 hours with the border"** |
| Khafji → Kuwait City | **~180 km**, 2.5–3 h | **124 km, 1.4 h** | **"about 125 km (15 km to the border), 1.5 hours driving, 2–3 hours with the border"** |
| Kuwait to Khafji page (reverse) | ~180 km | 124 km | Same fix |
| KWI → Kuwait City / Salmiya | Salmiya "20–25 min" | 30 km, 26 min / 33 km, 29 min | "about 25–30 minutes" |
| Riyadh → Kuwait fare | **from 300 KWD** (confirmed 18 Oct, both directions, Prado and Yukon) | — | **from 230 KWD**, per the brief. See §9 for the open questions |
| KWI terminals | Not mentioned | Unsettled. Reports say T1 was damaged earlier this year, T4/T5 resumed in April, and the new T2 targets late 2026 | **Name no terminal.** Say "we meet you at whichever terminal your airline uses, and track the flight" |
| Border waits | "varies" | No reliable public figures | Use ranges only from the owner's driver experience, else "varies" |

Public distance sites quote 628–718 km for Riyadh–Kuwait City, which is why the site's own FAQ already says "630 to 715 km". The 716 km routing via Khafji is the one the map data supports as fastest.

**Which crossing do your drivers actually use from Riyadh?** The answer decides the headline figure. If it is the inland Al Ruqi'i–Salmi crossing, use "about 750 km, 8–9 hours".

---

## 4. Main page outline: `/riyadh-to-kuwait-taxi-service`

The page moves from the old long-form template to the redesigned layout (the same component as Riyadh to Bahrain), extended with optional blocks, so the Bahrain page does not change.
- Each section has an eyebrow label plus an H2, and section backgrounds alternate.
- New card grids use intent prefetch (IntentLink).

**Head**
- **H1:** "Riyadh to Kuwait Taxi by Road: Private Car Door to Door" (55 chars).
- **Title:** "Riyadh to Kuwait Taxi by Road from 230 KWD | Private Car" (56 chars, no brand suffix).
- **Meta:** "Private taxi from Riyadh to Kuwait City by road: about 715 km, 7.5 to 8.5 hours via the Khafji border. From 230 KWD per car, 24/7. Book on WhatsApp." (148 chars)
- **Canonical and hreflang:** self canonical; hreflang en ↔ `/ar/riyadh-to-kuwait-taxi-service` + x-default. Both already exist and stay as they are.
- **Last reviewed:** November 2026.

**Sections**

| # | Section | Content | Status |
|---|---|---|---|
| 1 | Hero | Subheading; chips (24/7 · Flight tracking · English & Arabic drivers · Invoice issued); "From 230 KWD" badge; [Book on WhatsApp] [Book Online → #booking]; image in a fixed-ratio frame with srcset/sizes; tested at 360–1440 px | Redesign. **Needs a hero photo** (§9) |
| 2 | Booking form `id="booking"` | Bold heading "Online Booking for Riyadh to Kuwait Taxi" plus subline; pre-filled Riyadh → Kuwait; note "Prices may vary by date, vehicle and availability. Your final fare is confirmed before booking." | Redesign |
| 3 | Route at a glance | Stat tiles: Route · ~715 km · 7.5–8.5 h + border · Border: Khafji–Nuwaiseeb (Al Ruqi'i–Salmi alternative) · Private, door to door · From 230 KWD; bold link "Riyadh to Kuwait distance by road →" | Moved after the form |
| 4 | Prices & vehicles | Vehicle cards: the base vehicle "From 230 KWD", others "on request"; "Per vehicle, one way. Prices vary by date & availability." | Redesign |
| 5 | Booking methods | 3 cards: WhatsApp (pre-filled "Hi, I want to book Riyadh to Kuwait") · Online form (#booking) · Email info@gulftripservice.com | New |
| 6 | Payment & invoice | Cards: Cash to the driver after drop-off · Bank transfer after pickup · Card / payment link (+15% VAT, same wording as the FAQ page); "An invoice is issued for every booking." | New. Reuses existing site-wide payment copy |
| 7 | Why book with us | Icon cards: 24/7 · Flight tracking · Chauffeur service · English & Arabic drivers · Smooth border crossing (driver: vehicle papers; passengers: their own visas) · Private, never shared · Door to door | New layout, existing facts |
| 8 | Journey timeline | Riyadh pickup (Olaya, KAFD, King Khalid Airport) → highway → rest stop → Saudi exit → Kuwait entry → drop-off (Kuwait City, Salmiya, hotels, KWI) | Redesign |
| 9 | Al Khafji / Al Nuwaiseeb border | When the coastal vs the inland crossing is used; waits as ranges + "varies"; driver vs passenger duties; links to the 4 Khafji pages + `/border-crossing` | New |
| 10 | Documents checklist | Passport, Kuwait visa / eVisa eligibility, GCC ID, Iqama + exit/re-entry; callout "rules change, verify with official sources" | From the existing checklist |
| 11 | Kuwait Airport (KWI) | Meet & greet, flight tracking, when to leave Riyadh before a flight (~715 km + border + check-in); no terminal names; link to the Kuwait hub | New |
| 12 | Top destinations in Kuwait | 9 cards with image placeholders: Kuwait Towers, The Avenues, Souq Al-Mubarakiya, Salmiya & Marina Mall, Grand Mosque, Al Hamra Tower, Sheikh Jaber Al-Ahmad Cultural Centre, Al Shaheed Park, Failaka Island. Salmiya, Al Shaheed Park and Failaka link to their existing pages; "Explore Kuwait City" → hub | New |
| 13 | Top hotels in Kuwait | 6–8 cards, no photos or logos: name, area, type, approx. drive time from KWI, "Book Riyadh to [Hotel]" (WhatsApp or form pre-filled) | New (see §6) |
| 14 | Explore nearby from Kuwait | Cards to existing pages only: Khafji, Dammam/Khobar, Jubail, Bahrain, Riyadh | New |
| 15 | Other popular routes | The 10 existing pages listed in the brief | New |
| 16 | Return trip strip | → `/kuwait-to-riyadh-taxi-service` "taxi from Kuwait to Riyadh" | Existing pattern |
| 17 | FAQ | 12 short answers (≤25 words, key facts bold), from real queries: by road, by car vs flight, how far, time, price, which border, Khafji border, documents, KWI pickup, payment, invoice, return trip. FAQPage schema uses the same text | Rewrite |
| 18 | Final CTA banner | WhatsApp + Book Online | **Conflict:** you removed the closing band from the Bahrain page on 12 Nov (§9) |

**Schema**
- BreadcrumbList.
- TaxiService/Service with areaServed Riyadh + Kuwait, plus an Offer: price 230, priceCurrency KWD, matching the visible price.
- FAQPage.

**GA4**
- New WhatsApp buttons send `whatsapp_click` with `button_location` (hero, form, booking-methods, hotel card, final CTA) and `route`.
- The form keeps `generate_lead`.

---

## 5. Changes per page

| Page | Changes |
|---|---|
| `/riyadh-to-kuwait-taxi-service` | Everything in §4 |
| `/ar/riyadh-to-kuwait-taxi-service` | **Data-level mirror on the current Arabic template:** price 230, the new facts, H1/title/meta in natural Arabic (تاكسي من الرياض إلى الكويت، المسافة من الرياض إلى الكويت بالسيارة), the 12 FAQs in Arabic, form note. A full port of the new layout to Arabic is a separate, larger job (§9) |
| `/kuwait-to-riyadh-taxi-service` | Price 230 (if it applies, §9), facts, link "Riyadh to Kuwait taxi", FAQ fix. Template unchanged |
| `/distance/riyadh-to-kuwait` | Title "Riyadh to Kuwait Distance by Road: 715 km, 8 hrs + Taxi Fare" (60); meta (142) with number, border and "from 230 KWD"; answer box in the first lines; H2 "Kuwait to Riyadh distance by road"; above-the-fold booking box ("Private taxi Riyadh → Kuwait from 230 KWD": [WhatsApp] [Book Online → route page #booking]); Arabic answer line (`lang="ar"`); table "Saudi Arabia to Kuwait by road: from Riyadh / Dammam / Khafji"; facts fixed (639 → 715); "Riyadh to Kuwait taxi" link |
| `/distance/dammam-to-kuwait` | Title "Dammam to Kuwait Distance by Road: 410 km, 4.5 hrs + Border" (59); meta (148); answer box; H2 "Kuwait to Dammam distance by road"; booking box → the Dammam/Kuwait route pages (no price: none confirmed); one drive-time figure |
| `/distance/khafji-to-kuwait` | 180 → 125 km; answer box; booking box → Khafji route pages |
| `/khafji-to-kuwait-taxi-service` | New section "Al Khafji–Al Nuwaiseeb border crossing" (border queries, تاكسي الخفجي); 180 → 125 km; link "Riyadh to Kuwait taxi" |
| `/kuwait-to-khafji-taxi-service` | 180 → 125 km |
| `/dammam-to-kuwait-taxi-service`, `/kuwait-to-dammam-taxi-service` | Drive-time fix; link "Riyadh to Kuwait taxi" (Dammam → Kuwait only, per the brief) |
| `/destinations/kuwait-city` (hub) | Title "Chauffeur Service in Kuwait & Kuwait Airport Transfers" (54); meta (149); sections: chauffeur services, Kuwait Airport (no terminal names), top attractions (incl. "How to get to Failaka Island" → the Failaka page), hotels grid, routes to/from Saudi; links to all Kuwait route and distance pages + the new guide |
| `/destinations/failaka-island` | Add a "How to get to Failaka Island" section (ferry from Kuwait City; facts verified before writing) |
| `/border-crossing` | "Riyadh to Kuwait taxi" link + facts aligned (it lists Kuwait distances) |
| `/services/riyadh` | Add "Riyadh to Kuwait taxi" link (none today) |
| `/routes` | Check that the Kuwait card links with the right anchor (it lists all routes from data) |
| Distance page template | New optional `bookingBox` and `answerBox` fields. Only the 3 Kuwait distance pages use them now; the other 30 pages are unchanged |
| Redesigned route template | Extended with optional blocks (booking methods, payment, border, documents, airport, destinations, hotels, nearby, final CTA) and KWD prices. The Bahrain page stays as it is |

**Form-heading audit (brief §2.2):**
- Every booking form builds its heading from that page's own origin and destination, or from fixed generic text on hub pages.
- No page shows another route's heading.
- The "Riyadh to Dammam & Khobar" heading in your screenshot is not on this site, so I take it as the style reference only.

---

## 6. New pages and content

| Item | Recommendation | Why |
|---|---|---|
| `/hotels/kuwait/*` pages | **Do not create them in this round. Use hotel cards only**, on the main page and on the hub | No hotel query appears in the 28 days. Eight "Riyadh to [Hotel] taxi" pages would differ mainly by hotel name, which is thin or doorway territory. The current hotel template is built for airport transfers, not "Riyadh to [Hotel]". If you still want pages, I suggest at most 3 (e.g. Four Seasons Burj Alshaya, JW Marriott Kuwait City, Jumeirah Messilah Beach), each with genuinely unique content |
| Hotel list (cards) | Four Seasons Hotel Kuwait at Burj Alshaya, Waldorf Astoria Kuwait, JW Marriott Kuwait City, The St. Regis Kuwait, Jumeirah Messilah Beach, Arabella Beach Hotel, Crowne Plaza Kuwait Al Thuraya City, Hilton Garden Inn Kuwait | Your list. Drive times from KWI come from map routing; no photos, logos or partnership claims |
| Guide: "Saudi Arabia to Kuwait by Road: Routes, Borders, Documents & Travel Time" at `/guides/saudi-arabia-to-kuwait-by-road` | **Build: 1 page.** It merges the brief's blogs 1 and 2 | Owns "saudi to kuwait by road", "kuwait saudi border crossing" and "دخول الكويت". It gets one H2 per crossing (Khafji–Nuwaiseeb, Al Ruqi'i–Salmi); a key-facts table for the 3 starting cities; FAQ + FAQPage, Article + BreadcrumbList schema, author and date; links to the 3 distance pages and 6 route pages; a booking CTA. 1,200–1,600 words |
| Blog: Khafji–Nuwaiseeb border guide | **Don't build** | 41 impressions in total. The new Khafji route-page section plus the guide's border H2 cover it without two pages competing |
| Blog: Failaka Island | **Don't build** | `/destinations/failaka-island` exists; add a "how to get there" section to it |
| Content audit | There is no Kuwait or Khafji article in /blog or /guides today. `/guides/long-distance-private-transfers` mentions Kuwait 3 times: align its facts and add a link to the new guide | |
| Opportunity (report only) | "Kuwait Airport ↔ Riyadh / Dammam taxi" pages | Listed for later, not built |

---

## 7. Internal links (planned)

- **Main page, 12–18 contextual links, each with a distinct anchor:**
  - distance page ("Riyadh to Kuwait distance by road");
  - reverse route ("taxi from Kuwait to Riyadh");
  - Khafji pages ×4;
  - `/border-crossing`;
  - the Kuwait hub ("chauffeur service in Kuwait");
  - Salmiya, Al Shaheed Park, Failaka;
  - the new guide ("Saudi Arabia to Kuwait by road");
  - Riyadh airport ("King Khalid Airport pickup");
  - Dammam ↔ Kuwait route pages.
- **Reverse links to `/riyadh-to-kuwait-taxi-service`, anchor "Riyadh to Kuwait taxi":**
  - from `/distance/riyadh-to-kuwait`, `/kuwait-to-riyadh-taxi-service`, `/khafji-to-kuwait-taxi-service`, `/dammam-to-kuwait-taxi-service`, `/destinations/kuwait-city`, `/services/riyadh` (new), `/routes`, `/border-crossing` and the new guide.
  - Today only `/border-crossing`, the distance page and the Kuwait hub link to it.
- The final report will hold the full from → to → anchor table.

---

## 8. Build and deployments (max 2)

1. **Build everything (§4–§7) locally on `seo-kuwait-nov`.**
   - QA at 360 / 390 / 768 / 1024 / 1440.
   - `next build`: all pages ○/●, the new guide is static, and there are no new dynamic routes.
   - Lighthouse SEO and Accessibility ≥ 95, CLS < 0.1.
   - Validate the schema; check canonicals and hreflang.
   - You review locally.
2. **Deployment 1:** merge to `main` and push when you say so.
3. **Deployment 2:** held back for fixes after you review it live (or for the Arabic port, if you approve it later).

No hotel URLs are added. The sitemap gains 1 URL (the guide) and updated lastmod dates.

---

## 9. Decisions needed from you

1. **Price.** The code has **300 KWD** as the confirmed fare (18 Oct), shared by Riyadh→Kuwait and Kuwait→Riyadh, for the Land Cruiser Prado and the GMC Yukon.
   - (a) Does 230 KWD also apply to **Kuwait → Riyadh**?
   - (b) Which vehicle is the 230 "base vehicle"? Prado, Yukon, or a sedan not currently offered on this route?
   - (c) What do the other vehicles show: "on request", or a price?
2. **Distance and border.** Do your drivers normally use the coastal Khafji–Nuwaiseeb crossing (→ "about 715 km") or the inland Al Ruqi'i–Salmi crossing (→ "about 750 km")? The site's current 639 km is not supported by map data. Typical border waits from your drivers' experience, if you want ranges shown.
3. **Kuwait hub.** Do you sell chauffeur service and KWI airport pickups **inside Kuwait** on their own (not only as part of a cross-border trip)? If not, the hub should not target "chauffeur service in Kuwait".
4. **Trust chips.** Can "English & Arabic speaking drivers" and "an invoice is issued for every booking" be stated as facts?
5. **Final CTA banner.** You removed it from the Bahrain page on 12 Nov. Include it on the Kuwait page anyway (as the brief asks), or leave it off for consistency?
6. **Hero photo.** Do you have a Riyadh → Kuwait cover image, like the ones supplied for Bahrain? Otherwise I'll reuse an existing photo in a fixed-ratio frame.
7. **Hotels.** Cards only (recommended), or up to 3 pages?
8. **Arabic.** Data-level mirror on the current Arabic template now (recommended, fits the 2-deployment limit), or a full Arabic port of the new layout?
