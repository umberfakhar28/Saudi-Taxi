/**
 * Content for a route page built with the designed, section-by-section
 * layout (RouteLanding.tsx) rather than the long-form RoutePage template.
 *
 * Opt-in per route through `RouteData.landing`. Routes without it keep
 * RoutePage exactly as before. Copy may carry inline links written as
 * [anchor](/path); schema always receives the plain text.
 */

/** Icon names the layout knows how to draw. Mapped to the site's own
 *  icon set in RouteLanding.tsx, so no new icon library is introduced. */
export type LandingIcon =
    | "shield" | "clock" | "car" | "message" | "mapPin" | "globe" | "navigation"
    | "timer" | "tag" | "user" | "home" | "plane" | "package" | "phone"
    | "check" | "fileCheck" | "calendar" | "briefcase" | "landmark";

/** A real image, or a sized slot waiting for one. A slot renders as a
 *  styled placeholder with a fixed aspect ratio, so adding the photo later
 *  causes no layout shift. */
export type LandingImage =
    | { src: string; alt: string; width: number; height: number }
    | { todo: string; alt: string; width: number; height: number };

export interface RouteLanding {
    hero: {
        subheading: string;
        chips: { icon: LandingIcon; label: string }[];
        priceBadge: string;
        /** Pre-filled WhatsApp message for the hero button. */
        whatsappMessage: string;
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
        vehicles: { value: string; label: string }[];
        maxPassengers: number;
        footerNote: string;
    };
    highlights: {
        heading: string;
        items: { icon: LandingIcon; label: string; value: string }[];
        note: string;
        link: { href: string; label: string };
    };
    prices: {
        heading: string;
        intro: string;
        currency: "SAR";
        confirmedOn: string;
        vehicles: {
            name: string;
            passengers: string;
            luggage: string;
            amount: number | null;
            note: string;
            image: LandingImage;
        }[];
        note: string;
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
