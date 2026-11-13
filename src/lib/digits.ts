/**
 * Arabic-Indic (٠-٩, U+0660-0669) and Extended Arabic-Indic / Persian
 * (۰-۹, U+06F0-06F9) digits, converted to ASCII 0-9.
 *
 * Arabic keyboards type these by default, but JavaScript's \d and \D only
 * know ASCII digits, so "٠٥٠١٢٣٤٥٦٧" counted as zero digits and every phone
 * number typed that way was rejected (QA report 13 Nov 2026, B1). Applied
 * before validating and before saving, so a stored number is always ASCII and
 * the same customer matches whichever keyboard they used.
 *
 * No dependencies: imported by client components and route handlers alike.
 */
export function toAsciiDigits(value: string): string {
    return value.replace(/[\u0660-\u0669\u06F0-\u06F9]/g, (ch) => {
        const code = ch.charCodeAt(0);
        return String(code >= 0x06f0 ? code - 0x06f0 : code - 0x0660);
    });
}
