import Link from "@/components/IntentLink";
import Image from "next/image";
import { MapPinIcon, ClockIcon, GlobeIcon, NavigationIcon, CheckCircleIcon, ArrowRightIcon } from "@/components/Icons";
import { isCrossBorder, kmLabel, type DistanceRouteData } from "@/lib/distanceRouteData";
import { fillFare } from "@/lib/distanceFare";
import styles from "./DistanceRouteCard.module.css";

/**
 * Premium cover-image card for the /distance hub grid (card-redesign brief,
 * scoped to this grid only — see chat log). Structure only; no change to
 * DistanceRouteData or the route pages themselves.
 *
 * Cover photo is chosen from the route's `destination` — the 9 photos in
 * public/images/distance/ were shot one per destination city, not one per
 * route, so a Makkah→Madinah card shows Madinah's cover, matching how a
 * traveler thinks about "where this trip ends up." Falls back to the
 * site's existing Gulf highway placeholder for any future destination
 * without a matching photo, rather than a broken image.
 */
const DESTINATION_COVERS: Record<string, { src: string; alt: string }> = {
  Riyadh: { src: "/images/distance/riyadh.webp", alt: "Riyadh's Kingdom Centre Tower skyline with a private chauffeur vehicle on the highway" },
  Jeddah: { src: "/images/distance/jeddah.webp", alt: "Jeddah's Corniche skyline with King Fahd's Fountain" },
  Makkah: { src: "/images/distance/makkah.webp", alt: "The Kaaba and Abraj Al-Bait clock tower in Makkah at sunrise" },
  Madinah: { src: "/images/distance/madinah.webp", alt: "The Prophet's Mosque courtyard in Madinah at golden hour" },
  Dammam: { src: "/images/distance/dammam.webp", alt: "Dammam's Corniche waterfront skyline at sunset" },
  Jubail: { src: "/images/distance/jubail.webp", alt: "Jubail's coastal promenade with the city's water tower and industrial skyline" },
  Kuwait: { src: "/images/distance/kuwait.webp", alt: "Kuwait City skyline with the Kuwait Towers on the waterfront" },
  "Abu Dhabi": { src: "/images/distance/abu-dhabi.webp", alt: "Sheikh Zayed Grand Mosque in Abu Dhabi reflected in its courtyard pool" },
  Dubai: { src: "/images/distance/dubai.webp", alt: "Burj Khalifa and the Downtown Dubai skyline with a private chauffeur vehicle" },
};

const FALLBACK_COVER = { src: "/hero-slider/gulf-cross-border-chauffeur-service.webp", alt: "Private chauffeur vehicle on a Gulf highway" };

function coverFor(destination: string) {
  return DESTINATION_COVERS[destination] ?? FALLBACK_COVER;
}


export default function DistanceRouteCard({ route, priority = false }: { route: DistanceRouteData; priority?: boolean }) {
  const cover = coverFor(route.destination);
  const crossBorder = isCrossBorder(route);
  const features = route.transferBenefits.slice(0, 3).map((x) => fillFare(x, route));

  return (
    <Link
      href={`/distance/${route.slug}`}
      className={styles.card}
      aria-label={`${route.origin} to ${route.destination} — view distance and travel guide`}
    >
      <div className={styles.coverWrap}>
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
          className={styles.coverImage}
        />
        <div className={styles.scrim} aria-hidden="true" />
        <span className={styles.typeBadge}>
          {crossBorder ? <GlobeIcon size={12} /> : <NavigationIcon size={12} />}
          {crossBorder ? "Cross-Border" : "Domestic Route"}
        </span>
        <h3 className={styles.coverTitle}>{route.origin} → {route.destination}</h3>
      </div>

      <div className={styles.body}>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <MapPinIcon size={16} className={styles.statIcon} />
            <div className={styles.statText}>
              <span className={styles.statLabel}>Distance</span>
              <span className={styles.statValue}>{kmLabel(route)}</span>
            </div>
          </div>
          <div className={styles.stat}>
            <ClockIcon size={16} className={styles.statIcon} />
            <div className={styles.statText}>
              <span className={styles.statLabel}>Duration</span>
              <span className={styles.statValue}>{route.withBorder ?? route.drive.replace(/^about /, "~")}</span>
            </div>
          </div>
        </div>

        <p className={styles.description}>{route.routeIntro}</p>

        {features.length > 0 && (
          <ul className={styles.features}>
            {features.map((f, i) => (
              <li key={i} className={styles.feature}>
                <CheckCircleIcon size={15} className={styles.featureIcon} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.cta}>
          <span className={styles.ctaLabel}>View Guide</span>
          <span className={styles.ctaIcon} aria-hidden="true">
            <ArrowRightIcon size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
