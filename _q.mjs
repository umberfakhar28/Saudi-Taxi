import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const env = {};
for (const line of fs.readFileSync('.env.local','utf8').split(/\r?\n/)) {
  const i = line.indexOf('='); if (i<1 || line.trimStart().startsWith('#')) continue;
  env[line.slice(0,i).trim()] = line.slice(i+1).trim().replace(/^["']|["']$/g,'');
}
export const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth:{persistSession:false} });
export const ADMIN_EMAIL = env.ADMIN_EMAIL;
