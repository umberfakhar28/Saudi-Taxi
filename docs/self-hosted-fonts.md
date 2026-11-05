# Self-hosted fonts — provenance and measurements

Recorded 2026-11-05, when the site moved from `next/font/google` to
`next/font/local`.

## Why

Every production build fetched Plus Jakarta Sans and Inter from Google at
build time. Google's CSS API intermittently answers with its dynamic slice
URLs (`https://fonts.gstatic.com/l/font?kit=...`) instead of static paths, and
those carry their own query string. Turbopack embeds the font URL inside its
own query and then asserts the request has exactly one query, so the inner
`?` makes the module unresolvable:

```
Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'
next/font/google queries have exactly one entry
```

16 errors, build exits 1, deploy never lands. It killed the Vercel builds for
`87e2b75` and `ccffc1a` on 2026-11-05.

The trigger is intermittent but the failure is not: when Google returns the
slice form, that build cannot succeed however many times it is retried. Only
Plus Jakarta Sans was ever hit, because it was requested with four discrete
weights while Inter was requested as one variable range.

## Files and where they came from

| File | Source | Version |
|---|---|---|
| `src/app/fonts/PlusJakartaSans-Variable.woff2` | [`Tokotype/PlusJakartaSans`](https://github.com/Tokotype/PlusJakartaSans) → `fonts/webfonts/PlusJakartaSans[wght].woff2` | 2.071 (`gftools[0.9.30]`) |
| `src/app/fonts/InterVariable.woff2` | [`rsms/inter`](https://github.com/rsms/inter) → `docs/font-files/InterVariable.woff2` | 4.001 (`git-9221beed3`) |

Both are the designers' own upstream repositories, and both are the upstream
that Google Fonts itself tracks — `google/fonts/ofl/plusjakartasans` and
`google/fonts/ofl/inter` carry `upstream_info.md` pointing at them. Licences:
Plus Jakarta Sans and Inter are both OFL.

Note that `googlefonts/plus-jakarta-sans` does not exist; the font is
Tokotype's.

## Measurements against what Google was serving

Both downloads were parsed and compared against the exact files the previous
build had fetched from `fonts.gstatic.com` (the latin slices under
`.next/static/media/`). Layout-critical metrics:

| | PJS, Google | PJS, upstream | Inter, Google | Inter, upstream |
|---|---|---|---|---|
| version | 2.071 | **2.071** | 4.001 | **4.001** |
| unitsPerEm | 1000 | **1000** | 2048 | **2048** |
| hhea asc / desc / gap | 1038 / −222 / 0 | **same** | 1984 / −494 / 0 | **same** |
| OS/2 typo asc / desc / gap | 1038 / −222 / 0 | **same** | 1984 / −494 / 0 | **same** |
| cap height | 745 | **745** | 1490 | **1490** |
| x-height | 536 | **536** | 1118 | **1118** |
| wght axis | 200–800 | **200–800** | 100–900 | **100–900** |

Everything that determines line box height, text size and weight mapping is
identical. Plus Jakarta Sans is the same build as Google's, differing only in
subsetting (60 KB full charset vs Google's 27 KB latin slice).

Two differences on Inter, both handled:

- **An extra `opsz` axis, 14–32.** Google's build exposes `wght` only, with
  `opsz` pinned at its default. `font-optical-sizing` defaults to `auto`, so
  without intervention the browser would drive `opsz` from the font size and
  Inter would get display-like shapes at larger sizes — something Google's
  build could not do. `globals.css` now sets `font-optical-sizing: none` on
  `html`, holding `opsz` at 14. Plus Jakarta Sans has no `opsz` axis.
- **OS/2 winAscent/winDescent** differ (1984/494 vs Google's 2269/660). These
  govern glyph clipping bounds, not layout; the typo and hhea metrics that
  drive line height are identical.

Both files are also a different *commit* of version 4.001 for Inter
(`git-9221beed3` vs Google's `git-66647c0bb`).

## Why no `unicode-range` splitting

`next/font/local`'s `src` entries accept only `path`, `weight` and `style` —
there is no per-file `unicode-range`, and the top-level `declarations` apply
to every rule it generates. Google's 11 subset slices (7 for Inter, 4 for Plus
Jakarta Sans) therefore cannot be reproduced. The full variable fonts are used
instead: one file each, complete charset, 352 KB + 60 KB against the previous
~286 KB of slices.

This trades a little more bytes on first load for no missing glyphs. The
alternative — shipping only Google's latin slice — would have been smaller and
byte-identical, but any character outside Latin-1 (`ü`, `ą`, Vietnamese tone
marks) would have fallen back to Arial mid-word.

## Family names, and the cascade trap this exposed

`next/font/local` derives the CSS family name from the JS variable, so these
calls emit `font-family: inter` and `font-family: plusJakartaSans` — not the
real names `next/font/google` used.

`globals.css` used to declare both variables again at `:root`, with literal
`"Plus Jakarta Sans"` and `"Inter"` names, and it loads after the font CSS, so
on a specificity tie it won. `"Inter"` would still have matched (CSS family
names are ASCII case-insensitive), but `"Plus Jakarta Sans"` would have
matched no `@font-face` and every heading on the site would have quietly
fallen back to Inter.

Those duplicate declarations are gone. The two `localFont()` calls are now the
single source of `--font-heading` and `--font-body`, and the fallback tails
that used to live in the CSS are passed as `fallback` so the variables still
end in `system-ui`/`sans-serif` as before.

## What changed in rendering

Deliberate and expected:

- **`font-weight: 800` on Plus Jakarta Sans now renders as true 800.** The old
  config declared only 400/500/600/700, so an 800 request matched the 700 face.
  The axis really runs to 800, so declaring `200 800` maps weights correctly.
  Affects `.guide-content .step-number` (`globals.css`) and
  `src/app/border-crossing/page.tsx:176,179` — the only public places where
  weight 800 meets `--font-heading`. The admin portal uses its own
  `matterFont` and is unaffected, and weight 800 on Inter already rendered as
  800 because Inter was always declared `100 900`.
- **Fallback metric overrides shifted slightly**, because Next now computes
  them from the files rather than from its bundled metrics table for Google
  fonts: Inter 90.44/22.52/107.12% → 89.79/22.36/107.89%, Plus Jakarta Sans
  98.88/21.15/104.98% → 98.16/20.99/105.75%. These only size the Arial
  fallback shown before the webfont loads, so the effect is a marginally
  different pre-load frame.

## Not verified

No pixel comparison was done. There is no browser automation in this project
(no Playwright, no Puppeteer), so rendering was verified structurally — font
files emitted and resolvable, preload links correct, CSS variables resolving
to a declared `@font-face`, no Google host in any served artifact — and by the
metric table above, not by looking at the pages. **Headings, body text and
weight contrast on a real page are still worth a human glance**, in both
English and Arabic, on mobile and desktop.

Arabic is the lowest-risk part: `globals.css` gives `[dir="rtl"]` its own
stack (`"Segoe UI", Tahoma, "Noto Sans Arabic", Arial`), because neither Inter
nor Plus Jakarta Sans has Arabic coverage. Neither font change touches it.
