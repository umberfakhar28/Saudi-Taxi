import Script from "next/script";

/**
 * Renders nothing until NEXT_PUBLIC_GA_MEASUREMENT_ID is set in .env.local.
 * Create a GA4 property, drop the Measurement ID (G-XXXXXXX) into the env
 * var, and this activates automatically — no other code changes needed.
 */
export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
