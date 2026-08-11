import Link from 'next/link';
import DestinationCard from './DestinationCard';
import { FEATURED_DESTINATIONS } from '@/lib/destinationData';
import styles from './TrendingDestinations.module.css';

/**
 * Homepage "Popular / Trending Destinations" section — sits above the
 * existing vehicle-type cards (VehicleTypeCarousel) in src/app/page.tsx.
 * Featured cards are the 6 flagship Gulf cities (see
 * src/lib/destinationData.ts's `featured` flag); "View All Popular
 * Destinations" leads to the full /destinations directory covering every
 * place in the brief.
 */
export default function TrendingDestinations() {
    return (
        <section className={`section-lg ${styles.section}`}>
            <div className="container">
                <div className="section-header centered">
                    <span className="section-eyebrow">Trending Destinations</span>
                    <h2 className="section-title">Premium Travel, Every Ride</h2>
                    <p className="section-subtitle">
                        Private chauffeur service, airport transfers, and city-to-city travel across Saudi Arabia
                        and the wider Gulf — comfortable, reliable transportation to the region&apos;s most popular
                        destinations, with fixed rates and professional drivers available 24/7.
                    </p>
                </div>

                <div className={styles.grid}>
                    {FEATURED_DESTINATIONS.map((destination, i) => (
                        <DestinationCard
                            key={destination.slug}
                            destination={destination}
                            priority={i === 0}
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                        />
                    ))}
                </div>

                <div className={styles.viewAll}>
                    <Link href="/destinations" className="btn btn-primary btn-lg">
                        View All Popular Destinations
                    </Link>
                </div>
            </div>
        </section>
    );
}
