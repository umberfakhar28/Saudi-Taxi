import Link from "next/link";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/seo";
import { faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import QuickBookForm from "@/components/QuickBookForm";
import RelatedLinks from "@/components/RelatedLinks";
import { CheckCircleIcon, MapPinIcon, ClockIcon, MessageIcon, ArrowRightIcon, PlaneIcon, GlobeIcon, ChevronRightIcon, CarIcon } from "@/components/Icons";
import { waLink } from "@/lib/contact";

export const metadata = generatePageMetadata({
  title: "Riyadh Alternative Airports | Private Airport Transfers",
  description: "Exploring alternative airports from Riyadh? Compare road routes, estimated driving times and border considerations, then request a private transfer quote from Gulf Trip Service.",
  path: "/riyadh-alternative-airports",
});

/**
 * Every distance and driving estimate below is the figure this site already
 * publishes for the same corridor (src/lib/distanceRouteData.ts), so the
 * comparison can never contradict the route page it links to. Where the
 * airport sits outside the city centre, the range is widened rather than a
 * new number invented. The vehicle notes come from the route pages too:
 * the causeway needs a handover, the Qatar and UAE land crossings do not.
 */
const AIRPORT_ALTERNATIVES = [
  {
    name: "King Fahd International Airport",
    code: "DMM",
    location: "Dammam, Saudi Arabia",
    distance: "~400 km by road from Riyadh",
    duration: "Around 4 hours of driving",
    type: "Domestic — no border",
    border: null,
    note: "One vehicle from your Riyadh address to the terminal.",
    useCase: "The closest full-service alternative, and the simplest: no border, no passport queue, and wide domestic and regional coverage. Usually the first option worth checking when a Riyadh departure falls through.",
    href: "/dammam-airport-to-riyadh-taxi-service",
    hrefLabel: "Explore Route",
  },
  {
    name: "Bahrain International Airport",
    code: "BAH",
    location: "Muharraq, Bahrain",
    distance: "~480 km by road, including the causeway",
    duration: "4.5–5.5 hours, including border processing",
    type: "International — border crossing",
    border: "King Fahd Causeway",
    note: "Taxis cannot cross the causeway themselves, so the journey continues with a licensed Bahrain-side driver after a handover we arrange in advance.",
    useCase: "Wide international connections for a drive not much longer than Dammam. Worth considering when the onward flight you need leaves from Bahrain rather than Saudi Arabia.",
    href: "/riyadh-to-bahrain-taxi-service",
    hrefLabel: "Explore Route",
  },
  {
    name: "Hamad International Airport",
    code: "DOH",
    location: "Doha, Qatar",
    distance: "~580–600 km by road from Riyadh",
    duration: "6.5–7.5 hours, including border processing",
    type: "International — border crossing",
    border: "Salwa / Abu Samra crossing",
    note: "One vehicle and driver cover the whole route, including the crossing.",
    useCase: "A major long-haul hub reachable in a single day's drive. Suits travellers rebooked onto a Qatar Airways connection, or anyone who needs intercontinental options sooner than a Saudi departure allows.",
    href: "/riyadh-to-qatar-taxi-service",
    hrefLabel: "Explore Route",
  },
  {
    name: "King Abdulaziz International Airport",
    code: "JED",
    location: "Jeddah, Saudi Arabia",
    distance: "~950–1,000 km by road from Riyadh",
    duration: "10–11 hours of continuous driving",
    type: "Domestic — no border",
    note: "A full travel day: plan rest stops, and treat it as an overnight-style journey rather than a quick hop.",
    border: null,
    useCase: "The longest domestic option, and rarely the quickest way to a seat. It earns its place when your itinerary already continues to Makkah or Madinah, or when Jeddah has the departure you need and no closer airport does.",
    href: "/distance/riyadh-to-jeddah",
    hrefLabel: "Route Details",
  },
  {
    name: "Dubai International Airport",
    code: "DXB",
    location: "Dubai, UAE",
    distance: "~1,100 km by road from Riyadh",
    duration: "11–12.5 hours, including border processing",
    type: "International — border crossing",
    border: "Al Batha / Ghuwaifat crossing",
    note: "One vehicle and driver cover the whole route, including the crossing.",
    useCase: "The longest journey on this page and a full day on the road, so it suits groups and travellers with heavy luggage more than a solo traveller in a hurry. Consider it when the connection you need only exists from Dubai.",
    href: "/riyadh-to-dubai-taxi-service",
    hrefLabel: "Explore Route",
  },
];

const FAQS = [
  {
    q: "Which alternative airports can travellers consider when departing from Riyadh?",
    a: "By road, the closest is King Fahd International Airport (DMM) in Dammam, followed by Bahrain International Airport (BAH) across the causeway. Hamad International Airport (DOH) in Qatar and Dubai International Airport (DXB) are longer cross-border drives, and King Abdulaziz International Airport (JED) in Jeddah is the longest domestic option. Which one suits you depends far more on where your replacement flight actually leaves from than on distance alone."
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
  },
  {
    q: "Can luggage and vehicle requirements be included in the request?",
    a: "Yes. Tell us how many suitcases you are carrying and anything else that affects space, such as child seats or sports equipment, and the vehicle is matched to that rather than to passenger numbers alone. You can also state a preference — a sedan, an SUV, a van or a minibus — and we will confirm what is available for your date before anything is booked."
  },
  {
    q: "How far is Jeddah airport from Riyadh, and is driving there sensible?",
    a: "King Abdulaziz International Airport is roughly 950–1,000 km away, which is 10–11 hours of driving before stops — a full travel day. It is rarely the fastest route to a seat, so it usually makes sense only when your plans already continue to Makkah or Madinah, or when Jeddah has the departure you need and no closer airport does."
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
        {/* A. Breadcrumbs & B. Hero Section — same image + navy scrim
            treatment every other airport page uses (AirportPage.tsx), so
            this page sits in the same family rather than inventing a hero. */}
        <section style={{ position: "relative", padding: "9rem 0 5rem", overflow: "hidden", color: "var(--white)", textAlign: "center" }}>
          <Image
            src="/images/airport-terminal.jpg"
            alt="Airport departures terminal — private road transfers from Riyadh to alternative airports"
            fill
            style={{ objectFit: "cover", zIndex: 0 }}
            sizes="100vw"
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(8, 24, 39, 0.72)", zIndex: 1 }} />
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <span className="badge" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid var(--line-dark)", color: "var(--on-dark)" }}>
              ALTERNATIVE AIRPORTS
            </span>
            <h1 style={{ color: "var(--on-dark)", marginTop: "var(--space-4)" }}>
              Riyadh Alternative Airports:
              <br />
              <span style={{ color: "var(--brass-bright)" }}>Private Transfers by Road</span>
            </h1>
            <p style={{ color: "var(--on-dark-muted)", maxWidth: 720, margin: "var(--space-4) auto 0", fontSize: "var(--text-lg)", lineHeight: 1.7 }}>
              When your flight plans change, another airport within driving distance can get you moving again.
              Compare the road routes from Riyadh, the driving estimates and what each border involves, then
              send us your trip details for a quote.
            </p>

            <div style={{ marginTop: "var(--space-8)", display: "flex", gap: "var(--space-4)", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="#quote" className="btn btn-primary btn-lg">Request a Transfer Quote</Link>
              <a href={waLink("Hi, I'm looking for a transfer to an alternative airport from Riyadh.")} className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer">
                <MessageIcon size={18} /> Discuss Your Travel Plans
              </a>
            </div>

            <div className="breadcrumb" style={{ color: "var(--on-dark-muted)", marginTop: "var(--space-6)" }}>
              <Link href="/" style={{ color: "var(--on-dark-muted)" }}>Home</Link>{" "}
              <ChevronRightIcon size={12} style={{ display: "inline", verticalAlign: "middle" }} />{" "}
              <Link href="/airport-transfers" style={{ color: "var(--on-dark-muted)" }}>Airport Transfers</Link>{" "}
              <ChevronRightIcon size={12} style={{ display: "inline", verticalAlign: "middle" }} />{" "}
              <span>Riyadh Alternative Airports</span>
            </div>
          </div>
        </section>

        {/* C. Existing Gulf Trip Service Quote Form */}
        <section id="quote" style={{ padding: "var(--space-10) 0 0" }}>
          <div className="container">
            <QuickBookForm
              defaultFrom="Riyadh"
              service="airport-transfer"
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

                  {airport.note && (
                    <p style={{ display: "flex", gap: "var(--space-2)", alignItems: "flex-start", color: "var(--text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.6, marginTop: "var(--space-3)" }}>
                      <CarIcon size={16} style={{ flexShrink: 0, marginTop: 3 }} />
                      <span>{airport.note}</span>
                    </p>
                  )}

                  <div style={{ marginTop: "var(--space-4)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--line)" }}>
                    <Link href={airport.href} className="btn btn-outline-gold btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                      {airport.hrefLabel} <ArrowRightIcon size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-6)", maxWidth: 760, marginInline: "auto" }}>
              Distances and driving times are estimates for planning only. Real journeys vary with traffic, roadworks,
              rest stops, the time of day and — on the international routes — how busy the border is. Confirm your flight
              with the airline before arranging ground transport, and tell us your check-in deadline so the departure
              time can be planned backwards from it.
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
                  Travelling to Bahrain, Qatar or the UAE means crossing an international land border, and the
                  routes do not all work the same way. On the Qatar and UAE land crossings, one vehicle and driver
                  stay with you for the whole journey. The King Fahd Causeway to Bahrain is different: taxis cannot
                  cross it themselves, so the journey continues with a licensed Bahrain-side driver after a handover
                  arranged in advance.
                </p>
                <p style={{ color: "var(--text-body)", lineHeight: 1.7, marginBottom: 0 }}>
                  Your driver handles the vehicle and its paperwork at the crossing. Passports, visas, permits and
                  entry eligibility remain the passenger&apos;s own responsibility, and the rules vary by nationality
                  and residency — confirm yours with the relevant embassy or an official government source before you
                  travel. Processing times also swing with the day of the week and public holidays.
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
            <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-6)" }}>
              Landing somewhere else, Jeddah included?{" "}
              <Link href="#quote" style={{ color: "var(--teal)", fontWeight: 600 }}>Send us the arrival details</Link>{" "}
              — share your flight number and landing time and we will confirm what can be arranged before you book.
            </p>
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
          { href: "/distance/riyadh-to-jeddah", label: "Riyadh to Jeddah Guide" },
          { href: "/guides/king-khalid-airport", label: "King Khalid Airport (RUH) Guide" },
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
