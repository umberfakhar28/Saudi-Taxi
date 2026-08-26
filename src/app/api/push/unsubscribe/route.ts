import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { requireAdmin } from '@/utils/supabase/requireAdmin';

export async function POST(req: Request) {
    const admin = await requireAdmin();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { endpoint } = await req.json();
    if (!endpoint) return NextResponse.json({ error: 'endpoint is required' }, { status: 400 });

    const supabase = createAdminClient();
    const { error } = await supabase.from('push_subscriptions').delete().eq('endpoint', endpoint);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
}
