import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

/**
 * Writes a real row to `audit_logs` so the admin Dashboard's Recent Activity
 * widget reflects actual admin actions instead of querying a table nothing
 * ever populated (Admin Portal audit, §Dashboard). Uses the service-role
 * client so writes succeed regardless of RLS policy on this table — the
 * caller is always an already-authenticated admin page (proxy.ts already
 * gates every /admin/* route before this can be reached from the browser).
 *
 * `entity_type` and `action` are NOT NULL in the schema; everything else is
 * optional.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { entityType, entityId, action, description, adminEmail, changes } = body ?? {};

        if (!entityType || !action) {
            return NextResponse.json({ error: 'entityType and action are required' }, { status: 400 });
        }

        const supabase = createAdminClient();
        const { error } = await supabase.from('audit_logs').insert({
            entity_type: entityType,
            entity_id: entityId ?? null,
            action,
            description: description ?? null,
            admin_email: adminEmail ?? null,
            changes: changes ?? null,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
