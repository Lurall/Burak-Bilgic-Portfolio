"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
    const { t } = useLanguage();

    return (
        <section id="about" className="py-16 md:py-24 px-4 md:px-6">
            <div className="max-w-[1000px] mx-auto text-center">
                <div className="mb-12">
                    <h2
                        className="text-[1.8rem] md:text-[2.5rem] font-[800] mb-2 inline-block"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                    >
                        {t.about.title}<span style={{ color: "var(--accent)", animation: "glowPulse 3s ease-in-out infinite" }}>.</span>
                    </h2>
                </div>

                <motion.div
                    className="p-5 md:p-12 rounded-2xl text-[0.95rem] md:text-[1.1rem] leading-[1.8] font-light text-left"
                    style={{
                        background: "var(--surface-glass)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid var(--border)",
                        color: "var(--text-dim)",
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "300px" }}
                    transition={{ duration: 0.6 }}
                >
                    {t.about.paragraphs.map((p, i) => (
                        <p key={i} className={i < t.about.paragraphs.length - 1 ? "mb-4" : ""}>
                            {p}
                        </p>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
