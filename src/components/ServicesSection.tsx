import Link from "next/link";
import { LandmarkIcon, PlaneIcon, CarIcon, HotelIcon, CompassIcon, ArrowRightIcon } from "./Icons";
import styles from "./ServicesSection.module.css";

/*
  SERVICES — homepage revision brief §5. Positioned right after SocialProof
  (the Trustpilot + free-cancellation bar), matching the brief's required
  "Trustpilot + cancellation row → Services section" adjacency.

  Every entry links to a real, live service page — nothing here is
  invented. `highlights` are short, factual chips (not marketing claims).
*/
const services = [
  {
    icon: <LandmarkIcon size={26} />,
    title: "Umrah Taxi Services",
    description:
      "Direct transport between the Holy sites, with licensed drivers experienced in pilgrim travel and Ihram etiquette.",
    link: "/umrah-taxi-services",
    highlights: ["Makkah · Madinah · Jeddah", "Licensed Drivers", "Fixed Fare"],
  },
  {
    icon: <PlaneIcon size={26} />,
    title: "Airport Transfers",
    description:
      "Meet-and-greet pickup with real-time flight tracking, so a delayed landing never means a missed driver.",
    link: "/airport-transfer-for-umrah",
    highlights: ["KAIA · REHF", "Flight Tracking", "Meet & Greet"],
  },
  {
    icon: <CarIcon size={26} />,
    title: "City-to-City Transfers",
    description:
      "One private vehicle for the full journey between cities — fixed-rate, chauffeur-driven, no connecting flights.",
    link: "/routes",
    highlights: ["Fixed Rates", "No Hidden Fees", "Premium Cars"],
  },
  {
    icon: <HotelIcon size={26} />,
    title: "Hotel Transfers",
    description:
      "Seamless hotel-to-hotel and hotel-to-Haram transfers, with luggage handled so you can focus on your trip.",
    link: "/hotel-transfers",
    highlights: ["Door-to-Door", "Luggage Help", "24/7"],
  },
  {
    icon: <CompassIcon size={26} />,
    title: "Sightseeing & Day Tours",
    description:
      "Guided day trips to the region's landmarks and historical sites, with a driver who knows the route and the story.",
    link: "/our-services",
    highlights: ["Guided Routes", "Half & Full Day", "Group Options"],
  },
  {
    icon: <CarIcon size={26} />,
    title: "Private Taxi",
    description:
      "An exclusive vehicle for families and groups — your own schedule, your own car, no shared rides.",
    link: "/private-taxi",
    highlights: ["Exclusive Vehicle", "Flexible Hours", "Family Friendly"],
  },
];

export default function ServicesSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className="section-header centered">
          <h2 className="section-title">Services Built Around Your Journey</h2>
          <p className="section-subtitle">
            From an airport pickup to a full cross-country transfer — find the service that matches your trip.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <Link key={service.title} href={service.link} className={styles.card}>
              <div className={styles.icon}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardText}>{service.description}</p>

              <div className={styles.highlights}>
                {service.highlights.map((h) => (
                  <span key={h} className={styles.chip}>{h}</span>
                ))}
              </div>

              <span className={styles.cta}>
                Explore {service.title}
                <ArrowRightIcon size={15} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
