/**
 * The one place a route's fare is written down.
 *
 * The brief that introduced this asked for a single authoritative source so
 * the pricing table, the vehicle cards, the WhatsApp messages, the FAQ
 * answer and the page metadata can never quote different numbers. Every one
 * of those reads from here.
 *
 * Ground rules, deliberately enforced by the shape of the type:
 *
 *  · A fare is only ever published for a route the business has confirmed.
 *    `amount: null` is a first-class value meaning "Request a Quote", and is
 *    what every unconfirmed route uses. Nothing here is estimated,
 *    converted between currencies, or carried across from a similar route.
 *  · `basis` and `direction` are required, because "300" means nothing until
 *    you know whether it is a starting fare or a fixed one and whether it
 *    covers one leg or two. Publishing a price without them is how a refund
 *    dispute starts.
 *  · `confirmedOn` is required so a stale price is visibly stale.
 *  · `vehicleSlugs` names the exact vehicles the fare covers, keyed to
 *    FLEET_VEHICLES, so a card can never show a price for a vehicle the
 *    fare was never quoted for.
 */

import { FLEET_VEHICLES, type FleetVehicle } from './fleetVehicles';

/** Currencies a route fare can be quoted in. Wider than the invoice
 *  currencies: Kuwait-origin work is quoted in dinar. */
export type RouteCurrency = 'KWD' | 'SAR' | 'AED';

export interface RoutePricing {
    currency: RouteCurrency;
    /** The fare, or null when it has not been confirmed for this route. */
    amount: number | null;
    /** "starting" renders as "from X"; "fixed" renders the figure alone. */
    basis: 'starting' | 'fixed';
    direction: 'one-way' | 'return';
    /** FLEET_VEHICLES slugs this fare covers, in display order. */
    vehicleSlugs: string[];
    /** What the fare covers. Shown verbatim under "What's included". */
    includes: string[];
    /** What it does not. Disclosed on the page, not buried. */
    excludes: string[];
    /** When the business last confirmed this fare. */
    confirmedOn: string;
}

/**
 * "300 KWD", or "SAR 1,250.50" where the figure has a fractional part.
 *
 * Not `lib/currency.ts`'s formatMoney, which always prints the currency's
 * full precision — correct on an invoice, but "KWD 300.000" is not how you
 * write a headline fare, and KWD carries three decimals.
 */
export function formatRoutePrice(amount: number, currency: RouteCurrency): string {
    const whole = Number.isInteger(amount);
    const figure = whole
        ? amount.toLocaleString('en-US')
        : amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 3 });
    return `${figure} ${currency}`;
}

/** The fare as a customer should read it: "from 300 KWD", "300 KWD". */
export function priceLabel(pricing: RoutePricing): string {
    if (pricing.amount === null) return 'Request a Quote';
    const money = formatRoutePrice(pricing.amount, pricing.currency);
    return pricing.basis === 'starting' ? `from ${money}` : money;
}

/** "one-way" / "return", for the line under the figure. */
export function directionLabel(pricing: RoutePricing): string {
    return pricing.direction === 'one-way' ? 'One way' : 'Return';
}

/** Whether this route has a fare worth rendering a price section for. */
export function hasPublishedPrice(pricing?: RoutePricing): pricing is RoutePricing {
    return Boolean(pricing && pricing.amount !== null);
}

/** The vehicles a route offers, resolved from FLEET_VEHICLES in order.
 *  An unknown slug is dropped rather than rendered as a blank card. */
export function routeVehicles(slugs: string[] | undefined): FleetVehicle[] {
    if (!slugs?.length) return [];
    return slugs
        .map((slug) => FLEET_VEHICLES.find((v) => v.slug === slug))
        .filter((v): v is FleetVehicle => Boolean(v));
}

/* ── Shared inclusion copy ────────────────────────────────────────── */

/**
 * What a confirmed cross-border fare covers, as the business confirmed it
 * on 18 October 2026.
 *
 * The border wording is deliberate. The business confirms passengers are
 * not required to walk across, and that is said plainly — but it is paired
 * with what passengers *do* still have to do, because implying that a
 * private transfer lets anyone skip an immigration check would be both
 * untrue and the kind of claim that strands a customer at a border.
 */
/**
 * The Kuwait-Riyadh fare, stripped of language.
 *
 * Both the English and the Arabic route objects build their `pricing` from
 * these, so the wording around the fare can differ between locales while
 * the figure, the basis and the direction cannot.
 */
export const KUWAIT_RIYADH_FARE = {
    currency: 'KWD' as const,
    amount: 300,
    basis: 'starting' as const,
    direction: 'one-way' as const,
    vehicleSlugs: ['toyota-land-cruiser-prado', 'gmc-yukon'],
};

export const CROSS_BORDER_INCLUSIONS: string[] = [
    'Private vehicle — reserved for your party alone, never shared',
    'Licensed driver for the full journey, including the border crossing',
    'Door-to-door pickup and drop-off at the addresses you give us',
    'Border fees and vehicle insurance for the crossing',
    'Road tolls and fuel for the whole route',
    'One hour of free waiting time on airport pickups',
    'A planned rest stop on longer journeys',
    'No changing vehicles and no walking across the border — you stay with the same car and driver throughout',
    'WhatsApp contact with our team while you travel',
];

export const CROSS_BORDER_EXCLUSIONS: string[] = [
    'Your passport, visa or entry permit — these remain each passenger’s own responsibility',
    'Waiting beyond the first free hour, charged by the hour and confirmed when you book',
    'Extra stops or detours not agreed beforehand',
    'Meals and any overnight accommodation',
];

/**
 * The passenger's side of a Saudi–Kuwait land crossing.
 *
 * Checked against the Netherlands government travel advisory and published
 * border guides in October 2026. Entry rules differ by nationality,
 * residency and purpose of travel and do change, so the page says to
 * confirm rather than presenting any of this as a guarantee of entry.
 */
export const KSA_KUWAIT_CHECKLIST: { title: string; detail: string }[] = [
    {
        title: 'Passport valid for at least six months',
        detail: 'Checked on both sides of the crossing. A passport close to expiry is the most common reason a journey is refused.',
    },
    {
        title: 'The right visa or entry permission',
        detail: 'GCC nationals generally cross on a national ID. Other nationalities need a valid Saudi visa or e-visa, and a Kuwaiti e-visa or visa on arrival where eligible. Requirements vary by nationality — confirm yours with the relevant embassy before you travel.',
    },
    {
        title: 'Residency documents, if you hold them',
        detail: 'Carry your Iqama or Kuwaiti civil ID alongside your passport if you are resident in either country.',
    },
    {
        title: 'Everyone travelling, named at booking',
        detail: 'Tell us every passenger when you book. Border records are per person, and an unlisted passenger cannot simply be added at the crossing.',
    },
    {
        title: 'Luggage that matches the vehicle',
        detail: 'Confirm your bag count with us in advance so the right vehicle is sent. Oversized items need arranging beforehand.',
    },
    {
        title: 'Time for the crossing itself',
        detail: 'The crossing is generally open around the clock, but processing time varies with how busy it is. Weekends and public holidays are slower. Plan arrival times with that in mind rather than to the minute.',
    },
    {
        title: 'What the driver handles, and what you do',
        detail: 'Your driver deals with the vehicle documentation, insurance and tolls. Passengers present their own passports and complete immigration themselves — that part cannot be done on your behalf.',
    },
];

/* ââ Arabic copy ââââââââââââââââââââââââââââââââââââââââââââ */

/** The same inclusions as CROSS_BORDER_INCLUSIONS, in Arabic. */
export const CROSS_BORDER_INCLUSIONS_AR: string[] = [
    'سيارة خاصة لمجموعتك وحدكم — غير مشتركة أبداً',
    'سائق مرخّص طوال الرحلة، بما في ذلك عبور الحدود',
    'خدمة من الباب إلى الباب على العناوين التي تحدّدها',
    'رسوم الحدود وتأمين المركبة للعبور',
    'رسوم الطرق والوقود لكامل المسار',
    'ساعة انتظار مجانية عند الاستقبال من المطار',
    'استراحة مجدولة في الرحلات الطويلة',
    'لا تغيير للسيارة ولا مشي عبر الحدود — تبقى مع نفس السيارة والسائق',
    'تواصل عبر واتساب مع فريقنا أثناء السفر',
];

/** The same exclusions as CROSS_BORDER_EXCLUSIONS, in Arabic. */
export const CROSS_BORDER_EXCLUSIONS_AR: string[] = [
    'جواز السفر والتأشيرة أو تصريح الدخول — مسؤولية كل راكب',
    'الانتظار بعد الساعة المجانية الأولى، يُحتسب بالساعة ويُؤكد عند الحجز',
    'التوقفات أو الانحرافات غير المتفق عليها مسبقاً',
    'الوجبات وأي إقامة ليلية',
];

/** The same checklist as KSA_KUWAIT_CHECKLIST, in Arabic. */
export const KSA_KUWAIT_CHECKLIST_AR: { title: string; detail: string }[] = [
    {
        title: 'جواز سفر سارٍ لمدة ستة أشهر على الأقل',
        detail: 'يُفحص على جانبي المعبر، وقرب انتهاء الصلاحية هو أكثر أسباب رفض العبور شيوعاً.',
    },
    {
        title: 'التأشيرة أو إذن الدخول المناسب',
        detail: 'مواطنو دول الخليج يعبرون عادةً بالهوية الوطنية. أما الجنسيات الأخرى فتحتاج تأشيرة سعودية سارية وتأشيرة كويتية. تختلف المتطلبات حسب الجنسية — تأكد مع السفارة قبل السفر.',
    },
    {
        title: 'وثائق الإقامة إن وُجدت',
        detail: 'احمل الإقامة أو البطاقة المدنية الكويتية مع جواز سفرك إن كنت مقيماً في أي من البلدين.',
    },
    {
        title: 'أسماء جميع الركاب عند الحجز',
        detail: 'أخبرنا بكل راكب عند الحجز، فسجلات الحدود فردية ولا يمكن إضافة راكب عند المعبر.',
    },
    {
        title: 'أمتعة تناسب السيارة',
        detail: 'أكّد عدد الحقائب مسبقاً لنرسل السيارة المناسبة. الأغراض كبيرة الحجم تحتاج ترتيباً مسبقاً.',
    },
    {
        title: 'وقت كافٍ لإجراءات العبور',
        detail: 'المعبر مفتوح عادةً على مدار الساعة، لكن مدة الإجراءات تختلف حسب الازدحام. عطلات نهاية الأسبوع والأعياد أبطأ.',
    },
    {
        title: 'ما يتولاه السائق وما تتولاه أنت',
        detail: 'يتولى السائق أوراق المركبة والتأمين والرسوم. أما الركاب فيقدمون جوازاتهم ويُنهون إجراءات الجوازات بأنفسهم — وهذا لا يمكن أن يتم نيابةً عنكم.',
    },
];
