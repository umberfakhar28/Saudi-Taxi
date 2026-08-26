'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import MobileBottomNav from './MobileBottomNav';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith('/admin');
    // /ar routes render their own ArabicNavbar/ArabicFooter (see src/app/ar/layout.tsx)
    // wrapped in a dir="rtl" container — skip the English chrome here. That
    // layout mounts its own <FloatingWhatsApp /> too (§3 of the Homepage
    // Hero + Multi-Mode Search addendum calls for it site-wide).
    const isArabic = pathname.startsWith('/ar');
    const isHome = pathname === '/';

    // Homepage-only: the header floats transparently over the hero photo
    // until the user scrolls past it, then solidifies like every other
    // page's header. Scroll tracking only runs on "/" — elsewhere the
    // header is unconditionally solid, unchanged from before.
    const [scrolledPastHero, setScrolledPastHero] = useState(false);

    useEffect(() => {
        if (!isHome) return;
        const onScroll = () => setScrolledPastHero(window.scrollY > 80);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [isHome]);

    // Lifted up (rather than kept local to Navbar) so the mobile bottom
    // nav's "Menu" button can open/close the exact same drawer as the
    // header's hamburger, instead of the two maintaining separate state.
    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = () => setMenuOpen(false);

    // No separate "close drawer on route change" effect — every Link
    // inside the drawer (Navbar.tsx) already calls close() in its own
    // onClick, synchronously, before navigation ever starts, which covers
    // every actual way the drawer's own contents can trigger a route
    // change. An effect keyed on `pathname` would be redundant and would
    // also trip this project's react-hooks/set-state-in-effect rule for
    // no real benefit.

    // Marks <body> only on the pages that actually render MobileBottomNav
    // below (not /admin, not /ar), so the fixed bar's reserved bottom
    // padding (globals.css, `body.has-bottom-nav`) never applies to a page
    // that doesn't have the bar — admin's own fixed layout in particular
    // shouldn't gain unrelated bottom spacing.
    useEffect(() => {
        const hasBottomNav = !isAdmin && !isArabic;
        document.body.classList.toggle('has-bottom-nav', hasBottomNav);
        return () => document.body.classList.remove('has-bottom-nav');
    }, [isAdmin, isArabic]);

    if (isAdmin) return <>{children}</>;
    if (isArabic) return <>{children}</>;

    const transparentHeader = isHome && !scrolledPastHero;

    return (
        <>
            <TopBar transparent={transparentHeader} />
            <Navbar transparent={transparentHeader} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} onCloseMenu={closeMenu} />
            {children}
            <Footer />
            <FloatingWhatsApp />
            <MobileBottomNav menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
        </>
    );
}
