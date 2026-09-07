/**
 * Multi-currency support for the Gulf markets the business actually serves.
 *
 * Before this, every amount in the admin portal was printed with a hardcoded
 * "SAR " prefix regardless of what the customer was actually quoted. Amounts
 * are stored as plain numbers alongside a currency code, so historical rows
 * — which have no code — fall back to SAR, which is what they were always
 * assumed to be. No stored amount is ever converted or rewritten.
 *
 * There is deliberately no exchange-rate logic here: the business quotes a
 * price in a currency, and that is the price. Converting between currencies
 * would invent numbers.
 */

export type CurrencyCode = 'SAR' | 'AED' | 'KWD';

export interface CurrencyMeta {
    code: CurrencyCode;
    name: string;
    /** Kuwait's dinar is subdivided into 1000 fils, so it carries 3 decimals. */
    decimals: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyMeta> = {
    SAR: { code: 'SAR', name: 'Saudi Riyal', decimals: 2 },
    AED: { code: 'AED', name: 'UAE Dirham', decimals: 2 },
    KWD: { code: 'KWD', name: 'Kuwaiti Dinar', decimals: 3 },
};

export const CURRENCY_CODES: CurrencyCode[] = ['SAR', 'AED', 'KWD'];

/** The currency assumed for rows written before currency was stored. */
export const DEFAULT_CURRENCY: CurrencyCode = 'SAR';

/** Narrows arbitrary stored/user input to a supported code, else the default. */
export function toCurrencyCode(value?: string | null): CurrencyCode {
    if (!value) return DEFAULT_CURRENCY;
    const upper = String(value).trim().toUpperCase();
    return (CURRENCY_CODES as string[]).includes(upper) ? (upper as CurrencyCode) : DEFAULT_CURRENCY;
}

/**
 * "SAR 250.00", "KWD 12.500". The code is used rather than a glyph because
 * the Gulf currency symbols render inconsistently across the fonts used in
 * invoices, PDF print output and email clients.
 */
export function formatMoney(amount: number | string | null | undefined, currency?: string | null): string {
    const meta = CURRENCIES[toCurrencyCode(currency)];
    const value = Number(amount);
    const safe = Number.isFinite(value) ? value : 0;
    return `${meta.code} ${safe.toFixed(meta.decimals)}`;
}

/** Amount only, no code — for table cells that show the code in a column. */
export function formatAmount(amount: number | string | null | undefined, currency?: string | null): string {
    const meta = CURRENCIES[toCurrencyCode(currency)];
    const value = Number(amount);
    return (Number.isFinite(value) ? value : 0).toFixed(meta.decimals);
}

/** Rounds to the currency's real precision before storing. */
export function roundForCurrency(amount: number, currency?: string | null): number {
    const meta = CURRENCIES[toCurrencyCode(currency)];
    const factor = 10 ** meta.decimals;
    return Math.round(amount * factor) / factor;
}
