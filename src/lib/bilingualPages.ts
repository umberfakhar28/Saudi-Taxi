/**
 * The only pages that currently exist in both English and Arabic.
 * Used by the language switcher (EN <-> AR) and by generatePageMetadata's
 * hreflangPath param. Keep in sync with src/app/ar/* — do not add an entry
 * here until the actual Arabic page route exists.
 */
export const BILINGUAL_PAGES: { en: string; ar: string; labelEn: string; labelAr: string }[] = [
  { en: "/", ar: "/ar", labelEn: "Home", labelAr: "الرئيسية" },
  { en: "/border-crossing", ar: "/ar/border-crossing", labelEn: "Border Crossing", labelAr: "عبور الحدود" },
  { en: "/dammam-airport-to-bahrain-taxi-service", ar: "/ar/dammam-airport-to-bahrain-taxi-service", labelEn: "Dammam Airport to Bahrain", labelAr: "مطار الدمام إلى البحرين" },
  { en: "/dammam-airport-to-qatar-taxi-service", ar: "/ar/dammam-airport-to-qatar-taxi-service", labelEn: "Dammam Airport to Qatar", labelAr: "مطار الدمام إلى قطر" },
  { en: "/contact-us", ar: "/ar/contact-us", labelEn: "Contact Us", labelAr: "اتصل بنا" },
  { en: "/book-online", ar: "/ar/book-online", labelEn: "Book Online", labelAr: "الحجز عبر الإنترنت" },
  { en: "/bahrain-to-dammam-taxi-service", ar: "/ar/bahrain-to-dammam-taxi-service", labelEn: "Bahrain to Dammam", labelAr: "البحرين إلى الدمام" },
  { en: "/riyadh-to-qatar-taxi-service", ar: "/ar/riyadh-to-qatar-taxi-service", labelEn: "Riyadh to Doha", labelAr: "الرياض إلى الدوحة" },
  { en: "/riyadh-to-kuwait-taxi-service", ar: "/ar/riyadh-to-kuwait-taxi-service", labelEn: "Riyadh to Kuwait", labelAr: "الرياض إلى الكويت" },
  { en: "/riyadh-to-bahrain-taxi-service", ar: "/ar/riyadh-to-bahrain-taxi-service", labelEn: "Riyadh to Bahrain", labelAr: "الرياض إلى البحرين" },
];

export function arabicPathFor(englishPath: string): string {
  const match = BILINGUAL_PAGES.find((p) => p.en === englishPath);
  return match ? match.ar : "/ar";
}

export function englishPathFor(arabicPath: string): string {
  const match = BILINGUAL_PAGES.find((p) => p.ar === arabicPath);
  return match ? match.en : "/";
}
