export interface ReviewItem {
  name: string;
  location: string;
  rating: number;
  service: string;
  text: string;
}

/** Compact reviews strip. Takes items as a prop — reuse anywhere, pulling from
 *  whichever existing testimonials data is relevant; never fabricate content. */
export default function ReviewsStrip({ items, title = 'What Travelers Say' }: { items: ReviewItem[]; title?: string }) {
  if (items.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="section-header centered">
          <span className="section-eyebrow">Reviews</span>
          <h2 className="section-title">{title}</h2>
        </div>
        <div className="grid-3">
          {items.map((t, i) => (
            <div key={i} className="card">
              <div style={{ display: 'flex', gap: 'var(--space-1)', marginBottom: 'var(--space-3)', color: 'var(--accent)' }}>
                {Array.from({ length: 5 }, (_, j) => (
                  <span key={j} style={{ opacity: j < t.rating ? 1 : 0.25 }}>★</span>
                ))}
              </div>
              <span style={{ display: 'inline-block', background: 'var(--accent-subtle)', color: 'var(--accent-dark)', fontWeight: 700, fontSize: 'var(--text-xs)', padding: '3px 12px', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-3)' }}>
                {t.service}
              </span>
              <p style={{ color: 'var(--text-body)', fontStyle: 'italic', lineHeight: 1.75, marginBottom: 'var(--space-4)' }}>&ldquo;{t.text}&rdquo;</p>
              <p style={{ color: 'var(--text-main)', fontWeight: 600, marginBottom: 0 }}>{t.name}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginBottom: 0 }}>{t.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
