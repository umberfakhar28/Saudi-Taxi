import webpush from 'web-push';
import { createAdminClient } from '@/utils/supabase/admin';

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
const vapidSubject = process.env.VAPID_SUBJECT || 'mailto:admin@gulftripservice.com';

let configured = false;
function ensureConfigured() {
    if (configured) return true;
    if (!vapidPublicKey || !vapidPrivateKey) return false;
    webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
    configured = true;
    return true;
}

export interface PushPayload {
    title: string;
    body: string;
    url: string;
}

/**
 * Best-effort browser push to every subscribed admin device. Never throws —
 * a push failure must not break the booking/enquiry flow that triggers it
 * (Admin Portal audit §7, §12). Expired subscriptions (410/404 from the
 * push service) are pruned so the table doesn't accumulate dead endpoints.
 */
export async function sendPushToAdmins(payload: PushPayload): Promise<void> {
    if (!ensureConfigured()) return;

    try {
        const supabase = createAdminClient();
        const { data: subs } = await supabase.from('push_subscriptions').select('id, endpoint, p256dh, auth_key');
        if (!subs || subs.length === 0) return;

        await Promise.all(
            subs.map(async (sub) => {
                try {
                    await webpush.sendNotification(
                        {
                            endpoint: sub.endpoint,
                            keys: { p256dh: sub.p256dh, auth: sub.auth_key },
                        },
                        JSON.stringify(payload)
                    );
                } catch (err: unknown) {
                    const statusCode = (err as { statusCode?: number })?.statusCode;
                    if (statusCode === 404 || statusCode === 410) {
                        await supabase.from('push_subscriptions').delete().eq('id', sub.id);
                    }
                }
            })
        );
    } catch {
        // Never let a push failure surface to the caller.
    }
}
