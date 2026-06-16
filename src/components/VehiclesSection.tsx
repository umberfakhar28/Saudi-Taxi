import Link from "next/link";
import styles from "./VehiclesSection.module.css";

const vehicles = [
  {
    id: 1,
    name: "Toyota Camry",
    category: "Standard",
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80",
    desc1: "Smooth, fuel-efficient rides perfect for city commutes and airport transfers — dependable comfort every trip.",
    desc2:
      "Best suited for <strong>solo travelers &amp; small groups</strong> seeking reliability.",
  },
  {
    id: 2,
    name: "Lexus ES",
    category: "Premium",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80",
    desc1: "Premium leather interior with whisper-quiet cabin, turning every journey into a first-class experience.",
    desc2:
      "Best suited for <strong>executives &amp; couples</strong> who value refined comfort.",
  },
  {
    id: 3,
    name: "GMC Yukon",
    category: "SUV",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    desc1: "Commanding 7-seat SUV with generous cargo room — built for long journeys and rugged road conditions.",
    desc2:
      "Best suited for <strong>families &amp; groups</strong> exploring inter-city destinations.",
  },
  {
    id: 4,
    name: "Mercedes S-Class",
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
    desc1: "Iconic luxury sedan with massage seats, ambient lighting, and executive-class privacy on the road.",
    desc2:
      "Best suited for <strong>VIP travelers &amp; special occasions</strong> demanding the finest.",
  },
  {
    id: 5,
    name: "BMW 7 Series",
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
    desc1: "Dynamic performance meets handcrafted luxury — a bold, elegant ride for the discerning traveler.",
    desc2:
      "Best suited for <strong>professionals &amp; luxury seekers</strong> who appreciate prestige.",
  },
  {
    id: 6,
    name: "Toyota HiAce",
    category: "Van",
    image:
      "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=600&q=80",
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
                <img
                  src={car.image}
                  alt={car.name}
                  className={styles.image}
                  loading="lazy"
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
                  href={`/booking?car=${car.id}`}
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
