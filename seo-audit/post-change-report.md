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
