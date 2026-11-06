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
    processing: string;
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

    // -- Two-step booking form --
    stepYourTrip: string;
    continueToInfo: string;
    submitBookingRequest: string;
    getBackSoon: string;
    bookingRefLabel: string;
    bookingRefHint: string;
    fullNamePlaceholder: string;
    swapLocationsLabel: string;
    requiredFieldsNote: string;
    paymentTitle: string;
    paymentBody: string;
    errServiceRequired: string;
    errPickupRequired: string;
    errDropoffRequired: string;
    errDateRequired: string;
    errDatePast: string;
    errTimeRequired: string;
    errNameRequired: string;
    errPhoneRequired: string;
    errPhoneInvalid: string;
    errEmailInvalid: string;
    errSaveContact: string;
    errSaveBooking: string;
    errGeneric: string;

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

    // --- Kuwait route brief: hero CTA, journey strip, vehicles, pricing,
    // inclusions and checklist. ---
    whatsappLeadTitle: (from: string, to: string) => string;
    whatsappLeadPriced: (price: string, direction: string) => string;
    whatsappLeadQuote: string;
    glanceRoute: string;
    glanceDistance: string;
    glanceDuration: string;
    glanceBorder: string;
    glanceTransfer: string;
    glanceTransferValue: string;
    glanceNote: string;
    glanceNoteBorder: string;
    vehiclesHeading: (from: string, to: string) => string;
    vehiclesSubheading: string;
    passengersLabel: string;
    luggageLabel: string;
    luggageUnknown: string;
    bestForLabel: string;
    pricingHeading: (from: string, to: string) => string;
    pricingSubheading: string;
    pricingVehicleCol: string;
    pricingCapacityCol: string;
    pricingPriceCol: string;
    pricingBookCol: string;
    priceConfirmedOn: (date: string) => string;
    includedHeading: string;
    notIncludedHeading: string;
    checklistHeading: string;
    checklistSubheading: string;
    bookThisVehicle: string;
    photoComingSoon: string;
    ctaBlurb: (from: string, to: string) => string;
    ctaBlurbPriced: (price: string, direction: string, from: string, to: string) => string;
    ctaReminder: string;
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
    specialRequirementsPlaceholder: 'Flight number, child seat, extra stop, wheelchair access, meet-and-greet sign name, etc.',
    back: '← Back',
    processing: 'Processing...',
    bookingReceived: 'Booking Request Received!',
    bookingReceivedBody: (name: string) => `Thank you${name ? `, ${name}` : ''}! Our team will get back to you as soon as possible.`,
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

    // -- Two-step booking form --
    stepYourTrip: 'Your Trip',
    continueToInfo: 'Continue to Your Information →',
    submitBookingRequest: 'Submit Booking Request',
    getBackSoon: 'Our team will get back to you as soon as possible.',
    bookingRefLabel: 'Booking reference',
    bookingRefHint: 'Quote this reference when you contact us.',
    fullNamePlaceholder: 'Your full name',
    swapLocationsLabel: 'Swap pickup and drop-off locations',
    requiredFieldsNote: 'Fields marked * are required.',
    paymentTitle: 'Payment',
    // Wording carried verbatim from homeFaqs.ts / FaqsClient.tsx, the
    // approved source for how payment is described. Only the FAQ answer’s
    // leading "Yes." is dropped, since this is not answering a question.
    // No term is added, removed or reworded.
    paymentBody: 'Cash to your driver after drop-off, bank transfer after pickup, or card / payment link. An additional 15% VAT applies to card and payment-link payments, on top of the quoted fare — cash and bank transfer are charged at the quoted price. No advance payment is required.',
    errServiceRequired: 'Please choose a service.',
    errPickupRequired: 'Pickup location is required.',
    errDropoffRequired: 'Drop-off location is required.',
    errDateRequired: 'Travel date is required.',
    errDatePast: 'Please choose today or a later date.',
    errTimeRequired: 'Pickup time is required.',
    errNameRequired: 'Your name is required.',
    errPhoneRequired: 'A phone or WhatsApp number is required.',
    errPhoneInvalid: 'Please enter a valid phone number, including the country code.',
    errEmailInvalid: 'Please check your email address.',
    errSaveContact: 'Could not save your contact details.',
    errSaveBooking: 'Could not save your booking.',
    errGeneric: 'Something went wrong. Please try again.',
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
    // Leading space is part of the string: RoutePage no longer puts one
    // between the city names and this suffix, because in Arabic the suffix
    // is bare punctuation and the space left a floating period.
    reverseRouteSuffix: ' taxi service.',
    viewRoute: 'View route',
    borderDisclaimer: 'Border and document requirements can change — always verify current entry requirements with the relevant embassy or border authority before you travel.',
    vehicleOptionsFor: (from: string, to: string) => `Vehicle Options for ${from} to ${to}`,
    bookYourTransfer: (from: string, to: string) => `Book Your ${from} to ${to} Transfer`,
    whatsappQuote: 'WhatsApp Quote',

    whatsappLeadTitle: (from, to) => `Get a ${from} to ${to} quote on WhatsApp`,
    whatsappLeadPriced: (price, direction) =>
        `${price} ${direction}. Message us with your date and passenger count and we will confirm the vehicle and the final fare.`,
    whatsappLeadQuote: 'Message us with your travel date, passenger count and preferred vehicle, and we will confirm the fare before you book.',
    glanceRoute: 'Route',
    glanceDistance: 'Distance',
    glanceDuration: 'Journey time',
    glanceBorder: 'Border crossing',
    glanceTransfer: 'Transfer type',
    glanceTransferValue: 'Private, door to door',
    glanceNote: 'Distance and journey time are estimates. The exact duration depends on your pickup and drop-off points and on traffic.',
    glanceNoteBorder: 'Distance and journey time are estimates. The exact duration depends on your pickup and drop-off points, traffic, and how long border processing takes on the day.',
    vehiclesHeading: (from, to) => `Vehicles on the ${from} to ${to} route`,
    vehiclesSubheading: 'Both vehicles carry the same fare on this route. Choose on space and comfort.',
    passengersLabel: 'Passengers',
    luggageLabel: 'Luggage',
    luggageUnknown: 'Confirmed when you book',
    bestForLabel: 'Best for',
    pricingHeading: (from, to) => `${from} to ${to} fares`,
    pricingSubheading: 'One private vehicle, not a per-seat price.',
    pricingVehicleCol: 'Vehicle',
    pricingCapacityCol: 'Passengers',
    pricingPriceCol: 'Starting price',
    pricingBookCol: 'Book',
    priceConfirmedOn: (date) => `Fare confirmed ${date}. Message us to confirm the current price for your travel date.`,
    includedHeading: 'What your fare includes',
    notIncludedHeading: 'Not included',
    checklistHeading: 'Before you travel',
    checklistSubheading: 'Entry requirements differ by nationality, residency and purpose of travel, and they change. Confirm yours with the relevant embassy before you book.',
    bookThisVehicle: 'Book this vehicle',
    photoComingSoon: 'Photo coming soon',
    ctaBlurb: (from, to) => `Licensed drivers and a private vehicle for every ${from} to ${to} transfer, around the clock.`,
    ctaBlurbPriced: (price, direction, from, to) =>
        `${from} to ${to} ${direction} from ${price.replace(/^from /, '')}, in a private vehicle with a licensed driver.`,
    ctaReminder: 'Send us your travel date, pickup and drop-off points, passenger count and preferred vehicle, and we will confirm the fare.',
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
    specialRequirementsPlaceholder: 'رقم الرحلة، مقعد أطفال، محطة إضافية، كرسي متحرك، الاسم على لوحة الاستقبال…',
    back: '→ رجوع',
    processing: 'جارٍ المعالجة...',
    bookingReceived: 'تم استلام طلب الحجز!',
    bookingReceivedBody: (name: string) => `شكراً لك${name ? ` يا ${name}` : ''}! سيتواصل معك فريقنا في أقرب وقت ممكن.`,
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

    // -- Two-step booking form -- (pending native Arabic review)
    stepYourTrip: 'رحلتك',
    continueToInfo: 'متابعة إلى بياناتك →',
    submitBookingRequest: 'إرسال طلب الحجز',
    getBackSoon: 'سيتواصل معك فريقنا في أقرب وقت ممكن.',
    bookingRefLabel: 'رقم الطلب',
    bookingRefHint: 'يرجى ذكر هذا الرقم عند التواصل معنا.',
    fullNamePlaceholder: 'الاسم الكامل',
    swapLocationsLabel: 'تبديل مكان الانطلاق والوجهة',
    requiredFieldsNote: 'الحقول المعلَّمة بـ * مطلوبة.',
    paymentTitle: 'الدفع',
    // The approved English wording, translated without changing a term:
    // the three methods, 15% VAT on card and payment link only, and no
    // advance payment.
    paymentBody: 'نقداً للسائق بعد الوصول، أو حوالة بنكية بعد الانطلاق، أو بالبطاقة عبر رابط دفع. تُضاف ضريبة قيمة مضافة 15% على الدفع بالبطاقة ورابط الدفع، فوق السعر المتفق عليه — أما النقد والحوالة البنكية فيكونان بالسعر المتفق عليه. لا يلزم أي دفع مُقدَّم.',
    errServiceRequired: 'يرجى اختيار الخدمة.',
    errPickupRequired: 'مكان الانطلاق مطلوب.',
    errDropoffRequired: 'مكان الوصول مطلوب.',
    errDateRequired: 'تاريخ السفر مطلوب.',
    errDatePast: 'يرجى اختيار تاريخ اليوم أو تاريخ لاحق.',
    errTimeRequired: 'وقت الانطلاق مطلوب.',
    errNameRequired: 'الاسم مطلوب.',
    errPhoneRequired: 'رقم الجوال أو واتساب مطلوب.',
    errPhoneInvalid: 'يرجى إدخال رقم جوال صحيح مع رمز الدولة.',
    errEmailInvalid: 'يرجى التأكد من البريد الإلكتروني.',
    errSaveContact: 'لم نتمكن من حفظ بيانات التواصل.',
    errSaveBooking: 'لم نتمكن من حفظ الحجز.',
    errGeneric: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
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
    // The label that follows is "<origin> إلى <destination>", so the prefix
    // needs "من" to read as Arabic rather than as a bare noun phrase:
    // "اطّلع على خدمة النقل الخاص من البحرين إلى الرياض." Matches the
    // "من X إلى Y" pattern used by vehicleOptionsFor and bookYourTransfer
    // below. Pending native review.
    reverseRoutePrefix: 'تسافر في الاتجاه المعاكس؟ اطّلع على خدمة النقل الخاص من',
    reverseRouteSuffix: '.',
    viewRoute: 'عرض المسار',
    borderDisclaimer: 'قد تتغير متطلبات العبور والمستندات — تأكد دائماً من متطلبات الدخول الحالية لدى السفارة المعنية أو الجهة الحدودية قبل السفر.',
    vehicleOptionsFor: (from: string, to: string) => `خيارات السيارات من ${from} إلى ${to}`,
    bookYourTransfer: (from: string, to: string) => `احجز رحلتك من ${from} إلى ${to}`,
    whatsappQuote: 'عرض سعر عبر واتساب',

    whatsappLeadTitle: (from, to) => `احصل على عرض سعر من ${from} إلى ${to} عبر واتساب`,
    whatsappLeadPriced: (price, direction) =>
        `${price} ${direction}. أرسل لنا تاريخ السفر وعدد الركاب وسنؤكد السيارة والسعر النهائي.`,
    whatsappLeadQuote: 'أرسل لنا تاريخ السفر وعدد الركاب والسيارة المفضلة، وسنؤكد السعر قبل الحجز.',
    glanceRoute: 'المسار',
    glanceDistance: 'المسافة',
    glanceDuration: 'مدة الرحلة',
    glanceBorder: 'المعبر الحدودي',
    glanceTransfer: 'نوع التوصيل',
    glanceTransferValue: 'خاص، من الباب إلى الباب',
    glanceNote: 'المسافة ومدة الرحلة تقديرية. تعتمد المدة الفعلية على نقاط الانطلاق والوصول وعلى حركة المرور.',
    glanceNoteBorder: 'المسافة ومدة الرحلة تقديرية. تعتمد المدة الفعلية على نقاط الانطلاق والوصول، وحركة المرور، ومدة إجراءات الحدود في يوم السفر.',
    vehiclesHeading: (from, to) => `السيارات على مسار ${from} إلى ${to}`,
    vehiclesSubheading: 'السيارتان بنفس السعر على هذا المسار. اختر حسب المساحة والراحة.',
    passengersLabel: 'الركاب',
    luggageLabel: 'الأمتعة',
    luggageUnknown: 'يُؤكد عند الحجز',
    bestForLabel: 'الأنسب لـ',
    pricingHeading: (from, to) => `أسعار ${from} إلى ${to}`,
    pricingSubheading: 'السعر للسيارة الخاصة كاملة، وليس لكل مقعد.',
    pricingVehicleCol: 'السيارة',
    pricingCapacityCol: 'الركاب',
    pricingPriceCol: 'السعر يبدأ من',
    pricingBookCol: 'الحجز',
    priceConfirmedOn: (date) => `تم تأكيد السعر في ${date}. راسلنا لتأكيد السعر الحالي لتاريخ سفرك.`,
    includedHeading: 'ما يشمله السعر',
    notIncludedHeading: 'غير شامل',
    checklistHeading: 'قبل السفر',
    checklistSubheading: 'تختلف متطلبات الدخول حسب الجنسية والإقامة وغرض السفر، وهي عرضة للتغيير. تأكد من متطلباتك مع السفارة المعنية قبل الحجز.',
    bookThisVehicle: 'احجز هذه السيارة',
    photoComingSoon: 'الصورة قريباً',
    ctaBlurb: (from, to) => `سائقون مرخصون وسيارة خاصة لكل رحلة من ${from} إلى ${to}، على مدار الساعة.`,
    ctaBlurbPriced: (price, direction, from, to) =>
        `من ${from} إلى ${to} ${direction} ابتداءً من ${price.replace(/^from /, '')}، في سيارة خاصة مع سائق مرخص.`,
    ctaReminder: 'أرسل لنا تاريخ السفر ونقاط الانطلاق والوصول وعدد الركاب والسيارة المفضلة، وسنؤكد السعر.',
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

/**
 * Turns an error code from /api/bookings/create or /api/customers/upsert
 * into a sentence the customer should read.
 *
 * Those endpoints used to return English sentences, which the Arabic
 * booking page then displayed verbatim. They now return stable codes and
 * the wording lives here, so both languages get their own message from the
 * same API response. An unrecognised code falls back to the generic
 * message rather than leaking a raw code into the page.
 */
export function bookingErrorMessage(code: unknown, t: UIStrings): string {
    switch (typeof code === 'string' ? code : '') {
        case 'invalid_service': return t.errServiceRequired;
        case 'name_required':
        case 'name_too_long': return t.errNameRequired;
        case 'phone_required': return t.errPhoneRequired;
        case 'phone_invalid': return t.errPhoneInvalid;
        case 'email_invalid': return t.errEmailInvalid;
        case 'pickup_required':
        case 'pickup_too_long': return t.errPickupRequired;
        case 'dropoff_required':
        case 'dropoff_too_long': return t.errDropoffRequired;
        case 'date_required':
        case 'date_invalid': return t.errDateRequired;
        case 'date_past': return t.errDatePast;
        case 'time_required':
        case 'time_invalid': return t.errTimeRequired;
        case 'save_failed': return t.errSaveBooking;
        default: return t.errGeneric;
    }
}
