# Kuwait cluster: what was built (Steps 2–7)

Branch `seo-kuwait-nov`. Built 19–20 Nov 2026. The plan and keyword map are in [keyword-map.md](keyword-map.md).
Nothing is pushed yet. All of this goes live as **one** deployment.

## Decisions applied (owner, 19 Nov)

- **Price:** starting from **220 KWD** per car, one way, for both directions (Riyadh → Kuwait and Kuwait → Riyadh), Prado and Yukon.
  - A tag says "Prices may vary depending on date & availability".
  - The price is set once (`KUWAIT_RIYADH_FARE`) and shared by every page, form, FAQ and schema offer, in English and Arabic.
- **Route:** Al Khafji (Saudi) / Al Nuwaiseeb (Kuwait), about **648 km**, roughly **7 h 40 min** of driving, on Routes 65, 550 and 95, then Route 40 in Kuwait. It is the coastal road, with more towns and services.
- **Hotels:** cards only, with no hotel pages.
- **Arabic:** the full new layout.
- **Closing CTA:** included on the Kuwait page. It is a long page, and the brief asked for one. The Bahrain page still has none.

## Pages changed or created

| Page | What changed |
|---|---|
| `/riyadh-to-kuwait-taxi-service` | Rebuilt in the designed layout, with 15 sections in the brief's order. |
| `/ar/riyadh-to-kuwait-taxi-service` | The same layout in Arabic, right to left. |
| `/kuwait-to-riyadh-taxi-service` | 220 KWD, the 648 km / 7 h 40 min facts, border FAQ, and a link back to the main page. |
| `/distance/riyadh-to-kuwait` | New title and meta. |
| `/distance/dammam-to-kuwait` | Same treatment, with a "Kuwait to Dammam" H2. Driving time unified to about 4.5 h (5–6 h with the border). Wrong "Ras Tanura" mention removed. |
| `/distance/khafji-to-kuwait` | **180 → 125 km**, plus the answer box and booking box. |
| `/khafji-to-kuwait-taxi-service` | New section on the Al Khafji–Al Nuwaiseeb border, with a facts table and the Arabic names. This page now owns the border searches. 180 → 125 km. New title. |
| `/kuwait-to-khafji-taxi-service` | 180 → 125 km. |
| `/dammam-to-kuwait-taxi-service`, `/kuwait-to-dammam-taxi-service` | Driving time and wording fixed. "Riyadh to Kuwait taxi" link added. |
| `/dammam-airport-to-khafji-taxi-service`, `/khafji-to-dammam-airport-taxi-service` | **180 km / 2–2.5 h → about 280 km / 3 h**. Map routing gives 283 km. |
| `/destinations/kuwait-city` | Now the Kuwait hub. |
| `/destinations/failaka-island` | New "How to get to Failaka Island" section and FAQ. |
| `/guides/saudi-arabia-to-kuwait-by-road` | **New page**, about 1,300 words. |
| `/border-crossing` | The Kuwait card adds "~648 km from Riyadh" and a "Riyadh to Kuwait taxi" button. |
| `/services/riyadh` | Riyadh → Kuwait added to its popular routes. |
| `/guides/long-distance-private-transfers` | Riyadh → Kuwait row added to its table. |
| `/site-map`, `sitemap.xml` | The new guide is added. This is the only new URL. |

### `/riyadh-to-kuwait-taxi-service` in detail

- **Head:**
  - H1 "Riyadh to Kuwait Taxi by Road: Private Car Door to Door".
  - Title "Riyadh to Kuwait Taxi by Road from 220 KWD | Private Car".
  - New cover image.
  - "Online Booking for Riyadh to Kuwait Taxi" in the banner style from your reference.
- **Body sections:**
  - Prices.
  - Booking methods.
  - Payment and invoice.
  - Why us.
  - Journey.
  - Khafji border with photo.
  - Documents.
  - Kuwait Airport.
  - Things to see.
  - Hotels.
  - Nearby.
  - Routes.
  - 12-question FAQ.
  - Closing CTA.

### `/distance/riyadh-to-kuwait` in detail

- Title "Riyadh to Kuwait Distance by Road: 648 km, 7h 40m, Taxi Fare".
- **639 km → 648 km**, with the inland-crossing claim removed.
- Answer box (648 km, 7 h 40 min, border, straight line), with an Arabic answer line.
- Booking box "Private taxi Riyadh → Kuwait from 220 KWD", with WhatsApp and Book Online (`#booking`).
- "Kuwait to Riyadh Distance by Road" H2.
- A Saudi-to-Kuwait table covering Riyadh, Dammam and Khafji.
- New FAQ.

### `/destinations/kuwait-city` in detail

- **Head:**
  - Title "Chauffeur Service in Kuwait & Kuwait Airport Transfers".
  - H1 "Chauffeur Service & Private Driver in Kuwait".
- **Sections:**
  - Chauffeur services: airport, hourly, city, and routes to Saudi Arabia.
  - Failaka ferry.
  - Hotel cards.
- **FAQ:** chauffeur service, KWI distance, Failaka, Saudi routes.

### `/guides/saudi-arabia-to-kuwait-by-road` in detail

- Key-facts table.
- Both crossings.
- Routes from Riyadh, Dammam and Khafji.
- What happens at the border, and documents.
- Timing.
- Taxi vs self-drive vs flight.
- 7-question FAQ.
- Schema: Article + FAQPage + BreadcrumbList, with byline and date.

### Templates

These were extended with optional fields, so other pages render as before:
- RouteLanding;
- QuickBookForm (banner heading);
- DistancePage (answer box, booking box, reverse H2, table);
- DestinationPage (hub sections, hotels);
- GuidePage (Article schema, byline, inline links).

The distance cards now show "7 hours 40 minutes" whole.

## Internal links into `/riyadh-to-kuwait-taxi-service`

| From | Anchor |
|---|---|
| `/distance/riyadh-to-kuwait` | Riyadh to Kuwait taxi (booking box, related services) |
| `/kuwait-to-riyadh-taxi-service` | Riyadh to Kuwait taxi |
| `/khafji-to-kuwait-taxi-service` | Riyadh to Kuwait taxi (related routes); Riyadh to Kuwait taxi (border section) |
| `/dammam-to-kuwait-taxi-service` | Riyadh to Kuwait taxi |
| `/destinations/kuwait-city` | Riyadh to Kuwait taxi (links, chauffeur card) |
| `/destinations/failaka-island` | Riyadh to Kuwait taxi |
| `/services/riyadh` | Riyadh → Kuwait (popular routes) |
| `/border-crossing` | Riyadh to Kuwait taxi (Kuwait card) |
| `/guides/saudi-arabia-to-kuwait-by-road` | private taxi from Riyadh to Kuwait; Riyadh to Kuwait Taxi |
| `/routes` | already listed from route data |

### Links out of the main page

The page has 30+ links. Each anchor is distinct:
- distance page;
- reverse route;
- Khafji ×2 and Dammam Airport ↔ Khafji ×2;
- `/border-crossing`;
- the guide;
- the Kuwait hub;
- Salmiya, Al Shaheed Park, Failaka;
- King Khalid Airport;
- 9 route cards and 4 nearby cards;
- fleet.

## Tracking (GA4)

- **New `button_location` values:** `booking_methods`, `hotel_card`, `final_cta`, `booking_box`.
- **Existing events:** `whatsapp_click` with route, `email_click`, `generate_lead` on the form.
- **WhatsApp opening message:**
  - English: "Hi, I want to book Riyadh to Kuwait".
  - Arabic page: the same in Arabic.

## QA (local production build)

- **Build:** passes; every page above is static (○/●).
- **Layout:** checked at 360, 390, 768, 1024 and 1440 px on 15 pages. No horizontal overflow, no broken images, one H1 per page, equal-height cards in each row, and JSON-LD parses everywhere.
- **Schema:**
  - Service offer at 220 KWD, matching the visible price;
  - FAQPage with the same 12 visible questions;
  - BreadcrumbList;
  - Article on the guide.
- **Canonicals and hreflang:** self-canonical everywhere. en ↔ ar + x-default on the main page.
- **Lighthouse (mobile, local), main page EN and AR and the distance page:** SEO 100, Accessibility 95, CLS 0.001.
  - Both remaining accessibility flags are **site-wide and not from this work**:
    - white text on the WhatsApp-green buttons;
    - an `h4` in the footer after an `h2`.
  - Performance (about 46) is the same as the Riyadh to Bahrain page on the same machine, so it is the site's shared JavaScript, not this page. LCP is 5.8 s, against 6.4 s on Bahrain.

## Facts for the owner to confirm

1. **Riyadh–Kuwait distance:**
   - You confirmed 648 km / 7 h 40 min.
   - OpenStreetMap routing gives 716 km / 7.6 h for its fastest route via Khafji.
   - Public sites quote 628–718 km.
   - The site uses your figure everywhere.
2. **Border waiting times** are shown only as "varies". The older Khafji page text says 30–90 min, and 2–4 h at peaks; send ranges if you want them on the new pages.
3. **Hotel list (6):**
   - Four Seasons Burj Alshaya, JW Marriott, Waldorf Astoria, Hilton Garden Inn, Crowne Plaza Al Thuraya City, Jumeirah Messilah Beach.
   - **St. Regis and Arabella were left out:** their exact areas could not be confirmed.
   - Airport times are map estimates.
4. **Kuwait Airport terminals** are not named, because terminal use is changing this year.
5. **Failaka:** ferries leave from the Ras Salmiya area. Crossing times and fares are deliberately not given, because sources disagree.
6. **Wrong figures fixed:** Khafji–Kuwait 180 → 125 km, and Dammam Airport–Khafji 180 → 280 km. Worth a look, as these were live for months.

## Not done / later

- **Hotel pages:** none built (decision 7).
- **Kuwait Airport ↔ Riyadh/Dammam pages:** an opportunity, not built.
- **Photos for the "things to see" cards:** these are icon cards for now. Photos can be added later without layout shift.
- **Re-check in Search Console** 3–4 weeks after the deployment:
  - CTR on `/distance/riyadh-to-kuwait` (was 0.47%) and `/distance/dammam-to-kuwait` (0.26%);
  - clicks to `/riyadh-to-kuwait-taxi-service`;
  - the position of `/destinations/kuwait-city` for "chauffeur service in kuwait" (was 58).
