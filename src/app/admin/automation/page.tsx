'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Settings2, RefreshCw, Edit3, Plus } from 'lucide-react';

export default function AutomationRulesPage() {
    const [rules, setRules] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
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
                    <button className="admin-btn-primary">
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
                                    <button className="admin-icon-btn" title="Edit Rule"><Edit3 size={15} /></button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No rules found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
