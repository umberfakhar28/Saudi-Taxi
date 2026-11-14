# Admin revamp: what was done and how to test it

Branch **`admin-revamp-nov`**, not pushed. 14 Nov 2026, updated the same day after your follow-up.

## Before you deploy

1. ~~Run migration 010~~: **done.** You confirmed it ran successfully.
2. **Switch on the email forward (item 20).** Add the Resend webhook and the `RESEND_WEBHOOK_SECRET` variable in Vercel. Steps are at the top of `email-flow-report.md`.
3. **`public/brand/email-logo.png`** is the logo in every email header. It is served from the live site, so emails sent before the deploy show the alt text "Gulf Trip Service" instead of the image.
4. **Not run here: a full `next build`.** The disk had about 200 MB free. TypeScript passes on the whole project (`tsc --noEmit`) and lint has no new errors, but please run `npm run build` once before pushing.

## Items

| # | What changed | How to test |
|---|---|---|
| **6** | **Admin theme.**<br>• Navy sidebar, gold active item and primary buttons, ivory page with white cards, one set of status badges.<br>• About 700 hard-coded colours replaced by `--adm-*` tokens in `admin.css`, using the website's own brand values (navy `#081827`, gold `#B8945B`, ivory `#F5F2EA`).<br>• Inter body text, Manrope headings, Noto Sans Arabic fallback.<br>• Sidebar text lifted to pass WCAG AA; gold is never used as small text on a light background.<br>• Layout unchanged. | Open any admin page and check the colours. Tab through a page: every control shows a gold focus ring. |
| **2** | **"Paste booking details" + Auto-fill** at the top of New Booking.<br>• Parser in `src/lib/bookingParser.ts`.<br>• Fills only empty fields you haven't typed in, highlights them in light gold, and shows "X fields filled, please review".<br>• Never saves.<br>• Prices in currencies bookings can't store (BHD, QAR…) go into Notes rather than the amount box. | Bookings → New Booking → paste a WhatsApp message → Auto-fill. Unit tests: `npm run test:parser`, 15/15 pass; output in `parser-test-results.txt`. |
| **1** | **Create Invoice on confirmed bookings.**<br>• Gold invoice button in the row's quick actions, shown on confirmed and completed bookings: "Create invoice", or "View invoice" when one exists.<br>• A second invoice is refused: re-checked at save, and blocked by the database after migration 010. | Confirm a booking and click the gold invoice icon. Try again: it opens the existing invoice instead of making a new one. |
| **8** | **WhatsApp "Shared" tag** (green WhatsApp icon + "Shared") under the quote; hover shows the date and time.<br>• Recorded when a quote is shared on WhatsApp from Bookings or Quotes, or a booking message is sent from the WhatsApp composer. | Quote a booking → Share on WhatsApp → the row shows the tag. Hover it to see the time. |
| **17** | **Invoice tag** (file icon + invoice number) under the quote, linking to `/admin/invoices?id=…`.<br>• That invoice is highlighted and scrolled into view, with an "Open invoice" bar above the table. | Click the tag on any invoiced booking. |
| **12** | **Invoice popup → Download** saves the PDF straight to Downloads; no new tab opens. | Bookings → View Invoice → Download. |
| **3** | **Invoice redesign**, on screen, in the PDF and in the image:<br>• navy header band with logo;<br>• ivory Bill To panel with the invoice number and status badge (paid green, unpaid amber, part-paid blue, overdue red);<br>• navy items table (Item / Quantity / Price / Total);<br>• Total Amount box;<br>• Payment Method next to a large Total Due;<br>• THANK YOU + Terms & Conditions, with gold dividers.<br>All existing fields are kept. | Open any invoice, then Download PDF and Download Image. |
| **5** | **Footer now in the PDF and image.**<br>• Root cause: the PDF/image exporter drew its own one-line footer and never had the "Questions about this invoice?" line or the sign-off, so nothing was being clipped.<br>• The footer now comes from the shared invoice data.<br>• The first line depends on the payment state: paid ("Paid in full by bank transfer — no further action needed."), part-paid, overdue, due by a date, or due on receipt.<br>• Long invoices continue onto A4 page 2 with page numbers.<br>• File name: `Invoice-{Name}-{Number}.pdf`; Arabic names are transliterated to Latin letters. | Download PDF for a paid bank-transfer invoice: all three footer lines appear. An invoice with long notes continues onto page 2 with page numbers. |
| **11** | "Online Payment" → **"Payment link"**. VAT left exactly as it was, as you asked. | Edit an invoice → Payment method list. |
| **16** | **One email layout** for every email: booking received / confirmed / reminder (EN + AR), admin alerts, contact auto-reply + admin, quote, invoice, trip completed.<br>• Navy header with logo, white card, gold accents, footer with WhatsApp / phone / email / website.<br>• Table-based HTML, 600 px wide and fluid on phones, bulletproof buttons, Inter with Arial/Helvetica fallback.<br>• Footer also carries the **Instagram** and **Facebook** links (added 14 Nov; they're on the website footer too, English and Arabic). | Send yourself a quote and an invoice, and open them in Gmail on the web, the Gmail app and Outlook. |
| **7** | **Quote email WhatsApp button.**<br>• The pre-filled message carries the whole quote: route, date and time, vehicle, passengers, price, quote #. Empty lines are skipped and the text is properly URL-encoded.<br>• The phone number under the button is removed (it's in the footer). | Email a quote to yourself and press the green button. The message reads, for example:<br>`Hi, about the quote you sent me:`<br>`Route: Jeddah Airport → Makkah Hilton`<br>`Date: 15 Nov 2026, 10:00 AM`<br>`Vehicle: GMC Yukon` · `Passengers: 4` · `Price: SAR 450.00` · `Quote #: Q-1F0C2B9E` |
| **9** | **Trustpilot button** in gold with navy text; the link is unchanged. | Mark a test booking Completed and look at the email. |
| **10** | **Trip-completed email.**<br>• If the booking has an invoice, the PDF is attached and the email says so.<br>• If not, the "invoice" sentence is gone. | Mark a test booking with an invoice as Completed, then one without. |
| **13** | **Invoice email:** the "View invoice" admin-panel button is removed. | Email an invoice to yourself. |
| **14** | **Invoice email:** status badge at the far right of the "Dear …" line. | Same email. |
| **18** | **Invoice PDF attached** when emailed from the Invoices tab or the booking popup.<br>• Same file as Download PDF.<br>• The server checks it really is a PDF of sensible size. | Email an invoice to yourself: one PDF attachment. |
| **15** | No change, per your instruction: WhatsApp stays text-only and you'll share PDFs separately. | — |
| **19** | **Customers paged on the server**, 25 per page.<br>• Page numbers, prev/next, and "Showing 26–50 of N".<br>• Search and sorting (name, bookings, spent, last booking) cover all customers, not just the page on screen.<br>• Page, search and sort stay in the URL (`?page=2&q=…`). | Customers → page 2 → refresh: you stay on page 2. Search for someone who isn't on page 1. |
| **20** | **Free Resend forward (option B), built.**<br>• Every email to @gulftripservice.com reaches your Gmail with the original message and attachments.<br>• Pressing Reply answers the customer directly.<br>• A one-click link forwards the 20+ emails already waiting. | Switch it on with the steps at the top of `email-flow-report.md`, then email info@ from any outside address. |

## In this folder

- `parser-test-results.txt`: 15/15 passing.
- `email-flow-report.md`: item 20, with the setup steps.

Screenshots and sample files are no longer committed, at your request; check changes locally or live.

## Changed after your follow-up (14 Nov)

- **The invoice PDF is real text now, not a picture of the page.** Text can be selected, copied and searched. Fonts are embedded (Inter, Manrope, Noto Sans Arabic). Arabic names and addresses print joined and right to left, and mixed lines like "Manama, Bahrain (فندق الريتز)" come out in the right order. A typical invoice is about 30 KB instead of about 450 KB. The same file is used for Download PDF and every email attachment. Download Image still gives a PNG with the same layout.
  - **How to test:** download an invoice PDF, select the text and paste it somewhere. Try a customer with an Arabic name.
  - The uppercase labels have no extra letter spacing in the PDF, so copied text doesn't come out as "B I L L  T O".
- **Terms & Conditions** on the invoice are left as they are (payment line + contact line), as you said.
- **Instagram and Facebook links** are in the website footer (EN + AR) and every email footer.
- **Migration 010** is done.

## Still open

1. **Run `npm run build`** before pushing. It couldn't run here because the disk was full.
2. **Real email-client check** (Gmail web, Gmail app, Outlook): send yourself one quote and one invoice after deploying.
3. **Switch on the Resend forward:** the webhook plus `RESEND_WEBHOOK_SECRET`, then the backfill link.
4. **Optional (item 13):** a public, expiring link to the invoice PDF. Not added, as the brief said to ask first.
5. **Structured data:** the site's schema lists `facebook.com/gulftripservice`. If your page has a different address, tell me and I'll update it. Facebook doesn't reveal where a share link points.
6. **Commits:** where one file carried several items (the Bookings page, the email files), they share a commit. Every commit message lists its item numbers.
