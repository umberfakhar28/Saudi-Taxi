import { MailIcon, ClockIcon, ShieldCheckIcon } from './Icons';
import { EMAIL } from '@/lib/contact';
import styles from './TopBar.module.css';

const TopBar = ({ transparent = false }: { transparent?: boolean }) => {
    return (
        <div className={`${styles.topBar} ${transparent ? styles.topBarTransparent : ''}`}>
            <div className={styles.container}>
                <a href={`mailto:${EMAIL}`} className={styles.item}>
                    <MailIcon size={13} />
                    {EMAIL}
                </a>

                <div className={styles.right}>
                    <span className={styles.item}>
                        <ClockIcon size={13} />
                        Available 24/7 for Private VIP Transfers
                    </span>
                    <span className={styles.divider} aria-hidden="true" />
                    <span className={styles.item}>
                        <ShieldCheckIcon size={13} />
                        Officially Licensed Travel Partner
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
