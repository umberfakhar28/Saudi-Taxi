import { redirect } from 'next/navigation';

/**
 * /admin had no page of its own, so typing the bare URL — the natural thing
 * to do, and what the "Admin Portal" links resolve to — returned a 404 even
 * for a signed-in admin. Every real page lives one level deeper
 * (/admin/dashboard, /admin/bookings, …), so this is the portal's front
 * door and forwards to the dashboard.
 *
 * proxy.ts still gates the destination: an unauthenticated visitor is sent
 * on to /admin/login from there, so this does not widen access.
 */
export default function AdminIndexPage() {
    redirect('/admin/dashboard');
}
