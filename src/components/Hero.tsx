"use client";

import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import ParticleBurst from "./ParticleBurst";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section
            id="hero"
            className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 md:px-6"
        >
            <div className="relative z-[2] text-center" style={{ animation: "fadeInUp 1s ease-out" }}>
                <p
                    className="text-[0.9rem] md:text-[1.1rem] font-medium uppercase tracking-[2px] md:tracking-[3px] mb-4"
                    style={{
                        fontFamily: "var(--font-primary)",
                        color: "var(--accent)",
                        animation: "fadeIn 0.8s ease-out 0.2s both",
                    }}
                >
                    {t.hero.greeting}
                </p>

                <h1
                    className="font-[900] leading-[1.1] mb-3"
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                        color: "var(--text)",
                        animation: "fadeInUp 1s ease-out 0.3s both",
                    }}
                >
                    Burak Bilgiç
                </h1>

                <p
                    className="text-[1.2rem] md:text-[1.6rem] font-bold uppercase tracking-[2px] md:tracking-[4px] mb-6"
                    style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--accent)",
                        animation: "fadeInUp 1s ease-out 0.4s both",
                        textShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
                    }}
                >
                    {t.hero.role}
                </p>

                <p
                    className="text-[1rem] md:text-[1.25rem] max-w-[550px] mx-auto mb-8 md:mb-10 font-light leading-[1.8] px-2"
                    style={{
                        color: "var(--text-dim)",
                        animation: "fadeInUp 1s ease-out 0.5s both",
                    }}
                >
                    {t.hero.description}
                </p>

                <div
                    className="inline-flex gap-4 flex-col sm:flex-row flex-wrap justify-center items-center"
                    style={{ animation: "fadeInUp 1s ease-out 0.7s both" }}
                >
                    <ParticleBurst>
                        <motion.a
                            href="#projects"
                            className="px-7 md:px-9 py-3 md:py-3.5 rounded-full text-[0.85rem] md:text-[0.95rem] font-bold cursor-pointer inline-block"
                            style={{
                                background: "var(--accent)",
                                color: "#1a1a2e",
                                fontFamily: "var(--font-primary)",
                                boxShadow: "0 0 30px var(--accent-dim)",
                            }}
                            whileHover={{ y: -2, boxShadow: "0 0 50px rgba(255,215,0,0.4), 0 8px 30px rgba(0,0,0,0.3)" }}
                            transition={{ duration: 0.3 }}
                        >
                            {t.hero.viewProjects}
                        </motion.a>
                    </ParticleBurst>
                    <ParticleBurst>
                        <motion.a
                            href="#contact"
                            className="px-7 md:px-9 py-3 md:py-3.5 rounded-full text-[0.85rem] md:text-[0.95rem] font-semibold cursor-pointer inline-block"
                            style={{
                                background: "transparent",
                                color: "var(--accent)",
                                border: "1px solid var(--accent)",
                                fontFamily: "var(--font-primary)",
                            }}
                            whileHover={{ background: "var(--accent-dim)", y: -2, boxShadow: "0 0 30px var(--accent-dim)" }}
                            transition={{ duration: 0.3 }}
                        >
                            {t.hero.contactMe}
                        </motion.a>
                    </ParticleBurst>
                    <ParticleBurst>
                        <motion.a
                            href="/cv/Burak Bilgiç - Özgeçmiş CV.pdf"
                            download
                            className="px-7 md:px-9 py-3 md:py-3.5 rounded-full text-[0.85rem] md:text-[0.95rem] font-semibold cursor-pointer inline-flex items-center gap-2"
                            style={{
                                background: "transparent",
                                color: "var(--text)",
                                border: "1px solid var(--border)",
                                fontFamily: "var(--font-primary)",
                            }}
                            whileHover={{ borderColor: "#ffd700", color: "#ffd700", y: -2, boxShadow: "0 0 30px var(--accent-dim)" }}
                            transition={{ duration: 0.3 }}
                        >
                            <FaDownload size={12} />
                            {t.hero.downloadCv}
                        </motion.a>
                    </ParticleBurst>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                style={{
                    color: "var(--text-dim)",
                    fontSize: "0.75rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    animation: "float 2s ease-in-out infinite",
                }}
            >
                <span>{t.hero.scrollDown}</span>
                <div className="w-[1px] h-10" style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }} />
            </div>
        </section>
    );
}
