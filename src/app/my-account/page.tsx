'use client';

import { useState } from "react";
import Link from "next/link";

export default function MyAccount() {
    const [activeTab, setActiveTab] = useState('profile');
    const [loginMode, setLoginMode] = useState(true);

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Login functionality coming soon. Please contact us via WhatsApp for assistance.');
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Registration coming soon. Please book directly via our booking form.');
    };

    return (
        <main>
            <section className="page-hero">
                <h1>My Account</h1>
                <p>Sign in to manage your bookings, access your history and update your profile.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>My Account</span>
                </div>
            </section>

            <section className="section-lg bg-light">
                <div className="container" style={{ maxWidth: '500px' }}>

                    {/* Tab Toggle */}
                    <div style={{
                        display: 'flex', background: 'var(--white)', borderRadius: 'var(--radius-md)',
                        padding: '4px', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)',
                    }}>
                        <button onClick={() => setLoginMode(true)} style={{
                            flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                            border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem',
                            fontFamily: 'var(--font-body)',
                            background: loginMode ? 'linear-gradient(135deg, var(--secondary), var(--secondary-light))' : 'transparent',
                            color: loginMode ? 'var(--primary)' : 'var(--text-muted)',
                        }}>Sign In</button>
                        <button onClick={() => setLoginMode(false)} style={{
                            flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                            border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem',
                            fontFamily: 'var(--font-body)',
                            background: !loginMode ? 'linear-gradient(135deg, var(--secondary), var(--secondary-light))' : 'transparent',
                            color: !loginMode ? 'var(--primary)' : 'var(--text-muted)',
                        }}>Register</button>
                    </div>

                    <div className="card">
                        {loginMode ? (
                            <>
                                <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Welcome Back</h2>
                                <form onSubmit={handleLogin}>
                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input type="email" className="form-input" placeholder="your@email.com"
                                            value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Password</label>
                                        <input type="password" className="form-input" placeholder="••••••••"
                                            value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>Sign In</button>
                                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                                        <a href="#" style={{ color: 'var(--secondary)', fontWeight: 600 }}>Forgot password?</a>
                                    </p>
                                </form>
                            </>
                        ) : (
                            <>
                                <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Create Account</h2>
                                <form onSubmit={handleRegister}>
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" className="form-input" placeholder="Your full name"
                                            value={registerData.name} onChange={e => setRegisterData({ ...registerData, name: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input type="email" className="form-input" placeholder="your@email.com"
                                            value={registerData.email} onChange={e => setRegisterData({ ...registerData, email: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Phone / WhatsApp</label>
                                        <input type="tel" className="form-input" placeholder="+966 50 ..."
                                            value={registerData.phone} onChange={e => setRegisterData({ ...registerData, phone: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Password</label>
                                        <input type="password" className="form-input" placeholder="Choose a strong password"
                                            value={registerData.password} onChange={e => setRegisterData({ ...registerData, password: e.target.value })} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Account</button>
                                </form>
                            </>
                        )}

                        <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'var(--gray-100)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 0.75rem' }}>
                                Prefer to book without an account?
                            </p>
                            <Link href="/book-online" className="btn btn-outline-gold btn-sm">Book Directly →</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
