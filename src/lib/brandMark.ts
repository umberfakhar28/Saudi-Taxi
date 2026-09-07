/**
 * The Gulf Trip Service brand mark, as data rather than as JSX.
 *
 * src/components/Logo.tsx renders these same paths in React. Keeping the
 * geometry here means the invoice PNG exporter can rasterise the identical
 * mark without a second, drifting copy of the artwork.
 *
 * Icon: a location pin rising out of Gulf waves — trip (pin) + gulf (waves).
 * viewBox is 0 0 100 100 so the mark stays crisp from favicon to hero size.
 */

export const BRAND_NAVY = '#081827';
export const BRAND_IVORY = '#F5F2EA';
export const BRAND_GOLD = '#B8945B';

/** The three stacked waves, back to front, with their per-variant opacity. */
export const WAVE_PATHS: { d: string; colorOpacity: number; whiteOpacity: number }[] = [
    { d: 'M-4 66 Q 14 54 32 66 T 68 66 T 104 66 V 104 H -4 Z', colorOpacity: 0.2, whiteOpacity: 0.14 },
    { d: 'M-4 74 Q 14 62 32 74 T 68 74 T 104 74 V 104 H -4 Z', colorOpacity: 0.32, whiteOpacity: 0.24 },
    { d: 'M-4 82 Q 14 70 32 82 T 68 82 T 104 82 V 104 H -4 Z', colorOpacity: 0.5, whiteOpacity: 0.4 },
];

export const PIN_PATH =
    'M50 24 C 60.5 24 69 32.5 69 43 C 69 56 50 74 50 74 C 50 74 31 56 31 43 C 31 32.5 39.5 24 50 24 Z';

export const PIN_DOT = { cx: 50, cy: 43, r: 7.5 };

/**
 * A complete, standalone SVG document for the mark.
 *
 * Self-contained on purpose: no external references, no CSS, no web fonts,
 * so it can be turned into a `data:` URL and drawn onto a canvas without
 * tainting it (which would make the canvas unexportable).
 */
export function brandMarkSvg(size = 100, variant: 'color' | 'white' = 'color'): string {
    const isWhite = variant === 'white';
    const waves = WAVE_PATHS.map(
        (w) => `<path d="${w.d}" fill="${BRAND_IVORY}" opacity="${isWhite ? w.whiteOpacity : w.colorOpacity}"/>`
    ).join('');
    const tile = isWhite ? '' : `<rect width="100" height="100" rx="24" fill="${BRAND_NAVY}"/>`;
    return (
        `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">` +
        tile +
        waves +
        `<path d="${PIN_PATH}" fill="#FFFFFF"/>` +
        `<circle cx="${PIN_DOT.cx}" cy="${PIN_DOT.cy}" r="${PIN_DOT.r}" fill="${BRAND_GOLD}"/>` +
        `</svg>`
    );
}

/** The same mark as a `data:` URL, ready for an <img> or canvas drawImage. */
export function brandMarkDataUrl(size = 100, variant: 'color' | 'white' = 'color'): string {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(brandMarkSvg(size, variant))}`;
}
