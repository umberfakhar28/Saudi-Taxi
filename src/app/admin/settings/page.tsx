import Link from 'next/link';
import { TRUSTPILOT_REVIEW_URL, maskedTrustpilotBcc } from '@/lib/trustpilot';

/**
 * Settings used to redirect straight to Automation, which left the sidebar's
 * Settings entry pointing at a pricing page. It now shows the integrations
 * that are configured outside the database — read-only, since these are
 * environment variables, not editable records.
 *
 * A server component on purpose: TRUSTPILOT_BCC_EMAIL is server-side only,
 * and only its masked form ever reaches the browser.
 */
export const dynamic = 'force-dynamic';

export default function SettingsPage() {
    const bcc = maskedTrustpilotBcc();

    return (
        <div>
            <div style={{ marginBottom: '1.75rem' }}>
                <h1 className="admin-page-title">Settings</h1>
                <p className="admin-page-sub" style={{ margin: 0 }}>Integrations and configuration.</p>
            </div>

            <div style={{ padding: '1.5rem', maxWidth: 760, background: '#fff', border: '1px solid var(--adm-line)', borderRadius: 12, boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--adm-navy)', margin: 0 }}>⭐ Trustpilot reviews</h2>
                    <span style={{
                        fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 999,
                        background: bcc ? 'var(--adm-success-tint)' : 'var(--adm-warning-tint)', color: bcc ? 'var(--adm-success-ink)' : 'var(--adm-gold-ink)',
                    }}>
                        {bcc ? 'Invitations active' : 'Invitations not configured'}
                    </span>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--adm-text)', lineHeight: 1.7, margin: '0 0 1rem' }}>
                    When a booking is marked <strong>Completed</strong>, the customer is emailed a thank-you
                    with a button to review Gulf Trip Service. The same link is offered in the WhatsApp
                    composer for completed bookings, so it can be sent either way.
                </p>

                <dl style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, auto) 1fr', gap: '0.6rem 1rem', margin: 0, fontSize: '0.85rem' }}>
                    <dt style={{ color: 'var(--adm-muted)', fontWeight: 600 }}>Review page</dt>
                    <dd style={{ margin: 0, minWidth: 0 }}>
                        <a href={TRUSTPILOT_REVIEW_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--adm-info)', fontWeight: 600, overflowWrap: 'anywhere' }}>
                            {TRUSTPILOT_REVIEW_URL}
                        </a>
                    </dd>

                    <dt style={{ color: 'var(--adm-muted)', fontWeight: 600 }}>Trustpilot BCC</dt>
                    <dd style={{ margin: 0, minWidth: 0, color: 'var(--adm-ink)', overflowWrap: 'anywhere' }}>
                        {bcc ? (
                            <>
                                {bcc}
                                <div style={{ color: 'var(--adm-muted)', fontSize: '0.8rem', marginTop: 2 }}>
                                    Completion emails are blind-copied here, so Trustpilot also sends its own invitation.
                                </div>
                            </>
                        ) : (
                            <>
                                Not set
                                <div style={{ color: 'var(--adm-gold-ink)', fontSize: '0.8rem', marginTop: 2 }}>
                                    Add <code>TRUSTPILOT_BCC_EMAIL</code> (your unique @invite.trustpilot.com address)
                                    to the environment variables and redeploy. Emails still send without it — only
                                    Trustpilot&apos;s own invitation is skipped.
                                </div>
                            </>
                        )}
                    </dd>
                </dl>

                <p style={{ fontSize: '0.8rem', color: 'var(--adm-muted)', margin: '1.25rem 0 0' }}>
                    Pricing rules live under <Link href="/admin/automation" style={{ color: 'var(--adm-info)', fontWeight: 600 }}>Automation</Link>.
                </p>
            </div>
        </div>
    );
}
