'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { calculateQuotePrice, formatSAR } from '@/utils/pricing';
import { Calculator, Send, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

const VEHICLES = ['Sedan', 'SUV', 'Luxury', 'Van', 'Minibus'];

export default function NewQuotePage() {
    const router = useRouter();
    const supabase = createClient();
    const [rules, setRules] = useState<any[]>([]);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        customer_name: '', customer_email: '', customer_phone: '',
        pickup_location: '', dropoff_location: '',
        distance_km: '0', vehicle_type: 'Sedan',
        travel_date: '', travel_time: '', passengers_count: '1',
        notes: '', admin_override_amount: ''
    });

    useEffect(() => {
        supabase.from('automation_rules').select('*').eq('is_active', true)
            .then(({ data }) => setRules(data ?? []));
    }, []);

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const pricing = calculateQuotePrice(
        { vehicleType: form.vehicle_type, distanceKm: parseFloat(form.distance_km) || 0, travelDate: form.travel_date, travelTime: form.travel_time },
        rules
    );

    const finalAmount = form.admin_override_amount ? parseFloat(form.admin_override_amount) : pricing.total;

    const saveQuote = async (status: 'draft' | 'sent') => {
        if (!form.customer_name || !form.pickup_location) { alert('Please fill required fields.'); return; }
        setSaving(true);
        const validUntil = new Date(); validUntil.setHours(validUntil.getHours() + 24);
        const { error } = await supabase.from('quotes').insert({
            customer_name: form.customer_name, customer_email: form.customer_email,
            customer_phone: form.customer_phone, pickup_location: form.pickup_location,
            dropoff_location: form.dropoff_location, distance_km: parseFloat(form.distance_km)||0,
            vehicle_type: form.vehicle_type, travel_date: form.travel_date||null,
            travel_time: form.travel_time||null, passengers_count: parseInt(form.passengers_count)||1,
            base_fare: pricing.baseFare, per_km_rate: parseFloat(form.distance_km)>0 ? pricing.perKmCost/(parseFloat(form.distance_km)||1) : 0,
            surcharge: pricing.surchargeAmount, total_amount: pricing.total,
            admin_override_amount: form.admin_override_amount ? parseFloat(form.admin_override_amount) : null,
            status, valid_until: status === 'sent' ? validUntil.toISOString() : null,
            notes: form.notes
        });
        setSaving(false);
        if (!error) router.push('/admin/quotes');
        else alert('Error saving quote: ' + error.message);
    };

    return (
        <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.75rem' }}>
                <div>
                    <h1 className="admin-page-title">New Quote</h1>
                    <p className="admin-page-sub" style={{ margin:0 }}>Generate a price quote for a customer.</p>
                </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:'1.5rem', alignItems:'start' }}>
                {/* Form */}
                <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
                    <div style={{ background:'#fff', borderRadius:14, border:'1px solid #e8edf2', padding:'1.5rem' }}>
                        <div style={{ fontWeight:700, fontSize:'0.9rem', marginBottom:'1rem', color:'#0f172a' }}>Customer Info</div>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.875rem' }}>
                            {[['customer_name','Full Name *'],['customer_email','Email'],['customer_phone','Phone *']].map(([k,label]) => (
                                <div key={k} style={{ gridColumn: k==='customer_name'?'1/-1':'auto' }}>
                                    <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#64748b', display:'block', marginBottom:4 }}>{label}</label>
                                    <input value={(form as any)[k]} onChange={e=>set(k,e.target.value)} className="admin-search-input" style={{ width:'100%', boxSizing:'border-box' }} placeholder={label.replace(' *','')} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ background:'#fff', borderRadius:14, border:'1px solid #e8edf2', padding:'1.5rem' }}>
                        <div style={{ fontWeight:700, fontSize:'0.9rem', marginBottom:'1rem', color:'#0f172a' }}>Trip Details</div>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.875rem' }}>
                            {[['pickup_location','Pickup Location *'],['dropoff_location','Dropoff Location']].map(([k,label]) => (
                                <div key={k}>
                                    <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#64748b', display:'block', marginBottom:4 }}>{label}</label>
                                    <input value={(form as any)[k]} onChange={e=>set(k,e.target.value)} className="admin-search-input" style={{ width:'100%', boxSizing:'border-box' }} placeholder={label.replace(' *','')} />
                                </div>
                            ))}
                            <div>
                                <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#64748b', display:'block', marginBottom:4 }}>Distance (km)</label>
                                <input type="number" min="0" value={form.distance_km} onChange={e=>set('distance_km',e.target.value)} className="admin-search-input" style={{ width:'100%', boxSizing:'border-box' }} />
                            </div>
                            <div>
                                <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#64748b', display:'block', marginBottom:4 }}>Vehicle Type</label>
                                <select value={form.vehicle_type} onChange={e=>set('vehicle_type',e.target.value)} className="admin-filter-select" style={{ width:'100%' }}>
                                    {VEHICLES.map(v=><option key={v} value={v}>{v}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#64748b', display:'block', marginBottom:4 }}>Travel Date</label>
                                <input type="date" value={form.travel_date} onChange={e=>set('travel_date',e.target.value)} className="admin-filter-select" style={{ width:'100%' }} />
                            </div>
                            <div>
                                <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#64748b', display:'block', marginBottom:4 }}>Travel Time</label>
                                <input type="time" value={form.travel_time} onChange={e=>set('travel_time',e.target.value)} className="admin-filter-select" style={{ width:'100%' }} />
                            </div>
                            <div>
                                <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#64748b', display:'block', marginBottom:4 }}>Passengers</label>
                                <input type="number" min="1" value={form.passengers_count} onChange={e=>set('passengers_count',e.target.value)} className="admin-search-input" style={{ width:'100%', boxSizing:'border-box' }} />
                            </div>
                        </div>
                        <div style={{ marginTop:'0.875rem' }}>
                            <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#64748b', display:'block', marginBottom:4 }}>Admin Override Price (SAR) — optional</label>
                            <input type="number" min="0" value={form.admin_override_amount} onChange={e=>set('admin_override_amount',e.target.value)} className="admin-search-input" style={{ width:'100%', boxSizing:'border-box' }} placeholder="Leave blank to use calculated price" />
                        </div>
                        <div style={{ marginTop:'0.875rem' }}>
                            <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#64748b', display:'block', marginBottom:4 }}>Notes</label>
                            <textarea value={form.notes} onChange={e=>set('notes',e.target.value)} rows={3} className="admin-search-input" style={{ width:'100%', boxSizing:'border-box', resize:'vertical', fontFamily:'inherit' }} placeholder="Internal notes or special requirements..." />
                        </div>
                    </div>

                    <div style={{ display:'flex', gap:'0.75rem' }}>
                        <button onClick={()=>saveQuote('draft')} disabled={saving} className="admin-btn-secondary">
                            <Save size={15} /> Save as Draft
                        </button>
                        <button onClick={()=>saveQuote('sent')} disabled={saving} className="admin-btn-primary">
                            <Send size={15} /> {saving ? 'Saving...' : 'Send to Customer'}
                        </button>
                    </div>
                </div>

                {/* Live Price Calculator */}
                <div style={{ background:'#0f172a', borderRadius:14, padding:'1.5rem', position:'sticky', top:'1rem' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.25rem' }}>
                        <Calculator size={18} color="#fbbf24" />
                        <span style={{ fontWeight:700, color:'#fff', fontSize:'0.95rem' }}>Live Calculator</span>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem' }}>
                        <div style={{ display:'flex', justifyContent:'space-between' }}>
                            <span style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.55)' }}>Base Fare ({form.vehicle_type})</span>
                            <span style={{ fontWeight:600, color:'#fff', fontSize:'0.85rem' }}>SAR {pricing.baseFare.toFixed(2)}</span>
                        </div>
                        <div style={{ display:'flex', justifyContent:'space-between' }}>
                            <span style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.55)' }}>Distance ({form.distance_km} km)</span>
                            <span style={{ fontWeight:600, color:'#fff', fontSize:'0.85rem' }}>SAR {pricing.perKmCost.toFixed(2)}</span>
                        </div>
                        {pricing.surchargeAmount !== 0 && (
                            <div style={{ display:'flex', justifyContent:'space-between' }}>
                                <span style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.55)' }}>Surcharges</span>
                                <span style={{ fontWeight:600, color: pricing.surchargeAmount>0?'#fbbf24':'#10b981', fontSize:'0.85rem' }}>
                                    {pricing.surchargeAmount>0?'+':''}SAR {pricing.surchargeAmount.toFixed(2)}
                                </span>
                            </div>
                        )}
                        {pricing.surchargeReasons.map(r=>(
                            <div key={r} style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.35)', paddingLeft:'0.5rem' }}>• {r}</div>
                        ))}
                        <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', marginTop:'0.5rem', paddingTop:'0.75rem' }}>
                            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                <span style={{ fontWeight:700, color:'rgba(255,255,255,0.7)' }}>Calculated</span>
                                <span style={{ fontWeight:700, color:'#fff', fontSize:'1rem' }}>{formatSAR(pricing.total)}</span>
                            </div>
                            {form.admin_override_amount && (
                                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'0.5rem', padding:'0.5rem', background:'rgba(251,191,36,0.1)', borderRadius:8 }}>
                                    <span style={{ fontWeight:700, color:'#fbbf24', fontSize:'0.85rem' }}>Override ✏️</span>
                                    <span style={{ fontWeight:800, color:'#fbbf24', fontSize:'1.1rem' }}>{formatSAR(finalAmount)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{ marginTop:'1.25rem', background:'rgba(251,191,36,0.15)', borderRadius:10, padding:'1rem', textAlign:'center' }}>
                        <div style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.5)', marginBottom:4 }}>FINAL QUOTE</div>
                        <div style={{ fontSize:'1.75rem', fontWeight:800, color:'#fbbf24' }}>{formatSAR(finalAmount)}</div>
                        <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.35)', marginTop:4 }}>Valid for 24 hours after sending</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
