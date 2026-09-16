/**
 * Detailed vehicle roster for the Fleet page's guidance sections (vehicle
 * recommendations + comparison table) — added for the Fleet Page
 * Enhancement brief.
 *
 * Deliberately reuses the same real, named vehicles already shown
 * elsewhere on the site (src/components/VehicleTypeCarousel.tsx's
 * `vehicleTypes` and src/components/VehiclesSection.tsx's `vehicles`)
 * rather than inventing new fleet inventory. The brief that requested this
 * file explicitly warned against claiming a vehicle is available if it
 * isn't part of the actual fleet/service offering, so models suggested by
 * the research reference (Mercedes Vito, GMC Yukon XL, Toyota Veloz, a
 * standalone "Premium Coach" SKU) were left out rather than added
 * speculatively. The Hyundai Staria, Hyundai Starex and Chevrolet Suburban
 * were added in September 2026, once the business confirmed them and
 * supplied photos.
 *
 * `slug`/`bookingName` match the existing `/book-online?vehicle=&vehicleName=`
 * query pattern used by every other vehicle card on the site, so these
 * links land on the same booking flow with the same prefill behaviour.
 */

export interface FleetVehicle {
  slug: string;
  name: string;
  type: string;
  passengers: number;
  luggage: number;
  comfort: "Standard" | "Premium" | "Executive";
  bestFor: string;
  /** A photo of this exact model in public/fleet. Only set where one really
   * exists — vehicles without a photo keep the icon tile until one is added. */
  image?: string;
}

export interface FleetCategory {
  id: string;
  title: string;
  tagline: string;
  bestForList: string[];
  vehicleSlugs: string[];
}

export const FLEET_VEHICLES: FleetVehicle[] = [
  { slug: "toyota-camry", name: "Toyota Camry", type: "Sedan", passengers: 4, luggage: 3, comfort: "Standard", bestFor: "Couples & small families on a comfortable budget", image: "/fleet/toyota-camry.avif" },
  { slug: "ford-taurus", name: "Ford Taurus", type: "Sedan", passengers: 3, luggage: 2, comfort: "Standard", bestFor: "Solo travelers & short city transfers" },
  { slug: "lexus-es", name: "Lexus ES", type: "Premium Sedan", passengers: 4, luggage: 3, comfort: "Premium", bestFor: "Executives & couples who want extra refinement" },
  { slug: "mercedes-s-class", name: "Mercedes-Benz S-Class", type: "Executive Sedan", passengers: 3, luggage: 3, comfort: "Executive", bestFor: "VIP travel & business-class comfort" },
  { slug: "bmw-7-series", name: "BMW 7 Series", type: "Executive Sedan", passengers: 3, luggage: 3, comfort: "Executive", bestFor: "Corporate travel & executive meetings" },
  { slug: "genesis-g90", name: "Genesis G90", type: "Executive Sedan", passengers: 3, luggage: 3, comfort: "Executive", bestFor: "VIP airport pickups & flagship comfort" },
  { slug: "gmc-yukon", name: "GMC Yukon", type: "Premium SUV", passengers: 6, luggage: 6, comfort: "Premium", bestFor: "Families & groups with extra luggage", image: "/fleet/gmc-yukon.avif" },
  { slug: "chevrolet-suburban", name: "Chevrolet Suburban", type: "Premium SUV", passengers: 6, luggage: 7, comfort: "Premium", bestFor: "Families & long cross-border journeys with luggage", image: "/fleet/chevrolet-suburban.webp" },
  { slug: "cadillac-escalade-esv", name: "Cadillac Escalade ESV", type: "Premium SUV", passengers: 6, luggage: 7, comfort: "Executive", bestFor: "VIP groups wanting a commanding, spacious ride" },
  { slug: "mercedes-v-class", name: "Mercedes-Benz V-Class", type: "Premium Van", passengers: 7, luggage: 6, comfort: "Premium", bestFor: "Families & small groups who want sedan-level comfort" },
  { slug: "hyundai-staria", name: "Hyundai Staria", type: "Premium Van", passengers: 7, luggage: 6, comfort: "Premium", bestFor: "Families & small groups wanting a modern, spacious cabin", image: "/fleet/hyundai-staria.avif" },
  { slug: "hyundai-starex", name: "Hyundai Starex", type: "Group Van", passengers: 9, luggage: 7, comfort: "Standard", bestFor: "Families & groups on airport and Umrah transfers", image: "/fleet/hyundai-starex.avif" },
  { slug: "toyota-hiace", name: "Toyota Hiace", type: "Group Van", passengers: 12, luggage: 8, comfort: "Standard", bestFor: "Medium-size groups & full Umrah party transfers", image: "/fleet/toyota-hiace.avif" },
  { slug: "mercedes-sprinter", name: "Mercedes-Benz Sprinter", type: "Executive Van", passengers: 12, luggage: 10, comfort: "Premium", bestFor: "Corporate groups & larger party transfers" },
  { slug: "toyota-coaster-18-seater", name: "Toyota Coaster (18-Seater)", type: "Minibus", passengers: 18, luggage: 12, comfort: "Standard", bestFor: "Mid-size Umrah groups & multi-family transfers", image: "/fleet/toyota-coaster.avif" },
  { slug: "toyota-coaster", name: "Toyota Coaster", type: "Minibus", passengers: 22, luggage: 15, comfort: "Standard", bestFor: "Large Umrah groups, tours & full-party transfers", image: "/fleet/toyota-coaster.avif" },
];

export const FLEET_CATEGORY_GUIDE: FleetCategory[] = [
  {
    id: "executive",
    title: "Executive & VIP Sedans",
    tagline: "Flagship comfort for business travel, VIP airport pickups and corporate transportation.",
    bestForList: ["VIP airport transfers", "Business & corporate travel", "Chauffeur service", "Executive meetings"],
    vehicleSlugs: ["mercedes-s-class", "bmw-7-series", "genesis-g90"],
  },
  {
    id: "everyday-sedans",
    title: "Everyday & Business Sedans",
    tagline: "Reliable, comfortable sedans for solo travelers, couples and small families.",
    bestForList: ["Solo travelers & couples", "City & airport transfers", "Small families", "Short business trips"],
    vehicleSlugs: ["toyota-camry", "lexus-es", "ford-taurus"],
  },
  {
    id: "premium-suv",
    title: "Premium SUVs for Families & Groups",
    tagline: "Extra seating and cargo room for families traveling with more luggage.",
    bestForList: ["Families", "Larger luggage requirements", "Airport transfers", "Long-distance travel"],
    vehicleSlugs: ["gmc-yukon", "chevrolet-suburban", "cadillac-escalade-esv"],
  },
  {
    id: "premium-van",
    title: "Premium Vans for Families & Small Groups",
    tagline: "Sedan-level comfort with the seating and luggage room of a van.",
    bestForList: ["Families", "Small groups", "Umrah transportation", "Intercity travel"],
    vehicleSlugs: ["mercedes-v-class", "hyundai-staria", "hyundai-starex", "toyota-hiace"],
  },
  {
    id: "group-umrah",
    title: "Group & Umrah Transportation",
    tagline: "Purpose-built for larger Umrah parties, tours and group transfers between cities.",
    bestForList: ["Umrah groups", "Large families", "Group airport transfers", "Tours & excursions"],
    vehicleSlugs: ["mercedes-sprinter", "toyota-coaster-18-seater", "toyota-coaster"],
  },
];

export function vehiclesFor(slugs: string[]): FleetVehicle[] {
  return slugs
    .map((slug) => FLEET_VEHICLES.find((v) => v.slug === slug))
    .filter((v): v is FleetVehicle => Boolean(v));
}
