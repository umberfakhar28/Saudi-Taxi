/**
 * Invoice → PNG, for sharing over WhatsApp and email.
 *
 * Drawn onto a canvas rather than screenshotting the DOM. That keeps the
 * feature dependency-free (no html2canvas), avoids the CSS-parsing fidelity
 * problems those libraries have, and — most usefully — lets the height be
 * computed from the content, so a long address or a long notes field extends
 * the image instead of being cut off.
 *
 * The only external asset is the brand mark, which is inlined as a `data:`
 * URL SVG. Nothing is fetched cross-origin, so the canvas is never tainted
 * and toBlob() always succeeds.
 */

import { brandMarkDataUrl } from './brandMark';
import { formatMoney } from './currency';
import { displayDate } from './datetime';
import { EMAIL, PHONE_DISPLAY } from './contact';
import { serviceLabel } from './serviceLabels';

export interface InvoicePngData {
    /** "INVOICE" by default; quotes pass "QUOTATION". */
    documentTitle?: string;
    /** Shown under the title. For a quote this is its reference. */
    invoice_number?: string | null;
    /** Quotes only: the date the price stops being held. */
    validUntil?: string | null;
    status?: string | null;
    customer_name?: string | null;
    customer_phone?: string | null;
    customer_email?: string | null;
    pickup_location?: string | null;
    dropoff_location?: string | null;
    travel_date?: string | null;
    service_type?: string | null;
    subtotal?: number | string | null;
    tax_amount?: number | string | null;
    discount_amount?: number | string | null;
    total_amount?: number | string | null;
    paid_amount?: number | string | null;
    currency?: string | null;
    notes?: string | null;
    bookingNumber?: string | null;
}

/** Logical layout units; the bitmap is rendered at SCALE times this. */
const WIDTH = 820;
const PAD = 52;
const SCALE = 3; // ~2460px wide — sharp on a phone screen and when printed.

const INK = '#0f172a';
const MUTED = '#64748b';
const FAINT = '#94a3b8';
const LINE = '#e2e8f0';
const SURFACE = '#f8fafc';
const NAVY = '#0f172a';
const GOLD = '#fbbf24';

const FONT =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

function font(weight: number, size: number, family = FONT) {
    return `${weight} ${size}px ${family}`;
}

/** Greedy word wrap. Returns the lines that fit within maxWidth. */
function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    const words = String(text).split(/\s+/).filter(Boolean);
    if (words.length === 0) return [''];
    const lines: string[] = [];
    let line = words[0];
    for (let i = 1; i < words.length; i++) {
        const candidate = `${line} ${words[i]}`;
        if (ctx.measureText(candidate).width <= maxWidth) {
            line = candidate;
        } else {
            lines.push(line);
            line = words[i];
        }
    }
    lines.push(line);
    return lines;
}

function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number, y: number, w: number, h: number, r: number
) {
    ctx.beginPath();
    // roundRect is widely supported, but fall back so an older browser still
    // produces a correct (square-cornered) invoice rather than throwing.
    if (typeof ctx.roundRect === 'function') ctx.roundRect(x, y, w, h, r);
    else ctx.rect(x, y, w, h);
    ctx.closePath();
}

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('brand mark failed to load'));
        img.src = src;
    });
}

function titleCase(value: string): string {
    return value.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Renders the invoice and returns a PNG blob.
 * Exported separately from the download helper so it can also be attached or
 * previewed without forcing a download.
 */
export async function renderInvoicePng(inv: InvoicePngData): Promise<Blob> {
    const currency = inv.currency;
    const logo = await loadImage(brandMarkDataUrl(200, 'color'));

    // ── Measuring pass ────────────────────────────────────────────────
    // Lay the document out once on a throwaway context to learn its height,
    // then draw for real. This is what stops long content being clipped.
    const measure = document.createElement('canvas').getContext('2d');
    if (!measure) throw new Error('Canvas is unavailable in this browser.');

    const contentWidth = WIDTH - PAD * 2;
    const colWidth = (contentWidth - 20) / 2;
    const innerCol = colWidth - 32;

    measure.font = font(400, 13);
    const pickupLines = wrap(measure, inv.pickup_location || '—', innerCol - 16);
    const dropoffLines = wrap(measure, inv.dropoff_location || '—', innerCol - 16);
    const serviceText = serviceLabel(inv.service_type) || 'Transportation Service';
    const serviceLines = wrap(measure, serviceText, contentWidth - 200);
    const notesLines = inv.notes ? wrap(measure, String(inv.notes), contentWidth - 32) : [];

    const tripBoxHeight = 58 + (pickupLines.length + dropoffLines.length) * 19 + 22;
    const billBoxHeight = 58 + 3 * 19 + 8;
    const boxHeight = Math.max(tripBoxHeight, billBoxHeight);

    const tableRowHeight = 34 + serviceLines.length * 18;

    let totalsRows = 1; // subtotal
    if (Number(inv.tax_amount) > 0) totalsRows++;
    if (Number(inv.discount_amount) > 0) totalsRows++;
    if (Number(inv.paid_amount) > 0) totalsRows++;
    const totalsHeight = 24 + totalsRows * 24 + 44;

    const notesHeight = notesLines.length ? 24 + notesLines.length * 19 + 12 : 0;

    const HEADER_H = 132;
    const FOOTER_H = inv.validUntil ? 136 : 118;
    const height =
        PAD + HEADER_H + 28 + boxHeight + 28 + 44 + tableRowHeight + 24 +
        totalsHeight + notesHeight + FOOTER_H + PAD;

    // ── Drawing pass ──────────────────────────────────────────────────
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(WIDTH * SCALE);
    canvas.height = Math.round(height * SCALE);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas is unavailable in this browser.');
    ctx.scale(SCALE, SCALE);
    ctx.textBaseline = 'alphabetic';

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, WIDTH, height);

    let y = PAD;

    // ── Header ────────────────────────────────────────────────────────
    ctx.fillStyle = INK;
    ctx.font = font(900, 34);
    ctx.fillText((inv.documentTitle || 'INVOICE').toUpperCase(), PAD, y + 30);

    ctx.fillStyle = FAINT;
    ctx.font = font(400, 13, MONO);
    ctx.fillText(inv.invoice_number || '', PAD, y + 52);

    // Status pill
    const statusText = titleCase(inv.status || 'unpaid');
    const isPaid = (inv.status || '') === 'paid';
    ctx.font = font(700, 11);
    const pillW = ctx.measureText(statusText).width + 22;
    ctx.fillStyle = isPaid ? '#dcfce7' : inv.status === 'partially_paid' ? '#e0e7ff' : '#fef3c7';
    roundRect(ctx, PAD, y + 62, pillW, 22, 11);
    ctx.fill();
    ctx.fillStyle = isPaid ? '#166534' : inv.status === 'partially_paid' ? '#3730a3' : '#92400e';
    ctx.fillText(statusText.toUpperCase(), PAD + 11, y + 77);

    // Brand block, right-aligned, led by the full-colour mark.
    const logoSize = 44;
    const logoX = WIDTH - PAD - logoSize;
    ctx.drawImage(logo, logoX, y, logoSize, logoSize);

    ctx.textAlign = 'right';
    ctx.fillStyle = INK;
    ctx.font = font(800, 16);
    ctx.fillText('Gulf Trip Service', WIDTH - PAD, y + logoSize + 22);
    ctx.fillStyle = MUTED;
    ctx.font = font(400, 12);
    ctx.fillText(PHONE_DISPLAY, WIDTH - PAD, y + logoSize + 40);
    ctx.fillText(EMAIL, WIDTH - PAD, y + logoSize + 57);
    ctx.textAlign = 'left';

    y += HEADER_H + 28;

    // ── Bill To / Trip Details ────────────────────────────────────────
    const drawBoxLabel = (label: string, bx: number, by: number) => {
        ctx.fillStyle = FAINT;
        ctx.font = font(700, 10);
        ctx.fillText(label.toUpperCase(), bx + 16, by + 24);
    };

    ctx.fillStyle = SURFACE;
    roundRect(ctx, PAD, y, colWidth, boxHeight, 10);
    ctx.fill();
    drawBoxLabel('Bill To', PAD, y);
    ctx.fillStyle = INK;
    ctx.font = font(700, 14);
    ctx.fillText(inv.customer_name || '—', PAD + 16, y + 48);
    ctx.fillStyle = MUTED;
    ctx.font = font(400, 12.5);
    ctx.fillText(inv.customer_phone || '', PAD + 16, y + 68);
    ctx.fillText(inv.customer_email || '', PAD + 16, y + 86);

    const tx = PAD + colWidth + 20;
    ctx.fillStyle = SURFACE;
    roundRect(ctx, tx, y, colWidth, boxHeight, 10);
    ctx.fill();
    drawBoxLabel('Trip Details', tx, y);

    let ty = y + 46;
    ctx.font = font(400, 13);
    ctx.fillStyle = '#10b981';
    ctx.fillText('↑', tx + 16, ty);
    ctx.fillStyle = '#334155';
    pickupLines.forEach((line, i) => ctx.fillText(line, tx + 32, ty + i * 19));
    ty += pickupLines.length * 19 + 6;
    ctx.fillStyle = '#f43f5e';
    ctx.fillText('↓', tx + 16, ty);
    ctx.fillStyle = '#334155';
    dropoffLines.forEach((line, i) => ctx.fillText(line, tx + 32, ty + i * 19));
    ty += dropoffLines.length * 19 + 4;
    ctx.fillStyle = FAINT;
    ctx.font = font(400, 11.5);
    ctx.fillText(
        `${displayDate(inv.travel_date)} · ${serviceText}`,
        tx + 16,
        ty + 10
    );

    y += boxHeight + 28;

    // ── Line-item table ───────────────────────────────────────────────
    ctx.fillStyle = NAVY;
    roundRect(ctx, PAD, y, contentWidth, 34, 8);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = font(700, 12);
    ctx.fillText('DESCRIPTION', PAD + 16, y + 22);
    ctx.textAlign = 'right';
    ctx.fillText('AMOUNT', WIDTH - PAD - 16, y + 22);
    ctx.textAlign = 'left';

    y += 44;
    ctx.fillStyle = '#334155';
    ctx.font = font(400, 13);
    serviceLines.forEach((line, i) => ctx.fillText(line, PAD + 16, y + 14 + i * 18));
    if (inv.bookingNumber) {
        ctx.fillStyle = FAINT;
        ctx.font = font(400, 11.5);
        ctx.fillText(`Booking Ref: ${inv.bookingNumber}`, PAD + 16, y + 16 + serviceLines.length * 18);
    }
    ctx.fillStyle = INK;
    ctx.font = font(700, 13);
    ctx.textAlign = 'right';
    ctx.fillText(formatMoney(inv.subtotal ?? inv.total_amount ?? 0, currency), WIDTH - PAD - 16, y + 14);
    ctx.textAlign = 'left';

    y += tableRowHeight;
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD, y);
    ctx.lineTo(WIDTH - PAD, y);
    ctx.stroke();

    y += 24;

    // ── Totals ────────────────────────────────────────────────────────
    const totalsWidth = 268;
    const totalsX = WIDTH - PAD - totalsWidth;
    ctx.fillStyle = NAVY;
    roundRect(ctx, totalsX, y, totalsWidth, totalsHeight, 10);
    ctx.fill();

    let ry = y + 28;
    const totalRow = (label: string, value: string, emphasise = false) => {
        ctx.font = font(emphasise ? 800 : 400, emphasise ? 16 : 12.5);
        ctx.fillStyle = emphasise ? GOLD : 'rgba(255,255,255,0.65)';
        ctx.textAlign = 'left';
        ctx.fillText(label, totalsX + 18, ry);
        ctx.textAlign = 'right';
        ctx.fillText(value, totalsX + totalsWidth - 18, ry);
        ctx.textAlign = 'left';
        ry += emphasise ? 30 : 24;
    };

    totalRow('Subtotal', formatMoney(inv.subtotal ?? inv.total_amount ?? 0, currency));
    if (Number(inv.tax_amount) > 0) totalRow('Tax', formatMoney(inv.tax_amount, currency));
    if (Number(inv.discount_amount) > 0) totalRow('Discount', `−${formatMoney(inv.discount_amount, currency)}`);

    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath();
    ctx.moveTo(totalsX + 18, ry - 14);
    ctx.lineTo(totalsX + totalsWidth - 18, ry - 14);
    ctx.stroke();
    ry += 6;
    totalRow('Total', formatMoney(inv.total_amount ?? 0, currency), true);
    if (Number(inv.paid_amount) > 0) totalRow('Paid', formatMoney(inv.paid_amount, currency));

    y += totalsHeight;

    // ── Notes ─────────────────────────────────────────────────────────
    if (notesLines.length) {
        y += 24;
        ctx.fillStyle = MUTED;
        ctx.font = font(700, 12);
        ctx.fillText('Notes', PAD, y);
        ctx.font = font(400, 12.5);
        notesLines.forEach((line, i) => ctx.fillText(line, PAD, y + 20 + i * 19));
        y += notesLines.length * 19 + 12;
    }

    // ── Footer ────────────────────────────────────────────────────────
    y += 34;
    ctx.strokeStyle = LINE;
    ctx.beginPath();
    ctx.moveTo(PAD, y);
    ctx.lineTo(WIDTH - PAD, y);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = INK;
    ctx.font = font(700, 13.5);
    ctx.fillText('Thank you for travelling with Gulf Trip Service', WIDTH / 2, y + 30);
    ctx.fillStyle = MUTED;
    ctx.font = font(400, 11.5);
    ctx.fillText(`${PHONE_DISPLAY}  ·  ${EMAIL}`, WIDTH / 2, y + 50);
    if (inv.validUntil) {
        ctx.fillStyle = FAINT;
        ctx.font = font(400, 11);
        ctx.fillText(`This price is held until ${displayDate(inv.validUntil)}.`, WIDTH / 2, y + 68);
    }
    ctx.textAlign = 'left';

    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            (blob) => (blob ? resolve(blob) : reject(new Error('Could not encode the PNG.'))),
            'image/png'
        );
    });
}

/** Renders the invoice and saves it as <invoice-number>.png. */
export async function downloadInvoicePng(inv: InvoicePngData): Promise<void> {
    const blob = await renderInvoicePng(inv);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${inv.invoice_number || (inv.documentTitle || 'invoice').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Revoked on the next tick so the click has certainly been handled.
    setTimeout(() => URL.revokeObjectURL(url), 0);
}
