import Link from "next/link";
import Image from "next/image";
import styles from "./VehiclesSection.module.css";

const vehicles = [
  {
    id: 1,
    name: "Toyota Camry",
    category: "Standard",
    image: "/images/fleet-sedan2.jpg",
    objectPosition: "20% center",
    desc1: "Smooth, fuel-efficient rides perfect for city commutes and airport transfers — dependable comfort every trip.",
    desc2:
      "Best suited for <strong>solo travelers &amp; small groups</strong> seeking reliability.",
  },
  {
    id: 2,
    name: "Lexus ES",
    category: "Premium",
    image: "/images/chauffeur.jpg",
    objectPosition: "center 30%",
    desc1: "Premium leather interior with whisper-quiet cabin, turning every journey into a first-class experience.",
    desc2:
      "Best suited for <strong>executives &amp; couples</strong> who value refined comfort.",
  },
  {
    id: 3,
    name: "GMC Yukon",
    category: "SUV",
    image: "/images/fleet-suv.jpg",
    objectPosition: "center top",
    desc1: "Commanding 7-seat SUV with generous cargo room — built for long journeys and rugged road conditions.",
    desc2:
      "Best suited for <strong>families &amp; groups</strong> exploring inter-city destinations.",
  },
  {
    id: 4,
    name: "Mercedes S-Class",
    category: "Luxury",
    image: "/images/interior.jpg",
    objectPosition: "center center",
    desc1: "Iconic luxury sedan with massage seats, ambient lighting, and executive-class privacy on the road.",
    desc2:
      "Best suited for <strong>VIP travelers &amp; special occasions</strong> demanding the finest.",
  },
  {
    id: 5,
    name: "BMW 7 Series",
    category: "Luxury",
    image: "/images/fleet-sedan.jpg",
    objectPosition: "center top",
    desc1: "Dynamic performance meets handcrafted luxury — a bold, elegant ride for the discerning traveler.",
    desc2:
      "Best suited for <strong>professionals &amp; luxury seekers</strong> who appreciate prestige.",
  },
  {
    id: 6,
    name: "Toyota HiAce",
    category: "Van",
    image: "/images/fleet-van.jpg",
    objectPosition: "center top",
    desc1: "Spacious 12-passenger van with enormous luggage capacity — the ultimate group travel solution.",
    desc2:
      "Best suited for <strong>large groups &amp; full Umrah party transfers</strong> all together.",
  },
];

export default function VehiclesSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        {/* Section header */}
        <div className="section-header centered">
          <span className="section-eyebrow">Our Fleet</span>
          <h2 className="section-title">Vehicles Available For Convenient Ride</h2>
          <p className="section-subtitle">
            Choose from our hand-picked selection of premium vehicles — each maintained to the highest standards for your comfort and safety.
          </p>
        </div>

        {/* Vehicle grid */}
        <div className={styles.grid}>
          {vehicles.map((car) => (
            <div key={car.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={car.image}
                  alt={`${car.name} — ${car.category} vehicle`}
                  fill
                  className={styles.image}
                  style={{ objectPosition: car.objectPosition }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className={styles.badge}>{car.category}</span>
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{car.name}</h3>
                <p
                  className={styles.desc}
                  dangerouslySetInnerHTML={{ __html: car.desc1 }}
                />
                <p
                  className={styles.desc}
                  dangerouslySetInnerHTML={{ __html: car.desc2 }}
                />
                <div className={styles.spacer} />
                <Link
                  href={`/book-online?car=${car.id}`}
                  className={styles.cta}
                >
                  Book Now
                  <span className={styles.ctaArrow}>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
