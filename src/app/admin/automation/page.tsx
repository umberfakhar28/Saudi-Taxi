'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { RefreshCw, Edit3, Plus } from 'lucide-react';

const RULE_TYPES = ['base_fare', 'distance_slab', 'weekend_surcharge', 'night_charge', 'vehicle_surcharge'];
const emptyForm = { name: '', rule_type: 'base_fare', value: '0', value_type: 'fixed', description: '', sort_order: '0', conditions: '{}' };

export default function AutomationRulesPage() {
    const [rules, setRules] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [form, setForm] = useState({ ...emptyForm });
    const supabase = createClient();

    const fetchRules = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('automation_rules')
            .select('*')
            .order('sort_order', { ascending: true });
        if (!error) setRules(data ?? []);
        setLoading(false);
    }, []);

    useEffect(() => { fetchRules(); }, [fetchRules]);

    const toggleRule = async (id: string, currentStatus: boolean) => {
        await supabase.from('automation_rules').update({ is_active: !currentStatus }).eq('id', id);
        fetchRules();
    };

    const openAdd = () => { setEditingId(null); setFormError(null); setForm({ ...emptyForm }); setModal(true); };
    const openEdit = (rule: any) => {
        setEditingId(rule.id);
        setFormError(null);
        setForm({
            name: rule.name, rule_type: rule.rule_type, value: String(rule.value),
            value_type: rule.value_type, description: rule.description || '',
            sort_order: String(rule.sort_order ?? 0), conditions: JSON.stringify(rule.conditions ?? {}, null, 2),
        });
        setModal(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        let conditions: unknown;
        try {
            conditions = JSON.parse(form.conditions || '{}');
        } catch {
            setFormError('Conditions must be valid JSON, e.g. {"vehicle_type": "Sedan"}');
            return;
        }
        if (!form.name.trim()) { setFormError('Rule name is required.'); return; }
        const valueNum = parseFloat(form.value);
        if (Number.isNaN(valueNum)) { setFormError('Value must be a number.'); return; }

        setSaving(true);
        const payload = {
            name: form.name.trim(), rule_type: form.rule_type, value: valueNum,
            value_type: form.value_type, description: form.description.trim() || null,
            sort_order: parseInt(form.sort_order) || 0, conditions,
        };
        const { error } = editingId
            ? await supabase.from('automation_rules').update(payload).eq('id', editingId)
            : await supabase.from('automation_rules').insert([payload]);
        setSaving(false);
        if (error) { setFormError(error.message); return; }
        setModal(false);
        setEditingId(null);
        setForm({ ...emptyForm });
        fetchRules();
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                <div>
                    <h1 className="admin-page-title">Automation Rules</h1>
                    <p className="admin-page-sub" style={{ margin: 0 }}>Configure dynamic pricing logic and overrides.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={fetchRules} className="admin-btn-secondary">
                        <RefreshCw size={15} /> Refresh
                    </button>
                    <button className="admin-btn-primary" onClick={openAdd}>
                        <Plus size={15} /> Add Rule
                    </button>
                </div>
            </div>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Rule Name</th>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>Loading rules...</td></tr>
                        ) : rules.length > 0 ? rules.map(rule => (
                            <tr key={rule.id}>
                                <td>
                                    <div style={{ fontWeight: 600, color: '#1e293b' }}>{rule.name}</div>
                                </td>
                                <td>
                                    <div style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#f1f5f9', borderRadius: 6, display: 'inline-block' }}>
                                        {rule.rule_type.replace('_', ' ')}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: rule.value > 0 ? '#10b981' : (rule.value < 0 ? '#ef4444' : '#1e293b') }}>
                                        {rule.value > 0 && '+'}{rule.value}{rule.value_type === 'percentage' ? '%' : ' SAR'}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{rule.description}</div>
                                </td>
                                <td>
                                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={rule.is_active}
                                            onChange={() => toggleRule(rule.id, rule.is_active)}
                                            style={{ marginRight: 8, cursor: 'pointer', width: 16, height: 16, accentColor: '#fbbf24' }}
                                        />
                                        <span style={{ fontSize: '0.85rem', color: rule.is_active ? '#10b981' : '#94a3b8', fontWeight: 600 }}>
                                            {rule.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </label>
                                </td>
                                <td>
                                    <button className="admin-icon-btn" title="Edit Rule" onClick={() => openEdit(rule)}><Edit3 size={15} /></button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No rules found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {modal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, backdropFilter: 'blur(4px)', padding: '1rem' }}>
                    <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', maxWidth: 520, width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>{editingId ? 'Edit Rule' : 'Add New Rule'}</h2>
                            <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.25rem' }}>✕</button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="form-group">
                                <label className="form-label">Rule Name *</label>
                                <input type="text" className="form-input" placeholder="e.g. Sedan Base Rate" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Rule Type *</label>
                                    <select className="form-select" value={form.rule_type} onChange={e => setForm({ ...form, rule_type: e.target.value })}>
                                        {RULE_TYPES.map(t => <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Value Type *</label>
                                    <select className="form-select" value={form.value_type} onChange={e => setForm({ ...form, value_type: e.target.value })}>
                                        <option value="fixed">Fixed (SAR)</option>
                                        <option value="percentage">Percentage (%)</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Value *</label>
                                    <input type="number" step="0.01" className="form-input" required value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Sort Order</label>
                                    <input type="number" className="form-input" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <input type="text" className="form-input" placeholder="Shown to admins in the rules table" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Conditions (JSON) *</label>
                                <textarea
                                    className="form-input"
                                    rows={4}
                                    style={{ fontFamily: 'monospace', fontSize: '0.8rem', resize: 'vertical' }}
                                    value={form.conditions}
                                    onChange={e => setForm({ ...form, conditions: e.target.value })}
                                />
                                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 4 }}>
                                    Examples: base_fare → {'{"vehicle_type":"Sedan"}'} · distance_slab (per-km) → {'{"per_km":true,"vehicle_type":"Sedan"}'} · weekend_surcharge → {'{"days":[5,6]}'} · night_charge → {'{"start_hour":22,"end_hour":6}'}
                                </div>
                            </div>
                            {formError && (
                                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '0.6rem 0.8rem', borderRadius: 8, fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                                    {formError}
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                                <button type="button" className="admin-btn-secondary" onClick={() => setModal(false)}>Cancel</button>
                                <button type="submit" className="admin-btn-primary" disabled={saving}>{saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Rule'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
