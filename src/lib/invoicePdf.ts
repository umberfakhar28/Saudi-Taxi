/**
 * The invoice / quotation PDF as real, selectable text (owner's request,
 * 14 Nov 2026) — not a picture of the page.
 *
 * The layout is not repeated here. lib/invoicePng.ts describes the document
 * as blocks that draw onto a canvas-like context; this file supplies a
 * context that writes PDF instead (pdf-lib), so the PDF, the PNG image and
 * their page breaks come from the same code and cannot drift apart.
 *
 * Fonts are embedded (subset), so the file looks the same wherever it is
 * opened: Inter for text, Manrope for headings, Noto Sans Arabic for Arabic.
 * Arabic is shaped (joined letter forms) and laid out right to left by
 * fontkit; mixed Arabic/Latin lines are split into runs and ordered here.
 *
 * Runs in the browser (fonts fetched from /fonts/pdf/) and in Node (fonts
 * read from disk), so the same module can serve a server route later.
 */
import { PDFDocument, rgb, pushGraphicsState, popGraphicsState, rectangle, clip, endPath, type PDFFont, type PDFPage } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { PIN_DOT, PIN_PATH, WAVE_PATHS, BRAND_GOLD, BRAND_IVORY } from './brandMark';
import { COMPANY_NAME } from './contact';
import { buildBlocks, drawPage, exportDocument, paginate, PAGE_H, W, type InvoicePngData } from './invoicePng';

/** Logical units (the layout's 820-wide page) → PDF points (A4 = 595.28 wide). */
const K = 595.28 / W;

export const PDF_FONT_FILES = {
    inter400: 'inter-latin-400-normal.woff',
    inter600: 'inter-latin-600-normal.woff',
    inter700: 'inter-latin-700-normal.woff',
    inter800: 'inter-latin-800-normal.woff',
    interExt400: 'inter-latin-ext-400-normal.woff',
    interExt700: 'inter-latin-ext-700-normal.woff',
    manrope800: 'manrope-latin-800-normal.woff',
    arabic400: 'noto-sans-arabic-arabic-400-normal.woff',
    arabic700: 'noto-sans-arabic-arabic-700-normal.woff',
} as const;
type FontKey = keyof typeof PDF_FONT_FILES;
export type FontLoader = (file: string) => Promise<ArrayBuffer | Uint8Array>;

/** Browser: the font files are served from public/fonts/pdf/. */
export const browserFontLoader: FontLoader = async (file) => {
    const res = await fetch(`/fonts/pdf/${file}`);
    if (!res.ok) throw new Error(`Could not load the PDF font ${file} (HTTP ${res.status}).`);
    return res.arrayBuffer();
};

type Fonts = Record<FontKey, PDFFont>;

/* ── Colours ──────────────────────────────────────────────────────── */

function parseColor(value: string): { color: ReturnType<typeof rgb>; opacity: number } {
    const v = String(value).trim();
    let m = /^#([0-9a-f]{6})$/i.exec(v);
    if (m) {
        const n = parseInt(m[1], 16);
        return { color: rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255), opacity: 1 };
    }
    m = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/i.exec(v);
    if (m) return { color: rgb(+m[1] / 255, +m[2] / 255, +m[3] / 255), opacity: m[4] === undefined ? 1 : +m[4] };
    return { color: rgb(0, 0, 0), opacity: 1 };
}

/* ── Text runs: which font draws which characters, in what order ───── */

const ARABIC = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;

interface Run { text: string; font: PDFFont }

/**
 * Splits a line into runs of one font each, in visual (left-to-right)
 * order. Arabic runs (with the spaces and punctuation between Arabic words)
 * go to the Arabic font, which shapes them and returns them already
 * reversed for display. A line that starts with Arabic is an RTL line, so
 * its runs are placed right to left; numbers and Latin words inside it
 * keep their own left-to-right order.
 */
function runsFor(textValue: string, fonts: Fonts, weight: number, heading: boolean): Run[] {
    const latin: PDFFont = heading ? fonts.manrope800
        : weight >= 800 ? fonts.inter800 : weight >= 700 ? fonts.inter700 : weight >= 600 ? fonts.inter600 : fonts.inter400;
    const latinExt = weight >= 600 ? fonts.interExt700 : fonts.interExt400;
    const arabic = weight >= 600 ? fonts.arabic700 : fonts.arabic400;

    const has = (f: PDFFont, ch: string) => {
        const cp = ch.codePointAt(0)!;
        // pdf-lib exposes the fontkit font on the embedder.
        const fk = (f as unknown as { embedder?: { font?: { hasGlyphForCodePoint?: (c: number) => boolean } } }).embedder?.font;
        return fk?.hasGlyphForCodePoint ? fk.hasGlyphForCodePoint(cp) : true;
    };

    // 1. Logical runs: Arabic vs not. Spaces/punctuation between two Arabic
    //    characters stay inside the Arabic run.
    const chars = Array.from(textValue);
    const logical: { arabic: boolean; text: string }[] = [];
    chars.forEach((ch, i) => {
        let isAr = ARABIC.test(ch);
        if (!isAr && /[\s،؛؟.,:()-]/.test(ch)) {
            const prev = chars.slice(0, i).reverse().find((c) => !/\s/.test(c));
            const next = chars.slice(i + 1).find((c) => !/\s/.test(c));
            isAr = !!prev && !!next && ARABIC.test(prev) && ARABIC.test(next);
        }
        const last = logical[logical.length - 1];
        if (last && last.arabic === isAr) last.text += ch;
        else logical.push({ arabic: isAr, text: ch });
    });

    const rtlLine = (() => {
        const firstStrong = chars.find((c) => ARABIC.test(c) || /[A-Za-z]/.test(c));
        return !!firstStrong && ARABIC.test(firstStrong);
    })();
    const ordered = rtlLine ? [...logical].reverse() : logical;

    // 2. Within a non-Arabic run, fall back per character to a font that has
    //    the glyph (Latin → Latin Extended → Arabic font), so a name like
    //    "Zoë" or an unusual symbol never prints as an empty box.
    const out: Run[] = [];
    for (const seg of ordered) {
        if (seg.arabic) { out.push({ text: seg.text, font: arabic }); continue; }
        let text = seg.text;
        // In a right-to-left line the run is placed mirrored, so its leading
        // and trailing spaces swap sides ("البوابة 3" keeps its space).
        if (rtlLine) {
            const lead = /^\s*/.exec(text)![0];
            const trail = /\s*$/.exec(text)![0];
            text = /^\s+$/.test(text) ? ' ' : trail + text.trim() + lead;
        }
        for (const ch of Array.from(text)) {
            const f = has(latin, ch) ? latin : has(latinExt, ch) ? latinExt : has(arabic, ch) ? arabic : latin;
            const glyph = f === latin || has(f, ch) ? ch : '?';
            const last = out[out.length - 1];
            if (last && last.font === f) last.text += glyph;
            else out.push({ text: glyph, font: f });
        }
    }
    return out;
}

/* ── A canvas-like context that writes PDF ────────────────────────── */

type Seg = { kind: 'path'; d: string };

class PdfContext {
    font = '400 12px Inter';
    fillStyle = '#000000';
    strokeStyle = '#000000';
    lineWidth = 1;
    textAlign: 'left' | 'right' | 'center' | 'start' | 'end' = 'left';
    textBaseline = 'alphabetic';
    direction: 'ltr' | 'rtl' | 'inherit' = 'ltr';
    letterSpacing = '0px';
    private path: Seg[] = [];
    page: PDFPage | null = null;

    constructor(private fonts: Fonts) {}

    private parsedFont() {
        const m = /^(\d+)\s+([\d.]+)px\s+(.*)$/.exec(this.font);
        const weight = m ? +m[1] : 400;
        const size = m ? +m[2] : 12;
        const heading = m ? /Manrope/i.test(m[3]) : false;
        return { weight, size, heading };
    }

    /**
     * Letter spacing is not reproduced in the PDF: PDF character spacing
     * makes copied text come out as "B I L L  T O". The labels sit a touch
     * tighter than in the image; the text copies cleanly.
     */
    private spacing() {
        return 0;
    }

    measureText(value: string): { width: number } {
        const { weight, size, heading } = this.parsedFont();
        const runs = runsFor(String(value), this.fonts, weight, heading);
        const count = Array.from(String(value)).length;
        const width = runs.reduce((s, r) => s + r.font.widthOfTextAtSize(r.text, size), 0) + this.spacing() * count;
        return { width };
    }

    fillText(value: string, x: number, y: number) {
        if (!this.page || !value) return;
        const { weight, size, heading } = this.parsedFont();
        const runs = runsFor(String(value), this.fonts, weight, heading);
        const sp = this.spacing();
        const widths = runs.map((r) => r.font.widthOfTextAtSize(r.text, size) + sp * Array.from(r.text).length);
        const total = widths.reduce((a, b) => a + b, 0);
        let cx = this.textAlign === 'right' || this.textAlign === 'end' ? x - total
            : this.textAlign === 'center' ? x - total / 2 : x;
        const { color, opacity } = parseColor(this.fillStyle);
        runs.forEach((r, i) => {
            this.page!.drawText(r.text, { x: cx * K, y: (PAGE_H - y) * K, size: size * K, font: r.font, color, opacity });
            cx += widths[i];
        });
    }

    fillRect(x: number, y: number, w: number, h: number) {
        if (!this.page) return;
        const { color, opacity } = parseColor(this.fillStyle);
        this.page.drawRectangle({ x: x * K, y: (PAGE_H - y - h) * K, width: w * K, height: h * K, color, opacity });
    }

    beginPath() { this.path = []; }
    closePath() { /* each shape below is already closed */ }
    rect(x: number, y: number, w: number, h: number) { this.path.push({ kind: 'path', d: `M${x} ${y}H${x + w}V${y + h}H${x}Z` }); }
    roundRect(x: number, y: number, w: number, h: number, r: number) {
        const rr = Math.max(0, Math.min(r, w / 2, h / 2));
        this.path.push({
            kind: 'path',
            d: `M${x + rr} ${y}H${x + w - rr}A${rr} ${rr} 0 0 1 ${x + w} ${y + rr}V${y + h - rr}A${rr} ${rr} 0 0 1 ${x + w - rr} ${y + h}`
                + `H${x + rr}A${rr} ${rr} 0 0 1 ${x} ${y + h - rr}V${y + rr}A${rr} ${rr} 0 0 1 ${x + rr} ${y}Z`,
        });
    }
    moveTo(x: number, y: number) { this.path.push({ kind: 'path', d: `M${x} ${y}` }); }
    lineTo(x: number, y: number) { this.path.push({ kind: 'path', d: `L${x} ${y}` }); }

    fill() {
        if (!this.page || !this.path.length) return;
        const { color, opacity } = parseColor(this.fillStyle);
        this.page.drawSvgPath(this.path.map((p) => p.d).join(''), { x: 0, y: PAGE_H * K, scale: K, color, opacity });
    }

    stroke() {
        if (!this.page || !this.path.length) return;
        const { color, opacity } = parseColor(this.strokeStyle);
        this.page.drawSvgPath(this.path.map((p) => p.d).join(''), {
            x: 0, y: PAGE_H * K, scale: K, borderColor: color, borderOpacity: opacity, borderWidth: this.lineWidth * K,
        });
    }

    /** The only image in the layout is the brand mark: drawn as vectors. */
    drawImage(_img: unknown, x: number, y: number, w: number) {
        if (!this.page) return;
        const s = (w / 100) * K;
        const at = { x: x * K, y: (PAGE_H - y) * K, scale: s };
        const ivory = parseColor(BRAND_IVORY).color;
        // The waves overhang the 100×100 mark by 4 units, as in the SVG,
        // whose viewBox crops them; a clip does the same here.
        this.page.pushOperators(pushGraphicsState(), rectangle(x * K, (PAGE_H - y - w) * K, w * K, w * K), clip(), endPath());
        for (const wave of WAVE_PATHS) {
            this.page.drawSvgPath(wave.d, { ...at, color: ivory, opacity: wave.whiteOpacity });
        }
        this.page.pushOperators(popGraphicsState());
        this.page.drawSvgPath(PIN_PATH, { ...at, color: rgb(1, 1, 1) });
        this.page.drawCircle({ x: (x + (PIN_DOT.cx * w) / 100) * K, y: (PAGE_H - y - (PIN_DOT.cy * w) / 100) * K, size: PIN_DOT.r * s, color: parseColor(BRAND_GOLD).color });
    }

    // Canvas calls the layout makes that have no PDF meaning.
    scale() { /* logical units are mapped by K */ }
    save() { /* not used */ }
    restore() { /* not used */ }
}

/** Renders the document as PDF bytes. */
export async function renderInvoicePdfBytes(inv: InvoicePngData, loadFont: FontLoader): Promise<Uint8Array> {
    const pdf = await PDFDocument.create();
    pdf.registerFontkit(fontkit);
    const entries = await Promise.all(
        (Object.entries(PDF_FONT_FILES) as [FontKey, string][]).map(async ([key, file]) => {
            const bytes = await loadFont(file);
            return [key, await pdf.embedFont(bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes), { subset: true })] as const;
        }),
    );
    const fonts = Object.fromEntries(entries) as Fonts;

    const doc = exportDocument(inv);
    pdf.setTitle(`${doc.title.charAt(0)}${doc.title.slice(1).toLowerCase()} ${doc.number}`.trim());
    pdf.setAuthor(COMPANY_NAME);
    pdf.setCreator(COMPANY_NAME);
    pdf.setProducer(COMPANY_NAME);
    pdf.setSubject(`${doc.title} for ${doc.billToName}`);

    const ctx = new PdfContext(fonts);
    const c = ctx as unknown as CanvasRenderingContext2D;
    const blocks = buildBlocks(c, doc, {} as HTMLImageElement);
    const pages = paginate(blocks);
    pages.forEach((list, i) => {
        ctx.page = pdf.addPage([W * K, PAGE_H * K]);
        drawPage(c, doc, list, i, pages.length);
    });
    return pdf.save();
}
