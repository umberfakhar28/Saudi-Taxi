export interface AirportRoute {
  id: string;
  airportCode: "JED" | "MED" | "DMM" | "RUH";
  from: string;
  to: string;
  time: string;
  distance: string;
  vehicles: Array<"sedan" | "suv" | "van" | "luxury">;
  /** Link to an existing dedicated route/tour page, if one exists. */
  href?: string;
}

export const AIRPORT_ROUTES: AirportRoute[] = [
  // Jeddah — King Abdulaziz International (JED)
  { id: "jed-makkah", airportCode: "JED", from: "Jeddah Airport (JED)", to: "Makkah Hotels", time: "~1.5 hrs", distance: "~80 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/jeddah-to-makkah-taxi-service" },
  { id: "jed-madinah", airportCode: "JED", from: "Jeddah Airport (JED)", to: "Madinah Hotels", time: "~4.5 hrs", distance: "~420 km", vehicles: ["sedan", "suv", "van", "luxury"] },
  { id: "jed-city", airportCode: "JED", from: "Jeddah Airport (JED)", to: "Jeddah City Hotels", time: "~30 min", distance: "~20 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/jeddah-city-tour-services-in-saudi-arabia" },

  // Madinah — Prince Mohammad Bin Abdulaziz (MED)
  { id: "med-madinah", airportCode: "MED", from: "Madinah Airport (MED)", to: "Madinah Hotels", time: "~20 min", distance: "~15 km", vehicles: ["sedan", "suv", "van", "luxury"] },
  { id: "med-makkah", airportCode: "MED", from: "Madinah Airport (MED)", to: "Makkah Hotels", time: "~4.5 hrs", distance: "~450 km", vehicles: ["sedan", "suv", "van", "luxury"] },

  // Dammam — King Fahd International (DMM)
  { id: "dmm-bahrain", airportCode: "DMM", from: "Dammam Airport (DMM)", to: "Bahrain (King Fahd Causeway)", time: "~1–1.5 hrs", distance: "~65 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/dammam-airport-to-bahrain-taxi-service" },
  { id: "dmm-khobar", airportCode: "DMM", from: "Dammam Airport (DMM)", to: "Khobar / Dhahran", time: "~30–40 min", distance: "~30 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/dammam-airport-taxi-service" },
  { id: "dmm-riyadh", airportCode: "DMM", from: "Dammam Airport (DMM)", to: "Riyadh", time: "~3.5–4.5 hrs", distance: "~400 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/dammam-airport-to-riyadh-taxi-service" },

  // Riyadh — King Khalid International (RUH)
  { id: "ruh-city", airportCode: "RUH", from: "Riyadh Airport (RUH)", to: "Riyadh City Hotels", time: "~35–50 min", distance: "~35 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/services/riyadh" },
  { id: "ruh-makkah", airportCode: "RUH", from: "Riyadh Airport (RUH)", to: "Makkah Hotels", time: "~9–10 hrs", distance: "~870 km", vehicles: ["suv", "van", "luxury"] },
];

export const AIRPORTS = [
  {
    code: "JED" as const,
    name: "Jeddah Airport",
    fullName: "King Abdulaziz International Airport",
    intro: "Saudi Arabia's main gateway for Umrah pilgrims and international arrivals, with meet-and-greet pickup from Terminal 1 and the North Terminal.",
    relatedLinks: [
      { href: "/umrah-transport-package", label: "Umrah Transport Package" },
      { href: "/jeddah-city-tour-services-in-saudi-arabia", label: "Jeddah City Tour" },
      { href: "/jeddah-to-makkah-taxi-service", label: "Jeddah to Makkah Taxi" },
    ],
  },
  {
    code: "MED" as const,
    name: "Madinah Airport",
    fullName: "Prince Mohammad Bin Abdulaziz International Airport",
    intro: "The closest airport to the Prophet's Mosque, minutes from Madinah's hotel district — ideal for Umrah and Ziyarat arrivals.",
    relatedLinks: [
      { href: "/umrah-transport-package", label: "Umrah Transport Package" },
      { href: "/madina-airport-taxi-service", label: "Madinah Airport Taxi Service" },
    ],
  },
  {
    code: "DMM" as const,
    name: "Dammam Airport",
    fullName: "King Fahd International Airport",
    intro: "The Eastern Province gateway — the starting point for our GCC cross-border transfers to Bahrain, Qatar, and Khafji, plus Riyadh and local Khobar/Dhahran routes.",
    relatedLinks: [
      { href: "/dammam-airport-to-bahrain-taxi-service", label: "Dammam Airport → Bahrain" },
      { href: "/dammam-airport-to-qatar-taxi-service", label: "Dammam Airport → Qatar" },
      { href: "/dammam-airport-to-khafji-taxi-service", label: "Dammam Airport → Khafji" },
      { href: "/border-crossing", label: "All Border Crossing Routes" },
    ],
  },
  {
    code: "RUH" as const,
    name: "Riyadh Airport",
    fullName: "King Khalid International Airport",
    intro: "The capital's main airport, serving government, business, and leisure travelers across Riyadh and long-distance transfers to the Holy Cities.",
    relatedLinks: [
      { href: "/services/riyadh", label: "Riyadh Taxi Service" },
      { href: "/riyadh-airport-taxi-service", label: "Riyadh Airport Taxi Service" },
    ],
  },
];
