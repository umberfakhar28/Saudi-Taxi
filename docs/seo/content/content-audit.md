# Blog and guides: content audit and plan

20 November 2026, branch `dev`.

The brief asked for a new branch. The site now works on one `dev` branch (owner, 20 Nov), so this work goes there.

**Sources:**
- Search Console export for the 28 days to 19 Nov 2026 (pages and queries);
- the production build of every `/blog` and `/guides` page (head tags, H1, words, images, schema, CTAs, links in `<main>`);
- the redirects in `next.config.ts`.

---

## 1. Summary

- **Demand:** 26 post URLs, but only **one gets clicks**: `/blog/bahrain-to-dammam-travel-options`, with 36 clicks. Four more get real impressions and no clicks: the family post (583), the rent-a-car guide (242), the Red Sea guide (140) and the commuter guide (62).
- **Problems on every post:**
  - **No images.** None of the 26 has a cover image or an in-content image; the Kuwait guide has one.
  - **Old or missing dates.** Blog posts are dated "June 2025" with no update date; the guides have no date at all.
  - **Wrong schema.** The 13 guides carry *Service* schema instead of Article/BlogPosting.
  - **Long head tags.** 9 titles run over 60 characters with the brand suffix, and 12 meta descriptions run over 155.
- **Two URLs already redirect.** `/blog/private-vs-rental-car` and `/blog/hajj-transport-guide` were merged earlier with 301s. The brief's figures for them predate the merge. Their old `page.tsx` files are still in the repo as dead code.
- **`/guides` has no index page (404).** The guides' breadcrumb schema says "Guides" but links to `/our-services`.
- **No tag or category archive pages exist,** so there is nothing to noindex.
- **Some "informational" queries are taken elsewhere.** Distance and "how many hours" queries belong to the `/distance/*` pages, and Kuwait/Khafji queries to the Kuwait cluster. Blogs answer those in one line and link to the owner page.

---

## 2. Inventory

**Columns:**
- **GSC:** impressions / clicks / position, 28 days.
- **T / M:** title and meta description length, in characters.
- **Img:** images in the main content.
- **In / Money:** pages linking in (inside `<main>`) / links out to money pages.
- **CTA:** WhatsApp and Book Online buttons.

| Page | GSC | T | M | Words | Img | Schema | Dated | In / Money | CTA | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| blog/bahrain-to-dammam-travel-options | 1,226 / 36 / 6.3 | 70 | 147 | 1,570 | 0 | BlogPosting, FAQ | Sep 2026 | 6 / 7 | 2 | **KEEP & OPTIMIZE** (C) |
| blog/family-saudi-destinations | 583 / 0 / 5.6 | 60 | 161 | 1,460 | 0 | BlogPosting | Jun 2025 | 6 / 8 | 2 | **REWRITE** as the family hub (A) |
| guides/rent-a-car-vs-private-driver | 242 / 0 / 25.3 | 64 | 147 | 1,986 | 0 | Service, FAQ | – | 4 / 6 | 2 | **KEEP & OPTIMIZE**; absorbs chauffeur-vs-taxi (B) |
| guides/red-sea-coast-travel | 140 / 0 / 11.4 | 59 | 173 | 1,549 | 0 | Service, FAQ | – | 8 / 9 | 1 | **KEEP & OPTIMIZE** (F) |
| guides/bahrain-saudi-commuter-guide | 62 / 0 / 5.5 | 81 | 174 | 1,140 | 0 | Service, FAQ | – | 4 / 5 | 1 | **KEEP & OPTIMIZE** (C) |
| guides/king-abdulaziz-airport | 6 / 0 / 8.0 | 54 | 145 | 533 | 0 | Service, FAQ | – | 2 / 1 | 1 | **REWRITE** (E: Hajj terminal, KAIA) |
| blog/airport-transfer-tips | 5 / 0 / 14.0 | 44 | 117 | 551 | 0 | BlogPosting | Jun 2025 | 15 / 1 | 2 | **KEEP & OPTIMIZE**; absorbs benefits-private-airport-transfer |
| blog/safe-travel-tips-saudi | 4 / 0 / 10.0 | 53 | 140 | 360 | 0 | BlogPosting | Jun 2025 | 5 / 2 | 2 | **REWRITE** (thin) |
| guides/chauffeur-vs-taxi-saudi-arabia | 2 / 0 / 8.0 | 77 | 173 | 1,260 | 0 | Service, FAQ | – | 11 / 6 | 1 | **MERGE →** rent-a-car guide |
| blog/umrah-travel-planning | 2 / 0 / 4.0 | 51 | 126 | 361 | 0 | BlogPosting | Jun 2025 | 14 / 2 | 2 | **REWRITE** (thin, well linked) |
| blog/jeddah-hidden-gems | 2 / 0 / 9.0 | 60 | 79 | 355 | 0 | BlogPosting | Jun 2025 | 8 / 4 | 2 | **REWRITE** (thin) |
| blog/top-attractions-riyadh | 2 / 0 / 19.0 | 48 | 126 | 925 | 0 | BlogPosting, FAQ | Jun 2025 | 11 / 4 | 2 | **KEEP & OPTIMIZE** |
| guides/king-khalid-airport | 1 / 0 / 9.0 | 51 | 170 | 1,210 | 0 | Service, FAQ | – | 6 / 4 | 1 | **KEEP & OPTIMIZE** (E: 24/7, terminals) |
| blog/riyadh-to-jeddah-travel | 0 | 51 | 156 | 1,118 | 0 | BlogPosting, FAQ | Jun 2025 | 7 / 6 | 2 | **KEEP & OPTIMIZE** (link Phase B pages when live) |
| blog/alula-complete-guide | 0 | 47 | 118 | 400 | 0 | BlogPosting | Jun 2025 | 6 / 5 | 2 | **REWRITE** (thin; F) |
| blog/benefits-private-airport-transfer | 0 | 53 | 111 | 370 | 0 | BlogPosting | Jun 2025 | 4 / 5 | 2 | **MERGE →** blog/airport-transfer-tips |
| blog/vip-transport-saudi | 0 | 50 | 136 | 364 | 0 | BlogPosting | Jun 2025 | 2 / 4 | 2 | **MERGE →** guides/business-travel |
| guides/family-travel | 0 | 62 | 162 | 951 | 0 | Service, FAQ | – | 4 / 5 | 2 | **MERGE →** blog/family-saudi-destinations ("Getting around as a family") |
| guides/business-travel | 0 | 71 | 187 | 905 | 0 | Service, FAQ | – | 8 / 4 | 1 | **KEEP & OPTIMIZE** (+ VIP section) |
| guides/hajj-transportation | 0 | 45 | 154 | 465 | 0 | Service, FAQ | – | 5 / 0 | 1 | **KEEP & OPTIMIZE** (no money links today) |
| guides/long-distance-private-transfers | 0 | 57 | 183 | 1,362 | 0 | Service, FAQ | – | 5 / 2 | 3 | **KEEP & OPTIMIZE** |
| guides/regional-airport-transfer-guide | 0 | 73 | 157 | 1,028 | 0 | Service, FAQ | – | 11 / 5 | 2 | **KEEP & OPTIMIZE** |
| guides/umrah-transportation | 0 | 73 | 164 | 1,478 | 0 | Service, FAQ | – | 6 / 5 | 1 | **KEEP & OPTIMIZE** |
| guides/saudi-arabia-to-kuwait-by-road | 0 (new, 19 Nov) | 54 | 154 | 1,591 | 1 | Article, FAQ | 19 Nov 2026 | 8 / 5 | 1 | **LEAVE** (Kuwait task; image and design pass only) |
| blog/private-vs-rental-car | – | | | | | | | | | already 301 → rent-a-car guide; delete the dead `page.tsx` |
| blog/hajj-transport-guide | – | | | | | | | | | already 301 → guides/hajj-transportation; delete the dead `page.tsx` |
| /blog (index) | 3 / 0 / 7.3 | 53 | 139 | 341 | 0 | Breadcrumb | – | 22 in | 0 | **REDESIGN**: grouped by topic, featured posts |
| /guides (index) | 404 | | | | | | | | | **CREATE**: grouped hub; fix the guides' breadcrumbs |

**Every page today:**
- the canonical points to itself;
- the page is indexable;
- there is one H1;
- an OG image exists (the site default, not a post image);
- there is no hreflang (no `/ar/` versions).

**No real "last updated" dates.** Guides have none, and blogs show "June 2025".

---

## 3. Overlaps and merges

| Merge | Why | Inbound links to repoint |
|---|---|---|
| guides/chauffeur-vs-taxi-saudi-arabia → **guides/rent-a-car-vs-private-driver** | Both answer "how should I get around: taxi, chauffeur, rental car?". 2 impressions vs 242. | 11: /airport-transfers, /jeddah-airport-taxi-service, /tabuk-airport-taxi-service, /services/riyadh, /services/makkah, /services/tabuk, 4 guides, the VIP post |
| blog/benefits-private-airport-transfer → **blog/airport-transfer-tips** | Two short airport posts (370 + 551 words) on one intent. | 4: 2 posts, /blog, /site-map |
| blog/vip-transport-saudi → **guides/business-travel** | VIP/executive transport is a section of business travel; 0 impressions. | 2: /blog, /site-map |
| guides/family-travel → **blog/family-saudi-destinations** | The family hub needs the "getting around with kids and grandparents" content (vehicle size, child seats). Two family pages would split the 583 impressions. | 4: the family post, Hajj guide, /hotel-transfers, /site-map |

**How each merge works:**
- the unique content moves into the owner post;
- the old URL returns a 301 in `next.config.ts`;
- the old URL comes out of the sitemap and IndexNow lists;
- every internal link points straight to the new URL (no redirect chains).

**Kept separate on purpose:**
- **umrah-travel-planning** (pre-trip checklist) vs **guides/umrah-transportation** (moving between Jeddah, Makkah and Madinah): different intents, linked both ways.
- **riyadh-to-jeddah-travel** vs **/distance/riyadh-to-jeddah**: the blog compares modes; distance questions stay with the distance page.

---

## 4. Query clusters → one owner page each

Informational queries re-extracted from the Queries sheet: 847 queries in total.

| Cluster | Main queries (impr. / position) | Owner | Notes |
|---|---|---|---|
| **A1 First family trip / with grandparents / beach** | which saudi destinations are best for a first family trip? 165 / 3.4 · plan a saudi vacation for parents, children and grandparents 49 / 5.4 · where should families stay … beach, culture, easy transport 15 / 9.0 · best saudi beach and resort destinations for families 6 · family vacation destinations saudi arabia 8 / 22.6 · half-term 3 | **blog/family-saudi-destinations** (rewrite) | Answer-first; destinations by family type; where to stay |
| **A2 Family itinerary / moving between cities** | create a family-friendly saudi itinerary 7 · build a five-day saudi family itinerary 4 · plan a family trip to riyadh, jeddah and the red sea 4 · how should families travel between riyadh, jeddah and red sea destinations? 8 / 15.4 · itinerary for a family from the US 6 / UK 3 | **blog/family-saudi-destinations** | A 5-day timeline, Riyadh → Jeddah → Red Sea, with links to the route pages |
| **A3 Family religious trip** | which saudi places are best for a family religious trip? 74 / 5.1 · saudi arabia vs bahrain for islamic history and family travel 5 | **blog/family-saudi-destinations** (section) | Makkah and Madinah with grandparents; links to the Umrah pages |
| **A4 Abha / Taif summer** | plan an itinerary for abha for a family with kids 19 / 8.2 · abha or taif for a summer family trip from qatar 5 / 3.8 | **NEW: Abha vs Taif for a Summer Family Trip** | The only new post proposed (§6) |
| **B1 Car with driver (transactional)** | rent a car with a driver 48 / 29.6 · rent a car with driver 32 / 24.8 · rental car with driver 25 / 34.5 · car driver rental 18 · car with driver on rent 10 · car rental with driver 7 · car with driver for rent 7 · rent car with driver 5 / 11.6 | **/private-taxi** (service page, 0 impressions today; title already says "Chauffeur & Car Hire") | Retitle as "Car with Driver in Saudi Arabia"; decision 1 |
| **B2 Rent a car vs driver (informational)** | rent a car vs private driver, chauffeur vs taxi, does uber work? | **guides/rent-a-car-vs-private-driver** (+ the chauffeur-vs-taxi merge) | Comparison table: rental, car with driver, taxi, ride-hail |
| **B3 Chauffeur by city** | chauffeur service riyadh 11 / 34 · luxury chauffeur service in tabuk 15 / 7.3 · in mecca 20 / 46.8 · airport chauffeur service in middle east 134 / 23.8 | money pages: /services/{city}, /airport-transfers | Not blog material; noted for a later service-page pass |
| **C1 Bahrain ↔ Dammam / Khobar ways to travel** | uber taxi from dammam train station to janabiya bahrain 23 / 9.2 · careem dammam to bahrain · does uber work? / can i uber · bahrain to dammam by road 50 / 6.8 | **blog/bahrain-to-dammam-travel-options** | New section: from Dammam railway station to Bahrain (Janabiya, Manama, Seef); links to the new Dammam → Bahrain and airport pages |
| **C2 Riyadh ↔ Bahrain how-to** | bahrain to riyadh distance by bus 17 · how to go bahrain from riyadh by road 2 · how close is bahrain to saudi arabia 4 | **guides/bahrain-saudi-commuter-guide** (bus vs taxi section), with a link to /distance/bahrain-to-riyadh | Hours and km stay with the distance page |
| **C3 Commuting** | (page is at position 5.5 with 0 clicks: title and meta fix) | **guides/bahrain-saudi-commuter-guide** | Daily and weekly commuting, peak times, documents |
| **D Borders** | doha to salwa border distance 11 · doha to saudi border distance by road 6 · distance from doha to saudi border 5 · salwa to dammam distance 13 · al batha border crossing 4 / 21 · riyadh to batha border distance 2 | **/border-crossing** (enrich), with no new guides | About 45 impressions in total, too few for separate pages. Add Salwa / Abu Samra and Al Batha / Ghuwaifat sub-sections. Khafji stays with the Kuwait task. |
| **E1 Riyadh airport** | are taxis 24/7 at riyadh airport, including late-night arrivals? 5 · how to get to ruh airport 2 / 17 · ruh terminal 4 pickup 15 / 12.3 · ruh terminal 3 pickup 14 / 11.8 | **guides/king-khalid-airport** | A late-night arrivals section, plus terminal pickup |
| **E2 Jeddah airport** | haj terminal b taxi 30 / 5.1 · jeddah airport transfer 34 / 40.4 | **guides/king-abdulaziz-airport** (rewrite) | Hajj and Umrah terminal; the transactional query goes to /jeddah-airport-taxi-service |
| **E3 Airport tips** | airport chauffeur … middle east (transactional → /airport-transfers) | **blog/airport-transfer-tips** (+ benefits merge) | |
| **F Luxury / Red Sea / AlUla** | how should luxury travellers move between riyadh, alula and the red sea? 5 / 5.2 · red sea international airport umluj 6 / 23 · umluj to al wajh distance 4 · neom taxi 12 | **guides/red-sea-coast-travel** (+ a luxury section) and **blog/alula-complete-guide** (rewrite) | "alula private tours" (35 impr., position 45) belongs to the AlUla tour service page |
| **G Umrah / Hajj** | private car service for umrah 17 / 23.7 · private transport umrah 4 · airport transfer for umrah 5 | money pages (/umrah-taxi-services, /airport-transfer-for-umrah); blogs link to them | |
| **Riyadh / Jeddah sights** | (very low) | blog/top-attractions-riyadh, blog/jeddah-hidden-gems | Refresh only |

**Not targeted by the blogs:**
- Distance, "how far" and "how many hours" queries (Bahrain–Riyadh 409 + 267 …) belong to `/distance/*`.
- Kuwait, Khafji and Nuwaiseeb queries belong to the Kuwait cluster.

---

## 5. Build plan (after approval)

**One shared article layout** for both `/blog` and `/guides`, built from the route pages' existing parts, instead of 26 one-off pages. Each post chooses the blocks that suit its topic:

- **Top of the post:**
  - a hero with the cover image, H1, answer-first intro, "Updated" date, reading time and the main CTA;
  - a quick-answer box with stat tiles;
  - a table of contents (sticky on desktop, collapsible on phones).
- **Body blocks:** comparison tables, itinerary timeline cards, place cards with image slots, and tip / warning / info callouts.
- **CTAs:** an inline CTA after the first answer and one mid-article, both "Book a private car from {A} to {B}" with WhatsApp and Book Online.
- **End of the post:** related routes and related guides as card grids, then the final CTA banner.
- **Byline:** the "Gulf Trip Service travel team" author box.

**On-page SEO, every post:**
- **Head tags:** title ≤ 60, meta ≤ 155, one H1 with no dash, self-canonical.
- **Schema:**
  - BlogPosting or Article (headline, image, author, datePublished, dateModified);
  - BreadcrumbList pointing to `/blog` or `/guides`;
  - FAQPage, with the same text as the visible FAQ.
- **Sharing:** a 1200×630 OG image per post.

**Tracking:**
- `whatsapp_click` with `button_location: blog_inline / blog_final` and the route;
- Book Online clicks;
- `generate_lead` on forms.

**Links per post:**
- 4–8 to money pages;
- 2–3 to related posts;
- the matching distance page.

**Links back:** a "Travel guides" block on the related route and service pages, for example:
- the Bahrain routes link the Bahrain posts;
- the Umrah pages link the religious-trip section;
- the airport pages link the airport guides.

**Indexes:** `/blog` and the new `/guides`, grouped by topic: Bahrain & cross-border, family trips, airports, Umrah & Hajj, car with driver, Riyadh & Jeddah.

**Order of work (one deployment at the end):**
1. **The layout,** plus the `/guides` index, the `/blog` redesign and the breadcrumb fix.
2. **The highest-demand pages:**
   - Bahrain–Dammam;
   - the family hub (+ family-travel merge);
   - rent-a-car (+ chauffeur merge) and `/private-taxi`;
   - Red Sea;
   - the commuter guide;
   - both airport guides;
   - `/border-crossing` borders.
3. **The new Abha vs Taif post.**
4. **Everything else:** refresh and the remaining merges (airport tips, business + VIP), then the rest of the posts.
5. **QA:** a similarity check, then the report.

**Prices:** only "Starting from" fares that are already on the route pages:

| Route | Starting from |
|---|---|
| Riyadh → Bahrain | 1,250 SAR |
| Dammam → Bahrain | 500 SAR |
| Dammam Airport → Bahrain | 550 SAR |
| Riyadh → Doha | 1,700 SAR |
| Riyadh → Kuwait | 220 KWD |

Riyadh ↔ Jeddah (2,400 SAR) is quoted only once its Phase B route pages exist.

---

## 6. Proposed new post (only one)

**`/blog/abha-vs-taif-summer-family-trip`: Abha vs Taif for a Summer Family Trip**

- **Target queries:** "plan an itinerary for abha for a family with kids" (19 / 8.2), "abha or taif for a summer family trip from qatar" (5 / 3.8). The family hub ranks for neither intent specifically.
- **Outline:**
  1. Quick answer: which one suits which family.
  2. Comparison table: climate, altitude, drive from Jeddah, Riyadh and Doha, what kids can do, where to stay.
  3. A 3-day Abha itinerary with kids (timeline cards).
  4. A 2-day Taif itinerary (Al Hada, Al Shafa, the rose farms in season).
  5. Getting there: flights into Abha or Taif airport, or by road. Links to the airport pages, the Abha distance pages and the Jeddah–Taif routes.
  6. FAQ.
  7. CTA.
- **Target length:** about 1,300–1,600 words, with a similarity check against the family hub.

No border guides: §4 D is too small, so `/border-crossing` gets those sub-sections instead.

---

## 7. Decisions needed

1. **Who owns "rent a car with driver"?**
   - **Recommended:** `/private-taxi` becomes the transactional page ("Car with Driver in Saudi Arabia"), and the guide stays the comparison ("Rent a Car vs Car with Driver").
   - Giving both the same keyword (as the brief's Step 2B suggests) would make them compete.
   - OK to retitle `/private-taxi`?
2. **The four merges in §3.** OK? Each gets a 301, and its internal links are repointed.
3. **Images.**
   - **Count:** about 25 posts × (one cover + 2–3 in-content images) comes to roughly 75–100 images. The site has none for these topics.
   - **Recommended:** I write one prompt per image (file name and alt text included, as you sent for the route pages), and you generate and send them. Until then, posts ship with styled placeholders. Or ship with placeholders only?
4. **Scope of one deployment.** Doing all ~25 posts properly is large. Should I deploy once after the whole list? Or deploy after step 2 of §5 (the pages that actually get impressions), with the rest following in a second deployment?
5. **The new Abha vs Taif post:** approve?
