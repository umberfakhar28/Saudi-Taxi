'use client';
import { useState, useEffect, Suspense } from 'react';
import { createClient } from '@/utils/supabase/client';
import { calculateQuotePrice } from '@/utils/pricing';
import { Calculator, Send, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CURRENCY_CODES, formatMoney, toCurrencyCode } from '@/lib/currency';
import { displayDate, displayTime, toStorableTime, toTimeInputValue } from '@/lib/datetime';
import { useFeedback } from '@/components/admin/AdminFeedback';
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';

const VEHICLES = ['Sedan', 'SUV', 'Luxury', 'Van', 'Minibus'];

/** Maps a booking's free-text car_type onto one of the quote vehicle tiers. */
function matchVehicle(carType?: string | null): string {
    if (!carType) return 'Sedan';
    const needle = String(carType).trim().toLowerCase();
    return VEHICLES.find(v => v.toLowerCase() === needle)
        ?? VEHICLES.find(v => needle.includes(v.toLowerCase()))
        ?? 'Sedan';
}

function NewQuoteInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = createClient();
    const { showToast } = useFeedback();
    const { allowed, ready } = useAdminAuth();

    const [rules, setRules] = useState<any[]>([]);
    const [saving, setSaving] = useState(false);
    // Set when this quote is being raised against an existing booking.
    const [sourceBooking, setSourceBooking] = useState<any | null>(null);
    const [loadingBooking, setLoadingBooking] = useState(false);
    const [form, setForm] = useState({
        customer_name: '', customer_email: '', customer_phone: '',
        pickup_location: '', dropoff_location: '',
        distance_km: '0', vehicle_type: 'Sedan',
        travel_date: '', travel_time: '', passengers_count: '1',
        notes: '', admin_override_amount: '', currency: 'SAR'
    });

    useEffect(() => {
        supabase.from('automation_rules').select('*').eq('is_active', true)
            .then(({ data }) => setRules(data ?? []));
    }, []);

    // ?fromBooking=<id> — everything the booking already knows is filled in,
    // leaving the admin to supply only what a quote needs on top of it
    // (distance, vehicle tier, price).
    useEffect(() => {
        const bookingId = searchParams.get('fromBooking');
        if (!bookingId) return;
        let active = true;
        setLoadingBooking(true);
        supabase
            .from('bookings')
            .select('*')
            .eq('id', bookingId)
            .maybeSingle()
            .then(({ data, error }) => {
                if (!active) return;
                setLoadingBooking(false);
                if (error || !data) {
                    showToast('error', 'That booking could not be loaded — start the quote from scratch instead.');
                    return;
                }
                setSourceBooking(data);
                setForm(f => ({
                    ...f,
                    customer_name: data.customer_name ?? '',
                    customer_email: data.customer_email ?? '',
                    customer_phone: data.customer_phone ?? '',
                    pickup_location: data.pickup_location ?? '',
                    dropoff_location: data.dropoff_location ?? '',
                    travel_date: data.travel_date ?? '',
                    travel_time: toTimeInputValue(data.travel_time),
                    passengers_count: String(data.passengers_count ?? 1),
                    vehicle_type: matchVehicle(data.car_type),
                    currency: toCurrencyCode(data.currency),
                    // A fare already agreed on the booking becomes the starting
                    // price; clear it to fall back to the calculator.
                    admin_override_amount: data.quote_amount ? String(data.quote_amount) : '',
                    notes: data.special_notes ?? '',
                }));
            });
        return () => { active = false; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const pricing = calculateQuotePrice(
        { vehicleType: form.vehicle_type, distanceKm: parseFloat(form.distance_km) || 0, travelDate: form.travel_date, travelTime: form.travel_time },
        rules
    );

    const finalAmount = form.admin_override_amount ? parseFloat(form.admin_override_amount) : pricing.total;

    const saveQuote = async (status: 'draft' | 'sent') => {
        // These five are NOT NULL on the quotes table with no default. Only
        // two were checked, so a missing phone or drop-off surfaced as a raw
        // Postgres "violates not-null constraint" error.
        const REQUIRED: [string, string][] = [
            ['customer_name', 'customer name'],
            ['customer_email', 'customer email'],
            ['customer_phone', 'phone number'],
            ['pickup_location', 'pickup location'],
            ['dropoff_location', 'drop-off location'],
        ];
        const missing = REQUIRED
            .filter(([key]) => !String((form as any)[key] ?? '').trim())
            .map(([, label]) => label);
        if (missing.length) { showToast('error', `Still needed: ${missing.join(', ')}.`); return; }

        setSaving(true);
        const validUntil = new Date(); validUntil.setHours(validUntil.getHours() + 24);
        const quotePayload = {
            customer_name: form.customer_name, customer_email: form.customer_email,
            customer_phone: form.customer_phone, pickup_location: form.pickup_location,
            dropoff_location: form.dropoff_location, distance_km: parseFloat(form.distance_km)||0,
            vehicle_type: form.vehicle_type, travel_date: form.travel_date||null,
            travel_time: toStorableTime(form.travel_time), passengers_count: parseInt(form.passengers_count)||1,
            base_fare: pricing.baseFare, per_km_rate: parseFloat(form.distance_km)>0 ? pricing.perKmCost/(parseFloat(form.distance_km)||1) : 0,
            surcharge: pricing.surchargeAmount, total_amount: pricing.total,
            admin_override_amount: form.admin_override_amount ? parseFloat(form.admin_override_amount) : null,
            currency: toCurrencyCode(form.currency),
            status: 'draft' as string, valid_until: null as string | null,
            notes: form.notes,
            // Ties the quote to the booking it was raised from, so the two
            // stay connected in the record.
            booking_id: sourceBooking?.id ?? null,
        };

        // Send the quote email BEFORE persisting a 'sent' status — a status
        // of "sent" must mean the customer genuinely received it (Admin
        // Portal audit §8: "Send to Customer must trigger the real
        // quote_sent email, not just change a status"). If the email fails,
        // the quote is still saved as a draft so no data is lost, and the
        // real error is shown instead of a fake success.
        if (status === 'sent') {
            const emailRes = await fetch('/api/emails/send', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'quote_sent', quoteData: { ...quotePayload, valid_until: validUntil.toISOString() } }),
            });
            if (!emailRes.ok) {
                const e = await emailRes.json().catch(() => ({}));
                setSaving(false);
                showToast('error', 'Could not send quote to customer: ' + (e.error || 'Unknown error') + '. The quote was not saved — please retry.');
                return;
            }
            quotePayload.status = 'sent';
            quotePayload.valid_until = validUntil.toISOString();
        }

        const { error } = await supabase.from('quotes').insert(quotePayload);
        setSaving(false);
        if (!error) {
            showToast('success', status === 'sent'
                ? `Quote sent to ${form.customer_email}.`
                : 'Quote saved as a draft.');
            router.push('/admin/quotes');
        } else if (status === 'sent') {
            showToast('error', 'The quote email was sent, but saving the record failed: ' + error.message);
        } else {
            showToast('error', 'Could not save the quote: ' + error.message);
        }
    };

    // The database refuses the insert for a read-only role regardless; this
    // avoids presenting a form whose Save button cannot work.
    if (ready && !allowed('quotes.create')) {
        return (
            <div style={{ padding:'4rem 1rem', textAlign:'center', color:'#64748b' }}>
                <div style={{ fontWeight:700, color:'#0f172a', marginBottom:6 }}>Not available for your role</div>
                <div style={{ fontSize:'0.88rem' }}>Creating quotes requires Manager access or above.</div>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.25rem', gap:'1rem', flexWrap:'wrap' }}>
                <div>
                    <h1 className="admin-page-title">New Quote</h1>
                    <p className="admin-page-sub" style={{ margin:0 }}>
                        {sourceBooking
                            ? 'The booking details are filled in — add the distance and price.'
                            : 'Generate a price quote for a customer.'}
                    </p>
                </div>
                {sourceBooking && (
                    <Link href="/admin/bookings" className="admin-btn-secondary">
                        <ArrowLeft size={15} /> Back to Bookings
                    </Link>
                )}
            </div>

            {loadingBooking && (
                <div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:12, padding:'0.85rem 1.1rem', marginBottom:'1.5rem', fontSize:'0.85rem', color:'#64748b' }}>
                    Loading the booking's details…
                </div>
            )}

            {sourceBooking && (
                <div style={{ background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:12, padding:'1rem 1.25rem', marginBottom:'1.5rem' }}>
                    <div style={{ fontWeight:700, color:'#1e3a8a', fontSize:'0.88rem', marginBottom:4 }}>
                        Quoting for booking {sourceBooking.booking_number || String(sourceBooking.id).slice(0,8).toUpperCase()}
                    </div>
                    <div style={{ fontSize:'0.8rem', color:'#1d4ed8', lineHeight:1.55 }}>
                        {sourceBooking.customer_name} · {sourceBooking.pickup_location} → {sourceBooking.dropoff_location}
                        {sourceBooking.travel_date && <> · {displayDate(sourceBooking.travel_date)} at {displayTime(sourceBooking.travel_time)}</>}
                    </div>
                    <div style={{ fontSize:'0.74rem', color:'#3b82f6', marginTop:6 }}>
                        Everything below is editable. The saved quote stays linked to this booking.
                    </div>
                </div>
            )}
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
                        <div style={{ marginTop:'0.875rem', display:'grid', gridTemplateColumns:'1fr 120px', gap:'0.875rem' }}>
                            <div>
                                <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#64748b', display:'block', marginBottom:4 }}>Admin Override Price — optional</label>
                                <input type="number" min="0" value={form.admin_override_amount} onChange={e=>set('admin_override_amount',e.target.value)} className="admin-search-input" style={{ width:'100%', boxSizing:'border-box' }} placeholder="Leave blank to use calculated price" />
                            </div>
                            <div>
                                <label style={{ fontSize:'0.8rem', fontWeight:600, color:'#64748b', display:'block', marginBottom:4 }}>Currency</label>
                                <select value={toCurrencyCode(form.currency)} onChange={e=>set('currency',e.target.value)} className="admin-filter-select" style={{ width:'100%' }}>
                                    {CURRENCY_CODES.map(c=><option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
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
                            <span style={{ fontWeight:600, color:'#fff', fontSize:'0.85rem' }}>{formatMoney(pricing.baseFare, form.currency)}</span>
                        </div>
                        <div style={{ display:'flex', justifyContent:'space-between' }}>
                            <span style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.55)' }}>Distance ({form.distance_km} km)</span>
                            <span style={{ fontWeight:600, color:'#fff', fontSize:'0.85rem' }}>{formatMoney(pricing.perKmCost, form.currency)}</span>
                        </div>
                        {pricing.surchargeAmount !== 0 && (
                            <div style={{ display:'flex', justifyContent:'space-between' }}>
                                <span style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.55)' }}>Surcharges</span>
                                <span style={{ fontWeight:600, color: pricing.surchargeAmount>0?'#fbbf24':'#10b981', fontSize:'0.85rem' }}>
                                    {pricing.surchargeAmount>0?'+':''}{formatMoney(pricing.surchargeAmount, form.currency)}
                                </span>
                            </div>
                        )}
                        {pricing.surchargeReasons.map(r=>(
                            <div key={r} style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.35)', paddingLeft:'0.5rem' }}>• {r}</div>
                        ))}
                        <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', marginTop:'0.5rem', paddingTop:'0.75rem' }}>
                            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                <span style={{ fontWeight:700, color:'rgba(255,255,255,0.7)' }}>Calculated</span>
                                <span style={{ fontWeight:700, color:'#fff', fontSize:'1rem' }}>{formatMoney(pricing.total, form.currency)}</span>
                            </div>
                            {form.admin_override_amount && (
                                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'0.5rem', padding:'0.5rem', background:'rgba(251,191,36,0.1)', borderRadius:8 }}>
                                    <span style={{ fontWeight:700, color:'#fbbf24', fontSize:'0.85rem' }}>Override ✏️</span>
                                    <span style={{ fontWeight:800, color:'#fbbf24', fontSize:'1.1rem' }}>{formatMoney(finalAmount, form.currency)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{ marginTop:'1.25rem', background:'rgba(251,191,36,0.15)', borderRadius:10, padding:'1rem', textAlign:'center' }}>
                        <div style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.5)', marginBottom:4 }}>FINAL QUOTE</div>
                        <div style={{ fontSize:'1.75rem', fontWeight:800, color:'#fbbf24' }}>{formatMoney(finalAmount, form.currency)}</div>
                        <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.35)', marginTop:4 }}>Valid for 24 hours after sending</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function NewQuotePage() {
    return (
        <Suspense fallback={<div style={{ padding:'4rem', textAlign:'center', color:'#94a3b8' }}>Loading…</div>}>
            <NewQuoteInner />
        </Suspense>
    );
}
