import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { type, bookingData, bookingId } = await req.json();

        if (type === 'new_booking') {
            // Send email to Admin
            await resend.emails.send({
                from: 'Saudi Taxi <onboarding@resend.dev>', // Replace with your verified domain
                to: process.env.ADMIN_EMAIL || 'umberfakhar10@gmail.com',
                subject: `New Booking Request: ${bookingData.customer_name}`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #D4AF37;">New Booking Request Received</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Customer:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${bookingData.customer_name}</td></tr>
                            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${bookingData.customer_phone}</td></tr>
                            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>From:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${bookingData.pickup_location}</td></tr>
                            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>To:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${bookingData.dropoff_location}</td></tr>
                            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Date:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${bookingData.travel_date}</td></tr>
                            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${bookingData.service_type}</td></tr>
                        </table>
                        <p style="margin-top: 20px;">
                            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/bookings" style="background: #D4AF37; color: #1e293b; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">View in Admin Panel</a>
                        </p>
                    </div>
                `
            });

            // Send confirmation to Customer
            await resend.emails.send({
                from: 'Saudi Taxi <onboarding@resend.dev>',
                to: bookingData.customer_email,
                subject: `Booking Request Received - Saudi Taxi`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #D4AF37;">Booking Received!</h2>
                        <p>Assalamu Alaikum <strong>${bookingData.customer_name}</strong>,</p>
                        <p>We have received your booking request for ${bookingData.travel_date}. Our team will review the details and contact you via WhatsApp or email within 30 minutes to confirm the final quote.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                        <p style="font-size: 0.9rem; color: #666;">If you have any urgent questions, feel free to reply to this email or message us on WhatsApp.</p>
                    </div>
                `
            });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
