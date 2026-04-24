'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend } from 'recharts';

export function DashboardCharts({ bookingsByStatus, revenueTrend, bookingTrend }: { 
    bookingsByStatus: any[], 
    revenueTrend: any[],
    bookingTrend: any[]
}) {
    const [pieView, setPieView] = useState<'count' | 'revenue'>('count');
    const [trendView, setTrendView] = useState<'daily' | 'weekly' | 'monthly'>('daily');

    const COLORS = {
        pending: '#f59e0b',
        confirmed: '#10b981',
        completed: '#6366f1',
        cancelled: '#f43f5e',
    };

    const pieData = bookingsByStatus.map(b => ({
        name: b.status.charAt(0).toUpperCase() + b.status.slice(1),
        value: pieView === 'count' ? b.count : b.revenue,
        color: COLORS[b.status as keyof typeof COLORS] || '#94a3b8'
    }));

    // Filter trend data based on view
    const filteredRevTrend = revenueTrend.filter(t => t.view === trendView);
    const filteredBookingTrend = bookingTrend.filter(t => t.view === trendView);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            {/* Bookings by Status */}
            <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 14, border: '1px solid #e8edf2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>Bookings by Status</div>
                    <select 
                        value={pieView} 
                        onChange={e => setPieView(e.target.value as any)}
                        style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem', borderRadius: 4, border: '1px solid #cbd5e1' }}
                    >
                        <option value="count">Count</option>
                        <option value="revenue">Revenue</option>
                    </select>
                </div>
                <div style={{ height: 220 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <RechartsTooltip formatter={(value: any) => pieView === 'revenue' ? `SAR ${Number(value).toFixed(2)}` : value} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

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
