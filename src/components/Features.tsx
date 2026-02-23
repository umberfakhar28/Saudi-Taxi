
import styles from './Features.module.css';

const Features = () => {
    const features = [
        {
            icon: "★",
            title: "Premium Fleet",
            description: "Choose from our wide range of luxury sedans, SUVs, and standard vehicles maintained to the highest standards."
        },
        {
            icon: "👤",
            title: "Professional Drivers",
            description: "Experienced, multilingual chauffeurs dedicated to providing you with a safe and comfortable journey."
        },
        {
            icon: "⏱",
            title: "24/7 Availability",
            description: "Whether it's an early morning airport transfer or a late-night ride, we are always ready to serve you."
        }
    ];

    return (
        <section className={styles.features}>
            <div className={styles.container}>
                <h2 className={styles.title}>Why Choose Us</h2>
                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.icon}>{feature.icon}</div>
                            <h3 className={styles.cardTitle}>{feature.title}</h3>
                            <p className={styles.cardText}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
