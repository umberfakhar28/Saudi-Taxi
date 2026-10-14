import Link from 'next/link';
import { PlaneIcon, ArrowRightIcon } from './Icons';
import styles from './FlightDisruptionBanner.module.css';

/**
 * Homepage callout for travellers whose Riyadh flight has fallen through —
 * sits directly under the hero (src/app/page.tsx), above TrendingDestinations.
 *
 * Why it exists: regional disruption has driven a step change in demand for
 * overland runs to alternative airports (see docs/seo-action-plan-2026-10.md
 * §0 — clicks went from ~3/day to ~30/day over 2026-10-08..11, concentrated
 * on the cross-border corridors). The homepage had no entry point for that
 * intent at all; /riyadh-alternative-airports had to be reached by search.
 *
 * Scope decisions, so a later edit doesn't undo them by accident:
 *
 * - Airports listed are exactly the four that /riyadh-alternative-airports
 *   actually covers (DMM, BAH, DOH, DXB). Jeddah is deliberately NOT named:
 *   there is no Riyadh->Jeddah commercial route page and the comparison page
 *   doesn't cover it, so naming it would promise a landing place that isn't
 *   there.
 * - Airport names are plain text, not four inline links. The single CTA is a
 *   full-size tap target; four inline links inside a sentence are a poor one,
 *   and 73% of this site's traffic is mobile. The comparison page routes on
 *   to each individual transfer page anyway.
 * - "Fixed fares" restates an existing site-wide claim
 *   (airportTransferConfig.ts `fixedFareNote`), not a new promise.
 */
export default function FlightDisruptionBanner() {
    return (
        <section className={styles.wrap} aria-labelledby="flight-disruption-heading">
            <div className="container">
                <div className={styles.banner}>
                    <PlaneIcon size={22} className={styles.icon} />

                    <p className={styles.copy}>
                        <strong id="flight-disruption-heading" className={styles.lead}>
                            Riyadh flight cancelled?
                        </strong>{' '}
                        We drive you from Riyadh to Dammam, Bahrain, Doha or Dubai airport.
                        Fixed fares, one car for your group.
                    </p>

                    <Link
                        href="/riyadh-alternative-airports"
                        className={`btn btn-outline-gold btn-sm ${styles.cta}`}
                    >
                        Compare airports
                        <ArrowRightIcon size={15} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
