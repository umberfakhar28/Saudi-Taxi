/**
 * Homepage hero background slider — the branded flagship shot first, then
 * Saudi Arabia (primary market), then the wider Gulf/GCC coverage. Images
 * live in public/hero-slider (converted from the source PNGs in
 * "public/hero slider" and public/gulftripservice-heroimage.png, both kept
 * as-is for backup). Each slide can carry its own focal point since the
 * crop needed to keep the vehicle in frame differs slightly image to image
 * — see HeroImageSlider.tsx for how objectPosition/mobileObjectPosition
 * are used.
 */

export interface HeroSlide {
  image: string;
  alt: string;
  /** object-position at desktop/tablet widths. */
  objectPosition: string;
  /** object-position under the ~900px breakpoint, where the crop narrows
   * and needs to favor the vehicle over open road/sky. */
  mobileObjectPosition: string;
  /** Only the first slide should be eager/high-priority — see §13 of the
   * hero slider brief (don't compete with it for initial page load). */
  priority?: boolean;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    // The branded flagship shot (GulfTripService logo visible on the car
    // door) — leads the slider ahead of the location-specific photos.
    image: "/hero-slider/gulftripservice-premium-chauffeur-service.webp",
    alt: "GulfTripService luxury chauffeur sedan with branded livery along a Gulf waterfront skyline — premium private taxi and transfer service",
    objectPosition: "63% 58%",
    mobileObjectPosition: "70% 55%",
    priority: true,
  },
  {
    image: "/hero-slider/saudi-arabia-luxury-chauffeur-service.webp",
    alt: "Luxury chauffeur sedan driving through Riyadh at sunset — premium private taxi and transfer service in Saudi Arabia",
    objectPosition: "64% 60%",
    mobileObjectPosition: "73% 55%",
  },
  {
    image: "/hero-slider/saudi-airport-transfer-service.webp",
    alt: "Luxury airport transfer car in Saudi Arabia for private taxi and chauffeur service",
    objectPosition: "68% 62%",
    mobileObjectPosition: "75% 55%",
  },
  {
    image: "/hero-slider/dubai-luxury-chauffeur-transfer.webp",
    alt: "Luxury chauffeur car with the Dubai skyline and Burj Khalifa at sunset — premium Gulf private transfer service",
    objectPosition: "64% 60%",
    mobileObjectPosition: "73% 55%",
  },
  {
    image: "/hero-slider/bahrain-private-taxi-service.webp",
    alt: "Luxury private transfer car along the Bahrain waterfront with the Bahrain World Trade Center — Gulf chauffeur and taxi service",
    objectPosition: "65% 58%",
    mobileObjectPosition: "74% 53%",
  },
  {
    image: "/hero-slider/gulf-cross-border-chauffeur-service.webp",
    alt: "Luxury SUV on a Gulf desert highway for Saudi Arabia and GCC cross-border private transfer and chauffeur services",
    objectPosition: "63% 55%",
    mobileObjectPosition: "72% 50%",
  },
];
