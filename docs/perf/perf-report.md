# Performance, tracking and traffic: Phase 1 diagnosis

Branch `perf-nov`, 16 Nov 2026. **No code was changed in this phase.**
Evidence comes from:
- a production build of `main` @ `0a538d5`;
- the source code;
- read-only probes of the live site;
- two Playwright measurements on the live site, with GA hits blocked or intercepted (but see §1.6.4).

Phase 2–7 changes wait for the owner's approval (Checkpoint 1, at the end).

---

## 0. Summary: why Vercel usage is so high

| # | Cause | Evidence | Share of the problem |
|---|---|---|---|
| **1** | **The proxy (middleware) runs on almost every request**, including every hidden link prefetch, and creates a Supabase auth client each time. | `src/proxy.ts`: the matcher excludes only `_next/static`, `_next/image`, favicon, sitemap, robots and image files. Live 404s still get its `Set-Cookie`. | **Most Function Invocations and most Active CPU.** Public pages are already static, so the proxy is the only server code a public visit runs. |
| **2** | **One page view prefetches 15–83 other pages.** | Live measurement in §1.3.2. The homepage on desktop makes **359 requests** to Vercel, **296** of them RSC prefetches of **73 pages**: every link in the header drop-down menus. The menus are hidden with `opacity:0; visibility:hidden`, which still counts as "in view" for prefetching. | Most CDN Requests and ISR Reads. Combined with #1, it multiplies the invocations: about 300 proxy runs per desktop page view. |
| 3 | Unknown `/destinations/*` and `/hotels/*/*` URLs are rendered on the server. | Live probe: `/destinations/zz-probe-1` returns `404`, `X-Vercel-Cache: MISS`, `x-matched-path: /destinations/[slug]`. | Small, but every bot guessing slugs costs a render. |
| 4 | GA4 loads on `/admin` and on `localhost`. | Root layout mounts `<GoogleAnalytics/>` for every route. Every admin page's `<title>` is the homepage title, which is why a GA search for "admin" finds nothing. `.env.local` sets the ID to `""`, so local runs fall back to the live ID. | Data quality only, not cost. |

**This answers the "14K requests a day, so it must be bots" theory.** GA4 shows about 80 human page views a day. GA4 undercounts people: ad blockers, EU visitors who haven't consented, people who leave before the tag loads. Each real page view costs Vercel 88–359 requests (§1.3.2). So 80 page views × ~150–200 requests ≈ **12K–16K requests a day**, which is the whole firewall figure. **Most Vercel traffic is real visitors' browsers prefetching pages, not bots.**

Bots exist (§1.7), but blocking them would barely move the usage numbers. Fixing #1 and #2 would.

**Expected effect of the proposed fixes:**
- **Function Invocations: about −90%.** The proxy would stop running on public pages.
- **Active CPU: well over −70%.**
- **CDN requests and ISR reads: −70–85%.**
- Content, design, URLs, canonicals, hreflang and schema: unchanged.

These are estimates from the measurements below. The per-function CPU split can only be confirmed in the Vercel dashboard: see "Data needed" at the end.

---

## 1.1 Rendering audit

`next build` (Next 16.1.6, Turbopack) result: **every public route is `○` static or `●` SSG.** None is `ƒ` dynamic. The full table is in Appendix A.

| Group | Mode |
|---|---|
| `/`, `/book-online`, every route, city (`/services/*`), airport, distance, guide, blog, hotel-transfer page, `/ar` + all 11 `/ar/*` pages | `○` static |
| `/destinations/[slug]` (20 paths), `/hotels/[city]/[hotel]` (1 path) | `●` SSG via `generateStaticParams` |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/icon.svg` | `○` static |
| `/admin/*` | `○` (client-rendered shells), **except** `ƒ /admin/dashboard` (server Supabase query, `searchParams`), `ƒ /admin/invoices/[id]`, `ƒ /admin/settings` (`force-dynamic`) |
| `/api/*` (19 routes) | `ƒ`, as expected |
| Proxy (middleware) | `ƒ`: runs on every matched request (see 1.2) |

- **No public route has a dynamic cause.** There are no `cookies()`, `headers()`, `draftMode`, `no-store` or `force-dynamic` calls outside admin and API. The only `cookies()` caller is `utils/supabase/server.ts`, used by the admin dashboard and `requireAdmin` only.
- **No public page reads the database at build or request time.** The booking form reads Supabase from the browser.
- **ISR `revalidate` values: none anywhere.** Nothing to flag under 3600s.
- **`/book-online` already does what Phase 2 asks:** the page is static and `BookOnlineClient` reads `?from=&to=&mode=` with `useSearchParams` inside `<Suspense>`.
- **Problem: `dynamicParams` is left at its default (`true`)** on `/destinations/[slug]` and `/hotels/[city]/[hotel]`. Any unknown slug is rendered on demand (confirmed live, `MISS`).

> **Recommendation that differs from the brief:** don't add `revalidate = 86400` or on-demand revalidation to public pages. Fully static is already the cheapest mode: no regeneration ever runs. ISR would *add* background re-renders, and since no public page shows database content, there's nothing for the admin to revalidate. The Phase 2 fix list is therefore short (§2).

## 1.2 Middleware (proxy) audit

The file is `src/proxy.ts` (Next 16's name for `middleware.ts`; Node.js runtime).

**What it does on every matched request:**
1. Builds a Supabase server client and calls `supabase.auth.getUser()`.
   - With no session cookie (all public visitors) this returns without a network call, but it still runs client setup on every request.
   - With the admin's session cookie it **calls Supabase Auth over the network on every request.**
2. **For `/admin/*`:** the owner/role check. Non-owner staff need an extra `admin_users` query.
3. **"Markdown for agents":** if `Accept: text/markdown`, it **fetches the same URL again** (a second invocation) and converts the HTML to Markdown with regexes.
4. Sets the `gts_region` cookie (EU or other, from `x-vercel-ip-country`), used by the cookie banner (`lib/consent`). The cookie is written only when it's missing or has changed.

**The matcher:** `/admin/:path*` plus everything except `_next/static`, `_next/image`, `favicon.ico`, `sitemap.xml`, `robots.txt` and `*.svg|png|jpg|jpeg|gif|webp`.

| Request type | Runs the proxy? |
|---|---|
| `_next/static/*`, `_next/image` | no |
| Images in `/public` (svg/png/jpg/gif/webp) | no |
| `favicon.ico`, `sitemap.xml`, `robots.txt` | no |
| **Every public page (HTML)** | **yes** |
| **Every RSC prefetch/navigation (`?_rsc=`)** | **yes**: ~300 per desktop page view |
| **`/api/*`** | **yes**, though no API route relies on it: admin APIs check auth themselves (`requireAdmin`) |
| `/manifest.webmanifest`, `/llms.txt`, `.mp4` videos, `.ico`/`.xml`/`.xsl`/`.txt` files, fonts in `/public/fonts` | **yes** |
| Bot 404s (`/.env`, unknown paths) | **yes**: the `Set-Cookie` header is visible on the live 404 |

- **No geo lookups or DB calls on public requests**, apart from the auth client setup.
- **The heaviest public-request work is the Markdown branch** (two invocations and regex conversion).

## 1.3 Admin request audit

### 1.3.1 What an admin tab does

- **No polling.** There are no `setInterval`, `refreshInterval`, `router.refresh` loops, SWR or React Query anywhere in admin.
  - The only `setInterval`s in `src/` are three public carousels (announcement bar, hero slider, testimonials). They animate on the client and make no requests.
- **Admin data never goes through Vercel.** Pages use the browser Supabase client and talk directly to Supabase.
- **Notifications** use one Supabase Realtime websocket (to Supabase, not Vercel). It re-subscribes after 3s only when the channel errors.
- **Requests to Vercel when an admin page opens:**
  - the page or RSC request plus `/api/admin/me` (each runs the proxy, which calls Supabase Auth);
  - **prefetches of the ~12 sidebar links and any `<Link>` in view**: the dashboard has 8 links and the invoice list 3. Each prefetch also runs the proxy and its Supabase Auth call.
- **Idle tab: 0 requests a minute to Vercel**, based on reading the code; there are no timers.
  - This should be measured in DevTools on a signed-in tab in Phase 3. I didn't sign in to the live admin.
- **Other admin request patterns:**
  - `/admin/dashboard` is server-rendered, so every filter change (`router.push`) is a server render with several Supabase queries.
  - Customer search writes `?q=` to the URL 300 ms after typing stops. That's one RSC request per search.

### 1.3.2 Live measurement: requests to Vercel per page view

Method:
- Headless Chromium, fresh profile, GA blocked.
- Load the page, then scroll to the bottom like a reader would.
- Count every request to gulftripservice.com.

| Page | Device | Total requests | RSC prefetches (pages) | `_next/static` | `_next/image` |
|---|---|---|---|---|---|
| `/` | desktop | **359** | **296 (73 pages)** | 38 | 23 |
| `/airport-transfers` | desktop | **342** | **302 (83 pages)** | 37 | 1 |
| `/ar` | desktop | 88 | 60 (15 pages) | 27 | 0 |
| `/` | mobile | 216 (58 at load) | 159 (45 pages) | 34 | 22 |
| `/airport-transfers` | mobile | 147 | 115 (39 pages) | 30 | 1 |
| `/ar` | mobile | 88 | 60 (15 pages) | 27 | 0 |

**Why so many prefetches:**
- Next.js prefetches every `<Link>` that is in the viewport.
- The desktop header drop-downs are always in the DOM and hidden with `opacity:0; visibility:hidden`, which the browser still reports as visible. So all the menu links (73 pages) prefetch the moment any page loads.
- Footer links prefetch when the reader reaches the footer.
- Next 16 prefetches per segment, so one page is about 4 requests.

This also explains the **Top paths** list:
- `/book-online` (621) and `/` (620) are linked from every page's header.
- `/riyadh-alternative-airports` is in the announcement bar.
- `/contact-us`, `/airport-transfers` and `/border-crossing` are in the menus.

The counts are mostly prefetches, not visits.

### 1.3.3 The owner's ~3,100 requests in one hour

- At ~350 requests per desktop page view, **3,100 requests is about 9–10 public page views**, for example the owner checking the live site between admin tasks. The admin itself adds only tens of requests.
- This was normal use made expensive by #1 and #2, not a runaway loop.
- My verification runs on 15 Nov also hit the live site from this PC, which may be the same IP. That was ~180 HTML-only fetches with no prefetches, a small share.

## 1.4 Heavy server work

| Item | Finding |
|---|---|
| PDF/PNG invoices | **No Puppeteer or Chromium.** Built **in the browser** (canvas + `pdf-lib`, `lib/invoicePng.ts`) on download or email. **Zero server CPU.** The email attachment is created in the browser and posted to `/api/emails/send`. |
| Emails | Resend API calls from `/api/emails/send`, `/api/bookings/create`, `/api/contact/create`, the cron job and the inbound webhook. Light. |
| Sitemap | `app/sitemap.xml/route.ts`, built once at build time (`○`). |
| Image optimisation | 566 / 5K transformations, fine. But **131 MB of PNG originals** in `/public` (71 files, many 2–4 MB) go out with every deployment (§1.5). |
| DB | No public-page DB reads. Admin dashboard: several queries per render. No N+1 patterns seen in public code. |
| Markdown negotiation | Two invocations + regex conversion per `Accept: text/markdown` request (confirmed live: `X-Markdown-Tokens: 917`). |
| Cron | `/api/cron/trip-reminders` once a day. Negligible. |

## 1.5 Deploy impact

- **Commits on `main`, last 30 days: 70, over 12 days** (19 on 14 Nov alone).
  - Four feature branches were also pushed to GitHub, and each push makes a preview deployment.
  - The exact deployment count is in Vercel → Deployments. I have no Vercel CLI login here.
- **Runtime cost of a deploy: low.**
  - Every public page is prerendered **at build time**, so a deploy doesn't trigger runtime regeneration.
  - Build minutes are not Active CPU.
  - After a deploy the CDN cache is cold, so the first hit on each page is an ISR read.
- **Storage cost: high.**
  - Each deployment keeps its own copy of the build output: `.next/server` is about 132 MB (203 HTML pages + 1,526 RSC files).
  - It also keeps the static files: `/public` is about 150 MB, of which 131 MB is PNG.
  - At ~280 MB per deployment, 5.86 GB is about 20 retained deployments.
- **Storage fix:**
  1. Delete old deployments (Phase 4; commands provided, run only with approval).
  2. Slim `/public`: about **43 of the 71 PNGs don't appear by filename anywhere in `src/` or `content/`**. This is a first pass and must be confirmed file by file before anything is removed.
  3. Deploy less often (Phase 4 workflow).

## 1.6 GA4 tracking audit

*(Revised after the owner's correction: the 928K views / 1.2M key events were another property. Real figures: 241 users, 564 views, 1.5K events, 0 key events in 7 days.)*

### 1.6.1 Installations

- **Exactly one GA4 tag: Measurement ID `G-TQZY85DG7H`.**
  - Loader: `lib/consent.ts` → `loadGoogleAnalytics()`, called from `components/GoogleAnalytics.tsx` in the root layout. It's guarded so it loads once per page.
  - It's hard-coded as the fallback; `NEXT_PUBLIC_GA_MEASUREMENT_ID` overrides it when set.
- **Confirmed on the live site:** every captured hit had `tid=G-TQZY85DG7H`.
  - **The owner must confirm** this ID is the stream of the correct property: GA4 Admin → Data streams → Web → Measurement ID.
- **None of these exist:** GTM container, `@next/third-parties`, Vercel Analytics or Speed Insights, a second ID, or a tag in a page or the `/ar` layout.
  - `/ar` is under the same root layout, so it gets the same single tag.
- **Consent gate:** EU/EEA, UK and CH visitors get no GA until they accept. Everyone else loads it immediately. This is one reason GA counts fewer people than Vercel sees.

### 1.6.2 page_view behaviour (live)

- The first load sends **one** `page_view` (from `gtag('config')`).
- In-site link clicks (client-side navigation) each send one `page_view` a few seconds later, through GA's enhanced measurement "browser history events".
- The code sends no manual page_views, so nothing double-counts.
- React StrictMode double effects happen only in development.
- The loader's `loaded` flag stops a second load.
- Phase 5 will re-check this in DebugView.

### 1.6.3 Problems found

1. **GA4 loads on `/admin`.**
   - The root layout mounts it for every route.
   - Admin pages have no title of their own, so they report the homepage title. That's why a GA search for "admin" shows nothing.
   - The owner's admin use is in the data as homepage-titled views.
2. **GA4 loads on `localhost`.** `.env.local` has `NEXT_PUBLIC_GA_MEASUREMENT_ID=""`, and the empty string falls back to the live ID. Every local `npm run dev` session and local test run sends data to the live property.
3. **No key events:** none of the custom events are marked as key events in the GA UI. The events themselves fire (below).

### 1.6.4 Custom events in the code (all go through `gaEvent()` in `lib/analytics.ts`)

| Event | Where / trigger | Parameters | Status |
|---|---|---|---|
| `whatsapp_click` | One capture-phase click listener (`components/WhatsAppTracking.tsx`) on any `wa.me` / `api.whatsapp.com` link; never on `/admin` | `cta_source` (data-wa-cta: hero, footer-contact, floating-button…), `cta_location` (navbar/footer/floating/in_page/sticky_mobile/other), `page_template`, `page_path`, `page_location`, `link_url` (no message text), `site_language` | **Fires on live.** Captured: `cta_source=hero cta_location=in_page page_template=route-landing site_language=en`. |
| `booking_form_submit` | `BookOnlineClient` (EN and AR `/book-online`), **after `/api/bookings/create` returns OK** | `form_type=booking`, `page_path`, `page_language`, `page_template`, `form_detail` (service type) | In the code, fires only on server success. **This is the "event on booking request" the owner remembers.** Not live-tested: that needs a real booking. |
| `contact_form_submit` | `/contact-us` and `/ar/contact-us`, after the record is saved | same | Code checked. |
| `destination_enquiry_submit` | `DestinationEnquiryForm` on `/destinations/*`, after `/api/bookings/create` OK | same, `form_detail` = destination | Code checked. |
| `phone_click` | Same listener, `tel:` links | — | **Dead.** No `tel:` links have existed since 15 Nov. Remove it. |
| (GA automatic) `scroll`, `click` (outbound) | Enhanced measurement | — | Seen live. The WhatsApp click *also* sends GA's own outbound `click`. |

**Missing (the brief's spec):**
- `generate_lead`
- `email_click`: confirmed live that a footer `mailto:` click sends nothing.
- `form_start`
- `whatsapp_click` parameter names: `button_location`, `route`, `vehicle`

**No event fires on load, render or scroll, or in a loop.**

> **Test-data note:** while checking this on the live site today, my interceptor didn't catch GA's keep-alive requests. About **4 test `whatsapp_click` events** (plus GA's automatic outbound `click`) from Pakistan reached the property around 08:30–09:00 UTC on 16 Nov:
> - page: `/riyadh-to-bahrain-taxi-service`
> - `cta_source`: hero
>
> The final navigation test blocked GA at the DNS level and sent nothing.

### 1.6.5 GA4 UI checklist for the owner (I have no GA access)

1. Admin → Data streams → Web: confirm the Measurement ID is **G-TQZY85DG7H** for gulftripservice.com.
2. Once the new events appear in Admin → Events (up to 24 h after the first real hits), **mark `generate_lead` and `whatsapp_click` as Key events.** `email_click` is optional.
   - `whatsapp_click` is already there and can be marked now.
3. Admin → Events: check for "Create event" or "Modify event" rules that duplicate events, and remove them.
4. Data streams → Web → Enhanced measurement:
   - keep Page views **with** "Page changes based on browser history events" ON, because the code sends no manual page_views;
   - turn **Form interactions OFF** once our `form_start` and `generate_lead` exist.
5. Data streams → Configure tag settings → **Define internal traffic**: add the owner's and team's IPs. Then Admin → Data filters → set "Internal Traffic" to **Active**.
   - Mobile IPs change, so the code fix (no GA on `/admin` or localhost) is the main measure.
6. List unwanted referrals only if self-referrals show up (e.g. `wa.me`, payment pages).

## 1.7 Bot and traffic analysis

**Access limits:**
- I have **no access to Vercel logs or the Firewall**: there's no Vercel CLI login or API token in this environment.
- The top-30 user agents and ASNs table therefore needs a Firewall export or screenshots from the owner (see "Data needed").

From the owner's figures:

| Source | ~req/day | Class | Action |
|---|---|---|---|
| Real visitors' browsers (GA ≈ 80+ page views/day × 88–359 requests each) | **~10–16K** | Real users | Fix prefetching (F2) |
| Facebook Inc | ~2.1K | Social preview (`facebookexternalhit`, WhatsApp link previews) | **Keep, never block** |
| Tencent | ~862 | Probably a scraper or crawler (Tencent Cloud). Must be checked by user agent before any action. | Phase 6 Step B |
| AWS / US unknown IPs | ? | Unknown: often SEO tools, uptime checkers or scrapers | Phase 6 Step B |
| Googlebot | ~25 (Search Console) | Verified good bot | Never block |
| Saudi Telecom, Bahrain, Qatar ISPs | — | Real customers | — |

**Observations:**
- **A bot costs far less than a human.** A crawler fetching HTML makes ~1 request (1 proxy run). A real desktop visitor makes ~350.
  - Bot blocking is worth doing (Phase 6) for cleanliness and abuse, but it isn't the cost fix.
- **GA's 53 US users (+96%):**
  - GA only counts browsers that run JavaScript, so these are real people or headless browsers.
  - To check in GA4 Explore → Free form, use these dimensions: **City** and **Browser + Screen resolution**, plus the **Engagement time** metric.
  - Data-centre cities point to cloud bots: Ashburn, Boardman, Council Bluffs, Des Moines, Columbus, San Jose, Santa Clara.
  - So do round resolutions such as 800×600 or 1280×720, and ~0 s engagement.
  - GA can't show ASNs; the Vercel Firewall can (filter Country = US).
- **What Vercel already handles:** `/wp-login.php` already returns `403` (Vercel's default protection).
- **What Vercel doesn't handle:** probes like `/.env` still return a 404 *through the proxy*, so they count as invocations. F1 fixes that.

---

## Proposed fix list (Checkpoint 1)

Every item below leaves content, design, URLs, canonicals, hreflang, schema and booking behaviour unchanged. One commit per fix, with before/after measurement.

| ID | Phase | Fix | Expected effect |
|---|---|---|---|
| **F1** | 3 (do first) | **Proxy matcher**: run only on `/admin/:path*` and on `Accept: text/markdown` requests (matcher `has` header condition). Public pages, RSC prefetches, `/api`, media and 404s skip it. The region cookie moves out of the proxy; owner chooses **A** or **B** below. | **Invocations about −90%, most of Active CPU** |
| **F2** | 2 | **Prefetch**: `prefetch={false}` on the header drop-down links (EN/AR), footer link lists, and large in-page link grids. Keep prefetch on the main CTAs (Home, Book Now). Visually nothing changes; those links take ~0.1–0.3 s longer to open on click. | **CDN requests and ISR reads about −70–85%**; fewer invocations even before F1 |
| F3 | 2 | `dynamicParams = false` on `/destinations/[slug]` and `/hotels/[city]/[hotel]`: unknown slugs get the static 404. | Removes on-demand renders from guessed URLs |
| F4 | 2 | `images.minimumCacheTTL = 2678400` (31 days). Long `Cache-Control` for `/fonts/*`; 7 days for `/public` images (not `immutable`: they aren't content-hashed, so a replaced image would stay stale for a year). `maxDuration = 15` for normal API routes (the inbound webhook keeps 60). | Fewer image re-optimisations; a cap on runaway functions |
| F5 | 3 | Admin: `prefetch={false}` on the sidebar and table links; the dashboard filter uses `replace`. Admin pages get their own title + `noindex` (`robots.txt` already disallows `/admin/` and `/api/`). | Admin ≤ 2 requests/min idle (already ~0); far fewer proxy auth calls |
| F6 | 5 | GA: don't load on `/admin` or on any host other than gulftripservice.com (fixes localhost). | Clean data |
| F7 | 5 | Events per the brief, through `lib/analytics.ts`, with a mapping table and once-only guards:<br>• `generate_lead` replaces `booking_form_submit` and `destination_enquiry_submit`. Contact-form submits also become `generate_lead` with `form_location=contact`, unless the owner wants those kept separate.<br>• `whatsapp_click` gets `button_location`, `route`, `vehicle`, `page_path`.<br>• New: `email_click`, `form_start`.<br>• `phone_click` removed. | Lead tracking that can be marked as Key events |
| F8 | 4 | `vercel.json` `ignoreCommand` (production from `main` only; previews only for `preview/*`; docs-only commits skip the build) + `DEPLOY.md` + a list of old deployments to delete (commands only, not run). | Storage, build count |
| F9 | 4 | `/public` diet: remove PNGs confirmed unused. Convert the remaining PNG originals to WebP at visually lossless quality, *only with approval* (it touches image files). | Deployment storage −100 MB or more each |
| F10 | 6 | Bot management as in the brief: LOG mode 24–48 h → report → per-rule approval. | Cleaner traffic; small cost effect |

**Brief items I recommend dropping (already done, or would make things worse):**
- ISR `revalidate 86400` + on-demand revalidation: pages are already fully static (§1.1).
- Moving `/book-online` params to the client: already done.
- Replacing Puppeteer: it isn't used.
- Moving auth out of the shared layout: there is no server auth read in any shared layout. The only one is the proxy, handled by F1.

### Decisions needed from the owner

1. **Approve the fix list** (or strike items).
2. **Region cookie after F1.** The EU check for the cookie banner needs the visitor's country. Options:
   - **A: browser time zone.** The banner asks when the device's time zone is in Europe/EEA/UK/CH. **Zero server cost.** A traveller abroad or a VPN user can get the "wrong" answer either way.
   - **B: one tiny `/api/region` call, only when the cookie is missing** (once per new visitor per year). The same accuracy as today, at about 1 invocation per new visitor (~100–300 a day). **Recommended**, because the consent decision stays exactly as accurate as now.
3. **Contact-form submits:** count them as `generate_lead` (recommended, with `form_location=contact`) or keep a separate event?

### Data needed from the owner (to finish §1.5, §1.7 and confirm the CPU split)

1. Vercel → **Observability**: Active CPU and invocations by function/route for the last 7 days. Middleware (Proxy) is expected to dominate.
2. Vercel → **Deployments**: how many in the last 30 days, production vs preview.
3. Vercel → **Firewall**: top user agents, ASNs and paths for 24 h (screenshot or export), especially US and Tencent.
4. GA4: the Measurement ID check (§1.6.5 #1) and the City/Browser breakdown for US users (§1.7).

---

## Appendix A: `next build` route table (main @ 0a538d5)

```
○ / · /_not-found · /abha-airport-taxi-service · /about-us · /abu-dhabi-to-dammam-taxi-service
○ /admin · /admin/automation · /admin/bookings · /admin/calendar · /admin/customers
ƒ /admin/dashboard
○ /admin/emails · /admin/fleet · /admin/invoices
ƒ /admin/invoices/[id]
○ /admin/login · /admin/quotes · /admin/quotes/new · /admin/reports
ƒ /admin/settings
○ /admin/users · /airport-transfer-for-umrah · /airport-transfers · /alula-airport-taxi-service
ƒ /api/admin/audit-log · /api/admin/customers/[id] · /api/admin/invoices/[id] · /api/admin/me
ƒ /api/admin/quotes/[id] · /api/admin/users · /api/admin/users/[id] · /api/antispam/verify
ƒ /api/auth/callback · /api/bookings/create · /api/contact/create · /api/cron/trip-reminders
ƒ /api/customers/upsert · /api/emails/inbound · /api/emails/send · /api/health · /api/indexnow
ƒ /api/push/subscribe · /api/push/unsubscribe
○ /ar · /ar/bahrain-to-dammam-taxi-service · /ar/book-online · /ar/border-crossing · /ar/contact-us
○ /ar/dammam-airport-to-bahrain-taxi-service · /ar/dammam-airport-to-qatar-taxi-service
○ /ar/qatar-to-riyadh-taxi-service · /ar/riyadh-to-bahrain-taxi-service · /ar/riyadh-to-kuwait-taxi-service
○ /ar/riyadh-to-qatar-taxi-service
○ /bahrain-to-dammam-taxi-service · /bahrain-to-jubail-taxi-service · /bahrain-to-riyadh-taxi-service
○ /blog + 13 posts · /book-online · /border-crossing · /cart · /checkout · /contact · /contact-us
○ /corporate-transportation-services · /dammam-airport-taxi-service · /dammam-airport-to-bahrain-taxi-service
○ /dammam-airport-to-khafji-taxi-service · /dammam-airport-to-qatar-taxi-service
○ /dammam-airport-to-riyadh-taxi-service · /dammam-to-abu-dhabi-taxi-service · /dammam-to-dubai-taxi-service
○ /dammam-to-kuwait-taxi-service · /dammam-to-riyadh-taxi-service · /destinations
● /destinations/[slug] (20 paths)
○ /distance + 20 distance pages · /dubai-to-dammam-taxi-service · /dubai-to-riyadh-taxi-service
○ /educational-tours-transport · /faqs · /fleet · /guides/* (12) · /hotel-transfers
● /hotels/[city]/[hotel] (1 path)
○ /icon.svg · /jeddah-airport-taxi-guide · /jeddah-airport-taxi-service · /jeddah-airport-to-madinah-taxi-service
○ /jeddah-city-tour-services-in-saudi-arabia · /jeddah-to-makkah-guide · /jeddah-to-makkah-taxi-service
○ /khafji-to-dammam-airport-taxi-service · /khafji-to-kuwait-taxi-service · /kuwait-to-dammam-taxi-service
○ /kuwait-to-khafji-taxi-service · /kuwait-to-riyadh-taxi-service · /locations · /madina-airport-taxi-service
○ /madinah-to-jeddah-airport-taxi-service · /madinah-to-makkah-taxi-service · /madinah-umrah-taxi-guide
○ /makkah-to-jeddah-taxi-service · /makkah-to-madinah-guide · /makkah-to-madinah-taxi-service
○ /makkah-to-riyadh-taxi-service · /makkah-umrah-taxi-guide · /manifest.webmanifest · /my-account
○ /our-gallery · /our-services · /pay-online · /prices · /privacy-policy · /private-taxi
○ /qatar-to-dammam-taxi-service · /qatar-to-riyadh-taxi-service · /reliable-alula-tour-taxi-service-in-saudi-arabia
○ /riyadh-airport-taxi-service · /riyadh-alternative-airports · /riyadh-to-bahrain-taxi-service
○ /riyadh-to-dammam-airport-taxi-service · /riyadh-to-dammam-guide · /riyadh-to-dubai-taxi-service
○ /riyadh-to-kuwait-taxi-service · /riyadh-to-makkah-taxi-service · /riyadh-to-qatar-taxi-service
○ /robots.txt · /routes · /saudi-arabia-to-bahrain-taxi-service · /saudi-arabia-to-jordan-land-transfer
○ /saudi-arabia-to-qatar-taxi-service · /saudi-arabia-to-uae-taxi-service · /school-buses-services · /services
○ /services/* (17 cities) · /site-map · /sitemap.xml · /tabuk-airport-taxi-service · /taif-airport-taxi-service
○ /taif-ziyarat-taxi-service · /terms-conditions · /testimonials · /thank-you · /umrah-taxi-services
○ /umrah-transport-package · /wedding-transportation · /yanbu-airport-taxi-service · /ziyarat-services-in-saudi-arabia
ƒ Proxy (Middleware)
```

223 pages generated at build. Legend: `○` static, `●` SSG, `ƒ` server-rendered on demand.
