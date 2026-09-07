'use client';

import { useCallback, useEffect, useState } from 'react';
import { RefreshCw, ShieldCheck, UserPlus, Trash2, KeyRound, X } from 'lucide-react';
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';
import { useFeedback } from '@/components/admin/AdminFeedback';
import Tooltip from '@/components/admin/Tooltip';
import { ADMIN_ROLES, ROLE_DESCRIPTIONS, ROLE_LABELS, type AdminRole } from '@/lib/roles';
import { displayDate } from '@/lib/datetime';

interface PortalUser {
    id: string;
    email: string;
    name: string | null;
    role: AdminRole;
    is_active: boolean;
    created_at: string;
    created_by: string | null;
    isOwner: boolean;
}

const BLANK_FORM = { name: '', email: '', password: '', role: 'supervisor' as AdminRole };

export default function AdminUsersPage() {
    const { allowed, ready } = useAdminAuth();
    const { showToast, confirm } = useFeedback();

    const [users, setUsers] = useState<PortalUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [migrationRequired, setMigrationRequired] = useState(false);

    const [showCreate, setShowCreate] = useState(false);
    const [form, setForm] = useState(BLANK_FORM);
    const [creating, setCreating] = useState(false);
    const [busyId, setBusyId] = useState<string | null>(null);
    const [passwordFor, setPasswordFor] = useState<PortalUser | null>(null);
    const [newPassword, setNewPassword] = useState('');

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setLoadError(null);
        try {
            const res = await fetch('/api/admin/users');
            const json = await res.json().catch(() => ({}));
            if (!res.ok) {
                setMigrationRequired(!!json.migrationRequired);
                setLoadError(json.error || 'Could not load portal users.');
                setUsers([]);
                return;
            }
            setMigrationRequired(false);
            setUsers(json.users ?? []);
        } catch {
            setLoadError('Could not reach the server. Check your connection and try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const createUser = async () => {
        if (!form.name.trim()) { showToast('error', 'Enter the person’s name.'); return; }
        if (!form.email.trim()) { showToast('error', 'Enter an email address.'); return; }
        if (form.password.length < 10) { showToast('error', 'The password must be at least 10 characters.'); return; }

        setCreating(true);
        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(json.error || 'Could not create the user.');
            showToast('success', `${form.email} can now sign in as ${form.role}.`);
            setForm(BLANK_FORM);
            setShowCreate(false);
            fetchUsers();
        } catch (err: any) {
            showToast('error', err.message);
        } finally {
            setCreating(false);
        }
    };

    const patchUser = async (user: PortalUser, patch: Record<string, unknown>, successMessage: string) => {
        setBusyId(user.id);
        try {
            const res = await fetch(`/api/admin/users/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(patch),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(json.error || 'The change could not be saved.');
            showToast('success', successMessage);
            fetchUsers();
        } catch (err: any) {
            showToast('error', err.message);
        } finally {
            setBusyId(null);
        }
    };

    const removeUser = async (user: PortalUser) => {
        const ok = await confirm({
            title: `Remove ${user.name || user.email}?`,
            body: 'They will lose access to the admin portal immediately and their sign-in account is deleted. Bookings, quotes and invoices they worked on are unaffected.',
            confirmLabel: 'Remove access',
        });
        if (!ok) return;
        setBusyId(user.id);
        try {
            const res = await fetch(`/api/admin/users/${user.id}`, { method: 'DELETE' });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(json.error || 'The user could not be removed.');
            showToast('success', `${user.email} no longer has access.`);
            fetchUsers();
        } catch (err: any) {
            showToast('error', err.message);
        } finally {
            setBusyId(null);
        }
    };

    const resetPassword = async () => {
        if (!passwordFor) return;
        if (newPassword.length < 10) { showToast('error', 'The password must be at least 10 characters.'); return; }
        await patchUser(passwordFor, { password: newPassword }, `Password updated for ${passwordFor.email}.`);
        setPasswordFor(null);
        setNewPassword('');
    };

    // The API refuses non-admins regardless; this only avoids showing a page
    // whose every control would fail.
    if (ready && !allowed('users.manage')) {
        return (
            <div style={{ padding: '4rem 1rem', textAlign: 'center', color: '#64748b' }}>
                <ShieldCheck size={32} style={{ opacity: 0.35, marginBottom: '1rem' }} />
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>Admins only</div>
                <div style={{ fontSize: '0.88rem' }}>Managing portal users requires full admin access.</div>
            </div>
        );
    }

    return (
        <div style={{ paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                    <h1 className="admin-page-title">Portal Users</h1>
                    <p className="admin-page-sub" style={{ margin: 0 }}>Who can sign in to this portal, and what they may do.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button onClick={fetchUsers} className="admin-btn-secondary"><RefreshCw size={15} /> Refresh</button>
                    <button onClick={() => setShowCreate(true)} className="admin-btn-primary"><UserPlus size={15} /> Add User</button>
                </div>
            </div>

            {/* What each role means — stated on the page so an admin does not
                have to guess before assigning one. */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {ADMIN_ROLES.map((role) => (
                    <div key={role} style={{ background: '#fff', border: '1px solid #e8edf2', borderRadius: 12, padding: '0.9rem 1rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a', marginBottom: 4 }}>{ROLE_LABELS[role]}</div>
                        <div style={{ fontSize: '0.76rem', color: '#64748b', lineHeight: 1.5 }}>{ROLE_DESCRIPTIONS[role]}</div>
                    </div>
                ))}
            </div>

            {migrationRequired && (
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#92400e', lineHeight: 1.6 }}>
                    <strong>One setup step remaining.</strong> Run{' '}
                    <code style={{ background: '#fef3c7', padding: '1px 5px', borderRadius: 4 }}>supabase/sql/002_roles_currency_soft_delete.sql</code>{' '}
                    in the Supabase dashboard (SQL Editor → New query → paste → Run). It creates the table that stores portal
                    roles. Until then the portal keeps working exactly as before for the owner account.
                </div>
            )}

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Added</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                                <RefreshCw className="animate-spin" style={{ margin: '0 auto', display: 'block', marginBottom: '0.75rem' }} /> Loading users…
                            </td></tr>
                        ) : loadError && !migrationRequired ? (
                            <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#991b1b' }}>{loadError}</td></tr>
                        ) : users.length === 0 ? (
                            <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                                No portal users yet. Use “Add User” to give someone access.
                            </td></tr>
                        ) : users.map((user) => (
                            <tr key={user.id} style={{ opacity: user.is_active ? 1 : 0.55 }}>
                                <td>
                                    <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                                        {user.name || user.email.split('@')[0]}
                                        {user.isOwner && (
                                            <Tooltip label="Owner account" text="The account named by ADMIN_EMAIL. It is always a full admin and cannot be demoted, deactivated or removed — this is what guarantees you can never be locked out.">
                                                <ShieldCheck size={14} color="#4338ca" />
                                            </Tooltip>
                                        )}
                                    </div>
                                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{user.email}</div>
                                </td>
                                <td>
                                    <select
                                        value={user.role}
                                        disabled={user.isOwner || busyId === user.id}
                                        onChange={(e) => patchUser(user, { role: e.target.value }, `${user.email} is now a ${e.target.value}.`)}
                                        className="admin-filter-select"
                                        style={{ fontSize: '0.8rem' }}
                                    >
                                        {ADMIN_ROLES.map((r) => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
                                    </select>
                                </td>
                                <td>
                                    <span className={user.is_active ? 'badge-confirmed' : 'badge-cancelled'}>
                                        {user.is_active ? 'Active' : 'Disabled'}
                                    </span>
                                </td>
                                <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                    {displayDate(user.created_at)}
                                    {user.created_by && <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>by {user.created_by}</div>}
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                                        {!user.isOwner && (
                                            <button
                                                className="admin-btn-secondary"
                                                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                                                disabled={busyId === user.id}
                                                onClick={() => patchUser(user, { is_active: !user.is_active }, `${user.email} ${user.is_active ? 'disabled' : 're-enabled'}.`)}
                                            >
                                                {user.is_active ? 'Disable' : 'Enable'}
                                            </button>
                                        )}
                                        <Tooltip label="Set a new password" text="Replaces this user's password immediately. They are not emailed — tell them the new password yourself.">
                                            <button
                                                className="admin-btn-secondary"
                                                style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                                                disabled={busyId === user.id}
                                                onClick={() => { setPasswordFor(user); setNewPassword(''); }}
                                                aria-label={`Set a new password for ${user.email}`}
                                            >
                                                <KeyRound size={13} />
                                            </button>
                                        </Tooltip>
                                        {!user.isOwner && (
                                            <button
                                                className="admin-btn-secondary"
                                                style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem', background: '#fef2f2', borderColor: '#fca5a5', color: '#991b1b' }}
                                                disabled={busyId === user.id}
                                                onClick={() => removeUser(user)}
                                                aria-label={`Remove ${user.email}`}
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── Create user ── */}
            {showCreate && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setShowCreate(false)}>
                    <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, padding: '1.75rem', width: '100%', maxWidth: 480, maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>Add Portal User</div>
                            <button onClick={() => setShowCreate(false)} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={20} /></button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Field label="Full name">
                                <input className="admin-search-input" style={{ width: '100%', boxSizing: 'border-box' }} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            </Field>
                            <Field label="Email address">
                                <input type="email" autoComplete="off" className="admin-search-input" style={{ width: '100%', boxSizing: 'border-box' }} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            </Field>
                            <Field label="Password" hint="At least 10 characters. Share it with them directly — no email is sent.">
                                <input type="password" autoComplete="new-password" className="admin-search-input" style={{ width: '100%', boxSizing: 'border-box' }} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                            </Field>
                            <Field label="Role" hint={ROLE_DESCRIPTIONS[form.role]}>
                                <select className="admin-search-input" style={{ width: '100%', boxSizing: 'border-box' }} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as AdminRole })}>
                                    {ADMIN_ROLES.map((r) => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
                                </select>
                            </Field>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                            <button className="admin-btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
                            <button className="admin-btn-primary" onClick={createUser} disabled={creating}>
                                {creating ? 'Creating…' : 'Create User'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Reset password ── */}
            {passwordFor && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setPasswordFor(null)}>
                    <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, padding: '1.75rem', width: '100%', maxWidth: 420 }}>
                        <div style={{ fontWeight: 800, fontSize: '1.02rem', color: '#0f172a', marginBottom: '0.4rem' }}>
                            New password
                        </div>
                        <div style={{ fontSize: '0.83rem', color: '#64748b', marginBottom: '1.1rem' }}>
                            For {passwordFor.email}. This takes effect immediately.
                        </div>
                        <input
                            type="password"
                            autoComplete="new-password"
                            className="admin-search-input"
                            style={{ width: '100%', boxSizing: 'border-box' }}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="At least 10 characters"
                        />
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', justifyContent: 'flex-end' }}>
                            <button className="admin-btn-secondary" onClick={() => setPasswordFor(null)}>Cancel</button>
                            <button className="admin-btn-primary" onClick={resetPassword} disabled={busyId === passwordFor.id}>
                                {busyId === passwordFor.id ? 'Saving…' : 'Set Password'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
    return (
        <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 5 }}>{label}</label>
            {children}
            {hint && <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 5, lineHeight: 1.45 }}>{hint}</div>}
        </div>
    );
}
