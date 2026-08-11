import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/utils/supabase/admin';

const resend = new Resend(process.env.RESEND_API_KEY);
// onboarding@resend.dev is Resend's shared sandbox domain — it's rate-limited
// and lands in spam more often. Verify gulftripservice.com in the Resend
// dashboard, then set RESEND_FROM_EMAIL in .env.local to switch over.
const FROM = process.env.RESEND_FROM_EMAIL || 'Gulf Trip Service <onboarding@resend.dev>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'umberfakhar10@gmail.com';
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

/* ─────────────────────────────────────────────────────────────────────────
   Shared HTML email layout — table-based, not flexbox.
   The old version built each row as a flex <div> (`display:flex;
   justify-content:space-between`). Outlook's rendering engine (Word) and
   several mobile mail clients don't support flexbox at all, so the label
   and value collapsed onto one line with no visible gap — e.g.
   "CustomerTest" instead of "Customer: Test". Tables are the one layout
   primitive that reliably renders the same way across every mail client,
   so every row below is a real <table><tr><td> — label cell, value cell,
   consistent padding, a hairline separator between rows.
   ───────────────────────────────────────────────────────────────────────── */
const baseStyle = `font-family:'Inter',Arial,sans-serif;background:#f8fafc;padding:32px 16px;`;
const cardStyle = `background:#fff;border-radius:12px;padding:28px;max-width:560px;margin:0 auto;box-shadow:0 2px 8px rgba(0,0,0,0.06);`;
const headerStyle = `background:linear-gradient(135deg,#0f172a,#1e293b);border-radius:10px;padding:24px;margin-bottom:24px;text-align:center;`;
const btnStyle = `display:inline-block;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#0f172a;padding:12px 28px;text-decoration:none;border-radius:8px;font-weight:700;font-size:0.9rem;`;

/** One label/value row inside the details table. Skips cleanly if value is empty. */
function row(label: string, value: unknown): string {
    if (value === null || value === undefined || value === '') return '';
    return `
        <tr>
            <td style="padding:11px 4px;border-bottom:1px solid #f1f5f9;color:#94a3b8;font-size:13px;width:38%;vertical-align:top;">${label}</td>
            <td style="padding:11px 4px;border-bottom:1px solid #f1f5f9;color:#1e293b;font-size:14px;font-weight:600;vertical-align:top;">${escapeHtml(String(value))}</td>
        </tr>`;
}

function escapeHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function rowsTable(rowsHtml: string): string {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rowsHtml}</table>`;
}

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

function serviceLabel(serviceType?: string | null): string {
    if (!serviceType) return '';
    return SERVICE_LABELS[serviceType] ?? serviceType.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Booking/enquiry detail rows shared by every booking-shaped email. */
function buildBookingRows(b: Record<string, unknown>): string {
    return rowsTable([
        row('Customer', b.customer_name),
        row('Phone', b.customer_phone),
        row('Email', b.customer_email),
        row('From', b.pickup_location),
        row('To', b.dropoff_location),
        row('Service', serviceLabel(b.service_type as string | null | undefined)),
        row('Vehicle', b.car_type),
        row('Date', b.travel_date),
        row('Time', b.travel_time),
        row('Passengers', b.passengers_count),
        row('Quote Amount', b.quote_amount ? `SAR ${b.quote_amount}` : ''),
        row('Notes', b.special_notes),
    ].join(''));
}

async function logEmail(supabase: SupabaseClient, bookingId: string | null, type: string, to: string, subject: string, resendId: string | null, status: 'sent' | 'failed', error?: string) {
    await supabase.from('email_logs').insert({
        booking_id: bookingId, email_type: type, recipient_email: to,
        subject, status, resend_id: resendId, error_message: error || null, sent_at: new Date().toISOString()
    });
}

const SUPPORTED_TYPES = ['new_booking', 'booking_confirmed', 'booking_completed', 'quote_sent', 'destination_enquiry', 'invoice'] as const;

export async function POST(req: Request) {
    const supabase = createAdminClient();

    try {
        const { type, bookingData, bookingId, quoteData, invoiceData } = await req.json();

        if (!SUPPORTED_TYPES.includes(type)) {
            // Previously this fell through every `if` block untouched and
            // still returned {success:true, results:[]} — the caller had no
            // way to tell "sent" from "silently did nothing" (Admin Portal
            // audit §9). An unrecognized type is now a real 400, not a lie.
            return NextResponse.json(
                { error: `Unsupported email type: "${type}". Supported: ${SUPPORTED_TYPES.join(', ')}` },
                { status: 400 }
            );
        }

        // Fetch booking from DB if only ID provided
        let b = bookingData;
        if (!b && bookingId) {
            const { data } = await supabase.from('bookings').select('*').eq('id', bookingId).single();
            b = data;
        }

        const results: Array<Record<string, unknown>> = [];

        // ─── NEW BOOKING ───────────────────────────────────────────────
        if (type === 'new_booking') {
            if (!b) return NextResponse.json({ error: 'bookingData or a resolvable bookingId is required' }, { status: 400 });

            const subject = `New Booking Request — ${b.customer_name}`;
            const adminHtml = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">📩 New Booking Request</p></div>
                ${buildBookingRows(b)}
                <p style="margin-top:20px;text-align:center;"><a href="${SITE}/admin/bookings" style="${btnStyle}">View in Admin Panel</a></p>
            </div></div>`;
            const { data: r1, error: e1 } = await resend.emails.send({ from: FROM, to: ADMIN_EMAIL, subject, html: adminHtml });
            await logEmail(supabase, b.id || bookingId, type, ADMIN_EMAIL, subject, r1?.id || null, e1 ? 'failed' : 'sent', e1?.message);
            if (e1) return NextResponse.json({ error: `Admin notification failed: ${e1.message}` }, { status: 502 });

            const custSubject = `Booking Request Received – Gulf Trip Service`;
            const custHtml = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">✅ Booking Received!</p></div>
                <p style="color:#475569;">Assalamu Alaikum <strong>${escapeHtml(b.customer_name)}</strong>,</p>
                <p style="color:#475569;">We received your booking request for <strong>${escapeHtml(String(b.travel_date))}</strong>. Our team will review the details and contact you within 30 minutes to confirm your final quote.</p>
                ${buildBookingRows(b)}
                <p style="color:#94a3b8;font-size:0.85rem;margin-top:16px;">For urgent queries, reply to this email or message us on WhatsApp.</p>
            </div></div>`;
            const { data: r2, error: e2 } = await resend.emails.send({ from: FROM, to: b.customer_email, subject: custSubject, html: custHtml });
            await logEmail(supabase, b.id || bookingId, type, b.customer_email, custSubject, r2?.id || null, e2 ? 'failed' : 'sent', e2?.message);
            if (e2) return NextResponse.json({ error: `Customer confirmation failed: ${e2.message}`, results: [{ admin: r1?.id }] }, { status: 502 });

            results.push({ admin: r1?.id, customer: r2?.id });
        }

        // ─── BOOKING CONFIRMED ─────────────────────────────────────────
        if (type === 'booking_confirmed') {
            if (!b) return NextResponse.json({ error: 'bookingData or a resolvable bookingId is required' }, { status: 400 });

            const subject = `Your Booking is Confirmed – Gulf Trip Service`;
            const html = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#10b981;font-weight:700;font-size:1.1rem;margin:0;">🎉 Booking Confirmed!</p></div>
                <p style="color:#475569;">Assalamu Alaikum <strong>${escapeHtml(b.customer_name)}</strong>,</p>
                <p style="color:#475569;">Great news! Your booking has been <strong>confirmed</strong>. Here are your trip details:</p>
                ${buildBookingRows(b)}
                <p style="color:#94a3b8;font-size:0.85rem;margin-top:16px;">You'll receive a reminder 24 hours before your trip. Thank you for choosing Gulf Trip Service.</p>
            </div></div>`;
            const { data: r, error: e } = await resend.emails.send({ from: FROM, to: b.customer_email, subject, html });
            await logEmail(supabase, b.id || bookingId, type, b.customer_email, subject, r?.id || null, e ? 'failed' : 'sent', e?.message);
            if (e) return NextResponse.json({ error: e.message }, { status: 502 });
            results.push({ id: r?.id });
        }

        // ─── BOOKING COMPLETED ─────────────────────────────────────────
        if (type === 'booking_completed') {
            if (!b) return NextResponse.json({ error: 'bookingData or a resolvable bookingId is required' }, { status: 400 });

            const subject = `Trip Completed – Thank You! | Gulf Trip Service`;
            const html = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">🚗 Trip Completed</p></div>
                <p style="color:#475569;">Dear <strong>${escapeHtml(b.customer_name)}</strong>,</p>
                <p style="color:#475569;">Thank you for travelling with Gulf Trip Service! We hope you had a great experience. An invoice has been generated for your records.</p>
                <p style="color:#94a3b8;font-size:0.85rem;">We'd love to hear your feedback. Book your next trip at any time.</p>
            </div></div>`;
            const { data: r, error: e } = await resend.emails.send({ from: FROM, to: b.customer_email, subject, html });
            await logEmail(supabase, b.id || bookingId, type, b.customer_email, subject, r?.id || null, e ? 'failed' : 'sent', e?.message);
            if (e) return NextResponse.json({ error: e.message }, { status: 502 });
            results.push({ id: r?.id });
        }

        // ─── QUOTE SENT ────────────────────────────────────────────────
        if (type === 'quote_sent') {
            if (!quoteData) return NextResponse.json({ error: 'quoteData is required' }, { status: 400 });
            const q = quoteData;
            const finalAmount = q.admin_override_amount ?? q.total_amount;
            const subject = `Your Price Quote – Gulf Trip Service`;
            const html = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">📋 Price Quote</p></div>
                <p style="color:#475569;">Dear <strong>${escapeHtml(q.customer_name)}</strong>,</p>
                <p style="color:#475569;">Here is your price estimate for your requested trip:</p>
                ${rowsTable([
                    row('From', q.pickup_location),
                    row('To', q.dropoff_location),
                    row('Vehicle', q.vehicle_type),
                    row('Distance', q.distance_km ? `${q.distance_km} km` : ''),
                    row('Date', q.travel_date || 'TBD'),
                ].join(''))}
                <div style="background:#f8fafc;border-radius:8px;padding:16px;margin-top:16px;text-align:center;">
                    <p style="color:#94a3b8;margin:0;font-size:0.8rem;">QUOTED PRICE</p>
                    <p style="color:#0f172a;font-size:1.8rem;font-weight:800;margin:8px 0;">SAR ${Number(finalAmount ?? 0).toFixed(2)}</p>
                    <p style="color:#f59e0b;font-size:0.8rem;margin:0;">⏱️ Valid for 24 hours</p>
                </div>
                <p style="color:#94a3b8;font-size:0.8rem;margin-top:16px;">To accept this quote or for any queries, reply to this email or contact us on WhatsApp.</p>
            </div></div>`;
            const { data: r, error: e } = await resend.emails.send({ from: FROM, to: q.customer_email, subject, html });
            await logEmail(supabase, null, type, q.customer_email, subject, r?.id || null, e ? 'failed' : 'sent', e?.message);
            if (e) return NextResponse.json({ error: e.message }, { status: 502 });
            results.push({ id: r?.id });
        }

        // ─── DESTINATION ENQUIRY ───────────────────────────────────────
        // Fired from DestinationEnquiryForm.tsx (Popular Destinations
        // pages) — same admin+customer email pair as `new_booking`, but a
        // destination-specific subject line, since a Riyadh/Dubai/Doha
        // enquiry is a browsing lead rather than a firm booking request.
        if (type === 'destination_enquiry') {
            if (!b) return NextResponse.json({ error: 'bookingData or a resolvable bookingId is required' }, { status: 400 });

            const destLabel = b.destination_name || 'Trip';
            const subject = `New ${destLabel} Travel Enquiry`;
            const adminHtml = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">📍 New Destination Enquiry</p></div>
                ${rowsTable(row('Destination', destLabel))}
                ${buildBookingRows(b)}
                <p style="margin-top:20px;text-align:center;"><a href="${SITE}/admin/bookings" style="${btnStyle}">View in Admin Panel</a></p>
            </div></div>`;
            const { data: r1, error: e1 } = await resend.emails.send({ from: FROM, to: ADMIN_EMAIL, subject, html: adminHtml });
            await logEmail(supabase, b.id || bookingId, type, ADMIN_EMAIL, subject, r1?.id || null, e1 ? 'failed' : 'sent', e1?.message);
            if (e1) return NextResponse.json({ error: `Admin notification failed: ${e1.message}` }, { status: 502 });

            const custSubject = `We've Received Your ${destLabel} Enquiry – Gulf Trip Service`;
            const custHtml = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">✅ Request Received!</p></div>
                <p style="color:#475569;">Assalamu Alaikum <strong>${escapeHtml(b.customer_name)}</strong>,</p>
                <p style="color:#475569;">Thank you for your ${escapeHtml(destLabel)} travel enquiry. Our travel team will review your request and get back to you shortly.</p>
                <p style="color:#94a3b8;font-size:0.85rem;">Need an instant reply? Message us on WhatsApp any time.</p>
            </div></div>`;
            const { data: r2, error: e2 } = await resend.emails.send({ from: FROM, to: b.customer_email, subject: custSubject, html: custHtml });
            await logEmail(supabase, b.id || bookingId, type, b.customer_email, custSubject, r2?.id || null, e2 ? 'failed' : 'sent', e2?.message);
            if (e2) return NextResponse.json({ error: `Customer confirmation failed: ${e2.message}`, results: [{ admin: r1?.id }] }, { status: 502 });

            results.push({ admin: r1?.id, customer: r2?.id });
        }

        // ─── INVOICE ───────────────────────────────────────────────────
        // Previously called from the Bookings page's invoice modal with no
        // matching handler at all — the request "succeeded" and emailed
        // nothing (Admin Portal audit §9). Real handler, real invoice line
        // item + total, sent to the invoice's own customer_email.
        if (type === 'invoice') {
            if (!invoiceData) return NextResponse.json({ error: 'invoiceData is required' }, { status: 400 });
            const inv = invoiceData;
            const subject = `Invoice ${inv.invoice_number} – Gulf Trip Service`;
            const html = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">🧾 Invoice ${escapeHtml(String(inv.invoice_number))}</p></div>
                <p style="color:#475569;">Dear <strong>${escapeHtml(inv.customer_name)}</strong>,</p>
                <p style="color:#475569;">Please find your invoice details below.</p>
                ${rowsTable([
                    row('Invoice #', inv.invoice_number),
                    row('From', inv.pickup_location),
                    row('To', inv.dropoff_location),
                    row('Service', serviceLabel(inv.service_type)),
                    row('Date', inv.travel_date),
                    row('Status', inv.status ? String(inv.status).replace('_', ' ').toUpperCase() : ''),
                ].join(''))}
                <div style="background:#f8fafc;border-radius:8px;padding:16px;margin-top:16px;text-align:center;">
                    <p style="color:#94a3b8;margin:0;font-size:0.8rem;">TOTAL AMOUNT</p>
                    <p style="color:#0f172a;font-size:1.8rem;font-weight:800;margin:8px 0;">SAR ${Number(inv.total_amount ?? 0).toFixed(2)}</p>
                </div>
                <p style="margin-top:20px;text-align:center;"><a href="${SITE}/admin/invoices/${inv.invoice_db_id || inv.id || ''}" style="${btnStyle}">View Invoice</a></p>
                <p style="color:#94a3b8;font-size:0.8rem;margin-top:16px;">For any queries about this invoice, reply to this email or contact us on WhatsApp.</p>
            </div></div>`;
            const { data: r, error: e } = await resend.emails.send({ from: FROM, to: inv.customer_email, subject, html });
            await logEmail(supabase, inv.booking_id || bookingId || null, type, inv.customer_email, subject, r?.id || null, e ? 'failed' : 'sent', e?.message);
            if (e) return NextResponse.json({ error: e.message }, { status: 502 });
            results.push({ id: r?.id });
        }

        return NextResponse.json({ success: true, results });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Email error:', message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
