'use client';

/**
 * The invoice as the customer sees it, on screen.
 *
 * The same markup serves the invoice detail page (where it is also what
 * `window.print()` puts on paper) and the preview modal on the Bookings
 * page. Those two had drifted: the preview showed a hardcoded "Jeddah,
 * Saudi Arabia" that contradicted the site's own structured data, billed
 * the booking's quote rather than the invoice's total, and had no status,
 * payment method, VAT or balance at all.
 *
 * What to show is decided by lib/invoiceDocument.ts, which the PNG/PDF
 * exporter and the invoice email read from too, so all four agree by
 * construction rather than by being kept in step by hand.
 */

import { LogoMark } from '@/components/Logo';
import { COMPANY_LOCALITY, COMPANY_NAME, EMAIL, PHONE_DISPLAY } from '@/lib/contact';
import { buildInvoiceDocument, type InvoiceRecord } from '@/lib/invoiceDocument';

const MUTED = '#64748b';
const FAINT = '#94a3b8';
const INK = '#0f172a';

const LABEL: React.CSSProperties = {
    fontSize: '0.64rem', fontWeight: 700, color: FAINT,
    textTransform: 'uppercase', letterSpacing: '0.06em',
};

const STATUS_STYLE: Record<string, React.CSSProperties> = {
    paid: { background: '#dcfce7', color: '#166534' },
    partially_paid: { background: '#e0e7ff', color: '#3730a3' },
    unpaid: { background: '#fef3c7', color: '#92400e' },
};

export default function InvoiceDocumentView({ invoice }: { invoice: InvoiceRecord }) {
    const doc = buildInvoiceDocument(invoice);
    const pill = STATUS_STYLE[doc.statusValue] ?? STATUS_STYLE.unpaid;

    return (
        <div className="invoice-sheet" style={{
            background: '#fff', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            padding: 'clamp(1.25rem, 4vw, 2.5rem)', maxWidth: 740, margin: '0 auto', color: INK,
        }}>
            {/* ── Header ─────────────────────────────────────────────── */}
            <div className="invoice-header" style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                gap: '1.25rem', flexWrap: 'wrap', marginBottom: '1.75rem',
            }}>
                <div>
                    <div style={{ fontWeight: 900, fontSize: 'clamp(1.4rem, 5vw, 1.8rem)', letterSpacing: '-0.5px' }}>
                        {doc.title}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: FAINT, marginTop: 4, fontFamily: 'monospace' }}>
                        {doc.number}
                    </div>
                    <span style={{
                        ...pill, display: 'inline-block', marginTop: 10, padding: '0.25rem 0.7rem',
                        borderRadius: 999, fontSize: '0.66rem', fontWeight: 800,
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>{doc.statusLabel}</span>
                </div>
                {/* Every line from lib/contact.ts — the single source the
                    exported document and the emails already use. */}
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                    <LogoMark size={46} variant="color" />
                    <div>
                        <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{COMPANY_NAME}</div>
                        <div style={{ fontSize: '0.78rem', color: MUTED, marginTop: 4, lineHeight: 1.55 }}>
                            {COMPANY_LOCALITY}<br />{PHONE_DISPLAY}<br />{EMAIL}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Issued / due / outstanding ─────────────────────────── */}
            {doc.metaCells.length > 0 && (
                <div className="invoice-meta" style={{
                    display: 'flex', flexWrap: 'wrap', background: '#f8fafc',
                    borderRadius: 10, marginBottom: '1.5rem', overflow: 'hidden',
                }}>
                    {doc.metaCells.map((cell, i) => (
                        <div key={cell.label} style={{
                            flex: '1 1 150px', padding: '0.85rem 1.1rem',
                            borderLeft: i > 0 ? '1px solid #e2e8f0' : 'none',
                        }}>
                            <div style={LABEL}>{cell.label}</div>
                            <div style={{
                                fontSize: cell.strong ? '1rem' : '0.88rem',
                                fontWeight: cell.strong ? 800 : 600,
                                color: cell.strong ? '#b8945b' : INK, marginTop: 4,
                            }}>{cell.value}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Bill To / Trip ─────────────────────────────────────── */}
            <div className="invoice-cols" style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.25rem', marginBottom: '1.5rem',
            }}>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 10 }}>
                    <div style={{ ...LABEL, marginBottom: 8 }}>Bill To</div>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>{doc.billToName}</div>
                    {/* Email and address are optional; the block closes up
                        around whichever is missing. */}
                    {doc.billToLines.map((line, i) => (
                        <div key={line} style={{
                            fontSize: '0.82rem', color: MUTED, marginTop: i === 0 ? 4 : 2,
                            whiteSpace: 'pre-line', wordBreak: 'break-word',
                        }}>{line}</div>
                    ))}
                </div>

                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 10 }}>
                    <div style={{ ...LABEL, marginBottom: 8 }}>Trip Details</div>
                    <div style={{ fontSize: '0.82rem', color: '#334155', wordBreak: 'break-word' }}>
                        <span style={{ color: '#10b981', fontWeight: 700 }}>↑</span> {doc.pickup}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#334155', marginTop: 4, wordBreak: 'break-word' }}>
                        <span style={{ color: '#f43f5e', fontWeight: 700 }}>↓</span> {doc.dropoff}
                    </div>
                    {doc.outboundWhen && (
                        <div style={{ fontSize: '0.78rem', color: MUTED, marginTop: 8 }}>
                            Pickup: {doc.outboundWhen}
                        </div>
                    )}
                    {doc.returnWhen && (
                        <div style={{ fontSize: '0.78rem', color: MUTED, marginTop: 2 }}>
                            Return: {doc.returnWhen}
                        </div>
                    )}
                    {doc.tripDetails.length > 0 && (
                        <div style={{ fontSize: '0.75rem', color: FAINT, marginTop: 8, lineHeight: 1.6 }}>
                            {doc.tripDetails.map((d) => `${d.label}: ${d.value}`).join('  ·  ')}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Notes ──────────────────────────────────────────────── */}
            {doc.notes.map((n) => (
                <div key={n.label} style={{
                    background: n.tone === 'accent' ? '#fbf6ec' : '#f8fafc',
                    borderLeft: `4px solid ${n.tone === 'accent' ? '#b8945b' : '#94a3b8'}`,
                    borderRadius: 10, padding: '0.85rem 1.1rem', marginBottom: '1rem',
                }}>
                    <div style={{ ...LABEL, color: n.tone === 'accent' ? '#8a6a35' : MUTED, fontWeight: 800 }}>
                        {n.label}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: 6, whiteSpace: 'pre-line' }}>
                        {n.text}
                    </div>
                </div>
            ))}

            {/* ── Line item ──────────────────────────────────────────── */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
                <thead><tr style={{ background: INK, color: '#fff' }}>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.74rem', fontWeight: 700, borderRadius: '8px 0 0 8px' }}>Description</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontSize: '0.74rem', fontWeight: 700, borderRadius: '0 8px 8px 0' }}>Amount</th>
                </tr></thead>
                <tbody><tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#334155' }}>
                        {doc.lineDescription}
                        {doc.lineReference && (
                            <><br /><span style={{ fontSize: '0.75rem', color: FAINT }}>{doc.lineReference}</span></>
                        )}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {doc.lineAmount}
                    </td>
                </tr></tbody>
            </table>

            {/* ── Payment method + totals ────────────────────────────── */}
            <div className="invoice-foot" style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                gap: '1.25rem', flexWrap: 'wrap',
            }}>
                <div style={{ minWidth: 150 }}>
                    {doc.paymentMethod && (
                        <>
                            <div style={LABEL}>Payment method</div>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: 4 }}>{doc.paymentMethod}</div>
                        </>
                    )}
                </div>
                <div style={{ background: INK, color: '#fff', padding: '1rem 1.5rem', borderRadius: 10, minWidth: 240, flex: '1 1 240px', maxWidth: 340, marginLeft: 'auto' }}>
                    {doc.totalRows.map((row) => {
                        if (row.kind === 'total') {
                            return (
                                <div key={row.label} style={{
                                    display: 'flex', justifyContent: 'space-between', gap: '1.5rem',
                                    fontWeight: 800, fontSize: '1.08rem', color: '#fbbf24',
                                    borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 8, marginTop: 2,
                                }}><span>{row.label}</span><span>{row.value}</span></div>
                            );
                        }
                        const strong = row.kind === 'balance';
                        return (
                            <div key={row.label} style={{
                                display: 'flex', justifyContent: 'space-between', gap: '1.5rem',
                                fontSize: strong ? '0.84rem' : '0.8rem',
                                fontWeight: strong ? 700 : 400,
                                color: strong ? '#fff' : 'rgba(255,255,255,0.6)',
                                marginTop: 6,
                            }}><span>{row.label}</span><span>{row.value}</span></div>
                        );
                    })}
                </div>
            </div>

            {/* ── Footer ─────────────────────────────────────────────── */}
            <div style={{ marginTop: '2.25rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '-0.01em' }}>
                    Thank you for travelling with {COMPANY_NAME}
                </div>
                {doc.footerNote && (
                    <div style={{
                        fontSize: '0.82rem', fontWeight: 600, marginTop: 8,
                        color: doc.settled ? '#166534' : INK,
                    }}>{doc.footerNote}</div>
                )}
                <div style={{ fontSize: '0.8rem', color: MUTED, marginTop: 6, lineHeight: 1.6 }}>
                    Questions about this invoice? Call or message {PHONE_DISPLAY} — or email {EMAIL}.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 14 }}>
                    <span style={{ width: 28, height: 1, background: '#e2e8f0' }} />
                    <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b8945b', fontWeight: 700 }}>
                        {COMPANY_NAME}
                    </span>
                    <span style={{ width: 28, height: 1, background: '#e2e8f0' }} />
                </div>
            </div>
        </div>
    );
}
