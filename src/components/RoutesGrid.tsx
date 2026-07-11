'use client';

import Link from 'next/link';
import { ClockIcon, MapPinIcon, CarIcon } from './Icons';
import { AIRPORT_PRICING_ENABLED } from '@/lib/airportTransferConfig';
import { FLEET_TIERS } from '@/lib/fleetConfig';
import { PREFILL_EVENT, type BookingPrefill } from './BookingWidget';
import type { AirportRoute } from '@/lib/airportRoutesData';

export default function RoutesGrid({ routes }: { routes: AirportRoute[] }) {
  function checkRates(route: AirportRoute) {
    const detail: BookingPrefill = { pickupAirport: route.airportCode, dropoff: route.to };
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail }));
    document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="grid-3">
      {routes.map((route) => (
        <div key={route.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <div>
            <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{route.from}</p>
            <h3 style={{ margin: '4px 0 0', fontSize: 'var(--text-lg)', color: 'var(--text-main)' }}>→ {route.to}</h3>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <ClockIcon size={14} /> {route.time}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <MapPinIcon size={14} /> {route.distance}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            <CarIcon size={14} />
            {route.vehicles.map((id) => FLEET_TIERS.find((v) => v.id === id)?.name).filter(Boolean).join(' · ')}
          </div>
          {AIRPORT_PRICING_ENABLED ? null : (
            <p style={{ margin: 0, fontWeight: 700, color: 'var(--accent)', fontSize: 'var(--text-sm)' }}>Get instant quote on WhatsApp</p>
          )}
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-2)', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => checkRates(route)} className="btn btn-primary btn-sm">
              Check Rates
            </button>
            {route.href && (
              <Link href={route.href} className="btn btn-outline-gold btn-sm">
                Route Details
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
