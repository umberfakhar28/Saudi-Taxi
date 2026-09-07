import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { audit, guard, badRequest, serverError } from '@/utils/adminApi';
import { ADMIN_ROLES, toAdminRole } from '@/lib/roles';

/**
 * GET  /api/admin/users — list portal users
 * POST /api/admin/users — create one
 *
 * Both are Admin-only (§13: "Only the Main Admin can create admin portal
 * users"). The permission is checked here, on the server, before anything is
 * read or written — the Users section being hidden from the sidebar for
 * other roles is a convenience, not the control.
 *
 * Passwords are never handled by this application. The account is created
 * through Supabase Auth's admin API, which hashes and stores the credential
 * in auth.users exactly as the existing sign-in flow expects; admin_users
 * only ever holds the role.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 10;

function ownerEmail(): string | null {
    return process.env.ADMIN_EMAIL?.trim().toLowerCase() || null;
}

export async function GET() {
    const gate = await guard('users.manage');
    if (!gate.ok) return gate.response;

    try {
        const supabase = createAdminClient();
        const { data, error } = await supabase
            .from('admin_users')
            .select('id, email, name, role, is_active, created_at, created_by')
            .order('created_at', { ascending: true });

        if (error) {
            // admin_users only exists once supabase/sql/002 has been applied.
            return NextResponse.json(
                {
                    error:
                        'User management needs the 002 migration (supabase/sql/002_roles_currency_soft_delete.sql) to be run first.',
                    migrationRequired: true,
                },
                { status: 503 }
            );
        }

        const owner = ownerEmail();
        return NextResponse.json({
            users: (data ?? []).map((u) => ({
                ...u,
                // The owner is flagged so the UI can refuse to offer actions
                // that the server would reject anyway.
                isOwner: !!owner && u.email?.trim().toLowerCase() === owner,
            })),
        });
    } catch (error) {
        return serverError('listing portal users failed', error);
    }
}

export async function POST(req: Request) {
    const gate = await guard('users.manage');
    if (!gate.ok) return gate.response;

    let body: Record<string, unknown>;
    try {
        body = await req.json();
    } catch {
        return badRequest('Expected a JSON body.');
    }

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const role = toAdminRole(typeof body.role === 'string' ? body.role : '');
    const isActive = body.is_active === undefined ? true : !!body.is_active;

    if (!name) return badRequest('A name is required.');
    if (!EMAIL_RE.test(email)) return badRequest('A valid email address is required.');
    if (password.length < MIN_PASSWORD_LENGTH) {
        return badRequest(`The password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
    }
    if (!ADMIN_ROLES.includes(role)) return badRequest('Unknown role.');

    const supabase = createAdminClient();
    let createdUserId: string | null = null;

    try {
        const { data: created, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Created by an admin, so no confirmation round-trip.
            user_metadata: { name },
        });

        if (authError || !created?.user) {
            const message = authError?.message ?? '';
            if (/already|registered|exists/i.test(message)) {
                return NextResponse.json(
                    { error: 'An account with that email address already exists.' },
                    { status: 409 }
                );
            }
            console.error('[ADMIN_USERS] auth.admin.createUser failed', authError);
            return NextResponse.json(
                { error: 'The account could not be created. Check the email address and try again.' },
                { status: 400 }
            );
        }

        createdUserId = created.user.id;

        const { error: roleError } = await supabase.from('admin_users').insert({
            id: created.user.id,
            email,
            name,
            role,
            is_active: isActive,
            created_by: gate.identity.email,
        });

        if (roleError) {
            // Roll the auth account back rather than leaving an account that
            // can authenticate but has no role — it would be able to sign in
            // and then be bounced with no explanation.
            await supabase.auth.admin.deleteUser(created.user.id).catch(() => {});
            createdUserId = null;
            console.error('[ADMIN_USERS] admin_users insert failed', roleError);
            return NextResponse.json(
                {
                    error:
                        'The account was not created. If this is the first user you have added, run ' +
                        'supabase/sql/002_roles_currency_soft_delete.sql first.',
                },
                { status: 503 }
            );
        }

        await audit(gate.identity, 'user', created.user.id, 'created', `Portal user ${email} created as ${role}`);

        return NextResponse.json({
            ok: true,
            user: { id: created.user.id, email, name, role, is_active: isActive },
        });
    } catch (error) {
        if (createdUserId) {
            await createAdminClient().auth.admin.deleteUser(createdUserId).catch(() => {});
        }
        return serverError('unexpected failure creating portal user', error);
    }
}
