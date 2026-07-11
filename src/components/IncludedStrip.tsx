import { UserIcon, ClockIcon, MapPinIcon, PackageIcon } from './Icons';
import { AIRPORT_WAIT_TIMES } from '@/lib/airportTransferConfig';

const items = [
  {
    icon: <UserIcon size={28} />,
    title: 'Name-Board Meet & Greet',
    desc: 'Your driver waits at the arrivals exit holding a name board — easy to spot, even for first-time visitors.',
  },
  {
    icon: <ClockIcon size={28} />,
    title: 'Real-Time Flight Tracking',
    desc: 'We track your flight status and automatically adjust your pickup time if it’s early or delayed — at no extra cost.',
  },
  {
    icon: <ClockIcon size={28} />,
    title: `${AIRPORT_WAIT_TIMES.airportFreeWaitMinutes}-Minute Free Wait`,
    desc: `${AIRPORT_WAIT_TIMES.airportFreeWaitMinutes} minutes free waiting time after landing (${AIRPORT_WAIT_TIMES.nonAirportFreeWaitMinutes} minutes for non-airport pickups), so you're never rushed through immigration and baggage claim.`,
  },
  {
    icon: <MapPinIcon size={28} />,
    title: 'Door-to-Door Service',
    desc: 'Straight from arrivals to your hotel lobby — no shuttles, no walking with heavy luggage, no searching for transport.',
  },
  {
    icon: <PackageIcon size={28} />,
    title: 'Luggage Help Included',
    desc: 'Your driver helps load and unload your bags, included in every booking at no extra charge.',
  },
];

export default function IncludedStrip() {
  return (
    <section className="section-lg bg-light">
      <div className="container">
        <div className="section-header centered">
          <span className="section-eyebrow">Every Booking Includes</span>
          <h2 className="section-title">What&apos;s Included With Every Airport Pickup</h2>
        </div>
        <div className="grid-3">
          {items.map((item, i) => (
            <div key={i} className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
              <div style={{ color: 'var(--accent)', marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
              <h3 style={{ color: 'var(--primary)', fontSize: '1.15rem', marginBottom: '0.75rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
