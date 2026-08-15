import Link from "next/link";
import Image from "next/image";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { waLink } from "@/lib/contact";
import { AIRPORTS, AIRPORT_ROUTES, type AirportPageInfo } from "@/lib/airportRoutesData";
import { AIRPORT_FAQS } from "@/lib/airportFaqs";
import { AIRPORT_WAIT_TIMES } from "@/lib/airportTransferConfig";
import { FLEET_TIERS } from "@/lib/fleetConfig";
import { allCities } from "@/lib/cityData3";
import AirportFaqAccordion from "@/components/AirportFaqAccordion";
import {
  PlaneIcon, ChevronRightIcon, WhatsAppIcon, CheckCircleIcon, PackageIcon,
  TimerIcon, ClockIcon, MapPinIcon, HotelIcon, BriefcaseIcon, MoonIcon,
} from "@/components/Icons";
import styles from "./AirportPage.module.css";

/** Use-case chips computed from data already on every airport (routes,
 * relatedServices, religiousTravel/businessInfo presence) rather than
 * hand-written near-duplicate lists. */
function useCasesFor(data: AirportPageInfo, routeCount: number): string[] {
  const cases: string[] = ["Hotel & door-to-door transfers", "Family & group travel"];
  if (routeCount > 0) cases.push("City & intercity transfers");
  if (data.businessInfo) cases.push("Business & corporate travel");
  if (data.religiousTravel) cases.push("Umrah & religious travel");
  return cases;
}

/** Related /services/[slug] city pages for this airport — the airport's own
 * city plus its real, existing nearby-city relationships, never a guessed
 * slug (matched against the live CityData list by city name). */
function relatedCitiesFor(data: AirportPageInfo): { slug: string; city: string }[] {
  const ownCity = allCities.find((c) => c.city.toLowerCase() === data.city.toLowerCase());
  if (!ownCity) return [];
  const cities = [{ slug: ownCity.slug, city: ownCity.city }];
  for (const n of ownCity.nearbyCities) {
    if (!cities.some((c) => c.slug === n.slug)) cities.push({ slug: n.slug, city: n.city });
  }
  return cities;
}

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

      {/* Quick Facts strip — verified data only, nothing invented. */}
      <section className={styles.quickFacts}>
        <div className="container">
          <div className={styles.factRow}>
            <div className={styles.factItem}>
              <span className={styles.factLabel}>Airport</span>
              <span className={styles.factValue}>{data.fullName}</span>
            </div>
            <div className={styles.factItem}>
              <span className={styles.factLabel}>IATA Code</span>
              <span className={styles.factValue}>{data.code}</span>
            </div>
            <div className={styles.factItem}>
              <span className={styles.factLabel}>Location</span>
              <span className={styles.factValue}>{data.distanceFromCity}</span>
            </div>
            <div className={styles.factItem}>
              <span className={styles.factLabel}>Terminals</span>
              <span className={styles.factValue}>{data.terminals && data.terminals.length > 1 ? data.terminals.length : "Single arrivals hall"}</span>
            </div>
            <div className={styles.factItem}>
              <span className={styles.factLabel}>Transfer Types</span>
              <span className={styles.factValue}>Private, door-to-door</span>
            </div>
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
          <div className={styles.useCaseRow}>
            {useCasesFor(data, routes.length).map((label) => (
              <span key={label} className={styles.useCaseChip}>
                <CheckCircleIcon size={14} /> {label}
              </span>
            ))}
          </div>
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
          <div className={styles.cantFindDriver}>
            <MapPinIcon size={20} style={{ color: "var(--accent)", flexShrink: 0 }} />
            <p style={{ margin: 0, color: "var(--text-body)", fontSize: "var(--text-sm)" }}>
              <strong>Can&apos;t find your driver?</strong> Message the WhatsApp number from your booking confirmation — a real person replies immediately during your pickup window, not an automated queue.
            </p>
          </div>
        </div>
      </section>

      {/* §6 — Flight-Delay Policy */}
      <section className="section-lg">
        <div className="container" style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <TimerIcon size={32} style={{ color: "var(--accent)", marginBottom: "var(--space-4)" }} />
          <h2 className="section-title" style={{ textAlign: "center" }}>Flight-Delay Policy</h2>
          <p style={{ color: "var(--text-body)", lineHeight: 1.8 }}>
            We track your flight number from departure, not just scheduled landing time, so a delayed flight doesn&apos;t leave your driver waiting at the wrong time — or you waiting for a driver who thinks you&apos;ve already landed.
          </p>
          <p style={{ color: "var(--text-body)", lineHeight: 1.8 }}>
            {AIRPORT_WAIT_TIMES.airportFreeWaitMinutes} minutes of waiting time after your actual landing is included at no extra charge. If your flight is delayed well beyond that, message us and we&apos;ll adjust the pickup — no penalty for circumstances outside your control.
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
          {data.lastReviewed && (
            <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "var(--text-xs)", marginTop: "var(--space-6)" }}>
              Terminal and pickup information last reviewed: {data.lastReviewed}.
            </p>
          )}
        </div>
      </section>

      {/* Hotel Transfer Zones — district-level, not named-property
          partnership claims that can't be verified. */}
      {data.hotelZones && data.hotelZones.length > 0 && (
        <section className="section-lg">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Hotel Transfers</span>
              <h2 className="section-title">Popular Hotel Transfer Destinations from {data.name}</h2>
            </div>
            <div className="grid-3">
              {data.hotelZones.map((zone) => (
                <div key={zone.name} className="card">
                  <div className="card-icon"><HotelIcon size={22} /></div>
                  <h3>{zone.name}</h3>
                  <p>{zone.note}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "var(--space-8)" }}>
              <Link href="/hotel-transfers" className="btn btn-outline-gold">All Hotel Transfer Services</Link>
            </div>
          </div>
        </section>
      )}

      {/* Business Travel — only rendered where genuinely relevant. */}
      {data.businessInfo && (
        <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Business Travel</span>
              <h2 className="section-title">{data.name} for Business Travelers</h2>
            </div>
            <p style={{ color: "var(--text-body)", lineHeight: 1.8, maxWidth: 760, margin: "0 auto var(--space-8)", textAlign: "center" }}>
              {data.businessInfo.intro}
            </p>
            <div className="grid-3">
              {data.businessInfo.areas.map((area) => (
                <div key={area.name} className="card">
                  <div className="card-icon"><BriefcaseIcon size={22} /></div>
                  <h3>{area.name}</h3>
                  <p>{area.note}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "var(--space-8)" }}>
              <Link href="/corporate-transportation-services" className="btn btn-outline-gold">Corporate Transportation Services</Link>
            </div>
          </div>
        </section>
      )}

      {/* Religious Travel — only rendered where genuinely relevant (JED, MED);
          links to the dedicated Umrah/Ziyarat pages rather than duplicating
          their content. */}
      {data.religiousTravel && (
        <section className="section-lg">
          <div className="container" style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
            <MoonIcon size={32} style={{ color: "var(--accent)", marginBottom: "var(--space-4)" }} />
            <span className="section-eyebrow">Religious Travel</span>
            <h2 className="section-title" style={{ textAlign: "center" }}>Umrah &amp; Ziyarat Transport from {data.name}</h2>
            <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "var(--space-6)" }}>{data.religiousTravel.intro}</p>
            <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
              {data.religiousTravel.links.map((l) => (
                <Link key={l.href} href={l.href} className="btn btn-secondary">{l.label}</Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Vehicle Options — shared fleet data (FLEET_TIERS), real images and
          capacities already used by the booking widget elsewhere. */}
      <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">Fleet</span>
            <h2 className="section-title">Vehicle Options from {data.name}</h2>
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

      {/* Practical Airport Travel Tips */}
      {data.practicalInfo && data.practicalInfo.length > 0 && (
        <section className="section-lg">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Good to Know</span>
              <h2 className="section-title">Practical Tips for {data.name}</h2>
            </div>
            <div className="grid-3">
              {data.practicalInfo.map((item) => (
                <div key={item.title} className="card">
                  <h3 style={{ fontSize: "var(--text-base)" }}>{item.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.7 }}>{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews — only rendered where genuine, airport-specific reviews
          exist; never padded with a generic quote. */}
      {data.reviews && data.reviews.length > 0 && (
        <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Customer Reviews</span>
              <h2 className="section-title">What Travelers Say About {data.name}</h2>
            </div>
            <div className={styles.reviewGrid}>
              {data.reviews.map((r, i) => (
                <div key={i} className="card">
                  <div style={{ display: "flex", gap: "var(--space-1)", marginBottom: "var(--space-3)", color: "var(--accent)" }}>★★★★★</div>
                  <p style={{ color: "var(--text-body)", fontStyle: "italic", lineHeight: 1.75, marginBottom: "var(--space-4)" }}>&ldquo;{r.text}&rdquo;</p>
                  <p style={{ color: "var(--text-main)", fontWeight: 600 }}>{r.name}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{r.origin} · {data.name} Transfer</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
              <Link href="/routes" style={{ color: "var(--accent)", fontWeight: 700, fontSize: "var(--text-base)" }}>View all routes →</Link>
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
          {relatedCitiesFor(data).length > 0 && (
            <div style={{ marginTop: "var(--space-10)", paddingTop: "var(--space-10)", borderTop: "1px solid rgba(16,18,26,0.08)" }}>
              <h3 style={{ marginBottom: "var(--space-4)" }}>Related Cities</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
                {relatedCitiesFor(data).map((c) => (
                  <Link key={c.slug} href={`/services/${c.slug}`} className="btn btn-outline-gold btn-sm">{c.city}</Link>
                ))}
              </div>
            </div>
          )}
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
