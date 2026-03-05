"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="py-16 md:py-24 px-4 md:px-6">
            <div className="max-w-[1000px] mx-auto text-center">
                <div className="mb-12">
                    <h2
                        className="text-[1.8rem] md:text-[2.5rem] font-[800] mb-2 inline-block"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                    >
                        Hakkımda<span style={{ color: "var(--accent)", animation: "glowPulse 3s ease-in-out infinite" }}>.</span>
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
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="mb-4">
                        <strong style={{ color: "var(--text)" }}>Merhaba, ben Burak.</strong>
                    </p>
                    <p className="mb-4">
                        <strong style={{ color: "var(--text)" }}>Java</strong> ve <strong style={{ color: "var(--text)" }}>Python</strong> dillerinde uygulamalı proje tecrübesine sahip <strong style={{ color: "var(--text)" }}>Yazılım Test Geliştirme (SDET)</strong> mühendisi. <strong style={{ color: "var(--text)" }}>Mersys LLC</strong>'deki 6 aylık stajımda "<strong style={{ color: "var(--text)" }}>CAMPUS</strong>" projesi için <strong style={{ color: "var(--text)" }}>Java</strong>, <strong style={{ color: "var(--text)" }}>Selenium WebDriver</strong> ve <strong style={{ color: "var(--text)" }}>Cucumber BDD</strong> kullanarak <strong style={{ color: "var(--text)" }}>uçtan uca test otomasyon süreçleri</strong> geliştirdim.
                    </p>
                    <p className="mb-4">
                        Bireysel projelerimde <strong style={{ color: "var(--text)" }}>Python</strong>, <strong style={{ color: "var(--text)" }}>API entegrasyonları</strong> ve <strong style={{ color: "var(--text)" }}>yerel Büyük Dil Modelleri (LLM)</strong> kullanarak kişiselleştirilmiş <strong style={{ color: "var(--text)" }}>yapay zeka asistanları</strong> tasarlıyor ve <strong style={{ color: "var(--text)" }}>veri işleme süreçlerini otomatize</strong> ediyorum.
                    </p>
                    <p className="mb-4">
                        <strong style={{ color: "var(--text)" }}>SDLC/STLC</strong> süreçlerine, <strong style={{ color: "var(--text)" }}>Jenkins</strong> ile <strong style={{ color: "var(--text)" }}>CI/CD</strong> entegrasyonlarına ve <strong style={{ color: "var(--text)" }}>sistem performans/donanım optimizasyonuna</strong> hakimim.
                    </p>
                    <p>
                        Amacım, <strong style={{ color: "var(--text)" }}>test otomasyonu</strong> ve <strong style={{ color: "var(--text)" }}>AI mimarilerini</strong> birleştirerek <strong style={{ color: "var(--text)" }}>yazılım hata oranlarını minimize eden</strong> projelerde görev almak.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
