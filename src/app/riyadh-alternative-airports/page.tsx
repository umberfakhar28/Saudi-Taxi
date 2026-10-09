import Link from "next/link";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/seo";
import { faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import QuickBookForm from "@/components/QuickBookForm";
import RelatedLinks from "@/components/RelatedLinks";
import { CheckCircleIcon, MapPinIcon, ClockIcon, MessageIcon, ArrowRightIcon, PlaneIcon, GlobeIcon } from "@/components/Icons";
import { WHATSAPP_URL, waLink } from "@/lib/contact";

export const metadata = generatePageMetadata({
  title: "Riyadh Alternative Airports | Private Airport Transfers",
  description: "Exploring alternative airports from Riyadh? Compare road routes, estimated driving times and border considerations, then request a private transfer quote from Gulf Trip Service.",
  path: "/riyadh-alternative-airports",
});

const AIRPORT_ALTERNATIVES = [
  {
    name: "King Fahd International Airport",
    code: "DMM",
    location: "Dammam, Saudi Arabia",
    distance: "~400 km from Riyadh",
    duration: "Approx. 4 hours driving",
    type: "Domestic Route",
    border: null,
    useCase: "The most popular alternative airport for Riyadh. Excellent domestic and regional flight coverage without needing to cross an international border.",
    href: "/dammam-airport-to-riyadh-taxi-service",
  },
  {
    name: "Bahrain International Airport",
    code: "BAH",
    location: "Manama, Bahrain",
    distance: "~480 km from Riyadh",
    duration: "Approx. 5 hours driving",
    type: "International Route",
    border: "Via King Fahd Causeway",
    useCase: "A strong alternative for international travel, offering extensive global connections. Requires cross-border travel via the King Fahd Causeway.",
    href: "/riyadh-to-bahrain-taxi-service",
  },
  {
    name: "Hamad International Airport",
    code: "DOH",
    location: "Doha, Qatar",
    distance: "~600 km from Riyadh",
    duration: "Approx. 6.5 hours driving",
    type: "International Route",
    border: "Via Salwa Border",
    useCase: "A major global aviation hub. This route involves crossing the Saudi-Qatar land border, requiring passport and visa checks.",
    href: "/riyadh-to-qatar-taxi-service",
  },
  {
    name: "Dubai International Airport",
    code: "DXB",
    location: "Dubai, UAE",
    distance: "~1,000 km from Riyadh",
    duration: "Approx. 10 hours driving",
    type: "International Route",
    border: "Via Al Batha Border",
    useCase: "Ideal when alternative regional flights are unavailable and you need access to the world's busiest international transit hub.",
    href: "/riyadh-to-dubai-taxi-service",
  }
];

const FAQS = [
  {
    q: "Which alternative airports can travellers consider when departing from Riyadh?",
    a: "The most accessible alternative airports by road are King Fahd International Airport (DMM) in Dammam and Bahrain International Airport (BAH). For wider international connections, Hamad International Airport (DOH) in Qatar and Dubai International Airport (DXB) are also reachable via private road transfers."
  },
  {
    q: "How far is Dammam Airport from Riyadh by road?",
    a: "Dammam's King Fahd International Airport (DMM) is approximately 400 kilometres from Riyadh. The journey typically takes around 4 hours by private car, depending on traffic and rest stops."
  },
  {
    q: "Can I travel from Riyadh to Bahrain Airport by private car?",
    a: "Yes, you can travel from Riyadh to Bahrain International Airport by private car via the King Fahd Causeway. The journey takes approximately 5 hours driving, plus additional time for border crossing procedures. Passengers are responsible for ensuring they have the correct visas and travel documents."
  },
  {
    q: "What should I check before travelling from Riyadh to Doha or Dubai by road?",
    a: "Before booking a cross-border transfer, you must confirm your visa eligibility, passport validity (usually 6 months required), and any specific entry requirements for Qatar or the UAE. Additionally, check Saudi exit/re-entry visa rules if you are a resident."
  },
  {
    q: "How much driving time should I allow before an international flight?",
    a: "When calculating your departure time, combine the estimated driving duration, potential border queues (for international routes), planned rest stops, and the airline's check-in deadline (typically 3 hours prior to departure). Always allow a generous buffer for unexpected traffic or delays."
  },
  {
    q: "Can I request a transfer if my flight has been cancelled or changed?",
    a: "Yes, if your flight is cancelled or redirected, you can request a private road transfer to reach your new departure airport or final destination. Provide your trip details through our form, and our team will check vehicle availability for your requested route."
  },
  {
    q: "Can I arrange a transfer from an alternative airport back to Riyadh?",
    a: "Absolutely. We provide reverse transfers from all our supported alternative airports back to Riyadh. Simply share your arrival details, including flight number and landing time, so your driver can meet you at the terminal."
  },
  {
    q: "What trip details are needed to request a transfer quotation?",
    a: "To provide an accurate quote and check availability, we need your exact pickup location in Riyadh, the destination airport, travel date, preferred departure time, total number of passengers, and luggage requirements."
  }
];

export default function RiyadhAlternativeAirportsPage() {
  const schemas = [
    faqSchema(FAQS.map((f) => ({ question: f.q, answer: f.a }))),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Airport Transfers", path: "/airport-transfers" },
      { name: "Riyadh Alternative Airports", path: "/riyadh-alternative-airports" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main>
        {/* A. Breadcrumbs & B. Hero Section */}
        <section className="page-hero">
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <span className="section-eyebrow">Alternative Airports</span>
            <h1>Riyadh Alternative Airports: Private Transfers by Road</h1>
            <p>
              When your flight plans change, explore alternative airports reachable from Riyadh by private car. 
              Review driving routes, travel times, and border considerations, then request a transfer quote.
            </p>
            <div className="breadcrumb">
              <Link href="/">Home</Link> /{" "}
              <Link href="/airport-transfers">Airport Transfers</Link> /{" "}
              <span>Riyadh Alternative Airports</span>
            </div>
            
            <div style={{ marginTop: "var(--space-8)", display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
              <Link href="#quote" className="btn btn-primary btn-lg">Request a Transfer Quote</Link>
              <a href={waLink("Hi, I'm looking for a transfer to an alternative airport from Riyadh.")} className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer">
                <MessageIcon size={18} /> Discuss Your Travel Plans
              </a>
            </div>
          </div>
        </section>

        {/* C. Existing Gulf Trip Service Quote Form */}
        <section id="quote" style={{ padding: "var(--space-10) 0 0" }}>
          <div className="container">
            <QuickBookForm
              defaultFrom="Riyadh"
              service="airport-transfers"
              heading="Request a Transfer to Your Alternative Airport"
              subheading="Submit your travel details to check route availability and receive a quotation."
            />
          </div>
        </section>

        {/* D. Alternative Airport Comparison Cards */}
        <section className="section-lg">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Destination Comparison</span>
              <h2 className="section-title">Alternative Airports Near Riyadh</h2>
            </div>
            
            <div className="grid-2">
              {AIRPORT_ALTERNATIVES.map((airport) => (
                <div key={airport.code} className="card" style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
                    <div className="card-icon" style={{ margin: 0 }}><PlaneIcon size={24} /></div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "var(--text-xl)" }}>{airport.name}</h3>
                      <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>
                        {airport.code} &middot; {airport.location}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", marginBottom: "var(--space-5)" }}>
                    <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", color: "var(--text-main)", fontSize: "var(--text-sm)", fontWeight: 600 }}>
                      <MapPinIcon size={16} /> {airport.distance}
                    </div>
                    <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", color: "var(--text-main)", fontSize: "var(--text-sm)", fontWeight: 600 }}>
                      <ClockIcon size={16} /> {airport.duration} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(Estimate)</span>
                    </div>
                    <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", color: "var(--text-main)", fontSize: "var(--text-sm)", fontWeight: 600 }}>
                      <GlobeIcon size={16} /> {airport.type}
                    </div>
                    {airport.border && (
                      <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", color: "var(--text-main)", fontSize: "var(--text-sm)", fontWeight: 600 }}>
                        <GlobeIcon size={16} style={{ color: "var(--accent)" }} /> {airport.border}
                      </div>
                    )}
                  </div>
                  
                  <p style={{ color: "var(--text-body)", lineHeight: 1.6, flexGrow: 1 }}>{airport.useCase}</p>
                  
                  <div style={{ marginTop: "var(--space-4)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--line)" }}>
                    <Link href={airport.href} className="btn btn-outline-gold btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                      Explore Route <ArrowRightIcon size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-6)" }}>
              Note: Driving durations are estimates. Actual travel times depend on traffic conditions, rest stops, and border queues.
            </p>
          </div>
        </section>

        {/* E. How to Choose an Alternative Airport */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="grid-60-40">
              <div>
                <span className="section-eyebrow">Practical Guidance</span>
                <h2 className="section-title">How to Choose an Alternative Airport</h2>
                <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>
                  When considering a different departure point, especially after a flight cancellation, it&apos;s crucial to evaluate the logistics of reaching the alternative airport before booking your new flight.
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", padding: 0 }}>
                  {[
                    "Confirm the replacement flight details with your airline before arranging ground transport.",
                    "Verify passport, visa, and entry-permission requirements if travelling across an international border.",
                    "Check Saudi exit/re-entry visa requirements if you are a resident.",
                    "Calculate total travel time including the drive, rest stops, possible border queues, and check-in deadlines.",
                    "Ensure your luggage count and passenger numbers can be accommodated in a private vehicle.",
                    "Check official government and aviation sources for current road and border conditions."
                  ].map((tip, i) => (
                    <li key={i} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start", color: "var(--text-main)" }}>
                      <CheckCircleIcon size={20} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                      <span style={{ lineHeight: 1.6 }}>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "var(--bg-dark)", borderRadius: "var(--radius-lg)", padding: "var(--space-8)", color: "var(--white)" }}>
                <h3 style={{ color: "var(--white)", marginBottom: "var(--space-4)" }}>Need Assistance?</h3>
                <p style={{ color: "var(--on-dark-muted)", lineHeight: 1.7, marginBottom: "var(--space-6)" }}>
                  Our team can help you arrange a reliable private vehicle to reach your chosen alternative airport. We track your journey and coordinate with your driver to ensure a smooth transfer.
                </p>
                <Link href="#quote" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Check Route Availability
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* F. Domestic vs. International Transfers */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Journey Types</span>
              <h2 className="section-title">Domestic vs. International Road Transfers</h2>
            </div>
            
            <div className="grid-2">
              <div className="card" style={{ background: "var(--bg-subtle)", border: "1px solid var(--line)" }}>
                <h3 style={{ color: "var(--text-main)", marginBottom: "var(--space-3)", display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <MapPinIcon size={20} style={{ color: "var(--accent)" }} /> Domestic Airport Journeys
                </h3>
                <p style={{ color: "var(--text-body)", lineHeight: 1.7 }}>
                  Travelling from Riyadh to another Saudi city like Dammam or Jeddah requires no border crossing. 
                  These routes are generally more predictable in travel time. You only need standard identification 
                  such as a national ID or Iqama for travel within the Kingdom.
                </p>
              </div>
              <div className="card" style={{ background: "var(--bg-subtle)", border: "1px solid var(--line)" }}>
                <h3 style={{ color: "var(--text-main)", marginBottom: "var(--space-3)", display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <GlobeIcon size={20} style={{ color: "var(--accent)" }} /> Cross-Border International Transfers
                </h3>
                <p style={{ color: "var(--text-body)", lineHeight: 1.7 }}>
                  Travelling to Bahrain, Qatar, or the UAE involves crossing an international land border. 
                  While your driver navigates the vehicle through the crossing, passengers are strictly responsible 
                  for their own immigration status, travel documents, visas, and ensuring they meet all entry requirements.
                  Border processing times can vary significantly based on the day of the week and holidays.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* G. Reverse Transfer Options */}
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Return Journeys</span>
              <h2 className="section-title">Reverse Transfers to Riyadh</h2>
              <p style={{ color: "var(--text-body)", maxWidth: 700, margin: "var(--space-4) auto 0", lineHeight: 1.7 }}>
                Landed at an alternative airport and need to reach Riyadh? We offer private pickups from major regional airports, bringing you directly to your Riyadh destination.
              </p>
            </div>
            
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "var(--space-3)" }}>
              <Link href="/dammam-airport-to-riyadh-taxi-service" className="btn btn-outline-gold">Dammam to Riyadh</Link>
              <Link href="/bahrain-to-riyadh-taxi-service" className="btn btn-outline-gold">Bahrain to Riyadh</Link>
              <Link href="/qatar-to-riyadh-taxi-service" className="btn btn-outline-gold">Doha to Riyadh</Link>
              <Link href="/dubai-to-riyadh-taxi-service" className="btn btn-outline-gold">Dubai to Riyadh</Link>
            </div>
          </div>
        </section>

        {/* I. FAQs */}
        <section className="section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">FAQ</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
            </div>
            <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {FAQS.map((f, i) => (
                <div key={i} className="card" style={{ padding: "var(--space-6) var(--space-8)" }}>
                  <h3 style={{ color: "var(--navy)", fontSize: "var(--text-base)", marginBottom: "var(--space-3)" }}>{f.q}</h3>
                  <p style={{ color: "var(--text-body)", marginBottom: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* H. Related Routes and Travel Guides */}
        <RelatedLinks title="Explore Related Routes and Guides" links={[
          { href: "/distance/riyadh-to-dammam", label: "Riyadh to Dammam Guide" },
          { href: "/distance/bahrain-to-riyadh", label: "Bahrain to Riyadh Guide" },
          { href: "/distance/riyadh-to-dubai", label: "Riyadh to Dubai Guide" },
          { href: "/distance/doha-to-riyadh", label: "Doha to Riyadh Guide" },
          { href: "/border-crossing", label: "Border Crossing Services" },
          { href: "/airport-transfers", label: "All Airport Transfers" }
        ]} />

        {/* J. Final CTA */}
        <section style={{ background: "var(--bg-dark)", padding: "var(--space-20) 0", textAlign: "center" }}>
          <div className="container">
            <h2 style={{ color: "var(--on-dark)", fontSize: "var(--text-4xl)", margin: "var(--space-4) 0" }}>Arrange Your Airport Transfer</h2>
            <p style={{ color: "var(--on-dark-muted)", fontSize: "var(--text-lg)", maxWidth: 600, margin: "0 auto var(--space-8)" }}>
              Share your pickup location, desired destination, travel date, and passenger details to receive a personalised transfer quote.
            </p>
            <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="#quote" className="btn btn-primary btn-lg">Request a Transfer Quote</Link>
              <a href={waLink("Hi, I would like to arrange an airport transfer from Riyadh.")} className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer">
                <MessageIcon size={18} /> Discuss on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
