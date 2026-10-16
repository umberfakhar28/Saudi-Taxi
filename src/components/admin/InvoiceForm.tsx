'use client';

/**
 * The one form for an invoice's details.
 *
 * Raising an invoice used to be a single click that defaulted everything:
 * the admin could not set a payment method, record a part payment, add a
 * surcharge or a discount, say whether the trip was a return, or write a
 * note — even though most of those columns already existed on the table with
 * nothing able to write to them.
 *
 * The same component serves both places an invoice is written, so the two
 * can never drift apart:
 *   · Bookings → Generate Invoice, prefilled from the booking
 *   · Invoice detail → Edit, prefilled from the saved invoice
 *
 * It owns no persistence. The caller passes the current values and receives
 * changes; saving, auditing and toasts stay where they already were.
 */

import { CURRENCY_CODES, formatMoney, toCurrencyCode } from '@/lib/currency';
import { toStorableTime, toTimeInputValue } from '@/lib/datetime';
import {
    INVOICE_STATUSES,
    PAYMENT_METHODS,
    TRIP_TYPES,
    computeInvoiceTotal,
    taxFromRate,
} from '@/lib/invoiceDocument';

/** Everything the form edits. Strings throughout — these are form values;
 *  the caller converts to numbers and nulls once, on save. */
export interface InvoiceFormValues {
    invoice_date: string;
    due_date: string;
    status: string;
    payment_method: string;

    customer_name: string;
    customer_phone: string;
    customer_email: string;
    billing_address: string;

    pickup_location: string;
    dropoff_location: string;
    travel_date: string;
    travel_time: string;
    trip_type: string;
    return_date: string;
    return_time: string;
    service_type: string;
    vehicle_type: string;
    passengers_count: string;
    luggage_count: string;

    currency: string;
    subtotal: string;
    extra_charges: string;
    extra_charges_label: string;
    tax_rate: string;
    discount_amount: string;
    paid_amount: string;

    notes: string;
    payment_notes: string;
}

/** A blank form. Exported so both callers start from the same shape. */
export function emptyInvoiceForm(): InvoiceFormValues {
    return {
        invoice_date: '', due_date: '', status: 'unpaid', payment_method: '',
        customer_name: '', customer_phone: '', customer_email: '', billing_address: '',
        pickup_location: '', dropoff_location: '', travel_date: '', travel_time: '',
        trip_type: 'one-way', return_date: '', return_time: '', service_type: '',
        vehicle_type: '', passengers_count: '', luggage_count: '',
        currency: 'SAR', subtotal: '', extra_charges: '', extra_charges_label: '',
        tax_rate: '', discount_amount: '', paid_amount: '',
        notes: '', payment_notes: '',
    };
}

const str = (v: unknown): string => (v === null || v === undefined ? '' : String(v));
/** A stored 0 is not a figure worth showing in an optional money box. */
const money = (v: unknown): string => (v === null || v === undefined || Number(v) === 0 ? '' : String(v));

/**
 * Pulls "Luggage: 3 bag(s)" out of a booking's notes.
 *
 * Luggage has no column on `bookings` — the public booking form writes it
 * into special_notes alongside the return leg. Reading it back is better
 * than making the admin retype what the customer already told us; if the
 * note says nothing, the field simply starts empty.
 */
export function luggageFromNotes(notes?: string | null): string {
    const m = /Luggage:\s*(\d+)/i.exec(String(notes ?? ''));
    return m ? m[1] : '';
}

/** Prefills the form from the booking an invoice is being raised against. */
export function invoiceFormFromBooking(b: Record<string, any>): InvoiceFormValues {
    const today = new Date().toISOString().slice(0, 10);
    const due = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
    return {
        ...emptyInvoiceForm(),
        invoice_date: today,
        due_date: due,
        status: 'unpaid',
        customer_name: str(b.customer_name),
        customer_phone: str(b.customer_phone),
        customer_email: str(b.customer_email),
        pickup_location: str(b.pickup_location),
        dropoff_location: str(b.dropoff_location),
        travel_date: str(b.travel_date),
        travel_time: toTimeInputValue(b.travel_time),
        service_type: str(b.service_type),
        vehicle_type: str(b.car_type),
        passengers_count: b.passengers_count ? String(b.passengers_count) : '',
        luggage_count: luggageFromNotes(b.special_notes),
        currency: toCurrencyCode(b.currency),
        subtotal: money(b.quote_amount),
    };
}

/** Prefills the form from an invoice already saved. */
export function invoiceFormFromInvoice(inv: Record<string, any>): InvoiceFormValues {
    return {
        ...emptyInvoiceForm(),
        invoice_date: str(inv.invoice_date) || str(inv.created_at).slice(0, 10),
        due_date: str(inv.due_date),
        status: str(inv.status) || 'unpaid',
        payment_method: str(inv.payment_method),
        customer_name: str(inv.customer_name),
        customer_phone: str(inv.customer_phone),
        customer_email: str(inv.customer_email),
        billing_address: str(inv.billing_address),
        pickup_location: str(inv.pickup_location),
        dropoff_location: str(inv.dropoff_location),
        travel_date: str(inv.travel_date),
        travel_time: toTimeInputValue(inv.travel_time),
        trip_type: str(inv.trip_type) || 'one-way',
        return_date: str(inv.return_date),
        return_time: toTimeInputValue(inv.return_time),
        service_type: str(inv.service_type),
        vehicle_type: str(inv.vehicle_type),
        passengers_count: inv.passengers_count == null ? '' : String(inv.passengers_count),
        luggage_count: inv.luggage_count == null ? '' : String(inv.luggage_count),
        currency: toCurrencyCode(inv.currency),
        subtotal: money(inv.subtotal),
        extra_charges: money(inv.extra_charges),
        extra_charges_label: str(inv.extra_charges_label),
        tax_rate: money(inv.tax_rate),
        discount_amount: money(inv.discount_amount),
        paid_amount: money(inv.paid_amount),
        notes: str(inv.notes),
        payment_notes: str(inv.payment_notes),
    };
}

/** The derived figures, computed the same way the document computes them. */
export function invoiceFormTotals(v: InvoiceFormValues) {
    const subtotal = Number(v.subtotal) || 0;
    const extra = Number(v.extra_charges) || 0;
    const taxAmount = taxFromRate(subtotal, v.tax_rate);
    const discount = Number(v.discount_amount) || 0;
    const total = computeInvoiceTotal({
        subtotal, extra_charges: extra, tax_amount: taxAmount, discount_amount: discount,
    });
    // "Paid" only counts when the status says something was paid, so a stale
    // figure left in the box cannot silently change what is owed.
    const paid = v.status === 'paid' ? total : v.status === 'partially_paid' ? (Number(v.paid_amount) || 0) : 0;
    return { subtotal, extra, taxAmount, discount, total, paid, balance: Math.max(total - paid, 0) };
}

/** Turns form values into a row ready for `invoices`. Empty optional fields
 *  become null, never '' or 0, so "not recorded" has one representation. */
export function invoiceFormToRow(v: InvoiceFormValues) {
    const t = invoiceFormTotals(v);
    const orNull = (s: string) => (s.trim() ? s.trim() : null);
    const numOrNull = (s: string) => (s.trim() === '' ? null : Number(s));
    return {
        invoice_date: orNull(v.invoice_date),
        due_date: orNull(v.due_date),
        status: v.status,
        payment_method: orNull(v.payment_method),
        customer_name: v.customer_name.trim(),
        customer_phone: orNull(v.customer_phone),
        customer_email: orNull(v.customer_email),
        billing_address: orNull(v.billing_address),
        pickup_location: orNull(v.pickup_location),
        dropoff_location: orNull(v.dropoff_location),
        travel_date: orNull(v.travel_date),
        // <input type="time"> yields "HH:MM"; everything else in the app
        // stores "HH:MM:SS" (bookings.travel_time is a Postgres `time`, and
        // migration 005 matched invoices to it). Normalising here keeps an
        // invoice's time byte-identical to the booking's.
        travel_time: toStorableTime(v.travel_time),
        trip_type: v.trip_type === 'return' ? 'return' : 'one-way',
        // A return date on a one-way trip would be a contradiction, so it is
        // dropped with the trip type rather than kept quietly in the row.
        return_date: v.trip_type === 'return' ? orNull(v.return_date) : null,
        return_time: v.trip_type === 'return' ? toStorableTime(v.return_time) : null,
        service_type: orNull(v.service_type),
        vehicle_type: orNull(v.vehicle_type),
        passengers_count: numOrNull(v.passengers_count),
        luggage_count: numOrNull(v.luggage_count),
        currency: toCurrencyCode(v.currency),
        subtotal: t.subtotal,
        extra_charges: t.extra > 0 ? t.extra : null,
        extra_charges_label: t.extra > 0 ? orNull(v.extra_charges_label) : null,
        tax_rate: Number(v.tax_rate) || 0,
        tax_amount: t.taxAmount,
        discount_amount: t.discount,
        total_amount: t.total,
        paid_amount: t.paid,
        notes: orNull(v.notes),
        payment_notes: orNull(v.payment_notes),
    };
}

/* ── Presentation ─────────────────────────────────────────────────── */

const LABEL: React.CSSProperties = {
    fontSize: '0.7rem', fontWeight: 700, color: '#64748b',
    textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5, display: 'block',
};
const FIELD: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box', padding: '0.55rem 0.7rem',
    border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.88rem',
    background: '#fff', color: '#0f172a', fontFamily: 'inherit',
};
const SECTION: React.CSSProperties = {
    background: '#fff', border: '1px solid #e9eef5', borderRadius: 12,
    padding: '1.1rem 1.2rem', marginBottom: '1rem',
};
const SECTION_TITLE: React.CSSProperties = {
    fontSize: '0.72rem', fontWeight: 800, color: '#0f172a',
    textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.9rem',
};
const HINT: React.CSSProperties = { fontSize: '0.7rem', color: '#94a3b8', marginTop: 4 };

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
    return (
        <div>
            <label style={LABEL}>{label}</label>
            {children}
            {hint && <div style={HINT}>{hint}</div>}
        </div>
    );
}

/** Responsive two-up row: side by side on a desktop modal, stacked on a
 *  phone. `auto-fit` rather than a media query so it also behaves inside the
 *  narrower edit panel on the invoice page. */
const ROW: React.CSSProperties = {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.9rem',
};

export interface InvoiceFormProps {
    value: InvoiceFormValues;
    onChange: (next: InvoiceFormValues) => void;
    /** Hidden when the caller already shows the customer elsewhere. */
    showCustomer?: boolean;
}

export default function InvoiceForm({ value, onChange, showCustomer = true }: InvoiceFormProps) {
    const set = <K extends keyof InvoiceFormValues>(key: K, v: InvoiceFormValues[K]) =>
        onChange({ ...value, [key]: v });
    const totals = invoiceFormTotals(value);
    const currency = toCurrencyCode(value.currency);
    const isReturn = value.trip_type === 'return';

    return (
        <div>
            {/* ── Invoice & payment ─────────────────────────────────── */}
            <div style={SECTION}>
                <div style={SECTION_TITLE}>Invoice &amp; Payment</div>
                <div style={ROW}>
                    <Field label="Invoice date">
                        <input type="date" style={FIELD} value={value.invoice_date}
                            onChange={(e) => set('invoice_date', e.target.value)} />
                    </Field>
                    <Field label="Payment due">
                        <input type="date" style={FIELD} value={value.due_date}
                            onChange={(e) => set('due_date', e.target.value)} />
                    </Field>
                    <Field label="Payment status">
                        <select style={FIELD} value={value.status} onChange={(e) => set('status', e.target.value)}>
                            {INVOICE_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                    </Field>
                    <Field label="Payment method">
                        <select style={FIELD} value={value.payment_method}
                            onChange={(e) => set('payment_method', e.target.value)}>
                            <option value="">Not recorded</option>
                            {PAYMENT_METHODS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                        </select>
                    </Field>
                </div>
            </div>

            {/* ── Customer ──────────────────────────────────────────── */}
            {showCustomer && (
                <div style={SECTION}>
                    <div style={SECTION_TITLE}>Customer</div>
                    <div style={ROW}>
                        <Field label="Name *">
                            <input style={FIELD} value={value.customer_name}
                                onChange={(e) => set('customer_name', e.target.value)} />
                        </Field>
                        <Field label="Phone / WhatsApp">
                            <input style={FIELD} value={value.customer_phone}
                                onChange={(e) => set('customer_phone', e.target.value)} />
                        </Field>
                        <Field label="Email" hint="Optional — leave blank if the customer has none.">
                            <input type="email" style={FIELD} value={value.customer_email}
                                onChange={(e) => set('customer_email', e.target.value)} />
                        </Field>
                    </div>
                    <div style={{ marginTop: '0.9rem' }}>
                        <Field label="Billing address" hint="Optional. Shown under the customer's details on the invoice.">
                            <textarea rows={2} style={{ ...FIELD, resize: 'vertical' }} value={value.billing_address}
                                onChange={(e) => set('billing_address', e.target.value)} />
                        </Field>
                    </div>
                </div>
            )}

            {/* ── Trip ──────────────────────────────────────────────── */}
            <div style={SECTION}>
                <div style={SECTION_TITLE}>Trip</div>
                <div style={ROW}>
                    <Field label="Pickup location">
                        <input style={FIELD} value={value.pickup_location}
                            onChange={(e) => set('pickup_location', e.target.value)} />
                    </Field>
                    <Field label="Destination">
                        <input style={FIELD} value={value.dropoff_location}
                            onChange={(e) => set('dropoff_location', e.target.value)} />
                    </Field>
                </div>
                <div style={{ ...ROW, marginTop: '0.9rem' }}>
                    <Field label="Pickup date">
                        <input type="date" style={FIELD} value={value.travel_date}
                            onChange={(e) => set('travel_date', e.target.value)} />
                    </Field>
                    <Field label="Pickup time">
                        <input type="time" style={FIELD} value={value.travel_time}
                            onChange={(e) => set('travel_time', e.target.value)} />
                    </Field>
                    <Field label="Trip type">
                        <select style={FIELD} value={value.trip_type} onChange={(e) => set('trip_type', e.target.value)}>
                            {TRIP_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                    </Field>
                </div>
                {/* The return leg appears only when there is one — a one-way
                    trip should not be asked for a return date at all. */}
                {isReturn && (
                    <div style={{ ...ROW, marginTop: '0.9rem' }}>
                        <Field label="Return date">
                            <input type="date" style={FIELD} value={value.return_date}
                                min={value.travel_date || undefined}
                                onChange={(e) => set('return_date', e.target.value)} />
                        </Field>
                        <Field label="Return time">
                            <input type="time" style={FIELD} value={value.return_time}
                                onChange={(e) => set('return_time', e.target.value)} />
                        </Field>
                    </div>
                )}
                <div style={{ ...ROW, marginTop: '0.9rem' }}>
                    <Field label="Vehicle">
                        <input style={FIELD} value={value.vehicle_type} placeholder="e.g. Toyota Hiace"
                            onChange={(e) => set('vehicle_type', e.target.value)} />
                    </Field>
                    <Field label="Passengers">
                        <input type="number" min={0} style={FIELD} value={value.passengers_count}
                            onChange={(e) => set('passengers_count', e.target.value)} />
                    </Field>
                    <Field label="Luggage (bags)">
                        <input type="number" min={0} style={FIELD} value={value.luggage_count}
                            onChange={(e) => set('luggage_count', e.target.value)} />
                    </Field>
                </div>
            </div>

            {/* ── Amounts ───────────────────────────────────────────── */}
            <div style={SECTION}>
                <div style={SECTION_TITLE}>Amounts</div>
                <div style={ROW}>
                    <Field label="Currency">
                        <select style={FIELD} value={currency} onChange={(e) => set('currency', e.target.value)}>
                            {CURRENCY_CODES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </Field>
                    <Field label="Fare">
                        <input type="number" min={0} step="0.01" style={FIELD} value={value.subtotal}
                            onChange={(e) => set('subtotal', e.target.value)} />
                    </Field>
                    <Field label="Discount">
                        <input type="number" min={0} step="0.01" style={FIELD} value={value.discount_amount}
                            onChange={(e) => set('discount_amount', e.target.value)} />
                    </Field>
                </div>
                <div style={{ ...ROW, marginTop: '0.9rem' }}>
                    <Field label="Additional charges">
                        <input type="number" min={0} step="0.01" style={FIELD} value={value.extra_charges}
                            onChange={(e) => set('extra_charges', e.target.value)} />
                    </Field>
                    <Field label="Charge description" hint="Named on the invoice, e.g. waiting time.">
                        <input style={FIELD} value={value.extra_charges_label} placeholder="Waiting time"
                            onChange={(e) => set('extra_charges_label', e.target.value)} />
                    </Field>
                    <Field label="VAT %" hint="Leave blank for no VAT.">
                        <input type="number" min={0} step="0.01" style={FIELD} value={value.tax_rate}
                            onChange={(e) => set('tax_rate', e.target.value)} />
                    </Field>
                </div>

                {/* Live total, so the figure about to be saved is the figure
                    on screen. Uses the same helpers the document does. */}
                <div style={{ marginTop: '1rem', background: '#0f172a', borderRadius: 10, padding: '0.9rem 1.1rem' }}>
                    {[
                        ['Fare', formatMoney(totals.subtotal, currency)],
                        totals.extra > 0 ? [value.extra_charges_label.trim() || 'Additional charges', formatMoney(totals.extra, currency)] : null,
                        totals.taxAmount > 0 ? [`VAT (${Number(value.tax_rate)}%)`, formatMoney(totals.taxAmount, currency)] : null,
                        totals.discount > 0 ? ['Discount', `−${formatMoney(totals.discount, currency)}`] : null,
                    ].filter(Boolean).map((r) => {
                        const [label, amount] = r as string[];
                        return (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>
                                <span>{label}</span><span>{amount}</span>
                            </div>
                        );
                    })}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.05rem', color: '#fbbf24', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 8 }}>
                        <span>Total</span><span>{formatMoney(totals.total, currency)}</span>
                    </div>
                    {totals.paid > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>
                            <span>Paid</span><span>{`−${formatMoney(totals.paid, currency)}`}</span>
                        </div>
                    )}
                    {totals.paid > 0 && totals.balance > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginTop: 4 }}>
                            <span>Balance due</span><span>{formatMoney(totals.balance, currency)}</span>
                        </div>
                    )}
                </div>

                {/* Only a part payment needs a figure typed; "Paid" means the
                    whole total, and "Unpaid" means nothing has been paid. */}
                {value.status === 'partially_paid' && (
                    <div style={{ marginTop: '0.9rem' }}>
                        <Field label="Amount paid so far" hint={`Balance will show as ${formatMoney(totals.balance, currency)}.`}>
                            <input type="number" min={0} step="0.01" style={FIELD} value={value.paid_amount}
                                onChange={(e) => set('paid_amount', e.target.value)} />
                        </Field>
                    </div>
                )}
            </div>

            {/* ── Notes ─────────────────────────────────────────────── */}
            <div style={SECTION}>
                <div style={SECTION_TITLE}>Notes</div>
                <Field label="Note for the customer" hint="Shown on the invoice, the PDF and the invoice email.">
                    <textarea rows={2} style={{ ...FIELD, resize: 'vertical' }} value={value.notes}
                        onChange={(e) => set('notes', e.target.value)} />
                </Field>
                <div style={{ marginTop: '0.9rem' }}>
                    <Field label="Payment details" hint="Bank account, reference, or how the cash was handed over.">
                        <textarea rows={2} style={{ ...FIELD, resize: 'vertical' }} value={value.payment_notes}
                            onChange={(e) => set('payment_notes', e.target.value)} />
                    </Field>
                </div>
            </div>
        </div>
    );
}
