'use client';

/**
 * Item 8: the small green "Shared" tag on a booking row, meaning the quote
 * or a booking message was handed to the customer on WhatsApp. Hover (or
 * tap) shows when.
 *
 * Also holds the stamp helper, so every place that opens WhatsApp for a
 * customer records it the same way.
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import Tooltip from '@/components/admin/Tooltip';
import { displayDate } from '@/lib/datetime';

/** WhatsApp's own glyph (lucide has no brand icons). */
export function WhatsAppIcon({ size = 12, color = '#25D366' }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path fill={color} d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.37 9.37 0 0 1 6.67 2.77 9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43zm8.03-17.46A11.3 11.3 0 0 0 12.05.72C5.8.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.6l6-1.57a11.3 11.3 0 0 0 5.44 1.39h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.03z" />
        </svg>
    );
}

/** "14 Nov 2026, 3:42 PM" in the viewer's own clock. */
function whenText(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    const time = d.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${displayDate(iso.slice(0, 10), '')}, ${time}`;
}

export default function WhatsAppSharedTag({ at }: { at: string }) {
    return (
        <Tooltip label="Shared on WhatsApp" text={`Last shared ${whenText(at)}.`}>
            <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4,
                fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.03em', textTransform: 'uppercase',
                padding: '0.15rem 0.45rem', borderRadius: 999, background: 'var(--adm-success-tint)', color: 'var(--adm-success-ink)',
            }}>
                <WhatsAppIcon size={11} color="#1DA851" /> Shared
            </span>
        </Tooltip>
    );
}

/**
 * Records that a quote or booking was just shared on WhatsApp. Returns the
 * stamp, or null if it could not be written — including before migration
 * 010 adds the column, when it quietly does nothing rather than failing the
 * share the admin actually came to do.
 */
export async function stampWhatsAppShared(
    supabase: SupabaseClient,
    table: 'quotes' | 'bookings',
    id: string | null | undefined,
): Promise<string | null> {
    if (!id) return null;
    const at = new Date().toISOString();
    const { error } = await supabase.from(table).update({ shared_via_whatsapp_at: at }).eq('id', id);
    if (error) {
        if (!/shared_via_whatsapp_at/i.test(error.message ?? '')) console.warn('[WHATSAPP_STAMP]', error.message);
        return null;
    }
    return at;
}

/** The latest WhatsApp share for a booking row: its quote's, or its own. */
export function whatsAppSharedAt(
    booking: { shared_via_whatsapp_at?: string | null },
    quote: { shared_via_whatsapp_at?: string | null; shared_at?: string | null } | null | undefined,
): string | null {
    const stamps = [quote?.shared_via_whatsapp_at, quote?.shared_at, booking.shared_via_whatsapp_at]
        .filter((s): s is string => !!s)
        .sort();
    return stamps.length ? stamps[stamps.length - 1] : null;
}
