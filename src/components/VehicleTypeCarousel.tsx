'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import styles from './VehicleTypeCarousel.module.css';

const vehicleTypes = [
    {
        slug: 'ford-taurus',
        image: '/vehicles/Ford_Taurus.jpeg',
        name: 'Ford Taurus',
        category: 'Standard',
        desc: 'Comfortable 3-seat sedan — ideal for solo travelers and short city transfers.',
    },
    {
        slug: 'bmw-7-series',
        image: '/vehicles/BMW_7_Series.jpeg',
        name: 'BMW 7 Series',
        category: 'Luxury',
        desc: 'Executive 3-seat sedan with a refined cabin — built for business travel in comfort.',
    },
    {
        slug: 'genesis-g90',
        image: '/vehicles/Genesis_G90.jpeg',
        name: 'Genesis G90',
        category: 'Luxury',
        desc: 'Flagship 3-seat sedan with a whisper-quiet ride — perfect for VIP airport pickups.',
    },
    {
        slug: 'mercedes-s-class',
        image: '/vehicles/Mercedes_Benz_S_Class.jpeg',
        name: 'Mercedes-Benz S-Class',
        category: 'Luxury',
        desc: 'The benchmark for luxury sedans — 3 seats of first-class comfort for special occasions.',
    },
    {
        slug: 'gmc-yukon',
        image: '/vehicles/GMC_Yukon.jpeg',
        name: 'GMC Yukon',
        category: 'SUV',
        desc: 'Spacious 6-seat SUV with ample luggage room — great for families and small groups.',
    },
    {
        slug: 'cadillac-escalade-esv',
        image: '/vehicles/Cadillac_Escalade_ESV.jpeg',
        name: 'Cadillac Escalade ESV',
        category: 'Premium SUV',
        desc: 'Extended 6-seat SUV with commanding presence — a premium ride for groups on the go.',
    },
    {
        slug: 'mercedes-v-class',
        image: '/vehicles/Mercedes_Benz_V_Class.jpeg',
        name: 'Mercedes-Benz V-Class',
        category: 'Van',
        desc: 'Premium 7-seat van blending minivan practicality with luxury-sedan comfort.',
    },
    {
        slug: 'mercedes-sprinter',
        image: '/vehicles/Mercedes_Benz_Sprinter.jpeg',
        name: 'Mercedes-Benz Sprinter',
        category: 'Van',
        desc: 'High-roof 12-seat van with generous cargo space — built for larger group transfers.',
    },
    {
        slug: 'toyota-coaster',
        image: '/vehicles/Toyota_Coaster.jpeg',
        name: 'Toyota Coaster',
        category: 'Minibus',
        desc: '22-seat minibus for full Umrah parties and large group tours — comfort at scale.',
    },
];

const VehicleTypeCarousel = () => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const updateEdges = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        setAtStart(el.scrollLeft <= 4);
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    }, []);

    useEffect(() => {
        updateEdges();
        const el = trackRef.current;
        if (!el) return;
        el.addEventListener('scroll', updateEdges, { passive: true });
        window.addEventListener('resize', updateEdges);
        return () => {
            el.removeEventListener('scroll', updateEdges);
            window.removeEventListener('resize', updateEdges);
        };
    }, [updateEdges]);

    const scrollByPage = (direction: 1 | -1) => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: 'smooth' });
    };

    return (
        <section className={styles.section}>
            <div className="container">
                <div className="section-header centered">
                    <span className="section-eyebrow">Our Fleet</span>
                    <h2 className="section-title">Book by Vehicle Type</h2>
                    <p className="section-subtitle">
                        Choose the ride that fits your journey — from a private sedan to a full-group minibus.
                    </p>
                </div>

                <div className={styles.carousel}>
                    <button
                        type="button"
                        className={styles.arrow}
                        onClick={() => scrollByPage(-1)}
                        disabled={atStart}
                        aria-label="Previous vehicles"
                    >
                        <ChevronLeftIcon size={20} />
                    </button>

                    <div className={styles.track} ref={trackRef}>
                        {vehicleTypes.map((v) => (
                            <div key={v.slug} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={v.image}
                                        alt={`${v.name} — ${v.category}`}
                                        fill
                                        className={styles.image}
                                        sizes="(max-width: 640px) 90vw, (max-width: 992px) 45vw, 25vw"
                                    />
                                    <span className={styles.badge}>{v.category}</span>
                                </div>
                                <div className={styles.content}>
                                    <h3 className={styles.name}>{v.name}</h3>
                                    <p className={styles.desc}>{v.desc}</p>
                                    <Link href={`/book-online?vehicle=${v.slug}`} className={styles.cta}>
                                        Book Now
                                        <span className={styles.ctaArrow}>→</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        className={styles.arrow}
                        onClick={() => scrollByPage(1)}
                        disabled={atEnd}
                        aria-label="Next vehicles"
                    >
                        <ChevronRightIcon size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default VehicleTypeCarousel;
