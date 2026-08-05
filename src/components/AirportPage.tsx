import Link from "next/link";
import Image from "next/image";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { waLink } from "@/lib/contact";
import { AIRPORTS, AIRPORT_ROUTES, type AirportPageInfo } from "@/lib/airportRoutesData";
import { AIRPORT_FAQS } from "@/lib/airportFaqs";
import { AIRPORT_WAIT_TIMES } from "@/lib/airportTransferConfig";
import { FLEET_TIERS } from "@/lib/fleetConfig";
import AirportFaqAccordion from "@/components/AirportFaqAccordion";
import {
  PlaneIcon, ChevronRightIcon, WhatsAppIcon, CheckCircleIcon, PackageIcon,
  TimerIcon, ClockIcon,
} from "@/components/Icons";

/**
 * Shared template for every airport page (Airport Page Spec addendum to
 * Execution Brief v3 §W2). One template, all six current + seven future
 * (W7) airport pages render through it — see docs/page-inventory.md D1/D4
 * on why this isn't a one-off Jeddah component.
 *
 * Section order is fixed (spec: "never reordered per page"); §7 collapses
 * to a single pickup-point block when `data.terminals` is empty, controlled
 * by that data flag rather than a second component.
 */
export default function AirportPage({ data }: { data: AirportPageInfo }) {
  const routes = AIRPORT_ROUTES.filter((r) => r.airportCode === data.code);
  const otherAirports = AIRPORTS.filter((a) => a.code !== data.code);

  const specificFaqs = AIRPORT_FAQS.filter((f) => f.airports?.includes(data.code));
  const genericFaqs = AIRPORT_FAQS.filter((f) => !f.airports);
  const faqs = [...specificFaqs, ...genericFaqs].slice(0, 7);

  const whatsappHref = waLink(`Hi, I'd like to book a ${data.name} (${data.code}) transfer.`);

  const schemas = [
    serviceSchema({
      name: `${data.name} (${data.code}) Taxi & Private Transfer`,
      description: `Private taxi and meet-and-greet transfer service from ${data.fullName} (${data.code}) to ${data.city} and beyond.`,
      url: data.pageHref,
      areaServed: [data.city, ...routes.map((r) => r.to.replace(/\s*Hotels?$/, ""))],
    }),
    faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Airport Transfers", path: "/airport-transfers" },
      { name: data.name, path: data.pageHref },
    ]),
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />

      {/* §1 — Hero */}
      <section style={{ position: "relative", padding: "9rem 0 5rem", overflow: "hidden", color: "var(--white)", textAlign: "center" }}>
        <Image
          src={data.heroImage}
          alt={`${data.fullName} arrivals — meet-and-greet pickup point`}
          fill
          style={{ objectFit: "cover", zIndex: 0 }}
          sizes="100vw"
          priority
        />
        {/* Dark overlay — verified for AA against white hero text (see W2 report). */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(3,10,37,0.82) 0%, rgba(3,10,37,0.90) 100%)", zIndex: 1 }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <span className="badge" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: "var(--white)" }}>
            {data.city.toUpperCase()} AIRPORT TRANSFERS
          </span>
          <h1 style={{ color: "var(--white)", marginTop: "var(--space-4)" }}>
            Private Car, Taxi and Chauffeur Service
            <br />
            <span style={{ color: "var(--brass-bright)" }}>from {data.name} ({data.code})</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", maxWidth: 620, margin: "var(--space-4) auto 0", fontSize: "var(--text-lg)" }}>
            <strong style={{ color: "var(--white)" }}>{data.fullName}</strong> meet-and-greet pickup{" "}
            {data.terminals && data.terminals.length > 1 ? <><strong style={{ color: "var(--white)" }}>at every terminal</strong>, with{" "}</> : ""}
            <strong style={{ color: "var(--white)" }}>24/7 availability</strong> and real-time flight tracking for delays.
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap", marginTop: "var(--space-8)" }}>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
              <WhatsAppIcon size={18} /> Book via WhatsApp <ChevronRightIcon size={16} />
            </a>
            <Link href="/quote" className="btn btn-outline btn-lg">
              Request a Quote
            </Link>
          </div>
          <div className="breadcrumb" style={{ color: "rgba(255,255,255,0.65)", marginTop: "var(--space-6)" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.8)" }}>Home</Link>{" "}
            <ChevronRightIcon size={12} style={{ display: "inline", verticalAlign: "middle" }} />{" "}
            <Link href="/airport-transfers" style={{ color: "rgba(255,255,255,0.8)" }}>Airport Transfers</Link>{" "}
            <ChevronRightIcon size={12} style={{ display: "inline", verticalAlign: "middle" }} />{" "}
            <span>{data.name}</span>
          </div>
        </div>
      </section>

      {/* §2 — Other airports we cover */}
      <section className="section-lg">
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">Airport Transfers</span>
            <h2 className="section-title">Other Airports We Cover</h2>
          </div>
          <div className="grid-3">
            {otherAirports.map((a) => {
              const aRoutes = AIRPORT_ROUTES.filter((r) => r.airportCode === a.code).slice(0, 3);
              return (
                <div key={a.code} className="card" style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div className="card-icon"><PlaneIcon size={24} /></div>
                    {a.isMajorHub && <span className="badge badge-gold">Major Hub</span>}
                  </div>
                  <h3>
                    <Link href={a.pageHref} style={{ color: "var(--text-main)" }}>{a.fullName} ({a.code})</Link>
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{a.city}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", flexGrow: 1 }}>
                    {a.intro} See our <Link href={a.pageHref} style={{ color: "var(--accent)", fontWeight: 600 }}>{a.name.toLowerCase()} terminal guide</Link> for pickup details.
                  </p>
                  {aRoutes.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, margin: "0.5rem 0", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      {aRoutes.map((r) => (
                        <li key={r.id} style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                          {r.href ? (
                            <Link href={r.href} style={{ color: "var(--text-muted)" }}>{a.name} → {r.to} ({r.distance})</Link>
                          ) : (
                            <>{a.name} → {r.to} ({r.distance})</>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  <a
                    href={waLink(`Hi, I'd like to book a ${a.name} (${a.code}) transfer.`)}
                    target="_blank" rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                    style={{ marginTop: "auto", width: "100%" }}
                  >
                    <WhatsAppIcon size={14} /> WhatsApp Booking
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* §3 — Arrivals */}
      <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
        <div className="container" style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 className="section-title">Arrivals at {data.fullName}</h2>
          <p style={{ lineHeight: 1.8, color: "var(--text-body)" }}>
            {data.fullName} sits {data.distanceFromCity}
            {data.annualPassengers ? `, handling ${data.annualPassengers}` : ""}
            {data.terminals && data.terminals.length > 1
              ? ` across ${data.terminals.length} separate terminals. Each terminal has its own meeting point and procedure — arriving at the wrong one and not knowing where your driver is waiting is one of the most common first-day frustrations for travelers here, which is why we brief every driver on the terminal you land at rather than a generic "arrivals hall."`
              : "."}
          </p>
          <p style={{ lineHeight: 1.8, color: "var(--text-body)" }}>
            {data.intro} See our <Link href="/airport-transfer-for-umrah" style={{ color: "var(--accent)", fontWeight: 600 }}>airport transfer for Umrah</Link> page for pilgrim-specific pickup details{data.guidePageHref && (
              <>, or our <Link href={data.guidePageHref} style={{ color: "var(--accent)", fontWeight: 600 }}>{data.fullName} guide</Link> for terminal maps and facilities</>
            )}.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "1.5rem 0 0", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              `Meet & Greet at ${data.terminals && data.terminals.length > 1 ? `all ${data.terminals.length} terminals` : "arrivals"}`,
              `${AIRPORT_WAIT_TIMES.airportFreeWaitMinutes} minutes of complimentary wait time built in`,
              "Real-time flight tracking for delays",
              "Fleet of Sedans, SUVs and Vans with luggage room to match",
            ].map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <CheckCircleIcon size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} /> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* §4 — Estimated Travel Times */}
      {routes.length > 0 && (
        <section className="section-lg">
          <div className="container" style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <h2 className="section-title" style={{ textAlign: "center" }}>Estimated Travel Times from {data.name}</h2>
            <table className="price-table" style={{ marginTop: "var(--space-8)" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>Destination</th>
                  <th className="center">Duration</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((r) => (
                  <tr key={r.id}>
                    <td style={{ textAlign: "left" }}>
                      {r.href ? <Link href={r.href} style={{ color: "var(--accent)", fontWeight: 600 }}>{r.to}</Link> : r.to}
                    </td>
                    <td className="center" style={{ fontWeight: 700 }}>{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: "var(--space-4)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
              Times assume normal traffic. Allow extra during Ramadan evenings and the weeks around Hajj, when routes to Makkah and Madinah see the heaviest congestion.
            </p>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ marginTop: "var(--space-6)" }}>
              <WhatsAppIcon size={16} /> Get an Exact Pickup Time
            </a>
          </div>
        </section>
      )}

      {/* §5 — Meet & Greet, Step by Step */}
      <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">Meet & Greet</span>
            <h2 className="section-title">Meet & Greet, Step by Step</h2>
          </div>
          <div className="grid-4">
            {[
              { n: "1", label: "Arrival", text: "Clear immigration and customs, then collect your luggage from baggage claim." },
              { n: "2", label: "Find your driver", text: "Exit to the arrival hall and look for the name board with your name." },
              { n: "3", label: "Verify your booking", text: "Your driver confirms your destination and booking reference." },
              { n: "4", label: "Transfer begins", text: "Your driver assists with luggage and walks you to the vehicle." },
            ].map((step) => (
              <div key={step.n} style={{ textAlign: "center" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", background: "var(--accent-subtle)", color: "var(--accent-primary)",
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto var(--space-4)",
                  fontWeight: 800, fontSize: "var(--text-xl)", fontFamily: "var(--font-heading)", border: "1px solid rgba(12,32,122,0.18)",
                }}>{step.n}</div>
                <h3 style={{ fontSize: "var(--text-base)", marginBottom: "var(--space-2)" }}>{step.label}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §6 — Flight-Delay Policy */}
      <section className="section-lg">
        <div className="container" style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <TimerIcon size={32} style={{ color: "var(--accent)", marginBottom: "var(--space-4)" }} />
          <h2 className="section-title" style={{ textAlign: "center" }}>Flight-Delay Policy</h2>
          <p style={{ color: "var(--text-body)", lineHeight: 1.8 }}>
            We track your flight number from departure, not just scheduled landing time, so a delayed flight doesn't leave your driver waiting at the wrong time — or you waiting for a driver who thinks you've already landed.
          </p>
          <p style={{ color: "var(--text-body)", lineHeight: 1.8 }}>
            {AIRPORT_WAIT_TIMES.airportFreeWaitMinutes} minutes of waiting time after your actual landing is included at no extra charge. If your flight is delayed well beyond that, message us and we'll adjust the pickup — no penalty for circumstances outside your control.
          </p>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ marginTop: "var(--space-6)" }}>
            <WhatsAppIcon size={16} /> Message Us About a Delayed Flight
          </a>
        </div>
      </section>

      {/* §7 — Terminal Guide (collapses to a single pickup-point block when data.terminals is empty) */}
      <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">Terminal Guide</span>
            <h2 className="section-title">
              {data.terminals && data.terminals.length > 1 ? "Where to Meet Your Driver, by Terminal" : "Where to Meet Your Driver"}
            </h2>
          </div>
          {data.terminals && data.terminals.length > 1 ? (
            <div className="grid-3">
              {data.terminals.map((t) => (
                <div key={t.name} className="card">
                  <span className="badge badge-gold" style={{ marginBottom: "1rem", display: "inline-flex" }}>{t.type}</span>
                  <h3>{t.name}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}><strong>Flights:</strong> {t.flights}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}><strong>Meeting point:</strong> {t.meeting}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", marginBottom: "0.5rem" }}><strong>Facilities:</strong></p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {t.facilities.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
                        <CheckCircleIcon size={14} style={{ marginTop: 3, flexShrink: 0, color: "var(--accent)" }} /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
              <p style={{ color: "var(--text-muted)", marginBottom: 0 }}>
                {data.name} has a single arrivals hall — your driver waits at the exit with a name board, regardless of which flight or airline you land with.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* §8 — FAQs */}
      <section className="section-lg">
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="section-title">{data.name} Taxi — Frequently Asked Questions</h2>
          </div>
          <AirportFaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* §9 — Related links module */}
      <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
        <div className="container">
          <div className="grid-3">
            <div>
              <div className="card-icon" style={{ marginBottom: "var(--space-4)" }}><PlaneIcon size={22} /></div>
              <h3>Popular Airport Routes</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "0.75rem 0 1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {routes.slice(0, 5).map((r) => (
                  <li key={r.id}>
                    {r.href ? (
                      <Link href={r.href} style={{ color: "var(--text-body)" }}>{data.name} → {r.to}</Link>
                    ) : (
                      <span style={{ color: "var(--text-body)" }}>{data.name} → {r.to}</span>
                    )}
                  </li>
                ))}
              </ul>
              <Link href="/border-crossing" style={{ color: "var(--accent)", fontWeight: 700, fontSize: "var(--text-base)" }}>View all routes →</Link>
            </div>
            <div>
              <div className="card-icon" style={{ marginBottom: "var(--space-4)" }}><PackageIcon size={22} /></div>
              <h3>Recommended Fleet</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "0.75rem 0 1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {FLEET_TIERS.filter((v) => v.id !== "luxury").map((v) => (
                  <li key={v.id}>
                    <Link href="/fleet" style={{ color: "var(--text-body)" }}>{v.models} <span style={{ color: "var(--text-muted)" }}>({v.name})</span></Link>
                  </li>
                ))}
              </ul>
              <Link href="/fleet" style={{ color: "var(--accent)", fontWeight: 700, fontSize: "var(--text-base)" }}>Explore the fleet →</Link>
            </div>
            <div>
              <div className="card-icon" style={{ marginBottom: "var(--space-4)" }}><ClockIcon size={22} /></div>
              <h3>Related Services</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "0.75rem 0 1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {data.relatedServices.map((s) => (
                  <li key={s.href}><Link href={s.href} style={{ color: "var(--text-body)" }}>{s.label}</Link></li>
                ))}
              </ul>
              <Link href="/our-services" style={{ color: "var(--accent)", fontWeight: 700, fontSize: "var(--text-base)" }}>All services →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* §10 — Closing CTA */}
      <section style={{ background: "linear-gradient(135deg, var(--bg-dark), var(--accent-dark))", padding: "5rem 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ color: "var(--white)", marginBottom: "1rem" }}>Ready to book your {data.name} transfer?</h2>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-8)" }}>
            Meet-and-greet pickup, 24/7 availability, and a fixed quote before you travel.
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
              <WhatsAppIcon size={18} /> Book via WhatsApp
            </a>
            <Link href="/quote" className="btn btn-outline btn-lg">Request a Quote</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
