/**
 * One description of what an invoice says, shared by every place that shows
 * one.
 *
 * The invoice is rendered four times over: the detail page, the preview
 * modal on the Bookings page, the PNG/PDF export, and the invoice email.
 * Each had grown its own copy of the arithmetic and its own idea of which
 * rows to show, which is how the due date came to be stored on every invoice
 * and displayed on none, and how a part-paid invoice could show a balance in
 * one place and not another.
 *
 * So the money is worked out once here, the rows are chosen once here, and
 * the four renderers only decide how to draw what this returns. Adding a
 * field means adding it once.
 *
 * Deliberately dependency-free beyond the existing formatting helpers, so the
 * same module runs in a client component, in the canvas exporter, and in the
 * server-side email route.
 */

import { formatMoney, toCurrencyCode, type CurrencyCode } from './currency';
import { displayDate, displayTime } from './datetime';
import { serviceLabel } from './serviceLabels';

/* ── Vocabulary ───────────────────────────────────────────────────── */

export const PAYMENT_METHODS = [
    { value: 'cash', label: 'Cash' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'card', label: 'Card' },
    { value: 'online', label: 'Online Payment' },
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number]['value'];

/** Matches the invoices_payment_method_check constraint (migration 007). */
export function paymentMethodLabel(value?: string | null): string {
    if (!value) return '';
    return PAYMENT_METHODS.find((m) => m.value === value)?.label ?? '';
}

export const TRIP_TYPES = [
    { value: 'one-way', label: 'One Way' },
    { value: 'return', label: 'Return' },
] as const;

export function tripTypeLabel(value?: string | null): string {
    if (!value) return '';
    return TRIP_TYPES.find((t) => t.value === value)?.label ?? '';
}

export const INVOICE_STATUSES = [
    { value: 'unpaid', label: 'Unpaid' },
    { value: 'partially_paid', label: 'Partially Paid' },
    { value: 'paid', label: 'Paid' },
] as const;

export function invoiceStatusLabel(value?: string | null): string {
    return INVOICE_STATUSES.find((s) => s.value === (value || 'unpaid'))?.label
        ?? String(value ?? 'Unpaid').replace(/_/g, ' ');
}

/* ── The stored shape ─────────────────────────────────────────────── */

/** An `invoices` row, as every renderer receives it. Fields added by
 *  migration 007 are optional throughout: the invoices raised before it
 *  simply have none, and are rendered without those lines rather than with
 *  blanks or zeroes. */
export interface InvoiceRecord {
    id?: string | null;
    invoice_number?: string | null;
    booking_id?: string | null;
    booking_number?: string | null;
    created_at?: string | null;
    invoice_date?: string | null;
    due_date?: string | null;
    status?: string | null;

    customer_name?: string | null;
    customer_phone?: string | null;
    customer_email?: string | null;
    billing_address?: string | null;

    pickup_location?: string | null;
    dropoff_location?: string | null;
    travel_date?: string | null;
    travel_time?: string | null;
    trip_type?: string | null;
    return_date?: string | null;
    return_time?: string | null;
    service_type?: string | null;
    vehicle_type?: string | null;
    passengers_count?: number | string | null;
    luggage_count?: number | string | null;

    subtotal?: number | string | null;
    extra_charges?: number | string | null;
    extra_charges_label?: string | null;
    tax_rate?: number | string | null;
    tax_amount?: number | string | null;
    discount_amount?: number | string | null;
    total_amount?: number | string | null;
    paid_amount?: number | string | null;
    currency?: string | null;

    payment_method?: string | null;
    payment_notes?: string | null;
    notes?: string | null;

    /** "INVOICE" by default; the quote export passes "Quotation". */
    documentTitle?: string;
    /** Heading for `notes`; quotes say "Your trip requirements". */
    notesLabel?: string;
    /** A message written by the team for the customer. */
    adminNote?: string | null;
}

/* ── The view model ───────────────────────────────────────────────── */

export interface MetaCell {
    label: string;
    value: string;
    /** The one figure that should carry visual weight. */
    strong?: boolean;
}

export interface DetailRow {
    label: string;
    value: string;
}

export interface TotalRow {
    label: string;
    value: string;
    kind: 'line' | 'total' | 'credit' | 'balance';
}

export interface NoteBlockData {
    label: string;
    text: string;
    tone: 'accent' | 'plain';
}

export interface InvoiceDocument {
    title: string;
    number: string;
    statusValue: string;
    statusLabel: string;
    currency: CurrencyCode;

    /** Issued / due / amount outstanding. Only the cells that have a fact. */
    metaCells: MetaCell[];

    billToName: string;
    /** Phone, email, address — whichever exist, in that order. */
    billToLines: string[];

    pickup: string;
    dropoff: string;
    /** "04 Dec 2026, 02:30 PM" — the date alone if no time was recorded. */
    outboundWhen: string;
    /** Populated only for a return trip with a return date. */
    returnWhen: string;
    /** Vehicle, passengers, luggage, trip type — whichever are known. */
    tripDetails: DetailRow[];

    lineDescription: string;
    /** "Booking Ref: BK-…" or ''. */
    lineReference: string;
    lineAmount: string;

    totalRows: TotalRow[];
    notes: NoteBlockData[];

    /** True once nothing is outstanding. */
    settled: boolean;
    /** Formatted due date, or ''. */
    dueOn: string;
    /** The single sentence that closes the document. */
    footerNote: string;
    /** "Cash" / "Bank Transfer" / ''. */
    paymentMethod: string;
}

const num = (v: unknown): number => {
    const n = Number(v ?? 0);
    return Number.isFinite(n) ? n : 0;
};

const text = (v: unknown): string => (typeof v === 'string' ? v.trim() : v == null ? '' : String(v).trim());

/**
 * The total an invoice should charge, from its parts.
 *
 * Exported so the admin form can show the same figure it is about to save,
 * and so the form and the document can never disagree about the arithmetic.
 */
export function computeInvoiceTotal(parts: {
    subtotal?: number | string | null;
    extra_charges?: number | string | null;
    tax_amount?: number | string | null;
    discount_amount?: number | string | null;
}): number {
    const gross = num(parts.subtotal) + num(parts.extra_charges) + num(parts.tax_amount) - num(parts.discount_amount);
    // A discount larger than the fare should read as nothing to pay, never as
    // a negative amount the customer might think is owed back to them.
    return Math.max(Math.round(gross * 1000) / 1000, 0);
}

/** Tax from a percentage rate, for the form's live recalculation. */
export function taxFromRate(subtotal: number | string | null | undefined, rate: number | string | null | undefined): number {
    const amount = (num(subtotal) * num(rate)) / 100;
    return Math.round(amount * 100) / 100;
}

/**
 * Turns a stored invoice into everything the four renderers need.
 *
 * Every optional field follows the same rule: present it when it was
 * recorded, leave the line out entirely when it was not. Nothing here
 * invents a default, a zero or a placeholder — an invoice raised before
 * migration 007 is simply a shorter document, not a document full of
 * blanks.
 */
export function buildInvoiceDocument(inv: InvoiceRecord): InvoiceDocument {
    const currency = toCurrencyCode(inv.currency);
    const money = (v: number | string | null | undefined) => formatMoney(num(v), currency);

    // ── Money ────────────────────────────────────────────────────────
    const subtotal = num(inv.subtotal ?? inv.total_amount);
    const extra = num(inv.extra_charges);
    const tax = num(inv.tax_amount);
    const discount = num(inv.discount_amount);
    // Trust the stored total: it is what the customer was told to pay, and
    // the four invoices raised before the parts existed have only this.
    const total = num(inv.total_amount);
    const paid = num(inv.paid_amount);
    const balance = Math.max(total - paid, 0);
    const settled = (inv.status || '') === 'paid' || (total > 0 && paid >= total);

    // ── Dates ────────────────────────────────────────────────────────
    const issuedOn = displayDate(inv.invoice_date ?? inv.created_at, '');
    const dueOn = displayDate(inv.due_date, '');

    const metaCells: MetaCell[] = [];
    if (issuedOn) metaCells.push({ label: 'Issued', value: issuedOn });
    if (dueOn && !settled) metaCells.push({ label: 'Payment due', value: dueOn });
    if (dueOn || paid > 0) {
        metaCells.push(settled
            ? { label: 'Amount paid', value: money(total), strong: true }
            : { label: 'Amount due', value: money(balance), strong: true });
    }

    // ── Bill to ──────────────────────────────────────────────────────
    // Email is optional for a customer, and an address is rarer still; the
    // block closes up around whatever is missing.
    const billToLines = [text(inv.customer_phone), text(inv.customer_email), text(inv.billing_address)]
        .filter(Boolean);

    // ── Trip ─────────────────────────────────────────────────────────
    const whenOf = (d?: string | null, t?: string | null) =>
        [displayDate(d, ''), displayTime(t, '')].filter(Boolean).join(', ');

    const outboundWhen = whenOf(inv.travel_date, inv.travel_time);
    const isReturn = inv.trip_type === 'return';
    const returnWhen = isReturn ? whenOf(inv.return_date, inv.return_time) : '';

    const passengers = inv.passengers_count == null || inv.passengers_count === ''
        ? null : num(inv.passengers_count);
    const luggage = inv.luggage_count == null || inv.luggage_count === ''
        ? null : num(inv.luggage_count);

    const tripDetails: DetailRow[] = [];
    if (inv.trip_type) tripDetails.push({ label: 'Trip', value: tripTypeLabel(inv.trip_type) });
    if (text(inv.vehicle_type)) tripDetails.push({ label: 'Vehicle', value: text(inv.vehicle_type) });
    if (passengers !== null) {
        tripDetails.push({ label: 'Passengers', value: String(passengers) });
    }
    if (luggage !== null) {
        tripDetails.push({ label: 'Luggage', value: `${luggage} ${luggage === 1 ? 'bag' : 'bags'}` });
    }

    // ── The billed line ──────────────────────────────────────────────
    const service = serviceLabel(inv.service_type) || 'Transportation Service';
    const lineDescription = isReturn ? `${service} (return)` : service;
    const ref = text(inv.booking_number);

    // ── Totals ───────────────────────────────────────────────────────
    const totalRows: TotalRow[] = [{ label: 'Subtotal', value: money(subtotal), kind: 'line' }];
    if (extra > 0) {
        totalRows.push({ label: text(inv.extra_charges_label) || 'Additional charges', value: money(extra), kind: 'line' });
    }
    if (tax > 0) {
        const rate = num(inv.tax_rate);
        totalRows.push({ label: rate > 0 ? `VAT (${rate}%)` : 'VAT', value: money(tax), kind: 'line' });
    }
    if (discount > 0) {
        totalRows.push({ label: 'Discount', value: `−${money(discount)}`, kind: 'credit' });
    }
    totalRows.push({ label: 'Total', value: money(total), kind: 'total' });
    if (paid > 0) totalRows.push({ label: 'Paid', value: `−${money(paid)}`, kind: 'credit' });
    if (paid > 0 && !settled) totalRows.push({ label: 'Balance due', value: money(balance), kind: 'balance' });

    // ── Notes ────────────────────────────────────────────────────────
    const notes: NoteBlockData[] = [];
    if (text(inv.adminNote)) notes.push({ label: 'A note from our team', text: text(inv.adminNote), tone: 'accent' });
    if (text(inv.notes)) notes.push({ label: inv.notesLabel || 'Notes', text: text(inv.notes), tone: 'plain' });
    if (text(inv.payment_notes)) notes.push({ label: 'Payment details', text: text(inv.payment_notes), tone: 'plain' });

    // ── Footer ───────────────────────────────────────────────────────
    const method = paymentMethodLabel(inv.payment_method);
    const footerNote = settled
        ? `Paid in full${method ? ` by ${method.toLowerCase()}` : ''} — no further action needed.`
        : dueOn
            ? `Please settle by ${dueOn}${method ? ` by ${method.toLowerCase()}` : ''}.`
            : '';

    return {
        title: (inv.documentTitle || 'Invoice').toUpperCase(),
        number: text(inv.invoice_number),
        statusValue: inv.status || 'unpaid',
        statusLabel: invoiceStatusLabel(inv.status),
        currency,
        metaCells,
        billToName: text(inv.customer_name) || '—',
        billToLines,
        pickup: text(inv.pickup_location) || '—',
        dropoff: text(inv.dropoff_location) || '—',
        outboundWhen,
        returnWhen,
        tripDetails,
        lineDescription,
        lineReference: ref ? `Booking Ref: ${ref}` : '',
        lineAmount: money(subtotal),
        totalRows,
        notes,
        settled,
        dueOn,
        footerNote,
        paymentMethod: method,
    };
}
