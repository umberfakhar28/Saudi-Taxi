
import styles from './fleet.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
    title: "Our Fleet | Gulf Trip Service - Premium Vehicles for Every Journey",
    description: "Explore our fleet of premium vehicles in Saudi Arabia. From luxury sedans to family SUVs and minivans. Reliable, comfortable, and well-maintained for your journey.",
    path: "/fleet",
    keywords: ["taxi fleet Saudi Arabia", "luxury sedan taxi", "SUV hire", "minivan Saudi Arabia", "premium taxi fleet"],
});

export default function FleetPage() {
    const fleet = [
        {
            id: 1,
            name: "Toyota Camry",
            category: "Standard",
            image: "/images/fleet-sedan2.jpg",
            objectPosition: "20% center",
            passengers: 4,
            luggage: 2,
            price: "Check Rates",
            unit: ""
        },
        {
            id: 2,
            name: "Lexus ES",
            category: "Premium",
            image: "/images/chauffeur.jpg",
            objectPosition: "center 30%",
            passengers: 4,
            luggage: 3,
            price: "Check Rates",
            unit: ""
        },
        {
            id: 3,
            name: "GMC Yukon",
            category: "SUV",
            image: "/images/fleet-suv.jpg",
            objectPosition: "center top",
            passengers: 7,
            luggage: 5,
            price: "Check Rates",
            unit: ""
        },
        {
            id: 4,
            name: "Mercedes S-Class",
            category: "Luxury",
            image: "/images/interior.jpg",
            objectPosition: "center center",
            passengers: 3,
            luggage: 2,
            price: "Check Rates",
            unit: ""
        },
        {
            id: 5,
            name: "BMW 7 Series",
            category: "Luxury",
            image: "/images/fleet-sedan.jpg",
            objectPosition: "center top",
            passengers: 3,
            luggage: 2,
            price: "Check Rates",
            unit: ""
        },
        {
            id: 6,
            name: "Toyota HiAce",
            category: "Van",
            image: "/images/fleet-van.jpg",
            objectPosition: "center top",
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
                                <Image
                                    src={car.image}
                                    alt={`${car.name} — ${car.category} vehicle in the Gulf Trip Service fleet`}
                                    fill
                                    className={styles.carImage}
                                    style={{ objectPosition: car.objectPosition }}
                                    sizes="(max-width: 768px) 100vw, 350px"
                                />
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
                                    <Link href={`/book-online?car=${car.id}`} className={styles.bookBtn}>
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
