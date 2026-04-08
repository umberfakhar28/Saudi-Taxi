"use client";

const items = [
    "All quotes are fixed & final",
    "No meters, no surge pricing,",
    "No surprises. Fuel, tolls & driver service included."
];

export default function QuoteAssurance() {
    return (
        <section style={{ 
            background: 'var(--primary)', 
            padding: '1.5rem 0',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
            <div className="container">
                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap',
                    gap: '2rem', 
                    justifyContent: 'center', 
                    fontStyle: 'italic', 
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'var(--secondary)'
                }}>
                    {items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.2rem' }}>✅</span> {item}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
