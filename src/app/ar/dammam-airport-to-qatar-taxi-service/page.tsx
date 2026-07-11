import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { CheckCircleIcon, MapPinIcon, CarIcon, ClockIcon, ShieldIcon, MessageIcon, GlobeIcon } from "@/components/Icons";

export const metadata = generatePageMetadata({
  title: "تاكسي من مطار الدمام إلى قطر",
  description: "تاكسي مباشر من مطار الملك فهد الدولي (الدمام) إلى الدوحة عبر حدود سلوى / أبو سمرة. سائق واحد للرحلة كاملة. احجز الآن.",
  path: "/ar/dammam-airport-to-qatar-taxi-service",
  hreflangPath: "/dammam-airport-to-qatar-taxi-service",
});

const faqs = [
  { q: "هل يبقى السائق معي طوال الرحلة إلى الدوحة؟", a: "نعم. على عكس مسار جسر البحرين، سياراتنا وسائقونا مصرّح لهم بإكمال الرحلة كاملة من مطار الدمام حتى دخول قطر ووصولك إلى عنوانك في الدوحة." },
  { q: "هل أحتاج بطاقة حياة لهذه الرحلة؟", a: "بطاقة حياة مطلوبة فقط إذا كنت تحضر فعالية تصدر لها بطاقة حياة؛ بخلاف ذلك تكفي تأشيرة قطر العادية أو الهوية الوطنية الخليجية. تحقق من متطلبات الدخول الحالية قبل الحجز." },
  { q: "كم تستغرق الرحلة كاملة شاملة الحدود؟", a: "عادة 5–6 ساعات من الباب إلى الباب، شاملة الرحلة من مطار الدمام، وعبور حدود سلوى / أبو سمرة، والمسار الأخير إلى الدوحة." },
  { q: "هل هذا أرخص من الطيران بين الدمام والدوحة؟", a: "بالنسبة للمجموعات من شخصين أو أكثر، غالباً ما يكون التاكسي الخاص مماثلاً أو أرخص من تذاكر طيران متعددة، إضافة إلى تجنب التوقفات ونقل المطار الإضافي في الطرفين." },
  { q: "هل يمكن إنزالي في مطار حمد الدولي بدلاً من الفندق؟", a: "نعم، يمكننا توجيه نقطة النزول مباشرة إلى مطار حمد الدولي (DOH) إذا كانت لديك رحلة متابعة." },
];

const schemas = [
  serviceSchema({
    name: "تاكسي من مطار الدمام إلى قطر",
    description: "تاكسي مباشر من مطار الملك فهد الدولي إلى الدوحة عبر حدود سلوى / أبو سمرة.",
    url: "/ar/dammam-airport-to-qatar-taxi-service",
    areaServed: ["Dammam", "Qatar"],
  }),
  faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
  breadcrumbSchema([
    { name: "الرئيسية", path: "/ar" },
    { name: "عبور الحدود", path: "/ar/border-crossing" },
    { name: "مطار الدمام ← قطر", path: "/ar/dammam-airport-to-qatar-taxi-service" },
  ]),
];

export default function ArabicDammamToQatar() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />

      {/* Hero */}
      <section className="page-hero">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="section-eyebrow">نقل من المطار إلى الحدود</span>
          <h1>تاكسي من مطار الدمام إلى قطر</h1>
          <p>
            نقل بري مباشر من مطار الملك فهد الدولي في الدمام إلى الدوحة، قطر، عبر معبر سلوى (أبو سمرة).
            سيارة واحدة، سائق واحد، من الباب إلى الباب — دون الحاجة لتغيير وسيلة النقل في المنتصف.
          </p>
          <div className="breadcrumb">
            <Link href="/ar">الرئيسية</Link> / <Link href="/ar/border-crossing">عبور الحدود</Link> / <span>قطر</span>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section style={{ background: "linear-gradient(135deg, var(--accent-dark), var(--accent))", padding: "1.75rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-6)", justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--accent-on-light)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
              <MapPinIcon size={16} /> ~440 كم
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--accent-on-light)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
              <ClockIcon size={16} /> 5 – 6 ساعات (شامل الحدود)
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--accent-on-light)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
              <GlobeIcon size={16} /> حدود سلوى / أبو سمرة
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--accent-on-light)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
              <ShieldIcon size={16} /> خدمة على مدار الساعة
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-lg">
        <div className="container">
          <div className="grid-60-40">
            <div>
              <span className="section-eyebrow">نظرة عامة</span>
              <h2 className="section-title">رحلة متواصلة من مطار الدمام إلى الدوحة</h2>
              <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>
                الهبوط في مطار الملك فهد الدولي والمتابعة براً إلى قطر خيار شائع لرجال الأعمال وحضور الفعاليات والعائلات
                الذين يفضّلون رحلة خاصة مباشرة بدلاً من الرحلات المتصلة. يستقبلك سائقنا من صالة وصول مطار الدمام
                ويقود الطريق بالكامل حتى الدوحة في سيارة واحدة.
              </p>
              <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>
                يمر المسار جنوباً عبر الأحساء والهفوف قبل الوصول إلى حدود سلوى (أبو سمرة من الجانب القطري) — المعبر
                البري الوحيد بين البلدين، والذي تم تطويره بشكل كبير مؤخراً لاستيعاب أعداد كبيرة من المسافرين بكفاءة.
              </p>
              <p style={{ color: "var(--text-body)", lineHeight: 1.8 }}>
                بخلاف جسر البحرين، يمكن للمركبات السعودية المصرَّح لها إكمال الرحلة كاملة إلى داخل قطر، مما يعني أن
                سائقك يبقى معك من صالة وصول مطار الدمام حتى فندقك أو منزلك في الدوحة أو مطار حمد الدولي.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <div className="card">
                <div className="card-icon"><CarIcon size={22} /></div>
                <h3>تفاصيل الرحلة</h3>
                <p>المسافة: <strong style={{ color: "var(--accent)" }}>~440 كم</strong></p>
                <p>وقت الرحلة: <strong style={{ color: "var(--accent)" }}>5 – 6 ساعات</strong></p>
                <p>المعبر: <strong style={{ color: "var(--accent)" }}>سلوى / أبو سمرة</strong></p>
              </div>
              <div className="card">
                <div className="card-icon"><MapPinIcon size={22} /></div>
                <h3>نقاط الاستلام</h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
                  {["صالة وصول مطار الدمام (المبنى 1)", "فنادق مدينة الدمام", "حي الأعمال في الخبر", "الأحساء (توقف اختياري في الطريق)"].map((pt, i) => (
                    <li key={i} style={{ color: "var(--text-body)", fontSize: "var(--text-sm)", display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
                      <span style={{ color: "var(--accent)" }}>›</span> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Border process + documents */}
      <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
        <div className="container">
          <div className="grid-2">
            <div>
              <span className="section-eyebrow">إجراءات العبور</span>
              <h2 className="section-title">إجراءات عبور حدود سلوى / أبو سمرة</h2>
              <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-5)" }}>
                من مطار الدمام، تستغرق الرحلة إلى حدود سلوى حوالي 3.5–4 ساعات عبر طريق الأحساء. نخصص وقتاً للاستراحة
                في الطريق للرحلات الطويلة.
              </p>
              <p style={{ color: "var(--text-body)", lineHeight: 1.8 }}>
                عند نقطة الخروج السعودية، يخضع الركاب لإجراءات جوازات السفر وفحص جمركي عادي للمركبة. عند أبو سمرة من
                الجانب القطري، يقدّم المسافرون جواز سفر ساري مع بطاقة حياة (لحاملي تذاكر الفعاليات) أو تأشيرة قطر معتمدة
                لغير مواطني الخليج. يعبر مواطنو دول الخليج بالهوية الوطنية فقط.
              </p>
            </div>
            <div style={{ border: "1px solid var(--gray-200)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
              <div style={{ background: "var(--primary)", padding: "1.5rem", color: "var(--white)" }}>
                <h3 style={{ margin: 0, fontSize: "1.2rem" }}>قائمة الوثائق المطلوبة</h3>
              </div>
              <div style={{ padding: "2rem" }}>
                <ul style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {["جواز سفر ساري (6 أشهر على الأقل)", "بطاقة حياة أو تأشيرة دخول قطر سارية لغير مواطني الخليج", "الهوية الوطنية الخليجية للمواطنين", "تأكيد تفاصيل رحلة الوصول بمطار الدمام", "عنوان النزول في الدوحة أو تأكيد الفندق"].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", fontSize: "0.95rem", color: "var(--text-main)" }}>
                      <CheckCircleIcon size={18} style={{ color: "var(--secondary)", flexShrink: 0, marginTop: "2px" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section" style={{ background: "var(--bg-subtle)" }}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">الأسئلة الشائعة</span>
            <h2 className="section-title">مطار الدمام إلى قطر — أسئلة متكررة</h2>
          </div>
          <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {faqs.map((f, i) => (
              <div key={i} className="card" style={{ padding: "var(--space-6) var(--space-8)" }}>
                <h3 style={{ color: "var(--accent)", fontSize: "var(--text-base)", marginBottom: "var(--space-3)" }}>{f.q}</h3>
                <p style={{ color: "var(--text-body)", marginBottom: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section" style={{ background: "var(--bg-subtle)" }}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">اكتشف المزيد</span>
            <h2 className="section-title">رحلات ذات صلة</h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center" }}>
            <Link href="/ar/dammam-airport-to-bahrain-taxi-service" className="btn btn-outline-gold">مطار الدمام إلى البحرين</Link>
            <Link href="/ar/border-crossing" className="btn btn-outline-gold">جميع رحلات عبور الحدود</Link>
            <Link href="/qatar-to-riyadh-taxi-service" className="btn btn-outline-gold">Qatar to Riyadh Taxi</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, var(--bg-dark), var(--bg-base))", padding: "var(--space-20) 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ color: "var(--text-main)", fontSize: "var(--text-4xl)", margin: "var(--space-4) 0" }}>جاهز لحجز رحلتك إلى الدوحة؟</h2>
          <p style={{ color: "var(--text-body)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-8)" }}>
            أسعار ثابتة، سائقون محترفون، وخدمة على مدار الساعة من مطار الدمام إلى قطر.
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wa.me/966501234567" className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
              <MessageIcon size={18} /> تواصل عبر واتساب
            </a>
            <Link href="/book-online" className="btn btn-secondary btn-lg">احجز الآن</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
