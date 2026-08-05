'use client';

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

    if (isAdmin) return <>{children}</>;
    if (isArabic) return <>{children}</>;

    return (
        <>
            <TopBar />
            <Navbar />
            {children}
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
