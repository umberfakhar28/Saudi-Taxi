'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function DashboardFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [range, setRange] = useState(searchParams.get('range') || 'this_month');
    const [status, setStatus] = useState(searchParams.get('status') || 'all');

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== 'all') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', background: '#fff', padding: '1rem', borderRadius: 12, border: '1px solid #e8edf2' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Date Range</label>
                <select 
                    value={range} 
                    onChange={e => { setRange(e.target.value); updateFilter('range', e.target.value); }}
                    style={{ padding: '0.4rem 0.8rem', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                >
                    <option value="today">Today</option>
                    <option value="this_week">This Week</option>
                    <option value="this_month">This Month</option>
                    <option value="all">All Time</option>
                </select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Booking Status</label>
                <select 
                    value={status} 
                    onChange={e => { setStatus(e.target.value); updateFilter('status', e.target.value); }}
                    style={{ padding: '0.4rem 0.8rem', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>
        </div>
    );
}
