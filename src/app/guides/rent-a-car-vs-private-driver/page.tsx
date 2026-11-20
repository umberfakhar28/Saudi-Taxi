import { generatePageMetadata } from "@/lib/seo";
import ArticlePage from "@/components/ArticlePage";
import { COVERS, type ArticleData } from "@/lib/articles";

export const metadata = generatePageMetadata({
  title: "Rent a Car vs Private Driver vs Taxi in Saudi Arabia",
  brandSuffix: false,
  description: "Self-drive rental, taxi or ride-hailing, or a car with driver in Saudi Arabia? Cost, navigation, parking and airport arrivals compared, by type of trip.",
  path: "/guides/rent-a-car-vs-private-driver",
});

/*
 * Owner page for cluster B2 (docs/seo/content/content-audit.md §4): the
 * comparison. 242 impressions, 0 clicks, position 25.3 (GSC 28 days to 19
 * Nov 2026).
 *
 * Merged in (301, 20 Nov 2026): /guides/chauffeur-vs-taxi-saudi-arabia —
 * airport arrivals, business days, families, and when a taxi is enough.
 *
 * The transactional "rent a car with driver" queries (B1, ~150 impressions)
 * belong to /private-taxi, retitled "Car with Driver in Saudi Arabia" the
 * same day; this guide links there as the booking page and does not target
 * the transactional wording in its title.
 *
 * No fares: hourly and daily hire are quoted per trip.
 */

const data: ArticleData = {
  path: "/guides/rent-a-car-vs-private-driver",
  kind: "guide",
  topic: "driver",
  h1: "Rent a Car, Take a Taxi, or Book a Private Driver in Saudi Arabia?",
  lead: "**Rent a car** if you are confident driving in a new country and staying in one compact area. **Take a taxi or ride-hail** for a short, one-off hop in town. **Book a car with a driver** for airport arrivals, multi-stop days, long drives between cities, families with luggage and business schedules: one agreed price, and no navigating or parking.",
  description: "Self-drive rental, taxi and ride-hailing, and a car with driver in Saudi Arabia compared: cost, navigation, parking, airports, families and business.",
  published: "2026-09-01",
  updated: "2026-11-20",
  cover: COVERS.CHAUFFEUR_LUGGAGE,
  quickAnswer: {
    stats: [
      { icon: "car", label: "Self-drive", value: "One compact area, confident driver" },
      { icon: "route", label: "Taxi or app", value: "Short one-off trips in town" },
      { icon: "users", label: "Car with driver", value: "Airports, families, long days" },
      { icon: "clock", label: "Driver bookings", value: "Per trip, hourly or daily" },
    ],
    points: [
      "**Renting** gives full freedom, but you handle navigation, parking, fuel, tolls and insurance, and you need a licence valid in Saudi Arabia.",
      "**Taxis and ride-hailing** are easy for one short trip, but the car and price are set on the spot, and the car may not fit a family's bags.",
      "**A car with driver** is booked ahead for a journey, a few hours or whole days. The driver waits between stops, and fuel is in the price.",
      "Not sure? Mix them: a driver for the airport and busy city days, a rental for open-road days.",
    ],
  },
  cta: {
    heading: "Book a car with driver",
    body: "By the hour, by the day or for one journey, anywhere we cover in Saudi Arabia. Sedan, SUV, van or executive car; the price is agreed before you travel.",
    waMessage: "Hi, I'd like a car with driver. City:  Dates:  Hours or full day:  Passengers:",
    bookHref: "/book-online",
  },
  sections: [
    {
      id: "compared",
      heading: "The four options compared",
      toc: "Comparison table",
      blocks: [
        {
          type: "table",
          head: ["", "Rental car", "Taxi or ride-hail", "Car with driver"],
          rows: [
            ["Who drives", "You", "A driver for one ride", "Your own driver for the booking"],
            ["Booking", "Rental desk or online", "On the spot, or in an app", "In advance: per trip, hourly or daily"],
            ["Price", "Daily rate + fuel + tolls + insurance extras", "Meter or app fare, can rise at busy times", "One price agreed before you travel"],
            ["Navigation and parking", "Yours at every stop", "Not your concern", "Not your concern; the car waits"],
            ["Car size", "What you rent", "Whatever comes; often a standard sedan", "Chosen for your group: sedan to van"],
            ["Airport arrival", "Queue for the car, then drive tired", "Join the taxi queue", "Driver at arrivals with a name board"],
            ["Licence needed", "Yes", "No", "No"],
          ],
        },
        { type: "p", text: "The fourth option, a **private transfer**, is a car with driver booked for one journey: airport to hotel, or city to city. It is how most of our trips are booked." },
        { type: "cta" },
      ],
    },
    {
      id: "by-trip",
      heading: "Which one fits your trip",
      toc: "Which fits your trip",
      blocks: [
        {
          type: "cards",
          items: [
            { icon: "plane", title: "Arriving after a long flight", body: "Car with driver. The flight is tracked, the driver waits at arrivals, and nobody drives an unfamiliar city tired.", href: "/airport-transfers", linkLabel: "Airport transfers" },
            { icon: "briefcase", title: "A day of meetings", body: "Car with driver by the hour or day. One driver who knows the schedule; easy to expense.", href: "/corporate-transportation-services", linkLabel: "Corporate transport" },
            { icon: "users", title: "Family with luggage", body: "Car with driver, sized for your group, child seats on request. Taxis can't promise the car size.", href: "/fleet", linkLabel: "Vehicle sizes" },
            { icon: "route", title: "City to city", body: "Car with driver for road legs such as Riyadh to Dammam or Jeddah to Makkah; fly the very long ones.", href: "/guides/long-distance-private-transfers", linkLabel: "Long-distance transfers" },
            { icon: "map", title: "One short hop in town", body: "Taxi or ride-hail. Quick to get, and nothing to plan." },
            { icon: "car", title: "A week exploring on your own", body: "Rental car, if you're happy driving and parking yourself. Add a driver for the airport and busiest city days." },
          ],
        },
      ],
    },
    {
      id: "car-with-driver",
      heading: "How renting a car with a driver works",
      toc: "Car with driver explained",
      blocks: [
        { type: "p", text: "Many people searching for a rental car don't want to drive: they want a car ready for them with someone else at the wheel. That is a car with driver (sometimes called a chauffeur). We don't rent self-drive cars; we provide the car **and** the driver." },
        {
          type: "table",
          head: ["Booking", "What it suits", "How it is priced"],
          rows: [
            ["One journey", "Airport to hotel, or city to city", "One fare for the journey"],
            ["By the hour", "A few meetings, shopping, a half-day out", "By the hour, with the driver waiting"],
            ["By the day", "A full day of stops, or a long trip", "A day rate agreed in advance"],
            ["Several days", "Touring or a business visit", "Days quoted together"],
          ],
        },
        { type: "list", items: [
          "Choose the car for your group and bags: sedan, SUV, van, or an executive car such as a Mercedes S-Class or BMW 7 Series.",
          "No licence, deposit, insurance excess or fuel card in your name.",
          "Stops and timing can change on the day; tell the driver.",
          "It works in one city, across several, or over a land border on the routes we cover.",
        ] },
        { type: "p", text: "Book it on our [car with driver](/private-taxi) page, or send your dates on WhatsApp." },
      ],
    },
    {
      id: "chauffeur-vs-taxi",
      heading: "Chauffeur vs taxi: what actually changes",
      toc: "Chauffeur vs taxi",
      blocks: [
        { type: "p", text: "The difference is not really luxury; it is certainty. A taxi is whoever is nearest, at whatever the meter or app says. A chauffeur, or car with driver, is reserved for you, at a time and price agreed before you leave." },
        { type: "subhead", text: "At the airport" },
        { type: "p", text: "This is where the gap is biggest. With a taxi you queue after the flight and take the car that comes, whatever your luggage. With a pre-booked driver, the flight is tracked, a delay moves the pickup, and the right-size car is waiting." },
        { type: "subhead", text: "For business" },
        { type: "p", text: "For one meeting, a taxi is fine. For airport, hotel, two meetings and a flight home, one driver who knows the plan saves re-explaining each stop, and a fixed price is easier to expense." },
        { type: "subhead", text: "When a taxi is the better choice" },
        { type: "p", text: "A single traveller making a short, spontaneous trip across a city they know. There is no reason to book ahead for something you can hail in two minutes. Uber and Careem both work in the main Saudi cities." },
      ],
    },
    {
      id: "renting",
      heading: "When renting a car makes sense, and what to check",
      toc: "Renting: what to check",
      blocks: [
        { type: "p", text: "Renting works when you stay in one compact area, are confident driving abroad, and want to change plans on a whim. Before you book, check:" },
        { type: "list", items: [
          "**Licence:** that your licence (and an international permit, if needed) is valid in Saudi Arabia for your nationality and length of stay. Ask the rental company.",
          "**Insurance:** what it covers, and whether a long highway trip into another region is allowed.",
          "**Borders:** many rental agreements don't allow the car to leave Saudi Arabia, so a trip to Bahrain or Qatar may be ruled out.",
          "**City driving:** Riyadh and Jeddah traffic is fast, with frequent lane changes, and navigation apps don't always know about road works.",
        ] },
        { type: "callout", tone: "tip", title: "Don't collect a rental straight off a long flight", text: "Picking up a car and driving an unfamiliar city right after a long-haul flight is the hardest version of self-drive. Book the airport run with a driver and collect the rental the next day." },
      ],
    },
    {
      id: "real-cost",
      heading: "Comparing the real cost",
      toc: "The real cost",
      blocks: [
        { type: "p", text: "Compare the full cost, not the headline rate. A rental's total is the daily rate plus fuel, tolls, parking and insurance extras. A car with driver is one figure for the same trip. For a short single trip, the rental can look cheaper; for a long or multi-stop day, the gap is often smaller than it first appears, before you count the time spent navigating and parking." },
        {
          type: "table",
          head: ["Cost item", "Rental car", "Car with driver"],
          rows: [
            ["Car", "Daily rate", "In the price"],
            ["Fuel", "You pay", "In the price"],
            ["Tolls and parking", "You pay", "In the price"],
            ["Insurance extras and deposit", "You pay", "None"],
            ["Your time navigating and parking", "Yours", "None"],
          ],
        },
      ],
    },
    {
      id: "al-ahsa",
      heading: "Example: a day in Al-Ahsa",
      toc: "Example: Al-Ahsa",
      blocks: [
        { type: "p", text: "Al-Ahsa shows when the choice matters. The oasis, Qaisariah Souq and Al-Qarah Mountain are spread across a wide area with little public transport. A rental works if you are confident finding your way between them; a driver who knows the oasis roads lets you see all three in one day. Al-Ahsa also sits on the Riyadh–Dammam and Riyadh–Qatar highways, so many visitors stop on a longer trip. See [Al-Ahsa with a driver](/services/al-ahsa)." },
      ],
    },
    {
      id: "mistakes",
      heading: "Common mistakes",
      toc: "Common mistakes",
      blocks: [
        { type: "list", items: [
          "Comparing a rental's daily rate with a driver's quote without adding fuel, tolls and parking to the rental.",
          "Assuming a taxi will have room for a family's luggage without checking the car size.",
          "Booking a driver too late for a busy business day, then reshuffling meetings around the car.",
          "Assuming a driver means no flexibility: stops and timing can usually change on request.",
          "Not checking whether the rental insurance covers a long trip into another region or across a border.",
        ] },
      ],
    },
  ],
  faqs: [
    { q: "Can I rent a car with a driver in Saudi Arabia?", a: "Yes. You book a private car with a professional driver for one journey, by the hour, by the day or for several days. Fuel and the driver are included, and you need no licence, deposit or insurance. See our [car with driver](/private-taxi) page." },
    { q: "Is it cheaper to rent a car or hire a driver?", a: "For a short single trip, a rental's daily rate can look cheaper. Once fuel, tolls, parking and insurance are added, the gap narrows, especially on a long or multi-stop day." },
    { q: "What is the difference between a chauffeur and a taxi?", a: "A taxi is the nearest available car for one ride, at a meter or app fare. A chauffeur, or car with driver, is reserved in advance for a set time, route or day, with the car, driver and price agreed before you travel." },
    { q: "Do Uber and Careem work in Saudi Arabia?", a: "Yes, in the main cities. They suit short trips in town. They don't cross land borders, and you can't choose the exact car size." },
    { q: "Can I hire a car with a driver for several days?", a: "Yes. Multi-day bookings are quoted together as day rates, which suits touring and longer business visits." },
    { q: "Do I need a special licence to rent a car in Saudi Arabia?", a: "You need a licence valid for use in Saudi Arabia; the rules depend on your nationality and length of stay, so confirm with the rental company. A car with driver needs no licence from you." },
    { q: "Is a chauffeur only for business travellers?", a: "No. Families and holidaymakers book drivers just as often, especially for airport arrivals with luggage, trips between cities and days with several stops." },
    { q: "Can I take a rental car from Saudi Arabia to Bahrain or Qatar?", a: "Only if the rental agreement and its insurance allow it, and many don't. A private car with driver on our cross-border routes takes you through the border door to door." },
  ],
  routes: [
    { href: "/private-taxi", title: "Car with driver", body: "Hourly, daily or per trip, across Saudi Arabia.", icon: "car" },
    { href: "/airport-transfers", title: "Airport transfers", body: "A driver at arrivals at every major Saudi airport.", icon: "plane" },
    { href: "/corporate-transportation-services", title: "Corporate transport", body: "Accounts and named drivers for regular business travel.", icon: "briefcase" },
    { href: "/fleet", title: "Our vehicles", body: "Sedan, SUV, van and executive cars.", icon: "users" },
    { href: "/services/riyadh", title: "Riyadh with a driver", body: "City days, meetings and airport runs in the capital.", icon: "building" },
    { href: "/services/al-ahsa", title: "Al-Ahsa with a driver", body: "The oasis, the souq and Al-Qarah in one day.", icon: "map" },
  ],
  related: ["/guides/business-travel", "/guides/long-distance-private-transfers", "/blog/bahrain-to-dammam-travel-options"],
};

export default function RentCarVsPrivateDriverGuide() {
  return <ArticlePage data={data} />;
}
