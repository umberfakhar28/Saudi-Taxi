import type { Metadata } from "next";
import Script from "next/script";
import PublicLayout from "@/components/PublicLayout";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import WhatsAppTracking from "@/components/WhatsAppTracking";
import { SITE_CONFIG } from "@/lib/seo";
import { localBusinessSchema, websiteSchema, jsonLd } from "@/lib/jsonld";
import localFont from 'next/font/local';
import "./globals.css";

/**
 * Fonts are self-hosted from src/app/fonts/, not fetched from Google at
 * build time.
 *
 * Why: `next/font/google` made every production build depend on a live
 * fetch from fonts.gstatic.com, and Google intermittently answers the CSS
 * API with its dynamic slice URLs (`/l/font?kit=...`) instead of static
 * paths. Those carry their own query string, which Turbopack cannot parse —
 * it embeds the font URL inside its own query and then asserts there is
 * exactly one. Deploys failed with 16 `Module not found` errors on
 * `@vercel/turbopack-next/internal/font/google/font` and the message
 * `next/font/google queries have exactly one entry`. It took down the
 * deploys for 87e2b75 and ccffc1a on 2026-11-05. A retry is a coin flip on
 * which URL shape Google returns, not a fix; self-hosting removes the
 * dependency outright.
 *
 * Both files are the official upstream variable fonts, and both match the
 * version Google was serving (Inter 4.001, Plus Jakarta Sans 2.071) on
 * unitsPerEm, hhea/OS/2 typo ascent, descent, line gap, cap height and
 * x-height — see docs/self-hosted-fonts.md for the measurements and
 * provenance.
 *
 * The CSS variable names are unchanged, but note what next/font/local does
 * with family names: it derives them from the JS variable, so these emit
 * `font-family: inter` and `font-family: plusJakartaSans`, not the real
 * names next/font/google used. globals.css used to re-declare both
 * variables at :root with literal "Plus Jakarta Sans" / "Inter" names, and
 * it loads after this, so it won the cascade. "Inter" would still have
 * matched (CSS family matching is case-insensitive) but "Plus Jakarta
 * Sans" would have matched nothing and every heading would have quietly
 * dropped to Inter.
 *
 * So the fallback tails that used to live in those :root declarations are
 * passed here instead, and the duplicate declarations are gone: these two
 * calls are now the single source of both variables.
 */
const inter = localFont({
  src: './fonts/InterVariable.woff2',
  // Inter's full wght axis, as Google also served it (100 900).
  weight: '100 900',
  style: 'normal',
  variable: '--font-body',
  display: 'swap',
  // The tail of the old globals.css --font-body declaration.
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
})

const plusJakartaSans = localFont({
  src: './fonts/PlusJakartaSans-Variable.woff2',
  // The font's real axis range. Google's build was asked for four discrete
  // weights (400/500/600/700) that all resolved to this same variable file,
  // which is what made this the font that tripped the Turbopack bug.
  weight: '200 800',
  style: 'normal',
  variable: '--font-heading',
  display: 'swap',
  // The tail of the old globals.css --font-heading declaration. 'Inter'
  // resolves to the face above: CSS family names are case-insensitive.
  fallback: ['Inter', 'system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.defaultTitle,
    template: `%s | ${SITE_CONFIG.siteName}`,
  },
  description: SITE_CONFIG.defaultDescription,
  metadataBase: new URL(SITE_CONFIG.baseUrl),
  alternates: { canonical: SITE_CONFIG.baseUrl },
  openGraph: {
    siteName: SITE_CONFIG.siteName,
    locale: SITE_CONFIG.locale,
    type: "website",
    images: [{
      url: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.defaultOgImage}`,
      width: 1200,
      height: 630,
      alt: SITE_CONFIG.siteName,
    }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_CONFIG.baseUrl}${SITE_CONFIG.defaultOgImage}`],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/favicon.svg" }],
    other: [
      { rel: "logo", url: "/logo.svg" },
    ],
  },
  verification: {
    // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in .env.local once you
    // create a Google Search Console property (HTML tag method).
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    }),
    other: {
      "msvalidate.01": ["995aadf700384f5c8ef4ad71bc79ab65"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd([localBusinessSchema(), websiteSchema()]) }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        <WhatsAppTracking />
        <PublicLayout>
          {children}
        </PublicLayout>

        {/* ── WebMCP: expose site tools to AI agents via the browser ──
            https://webmachinelearning.github.io/webmcp/
            navigator.modelContext.provideContext() registers structured tools
            that AI agents (e.g. Chrome built-in AI) can discover and call.    */}
        <Script
          id="webmcp-provider"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;

  navigator.modelContext.provideContext({
    tools: [
      {
        name: 'get_quote',
        description: 'Request a taxi fare quote for a route in Saudi Arabia (Makkah, Jeddah, Madinah and beyond).',
        inputSchema: {
          type: 'object',
          properties: {
            from: { type: 'string', description: 'Pickup city or address' },
            to:   { type: 'string', description: 'Destination city or address' },
            passengers: { type: 'number', description: 'Number of passengers (default 1)' },
            vehicle_type: {
              type: 'string',
              enum: ['sedan', 'suv', 'minivan'],
              description: 'Preferred vehicle type'
            }
          },
          required: ['from', 'to']
        },
        execute: async function (args) {
          window.location.href =
            '/book-online?from=' + encodeURIComponent(args.from || '') +
            '&to='   + encodeURIComponent(args.to   || '') +
            '&mode=transfers' +
            (args.passengers ? '&passengers=' + args.passengers : '');
          return { status: 'navigating', url: window.location.href };
        }
      },
      {
        name: 'book_taxi',
        description: 'Book a taxi service in Saudi Arabia.',
        inputSchema: {
          type: 'object',
          properties: {
            from: { type: 'string', description: 'Pickup location' },
            to:   { type: 'string', description: 'Destination' },
            date: { type: 'string', format: 'date-time', description: 'Pickup datetime (ISO 8601)' },
            passengers: { type: 'number', description: 'Number of passengers' },
            name:  { type: 'string', description: 'Passenger full name' },
            phone: { type: 'string', description: 'Contact phone number' }
          },
          required: ['from', 'to', 'date', 'name', 'phone']
        },
        execute: async function (args) {
          var qs = new URLSearchParams({
            from: args.from || '',
            to:   args.to   || '',
            date: args.date || '',
            name: args.name || '',
            phone: args.phone || ''
          });
          if (args.passengers) qs.set('passengers', String(args.passengers));
          window.location.href = '/book-online?' + qs.toString();
          return { status: 'navigating', url: window.location.href };
        }
      },
      {
        name: 'contact_support',
        description: 'Navigate to the Gulf Trip Service contact page to reach customer support.',
        inputSchema: {
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Pre-filled message for the support team' }
          }
        },
        execute: async function (args) {
          var url = '/contact-us';
          if (args && args.message) url += '?message=' + encodeURIComponent(args.message);
          window.location.href = url;
          return { status: 'navigating', url: url };
        }
      }
    ]
  }).catch(function () {
    // WebMCP not supported in this browser — silently skip
  });
})();
            `
          }}
        />
      </body>
    </html>
  );
}

