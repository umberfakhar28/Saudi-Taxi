/**
 * Human-readable names for the service_type slugs stored on bookings.
 *
 * The slug ("private-taxi") is what the booking forms submit and what the
 * database holds; it should never be shown to a customer as-is. This map
 * lived inside the email route, which meant the admin tables, the invoice
 * and the exported PNG each printed the raw slug instead.
 */
const SERVICE_LABELS: Record<string, string> = {
    'airport-transfer': 'Airport Transfer',
    'hotel-transfer': 'Hotel Transfer',
    'private-taxi': 'Private Taxi',
    'umrah-package': 'Umrah Transport Package',
    'hourly-driver': 'Hourly Chauffeur',
    'ziyarat': 'Ziyarat Tour',
    'jeddah-tour': 'Jeddah City Tour',
    'alula-tour': 'AlUla Tour',
};

/** Falls back to title-casing the slug, so a new service type still reads well. */
export function serviceLabel(serviceType?: string | null): string {
    if (!serviceType) return '';
    return (
        SERVICE_LABELS[serviceType] ??
        String(serviceType).replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    );
}
