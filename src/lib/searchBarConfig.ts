/**
 * Config for the homepage multi-mode search bar (Homepage Hero + Multi-Mode
 * Search addendum). Duration options live here rather than hardcoded in the
 * component per the spec's own instruction — a fleet/ops change to what
 * durations are offered shouldn't require touching component code.
 */
export interface DurationOption {
  value: string;
  label: string;
}

export const HOURLY_DURATIONS: DurationOption[] = [
  { value: "2", label: "2 hours" },
  { value: "4", label: "4 hours" },
  { value: "6", label: "6 hours" },
  { value: "8", label: "8 hours" },
  { value: "12", label: "12 hours" },
  { value: "full-day", label: "Full day (12h+)" },
];

export const DEFAULT_PASSENGERS = 2;
export const DEFAULT_LUGGAGE = 2;
export const MAX_PASSENGERS = 10;
export const MAX_LUGGAGE = 10;
/** Above these counts we surface a quiet "you may need a van" hint rather
 * than an error — thresholds match FLEET_TIERS' SUV capacity (5 passengers /
 * 4 luggage, see src/lib/fleetConfig.ts), so anything beyond that is where a
 * van genuinely becomes the right vehicle, not an arbitrary cutoff. */
export const VAN_HINT_THRESHOLD_PASSENGERS = 6;
export const VAN_HINT_THRESHOLD_LUGGAGE = 5;
