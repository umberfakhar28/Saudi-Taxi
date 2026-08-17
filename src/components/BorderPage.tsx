import Link from "next/link";
import Image from "next/image";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { WhatsAppIcon, CheckCircleIcon, MapPinIcon, ShieldIcon } from "@/components/Icons";
import { waLink } from "@/lib/contact";
import { FLEET_TIERS } from "@/lib/fleetConfig";
import { destinationsByCountry, type CountrySlug } from "@/lib/destinationData";
import styles from "./BorderPage.module.css";

/**
 * Shared template for the Border / Cross-Border country-level page family
 * (Phase 10 standardization pass): /saudi-arabia-to-bahrain-taxi-service,
 * -to-qatar-taxi-service, -to-uae-taxi-service, -to-jordan-land-transfer.
 * These are distinct from the cross-border Route-family pages (e.g.
 * /dammam-airport-to-bahrain-taxi-service, already standardized in Phase 2)
 * — this family covers the country-level journey ("from anywhere in Saudi
 * Arabia"), those cover one specific city/airport-pair leg. /border-crossing
 * itself stays a hand-authored directory/hub page, same role as /routes or
 * /destinations, not migrated onto this per-journey template.
 *
 * Visa/entry-requirement content is always framed as guidance to verify,
 * never asserted as settled fact — requirements vary by nationality and
 * change over time, and this business has no immigration authority.
 */

export interface BorderData {
  slug: string;
  title: string;
  h1: string;
  breadcrumbLabel: string;
  intro: string;

  originCountry: string;
  destinationCountry: string;
  /** Slug into destinationData's CountrySlug — only set when the Destination
   * family (Phase 7) genuinely covers this country, so destinationLinks can
   * be computed rather than hand-listed. */
  destinationCountrySlug?: CountrySlug;
  borderCrossingName: string;

  overviewTitle: string;
  overviewParagraphs: string[];

  quickFacts: { label: string; value: string }[];
  audience: { icon: string; title: string; description: string }[];
  included: string[];
  process?: { title: string; description: string }[];

  cityLinks?: { href: string; label: string }[];
  airportLinks?: { href: string; label: string }[];
  routeLinks?: { href: string; label: string }[];
  hotelLink?: { href: string; label: string };
  /** Real, named Hotel-family pages (e.g. /hotels/riyadh/the-ritz-carlton-riyadh)
   * genuinely relevant to this journey's Saudi side — separate from the
   * generic hotelLink above (Phase 14). Only set where a real page exists. */
  specificHotelLinks?: { href: string; label: string }[];

  /** Always shown, always hedged — "verify before you travel," never a
   * definitive visa/entry rule stated as fact. */
  travelPreparation: { title: string; note: string }[];

  faqs: { q: string; a: string }[];
  reviews?: { name: string; origin: string; text: string }[];

  relatedServices: { href: string; label: string }[];
  ctaText: string;
}

/** Universal cross-border journey patterns — apply to every Saudi-to-Gulf
 * crossing this business genuinely offers, so this is one shared, computed
 * list rather than 4 near-identical hand-written copies (Phase 14). */
function travelScenariosFor(data: BorderData) {
  return [
    { icon: "✈️", title: "Airport Arrival", description: `Landing in Saudi Arabia and continuing straight on to ${data.destinationCountry} by road, with your driver handling the ${data.borderCrossingName} crossing.` },
    { icon: "🏨", title: "Hotel to Border", description: `Pickup from your Saudi hotel, direct to the ${data.borderCrossingName}, with the same private vehicle for the whole trip.` },
    { icon: "🏙️", title: "City to City", description: `Direct travel between a Saudi city and a ${data.destinationCountry} destination, without separate legs to arrange.` },
    { icon: "💼", title: "Business Travel", description: `Meetings on either side of the border, with a driver who can wait or return on your schedule.` },
    { icon: "👨‍👩‍👧‍👦", title: "Family & Group Travel", description: `A private vehicle sized to your group for the full journey, rather than separate cars on each side.` },
    { icon: "🔁", title: "Return Journey", description: `The same crossing in reverse — ${data.destinationCountry} back to your Saudi city or airport.` },
  ];
}

export default function BorderPage({ data }: { data: BorderData }) {
  const quoteMessage = `Hello GulfTripService, I would like to get a quote for private transportation from Saudi Arabia to ${data.destinationCountry}. Please share the available options and booking details. Thank you.`;
  const destinations = data.destinationCountrySlug ? destinationsByCountry(data.destinationCountrySlug) : [];
  const primaryCity = data.cityLinks?.[0];
  const primaryAirport = data.airportLinks?.[0];
  const primaryRoute = data.routeLinks?.[0];
  const scenarios = travelScenariosFor(data);

  const schemas = [
    serviceSchema({
      name: data.title,
      description: data.intro,
      url: `/${data.slug}`,
      areaServed: [data.originCountry, data.destinationCountry],
    }),
    faqSchema(data.faqs.map((f) => ({ question: f.q, answer: f.a }))),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Border Crossing", path: "/border-crossing" },
      { name: data.breadcrumbLabel, path: `/${data.slug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main>
        <section className="page-hero">
          <h1>{data.h1}</h1>
          <p>{data.intro}</p>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/border-crossing">Border Crossing</Link> / <span>{data.breadcrumbLabel}</span>
          </div>
        </section>

        {/* Quick Facts strip */}
        <section className={styles.quickFacts}>
          <div className="container">
            <div className={styles.factRow}>
              {data.quickFacts.map((f) => (
                <div key={f.label} className={styles.factItem}>
                  <span className={styles.factLabel}>{f.label}</span>
                  <span className={styles.factValue}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="section-lg">
          <div className="container" style={{ maxWidth: 850 }}>
            <span className="section-eyebrow">Overview</span>
            <h2 className="section-title">{data.overviewTitle}</h2>
            {data.overviewParagraphs.map((p, i) => (
              <p key={i} style={{ color: "var(--text-body)", lineHeight: 1.8, marginTop: "var(--space-4)" }}>{p}</p>
            ))}
            {(primaryCity || primaryAirport || primaryRoute) && (
              <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginTop: "var(--space-4)" }}>
                {primaryAirport && (
                  <>
                    Travelers arriving at{" "}
                    <Link href={primaryAirport.href} style={{ color: "var(--accent)", fontWeight: 600 }}>{primaryAirport.label}</Link>{" "}
                    can arrange a private transfer straight to the {data.borderCrossingName}.{" "}
                  </>
                )}
                {primaryCity && (
                  <>
                    Pickup is also available from{" "}
                    <Link href={primaryCity.href} style={{ color: "var(--accent)", fontWeight: 600 }}>{primaryCity.label}</Link>.{" "}
                  </>
                )}
                {primaryRoute && (
                  <>
                    For the most direct leg of this journey, see our{" "}
                    <Link href={primaryRoute.href} style={{ color: "var(--accent)", fontWeight: 600 }}>{primaryRoute.label}</Link>{" "}
                    route.
                  </>
                )}
              </p>
            )}
          </div>
        </section>

        {/* Border Crossing Overview — a key authority section (Phase 14);
            never claims control over immigration, customs or admission. */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container" style={{ maxWidth: 780, textAlign: "center" }}>
            <span className="section-eyebrow">Border Crossing</span>
            <h2 className="section-title">{data.borderCrossingName}</h2>
            <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginTop: "var(--space-4)" }}>
              The {data.borderCrossingName} is the land crossing this journey uses between {data.originCountry} and {data.destinationCountry}. Our role is the transportation on both sides of the crossing and the drive itself — immigration, customs and entry decisions remain entirely with the border authorities, not with us.
            </p>
          </div>
        </section>

        {/* Journey Flow — a simple, honest visual of the trip stages. */}
        <section className="section-lg">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Journey Flow</span>
              <h2 className="section-title">What to Expect</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "var(--space-6)" }}>
              {[
                { label: "Pickup", text: "Your home, hotel or airport in " + data.originCountry },
                { label: primaryCity ? primaryCity.label : data.originCountry, text: "Private drive toward the border" },
                { label: data.borderCrossingName, text: "Exit formalities on the " + data.originCountry + " side" },
                { label: "Entry Procedures", text: "Passport and document checks on the " + data.destinationCountry + " side" },
                { label: "Destination", text: "Onward into " + data.destinationCountry },
              ].map((step, i) => (
                <div key={step.label} style={{ textAlign: "center" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%", background: "var(--accent-subtle)", color: "var(--accent-primary)",
                    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto var(--space-4)",
                    fontWeight: 800, fontSize: "var(--text-xl)", fontFamily: "var(--font-heading)", border: "1px solid rgba(12,32,122,0.18)",
                  }}>{i + 1}</div>
                  <h3 style={{ fontSize: "var(--text-sm)", marginBottom: "var(--space-2)" }}>{step.label}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)", lineHeight: 1.6 }}>{step.text}</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-8)" }}>
              Crossing times vary with traffic, time of day and border conditions — we don&apos;t guarantee a fixed duration for any stage.
            </p>
          </div>
        </section>

        {/* Who It's For */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Who It&apos;s For</span>
              <h2 className="section-title">Who Books This Journey?</h2>
            </div>
            <div className="grid-3">
              {data.audience.map((a) => (
                <div key={a.title} className="card" style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2.2rem", marginBottom: "var(--space-3)" }}>{a.icon}</div>
                  <h3 style={{ fontSize: "var(--text-base)" }}>{a.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Travel Scenarios — distinct from "Who It's For": specific
            journey patterns rather than traveler types (Phase 14). */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Travel Scenarios</span>
              <h2 className="section-title">Common Ways This Journey Is Booked</h2>
            </div>
            <div className="grid-3">
              {scenarios.map((s) => (
                <div key={s.title} className="card" style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2.2rem", marginBottom: "var(--space-3)" }}>{s.icon}</div>
                  <h3 style={{ fontSize: "var(--text-base)" }}>{s.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">What&apos;s Included</span>
              <h2 className="section-title">Every {data.destinationCountry} Transfer Includes</h2>
            </div>
            <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {data.included.map((item) => (
                <div key={item} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
                  <CheckCircleIcon size={20} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: "var(--text-body)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        {data.process && data.process.length > 0 && (
          <section className="section" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">How It Works</span>
                <h2 className="section-title">Booking Your {data.destinationCountry} Transfer</h2>
              </div>
              <div className="grid-4">
                {data.process.map((step, i) => (
                  <div key={step.title} style={{ textAlign: "center" }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: "50%", background: "var(--accent-subtle)", color: "var(--accent-primary)",
                      display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto var(--space-4)",
                      fontWeight: 800, fontSize: "var(--text-xl)", fontFamily: "var(--font-heading)", border: "1px solid rgba(12,32,122,0.18)",
                    }}>{i + 1}</div>
                    <h3 style={{ fontSize: "var(--text-base)", marginBottom: "var(--space-2)" }}>{step.title}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Vehicle Options */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Fleet</span>
              <h2 className="section-title">Vehicle Options for This Journey</h2>
            </div>
            <div className="grid-4">
              {FLEET_TIERS.map((tier) => (
                <div key={tier.id} className="card" style={{ textAlign: "center", padding: 0, overflow: "hidden" }}>
                  <div style={{ position: "relative", width: "100%", height: 160 }}>
                    <Image
                      src={tier.image}
                      alt={`${tier.name} — ${tier.models}`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div style={{ padding: "var(--space-6)" }}>
                    <h3 style={{ fontSize: "var(--text-lg)" }}>{tier.name}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)", marginBottom: "var(--space-2)" }}>{tier.models}</p>
                    <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "var(--text-sm)", marginBottom: "var(--space-2)" }}>
                      Up to {tier.maxPassengers} passengers · {tier.maxLuggage} bags
                    </p>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{tier.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Origin connections — City / Airport / Route / Hotel, all on the
            Saudi side of the journey. Explicitly framed as "Origin" (Phase
            18) rather than an unlabeled generic link grid. */}
        {((data.cityLinks && data.cityLinks.length > 0) || (data.airportLinks && data.airportLinks.length > 0) || (data.routeLinks && data.routeLinks.length > 0) || data.hotelLink || (data.specificHotelLinks && data.specificHotelLinks.length > 0)) && (
          <section className="section" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Origin</span>
                <h2 className="section-title">Departing From {data.originCountry}</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-10)" }}>
                {data.cityLinks && data.cityLinks.length > 0 && (
                  <div>
                    <h3 style={{ marginBottom: "var(--space-4)" }}>Departure Cities</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                      {data.cityLinks.map((l) => (
                        <Link key={l.href} href={l.href} className="btn btn-outline-gold btn-sm">{l.label}</Link>
                      ))}
                    </div>
                  </div>
                )}
                {data.airportLinks && data.airportLinks.length > 0 && (
                  <div>
                    <h3 style={{ marginBottom: "var(--space-4)" }}>Airport Connections</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                      {data.airportLinks.map((l) => (
                        <Link key={l.href} href={l.href} className="btn btn-outline-gold btn-sm">{l.label}</Link>
                      ))}
                    </div>
                  </div>
                )}
                {data.routeLinks && data.routeLinks.length > 0 && (
                  <div>
                    <h3 style={{ marginBottom: "var(--space-4)" }}>Specific Routes</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                      {data.routeLinks.map((l) => (
                        <Link key={l.href} href={l.href} className="btn btn-outline-gold btn-sm">{l.label}</Link>
                      ))}
                    </div>
                  </div>
                )}
                {(data.hotelLink || (data.specificHotelLinks && data.specificHotelLinks.length > 0)) && (
                  <div>
                    <h3 style={{ marginBottom: "var(--space-4)" }}>Hotel Connections</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                      {data.specificHotelLinks?.map((l) => (
                        <Link key={l.href} href={l.href} className="btn btn-outline-gold btn-sm">{l.label}</Link>
                      ))}
                      {data.hotelLink && (
                        <Link href={data.hotelLink.href} className="btn btn-outline-gold btn-sm">{data.hotelLink.label}</Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Destination connections — computed from the real Destination
            family (Phase 7), never hand-listed. Explicitly framed as
            "Destination" (Phase 18), the counterpart to the Origin section
            above. */}
        {destinations.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Destination</span>
                <h2 className="section-title">Arriving in {data.destinationCountry}</h2>
                <p className="section-subtitle">Where you can go once you&apos;re across the border.</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", justifyContent: "center" }}>
                {destinations.map((d) => (
                  <Link key={d.slug} href={d.href} className="btn btn-outline-gold">
                    <MapPinIcon size={14} /> {d.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Travel Preparation — always hedged, never a settled visa fact. */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Before You Travel</span>
              <h2 className="section-title">Travel Preparation</h2>
            </div>
            <div className="grid-3">
              {data.travelPreparation.map((item) => (
                <div key={item.title} className="card">
                  <div className="card-icon"><ShieldIcon size={22} /></div>
                  <h3 style={{ fontSize: "var(--text-base)" }}>{item.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.7 }}>{item.note}</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-8)", maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
              Visa and entry requirements vary by nationality and can change without notice — always confirm current requirements with the relevant embassy or an official government source before you travel. We are a transportation provider, not an immigration authority.
            </p>
          </div>
        </section>

        {/* Reviews */}
        {data.reviews && data.reviews.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Customer Reviews</span>
                <h2 className="section-title">What Travelers Say</h2>
              </div>
              <div className={styles.reviewGrid}>
                {data.reviews.map((r, i) => (
                  <div key={i} className="card">
                    <div style={{ display: "flex", gap: "var(--space-1)", marginBottom: "var(--space-3)", color: "var(--accent)" }}>★★★★★</div>
                    <p style={{ color: "var(--text-body)", fontStyle: "italic", lineHeight: 1.75, marginBottom: "var(--space-4)" }}>&ldquo;{r.text}&rdquo;</p>
                    <p style={{ color: "var(--text-main)", fontWeight: 600 }}>{r.name}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{r.origin}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">FAQ</span>
              <h2 className="section-title">{data.title} — Frequently Asked Questions</h2>
            </div>
            <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {data.faqs.map((f, i) => (
                <div key={i} className="card" style={{ padding: "var(--space-6) var(--space-8)" }}>
                  <h3 style={{ color: "var(--accent)", fontSize: "var(--text-base)", marginBottom: "var(--space-3)" }}>{f.q}</h3>
                  <p style={{ color: "var(--text-body)", marginBottom: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        {data.relatedServices.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-header centered">
                <span className="section-eyebrow">Explore More</span>
                <h2 className="section-title">Related Services</h2>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", justifyContent: "center" }}>
                {data.relatedServices.map((l) => (
                  <Link key={l.href} href={l.href} className="btn btn-outline-gold">{l.label}</Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section style={{ background: "linear-gradient(135deg, var(--bg-dark), var(--accent-dark))", padding: "var(--space-20) 0", textAlign: "center" }}>
          <div className="container">
            <span className="section-eyebrow">Book Now</span>
            <h2 style={{ color: "var(--white)", fontSize: "var(--text-4xl)", margin: "var(--space-4) 0" }}>{data.ctaText}</h2>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-8)" }}>
              Professional drivers, private vehicles, 24/7 availability.
            </p>
            <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/book-online" className="btn btn-primary btn-lg">Book Your Ride</Link>
              <a href={waLink(quoteMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                <WhatsAppIcon size={18} /> Get a Quote
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
