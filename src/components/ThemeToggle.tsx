"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            className="relative w-[70px] h-[34px] rounded-full p-1 cursor-pointer overflow-hidden border-2 border-white/20 shadow-inner flex items-center"
            style={{
                background: isDark
                    ? "linear-gradient(to right, #0d1b2a, #1b263b)"
                    : "linear-gradient(to right, #87ceeb, #fdb813)",
                outline: "none"
            }}
            aria-label="Toggle Theme"
        >
            {/* Background elements (Stars/Clouds) */}
            <AnimatePresence mode="wait">
                {isDark ? (
                    <motion.div
                        key="night-bg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        {/* Stars */}
                        <div className="absolute top-2 left-8 w-1 h-1 bg-white rounded-full opacity-60" />
                        <div className="absolute top-4 left-10 w-0.5 h-0.5 bg-white rounded-full opacity-40" />
                        <div className="absolute top-6 left-12 w-1 h-1 bg-white rounded-full opacity-80" />

                        {/* Moon Icon (on the right when dark) */}
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 scale-75">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.1,22c-4.8,0-9-3.3-10.1-7.9s1.4-9.3,5.8-11.2c0.4-0.1,0.7,0.1,0.8,0.4c0.1,0.3,0,0.7-0.3,0.9c-3.1,1.9-4.1,5.9-2.2,9  s5.9,4.1,9,2.2c0.3-0.2,0.6-0.1,0.8,0.1c0.2,0.2,0.3,0.6,0.1,0.8C15.1,20.4,13.6,21.7,12.1,22C12.1,22,12.1,22,12.1,22z" />
                            </svg>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="day-bg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        {/* Clouds */}
                        <div className="absolute top-2 left-6 w-5 h-2.5 bg-white/70 rounded-full blur-[1px]" />
                        <div className="absolute top-5 left-8 w-7 h-3 bg-white/50 rounded-full blur-[1px]" />

                        {/* Sun silhouette or glow on the left */}
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-100 rounded-full blur-[4px] opacity-60" />

                        {/* Mountain silhouettes (hills) */}
                        <div
                            className="absolute bottom-0 left-0 w-full h-4 bg-[#b8860b]/40"
                            style={{ clipPath: "polygon(0 100%, 0 70%, 15% 50%, 35% 85%, 55% 40%, 80% 90%, 100% 60%, 100% 100%)" }}
                        />
                        <div
                            className="absolute bottom-0 left-0 w-full h-2.5 bg-[#8b4513]/30"
                            style={{ clipPath: "polygon(0 100%, 0 85%, 25% 70%, 45% 90%, 65% 65%, 85% 95%, 100% 80%, 100% 100%)" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Knob */}
            <motion.div
                className="relative z-10 w-6 h-6 rounded-full shadow-lg flex items-center justify-center overflow-hidden"
                animate={{
                    x: isDark ? 0 : 32,
                    backgroundColor: isDark ? "#e0e0e0" : "#ffffff",
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
            >
                {/* Visual texture on the knob (craters for moon, or glow for sun) */}
                {isDark && (
                    <div className="absolute inset-0 opacity-20 bg-black/10">
                        <div className="absolute top-1 left-3 w-1.5 h-1.5 bg-black rounded-full" />
                        <div className="absolute top-3 left-1 w-1 h-1 bg-black rounded-full" />
                        <div className="absolute top-4 left-4 w-0.5 h-0.5 bg-black rounded-full" />
                    </div>
                )}
                {!isDark && (
                    <div className="absolute inset-0 bg-yellow-100 opacity-20 animate-pulse" />
                )}
            </motion.div>
        </button>
    );
}
