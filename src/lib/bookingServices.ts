/**
 * The nine bookable services, in one place.
 *
 * These ids are written to `bookings.service_type` and are what the admin
 * panel and the email templates read, so they are a stored contract: never
 * rename one without a data migration. Only the labels are presentational.
 *
 * This list used to live inside BookOnlineClient, which meant the booking
 * API had no way to check an incoming `service_type` against it — any string
 * at all was accepted and stored. Defining it in a plain module lets both
 * the client form and the server route validate against the same source.
 *
 * Arabic labels live in SERVICE_LABELS_AR (src/lib/i18n.ts), keyed by these
 * same ids.
 */
export interface BookingService {
    id: string;
    label: string;
    icon: string;
}

export const BOOKING_SERVICES: readonly BookingService[] = [
    { id: "airport-transfer", label: "Airport Transfer", icon: "✈️" },
    { id: "hotel-transfer", label: "Hotel Transfer", icon: "🏨" },
    { id: "private-taxi", label: "Private Taxi", icon: "🚗" },
    { id: "umrah-package", label: "Umrah Transport Package", icon: "🕌" },
    { id: "hourly-driver", label: "Hourly Chauffeur", icon: "🕐" },
    { id: "corporate-transport", label: "Corporate Transportation", icon: "💼" },
    { id: "ziyarat", label: "Ziyarat Tour", icon: "🌙" },
    { id: "jeddah-tour", label: "Jeddah City Tour", icon: "🌆" },
    { id: "alula-tour", label: "AlUla Tour", icon: "🏜️" },
] as const;

/** Set of valid `service_type` values, for validation on either side. */
export const SERVICE_IDS: ReadonlySet<string> = new Set(BOOKING_SERVICES.map((s) => s.id));
