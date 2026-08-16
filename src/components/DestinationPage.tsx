import Link from "next/link";
import Image from "next/image";
import { PlaneIcon, CarIcon, ClockIcon, ChevronRightIcon, CompassIcon, MapPinIcon, WhatsAppIcon, ShieldIcon } from "@/components/Icons";
import DestinationCard from "@/components/DestinationCard";
import DestinationEnquiryForm from "@/components/DestinationEnquiryForm";
import RelatedLinks from "@/components/RelatedLinks";
import { countryFor, getDestination, type DestinationDetail } from "@/lib/destinationData";
import { serviceSchema, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { waLink } from "@/lib/contact";
import { FLEET_TIERS } from "@/lib/fleetConfig";
import styles from "./DestinationPage.module.css";

/**
 * Shared template for every "Popular Destinations" page — one component,
 * all 20 /destinations/[slug] pages render through it (same pattern as
 * AirportPage.tsx/CityServicePage.tsx for the site's other page families).
 *
 * This is the site's Country/Destination family (Phase 7): each page covers
 * one Gulf city (Dubai, Doha, Manama, Muscat, Kuwait City, and others),
 * grouped by country via `DestinationDetail.country` — the /destinations
 * index page is the country-level directory above it. There is no separate
 * "whole-country" hub page (e.g. a standalone /uae page) — none existed
 * before this phase and none is added here, per the phase's explicit
 * "do not create new pages" rule.
 */

/** Universal transportation use cases — the scenarios apply to every Gulf
 * destination this business serves, so this is one shared list (interpolated
 * with the destination name) rather than 20 near-identical copies. */
const USE_CASES = (name: string) => [
  { icon: "✈️", title: "Airport Travel", description: `Arrival at the airport, straight to your hotel or first stop in ${name} — flight-tracked pickup included.` },
  { icon: "💼", title: "Business Travel", description: `Airport to hotel to meetings — a private vehicle on call for a full business day in ${name}.` },
  { icon: "🏖️", title: "Leisure Travel", description: `Hotel to attractions and back, at your own pace, without arranging separate one-way trips.` },
  { icon: "👨‍👩‍👧‍👦", title: "Family Travel", description: `Comfortable private transportation between hotels, sights and dining — no juggling multiple taxis.` },
  { icon: "🌍", title: "Intercity & Cross-Border Travel", description: `Private road transfers connecting ${name} to Saudi Arabia and neighboring Gulf destinations.` },
];

const HOW_IT_WORKS = [
  { title: "Choose Your Journey", description: "Select an airport transfer, city transfer, or hourly chauffeur." },
  { title: "Book", description: "Share your travel details — pickup point, destination, date and time." },
  { title: "Confirm", description: "Receive booking confirmation with your driver and vehicle details." },
  { title: "Pickup & Transfer", description: "Meet your driver at the agreed location and travel to your destination." },
];

export default function DestinationPage({ data }: { data: DestinationDetail }) {
    const country = countryFor(data.country);
    const related = data.relatedSlugs
        .map((slug) => getDestination(slug))
        .filter((d): d is NonNullable<typeof d> => Boolean(d));
    const sameCountry = related.filter((d) => d.country === data.country);
    const otherCountries = related.filter((d) => d.country !== data.country);
    const primaryRouteLink = data.internalLinks[0];
    const primaryRelated = related[0];
    const quoteMessage = `Hello GulfTripService, I would like to get a quote for private transportation in ${data.name}, ${country.name}. Please share the available options and booking details. Thank you.`;

    const schemas = [
        serviceSchema({
            name: `Private Taxi & Chauffeur Service in ${data.name}`,
            description: data.metaDescription,
            url: `/destinations/${data.slug}`,
            areaServed: [data.name, country.name],
        }),
        faqSchema(data.faqs.map((f) => ({ question: f.q, answer: f.a }))),
        breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/destinations" },
            { name: data.name, path: `/destinations/${data.slug}` },
        ]),
    ];

    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />

            {/* Hero — same photo + navy scrim + centered text pattern as
                AirportPage.tsx's hero, used sitewide for interior photo heroes. */}
            <section style={{ position: "relative", padding: "9rem 0 5rem", overflow: "hidden", color: "var(--white)", textAlign: "center" }}>
                <Image
                    src={data.heroImage}
                    alt={data.heroImageAlt}
                    fill
                    style={{ objectFit: "cover", zIndex: 0 }}
                    sizes="100vw"
                    priority
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(3,10,37,0.72) 0%, rgba(3,10,37,0.84) 100%)", zIndex: 1 }} />
                <div className="container" style={{ position: "relative", zIndex: 2 }}>
                    <span className="badge" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: "var(--white)" }}>
                        {country.flag} {country.name}
                    </span>
                    <h1 style={{ color: "var(--white)", marginTop: "var(--space-4)" }}>{data.h1}</h1>
                    <p style={{ color: "rgba(255,255,255,0.85)", maxWidth: 680, margin: "var(--space-4) auto 0", fontSize: "var(--text-lg)" }}>
                        {data.intro}
                    </p>
                    <div className="breadcrumb" style={{ color: "rgba(255,255,255,0.65)", marginTop: "var(--space-6)" }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.8)" }}>Home</Link>{" "}
                        <ChevronRightIcon size={12} style={{ display: "inline", verticalAlign: "middle" }} />{" "}
                        <Link href="/destinations" style={{ color: "rgba(255,255,255,0.8)" }}>Destinations</Link>{" "}
                        <ChevronRightIcon size={12} style={{ display: "inline", verticalAlign: "middle" }} />{" "}
                        <span>{data.name}</span>
                    </div>
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

            {/* Enquiry / search — prominent, right below Quick Facts, destination
                preselected per the original Popular Destinations brief §8. */}
            <section className="section-lg" style={{ paddingTop: "var(--space-10)" }}>
                <div className="container" style={{ maxWidth: 900 }}>
                    <DestinationEnquiryForm
                        destinationName={data.name}
                        countryName={country.name}
                        sourcePage={`/destinations/${data.slug}`}
                    />
                </div>
            </section>

            {/* Why visit */}
            <section className="section-lg" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="grid-60-40">
                        <div>
                            <div className="section-header">
                                <span className="section-eyebrow">Why Visit</span>
                                <h2 className="section-title">Traveling to {data.name}</h2>
                            </div>
                            <p style={{ color: "var(--text-body)", lineHeight: 1.8 }}>{data.whyVisit}</p>
                            {(primaryRouteLink || primaryRelated) && (
                                <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginTop: "var(--space-4)" }}>
                                    Most travelers arrange a private{" "}
                                    <Link href="/hotel-transfers" style={{ color: "var(--accent)", fontWeight: 600 }}>hotel pickup or drop-off</Link>{" "}
                                    as part of the trip.{" "}
                                    {primaryRouteLink && (
                                        <>
                                            For onward travel, see our{" "}
                                            <Link href={primaryRouteLink.href} style={{ color: "var(--accent)", fontWeight: 600 }}>{primaryRouteLink.label}</Link>.{" "}
                                        </>
                                    )}
                                    {primaryRelated && (
                                        <>
                                            You can also extend the trip to{" "}
                                            <Link href={primaryRelated.href} style={{ color: "var(--accent)", fontWeight: 600 }}>{primaryRelated.name}</Link>.
                                        </>
                                    )}
                                </p>
                            )}
                        </div>
                        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                            <div className="card-icon"><MapPinIcon size={22} /></div>
                            <h3>At a Glance</h3>
                            <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                                <li style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>
                                    <strong style={{ color: "var(--text-main)" }}>Country:</strong> {country.flag} {country.name}
                                </li>
                                <li style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>
                                    <strong style={{ color: "var(--text-main)" }}>Service:</strong> Private taxi, airport transfer &amp; hourly chauffeur
                                </li>
                                <li style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>
                                    <strong style={{ color: "var(--text-main)" }}>Availability:</strong> 24/7 booking
                                </li>
                            </ul>
                            <Link href="/book-online" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>Book Now</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular attractions */}
            <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">Popular Places</span>
                        <h2 className="section-title">Attractions in {data.name}</h2>
                    </div>
                    <div className="grid-2">
                        {data.attractions.map((a) => (
                            <div key={a.name} className="card">
                                <div className="card-icon"><CompassIcon size={22} /></div>
                                <h3>{a.name}</h3>
                                <p>{a.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services available — transfer & chauffeur options, linking out to
                the corresponding Core Service pages. */}
            <section className="section-lg">
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">How We Serve {data.name}</span>
                        <h2 className="section-title">Transfer &amp; Chauffeur Options</h2>
                    </div>
                    <div className="grid-3">
                        <div className="card">
                            <div className="card-icon"><PlaneIcon size={22} /></div>
                            <h3>Airport Transfer</h3>
                            <p>{data.airportInfo}</p>
                            <Link href="/airport-transfers" style={{ color: "var(--accent)", fontWeight: 700, fontSize: "var(--text-sm)" }}>All airport transfers →</Link>
                        </div>
                        <div className="card">
                            <div className="card-icon"><CarIcon size={22} /></div>
                            <h3>City Transfer</h3>
                            <p>{data.cityTransferInfo}</p>
                            <Link href="/private-taxi" style={{ color: "var(--accent)", fontWeight: 700, fontSize: "var(--text-sm)" }}>Private taxi service →</Link>
                        </div>
                        <div className="card">
                            <div className="card-icon"><ClockIcon size={22} /></div>
                            <h3>Hourly Chauffeur</h3>
                            <p>{data.chauffeurInfo}</p>
                            <Link href="/corporate-transportation-services" style={{ color: "var(--accent)", fontWeight: 700, fontSize: "var(--text-sm)" }}>Corporate transportation →</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Travel Use Cases */}
            <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">Travel Scenarios</span>
                        <h2 className="section-title">Ways We&apos;re Used in {data.name}</h2>
                    </div>
                    <div className="grid-3">
                        {USE_CASES(data.name).map((uc) => (
                            <div key={uc.title} className="card" style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "2.2rem", marginBottom: "var(--space-3)" }}>{uc.icon}</div>
                                <h3 style={{ fontSize: "var(--text-base)" }}>{uc.title}</h3>
                                <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{uc.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vehicle Options — shared fleet data, real images/capacities. */}
            <section className="section-lg">
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">Fleet</span>
                        <h2 className="section-title">Vehicle Options</h2>
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

            {/* How Transportation Works */}
            <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">How It Works</span>
                        <h2 className="section-title">Booking Your {data.name} Transfer</h2>
                    </div>
                    <div className="grid-4">
                        {HOW_IT_WORKS.map((step, i) => (
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

            {/* Why Choose Gulf Trip Service */}
            <section className="section-lg">
                <div className="container">
                    <div className="section-header centered">
                        <span className="section-eyebrow">Why Choose Us</span>
                        <h2 className="section-title">Why Travel with Gulf Trip Service</h2>
                    </div>
                    <div className="grid-3">
                        <div className="card" style={{ textAlign: "center" }}>
                            <div className="card-icon" style={{ margin: "0 auto var(--space-3)" }}><ShieldIcon size={22} /></div>
                            <h3 style={{ fontSize: "var(--text-base)" }}>Private, Not Shared</h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>Every booking is a private vehicle for your group — no shared rides or extra stops.</p>
                        </div>
                        <div className="card" style={{ textAlign: "center" }}>
                            <div className="card-icon" style={{ margin: "0 auto var(--space-3)" }}><ClockIcon size={22} /></div>
                            <h3 style={{ fontSize: "var(--text-base)" }}>24/7 Booking &amp; Support</h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>Book online or on WhatsApp any time, with support available around the clock.</p>
                        </div>
                        <div className="card" style={{ textAlign: "center" }}>
                            <div className="card-icon" style={{ margin: "0 auto var(--space-3)" }}><CarIcon size={22} /></div>
                            <h3 style={{ fontSize: "var(--text-base)" }}>Real Coverage, Real Fleet</h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>Sedan through to van options, genuinely available for the routes and destinations we list.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Practical Travel Information */}
            {data.practicalInfo.length > 0 && (
                <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
                    <div className="container">
                        <div className="section-header centered">
                            <span className="section-eyebrow">Good to Know</span>
                            <h2 className="section-title">Practical Information for {data.name}</h2>
                        </div>
                        <div className="grid-2">
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

            {/* Reviews */}
            {data.reviews.length > 0 && (
                <section className="section-lg">
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
            {data.faqs.length > 0 && (
                <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
                    <div className="container">
                        <div className="section-header centered">
                            <span className="section-eyebrow">FAQ</span>
                            <h2 className="section-title">{data.name} — Frequently Asked Questions</h2>
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
            )}

            {/* Internal links to relevant routes/services */}
            {data.internalLinks.length > 0 && (
                <RelatedLinks title={`Relevant Routes & Services for ${data.name}`} links={data.internalLinks} />
            )}

            {/* Related destinations — split so travelers see other places in the
                same country (this family's "cities served" equivalent) before
                destinations elsewhere in the Gulf. */}
            {sameCountry.length > 0 && (
                <section className="section-lg">
                    <div className="container">
                        <div className="section-header centered">
                            <span className="section-eyebrow">{country.flag} {country.name}</span>
                            <h2 className="section-title">More Destinations in {country.name}</h2>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-6)" }}>
                            {sameCountry.map((d) => (
                                <DestinationCard key={d.slug} destination={d} sizes="(max-width: 640px) 90vw, (max-width: 1024px) 30vw, 20vw" />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {otherCountries.length > 0 && (
                <section className="section-lg" style={{ background: "var(--bg-subtle)" }}>
                    <div className="container">
                        <div className="section-header centered">
                            <span className="section-eyebrow">Keep Exploring</span>
                            <h2 className="section-title">Explore More Destinations</h2>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-6)" }}>
                            {otherCountries.map((d) => (
                                <DestinationCard key={d.slug} destination={d} sizes="(max-width: 640px) 90vw, (max-width: 1024px) 30vw, 20vw" />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Closing CTA */}
            <section style={{ background: "linear-gradient(135deg, var(--bg-dark), var(--accent-dark))", padding: "5rem 0", textAlign: "center" }}>
                <div className="container">
                    <h2 style={{ color: "var(--white)", marginBottom: "1rem" }}>Ready to Book Your {data.name} Transfer?</h2>
                    <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-8)" }}>
                        Professional drivers and 24/7 availability — book online or message us on WhatsApp for an instant reply.
                    </p>
                    <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book Now</Link>
                        <a href={waLink(quoteMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                            <WhatsAppIcon size={18} /> WhatsApp Us
                        </a>
                        <Link href="/destinations" className="btn btn-outline btn-lg" style={{ color: "var(--white)", borderColor: "rgba(255,255,255,0.5)" }}>
                            Browse All Destinations
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
