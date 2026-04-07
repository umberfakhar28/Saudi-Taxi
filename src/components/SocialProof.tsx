import styles from './SocialProof.module.css';
import { StarIcon, ShieldIcon, AwardIcon, ThumbsUpIcon } from './Icons';

const SocialProof = () => {
    const platforms = [
        { name: "Google", rating: "4.9/5", icon: <StarIcon className={styles.starIcon} size={16} /> },
        { name: "TripAdvisor", rating: "Top Rated", icon: <AwardIcon className={styles.awardIcon} size={16} /> },
        { name: "Yelp", rating: "Highly Recommended", icon: <ThumbsUpIcon className={styles.thumbsIcon} size={16} /> },
        { name: "Trusted Travels", rating: "Certified", icon: <ShieldIcon className={styles.shieldIcon} size={16} /> },
    ];

    return (
        <div className={styles.socialProof}>
            <div className={styles.container}>
                <p className={styles.label}>As Featured & Highly Rated On</p>
                <div className={styles.grid}>
                    {platforms.map((platform, index) => (
                        <div key={index} className={styles.platform}>
                            <div className={styles.platformIcon}>{platform.icon}</div>
                            <div className={styles.platformInfo}>
                                <span className={platform.name === "Google" ? styles.platformNameGoogle : styles.platformName}>
                                    {platform.name}
                                </span>
                                <span className={styles.platformRating}>{platform.rating}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SocialProof;
