import styles from './TrustBadges.module.css';
import { ShieldIcon, AwardIcon, FileCheckIcon, CheckCircleIcon } from './Icons';

const TrustBadges = () => {
    const badges = [
        { icon: <ShieldIcon size={24} />, text: "Ministry Licensed" },
        { icon: <AwardIcon size={24} />, text: "Top Service 2024" },
        { icon: <FileCheckIcon size={24} />, text: "Full Insurance" },
        { icon: <CheckCircleIcon size={24} />, text: "Verified Drivers" },
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
