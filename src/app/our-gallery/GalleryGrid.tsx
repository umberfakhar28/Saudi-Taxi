'use client';

import { useState } from "react";
import Image from "next/image";
import styles from "./gallery.module.css";

export interface GalleryItem {
    emoji: string;
    title: string;
    category: string;
    caption: string;
    image?: string;
    objectPosition?: string;
}

/**
 * The category buttons and the grid they filter. The page itself stays a
 * server component (metadata, schema, copy); only this part needs state.
 * Every card is rendered on the server — "All" is the initial state — so the
 * full gallery is in the HTML for crawlers and no-JS visitors.
 */
export default function GalleryGrid({ categories, items }: { categories: string[]; items: GalleryItem[] }) {
    const [active, setActive] = useState("All");
    const visible = active === "All" ? items : items.filter((item) => item.category === active);

    return (
        <>
            {/* Category Filters */}
            <div className={styles.filters} role="group" aria-label="Filter gallery by category">
                {categories.map((cat) => {
                    const isActive = cat === active;
                    const count = cat === "All" ? items.length : items.filter((item) => item.category === cat).length;
                    return (
                        <button
                            key={cat}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => setActive(cat)}
                            className={styles.filterBtn}
                            style={{
                                border: isActive ? '2px solid var(--secondary)' : '2px solid var(--gray-300)',
                                background: isActive ? 'linear-gradient(135deg, var(--secondary), var(--secondary-light))' : 'transparent',
                                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                            }}
                        >
                            {cat}
                            <span className={styles.filterCount}>{count}</span>
                        </button>
                    );
                })}
            </div>

            <p className={styles.srOnly} aria-live="polite">
                {active === "All" ? `Showing all ${visible.length} gallery items` : `Showing ${visible.length} ${active} items`}
            </p>

            {/* Gallery Grid */}
            <div className={styles.grid}>
                {visible.map((item) => (
                    <div key={`${item.category}-${item.title}`} className="hover-card gallery-card" style={{
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-md)',
                        background: 'var(--white)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}>
                        <div style={{
                            height: '200px',
                            position: 'relative',
                            overflow: 'hidden',
                            background: item.image ? 'var(--bg-subtle)' : `linear-gradient(135deg, var(--primary-dark), var(--primary))`,
                            display: item.image ? undefined : 'flex',
                            flexDirection: item.image ? undefined : 'column',
                            alignItems: item.image ? undefined : 'center',
                            justifyContent: item.image ? undefined : 'center',
                        }}>
                            {item.image ? (
                                <Image
                                    src={item.image}
                                    alt={`${item.title} — ${item.caption}`}
                                    fill
                                    style={{ objectFit: 'cover', objectPosition: item.objectPosition }}
                                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 380px"
                                />
                            ) : (
                                <>
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        backgroundImage: 'radial-gradient(var(--secondary) 1px, transparent 1px)',
                                        backgroundSize: '30px 30px', opacity: 0.06,
                                    }} />
                                    <span style={{ fontSize: '4rem', position: 'relative', zIndex: 1 }} aria-hidden="true">{item.emoji}</span>
                                </>
                            )}
                            <div style={{
                                position: 'absolute', top: '0.75rem', right: '0.75rem',
                                background: 'rgba(12, 32, 122, 0.9)', color: 'var(--primary)',
                                padding: '0.2rem 0.7rem', borderRadius: '20px',
                                fontSize: '0.75rem', fontWeight: 700, zIndex: 1,
                            }}>
                                {item.category}
                            </div>
                        </div>
                        {/* Caption */}
                        <div style={{ padding: '1rem 1.25rem' }}>
                            <h3 style={{ color: 'var(--primary)', fontSize: '1rem', marginBottom: '0.25rem' }}>{item.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>{item.caption}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
