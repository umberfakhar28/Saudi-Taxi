'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    CalendarCheck,
    Users,
    Settings,
    LogOut,
    Car,
    Globe,
    ChevronRight,
    FileText,
    Receipt,
    BarChart3,
    Calendar,
    Zap,
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import './admin.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const isLoginPage = pathname === '/admin/login';
    if (isLoginPage) return <>{children}</>;

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
        router.refresh();
    };

    const navGroups = [
        {
            label: 'Main',
            items: [
                { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, desc: 'Overview & Stats' },
                { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck, desc: 'Manage Rides' },
                { name: 'Calendar', href: '/admin/calendar', icon: Calendar, desc: 'Schedule View' },
            ],
        },
        {
            label: 'Sales & Billing',
            items: [
                { name: 'Quotes', href: '/admin/quotes', icon: FileText, desc: 'Pricing Estimates' },
                { name: 'Invoices', href: '/admin/invoices', icon: Receipt, desc: 'Billing & Payments' },
            ],
        },
        {
            label: 'Management',
            items: [
                { name: 'Fleet', href: '/admin/fleet', icon: Car, desc: 'Vehicles' },
                { name: 'Customers', href: '/admin/customers', icon: Users, desc: 'Client Database' },
            ],
        },
        {
            label: 'System',
            items: [
                { name: 'Reports', href: '/admin/reports', icon: BarChart3, desc: 'Analytics & Export' },
                { name: 'Automation', href: '/admin/automation', icon: Zap, desc: 'Pricing Rules' },
                { name: 'Settings', href: '/admin/settings', icon: Settings, desc: 'Configuration' },
            ],
        },
    ];

    const allItems = navGroups.flatMap(g => g.items);
    const currentPage = allItems.find(i => pathname.startsWith(i.href));

    return (
        <div className="admin-shell">
            {/* ── Sidebar ── */}
            <aside className="admin-sidebar">
                {/* Logo */}
                <div className="admin-logo">
                    <div className="admin-logo-badge">ST</div>
                    <div>
                        <div className="admin-logo-title">Saudi Taxi</div>
                        <div className="admin-logo-sub">Admin Portal</div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="admin-nav">
                    {navGroups.map(group => (
                        <div key={group.label} className="admin-nav-group">
                            <span className="admin-nav-label">{group.label}</span>
                            {group.items.map(item => {
                                const Icon = item.icon;
                                const active = pathname.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`admin-nav-item${active ? ' active' : ''}`}
                                    >
                                        <div className="admin-nav-icon">
                                            <Icon size={18} />
                                        </div>
                                        <div className="admin-nav-text">
                                            <span className="admin-nav-name">{item.name}</span>
                                            <span className="admin-nav-desc">{item.desc}</span>
                                        </div>
                                        {active && <ChevronRight size={14} className="admin-nav-arrow" />}
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </nav>

                {/* Footer actions */}
                <div className="admin-sidebar-footer">
                    <Link href="/" target="_blank" className="admin-footer-link">
                        <Globe size={16} />
                        View Website
                    </Link>
                    <button onClick={handleSignOut} className="admin-footer-link admin-signout">
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* ── Main ── */}
            <main className="admin-main">
                {/* Page breadcrumb strip */}
                <div className="admin-page-bar">
                    <div className="admin-breadcrumb">
                        <span>Admin</span>
                        <ChevronRight size={14} />
                        <span className="admin-breadcrumb-current">
                            {currentPage?.name ?? 'Page'}
                        </span>
                    </div>
                </div>

                <div className="admin-content">
                    {children}
                </div>
            </main>
        </div>
    );
}
