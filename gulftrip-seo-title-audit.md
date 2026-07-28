# SEO Title & Meta Audit — gulftripservice.com

Audit and rewrite the `<title>` and `<meta name="description">` for every city, cross-border route, service, and tour page on this site so they are keyword-rich and unique. This is metadata only — do not change page body copy, layout, routes, or datasets. Titles are generated in `generateMetadata` (or wherever this Next.js app sets per-page meta) — update the source there, not hardcoded per file.

## Global title rules
- Length: **50–60 characters** ideal, hard max 65 (Google truncates beyond ~60).
- Every title ends with a light brand suffix: `| Gulf Trip Service` — but only if it fits under 60 chars; if not, drop the brand rather than truncate the keywords.
- Front-load the primary keyword. The city/route name must appear early.
- **Sentence/Title case consistently** (this site uses Title Case — keep it).
- No two pages share the same title. Rotate the variation templates below so pages don't look machine-stamped.
- Meta description: **140–155 characters**, includes the primary keyword, one trust signal (24/7, licensed, professional drivers, meet-and-greet) and a soft CTA (Book on WhatsApp / Get a quote). Unique per page.
- **NO PRICING.** Do not put prices, rates, "fixed rates", "from X SAR", "fixed price", or any figure or currency in titles or descriptions. Compete on trust, coverage, and speed of response instead. Replace any existing price-based meta with a trust/CTA-based one.

## City / location pages — title variations
Use the user's requested pattern as the base, rotating across these variants so each city reads differently:

1. `Private Taxi & Chauffeur Service in {City} | Gulf Trip Service`
2. `{City} Taxi, Airport Transfer & Car Service | 24/7 | Gulf Trip`
3. `Private Car Transfer & Chauffeur in {City} — Book 24/7`
4. `{City} Airport Taxi & Private Transfers | Available 24/7`

Assign variant by rotating (city index mod 4) so neighbouring cities differ.

Meta description template (vary the wording, don't reuse verbatim):
`Book a private taxi, airport transfer or chauffeur in {City}. Professional drivers, meet-and-greet, 24/7 availability. Reserve on WhatsApp in minutes.`

## Cross-border / route pages — title variations
1. `{From} to {To} Taxi & Private Transfer | 24/7 Service`
2. `Taxi {From} to {To} | Cross-Border Car Service 24/7`
3. `{From} → {To} Private Transfer & Chauffeur | Gulf Trip`
4. `Book {From} to {To} Taxi — Border Crossing Made Easy`

Rotate by route index mod 4. For airport-origin routes, include the airport keyword: e.g. `Dammam Airport to Bahrain Taxi | Private Transfer 24/7`.

Meta description template:
`Reliable {From} to {To} taxi and private transfer. Cross-border paperwork handled, meet-and-greet pickup, professional drivers. Available 24/7 — book on WhatsApp.`

## Service pages — keyword-led titles
Map each to its head keyword:
- Airport Transfers → `Airport Taxi & Private Transfers in Saudi Arabia | 24/7`
- Hotel Transfers → `Hotel Transfer Taxi Service | Makkah, Jeddah, Madinah`
- Private Taxi → `Private Taxi Service in Saudi Arabia | Chauffeur & Car Hire`
- Umrah Transport → `Umrah Taxi & Transport Package | Makkah–Madinah Transfers`
- Ziyarat Services → `Ziyarat Taxi Service in Saudi Arabia | Guided Transfers`

## Tour pages
- Jeddah City Tour → `Jeddah City Tour by Private Taxi | Half & Full Day`
- AlUla Tour → `AlUla Tour Taxi Service | Private Day Trip from Madinah`
- Taif Ziyarat Tour → `Taif Ziyarat Taxi Service | Private Tour with Driver`

## Process
1. First, list every page URL that will get a new title/description (pull from the routes/cities/services datasets + the sitemap). Show me the full list with OLD title → NEW title in a table before applying, so I can spot-check.
2. After I approve, apply, and regenerate the sitemap if needed.
3. Verify: no duplicate titles, all under 65 chars, every page has a unique description. Report any that couldn't fit the keyword under the limit.

## Do NOT
- Do not touch body content, H1s (unless a separate ask), layout, or pricing logic.
- Do not invent new pages.
- Do not change the German taxi project — this is gulftripservice.com only.
