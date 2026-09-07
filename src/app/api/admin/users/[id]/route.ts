import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { audit, guard, isUuid, badRequest, notFound, serverError } from '@/utils/adminApi';
import { ADMIN_ROLES, toAdminRole } from '@/lib/roles';

/**
 * PATCH  /api/admin/users/:id — change a user's role or active state
 * DELETE /api/admin/users/:id — remove a user's portal access
 *
 * Admin-only, and with one hard rule on top: the ADMIN_EMAIL owner account
 * can be neither demoted, deactivated nor deleted — by anyone, including
 * itself. That is what guarantees the portal always has at least one full
 * admin and nobody can lock the business out of its own system.
 */

const MIN_PASSWORD_LENGTH = 10;

function ownerEmail(): string | null {
    return process.env.ADMIN_EMAIL?.trim().toLowerCase() || null;
}

async function loadTarget(id: string) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, name, role, is_active')
        .eq('id', id)
        .maybeSingle();
    return { supabase, data, error };
}

function isOwnerRow(email: string | null | undefined): boolean {
    const owner = ownerEmail();
    return !!owner && (email ?? '').trim().toLowerCase() === owner;
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const gate = await guard('users.manage');
    if (!gate.ok) return gate.response;

    const { id } = await params;
    if (!isUuid(id)) return badRequest('Invalid user id.');

    let body: Record<string, unknown>;
    try {
        body = await req.json();
    } catch {
        return badRequest('Expected a JSON body.');
    }

    try {
        const { supabase, data: target, error: readError } = await loadTarget(id);
        if (readError) return serverError('user lookup failed', readError);
        if (!target) return notFound('That user no longer exists.');

        const targetIsOwner = isOwnerRow(target.email);

        const patch: Record<string, unknown> = {};

        if (typeof body.name === 'string' && body.name.trim()) patch.name = body.name.trim();

        if (typeof body.role === 'string') {
            const role = toAdminRole(body.role);
            if (!ADMIN_ROLES.includes(role)) return badRequest('Unknown role.');
            if (targetIsOwner && role !== 'admin') {
                return NextResponse.json(
                    { error: 'The owner account must remain a full admin.' },
                    { status: 409 }
                );
            }
            patch.role = role;
        }

        if (body.is_active !== undefined) {
            const nextActive = !!body.is_active;
            if (targetIsOwner && !nextActive) {
                return NextResponse.json(
                    { error: 'The owner account cannot be deactivated.' },
                    { status: 409 }
                );
            }
            patch.is_active = nextActive;
        }

        // Password resets go through Supabase Auth, never through this table.
        if (typeof body.password === 'string' && body.password) {
            if (body.password.length < MIN_PASSWORD_LENGTH) {
                return badRequest(`The password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
            }
            const { error: pwError } = await supabase.auth.admin.updateUserById(id, {
                password: body.password,
            });
            if (pwError) {
                console.error('[ADMIN_USERS] password update failed', pwError);
                return NextResponse.json({ error: 'The password could not be changed.' }, { status: 400 });
            }
            await audit(gate.identity, 'user', id, 'password_changed', `Password reset for ${target.email}`);
        }

        if (Object.keys(patch).length === 0) {
            return NextResponse.json({ ok: true, user: target });
        }

        const { data: updated, error: updateError } = await supabase
            .from('admin_users')
            .update(patch)
            .eq('id', id)
            .select('id, email, name, role, is_active')
            .maybeSingle();
        if (updateError) return serverError('user update failed', updateError);

        await audit(
            gate.identity,
            'user',
            id,
            'updated',
            `Portal user ${target.email} updated (${Object.keys(patch).join(', ')})`
        );

        return NextResponse.json({ ok: true, user: updated });
    } catch (error) {
        return serverError('unexpected failure updating portal user', error);
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const gate = await guard('users.manage');
    if (!gate.ok) return gate.response;

    const { id } = await params;
    if (!isUuid(id)) return badRequest('Invalid user id.');

    try {
        const { supabase, data: target, error: readError } = await loadTarget(id);
        if (readError) return serverError('user lookup failed', readError);
        if (!target) return notFound('That user no longer exists.');

        if (isOwnerRow(target.email)) {
            return NextResponse.json(
                { error: 'The owner account cannot be removed.' },
                { status: 409 }
            );
        }

        // Deleting the auth account cascades the admin_users row away via the
        // foreign key, so portal access and sign-in both end together and no
        // orphaned role row is left behind.
        const { error: authError } = await supabase.auth.admin.deleteUser(id);
        if (authError) {
            console.error('[ADMIN_USERS] auth.admin.deleteUser failed', authError);
            return NextResponse.json({ error: 'The user could not be removed.' }, { status: 500 });
        }

        // Belt and braces, in case the cascade is not in place.
        await supabase.from('admin_users').delete().eq('id', id);

        await audit(gate.identity, 'user', id, 'deleted', `Portal user ${target.email} removed`);
        return NextResponse.json({ ok: true });
    } catch (error) {
        return serverError('unexpected failure removing portal user', error);
    }
}
