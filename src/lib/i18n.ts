/**
 * The strings the shared page components print, in both languages.
 *
 * Why this exists: the Arabic pages built so far are hand-written copies of
 * their English twins, with no connection to the data that drives the
 * English site. That is why only five of them exist, and why correcting a
 * fact (the cross-border wording, October 2026) meant editing the Arabic
 * page separately. With the labels here and the content in Arabic data
 * files, an Arabic route page becomes one data entry rendered by the same
 * component the English page uses.
 *
 * ENGLISH IS THE DEFAULT AND MUST NOT CHANGE: every component takes
 * `locale` optionally and falls back to 'en', and the English strings below
 * are copied verbatim from the markup they replace. A rendered English page
 * before and after this change is byte-for-byte identical.
 *
 * Arabic is Modern Standard, as used in Gulf travel and transport copy.
 */

export type Locale = 'en' | 'ar';

export interface UIStrings {
    // ── Navigation / breadcrumbs ──
    home: string;
    routes: string;
    bookOnline: string;
    travelGuide: string;

    // ── Route & airport page sections ──
    travelOverview: string;
    journeyDetails: string;
    distanceAndTime: string;
    howItWorks: string;
    pickupPoints: string;
    chooseYourRide: string;
    crossingProcess: string;
    requiredDocuments: string;
    stopsAlongTheWay: string;
    journeyBreaks: string;
    goodToKnow: string;
    practicalInfo: string;
    airportInfo: string;
    airport: string;
    borderCrossing: string;
    customerReviews: string;
    whatTravellersSay: string;
    relatedServices: string;
    relatedCities: string;
    relatedAirports: string;
    relatedHotels: string;
    relatedDestination: string;
    relatedRoutes: string;
    faqHeading: string;

    // ── Calls to action ──
    bookNow: string;
    requestQuote: string;
    whatsapp: string;

    // ── Quick booking form ──
    quickQuoteHeading: string;
    pickup: string;
    dropoff: string;
    pickupPlaceholder: string;
    dropoffPlaceholder: string;
    date: string;
    time: string;
    passengers: string;
    passenger: string;
    continueToBooking: string;
    orWhatsApp: string;

    // ── Book Online ──
    stepService: string;
    stepTrip: string;
    stepInfo: string;
    selectService: string;
    tripDetails: string;
    yourInformation: string;
    pickupLocation: string;
    dropoffLocation: string;
    travelDate: string;
    pickupTime: string;
    numberOfPassengers: string;
    luggage: string;
    luggageNotSure: string;
    bags: string;
    vehicle: string;
    vehicleOptional: string;
    noPreference: string;
    fullName: string;
    emailAddress: string;
    phoneWhatsApp: string;
    specialRequirements: string;
    specialRequirementsPlaceholder: string;
    back: string;
    nextTripDetails: string;
    nextYourInfo: string;
    confirmBooking: string;
    processing: string;
    fillRequired: string;
    bookingReceived: string;
    bookingReceivedBody: (name: string) => string;
    backToHome: string;
    sendDetailsWhatsApp: string;
    preferWhatsApp: string;
    bookViaWhatsApp: string;
    changeLabel: string;
    serviceLabel: string;
    bookingForLabel: string;
    changeVehicle: string;
    editTrip: string;
    route: string;
    when: string;
    returnLabel: string;
    verificationNeeded: string;
    errorRetry: string;

    // ── Route page body copy ──
    whatsIncluded: string;
    includedPrivateVehicle: string;
    includedLicensedDriver: string;
    includedDoorToDoor: string;
    includedCoordination: string;
    includedLuggage: string;
    includedBorderSupport: string;
    step1Label: string; step1Text: string;
    step2Label: string; step2Text: string;
    step3Label: string; step3Text: string;
    step4Label: string; step4Text: string;
    step5Label: string; step5Text: string;
    quickFormSubheading: string;
    travelTimeLabel: string;
    reverseRoutePrefix: string;
    reverseRouteSuffix: string;
    viewRoute: string;
    borderDisclaimer: string;
    vehicleOptionsFor: (from: string, to: string) => string;
    bookYourTransfer: (from: string, to: string) => string;
    whatsappQuote: string;
}

const en: UIStrings = {
    home: 'Home',
    routes: 'Routes',
    bookOnline: 'Book Online',
    travelGuide: 'Travel Guide',

    travelOverview: 'Travel Overview',
    journeyDetails: 'Journey Details',
    distanceAndTime: 'Distance & Travel Time',
    howItWorks: 'How It Works',
    pickupPoints: 'Pickup Points',
    chooseYourRide: 'Choose Your Ride',
    crossingProcess: 'Crossing Process',
    requiredDocuments: 'Required Documents Checklist',
    stopsAlongTheWay: 'Stops Along the Way',
    journeyBreaks: 'Journey Breaks',
    goodToKnow: 'Good to Know',
    practicalInfo: 'Practical Information for This Route',
    airportInfo: 'Airport Information for This Route',
    airport: 'Airport',
    borderCrossing: 'Border Crossing',
    customerReviews: 'Customer Reviews',
    whatTravellersSay: 'What Travelers Say About This Route',
    relatedServices: 'Related Services',
    relatedCities: 'Related Cities',
    relatedAirports: 'Related Airports',
    relatedHotels: 'Related Hotels',
    relatedDestination: 'Related Destination',
    relatedRoutes: 'Related Routes You May Need',
    faqHeading: 'Frequently Asked Questions',

    bookNow: 'Book Now',
    requestQuote: 'Request a Quote',
    whatsapp: 'WhatsApp',

    quickQuoteHeading: 'Get a Quick Quote',
    pickup: 'Pickup',
    dropoff: 'Drop-off',
    pickupPlaceholder: 'e.g. Jeddah Airport',
    dropoffPlaceholder: 'e.g. Makkah Hotel',
    date: 'Date',
    time: 'Time',
    passengers: 'Passengers',
    passenger: 'passenger',
    continueToBooking: 'Continue',
    orWhatsApp: 'WhatsApp',

    stepService: 'Select Service',
    stepTrip: 'Trip Details',
    stepInfo: 'Your Info',
    selectService: 'Select Your Service',
    tripDetails: 'Trip Details',
    yourInformation: 'Your Information',
    pickupLocation: 'Pickup Location *',
    dropoffLocation: 'Drop-off Location *',
    travelDate: 'Travel Date *',
    pickupTime: 'Pickup Time *',
    numberOfPassengers: 'Number of Passengers *',
    luggage: 'Luggage',
    luggageNotSure: 'Not sure yet',
    bags: 'bags',
    vehicle: 'Vehicle',
    vehicleOptional: '(optional)',
    noPreference: 'No preference',
    fullName: 'Full Name *',
    emailAddress: 'Email Address',
    phoneWhatsApp: 'Phone / WhatsApp *',
    specialRequirements: 'Special Requirements / Notes',
    specialRequirementsPlaceholder: 'Any special requests, wheelchair access, extra luggage, etc.',
    back: '← Back',
    nextTripDetails: 'Next: Trip Details →',
    nextYourInfo: 'Next: Your Info →',
    confirmBooking: 'Confirm Booking ✓',
    processing: 'Processing...',
    fillRequired: 'Please fill in all required fields before continuing.',
    bookingReceived: 'Booking Request Received!',
    bookingReceivedBody: (name: string) => `Thank you, ${name}! We'll confirm your booking within 30 minutes via WhatsApp or email.`,
    backToHome: 'Back to Home',
    sendDetailsWhatsApp: '💬 Send Details on WhatsApp',
    preferWhatsApp: 'Prefer to book instantly via WhatsApp?',
    bookViaWhatsApp: '💬 Book via WhatsApp',
    changeLabel: 'Change',
    serviceLabel: 'Service',
    bookingForLabel: 'Booking for',
    changeVehicle: 'Change vehicle',
    editTrip: 'Edit trip',
    route: 'Route',
    when: 'When',
    returnLabel: 'Return',
    verificationNeeded: 'Please complete the verification check and try again.',
    errorRetry: 'Your entered details are still here — please try again.',

    whatsIncluded: "What's Included",
    includedPrivateVehicle: 'Private vehicle, exclusively for your group',
    includedLicensedDriver: 'Professional, licensed driver',
    includedDoorToDoor: 'Door-to-door pickup and drop-off',
    includedCoordination: 'Route coordination and flight/schedule tracking',
    includedLuggage: 'Luggage assistance',
    includedBorderSupport: 'Border-crossing support and document guidance',
    step1Label: 'Request Your Route', step1Text: 'Share your pickup point, destination, date and passenger count.',
    step2Label: 'Confirm Trip Details', step2Text: 'We confirm vehicle, driver and route before you travel.',
    step3Label: 'Booking Confirmation', step3Text: 'You receive your driver and vehicle details ahead of pickup.',
    step4Label: 'Driver Pickup', step4Text: 'Your driver meets you at the agreed location, on time.',
    step5Label: 'Destination Drop-off', step5Text: 'A direct, private journey to your exact destination.',
    quickFormSubheading: 'Pickup and drop-off are already filled in — edit them if your trip is slightly different.',
    travelTimeLabel: 'Travel time',
    reverseRoutePrefix: 'Traveling the other way? See our',
    reverseRouteSuffix: 'taxi service.',
    viewRoute: 'View route',
    borderDisclaimer: 'Border and document requirements can change — always verify current entry requirements with the relevant embassy or border authority before you travel.',
    vehicleOptionsFor: (from: string, to: string) => `Vehicle Options for ${from} to ${to}`,
    bookYourTransfer: (from: string, to: string) => `Book Your ${from} to ${to} Transfer`,
    whatsappQuote: 'WhatsApp Quote',
};

const ar: UIStrings = {
    home: 'الرئيسية',
    routes: 'المسارات',
    bookOnline: 'الحجز عبر الإنترنت',
    travelGuide: 'دليل السفر',

    travelOverview: 'نظرة عامة على الرحلة',
    journeyDetails: 'تفاصيل الرحلة',
    distanceAndTime: 'المسافة ومدة الرحلة',
    howItWorks: 'كيف تتم الرحلة',
    pickupPoints: 'نقاط الانطلاق',
    chooseYourRide: 'اختر سيارتك',
    crossingProcess: 'إجراءات العبور',
    requiredDocuments: 'المستندات المطلوبة',
    stopsAlongTheWay: 'محطات على الطريق',
    journeyBreaks: 'استراحات الرحلة',
    goodToKnow: 'معلومات مفيدة',
    practicalInfo: 'معلومات عملية عن هذا المسار',
    airportInfo: 'معلومات المطار لهذا المسار',
    airport: 'المطار',
    borderCrossing: 'عبور الحدود',
    customerReviews: 'آراء العملاء',
    whatTravellersSay: 'ماذا يقول المسافرون عن هذا المسار',
    relatedServices: 'خدمات ذات صلة',
    relatedCities: 'مدن ذات صلة',
    relatedAirports: 'مطارات ذات صلة',
    relatedHotels: 'فنادق ذات صلة',
    relatedDestination: 'وجهة ذات صلة',
    relatedRoutes: 'مسارات قد تحتاجها',
    faqHeading: 'الأسئلة الشائعة',

    bookNow: 'احجز الآن',
    requestQuote: 'اطلب عرض سعر',
    whatsapp: 'واتساب',

    quickQuoteHeading: 'احصل على عرض سعر سريع',
    pickup: 'نقطة الانطلاق',
    dropoff: 'الوجهة',
    pickupPlaceholder: 'مثال: مطار جدة',
    dropoffPlaceholder: 'مثال: فندق في مكة',
    date: 'التاريخ',
    time: 'الوقت',
    passengers: 'عدد الركاب',
    passenger: 'راكب',
    continueToBooking: 'متابعة',
    orWhatsApp: 'واتساب',

    stepService: 'اختيار الخدمة',
    stepTrip: 'تفاصيل الرحلة',
    stepInfo: 'بياناتك',
    selectService: 'اختر الخدمة',
    tripDetails: 'تفاصيل الرحلة',
    yourInformation: 'بياناتك',
    pickupLocation: 'مكان الانطلاق *',
    dropoffLocation: 'مكان الوصول *',
    travelDate: 'تاريخ السفر *',
    pickupTime: 'وقت الانطلاق *',
    numberOfPassengers: 'عدد الركاب *',
    luggage: 'الأمتعة',
    luggageNotSure: 'غير محدد بعد',
    bags: 'حقائب',
    vehicle: 'السيارة',
    vehicleOptional: '(اختياري)',
    noPreference: 'لا يوجد تفضيل',
    fullName: 'الاسم الكامل *',
    emailAddress: 'البريد الإلكتروني',
    phoneWhatsApp: 'الهاتف / واتساب *',
    specialRequirements: 'طلبات خاصة أو ملاحظات',
    specialRequirementsPlaceholder: 'أي طلبات خاصة، مقعد أطفال، كرسي متحرك، أمتعة إضافية…',
    back: '→ رجوع',
    nextTripDetails: 'التالي: تفاصيل الرحلة ←',
    nextYourInfo: 'التالي: بياناتك ←',
    confirmBooking: 'تأكيد الحجز ✓',
    processing: 'جارٍ المعالجة...',
    fillRequired: 'يرجى تعبئة جميع الحقول المطلوبة قبل المتابعة.',
    bookingReceived: 'تم استلام طلب الحجز!',
    bookingReceivedBody: (name: string) => `شكراً لك${name ? ` يا ${name}` : ''}! سنؤكد حجزك خلال 30 دقيقة عبر واتساب أو البريد الإلكتروني.`,
    backToHome: 'العودة للرئيسية',
    sendDetailsWhatsApp: '💬 إرسال التفاصيل عبر واتساب',
    preferWhatsApp: 'تفضل الحجز مباشرة عبر واتساب؟',
    bookViaWhatsApp: '💬 احجز عبر واتساب',
    changeLabel: 'تغيير',
    serviceLabel: 'الخدمة',
    bookingForLabel: 'الحجز لـ',
    changeVehicle: 'تغيير السيارة',
    editTrip: 'تعديل الرحلة',
    route: 'المسار',
    when: 'الموعد',
    returnLabel: 'العودة',
    verificationNeeded: 'يرجى إكمال خطوة التحقق ثم المحاولة مرة أخرى.',
    errorRetry: 'بياناتك ما زالت محفوظة — يرجى المحاولة مرة أخرى.',

    whatsIncluded: 'ما الذي تشمله الخدمة',
    includedPrivateVehicle: 'سيارة خاصة لك ولمرافقيك وحدكم',
    includedLicensedDriver: 'سائق محترف ومرخّص',
    includedDoorToDoor: 'الاستقبال والتوصيل من باب إلى باب',
    includedCoordination: 'تنسيق الرحلة ومتابعة مواعيد الطيران',
    includedLuggage: 'المساعدة في الأمتعة',
    includedBorderSupport: 'المساندة في إجراءات العبور وإرشادات المستندات',
    step1Label: 'اطلب رحلتك', step1Text: 'أخبرنا بمكان الانطلاق والوجهة والتاريخ وعدد الركاب.',
    step2Label: 'تأكيد التفاصيل', step2Text: 'نؤكد السيارة والسائق والمسار قبل السفر.',
    step3Label: 'تأكيد الحجز', step3Text: 'تصلك بيانات السائق والسيارة قبل موعد الانطلاق.',
    step4Label: 'استقبال السائق', step4Text: 'يصل سائقك إلى المكان المتفق عليه في الوقت المحدد.',
    step5Label: 'التوصيل إلى الوجهة', step5Text: 'رحلة خاصة ومباشرة حتى عنوانك بالضبط.',
    quickFormSubheading: 'مكان الانطلاق والوجهة مُعبّأان مسبقاً — يمكنك تعديلهما إذا اختلفت رحلتك قليلاً.',
    travelTimeLabel: 'مدة الرحلة',
    reverseRoutePrefix: 'تسافر في الاتجاه المعاكس؟ اطّلع على خدمة',
    reverseRouteSuffix: '.',
    viewRoute: 'عرض المسار',
    borderDisclaimer: 'قد تتغير متطلبات العبور والمستندات — تأكد دائماً من متطلبات الدخول الحالية لدى السفارة المعنية أو الجهة الحدودية قبل السفر.',
    vehicleOptionsFor: (from: string, to: string) => `خيارات السيارات من ${from} إلى ${to}`,
    bookYourTransfer: (from: string, to: string) => `احجز رحلتك من ${from} إلى ${to}`,
    whatsappQuote: 'عرض سعر عبر واتساب',
};

const STRINGS: Record<Locale, UIStrings> = { en, ar };

/** Labels for a locale. Defaults to English, which is what every existing
 * call site gets without passing anything. */
export function ui(locale: Locale = 'en'): UIStrings {
    return STRINGS[locale] ?? en;
}

/** Service names as shown to customers, for the Book Online step-1 cards. */
export const SERVICE_LABELS_AR: Record<string, string> = {
    'airport-transfer': 'توصيل من وإلى المطار',
    'hotel-transfer': 'توصيل الفنادق',
    'private-taxi': 'سيارة خاصة',
    'umrah-package': 'باقة توصيل العمرة',
    'hourly-driver': 'سائق بالساعة',
    'corporate-transport': 'نقل الشركات',
    ziyarat: 'جولة الزيارات',
    'jeddah-tour': 'جولة مدينة جدة',
    'alula-tour': 'جولة العلا',
};
