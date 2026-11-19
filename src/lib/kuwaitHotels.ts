/**
 * Hotels shown as cards on the Kuwait pages (Riyadh to Kuwait, in both
 * languages, and the Kuwait City hub).
 *
 * Cards only, no hotel pages: no hotel search appears in Search Console
 * for the Kuwait cluster, and a page per hotel would differ mostly by the
 * name (docs/seo/kuwait/keyword-map.md, §6). No photos, logos or
 * partnership claims.
 *
 * Areas were checked against public listings in November 2026. Times from
 * Kuwait International Airport come from map routing (OSRM) to the area,
 * widened to a range for traffic. The St. Regis and Arabella Beach were
 * left out: their exact areas could not be confirmed.
 */
export interface KuwaitHotel {
    name: string;
    area: string;
    type: string;
    /** Approximate drive from Kuwait International Airport. */
    fromAirport: string;
}

export const KUWAIT_HOTELS: KuwaitHotel[] = [
    { name: "Four Seasons Hotel Kuwait at Burj Alshaya", area: "Sharq, Kuwait City", type: "Luxury", fromAirport: "About 25–35 min" },
    { name: "JW Marriott Kuwait City", area: "Kuwait City centre", type: "Business", fromAirport: "About 25–35 min" },
    { name: "Waldorf Astoria Kuwait", area: "Al Rai, at The Avenues", type: "Luxury", fromAirport: "About 20–30 min" },
    { name: "Hilton Garden Inn Kuwait", area: "Al Rai, near The Avenues", type: "Mid-range", fromAirport: "About 20–30 min" },
    { name: "Crowne Plaza Kuwait Al Thuraya City", area: "Farwaniya, near the airport", type: "Business & family", fromAirport: "About 15–20 min" },
    { name: "Jumeirah Messilah Beach", area: "Messilah, on the coast", type: "Beach resort", fromAirport: "About 25–30 min" },
];

/** The same hotels for the Arabic page. Hotel names stay as the hotels
 *  write them; area, type and time are in Arabic. */
export const KUWAIT_HOTELS_AR: KuwaitHotel[] = [
    { name: "Four Seasons Hotel Kuwait at Burj Alshaya", area: "شرق، مدينة الكويت", type: "فاخر", fromAirport: "نحو 25–35 دقيقة" },
    { name: "JW Marriott Kuwait City", area: "وسط مدينة الكويت", type: "أعمال", fromAirport: "نحو 25–35 دقيقة" },
    { name: "Waldorf Astoria Kuwait", area: "الري، بجوار الأفنيوز", type: "فاخر", fromAirport: "نحو 20–30 دقيقة" },
    { name: "Hilton Garden Inn Kuwait", area: "الري، قرب الأفنيوز", type: "متوسط", fromAirport: "نحو 20–30 دقيقة" },
    { name: "Crowne Plaza Kuwait Al Thuraya City", area: "الفروانية، قرب المطار", type: "أعمال وعائلات", fromAirport: "نحو 15–20 دقيقة" },
    { name: "Jumeirah Messilah Beach", area: "المسيلة، على الساحل", type: "منتجع شاطئي", fromAirport: "نحو 25–30 دقيقة" },
];
