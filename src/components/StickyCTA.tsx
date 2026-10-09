'use client';

import Link from 'next/link';
import styles from './StickyCTA.module.css';
import { waLink } from '@/lib/contact';
import { MessageIcon } from '@/components/Icons';

export default function StickyCTA() {
  return (
    <div className={styles.stickyContainer}>
      <Link href="#quote" className={styles.btnPrimary}>
        Request a Transfer Quote
      </Link>
      <a
        href={waLink('Hi, I would like to arrange an airport transfer from Riyadh.')}
        className={styles.btnWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageIcon size={18} /> WhatsApp Us
      </a>
    </div>
  );
}
