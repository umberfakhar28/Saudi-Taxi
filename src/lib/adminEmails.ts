/**
 * The customer emails an admin sends from the portal: trip completed, price
 * quote, invoice. Kept out of /api/emails/send (a route file can only export
 * its handlers) so the templates can be previewed and tested on their own.
 * Layout and helpers: lib/emailKit (item 16).
 */
import { displayDate, displayTime } from '@/lib/datetime';
import { formatMoney } from '@/lib/currency';
import { serviceLabel } from '@/lib/serviceLabels';
import { TRUSTPILOT_REVIEW_URL } from '@/lib/trustpilot';
import { buildInvoiceDocument, type InvoiceRecord } from '@/lib/invoiceDocument';
import { quoteRef } from '@/lib/quotes';
import {
    emailBadge, emailButton, emailMuted, emailPanel, emailPara, emailShell, emailTitle, escapeHtml, noteBlock, row,
    rowsTable, whatsappStrip,
} from '@/lib/emailKit';

type Rec = Record<string, unknown>;
const str = (v: unknown) => (v === null || v === undefined ? '' : String(v));

/**
 * Trip completed + review request (items 9, 10). The invoice line appears
 * only when the invoice PDF is actually attached — the email used to promise
 * an invoice that never came.
 */
export function completedEmail(b: Rec, invoiceAttached: boolean): { subject: string; html: string } {
    return {
        subject: 'Trip Completed – Thank You! | Gulf Trip Service',
        html: emailShell(`${emailTitle('🚗 Trip Completed')}
            ${emailPara(`Dear <strong>${escapeHtml(b.customer_name)}</strong>,`)}
            ${emailPara(`Thank you for travelling with Gulf Trip Service! We hope you had a great experience.${invoiceAttached ? ' Your invoice is attached to this email for your records.' : ''}`)}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;"><tr><td align="center" style="background:#F5F2EA;border:1px solid #E4DFD2;border-radius:10px;padding:20px 20px 4px;">
                <p style="color:#081827;font-weight:800;margin:0 0 6px;font-size:17px;">How did we do?</p>
                <p style="color:#3A4447;margin:0;font-size:14px;">Your review helps other travellers choose with confidence — it takes a minute.</p>
                ${emailButton(TRUSTPILOT_REVIEW_URL, '⭐ Leave a review on Trustpilot', 'gold')}
            </td></tr></table>
            ${emailMuted('Book your next trip at any time.')}`, { preheader: 'Thank you for travelling with Gulf Trip Service.' }),
    };
}

/**
 * The WhatsApp message a customer sends from the quote email (item 7): the
 * whole quote, one fact per line, empty facts left out. URL-encoded by
 * whatsappStrip (line breaks, Arabic, & and + all survive).
 */
export function quoteWhatsAppMessage(q: Rec): string {
    const amount = q.admin_override_amount ?? q.total_amount;
    const when = [displayDate(str(q.travel_date) || null, ''), displayTime(str(q.travel_time) || null, '')].filter(Boolean).join(', ');
    const route = [str(q.pickup_location), str(q.dropoff_location)].filter(Boolean).join(' → ');
    return [
        'Hi, about the quote you sent me:',
        route && `Route: ${route}`,
        when && `Date: ${when}`,
        str(q.vehicle_type) && `Vehicle: ${str(q.vehicle_type)}`,
        Number(q.passengers_count) > 0 && `Passengers: ${Number(q.passengers_count)}`,
        Number(amount) > 0 && `Price: ${formatMoney(Number(amount), str(q.currency) || null)}`,
        q.id && `Quote #: ${quoteRef(q as { id?: string })}`,
    ].filter(Boolean).join('\n');
}

export function quoteEmail(q: Rec): { subject: string; html: string } {
    const price = formatMoney(Number(q.admin_override_amount ?? q.total_amount ?? 0), str(q.currency) || null);
    return {
        subject: 'Your Price Quote – Gulf Trip Service',
        html: emailShell(`${emailTitle('📋 Price Quote', q.id ? `Quote ${escapeHtml(quoteRef(q as { id?: string }))}` : undefined)}
            ${whatsappStrip(quoteWhatsAppMessage(q))}
            ${emailPara(`Dear <strong>${escapeHtml(q.customer_name)}</strong>,`)}
            ${emailPara('Here is your price estimate for your requested trip:')}
            ${rowsTable([
                row('From', q.pickup_location),
                row('To', q.dropoff_location),
                row('Vehicle', q.vehicle_type),
                row('Distance', q.distance_km ? `${q.distance_km} km` : ''),
                row('Date', displayDate(str(q.travel_date) || null, 'TBD')),
                row('Time', displayTime(str(q.travel_time) || null, 'TBD')),
            ].join(''))}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;"><tr><td align="center" bgcolor="#081827" style="background:#081827;border-radius:10px;padding:18px;">
                <p style="color:#F5F2EA;margin:0;font-size:12px;font-weight:800;letter-spacing:0.12em;">QUOTED PRICE</p>
                <p class="gts-big" style="color:#B8945B;font-size:30px;font-weight:800;margin:6px 0 0;">${price}</p>
            </td></tr></table>
            ${noteBlock('A note from our team', str(q.admin_note), '#F6EFE2', '#B8945B', '#7A5C2E')}
            ${noteBlock('Your trip requirements', str(q.notes), '#F5F2EA', '#B7AD97', '#5A6569')}
            ${emailMuted('To accept this quote, reply to this email or message us on WhatsApp.')}`, { preheader: `Your quote: ${price}` }),
    };
}

/**
 * The invoice email (items 13, 14, 18): status badge at the far right of the
 * name line; no link into the admin panel — a customer must never be sent
 * one; the PDF is attached instead.
 */
export function invoiceEmail(inv: Rec, pdfAttached: boolean): { subject: string; html: string } {
    const d = buildInvoiceDocument(inv as InvoiceRecord);
    return {
        subject: `Invoice ${str(inv.invoice_number)} – Gulf Trip Service`,
        html: emailShell(`${emailTitle(`🧾 Invoice ${escapeHtml(d.number)}`)}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px;"><tr>
                <td style="font-size:15px;color:#3A4447;vertical-align:middle;">Dear <strong style="color:#1C2528;">${escapeHtml(d.billToName)}</strong>,</td>
                <td align="right" style="vertical-align:middle;white-space:nowrap;padding-left:12px;">${emailBadge(d.badge.label, d.badge.value)}</td>
            </tr></table>
            ${emailPara(pdfAttached ? 'Your invoice is attached to this email as a PDF. The details are below.' : 'Please find your invoice details below.')}
            ${rowsTable([
                row('Invoice #', d.number),
                row('Booking Ref', inv.booking_number),
                row('From', d.pickup),
                row('To', d.dropoff),
                row('Pickup', d.outboundWhen),
                row('Return', d.returnWhen),
                row('Service', serviceLabel(str(inv.service_type) || null)),
                ...d.tripDetails.map((t) => row(t.label, t.value)),
                row('Status', d.statusLabel),
                row('Payment method', d.paymentMethod),
                row('Payment due', d.settled ? '' : d.dueOn),
            ].join(''))}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;"><tr><td align="center" bgcolor="#081827" style="background:#081827;border-radius:10px;padding:18px;">
                <p style="color:#F5F2EA;margin:0;font-size:12px;font-weight:800;letter-spacing:0.12em;">${escapeHtml(d.headline.label.toUpperCase())}</p>
                <p class="gts-big" style="color:${d.settled ? '#4ADE80' : '#B8945B'};font-size:30px;font-weight:800;margin:6px 0 0;">${escapeHtml(d.headline.value)}</p>
            </td></tr></table>
            ${d.totalRows.length > 2 ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:14px;">${d.totalRows.map((r) => `
                <tr><td style="padding:8px 4px;border-bottom:1px solid #E4DFD2;color:${r.kind === 'total' ? '#081827' : '#5A6569'};font-size:13px;font-weight:${r.kind === 'total' ? 800 : 600};">${escapeHtml(r.label)}</td>
                <td style="padding:8px 4px;border-bottom:1px solid #E4DFD2;text-align:right;color:${r.kind === 'credit' ? '#166534' : '#1C2528'};font-size:13px;font-weight:${r.kind === 'total' || r.kind === 'balance' ? 800 : 600};">${escapeHtml(r.value)}</td></tr>`).join('')}</table>` : ''}
            ${d.notes.map((n) => noteBlock(n.label, n.text, n.tone === 'accent' ? '#F6EFE2' : '#F5F2EA', n.tone === 'accent' ? '#B8945B' : '#B7AD97', n.tone === 'accent' ? '#7A5C2E' : '#5A6569')).join('')}
            <div style="height:18px;line-height:18px;font-size:0;">&nbsp;</div>
            ${emailPanel(`<strong>${escapeHtml(d.footerNote)}</strong>`, d.settled ? 'ok' : d.badge.value === 'overdue' ? 'error' : 'warn')}
            ${emailMuted('For any queries about this invoice, reply to this email or contact us on WhatsApp.')}`, { preheader: `${d.headline.label}: ${d.headline.value}` }),
    };
}
