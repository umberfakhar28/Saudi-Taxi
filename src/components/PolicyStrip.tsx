import { ShieldIcon, CheckCircleIcon, TagIcon } from './Icons';
import { AIRPORT_POLICIES } from '@/lib/airportTransferConfig';

const items = [
  { icon: <ShieldIcon size={20} />, text: `Free cancellation up to ${AIRPORT_POLICIES.freeCancellationHours}h before pickup via WhatsApp` },
  { icon: <CheckCircleIcon size={20} />, text: AIRPORT_POLICIES.freeChangesNote },
  { icon: <TagIcon size={20} />, text: AIRPORT_POLICIES.fixedFareNote },
];

export default function PolicyStrip() {
  return (
    <section style={{ background: 'linear-gradient(135deg, var(--accent-dark), var(--accent))', padding: '1.75rem 0' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', justifyContent: 'center', alignItems: 'center' }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--accent-on-light)', fontWeight: 600, fontSize: 'var(--text-sm)', maxWidth: 340 }}>
              {item.icon}
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
