/**
 * Role-based access control for the Admin Portal.
 *
 * Until now the portal was single-admin: proxy.ts compared the signed-in
 * email to ADMIN_EMAIL and that was the whole model. This adds three roles
 * on top of that WITHOUT removing the old guarantee — the ADMIN_EMAIL
 * account is always a full admin, whatever the admin_users table says (or
 * even if that table does not exist yet). That keeps the owner from ever
 * locking themselves out, and means the portal keeps working unchanged if
 * the 002 migration has not been run.
 *
 * This module is intentionally free of server-only imports so the same
 * permission table drives both the UI (what to show) and the API routes
 * (what to allow). The UI use is a convenience; the API use is the actual
 * security boundary.
 */

export type AdminRole = 'supervisor' | 'manager' | 'admin';

export const ADMIN_ROLES: AdminRole[] = ['supervisor', 'manager', 'admin'];

export const ROLE_LABELS: Record<AdminRole, string> = {
    supervisor: 'Supervisor — Read Only',
    manager: 'Manager — Create/Edit, No Delete',
    admin: 'Admin — Full Access',
};

export const ROLE_DESCRIPTIONS: Record<AdminRole, string> = {
    supervisor: 'Can sign in and view the dashboard, bookings, quotes, invoices and customers. Cannot create, edit, delete or change any status.',
    manager: 'Full day-to-day operations: create and edit bookings, quotes and invoices, change booking status, message customers. Cannot delete anything or manage users.',
    admin: 'Everything a Manager can do, plus deleting records and creating/managing portal users.',
};

export type Permission =
    | 'dashboard.view'
    | 'bookings.view'
    | 'bookings.create'
    | 'bookings.edit'
    | 'bookings.status'
    | 'bookings.delete'
    | 'quotes.view'
    | 'quotes.create'
    | 'quotes.edit'
    | 'quotes.send'
    | 'quotes.delete'
    | 'invoices.view'
    | 'invoices.create'
    | 'invoices.edit'
    | 'invoices.delete'
    | 'customers.view'
    | 'customers.edit'
    | 'customers.delete'
    | 'comms.send'
    | 'users.manage';

/** Everything a Supervisor can do: look, and nothing else. */
const VIEW_ONLY: Permission[] = [
    'dashboard.view',
    'bookings.view',
    'quotes.view',
    'invoices.view',
    'customers.view',
];

/** Manager = every operational action that is not a deletion and not user admin. */
const MANAGER: Permission[] = [
    ...VIEW_ONLY,
    'bookings.create',
    'bookings.edit',
    'bookings.status',
    'quotes.create',
    'quotes.edit',
    'quotes.send',
    'invoices.create',
    'invoices.edit',
    'customers.edit',
    'comms.send',
];

/** Admin = Manager + destructive actions + user management. */
const ADMIN: Permission[] = [
    ...MANAGER,
    'bookings.delete',
    'quotes.delete',
    'invoices.delete',
    'customers.delete',
    'users.manage',
];

export const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
    supervisor: VIEW_ONLY,
    manager: MANAGER,
    admin: ADMIN,
};

/** Narrows arbitrary stored input to a real role. Unknown ⇒ least privilege. */
export function toAdminRole(value?: string | null): AdminRole {
    const lower = String(value ?? '').trim().toLowerCase();
    return (ADMIN_ROLES as string[]).includes(lower) ? (lower as AdminRole) : 'supervisor';
}

export function can(role: AdminRole | null | undefined, permission: Permission): boolean {
    if (!role) return false;
    return ROLE_PERMISSIONS[role].includes(permission);
}

/** The signed-in portal user, as resolved by requireAdmin()/useAdminRole(). */
export interface AdminIdentity {
    email: string;
    role: AdminRole;
    name: string | null;
    /** True for the ADMIN_EMAIL account — it can never be demoted or deleted. */
    isOwner: boolean;
}
