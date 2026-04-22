import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = 'Saudi Taxi <onboarding@resend.dev>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'umberfakhar10@gmail.com';
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const baseStyle = `font-family:'Inter',sans-serif;background:#f8fafc;padding:32px;`;
const cardStyle = `background:#fff;border-radius:12px;padding:28px;max-width:560px;margin:0 auto;box-shadow:0 2px 8px rgba(0,0,0,0.06);`;
const headerStyle = `background:linear-gradient(135deg,#0f172a,#1e293b);border-radius:10px;padding:24px;margin-bottom:24px;text-align:center;`;
const btnStyle = `display:inline-block;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#0f172a;padding:12px 28px;text-decoration:none;border-radius:8px;font-weight:700;font-size:0.9rem;`;
const rowStyle = `padding:10px 0;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;`;
const labelStyle = `color:#94a3b8;font-size:0.85rem;`;
const valueStyle = `color:#1e293b;font-weight:600;font-size:0.85rem;`;

function buildBookingRows(b: any) {
    return `
        <div style="${rowStyle}"><span style="${labelStyle}">Customer</span><span style="${valueStyle}">${b.customer_name}</span></div>
        <div style="${rowStyle}"><span style="${labelStyle}">From</span><span style="${valueStyle}">${b.pickup_location}</span></div>
        <div style="${rowStyle}"><span style="${labelStyle}">To</span><span style="${valueStyle}">${b.dropoff_location}</span></div>
        <div style="${rowStyle}"><span style="${labelStyle}">Date</span><span style="${valueStyle}">${b.travel_date} at ${b.travel_time || 'TBD'}</span></div>
        <div style="${rowStyle}"><span style="${labelStyle}">Service</span><span style="${valueStyle}">${b.service_type}</span></div>
        ${b.quote_amount ? `<div style="${rowStyle}"><span style="${labelStyle}">Quote Amount</span><span style="${valueStyle};color:#10b981;">SAR ${b.quote_amount}</span></div>` : ''}
    `;
}

async function logEmail(supabase: any, bookingId: string | null, type: string, to: string, subject: string, resendId: string | null, status: 'sent' | 'failed', error?: string) {
    await supabase.from('email_logs').insert({
        booking_id: bookingId, email_type: type, recipient_email: to,
        subject, status, resend_id: resendId, error_message: error || null, sent_at: new Date().toISOString()
    });
}

export async function POST(req: Request) {
    const supabase = createAdminClient();

    try {
        const { type, bookingData, bookingId, quoteData } = await req.json();

        // Fetch booking from DB if only ID provided
        let b = bookingData;
        if (!b && bookingId) {
            const { data } = await supabase.from('bookings').select('*').eq('id', bookingId).single();
            b = data;
        }

        const results: any[] = [];

        // ─── NEW BOOKING ───────────────────────────────────────────────
        if (type === 'new_booking' && b) {
            const subject = `New Booking Request — ${b.customer_name}`;
            const adminHtml = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">📩 New Booking Request</p></div>
                ${buildBookingRows(b)}
                <p style="margin-top:20px;text-align:center;"><a href="${SITE}/admin/bookings" style="${btnStyle}">View in Admin Panel</a></p>
            </div></div>`;
            const { data: r1 } = await resend.emails.send({ from: FROM, to: ADMIN_EMAIL, subject, html: adminHtml });
            await logEmail(supabase, b.id || bookingId, type, ADMIN_EMAIL, subject, r1?.id || null, 'sent');

            const custSubject = `Booking Request Received – Saudi Taxi`;
            const custHtml = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">✅ Booking Received!</p></div>
                <p style="color:#475569;">Assalamu Alaikum <strong>${b.customer_name}</strong>,</p>
                <p style="color:#475569;">We received your booking request for <strong>${b.travel_date}</strong>. Our team will review the details and contact you within 30 minutes to confirm your final quote.</p>
                <p style="color:#94a3b8;font-size:0.85rem;">For urgent queries, reply to this email or message us on WhatsApp.</p>
            </div></div>`;
            const { data: r2 } = await resend.emails.send({ from: FROM, to: b.customer_email, subject: custSubject, html: custHtml });
            await logEmail(supabase, b.id || bookingId, type, b.customer_email, custSubject, r2?.id || null, 'sent');
            results.push({ admin: r1?.id, customer: r2?.id });
        }

        // ─── BOOKING CONFIRMED ─────────────────────────────────────────
        if (type === 'booking_confirmed' && b) {
            const subject = `Your Booking is Confirmed – Saudi Taxi`;
            const html = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#10b981;font-weight:700;font-size:1.1rem;margin:0;">🎉 Booking Confirmed!</p></div>
                <p style="color:#475569;">Assalamu Alaikum <strong>${b.customer_name}</strong>,</p>
                <p style="color:#475569;">Great news! Your booking has been <strong>confirmed</strong>. Here are your trip details:</p>
                ${buildBookingRows(b)}
                <p style="color:#94a3b8;font-size:0.85rem;margin-top:16px;">You'll receive a reminder 24 hours before your trip. Thank you for choosing Saudi Taxi.</p>
            </div></div>`;
            const { data: r } = await resend.emails.send({ from: FROM, to: b.customer_email, subject, html });
            await logEmail(supabase, b.id || bookingId, type, b.customer_email, subject, r?.id || null, 'sent');
            results.push({ id: r?.id });
        }

        // ─── BOOKING COMPLETED ─────────────────────────────────────────
        if (type === 'booking_completed' && b) {
            const subject = `Trip Completed – Thank You! | Saudi Taxi`;
            const html = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">🚗 Trip Completed</p></div>
                <p style="color:#475569;">Dear <strong>${b.customer_name}</strong>,</p>
                <p style="color:#475569;">Thank you for travelling with Saudi Taxi! We hope you had a great experience. An invoice has been generated for your records.</p>
                <p style="color:#94a3b8;font-size:0.85rem;">We'd love to hear your feedback. Book your next trip at any time.</p>
            </div></div>`;
            const { data: r } = await resend.emails.send({ from: FROM, to: b.customer_email, subject, html });
            await logEmail(supabase, b.id || bookingId, type, b.customer_email, subject, r?.id || null, 'sent');
            results.push({ id: r?.id });
        }

        // ─── QUOTE SENT ────────────────────────────────────────────────
        if (type === 'quote_sent' && quoteData) {
            const q = quoteData;
            const finalAmount = q.admin_override_amount ?? q.total_amount;
            const subject = `Your Price Quote – Saudi Taxi`;
            const html = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">📋 Price Quote</p></div>
                <p style="color:#475569;">Dear <strong>${q.customer_name}</strong>,</p>
                <p style="color:#475569;">Here is your price estimate for your requested trip:</p>
                <div style="${rowStyle}"><span style="${labelStyle}">From</span><span style="${valueStyle}">${q.pickup_location}</span></div>
                <div style="${rowStyle}"><span style="${labelStyle}">To</span><span style="${valueStyle}">${q.dropoff_location}</span></div>
                <div style="${rowStyle}"><span style="${labelStyle}">Vehicle</span><span style="${valueStyle}">${q.vehicle_type}</span></div>
                <div style="${rowStyle}"><span style="${labelStyle}">Distance</span><span style="${valueStyle}">${q.distance_km} km</span></div>
                <div style="${rowStyle}"><span style="${labelStyle}">Date</span><span style="${valueStyle}">${q.travel_date || 'TBD'}</span></div>
                <div style="background:#f8fafc;border-radius:8px;padding:16px;margin-top:16px;text-align:center;">
                    <p style="color:#94a3b8;margin:0;font-size:0.8rem;">QUOTED PRICE</p>
                    <p style="color:#0f172a;font-size:1.8rem;font-weight:800;margin:8px 0;">SAR ${finalAmount?.toFixed(2)}</p>
                    <p style="color:#f59e0b;font-size:0.8rem;margin:0;">⏱️ Valid for 24 hours</p>
                </div>
                <p style="color:#94a3b8;font-size:0.8rem;margin-top:16px;">To accept this quote or for any queries, reply to this email or contact us on WhatsApp.</p>
            </div></div>`;
            const { data: r } = await resend.emails.send({ from: FROM, to: q.customer_email, subject, html });
            await logEmail(supabase, null, type, q.customer_email, subject, r?.id || null, 'sent');
            results.push({ id: r?.id });
        }

        return NextResponse.json({ success: true, results });
    } catch (error: any) {
        console.error('Email error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
