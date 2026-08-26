import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    // Conservative, non-breaking security headers only (Admin Portal audit
    // §23). A strict Content-Security-Policy is deliberately NOT included
    // here: this site renders JSON-LD structured data via
    // dangerouslySetInnerHTML inline <script> tags on most pages, and a
    // script-src CSP would need a per-request nonce threaded through every
    // one of those to avoid breaking them — a much larger, higher-risk
    // change than this pass warrants. Everything below is safe because it
    // doesn't restrict what the page itself is allowed to load or render.
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        // Legacy dead-end booking form (non-functional, never wired to a
        // backend) superseded by /book-online — redirect instead of
        // leaving two pages competing for the same "book a taxi" intent.
        source: "/booking",
        destination: "/book-online",
        permanent: true,
      },
      {
        // /services was a noindex stub duplicating /our-services (zero
        // inbound links, orphaned by design) — 301 instead of leaving a
        // dead route live. See docs/page-inventory.md (Duplicates).
        source: "/services",
        destination: "/our-services",
        permanent: true,
      },
      {
        // /about was a noindex stub duplicating /about-us (zero inbound
        // links, orphaned by design) — same reasoning as /services above.
        source: "/about",
        destination: "/about-us",
        permanent: true,
      },
      {
        // /contact was a noindex stub duplicating /contact-us (zero
        // inbound links, orphaned by design) — same reasoning as /services.
        source: "/contact",
        destination: "/contact-us",
        permanent: true,
      },
      {
        // Guide-consolidation (docs/page-inventory.md D2): the legacy
        // content/*.html guide had the deeper content but the service page
        // has the clean URL and existing internal links. Content migrated
        // into /jeddah-airport-taxi-service's page.tsx; this 301 keeps the
        // guide's URL (and any external links/rankings pointing at it)
        // resolving to the merged page instead of a stale duplicate.
        source: "/jeddah-airport-taxi-guide",
        destination: "/jeddah-airport-taxi-service",
        permanent: true,
      },
      {
        // Guide-consolidation W4: single coherent topic (Madinah for Umrah
        // pilgrims), migrated onto /services/madinah's CityData (Rawdah/
        // Nusuk-app guidance, length-of-stay FAQ). Human-reviewed choice —
        // see chat log — over the alternative of leaving it standalone.
        source: "/madinah-umrah-taxi-guide",
        destination: "/services/madinah",
        permanent: true,
      },
      {
        // Guide-consolidation W4: this guide was really three pages' worth
        // of content (general Umrah-transport pitch + a Ziyarat site
        // directory that /ziyarat-services-in-saudi-arabia already covers
        // almost 1:1 + Makkah city facts). Human-reviewed choice: 301 to
        // /umrah-taxi-services (closest single match for the genuinely
        // unique material — Ihram-friendly vehicles, accessibility,
        // hotel-district shuttle logistics, FAQs) rather than force it
        // all onto /services/makkah and lose most of it.
        source: "/makkah-umrah-taxi-guide",
        destination: "/umrah-taxi-services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
