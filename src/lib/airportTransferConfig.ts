/**
 * Business values for airport-transfer features (wait times, policies,
 * pricing feature flag). Keep all "magic numbers" here — see CONFIG.md.
 */

export const AIRPORT_WAIT_TIMES = {
  /** Free waiting time after an airport flight lands, in minutes. */
  airportFreeWaitMinutes: 60,
  /** Free waiting time for non-airport (hotel/city) pickups, in minutes. */
  nonAirportFreeWaitMinutes: 15,
} as const;

export const AIRPORT_POLICIES = {
  freeCancellationHours: 24,
  freeChangesNote: "Free changes to your booking, subject to vehicle availability.",
  fixedFareNote: "All-inclusive fixed fares — tolls, waiting time, and taxes included. No surge pricing, no hidden fees.",
} as const;

/**
 * PRICING_PENDING: real per-route/per-vehicle rates are not yet available.
 * While this flag is false, the booking widget and route cards must NEVER
 * display a placeholder price — they show a "Get instant quote on WhatsApp"
 * CTA instead. Flip to true once src/lib/airportRatesConfig.ts is filled
 * with confirmed rates.
 */
export const AIRPORT_PRICING_ENABLED = false;
