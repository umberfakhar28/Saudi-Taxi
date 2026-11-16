/**
 * Personal details handed from the homepage search bar to /book-online
 * WITHOUT putting them in the URL.
 *
 * Why: Google Analytics records every page's full address. HeroSearchBar's
 * second step used to send the customer's name, email and note as
 * /book-online?name=…&email=…&notes=…, so each of those page views carried
 * personal data into GA — which Google's terms forbid and can get a
 * property's data deleted. (Found during the Nov 2026 tracking audit,
 * docs/perf/perf-report.md.)
 *
 * The trip itself (mode, from, to, date, …) still travels in the URL as
 * before. The personal fields go through sessionStorage, which belongs to
 * this tab only and is read once. If storage is unavailable (some private
 * modes), the search bar falls back to the URL and /book-online then removes
 * them from the address bar straight away.
 */

/** Query parameters that identify a person and must not stay in a URL. */
export const PERSONAL_PARAMS = ['name', 'email', 'phone', 'notes'] as const;

export interface PersonalPrefill {
  name?: string;
  email?: string;
  notes?: string;
}

const KEY = 'gts_booking_prefill';

/** Store the details for the next /book-online view. False if storage is unavailable. */
export function stashPersonalPrefill(data: PersonalPrefill): boolean {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

/** Read the stored details once (they are removed as they are read). */
export function takePersonalPrefill(): PersonalPrefill {
  try {
    const raw = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? (parsed as PersonalPrefill) : {};
  } catch {
    return {};
  }
}

/**
 * Remove personal parameters from the address bar, keeping everything else
 * (and the page) as it is. Runs before analytics has loaded on a fresh page,
 * so the recorded page address never contains them.
 */
export function stripPersonalParamsFromAddressBar(): void {
  try {
    const url = new URL(window.location.href);
    let changed = false;
    for (const p of PERSONAL_PARAMS) {
      if (url.searchParams.has(p)) {
        url.searchParams.delete(p);
        changed = true;
      }
    }
    if (changed) window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
  } catch {
    // Never let this get in the way of the booking form.
  }
}
