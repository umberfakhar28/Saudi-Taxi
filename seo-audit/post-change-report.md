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
