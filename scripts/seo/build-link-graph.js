#!/usr/bin/env node
/**
 * Internal link graph builder for gulftripservice.com.
 *
 * Scope & method (documented so audit findings are reproducible, not guessed):
 * - Every route in this app is a literal static folder under src/app — there are
 *   no Next.js dynamic segments ([slug] etc.) — so each page.tsx maps 1:1 to one
 *   real URL. /admin/** is excluded (auth-gated, not part of the public site).
 * - Two rendering patterns exist:
 *     1. "Direct" pages — links live directly in the page.tsx JSX.
 *     2. "Templated" pages — the page.tsx just does
 *        `<RoutePage data={someRouteObject} />` or `<CityServicePage data={...} />`;
 *        the actual link markup lives in the shared component (RoutePage.tsx /
 *        CityServicePage.tsx) PLUS data-driven href fields inside the imported
 *        data object (src/lib/routeData.ts, cityData1/2/3.ts). Both are parsed
 *        and attributed to the specific page that renders that data object.
 * - Link extraction is regex/text-based (no full JSX AST), matching:
 *     href="literal", href={'literal'}, href={`literal`} (no ${} interpolation).
 *   href={expression} with a variable/interpolation is recorded as "dynamic /
 *   unresolved" rather than guessed at — these are reported separately, not
 *   silently dropped or mis-resolved.
 * - Links are tagged by ORIGIN section: nav (Navbar/ArabicNavbar/StickyMobileBar),
 *   footer (Footer/ArabicFooter), breadcrumb, or contextual (everything else —
 *   body prose, cards, related-links modules, CTAs). "Contextual inbound count"
 *   in the audit excludes nav/footer/breadcrumb, per the brief.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const APP_DIR = path.join(ROOT, "src", "app");
const COMPONENTS_DIR = path.join(ROOT, "src", "components");
const LIB_DIR = path.join(ROOT, "src", "lib");
const OUT_DIR = path.join(ROOT, "seo-audit");

// ---------------------------------------------------------------------------
// 1. Enumerate every public route (page.tsx), excluding /admin
// ---------------------------------------------------------------------------
function walkPages(dir, base = "") {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "admin") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkPages(full, base + "/" + entry.name));
    } else if (entry.name === "page.tsx") {
      out.push({ file: full, route: base === "" ? "/" : base });
    }
  }
  return out;
}

const pages = walkPages(APP_DIR).sort((a, b) => a.route.localeCompare(b.route));

// ---------------------------------------------------------------------------
// 2. href extraction — balanced-brace aware, classifies static vs dynamic
// ---------------------------------------------------------------------------
function extractHrefAttrs(source) {
  const results = [];
  const re = /\bhref=/g;
  let m;
  while ((m = re.exec(source))) {
    const start = m.index + m[0].length;
    const ch = source[start];
    const lineNo = source.slice(0, m.index).split("\n").length;
    if (ch === '"' || ch === "'") {
      const end = source.indexOf(ch, start + 1);
      if (end === -1) continue;
      results.push({ raw: source.slice(start + 1, end), dynamic: false, line: lineNo, exprStart: start });
    } else if (ch === "{") {
      // balanced-brace scan
      let depth = 1;
      let i = start + 1;
      while (i < source.length && depth > 0) {
        if (source[i] === "{") depth++;
        else if (source[i] === "}") depth--;
        i++;
      }
      const inner = source.slice(start + 1, i - 1).trim();
      // static string literal
      const strMatch = inner.match(/^(['"])(.*)\1$/);
      // static template literal with no ${...}
      const tplMatch = inner.match(/^`([^`]*)`$/);
      if (strMatch) {
        results.push({ raw: strMatch[2], dynamic: false, line: lineNo, exprStart: start });
      } else if (tplMatch && !tplMatch[1].includes("${")) {
        results.push({ raw: tplMatch[1], dynamic: false, line: lineNo, exprStart: start });
      } else {
        results.push({ raw: inner, dynamic: true, line: lineNo, exprStart: start });
      }
    }
  }
  return results;
}

// Extract the visible anchor text between the tag containing this href attr
// and its matching closing tag. Best-effort: strips nested JSX tags/braces.
function extractAnchorText(source, hrefExprStart, tagName) {
  // find end of opening tag (next unescaped '>')
  let i = hrefExprStart;
  let depth = 0;
  while (i < source.length) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") depth--;
    else if (source[i] === ">" && depth === 0) { i++; break; }
    i++;
  }
  const openEnd = i;
  const closeTag = `</${tagName}>`;
  const closeIdx = source.indexOf(closeTag, openEnd);
  if (closeIdx === -1) return { text: null, selfClosing: true };
  let inner = source.slice(openEnd, closeIdx);
  const hasImage = /<Image\b|<img\b/.test(inner);
  const imgAltEmpty = /<Image\b(?![^>]*alt=)|alt=""/.test(inner);
  // strip JSX/HTML tags and expressions to approximate visible text
  let text = inner
    .replace(/<[^>]*>/g, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return { text, hasImage, imgAltEmpty };
}

// ---------------------------------------------------------------------------
// 3. Parse data files for href-bearing arrays (routeData.ts, cityData*.ts)
// ---------------------------------------------------------------------------
function parseDataFileLinks(file) {
  const source = fs.readFileSync(file, "utf8");
  // Find every top-level `export const NAME: Type = { ... };` object and record
  // its href-bearing sub-objects (relatedRoutes: [{href,label}], popularRoutes).
  const objects = [];
  const exportRe = /export const (\w+)(?::\s*\w+(?:\[\])?)? = \{/g;
  let m;
  while ((m = exportRe.exec(source))) {
    const name = m[1];
    const braceStart = m.index + m[0].length - 1;
    let depth = 1;
    let i = braceStart + 1;
    while (i < source.length && depth > 0) {
      if (source[i] === "{") depth++;
      else if (source[i] === "}") depth--;
      i++;
    }
    const body = source.slice(braceStart, i);
    const hrefs = [];
    const hrefRe = /href:\s*(["'])(.*?)\1\s*,?\s*label:\s*(["'])(.*?)\3/g;
    let hm;
    while ((hm = hrefRe.exec(body))) {
      hrefs.push({ href: hm[2], label: hm[4] });
    }
    // popularRoutes-style: { from, to, time, href? } — href optional, no label
    const prRe = /\{\s*from:\s*(["'])(.*?)\1,\s*to:\s*(["'])(.*?)\3,\s*time:\s*(["'])(.*?)\5(?:,\s*href:\s*(["'])(.*?)\7)?\s*\}/g;
    let pm;
    while ((pm = prRe.exec(body))) {
      if (pm[8]) hrefs.push({ href: pm[8], label: `${pm[2]} to ${pm[4]}` });
    }
    // nearbyCities-style: { city, slug } — CityServicePage.tsx synthesizes
    // the href as `/services/${slug}` rather than storing it literally.
    const ncRe = /nearbyCities:\s*\[([^\]]*)\]/;
    const ncMatch = body.match(ncRe);
    if (ncMatch) {
      const itemRe = /\{\s*city:\s*(["'])(.*?)\1,\s*slug:\s*(["'])(.*?)\3\s*\}/g;
      let im;
      while ((im = itemRe.exec(ncMatch[1]))) {
        hrefs.push({ href: `/services/${im[4]}`, label: im[2] });
      }
    }
    objects.push({ name, hrefs, file, line: source.slice(0, m.index).split("\n").length });
  }
  return objects;
}

const routeDataObjects = parseDataFileLinks(path.join(LIB_DIR, "routeData.ts"));
const cityDataObjects = [1, 2, 3].flatMap((n) =>
  parseDataFileLinks(path.join(LIB_DIR, `cityData${n}.ts`))
);
const allDataObjects = [...routeDataObjects, ...cityDataObjects];
const dataObjectByName = Object.fromEntries(allDataObjects.map((o) => [o.name, o]));

// airportRoutesData.ts: AIRPORTS[].relatedLinks (nested arrays) and
// AIRPORT_ROUTES[].href — both rendered only by src/app/airport-transfers,
// via AIRPORTS.map(...) + <RoutesGrid routes={...}>. Parsed directly rather
// than generalizing the array-literal parser for one file's nested shape.
const airportRoutesLinks = (() => {
  const file = path.join(LIB_DIR, "airportRoutesData.ts");
  if (!fs.existsSync(file)) return [];
  const source = fs.readFileSync(file, "utf8");
  const lineOf = (idx) => source.slice(0, idx).split("\n").length;
  const links = [];
  const relatedRe = /relatedLinks:\s*\[([^\]]*)\]/g;
  let m;
  while ((m = relatedRe.exec(source))) {
    const hrefRe = /\{\s*href:\s*(['"])(.*?)\1,\s*label:\s*(['"])(.*?)\3\s*\}/g;
    let hm;
    while ((hm = hrefRe.exec(m[1]))) links.push({ href: hm[2], label: hm[4], line: lineOf(m.index) });
  }
  const routeHrefRe = /\{\s*id:[^}]*?href:\s*(['"])(.*?)\1[^}]*?\}/g;
  while ((m = routeHrefRe.exec(source))) links.push({ href: m[2], label: null, line: lineOf(m.index) });
  return links;
})();

// ---------------------------------------------------------------------------
// 4. Shared components: extract links + tag by section
// ---------------------------------------------------------------------------
function readComponent(name) {
  const file = path.join(COMPONENTS_DIR, `${name}.tsx`);
  if (!fs.existsSync(file)) return null;
  return { file, source: fs.readFileSync(file, "utf8") };
}

// Resolve `ARRAY.map((param) => (... href={param.href} ...))` patterns —
// common in Navbar/ArabicNavbar dropdowns — back to concrete hrefs by parsing
// the module-level `const ARRAY = [ {href, label, ...}, ... ]` literal.
function splitTopLevelBraceObjects(text) {
  const items = [];
  let i = 0;
  while (i < text.length) {
    if (text[i] === "{") {
      let depth = 1, start = i, j = i + 1;
      while (j < text.length && depth > 0) {
        if (text[j] === "{") depth++;
        else if (text[j] === "}") depth--;
        j++;
      }
      items.push(text.slice(start, j));
      i = j;
    } else {
      i++;
    }
  }
  return items;
}

function parseArrayLiterals(source) {
  const arrays = {};
  const re = /const (\w+)\s*=\s*\[/g;
  let m;
  while ((m = re.exec(source))) {
    const name = m[1];
    const bracketStart = m.index + m[0].length - 1;
    const end = matchingBracketEnd(source, bracketStart);
    const items = parseItemsFromArrayBody(source.slice(bracketStart + 1, end - 1));
    if (items.length) arrays[name] = items;
  }
  return arrays;
}

function matchingBracketEnd(source, bracketStart) {
  let depth = 1, i = bracketStart + 1;
  while (i < source.length && depth > 0) {
    if (source[i] === "[") depth++;
    else if (source[i] === "]") depth--;
    i++;
  }
  return i;
}

// Capture every simple `key: "string"` field per item (not just href/label)
// so both `item.href` and template patterns like `/blog/${post.slug}` can be
// resolved against whichever field the JSX actually references.
function parseItemsFromArrayBody(body) {
  return splitTopLevelBraceObjects(body).map((obj) => {
    const fields = {};
    const fieldRe = /(\w+):\s*(['"])(.*?)\2/g;
    let fm;
    while ((fm = fieldRe.exec(obj))) fields[fm[1]] = fm[3];
    if (!fields.href && fields.link) fields.href = fields.link;
    if (!fields.label) fields.label = fields.title || fields.name || null;
    return Object.keys(fields).length ? fields : null;
  }).filter(Boolean);
}

// <RelatedLinks links={[{href, label}, ...]} /> — the array is a JSX prop
// value at the call site, not a JSX `href=` attribute, so extractHrefAttrs
// never sees it (it looks for `href=`, not the `href:` object key) and
// RelatedLinks.tsx itself has no literal hrefs (they arrive via props). Parse
// the inline array directly out of the page source instead.
function findRelatedLinksProps(source, file) {
  const out = [];
  const re = /<RelatedLinks\b[^>]*\blinks=\{/g;
  let m;
  while ((m = re.exec(source))) {
    const bracketStart = source.indexOf("[", m.index);
    if (bracketStart === -1) continue;
    const end = matchingBracketEnd(source, bracketStart);
    const items = parseItemsFromArrayBody(source.slice(bracketStart + 1, end - 1));
    const line = source.slice(0, m.index).split("\n").length;
    for (const item of items) {
      if (item.href) out.push({ href: item.href, dynamic: false, line, tagName: "Link", anchorText: item.label, file, section: "contextual", resolvedFrom: "RelatedLinks prop" });
    }
  }
  return out;
}

// Anonymous inline arrays used directly in JSX: `{[ {...}, {...} ].map((r) => ...)}`
// — no `const NAME =` to key off, so resolve them at their own source
// position instead of by array name.
function findInlineArrayMaps(source) {
  const results = []; // { bracketStart, mapSpanEnd, paramName, items }
  const re = /\]\.map\(/g;
  let m;
  while ((m = re.exec(source))) {
    const bracketEnd = m.index + 1; // position just after ']'
    // walk backward to find the matching '['
    let depth = 1, i = m.index - 1;
    while (i >= 0 && depth > 0) {
      if (source[i] === "]") depth++;
      else if (source[i] === "[") depth--;
      i--;
    }
    const bracketStart = i + 1;
    if (source[bracketStart] !== "[") continue;
    const parenStart = m.index + m[0].length - 1; // index of the '(' in "].map("
    const paramMatch = /^\(\s*\(\s*(\w+)(?:,\s*\w+)?\s*\)\s*=>/.exec(source.slice(parenStart));
    if (!paramMatch) continue;
    let pdepth = 1, j = parenStart + 1;
    while (j < source.length && pdepth > 0) {
      if (source[j] === "(") pdepth++;
      else if (source[j] === ")") pdepth--;
      j++;
    }
    const items = parseItemsFromArrayBody(source.slice(bracketStart + 1, m.index));
    if (items.length) results.push({ paramName: paramMatch[1], start: parenStart, end: j, items });
  }
  return results;
}

// Find every `ARRAY.map((param[, i]) => ...)` call's full span (from its
// opening paren to the matching closing paren), so nested .map() calls (e.g.
// a card's .map() containing a per-feature .map() inside) can be told apart —
// "nearest preceding .map()" alone picks the wrong (inner) one whenever the
// href's variable name belongs to an outer map, not the innermost.
function findAllMapSpans(source) {
  const spans = [];
  const mapRe = /(\w+)\.map\(/g;
  let m;
  while ((m = mapRe.exec(source))) {
    const parenStart = m.index + m[0].length - 1; // index of the '(' in "map("
    const paramMatch = /^\(\s*\(\s*(\w+)(?:,\s*\w+)?\s*\)\s*=>/.exec(source.slice(parenStart));
    if (!paramMatch) continue;
    let depth = 1, i = parenStart + 1;
    while (i < source.length && depth > 0) {
      if (source[i] === "(") depth++;
      else if (source[i] === ")") depth--;
      i++;
    }
    spans.push({ arrayName: m[1], paramName: paramMatch[1], start: parenStart, end: i });
  }
  return spans;
}

// Among spans that both contain `offset` AND bind `paramName`, return the
// innermost (largest start) — the one whose .map() callback actually owns
// this href expression.
function findEnclosingMapForParam(mapSpans, offset, paramName) {
  const candidates = mapSpans.filter((s) => s.start <= offset && offset <= s.end && s.paramName === paramName);
  if (!candidates.length) return null;
  candidates.sort((a, b) => b.start - a.start);
  return candidates[0];
}

function linksFromSource(source, file, defaultSection) {
  const arrayLiterals = parseArrayLiterals(source);
  const mapSpans = findAllMapSpans(source);
  const inlineArrayMaps = findInlineArrayMaps(source);
  const attrs = extractHrefAttrs(source);
  const out = [];
  for (const a of attrs) {
    let tagName = "a";
    const before = source.slice(Math.max(0, a.exprStart - 40), a.exprStart);
    if (/<Link\s[^<]*$/.test(before)) tagName = "Link";

    // Try resolving `item.href`-style dynamic hrefs via the enclosing .map().
    if (a.dynamic) {
      // Known non-navigational dynamic expressions: external contact links
      // (WhatsApp/tel, imported as constants so the literal isn't visible
      // to static analysis) and the language-switcher helpers, which by
      // design resolve to "this same page in the other language" per-page —
      // there is no single static href to report a fix against.
      if (/^(WHATSAPP_URL|TEL_URL|ratesHref|waLink\(|arabicPathFor\(|englishPathFor\()/.test(a.raw)) {
        out.push({ href: a.raw, dynamic: true, external: true, line: a.line, tagName, anchorText: null, file, section: defaultSection });
        continue;
      }
      const propMatch = a.raw.match(/^(\w+)\.(href|link)$/);
      // Template literal with exactly one interpolation, e.g. `/blog/${post.slug}`.
      const tplMatch = a.raw.match(/^`([^$]*)\$\{(\w+)\.(\w+)\}([^$]*)`$/);
      const fieldMatch = propMatch || (tplMatch && [null, tplMatch[2], tplMatch[3]]);
      if (fieldMatch) {
        const [, paramName, fieldName] = fieldMatch;
        const enclosing = findEnclosingMapForParam(mapSpans, a.exprStart, paramName);
        const items = enclosing && arrayLiterals[enclosing.arrayName];
        const inline = !items && inlineArrayMaps.find((s) => s.start <= a.exprStart && a.exprStart <= s.end && s.paramName === paramName);
        const resolvedItems = items || inline?.items;
        if (resolvedItems) {
          // The JSX between the opening/closing tag is a single static template
          // shared by every iteration of the .map() — extract it once so literal
          // CTA text (e.g. "Learn More" wrapping a per-item `href`) is captured
          // instead of being dropped. Falls back to a `label` field on the item
          // for the genuinely data-driven-caption pattern (anchor text itself
          // comes from `{item.label}`, which the tag/expression stripper can't
          // recover).
          const staticAnchor = extractAnchorText(source, a.exprStart, tagName);
          for (const item of resolvedItems) {
            const value = propMatch ? item[fieldName] : `${tplMatch[1]}${item[fieldName]}${tplMatch[4]}`;
            if (value == null) continue;
            out.push({
              href: value, dynamic: false, line: a.line, tagName,
              anchorText: staticAnchor.text || item.label,
              hasImage: staticAnchor.hasImage, imgAltEmpty: staticAnchor.imgAltEmpty,
              file, section: defaultSection,
              resolvedFrom: items ? `${enclosing.arrayName}[] in ${file}` : `inline array in ${file}`,
            });
          }
          continue;
        }
      }
      out.push({ href: a.raw, dynamic: true, line: a.line, tagName, anchorText: null, file, section: defaultSection });
      continue;
    }

    const anchor = extractAnchorText(source, a.exprStart, tagName);
    out.push({ href: a.raw, dynamic: false, line: a.line, tagName, anchorText: anchor.text, hasImage: anchor.hasImage, imgAltEmpty: anchor.imgAltEmpty, file, section: defaultSection });
  }
  return out;
}

function componentLinks(name, section) {
  const c = readComponent(name);
  if (!c) return [];
  return linksFromSource(c.source, path.relative(ROOT, c.file), section);
}

// English chrome (PublicLayout: TopBar + Navbar + <page> + Footer) — applies
// to every route except /admin/** (already excluded) and /ar/** (own chrome).
const enChromeLinks = [
  ...componentLinks("Navbar", "nav"),
  ...componentLinks("StickyMobileBar", "nav"),
  ...componentLinks("Footer", "footer"),
];

// Arabic chrome (app/ar/layout.tsx: ArabicNavbar + <page> + ArabicFooter).
const arChromeLinks = [
  ...componentLinks("ArabicNavbar", "nav"),
  ...componentLinks("ArabicFooter", "footer"),
];

const routePageComp = readComponent("RoutePage");
const cityServicePageComp = readComponent("CityServicePage");

// RoutePage.tsx / CityServicePage.tsx: separate the breadcrumb links (fixed,
// same on every page using the template) from the rest (contextual, also
// fixed structural links repeated on every page using that template).
function templateLinks(comp) {
  if (!comp) return { breadcrumb: [], contextual: [] };
  const all = linksFromSource(comp.source, path.relative(ROOT, comp.file), "contextual");
  const breadcrumb = [];
  const contextual = [];
  for (const link of all) {
    const idx = comp.source.indexOf(`href="${link.href}"`, 0);
    const windowText = comp.source.slice(Math.max(0, link.line ? 0 : 0));
    // crude but reliable: check the line's raw text for the word "breadcrumb"
    const lineText = comp.source.split("\n")[link.line - 1] || "";
    const prevLine = comp.source.split("\n")[link.line - 2] || "";
    if (/breadcrumb/i.test(lineText) || /className="breadcrumb"/.test(prevLine)) {
      link.section = "breadcrumb";
      breadcrumb.push(link);
    } else if (!link.dynamic) {
      contextual.push(link);
    }
  }
  return { breadcrumb, contextual };
}

const routePageLinks = templateLinks(routePageComp);
const cityServicePageLinks = templateLinks(cityServicePageComp);

// ---------------------------------------------------------------------------
// 5. Per-page link extraction
// ---------------------------------------------------------------------------
const pageResults = [];

for (const { file, route } of pages) {
  const source = fs.readFileSync(file, "utf8");
  const relFile = path.relative(ROOT, file);
  const direct = linksFromSource(source, relFile, "contextual").map((l) => {
    const lineText = source.split("\n")[l.line - 1] || "";
    const prevLine = source.split("\n")[l.line - 2] || "";
    if (/breadcrumb/i.test(lineText) || /className="breadcrumb"/.test(prevLine)) l.section = "breadcrumb";
    return l;
  }).concat(findRelatedLinksProps(source, relFile));

  let templated = [];
  let templateKind = null;

  const routePageDataMatch = source.match(/<RoutePage\s+data=\{(\w+)\}/);
  const cityServicePageDataMatch = source.match(/<CityServicePage\s+data=\{(\w+)\}/);

  if (routePageDataMatch) {
    templateKind = "RoutePage";
    const dataName = routePageDataMatch[1];
    templated = [...routePageLinks.breadcrumb, ...routePageLinks.contextual];
    const dataObj = dataObjectByName[dataName];
    if (dataObj) {
      templated = templated.concat(
        dataObj.hrefs.map((h) => ({
          href: h.href,
          dynamic: false,
          line: dataObj.line,
          tagName: "Link",
          anchorText: h.label,
          section: "contextual",
          file: path.relative(ROOT, dataObj.file),
          fromDataObject: dataName,
        }))
      );
    }
  } else if (cityServicePageDataMatch) {
    templateKind = "CityServicePage";
    const dataName = cityServicePageDataMatch[1];
    templated = [...cityServicePageLinks.breadcrumb, ...cityServicePageLinks.contextual];
    const dataObj = dataObjectByName[dataName];
    if (dataObj) {
      templated = templated.concat(
        dataObj.hrefs.map((h) => ({
          href: h.href,
          dynamic: false,
          line: dataObj.line,
          tagName: "Link",
          anchorText: h.label,
          section: "contextual",
          file: path.relative(ROOT, dataObj.file),
          fromDataObject: dataName,
        }))
      );
    }
  }

  // metadata / noindex detection
  const noindexMatch = /noindex\s*:\s*true/.test(source) || /robots:\s*\{\s*index:\s*false/.test(source);

  // non-crawlable nav detection: onClick on div/span, href="#", javascript:void(0)
  const nonCrawlable = [];
  const onClickDivRe = /<(div|span)\b[^>]*\bonClick=/g;
  let ocm;
  while ((ocm = onClickDivRe.exec(source))) {
    nonCrawlable.push({ type: `onClick on <${ocm[1]}>`, line: source.slice(0, ocm.index).split("\n").length, file: relFile });
  }

  const chromeLinks = route.startsWith("/ar") ? arChromeLinks : enChromeLinks;

  const extraDataLinks = route === "/airport-transfers"
    ? airportRoutesLinks.map((l) => ({
        href: l.href, dynamic: false, line: l.line, tagName: "Link",
        anchorText: l.label, section: "contextual",
        file: "src/lib/airportRoutesData.ts", resolvedFrom: "AIRPORTS[]/AIRPORT_ROUTES[] (rendered by airport-transfers/page.tsx)",
      }))
    : [];

  pageResults.push({
    route,
    file: relFile,
    templateKind,
    noindex: noindexMatch,
    links: [...direct, ...templated, ...chromeLinks, ...extraDataLinks],
    nonCrawlable,
  });
}

// non-crawlable scan also across shared components (nav/footer/related)
const allComponentFiles = fs.readdirSync(COMPONENTS_DIR).filter((f) => f.endsWith(".tsx"));
const globalNonCrawlable = [];
for (const f of allComponentFiles) {
  const full = path.join(COMPONENTS_DIR, f);
  const source = fs.readFileSync(full, "utf8");
  const relFile = path.relative(ROOT, full);
  const onClickDivRe = /<(div|span)\b[^>]*\bonClick=/g;
  let ocm;
  while ((ocm = onClickDivRe.exec(source))) {
    globalNonCrawlable.push({ type: `onClick on <${ocm[1]}>`, line: source.slice(0, ocm.index).split("\n").length, file: relFile });
  }
  const hrefs = extractHrefAttrs(source);
  for (const h of hrefs) {
    if (!h.dynamic && (h.raw === "#" || h.raw.trim() === "javascript:void(0)")) {
      globalNonCrawlable.push({ type: `href="${h.raw}"`, line: h.line, file: relFile });
    }
  }
}
for (const pr of pageResults) {
  const hrefs = extractHrefAttrs(fs.readFileSync(path.join(ROOT, pr.file), "utf8"));
  for (const h of hrefs) {
    if (!h.dynamic && (h.raw === "#" || h.raw.trim() === "javascript:void(0)")) {
      pr.nonCrawlable.push({ type: `href="${h.raw}"`, line: h.line, file: pr.file });
    }
  }
}

// ---------------------------------------------------------------------------
// 6. Normalize hrefs -> route keys, cross-reference against known route set
// ---------------------------------------------------------------------------
const knownRoutes = new Set(pages.map((p) => p.route));
const BASE_URL = "https://gulftripservice.com";

function classifyHref(raw) {
  if (raw == null) return { kind: "empty" };
  const trimmed = raw.trim();
  if (trimmed === "") return { kind: "empty" };
  if (trimmed.startsWith("#")) return { kind: "hash" };
  if (trimmed.startsWith("mailto:") || trimmed.startsWith("tel:")) return { kind: "external-contact" };
  if (/^https?:\/\/(?!gulftripservice\.com|www\.gulftripservice\.com)/i.test(trimmed)) return { kind: "external" };
  if (trimmed.startsWith("javascript:")) return { kind: "js-void" };

  let working = trimmed;
  const flags = { wrongProtocol: false, wrongWww: false, indexHtml: false, trailingSlashIssue: false, absoluteInternal: false };

  if (/^http:\/\//i.test(working)) { flags.wrongProtocol = true; working = working.replace(/^http:\/\//i, "https://"); }
  if (/^https?:\/\/www\.gulftripservice\.com/i.test(working)) { flags.wrongWww = true; working = working.replace(/^https?:\/\/www\.gulftripservice\.com/i, "https://gulftripservice.com"); }
  if (/^https?:\/\/gulftripservice\.com/i.test(working)) { flags.absoluteInternal = true; working = working.replace(/^https?:\/\/gulftripservice\.com/i, ""); }

  if (working === "") working = "/";
  if (/\/index\.html?$/i.test(working)) { flags.indexHtml = true; working = working.replace(/\/index\.html?$/i, "") || "/"; }
  if (working.length > 1 && working.endsWith("/")) { flags.trailingSlashIssue = true; working = working.slice(0, -1); }

  const [pathAndQuery, hash] = working.split("#");
  const [pathOnly, query] = pathAndQuery.split("?");
  const exists = knownRoutes.has(pathOnly);

  return { kind: "internal", normalized: pathOnly, hasQuery: Boolean(query), exists, flags, original: trimmed };
}

// ---------------------------------------------------------------------------
// 7. Build the graph + write link-graph.json
// ---------------------------------------------------------------------------
const graph = {}; // route -> { inbound: [{from, section, anchorText, file, line}], outbound: [...] }
for (const p of pages) graph[p.route] = { inbound: [], outbound: [] };

const findings = {
  brokenLinks: [],
  redirectLinks: [],
  hashOrJsVoid: [],
  nonCrawlable: [],
  dynamicUnresolved: [],
};

for (const pr of pageResults) {
  for (const link of pr.links) {
    const cls = classifyHref(link.href);
    if (link.dynamic) {
      if (!link.external) {
        findings.dynamicUnresolved.push({ page: pr.route, file: link.file, line: link.line, expr: link.href.slice(0, 120) });
      }
      continue;
    }
    if (cls.kind === "hash" || cls.kind === "js-void") {
      findings.hashOrJsVoid.push({ page: pr.route, file: link.file, line: link.line, href: link.href });
      continue;
    }
    if (cls.kind !== "internal") continue; // external/mailto/tel — not part of internal graph

    if (!cls.exists) {
      findings.brokenLinks.push({ page: pr.route, file: link.file, line: link.line, href: link.href, anchorText: link.anchorText });
      continue;
    }
    const flagsHit = Object.entries(cls.flags).filter(([, v]) => v).map(([k]) => k);
    if (flagsHit.length > 0) {
      findings.redirectLinks.push({ page: pr.route, file: link.file, line: link.line, href: link.href, normalized: cls.normalized, flags: flagsHit });
    }

    if (!(cls.normalized in graph)) continue;
    graph[pr.route].outbound.push({ to: cls.normalized, section: link.section, anchorText: link.anchorText, file: link.file, line: link.line, tagName: link.tagName, hasImage: link.hasImage, imgAltEmpty: link.imgAltEmpty });
    graph[cls.normalized].inbound.push({ from: pr.route, section: link.section, anchorText: link.anchorText, file: link.file, line: link.line });
  }
  for (const nc of pr.nonCrawlable) findings.nonCrawlable.push({ page: pr.route, ...nc });
}
for (const nc of globalNonCrawlable) findings.nonCrawlable.push({ page: "(shared component)", ...nc });

// ---------------------------------------------------------------------------
// 8. BFS click depth from "/"
// ---------------------------------------------------------------------------
const depth = { "/": 0 };
const queue = ["/"];
while (queue.length) {
  const cur = queue.shift();
  const outs = new Set(graph[cur]?.outbound.map((o) => o.to) || []);
  for (const to of outs) {
    if (!(to in depth)) {
      depth[to] = depth[cur] + 1;
      queue.push(to);
    }
  }
}

// Shared-component findings (dynamicUnresolved, nonCrawlable) repeat once per
// page that renders that component — dedupe by (file, line) and record how
// many pages are affected, instead of one near-identical row per page.
function dedupeBySite(list, extraKeyFn) {
  const map = new Map();
  for (const item of list) {
    const key = item.file + ":" + item.line + (extraKeyFn ? "|" + extraKeyFn(item) : "");
    if (!map.has(key)) map.set(key, { ...item, pagesAffected: new Set() });
    map.get(key).pagesAffected.add(item.page);
  }
  return [...map.values()].map((v) => ({ ...v, pagesAffected: v.pagesAffected.size, page: undefined }));
}

findings.dynamicUnresolved = dedupeBySite(findings.dynamicUnresolved, (i) => i.expr);
findings.nonCrawlable = dedupeBySite(findings.nonCrawlable, (i) => i.type);
findings.hashOrJsVoid = dedupeBySite(findings.hashOrJsVoid, (i) => i.href);

// ---------------------------------------------------------------------------
// 8b. Page-type classification (used for the commercial-page / cluster audit)
// ---------------------------------------------------------------------------
const CITY_HUB = new Set(["riyadh","jeddah","makkah","madinah","dammam","khobar","jubail","taif","abha","yanbu","alula","neom","tabuk"].map((c) => `/services/${c}`));
const CITY_AIRPORT = new Set(["/abha-airport-taxi-service","/dammam-airport-taxi-service","/jeddah-airport-taxi-service","/madina-airport-taxi-service","/riyadh-airport-taxi-service","/taif-airport-taxi-service"]);
const CROSS_BORDER_ROUTE = new Set(["/dammam-airport-to-bahrain-taxi-service","/dammam-airport-to-khafji-taxi-service","/dammam-airport-to-qatar-taxi-service","/dammam-airport-to-riyadh-taxi-service","/bahrain-to-dammam-taxi-service","/bahrain-to-riyadh-taxi-service","/qatar-to-riyadh-taxi-service","/qatar-to-dammam-taxi-service","/khafji-to-kuwait-taxi-service","/riyadh-to-bahrain-taxi-service","/dammam-to-kuwait-taxi-service","/kuwait-to-dammam-taxi-service","/kuwait-to-riyadh-taxi-service","/dammam-to-abu-dhabi-taxi-service","/dammam-to-dubai-taxi-service","/dubai-to-dammam-taxi-service","/riyadh-to-dubai-taxi-service","/dubai-to-riyadh-taxi-service"]);
const CROSS_BORDER_HUB = new Set(["/border-crossing","/saudi-arabia-to-bahrain-taxi-service","/saudi-arabia-to-qatar-taxi-service","/saudi-arabia-to-uae-taxi-service","/saudi-arabia-to-jordan-land-transfer"]);
const DOMESTIC_ROUTE = new Set(["/jeddah-to-makkah-taxi-service","/makkah-to-madinah-taxi-service"]);
const ROUTE_GUIDE = new Set(["/jeddah-to-makkah-guide","/makkah-to-madinah-guide","/riyadh-to-dammam-guide"]);
const SERVICE = new Set(["/airport-transfers","/airport-transfer-for-umrah","/hotel-transfers","/private-taxi","/umrah-taxi-services","/umrah-transport-package","/ziyarat-services-in-saudi-arabia","/corporate-transportation-services","/wedding-transportation","/school-buses-services","/educational-tours-transport","/our-services","/services"]);
const TOUR = new Set(["/jeddah-city-tour-services-in-saudi-arabia","/reliable-alula-tour-taxi-service-in-saudi-arabia","/taif-ziyarat-taxi-service"]);
const SERVICE_GUIDE_DUP = new Set(["/jeddah-airport-taxi-guide","/madinah-umrah-taxi-guide","/makkah-umrah-taxi-guide"]);
const LEGAL = new Set(["/privacy-policy","/terms-conditions"]);
const UTILITY = new Set(["/book-online","/quote","/contact-us","/contact","/about","/about-us","/fleet","/faqs","/testimonials","/our-gallery","/prices","/cart","/checkout","/my-account","/pay-online","/thank-you"]);

function classifyPageType(route) {
  if (route === "/") return "home";
  if (route.startsWith("/ar")) return "arabic";
  if (route.startsWith("/blog")) return "blog";
  if (route.startsWith("/guides/")) return "guide";
  if (CITY_HUB.has(route)) return "destination (city hub)";
  if (CITY_AIRPORT.has(route)) return "destination (city airport)";
  if (CROSS_BORDER_ROUTE.has(route)) return "service (cross-border route)";
  if (CROSS_BORDER_HUB.has(route)) return "service (cross-border hub)";
  if (DOMESTIC_ROUTE.has(route)) return "service (domestic route)";
  if (ROUTE_GUIDE.has(route)) return "service (route guide, duplicate content)";
  if (SERVICE.has(route)) return "service";
  if (TOUR.has(route)) return "service (tour)";
  if (SERVICE_GUIDE_DUP.has(route)) return "service (guide, duplicate content)";
  if (LEGAL.has(route)) return "legal";
  if (UTILITY.has(route)) return "utility";
  return "other";
}
const COMMERCIAL_TYPES = new Set(["destination (city hub)","destination (city airport)","service (cross-border route)","service (cross-border hub)","service (domestic route)","service (route guide, duplicate content)","service","service (tour)","service (guide, duplicate content)"]);

const pageInventory = pages.map((p) => {
  const type = classifyPageType(p.route);
  const inbound = graph[p.route]?.inbound || [];
  const contextualInbound = inbound.filter((l) => l.section === "contextual");
  const navFooterOnly = inbound.length > 0 && contextualInbound.length === 0;
  // Nav/footer links render on every page via shared chrome, so raw inbound
  // counts for those sections multiply by ~109 pages — not a meaningful
  // number on its own. Count distinct (file:line) placements instead, i.e.
  // "linked from N spots in the sitewide nav/footer", which is what an
  // editor would actually act on.
  const navFooterSites = new Set(
    inbound.filter((l) => l.section === "nav" || l.section === "footer").map((l) => `${l.file}:${l.line}`)
  );
  return {
    route: p.route,
    file: path.relative(ROOT, p.file),
    type,
    commercial: COMMERCIAL_TYPES.has(type),
    depth: depth[p.route] ?? null,
    inboundTotal: inbound.length,
    contextualInboundCount: contextualInbound.length,
    navFooterPlacements: navFooterSites.size,
    outboundCount: graph[p.route]?.outbound.length ?? 0,
    orphan: inbound.length === 0,
    nearOrphan: navFooterOnly,
  };
});

const orphans = pageInventory.filter((p) => p.orphan && p.route !== "/");
const nearOrphans = pageInventory.filter((p) => p.nearOrphan);
const deepCommercial = pageInventory.filter((p) => p.commercial && (p.depth === null || p.depth >= 4));
const contextualCountsCommercial = pageInventory
  .filter((p) => p.commercial)
  .map((p) => ({ route: p.route, contextualInboundCount: p.contextualInboundCount }))
  .sort((a, b) => a.contextualInboundCount - b.contextualInboundCount);
const heavyLinkPages = pageInventory.filter((p) => p.outboundCount > 150);

// ---------------------------------------------------------------------------
// 8c. Anchor text audit — grouped by destination
// ---------------------------------------------------------------------------
const GENERIC_ANCHORS = new Set([
  "click here", "read more", "learn more", "here", "more info", "more information", "read",
  "view more", "see more", "view details", "book now", "explore", "find out more",
  "get started", "continue",
]);
// Trailing decorative glyphs (arrows, chevrons, dashes) that sit after the
// visible CTA text and must not defeat an otherwise-exact generic-phrase match.
const TRAILING_DECORATION = /[\s→›»➜➔↗↦›»\-–—>*]+$/;
const anchorsByDest = {};
for (const route of Object.keys(graph)) {
  const inboundContextual = graph[route].inbound.filter((l) => l.section === "contextual" && l.anchorText);
  if (!inboundContextual.length) continue;
  anchorsByDest[route] = inboundContextual.map((l) => ({ anchorText: l.anchorText, from: l.from, file: l.file, line: l.line }));
}
const genericAnchorInstances = [];
const bareUrlAnchorInstances = [];
const overusedExactAnchors = [];
for (const [route, list] of Object.entries(anchorsByDest)) {
  const byExact = {};
  for (const a of list) {
    const norm = (a.anchorText || "").trim().toLowerCase().replace(TRAILING_DECORATION, "").trim();
    // Anchor text that is entirely a decorative glyph/arrow with no words at all.
    const isBareIcon = norm === "" && (a.anchorText || "").trim() !== "";
    if (GENERIC_ANCHORS.has(norm) || isBareIcon) genericAnchorInstances.push({ dest: route, ...a });
    if (/^https?:\/\//.test(a.anchorText || "") || /^\/[\w-]/.test((a.anchorText || "").trim())) bareUrlAnchorInstances.push({ dest: route, ...a });
    byExact[norm] = (byExact[norm] || 0) + 1;
  }
  for (const [anchor, count] of Object.entries(byExact)) {
    if (count > 8) overusedExactAnchors.push({ dest: route, anchor, count });
  }
}
const emptyAltLinkedImages = [];
for (const pr of pageResults) {
  for (const link of pr.links) {
    if (link.hasImage && link.imgAltEmpty) {
      emptyAltLinkedImages.push({ page: pr.route, file: link.file, line: link.line });
    }
  }
}

// ---------------------------------------------------------------------------
// 9. Write outputs
// ---------------------------------------------------------------------------
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const noindexRoutes = pageResults.filter((p) => p.noindex).map((p) => p.route);
const linkedNoindexRoutes = noindexRoutes.filter((r) => (graph[r]?.inbound.length || 0) > 0);

const output = {
  generatedAt: new Date(0).toISOString().slice(0, 10) + " (build-time; run script to refresh)",
  baseUrl: BASE_URL,
  totalPublicPages: pages.length,
  routes: pages.map((p) => p.route),
  noindexRoutes,
  linkedNoindexRoutes,
  depth,
  graph,
  findings,
  pageInventory,
  orphans,
  nearOrphans,
  deepCommercial,
  contextualCountsCommercial,
  heavyLinkPages,
  anchorsByDest,
  genericAnchorInstances,
  bareUrlAnchorInstances,
  overusedExactAnchors,
  emptyAltLinkedImages,
};

fs.writeFileSync(path.join(OUT_DIR, "link-graph.json"), JSON.stringify(output, null, 2));

console.log("Pages:", pages.length);
console.log("Broken links:", findings.brokenLinks.length);
console.log("Redirect-triggering links:", findings.redirectLinks.length);
console.log("Hash/js-void links:", findings.hashOrJsVoid.length);
console.log("Non-crawlable nav elements:", findings.nonCrawlable.length);
console.log("Dynamic/unresolved hrefs:", findings.dynamicUnresolved.length);
console.log("Max depth:", Math.max(...Object.values(depth)));
console.log("Unreached (no depth found):", pages.length - Object.keys(depth).length);
console.log("Orphans:", orphans.length);
console.log("Near-orphans (nav/footer only):", nearOrphans.length);
console.log("Commercial pages at depth >=4 or unreached:", deepCommercial.length);
console.log("Pages with >150 crawlable internal links:", heavyLinkPages.length);
console.log("Generic anchor instances:", genericAnchorInstances.length);
console.log("Bare-URL anchor instances:", bareUrlAnchorInstances.length);
console.log("Overused exact-match anchors (>8x to same dest):", overusedExactAnchors.length);
console.log("Linked images with empty alt:", emptyAltLinkedImages.length);
console.log("\nWrote seo-audit/link-graph.json");
