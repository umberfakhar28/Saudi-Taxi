import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { CheckCircleIcon, MapPinIcon, CarIcon, ClockIcon, ShieldIcon, MessageIcon, GlobeIcon } from "@/components/Icons";
import { WHATSAPP_URL, TEL_URL, PHONE_DISPLAY, waLink } from "@/lib/contact";

export const metadata = generatePageMetadata({
  title: "تاكسي من مطار الدمام إلى البحرين",
  description: "نقل مباشر بالتاكسي من مطار الملك فهد الدولي (الدمام) إلى البحرين عبر جسر الملك فهد. استقبال فوري وأسعار ثابتة. احجز الآن.",
  path: "/ar/dammam-airport-to-bahrain-taxi-service",
  hreflangPath: "/dammam-airport-to-bahrain-taxi-service",
});

const faqs = [
  { q: "هل يمكن للتاكسي أن يوصلني إلى المنامة مباشرة؟", a: "لا يمكن لسيارات الأجرة السعودية عبور الحدود إلى الأراضي البحرينية قانونياً. نوصلك إلى ساحة الجانب البحريني من جسر الملك فهد، ويمكننا ترتيب سائق بحريني مرخّص مسبقاً لمتابعة رحلتك بسلاسة." },
  { q: "هل أحتاج تأشيرة قبل الوصول إلى الجسر؟", a: "يمكن لمعظم الجنسيات الحصول على تأشيرة إلكترونية بحرينية مسبقاً أو تأشيرة عند الوصول عند نقطة التفتيش. ننصح بتأكيد طريقة التأشيرة قبل السفر بـ 48 ساعة." },
  { q: "كم يستغرق عبور الجسر نفسه؟", a: "يستغرق عبور الجسر البالغ طوله 25 كم حوالي 20–30 دقيقة، لكن إجمالي وقت العبور شاملاً إجراءات الجوازات والجمارك عادة ما يكون بين 45–75 دقيقة حسب الازدحام والتوقيت." },
  { q: "هل يمكنكم استقبالي في وصول متأخر بمطار الدمام؟", a: "نعم، نعمل على مدار الساعة طوال أيام الأسبوع. عبور الجسر ليلاً غالباً ما يكون أهدأ وأسرع من النهار." },
  { q: "ما هو أفضل وقت للعبور لتجنب الازدحام؟", a: "صباحات أيام الأسبوع (قبل الساعة العاشرة) والمساء المتأخر عادة ما تكون الأسرع. مساءات الخميس والجمعة تشهد أكثر ازدحام نهاية الأسبوع." },
];

const schemas = [
  serviceSchema({
    name: "تاكسي من مطار الدمام إلى البحرين",
    description: "نقل مباشر بالتاكسي من مطار الملك فهد الدولي إلى البحرين عبر جسر الملك فهد.",
    url: "/ar/dammam-airport-to-bahrain-taxi-service",
    areaServed: ["Dammam", "Bahrain"],
  }),
  faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
  breadcrumbSchema([
    { name: "الرئيسية", path: "/ar" },
    { name: "عبور الحدود", path: "/ar/border-crossing" },
    { name: "مطار الدمام ← البحرين", path: "/ar/dammam-airport-to-bahrain-taxi-service" },
  ]),
];

export default function ArabicDammamToBahrain() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />

      {/* Hero */}
      <section className="page-hero">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="section-eyebrow">نقل من المطار إلى الحدود</span>
          <h1>تاكسي من مطار الدمام إلى البحرين</h1>
          <p>
            نقل مباشر من مطار الملك فهد الدولي إلى جسر الملك فهد ثم إلى البحرين. استقبال فوري، أسعار ثابتة،
            وسائقون على دراية بأكثر معابر دول الخليج ازدحاماً.
          </p>
          <div className="breadcrumb">
            <Link href="/ar">الرئيسية</Link> / <Link href="/ar/border-crossing">عبور الحدود</Link> / <span>البحرين</span>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section style={{ background: "linear-gradient(135deg, var(--accent-dark), var(--accent))", padding: "1.75rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-6)", justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--accent-on-light)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
              <MapPinIcon size={16} /> ~65 كم
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--accent-on-light)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
              <ClockIcon size={16} /> 1 – 1.5 ساعة (شامل الجسر)
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--accent-on-light)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
              <GlobeIcon size={16} /> جسر الملك فهد
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
              <h2 className="section-title">أسرع طريقة من مطار الدمام إلى البحرين</h2>
              <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>
                الهبوط في مطار الملك فهد الدولي والتوجه مباشرة إلى البحرين من أكثر الرحلات شيوعاً في المنطقة الشرقية.
                يستقبلك سائقنا من صالة الوصول ويأخذك مباشرة إلى جسر الملك فهد — الجسر الممتد 25 كم بين السعودية والبحرين —
                متجنباً الحاجة للمرور عبر ازدحام مدينتي الدمام أو الخبر أولاً.
              </p>
              <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>
                يحتوي الجسر نفسه على نقطة تفتيش للجوازات والجمارك في منتصف الطريق تقريباً. سياراتنا مصرّح لها بعبور الجسر،
                وسائقونا يعرفون المسارات وأوقات الذروة والمتطلبات اللازمة لجعل عبورك أسرع ما يمكن.
              </p>
              <p style={{ color: "var(--text-body)", lineHeight: 1.8 }}>
                نظراً لأن سيارات الأجرة الخاصة لا تعبر إلى الأراضي البحرينية، نوصلك إلى نقطة الخروج السعودية / الدخول
                البحريني على الجسر، حيث — إذا طُلب مسبقاً — ننسّق مع سائق بحريني مرخّص لمتابعة رحلتك إلى المنامة أو فندقك بسلاسة.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <div className="card">
                <div className="card-icon"><CarIcon size={22} /></div>
                <h3>تفاصيل الرحلة</h3>
                <p>المسافة: <strong style={{ color: "var(--accent)" }}>~65 كم</strong></p>
                <p>وقت الرحلة: <strong style={{ color: "var(--accent)" }}>1 – 1.5 ساعة</strong></p>
                <p>المعبر: <strong style={{ color: "var(--accent)" }}>جسر الملك فهد</strong></p>
              </div>
              <div className="card">
                <div className="card-icon"><MapPinIcon size={22} /></div>
                <h3>نقاط الاستلام</h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
                  {["صالة وصول مطار الدمام (المبنى 1)", "فنادق مدينة الدمام", "فنادق كورنيش الخبر", "حي الأعمال في الظهران"].map((pt, i) => (
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
              <h2 className="section-title">إجراءات عبور جسر الملك فهد</h2>
              <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-5)" }}>
                بعد الهبوط في مطار الدمام، سيكون سائقك بانتظارك في صالة الوصول حاملاً لوحة باسمك. تستغرق الرحلة إلى نقطة دخول
                الجسر حوالي 45–55 دقيقة من المطار، غالباً عبر الطريق الساحلي بين الدمام والخبر.
              </p>
              <p style={{ color: "var(--text-body)", lineHeight: 1.8 }}>
                عند نقطة الخروج السعودية، يقدّم جميع الركاب جوازات السفر، ويقدّم مواطنو دول الخليج الهوية الوطنية.
                يتم فحص وثائق المركبة، وتُدفع رسوم عبور عند البوابة السعودية قبل الدخول إلى الجسر.
              </p>
            </div>
            <div style={{ border: "1px solid var(--gray-200)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
              <div style={{ background: "var(--primary)", padding: "1.5rem", color: "var(--white)" }}>
                <h3 style={{ margin: 0, fontSize: "1.2rem" }}>قائمة الوثائق المطلوبة</h3>
              </div>
              <div style={{ padding: "2rem" }}>
                <ul style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {["جواز سفر ساري (6 أشهر على الأقل)", "تأشيرة بحرينية إلكترونية أو التأكد من الأهلية للحصول عليها عند الوصول", "الهوية الوطنية الخليجية للمواطنين", "إقامة سعودية سارية للمقيمين", "تأكيد رحلة الوصول وعنوان الوجهة"].map((item, i) => (
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
            <h2 className="section-title">مطار الدمام إلى البحرين — أسئلة متكررة</h2>
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
            <Link href="/ar/dammam-airport-to-qatar-taxi-service" className="btn btn-outline-gold">مطار الدمام إلى قطر</Link>
            <Link href="/ar/border-crossing" className="btn btn-outline-gold">جميع رحلات عبور الحدود</Link>
            <Link href="/bahrain-to-dammam-taxi-service" className="btn btn-outline-gold">Bahrain to Dammam Taxi</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, var(--bg-dark), var(--bg-base))", padding: "var(--space-20) 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ color: "var(--text-main)", fontSize: "var(--text-4xl)", margin: "var(--space-4) 0" }}>جاهز للعبور إلى البحرين؟</h2>
          <p style={{ color: "var(--text-body)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-8)" }}>
            أسعار ثابتة، سائقون محترفون، وخدمة على مدار الساعة من مطار الدمام إلى البحرين.
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={WHATSAPP_URL} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
              <MessageIcon size={18} /> تواصل عبر واتساب
            </a>
            <Link href="/book-online" className="btn btn-secondary btn-lg">احجز الآن</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
