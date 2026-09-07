import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { can, toAdminRole, type AdminIdentity, type Permission } from '@/lib/roles';

/**
 * Server-side identity + authorization for the Admin Portal.
 *
 * proxy.ts only gates page requests under /admin/*, not /api/* routes, so
 * any route performing a sensitive operation must call this itself rather
 * than assuming the request already passed through middleware.
 *
 * Two guarantees that must not regress:
 *
 *  1. The ADMIN_EMAIL account is ALWAYS a full admin. It does not need a row
 *     in admin_users, cannot be demoted, and cannot be deactivated. This is
 *     what stops the owner locking themselves out of their own portal.
 *
 *  2. If admin_users does not exist yet (supabase/sql/002 not run), this
 *     degrades to exactly the previous single-admin behaviour: the
 *     ADMIN_EMAIL account is admin, everyone else is refused. Nothing breaks
 *     while the migration is pending.
 */

function ownerEmail(): string | null {
    const configured = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    return configured || null;
}

/**
 * Resolves the signed-in portal user, or null if the caller is not a portal
 * user at all (not signed in, deactivated, or holding no role).
 */
export async function getAdminIdentity(): Promise<AdminIdentity | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return null;

    const email = data.user.email?.trim().toLowerCase();
    if (!email) return null;

    const owner = ownerEmail();
    if (!owner) {
        console.error(
            '[ADMIN_AUTH] ADMIN_EMAIL is not set in this environment — the owner account cannot be identified. ' +
            "Set ADMIN_EMAIL to the admin's Supabase account email and redeploy."
        );
    }
    const isOwner = !!owner && email === owner;

    // Read the role with the service-role client. admin_users is protected by
    // an RLS policy that itself calls admin_rank(), and "who am I?" must not
    // depend on the answer to that question.
    let roleRow: { role?: string | null; name?: string | null; is_active?: boolean | null } | null = null;
    let rosterAvailable = true;
    try {
        const admin = createAdminClient();
        const { data: row, error: roleError } = await admin
            .from('admin_users')
            .select('role, name, is_active')
            .eq('id', data.user.id)
            .maybeSingle();
        if (roleError) {
            // Most likely supabase/sql/002 has not been run yet.
            rosterAvailable = false;
        } else {
            roleRow = row;
        }
    } catch {
        rosterAvailable = false;
    }

    if (isOwner) {
        return { email, role: 'admin', name: roleRow?.name ?? null, isOwner: true };
    }

    // Anyone who is not the owner needs an active roster row.
    if (!rosterAvailable || !roleRow) return null;
    if (roleRow.is_active === false) return null;

    return {
        email,
        role: toAdminRole(roleRow.role),
        name: roleRow.name ?? null,
        isOwner: false,
    };
}

/**
 * Backwards-compatible helper for existing API routes: the admin's email on
 * success, or null if the caller is not an authenticated portal user.
 */
export async function requireAdmin(): Promise<string | null> {
    const identity = await getAdminIdentity();
    return identity?.email ?? null;
}

/**
 * The authorization gate for every mutating API route. Returns the identity
 * only when the caller genuinely holds the permission; callers turn null
 * into a 401/403 without leaking which of the two it was.
 */
export async function requirePermission(permission: Permission): Promise<AdminIdentity | null> {
    const identity = await getAdminIdentity();
    if (!identity) return null;
    if (!can(identity.role, permission)) {
        console.warn(`[ADMIN_AUTH] ${identity.email} (${identity.role}) was refused "${permission}".`);
        return null;
    }
    return identity;
}
