# Blog and guides, wave 1: report

20 November 2026, branch `dev`. The plan is in [content-audit.md](content-audit.md).

**Owner decisions (20 Nov):**
- `/private-taxi` owns "car with driver";
- the merges are approved;
- I write image prompts and you generate the images;
- the high-traffic pages deploy first;
- the Abha vs Taif post is approved.

---

## 1. What changed

### New shared layout: `ArticlePage`

**Files:**
- `src/components/ArticlePage.tsx` and `.module.css`;
- `src/lib/articles.ts` (the types and one registry of every post).

**Top of the page:**
- **Hero:**
  - a navy band with the breadcrumb, H1 and an answer-first lead;
  - the updated date, reading time and byline;
  - WhatsApp and Book Online buttons;
  - the cover photo, or an "At a glance" stats panel when there is no photo yet.
- **Quick answer box:** bullet points, plus stat tiles when a cover exists.
- **Contents:** sticky on desktop, collapsible on phones.

**Body blocks:**
- paragraphs and lists;
- tables, with an optional highlighted row;
- timelines, cards and callouts (tip, info or warning);
- images;
- an inline CTA.

**After the article:**
- the FAQ as an accordion;
- an author box;
- related routes, then related guides (cards from the registry);
- a final CTA band.

**Schema:**
- BlogPosting (blog) or Article (guides), with the image, author, `datePublished`, `dateModified` and `mainEntityOfPage`;
- BreadcrumbList pointing to `/blog` or `/guides`;
- FAQPage, built from the same text as the visible FAQ.

**Tracking** (`lib/analytics.ts`, `WhatsAppTracking.tsx`):
- **WhatsApp clicks:** `whatsapp_click` now sends `button_location` as `hero`, `blog_inline` or `blog_final`.
- **Route:** posts about one route set `data-route` (for example "Dammam-Bahrain"), and it is sent as `route`.
- **New event, `book_online_click`:** any `/book-online` link, with the same button location and route. You can mark it as a Key event in GA if you want.

### Pages

| Page | What happened |
|---|---|
| `/blog` | Redesigned: "Start here" featured posts, then grouped by topic, with a link to `/guides` |
| `/guides` | **New** (was a 404). Guides grouped by topic. Every guide's breadcrumb now points here instead of `/our-services` |
| `/blog/bahrain-to-dammam-travel-options` | New layout. New section "From the Dammam train station to Janabiya or Manama" (~65 km). Uber and Careem answered up top. Fares 500 / 550 / 1,250 SAR, "starting from", all from the route pages |
| `/blog/family-saudi-destinations` | Rewritten as the family hub, with its own section for each query: first trip, grandparents, beach, where to stay, 5-day itinerary, between cities, religious trip. Absorbs `/guides/family-travel` |
| `/blog/abha-vs-taif-summer-family-trip` | **New**. Comparison table, 3-day Abha plan, 2-day Taif plan, getting there from Jeddah, Riyadh and Qatar |
| `/guides/rent-a-car-vs-private-driver` | Rental vs taxi vs car with driver. Absorbs `/guides/chauffeur-vs-taxi-saudi-arabia` and links `/private-taxi` as the booking page |
| `/private-taxi` | Retitled "Car with Driver in Saudi Arabia \| Hourly & Daily Hire". New H1, intro and a "rent a car with driver" FAQ |
| `/guides/red-sea-coast-travel` | Road figures added, a luxury route (Riyadh → AlUla → the Red Sea), and Umluj ↔ Al Wajh |
| `/guides/bahrain-saudi-commuter-guide` | Title shortened (the old one was 81 characters and cut off). New sections on Riyadh to Bahrain by bus, train or car, and "how close is Bahrain" |
| `/guides/king-khalid-airport` | Table of pickups at T1 to T5, a late-night arrivals section, and onward fares |
| `/guides/king-abdulaziz-airport` | Rewritten for the 2026 terminals: Terminal 1, the new Terminal 4, and the Hajj and Umrah halls (for example B3). Hajj Terminal pickup step by step |
| `/border-crossing` | New "Qatar and UAE borders in detail" section (Salwa / Abu Samra, Al Batha / Ghuwaifat) and two FAQs |

### Merges (301 in `next.config.ts`; sitemap and links updated)

| Old URL | Now |
|---|---|
| `/guides/chauffeur-vs-taxi-saudi-arabia` | `/guides/rent-a-car-vs-private-driver` |
| `/guides/family-travel` | `/blog/family-saudi-destinations` |

**Cleanup:**
- 11 internal links were repointed, so none goes through a redirect.
- The dead `page.tsx` files of the two URLs that already redirected (`/blog/private-vs-rental-car`, `/blog/hajj-transport-guide`) were deleted.

**Links back to the posts:**
- `/services/abha` and `/services/taif` now link to the Abha vs Taif post (Abha also to the family hub).
- `/private-taxi` links to the comparison guide.
- `/border-crossing` links to the Bahrain post and the Kuwait guide.
- The site map lists every blog post and guide from the registry, so it can't fall out of date.

---

## 2. Facts corrected along the way

| Where | Was | Now | Source |
|---|---|---|---|
| Jeddah airport guide, airport page data, FAQ, Jeddah city page | "North (T1) and South (T2)" terminals; South Terminal for domestic flights | Terminal 1, Terminal 4 (the rebuilt South Terminal, open in stages since 27 Sep 2026), and the Hajj and Umrah Terminal. North Terminal flights moved from 17 Oct 2026 | Airport announcements as reported by Khaleej Times, Saudi Gazette and Zawya, Sep–Oct 2026 |
| Red Sea guide | Al Wajh "about four and a half hours beyond Umluj" | About 170 km, 2–2.5 h | OSRM |
| `/border-crossing`, Qatar card | "~100 km from Hofuf / ~580 km from Riyadh" | ~90 km from Doha / ~160 km from Hofuf / ~230 km from Dammam | OSRM; 580 km is Riyadh to Doha |
| `/border-crossing`, UAE card | "~330 km from the Riyadh direction" | ~350 km from Dammam / ~360 km to Abu Dhabi | OSRM |

**Not changed yet:**
- Some route pages still say "KAIA Terminal 1 & 2" for Jeddah airport (`routeData.ts`, `cityData1.ts` pickup lists). That is out of date now that Terminal 4 exists; fix it in wave 2.
- The Arabic `/ar/border-crossing` page has the same two wrong distances.

---

## 3. QA (production build, 20 Nov)

**Build:** clean. The log has no errors or warnings, and every page is static.

**Head tags and schema:**
- All 12 pages have a title of 60 characters or less, a meta of 155 or less, one H1 and a self-canonical.
- The FAQ schema has the same number of questions as the visible FAQ.
- No leftover `**` or `](/` markup appears in the rendered text.
- No broken internal links, and no page links to a merged URL.
- `/border-crossing` keeps its 61-character title, which predates this work.

**Similarity** (5-word shingles; target under 25%):

| Pages compared | Similarity |
|---|---|
| Family hub vs Abha/Taif | 3.0% |
| Bahrain post vs commuter guide | 6.2% |
| Bahrain post vs Dammam route page | 1.4% |
| Rent-a-car vs `/private-taxi` | 1.2% |
| Jeddah airport guide vs Jeddah airport page | 1.4% |
| Riyadh guide vs Jeddah guide | 3.6% |

**In the browser** (1440 px and 390 px, four pages): no console errors and no horizontal scroll. Screenshots are in the scratchpad, not the repo.

**Word counts:**

| Page | Words |
|---|---|
| Bahrain post | 1,865 |
| Family hub | 2,349 |
| Abha vs Taif | 1,461 |
| Rent-a-car | 2,014 |
| Red Sea | 1,637 |
| Commuter | 1,321 |
| Riyadh airport | 1,460 |
| Jeddah airport | 1,397 |

---

## 4. Images

- The prompts for 18 images are in [image-prompts-wave1.md](image-prompts-wave1.md).
- Three pages already use your existing photos as covers: the Bahrain post (the Dammam causeway photo), the commuter guide (the causeway border photo) and rent-a-car (driver with luggage).
- The other pages show the "At a glance" panel until their covers arrive.

---

## 5. Deploying wave 1

1. Merge `dev` into `main` and push. Vercel deploys automatically.
2. After it is live, POST `/api/indexnow`. The list now includes `/blog`, `/guides` and the 8 posts.
3. In Search Console:
   - submit the sitemap again;
   - request indexing for `/guides`, `/blog/abha-vs-taif-summer-family-trip` and `/blog/family-saudi-destinations`.

**What to check in mid-December:**
- clicks and CTR for the family hub (583 impressions) and the Bahrain post;
- whether "haj terminal b taxi" and "ruh terminal 3/4 pickup" move up;
- `book_online_click` and `whatsapp_click` with `button_location` `blog_inline` and `blog_final`.

---

## 6. Wave 2 (not started)

**Merges:**
- `benefits-private-airport-transfer` into `airport-transfer-tips`;
- `vip-transport-saudi` into `guides/business-travel`.

**Rewrites onto the new layout:**
- safe-travel-tips, umrah-travel-planning, jeddah-hidden-gems and alula-complete-guide;
- business-travel, hajj-transportation, long-distance, regional-airport and umrah-transportation;
- top-attractions-riyadh and riyadh-to-jeddah-travel. Link Phase B once it is live; 2,400 SAR is quoted only after that.

**Other:**
- the Kuwait guide moves onto the new layout, unchanged;
- the image prompts for wave 2;
- the leftover "Terminal 1 & 2" mentions, and the Arabic border page distances (§2).
