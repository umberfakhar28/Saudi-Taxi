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
 * WHAT to draw is decided by lib/invoiceDocument.ts, which the invoice page,
 * the preview modal and the invoice email read from too. This file only
 * decides HOW to draw it, so a field added to the document model appears
 * here without this file growing its own rules about money or dates.
 *
 * The only external asset is the brand mark, which is inlined as a `data:`
 * URL SVG. Nothing is fetched cross-origin, so the canvas is never tainted
 * and exporting always succeeds.
 */

import { brandMarkDataUrl } from './brandMark';
import { COMPANY_LOCALITY, COMPANY_NAME, EMAIL, PHONE_DISPLAY } from './contact';
import { buildInvoiceDocument, type InvoiceDocument, type InvoiceRecord } from './invoiceDocument';

/** The data an export takes: an `invoices` row, plus the two presentation
 *  overrides the quote export uses. Unchanged for existing callers. */
export type InvoicePngData = InvoiceRecord & {
    /** Legacy alias kept for the quote export, which passes the booking ref
     *  separately rather than on the record. */
    bookingNumber?: string | null;
};

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
    // Everything the document says — money, dates, which rows exist — comes
    // from the shared model, so this file never decides any of it.
    const doc: InvoiceDocument = buildInvoiceDocument({
        ...inv,
        booking_number: inv.booking_number ?? inv.bookingNumber ?? null,
    });
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
    const pickupLines = wrap(measure, doc.pickup, innerCol - 16);
    const dropoffLines = wrap(measure, doc.dropoff, innerCol - 16);

    // Vehicle / passengers / luggage / trip type, as one wrapped strip under
    // the itinerary rather than four stacked rows that would push the box
    // taller than the one beside it.
    measure.font = font(400, 11.5);
    const detailText = doc.tripDetails.map((d) => `${d.label}: ${d.value}`).join('  ·  ');
    const detailLines = detailText ? wrap(measure, detailText, innerCol) : [];
    const whenLines = [doc.outboundWhen && `Pickup: ${doc.outboundWhen}`,
        doc.returnWhen && `Return: ${doc.returnWhen}`].filter(Boolean) as string[];

    measure.font = font(400, 13);
    const serviceLines = wrap(measure, doc.lineDescription, contentWidth - 200);

    // Notes sit directly under the customer and trip boxes, full width and in
    // heavier type — they used to trail after the totals in small grey text,
    // where a customer could easily miss them.
    measure.font = font(NOTE_FONT.weight, NOTE_FONT.size);
    const noteTextWidth = contentWidth - 48;
    const noteBlocks: NoteBlock[] = doc.notes.map((n) => ({
        label: n.label,
        lines: wrapParagraphs(measure, n.text, noteTextWidth),
        tint: n.tone === 'accent' ? '#fbf6ec' : SURFACE,
        accent: n.tone === 'accent' ? BRASS : '#94a3b8',
        labelColor: n.tone === 'accent' ? '#8a6a35' : MUTED,
    }));
    const notesHeight = noteBlocks.reduce((sum, b) => sum + noteHeight(b) + 16, 0);

    // Bill To: the name, then whichever contact lines exist. A customer with
    // no email gets a shorter box, not a blank line where one would be.
    const tripBoxHeight = 46 + (pickupLines.length + dropoffLines.length) * 19 + 10
        + whenLines.length * 17 + (detailLines.length ? detailLines.length * 16 + 6 : 0) + 18;
    const billBoxHeight = 58 + (1 + doc.billToLines.length) * 19 + 8;
    const boxHeight = Math.max(tripBoxHeight, billBoxHeight);

    const tableRowHeight = 34 + serviceLines.length * 18;

    // Totals: one row per entry the model produced, with the emphasised
    // Total row given more room.
    const totalsHeight = 24
        + doc.totalRows.reduce((h, r) => h + (r.kind === 'total' ? 30 : 24), 0)
        + 20;

    const META_H = doc.metaCells.length ? 58 + 24 : 0;

    // Tall enough for the brand block on the right (logo 44 + name + locality
    // + phone + email) with a little air under it.
    const HEADER_H = 128;
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
    ctx.fillText(doc.title, PAD, y + 30);

    ctx.fillStyle = FAINT;
    ctx.font = font(400, 13, MONO);
    ctx.fillText(doc.number, PAD, y + 52);

    // Status pill
    const isPaid = doc.statusValue === 'paid';
    ctx.font = font(700, 11);
    const pillW = ctx.measureText(doc.statusLabel).width + 22;
    ctx.fillStyle = isPaid ? '#dcfce7' : doc.statusValue === 'partially_paid' ? '#e0e7ff' : '#fef3c7';
    roundRect(ctx, PAD, y + 62, pillW, 22, 11);
    ctx.fill();
    ctx.fillStyle = isPaid ? '#166534' : doc.statusValue === 'partially_paid' ? '#3730a3' : '#92400e';
    ctx.fillText(doc.statusLabel.toUpperCase(), PAD + 11, y + 77);

    // Brand block, right-aligned, led by the full-colour mark. Every line
    // comes from lib/contact.ts rather than being written out here.
    const logoSize = 44;
    ctx.drawImage(logo, WIDTH - PAD - logoSize, y, logoSize, logoSize);

    ctx.textAlign = 'right';
    ctx.fillStyle = INK;
    ctx.font = font(800, 16);
    ctx.fillText(COMPANY_NAME, WIDTH - PAD, y + logoSize + 22);
    ctx.fillStyle = MUTED;
    ctx.font = font(400, 12);
    ctx.fillText(COMPANY_LOCALITY, WIDTH - PAD, y + logoSize + 39);
    ctx.fillText(PHONE_DISPLAY, WIDTH - PAD, y + logoSize + 55);
    ctx.fillText(EMAIL, WIDTH - PAD, y + logoSize + 71);
    ctx.textAlign = 'left';

    y += HEADER_H + 28;

    // ── Meta strip ────────────────────────────────────────────────────
    if (doc.metaCells.length) {
        ctx.fillStyle = SURFACE;
        roundRect(ctx, PAD, y, contentWidth, 58, 10);
        ctx.fill();

        const cellW = contentWidth / doc.metaCells.length;
        doc.metaCells.forEach((cell, i) => {
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
    ctx.fillText(doc.billToName, PAD + 16, y + 48);
    ctx.fillStyle = MUTED;
    ctx.font = font(400, 12.5);
    doc.billToLines.forEach((line, i) => {
        // A long billing address wraps rather than running past the box edge.
        wrap(ctx, line, innerCol).slice(0, 2).forEach((part, j) => {
            ctx.fillText(part, PAD + 16, y + 68 + (i + j) * 19);
        });
    });

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
    ty += dropoffLines.length * 19 + 8;

    // Pickup, and the return leg when there is one — each dropped entirely
    // when not recorded, so nothing is ever invented or defaulted.
    ctx.font = font(400, 11.5);
    ctx.fillStyle = MUTED;
    whenLines.forEach((line, i) => ctx.fillText(line, tx + 16, ty + i * 17));
    ty += whenLines.length * 17;

    if (detailLines.length) {
        ty += 6;
        ctx.fillStyle = FAINT;
        detailLines.forEach((line, i) => ctx.fillText(line, tx + 16, ty + i * 16));
    }

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
    if (doc.lineReference) {
        ctx.fillStyle = FAINT;
        ctx.font = font(400, 11.5);
        ctx.fillText(doc.lineReference, PAD + 16, y + 16 + serviceLines.length * 18);
    }
    ctx.fillStyle = INK;
    ctx.font = font(700, 13);
    ctx.textAlign = 'right';
    ctx.fillText(doc.lineAmount, WIDTH - PAD - 16, y + 14);
    ctx.textAlign = 'left';

    y += tableRowHeight;
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD, y);
    ctx.lineTo(WIDTH - PAD, y);
    ctx.stroke();

    y += 24;

    // ── Payment method, in the space beside the totals ────────────────
    // A transport invoice is settled in cash as often as not, and the
    // customer's copy should say which. Sits opposite the totals box rather
    // than in a band of its own, so the document gains a fact, not a row.
    if (doc.paymentMethod) {
        ctx.fillStyle = FAINT;
        ctx.font = font(700, 9.5);
        ctx.fillText('PAYMENT METHOD', PAD, y + 16);
        ctx.fillStyle = INK;
        ctx.font = font(700, 14);
        ctx.fillText(doc.paymentMethod, PAD, y + 38);
    }

    // ── Totals ────────────────────────────────────────────────────────
    const totalsWidth = 268;
    const totalsX = WIDTH - PAD - totalsWidth;
    ctx.fillStyle = NAVY;
    roundRect(ctx, totalsX, y, totalsWidth, totalsHeight, 10);
    ctx.fill();

    let ry = y + 28;
    doc.totalRows.forEach((rowData) => {
        const emphasise = rowData.kind === 'total';
        // A rule above the Total separates what makes it up from the figure
        // the customer actually owes.
        if (emphasise) {
            ctx.strokeStyle = 'rgba(255,255,255,0.15)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(totalsX + 18, ry - 14);
            ctx.lineTo(totalsX + totalsWidth - 18, ry - 14);
            ctx.stroke();
            ry += 6;
        }
        ctx.font = font(emphasise ? 800 : rowData.kind === 'balance' ? 700 : 400,
            emphasise ? 16 : 12.5);
        ctx.fillStyle = emphasise ? GOLD
            : rowData.kind === 'balance' ? '#ffffff'
                : 'rgba(255,255,255,0.65)';
        ctx.textAlign = 'left';
        ctx.fillText(rowData.label, totalsX + 18, ry);
        ctx.textAlign = 'right';
        ctx.fillText(rowData.value, totalsX + totalsWidth - 18, ry);
        ctx.textAlign = 'left';
        ry += emphasise ? 30 : 24;
    });

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
    ctx.fillText(`Thank you for travelling with ${COMPANY_NAME}`, WIDTH / 2, y + 30);
    ctx.fillStyle = MUTED;
    ctx.font = font(400, 11.5);
    // What to do next, then how to reach us. A quotation and a settled
    // invoice have nothing to chase, so they show the contact line alone.
    ctx.fillText(
        [doc.footerNote, `${PHONE_DISPLAY}  ·  ${EMAIL}`].filter(Boolean).join('   '),
        WIDTH / 2, y + 50
    );
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
