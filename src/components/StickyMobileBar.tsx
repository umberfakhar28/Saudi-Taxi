import { MessageIcon, PhoneIcon, TagIcon } from './Icons';
import { WHATSAPP_URL, TEL_URL } from '@/lib/contact';
import styles from './StickyMobileBar.module.css';

/** Mobile-only persistent action bar. Renders nothing visible on desktop.
 *  Place near the end of a page's <main> — the spacer above the bar
 *  prevents it covering the last section's content. */
export default function StickyMobileBar({ ratesHref = '#booking-widget' }: { ratesHref?: string }) {
  return (
    <>
      <div className={styles.spacer} aria-hidden="true" />
      <nav className={styles.bar} aria-label="Quick actions">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${styles.action}`}>
          <MessageIcon size={16} /> WhatsApp
        </a>
        <a href={TEL_URL} className={`btn btn-secondary ${styles.action}`}>
          <PhoneIcon size={16} /> Call
        </a>
        <a href={ratesHref} className={`btn btn-outline-gold ${styles.action}`}>
          <TagIcon size={16} /> Check Rates
        </a>
      </nav>
    </>
  );
}
