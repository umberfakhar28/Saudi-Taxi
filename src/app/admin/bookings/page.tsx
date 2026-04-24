'use client';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Search, Filter, RefreshCw, ExternalLink, ChevronDown, X, Download, Trash, CheckSquare, Square, FileText, MessageCircle, AlertTriangle, Eye, Edit, FilePlus, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, isToday, isThisWeek, isWithinInterval, startOfDay, endOfDay, addDays } from 'date-fns';

const STATUS_OPTIONS = ['all', 'pending', 'confirmed', 'completed', 'cancelled'];
const PAYMENT_OPTIONS = ['all', 'paid', 'unpaid', 'partially_paid'];

export default function BookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Filters & Search
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [paymentFilter, setPaymentFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    
    // Sorting & Pagination
    const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    
    // Bulk actions
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    
    // Modals & Dropdowns
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [editModal, setEditModal] = useState<any | null>(null);
    const [notesModal, setNotesModal] = useState<any | null>(null);
    const [viewModal, setViewModal] = useState<any | null>(null);
    const [notes, setNotes] = useState('');
    
    const dropdownRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();

    const fetchBookings = useCallback(async () => {
        setLoading(true);
        // We join with invoices to get payment status
        const { data, error } = await supabase.from('bookings').select('*, invoices(id, status, invoice_number, total_amount, paid_amount)').order('created_at', { ascending: false });
        if (!error && data) {
            setBookings(data);
        }
        setLoading(false);
    }, [supabase]);

    useEffect(() => { fetchBookings(); }, [fetchBookings]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpenDropdown(null);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Derived properties for bookings (to simplify filtering/sorting)
    const processedBookings = useMemo(() => {
        return bookings.map(b => {
            const invoice = b.invoices && b.invoices.length > 0 ? b.invoices[0] : null;
            return {
                ...b,
                payment_status: invoice ? invoice.status : 'no_invoice',
                invoice_number: invoice ? invoice.invoice_number : null,
                invoice_id: invoice ? invoice.id : null,
                is_upcoming: b.travel_date && new Date(b.travel_date) >= new Date() && new Date(b.travel_date) <= addDays(new Date(), 1)
            };
        });
    }, [bookings]);

    // Filtering
    const filteredBookings = useMemo(() => {
        let result = processedBookings;

        if (statusFilter !== 'all') {
            result = result.filter(b => b.status === statusFilter);
        }
        if (paymentFilter !== 'all') {
            result = result.filter(b => b.payment_status === paymentFilter);
        }
        if (dateFilter !== 'all') {
            result = result.filter(b => {
                if (!b.travel_date) return false;
                const d = new Date(b.travel_date);
                if (dateFilter === 'today') return isToday(d);
                if (dateFilter === 'this_week') return isThisWeek(d);
                return true;
            });
        }
        if (search) {
            const s = search.toLowerCase();
            result = result.filter(b => 
                b.customer_name?.toLowerCase().includes(s) || 
                b.customer_phone?.includes(s) || 
                b.customer_email?.toLowerCase().includes(s) ||
                b.pickup_location?.toLowerCase().includes(s) || 
                b.dropoff_location?.toLowerCase().includes(s) ||
                b.id?.toLowerCase().includes(s) ||
                (b.service_type || '').toLowerCase().includes(s)
            );
        }

        // Sorting
        result.sort((a, b) => {
            let valA = a[sortConfig.key];
            let valB = b[sortConfig.key];
            if (sortConfig.key === 'customer') { valA = a.customer_name; valB = b.customer_name; }
            if (sortConfig.key === 'date') { valA = a.travel_date; valB = b.travel_date; }

            if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return result;
    }, [processedBookings, search, statusFilter, paymentFilter, dateFilter, sortConfig]);

    // Pagination
    const paginatedBookings = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredBookings.slice(start, start + pageSize);
    }, [filteredBookings, page, pageSize]);

    const handleSort = (key: string) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleSelectAll = () => {
        if (selectedIds.size === paginatedBookings.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(paginatedBookings.map(b => b.id)));
        }
    };

    const handleSelectOne = (id: string) => {
        const next = new Set(selectedIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedIds(next);
    };

    // Actions
    const updateStatus = async (id: string, newStatus: string) => {
        if (newStatus === 'cancelled' && !confirm('Are you sure you want to cancel this booking?')) return;
        
        await supabase.from('bookings').update({ status: newStatus }).eq('id', id);
        
        if (newStatus === 'confirmed') {
            await fetch('/api/emails/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'booking_confirmed', bookingId: id }) });
        }
        if (newStatus === 'completed') {
            const b = bookings.find(b => b.id === id);
            if (b && (!b.invoices || b.invoices.length === 0)) {
                if (confirm('Booking marked as completed. Would you like to generate an invoice now?')) {
                    generateInvoice(b);
                }
            }
        }
        setOpenDropdown(null); fetchBookings();
    };

    const duplicateTrip = async (b: any) => {
        await supabase.from('bookings').insert({ customer_name: b.customer_name, customer_email: b.customer_email, customer_phone: b.customer_phone, service_type: b.service_type, pickup_location: b.pickup_location, dropoff_location: b.dropoff_location, travel_date: b.travel_date, travel_time: b.travel_time, passengers_count: b.passengers_count, special_notes: b.special_notes, status: 'pending', quote_amount: b.quote_amount, car_type: b.car_type });
        alert('Trip duplicated successfully!'); setOpenDropdown(null); fetchBookings();
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
        if (!error) {
            alert('Invoice generated successfully!');
            fetchBookings();
        } else {
            alert('Error: Invoice may already exist.');
        }
        setOpenDropdown(null);
    };

    const sendEmail = async (type: string, b: any) => {
        await fetch('/api/emails/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, bookingData: b }) });
        alert('Communication sent!'); setOpenDropdown(null);
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

    // Bulk Actions
    const handleBulkDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${selectedIds.size} bookings? This cannot be undone.`)) return;
        const ids = Array.from(selectedIds);
        await supabase.from('bookings').delete().in('id', ids);
        setSelectedIds(new Set());
        fetchBookings();
    };

    const handleBulkStatus = async (status: string) => {
        if (!confirm(`Update ${selectedIds.size} bookings to ${status}?`)) return;
        const ids = Array.from(selectedIds);
        await supabase.from('bookings').update({ status }).in('id', ids);
        setSelectedIds(new Set());
        fetchBookings();
    };

    const exportCSV = (dataToExport: any[]) => {
        const headers = ['ID', 'Customer', 'Phone', 'Pickup', 'Dropoff', 'Date', 'Time', 'Service', 'Status', 'Payment Status', 'Quote Amount'];
        const csvRows = [headers.join(',')];
        
        dataToExport.forEach(b => {
            const values = [
                b.id, `"${b.customer_name}"`, `"${b.customer_phone}"`, `"${b.pickup_location}"`, `"${b.dropoff_location}"`,
                b.travel_date, b.travel_time, `"${b.service_type}"`, b.status, b.payment_status, b.quote_amount || 0
            ];
            csvRows.push(values.join(','));
        });
        
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bookings_export_${format(new Date(), 'yyyyMMdd_HHmm')}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // UI Helpers
    const statusClass = (s: string) => ({ pending: 'badge-pending', confirmed: 'badge-confirmed', completed: 'badge-completed', cancelled: 'badge-cancelled' } as Record<string, string>)[s] ?? 'badge-pending';
    
    const paymentStatusColor = (s: string) => ({ paid: '#10b981', unpaid: '#ef4444', partially_paid: '#f59e0b', no_invoice: '#94a3b8' } as Record<string, string>)[s] ?? '#94a3b8';

    const counts = STATUS_OPTIONS.reduce((acc, s) => { acc[s] = s === 'all' ? processedBookings.length : processedBookings.filter(b => b.status === s).length; return acc; }, {} as Record<string, number>);

    return (
        <div style={{ paddingBottom: '4rem' }}>
            {/* ── View Details Modal (Deep View) ── */}
            {viewModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div style={{ background: '#f8fafc', borderRadius: 16, width: '100%', maxWidth: 700, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ background: '#fff', padding: '1.5rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#0f172a' }}>Booking Details</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4, fontFamily: 'monospace' }}>ID: {viewModal.id}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <span className={statusClass(viewModal.status)}>{viewModal.status.toUpperCase()}</span>
                                <button onClick={() => setViewModal(null)} style={{ background: '#f1f5f9', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', color: '#64748b' }}><X size={18} /></button>
                            </div>
                        </div>
                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '1rem' }}>Customer Info</div>
                                    <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1.1rem' }}>{viewModal.customer_name}</div>
                                    <div style={{ fontSize: '0.9rem', color: '#475569', marginTop: 8 }}>📞 {viewModal.customer_phone}</div>
                                    <div style={{ fontSize: '0.9rem', color: '#475569', marginTop: 4 }}>✉️ {viewModal.customer_email || 'No email provided'}</div>
                                </div>
                                <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '1rem' }}>Trip Summary</div>
                                    <div style={{ fontSize: '0.9rem', color: '#475569' }}><span style={{ color: '#10b981', fontWeight: 700 }}>↑</span> {viewModal.pickup_location}</div>
                                    <div style={{ fontSize: '0.9rem', color: '#475569', marginTop: 8 }}><span style={{ color: '#f43f5e', fontWeight: 700 }}>↓</span> {viewModal.dropoff_location}</div>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: 12, paddingTop: 12, borderTop: '1px solid #f1f5f9' }}>
                                        <div><div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Date</div><div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{viewModal.travel_date ? format(new Date(viewModal.travel_date), 'dd MMM yyyy') : 'TBD'}</div></div>
                                        <div><div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Time</div><div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{viewModal.travel_time || 'TBD'}</div></div>
                                        <div><div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Pax</div><div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{viewModal.passengers_count}</div></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '1rem' }}>Billing & Service</div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                                    <div><div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Service Type</div><div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{viewModal.service_type || 'N/A'}</div></div>
                                    <div><div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Quote Amount</div><div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>SAR {viewModal.quote_amount || 0}</div></div>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Payment Status</div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: paymentStatusColor(viewModal.payment_status), textTransform: 'capitalize' }}>{viewModal.payment_status.replace('_', ' ')}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Invoice ID</div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{viewModal.invoice_number || 'None'}</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '1rem' }}>Notes & Special Requests</div>
                                <div style={{ fontSize: '0.85rem', color: '#334155', background: '#fef3c7', padding: '1rem', borderRadius: 8, borderLeft: '4px solid #f59e0b', marginBottom: '1rem' }}>
                                    <strong>Customer Notes:</strong><br/>{viewModal.special_notes || 'No special notes provided by customer.'}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#334155', background: '#f8fafc', padding: '1rem', borderRadius: 8, borderLeft: '4px solid #3b82f6' }}>
                                    <strong>Internal Admin Notes:</strong><br/>{viewModal.internal_notes || 'No internal notes added.'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Edit Modal ── */}
            {editModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', width: '100%', maxWidth: 600, maxHeight: '90vh', overflowY: 'auto' }}>
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
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
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
                    <h1 className="admin-page-title">Booking Management</h1>
                    <p className="admin-page-sub" style={{ margin: 0 }}>Full control over leads, bookings, and active trips.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => exportCSV(filteredBookings)} className="admin-btn-secondary"><Download size={15} /> Export CSV</button>
                    <button onClick={fetchBookings} className="admin-btn-secondary"><RefreshCw size={15} /> Refresh</button>
                    <a href="/book-online" target="_blank" className="admin-btn-primary"><FilePlus size={15} /> New Booking</a>
                </div>
            </div>

            {/* Status tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                {STATUS_OPTIONS.map(s => (
                    <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }} style={{ padding: '0.45rem 1rem', borderRadius: 9999, border: '1.5px solid', borderColor: statusFilter === s ? '#fbbf24' : '#e2e8f0', background: statusFilter === s ? '#fffbeb' : '#fff', color: statusFilter === s ? '#92400e' : '#64748b', fontWeight: statusFilter === s ? 700 : 500, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s' }}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                        <span style={{ background: statusFilter === s ? '#fbbf24' : '#f1f5f9', color: statusFilter === s ? '#0f172a' : '#64748b', borderRadius: 9999, padding: '0 0.4rem', fontSize: '0.72rem', fontWeight: 700 }}>{counts[s]}</span>
                    </button>
                ))}
            </div>

            {/* Advanced Filters & Search */}
            <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 14, border: '1px solid #e8edf2', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ flex: '1 1 300px', position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input type="text" style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.2rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }} placeholder="Search ID, name, phone, email, location..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
                </div>
                
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <select value={dateFilter} onChange={e => { setDateFilter(e.target.value); setPage(1); }} style={{ padding: '0.6rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.8rem', outline: 'none', background: '#f8fafc', color: '#334155', fontWeight: 500 }}>
                        <option value="all">Any Date</option>
                        <option value="today">Travel Today</option>
                        <option value="this_week">Travel This Week</option>
                    </select>

                    <select value={paymentFilter} onChange={e => { setPaymentFilter(e.target.value); setPage(1); }} style={{ padding: '0.6rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.8rem', outline: 'none', background: '#f8fafc', color: '#334155', fontWeight: 500 }}>
                        <option value="all">Any Payment Status</option>
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                        <option value="partially_paid">Partially Paid</option>
                        <option value="no_invoice">No Invoice</option>
                    </select>
                </div>
            </div>

            {/* Bulk Actions Bar */}
            {selectedIds.size > 0 && (
                <div style={{ background: '#eff6ff', padding: '0.75rem 1.25rem', borderRadius: 8, border: '1px solid #bfdbfe', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: 'fadeIn 0.2s' }}>
                    <div style={{ fontWeight: 600, color: '#1e3a8a', fontSize: '0.85rem' }}>
                        {selectedIds.size} bookings selected
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <select onChange={(e) => { if (e.target.value) handleBulkStatus(e.target.value); e.target.value = ''; }} style={{ padding: '0.4rem 0.8rem', borderRadius: 6, border: '1px solid #93c5fd', fontSize: '0.75rem', outline: 'none' }}>
                            <option value="">Change Status...</option>
                            <option value="pending">Mark Pending</option>
                            <option value="confirmed">Mark Confirmed</option>
                            <option value="completed">Mark Completed</option>
                            <option value="cancelled">Mark Cancelled</option>
                        </select>
                        <button onClick={() => exportCSV(processedBookings.filter(b => selectedIds.has(b.id)))} className="admin-btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', background: '#fff', borderColor: '#93c5fd', color: '#1e3a8a' }}>Export Selected</button>
                        <button onClick={handleBulkDelete} className="admin-btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', background: '#fef2f2', borderColor: '#fca5a5', color: '#991b1b' }}><Trash size={14} style={{ marginRight: 4 }}/> Delete</button>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="admin-table-wrap" style={{ position: 'relative' }}>
                <table className="admin-table">
                    <thead style={{ position: 'sticky', top: 0, zIndex: 10, background: '#f8fafc' }}>
                        <tr>
                            <th style={{ width: 40, textAlign: 'center' }}>
                                <button onClick={handleSelectAll} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                                    {selectedIds.size === paginatedBookings.length && paginatedBookings.length > 0 ? <CheckSquare size={16} color="#3b82f6" /> : <Square size={16} />}
                                </button>
                            </th>
                            <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>ID/Alerts {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                            <th onClick={() => handleSort('customer')} style={{ cursor: 'pointer' }}>Customer {sortConfig.key === 'customer' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                            <th>Trip</th>
                            <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>Date & Time {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                            <th>Billing & Tags</th>
                            <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={8} style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}><RefreshCw className="animate-spin" style={{ margin: '0 auto', display: 'block', marginBottom: '1rem' }} /> Loading records...</td></tr>
                        ) : paginatedBookings.length > 0 ? paginatedBookings.map(b => (
                            <tr key={b.id} style={{ background: selectedIds.has(b.id) ? '#eff6ff' : 'transparent', transition: 'background 0.2s' }}>
                                <td style={{ textAlign: 'center' }}>
                                    <button onClick={() => handleSelectOne(b.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                                        {selectedIds.has(b.id) ? <CheckSquare size={16} color="#3b82f6" /> : <Square size={16} />}
                                    </button>
                                </td>
                                <td>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace', fontWeight: 600 }}>{b.id.substring(0, 8).toUpperCase()}</div>
                                    <div style={{ display: 'flex', gap: '0.2rem', marginTop: 4 }}>
                                        {b.is_upcoming && b.status !== 'completed' && b.status !== 'cancelled' && <span title="Upcoming within 24-48h"><AlertTriangle size={12} color="#f59e0b" /></span>}
                                        {b.payment_status === 'unpaid' && <span title="Unpaid"><AlertTriangle size={12} color="#ef4444" /></span>}
                                        {b.payment_status === 'no_invoice' && b.status === 'completed' && <span title="Missing Invoice"><FileText size={12} color="#8b5cf6" /></span>}
                                        {b.internal_notes && <span title="Has Internal Notes"><MessageCircle size={12} color="#3b82f6" /></span>}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.85rem' }}>{b.customer_name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{b.customer_phone}</div>
                                </td>
                                <td style={{ minWidth: 200 }}>
                                    <div style={{ fontSize: '0.8rem', lineHeight: 1.3, display: 'flex', alignItems: 'flex-start', gap: 4 }}><span style={{ color: '#10b981', fontWeight: 700 }}>↑</span> <span>{b.pickup_location}</span></div>
                                    <div style={{ fontSize: '0.8rem', lineHeight: 1.3, display: 'flex', alignItems: 'flex-start', gap: 4, marginTop: 4 }}><span style={{ color: '#f43f5e', fontWeight: 700 }}>↓</span> <span>{b.dropoff_location}</span></div>
                                </td>
                                <td>
                                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#334155' }}>{b.travel_date ? format(new Date(b.travel_date), 'dd MMM yyyy') : '—'}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 2 }}>{b.travel_time || '—'}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#6366f1', fontWeight: 600, marginTop: 4 }}>{b.service_type}</div>
                                </td>
                                <td>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>SAR {b.quote_amount || 0}</div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: paymentStatusColor(b.payment_status), textTransform: 'capitalize', marginTop: 2 }}>{b.payment_status.replace('_', ' ')}</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 6 }}>
                                        {(b.tags || []).map((tag: string) => (
                                            <span key={tag} style={{ fontSize: '0.6rem', background: '#f1f5f9', color: '#475569', padding: '0.1rem 0.3rem', borderRadius: 4, fontWeight: 700 }}>{tag}</span>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <span className={statusClass(b.status)}>{b.status.charAt(0).toUpperCase() + b.status.slice(1)}</span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '0.4rem' }}>
                                        <button onClick={() => setViewModal(b)} title="Deep View" style={{ background: '#f1f5f9', border: 'none', padding: '0.3rem', borderRadius: 6, cursor: 'pointer', color: '#3b82f6' }}><Eye size={14} /></button>
                                        <button onClick={() => setEditModal(b)} title="Quick Edit" style={{ background: '#f1f5f9', border: 'none', padding: '0.3rem', borderRadius: 6, cursor: 'pointer', color: '#10b981' }}><Edit size={14} /></button>
                                        {b.status === 'confirmed' && <button onClick={() => updateStatus(b.id, 'completed')} title="Mark Completed" style={{ background: '#e0e7ff', border: 'none', padding: '0.3rem', borderRadius: 6, cursor: 'pointer', color: '#4f46e5' }}><CheckSquare size={14} /></button>}
                                    </div>
                                    
                                    <div style={{ position: 'relative' }} ref={openDropdown === b.id ? dropdownRef : undefined}>
                                        <button className="admin-btn-secondary" style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap', marginLeft: 'auto' }} onClick={() => setOpenDropdown(openDropdown === b.id ? null : b.id)}>
                                            Actions <ChevronDown size={12} />
                                        </button>
                                        {openDropdown === b.id && (
                                            <div style={{ position: 'absolute', right: 0, top: '110%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, boxShadow: '0 10px 40px rgba(0,0,0,0.1)', zIndex: 100, minWidth: 220, overflow: 'hidden', textAlign: 'left' }}>
                                                <div style={{ padding: '0.4rem 0.75rem', fontSize: '0.62rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>Billing & Invoice</div>
                                                <button onClick={() => generateInvoice(b)} className="dropdown-item">🧾 Generate Invoice</button>
                                                {b.invoice_id && <button onClick={() => window.open(`/admin/invoices/${b.invoice_id}`, '_blank')} className="dropdown-item">👁️ View Invoice</button>}
                                                {b.invoice_id && b.payment_status !== 'paid' && <button onClick={async () => { await supabase.from('invoices').update({ status: 'paid' }).eq('booking_id', b.id); alert('Marked paid'); setOpenDropdown(null); fetchBookings(); }} className="dropdown-item">✅ Mark Invoice Paid</button>}

                                                <div style={{ padding: '0.4rem 0.75rem', fontSize: '0.62rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', background: '#f8fafc', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>Booking Status</div>
                                                <button onClick={() => updateStatus(b.id, 'pending')} className="dropdown-item text-amber-600">Mark Pending</button>
                                                <button onClick={() => updateStatus(b.id, 'confirmed')} className="dropdown-item text-blue-600">Confirm Booking</button>
                                                <button onClick={() => updateStatus(b.id, 'completed')} className="dropdown-item text-indigo-600">Mark Completed</button>
                                                <button onClick={() => updateStatus(b.id, 'cancelled')} className="dropdown-item text-red-600">Cancel Booking</button>
                                                <button onClick={() => duplicateTrip(b)} className="dropdown-item">📋 Duplicate Trip</button>

                                                <div style={{ padding: '0.4rem 0.75rem', fontSize: '0.62rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', background: '#f8fafc', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>Communication</div>
                                                <button onClick={() => sendEmail('booking_confirmed', b)} className="dropdown-item">📩 Email Confirmation</button>
                                                <button onClick={() => { window.open(`https://wa.me/${b.customer_phone.replace(/\D/g, '')}?text=Hello ${b.customer_name}, regarding your booking with Saudi Taxi...`, '_blank'); setOpenDropdown(null); }} className="dropdown-item">💬 WhatsApp Customer</button>

                                                <div style={{ padding: '0.4rem 0.75rem', fontSize: '0.62rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', background: '#f8fafc', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>More</div>
                                                <button onClick={() => { setNotesModal(b); setNotes(b.internal_notes || ''); setOpenDropdown(null); }} className="dropdown-item">📝 Internal Notes</button>
                                                <button onClick={() => addTag(b.id, 'VIP')} className="dropdown-item">🏷️ Toggle VIP Tag</button>
                                                <button onClick={() => addTag(b.id, 'Urgent')} className="dropdown-item">🏷️ Toggle Urgent Tag</button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={8} style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
                                <Search size={32} style={{ opacity: 0.3, margin: '0 auto', marginBottom: '1rem', display: 'block' }} />
                                No bookings match your current filters and search.
                            </td></tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                {!loading && filteredBookings.length > 0 && (
                    <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }}>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filteredBookings.length)} of {filteredBookings.length} bookings
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }} style={{ padding: '0.4rem', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: '0.75rem', outline: 'none' }}>
                                <option value={10}>10 per page</option>
                                <option value={25}>25 per page</option>
                                <option value={50}>50 per page</option>
                                <option value={100}>100 per page</option>
                            </select>
                            <div style={{ display: 'flex', gap: '0.3rem' }}>
                                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '0.4rem', borderRadius: 6, border: '1px solid #e2e8f0', background: page === 1 ? '#f8fafc' : '#fff', color: page === 1 ? '#cbd5e1' : '#334155', cursor: page === 1 ? 'not-allowed' : 'pointer' }}><ChevronLeft size={16} /></button>
                                <button onClick={() => setPage(p => Math.min(Math.ceil(filteredBookings.length / pageSize), p + 1))} disabled={page >= Math.ceil(filteredBookings.length / pageSize)} style={{ padding: '0.4rem', borderRadius: 6, border: '1px solid #e2e8f0', background: page >= Math.ceil(filteredBookings.length / pageSize) ? '#f8fafc' : '#fff', color: page >= Math.ceil(filteredBookings.length / pageSize) ? '#cbd5e1' : '#334155', cursor: page >= Math.ceil(filteredBookings.length / pageSize) ? 'not-allowed' : 'pointer' }}><ChevronRight size={16} /></button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                .dropdown-item {
                    display: block; width: 100%; padding: 0.6rem 1rem; text-align: left; background: none; border: none; cursor: pointer; font-size: 0.8rem; color: #334155; font-weight: 500;
                }
                .dropdown-item:hover { background: #f8fafc; color: #0f172a; }
                .text-amber-600 { color: #d97706 !important; }
                .text-blue-600 { color: #2563eb !important; }
                .text-indigo-600 { color: #4f46e5 !important; }
                .text-red-600 { color: #dc2626 !important; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
            `}} />
        </div>
    );
}
