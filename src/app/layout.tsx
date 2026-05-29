import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import Script from "next/script";
import PublicLayout from "@/components/PublicLayout";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saudi Taxi & Rental | Premium Transport Services",
  description: "Luxury taxi and car rental services across Saudi Arabia. Book your premium ride today.",
  verification: {
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
    <html lang="en">
      <body className={`${playfair.variable} ${lato.variable}`}>
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
            '/quote?from=' + encodeURIComponent(args.from || '') +
            '&to='   + encodeURIComponent(args.to   || '') +
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

