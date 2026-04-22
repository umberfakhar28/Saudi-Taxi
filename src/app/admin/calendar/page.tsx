'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
    pending:   { bg: '#fef9c3', text: '#854d0e', dot: '#f59e0b' },
    confirmed: { bg: '#dcfce7', text: '#166534', dot: '#10b981' },
    completed: { bg: '#dbeafe', text: '#1e40af', dot: '#3b82f6' },
    cancelled: { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444' },
};

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [serviceFilter, setServiceFilter] = useState('all');
    const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
    const [expandedDay, setExpandedDay] = useState<string | null>(null);
    const supabase = createClient();

    const fetchBookings = useCallback(async () => {
        setLoading(true);
        let q = supabase.from('bookings').select('*').order('travel_time', { ascending: true });
        if (statusFilter !== 'all') q = q.eq('status', statusFilter);
        const { data } = await q;
        setBookings(data ?? []);
        setLoading(false);
    }, [statusFilter]);

    useEffect(() => { fetchBookings(); }, [fetchBookings]);

    const services = ['all', ...Array.from(new Set(bookings.map(b => b.service_type).filter(Boolean)))];

    const filteredBookings = bookings.filter(b =>
        (statusFilter === 'all' || b.status === statusFilter) &&
        (serviceFilter === 'all' || b.service_type === serviceFilter)
    );

    const getDayBookings = (day: Date) =>
        filteredBookings.filter(b => b.travel_date && isSameDay(new Date(b.travel_date), day));

    // ── Monthly Grid ──
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const days: Date[] = [];
    let d = gridStart;
    while (d <= monthEnd || days.length % 7 !== 0) {
        days.push(d);
        d = addDays(d, 1);
        if (days.length > 42) break;
    }

    // ── Weekly Grid ──
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    const navPrev = () => viewMode === 'month' ? setCurrentDate(subMonths(currentDate, 1)) : setCurrentDate(addDays(currentDate, -7));
    const navNext = () => viewMode === 'month' ? setCurrentDate(addMonths(currentDate, 1)) : setCurrentDate(addDays(currentDate, 7));

    const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const TripChip = ({ b, compact = false }: { b: any; compact?: boolean }) => {
        const c = STATUS_COLORS[b.status] || STATUS_COLORS.pending;
        return (
            <div onClick={e => { e.stopPropagation(); setSelectedBooking(b); }}
                title={`${b.customer_name} — ${b.pickup_location} → ${b.dropoff_location}`}
                style={{ background: c.bg, color: c.text, borderRadius: 5, padding: compact ? '1px 5px' : '3px 6px', fontSize: compact ? '0.68rem' : '0.72rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2, overflow: 'hidden', transition: 'opacity 0.15s', lineHeight: 1.4 }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot, flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {compact ? b.customer_name.split(' ')[0] : b.customer_name}
                    {b.travel_time && <span style={{ opacity: 0.7 }}> · {b.travel_time.slice(0, 5)}</span>}
                </span>
            </div>
        );
    };

    return (
        <div>
            {/* ── Booking Detail Modal ── */}
            {selectedBooking && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', width: '100%', maxWidth: 480 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>{selectedBooking.customer_name}</div>
                                <span className={`badge-${selectedBooking.status}`} style={{ marginTop: 4, display: 'inline-block' }}>{selectedBooking.status}</span>
                            </div>
                            <button onClick={() => setSelectedBooking(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={20} /></button>
                        </div>
                        {[
                            ['📞 Phone', selectedBooking.customer_phone],
                            ['📧 Email', selectedBooking.customer_email],
                            ['📍 Pickup', selectedBooking.pickup_location],
                            ['📍 Dropoff', selectedBooking.dropoff_location],
                            ['📅 Date', selectedBooking.travel_date],
                            ['🕐 Time', selectedBooking.travel_time],
                            ['🚗 Service', selectedBooking.service_type],
                            ['👥 Passengers', selectedBooking.passengers_count],
                            ['💰 Quote', selectedBooking.quote_amount ? `SAR ${selectedBooking.quote_amount}` : '—'],
                        ].map(([label, value]) => value ? (
                            <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.85rem' }}>
                                <span style={{ color: '#94a3b8' }}>{label}</span>
                                <span style={{ fontWeight: 600, color: '#1e293b' }}>{String(value)}</span>
                            </div>
                        ) : null)}
                        {selectedBooking.internal_notes && (
                            <div style={{ marginTop: '1rem', background: '#fffbeb', borderRadius: 8, padding: '0.75rem', fontSize: '0.82rem', color: '#92400e' }}>📝 {selectedBooking.internal_notes}</div>
                        )}
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
                            <button onClick={() => { window.open(`https://wa.me/${(selectedBooking.customer_phone || '').replace(/\D/g, '')}`, '_blank'); }} className="admin-btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>💬 WhatsApp</button>
                            <button onClick={() => { window.location.href = '/admin/bookings'; }} className="admin-btn-primary" style={{ flex: 1, justifyContent: 'center' }}>View in Bookings</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Header ── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                    <h1 className="admin-page-title">Trip Calendar</h1>
                    <p className="admin-page-sub" style={{ margin: 0 }}>Visual schedule of all bookings.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* View toggle */}
                    <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: 8, padding: 3 }}>
                        {(['month', 'week'] as const).map(v => (
                            <button key={v} onClick={() => setViewMode(v)} style={{ padding: '0.4rem 0.875rem', borderRadius: 6, border: 'none', background: viewMode === v ? '#fff' : 'transparent', fontWeight: viewMode === v ? 700 : 500, fontSize: '0.82rem', cursor: 'pointer', color: viewMode === v ? '#0f172a' : '#64748b', boxShadow: viewMode === v ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
                                {v.charAt(0).toUpperCase() + v.slice(1)}
                            </button>
                        ))}
                    </div>
                    {/* Status filter */}
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="admin-filter-select" style={{ fontSize: '0.82rem' }}>
                        <option value="all">All Statuses</option>
                        {['pending', 'confirmed', 'completed', 'cancelled'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                    {/* Service filter */}
                    <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)} className="admin-filter-select" style={{ fontSize: '0.82rem' }}>
                        {services.map(s => <option key={s} value={s}>{s === 'all' ? 'All Services' : s}</option>)}
                    </select>
                    {/* Nav */}
                    <button onClick={navPrev} className="admin-icon-btn"><ChevronLeft size={17} /></button>
                    <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', minWidth: 150, textAlign: 'center' }}>
                        {viewMode === 'month' ? format(currentDate, 'MMMM yyyy') : `${format(weekStart, 'MMM d')} – ${format(addDays(weekStart, 6), 'MMM d, yyyy')}`}
                    </span>
                    <button onClick={navNext} className="admin-icon-btn"><ChevronRight size={17} /></button>
                    <button onClick={() => setCurrentDate(new Date())} className="admin-btn-secondary" style={{ fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}>Today</button>
                </div>
            </div>

            {/* ── Legend ── */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {Object.entries(STATUS_COLORS).map(([s, c]) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.dot, display: 'inline-block' }} />
                        <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                    </div>
                ))}
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', marginLeft: 'auto' }}>{filteredBookings.length} trips</span>
            </div>

            {/* ── Calendar Grid ── */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf2', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                {/* Day headers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #e8edf2', background: '#f8fafc' }}>
                    {DAY_LABELS.map(d => (
                        <div key={d} style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{d}</div>
                    ))}
                </div>

                {/* ── MONTH VIEW ── */}
                {viewMode === 'month' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                        {days.map((day, i) => {
                            const dayKey = format(day, 'yyyy-MM-dd');
                            const dayBookings = getDayBookings(day);
                            const isToday = isSameDay(day, new Date());
                            const isCurrentMonth = isSameMonth(day, currentDate);
                            const MAX_VISIBLE = 3;
                            const visible = dayBookings.slice(0, MAX_VISIBLE);
                            const hidden = dayBookings.length - MAX_VISIBLE;
                            const expanded = expandedDay === dayKey;

                            return (
                                <div key={i} style={{ minHeight: 110, padding: '0.5rem', borderRight: (i + 1) % 7 !== 0 ? '1px solid #f1f5f9' : 'none', borderBottom: '1px solid #f1f5f9', background: isToday ? '#f0f9ff' : isCurrentMonth ? '#fff' : '#f8fafc', position: 'relative', transition: 'background 0.1s' }}>
                                    {/* Day number */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                        <span style={{ fontSize: '0.82rem', fontWeight: isToday ? 800 : 600, color: isToday ? '#fff' : isCurrentMonth ? '#334155' : '#cbd5e1', background: isToday ? '#3b82f6' : 'transparent', width: isToday ? 22 : 'auto', height: isToday ? 22 : 'auto', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {format(day, 'd')}
                                        </span>
                                        {isCurrentMonth && dayBookings.length === 0 && (
                                            <button title="New booking" style={{ opacity: 0, background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0 2px' }} onMouseEnter={e => (e.currentTarget.style.opacity = '1')} onMouseLeave={e => (e.currentTarget.style.opacity = '0')}>
                                                <Plus size={12} />
                                            </button>
                                        )}
                                    </div>
                                    {/* Trips */}
                                    {(expanded ? dayBookings : visible).map(b => <TripChip key={b.id} b={b} compact />)}
                                    {/* +N more */}
                                    {!expanded && hidden > 0 && (
                                        <button onClick={() => setExpandedDay(dayKey)} style={{ fontSize: '0.68rem', color: '#6366f1', fontWeight: 700, background: '#eef2ff', border: 'none', borderRadius: 4, padding: '1px 6px', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                                            +{hidden} more
                                        </button>
                                    )}
                                    {expanded && (
                                        <button onClick={() => setExpandedDay(null)} style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 700, background: '#f1f5f9', border: 'none', borderRadius: 4, padding: '1px 6px', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                                            Show less
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* ── WEEK VIEW ── */}
                {viewMode === 'week' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', minHeight: 400 }}>
                        {weekDays.map((day, i) => {
                            const dayBookings = getDayBookings(day);
                            const isToday = isSameDay(day, new Date());
                            return (
                                <div key={i} style={{ padding: '0.75rem 0.5rem', borderRight: i < 6 ? '1px solid #f1f5f9' : 'none', background: isToday ? '#f0f9ff' : '#fff' }}>
                                    {loading ? (
                                        <div style={{ fontSize: '0.75rem', color: '#cbd5e1', textAlign: 'center' }}>Loading...</div>
                                    ) : dayBookings.length > 0 ? dayBookings.map(b => <TripChip key={b.id} b={b} />) : (
                                        <div style={{ fontSize: '0.72rem', color: '#e2e8f0', textAlign: 'center', marginTop: '1rem' }}>No trips</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
