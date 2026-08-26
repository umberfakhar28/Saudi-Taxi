import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { requireAdmin } from '@/utils/supabase/requireAdmin';

export async function POST(req: Request) {
    const admin = await requireAdmin();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { endpoint, keys } = await req.json();
    if (!endpoint || !keys?.p256dh || !keys?.auth) {
        return NextResponse.json({ error: 'Invalid subscription payload' }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase
        .from('push_subscriptions')
        .upsert({ endpoint, p256dh: keys.p256dh, auth_key: keys.auth }, { onConflict: 'endpoint' });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
}
