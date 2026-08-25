import styles from './SocialProof.module.css';
import { CheckCircleIcon, StarIcon, ExternalLinkIcon } from './Icons';
import { TRUSTPILOT_URL } from '@/lib/trustpilot';

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
                    <CheckCircleIcon size={17} />
                    Free cancellation up to 24 hours before pickup
                </a>

                <span className={styles.divider} aria-hidden="true" />

                <a
                    href={TRUSTPILOT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Read our reviews on Trustpilot (opens in a new tab)"
                    className={styles.trustpilotBlock}
                >
                    <span className={styles.trustpilotMark}>
                        <StarIcon size={12} />
                    </span>
                    <span className={styles.trustpilotWordmark}>Trustpilot</span>
                    <span className={styles.trustpilotLabel}>Verified reviews</span>
                    <ExternalLinkIcon size={13} className={styles.externalIcon} />
                </a>
            </div>
        </div>
    );
};

export default SocialProof;
