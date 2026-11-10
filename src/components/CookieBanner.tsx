'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  consentRequired,
  grantAnalytics,
  revokeAnalytics,
  saveChoice,
  storedChoice,
  type ConsentChoice,
} from '@/lib/consent';
import styles from './CookieBanner.module.css';

/**
 * The cookie consent banner (audit §9, option A).
 *
 * Shown on its own only to visitors from the EU/EEA, UK and Switzerland who
 * have not chosen yet; anyone can reopen it from "Cookie Settings" in the
 * footer. Accept and Reject are the same size and style on purpose: under
 * GDPR, refusing must be as easy as agreeing.
 *
 * Rendered only after hydration and position-fixed, so it never shifts the
 * page (no CLS), and the server HTML is identical for every visitor, which
 * keeps every page static.
 */

const COPY = {
  en: {
    text: 'We use Google Analytics cookies to see which pages help travellers. They are only set if you accept.',
    accept: 'Accept',
    reject: 'Reject',
    policy: 'Privacy policy',
    label: 'Cookie consent',
  },
  ar: {
    text: 'نستخدم ملفات تعريف الارتباط من Google Analytics لمعرفة الصفحات التي تفيد المسافرين، ولا نضعها إلا بموافقتك.',
    accept: 'موافق',
    reject: 'رفض',
    policy: 'سياسة الخصوصية',
    label: 'الموافقة على ملفات تعريف الارتباط',
  },
} as const;

export default function CookieBanner() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Reading cookies has to wait for the browser; the banner is never part
    // of the server HTML.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (consentRequired() && !storedChoice()) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  if (!open || pathname.startsWith('/admin')) return null;

  const isArabic = pathname.startsWith('/ar');
  const t = isArabic ? COPY.ar : COPY.en;

  const choose = (choice: ConsentChoice) => {
    saveChoice(choice);
    if (choice === 'granted') grantAnalytics();
    else revokeAnalytics();
    setOpen(false);
  };

  return (
    <div
      className={styles.banner}
      role="region"
      aria-label={t.label}
      dir={isArabic ? 'rtl' : undefined}
      lang={isArabic ? 'ar' : undefined}
      data-cookie-banner
    >
      <p className={styles.text}>
        {t.text}{' '}
        <Link href="/privacy-policy#cookies" className={styles.policy}>{t.policy}</Link>
      </p>
      <div className={styles.actions}>
        <button type="button" className={`btn btn-outline ${styles.button}`} onClick={() => choose('denied')}>
          {t.reject}
        </button>
        <button type="button" className={`btn btn-outline ${styles.button}`} onClick={() => choose('granted')}>
          {t.accept}
        </button>
      </div>
    </div>
  );
}
