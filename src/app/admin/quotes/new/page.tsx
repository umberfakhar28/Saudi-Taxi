'use client';
import { useState, useEffect, Suspense } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Send, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CURRENCY_CODES, formatMoney, toCurrencyCode } from '@/lib/currency';
import { displayDate, displayTime, toStorableTime, toTimeInputValue } from '@/lib/datetime';
import { useFeedback } from '@/components/admin/AdminFeedback';
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';
import { QUOTE_CUSTOMER_NOTE } from '@/lib/contact';

const VEHICLES = ['Sedan', 'SUV', 'Luxury', 'Van', 'Minibus'];

const LABEL: React.CSSProperties = { fontSize: '0.8rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 };
const HINT: React.CSSProperties = { fontSize: '0.72rem', color: '#94a3b8', marginTop: 5, lineHeight: 1.45 };
const CARD: React.CSSProperties = { background: '#fff', borderRadius: 14, border: '1px solid #e8edf2', padding: '1.5rem' };

/** Maps a booking's free-text car_type onto one of the quote vehicle tiers. */
function matchVehicle(carType?: string | null): string {
    if (!carType) return 'Sedan';
    const needle = String(carType).trim().toLowerCase();
    return VEHICLES.find(v => v.toLowerCase() === needle)
        ?? VEHICLES.find(v => needle.includes(v.toLowerCase()))
        ?? 'Sedan';
}

/*
 * The price is entered directly. The rules-based live calculator was
 * removed at the business's request, so the quote carries exactly the price
 * the admin sets — stored in total_amount, with no separate override.
 *
 * Quotes no longer carry a 24-hour validity window either: nothing here sets
 * valid_until, and no customer-facing output mentions one.
 */
function NewQuoteInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = createClient();
    const { showToast } = useFeedback();
    const { allowed, ready } = useAdminAuth();

    const [saving, setSaving] = useState(false);
    // Set when this quote is being raised against an existing booking.
    const [sourceBooking, setSourceBooking] = useState<any | null>(null);
    const [loadingBooking, setLoadingBooking] = useState(false);
    const [form, setForm] = useState({
        customer_name: '', customer_email: '', customer_phone: '',
        pickup_location: '', dropoff_location: '',
        distance_km: '', vehicle_type: 'Sedan',
        travel_date: '', travel_time: '', passengers_count: '1',
        price: '', currency: 'SAR',
        notes: '', admin_note: '',
    });

    // ?fromBooking=<id> — everything the booking already knows is filled in,
    // leaving the admin to supply only what a quote needs on top of it.
    useEffect(() => {
        const bookingId = searchParams.get('fromBooking');
        if (!bookingId) return;
        let active = true;
        setLoadingBooking(true);
        supabase
            .from('bookings')
            .select('*')
            .eq('id', bookingId)
            .maybeSingle()
            .then(({ data, error }) => {
                if (!active) return;
                setLoadingBooking(false);
                if (error || !data) {
                    showToast('error', 'That booking could not be loaded — start the quote from scratch instead.');
                    return;
                }
                setSourceBooking(data);
                setForm(f => ({
                    ...f,
                    customer_name: data.customer_name ?? '',
                    customer_email: data.customer_email ?? '',
                    customer_phone: data.customer_phone ?? '',
                    pickup_location: data.pickup_location ?? '',
                    dropoff_location: data.dropoff_location ?? '',
                    travel_date: data.travel_date ?? '',
                    travel_time: toTimeInputValue(data.travel_time),
                    passengers_count: String(data.passengers_count ?? 1),
                    vehicle_type: matchVehicle(data.car_type),
                    currency: toCurrencyCode(data.currency),
                    // A fare already agreed on the booking becomes the starting price.
                    price: data.quote_amount ? String(data.quote_amount) : '',
                    // The customer's own requirements from the booking form.
                    notes: data.special_notes ?? '',
                    // Seed the customer-facing note with the standard WhatsApp
                    // follow-up line. Only ever fills an empty field: if the
                    // admin has already typed something (or edits it and the
                    // effect re-runs) their text is kept, so reopening or
                    // regenerating a quote cannot duplicate or clobber it.
                    admin_note: f.admin_note.trim() ? f.admin_note : QUOTE_CUSTOMER_NOTE,
                }));
            });
        return () => { active = false; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const price = parseFloat(form.price);
    const hasPrice = Number.isFinite(price) && price > 0;

    const saveQuote = async (status: 'draft' | 'sent') => {
        // These five are NOT NULL on the quotes table with no default.
        const REQUIRED: [string, string][] = [
            ['customer_name', 'customer name'],
            ['customer_email', 'customer email'],
            ['customer_phone', 'phone number'],
            ['pickup_location', 'pickup location'],
            ['dropoff_location', 'drop-off location'],
        ];
        const missing = REQUIRED
            .filter(([key]) => !String((form as any)[key] ?? '').trim())
            .map(([, label]) => label);
        // A quote can be drafted before the price is known, but never sent without one.
        if (status === 'sent' && !hasPrice) missing.push('quote price');
        if (missing.length) { showToast('error', `Still needed: ${missing.join(', ')}.`); return; }

        setSaving(true);
        const quotePayload = {
            customer_name: form.customer_name, customer_email: form.customer_email,
            customer_phone: form.customer_phone, pickup_location: form.pickup_location,
            dropoff_location: form.dropoff_location,
            distance_km: parseFloat(form.distance_km) || null,
            vehicle_type: form.vehicle_type, travel_date: form.travel_date || null,
            travel_time: toStorableTime(form.travel_time),
            passengers_count: parseInt(form.passengers_count) || 1,
            total_amount: hasPrice ? price : 0,
            admin_override_amount: null,
            currency: toCurrencyCode(form.currency),
            status: 'draft' as string,
            notes: form.notes.trim() || null,
            admin_note: form.admin_note.trim() || null,
            // Ties the quote to the booking it was raised from.
            booking_id: sourceBooking?.id ?? null,
        };

        // Send the quote email BEFORE persisting a 'sent' status — "sent"
        // must mean the customer genuinely received it. If the email fails,
        // nothing is saved and the real error is shown.
        if (status === 'sent') {
            const emailRes = await fetch('/api/emails/send', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'quote_sent', quoteData: quotePayload }),
            });
            if (!emailRes.ok) {
                const e = await emailRes.json().catch(() => ({}));
                setSaving(false);
                showToast('error', 'Could not send quote to customer: ' + (e.error || 'Unknown error') + '. The quote was not saved — please retry.');
                return;
            }
            quotePayload.status = 'sent';
        }

        const { error } = await supabase.from('quotes').insert(quotePayload);
        setSaving(false);
        if (!error) {
            showToast('success', status === 'sent'
                ? `Quote sent to ${form.customer_email}.`
                : 'Quote saved as a draft.');
            router.push('/admin/quotes');
        } else if (status === 'sent') {
            showToast('error', 'The quote email was sent, but saving the record failed: ' + error.message);
        } else {
            showToast('error', 'Could not save the quote: ' + error.message);
        }
    };

    // The database refuses the insert for a read-only role regardless; this
    // avoids presenting a form whose Save button cannot work.
    if (ready && !allowed('quotes.create')) {
        return (
            <div style={{ padding: '4rem 1rem', textAlign: 'center', color: '#64748b' }}>
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>Not available for your role</div>
                <div style={{ fontSize: '0.88rem' }}>Creating quotes requires Manager access or above.</div>
            </div>
        );
    }

    const input = { className: 'admin-search-input', style: { width: '100%', boxSizing: 'border-box' as const } };

    return (
        <div style={{ maxWidth: 860 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                    <h1 className="admin-page-title">New Quote</h1>
                    <p className="admin-page-sub" style={{ margin: 0 }}>
                        {sourceBooking
                            ? 'The booking details are filled in — add the price and any message for the customer.'
                            : 'Prepare a price quote for a customer.'}
                    </p>
                </div>
                {sourceBooking && (
                    <Link href="/admin/bookings" className="admin-btn-secondary">
                        <ArrowLeft size={15} /> Back to Bookings
                    </Link>
                )}
            </div>

            {loadingBooking && (
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.85rem 1.1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#64748b' }}>
                    Loading the booking&apos;s details…
                </div>
            )}

            {sourceBooking && (
                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
                    <div style={{ fontWeight: 700, color: '#1e3a8a', fontSize: '0.88rem', marginBottom: 4 }}>
                        Quoting for booking {sourceBooking.booking_number || String(sourceBooking.id).slice(0, 8).toUpperCase()}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#1d4ed8', lineHeight: 1.55 }}>
                        {sourceBooking.customer_name} · {sourceBooking.pickup_location} → {sourceBooking.dropoff_location}
                        {sourceBooking.travel_date && <> · {displayDate(sourceBooking.travel_date)} at {displayTime(sourceBooking.travel_time)}</>}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#3b82f6', marginTop: 6 }}>
                        Everything below is editable. The saved quote stays linked to this booking.
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={CARD}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem', color: '#0f172a' }}>Customer Info</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.875rem' }}>
                        {[['customer_name', 'Full Name *'], ['customer_email', 'Email *'], ['customer_phone', 'Phone *']].map(([k, label]) => (
                            <div key={k}>
                                <label style={LABEL}>{label}</label>
                                <input value={(form as any)[k]} onChange={e => set(k, e.target.value)} {...input} placeholder={label.replace(' *', '')} />
                            </div>
                        ))}
                    </div>
                </div>

                <div style={CARD}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem', color: '#0f172a' }}>Trip Details</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.875rem' }}>
                        {[['pickup_location', 'Pickup Location *'], ['dropoff_location', 'Drop-off Location *']].map(([k, label]) => (
                            <div key={k}>
                                <label style={LABEL}>{label}</label>
                                <input value={(form as any)[k]} onChange={e => set(k, e.target.value)} {...input} placeholder={label.replace(' *', '')} />
                            </div>
                        ))}
                        <div>
                            <label style={LABEL}>Vehicle Type</label>
                            <select value={form.vehicle_type} onChange={e => set('vehicle_type', e.target.value)} className="admin-filter-select" style={{ width: '100%' }}>
                                {VEHICLES.map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={LABEL}>Distance (km) — optional</label>
                            <input type="number" min="0" value={form.distance_km} onChange={e => set('distance_km', e.target.value)} {...input} />
                        </div>
                        <div>
                            <label style={LABEL}>Travel Date</label>
                            <input type="date" value={form.travel_date} onChange={e => set('travel_date', e.target.value)} className="admin-filter-select" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={LABEL}>Travel Time</label>
                            <input type="time" value={form.travel_time} onChange={e => set('travel_time', e.target.value)} className="admin-filter-select" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={LABEL}>Passengers</label>
                            <input type="number" min="1" value={form.passengers_count} onChange={e => set('passengers_count', e.target.value)} {...input} />
                        </div>
                    </div>
                </div>

                <div style={CARD}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem', color: '#0f172a' }}>Price</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 130px', gap: '0.875rem', alignItems: 'end' }}>
                        <div>
                            <label style={LABEL}>Quote Price *</label>
                            <input type="number" min="0" step="any" value={form.price} onChange={e => set('price', e.target.value)} {...input} placeholder="Enter the price for this trip" />
                        </div>
                        <div>
                            <label style={LABEL}>Currency</label>
                            <select value={toCurrencyCode(form.currency)} onChange={e => set('currency', e.target.value)} className="admin-filter-select" style={{ width: '100%' }}>
                                {CURRENCY_CODES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                    {hasPrice && (
                        <div style={{ marginTop: '0.9rem', fontSize: '0.85rem', color: '#475569' }}>
                            The customer will be quoted <strong style={{ color: '#0f172a' }}>{formatMoney(price, form.currency)}</strong>.
                        </div>
                    )}
                </div>

                <div style={CARD}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem', color: '#0f172a' }}>Notes</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={LABEL}>Message to Customer</label>
                            <textarea value={form.admin_note} onChange={e => set('admin_note', e.target.value)} rows={3} {...input} style={{ ...input.style, resize: 'vertical', fontFamily: 'inherit' }} placeholder="e.g. An SUV can be arranged for your trip — please confirm and we’ll reserve it." />
                            <div style={HINT}>Shown prominently in the quote email and on the downloaded quote.</div>
                        </div>
                        <div>
                            <label style={LABEL}>Customer&apos;s Trip Requirements</label>
                            <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={3} {...input} style={{ ...input.style, resize: 'vertical', fontFamily: 'inherit' }} placeholder="What the customer asked for — luggage, stops, vehicle preferences…" />
                            <div style={HINT}>Also visible to the customer. Don&apos;t put internal notes here.</div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button onClick={() => saveQuote('draft')} disabled={saving} className="admin-btn-secondary">
                        <Save size={15} /> Save as Draft
                    </button>
                    <button onClick={() => saveQuote('sent')} disabled={saving} className="admin-btn-primary">
                        <Send size={15} /> {saving ? 'Saving...' : 'Send to Customer'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function NewQuotePage() {
    return (
        <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>Loading…</div>}>
            <NewQuoteInner />
        </Suspense>
    );
}
