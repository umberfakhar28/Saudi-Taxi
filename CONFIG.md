# Business configuration files

Typed config files that hold values a non-developer might need to change
(contact numbers, wait times, policies, fleet capacity, pricing). Import
these instead of hardcoding values in page/component files.

## `src/lib/contact.ts`

Single source of truth for the site's WhatsApp number and email. Since
15 Nov 2026 the site offers **no phone calls**: there are no `tel:` links,
only WhatsApp, email and the booking/quote forms.

| Export | Value | Used for |
|---|---|---|
| `WHATSAPP_NUMBER` | `"966547721168"` | Digits only, for `wa.me/` links |
| `PHONE_E164` | `"+966547721168"` (derived) | schema.org `telephone` / `contactPoint` |
| `PHONE_DISPLAY` | `"+966 54 772 1168"` | On-screen display text |
| `EMAIL` | `"info@gulftripservice.com"` | `mailto:` links |
| `WHATSAPP_URL` | derived | Base WhatsApp link |
| `waLink(message)` | function | Builds a `wa.me` link with a URL-encoded pre-filled message |

This file is the only place the business WhatsApp number should be edited
(`WHATSAPP_NUMBER` and `PHONE_DISPLAY`) — every page, component, email,
invoice PDF and the JSON-LD update automatically. The `content/*.html` guides
write `{{WHATSAPP_URL}}` / `{{PHONE_DISPLAY}}`, which `readContentFile`
(`src/lib/readContent.ts`) fills in from here. Saved quote notes are data,
not code: a number written into one stays as written (see migration 011).

## `src/lib/airportTransferConfig.ts`

| Export | Value | Meaning |
|---|---|---|
| `AIRPORT_WAIT_TIMES.airportFreeWaitMinutes` | `60` | Free wait after an airport flight lands |
| `AIRPORT_WAIT_TIMES.nonAirportFreeWaitMinutes` | `15` | Free wait for hotel/city pickups |
| `AIRPORT_POLICIES.freeCancellationHours` | `24` | Free cancellation window before pickup |
| `AIRPORT_POLICIES.freeChangesNote` | text | Displayed policy copy |
| `AIRPORT_POLICIES.fixedFareNote` | text | Displayed policy copy |
| `AIRPORT_PRICING_ENABLED` | `false` **(PLACEHOLDER — see below)** | Feature flag gating price display |

### ⚠️ PRICING PLACEHOLDER — flagged, not real

`AIRPORT_PRICING_ENABLED` is `false`. Real per-route/per-vehicle rates are
not yet available. While it's `false`:
- The `BookingWidget` and `RoutesGrid` components show **"Get instant quote
  on WhatsApp"** instead of a price on every vehicle/route card.
- No placeholder numeric price is ever rendered to a visitor.

**To go live with real pricing:** create `src/lib/airportRatesConfig.ts`
with confirmed per-airport, per-destination, per-vehicle-tier rates, wire it
into `BookingWidget`/`RoutesGrid`, then flip `AIRPORT_PRICING_ENABLED` to
`true`. That rates file does not exist yet — do not fabricate numbers into
it without the owner's confirmed rate card.

## `src/lib/fleetConfig.ts`

`FLEET_TIERS`: Sedan / SUV / Van / Luxury, each with `maxPassengers`,
`maxLuggage`, `image`, `models` (example car names), `description`. Used by
`BookingWidget` to render vehicle option cards with capacity icons.

Note: this is a **new** shared shape — it did not exist before. The site
previously had two other, differently-shaped vehicle arrays
(`VehiclesSection.tsx` — named real car models, no capacity fields; and a
local array in `quote/page.tsx` — free-text capacity, no distinct luggage
field). Neither was reused/modified; this file is additive.

No dedicated "luxury" vehicle photo exists in `/public/images` yet — the
Luxury tier currently reuses `fleet-sedan2.jpg` (the same image
`VehiclesSection.tsx` already tags "Premium"). Replace with a real photo
when available.

## `src/lib/airportRoutesData.ts`

`AIRPORT_ROUTES`: route, travel time, distance, available vehicle tiers,
and an optional `href` to an existing dedicated route/tour page. `AIRPORTS`:
per-airport intro copy and related internal links.

## `src/lib/airportFaqs.ts`

`AIRPORT_FAQS`: 8–10 `{ q, a }` pairs specific to airport transfers, feeding
both the visible FAQ accordion and the `FAQPage` JSON-LD schema on
`/airport-transfers` (single source, no duplicated/hand-synced schema copy).
