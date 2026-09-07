'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { can, type AdminRole, type Permission } from '@/lib/roles';

interface AdminAuthValue {
    email: string | null;
    name: string | null;
    role: AdminRole | null;
    isOwner: boolean;
    /** False until /api/admin/me answers, so the UI can avoid flashing. */
    ready: boolean;
    /** Does the signed-in user hold this permission? */
    allowed: (permission: Permission) => boolean;
}

const AdminAuthContext = createContext<AdminAuthValue>({
    email: null,
    name: null,
    role: null,
    isOwner: false,
    ready: false,
    allowed: () => false,
});

export function useAdminAuth() {
    return useContext(AdminAuthContext);
}

/**
 * Makes the signed-in user's role available to every admin page so it can
 * hide or disable actions that role cannot perform.
 *
 * This is presentation only. The same permission is checked again server-side
 * in the API route, and a third time by the database's RLS policies, so a
 * Supervisor who forges a request still cannot write anything.
 *
 * While the role is loading, `allowed()` returns false — actions appear
 * disabled for a moment rather than briefly appearing enabled to someone who
 * may not be permitted to use them.
 */
export default function AdminAuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<{
        email: string | null;
        name: string | null;
        role: AdminRole | null;
        isOwner: boolean;
        ready: boolean;
    }>({ email: null, name: null, role: null, isOwner: false, ready: false });

    useEffect(() => {
        let active = true;
        fetch('/api/admin/me')
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (!active) return;
                if (!data) {
                    setState((prev) => ({ ...prev, ready: true }));
                    return;
                }
                setState({
                    email: data.email ?? null,
                    name: data.name ?? null,
                    role: (data.role as AdminRole) ?? null,
                    isOwner: !!data.isOwner,
                    ready: true,
                });
            })
            .catch(() => {
                if (active) setState((prev) => ({ ...prev, ready: true }));
            });
        return () => {
            active = false;
        };
    }, []);

    const value = useMemo<AdminAuthValue>(
        () => ({ ...state, allowed: (permission: Permission) => can(state.role, permission) }),
        [state]
    );

    return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}
