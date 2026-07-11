import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { homeFaqsAr } from "@/lib/homeFaqs";
import { LandmarkIcon, PlaneIcon, CarIcon, HotelIcon, CompassIcon, CheckCircleIcon, GlobeIcon, MessageIcon } from "@/components/Icons";

export const metadata = generatePageMetadata({
  title: "تاكسي في السعودية | نقل العمرة والمطارات ودول الخليج",
  description: "خدمة تاكسي فاخرة في مكة وجدة والمدينة والرياض والدمام، بالإضافة إلى رحلات عبر الحدود إلى البحرين وقطر. أسعار ثابتة وخدمة على مدار الساعة.",
  path: "/ar",
  hreflangPath: "/",
});

const services = [
  { icon: <LandmarkIcon size={26} />, title: "تاكسي العمرة", desc: "مكة · المدينة · جدة — نقل مباشر بين الأماكن المقدسة." },
  { icon: <PlaneIcon size={26} />, title: "النقل من المطار", desc: "استقبال فوري من مطار جدة مع تتبع الرحلات ودون انتظار." },
  { icon: <CarIcon size={26} />, title: "جدة إلى مكة", desc: "أسرع طريقة للوصول إلى مكة من جدة، بسعر ثابت وسيارات فاخرة." },
  { icon: <HotelIcon size={26} />, title: "النقل من الفندق", desc: "نقل سلس من وإلى الفندق والحرم مع المساعدة في الأمتعة." },
  { icon: <CompassIcon size={26} />, title: "خدمات الزيارة", desc: "جولات مرشدة إلى المواقع التاريخية الإسلامية في مكة والمدينة." },
  { icon: <GlobeIcon size={26} />, title: "عبور الحدود", desc: "رحلات مباشرة إلى البحرين وقطر عبر الجسر والحدود البرية." },
];

const stats = [
  { number: "+15,000", label: "مسافر سعيد" },
  { number: "+10", label: "سنوات خبرة" },
  { number: "24/7", label: "متوفرون دائماً" },
  { number: "100%", label: "رضا العملاء" },
];

const whyUs = [
  "أسطول مرخّص من وزارة النقل — جميع المركبات مؤمَّنة بالكامل",
  "أسعار ثابتة معلنة مسبقاً — بدون رسوم مفاجئة",
  "سائقون يتحدثون العربية والإنجليزية والأردية",
  "تحديثات فورية عبر واتساب لكل حجز",
  "سيارات سيدان ودفع رباعي وحافلات صغيرة حديثة",
  "الدفع نقداً أو بالبطاقة أو إلكترونياً",
];

const homeSchemas = [
  faqSchema(homeFaqsAr),
  breadcrumbSchema([{ name: "الرئيسية", path: "/ar" }]),
];

export default function ArabicHome() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(homeSchemas) }} />

      {/* Hero */}
      <section className="page-hero">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="section-eyebrow">Gulf Trip Service</span>
          <h1>خدمة النقل الفاخرة الأكثر ثقة في السعودية</h1>
          <p>
            نقل من المطارات، سفر بين المدن، ورحلات العمرة والحج — في جميع أنحاء المملكة العربية السعودية.
            سائقون محترفون، أسعار ثابتة، بدون رسوم خفية. متوفرون على مدار الساعة.
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", marginTop: "var(--space-6)" }}>
            <Link href="/book-online" className="btn btn-primary btn-lg">احجز رحلتك</Link>
            <a href="https://wa.me/966501234567" className="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer">
              <MessageIcon size={18} /> تواصل عبر واتساب
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-dark" style={{ padding: "var(--space-16) 0" }}>
        <div className="container">
          <div className="grid-4" style={{ textAlign: "center" }}>
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="stat-number" style={{ color: "var(--accent)" }}>{stat.number}</div>
                <div className="stat-label" style={{ color: "rgba(255,255,255,0.65)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-lg">
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">خدماتنا</span>
            <h2 className="section-title">كل ما تحتاجه للتنقل في السعودية</h2>
          </div>
          <div className="grid-3">
            {services.map((s, i) => (
              <div key={i} className="card">
                <div className="card-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GCC cross-border section */}
      <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
        <div className="container">
          <div className="grid-60-40">
            <div>
              <span className="section-eyebrow">إلى ما هو أبعد من المدن المقدسة</span>
              <h2 className="section-title">رحلات إلى المنطقة الشرقية ودول الخليج</h2>
              <p style={{ color: "var(--text-body)", fontSize: "var(--text-lg)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>
                بالإضافة إلى مكة وجدة والمدينة، نقدّم رحلات يومية في المنطقة الشرقية — الدمام والخبر والظهران —
                ونربط المسافرين برّاً بدول الخليج المجاورة. نقل مباشر إلى البحرين عبر جسر الملك فهد وإلى قطر عبر حدود سلوى،
                مع استقبال من مطار الملك فهد الدولي في الدمام أو من أي مدينة سعودية.
              </p>
              <Link href="/ar/border-crossing" className="btn btn-secondary">استكشف رحلات عبور الحدود</Link>
            </div>
            <div className="card">
              <div className="card-icon"><GlobeIcon size={22} /></div>
              <h3>أشهر الرحلات الخليجية</h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginTop: "var(--space-3)" }}>
                <li><Link href="/ar/dammam-airport-to-bahrain-taxi-service" style={{ color: "var(--accent)", fontWeight: 600 }}>مطار الدمام ← البحرين</Link></li>
                <li><Link href="/ar/dammam-airport-to-qatar-taxi-service" style={{ color: "var(--accent)", fontWeight: 600 }}>مطار الدمام ← قطر</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section-lg">
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">لماذا نحن</span>
            <h2 className="section-title">لماذا يختارنا آلاف العملاء</h2>
          </div>
          <ul style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {whyUs.map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)", fontSize: "var(--text-base)", color: "var(--text-body)" }}>
                <CheckCircleIcon size={20} style={{ color: "var(--primary)", marginTop: "2px", flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: "var(--bg-subtle)" }}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">الأسئلة الشائعة</span>
            <h2 className="section-title">أسئلة متكررة</h2>
          </div>
          <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {homeFaqsAr.map((f, i) => (
              <div key={i} className="card" style={{ padding: "var(--space-6) var(--space-8)" }}>
                <h3 style={{ color: "var(--accent)", fontSize: "var(--text-base)", marginBottom: "var(--space-3)" }}>{f.question}</h3>
                <p style={{ color: "var(--text-body)", marginBottom: 0 }}>{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(140deg, var(--navy-dark) 0%, var(--navy) 60%, var(--navy-light) 100%)", padding: "var(--space-20) 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ color: "var(--white)", fontSize: "var(--text-4xl)", marginBottom: "var(--space-4)" }}>جاهز لحجز رحلتك؟</h2>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "var(--text-lg)", maxWidth: 580, margin: "0 auto var(--space-10)" }}>
            احجز خدمة تاكسي مريحة وموثوقة اليوم. متوفرون على مدار الساعة في مكة وجدة والمدينة والمنطقة الشرقية.
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book-online" className="btn btn-primary btn-lg">احجز الآن</Link>
            <Link href="/ar/contact-us" className="btn btn-outline btn-lg">اتصل بنا</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
