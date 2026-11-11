import type { RouteData } from "@/components/RoutePage";
import {
    CROSS_BORDER_EXCLUSIONS_AR,
    CROSS_BORDER_INCLUSIONS_AR,
    KSA_KUWAIT_CHECKLIST_AR,
    KUWAIT_RIYADH_FARE,
    type RoutePricing,
} from "@/lib/routePricing";

/** The English page's fare, with Arabic wording around it. The numbers
 *  are the shared constant, so the two locales cannot disagree. */
const KUWAIT_RIYADH_PRICING_AR: RoutePricing = {
    ...KUWAIT_RIYADH_FARE,
    includes: CROSS_BORDER_INCLUSIONS_AR,
    excludes: CROSS_BORDER_EXCLUSIONS_AR,
    confirmedOn: "18 أكتوبر 2026",
};

/**
 * Arabic content for the route pages that have an Arabic twin.
 *
 * Same shape as src/lib/routeData.ts, rendered by the same RoutePage
 * component — so an Arabic route page is a data entry, not a second
 * hand-written page that drifts from the English one.
 *
 * Facts (distance, drive time, border names, documents) are carried over
 * from the English entry for the same corridor rather than restated from
 * memory, so the two languages cannot disagree. `relatedRoutes` only ever
 * points at pages that exist in Arabic; the English-only link blocks
 * (city hubs, guides, hotels) are switched off for Arabic in RoutePage.
 */

export const bahrainToDammamAr: RouteData = {
    slug: "bahrain-to-dammam-taxi-service",
    origin: "البحرين",
    destination: "الدمام",
    isCrossBorder: true,
    borderCrossingName: "جسر الملك فهد",
    eyebrow: "رحلة عبر الحدود",
    h1: "سيارة خاصة من البحرين إلى الدمام",
    intro: "نقل خاص من باب إلى باب من البحرين عبر جسر الملك فهد إلى الدمام والخبر والظهران — سيارة واحدة وسائق مرخّص من عنوانك في البحرين حتى وجهتك في المنطقة الشرقية.",
    breadcrumbLabel: "البحرين ← الدمام",
    distance: "نحو 65 كم",
    travelTime: "ساعة إلى ساعة ونصف (شاملة العبور)",
    heroImage: "/images/chauffeur.jpg",
    overviewTitle: "رحلة من باب إلى باب من البحرين إلى الدمام",
    overviewParagraphs: [
        "السفر من المنامة أو السيف أو أي منطقة في البحرين إلى المنطقة الشرقية رحلة يومية لكثير من العائلات وزوار نهاية الأسبوع ورجال الأعمال. جسر الملك فهد هو المعبر البري الوحيد بين البلدين، وتنظيم الرحلة على الجانبين هو ما يصنع الفرق بين رحلة مريحة وأخرى متعبة.",
        "نغطي الرحلة كاملة: يستقبلك سائق مرخّص من فندقك أو سكنك في البحرين، ويعبر بك الجسر، ثم يواصل الطريق مباشرة إلى الدمام أو الخبر أو الظهران بعد إنهاء إجراءات الجوازات والجمارك.",
        "العبور نفسه هو الجزء الذي يقلق أغلب المسافرين. سائقونا يقطعون هذا الطريق بانتظام، ويعرفون المسارات وأوقات الذروة وما تتطلبه الإجراءات، ويبقون معك خلالها — فالحجز رحلة واحدة، لا أجزاء عليك ربطها بنفسك.",
    ],
    borderProcessTitle: "إجراءات العبور من البحرين إلى السعودية",
    borderProcessParagraphs: [
        "يقلّك سائقك من عنوانك في البحرين ويصل إلى مدخل الجسر خلال 20 إلى 25 دقيقة تقريباً من وسط المنامة، حسب حركة المرور.",
        "عند نقطة الخروج البحرينية تتم إجراءات الجوازات المعتادة. وعلى الجانب السعودي يعبر مواطنو دول الخليج بالهوية الوطنية، بينما يحتاج غيرهم إلى تأشيرة سعودية سارية أو إقامة لمن كان مقيماً.",
        "بعد إنهاء الجوازات والجمارك تستكمل الرحلة إلى عنوانك مباشرة — عادةً 25 إلى 35 دقيقة إضافية حتى وسط الدمام أو الخبر أو الظهران.",
    ],
    documents: [
        "جواز سفر ساري المفعول",
        "الهوية الوطنية لمواطني دول مجلس التعاون",
        "تأشيرة سعودية سارية أو إقامة لغير الخليجيين",
        "تأكيد عنوان الوصول في المنطقة الشرقية",
    ],
    pickupPoints: ["فنادق المنامة", "منطقة السيف", "الجفير والعدلية", "مطار البحرين الدولي", "السكن الخاص في أي منطقة بالبحرين"],
    dropoffInfo: "التوصيل إلى عنوانك في الدمام أو الخبر أو الظهران — فندق أو سكن أو مقر عمل، أو مطار الملك فهد الدولي إذا كانت لديك رحلة مغادرة.",
    vehicleOptions: [
        { name: "سيدان", capacity: "1–3 ركاب", note: "مناسبة للأفراد والأزواج مع أمتعة عادية." },
        { name: "دفع رباعي", capacity: "1–5 ركاب", note: "مساحة أكبر للعائلات والأمتعة الإضافية." },
        { name: "فان", capacity: "6–10 ركاب", note: "الأنسب للعائلات الكبيرة والمجموعات التي تسافر معاً." },
    ],
    faqs: [
        { q: "هل أبقى في السيارة نفسها طوال الطريق؟", a: "نعم — الرحلة من باب إلى باب. يعبر بك سائقك الجسر ويواصل حتى عنوانك في المنطقة الشرقية." },
        { q: "كم تستغرق الرحلة من البحرين إلى الدمام؟", a: "عادةً ساعة إلى ساعة ونصف شاملة إجراءات العبور. المسافة قصيرة، لكن الجوازات والجمارك تضيف وقتاً يختلف حسب الازدحام." },
        { q: "هل يحتاج مواطنو دول الخليج إلى تأشيرة؟", a: "لا — يعبر مواطنو دول مجلس التعاون بالهوية الوطنية. أما غيرهم فيحتاج إلى تأشيرة سعودية سارية أو إقامة لمن كان مقيماً. يُفضّل التأكد من المتطلبات الحالية قبل السفر." },
        { q: "ما أفضل وقت للعبور لتجنّب الازدحام؟", a: "صباح أيام الأسبوع عادةً هو الأسرع. مساء الخميس والجمعة يشهد أعلى حركة في الاتجاهين." },
        { q: "هل يمكن التوصيل مباشرة إلى مطار الملك فهد الدولي؟", a: "نعم. احسب وقت العبور، ثم نحو 45 إلى 55 دقيقة من الجسر حتى المطار، إضافة إلى وقت إنهاء إجراءات السفر الذي تنصح به شركة الطيران." },
    ],
    relatedRoutes: [
        { href: "/ar/dammam-airport-to-bahrain-taxi-service", label: "مطار الدمام إلى البحرين" },
        { href: "/ar/border-crossing", label: "جميع رحلات عبور الحدود" },
    ],
    ctaText: "احجز رحلتك إلى الدمام",
    tags: ["gcc", "business"],
    priority: 1,
    reverseSlug: "dammam-airport-to-bahrain-taxi-service",
    lastReviewed: "أكتوبر 2026",
};

export const riyadhToQatarAr: RouteData = {
    slug: "riyadh-to-qatar-taxi-service",
    origin: "الرياض",
    destination: "الدوحة",
    isCrossBorder: true,
    borderCrossingName: "منفذ سلوى / أبو سمرة",
    eyebrow: "رحلة طويلة عبر الحدود",
    h1: "سيارة خاصة من الرياض إلى الدوحة",
    intro: "نقل خاص من باب إلى باب من الرياض إلى الدوحة عبر منفذ سلوى — سيارة واحدة وسائق مرخّص طوال الطريق، دون تغيير مركبة ودون ترانزيت.",
    breadcrumbLabel: "الرياض ← الدوحة",
    distance: "نحو 580 كم",
    travelTime: "6.5 إلى 7.5 ساعات (شاملة إجراءات الحدود)",
    heroImage: "/images/chauffeur.jpg",
    overviewTitle: "الطريق البري من الرياض إلى الدوحة",
    overviewParagraphs: [
        "يفضّل كثير من المسافرين بين الرياض والدوحة الطريق البري على الرحلات الجوية القصيرة، خاصة العائلات والمجموعات ومن لديه أمتعة كثيرة — فالرحلة تبدأ من باب المنزل أو الفندق وتنتهي عند العنوان المطلوب في الدوحة، دون مطارات ولا انتظار.",
        "تمر الرحلة عبر منفذ سلوى (أبو سمرة على الجانب القطري)، وهو المعبر البري الرئيسي بين البلدين. سيارة واحدة وسائق واحد يغطيان الطريق كاملاً، بما في ذلك العبور نفسه.",
        "نخطط للرحلة كيوم سفر كامل: وقت الانطلاق، استراحة في الطريق، ووقت إضافي لإجراءات الحدود التي تختلف حسب الازدحام ويوم الأسبوع.",
    ],
    borderProcessTitle: "إجراءات منفذ سلوى",
    borderProcessParagraphs: [
        "من الرياض إلى المنفذ نحو خمس ساعات عبر الطريق السريع، مع استراحة مجدولة في الطريق.",
        "عند الخروج السعودي تتم إجراءات الجوازات ومراجعة أوراق المركبة. يعبر مواطنو دول الخليج بالهوية الوطنية، ويحتاج غيرهم إلى تصريح خروج أو تأشيرة سارية حسب وضعه.",
        "على الجانب القطري يتم الدخول عبر منصة هيّا أو التأشيرة أو الهوية الخليجية حسب الجنسية، ثم تستكمل الرحلة مباشرة إلى عنوانك في الدوحة.",
    ],
    documents: [
        "جواز سفر ساري لمدة ستة أشهر على الأقل",
        "الهوية الوطنية لمواطني دول مجلس التعاون",
        "تأشيرة قطر أو تصريح هيّا لغير الخليجيين",
        "إقامة سارية وتصريح خروج لمن كان مقيماً في السعودية",
    ],
    pickupPoints: ["فنادق الرياض", "حي السفارات", "مركز الملك عبدالله المالي", "مطار الملك خالد الدولي", "السكن الخاص داخل الرياض"],
    dropoffInfo: "التوصيل إلى عنوانك في الدوحة — فندق أو سكن أو مقر عمل، أو مطار حمد الدولي إذا كانت لديك رحلة مغادرة.",
    vehicleOptions: [
        { name: "سيدان تنفيذية", capacity: "1–3 ركاب", note: "مريحة للرحلات الطويلة ورجال الأعمال." },
        { name: "دفع رباعي", capacity: "1–5 ركاب", note: "مساحة أوسع للعائلات على طريق طويل." },
        { name: "فان", capacity: "6–10 ركاب", note: "للمجموعات والعائلات الكبيرة مع أمتعتها." },
    ],
    faqs: [
        { q: "هل تغطي السيارة نفسها الطريق كاملاً؟", a: "نعم — سيارة واحدة وسائق واحد من مكان انطلاقك في الرياض، عبر منفذ سلوى، حتى عنوانك في الدوحة." },
        { q: "كم تستغرق الرحلة؟", a: "عادةً 6.5 إلى 7.5 ساعات شاملة إجراءات الحدود، إضافة إلى الاستراحات. الازدحام عند المنفذ هو أكثر ما يغيّر هذا الوقت." },
        { q: "ما المستندات المطلوبة؟", a: "جواز سفر ساري، والهوية الوطنية لمواطني دول الخليج. أما غيرهم فيحتاج إلى تأشيرة قطر أو تصريح هيّا، وإلى تصريح خروج إن كان مقيماً في السعودية. تختلف المتطلبات حسب الجنسية وتتغير، لذا تأكد من المصادر الرسمية قبل السفر." },
        { q: "هل الرحلة مناسبة للعائلات؟", a: "نعم، وهي من أكثر أسباب اختيار الطريق البري: العائلة كلها في سيارة واحدة، مع أمتعتها، واستراحات حسب الحاجة." },
    ],
    relatedRoutes: [
        { href: "/ar/dammam-airport-to-qatar-taxi-service", label: "مطار الدمام إلى قطر" },
        { href: "/ar/border-crossing", label: "جميع رحلات عبور الحدود" },
    ],
    ctaText: "احجز رحلتك إلى الدوحة",
    tags: ["gcc", "business"],
    priority: 1,
    reverseSlug: "qatar-to-riyadh-taxi-service",
    lastReviewed: "أكتوبر 2026",
};

/**
 * الدوحة ← الرياض — the reciprocal of riyadhToQatarAr above.
 *
 * Built because Google was already serving a 404 here: Search Console shows
 * /ar/qatar-to-riyadh-taxi-service indexed at position 1 with impressions,
 * while the URL returned 404. Nothing on this site ever linked to it — the
 * reverse-route callout on the Arabic page points at the English reciprocal
 * — so Google appears to have derived the URL from the hreflang pair on the
 * opposite direction. The English twin is the site's second-best page
 * (910 impressions, 83 clicks, 9.1% CTR over the 28 days to 2026-11-01),
 * which is the evidence that the corridor is worth an Arabic page.
 *
 * The Arabic prose is the reviewed wording from riyadhToQatarAr with the
 * direction reversed, not a fresh translation: same corridor, same border,
 * same vehicles, same documents. Only what genuinely differs by direction
 * changes — the exit and entry order at the border, the pickup and drop-off
 * ends, and the midway rest stop, all carried from the English qatarToRiyadh
 * entry so the two languages cannot disagree on a fact.
 *
 * No `pricing`: neither the English entry nor its Arabic sibling publishes a
 * fare for this corridor, and inventing one here is not an option.
 */
export const qatarToRiyadhAr: RouteData = {
    slug: "qatar-to-riyadh-taxi-service",
    origin: "الدوحة",
    destination: "الرياض",
    isCrossBorder: true,
    borderCrossingName: "منفذ أبو سمرة / سلوى",
    eyebrow: "رحلة طويلة عبر الحدود",
    h1: "سيارة خاصة من الدوحة إلى الرياض",
    intro: "نقل خاص من باب إلى باب من الدوحة إلى الرياض عبر منفذ أبو سمرة — سيارة واحدة وسائق مرخّص طوال الطريق، دون تغيير مركبة ودون ترانزيت.",
    breadcrumbLabel: "الدوحة ← الرياض",
    distance: "نحو 580 كم",
    travelTime: "6.5 إلى 7.5 ساعات (شاملة إجراءات الحدود)",
    heroImage: "/images/chauffeur.jpg",
    overviewTitle: "الطريق البري من الدوحة إلى الرياض",
    overviewParagraphs: [
        "يفضّل كثير من المسافرين بين الدوحة والرياض الطريق البري على الرحلات الجوية القصيرة، خاصة العائلات والمجموعات ومن لديه أمتعة كثيرة — فالرحلة تبدأ من باب المنزل أو الفندق وتنتهي عند العنوان المطلوب في الرياض، دون مطارات ولا انتظار.",
        "تنطلق الرحلة من الدوحة غرباً إلى منفذ أبو سمرة، ثم تدخل السعودية عند سلوى، وتكمل شمالاً غرباً عبر المنطقة الشرقية حتى الرياض. سيارة واحدة وسائق واحد يغطيان الطريق كاملاً، بما في ذلك العبور نفسه.",
        "نخطط للرحلة كيوم سفر كامل: وقت الانطلاق، استراحة مجدولة في منطقة الأحساء بعد العبور، ووقت إضافي لإجراءات الحدود التي تختلف حسب الازدحام ويوم الأسبوع.",
    ],
    borderProcessTitle: "إجراءات منفذ أبو سمرة",
    borderProcessParagraphs: [
        "من وسط الدوحة إلى منفذ أبو سمرة نحو ساعة واحدة، حيث تتم إجراءات الخروج القطرية ومراجعة أوراق المركبة.",
        "عند الدخول السعودي في سلوى يعبر مواطنو دول الخليج بالهوية الوطنية، ويحتاج غيرهم إلى تأشيرة دخول سعودية سارية. يستغرق العبور عادةً من 30 إلى 60 دقيقة على الجانبين في الأوقات غير المزدحمة.",
        "بعد إتمام الدخول تستكمل الرحلة عبر الأحساء وشبكة الطرق الشرقية إلى الرياض — نحو خمس ساعات من المنفذ حتى العاصمة.",
    ],
    documents: [
        "جواز سفر ساري لمدة ستة أشهر على الأقل",
        "تأشيرة دخول سعودية، أو الهوية الوطنية لمواطني دول مجلس التعاون",
        "إتمام إجراءات الخروج من قطر",
        "عنوان التوصيل في الرياض أو تأكيد حجز الفندق",
    ],
    pickupPoints: ["فنادق الدوحة (الخليج الغربي واللؤلؤة)", "مطار حمد الدولي", "لوسيل", "الوكرة", "مقار العمل في الدوحة"],
    dropoffInfo: "التوصيل إلى أي عنوان في الرياض — مركز الملك عبدالله المالي، العليا، الدرعية، الجهات الحكومية، أو مطار الملك خالد الدولي إذا كانت لديك رحلة مغادرة.",
    vehicleOptions: [
        { name: "سيدان تنفيذية", capacity: "1–3 ركاب", note: "مريحة للرحلات الطويلة ورجال الأعمال." },
        { name: "دفع رباعي", capacity: "1–5 ركاب", note: "مساحة أوسع للعائلات على طريق طويل." },
        { name: "فان", capacity: "6–10 ركاب", note: "للمجموعات والوفود مع أمتعتها." },
    ],
    stops: [
        { name: "منطقة الأحساء", note: "استراحة مجدولة في منتصف الطريق داخل السعودية، بعد إتمام العبور في سلوى." },
    ],
    faqs: [
        { q: "هل تغطي السيارة نفسها الطريق كاملاً؟", a: "نعم — سيارة واحدة وسائق واحد من مكان انطلاقك في الدوحة، عبر منفذ أبو سمرة، حتى عنوانك في الرياض." },
        { q: "كم تستغرق الرحلة؟", a: "عادةً 6.5 إلى 7.5 ساعات شاملة إجراءات الحدود والاستراحة المجدولة. الازدحام عند المنفذ هو أكثر ما يغيّر هذا الوقت." },
        { q: "هل أحتاج تأشيرة لدخول السعودية من قطر براً؟", a: "غير مواطني دول الخليج يحتاجون إلى تأشيرة دخول سعودية سارية، أما مواطنو دول مجلس التعاون فيعبرون بالهوية الوطنية. تختلف المتطلبات حسب الجنسية وتتغير، لذا تأكد من المصادر الرسمية قبل السفر." },
        { q: "هل يمكن حجز الرحلة لمجموعة أو وفد؟", a: "نعم — نرتّب عدة سيارات للوفود والمجموعات والعائلات الكبيرة المسافرة بين الدوحة والرياض." },
        { q: "هل الرحلة مناسبة للعائلات؟", a: "نعم، وهي من أكثر أسباب اختيار الطريق البري: العائلة كلها في سيارة واحدة، مع أمتعتها، واستراحات حسب الحاجة." },
    ],
    // The reverse direction is deliberately NOT listed here: RoutePage's
    // reverse-route callout already links /ar/riyadh-to-qatar-taxi-service
    // near the top of this page, and repeating it lower down would give one
    // page two links to the same destination with two different labels.
    relatedRoutes: [
        { href: "/ar/dammam-airport-to-qatar-taxi-service", label: "مطار الدمام إلى قطر" },
        { href: "/ar/border-crossing", label: "جميع رحلات عبور الحدود" },
        { href: "/ar/book-online", label: "احجز رحلتك" },
    ],
    ctaText: "احجز رحلتك إلى الرياض",
    tags: ["gcc", "business"],
    priority: 1,
    reverseSlug: "riyadh-to-qatar-taxi-service",
    lastReviewed: "نوفمبر 2026",
};

export const riyadhToKuwaitAr: RouteData = {
    slug: "riyadh-to-kuwait-taxi-service",
    origin: "الرياض",
    destination: "الكويت",
    isCrossBorder: true,
    borderCrossingName: "منفذ الخفجي / النويصيب",
    eyebrow: "رحلة طويلة عبر الحدود",
    h1: "سيارة خاصة من الرياض إلى الكويت",
    intro: "نقل خاص من باب إلى باب من الرياض إلى مدينة الكويت عبر الحدود البرية — سيارة واحدة وسائق مرخّص، بديل مريح عن الطيران للعائلات ومن لديه أمتعة.",
    breadcrumbLabel: "الرياض ← الكويت",
    distance: "نحو 639 كم براً",
    travelTime: "7 – 9 ساعات قيادة، زائد إجراءات الحدود",
    durationHours: "7–9 ساعات قيادة",
    pricing: KUWAIT_RIYADH_PRICING_AR,
    vehicleSlugs: ["toyota-land-cruiser-prado", "gmc-yukon"],
    checklist: KSA_KUWAIT_CHECKLIST_AR,
    heroImage: "/images/chauffeur.jpg",
    overviewTitle: "الطريق البري من الرياض إلى الكويت",
    overviewParagraphs: [
        "الرحلة بين الرياض والكويت رحلة يوم كامل على الطريق، يختارها عادةً من يسافر مع عائلته أو مجموعته، أو من يحمل أمتعة أكثر مما تسمح به الرحلات الجوية، أو من يفضّل تجنّب المطارات.",
        "يغطي سائق واحد الطريق كاملاً حتى عنوانك في الكويت، مع تخطيط الاستراحات مسبقاً وتولّي إجراءات المركبة عند المنفذ.",
        "المعبر الرئيسي بين البلدين هو الخفجي من الجانب السعودي والنويصيب من الجانب الكويتي، ويعمل على مدار الساعة. يُفضّل الوصول إليه نهاراً وتجنّب ذروة نهاية الأسبوع.",
    ],
    borderProcessTitle: "إجراءات العبور إلى الكويت",
    borderProcessParagraphs: [
        "عند الخروج السعودي تتم إجراءات الجوازات ومراجعة أوراق المركبة.",
        "على الجانب الكويتي يعبر مواطنو دول الخليج بالهوية الوطنية، بينما يحتاج غيرهم إلى تأشيرة سارية حسب جنسيته ووضعه. التأمين على المركبة مطلوب داخل الكويت.",
        "بعد إنهاء الإجراءات تستكمل الرحلة إلى عنوانك في مدينة الكويت أو أي منطقة أخرى.",
    ],
    documents: [
        "جواز سفر ساري المفعول",
        "الهوية الوطنية لمواطني دول مجلس التعاون",
        "تأشيرة الكويت السارية لغير الخليجيين",
        "إقامة سارية وتصريح خروج لمن كان مقيماً في السعودية",
    ],
    pickupPoints: ["فنادق الرياض", "حي السفارات", "مركز الملك عبدالله المالي", "مطار الملك خالد الدولي", "السكن الخاص داخل الرياض"],
    dropoffInfo: "التوصيل إلى عنوانك في مدينة الكويت أو ما حولها — فندق أو سكن أو مقر عمل، أو مطار الكويت الدولي إذا كانت لديك رحلة مغادرة.",
    vehicleOptions: [
        { name: "سيدان تنفيذية", capacity: "1–3 ركاب", note: "مريحة لرحلة طويلة بسائق محترف." },
        { name: "دفع رباعي", capacity: "1–5 ركاب", note: "مساحة أكبر للعائلات والأمتعة." },
        { name: "فان", capacity: "6–10 ركاب", note: "للمجموعات التي تسافر معاً في سيارة واحدة." },
    ],
    faqs: [
        { q: "هل يقود سائق واحد الطريق كاملاً؟", a: "نعم — سيارة واحدة وسائق واحد من الرياض، عبر الحدود، حتى وجهتك في الكويت." },
        { q: "كم تستغرق الرحلة؟", a: "تُخطَّط كيوم سفر كامل، ويعتمد الوقت الفعلي على حركة الطريق وازدحام المنفذ والاستراحات. نؤكد التوقيت المتوقع عند الحجز." },
        { q: "ما المستندات المطلوبة؟", a: "جواز سفر ساري، والهوية الوطنية لمواطني دول الخليج، أو تأشيرة كويتية سارية لغيرهم. المقيمون في السعودية يحتاجون إقامة سارية وتصريح خروج. تختلف المتطلبات وتتغير، لذا تأكد من المصادر الرسمية قبل السفر." },
        { q: "متى يكون العبور أسرع؟", a: "المنفذ يعمل على مدار الساعة، والعبور عادةً أسرع خارج أوقات الذروة ونهاية الأسبوع. نخطط وقت الانطلاق على هذا الأساس." },
    ],
    relatedRoutes: [
        { href: "/ar/border-crossing", label: "جميع رحلات عبور الحدود" },
        { href: "/ar/book-online", label: "احجز رحلتك" },
    ],
    ctaText: "احجز رحلتك إلى الكويت",
    tags: ["gcc", "business"],
    priority: 1,
    reverseSlug: "kuwait-to-riyadh-taxi-service",
    lastReviewed: "أكتوبر 2026",
};

export const riyadhToBahrainAr: RouteData = {
    slug: "riyadh-to-bahrain-taxi-service",
    origin: "الرياض",
    destination: "البحرين",
    isCrossBorder: true,
    borderCrossingName: "جسر الملك فهد",
    eyebrow: "رحلة طويلة عبر الحدود",
    h1: "تاكسي من الرياض إلى البحرين بسيارة خاصة",
    intro: "تاكسي خاص من الرياض إلى البحرين من الباب إلى الباب: سيارة واحدة وسائق مرخّص من عنوانك في الرياض عبر جسر الملك فهد حتى المنامة أو السيف أو مطار البحرين. المسافة نحو 470 كم براً، والرحلة 4.5 إلى 5.5 ساعات، والسعر ثابت من 1,000 ريال للسيارة.",
    breadcrumbLabel: "الرياض ← البحرين",
    distance: "نحو 470 كم",
    travelTime: "4.5 إلى 5.5 ساعات (شاملة العبور)",
    heroImage: "/images/chauffeur.jpg",
    overviewTitle: "من العاصمة إلى البحرين براً",
    overviewParagraphs: [
        "يفضّل كثير من المسافرين من الرياض إلى البحرين — للعمل أو لعطلة نهاية الأسبوع أو لزيارة العائلة — الرحلة البرية الخاصة على الرحلات الجوية وما يتبعها من تنقل بين المطارات على الطرفين.",
        "يمتد الطريق شرقاً عبر المنطقة الشرقية حتى الدمام والخبر، ثم جسر الملك فهد. يغطي سائقنا الطريق كاملاً في سيارة تنفيذية، مع استراحة مجدولة في الطريق.",
        "تزداد الحركة على الجسر في مواسم معينة، مثل سباق الفورمولا 1 وعطلات نهاية الأسبوع، لذا يُفضّل الحجز مسبقاً في تلك الفترات.",
    ],
    borderProcessTitle: "إجراءات العبور على جسر الملك فهد",
    borderProcessParagraphs: [
        "من الرياض حتى مدخل الجسر نحو أربع ساعات عبر الطريق السريع، مع استراحة مجدولة.",
        "عند نقطة الخروج السعودية يعبر مواطنو دول الخليج بالهوية الوطنية، ويحتاج المقيمون إلى إقامة سارية وتصريح خروج عند الاقتضاء.",
        "على الجانب البحريني يتم الدخول بالتأشيرة الإلكترونية أو عند الوصول أو بالهوية الخليجية حسب الجنسية، ثم تستكمل الرحلة إلى عنوانك في المنامة أو السيف أو غيرها.",
        "هل يمكن القيادة بنفسك من السعودية إلى البحرين أو العكس؟ نعم، جسر الملك فهد مفتوح للسيارات الخاصة، لكن كل سيارة تحتاج إلى تأمين ساري في البلدين ودفع رسوم الجسر. ومعنا يتولى السائق ذلك كله.",
    ],
    documents: [
        "جواز سفر ساري المفعول",
        "الهوية الوطنية لمواطني دول مجلس التعاون",
        "تأشيرة البحرين الإلكترونية أو ما يعادلها لغير الخليجيين",
        "إقامة سارية لمن كان مقيماً في السعودية",
    ],
    pickupPoints: ["فنادق الرياض", "حي السفارات", "مركز الملك عبدالله المالي", "مطار الملك خالد الدولي", "السكن الخاص داخل الرياض"],
    dropoffInfo: "التوصيل إلى عنوانك في البحرين — فندق في المنامة أو السيف، أو سكن خاص، أو مطار البحرين الدولي إذا كانت لديك رحلة مغادرة.",
    vehicleOptions: [
        { name: "سيدان تنفيذية (تويوتا كامري)", capacity: "1–4 ركاب", note: "1,000 ريال للرحلة في اتجاه واحد." },
        { name: "دفع رباعي أو سيدان فاخرة", capacity: "1–6 ركاب", note: "جي إم سي يوكن وشفروليه تاهو ولكزس ES وغيرها، 1,500 ريال للرحلة في اتجاه واحد." },
        { name: "فان", capacity: "6–10 ركاب", note: "للمجموعات التي تسافر معاً، والسعر عند الطلب عبر واتساب." },
    ],
    // Same facts as the English page (owner fares, Nov 2026). Generic
    // comparison: no operator names or ticket prices.
    contentSections: [
        {
            id: "fares",
            placement: "afterOverview",
            eyebrow: "الأسعار",
            heading: "سعر تاكسي الرياض إلى البحرين 2026",
            paragraphs: ["أسعار ثابتة للسيارة كاملة لا للمقعد، تشمل الوقود والرسوم ورسوم عبور الجسر للسيارة."],
            table: {
                head: ["السيارة", "الركاب", "السعر (اتجاه واحد)"],
                rows: [
                    ["تويوتا كامري", "1–4", "1,000 ريال"],
                    ["لكزس ES", "1–4", "1,500 ريال"],
                    ["فورد تورس", "1–3", "1,500 ريال"],
                    ["جي إم سي يوكن، شفروليه تاهو، تويوتا سيكويا وسيارات دفع رباعي أخرى", "حتى 6", "1,500 ريال"],
                    ["فان (تويوتا هايس وغيرها)", "6–10", "عند الطلب"],
                ],
            },
            outro: ["خدمات المقعد المشترك تحتسب السعر لكل راكب وتنتظر اكتمال السيارة، أما السيارة الخاصة فتنطلق متى كنت جاهزاً وتوصلك من الباب إلى الباب. ولعائلة من ثلاثة أو أربعة أشخاص تصبح تكلفة سيارة السيدان 250 إلى 333 ريالاً للفرد."],
            subtle: true,
        },
        {
            id: "airport",
            placement: "afterBorder",
            eyebrow: "المطار",
            heading: "توصيل من مطار الرياض إلى البحرين",
            items: [
                { title: "الاستقبال في مطار الملك خالد الدولي (RUH)", body: "استقبال عند بوابة الوصول في جميع الصالات من 1 إلى 5، مع لوحة باسمك ومتابعة رحلتك الجوية، فلا يضيع عليك الاستقبال إذا تأخرت الطائرة." },
                { title: "التوصيل إلى مطار البحرين الدولي (BAH)", body: "إذا كانت رحلتك تغادر من البحرين فانطلق من الرياض قبل موعد الإقلاع بسبع إلى ثماني ساعات: نحو خمس ساعات على الطريق وعبور الجسر، إضافة إلى وقت إجراءات السفر." },
            ],
        },
        {
            id: "ways-to-travel",
            placement: "afterBorder",
            eyebrow: "قارن الخيارات",
            heading: "كيف أسافر من الرياض إلى البحرين براً؟",
            table: {
                head: ["الخيار", "من الباب إلى الباب", "التنقلات", "المدة", "الأنسب لـ"],
                rows: [
                    ["تاكسي خاص (معنا)", "نعم", "لا يوجد", "4.5–5.5 ساعات", "العائلات ورجال الأعمال ومن معه أمتعة"],
                    ["تاكسي بمقعد مشترك", "لا", "نقاط انطلاق محددة", "متفاوتة، ينتظر اكتمال الركاب", "المسافر وحده بميزانية محدودة"],
                    ["حافلة بين المدن", "لا", "محطة حافلات في كل طرف", "أطول، بجدول ثابت", "الميزانية المحدودة"],
                    ["قطار ثم سيارة", "لا", "قطار إلى الدمام ثم سيارة عبر الجسر", "أطول، مرحلتان أو أكثر", "من يفضّل القطار"],
                    ["طيران", "لا", "مطار في كل طرف", "نحو ساعة ونصف طيران، إضافة إلى وقت المطار", "المسافر وحده بأمتعة خفيفة"],
                ],
            },
            outro: ["لشخصين أو أكثر، أو لمن معه أمتعة، السيارة الخاصة أسهل طريقة للسفر براً: لا محطات ولا انتظار لاكتمال الركاب، وسعر ثابت واحد. أما المسافر وحده بحقيبة يد فقد تكون الحافلة أو الطائرة أرخص."],
            subtle: true,
        },
    ],
    faqs: [
        { q: "كم سعر تاكسي من الرياض إلى البحرين؟", a: "1,000 ريال بسيارة سيدان، و1,500 ريال بسيارة دفع رباعي أو سيدان فاخرة، للسيارة كاملة في اتجاه واحد. أما الفان فالسعر عند الطلب." },
        { q: "كم المسافة من الرياض إلى البحرين براً؟", a: "نحو 470 كم عبر الطريق السريع 40 وجسر الملك فهد، وتستغرق الرحلة عادةً 4.5 إلى 5.5 ساعات من الباب إلى الباب." },
        { q: "هل يمكن السفر بالسيارة من السعودية إلى البحرين؟", a: "نعم، عبر جسر الملك فهد. سيارتنا وسائقنا يعبران معك، فلا تحتاج إلى تغيير السيارة عند الحدود." },
        { q: "هل توفرون توصيلاً من مطار الرياض إلى البحرين؟", a: "نعم، من جميع صالات مطار الملك خالد الدولي، مع متابعة رحلتك الجوية حتى لا يضيع عليك الاستقبال إذا تأخرت." },
        { q: "هل توجد حافلة من الرياض إلى البحرين؟", a: "نعم، تعمل حافلات بين المدن من محطة إلى محطة بجدول ثابت. أما التاكسي الخاص فيوصلك من الباب إلى الباب وينطلق متى كنت جاهزاً." },
        { q: "هل يوجد أوبر في البحرين؟", a: "نعم، تطبيقات طلب السيارات تعمل داخل البحرين. أما الرحلة من الرياض فاحجز سيارة خاصة تعبر الجسر معك." },
        { q: "هل التاكسي في البحرين غالٍ؟", a: "من الرياض تدفع سعراً ثابتاً بلا عدّاد، وأربعة أشخاص يتشاركون سيارة سيدان بـ1,000 ريال يدفع كل منهم 250 ريالاً." },
        { q: "هل الطريق مزدحم في مواسم معينة؟", a: "نعم، تزداد الحركة بشكل ملحوظ في عطلات نهاية الأسبوع وفي مواسم مثل سباق الفورمولا 1. ننصح بالحجز المبكر في تلك الأيام." },
        { q: "هل يمكن ترتيب رحلة العودة أيضاً؟", a: "نعم، ويمكن حجز الذهاب والعودة معاً، وهو الأنسب للزيارات القصيرة. أخبرنا بتاريخ العودة عند الحجز." },
    ],
    relatedRoutes: [
        { href: "/ar/bahrain-to-dammam-taxi-service", label: "البحرين إلى الدمام" },
        { href: "/ar/dammam-airport-to-bahrain-taxi-service", label: "مطار الدمام إلى البحرين" },
        { href: "/ar/border-crossing", label: "جميع رحلات عبور الحدود" },
    ],
    ctaText: "احجز رحلتك إلى البحرين",
    tags: ["gcc", "business"],
    priority: 1,
    reverseSlug: "bahrain-to-riyadh-taxi-service",
    lastReviewed: "نوفمبر 2026",
};

/**
 * Every route that has an Arabic page, keyed by slug.
 *
 * Declared last so each entry above it exists at module-evaluation time.
 *
 * RoutePage uses this for the reverse-route callout, which needs two things
 * from it. First the href: without this map the callout on an Arabic page
 * linked to /<slug>, the English page wearing an Arabic label. Second the
 * names — the callout reads them off `allRoutes`, which is the English data,
 * so an Arabic page was rendering "اطّلع على خدمة Riyadh إلى Qatar" with the
 * cities in English in the middle of an Arabic sentence. Looking the route
 * up here gives the Arabic names that the Arabic page should have been using
 * all along.
 *
 * A route absent from this map keeps the English link and the English names,
 * which is correct: that is the only version of the page that exists.
 */
export const AR_ROUTES: ReadonlyMap<string, RouteData> = new Map([
    bahrainToDammamAr,
    riyadhToQatarAr,
    qatarToRiyadhAr,
    riyadhToKuwaitAr,
    riyadhToBahrainAr,
].map((r) => [r.slug, r]));

/**
 * Arabic names for the route endpoints that appear in English route data.
 *
 * Three Arabic pages point their reverse-route callout at an English route
 * page, because no Arabic version of that page exists. The callout used to
 * print that page's English endpoint names inside its Arabic sentence
 * ("اطّلع على خدمة Riyadh إلى Bahrain"). The link target is correct and must
 * stay — it is the only version of that page there is — so only the visible
 * names are translated here.
 *
 * Every value below is a name the site's own reviewed Arabic copy already
 * uses (src/lib/ar/*, src/app/ar/*, ArabicFooter). Endpoints with no
 * attested Arabic name on the site are deliberately absent rather than
 * translated here on the fly: an unknown key falls back to the English
 * name, i.e. to the behaviour before this map existed.
 *
 * Keys must match RouteData.origin / RouteData.destination exactly.
 */
export const AR_ENDPOINT_NAMES: ReadonlyMap<string, string> = new Map([
    ["Riyadh", "الرياض"],
    ["Dammam", "الدمام"],
    ["Dammam Airport", "مطار الدمام"],
    ["Bahrain", "البحرين"],
    ["Kuwait", "الكويت"],
    ["Khafji", "الخفجي"],
    ["Qatar", "قطر"],
    ["Doha", "الدوحة"],
]);

/** The Arabic name for a route endpoint, or the English name unchanged when
 * the site has no reviewed Arabic form for it. */
export function arEndpointName(name: string): string {
    return AR_ENDPOINT_NAMES.get(name) ?? name;
}

/**
 * Every route slug that has an Arabic page under /ar/, whether or not that
 * page is driven by RouteData.
 *
 * AR_ROUTES alone is not the answer to "does an Arabic version exist?".
 * Two Arabic route pages — /ar/dammam-airport-to-bahrain-taxi-service and
 * /ar/dammam-airport-to-qatar-taxi-service — are hand-written pages with
 * their own copy and schema rather than RoutePage + RouteData, so they can
 * never appear in AR_ROUTES. Asking AR_ROUTES about them said "no Arabic
 * page" and sent Arabic readers of /ar/bahrain-to-dammam-taxi-service to
 * the English reverse page, past an Arabic one that was already live and
 * already linked from the Arabic footer.
 *
 * Add a slug here when an Arabic page for it ships. Keep it in step with
 * the directories under src/app/ar/ — a slug listed here with no page is a
 * broken link.
 */
export const AR_PAGE_SLUGS: ReadonlySet<string> = new Set([
    ...AR_ROUTES.keys(),
    "dammam-airport-to-bahrain-taxi-service",
    "dammam-airport-to-qatar-taxi-service",
]);
