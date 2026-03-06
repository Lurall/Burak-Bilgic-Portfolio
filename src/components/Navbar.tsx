"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import MusicPlayer from "./MusicPlayer";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const navLinks = [
        { label: t.nav.home, href: "#hero" },
        { label: t.nav.skills, href: "#skills" },
        { label: t.nav.projects, href: "#projects" },
        { label: t.nav.contact, href: "#contact" },
    ];

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleClick = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const toggleLanguage = () => {
        setLanguage(language === "tr" ? "en" : "tr");
    };

    return (
        <nav
            className="fixed top-0 left-0 w-full transition-all duration-400"
            style={{
                zIndex: 100,
                padding: scrolled ? "10px 0" : "16px 0",
                background: scrolled ? "rgba(30, 40, 80, 0.85)" : "transparent",
                backdropFilter: scrolled ? "blur(20px)" : "none",
                WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
                borderBottom: scrolled ? "1px solid rgba(255,255,255,0.12)" : "none",
            }}
        >
            {/* Clouds SVG */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: scrolled ? 0.4 : 0.7 }}>
                <svg viewBox="0 0 1440 80" className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none" fill="none">
                    <ellipse cx="100" cy="52" rx="120" ry="28" fill="rgba(255,255,255,0.28)" />
                    <ellipse cx="170" cy="45" rx="65" ry="22" fill="rgba(255,255,255,0.22)" />
                    <ellipse cx="55" cy="58" rx="45" ry="18" fill="rgba(255,255,255,0.18)" />

                    <ellipse cx="400" cy="50" rx="80" ry="35" fill="rgba(255,255,255,0.3)" />
                    <ellipse cx="460" cy="55" rx="100" ry="25" fill="rgba(255,255,255,0.22)" />
                    <ellipse cx="350" cy="60" rx="55" ry="20" fill="rgba(255,255,255,0.16)" />
                    <ellipse cx="430" cy="42" rx="40" ry="18" fill="rgba(255,255,255,0.2)" />

                    <ellipse cx="730" cy="55" rx="140" ry="30" fill="rgba(255,255,255,0.26)" />
                    <ellipse cx="810" cy="45" rx="70" ry="28" fill="rgba(255,255,255,0.24)" />
                    <ellipse cx="680" cy="48" rx="85" ry="22" fill="rgba(255,255,255,0.2)" />

                    <ellipse cx="1030" cy="58" rx="95" ry="24" fill="rgba(255,255,255,0.25)" />
                    <ellipse cx="1110" cy="50" rx="60" ry="30" fill="rgba(255,255,255,0.2)" />
                    <ellipse cx="1070" cy="42" rx="45" ry="16" fill="rgba(255,255,255,0.18)" />

                    <ellipse cx="1300" cy="52" rx="135" ry="26" fill="rgba(255,255,255,0.28)" />
                    <ellipse cx="1390" cy="46" rx="55" ry="24" fill="rgba(255,255,255,0.22)" />
                    <ellipse cx="1250" cy="58" rx="70" ry="20" fill="rgba(255,255,255,0.16)" />
                    <ellipse cx="1350" cy="38" rx="35" ry="14" fill="rgba(255,255,255,0.15)" />
                </svg>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between md:justify-center relative">
                {/* Mobile Open Button */}
                <button
                    className="md:hidden flex flex-col gap-[5px] bg-transparent border-none p-1 cursor-pointer absolute left-6"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Menu"
                >
                    {mobileOpen ? (
                        <FaTimes size={20} color="var(--accent)" />
                    ) : (
                        <>
                            <span className="w-6 h-[2px] rounded" style={{ background: "var(--accent)" }} />
                            <span className="w-6 h-[2px] rounded" style={{ background: "var(--accent)" }} />
                            <span className="w-6 h-[2px] rounded" style={{ background: "var(--accent)" }} />
                        </>
                    )}
                </button>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                            className="text-[0.9rem] font-semibold relative cursor-pointer py-1"
                            style={{ color: scrolled ? "#ffd700" : "#1e2850" }}
                            whileHover={{ color: "#ffd700" }}
                            transition={{ duration: 0.3 }}
                        >
                            {link.label}
                        </motion.a>
                    ))}
                </div>

                {/* Volume & Language Switcher (far right, absolute) */}
                <div className="flex items-center gap-4 absolute right-6">
                    <MusicPlayer />
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer overflow-hidden transition-transform hover:scale-110"
                        style={{ border: "2px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.2)" }}
                        aria-label="Toggle Language"
                    >
                        <span className="text-[1.2rem] leading-none mb-0.5" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}>
                            {language === "tr" ? "🇹🇷" : "🇺🇸"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div
                    className="md:hidden px-10 pb-8 pt-6 flex flex-col gap-5 mt-4"
                    style={{ background: "rgba(30, 40, 80, 0.95)", backdropFilter: "blur(30px)" }}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-[1.1rem] font-medium"
                            style={{ color: "var(--text-dim)" }}
                            onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}
