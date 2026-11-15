# Contact number change: WhatsApp only (15 Nov 2026)

Branch `contact-number-whatsapp-only`. Two commits: the number change, then removal of every call option.

New number: **+966 54 772 1168**. Links use `https://wa.me/966547721168`, and the schema uses `+966547721168`.

## What you need to do

1. **Run `supabase/sql/011_quote_note_new_number.sql`** in the Supabase SQL Editor.
   - 28 saved quotes have the old number inside their "Note for Customer" (`quotes.admin_note`). The note is printed on the quote PDF and in the quote email.
   - The migration keeps a backup of the original notes, and `011_quote_note_new_number_rollback.sql` puts them back.
   - The code does not depend on it: new quotes already get the new number.
2. **Push and redeploy.** After the deploy, check that Vercel shows *Ready · Current*, not *Stale*.
3. **Ask Google to re-crawl.** In Search Console, request indexing for the home page and `/contact-us` so the new number in the JSON-LD is picked up sooner. No sitemap change is needed, because no URLs changed.

## Step 1: where the old number was found

**In the code:**

| Where | Old value |
|---|---|
| `src/lib/contact.ts` (the central config) | `923268869669`, `+923268869669`, `+92 326 8869669` |
| `content/*.html`, 6 guide files: 5 rendered by the `/…-guide` pages, plus 1 legacy file | `tel:+923268869669` (10 links), `wa.me/923268869669` (11 links), "Call: +92 326 8869669", "Phone: / WhatsApp: +92 326 8869669" |
| `CONFIG.md` | the three values above |
| `tests/bookingParser.test.mjs` | `0326 8869669` used as sample input |

Every other page, email and PDF already read the number from `contact.ts`. That was 1,201 WhatsApp links and 174 `tel:` links on the live site.

**In the database** (checked read-only across every text column of quotes, invoices, bookings and customers):

| Table.column | Rows | Old value |
|---|---|---|
| `quotes.admin_note` | 28 | `+92 326 8869669` |

**Not found anywhere else:**
- Not in `public/` (including `llms.txt`, the manifest and the robots/sitemap routes), `.env.local`, seed data, image alt text or meta tags.
- No Arabic-digit copy of the number.
- No `callto:` or `sms:` links.

## Step 2: number replaced

- **`src/lib/contact.ts`** is the only place the number is written:
  - `WHATSAPP_NUMBER = "966547721168"`
  - `PHONE_DISPLAY = "+966 54 772 1168"`
  - `PHONE_E164` is derived from `WHATSAPP_NUMBER`.
- **`content/*.html`** now uses `{{WHATSAPP_URL}}` and `{{PHONE_DISPLAY}}`, which `readContentFile` fills in from `contact.ts`.
- **Every pre-filled WhatsApp message is unchanged.** Only the number in front of it changed.
- **Emails** (received, confirmed and reminder, in EN and AR; quote; invoice; trip completed; admin new booking) take the number from `contact.ts`:
  - The footer says "WhatsApp: …" in English and "واتساب: …" in Arabic. It used to say "WhatsApp / phone".
- **Invoice and quote PDF footer:** "Questions about this invoice? Message us on WhatsApp +966 54 772 1168 or email info@gulftripservice.com."
  - The PDF header line also shows the new number.
  - The number is joined with no-break spaces, so a line wrap never splits it.
- **Admin:** the default "Note for Customer" on new quotes is built from `contact.ts`, so it now carries the new number.
- **JSON-LD:**
  - LocalBusiness/TaxiService keeps `telephone: "+966547721168"`.
  - It gains a `contactPoint` with `contactType` "customer service" and `availableLanguage` ["English", "Arabic"].
- **Arabic pages:** the number is shown in Western digits inside an LTR context:
  - the footer uses `<span dir="ltr">`;
  - the contact cards use `<p dir="ltr">`.

## Step 3: call options removed

| Place | Before | After |
|---|---|---|
| Mobile sticky bar (`/airport-transfers`) | WhatsApp · Call · Check Rates | WhatsApp · Check Rates |
| Footer social icons, EN + AR | WhatsApp, Phone, Email, Instagram, Facebook | WhatsApp, Email, Instagram, Facebook |
| Footer contact list, EN + AR | Phone row (`tel:`) and a "WhatsApp Us" row | One row: "WhatsApp +966 54 772 1168" (wa.me) |
| `/contact-us`, `/ar/contact-us` | 4 cards: Phone, WhatsApp, Email, Office | 3 cards: WhatsApp, Email, Office, in a 3-column grid so there's no empty slot |
| Contact form intro, EN / AR | "please call or WhatsApp us" / "يرجى الاتصال بنا أو التواصل عبر واتساب" | "please message us on WhatsApp" / "راسلنا على واتساب مباشرة" |
| `/thank-you` | "Questions? Call us: (tel link)" | "Questions? Message us on WhatsApp: (wa.me link)" |
| Home page badge | "Call or WhatsApp Anytime" | "Message Us on WhatsApp Anytime" |
| Guide pages, hero rows | Book · Call · WhatsApp | Book · WhatsApp |
| Guide pages, closing bars | Call · WhatsApp | WhatsApp · Get a Quote |
| Guide pages, rows without WhatsApp | Book · Call | Book · WhatsApp |
| `/makkah-umrah-taxi-guide`, contact block | Phone + WhatsApp lines | WhatsApp line, linked to wa.me |
| `/jeddah-airport-taxi-guide` | "24/7 support hotline" | "24/7 support on WhatsApp" |
| FAQs, visible and schema | "Call us directly", "via phone and WhatsApp", "call or WhatsApp the number…" | WhatsApp and email only |
| Terms, Privacy | "via WhatsApp, phone, or email", "Phone: …" | "via WhatsApp or email", "WhatsApp: …" |
| Tour pickup notes (3) | "via WhatsApp or phone" | "on WhatsApp" |
| Contact page meta descriptions | "via phone, WhatsApp, or email" | "on WhatsApp or by email" |
| Arabic "اتصل بنا" ("call us") on the contact page links: navbar, footer, home, border crossing, breadcrumbs, page title | اتصل بنا | تواصل معنا ("contact us") |
| Email WhatsApp box | number as plain text | number linked to wa.me |

**Arabic wording:** "اتصل بنا" here is the label of the Contact page, which offers WhatsApp, email and the form. "راسلنا على واتساب" would mislabel that link, so it became "تواصل معنا". "راسلنا على واتساب" is used where the text was a call instruction (the contact form intro).

**Phones can't turn the number into a call link:**
- Every page has `<meta name="format-detection" content="telephone=no">`.
- Every email has the same meta tag.
- Every place the number appears is itself a WhatsApp link.

**Removed from the code:** the `TEL_URL` export and the `PhoneIcon` component.

**Left in place on purpose:** the `phone_click` analytics hook. It only reacts to `tel:` links, and there are none now. It does nothing until one is added again.

## Step 4: verification

Checked on a local production build (`next build` + `next start`) of this branch.

| Check | Result |
|---|---|
| All 177 pages from the sitemap, plus `/thank-you`, `/contact`, `/checkout`, `/pay-online` | **0** old numbers, **0** `tel:`/`callto:`/`sms:` links, format-detection meta on every page |
| WhatsApp links in the served HTML | **1,218**, all `wa.me/966547721168` |
| JSON-LD `telephone` | `+966547721168` only |
| Arabic pages | number always in an LTR context; no "اتصل بنا" or call wording left |
| Call wording in visible text | none. The one match is in a guide describing ordinary taxis ("order through an app, or call for"), not an instruction to call us |
| Click test, desktop (12 buttons) and mobile (12 buttons, iPhone 13) | every one opens `wa.me/966547721168`, with its original pre-filled text where it had one |
| Emails (all 11 templates, rendered locally, nothing sent) | new number in each; 0 old numbers, 0 `tel:` links, 0 call wording |
| Invoice and quote PDFs (4 samples) | text extracted with pdf.js: new footer wording, number on one line, still one page |
| Parser tests | 15/15 pass |
| Type check | passes |

**Repo-wide search after the change:** the old number remains only in:
- `docs/qa/qa-booking-report.md`, a dated QA report describing the site as it was on 13 Nov;
- migration 011, which has to name the old number to replace it.
