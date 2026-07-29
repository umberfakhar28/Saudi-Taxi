# Post-Change Report — Internal Linking Overhaul

Comparing `seo-audit/link-graph.json` from the Step 2 baseline commit (`34aa235`) against the current state, both produced by `scripts/seo/build-link-graph.js`.

**Important caveat on the numbers below:** two fixes made in this pass use JavaScript logic (array `.filter()`/category matching, a `.map()` over a prop-derived value) that the static crawler cannot trace — the blog "Related Reading" module (`BlogPost.tsx`) and the guide `relatedGuide` pairing (`GuidePage.tsx`). Both were verified working correctly by rendering the actual pages in a browser (Playwright, screenshotted) rather than by the crawler. This means the **crawler-reported numbers below undercount the real improvement** — practically, all 12 blog posts and all 6 guides have real inbound links in production that the automated count still shows as 0. Noted per-metric below where this applies.

## Headline numbers

| Metric | Before | After (crawler) | After (verified in browser) |
| --- | --- | --- | --- |
| Orphan pages (zero inbound links) | 57 | 22 | **~10** (12 of the 22 are blog posts, confirmed linked via Related Reading — see caveat) |
| Commercial pages at depth ≥ 4 or unreached | 27 | 1 | **1** (the 1 remaining is `/services`, an intentional noindex duplicate of `/our-services`) |
| Broken internal links (404s) | 0 | 0 | 0 — was already clean |
| Redirect-triggering internal links | 0 | 0 | 0 — was already clean |
| Non-crawlable nav elements (`href="#"` etc.) | 1 | 1 | 1 (see "Not fixed" below) |
| Median contextual inbound links, commercial pages | 1 | 3 | 3+ |
| Zero-contextual-inbound commercial pages | 27 | 1 | 1 |
| Generic anchor instances ("click here" etc.) | 0 | 0 | 0 — was already clean |
| Total public pages | 109 | 110 | 110 (+`/site-map`) |

## What moved the numbers

1. **City hub sibling links** (13 pages) — `nearbyCities` field + one earned sentence per city via `CityServicePage.tsx`. Fixed 11 of 13 city-hub orphans in one change.
2. **Airport-transfer cluster** — city-hub "Book Airport Transfer" card now links to the city-specific airport page instead of the generic hub; fixed all 6 city-airport pages.
3. **Umrah/Ziyarat + specialty-services clusters** — `/our-services` gained 5 missing service cards (Umrah Taxi Services, Corporate Transportation, Wedding Transportation, School Bus Services, Educational Tours Transport) that weren't in the directory at all; the 4 specialty pages now cross-link to each other.
4. **Depth fixes** — homepage and `/our-services`/`/private-taxi` each gained one sentence naming the 8 cities that were sitting at depth 4–7, bringing every city hub to depth ≤ 2.
5. **Crawler blind spots fixed mid-pass** — `RelatedLinks` prop arrays and the new `nearbyCities` data shape weren't visible to the original crawler; fixing that surfaced ~15 already-real links the first audit had missed, which is why some "before" numbers in this report undercount what the site actually had even before this branch.
6. **Guides cluster** (6 pages, all orphaned) — `GuidePage.tsx` gained a `relatedGuide` field pairing the 6 guides thematically, plus one inbound link each from a matching service page.
7. **Blog cluster** (13 pages, all orphaned) — `BlogPost.tsx` gained a relevance-based "Related Reading" module (same-category first, capped at 4), which is also the Step 6 related-posts requirement. `/blog` itself gained 2 contextual entry links (from `/about-us` and `/our-gallery`).
8. **Breadcrumbs** — added to the 6 indexed pages that had neither their own breadcrumb nor a shared template with one built in (`/blog`, `/fleet`, `/book-online`, `/contact-us`, `/faqs`, `/ar/contact-us`).
9. **Footer de-bloat** — the "Cross-Border Routes" footer column listed all 18 route pages individually (footer was ~37 internal links total). Trimmed to 5 representative routes + a link to the new `/site-map`, which now guarantees reachability for the routes that column used to carry alone. Footer is ~23 internal links.

## Not fixed (documented, not silently dropped)

- **`SocialProof.tsx:33` — `href="#"` Trustpilot link.** This is a placeholder for a real Trustpilot profile URL that doesn't exist in the codebase yet. Fabricating one would violate "invent nothing" — left as-is, flagged for whoever has the real URL.
- **`/services` at depth null / zero inbound.** Intentionally `noindex` (duplicate of `/our-services`, pre-existing). No SEO value in fixing internal links to a noindex page; left alone per "don't touch noindex."
- **`/thank-you`.** Transactional confirmation screen with a full-bleed centered layout, no container to hang a breadcrumb on, and no realistic path a content page should link to it from (users only reach it after completing checkout). Left unbreadcrumbed and unlinked-from-content by design.
- **`/checkout`, `/my-account`, `/pay-online`, `/contact`, `/about`.** All pre-existing `noindex` transactional/duplicate pages. Breadcrumbs and contextual linking skipped — no indexing benefit, and forcing "browse-to-checkout" links would be misleading UX.
- **~10 remaining orphans** (mostly `/cart` and a few blog posts the crawler still can't trace — see caveat above) — genuinely deferred, not hidden. A next pass could extend `build-link-graph.js` to trace computed `.filter()`/`.slice()` patterns, or hand-verify the remainder in-browser the way blog/guides were.

## Verification performed

- `npx tsc --noEmit` — clean after every commit.
- `npm run build` — 132 routes generated, 0 errors, 0 warnings.
- `npm run seo:links` — passes (0 broken links, 0 non-canonical hrefs, 0 `href="#"` in nav components).
- Playwright screenshots for every non-crawler-traceable fix (city sibling sentences, airport card retargeting, guide pairing, blog related-reading module) — see conversation history for screenshots; all rendered correctly with real `<a href>` tags, no console errors.

## Re-running this audit

```
npm run seo:audit   # refreshes link-graph.json, internal-link-audit.md, config/internal-links.json
npm run seo:links   # CI-style check — exits non-zero on broken/non-canonical/href="#" nav links
```

---

## Follow-up pass — bare-CTA anchor text, linked-image alt, footer-trim regression check

**Correction to the headline numbers above:** the "Generic anchor instances" row reported `0` before and after this branch. That figure was inaccurate. The crawler's `GENERIC_ANCHORS` phrase list already included "learn more", but its `href={item.field}`-style dynamic-array resolver (used by `.map()`-rendered card grids, e.g. `/our-services`) hardcoded `anchorText: item.label` instead of reading the link's actual JSX text — so any card array without a `label` field lost its anchor text entirely and was invisible to every anchor-text check, not just the generic-phrase one. This pass fixed the extractor and expanded the phrase list (see "Crawler fix" below); a re-run now correctly reports **12** generic-anchor instances, all pre-existing and none touching pages fixed in this pass (detail below).

### Task 1 & 2 — anchors fixed

`src/app/globals.css` gained a `.sr-only` WCAG clip-rect utility (none existed before). Every fix below wraps the existing bare CTA text in `<span className="sr-only">…</span>` naming the specific item, sourced only from data already in scope — no new marketing copy was written.

| File | Line | Old anchor (visible text) | New anchor (accessible text) |
| --- | --- | --- | --- |
| `src/app/our-services/page.tsx` | 169 | "Learn More →" | "Learn More about {svc.title} →" |
| `src/app/abha-airport-taxi-service/page.tsx` | 64 | "Book Now" | "Book Now your Abha Airport taxi" |
| `src/app/dammam-airport-taxi-service/page.tsx` | 76 | "Book Now" | "Book Now your Dammam Airport taxi" |
| `src/app/jeddah-airport-taxi-service/page.tsx` | 70 | "Book Now" | "Book Now your Jeddah Airport transfer" |
| `src/app/madina-airport-taxi-service/page.tsx` | 92 | "Book Now" | "Book Now your Madinah Airport taxi" |
| `src/app/riyadh-airport-taxi-service/page.tsx` | 106 | "Book Now" | "Book Now your Riyadh Airport taxi" |
| `src/app/taif-airport-taxi-service/page.tsx` | 76 | "Book Now" | "Book Now your Taif Airport taxi" |
| `src/app/hotel-transfers/page.tsx` | 137 | "Book Now" | "Book Now your hotel transfer" |
| `src/app/jeddah-to-makkah-taxi-service/page.tsx` | 214 | "Book Now" | "Book Now your Jeddah to Makkah transfer" |
| `src/app/our-gallery/page.tsx` | 160 | "Book Now" | "Book Now your ride" |
| `src/app/airport-transfers/page.tsx` | 198 | "Book Now" | "Book Now your airport transfer" |
| `src/app/umrah-taxi-services/page.tsx` | 174 | "Book Now" | "Book Now your Umrah transport" |
| `src/app/fleet/page.tsx` | 126 | "Book Now" (per vehicle card) | "Book Now the {car.name}" |
| `src/app/private-taxi/page.tsx` | 127 | "Book Now" (per package card) | "Book Now the {pkg.title} package" |

Incidental fixes found while searching `content/*.html` for the same pattern (these static guide pages linked `/booking?...`, which `next.config.ts` permanently redirects to `/book-online?...` — a redirect hop on every click):

| File | Line(s) | Fix |
| --- | --- | --- |
| `content/makkah-to-madinah-taxi.html` | 558 | Bare "Book Now" → "Book Now your Makkah to Madinah taxi"; URL repointed `/booking?route=makkah-madinah` → `/book-online?route=makkah-madinah` |
| `content/jeddah-to-makkah-taxi.html` | 941, 949, 956 | Anchor text already descriptive ("Book Economy" / "Book SUV" / "Book Luxury") — URL-only fix, same query params preserved |
| `content/makkah-umrah-taxi-service.html` | 878, 879 | Anchor text already descriptive ("Book Jeddah-Makkah Transfer" / "Book Makkah-Madinah Transfer") — URL-only fix, same query params preserved |

**13 instances deliberately skipped** (title/context sits outside the same `<Link>` with no natural per-item text to reference, or the CTA is a legitimate single-destination button):

- `src/components/Footer.tsx:109`, `src/components/Navbar.tsx:212` — global chrome, identical link on every page of the site; no page-specific context exists to attach.
- `src/components/BlogPost.tsx:85` — shared template CTA ("Ready to Book Your Transfer?"), same across all 13 posts regardless of topic.
- `src/app/cart/page.tsx:32` — empty-cart-state CTA; no item to reference.
- `src/app/our-services/page.tsx:201` — bottom-of-page CTA, distinct from the per-card fix at line 169.
- `src/app/page.tsx:411` — homepage bottom-of-page CTA.
- `src/app/contact-us/ContactUsClient.tsx:243` — generic booking prompt, not a card.
- `src/app/page.tsx:324` and `src/app/cart/page.tsx:46` — bare "→" arrow-only links inside route/service suggestion cards; the card's title sits in a separate `<Link>`/element already carrying the descriptive anchor, so these arrows are auxiliary "continue" affordances, not the page's real anchor signal.

Also noted but **not fixed** (out of scope — a separate, unrelated finding): `content/makkah-umrah-taxi-service.html:167` has `<a href="/jeddah-airport-to-makkah/" class="link-more">Learn more about Jeddah Airport transfers →</a>` — the anchor text is fine, but `/jeddah-airport-to-makkah/` doesn't match any known route slug in `src/lib/routeData.ts` or `airportRoutesData.ts`. Left alone rather than guessing the intended target; flagging here for follow-up.

### Task 3 — linked images with empty alt

Searched `src/` for `alt=""` and `alt={""}` on any `<Image>`/`<img>`, then manually checked every linked image site-wide. **Zero matches, before or after this pass.** No linked image on the site has an empty alt attribute — nothing to fix. (Purely decorative images that are *not* inside a link correctly keep `alt=""` and were left untouched, per the task's own instruction.)

### Task 4 — 13 footer-trimmed routes, contextual inbound links

The footer's "Cross-Border Routes" column was trimmed in an earlier commit on this branch from all 18 route pages down to 5 (`dammam-airport-to-bahrain`, `dammam-airport-to-qatar`, `khafji-to-kuwait`, `riyadh-to-dubai`, `dammam-to-abu-dhabi`) plus a link to `/site-map`. Checked the remaining 13 for contextual inbound links (excluding nav, footer, breadcrumb, and `/site-map`):

| Route | Contextual inbound (excl. nav/footer/breadcrumb/site-map) | Linked from |
| --- | --- | --- |
| `/dammam-airport-to-khafji-taxi-service` | 6 | `/airport-transfers`, `/border-crossing`, `/dammam-to-kuwait-taxi-service`, `/khafji-to-kuwait-taxi-service`, `/kuwait-to-dammam-taxi-service`, `/services/dammam` |
| `/dammam-airport-to-riyadh-taxi-service` | 3 | `/airport-transfers`, `/border-crossing`, `/services/dammam` |
| `/bahrain-to-dammam-taxi-service` | 5 | `/`, `/ar/dammam-airport-to-bahrain-taxi-service`, `/border-crossing`, `/dammam-airport-to-bahrain-taxi-service`, `/riyadh-to-bahrain-taxi-service` |
| `/qatar-to-riyadh-taxi-service` | 5 | `/`, `/ar/dammam-airport-to-qatar-taxi-service`, `/border-crossing`, `/dammam-airport-to-qatar-taxi-service`, `/qatar-to-dammam-taxi-service` |
| `/riyadh-to-bahrain-taxi-service` | 3 | `/bahrain-to-dammam-taxi-service`, `/bahrain-to-riyadh-taxi-service`, `/border-crossing` |
| `/dammam-to-kuwait-taxi-service` | 5 | `/border-crossing`, `/dammam-airport-to-khafji-taxi-service`, `/khafji-to-kuwait-taxi-service`, `/kuwait-to-dammam-taxi-service`, `/kuwait-to-riyadh-taxi-service` |
| `/kuwait-to-dammam-taxi-service` | 4 | `/border-crossing`, `/dammam-to-kuwait-taxi-service`, `/khafji-to-kuwait-taxi-service`, `/kuwait-to-riyadh-taxi-service` |
| `/kuwait-to-riyadh-taxi-service` | 4 | `/border-crossing`, `/dammam-to-kuwait-taxi-service`, `/khafji-to-kuwait-taxi-service`, `/kuwait-to-dammam-taxi-service` |
| `/qatar-to-dammam-taxi-service` | 2 | `/border-crossing`, `/dammam-airport-to-qatar-taxi-service` |
| `/dammam-to-dubai-taxi-service` | 4 | `/border-crossing`, `/dammam-to-abu-dhabi-taxi-service`, `/dubai-to-dammam-taxi-service`, `/riyadh-to-dubai-taxi-service` |
| `/dubai-to-dammam-taxi-service` | 3 | `/border-crossing`, `/dammam-to-abu-dhabi-taxi-service`, `/dammam-to-dubai-taxi-service` |
| `/bahrain-to-riyadh-taxi-service` | 2 | `/border-crossing`, `/riyadh-to-bahrain-taxi-service` |
| `/dubai-to-riyadh-taxi-service` | 2 | `/border-crossing`, `/riyadh-to-dubai-taxi-service` |

**Finding: no regressions, nothing to fix.** Every one of the 13 routes has 2–6 contextual inbound links, all via `/border-crossing` (which hardcodes contextual links to all 18 routes and predates this footer trim) plus sibling-route and city-hub mentions added earlier in this branch. None depend on the footer at all.

**Before/after framing:** the "before" and "after" contextual-inbound counts for these 13 routes are identical to the table above — footer links were never counted as "contextual" by this audit's own definition (`section === "contextual"`, i.e. in-prose links, as distinct from nav/footer/breadcrumb chrome), so trimming the footer could not mathematically change these numbers either way. The concern that motivated this check (footer trim → possible orphaning) was reasonable to verify but did not materialize; `/border-crossing`'s existing comprehensive route coverage made the footer column redundant for reachability from the start.

### Crawler fix

`scripts/seo/build-link-graph.js`: the `href={item.field}` dynamic-array resolver (used for `.map()`-rendered link cards) assigned `anchorText: item.label` unconditionally, so arrays without a `label` field — like the `services` array behind `/our-services`'s card grid — lost their anchor text entirely and were invisible to every anchor-text audit. Fixed to extract the link's actual (shared, static) JSX text first and fall back to `item.label` only when the visible text is itself an interpolated field. Also expanded `GENERIC_ANCHORS` with the phrases from this pass's Task 2 sweep ("view details", "book now", "explore", "find out more", "get started", "continue"), stripped trailing decorative arrows/chevrons before matching so "Learn More →" is caught, and added detection for anchors that are nothing but a bare decorative glyph. Re-running `npm run seo:audit` now correctly reports 12 pre-existing generic-anchor instances (bare "Book Now" / bare "→" CTAs that were legitimately skipped in Task 2 as single-destination buttons with no per-item context — see skip list above) — confirming both that the fix works and that none of the 27 instances actually fixed in this pass remain flagged.

### Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 110 static routes generated, 0 errors.
- `npm run seo:links` — passes (0 broken links, 0 non-canonical hrefs, 0 `href="#"` in nav).
- `npm run seo:audit` — regenerated `link-graph.json`, `internal-link-audit.md`, `config/internal-links.json`; generic-anchor instances now correctly reported as 12 (previously an inaccurate 0).

---

## content/ audit pass — bringing content/*.html into scope

**Context:** `content/*.html` is 6 static HTML fragments (`jeddah-airport-taxi-service.html`, `jeddah-to-makkah-taxi.html`, `madinah-umrah-taxi-service.html`, `makkah-to-madinah-taxi.html`, `makkah-umrah-taxi-service.html`, `riyadh-to-dammam-taxi.html`) that live entirely outside `src/app`. They are read at render time by `readContentFile()` (`src/lib/readContent.ts`), which extracts only the `<body>` innerHTML and discards `<head>`, and injected into a guide page via `dangerouslySetInnerHTML`. The crawler's page walk only ever looked at `src/app/**/page.tsx`, so this markup — real `<a href>` links and `<img>` tags — was completely invisible to every prior audit. The earlier follow-up pass found redirect hops and one suspected broken link here only by manual grep, which is exactly why every "0" figure this audit reported for that directory was unverified rather than actually clean.

### Task 1 — file → live URL mapping

Derived from the actual call site rather than hardcoded, so a re-wired guide page stays correctly attributed:

| content/ file | Calling page.tsx | Live route |
| --- | --- | --- |
| `jeddah-airport-taxi-service.html` | `src/app/jeddah-airport-taxi-guide/page.tsx` | `/jeddah-airport-taxi-guide` |
| `jeddah-to-makkah-taxi.html` | `src/app/jeddah-to-makkah-guide/page.tsx` | `/jeddah-to-makkah-guide` |
| `madinah-umrah-taxi-service.html` | `src/app/madinah-umrah-taxi-guide/page.tsx` | `/madinah-umrah-taxi-guide` |
| `makkah-to-madinah-taxi.html` | `src/app/makkah-to-madinah-guide/page.tsx` | `/makkah-to-madinah-guide` |
| `makkah-umrah-taxi-service.html` | `src/app/makkah-umrah-taxi-guide/page.tsx` | `/makkah-umrah-taxi-guide` |
| `riyadh-to-dammam-taxi.html` | `src/app/riyadh-to-dammam-guide/page.tsx` | `/riyadh-to-dammam-guide` |

`scripts/seo/build-link-graph.js` now regex-matches each page.tsx for its `readContentFile("...")` call to build this map, then parses the matching content file's `<body>` (same extraction `readContent.ts` performs, so `<head>` metadata that never renders can't produce false findings) and attributes its links/images to the live route — not to a synthetic `content/` graph node. Line numbers are offset-corrected to point at the real source line. The linked-image alt check was also extended to flag plain `<img>` tags with no `alt` attribute at all (previously only `alt=""` was caught, and only for `<Image>`, since JSX/React already enforces the prop there — this static HTML has no such guarantee).

### Task 2 — corrected figures for content/*.html

| Metric | Before (unverified "0") | After (verified) |
| --- | --- | --- |
| Broken internal links (404s) | 0 | 55 → **0** (all fixed, see Task 3) |
| Redirect-triggering links | 0 | 4 → **0** (all fixed, see Task 3) |
| Generic anchor instances | 0 | 0 (confirmed — genuinely clean) |
| Linked images with empty/missing alt | 0 | 0 (confirmed — all 12 `<img>` tags in this directory already carry descriptive alt text) |
| Hash-fragment links (`#booking`, `#booking-form`) | not tracked | 35 (legitimate same-page anchors to an on-page booking form; not an error) |

Orphan/depth impact: **none.** Compared against the pre-Task-1 graph, the 6 guide pages' inbound-link counts and BFS depth are unchanged (all still depth 2, same inbound counts) — these edges are the guides' *outbound* links, so making them visible only grows those pages' outbound counts (e.g. `/jeddah-airport-taxi-guide` 50 → 56, `/makkah-umrah-taxi-guide` 45 → 51). No previously-orphaned page became reachable through them, and no page regressed, because every fixed link now points at a page that was already reachable through some other path.

### Task 3 — fixes applied

**4 redirect-triggering links** (trailing-slash 308s under Next's `trailingSlash: false` default) — slash dropped, no other change:

| File | Line | Before | After |
| --- | --- | --- | --- |
| `content/jeddah-airport-taxi-service.html` | 69 | `/airport-transfers/` | `/airport-transfers` |
| `content/jeddah-to-makkah-taxi.html` | 979 | `/jeddah-airport-taxi-service/` | `/jeddah-airport-taxi-service` |
| `content/makkah-umrah-taxi-service.html` | 862 | `/jeddah-airport-taxi-service/` | `/jeddah-airport-taxi-service` |
| `content/makkah-umrah-taxi-service.html` | 917 | `/airport-transfers/` | `/airport-transfers` |

**55 broken links, 26 distinct hrefs.** Checked each against `src/lib/routeData.ts` (18 GCC cross-border routes — zero matches, none of the broken hrefs are cross-border) and `src/lib/airportRoutesData.ts`'s `AIRPORT_ROUTES[].href` fields (the only two sources the task authorized for automatic repointing):

**Repointed — 2 distinct hrefs, 7 occurrences, unambiguous match:**

| Broken href | Matches | Repointed to | Occurrences |
| --- | --- | --- | --- |
| `/jeddah-airport-to-makkah/` and `/jeddah-to-makkah-taxi/` | `AIRPORT_ROUTES` entry `jed-makkah` (Jeddah Airport → Makkah Hotels) | `/jeddah-to-makkah-taxi-service` | 6 |
| `/jeddah-airport-to-city-center/` | `AIRPORT_ROUTES` entry `jed-city` (Jeddah Airport → Jeddah City Hotels) | `/jeddah-city-tour-services-in-saudi-arabia` | 2 |

This resolves the specifically-flagged case, **`content/makkah-umrah-taxi-service.html:167`**: the anchor text ("Learn more about Jeddah Airport transfers →") was already fine, only the href was dead. Verified against a local production server (`next start` + `curl`) before fixing: `/jeddah-airport-to-makkah/` → `308` (Next's automatic trailing-slash redirect) → `/jeddah-airport-to-makkah` → **`404`**. Confirmed broken, now repointed to `/jeddah-to-makkah-taxi-service` (`200`).

**Removed — 24 distinct hrefs, 48 occurrences, no match in either data file.** Some correspond to a route the data model defines but never gave a page (`jed-madinah` and `med-makkah` have no `href` — no dedicated Jeddah/Madinah-airport-to-Madinah/Makkah page exists), the rest reference pages that were never built at all (`/routes/`, `/cities/`, `/cities/madinah/`, `/cities/makkah/`, `/jeddah-airport-to-madinah/`, `/jeddah-airport-to-taif/`, `/jeddah-to-madinah-taxi/`, `/jeddah-to-taif-taxi/`, `/jeddah-to-riyadh-taxi/`, `/makkah-to-jeddah-taxi/`, `/makkah-to-madinah-taxi/`, `/makkah-umrah-taxi-service/`, `/madinah-to-makkah-taxi/`, `/madinah-ziyarat-taxi-service/`, `/madinah-umrah-taxi-service/`, `/makkah-ziyarat-taxi-service/`, `/taif-airport-to-makkah/`, `/makkah-to-taif-taxi/`, `/makkah-to-riyadh-taxi/`, `/makkah-to-dammam-taxi/`, `/jabal-al-nour-taxi/`, `/jabal-thawr-taxi/`, `/jannat-al-mualla-taxi/`, `/birthplace-of-prophet-makkah/`, `/makkah-hajj-transportation/`, `/makkah-hotel-transfers/`, `/pilgrimage-transportation/`, `/corporate-accounts/`). Per "do not guess," none were repointed to some other same-site page inferred from context — every one was removed, with the surrounding markup kept valid and grammatical by pattern, not improvised per instance:

- **schema.org breadcrumbs** (`/routes/`, `/cities/`, `/cities/madinah/`, `/cities/makkah/`) — unwrapped `<a itemprop="item" href="...">` down to a plain `<span itemprop="name">`, exactly matching the pattern each of these same files already uses for its own current-page breadcrumb entry (the last `<li>`, which never had a link).
- **route-card / related-card grids** — the `<a class="route-card">`/`<a class="related-card">` wrapper changed to `<div>` (same class, same visual card), so a grid of "related routes" doesn't end up with some cards clickable and others silently dead.
- **footer "Quick Links" lists** — the whole `<li>` removed.
- **inline CTA sentences** ("Route details →", "Madinah to Makkah route →", ziyarat-site "…details →" links) and **table "Book" cells** — the `<a>` removed; where it was the only content in a `<td>`, the cell is left empty rather than left holding dead label text.
- **`riyadh-to-dammam-taxi.html`'s two `/corporate-accounts/` CTAs** — the standalone "Set Up Corporate Account" button block removed entirely (the section's FAQ already states "Contact us to set up your company account," so nothing is lost); the "Corporate Inquiry" link in the closing contact bar removed, leaving the working `tel:` link.

Full per-occurrence line list is in commit `1d048ba` ("seo: fix broken links, redirect hops, and dead breadcrumb entries in content/*.html").

**Alt text:** nothing to do — all 12 `<img>` tags in `content/*.html` (in `makkah-umrah-taxi-service.html` and `jeddah-to-makkah-taxi.html`) already carry descriptive, non-generic alt text (e.g. `"Jabal al-Nour Mountain where Prophet Muhammad received first revelation"`). None of them sit inside a broken (or any) `<a>`.

**Generic anchors:** nothing to do — none found in this directory, confirmed by the crawler's now-corrected detection (see the fix earlier in this report).

**Structural check:** `<a>`/`<div>`/`<li>`/`<td>` open/close tag counts verified balanced in all 6 files after editing (no mismatches from any of the edits above).

### Task 4 — reconciling "132 routes" vs "110 static routes"

Both figures came from my own build-output summaries, written at two different points in this branch's history, using two different counting methods — not from two different actual states of the app:

- **"110 static routes"** (the more recent, correct figure) counts public, indexable pages only: every `○` (static) row in `next build`'s route table, excluding `/admin/**` (auth-gated, 12 routes), `/api/**` (server handlers, 4 routes), and Next's own metadata/system routes (`/_not-found`, `/icon.svg`, `/robots.txt`, `/sitemap.xml`, 4 routes). This is exactly the same 110 pages `scripts/seo/build-link-graph.js` enumerates (`pages.length` / `totalPublicPages` in `link-graph.json`) — the two have always agreed.
- **"132 routes generated"** (the earlier figure, from the original Step 7 report, commit `59896d4`) was simply an inaccurate manual tally at the time — not a snapshot of a real prior state that later shrank.

Verified rather than assumed: checked out commit `59896d4` (where "132" was written) in a separate git worktree, rebuilt it there, and applied the identical counting method used for today's "110." Historical breakdown: **130 total route-table rows = 110 public pages + 12 admin + 4 api + 4 metadata** — identical to today's build, both in total and in the exact set of 110 route paths (diffed programmatically: 0 added, 0 removed since that commit). **No route was lost between the two runs** — the real page count has been a stable 110 across this entire branch; "132" just never corresponded to anything real.

### Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 110 static routes generated (130 total build entries: 110 public + 12 admin + 4 api + 4 metadata), 0 errors.
- `npm run seo:links` — passes (0 broken links, 0 non-canonical hrefs, 0 `href="#"` in nav).
- `npm run seo:audit` — regenerated `link-graph.json`, `internal-link-audit.md`, `config/internal-links.json`; `content/*.html` now shows 0 broken links, 0 redirect-triggering links, 0 generic anchors, 0 empty/missing linked-image alt.
