import styles from './KeyTakeaways.module.css';
import { TargetIcon } from './Icons';

interface KeyTakeawaysProps {
    items: string[];
}

const KeyTakeaways = ({ items }: KeyTakeawaysProps) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <TargetIcon size={20} className={styles.icon} />
                    <span className={styles.title}>TL;DR: Key Takeaways</span>
                </div>
                <ul className={styles.list}>
                    {items.map((item, index) => (
                        <li key={index} className={styles.item}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default KeyTakeaways;
