import fs from "fs";
import path from "path";

/**
 * Reads a content HTML file and extracts only the <body> innerHTML.
 * Used at build time — this runs server-side only (Node.js).
 */
export function readContentFile(filename: string): string {
  const filePath = path.join(process.cwd(), "content", filename);
  const raw = fs.readFileSync(filePath, "utf-8");

  // Extract everything between <body ...> and </body>
  const match = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1] : raw;
}
