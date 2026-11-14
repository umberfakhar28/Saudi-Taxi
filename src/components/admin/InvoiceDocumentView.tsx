'use client';

/**
 * The invoice as the customer sees it, on screen.
 *
 * Serves the invoice detail page (where it is also what `window.print()`
 * puts on paper) and the preview modal on the Bookings page. Same design as
 * the PDF and image (lib/invoicePng.ts) — navy header band, ivory Bill To
 * panel, navy item table, Total Amount box, Total Due, THANK YOU and Terms —
 * and the same content, because both read lib/invoiceDocument.ts.
 */

import { LogoMark } from '@/components/Logo';
import { COMPANY_LOCALITY, COMPANY_NAME, EMAIL, PHONE_DISPLAY } from '@/lib/contact';
import { buildInvoiceDocument, INVOICE_BADGE_COLORS, type InvoiceRecord } from '@/lib/invoiceDocument';

const NAVY = '#081827';
const GOLD = '#B8945B';
const GOLD_INK = '#7A5C2E';
const IVORY = '#F5F2EA';
const LINE = '#E4DFD2';
const INK = '#1C2528';
const TEXT = '#3A4447';
const MUTED = '#5A6569';
const FAINT = '#6B7280';
const GREEN = '#16A34A';
const HEAD = "'Manrope Variable', var(--font-body, Inter), 'Noto Sans Arabic Variable', Arial, sans-serif";

const LABEL: React.CSSProperties = {
    fontSize: '0.64rem', fontWeight: 800, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.1em',
};

export default function InvoiceDocumentView({ invoice }: { invoice: InvoiceRecord }) {
    const doc = buildInvoiceDocument(invoice);
    const isQuote = /quot/i.test(doc.title);
    const badge = INVOICE_BADGE_COLORS[doc.badge.value];
    const before = doc.totalRows.filter((r) => r.kind === 'line' || (r.kind === 'credit' && r.label === 'Discount'));
    const total = doc.totalRows.find((r) => r.kind === 'total');
    const after = doc.totalRows.filter((r) => (r.kind === 'credit' && r.label !== 'Discount') || r.kind === 'balance');

    return (
        <div className="invoice-sheet" style={{
            background: '#fff', borderRadius: 12, boxShadow: '0 4px 20px rgba(8,24,39,0.10)', overflow: 'hidden',
            maxWidth: 780, margin: '0 auto', color: INK, fontVariantNumeric: 'tabular-nums',
            fontFamily: "var(--font-body, Inter), 'Noto Sans Arabic Variable', Arial, sans-serif",
        }}>
            {/* ── Header band ─────────────────────────────────────────── */}
            <div className="invoice-header" style={{
                background: NAVY, borderBottom: `4px solid ${GOLD}`, padding: 'clamp(1.25rem, 4vw, 2rem) clamp(1.25rem, 5vw, 2.5rem)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
            }}>
                <div>
                    <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 'clamp(1.8rem, 6vw, 2.6rem)', color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>
                        {doc.title}
                    </div>
                    <div style={{ color: GOLD, fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.2em', marginTop: 10 }}>
                        {COMPANY_NAME.toUpperCase()}
                    </div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                    <LogoMark size={52} variant="color" />
                    <div>
                        <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: '0.92rem', color: '#fff' }}>{COMPANY_NAME}</div>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(245,242,234,0.78)', marginTop: 3 }}>
                            {COMPANY_LOCALITY} · {PHONE_DISPLAY} · {EMAIL}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: 'clamp(1rem, 4vw, 2rem) clamp(1rem, 5vw, 2.5rem) clamp(1.25rem, 4vw, 2rem)' }}>
                {/* ── Bill To / invoice number ────────────────────────── */}
                <div className="invoice-cols" style={{
                    background: IVORY, borderRadius: 12, padding: '1.25rem 1.4rem', marginBottom: '1.25rem',
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem',
                }}>
                    <div>
                        <div style={{ ...LABEL, color: GOLD_INK }}>{isQuote ? 'Prepared for' : 'Bill to'}</div>
                        <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: '1.15rem', marginTop: 6, wordBreak: 'break-word' }}>{doc.billToName}</div>
                        {doc.billToLines.map((line) => (
                            <div key={line} style={{ fontSize: '0.82rem', color: TEXT, marginTop: 3, whiteSpace: 'pre-line', wordBreak: 'break-word' }}>{line}</div>
                        ))}
                    </div>
                    <div className="invoice-meta" style={{ textAlign: 'right', borderLeft: `1px solid ${GOLD}`, paddingLeft: '1.25rem' }}>
                        {doc.number && (
                            <div style={{ marginBottom: 12 }}>
                                <div style={LABEL}>{isQuote ? 'Quotation number' : 'Invoice number'}</div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
                                    {!isQuote && (
                                        <span style={{
                                            background: badge.bg, color: badge.fg, padding: '0.2rem 0.65rem', borderRadius: 999,
                                            fontSize: '0.64rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em',
                                        }}>{doc.badge.label}</span>
                                    )}
                                    <span style={{ fontWeight: 800, fontSize: '1rem' }}>{doc.number}</span>
                                </div>
                            </div>
                        )}
                        {doc.metaCells.map((cell) => (
                            <div key={cell.label} style={{ marginBottom: 10 }}>
                                <div style={LABEL}>{cell.label === 'Issued' ? 'Date' : cell.label}</div>
                                <div style={{ fontWeight: cell.strong ? 800 : 600, fontSize: cell.strong ? '1.02rem' : '0.88rem', color: cell.strong ? GOLD_INK : INK, marginTop: 3 }}>
                                    {cell.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Trip details ─────────────────────────────────────── */}
                <div style={{ border: `1px solid ${LINE}`, borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
                    <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.14em', color: NAVY }}>TRIP DETAILS</div>
                    <div style={{ width: 40, height: 2, background: GOLD, margin: '6px 0 12px' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem 1.5rem' }}>
                        <div>
                            <div style={{ ...LABEL, color: FAINT, fontSize: '0.6rem' }}>Pickup</div>
                            <div style={{ fontSize: '0.86rem', fontWeight: 600, marginTop: 3, wordBreak: 'break-word' }}>
                                <span style={{ color: GREEN, fontWeight: 800 }}>↑</span> {doc.pickup}
                            </div>
                        </div>
                        <div>
                            <div style={{ ...LABEL, color: FAINT, fontSize: '0.6rem' }}>Drop-off</div>
                            <div style={{ fontSize: '0.86rem', fontWeight: 600, marginTop: 3, wordBreak: 'break-word' }}>
                                <span style={{ color: '#DC2626', fontWeight: 800 }}>↓</span> {doc.dropoff}
                            </div>
                        </div>
                    </div>
                    {(doc.outboundWhen || doc.returnWhen) && (
                        <div style={{ fontSize: '0.8rem', color: TEXT, fontWeight: 600, marginTop: 12, display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            {doc.outboundWhen && <span>Pickup: {doc.outboundWhen}</span>}
                            {doc.returnWhen && <span>Return: {doc.returnWhen}</span>}
                        </div>
                    )}
                    {doc.tripDetails.length > 0 && (
                        <div style={{ fontSize: '0.78rem', color: MUTED, marginTop: 8, lineHeight: 1.6 }}>
                            {doc.tripDetails.map((d) => `${d.label}: ${d.value}`).join('   ·   ')}
                        </div>
                    )}
                </div>

                {/* ── Notes ────────────────────────────────────────────── */}
                {doc.notes.map((n) => (
                    <div key={n.label} style={{
                        background: n.tone === 'accent' ? '#F6EFE2' : IVORY,
                        borderLeft: `4px solid ${n.tone === 'accent' ? GOLD : '#B7AD97'}`,
                        borderRadius: 10, padding: '0.85rem 1.1rem', marginBottom: '1rem',
                    }}>
                        <div style={{ ...LABEL, color: n.tone === 'accent' ? GOLD_INK : MUTED }}>{n.label}</div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 600, marginTop: 6, whiteSpace: 'pre-line' }}>{n.text}</div>
                    </div>
                ))}

                {/* ── Items ────────────────────────────────────────────── */}
                <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
                    <table style={{ width: '100%', minWidth: 460, borderCollapse: 'separate', borderSpacing: 0 }}>
                        <thead>
                            <tr style={{ background: NAVY, color: '#fff' }}>
                                {['Item description', 'Quantity', 'Price', 'Total'].map((h, i) => (
                                    <th key={h} style={{
                                        padding: '0.75rem 1rem', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
                                        textAlign: i === 0 ? 'left' : i === 1 ? 'center' : 'right',
                                        borderRadius: i === 0 ? '8px 0 0 8px' : i === 3 ? '0 8px 8px 0' : 0,
                                    }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '1rem', borderBottom: `1px solid ${LINE}` }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{doc.item.description}</div>
                                    {doc.item.reference && <div style={{ fontSize: '0.74rem', color: FAINT, marginTop: 3 }}>{doc.item.reference}</div>}
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'center', borderBottom: `1px solid ${LINE}`, color: TEXT, fontWeight: 600 }}>{doc.item.quantity}</td>
                                <td style={{ padding: '1rem', textAlign: 'right', borderBottom: `1px solid ${LINE}`, color: TEXT, fontWeight: 600, whiteSpace: 'nowrap' }}>{doc.item.price}</td>
                                <td style={{ padding: '1rem', textAlign: 'right', borderBottom: `1px solid ${LINE}`, fontWeight: 800, whiteSpace: 'nowrap' }}>{doc.item.total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ── Totals ───────────────────────────────────────────── */}
                <div style={{ marginLeft: 'auto', maxWidth: 340, marginTop: '0.9rem' }}>
                    {before.map((r) => (
                        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.5rem 1rem', borderBottom: `1px solid ${LINE}`, fontSize: '0.84rem' }}>
                            <span style={{ color: MUTED, fontWeight: 600 }}>{r.label}</span>
                            <span style={{ fontWeight: 700, color: r.kind === 'credit' ? GREEN : INK }}>{r.value}</span>
                        </div>
                    ))}
                    {total && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', background: NAVY, borderRadius: 10, padding: '0.85rem 1rem', marginTop: 8 }}>
                            <span style={{ fontFamily: HEAD, color: '#fff', fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.1em' }}>TOTAL AMOUNT</span>
                            <span style={{ fontFamily: HEAD, color: GOLD, fontWeight: 800, fontSize: '1.15rem' }}>{total.value}</span>
                        </div>
                    )}
                    {after.map((r) => (
                        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.45rem 1rem', fontSize: '0.84rem' }}>
                            <span style={{ color: r.kind === 'balance' ? INK : MUTED, fontWeight: r.kind === 'balance' ? 800 : 600 }}>{r.label}</span>
                            <span style={{ fontWeight: 800, color: r.kind === 'balance' ? INK : GREEN }}>{r.value}</span>
                        </div>
                    ))}
                </div>

                {/* ── Payment method + Total Due ───────────────────────── */}
                <div className="invoice-foot" style={{
                    borderTop: `1px solid ${GOLD}`, borderBottom: `1px solid ${GOLD}`, marginTop: '1.5rem', padding: '1rem 0',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap',
                }}>
                    <div>
                        {doc.paymentMethod && (
                            <>
                                <div style={LABEL}>Payment method</div>
                                <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: '1.02rem', marginTop: 4 }}>{doc.paymentMethod}</div>
                            </>
                        )}
                    </div>
                    <div style={{ textAlign: 'right', marginLeft: 'auto' }}>
                        <div style={LABEL}>{doc.headline.label}</div>
                        <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 'clamp(1.5rem, 5vw, 2rem)', color: doc.settled ? GREEN : NAVY, marginTop: 2 }}>
                            {doc.headline.value}
                        </div>
                    </div>
                </div>

                {/* ── THANK YOU + Terms & Conditions ───────────────────── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
                    <div>
                        <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 'clamp(1.6rem, 5vw, 2.1rem)', color: NAVY, letterSpacing: '0.04em', lineHeight: 1.1 }}>THANK YOU</div>
                        <div style={{ fontSize: '0.8rem', color: MUTED, marginTop: 6 }}>for travelling with {COMPANY_NAME}</div>
                    </div>
                    <div>
                        <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.14em', color: NAVY }}>
                            {isQuote ? 'TERMS' : 'TERMS & CONDITIONS'}
                        </div>
                        {doc.footerLines.map((line, i) => {
                            const first = i === 0 && doc.footerLines.length > 1;
                            return (
                                <div key={line} style={{
                                    fontSize: '0.8rem', lineHeight: 1.55, marginTop: i === 0 ? 8 : 4,
                                    fontWeight: first ? 700 : 500, color: first ? (doc.settled ? GREEN : INK) : TEXT,
                                }}>{line}</div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Sign-off ─────────────────────────────────────────── */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: '1.75rem' }}>
                    <span style={{ width: 40, height: 1, background: GOLD }} />
                    <span style={{ fontSize: '0.66rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD_INK, fontWeight: 800 }}>
                        {doc.signature}
                    </span>
                    <span style={{ width: 40, height: 1, background: GOLD }} />
                </div>
            </div>
        </div>
    );
}
