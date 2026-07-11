import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { CheckCircleIcon, MapPinIcon, CarIcon, ShieldIcon, ClockIcon, MessageIcon } from "@/components/Icons";

export const metadata = generatePageMetadata({
  title: "خدمة عبور الحدود بالتاكسي | السعودية",
  description: "خدمة تاكسي موثوقة لعبور حدود السعودية البرية. رحلات عبر جسر الملك فهد والحدود مع الأردن والإمارات وقطر. سائقون مرخصون وخدمة احترافية.",
  path: "/ar/border-crossing",
  hreflangPath: "/border-crossing",
});

const borders = [
  {
    name: "جسر الملك فهد (البحرين)",
    route: "السعودية ↔ البحرين",
    distance: "~25 كم طول الجسر",
    note: "أكثر المعابر ازدحاماً. يتطلب تأشيرة خليجية سارية أو تأشيرة دخول للبحرين عند الوصول لبعض الجنسيات.",
    highlights: ["تأشيرة إلكترونية بحرينية لمعظم الجنسيات", "عبور سريع خلال 1–2 ساعة", "مفتوح على مدار الساعة", "منطقة سوق حرة عند المعبر"],
    href: "/ar/dammam-airport-to-bahrain-taxi-service",
  },
  {
    name: "أبو سمرة / سلوى (قطر)",
    route: "السعودية ↔ قطر (الدوحة)",
    distance: "~100 كم من الهفوف",
    note: "المعبر البري الرئيسي مع قطر، تم تطويره بشكل كبير لاستيعاب حركة المرور العالية.",
    highlights: ["دخول ببطاقة حياة أو تأشيرة", "معالجة سريعة للإجراءات", "طريق مباشر إلى الدوحة", "مفتوح على مدار الساعة"],
    href: "/ar/dammam-airport-to-qatar-taxi-service",
  },
  {
    name: "معبر الحديثة (الأردن)",
    route: "السعودية ↔ الأردن",
    distance: "~340 كم من تبوك",
    note: "معبر رئيسي لطرق الحج البري القادمة من الأردن. يتطلب التخطيط المسبق.",
    highlights: ["طريق حج بري شهير", "تأشيرة أردنية مطلوبة", "ساعات العمل تتفاوت", "قد تستغرق إجراءات الحدود وقتاً"],
    href: "/border-crossing",
  },
  {
    name: "البطحاء / الغويفات (الإمارات)",
    route: "السعودية ↔ الإمارات",
    distance: "~330 كم من اتجاه الرياض",
    note: "الطريق البري الرئيسي بين السعودية والإمارات. يعبر مواطنو دول الخليج بحرية.",
    highlights: ["عبور حر لمواطني الخليج", "تصريح دخول للآخرين", "طريق جيد الصيانة", "مفتوح على مدار الساعة"],
    href: "/border-crossing",
  },
];

const inclusions = [
  "أسطول مرخّص من وزارة النقل ومؤمَّن بالكامل",
  "سائقون ذوو خبرة في إجراءات المعابر الحدودية",
  "المساعدة في وثائق المركبة عند المعابر",
  "خيارات سيدان ودفع رباعي وحافلة لجميع أحجام المجموعات",
  "أسعار شفافة — احصل على عرض سعر مخصص",
  "تحديثات فورية عبر واتساب طوال الرحلة",
];

const schemas = [
  serviceSchema({
    name: "خدمة عبور الحدود بالتاكسي",
    description: "خدمة تاكسي موثوقة لعبور حدود السعودية البرية إلى البحرين وقطر والأردن والإمارات.",
    url: "/ar/border-crossing",
    areaServed: ["Saudi Arabia", "Bahrain", "Qatar"],
  }),
  breadcrumbSchema([
    { name: "الرئيسية", path: "/ar" },
    { name: "عبور الحدود", path: "/ar/border-crossing" },
  ]),
];

export default function ArabicBorderCrossing() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />

      {/* Hero */}
      <section className="page-hero">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="section-eyebrow">النقل عبر الحدود</span>
          <h1>خدمة عبور الحدود</h1>
          <p>
            رحلات نقل آمنة وموثوقة عبر حدود السعودية البرية. سائقون مرخّصون وتنسيق كامل للرحلة.
          </p>
          <div className="breadcrumb">
            <Link href="/ar">الرئيسية</Link> / <span>عبور الحدود</span>
          </div>
        </div>
      </section>

      {/* Trust banner */}
      <section style={{ background: "linear-gradient(135deg, var(--accent-dark), var(--accent))", padding: "1.75rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-6)", justifyContent: "center", alignItems: "center" }}>
            {["أسطول مرخّص ومؤمَّن", "مساعدة في الوثائق", "أسعار شفافة", "دعم على مدار الساعة"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--accent-on-light)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
                <ShieldIcon size={16} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-lg">
        <div className="container">
          <div className="grid-60-40">
            <div>
              <span className="section-eyebrow">النقل عبر الحدود</span>
              <h2 className="section-title">رحلات النقل البري عبر حدود السعودية</h2>
              <p style={{ color: "var(--text-body)", fontSize: "var(--text-lg)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>
                السفر براً عبر حدود السعودية — سواء للعمرة أو زيارة العائلة أو العمل أو السياحة — يتطلب تخطيطاً دقيقاً وشريك نقل موثوق.
              </p>
              <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-8)" }}>
                سائقونا لديهم خبرة في جميع المعابر الحدودية السعودية الرئيسية: جسر البحرين، الحدود الأردنية، الإمارات وقطر.
                ننسّق أوقات الاستلام، ونفهم إجراءات الحدود، ونضمن رحلة سلسة من الباب إلى الباب.
              </p>
              <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
                <a href="https://wa.me/966501234567" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  <MessageIcon size={18} /> اطلب عرض سعر
                </a>
                <Link href="/ar/contact-us" className="btn btn-secondary">اتصل بنا</Link>
              </div>
            </div>

            <div className="card">
              <h3 style={{ color: "var(--accent)", marginBottom: "var(--space-6)", fontSize: "var(--text-xl)" }}>
                <ShieldIcon size={22} style={{ display: "inline", marginInlineEnd: 8 }} />
                ما الذي يشمله؟
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                {inclusions.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
                    <CheckCircleIcon size={16} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Border routes */}
      <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">المعابر المتاحة</span>
            <h2 className="section-title">المعابر الحدودية السعودية التي نغطيها</h2>
            <p className="section-subtitle">
              نغطي جميع المعابر البرية السعودية الرئيسية. لكل معبر متطلبات تأشيرة ووثائق مختلفة — سيرشدك فريقنا خلال التفاصيل.
            </p>
          </div>

          <div className="grid-2">
            {borders.map((border, i) => (
              <div key={i} className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-4)" }}>
                  <div className="card-icon" style={{ flexShrink: 0 }}>
                    <MapPinIcon size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "var(--text-lg)", color: "var(--primary)", marginBottom: "var(--space-1)" }}>{border.name}</h3>
                    <span style={{ display: "inline-block", background: "var(--accent-subtle)", color: "var(--accent-dark)", fontWeight: 700, fontSize: "var(--text-xs)", padding: "3px 12px", borderRadius: "var(--radius-full)" }}>
                      {border.route}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>
                  <CarIcon size={14} />
                  {border.distance}
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.7, margin: 0 }}>{border.note}</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", marginBottom: "var(--space-6)" }}>
                  {border.highlights.map((h, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: "var(--text-xs)", color: "var(--text-body)" }}>
                      <CheckCircleIcon size={13} style={{ color: "var(--accent-dark)", flexShrink: 0 }} />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link href={border.href} className="btn btn-outline-gold btn-sm" style={{ alignSelf: "flex-start" }}>مزيد من التفاصيل</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important notice */}
      <section className="section-lg">
        <div className="container">
          <div style={{ background: "linear-gradient(145deg, var(--surface-1), var(--bg-tertiary))", border: "1px solid var(--accent-subtle)", borderInlineStart: "5px solid var(--accent-primary)", borderRadius: "var(--radius-xl)", padding: "var(--space-10)" }}>
            <h3 style={{ color: "var(--accent-primary)", marginBottom: "var(--space-4)", display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              <ClockIcon size={22} /> مهم قبل السفر
            </h3>
            <div className="grid-2" style={{ gap: "var(--space-8)" }}>
              <div>
                <h4 style={{ color: "var(--text-primary)", marginBottom: "var(--space-3)", fontSize: "var(--text-base)" }}>الوثائق المطلوبة</h4>
                <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                  {["جواز سفر ساري (6 أشهر على الأقل)", "إقامة سعودية سارية إن وجدت", "تأشيرة الدولة المقصودة (تحقق مسبقاً)", "استمارة تسجيل المركبة إن كنت تستخدم سيارتك"].map((d, i) => (
                    <li key={i} style={{ display: "flex", gap: "var(--space-2)", fontSize: "var(--text-sm)", color: "var(--text-body)", alignItems: "flex-start" }}>
                      <span style={{ color: "var(--accent-primary)", flexShrink: 0 }}>•</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ color: "var(--text-primary)", marginBottom: "var(--space-3)", fontSize: "var(--text-base)" }}>نصيحتنا</h4>
                <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                  {["تحقق من آخر تنبيهات السفر قبل الحجز", "خصص وقتاً إضافياً لإجراءات الحدود", "أخبرنا بأي متطلبات خاصة", "احجز قبل 48 ساعة على الأقل للرحلات الحدودية"].map((d, i) => (
                    <li key={i} style={{ display: "flex", gap: "var(--space-2)", fontSize: "var(--text-sm)", color: "var(--text-body)", alignItems: "flex-start" }}>
                      <span style={{ color: "var(--accent-primary)", flexShrink: 0 }}>•</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(140deg, var(--bg-primary) 0%, var(--bg-dark) 60%, var(--navy-light) 100%)", padding: "var(--space-20) 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ color: "var(--white)", fontSize: "var(--text-4xl)", marginBottom: "var(--space-4)" }}>هل تخطط لعبور الحدود؟</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-10)" }}>
            تواصل معنا الآن لنرتب لك رحلة النقل، ونقدم النصح حول الوثائق، ونضمن رحلة سلسة عبر الحدود.
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wa.me/966501234567" className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
              <MessageIcon size={18} /> تواصل عبر واتساب
            </a>
            <Link href="/quote" className="btn btn-outline btn-lg">احصل على عرض سعر</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
