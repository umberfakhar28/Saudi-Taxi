/**
 * Responsive sweep: renders real pages in Chromium at the agreed viewport
 * sizes and reports what actually overflows, which element causes it, and
 * what the console said.
 *
 * Why a script rather than a Playwright test file: the output needs to be a
 * machine-readable report of *which element* is too wide, not a pass/fail.
 * `document.documentElement.scrollWidth > window.innerWidth` tells you a page
 * overflows but not why, so each page is also walked for boxes whose right
 * edge (or left, in RTL) sits outside the viewport, and the widest offender
 * is named with its tag, classes and text.
 *
 * Usage:
 *   node scripts/responsive-audit.mjs --base http://localhost:3920 \
 *     [--out audit-dir] [--shots] [--only /book-online,/ar]
 */
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf('--' + name);
  return i === -1 ? fallback : args[i + 1];
};
const BASE = arg('base', 'http://localhost:3920').replace(/\/$/, '');
const OUT = arg('out', 'responsive-audit');
const SHOTS = args.includes('--shots');
const ONLY = (arg('only', '') || '').split(',').filter(Boolean);

export const VIEWPORTS = [
  { name: 'small-mobile', width: 320, height: 640 },
  { name: 'mobile', width: 375, height: 812 },
  { name: 'large-mobile', width: 430, height: 932 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'large-desktop', width: 1920, height: 1080 },
];

/** One representative route per template, plus the pages named in the brief. */
export const PAGES = [
  { url: '/', label: 'Homepage' },
  { url: '/book-online', label: 'Book Now (two-step form)' },
  { url: '/contact-us', label: 'Contact Us' },
  { url: '/about-us', label: 'About Us' },
  { url: '/faqs', label: 'FAQs' },
  { url: '/pay-online', label: 'Pay Online' },
  { url: '/fleet', label: 'Fleet (wide table, min-width 760px)' },
  { url: '/prices', label: 'Prices (wide table, min-width 700px)' },
  { url: '/routes', label: 'Routes index' },
  { url: '/destinations', label: 'Destinations index' },
  { url: '/qatar-to-riyadh-taxi-service', label: 'Route template (RoutePage, 41 routes)' },
  { url: '/riyadh-to-dammam-guide', label: 'Route template, guide slug' },
  { url: '/distance/bahrain-to-riyadh', label: 'Distance template (20 routes)' },
  { url: '/locations', label: 'City/locations hub' },
  { url: '/jeddah-airport-taxi-service', label: 'Airport template (9 routes)' },
  { url: '/guides/business-travel', label: 'Guide template (12 routes)' },
  { url: '/destinations/abu-dhabi', label: 'Destination template + enquiry form' },
  { url: '/border-crossing', label: 'Border crossing' },
  { url: '/umrah-transport-package', label: 'Service page' },
  { url: '/ar', label: 'Arabic homepage (RTL)' },
  { url: '/ar/book-online', label: 'Arabic Book Now (RTL)' },
  { url: '/ar/qatar-to-riyadh-taxi-service', label: 'Arabic route page (RTL)' },
  { url: '/ar/contact-us', label: 'Arabic Contact (RTL)' },
  { url: '/ar/border-crossing', label: 'Arabic border crossing (RTL)' },
  { url: '/admin/login', label: 'Admin login (layout only)' },
];

/**
 * Runs in the page. Finds elements whose box escapes the viewport.
 *
 * Ignores: elements that are not visible, and ones whose own overflow is
 * scrollable on purpose (a deliberately scrollable table wrapper is not a
 * page-level overflow). Reports the single widest offender plus a count.
 */
const FIND_OVERFLOW = `(() => {
  const vw = window.innerWidth;
  const docOverflow = document.documentElement.scrollWidth - vw;
  const rtl = getComputedStyle(document.body).direction === 'rtl'
    || document.querySelector('[dir="rtl"]') !== null;
  const offenders = [];
  const all = document.querySelectorAll('body *');
  for (const el of all) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    // An ancestor that scrolls horizontally on purpose contains its own
    // overflow; children inside it are not page-level problems.
    let scrollParent = el.parentElement, contained = false;
    while (scrollParent && scrollParent !== document.body) {
      const ps = getComputedStyle(scrollParent);
      if (ps.overflowX === 'auto' || ps.overflowX === 'scroll') { contained = true; break; }
      scrollParent = scrollParent.parentElement;
    }
    if (contained) continue;
    // Two documented, deliberate off-screen patterns are not overflow:
    //  - The closed off-canvas nav drawer sits entirely to one side at
    //    x >= viewport width (or fully left of 0 in RTL). It is exactly what
    //    the global overflow-x on html is documented to cover.
    //  - The anti-spam honeypot is parked at left: -9999px.
    if (r.left >= vw - 1 || r.right <= 1) continue;
    if (r.left <= -9000) continue;
    const over = Math.max(0, Math.round(r.right - vw), Math.round(-r.left));
    if (over > 1) {
      offenders.push({
        over,
        tag: el.tagName.toLowerCase(),
        cls: (typeof el.className === 'string' ? el.className : '').slice(0, 90),
        id: el.id || '',
        w: Math.round(r.width),
        left: Math.round(r.left),
        right: Math.round(r.right),
        text: (el.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 60),
      });
    }
  }
  offenders.sort((a, b) => b.over - a.over);
  // Tap targets below the 44px guideline, among real interactive elements.
  const small = [];
  for (const el of document.querySelectorAll('a, button, input, select, textarea, [role="button"]')) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    // Inline text links inside prose, breadcrumbs and footer lists are
    // line-height tall by nature; the guideline is about standalone
    // controls. Visually-hidden inputs (honeypot, the service radios behind
    // their cards) are 1px on purpose and are operated via their label.
    if (r.left <= -9000 || (r.width <= 8 && r.height <= 8)) continue;
    if (el.tagName === 'A' && el.closest('p, li, nav[aria-label], [class*="breadcrumb"], footer')) continue;
    // A borderless, padding-less <input> inside a padded field cell is only
    // as tall as its text; the thing a finger lands on is the cell. Measure
    // that instead — the homepage search inputs are 17px boxes inside 69px
    // fields, and a real click on them focuses the input.
    let effH = r.height;
    if (el.tagName === 'INPUT') {
      let a = el.parentElement;
      for (let i = 0; i < 4 && a; i++, a = a.parentElement) {
        const as = getComputedStyle(a);
        if (as.paddingTop !== '0px' || as.borderTopWidth !== '0px') {
          effH = Math.max(effH, a.getBoundingClientRect().height);
          break;
        }
      }
    }
    if (effH < 32 || r.width < 24) {
      small.push({
        tag: el.tagName.toLowerCase(),
        cls: (typeof el.className === 'string' ? el.className : '').slice(0, 60),
        h: Math.round(effH),
        w: Math.round(r.width),
        text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40),
      });
    }
  }
  return {
    vw,
    docScrollWidth: document.documentElement.scrollWidth,
    docOverflow,
    bodyScrollWidth: document.body.scrollWidth,
    rtl,
    offenderCount: offenders.length,
    offenders: offenders.slice(0, 6),
    smallTargetCount: small.length,
    smallTargets: small.slice(0, 5),
  };
})()`;

async function main() {
  const pages = ONLY.length ? PAGES.filter((p) => ONLY.some((o) => p.url === o || p.url.startsWith(o))) : PAGES;
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const report = [];
  let totalOverflow = 0;
  let totalConsole = 0;
  let unstyled = 0;

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      userAgent: 'Mozilla/5.0 (responsive-audit) Chrome/131.0.0.0',
    });
    for (const p of pages) {
      const page = await context.newPage();
      const consoleErrors = [];
      const failedRequests = [];
      page.on('console', (m) => {
        if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200));
      });
      page.on('requestfailed', (r) => {
        failedRequests.push(`${r.method()} ${r.url().slice(0, 120)} (${r.failure()?.errorText ?? '?'})`);
      });
      let result = null, error = null, status = null, styled = null;
      try {
        const resp = await page.goto(BASE + p.url, { waitUntil: 'networkidle', timeout: 45000 });
        status = resp?.status() ?? null;
        // Let fonts settle so text metrics are real.
        await page.waitForTimeout(250);
        /**
         * Integrity guard: prove the stylesheets actually applied before
         * trusting a single measurement.
         *
         * An unstyled page reports a perfect result — with no CSS nothing is
         * wide enough to overflow, so every check comes back clean. That is
         * exactly what happened once here: a build directory was removed
         * while the server was still serving from it, and a sweep then
         * returned 200/200 "clean" against pages rendering with browser
         * default styles. A run that cannot prove CSS loaded is worthless,
         * so it is marked unstyled rather than reported as a pass.
         */
        styled = await page.evaluate(`(() => {
          const btn = document.querySelector('.btn, [class*="btn"], button');
          const body = getComputedStyle(document.body);
          const sheets = document.styleSheets.length;
          const btnPad = btn ? parseFloat(getComputedStyle(btn).paddingTop) : null;
          // The site sets a body background and its buttons carry generous
          // padding; browser defaults give neither.
          return {
            sheets,
            bodyBg: body.backgroundColor,
            btnPad,
            ok: sheets > 0 && body.backgroundColor !== 'rgba(0, 0, 0, 0)' && (btnPad === null || btnPad >= 6),
          };
        })()`);
        result = await page.evaluate(FIND_OVERFLOW);
        if (SHOTS) {
          const file = path.join(OUT, `${vp.width}-${p.url.replace(/[^a-z0-9]+/gi, '_') || 'home'}.png`);
          await page.screenshot({ path: file, fullPage: false });
        }
      } catch (e) {
        error = String(e).slice(0, 200);
      }
      if (result?.docOverflow > 1) totalOverflow++;
      totalConsole += consoleErrors.length;
      if (styled && !styled.ok) unstyled++;
      report.push({ viewport: vp.name, width: vp.width, url: p.url, label: p.label, status, error, styled, consoleErrors, failedRequests, ...(result ?? {}) });
      await page.close();
    }
    await context.close();
    console.log(`  swept ${vp.name} (${vp.width}px)`);
  }
  await browser.close();

  writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));

  // ---- console summary -------------------------------------------------
  console.log('');
  console.log('=== HORIZONTAL OVERFLOW (documentElement.scrollWidth > innerWidth) ===');
  const bad = report.filter((r) => (r.docOverflow ?? 0) > 1);
  if (!bad.length) console.log('  none at any tested viewport');
  for (const r of bad) {
    console.log(`  ${String(r.width).padStart(4)}px  ${r.url.padEnd(38)} +${r.docOverflow}px  (${r.offenderCount} offending el)`);
    for (const o of (r.offenders || []).slice(0, 3)) {
      console.log(`         ${o.tag}.${o.cls || '(no class)'} w=${o.w} right=${o.right} over=${o.over}  "${o.text}"`);
    }
  }

  console.log('');
  console.log('=== ELEMENT-LEVEL OVERFLOW without page-level overflow ===');
  const silent = report.filter((r) => (r.docOverflow ?? 0) <= 1 && (r.offenderCount ?? 0) > 0);
  if (!silent.length) console.log('  none');
  for (const r of silent) {
    console.log(`  ${String(r.width).padStart(4)}px  ${r.url.padEnd(38)} ${r.offenderCount} el`);
    for (const o of (r.offenders || []).slice(0, 2)) {
      console.log(`         ${o.tag}.${o.cls || '(no class)'} w=${o.w} right=${o.right} over=${o.over}  "${o.text}"`);
    }
  }

  console.log('');
  console.log('=== SMALL TAP TARGETS (<32px tall or <24px wide) at 375px ===');
  for (const r of report.filter((x) => x.width === 375 && (x.smallTargetCount ?? 0) > 0)) {
    console.log(`  ${r.url.padEnd(38)} ${r.smallTargetCount}`);
    for (const s of (r.smallTargets || []).slice(0, 3)) {
      console.log(`         ${s.tag}.${s.cls || '(no class)'} ${s.w}x${s.h}  "${s.text}"`);
    }
  }

  console.log('');
  console.log('=== CONSOLE ERRORS / FAILED REQUESTS ===');
  const noisy = report.filter((r) => r.consoleErrors?.length || r.failedRequests?.length);
  if (!noisy.length) console.log('  none');
  const seen = new Set();
  for (const r of noisy) {
    for (const m of [...(r.consoleErrors || []), ...(r.failedRequests || [])]) {
      const k = r.url + '|' + m;
      if (seen.has(k)) continue;
      seen.add(k);
      console.log(`  ${r.url} @${r.width}px: ${m}`);
    }
  }

  console.log('');
  console.log('=== LOAD FAILURES ===');
  const failed = report.filter((r) => r.error || (r.status && r.status >= 400));
  if (!failed.length) console.log('  none');
  for (const r of failed) console.log(`  ${r.width}px ${r.url}: status=${r.status} ${r.error ?? ''}`);

  console.log('');
  console.log(`pages: ${pages.length}   viewports: ${VIEWPORTS.length}   checks: ${report.length}`);
  console.log(`page-level overflow: ${totalOverflow}   console errors: ${totalConsole}`);
  if (unstyled > 0) {
    console.log('');
    console.log(`!! RUN INVALID: ${unstyled} of ${report.length} checks rendered WITHOUT the site stylesheets.`);
    console.log('   An unstyled page cannot overflow, so a clean result here means nothing.');
    console.log('   Rebuild with the server stopped first, restart it, and sweep again.');
  } else {
    console.log('stylesheet integrity: all checks rendered with CSS applied');
  }
  console.log(`full report: ${path.join(OUT, 'report.json')}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
