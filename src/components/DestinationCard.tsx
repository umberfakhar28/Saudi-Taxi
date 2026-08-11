import Link from 'next/link';
import Image from 'next/image';
import { countryFor, type DestinationSummary } from '@/lib/destinationData';
import styles from './DestinationCard.module.css';

/**
 * Full-bleed image card for a destination — used on the homepage Trending
 * Destinations section, the /destinations listing page, and each
 * destination page's "Explore More Destinations" grid. Same visual
 * language as the Fleet page's interior showcase cards (image + bottom
 * gradient caption), extended with a flag + country row and full-card
 * click target per the Popular Destinations brief §3.
 */
export default function DestinationCard({
    destination,
    priority,
    sizes = '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw',
}: {
    destination: DestinationSummary;
    priority?: boolean;
    sizes?: string;
}) {
    const country = countryFor(destination.country);

    return (
        <Link href={destination.href} className={styles.card} aria-label={`${destination.name}, ${country.name} — view destination`}>
            <Image
                src={destination.image}
                alt={destination.imageAlt}
                fill
                priority={priority}
                sizes={sizes}
                className={styles.image}
            />
            <div className={styles.overlay} />
            <div className={styles.content}>
                <h3 className={styles.name}>{destination.name}</h3>
                <span className={styles.country}>
                    <span className={styles.flag} aria-hidden="true">{country.flag}</span>
                    {country.name}
                </span>
            </div>
        </Link>
    );
}
