# Topic Cluster Map — gulftripservice.com

Derived from the actual page inventory in `seo-audit/link-graph.json` (109 public pages). The original brief assumed visa/tours/hotels/Dubai-Abu Dhabi-Sharjah-Oman clusters that don't exist on this site (confirmed by direct inspection — see the note at the top of `internal-link-audit.md`); the clusters below are gulftripservice.com's real equivalent: destination hubs are Saudi cities, not Gulf countries, and the international-destination cluster is the GCC cross-border route pages.

## 1. Destination hubs (Saudi cities) — hub-and-spoke

**Hub:** none dedicated yet — `/services/riyadh`, `/services/jeddah` etc. are themselves the 13 spokes of this cluster, with `/our-services` acting as the umbrella entry point.

**Spokes (13):** `/services/{riyadh,jeddah,makkah,madinah,dammam,khobar,jubail,taif,abha,yanbu,alula,neom,tabuk}`

**Sibling relationship:** each city page should link to 2–4 *geographically or functionally related* cities — Jeddah↔Makkah↔Madinah (Umrah corridor), Dammam↔Khobar↔Jubail (Eastern Province), Riyadh↔Dammam (business corridor), Taif↔Makkah (day-trip distance), AlUla↔Madinah (nearest major city), NEOM↔Tabuk (same region).

**Cross-cluster (real journey):** city hub → its matching city-airport page (e.g. `/services/jeddah` → `/jeddah-airport-taxi-service`) → relevant tour/Umrah service.

## 2. City airport transfers

**Hub:** `/airport-transfers` (already links to all 4 JED/MED/DMM/RUH airport blocks via `AIRPORTS` data + `RoutesGrid`).

**Spokes (6):** `/abha-airport-taxi-service`, `/dammam-airport-taxi-service`, `/jeddah-airport-taxi-service`, `/madina-airport-taxi-service`, `/riyadh-airport-taxi-service`, `/taif-airport-taxi-service`

**Cross-cluster:** airport pages ↔ their city's hub page; airport pages ↔ `/airport-transfer-for-umrah` where the airport serves Umrah pilgrims (Jeddah, Madinah).

## 3. GCC cross-border routes

**Hub:** `/border-crossing` (already the breadcrumb parent for every dedicated route page, per `RoutePage.tsx`).

**Regional sub-hubs (5):** `/saudi-arabia-to-{bahrain,qatar,uae,jordan}-taxi-service` — each should link to its 2-4 dedicated city-pair routes covering that country.

**Spokes (18 dedicated routes):** the Dammam/Riyadh/Bahrain/Qatar/Kuwait/Khafji/Dubai/Abu Dhabi city-pair pages.

**Sibling relationship:** routes sharing an endpoint city (e.g. all Dammam-origin routes; all Riyadh-origin routes) are natural lateral links — a traveler comparing Dammam→Bahrain may also want Dammam→Qatar or Dammam→Kuwait.

## 4. Domestic intercity (Umrah corridor)

**Members (2 dedicated + 3 duplicate "guide" pages):** `/jeddah-to-makkah-taxi-service`, `/makkah-to-madinah-taxi-service`, and their `-guide` duplicates.

**Note (flag, not a fix in this pass):** the `-guide` pages are near-duplicate content of the dedicated route pages for the same city pair. Per hard rules ("do not change any URL or slug") these stay, but they should link to each other as "the detailed guide" / "the booking page" rather than compete silently — done in Step 5.

## 5. Tours & activities

**Members (3):** `/jeddah-city-tour-services-in-saudi-arabia`, `/reliable-alula-tour-taxi-service-in-saudi-arabia`, `/taif-ziyarat-taxi-service`

**Cross-cluster:** each tour links to its city's hub page and relevant airport page (Jeddah tour ↔ `/services/jeddah` + `/jeddah-airport-taxi-service`; AlUla tour ↔ `/services/alula`; Taif tour ↔ `/services/taif`).

## 6. Umrah & Ziyarat services

**Members (9):** `/umrah-taxi-services`, `/umrah-transport-package`, `/ziyarat-services-in-saudi-arabia`, `/airport-transfer-for-umrah`, `/madinah-umrah-taxi-guide`, `/makkah-umrah-taxi-guide`, `/jeddah-airport-taxi-guide`, plus the Makkah/Madinah city hubs as destination anchors.

This is the site's largest single service line by page count and currently one of its weakest-linked clusters (the two umrah-guide pages and jeddah-airport-taxi-guide are full orphans).

## 7. Specialty & B2B services

**Members (6):** `/private-taxi`, `/hotel-transfers`, `/corporate-transportation-services`, `/wedding-transportation`, `/school-buses-services`, `/educational-tours-transport`

**Hub:** `/our-services` (and its duplicate `/services` — flagged in the audit, not touched per "don't change URLs/slugs").

## 8. Blog

**Members (13):** `/blog` index + 12 posts, already carrying a `category` field (Travel Tips, Destinations, Religious Travel, Transportation, Luxury Travel) that Step 6's related-posts module will key off.

**Cross-cluster (real journey):** posts already reference specific cities/services in their titles (`riyadh-to-jeddah-travel`, `hajj-transport-guide`, `benefits-private-airport-transfer`) — these get one contextual link each to the matching service/destination page.

## 9. Guides (informational)

**Members (6):** `/guides/{king-khalid-airport,king-abdulaziz-airport,umrah-transportation,hajj-transportation,business-travel,family-travel}`

Each maps 1:1 to a service/airport page (king-khalid-airport ↔ `/riyadh-airport-taxi-service`, umrah-transportation ↔ the Umrah cluster, etc.) — natural, non-forced cross-cluster links.

## Not a cluster — utility/legal (18 pages)

`/book-online`, `/quote`, `/contact-us`, `/about-us`, `/fleet`, `/faqs`, `/testimonials`, `/our-gallery`, `/prices`, `/privacy-policy`, `/terms-conditions`, `/cart`, `/checkout`, `/my-account`, `/pay-online`, `/thank-you`, `/about`, `/contact`. These are conversion/legal/duplicate-account pages, not topical content — they receive links (as CTAs) but aren't a "topic" spokes point *into*, per the brief's "force nothing" instruction.

## Cross-cluster journeys (the only cross-cluster links added)

Only these real customer journeys get cross-cluster links — nothing else, per "force nothing":
- **Umrah journey:** airport → Umrah transport → city hub (Makkah/Madinah) → Ziyarat tour
- **Business journey:** city hub (Riyadh/Dammam/Khobar) → corporate transportation → airport transfer
- **Cross-border journey:** city hub → GCC route → destination-country hub page
- **Tourist journey:** city hub → tour page → blog post about that destination
