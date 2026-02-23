import styles from './TrustBadges.module.css';
import { ShieldCheck, Award, FileCheck, CheckCircle2 } from 'lucide-react';

const TrustBadges = () => {
    const badges = [
        { icon: <ShieldCheck size={24} />, text: "Ministry Licensed" },
        { icon: <Award size={24} />, text: "Top Service 2024" },
        { icon: <FileCheck size={24} />, text: "Full Insurance" },
        { icon: <CheckCircle2 size={24} />, text: "Verified Drivers" },
    ];

    return (
        <div className={styles.section}>
            <div className="container">
                <div className={styles.grid}>
                    {badges.map((badge, index) => (
                        <div key={index} className={styles.badge}>
                            <div className={styles.iconWrapper}>{badge.icon}</div>
                            <span className={styles.text}>{badge.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustBadges;
