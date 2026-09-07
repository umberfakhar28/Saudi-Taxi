import { NextResponse } from 'next/server';
import { getAdminIdentity } from '@/utils/supabase/requireAdmin';
import { ROLE_PERMISSIONS } from '@/lib/roles';

/**
 * Who is signed in, and what may they do.
 *
 * The portal's UI uses this to hide actions a role cannot perform. That is a
 * convenience only — every mutating route re-checks the permission through
 * requirePermission(), and the database enforces it again through the
 * admin_rank() RLS policies. Hiding a button is never the security boundary.
 */
export async function GET() {
    const identity = await getAdminIdentity();
    if (!identity) {
        return NextResponse.json({ error: 'Not authorised' }, { status: 401 });
    }
    return NextResponse.json({
        email: identity.email,
        name: identity.name,
        role: identity.role,
        isOwner: identity.isOwner,
        permissions: ROLE_PERMISSIONS[identity.role],
    });
}
