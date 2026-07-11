/**
 * Shared fleet tiers (Sedan / SUV / Van / Luxury) with numeric passenger and
 * luggage capacity — used by the airport booking widget and route cards.
 *
 * This is a new shared shape. It did not exist before: the site previously
 * had two different vehicle arrays (src/components/VehiclesSection.tsx —
 * named real car models with no capacity fields, and a local array in
 * src/app/quote/page.tsx — capacity as free-text "1–3 passengers" with no
 * distinct luggage field). Neither matched what a booking widget needs
 * (numeric capacity for icon-count rendering), so this file introduces the
 * numeric shape without touching those two existing, working displays.
 *
 * Images reused from /public/images (no new assets created). No dedicated
 * "luxury" photo exists yet, so the Luxury tier reuses fleet-sedan2.jpg —
 * the same image VehiclesSection.tsx already tags "Premium" (Lexus ES) —
 * as the closest existing asset. Replace with a real luxury-vehicle photo
 * when available.
 */

export interface FleetTier {
  id: "sedan" | "suv" | "van" | "luxury";
  name: string;
  models: string;
  image: string;
  maxPassengers: number;
  maxLuggage: number;
  description: string;
}

export const FLEET_TIERS: FleetTier[] = [
  {
    id: "sedan",
    name: "Sedan",
    models: "Toyota Camry / Hyundai Sonata",
    image: "/images/fleet-sedan.jpg",
    maxPassengers: 3,
    maxLuggage: 2,
    description: "Comfortable and efficient for solo travelers, couples, or business trips.",
  },
  {
    id: "suv",
    name: "SUV",
    models: "Toyota Land Cruiser / Prado",
    image: "/images/fleet-suv.jpg",
    maxPassengers: 5,
    maxLuggage: 4,
    description: "Extra space and comfort — ideal for families or groups with more luggage.",
  },
  {
    id: "van",
    name: "Van",
    models: "Toyota HiAce",
    image: "/images/fleet-van.jpg",
    maxPassengers: 9,
    maxLuggage: 8,
    description: "Best for larger families or groups traveling together with full luggage.",
  },
  {
    id: "luxury",
    name: "Luxury",
    models: "Mercedes S-Class / BMW 7 Series",
    image: "/images/fleet-sedan2.jpg",
    maxPassengers: 3,
    maxLuggage: 2,
    description: "Premium executive travel — for VIP arrivals and business-class comfort.",
  },
];
