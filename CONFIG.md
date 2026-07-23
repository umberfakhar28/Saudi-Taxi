# Business configuration files

Typed config files that hold values a non-developer might need to change
(contact numbers, wait times, policies, fleet capacity, pricing). Import
these instead of hardcoding values in page/component files.

## `src/lib/contact.ts`

Single source of truth for the site's phone/WhatsApp number and email.

| Export | Value | Used for |
|---|---|---|
| `WHATSAPP_NUMBER` | `"923268869669"` | Digits only, for `wa.me/` links |
| `PHONE_E164` | `"+923268869669"` | `tel:` links |
| `PHONE_DISPLAY` | `"+92 326 8869669"` | On-screen display text |
| `EMAIL` | `"info@gulftripservice.com"` | `mailto:` links |
| `WHATSAPP_URL` | derived | Base WhatsApp link |
| `TEL_URL` | derived | Base tel link |
| `waLink(message)` | function | Builds a `wa.me` link with a URL-encoded pre-filled message |

This file is the only place the business phone/WhatsApp number should be
edited — every page/component that imports from it updates automatically.

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
