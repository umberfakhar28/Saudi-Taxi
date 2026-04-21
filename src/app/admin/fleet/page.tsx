'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Car, Users, Check, X, Edit, Trash2 } from 'lucide-react';

const CAR_TYPES = ['Sedan', 'SUV', 'Van', 'Luxury', 'Minibus'];
const empty = { car_model: '', car_type: 'Sedan', capacity: 4, is_available: true };

export default function FleetPage() {
    const [fleet, setFleet] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({ ...empty });
    const supabase = createClient();

    const fetchFleet = useCallback(async () => {
        setLoading(true);
        const { data } = await supabase.from('fleet').select('*').order('created_at', { ascending: false });
        setFleet(data ?? []);
        setLoading(false);
    }, []);

    useEffect(() => { fetchFleet(); }, [fetchFleet]);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('fleet').insert([form]);
        if (error) { alert(error.message); return; }
        setModal(false);
        setForm({ ...empty });
        fetchFleet();
    };

    const toggleAvail = async (id: string, cur: boolean) => {
        await supabase.from('fleet').update({ is_available: !cur }).eq('id', id);
        fetchFleet();
    };

    const deleteVehicle = async (id: string) => {
        if (!confirm('Delete this vehicle?')) return;
        await supabase.from('fleet').delete().eq('id', id);
        fetchFleet();
    };

    const available = fleet.filter(v => v.is_available).length;

    return (
        <div>
            {/* Title row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                <div>
                    <h1 className="admin-page-title">Fleet Management</h1>
                    <p className="admin-page-sub" style={{ margin: 0 }}>
                        {fleet.length} vehicle{fleet.length !== 1 ? 's' : ''} registered · {available} available
                    </p>
                </div>
                <button className="admin-btn-primary" onClick={() => setModal(true)}>
                    <Plus size={16} /> Add Vehicle
                </button>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {CAR_TYPES.map(type => {
                    const count = fleet.filter(v => v.car_type === type).length;
                    return count > 0 ? (
                        <div key={type} style={{ background: '#fff', border: '1px solid #e8edf2', borderRadius: 12, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: 36, height: 36, borderRadius: 9, background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                                <Car size={18} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>{count}</div>
                                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{type}</div>
                            </div>
                        </div>
                    ) : null;
                })}
            </div>

            {/* Table */}
            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Vehicle</th>
                            <th>Type</th>
                            <th>Capacity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading fleet…</td></tr>
                        ) : fleet.length > 0 ? fleet.map(v => (
                            <tr key={v.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: 38, height: 38, borderRadius: 9, background: '#f8fafc', border: '1px solid #e8edf2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                                            <Car size={16} />
                                        </div>
                                        <div style={{ fontWeight: 700, color: '#1e293b' }}>{v.car_model}</div>
                                    </div>
                                </td>
                                <td>
                                    <span style={{ background: '#f1f5f9', color: '#475569', padding: '0.3rem 0.7rem', borderRadius: 6, fontSize: '0.78rem', fontWeight: 600 }}>
                                        {v.car_type}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
                                        <Users size={14} style={{ color: '#94a3b8' }} /> {v.capacity} seats
                                    </div>
                                </td>
                                <td>
                                    <button
                                        onClick={() => toggleAvail(v.id, v.is_available)}
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                                            padding: '0.3rem 0.8rem', borderRadius: 9999, border: 'none',
                                            fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
                                            background: v.is_available ? '#dcfce7' : '#fee2e2',
                                            color: v.is_available ? '#166534' : '#991b1b',
                                        }}
                                    >
                                        {v.is_available ? <Check size={11} /> : <X size={11} />}
                                        {v.is_available ? 'Available' : 'Unavailable'}
                                    </button>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                                        <button className="admin-icon-btn" title="Edit"><Edit size={14} /></button>
                                        <button className="admin-icon-btn danger" title="Delete" onClick={() => deleteVehicle(v.id)}><Trash2 size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
                                    No vehicles yet. Add your first one!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add modal */}
            {modal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, backdropFilter: 'blur(4px)' }}>
                    <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', maxWidth: 440, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>Add New Vehicle</h2>
                            <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.25rem' }}>✕</button>
                        </div>
                        <form onSubmit={handleAdd}>
                            <div className="form-group">
                                <label className="form-label">Car Model *</label>
                                <input type="text" className="form-input" placeholder="e.g. Toyota Camry 2024" required value={form.car_model} onChange={e => setForm({ ...form, car_model: e.target.value })} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Type *</label>
                                    <select className="form-select" value={form.car_type} onChange={e => setForm({ ...form, car_type: e.target.value })}>
                                        {CAR_TYPES.map(t => <option key={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Seats *</label>
                                    <input type="number" className="form-input" min={1} max={50} value={form.capacity} onChange={e => setForm({ ...form, capacity: parseInt(e.target.value) })} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                                <button type="button" className="admin-btn-secondary" onClick={() => setModal(false)}>Cancel</button>
                                <button type="submit" className="admin-btn-primary">Add Vehicle</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
