'use client';

import { useState } from 'react';
import { Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';
import { BookingsByStatus, type StatusDatum } from './BookingsByStatus';

export function DashboardCharts({ bookingsByStatus, revenueTrend, bookingTrend }: {
    bookingsByStatus: StatusDatum[],
    revenueTrend: any[],
    bookingTrend: any[]
}) {
    const [trendView, setTrendView] = useState<'daily' | 'weekly' | 'monthly'>('daily');

    // Filter trend data based on view
    const filteredRevTrend = revenueTrend.filter(t => t.view === trendView);
    const filteredBookingTrend = bookingTrend.filter(t => t.view === trendView);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <BookingsByStatus data={bookingsByStatus} />

            {/* Revenue Trend */}
            <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 14, border: '1px solid #e8edf2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>Revenue Trend</div>
                    <select 
                        value={trendView} 
                        onChange={e => setTrendView(e.target.value as any)}
                        style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem', borderRadius: 4, border: '1px solid #cbd5e1' }}
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
                <div style={{ height: 220 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={filteredRevTrend}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} width={40} />
                            <RechartsTooltip />
                            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Booking Trend */}
            <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 14, border: '1px solid #e8edf2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>Booking Trend</div>
                </div>
                <div style={{ height: 220 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={filteredBookingTrend}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} width={30} />
                            <RechartsTooltip />
                            <Bar dataKey="bookings" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
