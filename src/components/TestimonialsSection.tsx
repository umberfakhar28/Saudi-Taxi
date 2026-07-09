import styles from "./TestimonialsSection.module.css";

const testimonials = [
  {
    name: "Omar Sheikh",
    location: "Karachi, Pakistan",
    rating: 5,
    service: "Airport Transfer",
    text: "Arrived at Jeddah airport at 2 AM and the driver was already waiting with a smile. Helped with all our bags, drove smoothly, and the AC was perfect. Made our first Umrah stress-free from the moment we landed.",
  },
  {
    name: "Hind Al-Mutairi",
    location: "Kuwait City, Kuwait",
    rating: 5,
    service: "Jeddah to Makkah",
    text: "I've used several taxi services in Saudi but this was by far the most professional. The car smelled fresh, the driver was courteous, and the WhatsApp updates gave my family peace of mind back home.",
  },
  {
    name: "David Chen",
    location: "Shanghai, China",
    rating: 5,
    service: "Umrah Package",
    text: "Our 8-day Umrah package was flawlessly arranged. Driver picked us up from the hotel every morning for prayers, waited patiently, and even recommended great local restaurants. Exceptional hospitality throughout.",
  },
  {
    name: "Amina Diop",
    location: "Dakar, Senegal",
    rating: 5,
    service: "Makkah to Madinah",
    text: "The 5-hour drive from Makkah to Madinah was so comfortable that my children slept most of the way. The SUV had plenty of space for our family of six and all our luggage. Worth every riyal.",
  },
  {
    name: "Saeed Younis",
    location: "Cairo, Egypt",
    rating: 4,
    service: "Ziyarat Tour",
    text: "Our driver took us to all the important Ziyarat sites in and around Madinah. He knew the history behind each place and gave us plenty of time at each stop. A deeply meaningful experience.",
  },
  {
    name: "Marina Fischer",
    location: "Berlin, Germany",
    rating: 5,
    service: "Private Taxi",
    text: "I booked a private car for a business trip between Jeddah and Makkah. The driver was punctual, the car had working WiFi, and I was able to take calls the entire way. Seamless experience.",
  },
];

export default function TestimonialsSection() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? styles.starFilled : styles.starEmpty}
      >
        ★
      </span>
    ));
  };

  return (
    <section className={styles.section}>
      <div className="container">
        {/* Section header */}
        <div className="section-header centered">
          <span className="section-eyebrow">Testimonials</span>
          <h2 className="section-title">
            Real Stories From Our Riders
          </h2>
          <div className="divider-gold" style={{ margin: '1rem auto 1.5rem' }} />
          <p className="section-subtitle">
            Genuine feedback from pilgrims and travelers who trusted us with their journey.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.card}>
              {/* Header */}
              <div className={styles.header}>
                <div className={styles.avatar}>{t.name.charAt(0)}</div>
                <div className={styles.info}>
                  <p className={styles.name}>{t.name}</p>
                  <p className={styles.location}>{t.location}</p>
                </div>
              </div>

              {/* Stars */}
              <div className={styles.stars}>{renderStars(t.rating)}</div>

              {/* Service badge */}
              <span className={styles.badge}>{t.service}</span>

              {/* Quote */}
              <p className={styles.quote}>{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
