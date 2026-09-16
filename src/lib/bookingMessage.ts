/**
 * The one place a customer's trip request is turned into a WhatsApp message.
 * The homepage search bar and the Book Online page both link to WhatsApp;
 * building the text here means both carry the same fields in the same order,
 * and a field added to the booking flow can't be forgotten in one of them.
 */
import { displayDate, displayTime } from '@/lib/datetime';

export interface BookingMessageFields {
    tripType?: string;
    from?: string;
    to?: string;
    date?: string;
    time?: string;
    returnTrip?: string;
    passengers?: string | number;
    luggage?: string | number;
    name?: string;
    email?: string;
    phone?: string;
    vehicle?: string;
    notes?: string;
}

/** "2026-10-12" + "14:30" → "12 Oct 2026 at 02:30 PM"; either part may be missing. */
export function formatWhen(date?: string, time?: string): string {
    const d = date ? displayDate(date, '') : '';
    const t = time ? displayTime(time, '') : '';
    return [d, t].filter(Boolean).join(' at ');
}

/** Empty fields are left out, so a partly filled form still reads cleanly. */
export function bookingWhatsAppText(f: BookingMessageFields): string {
    const lines: [string, unknown][] = [
        ['Trip type', f.tripType],
        ['Pickup', f.from],
        ['Destination', f.to],
        ['Date & time', formatWhen(f.date, f.time)],
        ['Return', f.returnTrip],
        ['Passengers', f.passengers],
        ['Luggage', f.luggage !== undefined && f.luggage !== '' ? `${f.luggage} bag(s)` : ''],
        ['Vehicle', f.vehicle],
        ['Name', f.name],
        ['Email', f.email],
        ['Phone', f.phone],
        ['Notes', f.notes],
    ];
    const body = lines
        .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
        .map(([k, v]) => `${k}: ${String(v).trim()}`);
    if (body.length === 0) return "Hi, I'd like to book a ride.";
    return ["Hi, I'd like a quote for this trip:", '', ...body].join('\n');
}
