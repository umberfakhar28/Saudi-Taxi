'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith('/admin');
    // /ar routes render their own ArabicNavbar/ArabicFooter (see src/app/ar/layout.tsx)
    // wrapped in a dir="rtl" container — skip the English chrome here.
    const isArabic = pathname.startsWith('/ar');

    if (isAdmin || isArabic) return <>{children}</>;

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
