"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
    id: number;
    angle: number;
    distance: number;
    size: number;
    duration: number;
}

let particleId = 0;

export default function ParticleBurst({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const [particles, setParticles] = useState<Particle[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleHover = useCallback(() => {
        const newParticles: Particle[] = [];
        const count = 10;
        for (let i = 0; i < count; i++) {
            newParticles.push({
                id: ++particleId,
                angle: (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6,
                distance: 25 + Math.random() * 35,
                size: 4 + Math.random() * 5,
                duration: 0.5 + Math.random() * 0.4,
            });
        }
        setParticles(newParticles);
        setTimeout(() => setParticles([]), 1000);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            onMouseEnter={handleHover}
            style={{ overflow: "visible" }}
        >
            {children}
            <AnimatePresence>
                {particles.map((p) => {
                    const endX = Math.cos(p.angle) * p.distance;
                    const endY = Math.sin(p.angle) * p.distance - 10;
                    return (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            animate={{ opacity: 0, scale: 0.3, x: endX, y: endY }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: p.duration, ease: "easeOut" }}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                width: p.size,
                                height: p.size,
                                marginLeft: -p.size / 2,
                                marginTop: -p.size / 2,
                                pointerEvents: "none",
                                zIndex: 9999,
                            }}
                        >
                            <svg width={p.size} height={p.size} viewBox="0 0 10 10">
                                <circle cx="5" cy="5" r="4.5" fill="rgba(255,255,255,0.8)" />
                                <circle cx="5" cy="5" r="2" fill="rgba(255,215,0,0.6)" />
                            </svg>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
