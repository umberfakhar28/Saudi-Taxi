'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

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

    if (isAdmin) return <>{children}</>;
    if (isArabic) return <>{children}</>;

    const transparentHeader = isHome && !scrolledPastHero;

    return (
        <>
            <TopBar transparent={transparentHeader} />
            <Navbar transparent={transparentHeader} />
            {children}
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
