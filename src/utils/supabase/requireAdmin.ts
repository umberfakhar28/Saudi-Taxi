import { createClient } from '@/utils/supabase/server';

/**
 * Server-side admin check for API routes. proxy.ts only gates page
 * requests under /admin/*, not /api/* routes, so any route performing a
 * sensitive operation must call this itself rather than assuming the
 * request already passed through middleware (Admin Portal audit, §15).
 *
 * Returns the admin's email on success, or null if the caller is not an
 * authenticated admin.
 */
export async function requireAdmin(): Promise<string | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return null;

    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    if (!adminEmail) {
        // Without ADMIN_EMAIL every admin API call is rejected as if the
        // caller were unauthorised. Surface the real cause in the logs.
        console.error(
            '[ADMIN_AUTH] ADMIN_EMAIL is not set in this environment — every admin API call will be rejected. ' +
            "Set ADMIN_EMAIL to the admin's Supabase account email and redeploy."
        );
        return null;
    }

    if (data.user.email?.trim().toLowerCase() !== adminEmail) return null;
    return data.user.email ?? null;
}
