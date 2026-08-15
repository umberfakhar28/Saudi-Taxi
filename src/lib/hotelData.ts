import type { HotelData } from "@/components/HotelPage";

/**
 * Hotel / Accommodation Transfer page family — data layer (Phase 5).
 *
 * Deliberately empty. No hotel currently has a live page on this site (no
 * `/hotels/[city]/[hotel]` route exists, and none is created in this
 * phase — see HotelPage.tsx's file header for why). This file exists so
 * the template can be typechecked and exercised in isolation, and so a
 * future phase can populate real, researched hotel entries and add the
 * route file without having to design the data shape from scratch.
 *
 * When that phase starts:
 * 1. Add entries here, one per real hotel, following the `HotelData` shape.
 * 2. Create `src/app/hotels/[city]/[hotel]/page.tsx` (or a flatter route,
 *    matching however the rest of the site's URL conventions are decided)
 *    reading from this array.
 * 3. Only ever use verified hotel facts (see HotelData's field comments —
 *    no invented star ratings, room counts, or distances).
 */

export const allHotels: HotelData[] = [];

export function getHotel(slug: string): HotelData | undefined {
  return allHotels.find((h) => h.slug === slug);
}

export function hotelsForCity(citySlug: string): HotelData[] {
  return allHotels.filter((h) => h.citySlug === citySlug);
}
