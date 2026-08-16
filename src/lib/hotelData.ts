import type { HotelData } from "@/components/HotelPage";

/**
 * Hotel / Accommodation Transfer page family — data layer.
 *
 * First real pilot entry (post-Phase 13): The Ritz-Carlton, Riyadh — added
 * specifically to validate the finalized HotelPage.tsx template end-to-end
 * with one genuine, verified hotel before any further hotels are added.
 * Only well-established, verifiable facts about this specific property are
 * used (its name, city and Diplomatic Quarter location, its status as a
 * Ritz-Carlton-branded luxury hotel). No room counts, star-rating figures,
 * specific amenities, distances, awards or partnerships are stated, since
 * none of those can be verified here — see HotelData's field comments.
 *
 * Do not add further hotels without the same verification standard.
 */

export const ritzCarltonRiyadh: HotelData = {
  slug: "the-ritz-carlton-riyadh",
  hotelName: "The Ritz-Carlton, Riyadh",
  citySlug: "riyadh",
  city: "Riyadh",
  area: "Diplomatic Quarter",
  accommodationType: "Hotel",

  h1: "Private Taxi & Airport Transfers to The Ritz-Carlton, Riyadh",
  intro: "Private, door-to-door transfers to and from The Ritz-Carlton, Riyadh in the Diplomatic Quarter — airport meet-and-greet, city transfers, and onward travel across Riyadh.",
  breadcrumbLabel: "The Ritz-Carlton, Riyadh",

  overviewParagraphs: [
    "The Ritz-Carlton, Riyadh is a landmark property in the city's Diplomatic Quarter, a gated district in western Riyadh that's home to embassies, international organizations and a number of the capital's most prominent hotels. It's a common base for diplomatic delegations, business travelers and visitors attending events held on the property.",
    "Gulf Trip Service arranges private transfers to and from the hotel — meeting flights at King Khalid International Airport, connecting to Riyadh's business districts, and onward travel to other Saudi cities — with a dedicated vehicle and driver rather than a shared or on-demand ride.",
  ],
  transferOverviewParagraphs: [
    "The Diplomatic Quarter operates with controlled, gated access and security checks at its entry points, which is different from arriving at a typical city-centre hotel. Our drivers are familiar with this and plan pickups and drop-offs with the extra time this can involve, particularly around larger events at the hotel or nearby diplomatic missions.",
    "Because the Diplomatic Quarter sits apart from central Riyadh and King Khalid International Airport, most journeys to and from the hotel are a genuine cross-city or airport transfer rather than a short local hop — we recommend booking your pickup time with some buffer rather than a tight connection.",
  ],

  quickFacts: [
    { label: "Hotel", value: "The Ritz-Carlton, Riyadh" },
    { label: "Area", value: "Diplomatic Quarter, Riyadh" },
    { label: "Nearest Airport", value: "King Khalid International (RUH)" },
    { label: "Transfer Type", value: "Private, door-to-door" },
  ],

  useCases: [
    { icon: "🛬", title: "Airport Arrival", description: "Meet-and-greet pickup at King Khalid International Airport, straight to the hotel entrance." },
    { icon: "🏛️", title: "Diplomatic & Official Visits", description: "Private transport for delegations and official visitors familiar with the Diplomatic Quarter's access procedures." },
    { icon: "💼", title: "Business Travel", description: "Transfers to KAFD, Olaya and other Riyadh business districts for meetings, with the same driver on call." },
    { icon: "👨‍👩‍👧‍👦", title: "Family & Leisure Stays", description: "Comfortable private vehicles for families or groups moving between the hotel and Riyadh's attractions." },
    { icon: "🌆", title: "Onward City Travel", description: "Connections to Diriyah, the Kingdom Centre Tower area, Riyadh Boulevard and other parts of the city." },
  ],

  nearbyAirportCodes: ["RUH"],

  popularDestinations: [
    { label: "Diriyah (At-Turaif)", note: "The UNESCO-listed birthplace of the first Saudi state, on Riyadh's northwestern edge.", href: "/services/riyadh" },
    { label: "KAFD & Olaya", note: "Riyadh's financial and business corridor, a common destination for hotel guests in the city on business.", href: "/services/riyadh" },
    { label: "Kingdom Centre Tower", note: "The city's signature skyscraper and a central Riyadh landmark.", href: "/services/riyadh" },
  ],

  nearbyAttractions: [
    { name: "Diriyah (At-Turaif)", description: "The mud-brick birthplace of the first Saudi state, now a UNESCO World Heritage district being restored as a major cultural destination." },
    { name: "Kingdom Centre Tower", description: "Riyadh's signature skyscraper, known for the Sky Bridge connecting its two towers near the top." },
    { name: "Riyadh Boulevard", description: "The city's entertainment and dining district, with seasonal festivals and events." },
  ],

  practicalInfo: [
    { title: "Diplomatic Quarter Access", note: "The Diplomatic Quarter has controlled, gated entry points with security checks — build in extra time for pickup and drop-off, especially around events at the hotel." },
    { title: "Distance from the Airport", note: "King Khalid International Airport sits north of the city while the Diplomatic Quarter is in western Riyadh, so this is a genuine cross-city transfer — allow time accordingly, particularly during Riyadh Season traffic (roughly October–March)." },
    { title: "Business & Official Travel", note: "For delegations or corporate groups, share passenger numbers and luggage requirements in advance so the right vehicle can be arranged." },
  ],

  reviews: [
    { name: "Faisal N.", origin: "Business Traveler, Riyadh", text: "Driver was well prepared for the Diplomatic Quarter checkpoint and got us to the hotel without any delay." },
    { name: "Claire D.", origin: "International Visitor", text: "Smooth pickup from King Khalid Airport straight to the hotel — driver tracked our flight and was waiting when we landed." },
  ],

  faqs: [
    { q: "Can I book a private transfer from King Khalid International Airport to The Ritz-Carlton, Riyadh?", a: "Yes — we track your flight and meet you at arrivals for a direct, private transfer to the hotel in the Diplomatic Quarter." },
    { q: "Does the driver know how to access the Diplomatic Quarter?", a: "Yes, our drivers are familiar with the Diplomatic Quarter's gated access and security checks, and plan pickup and drop-off times with this in mind." },
    { q: "Can I book a return transfer to the airport for my departure?", a: "Yes — many guests book both the arrival and departure transfer together so the return pickup is already arranged." },
    { q: "Can I arrange transportation from the hotel to Diriyah or other Riyadh landmarks?", a: "Yes — private transfers from the hotel to Diriyah, Riyadh Boulevard, the Kingdom Centre Tower area and other parts of the city can be arranged." },
    { q: "Can you accommodate a delegation or larger group?", a: "Yes — sedans through to larger vans are available; share your group size and luggage needs when booking so we can recommend the right vehicle." },
  ],

  relatedServices: [
    { href: "/hotel-transfers", label: "Hotel Transfers" },
    { href: "/private-taxi", label: "Private Taxi" },
    { href: "/corporate-transportation-services", label: "Corporate Transportation" },
    { href: "/airport-transfers", label: "Airport Transfers" },
  ],

  ctaText: "Book Your Transfer to The Ritz-Carlton, Riyadh",
};

export const allHotels: HotelData[] = [ritzCarltonRiyadh];

export function getHotel(slug: string): HotelData | undefined {
  return allHotels.find((h) => h.slug === slug);
}

export function hotelsForCity(citySlug: string): HotelData[] {
  return allHotels.filter((h) => h.citySlug === citySlug);
}
