# New route pages: Phase A report

Branch `dev`, 20 November 2026. Plan and research: [new-routes-plan.md](new-routes-plan.md).

## 1. Owner decisions (20 November 2026)

1. **Door-to-door times** now include the causeway crossing (45–75 min) on every related page:
   - Jubail ↔ Bahrain: **~160 km, 2.5–3 h** (was 150 km, 2–2.5 h);
   - Dammam ↔ Bahrain: **~65 km, 1–2 h** (was 1–1.5 h).
2. **Dammam → Bahrain fare:**
   - a **sedan** is "Starting from **500 SAR**", and "Starting from **550 SAR**" to Bahrain International Airport;
   - the causeway **toll is included**;
   - **no price is stated for Khobar or Dhahran pickups**, which are told the fare is confirmed on WhatsApp;
   - SUV and van fares are not stated ("Get your fare on WhatsApp").
3. **Same-day return:** left out.
4. **Al Khobar:** covered inside the Dammam page. A separate page will be added only if the queries call for it.
5. **Photos:** the owner supplied three, converted to WebP (768 / 1280 / full widths, plus a 1200×630 OG image).
6. **Phase B (for later):** Jeddah → Riyadh is also "Starting from 2,400 SAR".

## 2. Pages created

| Page | Title (chars) | H1 | Canonical | Primary keyword | Price |
|---|---|---|---|---|---|
| /jubail-to-bahrain-taxi-service | Jubail to Bahrain Taxi: Private Car via the Causeway (52) | Jubail to Bahrain Taxi: From Jubail Industrial City to Manama | self, absolute | jubail to bahrain taxi | none ("Fare confirmed before booking") |
| /dammam-to-bahrain-taxi-service | Dammam to Bahrain Taxi from 500 SAR \| Private Car (49) | Dammam to Bahrain Taxi: Private Car Across the Causeway | self; hreflang en/ar/x-default | dammam to bahrain taxi | Starting from 500 SAR (550 SAR to BAH) |
| /ar/dammam-to-bahrain-taxi-service | تاكسي الدمام إلى البحرين من 500 ريال \| سيارة خاصة (49) | تاكسي من الدمام إلى البحرين بالسيارة عبر جسر الملك فهد | self; hreflang en/ar/x-default | من الدمام إلى البحرين سيارة | يبدأ من 500 ريال (550 إلى المطار) |

**Meta descriptions:** 149, 155 and 147 characters.

**What every page has:**
- static build (○);
- breadcrumb Home › Border Crossing › page;
- a booking form under the banner heading "Online Booking for {A} to {B} Taxi", with the route pre-filled;
- a WhatsApp message prefilled per page;
- a "Route at a glance" tile row;
- one compact trust strip: 24/7 · flight tracking · English & Arabic drivers · cash, bank transfer or payment link · invoice;
- 9 FAQs, each answer 25 words or fewer, with FAQPage schema matching the visible text.

**Schema per page:**
- Service with `areaServed` set to both endpoints plus BAH;
- an Offer **only** on the two priced pages (500 and 550 SAR, SAR);
- FAQPage;
- BreadcrumbList.

**Tracking:** `whatsapp_click` (button location and route) and `generate_lead` on form submit, through the existing helpers.

**Structure: each page has its own section order and section types**

| Jubail → Bahrain | Dammam → Bahrain (EN) | الدمام → البحرين (AR) |
|---|---|---|
| At a glance | At a glance | At a glance |
| **Pickup zones in Jubail** (cards with km) | **Fare table** (by drop-off) | **Fare table** |
| Road timeline (Route 613 → causeway) | **Distance from your pickup** (table + Khobar photo) | Distance from your pickup |
| **Weekend timing guide** (quiet / busy / busiest) | **City vs Dammam Airport pickup** (comparison) | Causeway step by step |
| Drop-offs in Bahrain (with km) | **Causeway step by step** (numbered) | City vs airport |
| **Before you leave Saudi Arabia** (exit/re-entry) | **Day-trip ideas** (Seef, Bab Al Bahrain, BIC, Amwaj) | Day-trip ideas |
| Cross-links | Tips for a quicker crossing | FAQ |
| FAQ | Cross-links | Cross-links |
| Return + other routes, closing CTA | FAQ, return + other routes, closing CTA | Return + other routes, closing CTA |

The new section types were added to `RouteLanding`: pickupAreas, compare, timingGuide, checklist, ideas, crossLinks and fares. The existing designed pages are unchanged.

## 3. Similarity check

Method: 5-word shingles and Jaccard similarity on the `<main>` content, with the shared booking form removed. The target was under 25%; every pair is far below it.

| Page | Compared with | Overlap |
|---|---|---|
| /jubail-to-bahrain | /dammam-to-bahrain | 4.2% |
| /jubail-to-bahrain | /bahrain-to-jubail (reverse) | 0.3% |
| /jubail-to-bahrain | /distance/bahrain-to-jubail | 1.9% |
| /jubail-to-bahrain | /riyadh-to-bahrain | 1.6% |
| /dammam-to-bahrain | /bahrain-to-dammam (reverse) | 0.4% |
| /dammam-to-bahrain | /dammam-airport-to-bahrain | 0.7% |
| /dammam-to-bahrain | /distance/bahrain-to-dammam | 1.7% |
| /dammam-to-bahrain | /riyadh-to-bahrain | 1.5% |
| /dammam-to-bahrain | /saudi-arabia-to-bahrain | 0.3% |
| /ar/dammam-to-bahrain | /ar/bahrain-to-dammam | 0.5% |
| /ar/dammam-to-bahrain | /ar/dammam-airport-to-bahrain | 0.1% |
| /ar/dammam-to-bahrain | /ar/riyadh-to-bahrain | 0.1% |

Main content: about 1,350 words on each English page and about 1,180 on the Arabic page.

## 4. Facts verified

All road figures come from OSRM routing on 20 November 2026; the full output is in the plan, §9. Crossing times use the figure already published on the site (usually 45–75 min).

**Jubail → Bahrain:**

| From | To | Distance |
|---|---|---|
| Jubail city | Manama | 157 km |
| Jubail Industrial City | Manama | 168 km |
| Al Fanateer | Manama | 171 km |
| Jubail city | Juffair | 156 km |
| Jubail Industrial City | Seef | 162 km |
| Jubail city | Bahrain International Airport | 163 km |
| Jubail | Amwaj | 169 km |

Driving time is about 2 h on Route 613 to Al Khobar, then the causeway.

**Dammam → Bahrain:**

| From | To Manama | Driving | To Bahrain Airport |
|---|---|---|---|
| Al Khobar | 52 km | 43 min | 58 km |
| Dhahran | 65 km | 56 min | 71 km |
| Dammam centre | 75 km | 59 min | 81 km |
| DMM airport | 105 km | – | – |

Also from Dammam centre: Seef 70 km, Juffair 74 km, Bahrain International Circuit 81 km. Al Khobar → Bahrain International Circuit is 58 km.

**Consistency:** the distance pages, both reverse route pages (EN + AR), the city pages and the blog post now quote the same figures.

**Also corrected:** /services/dammam listed Dammam Airport → Bahrain at "~1–1.5 hrs"; it now reads ~1.5–2.5 hrs, matching the airport page.

## 5. Links

**From the new pages (in-body, unique anchors):**

| From | To | Anchor |
|---|---|---|
| Jubail → Bahrain | /distance/bahrain-to-jubail | Jubail to Bahrain distance by road |
| | /bahrain-to-jubail-taxi-service | Bahrain to Jubail taxi · Taxi from Bahrain to Jubail |
| | /dammam-to-bahrain-taxi-service | Dammam to Bahrain taxi |
| | /dammam-airport-to-bahrain-taxi-service | Dammam Airport to Bahrain taxi |
| | /destinations/manama · /destinations/amwaj-islands · /destinations | View Manama · View Amwaj Islands · More Gulf destinations |
| | /riyadh-to-bahrain, /dammam-to-kuwait, /saudi-arabia-to-bahrain, /dammam-to-riyadh | other-route cards |
| | /services/jubail · /border-crossing | Taxi service in Jubail · Saudi border crossings |
| Dammam → Bahrain | /distance/bahrain-to-dammam | Dammam to Bahrain distance by road |
| | /dammam-airport-to-bahrain-taxi-service | Dammam Airport to Bahrain taxi |
| | /bahrain-to-dammam-taxi-service | Bahrain to Dammam taxi · Taxi from Bahrain to Dammam |
| | /jubail-to-bahrain-taxi-service | Jubail to Bahrain taxi |
| | /destinations/manama · /destinations/amwaj-islands | day-trip cards |
| | /services/dammam · /services/khobar · /border-crossing · /blog/bahrain-to-dammam-travel-options | Taxi in Dammam · Al Khobar taxi service · All border crossings · Every way to cross the causeway, compared |
| | /riyadh-to-bahrain, /dammam-to-kuwait, /dammam-airport-to-qatar, /dammam-to-riyadh, /saudi-arabia-to-bahrain | other-route cards |
| الدمام → البحرين | /ar/bahrain-to-dammam, /ar/dammam-airport-to-bahrain, /ar/riyadh-to-bahrain, /ar/dammam-airport-to-qatar, /ar/riyadh-to-kuwait, /ar/riyadh-to-qatar, /ar/border-crossing | Arabic anchors |
| | /distance/bahrain-to-dammam | المسافة من الدمام إلى البحرين بالسيارة |

**Links to the new pages:**

| From | To | Anchor |
|---|---|---|
| /distance/bahrain-to-jubail | Jubail → Bahrain | the booking box's "Travelling Jubail to Bahrain?" link, the reverse section, and the FAQ "Jubail to Bahrain taxi" |
| /distance/bahrain-to-dammam | Dammam → Bahrain | the booking box's reverse link (was the airport page), the reverse section, and the FAQ "Dammam to Bahrain taxi" |
| /bahrain-to-jubail-taxi-service | Jubail → Bahrain | reverse callout; related "Jubail to Bahrain Taxi (return trip)" |
| /bahrain-to-dammam-taxi-service | Dammam → Bahrain, Jubail → Bahrain | `reverseSlug` and callout now point to the city page; related links |
| /ar/bahrain-to-dammam-taxi-service | /ar/dammam-to-bahrain | reverse callout and related "تاكسي من الدمام إلى البحرين" |
| /dammam-airport-to-bahrain-taxi-service | Dammam → Bahrain, Jubail → Bahrain | "Picking up in Dammam, Al Khobar or Dhahran instead? Dammam to Bahrain taxi" |
| /riyadh-to-bahrain-taxi-service | both | Other Popular Routes cards |
| /ar/riyadh-to-bahrain-taxi-service | /ar/dammam-to-bahrain | related routes |
| /saudi-arabia-to-bahrain-taxi-service | both | route links "Dammam → Bahrain", "Jubail → Bahrain" |
| /border-crossing | both | Popular Specific Cross-Border Routes |
| /services/dammam, /services/khobar, /services/jubail | the matching page | popular routes rows |
| /destinations/manama, /muharraq, /amwaj-islands, /zallaq | both | "Dammam to Bahrain taxi", "Jubail to Bahrain taxi" |
| /routes, /site-map | both | listed automatically or by hand |
| Footer (EN) / Arabic footer | Dammam → Bahrain / الدمام → البحرين | "Dammam → Bahrain" / "الدمام ← البحرين" |

**Distance-page booking box:** both pairs already had a forward route page, so neither fell back to /book-online. The "Travelling {B} to {A}?" link now goes to the new pages.

**Sitemap:** all three URLs are in `sitemap.xml`, with lastmod from git. The Dammam pair carries hreflang. The language switcher (bilingualPages) knows the pair.

**No orphans:** each new page has at least 10 internal links pointing to it.

## 6. QA

- **Build:** `next build` passes and all three pages are static (○). `tsc` is clean, and ESLint shows only existing warnings.
- **Layout:** checked at 360, 390, 768, 1024 and 1440 px on 19 pages (the 3 new ones plus 16 that were changed):
  - no horizontal overflow, broken images, uneven card rows or JS errors;
  - exactly one H1 per page.
- **Internal links:** every internal link on the new pages returns 200. One planned link, /destinations/bahrain, turned out not to exist (404), so it now points to /destinations.
- **Lighthouse** (mobile, local):

| Page | SEO | Accessibility | CLS | LCP |
|---|---|---|---|---|
| /jubail-to-bahrain-taxi-service | 100 | 95 | 0.001 | 1.3 s |
| /dammam-to-bahrain-taxi-service | 100 | 96 | 0.001 | 1.3 s |
| /ar/dammam-to-bahrain-taxi-service | 100 | 95 | 0 | 1.3 s |

- **Accessibility deductions:** all site-wide and not caused by these pages:
  - the contrast of the WhatsApp-green buttons;
  - the footer `h4` heading order;
  - the logo `aria-label`.
- **Performance:** scores are 67–69 locally, the same as the live Kuwait page measured on the same machine (65).
- **Rich Results:** the JSON-LD parses, and the FAQPage text matches the visible text. Run Google's Rich Results Test on the live URLs after the deployment.

## 7. Not built

**Skipped, by the owner's decision:**
- the same-day return section.

**Deferred:**
- **Phase B and C** pages; the outlines are in the plan. Start after 3–4 weeks of Search Console data on Phase A.
- **Abha → Riyadh / Jeddah / Madinah:** no search demand yet.
- A **separate Al Khobar → Bahrain page**: only if Khobar queries keep growing without the Dammam page ranking for them.

**Optional later:**
- an Arabic Jubail page (Arabic demand is 4 impressions);
- the SUV and van fares for Dammam → Bahrain, once confirmed.

## 8. After the deployment

1. **IndexNow** is pinged with the new and updated URLs (`POST /api/indexnow`).
2. **Search Console → URL Inspection → Request indexing** for:
   - https://gulftripservice.com/dammam-to-bahrain-taxi-service
   - https://gulftripservice.com/ar/dammam-to-bahrain-taxi-service
   - https://gulftripservice.com/jubail-to-bahrain-taxi-service
   - https://gulftripservice.com/bahrain-to-dammam-taxi-service (reverse link and times changed)
   - https://gulftripservice.com/distance/bahrain-to-jubail (new figures)
3. **In 3–4 weeks**, compare these queries against the 19 November export:
   - "dammam to bahrain taxi"
   - "من الدمام إلى البحرين سيارة"
   - "khobar to bahrain (airport)"
   - "jubail to bahrain taxi"

   Then decide on Phase B.
