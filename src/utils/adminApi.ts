import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { requirePermission } from '@/utils/supabase/requireAdmin';
import type { AdminIdentity, Permission } from '@/lib/roles';

/**
 * Shared plumbing for the admin API routes that perform privileged work.
 *
 * The portal's ordinary reads and edits go straight from the browser to
 * Supabase, where the role-aware RLS policies from supabase/sql/002 decide
 * what is allowed. These routes exist for the operations that need more than
 * a policy can express: deletions that should be audited, soft deletes that
 * must also tidy up related rows, and user management, which needs the
 * service-role key and must never be reachable by a non-admin.
 *
 * Every one of them starts with guard(), so authorization is decided on the
 * server before anything is touched.
 */

export interface Guarded {
    identity: AdminIdentity;
}

/**
 * Returns the caller's identity if they hold `permission`, or a ready-made
 * error response if they do not.
 *
 * The response deliberately does not distinguish "not signed in" from "not
 * allowed" — telling an unauthenticated caller which admin endpoints exist
 * and what they require is free reconnaissance.
 */
export async function guard(
    permission: Permission
): Promise<{ ok: true; identity: AdminIdentity } | { ok: false; response: NextResponse }> {
    const identity = await requirePermission(permission);
    if (!identity) {
        return {
            ok: false,
            response: NextResponse.json(
                { error: 'You do not have permission to perform this action.' },
                { status: 403 }
            ),
        };
    }
    return { ok: true, identity };
}

/**
 * Writes an audit row. Fire-and-forget by design: losing a log line must
 * never fail the operation the admin actually asked for.
 */
export async function audit(
    identity: AdminIdentity,
    entityType: string,
    entityId: string | null,
    action: string,
    description: string
): Promise<void> {
    try {
        const supabase = createAdminClient();
        await supabase.from('audit_logs').insert({
            entity_type: entityType,
            entity_id: entityId,
            action,
            description,
            admin_email: identity.email,
        });
    } catch (error) {
        console.error('[ADMIN_AUDIT] Could not write audit row', error);
    }
}

/** A UUID check, so a malformed id is rejected before it reaches the database. */
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string | undefined | null): value is string {
    return !!value && UUID_RE.test(value);
}

export function badRequest(message: string) {
    return NextResponse.json({ error: message }, { status: 400 });
}

export function notFound(message = 'Not found.') {
    return NextResponse.json({ error: message }, { status: 404 });
}

/**
 * Logs the real database error and returns a generic message. Postgres error
 * text can disclose schema details, so it is never handed to the browser.
 */
export function serverError(context: string, error: unknown) {
    console.error(`[ADMIN_API] ${context}`, error);
    return NextResponse.json(
        { error: 'The operation could not be completed. Please try again.' },
        { status: 500 }
    );
}
