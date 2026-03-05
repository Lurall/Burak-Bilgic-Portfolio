"use client";

import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import ParticleBurst from "./ParticleBurst";

interface Project {
    title: string;
    emoji: string;
    description: string;
    tags: string[];
    link?: string;
}

const projects: Project[] = [
    {
        title: "Video Verisi / LLM Entegrasyonu",
        emoji: "🎬",
        description: "Video verilerini LLM modelleri ile entegre eden, içerik analizi ve otomatik etiketleme yapan ileri düzey bir sistem.",
        tags: ["Python", "LLM", "Video Processing", "AI"],
    },
    {
        title: "yt-dlp Otomasyonu",
        emoji: "⚡",
        description: "yt-dlp aracını kullanarak video indirme süreçlerini otomatikleştiren kapsamlı bir otomasyon sistemi.",
        tags: ["Python", "Automation", "CLI", "ffmpeg"],
        link: "https://github.com/Lurall/Auto-Playlist-Downloader",
    },
    {
        title: "Yerel AI Ses Modeli",
        emoji: "🎙️",
        description: "Yerel ortamda çalışan bir AI ses modeli. Ses sentezi ve tanıma işlemlerini gizlilik odaklı gerçekleştiren bir çözüm.",
        tags: ["AI", "TTS", "Python", "Deep Learning"],
    },
    {
        title: "SPL Donanım Optimizasyonu",
        emoji: "🔊",
        description: "SPL ses sistemleri için donanım optimizasyonu. Amplifikatör ayarları ve akustik ölçüm verilerine dayalı performans iyileştirmesi.",
        tags: ["Audio Engineering", "Hardware", "DSP", "Optimization"],
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-16 md:py-24 px-4 md:px-6">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-12">
                    <h2
                        className="text-[1.8rem] md:text-[2.5rem] font-[800] mb-2 inline-block"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                    >
                        Projeler<span style={{ color: "var(--accent)", animation: "glowPulse 3s ease-in-out infinite" }}>.</span>
                    </h2>
                    <p className="text-[0.95rem] md:text-[1.1rem] font-light" style={{ color: "var(--text-dim)" }}>
                        Üzerinde çalıştığım projeler
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.12 }}
                        >
                            <ParticleBurst>
                                <motion.div
                                    className="rounded-2xl overflow-hidden cursor-pointer"
                                    style={{
                                        background: "var(--surface-glass)",
                                        backdropFilter: "blur(20px)",
                                        WebkitBackdropFilter: "blur(20px)",
                                        border: "1px solid var(--border)",
                                    }}
                                    whileHover={{
                                        y: -6,
                                        borderColor: "rgba(255, 215, 0, 0.35)",
                                        boxShadow: "0 12px 50px rgba(255, 215, 0, 0.15), inset 0 1px 0 rgba(255, 215, 0, 0.1)",
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {/* Project image area */}
                                    <div
                                        className="w-full h-[150px] md:h-[200px] flex items-center justify-center text-4xl md:text-5xl relative overflow-hidden"
                                        style={{ background: "linear-gradient(135deg, rgba(30,40,80,0.6), rgba(60,80,140,0.4))" }}
                                    >
                                        {project.emoji}
                                        <div
                                            className="absolute inset-0"
                                            style={{ background: "linear-gradient(to bottom, transparent 60%, var(--surface-glass))" }}
                                        />
                                    </div>

                                    <div className="p-4 md:p-6 text-center">
                                        <h3
                                            className="text-[1.25rem] font-bold mb-2"
                                            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                                        >
                                            {project.title}
                                        </h3>
                                        <p
                                            className="text-[0.9rem] leading-[1.7] mb-4"
                                            style={{ color: "var(--text-dim)" }}
                                        >
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-5 justify-center">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 rounded-full text-[0.75rem] font-medium"
                                                    style={{
                                                        background: "var(--accent-dim)",
                                                        color: "var(--accent)",
                                                        border: "1px solid rgba(255, 215, 0, 0.15)",
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-3 justify-center">
                                            {project.link ? (
                                                <motion.a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-5 py-2 rounded-full text-[0.85rem] cursor-pointer inline-flex items-center"
                                                    style={{
                                                        background: "transparent",
                                                        border: "1px solid var(--border)",
                                                        color: "var(--text)",
                                                        fontFamily: "var(--font-primary)",
                                                    }}
                                                    whileHover={{ borderColor: "#ffd700", color: "#ffd700", boxShadow: "0 0 15px var(--accent-dim)" }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <FaExternalLinkAlt className="inline mr-2" size={10} />
                                                    Detaylar
                                                </motion.a>
                                            ) : (
                                                <motion.button
                                                    className="px-5 py-2 rounded-full text-[0.85rem] cursor-pointer inline-flex items-center"
                                                    style={{
                                                        background: "transparent",
                                                        border: "1px solid var(--border)",
                                                        color: "var(--text)",
                                                        fontFamily: "var(--font-primary)",
                                                    }}
                                                    whileHover={{ borderColor: "#ffd700", color: "#ffd700", boxShadow: "0 0 15px var(--accent-dim)" }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <FaExternalLinkAlt className="inline mr-2" size={10} />
                                                    Detaylar
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </ParticleBurst>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
