'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchBookings = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('travel_time', { ascending: true });
        if (!error) setBookings(data ?? []);
        setLoading(false);
    }, []);

    useEffect(() => { fetchBookings(); }, [fetchBookings]);

    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday
    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

    const nextWeek = () => setCurrentDate(addDays(currentDate, 7));
    const prevWeek = () => setCurrentDate(addDays(currentDate, -7));

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return '#dcfce7';
            case 'completed': return '#dbeafe';
            case 'cancelled': return '#fee2e2';
            default: return '#fef9c3';
        }
    };
    
    const getStatusTextColor = (status: string) => {
        switch (status) {
            case 'confirmed': return '#166534';
            case 'completed': return '#1e40af';
            case 'cancelled': return '#991b1b';
            default: return '#854d0e';
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                <div>
                    <h1 className="admin-page-title">Trip Calendar</h1>
                    <p className="admin-page-sub" style={{ margin: 0 }}>Weekly view of all scheduled trips.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button onClick={prevWeek} className="admin-icon-btn"><ChevronLeft size={18} /></button>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b', minWidth: 140, textAlign: 'center' }}>
                        {format(startDate, 'MMM d')} - {format(addDays(startDate, 6), 'MMM d, yyyy')}
                    </span>
                    <button onClick={nextWeek} className="admin-icon-btn"><ChevronRight size={18} /></button>
                </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf2', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #e8edf2' }}>
                    {weekDays.map((day, i) => (
                        <div key={i} style={{ padding: '1rem', textAlign: 'center', borderRight: i < 6 ? '1px solid #e8edf2' : 'none', background: isSameDay(day, new Date()) ? '#f8fafc' : '#fff' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>{format(day, 'EEE')}</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: isSameDay(day, new Date()) ? '#0f172a' : '#475569', marginTop: 4 }}>{format(day, 'd')}</div>
                        </div>
                    ))}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', minHeight: 500 }}>
                    {weekDays.map((day, i) => {
                        const dayBookings = bookings.filter(b => b.travel_date && isSameDay(new Date(b.travel_date), day));
                        
                        return (
                            <div key={i} style={{ padding: '0.5rem', borderRight: i < 6 ? '1px solid #e8edf2' : 'none', background: isSameDay(day, new Date()) ? '#f8fafc' : '#fff' }}>
                                {loading ? (
                                    <div style={{ fontSize: '0.75rem', color: '#cbd5e1', textAlign: 'center', marginTop: '1rem' }}>Loading...</div>
                                ) : dayBookings.length > 0 ? dayBookings.map(b => (
                                    <div key={b.id} style={{
                                        background: getStatusColor(b.status),
                                        padding: '0.6rem',
                                        borderRadius: 8,
                                        marginBottom: '0.5rem',
                                        border: '1px solid rgba(0,0,0,0.05)',
                                        cursor: 'pointer'
                                    }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: getStatusTextColor(b.status), marginBottom: 2 }}>{b.travel_time}</div>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1e293b' }}>{b.customer_name}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#475569', marginTop: 4, display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                                            <MapPin size={10} style={{ marginTop: 2, flexShrink: 0 }} />
                                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.pickup_location.split(',')[0]}</span>
                                        </div>
                                    </div>
                                )) : (
                                    <div style={{ fontSize: '0.75rem', color: '#cbd5e1', textAlign: 'center', marginTop: '1rem' }}>No trips</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
