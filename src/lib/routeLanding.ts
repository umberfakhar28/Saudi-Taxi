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
    | "navigation" | "headset" | "creditCard" | "banknote" | "mail" | "receipt"
    | "building" | "languages" | "anchor";

/** The sections after the hero and the form, in the order a route lists
 *  them. Routes without `order` keep the original sequence (DEFAULT_ORDER
 *  in RouteLanding.tsx). Backgrounds alternate by position, so any order
 *  still alternates ivory and white. */
export type LandingSection =
    | "highlights" | "prices" | "bookingMethods" | "payment" | "videos" | "timeline"
    | "crossing" | "documents" | "airport" | "waysToTravel" | "included" | "howToBook"
    | "destinations" | "hotels" | "nearby" | "faq" | "returnRoutes" | "finalCta";

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
    /** Airports served besides the origin and destination cities, added to
     *  the Service schema's areaServed. */
    airportsServed?: { name: string; iataCode: string }[];
    hero: {
        subheading: string;
        chips: { icon: LandingIcon; label: string }[];
        priceBadge: string;
        /** Small tag beside the price badge, e.g. "prices may vary". */
        priceTag?: string;
        /** Replaces the default "one way, per vehicle · time · distance" line. */
        facts?: string;
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
        /** "banner": the big framed heading (Kuwait page, owner's reference). */
        headingStyle?: "default" | "banner";
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
        currency: "SAR" | "KWD";
        /** "starting": cards read "from 220 KWD". Default: the figure alone. */
        basis?: "starting" | "fixed";
        confirmedOn: string;
        groups: { heading: string; vehicles: LandingVehicle[] }[];
        /** Short note card: private car vs a shared seat. */
        privateVsShared?: { title: string; body: string };
        /** What moves the fare, as a short icon list. No figures until the
         *  owner confirms them. */
        fareFactors?: { heading: string; items: { icon: LandingIcon; label: string }[] };
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
        /** Without an image the steps take the full width. */
        image?: LandingImage;
        /** Airport sub-block inside the journey section (an H3, not a
         *  section of its own). */
        airport?: {
            heading: string;
            pickup: { title: string; points: string[] };
            dropoff: { title: string; body: string };
            /** May carry [anchor](/path) links. */
            links: string;
            whatsappMessage: string;
            ctaLabel: string;
        };
    };
    /** Comparison of the ways to make the trip; our row is `recommended`. */
    waysToTravel?: {
        eyebrow: string;
        heading: string;
        intro?: string;
        head: [string, string, string, string, string];
        rows: { option: string; doorToDoor: boolean; connections: string; time: string; bestFor: string; recommended?: boolean }[];
        takeaway: string;
    };
    crossing: {
        heading: string;
        intro: string;
        driverHeading: string;
        driver: string[];
        passengerHeading: string;
        passenger: string[];
        /** Driving across yourself: one short paragraph. */
        selfDrive?: string;
        callout: string;
        outro: string;
        eyebrow?: string;
        /** Photo beside the crossing options. */
        image?: LandingImage;
        /** Which crossing is used when: one card each. */
        options?: { title: string; tag?: string; body: string }[];
        /** Related pages, shown as a row of link buttons. */
        links?: { href: string; label: string }[];
    };
    included: {
        eyebrow?: string;
        heading: string;
        items: { icon: LandingIcon; title: string; body: string }[];
    };
    howToBook?: {
        heading: string;
        steps: { icon: LandingIcon; title: string; body: string }[];
    };
    nearby: {
        heading: string;
        intro: string;
        items: { href: string; name: string; blurb: string; image: LandingImage }[];
    };
    returnTrip: { text: string; href: string; label: string };
    /** Overrides "{route} Taxi: Your Questions Answered". */
    faqHeading?: string;
    order?: LandingSection[];
    /** Three ways to book: WhatsApp, the form above, email. */
    bookingMethods?: {
        heading: string;
        intro?: string;
        items: { kind: "whatsapp" | "form" | "email"; icon: LandingIcon; title: string; body: string; cta: string }[];
    };
    payment?: {
        heading: string;
        intro?: string;
        items: { icon: LandingIcon; title: string; body: string }[];
        /** Shown as a callout under the cards. */
        note: string;
    };
    documents?: {
        heading: string;
        intro?: string;
        items: { title: string; detail: string }[];
        callout: string;
    };
    /** Airport as its own section (the timeline's airport block is a
     *  sub-section of the journey). */
    airport?: {
        heading: string;
        intro: string;
        items: { icon: LandingIcon; title: string; body: string }[];
        /** May carry [anchor](/path) links. */
        links: string;
        whatsappMessage: string;
        ctaLabel: string;
    };
    destinations?: {
        heading: string;
        intro: string;
        items: { name: string; blurb: string; href?: string }[];
        link: { href: string; label: string };
    };
    /** Hotel cards. No hotel photos or logos, and no partnership claims. */
    hotels?: {
        heading: string;
        intro: string;
        items: { name: string; area: string; type: string; fromAirport: string }[];
        note: string;
    };
    finalCta?: { heading: string; body: string };
    popularRoutes: {
        heading: string;
        items: { href: string; from: string; to: string; tag: string }[];
        servicesHeading: string;
        services: { href: string; label: string }[];
    };
}
