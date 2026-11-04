import Script from "next/script";

/**
 * GA4 for the whole site.
 *
 * This component has existed for a long time and never once fired: it read
 * NEXT_PUBLIC_GA_MEASUREMENT_ID, the variable was never set in any
 * environment, so it returned null and production shipped no gtag script at
 * all. Every visit since launch went unmeasured.
 *
 * The property's Measurement ID is therefore the default here rather than
 * env-only. It is not a secret — gtag publishes it in the page source of
 * every request, so there is nothing to protect — and hardcoding the default
 * means tracking survives a deployment where nobody remembered to add an
 * environment variable, which is exactly how it came to be dead in the first
 * place. The env var still wins when it is set, so a staging property can
 * override it without touching code.
 */
const DEFAULT_GA_ID = "G-TQZY85DG7H";

export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || DEFAULT_GA_ID;
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
