import { Star, Users, Timer, ShieldCheck, Award, MessageSquare } from 'lucide-react';
import styles from './Features.module.css';

const Features = () => {
    const features = [
        {
            icon: <Star size={32} />,
            title: "Premium Fleet",
            description: "Choose from our wide range of luxury sedans, SUVs, and standard vehicles maintained to the highest standards."
        },
        {
            icon: <Users size={32} />,
            title: "Professional Drivers",
            description: "Experienced, multilingual chauffeurs dedicated to providing you with a safe and comfortable journey."
        },
        {
            icon: <Timer size={32} />,
            title: "24/7 Availability",
            description: "Whether it's an early morning airport transfer or a late-night ride, we are always ready to serve you."
        },
        {
            icon: <ShieldCheck size={32} />,
            title: "Certified Safety",
            description: "Fully licensed and insured service. We prioritize your safety with regular vehicle inspections and driver background checks."
        },
        {
            icon: <Award size={32} />,
            title: "Award Winning",
            description: "Shortlisted for the 2024 Riyadh Excellence in Service Award. Recognized for superior pilgrim transportation."
        },
        {
            icon: <MessageSquare size={32} />,
            title: "Multilingual Support",
            description: "Support available in Arabic, English, Urdu, and Hindi to ensure seamless communication during your stay."
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
