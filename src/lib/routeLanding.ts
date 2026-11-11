/**
 * Content for a route page built with the designed, section-by-section
 * layout (RouteLanding.tsx) rather than the long-form RoutePage template.
 *
 * Opt-in per route through `RouteData.landing`. Routes without it keep
 * RoutePage exactly as before. Copy may carry inline links written as
 * [anchor](/path) and bold written as **text**; schema always receives
 * the plain text.
 */

/** Icon names the layout knows how to draw. Each maps to one Lucide icon
 *  in RouteLanding.tsx; only the icons listed there are bundled. */
export type LandingIcon =
    | "mapPin" | "clock" | "landmark" | "route" | "coffee" | "tag" | "car"
    | "shieldCheck" | "home" | "luggage" | "fuel" | "messageCircle" | "users"
    | "briefcase" | "plane" | "fileCheck" | "badgeCheck" | "calendarCheck"
    | "navigation" | "headset";

/** A real image, or a sized slot waiting for one. A slot renders as a
 *  styled placeholder with a fixed aspect ratio, so adding the photo later
 *  causes no layout shift. An image with `srcSet` is served from our own
 *  pre-sized WebP files instead of the Next.js image optimiser. */
export type LandingImage =
    | { src: string; alt: string; width: number; height: number; srcSet?: { src: string; width: number }[] }
    | { todo: string; alt: string; width: number; height: number };

export interface LandingVehicle {
    name: string;
    /** Shown as a badge on the photo, e.g. "SUV" or "Premium Sedan". */
    category: string;
    passengers: string;
    /** Absent when the owner has not confirmed the bag capacity. */
    luggage?: string;
    amount: number | null;
    image: { src: string; srcSet: { src: string; width: number }[]; width: number; height: number; alt: string };
}

export interface RouteLanding {
    hero: {
        subheading: string;
        chips: { icon: LandingIcon; label: string }[];
        priceBadge: string;
        bookOnlineHref: string;
        image: {
            /** Largest file; smaller widths follow the -768 / -1280 naming. */
            src: string;
            srcSet: { src: string; width: number }[];
            width: number;
            height: number;
            alt: string;
            title: string;
        };
    };
    form: {
        heading: string;
        subheading?: string;
        maxPassengers: number;
        footerNote: string;
    };
    highlights: {
        heading: string;
        /** Max ~45 words; **bold** marks the figures shown in the accent colour. */
        intro: string;
        items: { icon: LandingIcon; label: string; value: string; emphasis?: boolean }[];
        note: string;
        link: { href: string; label: string };
    };
    prices: {
        heading: string;
        intro: string;
        currency: "SAR";
        confirmedOn: string;
        groups: { heading: string; vehicles: LandingVehicle[] }[];
        note: string;
    };
    videos?: {
        heading: string;
        intro: string;
        items: {
            src: string;
            poster: string;
            captions: string;
            width: number;
            height: number;
            title: string;
            description: string;
            /** ISO 8601, e.g. PT46S, for VideoObject schema. */
            duration: string;
            uploadDate: string;
        }[];
    };
    timeline: {
        heading: string;
        intro: string;
        steps: { icon: LandingIcon; title: string; body: string }[];
        image: LandingImage;
    };
    crossing: {
        heading: string;
        intro: string;
        driverHeading: string;
        driver: string[];
        passengerHeading: string;
        passenger: string[];
        callout: string;
        outro: string;
    };
    included: {
        heading: string;
        items: { icon: LandingIcon; title: string; body: string }[];
    };
    howToBook: {
        heading: string;
        steps: { icon: LandingIcon; title: string; body: string }[];
    };
    nearby: {
        heading: string;
        intro: string;
        items: { href: string; name: string; blurb: string; image: LandingImage }[];
    };
    returnTrip: { text: string; href: string; label: string };
    popularRoutes: {
        heading: string;
        items: { href: string; from: string; to: string; tag: string }[];
        servicesHeading: string;
        services: { href: string; label: string }[];
    };
    finalCta: { heading: string; blurb: string; image: LandingImage };
}
