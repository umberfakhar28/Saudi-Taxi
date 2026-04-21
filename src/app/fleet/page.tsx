
import styles from './fleet.module.css';
import Link from 'next/link';

export default function FleetPage() {
    const fleet = [
        {
            id: 1,
            name: "Toyota Camry",
            category: "Standard",
            image: "/images/camry.jpg", // Placeholder
            passengers: 4,
            luggage: 2,
            price: "Check Rates",
            unit: ""
        },
        {
            id: 2,
            name: "Lexus ES",
            category: "Premium",
            image: "/images/lexus.jpg",
            passengers: 4,
            luggage: 3,
            price: "Check Rates",
            unit: ""
        },
        {
            id: 3,
            name: "GMC Yukon",
            category: "SUV",
            image: "/images/yukon.jpg",
            passengers: 7,
            luggage: 5,
            price: "Check Rates",
            unit: ""
        },
        {
            id: 4,
            name: "Mercedes S-Class",
            category: "Luxury",
            image: "/images/sclass.jpg",
            passengers: 3,
            luggage: 2,
            price: "Check Rates",
            unit: ""
        },
        {
            id: 5,
            name: "BMW 7 Series",
            category: "Luxury",
            image: "/images/bmw7.jpg",
            passengers: 3,
            luggage: 2,
            price: "Check Rates",
            unit: ""
        },
        {
            id: 6,
            name: "Toyota HiAce",
            category: "Van",
            image: "/images/hiace.jpg",
            passengers: 12,
            luggage: 10,
            price: "Check Rates",
            unit: ""
        }
    ];

    return (
        <main>
            <div className={styles.header}>
                <h1 className={styles.title}>Our Fleet</h1>
                <p className={styles.subtitle}>Choose from our range of premium vehicles</p>
            </div>

            <section className={`container ${styles.section}`}>
                <div className={styles.grid}>
                    {fleet.map((car) => (
                        <div key={car.id} className={styles.carCard}>
                            <div className={styles.imageContainer}>
                                {/* Using a div with background color as placeholder if image fails, or next/image */}
                                <div style={{ width: '100%', height: '100%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                                    {car.name} Image
                                </div>
                            </div>
                            <div className={styles.carDetails}>
                                <span className={styles.category}>{car.category}</span>
                                <h3 className={styles.carTitle}>{car.name}</h3>
                                <div className={styles.specs}>
                                    <span>👤 {car.passengers} Passengers</span>
                                    <span>🧳 {car.luggage} Bags</span>
                                </div>
                                <div className={styles.priceContainer}>
                                    <div>
                                        <span className={styles.price}>{car.price}</span>
                                        <span className={styles.unit}>{car.unit}</span>
                                    </div>
                                    <Link href={`/booking?car=${car.id}`} className={styles.bookBtn}>
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
