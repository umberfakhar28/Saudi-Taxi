
import styles from './services.module.css';
import Link from 'next/link';

export default function ServicesPage() {
    const services = [
        {
            title: "Airport Transfers",
            description: "Avoid the hassle of finding a taxi upon arrival. Our professional chauffeurs track your flight and meet you at the terminal for a seamless transfer to your hotel or destination.",
            image: "✈️"
        },
        {
            title: "Corporate Transport",
            description: "Impress your clients and ensure your team travels in comfort with our luxury corporate transport solutions. Reliable, punctual, and discreet service for your business needs.",
            image: "🏢"
        },
        {
            title: "Hajj & Umrah Transport",
            description: "Specialized transport services for pilgrims. We provide comfortable and reliable journeys between Makkah, Madinah, and Jeddah with experienced drivers who know the routes perfectly.",
            image: "🕋"
        },
        {
            title: "City Tours",
            description: "Explore the beauty of Saudi Arabia with our customized city tours. Visit historical landmarks, modern attractions, and hidden gems with our knowledgeable driver-guides.",
            image: "🏙"
        }
    ];

    return (
        <main>
            <div className={styles.hero}>
                <h1 className={styles.title}>Our Services</h1>
                <p>Tailored transport solutions for every need</p>
            </div>

            <div className={styles.container}>
                {services.map((service, index) => (
                    <div key={index} className={`${styles.serviceRow} ${index % 2 !== 0 ? styles.reverse : ''}`}>
                        <div className={styles.image} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', background: '#f5f5f5' }}>
                            {service.image}
                        </div>
                        <div className={styles.content}>
                            <h2 className={styles.serviceTitle}>{service.title}</h2>
                            <p className={styles.serviceText}>{service.description}</p>
                            <Link href="/booking" className={styles.link}>
                                Book This Service
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
