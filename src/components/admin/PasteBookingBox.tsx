'use client';

/**
 * "Paste booking details" — the box at the top of the New Booking form.
 *
 * The admin pastes a customer's WhatsApp message and presses Auto-fill.
 * lib/bookingParser reads it; this component decides what may be written
 * into the form:
 *   · only fields the parser actually found,
 *   · never a field the admin has already typed in (or edited after an
 *     earlier auto-fill),
 *   · and nothing is saved — the admin still reviews and presses Create.
 * The page highlights the filled fields until the admin touches them.
 */

import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { parseBookingText, type ParsedBooking } from '@/lib/bookingParser';
import { CURRENCY_CODES } from '@/lib/currency';

/** The New Booking form's keys this box can fill. */
export const AUTOFILL_KEYS = [
    'customer_name', 'customer_phone', 'customer_email', 'pickup_location', 'dropoff_location',
    'travel_date', 'travel_time', 'passengers_count', 'car_type', 'quote_amount', 'currency', 'special_notes',
] as const;

/** Values the empty form starts with; a field still holding one counts as empty. */
const DEFAULTS: Record<string, unknown> = { passengers_count: 1, currency: 'SAR' };

function isBlank(key: string, value: unknown): boolean {
    if (value === null || value === undefined || String(value).trim() === '') return true;
    return key in DEFAULTS && String(value) === String(DEFAULTS[key]);
}

/**
 * Merges what was parsed into the form. Pure, so the rule "never overwrite
 * what the admin typed" lives in one testable place.
 */
export function mergeParsed(
    form: Record<string, any>,
    parsed: ParsedBooking,
    touched: ReadonlySet<string>,
): { next: Record<string, any>; filled: string[]; notes: string[] } {
    const next = { ...form };
    const filled: string[] = [];
    const notes: string[] = [];

    const candidate: Record<string, unknown> = { ...parsed };
    delete candidate.luggage_count; // carried in special_notes, as the public form does

    // The bookings table takes SAR, AED and KWD only. A price in any other
    // currency is not put in the amount box (it would be saved as riyals);
    // it goes into the notes for the admin to convert.
    if (parsed.quote_amount !== undefined && parsed.currency && !(CURRENCY_CODES as string[]).includes(parsed.currency)) {
        notes.push(`Price in the message is ${parsed.quote_amount} ${parsed.currency} — not filled in, as bookings are recorded in ${CURRENCY_CODES.join(' / ')}.`);
        const priceNote = `Price quoted: ${parsed.quote_amount} ${parsed.currency}`;
        candidate.special_notes = [parsed.special_notes, priceNote].filter(Boolean).join(' | ');
        delete candidate.quote_amount;
        delete candidate.currency;
    }

    for (const key of AUTOFILL_KEYS) {
        const value = candidate[key];
        if (value === undefined || value === null || value === '') continue;
        if (touched.has(key) || !isBlank(key, next[key])) continue;
        next[key] = typeof value === 'number' ? String(value) : value;
        filled.push(key);
    }
    return { next, filled, notes };
}

const FIELD_NAMES: Record<string, string> = {
    customer_name: 'name', customer_phone: 'phone', customer_email: 'email', pickup_location: 'pickup',
    dropoff_location: 'drop-off', travel_date: 'date', travel_time: 'time', passengers_count: 'passengers',
    car_type: 'vehicle', quote_amount: 'price', currency: 'currency', special_notes: 'notes',
};

export default function PasteBookingBox({
    form, touched, onFill,
}: {
    form: Record<string, any>;
    touched: ReadonlySet<string>;
    onFill: (next: Record<string, any>, filled: string[]) => void;
}) {
    const [text, setText] = useState('');
    const [result, setResult] = useState<{ tone: 'ok' | 'none'; lines: string[] } | null>(null);

    const autofill = () => {
        const { fields, warnings } = parseBookingText(text);
        const { next, filled, notes } = mergeParsed(form, fields, touched);
        const found = Object.keys(fields).length;
        if (filled.length) onFill(next, filled);
        const skipped = found - filled.length - (fields.luggage_count !== undefined ? 1 : 0);
        setResult(filled.length
            ? {
                tone: 'ok',
                lines: [
                    `${filled.length} field${filled.length === 1 ? '' : 's'} filled (${filled.map((k) => FIELD_NAMES[k]).join(', ')}) — please review before saving.`,
                    ...(skipped > 0 ? [`${skipped} detected value${skipped === 1 ? ' was' : 's were'} not used because you had already filled that field.`] : []),
                    ...warnings, ...notes,
                ],
            }
            : {
                tone: 'none',
                lines: [found
                    ? 'Everything detected is already filled in — nothing was changed.'
                    : 'No booking details recognised. Try pasting the full message, or fill the form by hand.'],
            });
    };

    return (
        <div style={{ background: 'var(--adm-card)', border: '1px dashed var(--adm-line-strong)', borderRadius: 12, padding: '1rem' }}>
            <label htmlFor="paste-booking" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--adm-ink)', display: 'block', marginBottom: 6 }}>
                Paste booking details
            </label>
            <textarea
                id="paste-booking"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="admin-search-input"
                placeholder={'Paste the customer\'s WhatsApp message, e.g.\nName: Ahmed · Pickup: Riyadh Airport · Drop-off: Bahrain · 15 Nov 3pm · 4 pax · GMC Yukon · 450 SAR'}
                style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit', padding: '0.65rem 1rem', lineHeight: 1.5 }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 8, flexWrap: 'wrap' }}>
                <button type="button" onClick={autofill} disabled={!text.trim()} className="admin-btn-primary" style={{ padding: '0.5rem 1rem' }}>
                    <Wand2 size={15} /> Auto-fill
                </button>
                <span style={{ fontSize: '0.72rem', color: 'var(--adm-muted)' }}>
                    Fills only empty fields. Nothing is saved until you press Create Booking.
                </span>
            </div>
            {result && (
                <div role="status" style={{
                    marginTop: 10, padding: '0.6rem 0.8rem', borderRadius: 8, fontSize: '0.78rem', lineHeight: 1.55,
                    background: result.tone === 'ok' ? 'var(--adm-gold-tint)' : 'var(--adm-tint)',
                    color: result.tone === 'ok' ? 'var(--adm-gold-ink)' : 'var(--adm-text)',
                    border: `1px solid ${result.tone === 'ok' ? 'var(--adm-gold)' : 'var(--adm-line)'}`,
                }}>
                    {result.lines.map((l, i) => <div key={i} style={{ fontWeight: i === 0 ? 700 : 500 }}>{l}</div>)}
                </div>
            )}
        </div>
    );
}
