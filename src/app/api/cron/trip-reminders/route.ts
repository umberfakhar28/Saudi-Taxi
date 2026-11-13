import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { riyadhToday } from '@/lib/bookingValidation';
import { sendReminderEmail } from '@/lib/bookingNotify';

/**
 * Day-before trip reminders.
 *
 * The "booking confirmed" email has long promised a reminder before the
 * trip, and nothing ever sent one. Vercel Cron calls this once a day (see
 * vercel.json: 12:00 UTC = 15:00 Riyadh) and it emails every customer whose
 * CONFIRMED booking travels tomorrow, in the language they booked in.
 *
 * Safe to run more than once a day: a booking that already has a sent
 * `booking_reminder` in email_logs is skipped, so a manual re-run or a
 * retried cron invocation never sends a second reminder.
 *
 * Protected by CRON_SECRET. Vercel sends it as a Bearer token automatically
 * once the variable is set in the project; without it this route refuses
 * to run rather than being callable by anyone.
 */
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    const secret = process.env.CRON_SECRET?.trim();
    if (!secret) {
        console.error('[TRIP_REMINDERS] CRON_SECRET is not set — reminders are not being sent. Add it in Vercel → Settings → Environment Variables.');
        return NextResponse.json({ error: 'CRON_SECRET is not configured' }, { status: 500 });
    }
    if (req.headers.get('authorization') !== `Bearer ${secret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminClient();
    const tomorrow = riyadhToday(new Date(Date.now() + 24 * 60 * 60 * 1000));

    const { data: bookings, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('status', 'confirmed')
        .eq('travel_date', tomorrow)
        .not('customer_email', 'is', null);
    if (error) {
        console.error('[TRIP_REMINDERS] Could not load bookings', error);
        return NextResponse.json({ error: 'Could not load bookings' }, { status: 500 });
    }

    const summary = { date: tomorrow, due: bookings?.length ?? 0, sent: 0, skipped: 0, failed: 0 };
    for (const booking of bookings ?? []) {
        const { count } = await supabase
            .from('email_logs')
            .select('*', { count: 'exact', head: true })
            .eq('booking_id', booking.id)
            .eq('email_type', 'booking_reminder')
            .eq('status', 'sent');
        if ((count ?? 0) > 0) { summary.skipped++; continue; }

        const outcome = await sendReminderEmail(supabase, booking);
        if (outcome.status === 'sent') summary.sent++;
        else if (outcome.status === 'skipped') summary.skipped++;
        else { summary.failed++; console.error('[TRIP_REMINDERS] Failed for', booking.id, outcome.reason); }
    }

    console.log('[TRIP_REMINDERS]', JSON.stringify(summary));
    return NextResponse.json(summary);
}
