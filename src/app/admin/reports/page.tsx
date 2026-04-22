'use client';
import { useState, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Download, FileText, TrendingUp, Users, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

type ReportType = 'trips' | 'revenue' | 'customers';

export default function ReportsPage() {
    const [reportType, setReportType] = useState<ReportType>('trips');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [generated, setGenerated] = useState(false);
    const supabase = createClient();

    const generateReport = useCallback(async () => {
        setLoading(true); setGenerated(false);
        if (reportType === 'trips') {
            let q = supabase.from('bookings').select('*').order('travel_date', { ascending: false });
            if (dateFrom) q = q.gte('travel_date', dateFrom);
            if (dateTo) q = q.lte('travel_date', dateTo);
            const { data: r } = await q; setData(r ?? []);
        } else if (reportType === 'revenue') {
            let q = supabase.from('invoices').select('*').order('created_at', { ascending: false });
            if (dateFrom) q = q.gte('created_at', dateFrom);
            if (dateTo) q = q.lte('created_at', dateTo);
            const { data: r } = await q; setData(r ?? []);
        } else {
            const { data: r } = await supabase.from('customers').select('*').order('total_bookings', { ascending: false });
            setData(r ?? []);
        }
        setLoading(false); setGenerated(true);
    }, [reportType, dateFrom, dateTo]);

    const exportCSV = () => {
        if (!data.length) return;
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(row => Object.values(row).map(v => typeof v === 'string' && v.includes(',') ? `"${v}"` : v).join(','));
        const blob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
        a.download = `${reportType}_${format(new Date(), 'yyyy-MM-dd')}.csv`; a.click();
    };

    const opts = [
        { id: 'trips', label: 'Trips Report', icon: FileText, desc: 'All bookings with status & details' },
        { id: 'revenue', label: 'Revenue Report', icon: TrendingUp, desc: 'Invoices & payment statuses' },
        { id: 'customers', label: 'Customers Report', icon: Users, desc: 'Customer profiles & lifetime value' },
    ];

    return (
        <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.75rem' }}>
                <div>
                    <h1 className="admin-page-title">Reports & Export</h1>
                    <p className="admin-page-sub" style={{ margin:0 }}>Generate and download business reports as CSV.</p>
                </div>
            </div>
            <div style={{ background:'#fff', borderRadius:14, border:'1px solid #e8edf2', padding:'1.5rem', marginBottom:'1.5rem' }}>
                <div style={{ fontWeight:700, fontSize:'0.95rem', color:'#0f172a', marginBottom:'1rem' }}>1. Choose Report Type</div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:'0.75rem', marginBottom:'1.25rem' }}>
                    {opts.map(opt => { const Icon=opt.icon; const active=reportType===opt.id;
                        return (
                            <button key={opt.id} onClick={() => setReportType(opt.id as ReportType)} style={{ padding:'1rem', borderRadius:10, border:`2px solid ${active?'#fbbf24':'#e2e8f0'}`, background:active?'#fffbeb':'#f8fafc', cursor:'pointer', textAlign:'left', transition:'all 0.15s' }}>
                                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.3rem' }}>
                                    <Icon size={15} color={active?'#d97706':'#64748b'} />
                                    <span style={{ fontWeight:700, fontSize:'0.85rem', color:active?'#92400e':'#0f172a' }}>{opt.label}</span>
                                </div>
                                <div style={{ fontSize:'0.75rem', color:'#64748b' }}>{opt.desc}</div>
                            </button>
                        );
                    })}
                </div>
                {reportType !== 'customers' && (
                    <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', marginBottom:'1.25rem' }}>
                        <div><label style={{ fontSize:'0.8rem', fontWeight:600, color:'#64748b', display:'block', marginBottom:4 }}>Date From</label>
                            <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} className="admin-filter-select" /></div>
                        <div><label style={{ fontSize:'0.8rem', fontWeight:600, color:'#64748b', display:'block', marginBottom:4 }}>Date To</label>
                            <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} className="admin-filter-select" /></div>
                    </div>
                )}
                <div style={{ display:'flex', gap:'0.75rem' }}>
                    <button onClick={generateReport} className="admin-btn-primary" disabled={loading}>
                        <RefreshCw size={15} /> {loading ? 'Generating...' : 'Generate Report'}
                    </button>
                    {generated && data.length > 0 && (
                        <button onClick={exportCSV} className="admin-btn-secondary"><Download size={15} /> Export CSV</button>
                    )}
                </div>
            </div>

            {generated && (
                <>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px,1fr))', gap:'1rem', marginBottom:'1.5rem' }}>
                        <div className="admin-stat-card">
                            <div style={{ fontSize:'0.78rem', color:'#94a3b8', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.6px' }}>Records</div>
                            <div style={{ fontSize:'1.6rem', fontWeight:800, color:'#0f172a' }}>{data.length}</div>
                        </div>
                        {reportType==='revenue' && <div className="admin-stat-card">
                            <div style={{ fontSize:'0.78rem', color:'#94a3b8', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.6px' }}>Total Revenue</div>
                            <div style={{ fontSize:'1.2rem', fontWeight:800, color:'#10b981' }}>SAR {data.reduce((s,r)=>s+(r.total_amount||0),0).toFixed(2)}</div>
                        </div>}
                        {reportType==='trips' && <div className="admin-stat-card">
                            <div style={{ fontSize:'0.78rem', color:'#94a3b8', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.6px' }}>Completed</div>
                            <div style={{ fontSize:'1.6rem', fontWeight:800, color:'#10b981' }}>{data.filter(d=>d.status==='completed').length}</div>
                        </div>}
                    </div>
                    <div className="admin-table-wrap" style={{ overflowX:'auto' }}>
                        {reportType==='trips' && (
                            <table className="admin-table"><thead><tr><th>Customer</th><th>Route</th><th>Date</th><th>Service</th><th>Status</th><th>Amount</th></tr></thead>
                            <tbody>{data.map(b=><tr key={b.id}>
                                <td><div style={{ fontWeight:600 }}>{b.customer_name}</div><div style={{ fontSize:'0.75rem', color:'#94a3b8' }}>{b.customer_phone}</div></td>
                                <td style={{ fontSize:'0.8rem' }}><div>↑ {b.pickup_location}</div><div style={{ marginTop:2 }}>↓ {b.dropoff_location}</div></td>
                                <td style={{ fontSize:'0.82rem' }}>{b.travel_date}</td>
                                <td style={{ fontSize:'0.82rem' }}>{b.service_type}</td>
                                <td><span className={`badge-${b.status}`}>{b.status}</span></td>
                                <td style={{ fontWeight:700 }}>{b.quote_amount ? `SAR ${b.quote_amount}` : '—'}</td>
                            </tr>)}</tbody></table>
                        )}
                        {reportType==='revenue' && (
                            <table className="admin-table"><thead><tr><th>Invoice #</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
                            <tbody>{data.map(i=><tr key={i.id}>
                                <td style={{ fontWeight:700 }}>{i.invoice_number}</td>
                                <td>{i.customer_name}</td>
                                <td style={{ fontWeight:700, color:'#10b981' }}>SAR {i.total_amount}</td>
                                <td><span className={i.status==='paid'?'badge-confirmed':'badge-pending'}>{i.status}</span></td>
                                <td style={{ fontSize:'0.82rem' }}>{i.created_at ? format(new Date(i.created_at),'dd MMM yyyy') : '—'}</td>
                            </tr>)}</tbody></table>
                        )}
                        {reportType==='customers' && (
                            <table className="admin-table"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Bookings</th><th>Spent</th><th>VIP</th></tr></thead>
                            <tbody>{data.map(c=><tr key={c.id}>
                                <td style={{ fontWeight:600 }}>{c.name}</td>
                                <td style={{ fontSize:'0.82rem' }}>{c.email}</td>
                                <td style={{ fontSize:'0.82rem' }}>{c.phone}</td>
                                <td style={{ fontWeight:700, textAlign:'center' }}>{c.total_bookings}</td>
                                <td style={{ fontWeight:700, color:'#10b981' }}>SAR {c.total_spent}</td>
                                <td>{c.is_vip?'⭐':'—'}</td>
                            </tr>)}</tbody></table>
                        )}
                        {data.length===0 && <div style={{ padding:'4rem', textAlign:'center', color:'#94a3b8' }}>No data found.</div>}
                    </div>
                </>
            )}
        </div>
    );
}
