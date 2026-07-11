'use client';

import { useEffect, useState } from 'react';
import { PlaneIcon, UserIcon, PackageIcon, CalendarIcon, ClockIcon, MessageIcon, ShieldIcon, CheckCircleIcon } from './Icons';
import { FLEET_TIERS, type FleetTier } from '@/lib/fleetConfig';
import { AIRPORT_PRICING_ENABLED, AIRPORT_POLICIES } from '@/lib/airportTransferConfig';
import { waLink } from '@/lib/contact';

export interface BookingPrefill {
  pickupAirport?: string;
  dropoff?: string;
}

/** Dispatch this event from anywhere on the page to prefill and reveal the widget. */
export const PREFILL_EVENT = 'gts:prefill-booking';

const PICKUP_AIRPORTS = [
  { value: 'JED', label: 'Jeddah — King Abdulaziz International (JED)' },
  { value: 'MED', label: 'Madinah — Prince Mohammad Bin Abdulaziz (MED)' },
  { value: 'DMM', label: 'Dammam — King Fahd International (DMM)' },
  { value: 'RUH', label: 'Riyadh — King Khalid International (RUH)' },
];

const DROPOFF_GROUPS: { label: string; options: string[] }[] = [
  { label: 'Makkah', options: ['Makkah — Haram / Clock Tower area', 'Makkah — Aziziyah'] },
  { label: 'Madinah', options: ["Madinah — Prophet's Mosque area", 'Madinah — Other hotel'] },
  { label: 'Jeddah', options: ['Jeddah — City hotel', 'Jeddah — Corniche'] },
  { label: 'Riyadh', options: ['Riyadh — City hotel', 'Riyadh — KAFD'] },
  { label: 'Dammam / Khobar', options: ['Dammam — City hotel', 'Khobar — City hotel'] },
  { label: 'Cross-border', options: ['Bahrain — via King Fahd Causeway'] },
  { label: 'Other', options: ['Other destination (specify in WhatsApp message)'] },
];

export default function BookingWidget() {
  const [pickupAirport, setPickupAirport] = useState('JED');
  const [dropoff, setDropoff] = useState(DROPOFF_GROUPS[0].options[0]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(1);
  const [tripType, setTripType] = useState<'one-way' | 'return'>('one-way');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    function onPrefill(e: Event) {
      const detail = (e as CustomEvent<BookingPrefill>).detail;
      if (!detail) return;
      if (detail.pickupAirport) setPickupAirport(detail.pickupAirport);
      if (detail.dropoff) setDropoff(detail.dropoff);
      setShowResults(false);
    }
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const suitableVehicles = FLEET_TIERS.filter(
    (v) => v.maxPassengers >= passengers && v.maxLuggage >= luggage
  );
  const vehiclesToShow = suitableVehicles.length > 0 ? suitableVehicles : FLEET_TIERS;

  function buildMessage(vehicle: FleetTier): string {
    const lines = [
      'Assalamu Alaikum, I would like to book an airport transfer.',
      `Pickup airport: ${PICKUP_AIRPORTS.find((a) => a.value === pickupAirport)?.label ?? pickupAirport}`,
      `Destination: ${dropoff}`,
      flightNumber ? `Flight number: ${flightNumber}` : null,
      `Date: ${date || 'TBC'}${time ? ` at ${time}` : ''}`,
      tripType === 'return' ? `Return: ${returnDate || 'TBC'}${returnTime ? ` at ${returnTime}` : ''}` : 'Trip type: One-way',
      `Passengers: ${passengers}`,
      `Luggage: ${luggage} bag(s)`,
      `Vehicle: ${vehicle.name} (${vehicle.models})`,
    ].filter(Boolean);
    return lines.join('\n');
  }

  return (
    <div id="booking-widget" className="card" style={{ padding: 'var(--space-8)', maxWidth: 960, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
        <h2 style={{ margin: 0, fontSize: 'var(--text-2xl)', color: 'var(--text-main)' }}>
          <PlaneIcon size={22} style={{ display: 'inline', verticalAlign: 'middle', marginInlineEnd: 8, color: 'var(--accent)' }} />
          Check Your Airport Transfer
        </h2>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--accent-subtle)', color: 'var(--accent-dark)', fontWeight: 700, fontSize: 'var(--text-xs)', padding: '6px 14px', borderRadius: 'var(--radius-full)' }}>
          <ShieldIcon size={14} /> Free cancellation up to {AIRPORT_POLICIES.freeCancellationHours}h
        </span>
      </div>

      {/* Trip type toggle */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
        {(['one-way', 'return'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTripType(t)}
            className={tripType === t ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'}
            style={{ textTransform: 'capitalize' }}
          >
            {t === 'one-way' ? 'One-way' : 'Return'}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setShowResults(true);
        }}
      >
        <div className="grid-2" style={{ gap: 'var(--space-5)' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="bw-pickup">Pickup Airport</label>
            <select id="bw-pickup" className="form-select" value={pickupAirport} onChange={(e) => setPickupAirport(e.target.value)}>
              {PICKUP_AIRPORTS.map((a) => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="bw-dropoff">Drop-off</label>
            <select id="bw-dropoff" className="form-select" value={dropoff} onChange={(e) => setDropoff(e.target.value)}>
              {DROPOFF_GROUPS.map((g) => (
                <optgroup key={g.label} label={g.label}>
                  {g.options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        <div className="grid-2" style={{ gap: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="bw-date"><CalendarIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', marginInlineEnd: 4 }} /> Date</label>
            <input id="bw-date" type="date" className="form-input" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="bw-time"><ClockIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', marginInlineEnd: 4 }} /> Time</label>
            <input id="bw-time" type="time" className="form-input" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
        </div>

        {tripType === 'return' && (
          <div className="grid-2" style={{ gap: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="bw-return-date">Return Date</label>
              <input id="bw-return-date" type="date" className="form-input" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="bw-return-time">Return Time</label>
              <input id="bw-return-time" type="time" className="form-input" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} />
            </div>
          </div>
        )}

        <div className="grid-2" style={{ gap: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="bw-flight">Flight Number (optional)</label>
            <input id="bw-flight" type="text" className="form-input" placeholder="e.g. SV1234" value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} />
          </div>
          <div />
        </div>

        <div className="grid-2" style={{ gap: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="bw-pax"><UserIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', marginInlineEnd: 4 }} /> Passengers</label>
            <select id="bw-pax" className="form-select" value={passengers} onChange={(e) => setPassengers(Number(e.target.value))}>
              {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="bw-luggage"><PackageIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', marginInlineEnd: 4 }} /> Luggage</label>
            <select id="bw-luggage" className="form-select" value={luggage} onChange={(e) => setLuggage(Number(e.target.value))}>
              {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n} bag{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--space-8)' }}>
          Show Vehicle Options
        </button>
      </form>

      {showResults && (
        <div style={{ marginTop: 'var(--space-10)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-8)' }}>
          <h3 style={{ marginBottom: 'var(--space-5)', color: 'var(--text-main)' }}>Choose Your Vehicle</h3>
          <div className="grid-2" style={{ gap: 'var(--space-5)' }}>
            {vehiclesToShow.map((vehicle) => (
              <div key={vehicle.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <h4 style={{ margin: 0, color: 'var(--accent)' }}>{vehicle.name}</h4>
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{vehicle.models}</p>
                <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <UserIcon size={14} /> Up to {vehicle.maxPassengers}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <PackageIcon size={14} /> Up to {vehicle.maxLuggage} bags
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{vehicle.description}</p>
                <div style={{ marginTop: 'var(--space-2)' }}>
                  {AIRPORT_PRICING_ENABLED ? null /* real rates wiring pending — see CONFIG.md */ : (
                    <p style={{ fontWeight: 700, color: 'var(--accent)', marginBottom: 'var(--space-3)' }}>Get instant quote on WhatsApp</p>
                  )}
                  <a
                    href={waLink(buildMessage(vehicle))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <MessageIcon size={16} /> Book {vehicle.name} via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 'var(--space-6)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            <CheckCircleIcon size={14} style={{ color: 'var(--accent)' }} />
            {AIRPORT_POLICIES.fixedFareNote}
          </p>
        </div>
      )}
    </div>
  );
}
