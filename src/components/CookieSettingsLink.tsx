'use client';

import { OPEN_COOKIE_SETTINGS_EVENT } from '@/lib/consent';

/**
 * Footer link that reopens the cookie banner, so consent can be withdrawn as
 * easily as it was given. A button, not a link: it goes nowhere.
 */
export default function CookieSettingsLink({ className, label = 'Cookie Settings' }: { className?: string; label?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
      style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit' }}
    >
      {label}
    </button>
  );
}
