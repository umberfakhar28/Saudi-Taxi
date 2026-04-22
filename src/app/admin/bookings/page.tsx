'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Search, Filter, RefreshCw, ExternalLink, ChevronDown, X } from 'lucide-react';
import { format } from 'date-fns';

const STATUS_OPTIONS = ['all', 'pending', 'confirmed', 'completed', 'cancelled'];

export default function BookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [editModal, setEditModal] = useState<any | null>(null);
    const [notesModal, setNotesModal] = useState<any | null>(null);
    const [notes, setNotes] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();

    const fetchBookings = useCallback(async () => {
        setLoading(true);
        let q = supabase.from('bookings').select('*').order('created_at', { ascending: false });
        if (statusFilter !== 'all') q = q.eq('status', statusFilter);
        const { data, error } = await q;
        if (!error) setBookings(data ?? []);
        setLoading(false);
    }, [statusFilter]);

    useEffect(() => { fetchBookings(); }, [fetchBookings]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpenDropdown(null);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        await supabase.from('bookings').update({ status: newStatus }).eq('id', id);
        if (newStatus === 'confirmed') {
            await fetch('/api/emails/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'booking_confirmed', bookingId: id }) });
        }
        if (newStatus === 'completed') {
            const b = bookings.find(b => b.id === id);
            if (b) {
                const invNum = `INV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
                await supabase.from('invoices').insert({ invoice_number: invNum, booking_id: b.id, customer_name: b.customer_name, customer_email: b.customer_email, customer_phone: b.customer_phone, pickup_location: b.pickup_location, dropoff_location: b.dropoff_location, travel_date: b.travel_date, service_type: b.service_type, subtotal: b.quote_amount || 0, total_amount: b.quote_amount || 0, status: 'unpaid', due_date: new Date(Date.now() + 7 * 86400000).toISOString() });
            }
        }
        setOpenDropdown(null); fetchBookings();
    };

    const duplicateTrip = async (b: any) => {
        await supabase.from('bookings').insert({ customer_name: b.customer_name, customer_email: b.customer_email, customer_phone: b.customer_phone, service_type: b.service_type, pickup_location: b.pickup_location, dropoff_location: b.dropoff_location, travel_date: b.travel_date, travel_time: b.travel_time, passengers_count: b.passengers_count, special_notes: b.special_notes, status: 'pending', quote_amount: b.quote_amount, car_type: b.car_type });
        alert('Trip duplicated!'); setOpenDropdown(null); fetchBookings();
    };

    const addTag = async (id: string, tag: string) => {
        const b = bookings.find(b => b.id === id);
        const cur = b?.tags || [];
        const next = cur.includes(tag) ? cur.filter((t: string) => t !== tag) : [...cur, tag];
        await supabase.from('bookings').update({ tags: next }).eq('id', id);
        setOpenDropdown(null); fetchBookings();
    };

    const generateInvoice = async (b: any) => {
        const invNum = `INV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
        const { error } = await supabase.from('invoices').insert({ invoice_number: invNum, booking_id: b.id, customer_name: b.customer_name, customer_email: b.customer_email, customer_phone: b.customer_phone, pickup_location: b.pickup_location, dropoff_location: b.dropoff_location, travel_date: b.travel_date, service_type: b.service_type, subtotal: b.quote_amount || 0, total_amount: b.quote_amount || 0, status: 'unpaid', due_date: new Date(Date.now() + 7 * 86400000).toISOString() });
        alert(!error ? 'Invoice generated!' : 'Invoice may already exist.'); setOpenDropdown(null);
    };

    const sendEmail = async (type: string, b: any) => {
        await fetch('/api/emails/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, bookingData: b }) });
        alert('Email sent!'); setOpenDropdown(null);
    };

    const saveNotes = async () => {
        if (!notesModal) return;
        await supabase.from('bookings').update({ internal_notes: notes }).eq('id', notesModal.id);
        setNotesModal(null); fetchBookings();
    };

    const saveEdit = async () => {
        if (!editModal) return;
        await supabase.from('bookings').update({ customer_name: editModal.customer_name, customer_phone: editModal.customer_phone, customer_email: editModal.customer_email, service_type: editModal.service_type, pickup_location: editModal.pickup_location, dropoff_location: editModal.dropoff_location, travel_date: editModal.travel_date, travel_time: editModal.travel_time, passengers_count: parseInt(editModal.passengers_count) || 1, quote_amount: parseFloat(editModal.quote_amount) || null, internal_notes: editModal.internal_notes }).eq('id', editModal.id);
        setEditModal(null); fetchBookings();
    };

    const filtered = bookings.filter(b => b.customer_name.toLowerCase().includes(search.toLowerCase()) || b.customer_phone.includes(search) || b.pickup_location.toLowerCase().includes(search.toLowerCase()) || (b.service_type || '').toLowerCase().includes(search.toLowerCase()));
    const statusClass = (s: string) => ({ pending: 'badge-pending', confirmed: 'badge-confirmed', completed: 'badge-completed', cancelled: 'badge-cancelled' } as Record<string, string>)[s] ?? 'badge-pending';
    const counts = STATUS_OPTIONS.reduce((acc, s) => { acc[s] = s === 'all' ? bookings.length : bookings.filter(b => b.status === s).length; return acc; }, {} as Record<string, number>);

    const menuItem = (label: string, action: () => void, color?: string) => (
        <button key={label} onClick={action} style={{ display: 'block', width: '100%', padding: '0.6rem 1rem', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.82rem', color: color || '#334155' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')} onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
            {label}
        </button>
    );

    const sectionHeader = (label: string) => (
        <div key={label} style={{ padding: '0.4rem 0.75rem', fontSize: '0.62rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', background: '#f8fafc', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>{label}</div>
    );

    return (
        <div>
            {/* ── Edit Modal ── */}
            {editModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a' }}>Edit Booking</div>
                            <button onClick={() => setEditModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={20} /></button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {[
                                { key: 'customer_name', label: 'Customer Name', span: true },
                                { key: 'customer_phone', label: 'Phone' },
                                { key: 'customer_email', label: 'Email' },
                                { key: 'service_type', label: 'Service Type' },
                                { key: 'pickup_location', label: 'Pickup Location', span: true },
                                { key: 'dropoff_location', label: 'Dropoff Location', span: true },
                                { key: 'travel_date', label: 'Date', type: 'date' },
                                { key: 'travel_time', label: 'Time', type: 'time' },
                                { key: 'passengers_count', label: 'Passengers', type: 'number' },
                                { key: 'quote_amount', label: 'Quote (SAR)', type: 'number' },
                            ].map(f => (
                                <div key={f.key} style={{ gridColumn: f.span ? '1/-1' : 'auto' }}>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>{f.label}</label>
                                    <input type={f.type || 'text'} value={editModal[f.key] || ''} onChange={e => setEditModal({ ...editModal, [f.key]: e.target.value })} className="admin-search-input" style={{ width: '100%', boxSizing: 'border-box' }} />
                                </div>
                            ))}
                            <div style={{ gridColumn: '1/-1' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Internal Notes (admin only)</label>
                                <textarea value={editModal.internal_notes || ''} onChange={e => setEditModal({ ...editModal, internal_notes: e.target.value })} rows={3} className="admin-search-input" style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                            <button onClick={() => setEditModal(null)} className="admin-btn-secondary">Cancel</button>
                            <button onClick={saveEdit} className="admin-btn-primary">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Notes Modal ── */}
            {notesModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', width: '100%', maxWidth: 460 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>Notes — {notesModal.customer_name}</div>
                            <button onClick={() => setNotesModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={20} /></button>
                        </div>
                        <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={6} className="admin-search-input" style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }} placeholder="Add internal notes (not visible to customer)..." />
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                            <button onClick={() => setNotesModal(null)} className="admin-btn-secondary">Cancel</button>
                            <button onClick={saveNotes} className="admin-btn-primary">Save Notes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Header ── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                <div>
                    <h1 className="admin-page-title">Bookings</h1>
                    <p className="admin-page-sub" style={{ margin: 0 }}>All customer ride requests in one place.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={fetchBookings} className="admin-btn-secondary"><RefreshCw size={15} /> Refresh</button>
                    <a href="/book-online" target="_blank" className="admin-btn-primary"><ExternalLink size={15} /> New Booking</a>
                </div>
            </div>

            {/* Status tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                {STATUS_OPTIONS.map(s => (
                    <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '0.45rem 1rem', borderRadius: 9999, border: '1.5px solid', borderColor: statusFilter === s ? '#fbbf24' : '#e2e8f0', background: statusFilter === s ? '#fffbeb' : '#fff', color: statusFilter === s ? '#92400e' : '#64748b', fontWeight: statusFilter === s ? 700 : 500, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                        <span style={{ background: statusFilter === s ? '#fbbf24' : '#f1f5f9', color: statusFilter === s ? '#0f172a' : '#64748b', borderRadius: 9999, padding: '0 0.4rem', fontSize: '0.72rem', fontWeight: 700 }}>{counts[s]}</span>
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="admin-filter-bar">
                <div className="admin-search-wrap">
                    <Search size={16} className="admin-search-icon" />
                    <input type="text" className="admin-search-input" placeholder="Search by name, phone, location, or service..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                    <Filter size={14} /> {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                </div>
            </div>

            {/* Table */}
            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Customer</th><th>Trip</th><th>Service</th><th>Date & Time</th><th>Tags</th><th>Status</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={7} style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>Loading...</td></tr>
                        ) : filtered.length > 0 ? filtered.map(b => (
                            <tr key={b.id}>
                                <td>
                                    <div style={{ fontWeight: 700, color: '#1e293b' }}>{b.customer_name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{b.customer_email}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#10b981' }}>{b.customer_phone}</div>
                                    {b.internal_notes && <div style={{ fontSize: '0.7rem', color: '#f59e0b', marginTop: 3 }}>📝 Has notes</div>}
                                </td>
                                <td style={{ minWidth: 180 }}>
                                    <div style={{ fontSize: '0.82rem' }}><span style={{ color: '#10b981', fontWeight: 700 }}>↑</span> {b.pickup_location}</div>
                                    <div style={{ fontSize: '0.82rem', marginTop: 3 }}><span style={{ color: '#f43f5e', fontWeight: 700 }}>↓</span> {b.dropoff_location}</div>
                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 3 }}>{b.passengers_count} pax</div>
                                </td>
                                <td><span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6366f1' }}>{b.service_type}</span></td>
                                <td>
                                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{b.travel_date ? format(new Date(b.travel_date), 'dd MMM yyyy') : '—'}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 2 }}>{b.travel_time || '—'}</div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                                        {(b.tags || []).map((tag: string) => (
                                            <span key={tag} style={{ fontSize: '0.65rem', background: '#fef3c7', color: '#d97706', padding: '0.1rem 0.45rem', borderRadius: 4, fontWeight: 700 }}>{tag}</span>
                                        ))}
                                    </div>
                                </td>
                                <td><span className={statusClass(b.status)}>{b.status.charAt(0).toUpperCase() + b.status.slice(1)}</span></td>
                                <td>
                                    {/* ── Dropdown ── */}
                                    <div style={{ position: 'relative' }} ref={openDropdown === b.id ? dropdownRef : undefined}>
                                        <button className="admin-btn-secondary" style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }} onClick={() => setOpenDropdown(openDropdown === b.id ? null : b.id)}>
                                            Actions <ChevronDown size={13} />
                                        </button>
                                        {openDropdown === b.id && (
                                            <div style={{ position: 'absolute', right: 0, top: '110%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.14)', zIndex: 100, minWidth: 220, overflow: 'hidden' }}>
                                                {sectionHeader('Billing')}
                                                {menuItem('🧾 Generate Invoice', () => generateInvoice(b))}
                                                {menuItem('📤 Send Invoice Email', () => sendEmail('booking_confirmed', b))}
                                                {menuItem('✅ Mark Invoice Paid', async () => { await supabase.from('invoices').update({ status: 'paid' }).eq('booking_id', b.id); alert('Marked paid'); setOpenDropdown(null); })}

                                                {sectionHeader('Booking')}
                                                {menuItem('✏️ Edit Booking', () => { setEditModal({ ...b }); setOpenDropdown(null); })}
                                                {b.status === 'pending' && menuItem('✅ Confirm Booking', () => updateStatus(b.id, 'confirmed'), '#10b981')}
                                                {b.status === 'confirmed' && menuItem('🏁 Mark Completed', () => updateStatus(b.id, 'completed'), '#6366f1')}
                                                {b.status !== 'cancelled' && menuItem('❌ Cancel Trip', () => { if (confirm('Cancel this booking?')) updateStatus(b.id, 'cancelled'); }, '#ef4444')}
                                                {menuItem('📋 Duplicate Trip', () => duplicateTrip(b))}

                                                {sectionHeader('Communication')}
                                                {menuItem('📩 Send Booking Details', () => sendEmail('booking_confirmed', b))}
                                                {menuItem('🔔 Send Reminder', () => sendEmail('booking_completed', b))}
                                                {menuItem('💬 WhatsApp Customer', () => { window.open(`https://wa.me/${b.customer_phone.replace(/\D/g, '')}`, '_blank'); setOpenDropdown(null); })}
                                                {menuItem('📋 Copy Phone', () => { navigator.clipboard.writeText(b.customer_phone); alert('Copied!'); setOpenDropdown(null); })}

                                                {sectionHeader('More')}
                                                {menuItem('📝 Add / View Notes', () => { setNotesModal(b); setNotes(b.internal_notes || ''); setOpenDropdown(null); })}
                                                {menuItem('🏷️ Tag: VIP', () => addTag(b.id, 'VIP'))}
                                                {menuItem('🏷️ Tag: Urgent', () => addTag(b.id, 'Urgent'))}
                                                {menuItem('🏷️ Tag: Repeat', () => addTag(b.id, 'Repeat'))}
                                                {menuItem('🗃️ Archive Trip', () => { if (confirm('Archive?')) updateStatus(b.id, 'cancelled'); })}
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={7} style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>No bookings match your search.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
