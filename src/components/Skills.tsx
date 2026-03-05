"use client";

import { motion } from "framer-motion";
import { FaBug, FaCode, FaRobot, FaPaintBrush } from "react-icons/fa";
import ParticleBurst from "./ParticleBurst";

import { useLanguage } from "@/context/LanguageContext";

export default function Skills() {
    const { t, language } = useLanguage();

    const skills = [
        {
            category: t.skills.categories.testQa,
            icon: FaBug,
            skills: language === "tr"
                ? ["Selenium", "Cypress", "JUnit", "TestNG", "API Testing", "CI/CD Pipeline", "Test Otomasyonu"]
                : ["Selenium", "Cypress", "JUnit", "TestNG", "API Testing", "CI/CD Pipeline", "Test Automation"],
        },
        {
            category: t.skills.categories.programming,
            icon: FaCode,
            skills: ["Java", "Python", "JavaScript/TypeScript", "Next.js", "React", "Node.js", "SQL"],
        },
        {
            category: t.skills.categories.systemAi,
            icon: FaRobot,
            skills: language === "tr"
                ? ["LLM Entegrasyonu", "Ses Modelleri", "Docker", "Git", "Ağ Yönetimi"]
                : ["LLM Integration", "Voice Models", "Docker", "Git", "Network Management"],
        },
        {
            category: t.skills.categories.multimediaDesign,
            icon: FaPaintBrush,
            skills: language === "tr"
                ? ["Video Düzenleme", "Ses Mühendisliği", "UI/UX Tasarım", "Figma", "SPL Optimizasyonu"]
                : ["Video Editing", "Sound Engineering", "UI/UX Design", "Figma", "SPL Optimization"],
        },
    ];

    return (
        <section id="skills" className="py-16 md:py-24 px-4 md:px-6">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-12">
                    <h2
                        className="text-[1.8rem] md:text-[2.5rem] font-[800] mb-2 inline-block"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                    >
                        {t.skills.title}<span style={{ color: "var(--accent)", animation: "glowPulse 3s ease-in-out infinite" }}>.</span>
                    </h2>
                    <p className="text-[0.95rem] md:text-[1.1rem] font-light" style={{ color: "var(--text-dim)" }}>
                        {t.skills.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skills.map((cat, index) => {
                        const IconComp = cat.icon;
                        return (
                            <motion.div
                                key={cat.category}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.12 }}
                            >
                                <ParticleBurst>
                                    <motion.div
                                        className="p-5 md:p-8 rounded-2xl cursor-pointer"
                                        style={{
                                            background: "var(--surface-glass)",
                                            backdropFilter: "blur(20px)",
                                            WebkitBackdropFilter: "blur(20px)",
                                            border: "1px solid var(--border)",
                                        }}
                                        whileHover={{
                                            y: -4,
                                            borderColor: "rgba(255, 215, 0, 0.35)",
                                            boxShadow: "0 8px 40px rgba(255, 215, 0, 0.15), inset 0 1px 0 rgba(255, 215, 0, 0.1)",
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <h3
                                            className="text-[1.2rem] font-bold mb-5 flex items-center justify-center gap-3"
                                            style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}
                                        >
                                            <IconComp size={18} />
                                            {cat.category}
                                        </h3>
                                        <div className="flex flex-wrap gap-2.5 justify-center">
                                            {cat.skills.map((skill) => (
                                                <motion.span
                                                    key={skill}
                                                    className="px-[18px] py-2 rounded-full text-[0.85rem] cursor-default"
                                                    style={{
                                                        background: "rgba(255, 215, 0, 0.06)",
                                                        border: "1px solid var(--border)",
                                                        color: "var(--text)",
                                                    }}
                                                    whileHover={{
                                                        background: "var(--accent-dim)",
                                                        borderColor: "var(--accent)",
                                                        color: "#ffd700",
                                                        y: -2,
                                                        boxShadow: "0 0 15px var(--accent-dim)",
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </motion.div>
                                </ParticleBurst>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
