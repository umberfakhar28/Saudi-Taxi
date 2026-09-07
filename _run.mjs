import { sb } from './_q.mjs';
for (const [t, col] of [['bookings','status'],['quotes','status'],['invoices','status']]) {
  const { data } = await sb.from(t).select(col);
  console.log(`${t}.${col} distinct:`, [...new Set((data||[]).map(r=>r[col]))]);
}
const { data: au } = await sb.auth.admin.listUsers();
console.log('\nauth users:', (au?.users||[]).map(u=>({ email:u.email, confirmed: !!u.email_confirmed_at })));
