"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
    end: string;
    duration?: number;
}

export default function AnimatedCounter({ end, duration = 2000 }: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    // Extract number and suffix
    const match = end.match(/(\d+\.?\d*)/);
    const numericPart = match ? parseFloat(match[0]) : 0;
    const suffix = end.replace(/(\d+\.?\d*)/, "");
    const isDecimal = end.includes(".");
    const decimals = isDecimal ? end.split(".")[1].split(/[^0-9]/)[0].length : 0;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let startTimestamp: number | null = null;
                    const step = (timestamp: number) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        const currentCount = progress * numericPart;
                        setCount(isDecimal ? currentCount : Math.floor(currentCount));
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        } else {
                            setCount(numericPart);
                        }
                    };
                    window.requestAnimationFrame(step);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, [numericPart, duration]);

    return (
        <span ref={countRef}>
            {count.toLocaleString(undefined, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            })}
            {suffix}
        </span>
    );
}
