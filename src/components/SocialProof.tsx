import styles from './SocialProof.module.css';
import { StarIcon, CheckCircleIcon } from './Icons';

/* Simplified Trustpilot watermark — five-star row + wordmark, in Trustpilot's
   own brand green. A third-party brand mark like this keeps its own brand
   color regardless of the site's theme (same convention as a "Sign in with
   Google" button keeping Google's colors). */
const TrustpilotMark = () => (
    <span className={styles.trustpilotMark}>
        <span className={styles.trustpilotStars}>
            {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} size={12} />
            ))}
        </span>
        <span className={styles.trustpilotWordmark}>Trustpilot</span>
    </span>
);

const SocialProof = () => {
    return (
        <div className={styles.socialProof}>
            <div className={styles.container}>
                <a
                    href="/terms-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.trustNote}
                >
                    <CheckCircleIcon size={15} />
                    Free cancellation up to 24 hours before pickup
                </a>

                <a href="#" target="_blank" rel="noopener noreferrer" className={styles.trustpilot}>
                    Review us on
                    <TrustpilotMark />
                </a>
            </div>
        </div>
    );
};

export default SocialProof;
