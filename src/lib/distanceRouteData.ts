/**
 * The /distance/* pages: one record per city pair, and the only place each
 * pair's figures are written down (docs/seo/distance/distance-audit.md).
 *
 * Figures. Every distance and driving time was checked against map routing
 * (OpenStreetMap / OSRM, city centre to city centre, 19–20 Nov 2026) and
 * matches the route pages for the same pair. `drive` is driving only;
 * `withBorder` adds the crossing. Riyadh–Kuwait uses the owner's figure
 * (648 km, 19 Nov 2026), not the router's 716 km.
 *
 * Fares are never written here. `fareRoute` names the route page whose
 * confirmed fare applies in both directions, and the page reads the fare
 * from that route's own data (lib/distanceFare.ts). Copy writes {{fare}}
 * (or {{fareAr}} in Arabic) for this pair's starting fare, and
 * {{fare:<route-slug>}} for another route's.
 *
 * Copy may carry **bold** and [anchor](/path) links. FAQ answers are kept
 * to about 25 words and are built from the searches each pair receives.
 */
import type { LandingIcon } from "./routeLanding";

export type DistanceRegion = "bahrain" | "qatar" | "kuwait" | "uae" | "saudi";

export interface DistanceBorder {
  name: string;
  /** Where the two posts are. */
  posts: string;
  /** Waiting time, as published on the route pages, or "varies". */
  wait: string;
  documents: string[];
  links: { href: string; label: string }[];
}

export interface DistanceRouteData {
  slug: string;
  origin: string;
  destination: string;
  region: DistanceRegion;
  breadcrumbLabel: string;
  /** ≤ 60 characters, used without the brand suffix. */
  title: string;
  /** ≤ 155 characters. */
  meta: string;

  /** Road distance, city centre to city centre, rounded. */
  km: number;
  straightKm?: number;
  /** Driving time only, e.g. "about 4.5 hours". */
  drive: string;
  /** Door to door including the border, for cross-border pairs. */
  withBorder?: string;
  /** Main roads, one short phrase. */
  highways: string;
  border?: DistanceBorder;

  /** Route pages for this pair, matched on origin and destination. */
  routeForward?: { href: string; label: string };
  routeReverse?: { href: string; label: string };
  /** Route page slug whose confirmed fare applies to both directions. */
  fareRoute?: string;

  routeIntro: string;
  steps: { title: string; body: string }[];
  altRoute?: string;
  /** Paragraph under the "{B} to {A} Distance by Road" heading. */
  reverse: string;
  options: { option: string; doorToDoor: boolean; time: string; transfers: string; bestFor: string; recommended?: boolean }[];
  tips: { icon: LandingIcon; title: string; body: string }[];
  faqs: { q: string; a: string }[];
  /** For pairs with Arabic searches: one answer line and Arabic FAQs. */
  arabic?: { answer: string; faqs: { q: string; a: string }[] };
  table?: { heading: string; intro: string; head: string[]; rows: string[][]; note?: string };

  /** Three short points for the distance card on /distance. */
  transferBenefits: string[];
  relatedDistanceSlugs: string[];
  /** City pages and other relevant pages (route pages come from routeForward/Reverse). */
  relatedLinks: { href: string; label: string }[];

  /** How the figures were checked. */
  source: string;
  verified: string;
}

/* ── Shared border facts ──────────────────────────────────────── */

const PASSPORT = "A passport valid for at least 6 months";
const GCC_ID = "GCC citizens: the national ID card is usually enough";
const IQAMA = "Saudi residents: a valid Iqama and an exit and re-entry visa";

const CAUSEWAY: DistanceBorder = {
  name: "King Fahd Causeway",
  posts: "The Saudi and Bahraini passport and customs posts sit on the island halfway across the 25 km causeway.",
  wait: "Usually **45–75 minutes** for the whole crossing, depending on traffic and time of day. Weekends and holidays are busier.",
  documents: [PASSPORT, "A Bahrain eVisa or visa on arrival when entering Bahrain; a Saudi visa when entering Saudi Arabia", GCC_ID, IQAMA],
  links: [
    { href: "/border-crossing", label: "All border crossings" },
    { href: "/saudi-arabia-to-bahrain-taxi-service", label: "Saudi Arabia to Bahrain taxi" },
  ],
};

const KHAFJI: DistanceBorder = {
  name: "Al Khafji / Al Nuwaiseeb",
  posts: "The Saudi post is at Al Khafji and the Kuwaiti post at Al Nuwaiseeb, on the coast road.",
  wait: "Usually **30–90 minutes** outside peak times. Thursday and Friday evenings and public holidays can take longer; it varies.",
  documents: [PASSPORT, "A Kuwait visa or eVisa if your nationality needs one", GCC_ID, IQAMA],
  links: [
    { href: "/border-crossing", label: "All border crossings" },
    { href: "/khafji-to-kuwait-taxi-service", label: "The Khafji–Nuwaiseeb crossing" },
    { href: "/guides/saudi-arabia-to-kuwait-by-road", label: "Saudi Arabia to Kuwait by road guide" },
  ],
};

const SALWA: DistanceBorder = {
  name: "Salwa / Abu Samra",
  posts: "The Saudi post is at Salwa and the Qatari post at Abu Samra, about 90 km from Doha.",
  wait: "Typically **30–60 minutes** for both sides outside peak hours; it varies with the day and time.",
  documents: [PASSPORT, "A Qatar visa or visa waiver when entering Qatar; a Saudi visa when entering Saudi Arabia", GCC_ID, IQAMA],
  links: [
    { href: "/border-crossing", label: "All border crossings" },
    { href: "/saudi-arabia-to-qatar-taxi-service", label: "Saudi Arabia to Qatar taxi" },
  ],
};

const BATHA: DistanceBorder = {
  name: "Al Batha / Al Ghuwaifat",
  posts: "The Saudi post is at Al Batha and the UAE post at Al Ghuwaifat, at the western edge of Abu Dhabi emirate.",
  wait: "It **varies** with traffic and time of day, and this is the busiest land crossing on these routes, so allow extra time.",
  documents: [PASSPORT, "A UAE visa or visa on arrival when entering the UAE; a Saudi visa when entering Saudi Arabia", GCC_ID, IQAMA],
  links: [
    { href: "/border-crossing", label: "All border crossings" },
    { href: "/saudi-arabia-to-uae-taxi-service", label: "Saudi Arabia to UAE taxi" },
  ],
};

const OSRM = "OpenStreetMap routing (OSRM), city centre to city centre, 19–20 Nov 2026";

/** Saudi Arabia to Kuwait, from each starting city (shared by the three Kuwait pages). */
const SAUDI_TO_KUWAIT_TABLE: NonNullable<DistanceRouteData["table"]> = {
  heading: "Saudi Arabia to Kuwait by Road: Distance from Each City",
  intro: "All three routes cross at Al Khafji (Saudi) / Al Nuwaiseeb (Kuwait). Driving times exclude the border.",
  head: ["From", "To Kuwait City", "Driving time", "Private taxi"],
  rows: [
    ["Riyadh", "~648 km", "~7 h 40 min", "Starting from {{fare:riyadh-to-kuwait-taxi-service}}"],
    ["Dammam", "~410 km", "~4.5 h", "Quote on WhatsApp"],
    ["Al Khafji", "~125 km", "~1.5 h", "Quote on WhatsApp"],
  ],
  note: "Road distances to central Kuwait City. Figures are estimates; border time varies with the day and hour.",
};

/** Saudi Arabia to Bahrain, from each starting city (Bahrain pages). */
const SAUDI_TO_BAHRAIN_TABLE: NonNullable<DistanceRouteData["table"]> = {
  heading: "Saudi Arabia to Bahrain by Road: Distance from Each City",
  intro: "Every route crosses the King Fahd Causeway from Al Khobar. Times are driving only; add 45–75 minutes for the crossing.",
  head: ["From", "To Manama", "Driving time", "Private taxi"],
  rows: [
    ["Al Khobar", "~50 km", "~45 min", "Quote on WhatsApp"],
    ["Dammam", "~65 km", "~1 h", "Quote on WhatsApp"],
    ["Jubail", "~150 km", "~2 h", "Quote on WhatsApp"],
    ["Al-Ahsa (Hofuf)", "~195 km", "~2.5 h", "Quote on WhatsApp"],
    ["Riyadh", "~470 km", "~4.5 h", "From {{fare:riyadh-to-bahrain-taxi-service}}"],
  ],
  note: "Road distances to central Manama, from map routing. Figures are estimates.",
};

const ROUTE_TAXI = (time: string) => ({ option: "Private taxi (us)", doorToDoor: true, time, transfers: "None", bestFor: "Families, groups, luggage", recommended: true });
const SELF_DRIVE = (time: string, note = "Your own car and paperwork") => ({ option: "Self-drive", doorToDoor: true, time, transfers: note, bestFor: "Confident long-distance drivers" });
const FLIGHT = { option: "Flight", doorToDoor: false, time: "Short in the air, plus airport time at both ends", transfers: "A ride to and from each airport", bestFor: "Solo travellers with light luggage" };

export const distanceRoutes: Record<string, DistanceRouteData> = {
  /* ── Bahrain ──────────────────────────────────────────────────── */
  "bahrain-to-riyadh": {
    slug: "bahrain-to-riyadh", origin: "Bahrain", destination: "Riyadh", region: "bahrain",
    breadcrumbLabel: "Bahrain to Riyadh",
    title: "Bahrain to Riyadh Distance by Road: 470 km & Taxi Fare",
    meta: "Bahrain to Riyadh is about 470 km by road, 4.5–5.5 hrs incl. the King Fahd Causeway. Same distance Riyadh to Bahrain. Private taxi from {{fare}}, 24/7.",
    km: 470, straightKm: 420,
    drive: "about 4.5 hours", withBorder: "4.5–5.5 hours",
    highways: "King Fahd Causeway, Route 95 through Al Khobar, then Highway 40",
    border: CAUSEWAY,
    routeForward: { href: "/bahrain-to-riyadh-taxi-service", label: "Bahrain to Riyadh taxi" },
    routeReverse: { href: "/riyadh-to-bahrain-taxi-service", label: "Riyadh to Bahrain taxi" },
    fareRoute: "riyadh-to-bahrain-taxi-service",
    routeIntro: "The trip is a short causeway crossing followed by a long, straight run west across the Eastern Province. Most of the 470 km is on Highway 40, the main Dammam–Riyadh motorway.",
    steps: [
      { title: "Manama to the causeway", body: "About 20–25 minutes from central Manama on the Sheikh Isa bin Salman Highway to the causeway entry." },
      { title: "King Fahd Causeway", body: "The 25 km bridge, with Bahrain exit and Saudi entry on the island halfway across. You stay in the car." },
      { title: "Al Khobar and Dhahran", body: "Route 95 past Al Khobar and Dhahran to the Highway 40 junction near Dammam." },
      { title: "Highway 40 west", body: "About 390 km of motorway across the desert to Riyadh, with one planned rest stop." },
      { title: "Into Riyadh", body: "Drop-off in Olaya, KAFD, Diriyah, the Diplomatic Quarter or at King Khalid International Airport." },
    ],
    reverse: "Riyadh to Bahrain is the same 470 km in the other direction: Highway 40 east to Dammam, Route 95 to Al Khobar, then the King Fahd Causeway into Manama. Allow 4.5–5.5 hours with the crossing. Our Riyadh to Bahrain taxi also starts from {{fare}} per car.",
    options: [
      ROUTE_TAXI("4.5–5.5 h"),
      SELF_DRIVE("4.5–5.5 h", "Insurance valid in both countries and the causeway toll"),
      { option: "Intercity bus", doorToDoor: false, time: "Longer, fixed timetable", transfers: "Bus station at each end", bestFor: "Low budget" },
      { option: "Train and taxi", doorToDoor: false, time: "Longer, two or more legs", transfers: "Train to Dammam, then a car across the causeway", bestFor: "Travellers who prefer rail" },
      FLIGHT,
    ],
    tips: [
      { icon: "clock", title: "Leave early", body: "Morning departures reach the causeway before the afternoon build-up and Riyadh before evening traffic." },
      { icon: "calendarCheck", title: "Avoid peak causeway days", body: "Thursday evenings, Saturday evenings and the Bahrain Grand Prix weekend are the slowest times to cross." },
      { icon: "fileCheck", title: "Documents in the cabin", body: "Keep passports, GCC IDs or Iqamas to hand, not in the boot; every passenger is checked." },
      { icon: "coffee", title: "One rest stop", body: "A break on Highway 40 for prayer, coffee or fuel splits the drive neatly in two." },
      { icon: "luggage", title: "Tell us your bags", body: "A sedan takes three to four cases; an SUV takes six. We send the right car." },
    ],
    faqs: [
      { q: "How far is Bahrain from Riyadh by road?", a: "About **470 km**, via the King Fahd Causeway and Highway 40. In a straight line it is roughly 420 km." },
      { q: "How far is Riyadh from Bahrain?", a: "The same **470 km** the other way, from Riyadh east on Highway 40 to the causeway and Manama." },
      { q: "How many hours is Bahrain to Riyadh by car?", a: "About **4.5 hours** of driving, or **4.5–5.5 hours** including the causeway crossing, depending on traffic." },
      { q: "Can you drive from Riyadh to Bahrain?", a: "**Yes.** The King Fahd Causeway is open to cars 24 hours; you need insurance valid in Bahrain and pay the causeway toll." },
      { q: "Which border do you cross between Bahrain and Riyadh?", a: "The **King Fahd Causeway**. Both countries' passport posts are on its middle island; you stay in the car." },
      { q: "How much is a taxi from Bahrain to Riyadh?", a: "**From {{fare}}** one way per car, and the same Riyadh to Bahrain. Every vehicle's fare is on the route page." },
      { q: "How far is Bahrain from Saudi Arabia?", a: "Al Khobar is about **50 km** from Manama and Dammam about **65 km**, across the King Fahd Causeway." },
    ],
    arabic: {
      answer: "المسافة من البحرين إلى الرياض بالسيارة نحو 470 كم، والرحلة 4.5 إلى 5.5 ساعات شاملة عبور جسر الملك فهد.",
      faqs: [
        { q: "كم ساعة من البحرين إلى الرياض بالسيارة؟", a: "نحو **4.5 ساعات قيادة**، أو **4.5 إلى 5.5 ساعات** مع عبور جسر الملك فهد حسب الازدحام." },
        { q: "كم المسافة بين الرياض والبحرين بالسيارة؟", a: "نحو **470 كم** عبر الطريق السريع 40 وجسر الملك فهد، والتاكسي الخاص يبدأ من **{{fareAr}}** للسيارة." },
      ],
    },
    table: SAUDI_TO_BAHRAIN_TABLE,
    transferBenefits: ["Same car across the causeway", "From {{fare}} per car", "One rest stop on Highway 40"],
    relatedDistanceSlugs: ["bahrain-to-dammam", "bahrain-to-jubail", "riyadh-to-dammam", "doha-to-riyadh"],
    relatedLinks: [
      { href: "/services/riyadh", label: "Riyadh taxi service" },
      { href: "/destinations/manama", label: "Manama private transfers" },
      { href: "/guides/long-distance-private-transfers", label: "How long-distance transfers work" },
    ],
    source: `${OSRM}: 472 km, 4.6 h (Riyadh–Manama 467 km)`,
    verified: "2026-11-20",
  },

  "bahrain-to-jubail": {
    slug: "bahrain-to-jubail", origin: "Bahrain", destination: "Jubail", region: "bahrain",
    breadcrumbLabel: "Bahrain to Jubail",
    title: "Bahrain to Jubail Distance by Road: 150 km, 2–2.5 hrs",
    meta: "Bahrain to Jubail is about 150 km by road, 2–2.5 hrs incl. the King Fahd Causeway. Same distance Jubail to Bahrain. Private taxi door to door, 24/7.",
    km: 150,
    drive: "about 2 hours", withBorder: "2–2.5 hours",
    highways: "King Fahd Causeway, then the Dhahran–Jubail highway (Route 613)",
    border: CAUSEWAY,
    routeForward: { href: "/bahrain-to-jubail-taxi-service", label: "Bahrain to Jubail taxi" },
    routeIntro: "Jubail sits about an hour north of where most causeway traffic stops. After the crossing, the Dhahran–Jubail highway runs straight up the coast to Jubail Industrial City.",
    steps: [
      { title: "Manama to the causeway", body: "About 20–25 minutes from central Manama to the causeway entry." },
      { title: "King Fahd Causeway", body: "Bahrain exit and Saudi entry on the middle island, in the same car." },
      { title: "Dhahran–Jubail highway", body: "About 85 km north on Route 613, past Dhahran and the Dammam turn-offs." },
      { title: "Jubail", body: "Drop-off in Jubail city, Jubail Industrial City or a Royal Commission site, with gate details agreed in advance." },
    ],
    reverse: "Jubail to Bahrain is the same 150 km the other way: Route 613 south to Al Khobar, then the causeway into Manama. Allow 2–2.5 hours with the crossing. Bahrain International Airport, on Muharraq, is about 165 km from Jubail.",
    options: [
      ROUTE_TAXI("2–2.5 h"),
      SELF_DRIVE("2–2.5 h", "Insurance valid in both countries and the causeway toll"),
      { option: "Bus to Al Khobar, then taxi", doorToDoor: false, time: "Longer", transfers: "Change at Al Khobar", bestFor: "Low budget" },
    ],
    tips: [
      { icon: "briefcase", title: "Site access", body: "For Jubail Industrial City or a contractor camp, share the gate, badge office and contact name when you book." },
      { icon: "clock", title: "Shift-change traffic", body: "The highway is busiest around early-morning and late-afternoon shift changes; we time pickups around them." },
      { icon: "fileCheck", title: "Work documents", body: "Contractors entering Saudi Arabia should carry the visa or Iqama their employer arranged." },
      { icon: "calendarCheck", title: "Weekend causeway queues", body: "Thursday and Saturday evenings are the slowest times to cross." },
    ],
    faqs: [
      { q: "How far is Bahrain from Jubail by road?", a: "About **150 km**, across the King Fahd Causeway and up the Dhahran–Jubail highway." },
      { q: "How far is Jubail to Bahrain?", a: "The same **150 km** the other way. To Bahrain International Airport it is about **165 km**." },
      { q: "How long does Bahrain to Jubail take?", a: "About **2 hours** of driving, or **2–2.5 hours** including the causeway crossing." },
      { q: "Is there a taxi from Jubail to Bahrain?", a: "**Yes.** We drive both ways, door to door. Message us on WhatsApp with your Jubail pickup point." },
      { q: "Do I change cars at the causeway?", a: "**No.** One car and one driver cover the whole trip; passengers show their own documents at both posts." },
      { q: "Can you collect from Jubail Industrial City?", a: "**Yes**, including company camps and Royal Commission sites. Share the gate and contact details when you book." },
    ],
    arabic: {
      answer: "تبعد الجبيل عن البحرين نحو 150 كم براً، والرحلة ساعتان إلى ساعتين ونصف شاملة عبور جسر الملك فهد.",
      faqs: [{ q: "كم تبعد الجبيل عن البحرين؟", a: "نحو **150 كم** عبر جسر الملك فهد وطريق الظهران–الجبيل، أي **ساعتين إلى ساعتين ونصف** تقريباً." }],
    },
    table: SAUDI_TO_BAHRAIN_TABLE,
    transferBenefits: ["Same car across the causeway", "Industrial City and camp pickups", "Timed around shift changes"],
    relatedDistanceSlugs: ["bahrain-to-dammam", "bahrain-to-riyadh", "dammam-to-kuwait"],
    relatedLinks: [
      { href: "/services/jubail", label: "Jubail taxi service" },
      { href: "/bahrain-to-dammam-taxi-service", label: "Bahrain to Dammam taxi" },
      { href: "/saudi-arabia-to-bahrain-taxi-service", label: "Saudi Arabia to Bahrain taxi" },
    ],
    source: `${OSRM}: 156 km, 1.9 h; Jubail to Bahrain airport 166 km`,
    verified: "2026-11-20",
  },

  "bahrain-to-dammam": {
    slug: "bahrain-to-dammam", origin: "Bahrain", destination: "Dammam", region: "bahrain",
    breadcrumbLabel: "Bahrain to Dammam",
    title: "Bahrain to Dammam Distance by Road: 65 km, 1–1.5 hrs",
    meta: "Bahrain to Dammam is about 65 km by road, 1–1.5 hrs incl. the King Fahd Causeway. Same distance Dammam to Bahrain. Private taxi door to door, 24/7.",
    km: 65,
    drive: "about 1 hour", withBorder: "1–1.5 hours",
    highways: "King Fahd Causeway, then Route 95 through Al Khobar",
    border: CAUSEWAY,
    routeForward: { href: "/bahrain-to-dammam-taxi-service", label: "Bahrain to Dammam taxi" },
    routeReverse: { href: "/dammam-airport-to-bahrain-taxi-service", label: "Dammam Airport to Bahrain taxi" },
    routeIntro: "The shortest causeway trip: most of the time goes on the crossing itself. Al Khobar is the first Saudi city after the causeway, and Dammam is about 20 minutes beyond it.",
    steps: [
      { title: "Manama to the causeway", body: "About 20–25 minutes from central Manama." },
      { title: "King Fahd Causeway", body: "The 25 km bridge with both passport posts on the middle island." },
      { title: "Al Khobar", body: "The first stop for many passengers: the corniche, malls and business district." },
      { title: "Dammam", body: "About 25–35 minutes from the causeway to central Dammam, Dhahran or the business districts." },
    ],
    reverse: "Dammam to Bahrain is the same 65 km the other way, across the causeway into Manama in 1–1.5 hours. From King Fahd International Airport (DMM) it is further, about 100 km and 1.5–2.5 hours with the crossing.",
    options: [
      ROUTE_TAXI("1–1.5 h"),
      SELF_DRIVE("1–1.5 h", "Insurance valid in both countries and the causeway toll"),
      { option: "Causeway bus", doorToDoor: false, time: "Fixed timetable", transfers: "Bus station at each end", bestFor: "Low budget, light luggage" },
    ],
    tips: [
      { icon: "clock", title: "Weekday mornings are quickest", body: "Crossings before 10 am on weekdays are usually the fastest." },
      { icon: "calendarCheck", title: "Weekend peaks", body: "Thursday and Saturday evenings and Bahrain holidays bring the longest queues." },
      { icon: "plane", title: "Flying out of Dammam?", body: "From Manama to King Fahd International Airport allow about 2 hours plus your airline's check-in time." },
      { icon: "fileCheck", title: "eVisa in advance", body: "Most visitors get a Bahrain eVisa online; apply at least 48 hours before travel." },
    ],
    faqs: [
      { q: "How far is Bahrain from Dammam?", a: "About **65 km** by road, including the 25 km King Fahd Causeway. Al Khobar is closer, about **50 km**." },
      { q: "Bahrain to Dammam by road: how long?", a: "About **1–1.5 hours** door to door; the crossing usually takes **45–75 minutes** of that." },
      { q: "How far is Dammam Airport from Bahrain?", a: "About **100 km**, so allow **1.5–2.5 hours** with the causeway crossing." },
      { q: "Is the King Fahd Causeway open 24 hours?", a: "**Yes**, around the clock; it is busiest on weekend evenings and holidays." },
      { q: "Do I change cars at the border?", a: "**No.** You stay in the same car; each passenger shows their own passport or GCC ID." },
      { q: "Is there a taxi from Dammam to Bahrain?", a: "**Yes**, door to door in both directions. Send your pickup address and time on WhatsApp." },
    ],
    arabic: {
      answer: "المسافة من البحرين إلى الدمام نحو 65 كم براً، والرحلة ساعة إلى ساعة ونصف شاملة عبور جسر الملك فهد.",
      faqs: [{ q: "كم ساعة من البحرين إلى الدمام؟", a: "نحو **ساعة إلى ساعة ونصف** من الباب إلى الباب، منها **45 إلى 75 دقيقة** لعبور الجسر." }],
    },
    table: SAUDI_TO_BAHRAIN_TABLE,
    transferBenefits: ["Same car across the causeway", "To Dammam, Khobar or Dhahran", "Airport runs to DMM"],
    relatedDistanceSlugs: ["bahrain-to-riyadh", "bahrain-to-jubail", "doha-to-dammam"],
    relatedLinks: [
      { href: "/services/dammam", label: "Dammam taxi service" },
      { href: "/services/khobar", label: "Al Khobar taxi service" },
      { href: "/blog/bahrain-to-dammam-travel-options", label: "Every way to cross the causeway, compared" },
    ],
    source: `${OSRM}: Manama–Dammam 75 km, Manama–Al Khobar 49 km, 0.7–0.9 h; DMM airport–Manama 102 km`,
    verified: "2026-11-20",
  },

  /* ── Kuwait ───────────────────────────────────────────────────── */
  "riyadh-to-kuwait": {
    slug: "riyadh-to-kuwait", origin: "Riyadh", destination: "Kuwait", region: "kuwait",
    breadcrumbLabel: "Riyadh to Kuwait",
    title: "Riyadh to Kuwait Distance by Road: 648 km, 7h 40m, Taxi Fare",
    meta: "Riyadh to Kuwait is about 648 km by road, 7 h 40 min driving via the Al Khafji border. Same distance Kuwait to Riyadh. Private taxi from {{fare}}.",
    km: 648, straightKm: 535,
    drive: "about 7 hours 40 minutes",
    highways: "Routes 65, 550 and 95 in Saudi Arabia, then Route 40 in Kuwait",
    border: KHAFJI,
    routeForward: { href: "/riyadh-to-kuwait-taxi-service", label: "Riyadh to Kuwait taxi" },
    routeReverse: { href: "/kuwait-to-riyadh-taxi-service", label: "Kuwait to Riyadh taxi" },
    fareRoute: "riyadh-to-kuwait-taxi-service",
    routeIntro: "The usual road runs north-east from Riyadh to the Gulf coast and crosses into Kuwait at Al Khafji / Al Nuwaiseeb. The coastal road has more towns and services than the inland alternative.",
    steps: [
      { title: "Riyadh", body: "Pickup in Olaya, KAFD, the Diplomatic Quarter or at King Khalid International Airport." },
      { title: "Routes 65 and 550", body: "The long desert stretch north-east out of Riyadh towards the coast." },
      { title: "Rest stop", body: "A planned break for prayer, coffee or fuel." },
      { title: "Route 95 to Al Khafji", body: "Up the Gulf coast to Al Khafji, the last Saudi town before Kuwait." },
      { title: "Al Nuwaiseeb into Kuwait", body: "Saudi exit and Kuwait entry, then Route 40 north to Kuwait City." },
    ],
    altRoute: "The inland crossing at Al Ruqi'i / Al Salmi, near Hafar Al Batin, is longer and emptier from Riyadh; we use it only when it suits your pickup or the conditions on the day.",
    reverse: "Kuwait to Riyadh is the same road the other way: about 648 km via Al Nuwaiseeb / Al Khafji, Route 40 in Kuwait and then Routes 95, 550 and 65 to Riyadh. Expect roughly 7 hours 40 minutes of driving, plus the border. Our Kuwait to Riyadh taxi also starts from {{fare}} per car.",
    options: [
      ROUTE_TAXI("~7 h 40 min + border"),
      SELF_DRIVE("~7 h 40 min + border", "Kuwaiti insurance bought at the border"),
      FLIGHT,
    ],
    tips: [
      { icon: "clock", title: "Plan a full day", body: "With the border and a rest stop, most travellers set aside the whole day." },
      { icon: "calendarCheck", title: "Avoid weekend evenings", body: "Thursday and Friday evenings are the slowest times at Al Khafji." },
      { icon: "fileCheck", title: "Check your visa", body: "Non-GCC travellers need a Kuwait visa or eVisa; Saudi residents need an exit and re-entry visa." },
      { icon: "fuel", title: "Services on the coast road", body: "Route 95 passes more towns and fuel stations than the inland road." },
      { icon: "plane", title: "Flying out of Kuwait?", body: "Leave Riyadh at least 11 hours before an international departure from Kuwait Airport." },
    ],
    faqs: [
      { q: "How far is Riyadh to Kuwait by road?", a: "About **648 km** via the Al Khafji–Al Nuwaiseeb border. In a straight line the cities are about 535 km apart." },
      { q: "What is the Kuwait to Riyadh distance by road?", a: "The same **648 km** the other way, with roughly **7 hours 40 minutes** of driving plus the border." },
      { q: "How many hours from Riyadh to Kuwait by car?", a: "Roughly **7 hours 40 minutes** of driving. Border processing and a rest stop add to that." },
      { q: "Which highways go from Riyadh to Kuwait?", a: "**Routes 65, 550 and 95** in Saudi Arabia, then **Route 40** in Kuwait after Al Nuwaiseeb." },
      { q: "How much is a taxi from Riyadh to Kuwait?", a: "**Starting from {{fare}}** per car, one way, in both directions. Prices may vary depending on date and availability." },
      { q: "Is Riyadh to Kuwait different from Dammam to Kuwait?", a: "Both cross at **Al Khafji / Al Nuwaiseeb**. From Dammam it is about 410 km; from Riyadh about 648 km." },
      { q: "Do I need a visa to drive into Kuwait?", a: "GCC citizens cross on their ID. Others need a **Kuwait visa or eVisa**; check before you travel." },
    ],
    arabic: {
      answer: "المسافة من الرياض إلى الكويت بالسيارة نحو 648 كم، ومدة القيادة نحو 7 ساعات و40 دقيقة عبر منفذ الخفجي والنويصيب.",
      faqs: [{ q: "كم كيلو من الرياض إلى الكويت؟", a: "نحو **648 كم** براً عبر منفذ الخفجي، والتاكسي الخاص **يبدأ من {{fareAr}}** للسيارة." }],
    },
    table: SAUDI_TO_KUWAIT_TABLE,
    transferBenefits: ["Starting from {{fare}} per car", "Same car across the border", "Coastal road with more services"],
    relatedDistanceSlugs: ["dammam-to-kuwait", "khafji-to-kuwait", "riyadh-to-dammam", "doha-to-riyadh"],
    relatedLinks: [
      { href: "/services/riyadh", label: "Riyadh taxi service" },
      { href: "/destinations/kuwait-city", label: "Chauffeur service in Kuwait" },
      { href: "/guides/saudi-arabia-to-kuwait-by-road", label: "Saudi Arabia to Kuwait by road guide" },
    ],
    source: "Owner-confirmed route and time, 19 Nov 2026 (648 km, 7 h 40 min). OSRM's fastest route: 716 km, 7.6 h",
    verified: "2026-11-19",
  },

  "dammam-to-kuwait": {
    slug: "dammam-to-kuwait", origin: "Dammam", destination: "Kuwait", region: "kuwait",
    breadcrumbLabel: "Dammam to Kuwait",
    title: "Dammam to Kuwait Distance by Road: 410 km, 4.5 hrs + Border",
    meta: "Dammam to Kuwait is about 410 km by road, 4.5 hrs driving (5–6 with the Khafji border). Same distance Kuwait to Dammam. Private taxi door to door, 24/7.",
    km: 410,
    drive: "about 4.5 hours", withBorder: "5–6 hours",
    highways: "Route 95 up the Gulf coast, then Route 40 in Kuwait",
    border: KHAFJI,
    routeForward: { href: "/dammam-to-kuwait-taxi-service", label: "Dammam to Kuwait taxi" },
    routeReverse: { href: "/kuwait-to-dammam-taxi-service", label: "Kuwait to Dammam taxi" },
    routeIntro: "One road does almost all the work: Route 95 runs north from Dammam along the Gulf coast, past Jubail, to Al Khafji and the Kuwaiti border.",
    steps: [
      { title: "Dammam, Al Khobar or Dhahran", body: "Pickup from homes, hotels, compounds or King Fahd International Airport." },
      { title: "Route 95 north", body: "About 290 km up the coast past Jubail; the last fuel and food stops before the border are around Al Khafji." },
      { title: "Al Khafji / Al Nuwaiseeb", body: "Saudi exit and Kuwait entry in the same car." },
      { title: "Route 40 to Kuwait City", body: "About 105 km north to Kuwait City, Al Ahmadi, Fahaheel or Kuwait International Airport." },
    ],
    reverse: "Kuwait to Dammam is the same 410 km the other way: Route 40 south to Al Nuwaiseeb, into Saudi Arabia at Al Khafji, then down Route 95 past Jubail. Allow about 4.5 hours of driving, 5–6 hours with the border.",
    options: [ROUTE_TAXI("5–6 h"), SELF_DRIVE("5–6 h", "Kuwaiti insurance bought at the border"), FLIGHT],
    tips: [
      { icon: "briefcase", title: "Business timing", body: "Much of this road's traffic is oil and gas staff; weekday mornings are the steadiest time to cross." },
      { icon: "fileCheck", title: "Documents ready", body: "Passports, visas or GCC IDs within reach; this decides how smoothly the border goes." },
      { icon: "mapPin", title: "Name your Kuwait district", body: "Kuwait City, Al Ahmadi and Fahaheel are all on the way but at different distances from the border." },
      { icon: "fuel", title: "Fuel before the border", body: "Fill up around Jubail or Al Khafji; your driver plans this for you." },
    ],
    faqs: [
      { q: "How far is Dammam to Kuwait by road?", a: "About **410 km**, up Route 95 past Jubail to the Al Khafji–Al Nuwaiseeb border." },
      { q: "How far is Kuwait to Dammam by road?", a: "The same **410 km**, about **4.5 hours** of driving plus the border." },
      { q: "How long does Dammam to Kuwait take?", a: "About **4.5 hours** of driving, or **5–6 hours** including border processing." },
      { q: "Which border is used between Dammam and Kuwait?", a: "**Al Khafji** on the Saudi side and **Al Nuwaiseeb** on the Kuwaiti side, on the coast road." },
      { q: "Do I change cars at the border?", a: "**No.** One car and driver cover the whole journey; passengers show their own documents." },
      { q: "Is it better to fly from Dammam to Kuwait?", a: "Flying is quicker for one person. By road you go **door to door** with luggage and no airport transfers." },
    ],
    arabic: {
      answer: "المسافة من الدمام إلى الكويت نحو 410 كم براً، ومدة القيادة نحو 4.5 ساعات عبر منفذ الخفجي والنويصيب.",
      faqs: [{ q: "كم المسافة من الدمام إلى الكويت؟", a: "نحو **410 كم** على الطريق الساحلي 95، أي **4.5 ساعات قيادة** و**5 إلى 6 ساعات** مع الحدود." }],
    },
    table: SAUDI_TO_KUWAIT_TABLE,
    transferBenefits: ["Same car across the border", "To Kuwait City, Ahmadi or Fahaheel", "24/7, both directions"],
    relatedDistanceSlugs: ["riyadh-to-kuwait", "khafji-to-kuwait", "bahrain-to-jubail", "doha-to-dammam"],
    relatedLinks: [
      { href: "/services/dammam", label: "Dammam taxi service" },
      { href: "/destinations/kuwait-city", label: "Chauffeur service in Kuwait" },
      { href: "/guides/saudi-arabia-to-kuwait-by-road", label: "Saudi Arabia to Kuwait by road guide" },
    ],
    source: `${OSRM}: 413 km, 4.4 h`,
    verified: "2026-11-20",
  },

  "khafji-to-kuwait": {
    slug: "khafji-to-kuwait", origin: "Khafji", destination: "Kuwait", region: "kuwait",
    breadcrumbLabel: "Khafji to Kuwait",
    title: "Khafji to Kuwait Distance by Road: 125 km, 1.5 hrs",
    meta: "Khafji is about 15 km from the Al Nuwaiseeb border and 125 km from Kuwait City by road: 1.5 hrs driving, 2–3 hrs with the border. Same distance both ways.",
    km: 125,
    drive: "about 1.5 hours", withBorder: "2–3 hours",
    highways: "A short run to the border, then Route 40 in Kuwait",
    border: KHAFJI,
    routeForward: { href: "/khafji-to-kuwait-taxi-service", label: "Khafji to Kuwait taxi" },
    routeReverse: { href: "/kuwait-to-khafji-taxi-service", label: "Kuwait to Khafji taxi" },
    routeIntro: "The shortest way into Kuwait from Saudi Arabia. The border is only about 15 km from Al Khafji; most of the distance is on Route 40 inside Kuwait.",
    steps: [
      { title: "Al Khafji", body: "Pickup in the town, at the KJO compound or a hotel." },
      { title: "To the border", body: "About 15 km and 15–20 minutes to the Saudi exit post." },
      { title: "Al Nuwaiseeb", body: "Kuwait entry, in the same car." },
      { title: "Route 40 north", body: "About 105 km to Kuwait City, with Al Ahmadi and Fahaheel on the way." },
    ],
    reverse: "Kuwait City to Al Khafji is the same 125 km the other way, about 1.5 hours of driving and 2–3 hours with the crossing.",
    options: [ROUTE_TAXI("2–3 h"), SELF_DRIVE("2–3 h", "Kuwaiti insurance bought at the border")],
    tips: [
      { icon: "clock", title: "Commuter peaks", body: "Shift-change times bring more traffic at Al Nuwaiseeb; off-peak hours are smoother." },
      { icon: "fileCheck", title: "Documents ready", body: "Passport or GCC ID, plus a Kuwait visa if you need one." },
      { icon: "mapPin", title: "Confirm your Kuwait stop", body: "Al Ahmadi and Fahaheel come before Kuwait City; tell us where you are going." },
      { icon: "calendarCheck", title: "Weekend evenings", body: "Thursday and Friday evenings and holidays are the slowest times to cross." },
    ],
    faqs: [
      { q: "How far is Khafji from Kuwait?", a: "About **15 km** to the Al Nuwaiseeb border and about **125 km** by road to Kuwait City." },
      { q: "How long does Khafji to Kuwait take?", a: "About **1.5 hours** of driving, or **2–3 hours** with the border." },
      { q: "What is the Khafji border to Kuwait called?", a: "**Al Khafji** on the Saudi side and **Al Nuwaiseeb** on the Kuwaiti side; it is open 24 hours." },
      { q: "Do I change cars at the border?", a: "**No.** The same car and driver take you through both posts." },
      { q: "Is there a taxi from Kuwait to Khafji?", a: "**Yes**, door to door in both directions, booked on WhatsApp." },
    ],
    arabic: {
      answer: "تبعد الخفجي عن مدينة الكويت نحو 125 كم براً، منها نحو 15 كم حتى منفذ النويصيب، ومدة القيادة نحو ساعة ونصف.",
      faqs: [{ q: "كم تبعد الخفجي عن الكويت؟", a: "نحو **15 كم** حتى منفذ النويصيب، ونحو **125 كم** حتى مدينة الكويت، أي **ساعة ونصف** قيادة." }],
    },
    table: SAUDI_TO_KUWAIT_TABLE,
    transferBenefits: ["The shortest Saudi–Kuwait crossing", "KJO and commuter pickups", "24/7, both directions"],
    relatedDistanceSlugs: ["dammam-to-kuwait", "riyadh-to-kuwait", "bahrain-to-jubail"],
    relatedLinks: [
      { href: "/destinations/kuwait-city", label: "Chauffeur service in Kuwait" },
      { href: "/dammam-airport-to-khafji-taxi-service", label: "Dammam Airport to Khafji taxi" },
      { href: "/guides/saudi-arabia-to-kuwait-by-road", label: "Saudi Arabia to Kuwait by road guide" },
    ],
    source: `${OSRM}: 124 km, 1.4 h`,
    verified: "2026-11-20",
  },

  /* ── Qatar ────────────────────────────────────────────────────── */
  "doha-to-riyadh": {
    slug: "doha-to-riyadh", origin: "Doha", destination: "Riyadh", region: "qatar",
    breadcrumbLabel: "Doha to Riyadh",
    title: "Doha to Riyadh Distance by Road: 580 km & Taxi Fare",
    meta: "Doha to Riyadh is about 580 km by road, 6.5–7.5 hrs incl. the Salwa border. Same distance Riyadh to Doha. Private taxi from {{fare}}, 24/7.",
    km: 580,
    drive: "about 6.5 hours", withBorder: "6.5–7.5 hours",
    highways: "Salwa Road in Qatar, then Routes 615 and 522 via Al-Ahsa and Highway 40",
    border: SALWA,
    routeForward: { href: "/qatar-to-riyadh-taxi-service", label: "Doha to Riyadh taxi" },
    routeReverse: { href: "/riyadh-to-qatar-taxi-service", label: "Riyadh to Doha taxi" },
    fareRoute: "riyadh-to-qatar-taxi-service",
    routeIntro: "Doha's only land border is with Saudi Arabia, so every road trip to Riyadh crosses at Salwa / Abu Samra, about an hour from Doha, then runs west through the Al-Ahsa region.",
    steps: [
      { title: "Doha", body: "Pickup in West Bay, The Pearl, Lusail, Al Wakrah or at Hamad International Airport." },
      { title: "Salwa Road to Abu Samra", body: "About 90 km and an hour to the Qatari exit post." },
      { title: "Salwa", body: "Saudi entry, in the same car." },
      { title: "Routes 615 and 522", body: "West through the Al-Ahsa region, the usual place for the rest stop." },
      { title: "Highway 40 into Riyadh", body: "The last 100 km on the main motorway into the capital." },
    ],
    reverse: "Riyadh to Doha is the same 580 km the other way, crossing at Salwa / Abu Samra: about 6.5 hours of driving, 6.5–7.5 hours with the border. Our Riyadh to Doha taxi starts from {{fare}} per car.",
    options: [ROUTE_TAXI("6.5–7.5 h"), SELF_DRIVE("6.5–7.5 h", "Insurance valid in both countries"), FLIGHT],
    tips: [
      { icon: "clock", title: "Leave early", body: "An early start gets you through Salwa before the midday build-up." },
      { icon: "coffee", title: "Rest stop at Al-Ahsa", body: "The natural halfway break for prayer, food and fuel." },
      { icon: "fileCheck", title: "Visas both ways", body: "Check Qatar and Saudi entry rules for every passenger before you set off." },
      { icon: "users", title: "Groups and delegations", body: "Larger groups travel as a convoy of cars, all crossing together." },
      { icon: "plane", title: "Connecting at DOH or RUH?", body: "Give us your flight number and we time the pickup around it." },
    ],
    faqs: [
      { q: "How far is Doha from Riyadh by road?", a: "About **580 km**, via the Salwa / Abu Samra border and the Al-Ahsa region." },
      { q: "Riyadh to Qatar by road: how many hours?", a: "About **6.5 hours** of driving, or **6.5–7.5 hours** including the border." },
      { q: "How much is a taxi from Riyadh to Doha?", a: "**From {{fare}}** per car, one way, in both directions. Every vehicle's fare is on the route page." },
      { q: "Which border do you cross from Riyadh to Qatar?", a: "**Salwa** on the Saudi side and **Abu Samra** on the Qatari side, the only land border." },
      { q: "Can I drive from Qatar to Saudi Arabia?", a: "**Yes.** Private cars use Salwa / Abu Samra; you need insurance valid in Saudi Arabia." },
      { q: "Do I change cars at the border?", a: "**No.** One car and one driver from Doha to your door in Riyadh." },
    ],
    arabic: {
      answer: "المسافة من الرياض إلى قطر بالسيارة نحو 580 كم، والرحلة 6.5 إلى 7.5 ساعات شاملة منفذ سلوى وأبو سمرة.",
      faqs: [
        { q: "من الرياض لقطر كم ساعة بالسيارة؟", a: "نحو **6.5 ساعات قيادة**، أو **6.5 إلى 7.5 ساعات** مع إجراءات منفذ سلوى." },
        { q: "كم المسافة بين الرياض وقطر؟", a: "نحو **580 كم** براً، والتاكسي الخاص يبدأ من **{{fareAr}}** للسيارة في الاتجاهين." },
      ],
    },
    transferBenefits: ["From {{fare}} per car", "Same car through Salwa", "Rest stop at Al-Ahsa"],
    relatedDistanceSlugs: ["doha-to-dammam", "bahrain-to-riyadh", "riyadh-to-kuwait", "riyadh-to-dammam"],
    relatedLinks: [
      { href: "/services/riyadh", label: "Riyadh taxi service" },
      { href: "/destinations/doha", label: "Doha private transfers" },
      { href: "/saudi-arabia-to-qatar-taxi-service", label: "Saudi Arabia to Qatar taxi" },
    ],
    source: `${OSRM}: 584 km, 6.5 h`,
    verified: "2026-11-20",
  },

  "doha-to-dammam": {
    slug: "doha-to-dammam", origin: "Doha", destination: "Dammam", region: "qatar",
    breadcrumbLabel: "Doha to Dammam",
    title: "Doha to Dammam Distance by Road: 330 km, 4 hrs + Border",
    meta: "Doha to Dammam is about 330 km by road, about 4 hrs driving plus the Salwa–Abu Samra border. Same distance Dammam to Doha. Private taxi door to door, 24/7.",
    km: 330,
    drive: "about 4 hours", withBorder: "4.5–5.5 hours",
    highways: "Salwa Road in Qatar, then Route 95 up the coast",
    border: SALWA,
    routeForward: { href: "/qatar-to-dammam-taxi-service", label: "Doha to Dammam taxi" },
    routeReverse: { href: "/dammam-airport-to-qatar-taxi-service", label: "Dammam Airport to Doha taxi" },
    routeIntro: "The shortest Saudi city from Doha by road. After Salwa, Route 95 follows the coast north past Al Uqair to Dammam, Al Khobar and Dhahran.",
    steps: [
      { title: "Doha", body: "Pickup anywhere in Doha or at Hamad International Airport." },
      { title: "Salwa Road to Abu Samra", body: "About 90 km to the Qatari exit post." },
      { title: "Salwa", body: "Saudi entry, in the same car." },
      { title: "Route 95 north", body: "About 160 km up the coast to the Dammam area." },
      { title: "Dammam, Al Khobar or Dhahran", body: "Drop-off at your address or King Fahd International Airport." },
    ],
    reverse: "Dammam to Doha is the same 330 km the other way, 4.5–5.5 hours with the border. From King Fahd International Airport it is about 350 km.",
    options: [ROUTE_TAXI("4.5–5.5 h"), SELF_DRIVE("4.5–5.5 h", "Insurance valid in both countries"), FLIGHT],
    tips: [
      { icon: "clock", title: "Half a day each way", body: "With the border, the trip fits comfortably into a morning or an afternoon." },
      { icon: "fileCheck", title: "Entry rules", body: "Check Qatar and Saudi requirements for each passenger before travel." },
      { icon: "plane", title: "Flight at DMM?", body: "From Doha to King Fahd International Airport allow about 5–6 hours plus check-in." },
      { icon: "luggage", title: "Moving house or events kit", body: "Tell us what you carry; an SUV or van can take far more than a flight." },
    ],
    faqs: [
      { q: "How far is Doha to Dammam by road?", a: "About **330 km**, through the Salwa / Abu Samra border and up Route 95." },
      { q: "How long is the drive from Dammam to Qatar?", a: "About **4 hours** of driving, or **4.5–5.5 hours** with the border." },
      { q: "How far is Qatar from Dammam?", a: "Doha is about **330 km** from Dammam by road; the Salwa border is about **240 km** from Dammam." },
      { q: "Is there a taxi from Dammam to Doha?", a: "**Yes**, door to door in both directions, including from King Fahd International Airport." },
      { q: "Do I change cars at Salwa?", a: "**No.** One car and driver for the whole journey." },
    ],
    arabic: {
      answer: "المسافة من الدوحة إلى الدمام نحو 330 كم براً، ومدة القيادة نحو 4 ساعات زائد إجراءات منفذ سلوى.",
      faqs: [{ q: "من الدمام إلى قطر بالسيارة كم ساعة؟", a: "نحو **4 ساعات قيادة**، أو **4.5 إلى 5.5 ساعات** مع إجراءات الحدود." }],
    },
    transferBenefits: ["Same car through Salwa", "To Dammam, Khobar or Dhahran", "DMM airport runs"],
    relatedDistanceSlugs: ["doha-to-riyadh", "bahrain-to-dammam", "dammam-to-kuwait"],
    relatedLinks: [
      { href: "/services/dammam", label: "Dammam taxi service" },
      { href: "/destinations/doha", label: "Doha private transfers" },
      { href: "/saudi-arabia-to-qatar-taxi-service", label: "Saudi Arabia to Qatar taxi" },
    ],
    source: `${OSRM}: 327 km, 3.9 h (Rome2Rio 329 km); DMM airport–Doha 351 km`,
    verified: "2026-11-20",
  },

  /* ── UAE ──────────────────────────────────────────────────────── */
  "riyadh-to-dubai": {
    slug: "riyadh-to-dubai", origin: "Riyadh", destination: "Dubai", region: "uae",
    breadcrumbLabel: "Riyadh to Dubai",
    title: "Riyadh to Dubai Distance by Road: 1,000 km, 10–11 hrs",
    meta: "Riyadh to Dubai is about 1,000 km by road, 10–11 hrs driving plus the Al Batha–Ghuwaifat border. Same distance Dubai to Riyadh. Private taxi door to door.",
    km: 1000,
    drive: "10–11 hours", withBorder: "11–12.5 hours",
    highways: "Route 10 via Haradh to Al Batha, then the E11 through Abu Dhabi",
    border: BATHA,
    routeForward: { href: "/riyadh-to-dubai-taxi-service", label: "Riyadh to Dubai taxi" },
    routeReverse: { href: "/dubai-to-riyadh-taxi-service", label: "Dubai to Riyadh taxi" },
    routeIntro: "A full day on the road. Route 10 runs south-east from Riyadh through Haradh to the UAE border at Al Batha, and the E11 carries on along the coast through Abu Dhabi to Dubai.",
    steps: [
      { title: "Riyadh", body: "An early pickup from your home, hotel or office." },
      { title: "Route 10 via Haradh", body: "About 440 km across the desert to the border, with a rest stop on the way." },
      { title: "Al Batha / Al Ghuwaifat", body: "Saudi exit and UAE entry, in the same car." },
      { title: "E11 through Abu Dhabi", body: "About 450 km along the coast, past Abu Dhabi, to Dubai." },
      { title: "Dubai", body: "Drop-off at your hotel, home or Dubai International Airport." },
    ],
    reverse: "Dubai to Riyadh is the same 1,000 km the other way: the E11 to Al Ghuwaifat, then Route 10 via Haradh to Riyadh. Allow 11–12.5 hours with the border.",
    options: [ROUTE_TAXI("11–12.5 h"), SELF_DRIVE("11–12.5 h", "Insurance valid in both countries"), FLIGHT],
    tips: [
      { icon: "clock", title: "Start at dawn", body: "Leaving early puts the border in daylight and Dubai before late evening." },
      { icon: "coffee", title: "Two breaks", body: "On a drive this long we plan at least two rest stops." },
      { icon: "fileCheck", title: "UAE entry", body: "Check whether each passenger gets a visa on arrival or needs one in advance." },
      { icon: "users", title: "Best for groups", body: "One fare per car makes the drive good value for families; solo travellers usually fly." },
    ],
    faqs: [
      { q: "How far is Riyadh to Dubai by road?", a: "About **1,000 km**, via Route 10, the Al Batha border and the E11 through Abu Dhabi." },
      { q: "How many hours from Riyadh to Dubai by car?", a: "About **10–11 hours** of driving, or **11–12.5 hours** with the border and rest stops." },
      { q: "Which border do you cross to the UAE?", a: "**Al Batha** (Saudi Arabia) and **Al Ghuwaifat** (UAE), the main Saudi–UAE road crossing." },
      { q: "Is there a car with driver from Riyadh to Dubai?", a: "**Yes.** One private car and driver, door to door, priced on WhatsApp." },
      { q: "Should I fly or drive from Riyadh to Dubai?", a: "Fly if you are alone with light luggage. **Drive** with family, a group or a lot of luggage." },
    ],
    transferBenefits: ["One car for the whole day", "Same car through Al Batha", "Two planned rest stops"],
    relatedDistanceSlugs: ["dammam-to-dubai", "dammam-to-abu-dhabi", "riyadh-to-kuwait", "doha-to-riyadh"],
    relatedLinks: [
      { href: "/services/riyadh", label: "Riyadh taxi service" },
      { href: "/destinations/dubai", label: "Dubai private transfers" },
      { href: "/saudi-arabia-to-uae-taxi-service", label: "Saudi Arabia to UAE taxi" },
    ],
    source: `${OSRM}: 996 km, 10.4 h via Route 10 and Al Batha`,
    verified: "2026-11-20",
  },

  "dammam-to-dubai": {
    slug: "dammam-to-dubai", origin: "Dammam", destination: "Dubai", region: "uae",
    breadcrumbLabel: "Dammam to Dubai",
    title: "Dammam to Dubai Distance by Road: 800 km, 8–9 hrs + Border",
    meta: "Dammam to Dubai is about 800 km by road, 8–9 hrs driving via the Al Batha–Ghuwaifat border. Same distance Dubai to Dammam. Private taxi door to door.",
    km: 800,
    drive: "8–9 hours", withBorder: "9–10.5 hours",
    highways: "Route 95 south past Salwa to Al Batha, then the E11 through Abu Dhabi",
    border: BATHA,
    routeForward: { href: "/dammam-to-dubai-taxi-service", label: "Dammam to Dubai taxi" },
    routeReverse: { href: "/dubai-to-dammam-taxi-service", label: "Dubai to Dammam taxi" },
    routeIntro: "Shorter than many expect: about 800 km. Route 95 runs south from the Dammam area along the coast past Al Uqair and Salwa to the UAE border at Al Batha, then the E11 continues through Abu Dhabi to Dubai.",
    steps: [
      { title: "Dammam, Al Khobar or Dhahran", body: "Pickup from your address or King Fahd International Airport." },
      { title: "Route 95 south", body: "About 300 km down the coast past Al Uqair and Salwa." },
      { title: "Al Batha / Al Ghuwaifat", body: "Saudi exit and UAE entry, in the same car." },
      { title: "E11 through Abu Dhabi", body: "About 450 km along the coast to Dubai." },
      { title: "Dubai", body: "Drop-off at your hotel, home or Dubai International Airport." },
    ],
    reverse: "Dubai to Dammam is the same 800 km the other way, via Al Ghuwaifat and Route 95: 9–10.5 hours with the border.",
    options: [ROUTE_TAXI("9–10.5 h"), SELF_DRIVE("9–10.5 h", "Insurance valid in both countries"), FLIGHT],
    tips: [
      { icon: "clock", title: "A long day", body: "Plan the trip as a full travel day and start early." },
      { icon: "coffee", title: "Rest stops", body: "Breaks around Salwa and in Abu Dhabi emirate split the drive." },
      { icon: "fileCheck", title: "UAE entry", body: "Check each passenger's UAE visa status before departure." },
      { icon: "luggage", title: "Luggage freedom", body: "No airline limits: useful for relocations and long stays." },
    ],
    faqs: [
      { q: "How far is Dammam to Dubai by road?", a: "About **800 km**, down Route 95 to the Al Batha border and along the E11." },
      { q: "How long is the drive from Dammam to Dubai?", a: "About **8–9 hours** of driving, or **9–10.5 hours** with the border." },
      { q: "Which border is used from Dammam to Dubai?", a: "**Al Batha** on the Saudi side and **Al Ghuwaifat** on the UAE side." },
      { q: "Is there a taxi from Dammam to Dubai?", a: "**Yes**, one private car and driver door to door, priced on WhatsApp." },
      { q: "Does the road go through Qatar?", a: "**No.** It stays in Saudi Arabia until Al Batha, passing Salwa but not entering Qatar." },
    ],
    transferBenefits: ["About 800 km, one car", "Same car through Al Batha", "Relocation-friendly luggage space"],
    relatedDistanceSlugs: ["dammam-to-abu-dhabi", "riyadh-to-dubai", "doha-to-dammam"],
    relatedLinks: [
      { href: "/services/dammam", label: "Dammam taxi service" },
      { href: "/destinations/dubai", label: "Dubai private transfers" },
      { href: "/saudi-arabia-to-uae-taxi-service", label: "Saudi Arabia to UAE taxi" },
    ],
    source: `${OSRM}: 803 km, 7.8 h via Route 95, Al Batha and the E11 (other sources 787–885 km)`,
    verified: "2026-11-20",
  },

  "dammam-to-abu-dhabi": {
    slug: "dammam-to-abu-dhabi", origin: "Dammam", destination: "Abu Dhabi", region: "uae",
    breadcrumbLabel: "Dammam to Abu Dhabi",
    title: "Dammam to Abu Dhabi Distance by Road: 700 km, 7–8 hrs",
    meta: "Dammam to Abu Dhabi is about 700 km by road, 7–8 hrs driving plus the Al Batha–Ghuwaifat border. Same distance Abu Dhabi to Dammam. Private taxi, 24/7.",
    km: 700,
    drive: "7–8 hours", withBorder: "8–9.5 hours",
    highways: "Route 95 south to Al Batha, then the E11 and E22 into Abu Dhabi",
    border: BATHA,
    routeForward: { href: "/dammam-to-abu-dhabi-taxi-service", label: "Dammam to Abu Dhabi taxi" },
    routeReverse: { href: "/abu-dhabi-to-dammam-taxi-service", label: "Abu Dhabi to Dammam taxi" },
    routeIntro: "The coast road from the Eastern Province to the UAE capital: Route 95 south past Salwa to Al Batha, then the E11 east and the E22 into the city.",
    steps: [
      { title: "Dammam, Al Khobar or Dhahran", body: "Pickup from your address or King Fahd International Airport." },
      { title: "Route 95 south", body: "About 300 km down the coast past Al Uqair and Salwa." },
      { title: "Al Batha / Al Ghuwaifat", body: "Saudi exit and UAE entry, in the same car." },
      { title: "E11 and E22", body: "About 360 km east to Abu Dhabi city, Yas or Saadiyat." },
    ],
    reverse: "Abu Dhabi to Dammam is the same 700 km the other way, via Al Ghuwaifat and Route 95: 8–9.5 hours with the border.",
    options: [ROUTE_TAXI("8–9.5 h"), SELF_DRIVE("8–9.5 h", "Insurance valid in both countries"), FLIGHT],
    tips: [
      { icon: "clock", title: "Start early", body: "An early start puts the border in daylight." },
      { icon: "coffee", title: "Break around Salwa", body: "The usual place for a rest before the border." },
      { icon: "fileCheck", title: "UAE entry", body: "Confirm visa-on-arrival eligibility for each passenger." },
      { icon: "mapPin", title: "Name your Abu Dhabi area", body: "Abu Dhabi island, Yas and Saadiyat add different times at the end." },
    ],
    faqs: [
      { q: "How far is Dammam to Abu Dhabi by road?", a: "About **700 km**, down Route 95 to the Al Batha border, then the E11." },
      { q: "How far is Abu Dhabi to Dammam by road?", a: "The same **700 km** the other way, about **8–9.5 hours** with the border." },
      { q: "How long does Dammam to Abu Dhabi take?", a: "About **7–8 hours** of driving, or **8–9.5 hours** with the border." },
      { q: "Is Khobar to Abu Dhabi the same road?", a: "**Yes.** From Al Khobar you join the same Route 95 south; the distance is similar." },
      { q: "Do I change cars at the border?", a: "**No.** One car and driver for the whole journey." },
    ],
    transferBenefits: ["About 700 km, one car", "Same car through Al Batha", "To Abu Dhabi, Yas or Saadiyat"],
    relatedDistanceSlugs: ["dammam-to-dubai", "riyadh-to-dubai", "doha-to-dammam"],
    relatedLinks: [
      { href: "/services/dammam", label: "Dammam taxi service" },
      { href: "/destinations/abu-dhabi", label: "Abu Dhabi private transfers" },
      { href: "/saudi-arabia-to-uae-taxi-service", label: "Saudi Arabia to UAE taxi" },
    ],
    source: `${OSRM}: 706 km, 6.9 h via Route 95, Al Batha, E11 and E22`,
    verified: "2026-11-20",
  },

  /* ── Saudi Arabia ─────────────────────────────────────────────── */
  "riyadh-to-dammam": {
    slug: "riyadh-to-dammam", origin: "Riyadh", destination: "Dammam", region: "saudi",
    breadcrumbLabel: "Riyadh to Dammam",
    title: "Riyadh to Dammam Distance by Road: 400 km, 4 hrs",
    meta: "Riyadh to Dammam is about 400 km on Highway 40, around 4 hours of driving with no border. Same distance Dammam to Riyadh. Private taxi door to door, 24/7.",
    km: 400,
    drive: "about 4 hours",
    highways: "Highway 40, the Riyadh–Dammam motorway",
    routeForward: { href: "/riyadh-to-dammam-guide", label: "Riyadh to Dammam taxi" },
    routeReverse: { href: "/dammam-to-riyadh-taxi-service", label: "Dammam to Riyadh taxi" },
    routeIntro: "One motorway, no border: Highway 40 links Riyadh and the Eastern Province in a straight line across the desert.",
    steps: [
      { title: "Riyadh", body: "Pickup anywhere in the city or at King Khalid International Airport." },
      { title: "Highway 40 east", body: "About 400 km of motorway, with a rest stop halfway if you want one." },
      { title: "Dammam, Al Khobar or Dhahran", body: "Drop-off at your address or King Fahd International Airport." },
    ],
    reverse: "Dammam to Riyadh is the same 400 km on Highway 40, about 4 hours of driving.",
    options: [
      ROUTE_TAXI("~4 h"),
      SELF_DRIVE("~4 h"),
      { option: "Train", doorToDoor: false, time: "Train ride, plus station transfers", transfers: "A ride to and from each station", bestFor: "Solo travellers" },
      FLIGHT,
    ],
    tips: [
      { icon: "clock", title: "Avoid Riyadh rush hour", body: "Leaving before 7 am or after 9 am misses the worst city traffic." },
      { icon: "briefcase", title: "Work on the way", body: "A private car lets you take calls and work for the whole four hours." },
      { icon: "coffee", title: "Halfway stop", body: "Services on Highway 40 make an easy break." },
      { icon: "plane", title: "Airport to airport", body: "We run RUH to DMM and back, timed to your flights." },
    ],
    faqs: [
      { q: "How far is Riyadh to Dammam by road?", a: "About **400 km** on **Highway 40**, with no border to cross." },
      { q: "How long does Riyadh to Dammam take by car?", a: "About **4 hours** of driving, depending on traffic leaving Riyadh." },
      { q: "How far is Dammam to Riyadh?", a: "The same **400 km** the other way, about **4 hours**." },
      { q: "Should I take the train or a taxi?", a: "The train avoids road traffic; a taxi saves the trips to and from each station and goes **door to door**." },
      { q: "Can I book a taxi from Dammam to Riyadh?", a: "**Yes**, door to door in both directions, 24/7." },
    ],
    transferBenefits: ["No border, one motorway", "Door to door in about 4 hours", "Airport-to-airport runs"],
    relatedDistanceSlugs: ["bahrain-to-riyadh", "riyadh-to-kuwait", "doha-to-riyadh", "riyadh-to-makkah"],
    relatedLinks: [
      { href: "/services/riyadh", label: "Riyadh taxi service" },
      { href: "/services/dammam", label: "Dammam taxi service" },
      { href: "/riyadh-to-dammam-airport-taxi-service", label: "Riyadh to Dammam Airport taxi" },
    ],
    source: `${OSRM}: 410 km, 3.9 h on Highway 40`,
    verified: "2026-11-20",
  },

  "riyadh-to-jeddah": {
    slug: "riyadh-to-jeddah", origin: "Riyadh", destination: "Jeddah", region: "saudi",
    breadcrumbLabel: "Riyadh to Jeddah",
    title: "Riyadh to Jeddah Distance by Road: 950 km, 10–11 hrs",
    meta: "Riyadh to Jeddah is about 950 km by road, 10–11 hours driving on Highway 40 via Taif. Same distance Jeddah to Riyadh. Private car with driver on request.",
    km: 950,
    drive: "10–11 hours",
    highways: "Highway 40 via Taif",
    routeIntro: "Coast to coast across the country: Highway 40 runs west from Riyadh across the Najd, climbs to Taif and descends to the Red Sea at Jeddah.",
    steps: [
      { title: "Riyadh", body: "An early-morning pickup." },
      { title: "Highway 40 west", body: "About 750 km across the Najd to Taif, with two rest stops." },
      { title: "Taif", body: "The mountain city where many travellers break the journey." },
      { title: "Down to Jeddah", body: "The final stretch to the Red Sea. Non-Muslims follow the signed road that bypasses Makkah." },
    ],
    reverse: "Jeddah to Riyadh is the same 950 km the other way on Highway 40, 10–11 hours of driving.",
    options: [
      ROUTE_TAXI("10–11 h + stops"),
      SELF_DRIVE("10–11 h + stops"),
      { option: "Intercity coach", doorToDoor: false, time: "Longer, fixed timetable", transfers: "Coach station at each end", bestFor: "Low budget" },
      FLIGHT,
    ],
    tips: [
      { icon: "clock", title: "Treat it as a full day", body: "With stops, most travellers spend 11–12 hours on the road." },
      { icon: "mapPin", title: "Break in Taif", body: "Taif is the natural place for a long stop or an overnight." },
      { icon: "navigation", title: "Makkah bypass", body: "Non-Muslims must use the signed bypass road around Makkah; your driver knows it." },
      { icon: "users", title: "Who drives it", body: "Families moving house and groups with luggage; solo travellers usually fly." },
    ],
    faqs: [
      { q: "How far is Riyadh to Jeddah by road?", a: "About **950 km** on **Highway 40**, via Taif." },
      { q: "How many hours from Riyadh to Jeddah by car?", a: "About **10–11 hours** of driving, plus rest stops." },
      { q: "Is it better to fly from Riyadh to Jeddah?", a: "For one person, **yes**. A private car suits families, groups and anyone moving a lot of luggage." },
      { q: "Can non-Muslims drive from Riyadh to Jeddah?", a: "**Yes**, using the signed road that bypasses Makkah." },
      { q: "Can I book a car with driver from Riyadh to Jeddah?", a: "**Yes**, on request. Send your date and passengers on WhatsApp for a quote." },
    ],
    transferBenefits: ["Coast to coast in one car", "Break the trip in Taif", "Ideal for moving house"],
    relatedDistanceSlugs: ["riyadh-to-makkah", "jeddah-to-makkah", "jeddah-to-madinah", "abha-to-jeddah"],
    relatedLinks: [
      { href: "/services/riyadh", label: "Riyadh taxi service" },
      { href: "/services/jeddah", label: "Jeddah taxi service" },
      { href: "/blog/riyadh-to-jeddah-travel", label: "Riyadh to Jeddah: every way to travel" },
    ],
    source: `${OSRM}: 955 km, 10.5 h on Highway 40`,
    verified: "2026-11-20",
  },

  "riyadh-to-makkah": {
    slug: "riyadh-to-makkah", origin: "Riyadh", destination: "Makkah", region: "saudi",
    breadcrumbLabel: "Riyadh to Makkah",
    title: "Riyadh to Makkah Distance by Road: 870 km, 9–10 hrs",
    meta: "Riyadh to Makkah is about 870 km on Highway 40 via Taif, 9–10 hours of driving. Same distance Makkah to Riyadh. Private taxi with a Miqat stop, 24/7.",
    km: 870,
    drive: "9–10 hours",
    highways: "Highway 40 via Taif",
    routeForward: { href: "/riyadh-to-makkah-taxi-service", label: "Riyadh to Makkah taxi" },
    routeReverse: { href: "/makkah-to-riyadh-taxi-service", label: "Makkah to Riyadh taxi" },
    routeIntro: "The road for Umrah from the capital: Highway 40 west to Taif, past the Miqat at Qarn al-Manazil, and down into Makkah.",
    steps: [
      { title: "Riyadh", body: "Pickup at home or your hotel, timed around prayer if you wish." },
      { title: "Highway 40 west", body: "About 750 km across the Najd with planned rest stops." },
      { title: "Qarn al-Manazil Miqat", body: "A stop to enter Ihram for pilgrims performing Umrah." },
      { title: "Makkah", body: "Drop-off at your hotel near the Haram." },
    ],
    reverse: "Makkah to Riyadh is the same 870 km the other way on Highway 40, 9–10 hours of driving.",
    options: [
      ROUTE_TAXI("9–10 h + stops"),
      SELF_DRIVE("9–10 h + stops"),
      { option: "Intercity coach", doorToDoor: false, time: "Longer, fixed timetable", transfers: "Coach station at each end", bestFor: "Low budget" },
      { option: "Fly to Jeddah, then road", doorToDoor: false, time: "Shorter, two legs", transfers: "Jeddah airport to Makkah by car or train", bestFor: "Solo pilgrims" },
    ],
    tips: [
      { icon: "landmark", title: "Miqat stop", body: "Tell us if you are performing Umrah; we stop at Qarn al-Manazil for Ihram." },
      { icon: "clock", title: "Plan around prayer", body: "Departure and stops can follow prayer times." },
      { icon: "calendarCheck", title: "Peak seasons", body: "Ramadan and school holidays fill Makkah hotels and roads; book early." },
      { icon: "users", title: "Families together", body: "One car for the whole family, with room for luggage and Zamzam." },
    ],
    faqs: [
      { q: "How far is Riyadh to Makkah by road?", a: "About **870 km** on **Highway 40**, via Taif." },
      { q: "How many hours from Riyadh to Makkah by car?", a: "About **9–10 hours** of driving, plus prayer and rest stops." },
      { q: "Do you stop at the Miqat?", a: "**Yes.** We stop at **Qarn al-Manazil** for pilgrims to enter Ihram." },
      { q: "How far is Makkah to Riyadh?", a: "The same **870 km** the other way." },
      { q: "Is there a taxi from Riyadh to Makkah?", a: "**Yes**, door to door in both directions, booked on WhatsApp." },
    ],
    transferBenefits: ["Miqat stop included", "Door to your Makkah hotel", "Planned prayer stops"],
    relatedDistanceSlugs: ["riyadh-to-jeddah", "jeddah-to-makkah", "makkah-to-madinah"],
    relatedLinks: [
      { href: "/services/riyadh", label: "Riyadh taxi service" },
      { href: "/services/makkah", label: "Makkah taxi service" },
      { href: "/umrah-taxi-services", label: "Umrah taxi services" },
    ],
    source: `${OSRM}: 872 km, 9.6 h on Highway 40`,
    verified: "2026-11-20",
  },

  "jeddah-to-madinah": {
    slug: "jeddah-to-madinah", origin: "Jeddah", destination: "Madinah", region: "saudi",
    breadcrumbLabel: "Jeddah to Madinah",
    title: "Jeddah to Madinah Distance by Road: 420 km, 4.5 hrs",
    meta: "Jeddah to Madinah is about 420 km by road, about 4.5 hours of driving on Route 15. Same distance Madinah to Jeddah. Private taxi from Jeddah Airport.",
    km: 420,
    drive: "about 4.5 hours",
    highways: "Route 5 north, then Route 15 to Madinah",
    routeForward: { href: "/jeddah-airport-to-madinah-taxi-service", label: "Jeddah Airport to Madinah taxi" },
    routeReverse: { href: "/madinah-to-jeddah-airport-taxi-service", label: "Madinah to Jeddah Airport taxi" },
    routeIntro: "The usual first leg of a Madinah-first Umrah: north out of Jeddah, then Route 15 inland to Madinah.",
    steps: [
      { title: "Jeddah or KAIA", body: "Meet and greet at King Abdulaziz International Airport, or pickup in the city." },
      { title: "North out of Jeddah", body: "Route 5 for the first stretch." },
      { title: "Route 15", body: "About 300 km inland to Madinah, with a rest stop on the way." },
      { title: "Madinah", body: "Drop-off at your hotel near Al-Masjid an-Nabawi." },
    ],
    reverse: "Madinah to Jeddah is the same 420 km the other way, about 4.5 hours. For a flight from KAIA, leave Madinah at least 8 hours before an international departure.",
    options: [
      ROUTE_TAXI("~4.5 h"),
      { option: "Haramain train", doorToDoor: false, time: "Shorter on the train, plus station transfers", transfers: "A ride to and from each station", bestFor: "Light luggage" },
      FLIGHT,
    ],
    tips: [
      { icon: "plane", title: "Straight from KAIA", body: "We track your flight and meet you at arrivals." },
      { icon: "luggage", title: "Umrah luggage", body: "Zamzam and extra bags fit easily in an SUV or van." },
      { icon: "clock", title: "Arrive rested", body: "Door to door means no station transfer with luggage at either end." },
      { icon: "users", title: "Family groups", body: "One car or van for the whole group, booked once." },
    ],
    faqs: [
      { q: "How far is Jeddah to Madinah by road?", a: "About **420 km**, mostly on **Route 15**." },
      { q: "How long is the drive from Jeddah to Madinah?", a: "About **4.5 hours** of driving." },
      { q: "Is the train faster?", a: "The Haramain train is quicker on the rails, but a taxi goes **door to door** with your luggage." },
      { q: "Can you pick me up at Jeddah Airport for Madinah?", a: "**Yes**, with meet and greet and flight tracking at KAIA." },
    ],
    transferBenefits: ["Straight from KAIA arrivals", "Room for Umrah luggage", "Door to your Madinah hotel"],
    relatedDistanceSlugs: ["jeddah-to-makkah", "makkah-to-madinah", "riyadh-to-jeddah"],
    relatedLinks: [
      { href: "/services/jeddah", label: "Jeddah taxi service" },
      { href: "/services/madinah", label: "Madinah taxi service" },
      { href: "/umrah-taxi-services", label: "Umrah taxi services" },
    ],
    source: `${OSRM}: 404 km city centre to city centre, 4.6 h`,
    verified: "2026-11-20",
  },

  "jeddah-to-makkah": {
    slug: "jeddah-to-makkah", origin: "Jeddah", destination: "Makkah", region: "saudi",
    breadcrumbLabel: "Jeddah to Makkah",
    title: "Jeddah to Makkah Distance by Road: 80 km, 1–1.5 hrs",
    meta: "Jeddah to Makkah is about 80 km by road, 1–1.5 hours on Highway 40, longer in Umrah season. Same distance Makkah to Jeddah. Private taxi from KAIA, 24/7.",
    km: 80,
    drive: "1–1.5 hours",
    highways: "Highway 40",
    routeForward: { href: "/jeddah-to-makkah-taxi-service", label: "Jeddah to Makkah taxi" },
    routeReverse: { href: "/makkah-to-jeddah-taxi-service", label: "Makkah to Jeddah taxi" },
    routeIntro: "The short road from the coast to the Haram: Highway 40 east from Jeddah to Makkah. Non-Muslims cannot enter Makkah.",
    steps: [
      { title: "Jeddah or KAIA", body: "Pickup in the city or meet and greet at King Abdulaziz International Airport." },
      { title: "Highway 40 east", body: "About an hour outside peak times." },
      { title: "Makkah", body: "Drop-off at your hotel, as close to the Haram as traffic rules allow." },
    ],
    reverse: "Makkah to Jeddah is the same 80 km the other way, 1–1.5 hours, and longer in Umrah season.",
    options: [
      ROUTE_TAXI("1–1.5 h"),
      { option: "Haramain train", doorToDoor: false, time: "Short ride, plus station transfers", transfers: "A ride to and from each station", bestFor: "Light luggage" },
      { option: "Bus", doorToDoor: false, time: "Longer", transfers: "Bus station at each end", bestFor: "Low budget" },
    ],
    tips: [
      { icon: "calendarCheck", title: "Umrah season traffic", body: "Ramadan and peak weeks can stretch the drive to two hours." },
      { icon: "plane", title: "From KAIA", body: "We track your flight and wait at arrivals." },
      { icon: "landmark", title: "Ihram before you land", body: "Pilgrims from abroad usually enter Ihram on the plane before the Miqat." },
      { icon: "luggage", title: "Luggage to the hotel", body: "Your driver helps with bags to the hotel drop-off point." },
    ],
    faqs: [
      { q: "How far is Jeddah to Makkah by road?", a: "About **80 km** on **Highway 40**." },
      { q: "How long does Jeddah to Makkah take?", a: "About **1–1.5 hours**, and up to **2 hours** in peak Umrah season." },
      { q: "How far is Makkah from Jeddah Airport?", a: "KAIA is on Jeddah's north side; allow about **1.5 hours** to Makkah outside peak times." },
      { q: "Can non-Muslims go to Makkah?", a: "**No.** Entry to Makkah is for Muslims only." },
    ],
    transferBenefits: ["KAIA meet and greet", "Door to your Makkah hotel", "24/7, Umrah season included"],
    relatedDistanceSlugs: ["makkah-to-madinah", "jeddah-to-madinah", "riyadh-to-makkah"],
    relatedLinks: [
      { href: "/services/jeddah", label: "Jeddah taxi service" },
      { href: "/services/makkah", label: "Makkah taxi service" },
      { href: "/airport-transfer-for-umrah", label: "Umrah airport transfer" },
    ],
    source: `${OSRM}: 88 km city centre to the Haram area, 1.1 h`,
    verified: "2026-11-20",
  },

  "makkah-to-madinah": {
    slug: "makkah-to-madinah", origin: "Makkah", destination: "Madinah", region: "saudi",
    breadcrumbLabel: "Makkah to Madinah",
    title: "Makkah to Madinah Distance by Road: 450 km, 4–5 hrs",
    meta: "Makkah to Madinah is about 450 km on Route 15 (Hijrah Road), 4–5 hours of driving. Same distance Madinah to Makkah. Private taxi hotel to hotel, 24/7.",
    km: 450,
    drive: "4–5 hours",
    highways: "Route 15, the Hijrah Road",
    routeForward: { href: "/makkah-to-madinah-taxi-service", label: "Makkah to Madinah taxi" },
    routeReverse: { href: "/madinah-to-makkah-taxi-service", label: "Madinah to Makkah taxi" },
    routeIntro: "The road between the two holy cities: Route 15 runs north from Makkah to Madinah through open desert.",
    steps: [
      { title: "Makkah hotel", body: "Pickup at your hotel after your last prayer at the Haram." },
      { title: "Route 15 north", body: "About 430 km with a rest stop on the way." },
      { title: "Madinah hotel", body: "Drop-off near Al-Masjid an-Nabawi." },
    ],
    reverse: "Madinah to Makkah is the same 450 km on Route 15, 4–5 hours. Pilgrims entering Ihram stop at the Miqat of Dhul Hulayfah, just outside Madinah.",
    options: [
      ROUTE_TAXI("4–5 h"),
      { option: "Haramain train", doorToDoor: false, time: "Shorter on the train, plus station transfers", transfers: "A ride to and from each station", bestFor: "Light luggage" },
      { option: "Coach", doorToDoor: false, time: "Longer", transfers: "Coach station at each end", bestFor: "Low budget" },
    ],
    tips: [
      { icon: "landmark", title: "Miqat going to Makkah", body: "From Madinah, we stop at Dhul Hulayfah for Ihram." },
      { icon: "clock", title: "Time it around prayer", body: "Many pilgrims leave after Fajr or Asr." },
      { icon: "luggage", title: "Zamzam and gifts", body: "Room for extra bags without train limits." },
      { icon: "users", title: "Hotel to hotel", body: "No station transfers with tired children or elderly parents." },
    ],
    faqs: [
      { q: "How far is Makkah to Madinah by road?", a: "About **450 km** on **Route 15**, the Hijrah Road." },
      { q: "How long does Makkah to Madinah take by car?", a: "About **4–5 hours** of driving." },
      { q: "Is the Haramain train better?", a: "The train is quicker on the rails; a taxi goes **hotel to hotel** with all your luggage." },
      { q: "Do you stop at the Miqat from Madinah?", a: "**Yes**, at **Dhul Hulayfah** for pilgrims going to Makkah." },
    ],
    transferBenefits: ["Hotel to hotel", "Miqat stop on request", "Room for Zamzam"],
    relatedDistanceSlugs: ["jeddah-to-makkah", "jeddah-to-madinah", "riyadh-to-makkah"],
    relatedLinks: [
      { href: "/services/makkah", label: "Makkah taxi service" },
      { href: "/services/madinah", label: "Madinah taxi service" },
      { href: "/umrah-taxi-services", label: "Umrah taxi services" },
    ],
    source: `${OSRM}: 436 km, 4.8 h on Route 15`,
    verified: "2026-11-20",
  },

  "abha-to-riyadh": {
    slug: "abha-to-riyadh", origin: "Abha", destination: "Riyadh", region: "saudi",
    breadcrumbLabel: "Abha to Riyadh",
    title: "Abha to Riyadh Distance by Road: 950 km, 11–12 hrs",
    meta: "Abha to Riyadh is about 950 km by road via Khamis Mushait and Bisha, 11–12 hours of driving. Same distance Riyadh to Abha. Private car on request.",
    km: 950,
    drive: "11–12 hours",
    highways: "Route 10 to Khamis Mushait, then north via Bisha, joining Highway 40 near Riyadh",
    routeIntro: "From the Asir highlands to the capital: down from Abha through Khamis Mushait, north past Bisha across the central plateau, and into Riyadh.",
    steps: [
      { title: "Abha", body: "Pickup in Abha or at Abha International Airport." },
      { title: "Khamis Mushait", body: "The first 30 km, out of the mountains." },
      { title: "North via Bisha", body: "The long middle stretch across the plateau, with two rest stops." },
      { title: "Into Riyadh", body: "The last 60 km on Highway 40." },
    ],
    reverse: "Riyadh to Abha is the same 950 km the other way, 11–12 hours of driving.",
    options: [ROUTE_TAXI("11–12 h + stops"), SELF_DRIVE("11–12 h + stops"), FLIGHT],
    tips: [
      { icon: "clock", title: "Consider an overnight", body: "At 11–12 hours, many families split the drive at Bisha." },
      { icon: "coffee", title: "Several breaks", body: "We plan at least two rest stops." },
      { icon: "plane", title: "Flying is quicker alone", body: "Abha airport has direct flights to Riyadh; the road suits families and luggage." },
      { icon: "navigation", title: "Mountain start", body: "The first stretch descends from the highlands; leave in daylight." },
    ],
    faqs: [
      { q: "How far is Abha to Riyadh by road?", a: "About **950 km**, via Khamis Mushait and Bisha." },
      { q: "How long does Abha to Riyadh take by car?", a: "About **11–12 hours** of driving, plus rest stops." },
      { q: "Should I fly from Abha to Riyadh?", a: "Alone, **yes**. A private car suits families, groups and heavy luggage." },
      { q: "Can I book a car with driver from Abha to Riyadh?", a: "**Yes**, on request. Send your date and passengers on WhatsApp." },
    ],
    transferBenefits: ["One car the whole way", "Overnight stop on request", "Family and luggage friendly"],
    relatedDistanceSlugs: ["abha-to-jeddah", "abha-to-madinah", "riyadh-to-jeddah"],
    relatedLinks: [
      { href: "/services/abha", label: "Abha taxi service" },
      { href: "/services/riyadh", label: "Riyadh taxi service" },
      { href: "/abha-airport-taxi-service", label: "Abha airport taxi" },
    ],
    source: `${OSRM}: 947 km, 11.5 h via Khamis Mushait and Bisha (was shown as 780–850 km)`,
    verified: "2026-11-20",
  },

  "abha-to-jeddah": {
    slug: "abha-to-jeddah", origin: "Abha", destination: "Jeddah", region: "saudi",
    breadcrumbLabel: "Abha to Jeddah",
    title: "Abha to Jeddah Distance by Road: 690 km, 7.5–8.5 hrs",
    meta: "Abha to Jeddah is about 690 km by road along the Red Sea coast, 7.5–8.5 hours of driving. Same distance Jeddah to Abha. Private car with driver on request.",
    km: 690,
    drive: "7.5–8.5 hours",
    highways: "Down to the coast, then Route 5 north along the Red Sea",
    routeIntro: "The fastest road leaves the highlands for the coast and runs north on Route 5 along the Red Sea to Jeddah.",
    steps: [
      { title: "Abha", body: "Pickup in Abha or at Abha International Airport." },
      { title: "Down to the coast", body: "The descent from the Asir mountains towards the Tihama plain." },
      { title: "Route 5 north", body: "About 580 km along the Red Sea coast, with a rest stop." },
      { title: "Jeddah", body: "Drop-off in the city or at King Abdulaziz International Airport." },
    ],
    altRoute: "The mountain road via Al Baha and Taif is more scenic but slower; we can take it on request.",
    reverse: "Jeddah to Abha is the same 690 km the other way, 7.5–8.5 hours of driving.",
    options: [ROUTE_TAXI("7.5–8.5 h + stops"), SELF_DRIVE("7.5–8.5 h + stops"), FLIGHT],
    tips: [
      { icon: "navigation", title: "Coast or mountains", body: "The coast road is faster; the Taif road is the scenic choice." },
      { icon: "clock", title: "Daylight descent", body: "Plan the mountain section in daylight." },
      { icon: "coffee", title: "One long break", body: "A rest stop on Route 5 splits the drive." },
      { icon: "plane", title: "Connecting at KAIA?", body: "We time the drive to your flight from Jeddah." },
    ],
    faqs: [
      { q: "How far is Abha to Jeddah by road?", a: "About **690 km** along the Red Sea coast on **Route 5**." },
      { q: "How long does Abha to Jeddah take by car?", a: "About **7.5–8.5 hours** of driving, plus stops." },
      { q: "Can we go via Taif?", a: "**Yes.** The mountain road via Al Baha and Taif is slower but scenic." },
      { q: "Can I book a car with driver from Abha to Jeddah?", a: "**Yes**, on request, priced on WhatsApp." },
    ],
    transferBenefits: ["Coast or mountain road", "One car the whole way", "KAIA drop-offs"],
    relatedDistanceSlugs: ["abha-to-riyadh", "abha-to-madinah", "riyadh-to-jeddah"],
    relatedLinks: [
      { href: "/services/abha", label: "Abha taxi service" },
      { href: "/services/jeddah", label: "Jeddah taxi service" },
      { href: "/abha-airport-taxi-service", label: "Abha airport taxi" },
    ],
    source: `${OSRM}: 687 km, 7.9 h via Route 5 (the page said 620–680 km via Taif)`,
    verified: "2026-11-20",
  },

  "abha-to-madinah": {
    slug: "abha-to-madinah", origin: "Abha", destination: "Madinah", region: "saudi",
    breadcrumbLabel: "Abha to Madinah",
    title: "Abha to Madinah Distance by Road: 1,080 km, 12–13 hrs",
    meta: "Abha to Madinah is about 1,080 km by road via the Red Sea coast and Jeddah, 12–13 hours of driving. Same distance Madinah to Abha. Private car on request.",
    km: 1080,
    drive: "12–13 hours",
    highways: "Route 5 along the Red Sea, then Route 15 to Madinah",
    routeIntro: "The longest of the Abha routes: down to the coast, north on Route 5 past Jeddah, then inland on Route 15 to Madinah.",
    steps: [
      { title: "Abha", body: "An early pickup in Abha or at the airport." },
      { title: "Route 5 north", body: "About 690 km to the Jeddah area along the coast." },
      { title: "Break in Jeddah", body: "Most travellers stop overnight or for a long break here." },
      { title: "Route 15 to Madinah", body: "About 400 km inland to Madinah." },
    ],
    reverse: "Madinah to Abha is the same 1,080 km the other way, 12–13 hours of driving, best split in Jeddah.",
    options: [ROUTE_TAXI("12–13 h + stops"), SELF_DRIVE("12–13 h + stops"), FLIGHT],
    tips: [
      { icon: "clock", title: "Split the journey", body: "Over 1,000 km is best done over two days, with a night in Jeddah." },
      { icon: "landmark", title: "Umrah on the way", body: "The road passes near Makkah; we can plan an Umrah stop." },
      { icon: "coffee", title: "Several breaks", body: "We plan rest stops every two to three hours." },
      { icon: "luggage", title: "Room for everything", body: "An SUV or van carries a family's luggage without airline limits." },
    ],
    faqs: [
      { q: "How far is Abha to Madinah by road?", a: "About **1,080 km**, via the Red Sea coast and Jeddah." },
      { q: "How long does Abha to Madinah take by car?", a: "About **12–13 hours** of driving; most travellers split it in **Jeddah**." },
      { q: "Can we combine it with Umrah?", a: "**Yes.** The road passes near Makkah, so an Umrah stop can be planned in." },
      { q: "Can I book a car with driver from Abha to Madinah?", a: "**Yes**, on request, priced on WhatsApp." },
    ],
    transferBenefits: ["Two-day option via Jeddah", "Umrah stop on request", "One car the whole way"],
    relatedDistanceSlugs: ["abha-to-jeddah", "jeddah-to-madinah", "makkah-to-madinah"],
    relatedLinks: [
      { href: "/services/abha", label: "Abha taxi service" },
      { href: "/services/madinah", label: "Madinah taxi service" },
      { href: "/umrah-taxi-services", label: "Umrah taxi services" },
    ],
    source: `${OSRM}: 1,084 km, 12.3 h via Route 5 and Route 15 (was shown as 980–1,060 km)`,
    verified: "2026-11-20",
  },
};

export const allDistanceRoutes: DistanceRouteData[] = Object.values(distanceRoutes);

/** "~470 km" */
export const kmLabel = (d: DistanceRouteData) => `~${d.km.toLocaleString("en-US")} km`;

export const isCrossBorder = (d: DistanceRouteData) => Boolean(d.border);

/** Display order and headings for the /distance index. */
export const DISTANCE_REGIONS: { id: DistanceRegion; heading: string; intro: string }[] = [
  { id: "bahrain", heading: "Saudi Arabia ↔ Bahrain", intro: "Across the King Fahd Causeway." },
  { id: "qatar", heading: "Saudi Arabia ↔ Qatar", intro: "Through the Salwa / Abu Samra border." },
  { id: "kuwait", heading: "Saudi Arabia ↔ Kuwait", intro: "Through Al Khafji / Al Nuwaiseeb." },
  { id: "uae", heading: "Saudi Arabia ↔ UAE", intro: "Through Al Batha / Al Ghuwaifat." },
  { id: "saudi", heading: "Within Saudi Arabia", intro: "Intercity and Umrah routes, no border." },
];

/**
 * The distance page for a route page, if one exists, with the anchor
 * "{A} to {B} distance by road" written in the route page's own direction.
 */
export function distanceLinkForRoute(routeHref: string): { href: string; label: string } | null {
  for (const d of allDistanceRoutes) {
    if (d.routeForward?.href === routeHref) return { href: `/distance/${d.slug}`, label: `${d.origin} to ${d.destination} distance by road` };
    if (d.routeReverse?.href === routeHref) return { href: `/distance/${d.slug}`, label: `${d.destination} to ${d.origin} distance by road` };
  }
  return null;
}
