import fs from "fs";
import path from "path";
import { PHONE_DISPLAY, TEL_URL, WHATSAPP_URL } from "./contact";

/**
 * Reads a content HTML file and extracts only the <body> innerHTML.
 * Used at build time — this runs server-side only (Node.js).
 *
 * The HTML never carries the business number itself: it writes
 * {{WHATSAPP_URL}} and {{PHONE_DISPLAY}}, filled in here from lib/contact.ts,
 * so the number lives in one place.
 */
export function readContentFile(filename: string): string {
  const filePath = path.join(process.cwd(), "content", filename);
  const raw = fs.readFileSync(filePath, "utf-8");

  // Extract everything between <body ...> and </body>
  const match = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return (match ? match[1] : raw)
    .replaceAll("{{WHATSAPP_URL}}", WHATSAPP_URL)
    .replaceAll("{{PHONE_DISPLAY}}", PHONE_DISPLAY)
    .replaceAll("{{TEL_URL}}", TEL_URL);
}
