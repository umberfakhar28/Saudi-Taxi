# Backlog: Arabic pages render `<html lang="en">`

Recorded 2026-11-05. **Not actioned** — deliberately deferred by the owner.

## What the markup does today

Every page under `/ar/` serves:

```html
<html lang="en">
  ...
  <div dir="rtl" lang="ar">   <!-- src/app/ar/layout.tsx -->
    ... the whole Arabic page ...
  </div>
```

`dir="rtl"` and `lang="ar"` are correct, but they sit on an inner wrapper
`<div>` instead of the root element. The `<html>` element still claims the
page is English.

## Why it is like this

`src/app/layout.tsx` owns the `<html>` tag, and a nested App Router layout
cannot change the element a parent layout rendered. `src/app/ar/layout.tsx`
therefore does the next best thing and declares the language and direction on
the outermost element it does own.

## What it does and does not break

Not broken — this is why it has never shown up as a visible bug:

- **Rendering.** `dir="rtl"` inherits down the tree, so the Arabic pages lay
  out right-to-left correctly.
- **Screen readers.** `lang="ar"` on the wrapper is valid HTML and switches
  the voice for everything inside it.
- **hreflang.** Emitted from page metadata, not from `<html lang>`, and
  verified correct: `/ar/qatar-to-riyadh-taxi-service` serves a reciprocal
  en / ar / x-default trio.

Worth fixing:

- A crawler reading `<html lang>` as the page language sees "en" on an Arabic
  page, which contradicts the `hreflang="ar"` annotation pointing at it.
- Browser translation prompts and `:lang()` CSS selectors key off the root
  element.

Impact is real but second-order: the hreflang pair, not `<html lang>`, is the
primary signal, and it is already right.

## What a fix needs

The root layout has to learn the locale and emit `<html lang="ar" dir="rtl">`
for `/ar/` paths. Options, cheapest first:

1. Read the pathname in the root layout and set the attributes from it.
2. Move `/ar/` under a route group with its own root layout, e.g.
   `src/app/(ar)/ar/`, so the Arabic tree owns its own `<html>`.
3. Adopt a locale segment (`/[locale]/`) with one layout for both languages —
   the standard pattern, and the largest change. It would also move every
   English URL, so it is only worth considering alongside a wider i18n
   migration.

## Why it was not done in this task

Option 1 and 2 both touch the root layout, which wraps all 203 pages. The
risk is not the attribute itself but the regression surface: every page's
fonts, metadata, analytics mount point and global CSS hang off that layout.
It needs its own change with its own full verification pass, not a line
appended to a distance-mapping fix.

Related: the Arabic copy awaiting native review is tracked separately.
