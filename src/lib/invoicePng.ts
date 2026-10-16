/**
 * Invoice / quotation → PNG or PDF, for sharing over WhatsApp and email.
 *
 * Drawn onto a canvas rather than screenshotting the DOM. That keeps the
 * feature dependency-free (no html2canvas, no PDF library), avoids the
 * CSS-parsing fidelity problems those libraries have, and — most usefully —
 * lets the height be computed from the content, so a long address or a long
 * note extends the document instead of being cut off.
 *
 * The PDF is the same rendering wrapped in a minimal hand-written PDF file,
 * so the image and the PDF can never disagree.
 *
 * The only external asset is the brand mark, which is inlined as a `data:`
 * URL SVG. Nothing is fetched cross-origin, so the canvas is never tainted
 * and exporting always succeeds.
 */

import { brandMarkDataUrl } from './brandMark';
import { formatMoney } from './currency';
import { displayDate, displayTime } from './datetime';
import { EMAIL, PHONE_DISPLAY } from './contact';
import { serviceLabel } from './serviceLabels';

export interface InvoicePngData {
    /** "INVOICE" by default; quotes pass "QUOTATION". */
    documentTitle?: string;
    /** Shown under the title. For a quote this is its reference. */
    invoice_number?: string | null;
    status?: string | null;
    /** When the document was raised. `created_at` from the row is fine. */
    created_at?: string | null;
    /** When payment is expected. Invoices carry one; quotes do not. */
    due_date?: string | null;
    customer_name?: string | null;
    customer_phone?: string | null;
    /** Optional — many customers only ever give a phone number. The Bill To
     *  block closes up around a missing line rather than leaving a gap. */
    customer_email?: string | null;
    pickup_location?: string | null;
    dropoff_location?: string | null;
    travel_date?: string | null;
    /** Pickup time exactly as stored on the booking/quote (e.g. "04:00:00").
     * Rendered beside the date; omitted cleanly when no time was recorded,
     * rather than substituting a default. */
    travel_time?: string | null;
    service_type?: string | null;
    subtotal?: number | string | null;
    tax_amount?: number | string | null;
    discount_amount?: number | string | null;
    total_amount?: number | string | null;
    paid_amount?: number | string | null;
    currency?: string | null;
    /** A message written by the team for the customer — shown most prominently. */
    adminNote?: string | null;
    notes?: string | null;
    /** Heading for `notes`; invoices say "Notes", quotes say "Trip requirements". */
    notesLabel?: string;
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
const BRASS = '#b8945b';

const FONT =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

/** Note blocks: body type and rhythm. */
const NOTE_FONT = { weight: 600, size: 13.5 };
const NOTE_LINE = 21;

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

/** Like wrap(), but keeps the author's own line breaks between paragraphs. */
function wrapParagraphs(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    return String(text)
        .split(/\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean)
        .flatMap((p) => wrap(ctx, p, maxWidth));
}

function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number, y: number, w: number, h: number, r: number
) {
    ctx.beginPath();
    // roundRect is widely supported, but fall back so an older browser still
    // produces a correct (square-cornered) document rather than throwing.
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

interface NoteBlock {
    label: string;
    lines: string[];
    tint: string;
    accent: string;
    labelColor: string;
}

/** Height of one note block: label band + wrapped lines + bottom padding. */
function noteHeight(block: NoteBlock) {
    return 40 + block.lines.length * NOTE_LINE + 14;
}

/** Lays the document out and draws it. Shared by the PNG and PDF exports. */
async function renderInvoiceCanvas(inv: InvoicePngData): Promise<HTMLCanvasElement> {
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

    // Notes sit directly under the customer and trip boxes, full width and in
    // heavier type — they used to trail after the totals in small grey text,
    // where a customer could easily miss them.
    measure.font = font(NOTE_FONT.weight, NOTE_FONT.size);
    const noteTextWidth = contentWidth - 48;
    const noteBlocks: NoteBlock[] = [];
    if (inv.adminNote && inv.adminNote.trim()) {
        noteBlocks.push({
            label: 'A note from our team',
            lines: wrapParagraphs(measure, inv.adminNote, noteTextWidth),
            tint: '#fbf6ec',
            accent: BRASS,
            labelColor: '#8a6a35',
        });
    }
    if (inv.notes && inv.notes.trim()) {
        noteBlocks.push({
            label: inv.notesLabel || 'Notes',
            lines: wrapParagraphs(measure, inv.notes, noteTextWidth),
            tint: SURFACE,
            accent: '#94a3b8',
            labelColor: MUTED,
        });
    }
    const notesHeight = noteBlocks.reduce((sum, b) => sum + noteHeight(b) + 16, 0);

    // Bill To: the name, then whichever contact lines exist. A customer
    // with no email gets a shorter box, not a blank line where one would be.
    const contactLines = [inv.customer_phone, inv.customer_email]
        .map((v) => (v ?? '').trim())
        .filter(Boolean);

    const tripBoxHeight = 58 + (pickupLines.length + dropoffLines.length) * 19 + 22;
    const billBoxHeight = 58 + (1 + contactLines.length) * 19 + 8;
    const boxHeight = Math.max(tripBoxHeight, billBoxHeight);

    const tableRowHeight = 34 + serviceLines.length * 18;

    // ── What is actually owed ─────────────────────────────────────────
    // The document never showed a due date or an outstanding balance, so a
    // part-paid invoice left the customer to work out the remainder and an
    // unpaid one gave no date to pay by. Both are computed once here and
    // used by the meta strip and the totals block, so they cannot disagree.
    const totalDue = Number(inv.total_amount ?? 0) || 0;
    const paidSoFar = Number(inv.paid_amount ?? 0) || 0;
    const balance = Math.max(totalDue - paidSoFar, 0);
    const settled = (inv.status || '') === 'paid' || (totalDue > 0 && paidSoFar >= totalDue);

    let totalsRows = 1; // subtotal
    if (Number(inv.tax_amount) > 0) totalsRows++;
    if (Number(inv.discount_amount) > 0) totalsRows++;
    if (paidSoFar > 0) totalsRows++;
    if (paidSoFar > 0 && !settled) totalsRows++; // balance due
    const totalsHeight = 24 + totalsRows * 24 + 44;

    // ── Meta strip: issued / due / amount outstanding ─────────────────
    // Each cell appears only when the document genuinely has that fact. A
    // quotation carries no due date or payment, so it shows the issue date
    // alone — or no strip at all when even that is unknown.
    const metaCells: Array<{ label: string; value: string; strong?: boolean }> = [];
    const issuedOn = displayDate(inv.created_at, '');
    if (issuedOn) metaCells.push({ label: 'Issued', value: issuedOn });
    const dueOn = displayDate(inv.due_date, '');
    if (dueOn && !settled) metaCells.push({ label: 'Payment due', value: dueOn });
    if (dueOn || paidSoFar > 0) {
        metaCells.push(settled
            ? { label: 'Amount paid', value: formatMoney(totalDue, currency), strong: true }
            : { label: 'Amount due', value: formatMoney(balance, currency), strong: true });
    }
    const META_H = metaCells.length ? 58 + 24 : 0;

    // Tall enough for the brand block on the right (logo 44 + name + phone +
    // email ends at ~105) with a little air under it. It was 132, which left
    // a conspicuous empty band between the status pill and what follows.
    const HEADER_H = 112;
    const FOOTER_H = 118;
    const height =
        PAD + HEADER_H + 28 + META_H + boxHeight + 28 + notesHeight + 44 + tableRowHeight + 24 +
        totalsHeight + FOOTER_H + PAD;

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

    // ── Meta strip ────────────────────────────────────────────────────
    if (metaCells.length) {
        ctx.fillStyle = SURFACE;
        roundRect(ctx, PAD, y, contentWidth, 58, 10);
        ctx.fill();

        const cellW = contentWidth / metaCells.length;
        metaCells.forEach((cell, i) => {
            const cx = PAD + i * cellW + 20;
            ctx.fillStyle = FAINT;
            ctx.font = font(700, 9.5);
            ctx.fillText(cell.label.toUpperCase(), cx, y + 23);
            ctx.fillStyle = cell.strong ? BRASS : INK;
            ctx.font = font(cell.strong ? 800 : 600, cell.strong ? 15.5 : 13.5);
            ctx.fillText(cell.value, cx, y + 44);
            // Hairline between cells, never before the first.
            if (i > 0) {
                ctx.strokeStyle = LINE;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(PAD + i * cellW, y + 15);
                ctx.lineTo(PAD + i * cellW, y + 43);
                ctx.stroke();
            }
        });
        y += 58 + 24;
    }

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
    contactLines.forEach((line, i) => ctx.fillText(line, PAD + 16, y + 68 + i * 19));

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
    // Each part is dropped when genuinely absent rather than printing "— ·",
    // so a record with no time recorded shows the date alone and never an
    // invented or default one.
    const whenText = [displayDate(inv.travel_date, ''), displayTime(inv.travel_time, '')]
        .filter(Boolean)
        .join(', ');
    ctx.fillText(
        [whenText, serviceText].filter(Boolean).join(' · '),
        tx + 16,
        ty + 10
    );

    y += boxHeight + 28;

    // ── Notes ─────────────────────────────────────────────────────────
    for (const block of noteBlocks) {
        const h = noteHeight(block);
        ctx.fillStyle = block.tint;
        roundRect(ctx, PAD, y, contentWidth, h, 10);
        ctx.fill();
        ctx.fillStyle = block.accent;
        roundRect(ctx, PAD, y, 4, h, 2);
        ctx.fill();

        ctx.fillStyle = block.labelColor;
        ctx.font = font(800, 10.5);
        ctx.fillText(block.label.toUpperCase(), PAD + 24, y + 26);

        ctx.fillStyle = INK;
        ctx.font = font(NOTE_FONT.weight, NOTE_FONT.size);
        block.lines.forEach((line, i) => ctx.fillText(line, PAD + 24, y + 48 + i * NOTE_LINE));

        y += h + 16;
    }

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
    totalRow('Total', formatMoney(totalDue, currency), true);
    if (paidSoFar > 0) totalRow('Paid', `−${formatMoney(paidSoFar, currency)}`);
    // What is still owed, spelled out rather than left as a subtraction for
    // the customer to do.
    if (paidSoFar > 0 && !settled) totalRow('Balance due', formatMoney(balance, currency));

    y += totalsHeight;

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
    // Tells the customer what to do next, which a document asking for money
    // ought to. Falls back to the contact line alone for a quotation or a
    // settled invoice, where there is nothing to chase.
    const footerNote = settled
        ? `Paid in full — no further action needed.  ·  ${PHONE_DISPLAY}`
        : dueOn
            ? `Please settle by ${dueOn}. Questions? ${PHONE_DISPLAY}  ·  ${EMAIL}`
            : `${PHONE_DISPLAY}  ·  ${EMAIL}`;
    ctx.fillText(footerNote, WIDTH / 2, y + 50);
    ctx.textAlign = 'left';

    return canvas;
}

/**
 * Renders the document and returns a PNG blob.
 * Exported separately from the download helper so it can also be attached or
 * previewed without forcing a download.
 */
export async function renderInvoicePng(inv: InvoicePngData): Promise<Blob> {
    const canvas = await renderInvoiceCanvas(inv);
    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            (blob) => (blob ? resolve(blob) : reject(new Error('Could not encode the PNG.'))),
            'image/png'
        );
    });
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => (blob ? resolve(blob) : reject(new Error('Could not encode the document.'))),
            type,
            quality
        );
    });
}

/**
 * Wraps a JPEG in a single-page PDF.
 *
 * The page is A4 wide. It is A4 tall too unless the document is longer, in
 * which case the page grows rather than cutting the content across a break.
 * PDF viewers embed JPEG natively (DCTDecode), so no re-encoding happens.
 */
function jpegToPdf(jpeg: Uint8Array, pxWidth: number, pxHeight: number): Blob {
    const A4_W = 595.28;
    const A4_H = 841.89;
    const drawH = (A4_W * pxHeight) / pxWidth;
    const pageH = Math.max(A4_H, drawH);
    const n = (v: number) => v.toFixed(2);

    const enc = new TextEncoder();
    const parts: Uint8Array[] = [];
    const offsets: number[] = [];
    let length = 0;
    const push = (chunk: string | Uint8Array) => {
        const bytes = typeof chunk === 'string' ? enc.encode(chunk) : chunk;
        parts.push(bytes);
        length += bytes.length;
    };
    const object = (id: number, body: string) => {
        offsets[id] = length;
        push(`${id} 0 obj\n${body}\nendobj\n`);
    };

    push('%PDF-1.4\n');
    object(1, '<< /Type /Catalog /Pages 2 0 R >>');
    object(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    object(3, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${n(A4_W)} ${n(pageH)}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`);

    offsets[4] = length;
    push(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${pxWidth} /Height ${pxHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`);
    push(jpeg);
    push('\nendstream\nendobj\n');

    // Image anchored to the top of the page; any spare A4 height stays white.
    const content = `q ${n(A4_W)} 0 0 ${n(drawH)} 0 ${n(pageH - drawH)} cm /Im0 Do Q`;
    object(5, `<< /Length ${content.length} >>\nstream\n${content}\nendstream`);

    const xrefAt = length;
    let xref = 'xref\n0 6\n0000000000 65535 f \n';
    for (let id = 1; id <= 5; id++) xref += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`;
    push(xref);
    push(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefAt}\n%%EOF\n`);

    return new Blob(parts as BlobPart[], { type: 'application/pdf' });
}

/** Renders the document as a PDF blob. */
export async function renderInvoicePdf(inv: InvoicePngData): Promise<Blob> {
    const canvas = await renderInvoiceCanvas(inv);
    const jpeg = new Uint8Array(await (await toBlob(canvas, 'image/jpeg', 0.92)).arrayBuffer());
    return jpegToPdf(jpeg, canvas.width, canvas.height);
}

function fileBase(inv: InvoicePngData): string {
    return inv.invoice_number || (inv.documentTitle || 'invoice').toLowerCase();
}

function saveBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Revoked on the next tick so the click has certainly been handled.
    setTimeout(() => URL.revokeObjectURL(url), 0);
}

/** Renders the document and saves it as <number>.png. */
export async function downloadInvoicePng(inv: InvoicePngData): Promise<void> {
    saveBlob(await renderInvoicePng(inv), `${fileBase(inv)}.png`);
}

/** Renders the document and saves it as <number>.pdf. */
export async function downloadInvoicePdf(inv: InvoicePngData): Promise<void> {
    saveBlob(await renderInvoicePdf(inv), `${fileBase(inv)}.pdf`);
}
