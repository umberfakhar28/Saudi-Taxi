import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { ChevronRightIcon } from "@/components/Icons";
import DestinationCard from "@/components/DestinationCard";
import { COUNTRIES, destinationsByCountry } from "@/lib/destinationData";
import styles from "./destinations.module.css";

export const metadata = generatePageMetadata({
  title: "Popular Destinations",
  description: "Premium private taxi, chauffeur and airport transfer service across Saudi Arabia and the Gulf — Riyadh, Jeddah, Dubai, Doha, Manama, Muscat, Kuwait City and more. Find your destination.",
  path: "/destinations",
});

const schemas = [
  serviceSchema({
    name: "Popular Destinations — Gulf Trip Service",
    description: "Directory of every destination Gulf Trip Service covers across Saudi Arabia and the wider Gulf/GCC region.",
    url: "/destinations",
    areaServed: COUNTRIES.map((c) => c.name),
  }),
  breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations" }]),
];

export default function DestinationsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main>
        <section className="page-hero">
          <h1>Popular Destinations</h1>
          <p>
            Premium private chauffeur service and airport transfers across Saudi Arabia and the wider
            Gulf — explore every city and destination Gulf Trip Service covers, organized by country,
            with fixed rates and professional drivers available 24/7.
          </p>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <span>Destinations</span>
          </div>
        </section>

        {COUNTRIES.map((country) => {
          const destinations = destinationsByCountry(country.slug);
          if (destinations.length === 0) return null;
          return (
            <section key={country.slug} className="section-lg">
              <div className="container">
                <div className="section-header centered">
                  <span className="section-eyebrow">{country.flag} {country.name}</span>
                  <h2 className="section-title">{country.name} Destinations</h2>
                </div>

                <div className={styles.grid}>
                  {destinations.map((destination) => (
                    <div key={destination.slug} className={styles.item}>
                      <DestinationCard destination={destination} />
                      <p className={styles.blurb}>{destination.blurb}</p>
                      <Link href={destination.href} className={styles.cta}>
                        View {destination.name} Transfers <ChevronRightIcon size={14} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <section style={{ background: "linear-gradient(135deg, var(--bg-dark), var(--accent-dark))", padding: "5rem 0", textAlign: "center" }}>
          <div className="container">
            <h2 style={{ color: "var(--white)", marginBottom: "1rem" }}>Don&apos;t See Your Destination?</h2>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "var(--text-lg)", maxWidth: 560, margin: "0 auto var(--space-8)" }}>
              We cover routes and transfers across Saudi Arabia and the Gulf beyond this list — get in touch and
              our team will arrange it.
            </p>
            <Link href="/contact-us" className="btn btn-primary btn-lg">Contact Us</Link>
          </div>
        </section>
      </main>
    </>
  );
}
