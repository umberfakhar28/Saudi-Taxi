# Admin revamp: what was done and how to test it

Branch **`admin-revamp-nov`** (11 commits, none pushed). 14 Nov 2026.

## Before you deploy

1. **Run `supabase/sql/010_whatsapp_shared_and_invoice_guard.sql`** in the Supabase SQL editor.
   - It adds the WhatsApp "Shared" timestamps (item 8) and a one-invoice-per-booking guard (item 1).
   - It is additive only; the rollback is `010_…_rollback.sql`.
   - Without it the site still works, but the "Shared" tag only appears for quotes shared before today.
2. **`public/brand/email-logo.png`** is the logo in every email header. It is served from the live site, so emails sent before the deploy show the alt text "Gulf Trip Service" instead of the image.
3. **Not run here: a full `next build`.** The disk had about 200 MB free. TypeScript passes on the whole project (`tsc --noEmit`) and lint has no new errors, but please run `npm run build` once before pushing.

## Items

| # | What changed | How to test |
|---|---|---|
| **6** | **Admin theme.**<br>• Navy sidebar, gold active item and primary buttons, ivory page with white cards, one set of status badges.<br>• About 700 hard-coded colours replaced by `--adm-*` tokens in `admin.css`, using the website's own brand values (navy `#081827`, gold `#B8945B`, ivory `#F5F2EA`).<br>• Inter body text, Manrope headings, Noto Sans Arabic fallback.<br>• Sidebar text lifted to pass WCAG AA; gold is never used as small text on a light background.<br>• Layout unchanged. | Open any admin page and check the colours. Tab through a page: every control shows a gold focus ring. |
| **2** | **"Paste booking details" + Auto-fill** at the top of New Booking.<br>• Parser in `src/lib/bookingParser.ts`.<br>• Fills only empty fields you haven't typed in, highlights them in light gold, and shows "X fields filled, please review".<br>• Never saves.<br>• Prices in currencies bookings can't store (BHD, QAR…) go into Notes rather than the amount box. | Bookings → New Booking → paste a WhatsApp message → Auto-fill. Unit tests: `npm run test:parser`, 15/15 pass; output in `parser-test-results.txt`. |
| **1** | **Create Invoice on confirmed bookings.**<br>• Gold invoice button in the row's quick actions, shown on confirmed and completed bookings: "Create invoice", or "View invoice" when one exists.<br>• A second invoice is refused: re-checked at save, and blocked by the database after migration 010. | Confirm a booking and click the gold invoice icon. Try again: it opens the existing invoice instead of making a new one. |
| **8** | **WhatsApp "Shared" tag** (green WhatsApp icon + "Shared") under the quote; hover shows the date and time.<br>• Recorded when a quote is shared on WhatsApp from Bookings or Quotes, or a booking message is sent from the WhatsApp composer. | Quote a booking → Share on WhatsApp → the row shows the tag. Hover it to see the time. |
| **17** | **Invoice tag** (file icon + invoice number) under the quote, linking to `/admin/invoices?id=…`.<br>• That invoice is highlighted and scrolled into view, with an "Open invoice" bar above the table. | Click the tag on any invoiced booking. |
| **12** | **Invoice popup → Download** saves the PDF straight to Downloads; no new tab opens. | Bookings → View Invoice → Download. |
| **3** | **Invoice redesign**, on screen, in the PDF and in the image:<br>• navy header band with logo;<br>• ivory Bill To panel with the invoice number and status badge (paid green, unpaid amber, part-paid blue, overdue red);<br>• navy items table (Item / Quantity / Price / Total);<br>• Total Amount box;<br>• Payment Method next to a large Total Due;<br>• THANK YOU + Terms & Conditions, with gold dividers.<br>All existing fields are kept. | Open any invoice, then Download PDF and Download Image. Samples are in `samples/` and the `invoice-*.jpg` files. |
| **5** | **Footer now in the PDF and image.**<br>• Root cause: the PDF/image exporter drew its own one-line footer and never had the "Questions about this invoice?" line or the sign-off, so nothing was being clipped.<br>• The footer now comes from the shared invoice data.<br>• The first line depends on the payment state: paid ("Paid in full by bank transfer — no further action needed."), part-paid, overdue, due by a date, or due on receipt.<br>• Long invoices continue onto A4 page 2 with page numbers.<br>• File name: `Invoice-{Name}-{Number}.pdf`; Arabic names are transliterated to Latin letters. | Download PDF for a paid bank-transfer invoice: all three footer lines appear. `samples/Invoice-Sara-Khan-…pdf` is a 2-page example. |
| **11** | "Online Payment" → **"Payment link"**. VAT left exactly as it was, as you asked. | Edit an invoice → Payment method list. |
| **16** | **One email layout** for every email: booking received / confirmed / reminder (EN + AR), admin alerts, contact auto-reply + admin, quote, invoice, trip completed.<br>• Navy header with logo, white card, gold accents, footer with WhatsApp / phone / email / website.<br>• Table-based HTML, 600 px wide and fluid on phones, bulletproof buttons, Inter with Arial/Helvetica fallback. | Previews of 11 templates at desktop and mobile width in `emails/`. **Still worth doing:** one real send to Gmail web, Gmail app and Outlook; I couldn't open real mail clients from here. |
| **7** | **Quote email WhatsApp button.**<br>• The pre-filled message carries the whole quote: route, date and time, vehicle, passengers, price, quote #. Empty lines are skipped and the text is properly URL-encoded.<br>• The phone number under the button is removed (it's in the footer). | Email a quote to yourself and press the green button. Sample message: `emails/quote-whatsapp-message.txt`. |
| **9** | **Trustpilot button** in gold with navy text; the link is unchanged. | `emails/10-trip-completed-*`. |
| **10** | **Trip-completed email.**<br>• If the booking has an invoice, the PDF is attached and the email says so.<br>• If not, the "invoice" sentence is gone. | Mark a test booking with an invoice as Completed, then one without. |
| **13** | **Invoice email:** the "View invoice" admin-panel button is removed. | `emails/08-invoice-paid--*`. |
| **14** | **Invoice email:** status badge at the far right of the "Dear …" line. | Same file. |
| **18** | **Invoice PDF attached** when emailed from the Invoices tab or the booking popup.<br>• Same file as Download PDF.<br>• The server checks it really is a PDF of sensible size. | Email an invoice to yourself: one PDF attachment. |
| **15** | No change, per your instruction: WhatsApp stays text-only and you'll share PDFs separately. | — |
| **19** | **Customers paged on the server**, 25 per page.<br>• Page numbers, prev/next, and "Showing 26–50 of N".<br>• Search and sorting (name, bookings, spent, last booking) cover all customers, not just the page on screen.<br>• Page, search and sort stay in the URL (`?page=2&q=…`). | Customers → page 2 → refresh: you stay on page 2. Search for someone who isn't on page 1. |
| **20** | **Diagnosis only**, see `email-flow-report.md`.<br>• Replies go to Resend's inbound and pile up unforwarded: 20+ since 27 Oct.<br>• Recommendation: Google Workspace. | **Action:** read the waiting emails in Resend → Emails → Receiving. |

## Deliverables in this folder

- `parser-test-results.txt`: 15/15 passing.
- `samples/`: four generated PDFs with the correct file names and footer:
  - paid with VAT;
  - unpaid without VAT, Arabic name;
  - part-paid on two pages;
  - overdue.
- `invoice-paid-vat.jpg`, `invoice-unpaid-novat-arabic.jpg`, `invoice-partial-page1/2.jpg`: the PDF pages as images.
- `emails/`: 11 templates × desktop + mobile, plus `subjects.json` and the quote's WhatsApp message.
- `email-flow-report.md`: item 20.

## Not done / needs your decision

1. **Admin before/after screenshots: not taken.** Running the admin with test data needs a full build, and drive C: had about 200 MB free. Once there are a few GB free I can take them.
2. **Real email-client check** (Gmail web, Gmail app, Outlook): send yourself one quote and one invoice after deploying. The HTML follows the usual Outlook rules (tables, inline styles, bulletproof buttons), but only a real client can confirm it.
3. **Item 20 decision:** choose A, B or C. I recommend C (Google Workspace, about US$7 per month). Until then, check Resend → Receiving by hand.
4. **Terms & Conditions text:** the invoice's T&C block currently holds the payment sentence and the contact line. No written terms exist anywhere in the codebase, so I didn't make any up. Send me your terms and they go in one place.
5. **The PDF is an image of the page** (made in the browser), so its text can't be selected or copied. This was a deliberate trade-off: it's the only way available that prints Arabic names correctly and runs on Vercel. Everything else the brief asked for is met: identical download, image and email attachment, embedded fonts, A4 multi-page.
6. **Optional (item 13):** a public, expiring link to the invoice PDF. Not added, as the brief said to ask first.
7. **Commits:** where one file carried several items (the Bookings page, the email files), they share a commit. Every commit message lists its item numbers.
