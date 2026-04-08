"use client";

import { useState, useEffect } from "react";

const parts = [
    "✅ 01. All quotes are fixed & final",
    "02. no meters, no surge pricing,",
    "03. no surprises. Fuel, tolls & driver service included."
];

export default function QuoteAssurance() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % parts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section style={{ 
            background: 'var(--primary)', 
            padding: '1.25rem 0',
            overflow: 'hidden',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
            <div className="container text-center">
                <div style={{ 
                    fontStyle: 'italic', 
                    fontSize: '1.1rem', 
                    fontWeight: 500,
                    color: 'var(--secondary)',
                    minHeight: '1.5rem',
                    transition: 'all 0.5s ease-in-out',
                    animation: 'fadeIn 0.5s ease-out'
                }} key={index}>
                    {parts[index]}
                </div>
            </div>
        </section>
    );
}
