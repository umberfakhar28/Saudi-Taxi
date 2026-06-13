import type { Metadata } from "next";

export const SITE_CONFIG = {
  baseUrl: "https://gulftripservice.com",
  siteName: "Gulf Trip Service",
  defaultTitle: "Saudi Taxi & Rental | Premium Transport Services",
  defaultDescription:
    "Luxury taxi and car rental services across Saudi Arabia. Book your premium ride today.",
  locale: "en_US",
} as const;

export function generatePageMetadata({
  title,
  description,
  path,
  keywords,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noindex?: boolean;
}): Metadata {
  const url = `${SITE_CONFIG.baseUrl}${path}`;

  return {
    title,
    description,
    keywords: keywords?.join(", "),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.siteName,
      locale: SITE_CONFIG.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}
