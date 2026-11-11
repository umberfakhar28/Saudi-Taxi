import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";

/**
 * Web app manifest: name, icons and colours for "Add to Home Screen" and
 * the Android task switcher. Colours are the header navy (--bg-primary).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.siteName,
    short_name: "Gulf Trip",
    description: "Private taxi and cross-border transfers across Saudi Arabia and the Gulf.",
    start_url: "/",
    display: "browser",
    background_color: "#081827",
    theme_color: "#081827",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
