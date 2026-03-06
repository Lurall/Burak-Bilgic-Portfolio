"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from "framer-motion";

import { useTheme } from "@/context/ThemeContext";

export default function MountainScene() {
    const { scrollYProgress } = useScroll();
    const { theme } = useTheme();

    // Celestial body (Sun/Moon) moves symmetrically from left (15%) to right (85%)
    const celestialX = useTransform(scrollYProgress, [0, 0.5, 1], ["15%", "50%", "85%"]);
    // Celestial body arcs up then down symmetrically
    const celestialY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["65%", "40%", "30%", "40%", "65%"]);

    // Sun color transitions
    const sunColor1 = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["#FFD700", "#FF8C00", "#FF6347"]
    );
    const sunColor2 = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["#FFA500", "#FF6347", "#FF4500"]
    );

    // Mountains get slight blur as user scrolls
    const mountainBlur = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.36, 1.08]);
    const mountainBlurFilter = useMotionTemplate`blur(${mountainBlur}px)`;

    // Static star positions for dark mode (increased count to 80)
    const stars = Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 60}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        animationDuration: `${Math.random() * 3 + 2}s`
    }));

    return (
        <div
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 0 }}
        >
            <AnimatePresence>
                {theme === "light" && (
                    <motion.div
                        key="sun"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 z-0"
                    >
                        {/* Sun */}
                        <motion.div
                            style={{
                                position: "absolute",
                                left: celestialX,
                                top: celestialY,
                                translateX: "-50%",
                                translateY: "-50%",
                                width: 120,
                                height: 120,
                                borderRadius: "50%",
                                background: sunColor1,
                                opacity: 0.9,
                                filter: "blur(2px)",
                                zIndex: 0,
                            }}
                        />
                        {/* Sun glow */}
                        <motion.div
                            style={{
                                position: "absolute",
                                left: celestialX,
                                top: celestialY,
                                translateX: "-50%",
                                translateY: "-50%",
                                width: 250,
                                height: 250,
                                borderRadius: "50%",
                                background: sunColor2,
                                opacity: 0.2,
                                filter: "blur(40px)",
                                zIndex: 0,
                            }}
                        />
                        {/* Extra glow */}
                        <motion.div
                            style={{
                                position: "absolute",
                                left: celestialX,
                                top: celestialY,
                                translateX: "-50%",
                                translateY: "-50%",
                                width: 400,
                                height: 400,
                                borderRadius: "50%",
                                background: sunColor2,
                                opacity: 0.08,
                                filter: "blur(60px)",
                                zIndex: 0,
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {theme === "dark" && (
                    <motion.div
                        key="moon-stars"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 z-0"
                    >
                        {/* Stars */}
                        {stars.map((star) => (
                            <motion.div
                                key={star.id}
                                style={{
                                    position: "absolute",
                                    top: star.top,
                                    left: star.left,
                                    width: star.size,
                                    height: star.size,
                                    borderRadius: "50%",
                                    backgroundColor: "white",
                                    opacity: star.opacity,
                                    boxShadow: "0 0 5px rgba(255,255,255,0.8)",
                                }}
                                animate={{ opacity: [star.opacity, star.opacity * 0.2, star.opacity] }}
                                transition={{ duration: parseFloat(star.animationDuration), repeat: Infinity, ease: "easeInOut" }}
                            />
                        ))}

                        {/* Crescent Moon (Left-facing / Missing part left -> 180 deg flip) */}
                        <motion.div
                            style={{
                                position: "absolute",
                                left: celestialX,
                                top: celestialY,
                                translateX: "-50%",
                                translateY: "-50%",
                                width: 120,
                                height: 120,
                                borderRadius: "50%",
                                background: "transparent",
                                // Changing inset shadow to project from the opposite side to flip it 180 degrees
                                boxShadow: "inset 25px 0px 0px 5px rgba(255, 255, 255, 0.9)",
                                filter: "blur(1px) drop-shadow(0 0 15px rgba(255,255,255,0.4))",
                                zIndex: 0,
                                transform: "rotate(15deg)"
                            }}
                        />
                        {/* Moon glow */}
                        <motion.div
                            style={{
                                position: "absolute",
                                left: celestialX,
                                top: celestialY,
                                translateX: "-50%",
                                translateY: "-50%",
                                width: 180,
                                height: 180,
                                borderRadius: "50%",
                                background: "rgba(255, 255, 255, 0.15)",
                                filter: "blur(30px)",
                                zIndex: 0,
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mountains SVG - stays visible with slight blur on scroll */}
            <motion.div
                className="absolute bottom-0 left-0 w-full"
                style={{
                    height: "100vh",
                    filter: mountainBlurFilter,
                }}
            >
                <svg
                    viewBox="0 0 1440 900"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-0 left-0 w-full"
                    style={{ height: "100vh" }}
                    preserveAspectRatio="xMidYMax slice"
                >
                    {/* Large main mountain - peak(720,180) base(400-1040) */}
                    <path d="M400 900 L720 180 L1040 900 Z" fill="rgba(30, 40, 80, 0.7)" />
                    <path d="M720 180 L667 300 L720 270 L773 300 Z" fill="rgba(255, 255, 255, 0.55)" />
                    <path d="M720 180 L689 250 L720 230 L751 250 Z" fill="rgba(255, 255, 255, 0.8)" />

                    {/* Medium mountain (right) - peak(1130,380) base(900-1360) */}
                    <path d="M900 900 L1130 380 L1360 900 Z" fill="rgba(25, 35, 70, 0.6)" />
                    <path d="M1130 380 L1095 460 L1130 435 L1165 460 Z" fill="rgba(255, 255, 255, 0.5)" />
                    <path d="M1130 380 L1108 430 L1130 410 L1152 430 Z" fill="rgba(255, 255, 255, 0.75)" />

                    {/* Small mountain (far right) - peak(1370,520) base(1200-1540) */}
                    <path d="M1200 900 L1370 520 L1540 900 Z" fill="rgba(20, 30, 65, 0.45)" />
                    <path d="M1370 520 L1339 590 L1370 570 L1401 590 Z" fill="rgba(255, 255, 255, 0.5)" />
                    <path d="M1370 520 L1352 560 L1370 545 L1388 560 Z" fill="rgba(255, 255, 255, 0.7)" />

                    {/* Small mountain (far left) - peak(150,480) base(-50 to 350) */}
                    <path d="M-50 900 L150 480 L350 900 Z" fill="rgba(20, 30, 65, 0.35)" />
                    <path d="M150 480 L112 560 L150 535 L188 560 Z" fill="rgba(255, 255, 255, 0.45)" />
                    <path d="M150 480 L129 525 L150 508 L171 525 Z" fill="rgba(255, 255, 255, 0.65)" />

                    {/* Medium-small mountain (left) - peak(380,500) base(150-610) */}
                    <path d="M150 900 L380 500 L610 900 Z" fill="rgba(25, 35, 70, 0.5)" />
                    <path d="M380 500 L334 580 L380 555 L426 580 Z" fill="rgba(255, 255, 255, 0.5)" />
                    <path d="M380 500 L354 545 L380 528 L406 545 Z" fill="rgba(255, 255, 255, 0.7)" />

                    {/* Foreground hills */}
                    <path d="M-100 900 L200 700 L500 900 Z" fill="rgba(15, 25, 55, 0.4)" />
                    <path d="M800 900 L1100 720 L1500 900 Z" fill="rgba(15, 25, 55, 0.35)" />
                </svg>
            </motion.div>
        </div>
    );
}
