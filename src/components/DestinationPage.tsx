import Link from "next/link";
import Image from "next/image";
import { PlaneIcon, CarIcon, ClockIcon, ChevronRightIcon, CompassIcon, MapPinIcon } from "@/components/Icons";
import DestinationCard from "@/components/DestinationCard";
import DestinationEnquiryForm from "@/components/DestinationEnquiryForm";
import RelatedLinks from "@/components/RelatedLinks";
import { countryFor, getDestination, type DestinationDetail } from "@/lib/destinationData";
import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";

/**
 * Shared template for every "Popular Destinations" page — one component,
 * all 20 new /destinations/[slug] pages render through it (same pattern as
 * AirportPage.tsx/CityServicePage.tsx for the site's other page families).
 * Section order is fixed per the Popular Destinations brief §6:
 * hero → enquiry form → why visit → attractions → transfer options →
 * internal links → related destinations → closing CTA.
 */
export default function DestinationPage({ data }: { data: DestinationDetail }) {
    const country = countryFor(data.country);
    const related = data.relatedSlugs
        .map((slug) => getDestination(slug))
        .filter((d): d is NonNullable<typeof d> => Boolean(d));

    const schemas = [
        serviceSchema({
            name: `Private Taxi & Chauffeur Service in ${data.name}`,
            description: data.metaDescription,
            url: `/destinations/${data.slug}`,
            areaServed: [data.name, country.name],
        }),
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

            {/* Enquiry / search — prominent, right below the hero, destination
                preselected per §8. */}
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
                                    <strong style={{ color: "var(--text-main)" }}>Availability:</strong> 24/7, fixed rates
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

            {/* Transfer & service options */}
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
                        </div>
                        <div className="card">
                            <div className="card-icon"><CarIcon size={22} /></div>
                            <h3>City Transfer</h3>
                            <p>{data.cityTransferInfo}</p>
                        </div>
                        <div className="card">
                            <div className="card-icon"><ClockIcon size={22} /></div>
                            <h3>Hourly Chauffeur</h3>
                            <p>{data.chauffeurInfo}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Internal links to relevant routes/services */}
            {data.internalLinks.length > 0 && (
                <RelatedLinks title={`Relevant Routes & Services for ${data.name}`} links={data.internalLinks} />
            )}

            {/* Related destinations */}
            {related.length > 0 && (
                <section className="section-lg">
                    <div className="container">
                        <div className="section-header centered">
                            <span className="section-eyebrow">Keep Exploring</span>
                            <h2 className="section-title">Explore More Destinations</h2>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-6)" }}>
                            {related.map((d) => (
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
                        Fixed rates, professional drivers, and 24/7 availability — book online or message us on WhatsApp for an instant reply.
                    </p>
                    <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book Now</Link>
                        <Link href="/destinations" className="btn btn-outline btn-lg" style={{ color: "var(--white)", borderColor: "rgba(255,255,255,0.5)" }}>
                            Browse All Destinations
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

