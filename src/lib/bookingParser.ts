/**
 * Turns a pasted booking message — usually a WhatsApp chat, in English,
 * Arabic, or both — into the fields of the admin "New Booking" form.
 *
 * Used by the "Paste booking details → Auto-fill" box on the Bookings page.
 * It only ever proposes values: the form fills the empty fields it detected,
 * highlights them for review, and nothing is saved until the admin presses
 * Create. So the rule throughout is "leave it out when unsure" — a blank
 * field costs the admin a few keystrokes, a wrong one can send a driver to
 * the wrong place.
 *
 * Deliberately dependency-free (no imports) so the unit tests in
 * tests/bookingParser.test.mjs run on plain Node with no build step.
 */

export interface ParsedBooking {
    customer_name?: string;
    /** International format, e.g. +966501234567. */
    customer_phone?: string;
    customer_email?: string;
    pickup_location?: string;
    dropoff_location?: string;
    /** YYYY-MM-DD */
    travel_date?: string;
    /** HH:MM, 24-hour */
    travel_time?: string;
    passengers_count?: number;
    luggage_count?: number;
    car_type?: string;
    quote_amount?: number;
    /** Upper-case ISO code as written: SAR, BHD, AED, QAR, KWD, OMR, USD, PKR. */
    currency?: string;
    special_notes?: string;
}

export interface ParseResult {
    fields: ParsedBooking;
    /** Things the admin should double-check, in plain words. */
    warnings: string[];
}

/* ── Normalising ──────────────────────────────────────────────────── */

/** Arabic-Indic and Persian digits → ASCII, so every rule below sees 0-9. */
function asciiDigits(s: string): string {
    return s
        .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
        .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0));
}

function normalise(raw: string): string {
    return asciiDigits(raw)
        // Zero-width and direction marks WhatsApp and Arabic keyboards insert.
        .replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '')
        .replace(/\u060C/g, ',') // Arabic comma
        .replace(/[\uFF1A\uFE55]/g, ':')
        .replace(/\u00A0/g, ' ')
        .replace(/\r\n?/g, '\n');
}

/** Leading emoji, bullets and markdown WhatsApp users put before a label. */
const LEAD = /^[\s\p{Extended_Pictographic}\uFE0F\u20E3*•·▪►>#\-–—_]+/u;

function clean(value: string): string {
    return value
        .replace(LEAD, '')
        .replace(/[*_~]+/g, '')
        .replace(/\s+/g, ' ')
        .replace(/[\s,;.]+$/, '')
        .trim();
}

/* ── Labels ───────────────────────────────────────────────────────── */

type Key = 'name' | 'phone' | 'email' | 'pickup' | 'dropoff' | 'date' | 'time' | 'datetime'
    | 'passengers' | 'luggage' | 'vehicle' | 'price' | 'notes' | 'flight' | 'route';

/** Label words, longest first within each key so "pickup time" beats "pickup". */
const LABELS: [Key, string[]][] = [
    ['datetime', ['date and time', 'date & time', 'date/time', 'pickup date and time', 'pickup date & time', 'التاريخ والوقت', 'الموعد']],
    ['time', ['pickup time', 'pick up time', 'pick-up time', 'time', 'الوقت', 'الساعة', 'وقت الاستلام']],
    ['date', ['pickup date', 'pick up date', 'travel date', 'trip date', 'date', 'day', 'التاريخ', 'تاريخ', 'اليوم']],
    ['name', ['customer name', 'passenger name', 'guest name', 'full name', 'client name', 'name', 'customer', 'client', 'guest', 'الاسم', 'اسم العميل', 'اسم']],
    ['phone', ['phone number', 'mobile number', 'contact number', 'whatsapp number', 'phone', 'mobile', 'contact', 'whatsapp', 'tel', 'cell', 'number', 'رقم الجوال', 'رقم الهاتف', 'الجوال', 'جوال', 'هاتف', 'واتساب', 'رقم']],
    ['email', ['email address', 'e-mail', 'email', 'mail', 'البريد الإلكتروني', 'البريد', 'ايميل', 'إيميل']],
    ['pickup', ['pickup location', 'pick up location', 'pick-up location', 'pickup point', 'pickup from', 'pick up', 'pick-up', 'pickup', 'from', 'origin', 'start', 'collection', 'موقع الاستلام', 'الاستلام', 'الانطلاق', 'من']],
    ['dropoff', ['drop-off location', 'dropoff location', 'drop off location', 'drop location', 'drop-off', 'dropoff', 'drop off', 'drop', 'destination', 'to', 'الوجهة', 'التوصيل', 'إلى', 'الى']],
    ['passengers', ['number of passengers', 'no of passengers', 'no. of passengers', 'passengers', 'passenger', 'persons', 'people', 'adults', 'pax', 'travellers', 'travelers', 'عدد الركاب', 'الركاب', 'ركاب', 'الأشخاص', 'اشخاص', 'أشخاص']],
    ['luggage', ['luggage', 'bags', 'baggage', 'suitcases', 'الأمتعة', 'الامتعة', 'حقائب', 'شنط']],
    ['vehicle', ['vehicle type', 'car type', 'vehicle', 'car', 'السيارة', 'نوع السيارة', 'سيارة']],
    ['price', ['total price', 'price', 'fare', 'amount', 'cost', 'rate', 'total', 'quote', 'السعر', 'المبلغ', 'التكلفة']],
    ['flight', ['flight number', 'flight no', 'flight', 'رقم الرحلة', 'الرحلة']],
    ['notes', ['special requests', 'special request', 'remarks', 'comments', 'notes', 'note', 'ملاحظات', 'ملاحظة']],
    ['route', ['route', 'trip', 'journey', 'transfer', 'المسار', 'الرحلة من']],
];

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** "Pickup - Riyadh", "📍 From: …", "التاريخ: …" → [key, value]. */
function labelled(line: string): [Key, string] | null {
    const body = line.replace(LEAD, '').replace(/^\*+|\*+$/g, '').trim();
    for (const [key, words] of LABELS) {
        for (const w of words) {
            // A label must be followed by a separator. "From Riyadh to …"
            // without one is handled by the route rules instead.
            const re = new RegExp(`^${escapeRe(w)}\\*{0,2}\\s*(?:[:=\\-–—]|>|→)\\s*(.+)$`, 'iu');
            const m = re.exec(body);
            if (m && m[1].trim()) return [key, m[1]];
        }
    }
    return null;
}

/* ── Values ───────────────────────────────────────────────────────── */

const DIALLING = ['966', '973', '974', '971', '965', '968', '92'];

/**
 * Phone → +<country><number>. Local Saudi (05…), Pakistani (03…) and
 * numbers already carrying a Gulf code are converted; an 8-digit local
 * number could be Bahrain, Qatar or Kuwait, so it is returned as typed with
 * a warning rather than guessed.
 */
export function normalisePhone(raw: string): { phone: string; certain: boolean } | null {
    const hadPlus = /^\s*\+/.test(raw);
    let d = asciiDigits(raw).replace(/\D/g, '');
    if (d.startsWith('00')) d = d.slice(2);
    if (d.length < 8 || d.length > 15) return null;

    for (const code of DIALLING) {
        if (d.startsWith(code) && d.length >= code.length + 8 && d.length <= code.length + 10) {
            return { phone: `+${d}`, certain: true };
        }
    }
    if (hadPlus && d.length >= 10) return { phone: `+${d}`, certain: true };
    if (/^05\d{8}$/.test(d)) return { phone: `+966${d.slice(1)}`, certain: true };
    if (/^5\d{8}$/.test(d)) return { phone: `+966${d}`, certain: true };
    if (/^03\d{9}$/.test(d)) return { phone: `+92${d.slice(1)}`, certain: true };
    if (/^\d{8}$/.test(d)) return { phone: d, certain: false };
    return null;
}

const MONTHS: Record<string, number> = {
    jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3, apr: 4, april: 4, may: 5,
    jun: 6, june: 6, jul: 7, july: 7, aug: 8, august: 8, sep: 9, sept: 9, september: 9,
    oct: 10, october: 10, nov: 11, november: 11, dec: 12, december: 12,
    'يناير': 1, 'فبراير': 2, 'مارس': 3, 'أبريل': 4, 'ابريل': 4, 'مايو': 5, 'يونيو': 6,
    'يوليو': 7, 'أغسطس': 8, 'اغسطس': 8, 'سبتمبر': 9, 'أكتوبر': 10, 'اكتوبر': 10, 'نوفمبر': 11, 'ديسمبر': 12,
};
const MONTH_RE = Object.keys(MONTHS).sort((a, b) => b.length - a.length).map(escapeRe).join('|');

const pad = (n: number) => String(n).padStart(2, '0');
const iso = (y: number, m: number, d: number) => `${y}-${pad(m)}-${pad(d)}`;

function validDay(y: number, m: number, d: number): boolean {
    if (m < 1 || m > 12 || d < 1 || d > 31) return false;
    const dt = new Date(Date.UTC(y, m - 1, d));
    return dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

/** A date without a year is the next one to come: 15/01 written in December is next January. */
function withYear(m: number, d: number, now: Date): string | null {
    let y = now.getFullYear();
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    if (Date.UTC(y, m - 1, d) < today - 86400000) y += 1;
    return validDay(y, m, d) ? iso(y, m, d) : null;
}

function fullYear(y: number): number {
    return y < 100 ? 2000 + y : y;
}

/** Finds a date in free text. Day-first, as dates are written in the Gulf. */
export function findDate(text: string, now: Date): string | null {
    const t = text.toLowerCase();
    const plusDays = (n: number) => {
        const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + n);
        return iso(d.getFullYear(), d.getMonth() + 1, d.getDate());
    };
    if (/\bday after tomorrow\b|بعد بكرة|بعد بكره|بعد غد/.test(t)) return plusDays(2);
    if (/\btomorrow\b|\btmrw\b|\btmr\b|بكرة|بكره|غدا|غداً|الغد/.test(t)) return plusDays(1);
    if (/\btoday\b|\btonight\b|اليوم|الليلة/.test(t)) return plusDays(0);

    let m = /\b(\d{4})-(\d{1,2})-(\d{1,2})\b/.exec(t);
    if (m && validDay(+m[1], +m[2], +m[3])) return iso(+m[1], +m[2], +m[3]);

    m = /\b(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{2,4})\b/.exec(t);
    if (m) {
        const y = fullYear(+m[3]);
        if (validDay(y, +m[2], +m[1])) return iso(y, +m[2], +m[1]);
    }

    m = new RegExp(`(\\d{1,2})(?:st|nd|rd|th)?\\s*(?:of\\s+)?(${MONTH_RE})\\.?,?(?:\\s+(\\d{4}))?`, 'iu').exec(t);
    if (m) {
        const mon = MONTHS[m[2].toLowerCase()];
        if (m[3]) return validDay(+m[3], mon, +m[1]) ? iso(+m[3], mon, +m[1]) : null;
        return withYear(mon, +m[1], now);
    }
    m = new RegExp(`(${MONTH_RE})\\.?\\s+(\\d{1,2})(?:st|nd|rd|th)?(?:,?\\s+(\\d{4}))?`, 'iu').exec(t);
    if (m) {
        const mon = MONTHS[m[1].toLowerCase()];
        if (m[3]) return validDay(+m[3], mon, +m[2]) ? iso(+m[3], mon, +m[2]) : null;
        return withYear(mon, +m[2], now);
    }

    // 15/11 — only with a separator, and not part of a time or a phone number.
    m = /(?<![\d:+])\b(\d{1,2})[/.](\d{1,2})\b(?![/.:]?\d)/.exec(t);
    if (m) return withYear(+m[2], +m[1], now);
    return null;
}

/** Finds a time in free text: 3pm, 3:30 pm, 15:00, 10 AM, ٣ مساءً, noon. */
export function findTime(text: string): string | null {
    const t = text.toLowerCase();
    if (/\bnoon\b|\bmidday\b|الظهر/.test(t)) return '12:00';
    if (/\bmidnight\b|منتصف الليل/.test(t)) return '00:00';

    let m = /\b(\d{1,2})(?::|\.)?(\d{2})?\s*(a\.?m\.?|p\.?m\.?)(?![a-z])/i.exec(t);
    if (m) {
        let h = +m[1];
        const min = m[2] ? +m[2] : 0;
        const pm = m[3].startsWith('p');
        if (h > 12 || min > 59) return null;
        if (pm && h < 12) h += 12;
        if (!pm && h === 12) h = 0;
        return `${pad(h)}:${pad(min)}`;
    }
    m = /(\d{1,2})(?::(\d{2}))?\s*(صباحا|صباحاً|ص|مساء|مساءً|م|ليلا|ليلاً)(?![\u0621-\u064A])/.exec(t);
    if (m) {
        let h = +m[1];
        const min = m[2] ? +m[2] : 0;
        const pm = /^(مساء|مساءً|م|ليلا|ليلاً)$/.test(m[3]);
        if (h > 12 || min > 59) return null;
        if (pm && h < 12) h += 12;
        if (!pm && h === 12) h = 0;
        return `${pad(h)}:${pad(min)}`;
    }
    m = /(?<![\d/.\-])(\d{1,2}):(\d{2})(?![\d/])/.exec(t);
    if (m && +m[1] < 24 && +m[2] < 60) return `${pad(+m[1])}:${pad(+m[2])}`;
    // "at 10", "@ 9" — an hour with no minutes and no am/pm.
    m = /(?:\bat|@|الساعة)\s*(\d{1,2})(?![\d:/.])/.exec(t);
    if (m && +m[1] < 24) return `${pad(+m[1])}:00`;
    return null;
}

const CURRENCY_WORDS: [RegExp, string][] = [
    [/\b(?:sar|sr|riyals?|rial|ر\.?س)\b|ريال|ريالات/i, 'SAR'],
    [/\b(?:bhd|bd|bahraini dinars?)\b|دينار بحريني/i, 'BHD'],
    [/\b(?:aed|dhs?|dirhams?)\b|درهم/i, 'AED'],
    [/\b(?:qar|qr|qatari riyals?)\b|ريال قطري/i, 'QAR'],
    [/\b(?:kwd|kd|kuwaiti dinars?)\b|دينار كويتي/i, 'KWD'],
    [/\b(?:omr|ro|omani rials?)\b/i, 'OMR'],
    [/\b(?:usd|dollars?)\b|\$/i, 'USD'],
    [/\b(?:pkr|rs)\b|روپے/i, 'PKR'],
];

/** "450 SAR", "SAR 1,250", "BHD 50", "450 ريال". */
export function findPrice(text: string, labelledValue = false): { amount: number; currency?: string } | null {
    const cur = '(sar|sr|riyals?|rial|bhd|bd|aed|dhs?|dirhams?|qar|qr|kwd|kd|omr|usd|pkr|ريال|درهم|دينار|\\$)';
    const num = '(\\d{1,3}(?:,\\d{3})+|\\d+)(?:\\.(\\d{1,3}))?';
    const toNum = (a: string, b?: string) => Number(a.replace(/,/g, '') + (b ? `.${b}` : ''));
    const currencyOf = (word: string) => {
        for (const [re, code] of CURRENCY_WORDS) if (re.test(word)) return code;
        return undefined;
    };
    let m = new RegExp(`${num}\\s*${cur}(?![a-z])`, 'iu').exec(text);
    if (m) return { amount: toNum(m[1], m[2]), currency: currencyOf(m[3]) };
    // Currency before the number leaves out the two-letter codes that are
    // also airline codes (QR 1234), so a flight number is never a price.
    const curBefore = '(sar|riyals?|rial|bhd|aed|dirhams?|qar|kwd|omr|usd|pkr|ريال|درهم|دينار|\\$)';
    m = new RegExp(`(?<![a-z])${curBefore}\\.?\\s*${num}`, 'iu').exec(text);
    if (m) return { amount: toNum(m[2], m[3]), currency: currencyOf(m[1]) };
    if (labelledValue) {
        m = new RegExp(`^\\s*${num}\\s*$`).exec(text);
        if (m) return { amount: toNum(m[1], m[2]) };
    }
    return null;
}

/** Vehicle names the business runs, longest first. Matched as whole words. */
const VEHICLES = [
    'GMC Yukon XL', 'GMC Yukon', 'Chevrolet Suburban', 'Chevrolet Tahoe', 'Toyota Land Cruiser', 'Land Cruiser',
    'Toyota Camry', 'Hyundai Staria', 'Hyundai H1', 'Toyota Hiace', 'Toyota Coaster', 'Mercedes V-Class',
    'Mercedes S-Class', 'Mercedes E-Class', 'Mercedes Sprinter', 'Lexus ES', 'Lexus LX', 'Toyota Innova', 'Hyundai Sonata',
    'Ford Taurus', 'Kia Carnival', 'Yukon', 'Suburban', 'Tahoe', 'Camry', 'Staria', 'Hiace', 'Coaster', 'Sprinter',
    'Innova', 'Sonata', 'Taurus', 'Carnival', 'H1', 'Sedan', 'SUV', 'Minivan', 'Van', 'Bus',
    'جمس يوكن', 'يوكن', 'جمس', 'سوبربان', 'تاهو', 'كامري', 'ستاريا', 'هايس', 'كوستر', 'لاندكروزر', 'سيدان', 'فان', 'باص',
];

function findVehicle(text: string): string | null {
    for (const v of VEHICLES) {
        const re = new RegExp(`(?<![\\p{L}\\d])${escapeRe(v)}(?![\\p{L}\\d])`, 'iu');
        const m = re.exec(text);
        // Latin names in their proper spelling; Arabic as the customer wrote it.
        if (m) return /[a-z]/i.test(v) ? v : m[0].replace(/\s+/g, ' ');
    }
    return null;
}

function findCount(text: string, words: string): number | null {
    const re = new RegExp(`(\\d{1,2})\\s*(?:x\\s*)?(?:${words})`, 'iu');
    const m = re.exec(text);
    if (m) return +m[1];
    const after = new RegExp(`(?:${words})\\s*[:\\-]?\\s*(\\d{1,2})(?!\\d)`, 'iu').exec(text);
    return after ? +after[1] : null;
}

const PAX_WORDS = 'passengers?|pax|persons?|people|adults?|guests?|travell?ers?|ركاب|راكب|أشخاص|اشخاص|شخص|افراد|أفراد';
const BAG_WORDS = 'bags?|suitcases?|luggage|pieces of luggage|حقائب|حقيبة|شنط|شنطة';

/** "Riyadh to Bahrain", "Riyadh → Bahrain", "من الرياض إلى البحرين". */
function findRoute(text: string): [string, string] | null {
    const stop = String.raw`(?=\s+(?:on|at|for|tomorrow|today|tonight|في|يوم|الساعة)\b|[,.;\n(]|\s+\d|$)`;
    let m = new RegExp(String.raw`\bfrom\s+(.+?)\s+(?:to|till|until|→|->|➡️?)\s+(.+?)${stop}`, 'iu').exec(text);
    if (m) return [m[1], m[2]];
    m = new RegExp(String.raw`(?:^|\s)من\s+(.+?)\s+(?:إلى|الى|ل)\s*(.+?)(?=\s+(?:يوم|في|الساعة|بكرة|بكره|غدا|غداً|اليوم|الليلة)(?=\s|$)|[,.؛\n(]|\s+\d|$)`, 'u').exec(text);
    if (m) return [m[1], m[2]];
    // "Riyadh → Bahrain" on a line of its own. A bare "to" only counts on a
    // short line with no verb, so "I want to book a car" is not a route.
    const line = text.trim();
    m = /^(.{2,60}?)\s*(?:→|->|➡️?|⇒)\s*(.{2,60})$/u.exec(line);
    if (m && !/\d{3,}/.test(m[1])) return [m[1], m[2]];
    m = /^(.{2,40}?)\s+to\s+(.{2,40})$/i.exec(line);
    if (m && line.split(/\s+/).length <= 7
        && !/\b(?:want|need|like|book|go|going|travel|please|send|get|how|can|would)\b/i.test(line)) {
        return [m[1], m[2]];
    }
    return null;
}

/* ── Main ─────────────────────────────────────────────────────────── */

/**
 * Parses a pasted message. `now` anchors "tomorrow" and year-less dates;
 * it defaults to the current time and is passed explicitly by the tests.
 */
export function parseBookingText(input: string, now: Date = new Date()): ParseResult {
    const text = normalise(input || '');
    const out: ParsedBooking = {};
    const warnings: string[] = [];
    const notes: string[] = [];
    const set = <K extends keyof ParsedBooking>(k: K, v: ParsedBooking[K] | null | undefined) => {
        if (v === null || v === undefined || v === '' || out[k] !== undefined) return;
        out[k] = v;
    };

    const setPhone = (raw: string) => {
        if (out.customer_phone) return;
        const p = normalisePhone(raw);
        if (!p) return;
        out.customer_phone = p.phone;
        if (!p.certain) warnings.push(`Phone ${p.phone} has no country code — add +973 / +974 / +965 as appropriate.`);
    };
    const setPrice = (raw: string, isLabelled: boolean) => {
        if (out.quote_amount !== undefined) return;
        const p = findPrice(raw, isLabelled);
        if (!p || !(p.amount > 0)) return;
        out.quote_amount = p.amount;
        if (p.currency) out.currency = p.currency;
    };

    // "Pickup: Riyadh Airport at 3pm on 15 Nov" — the place is the part
    // before the time; the date and time are still read from the whole line.
    const place = (v: string) => clean(v.split(/\s+(?:on|at|@)\s+(?=\d)|\s+(?:tomorrow|today|tonight)\b|,\s*(?=\d)/i)[0]);
    const dateTimeFrom = (v: string) => {
        if (!out.travel_date) set('travel_date', findDate(v, now));
        if (!out.travel_time) set('travel_time', findTime(v));
    };

    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    const unlabelled: string[] = [];

    // ── Pass 1: "Label: value" lines ─────────────────────────────────
    for (const line of lines) {
        const hit = labelled(line);
        if (!hit) { unlabelled.push(line); continue; }
        const [key, rawValue] = hit;
        const value = clean(rawValue);
        if (!value) continue;
        switch (key) {
            case 'name': set('customer_name', value); break;
            case 'phone': setPhone(value); break;
            case 'email': {
                const e = /[^\s@<>()]+@[^\s@<>()]+\.[a-z]{2,}/i.exec(value);
                if (e) set('customer_email', e[0].toLowerCase());
                break;
            }
            case 'pickup': set('pickup_location', place(value)); dateTimeFrom(value); break;
            case 'dropoff': set('dropoff_location', place(value)); dateTimeFrom(value); break;
            case 'route': {
                const r = findRoute(value) ?? findRoute(`from ${value}`);
                if (r) { set('pickup_location', clean(r[0])); set('dropoff_location', clean(r[1])); }
                break;
            }
            case 'date': set('travel_date', findDate(value, now)); if (!out.travel_time) set('travel_time', findTime(value)); break;
            case 'time': set('travel_time', findTime(value) ?? findTime(`at ${value}`)); break;
            case 'datetime': set('travel_date', findDate(value, now)); set('travel_time', findTime(value) ?? findTime(`at ${value}`)); break;
            case 'passengers': {
                const n = /\d{1,2}/.exec(value);
                if (n && +n[0] > 0) set('passengers_count', +n[0]);
                break;
            }
            case 'luggage': {
                const n = /\d{1,2}/.exec(value);
                if (n) set('luggage_count', +n[0]);
                break;
            }
            case 'vehicle': set('car_type', findVehicle(value) ?? value); break;
            case 'price': setPrice(value, true); break;
            case 'flight': notes.push(`Flight: ${value}`); break;
            case 'notes': notes.push(value); break;
        }
    }

    // ── Pass 2: whatever the labels did not cover, from the free text ──
    const free = unlabelled.join('\n');
    const all = text;

    if (!out.customer_email) {
        const e = /[^\s@<>()]+@[^\s@<>()]+\.[a-z]{2,}/i.exec(all);
        if (e) out.customer_email = e[0].toLowerCase();
    }
    if (!out.customer_phone) {
        // A run of digits that looks like a phone: optional +, 9–15 digits
        // with spaces or dashes. Dates and prices are too short or have
        // separators this does not allow.
        const re = /(?:\+|00)?\d[\d\s\-()]{7,18}\d/g;
        for (const m of free.match(re) ?? []) {
            if (/^\d{1,2}[/.\-]\d{1,2}/.test(m.trim())) continue;
            setPhone(m);
            if (out.customer_phone) break;
        }
    }
    if (!out.customer_name) {
        const m = /(?:my name is|this is|i am|i'm|name's)\s+([A-Za-z\u0621-\u064A][A-Za-z\u0621-\u064A'.\- ]{1,40}?)(?=[,.!\n]|\s+(?:and|from|here|i|we|want|need|would)\b|$)/i.exec(free)
            ?? /(?:اسمي|معك|انا|أنا)\s+([\u0621-\u064A][\u0621-\u064A ]{1,30}?)(?=[,.!\n،]|$)/u.exec(free);
        if (m) out.customer_name = clean(m[1]);
    }
    if (!out.pickup_location || !out.dropoff_location) {
        for (const line of [free, ...unlabelled]) {
            const r = findRoute(line);
            if (r) {
                set('pickup_location', place(r[0]));
                set('dropoff_location', place(r[1]));
                break;
            }
        }
    }
    if (!out.travel_date) set('travel_date', findDate(free, now));
    if (!out.travel_time) set('travel_time', findTime(free));
    if (out.passengers_count === undefined) {
        const n = findCount(free, PAX_WORDS);
        if (n && n > 0) out.passengers_count = n;
    }
    if (out.luggage_count === undefined) {
        const n = findCount(free, BAG_WORDS);
        if (n !== null) out.luggage_count = n;
    }
    if (!out.car_type) set('car_type', findVehicle(free));
    if (out.quote_amount === undefined) setPrice(free, false);

    if (/\breturn\b|round[\s-]?trip|ذهاب وعودة|ذهاب و عودة|عودة/i.test(all) && !notes.some((n) => /return/i.test(n))) {
        notes.push('Return trip requested');
    }

    // Luggage has no column on bookings: it travels in the notes, in the same
    // words the public booking form writes ("Luggage: 2 bag(s)").
    if (out.luggage_count !== undefined) notes.unshift(`Luggage: ${out.luggage_count} bag(s)`);
    if (notes.length) out.special_notes = notes.join(' | ');

    // A pickup and drop-off that came out identical is a parse slip.
    if (out.pickup_location && out.pickup_location === out.dropoff_location) {
        delete out.dropoff_location;
        warnings.push('Pickup and drop-off looked the same — check the drop-off.');
    }
    return { fields: out, warnings };
}
