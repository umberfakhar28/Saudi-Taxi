import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { requireAdmin } from '@/utils/supabase/requireAdmin';

/**
 * Writes a real row to `audit_logs` so the admin Dashboard's Recent Activity
 * widget reflects actual admin actions instead of querying a table nothing
 * ever populated (Admin Portal audit, §Dashboard). Uses the service-role
 * client so writes succeed regardless of RLS policy on this table.
 *
 * proxy.ts's /admin/* gate does NOT cover /api/* paths, so this route is
 * directly reachable by anyone without requireAdmin() below — since it uses
 * the service-role client, that would otherwise bypass RLS entirely
 * (Admin Portal audit, §15).
 *
 * `entity_type` and `action` are NOT NULL in the schema; everything else is
 * optional.
 */
export async function POST(req: Request) {
    try {
        const adminEmailFromSession = await requireAdmin();
        if (!adminEmailFromSession) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { entityType, entityId, action, description, changes } = body ?? {};

        if (!entityType || !action) {
            return NextResponse.json({ error: 'entityType and action are required' }, { status: 400 });
        }

        const supabase = createAdminClient();
        const { error } = await supabase.from('audit_logs').insert({
            entity_type: entityType,
            entity_id: entityId ?? null,
            action,
            description: description ?? null,
            admin_email: adminEmailFromSession,
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
