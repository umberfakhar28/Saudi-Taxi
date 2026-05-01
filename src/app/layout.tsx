import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
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
      </body>
    </html>
  );
}
