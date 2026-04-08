import Link from "next/link";
import type { Metadata } from "next";
import { PlaneIcon, UserIcon, ClockIcon, TagIcon, ShieldIcon, MapPinIcon, ChevronRightIcon, MessageIcon } from "@/components/Icons";

export const metadata: Metadata = {
    title: "Abha International Airport Taxi Service | Asir Region | Saudi Taxi",
    description: "Reliable airport taxi services from Abha International Airport. Fixed rates, safe mountain travel, and 24/7 service across the Asir region.",
};

export default function AbhaAirportTaxi() {
    return (
        <main>
            <section className="page-hero">
                <h1>Abha Airport Taxi Service</h1>
                <p>
                    Premium transports from Abha International Airport. 
                    Safe and reliable taxi services across the beautiful Asir region.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <Link href="/airport-transfers">Airport Transfers</Link> <ChevronRightIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> <span>Abha</span>
                </div>
            </section>

            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">Discover Abha with Reliable Airport Transfers</h2>
                    <div className="grid-2">
                        <div>
                            <p style={{ lineHeight: 1.8, color: 'var(--text-body)' }}>
                                Abha, the capital of Asir Province, is known for its stunning mountain scenery and pleasant climate. Our Abha Airport taxi service helps you transition smoothly from the airport to your destination in the city or surrounding highland areas.
                            </p>
                            <div className="card" style={{ marginTop: '2rem' }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary)' }}>Asir Region Coverage</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    We provide transfers from Abha Airport to Al Souda, Khamis Mushait, and all major resorts and landmarks within the Asir region.
                                </p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <ShieldIcon size={24} style={{ color: 'var(--secondary)' }} />
                                <span style={{ fontWeight: 600 }}>Experienced Mountain Drivers</span>
                            </div>
                            <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <ClockIcon size={24} style={{ color: 'var(--secondary)' }} />
                                <span style={{ fontWeight: 600 }}>24/7 Availability</span>
                            </div>
                            <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <TagIcon size={24} style={{ color: 'var(--secondary)' }} />
                                <span style={{ fontWeight: 600 }}>Fixed, Transparent Rates</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ background: 'var(--primary-dark)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>Reserve Your Abha Airport Taxi</h2>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">Book Now</Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white' }}>
                            WhatsApp Enquiries
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
