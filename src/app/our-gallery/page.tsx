import Link from "next/link";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
    title: "Our Gallery | Gulf Trip Service - Photos of Fleet & Holy Sites",
    description: "Browse our gallery featuring our fleet of vehicles, the Holy sites of Makkah and Madinah, and our satisfied customers from around the world.",
    path: "/our-gallery",
    keywords: ["taxi fleet gallery", "Makkah gallery", "Madinah gallery Saudi Arabia", "Saudi taxi photos"],
});

const categories = ["All", "Fleet", "Makkah", "Madinah", "Jeddah", "AlUla", "Taif"];

const galleryItems: { emoji: string; title: string; category: string; caption: string; image?: string; objectPosition?: string }[] = [
    { emoji: "🕌", title: "Masjid Al-Haram", category: "Makkah", caption: "The Grand Mosque and Holy Kaaba" },
    { emoji: "🚗", title: "Mercedes E-Class", category: "Fleet", caption: "Our premium business class sedan", image: "/images/fleet-sedan2.jpg", objectPosition: "20% center" },
    { emoji: "🌙", title: "Prophet's Mosque", category: "Madinah", caption: "Masjid Al-Nabawi at dawn" },
    { emoji: "🚐", title: "Toyota Hiace", category: "Fleet", caption: "Our 12-seater group minivan", image: "/images/fleet-van.jpg", objectPosition: "center top" },
    { emoji: "🏔️", title: "Jabal Al-Nour", category: "Makkah", caption: "Cave of Hira where revelation began" },
    { emoji: "🌅", title: "Jeddah Corniche", category: "Jeddah", caption: "The beautiful Red Sea waterfront", image: "/images/city-jeddah.jpg", objectPosition: "center center" },
    { emoji: "🚙", title: "Toyota Land Cruiser", category: "Fleet", caption: "Our luxury 7-seater SUV", image: "/images/fleet-suv.jpg", objectPosition: "center top" },
    { emoji: "🌿", title: "Jannat Al-Baqi", category: "Madinah", caption: "The sacred cemetery of Madinah" },
    { emoji: "🏜️", title: "Elephant Rock AlUla", category: "AlUla", caption: "The iconic natural rock formation" },
    { emoji: "🌹", title: "Taif Rose Farm", category: "Taif", caption: "The famous rose gardens of Taif" },
    { emoji: "🕌", title: "Masjid Quba", category: "Madinah", caption: "The first mosque built in Islam" },
    { emoji: "🚗", title: "Toyota Camry", category: "Fleet", caption: "Our comfortable economy sedan", image: "/images/fleet-sedan.jpg", objectPosition: "center top" },
    { emoji: "⛰️", title: "Mount Uhud", category: "Madinah", caption: "Historic site of the Battle of Uhud" },
    { emoji: "🌊", title: "Jeddah Floating Mosque", category: "Jeddah", caption: "Al-Rahma Mosque on the Red Sea" },
    { emoji: "🏰", title: "Al-Balad Old Town", category: "Jeddah", caption: "UNESCO World Heritage Old Town of Jeddah" },
    { emoji: "🌄", title: "Hegra (Madain Saleh)", category: "AlUla", caption: "Ancient Nabataean tombs of Hegra" },
    { emoji: "🚐", title: "GMC Savana", category: "Fleet", caption: "Our executive 8-seater passenger van", image: "/images/chauffeur.jpg", objectPosition: "center 30%" },
    { emoji: "🏔️", title: "Al-Shafa, Taif", category: "Taif", caption: "Cool mountains of Al-Shafa above Makkah" },
    { emoji: "🌃", title: "Makkah Skyline", category: "Makkah", caption: "Makkah Clock Tower and Holy Mosque at night" },
];

export default function OurGallery() {
    return (
        <main>
            <section className="page-hero">
                <h1>Our Gallery</h1>
                <p>Explore our fleet of vehicles and discover the breathtaking destinations we serve across Saudi Arabia.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Our Gallery</span>
                </div>
            </section>

            <section className="section-lg">
                <div className="container">

                    {/* Category Filters */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                        {categories.map((cat, i) => (
                            <button key={i} style={{
                                padding: '0.6rem 1.5rem', borderRadius: '30px',
                                border: i === 0 ? '2px solid var(--secondary)' : '2px solid var(--gray-300)',
                                background: i === 0 ? 'linear-gradient(135deg, var(--secondary), var(--secondary-light))' : 'transparent',
                                color: i === 0 ? 'var(--primary)' : 'var(--text-muted)',
                                fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem',
                                transition: 'all 0.2s',
                                fontFamily: 'var(--font-body)',
                            }}>
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1.5rem',
                    }}>
                        {galleryItems.map((item, i) => (
                            <div key={i} className="hover-card gallery-card" style={{
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-md)',
                                background: 'var(--white)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'pointer',
                            }}>
                                <div style={{
                                    height: '200px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    background: item.image ? undefined : `linear-gradient(135deg, var(--primary-dark), var(--primary))`,
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
                                            sizes="(max-width: 768px) 100vw, 300px"
                                        />
                                    ) : (
                                        <>
                                            <div style={{
                                                position: 'absolute', inset: 0,
                                                backgroundImage: 'radial-gradient(var(--secondary) 1px, transparent 1px)',
                                                backgroundSize: '30px 30px', opacity: 0.06,
                                            }} />
                                            <span style={{ fontSize: '4rem', position: 'relative', zIndex: 1 }}>{item.emoji}</span>
                                        </>
                                    )}
                                    <div style={{
                                        position: 'absolute', top: '0.75rem', right: '0.75rem',
                                        background: 'rgba(36, 84, 232, 0.9)', color: 'var(--primary)',
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

                    {/* WhatsApp Gallery */}
                    <div style={{
                        marginTop: '4rem', textAlign: 'center',
                        padding: '2.5rem', background: 'var(--gray-100)',
                        borderRadius: 'var(--radius-lg)',
                    }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>Want to See More?</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            We share photos and videos of our fleet and tours on WhatsApp. Message us to get the full gallery!
                        </p>
                        <a href="https://wa.me/966501234567" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            💬 Message Us on WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)', padding: '4rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>Ready to Experience Saudi Arabia?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '500px', margin: '0 auto 2rem', fontSize: '1.05rem' }}>
                        Book your ride and explore the beauty and spirituality of Saudi Arabia with us.
                    </p>
                    <Link href="/book-online" className="btn btn-primary btn-lg">Book Now</Link>
                </div>
            </section>
        </main>
    );
}
