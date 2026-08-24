import styles from './SocialProof.module.css';
import { CheckCircleIcon } from './Icons';

// The "Review us on Trustpilot" link + star mark that used to live here was
// removed — it pointed to href="#" (no real Trustpilot profile exists yet)
// while visually presenting a five-star rating, which reads as a claimed
// rating with no backing. Re-add it once a real profile URL exists to link.
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
            </div>
        </div>
    );
};

export default SocialProof;
