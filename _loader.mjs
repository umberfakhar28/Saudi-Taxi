import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const EXTS = ['.ts', '.tsx', '.mts', '.js'];
const ROOT = pathToFileURL(process.cwd() + '/');

function firstExisting(baseHref) {
  for (const ext of EXTS) {
    const href = baseHref + ext;
    try { if (existsSync(fileURLToPath(href))) return href; } catch {}
  }
  try { if (existsSync(fileURLToPath(baseHref))) return baseHref; } catch {}
  return null;
}

export async function resolve(specifier, context, next) {
  // "@/lib/x" -> "<cwd>/src/lib/x.ts"
  if (specifier.startsWith('@/')) {
    const hit = firstExisting(new URL('src/' + specifier.slice(2), ROOT).href);
    if (hit) return next(hit, context);
  }
  // "./datetime" -> "./datetime.ts"
  if (specifier.startsWith('.') && !/\.[a-z]+$/i.test(specifier)) {
    const hit = firstExisting(new URL(specifier, context.parentURL).href);
    if (hit) return next(hit, context);
  }
  return next(specifier, context);
}
