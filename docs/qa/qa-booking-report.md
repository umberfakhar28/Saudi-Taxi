# Booking system QA: gulftripservice.com

**Date:** 13 Nov 2026 · **Build tested:** live production, commit `5c07dd1` · **Method:** Playwright (Chromium, Firefox, WebKit) against the live site, plus a code review of the booking path.

**Safety:**
- No code was changed.
- Every form test except the two listed in §6 ran with the site's `/api/*` POSTs intercepted and answered locally, so nothing reached the business.
- GA requests were stubbed out, and events were read from `window.dataLayer`, so no test traffic went to the GA property.
- No WhatsApp message was sent. Every `wa.me` URL was decoded and checked instead.

**Pricing note:** the brief lists the Riyadh–Bahrain sedan at 1,000 SAR. The owner raised it to **1,250 SAR** on 12 Nov, so 1,250 is the expected value throughout this report.

---

## 1) Summary

| | |
|---|---|
| Pages crawled (sitemap, EN + AR) | **174** (163 EN, 11 AR), all 200 |
| Templates found | route (39), route-landing (1), distance (20), destination (20), city (17), guide (12), blog (11), airport (9), service (9), border (4), tour (3), content-guide (2), hotel (1), one-offs (26) |
| WhatsApp links | **1,201**, all to `wa.me/923268869669`, all `target="_blank" rel="noopener"` |
| `tel:` / `mailto:` links | 174 / 174 (`tel:+923268869669`, `mailto:info@gulftripservice.com`) |
| Forms | 105: 65 quick-book forms, 37 destination/city enquiry forms, Book Online (EN + AR), Contact (EN + AR) |
| Links to /book-online | 935, across 9 URL shapes. All resolve 200. |
| Internal link targets checked | 399, **0** non-200 and **0** redirects |
| Deep tests (scripted checks) | 53 checks: **27 pass · 7 real fails · 1 test artefact · 18 informational** |
| Cross-browser matrix (full booking path) | **15 / 15 pass**: Chromium, Firefox, WebKit × 360 / 390 / 768 / 1024 / 1440 px |
| Light sweep, every page (mobile) | 0 console errors, 0 failed requests, 0 horizontal scroll, every route quick-form pre-filled |
| Real submissions on production | **2** (of 3 allowed). Both saved correctly; see §6. |

**Bottom line:** the core path works everywhere tested. This covers a route page, then its quick form, then /book-online, then submit and the success state with a reference number. Double-submit is guarded, the loading state shows, input is escaped, and Riyadh–Bahrain prices agree everywhere. The serious problems are narrower:
- Arabic users are rejected if they type their phone number in Arabic digits.
- Arabic route pages hand off to the English booking form.
- A long note makes a booking impossible to submit, and the error doesn't say why.
- The public email endpoint can be used to send mail as the business.

---

## 2) Bug table

Severity: **Critical** = booking lost · **Major** = wrong price or message, or a booking blocked · **Minor** = UI or copy. Screenshots are in `docs/qa/screenshots/`.

| ID | Page URL | Entry point | Device / browser | Steps to reproduce | Expected | Actual | Severity | Screenshot |
|---|---|---|---|---|---|---|---|---|
| **B1** | /ar/contact-us, /ar/book-online, /book-online, /contact-us | Phone field | All | Enter the phone in Arabic-Indic digits, e.g. `٠٥٠١٢٣٤٥٦٧` or `+٩٦٦٥٠١٢٣٤٥٦٧`, then submit | Accepted (normalised to 0501234567) | Rejected with "Please enter a valid phone number…". The rule strips every non-ASCII digit, leaving 0 digits (`src/lib/bookingValidation.ts:79`, `src/lib/contactMessage.ts:103`). The server uses the same rule. | **Critical**: Arabic keyboards type these digits, and the customer can't tell what's wrong | 05, 16 |
| **B2** | /ar/riyadh-to-bahrain, /ar/riyadh-to-qatar, /ar/riyadh-to-kuwait, /ar/qatar-to-riyadh, /ar/bahrain-to-dammam (all AR pages with a quick form) | Quick-book form "احجز الآن", and the bottom "احجز الآن" button | All | Open an Arabic route page and press the form's Book button | Lands on **/ar/book-online** in Arabic | Lands on the **English** /book-online, with Arabic city names in the fields. `QuickBookForm.tsx:74` always pushes `/book-online`; `RoutePage.tsx:1237` hard-codes `/book-online`. | **Major** | n/a (URL in results) |
| **B3** | /book-online (EN + AR), all destination/city enquiry forms | Notes / Additional requirements | All | Type more than 2,000 characters in the notes, then submit | Field limits input, or a clear "note too long" message | No `maxlength`. The server rejects with `notes_too_long`, which the client maps to the generic "Something went wrong…" (`i18n.ts:654`). The customer can't find the cause, so the booking is never made. `name_too_long` shows "Your name is required" and `passengers_invalid` is generic, the same pattern. On enquiry forms the stored note adds a destination and source-page prefix, so the real limit is lower than 2,000. | **Major** (rare, but the booking is lost) | n/a |
| **B4** | `/api/emails/send` (public types `new_booking`, `destination_enquiry`) | API | n/a, code review (not exercised) | POST `{type:"new_booking", bookingData:{customer_email:"anyone@…", customer_name:"…"}}` | Only emails tied to a booking just saved | Sends a branded email from the business domain to **any** address and name in the request. Turnstile is parked (fail-open), and the only limit is 10 per 10 min per IP, held in memory per server instance. `bookingData.id` is also placed unescaped into an `href` in the admin email (`route.ts:350`). | **Major** (abuse risk to domain reputation and the Resend account; not a booking bug) | n/a |
| **B5** | Riyadh→Qatar (EN) | Vehicle-card and pricing-table WhatsApp buttons (8) | All | Press a vehicle's WhatsApp button | Message names the vehicle **and** its price (1,700 / 3,000 SAR), as Riyadh–Bahrain does | "…quote for a private transfer from Riyadh to Qatar. Vehicle: GMC Yukon. Travel date: Passengers:" with no price | Minor | n/a |
| **B6** | 38 EN route pages (all except Riyadh–Bahrain), 5 AR route pages | Header, floating and bottom-bar WhatsApp | All | Press the header WhatsApp on e.g. /dammam-to-kuwait-taxi-service | "Hi, I want to book Dammam to Kuwait" | Header sends an **empty** chat; the mobile bottom bar sends "Hi, I'd like to know more about your services." Only Riyadh–Bahrain is configured (`contact.ts`, `PAGE_WHATSAPP_MESSAGES`). Footer buttons are blank on every page, Riyadh–Bahrain included. So are the 37 enquiry-form WhatsApp buttons and 13 other closing and hero buttons. | Minor | n/a |
| **B7** | /book-online | Validation | All | Press "Continue" with empty fields | Focus moves to the first invalid field | Focus stays on the Continue button. Errors are still announced (`role=alert`). | Minor (a11y) | 04 |
| **B8** | All quick-book forms (65 pages) | Date input | All | Pick a past date in the quick form | Past dates blocked, as on /book-online | No `min` attribute. The past date passes through and is caught only on /book-online step 1. | Minor | n/a |
| **B9** | /book-online | Labels | All | Look at "Full Name", "Phone / WhatsApp", "Pickup Location", "Travel Date" and the other required labels | One asterisk | Two, "Full Name * *". Both are visible, and screen readers read "Pickup Location star star". | Minor | 05 |
| **B10** | /jeddah-to-makkah-guide, /makkah-to-madinah-guide | "Book Economy" / "Book Now your Makkah to Madinah taxi" | All | Press the button | Form pre-filled with the route (and the economy vehicle) | Links use `?route=jeddah-makkah&vehicle=economy`, a parameter /book-online doesn't read, so the form opens empty. A lone `vehicle=` without `vehicleName=` is also dropped. The links come from `content/*.html`. | Minor | n/a |
| **B11** | Customer records (backend) | /api/customers/upsert | n/a, code review plus mocked run | Submit the destination form with phone "abc", or have a booking fail server validation | No customer row unless a booking is saved | The customer row is created, or its `total_bookings` incremented, **before** the booking is validated. The upsert itself doesn't validate the phone, so junk rows and inflated booking counts are possible. Matching is on the exact phone string, so "+966 50…" and "050…" count as two customers. | Minor (data quality) | 09 |
| **B12** | Arabic pages | Page language | All | Inspect `<html>` on /ar/... | `lang="ar" dir="rtl"` on `<html>` | `<html lang="en">`; RTL and `lang="ar"` are set on an inner `<div>`. The layout renders correctly RTL. | Minor (a11y/SEO) | 10 |
| **B13** | /ar/riyadh-to-qatar | Prices | All | Compare with the EN page | Same fares as EN (1,700 / 3,000 SAR) | No prices on the AR page. /ar/riyadh-to-bahrain shows 1,250 / 1,500 ريال but has no `Offer` schema, which EN has. | Minor | n/a |
| **B14** | 9 airport pages | "airport-card" WhatsApp (72 links) | All | Decode the message | "an Abha Airport…" | "Hi, I'd like to book **a Abha** Airport (AHB) transfer.", and "a AlUla". Some city, border and hotel messages also say "GulfTripService" rather than "Gulf Trip Service". | Minor (copy) | n/a |
| **B15** | All pages | WhatsApp GA event | Desktop | Double-click any WhatsApp button | 1 `whatsapp_click` | 2 events. The browser also opens WhatsApp twice. | Minor (analytics) | n/a |
| **B16** | /book-online, quick forms | Passengers | All | Choose Toyota Camry, then 10 passengers | Max follows vehicle capacity | Always 1–10, whatever the vehicle. Capacity isn't modelled, so this is owner input, not a code bug. | Minor | n/a |
| **B17** | /book-online, quick forms, enquiry form | Date | All | Enter 2031-06-01 | Some upper bound, e.g. 12–18 months | Accepted. The enquiry form's `min` uses UTC, so between 00:00 and 03:00 Riyadh time today's date is blocked there (/book-online uses Riyadh time correctly). | Minor | n/a |
| **B18** | /book-online, booking record, post-booking WhatsApp | Vehicle price | All | Choose "Toyota Camry – 1,250 SAR" in the Riyadh–Bahrain quick form, then continue | Price stays visible on /book-online and in the record | The vehicle name carries through ("🚗 Toyota Camry"); the price is dropped. The booking row stores `car_type: "Toyota Camry"` only. | Minor | 02 |
| **B19** | /book-online | Keyboard | Desktop | Tab through step 1 | One tab stop per control | Both location autocompletes add an extra empty tab stop (the closed listbox `div` is focusable). Date and time take 3–4 Tabs each, which is native browser behaviour. | Minor (a11y) | 13 |

**Checked and passing, so not bugs:**
- Riyadh–Bahrain quick form pre-fills Riyadh → Bahrain, and its vehicle list and prices are correct.
- The hand-off to /book-online carries the route, date, time, passengers and vehicle.
- Step 1 and step 2 required-field errors work, past dates are rejected, and the email rules are correct.
- Phone formats +966, 05x, +973, +974, +971, +92 and 00966 are accepted; "abc", 5 digits and 16 digits are rejected.
- HTML and script typed into the name or notes is escaped, with no injection.
- Emoji, Arabic, `& + = ? # %` and line breaks survive into the WhatsApp text intact.
- Double-click submits once on all three forms: Book Online, Contact and Destination enquiry.
- On a slow network the button disables and shows "PROCESSING…".
- Invalid URL parameters (`passengers=0/99`, a bad date or time, an unknown `service`, a script tag in `from`) don't break the page.
- Every `/book-online?…` URL has canonical `https://gulftripservice.com/book-online`. There's no separate thank-you page (success shows inline), so noindex doesn't apply.
- Field labels exist on all four form types, and the arrow keys and Space select service cards with a visible focus outline.
- The mobile bottom bar (60 px) never covers a submit button that has been scrolled into view.

**Unexpected but not a bug:** the brief expects a Saudi `wa.me/9665…` number. Every button uses **+92 326 8869669**, which `src/lib/contact.ts` documents as the real business number since 24 Jul 2026. Please confirm this is intended.

---

## 3) WhatsApp message audit

One row per distinct button type. The full list of 1,201 decoded links was checked automatically: no `undefined`, `null`, `[placeholder]` or broken encoding anywhere.

| Page | Button | Decoded message | Correct? |
|---|---|---|---|
| /riyadh-to-bahrain-taxi-service | Header, hero, ways-to-travel, how-to-book, floating, bottom bar | `Hi, I want to book Riyadh to Bahrain` | ✅ |
| /riyadh-to-bahrain-taxi-service | Footer (social + contact) | *(empty)* | ❌ B6 |
| /riyadh-to-bahrain-taxi-service | Vehicle cards (13) | `Hi, I want to book Riyadh to Bahrain in a Toyota Camry (1,250 SAR)`. The 1,500 SAR vehicles say the same with their own price. Vans: `…in a Toyota Hiace. Please send me the price.` | ✅ |
| /riyadh-to-bahrain-taxi-service | Quick form (filled) | `Hi, I want to book Riyadh to Bahrain` / `Vehicle: GMC Yukon – 1,500 SAR` / `Date: 2026-12-20 \| Time: 09:30 \| Passengers: 3` / `Pickup: Riyadh \| Drop-off: Bahrain`. Empty fields are skipped. | ✅ (date is ISO, not "20 Dec") |
| /riyadh-to-bahrain-taxi-service | Airport block | `Hi, I want to book Riyadh Airport to Bahrain` | ✅ |
| /book-online | "Book via WhatsApp" + success "Send details" | `Hi, I'd like a quote for this trip:` followed by Trip type, Pickup, Destination, Date & time (`20 Dec 2026 at 09:30 AM`), Passengers, Vehicle, Name, Email, Phone and Notes. Empty fields are skipped. | ✅ (no vehicle price, B18) |
| Other EN route pages, e.g. /dammam-to-kuwait | Hero, closing, in-article | `Hello Gulf Trip Service, I would like a quote for a private transfer from Dammam to Kuwait.` / `Travel date:` / `Passengers:` | ✅ route is correct (not the spec's exact wording) |
| Other EN route pages | Vehicle / pricing cards | `…from Riyadh to Qatar.` / `Vehicle: GMC Yukon.` / `Travel date:` / `Passengers:` | ⚠️ no price (B5) |
| Other EN route pages | Quick form | `Assalamu Alaikum, I'd like to book a ride.` / `From: Bahrain` / `To: Dammam` / `Date: …` / `Passengers: 1` | ✅ route is correct |
| Other route pages | Header / bottom bar | *(empty)* / `Hi, I'd like to know more about your services.` | ❌ B6 |
| /ar/ route pages | Quick form | `السلام عليكم، أرغب في حجز رحلة.` / `من: الرياض` / `إلى: الدوحة` / `عدد الركاب: 1` | ✅ Arabic |
| /ar/riyadh-to-kuwait | Vehicle / pricing cards | `السلام عليكم، أرغب في عرض سعر لتوصيلة خاصة من الرياض إلى الكويت.` / `السيارة: …` | ✅ Arabic |
| Airport pages (9) | Airport cards, travel times, flight delay | `Hi, I'd like to book a Jeddah Airport (JED) transfer.` | ✅ / ❌ "a Abha", "a AlUla" (B14) |
| City pages (17) | Routes section | `Hello GulfTripService, I would like to get a quote for your transportation service in Jeddah…` | ✅ (brand spelling, B14) |
| Destination / city pages | Enquiry-form WhatsApp (37) | *(empty)* | ⚠️ B6 |
| /contact-us, /ar/contact-us | Contact card | *(empty)* | ⚠️ acceptable |

**Behaviour:**
- All WhatsApp links open in a new tab, which is WhatsApp Web on desktop.
- `wa.me` hands off to the app on mobile; this was verified by URL shape only.
- The floating button and bottom bar never cover a form field or submit button.

---

## 4) Price consistency

Only two routes publish fares. All other route, airport, border and distance pages are "price on request", by design (owner-confirmed fares only).

| Route page | Vehicles | Cards | Quick form | WhatsApp | Schema | /book-online |
|---|---|---|---|---|---|---|
| /riyadh-to-bahrain-taxi-service | Toyota Camry | 1,250 SAR | 1,250 SAR | 1,250 SAR | 1250 | name only (B18) |
| ″ | GMC Yukon, Chevrolet Tahoe, Toyota Sequoia, Ford Expedition, Land Cruiser, Land Cruiser Prado, Ford Taurus, Lexus ES | 1,500 SAR | 1,500 SAR | 1,500 SAR | 1500 | name only |
| ″ | Hiace, Odyssey, Innova, GAC MPV | on request | "price on request" | "please send me the price" | none | name only |
| /ar/riyadh-to-bahrain-taxi-service | Same fleet | 1,250 / 1,500 ريال | no vehicle list | no price | **no Offer schema** (B13) | English form (B2) |
| /riyadh-to-qatar-taxi-service | Executive sedan / SUV tiers | 1,700 / 3,000 SAR | no vehicle list | **no price** (B5) | 1700, 3000 | n/a |
| /ar/riyadh-to-qatar-taxi-service | n/a | **none shown** (B13) | n/a | n/a | none | English form (B2) |

No leftover 1,000 SAR anywhere on the Riyadh–Bahrain page; the per-person figures say 313 and 417 SAR. No price was copied across routes.

---

## 5) GA4 event status

Events were read from `window.dataLayer` with GA network calls stubbed. They were **not** checked in DebugView or GA reports.

| Event | Exists? | Fires once per action? | Parameters | /ar/ pages |
|---|---|---|---|---|
| `whatsapp_click` | ✅ | ✅ single click · ❌ double-click logs 2 (B15) | cta_source, cta_location, page_template, page_path, page_location, link_url (query stripped), site_language. **No route parameter.** | ✅ `site_language: ar` |
| `phone_click` | ✅ | ✅ | cta_source, cta_location, page_template, page_path, site_language | ✅ by code (same listener) |
| `booking_form_submit` | ✅ | ✅ exactly 1 after a double-clicked submit; fires only after the DB save | form_type, page_path, page_language, page_template, form_detail (service id) | ✅ by code |
| `contact_form_submit` | ✅ | ✅ 1 | as above | ✅ by code |
| `destination_enquiry_submit` | ✅ (in code) | not observed in this run | as above, with the destination name | n/a |
| `form_start` | ❌ | n/a | n/a | n/a |
| `generate_lead` | ❌ | n/a | n/a | n/a |
| `book_now_click`, plus the quick form handing off to /book-online | ❌ | n/a | n/a | n/a |
| Email (`mailto:`) click | ❌ | n/a | n/a | n/a |

**Events to add (not added):**
- `form_start`, on the first field focus per form.
- `book_now_click` (`cta_source`, `page_path`), including the quick-form submit. Today the hand-off from a route page to /book-online is invisible.
- `email_click`.
- A `route` parameter (origin–destination) on `whatsapp_click` and `book_now_click`.
- Mark `booking_form_submit`, `contact_form_submit` and `destination_enquiry_submit` as **key events** in GA. This does the job of `generate_lead` without a code change.

---

## 6) Test submissions made on production (please delete)

| # | When (UTC) | Form | Record | Reference | Result |
|---|---|---|---|---|---|
| 1 | 13 Nov 2026 11:59 | /book-online, reached from the Riyadh–Bahrain quick form (Camry, 24 Dec 07:15, 2 pax) | `bookings.id = e4e7f0a1-48e9-4af7-b57f-a28a53d98060`, `customers.id = 655bf3af-451f-4564-a34a-272ec2c22aae`, 2 rows in `email_logs` | **GTS-E4E7F0A1** | Saved, with every field matching, Arabic in the notes included. Admin email "New Booking Request — TEST BOOKING – QA" **sent** to the admin inbox. The customer confirmation **failed** because Resend refuses `example.com` addresses; that comes from the test address, not the site. The site still showed success, which is correct, since the booking was saved. |
| 2 | 13 Nov 2026 11:59 | /ar/contact-us (Arabic subject and message) | `contact_messages.id = 9f0fee1e-f6ee-4d8d-9e03-3d882f18cb89` | **MSG-9F0FEE1E** | Saved with `locale: ar`, Arabic intact, admin notified (`notified_at` set). The Arabic success message "تم استلام رسالتك" was shown. |
| 3 | 13 Nov 2026 12:39 | /book-online on the **fixed local build** (`next start`, production DB), phone typed in Arabic digits, 2 bags | `bookings.id = a76e148d-e5e6-44d4-8337-1d9c296836a3`, `customers.id = ac8f6f18-0f32-43fe-a3fc-380c3e934548`, 2 `email_logs` rows, 1 `notifications` row | **GTS-A76E148D** | Verifies the B1 and B4 fixes end to end. The phone was stored as `+966 50 000 0002`, and the customer and booking are linked. The admin email was built from the saved row and **sent**, and the in-app notification was created. The customer copy failed (`example.com`, as before). Replaying the email call returned 409, already sent. |

Name "TEST BOOKING – QA", email qa-test@example.com, phone +966 50 000 0001.

**To delete, in the Supabase SQL editor:**
```sql
delete from notifications    where booking_id in ('e4e7f0a1-48e9-4af7-b57f-a28a53d98060', 'a76e148d-e5e6-44d4-8337-1d9c296836a3');
delete from email_logs       where booking_id in ('e4e7f0a1-48e9-4af7-b57f-a28a53d98060', 'a76e148d-e5e6-44d4-8337-1d9c296836a3');
delete from bookings         where id in ('e4e7f0a1-48e9-4af7-b57f-a28a53d98060', 'a76e148d-e5e6-44d4-8337-1d9c296836a3');
delete from customers        where id in ('655bf3af-451f-4564-a34a-272ec2c22aae', 'ac8f6f18-0f32-43fe-a3fc-380c3e934548');
delete from contact_messages where id = '9f0fee1e-f6ee-4d8d-9e03-3d882f18cb89';
```

**Not verified:** how the customer auto-reply email renders. A real inbox is needed, because Resend rejects `example.com`. One more submission with an address the owner controls would close this gap.

---

## 7) Recommended fixes, in priority order

> **Fix status, 13 Nov:** **B1–B4 are fixed** in the commit that follows this report and were verified on a local production build: 23 scripted checks plus real submission #3. That commit is **not yet deployed**. The +92 WhatsApp number stays, by the owner's decision; it will move to a Saudi number later. The new Arabic error messages for B3 need a native speaker's review. Items 5–10 below are still open.

1. **B1: accept Arabic-Indic and Persian digits in phone numbers.** Convert `٠–٩` and `۰–۹` to `0–9` before validating and before saving. The rule lives in `bookingValidation.ts` and `contactMessage.ts`; fix both, plus the server. This is small, and it's the only issue that silently loses Arabic leads.
2. **B2: send Arabic pages to /ar/book-online.** Make `QuickBookForm` push `/ar/book-online` when `locale === 'ar'`, and make `RoutePage.tsx:1237` locale-aware.
3. **B3: notes limit.** Add `maxLength` (2,000; lower on the enquiry form to allow for its prefix) and a character counter. Add real messages for `notes_too_long`, `name_too_long` and `passengers_invalid`.
4. **B4: lock down `/api/emails/send`.** For public types, load the booking by `bookingId` on the server and email only the address stored on that row, ignoring the client's `bookingData`. Allow it only within a few minutes of creation, and escape `b.id`. Turning Turnstile back on would also help, but it's parked.
5. **B6 and B5: WhatsApp messages.** Generate the "Hi, I want to book {Origin} to {Destination}" message for every route page from route data (not a one-entry map), and use it for the header, floating, bottom-bar and footer buttons. Add prices to Riyadh–Qatar's vehicle buttons.
6. **B11: create the customer record after the booking passes validation**, or validate first. Normalise phone numbers before matching.
7. **B13 and B18: price parity.** Show the Qatar fares on the AR page, add Offer schema to AR Riyadh–Bahrain, and carry the chosen vehicle's price into /book-online and the stored notes.
8. **GA (§5):** add `book_now_click` (with route) and `form_start`, mark the submit events as key events, and de-duplicate `whatsapp_click` within about 1 s.
9. **Accessibility tidy-up (B7, B9, B12, B19):** move focus to the first invalid field, remove the duplicate asterisk, set `lang`/`dir` on `<html>` for /ar/, and take the closed listbox out of the tab order.
10. **Small items (B8, B10, B14, B16, B17):**
    - Add `min` to the quick-form date, plus a 12–18 month maximum.
    - Fix the two `?route=` guide links.
    - Fix "a Abha" / "a AlUla" and make "Gulf Trip Service" consistent.
    - Get vehicle capacities from the owner so the passenger list can follow the vehicle.

---

### Appendix: how this was tested

- **Inventory:** server HTML of all 174 sitemap URLs. All links, every `wa.me` text decoded, forms, schema, canonical and robots. All 399 internal link targets fetched with redirects off.
- **Deep tests:** Riyadh–Bahrain (route-landing); Bahrain–Dammam and Riyadh–Qatar (route, EN); AR Riyadh–Qatar and AR Riyadh–Bahrain; Riyadh Airport; Saudi–Bahrain border; distance and city pages; /book-online (EN and AR); /contact-us (EN and AR); /destinations/dubai enquiry. 14 /book-online URL-parameter combinations.
- **Matrix:** the full booking path in Chromium, Firefox and WebKit at 360, 390, 768, 1024 and 1440 px, all 15 passing. Phone widths used touch emulation (Chromium and WebKit). The native date and time pickers were filled programmatically. **Not tested on physical iOS or Android devices.**
- **Sweep:** all 174 pages on an iPhone 13 profile, checking console errors, failed requests, horizontal overflow, quick-form pre-fill and button overlap.
- **Screenshots** (`docs/qa/screenshots/`):

| File | Shows |
|---|---|
| 01 | Riyadh–Bahrain quick form, filled |
| 02 | /book-online pre-filled from it |
| 03 | Mocked success |
| 04 | Empty-form errors |
| 05 | Arabic-digit phone rejected |
| 06 | Slow-network loading state |
| 07–08 | Contact form errors and success |
| 09 | Destination enquiry after submit |
| 10 | AR /book-online errors on mobile |
| 11–12 | Matrix samples |
| 13 | Keyboard focus |
| 14–15 | The two real submissions |
| 16 | AR contact form rejecting Arabic digits |
