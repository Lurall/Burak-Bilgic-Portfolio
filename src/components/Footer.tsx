"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaLinkedin, FaGithub, FaYoutube, FaInstagram, FaTwitch,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiKick } from "react-icons/si";
import ParticleBurst from "./ParticleBurst";
import KeyboardSound from "./KeyboardSound";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/context/LanguageContext";

const socials = [
    { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/burak-bilgiç-414b362b2/" },
    { icon: FaGithub, label: "GitHub", href: "https://github.com/Lurall" },
    { icon: FaYoutube, label: "YouTube", href: "https://youtube.com/@luralls" },
    { icon: FaXTwitter, label: "X", href: "https://x.com/Lurallvlr" },
    { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/brak._.bilgic/" },
    { icon: SiKick, label: "Kick", href: "https://kick.com/lurall" },
    { icon: FaTwitch, label: "Twitch", href: "https://www.twitch.tv/lurallvlr" },
];

const EMAILJS_SERVICE_ID = "service_hlirj6k";   // EmailJS Service ID
const EMAILJS_TEMPLATE_ID = "template_s8ip8hc"; // EmailJS Template ID
const EMAILJS_PUBLIC_KEY = "ZsG8rneaSQJIfD6c8"; // EmailJS Public Key

export default function Footer() {
    const { t } = useLanguage();
    const formRef = useRef<HTMLFormElement>(null);
    const [sending, setSending] = useState(false);
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current || sending) return;

        // Basic validation
        const formData = new FormData(formRef.current);
        const name = formData.get("user_name") as string;
        const email = formData.get("user_email") as string;
        const message = formData.get("message") as string;

        if (!name.trim() || !email.trim() || !message.trim()) {
            setToast({ type: "error", message: t.contact.form.errorEmpty });
            setTimeout(() => setToast(null), 4000);
            return;
        }

        setSending(true);

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );
            setToast({ type: "success", message: t.contact.form.success });
            formRef.current.reset();
        } catch {
            setToast({ type: "error", message: t.contact.form.errorSend });
        } finally {
            setSending(false);
            setTimeout(() => setToast(null), 5000);
        }
    };

    return (
        <section id="contact" className="py-16 md:py-24 px-4 md:px-6 relative">
            <KeyboardSound />

            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.9 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-4 rounded-2xl text-[0.95rem] font-medium flex items-center gap-3 max-w-[90vw]"
                        style={{
                            zIndex: 200,
                            background: toast.type === "success"
                                ? "linear-gradient(135deg, rgba(34, 197, 94, 0.95), rgba(22, 163, 74, 0.95))"
                                : "linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95))",
                            color: "#fff",
                            backdropFilter: "blur(20px)",
                            boxShadow: toast.type === "success"
                                ? "0 8px 40px rgba(34, 197, 94, 0.4), 0 0 0 1px rgba(255,255,255,0.1)"
                                : "0 8px 40px rgba(239, 68, 68, 0.4), 0 0 0 1px rgba(255,255,255,0.1)",
                        }}
                    >
                        <span className="text-[1.3rem]">{toast.type === "success" ? "✅" : "⚠️"}</span>
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <h2
                        className="text-[1.8rem] md:text-[2.5rem] font-[800] mb-2 inline-block"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                    >
                        {t.contact.title}<span style={{ color: "var(--accent)", animation: "glowPulse 3s ease-in-out infinite" }}>.</span>
                    </h2>
                    <p className="text-[0.95rem] md:text-[1.1rem] font-light" style={{ color: "var(--text-dim)" }}>
                        {t.contact.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    {/* Left side: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-[1.1rem] leading-[1.8] font-light mb-10" style={{ color: "var(--text-dim)" }}>
                            {t.contact.infoText}
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 flex items-center justify-center rounded-xl text-[1.5rem]" style={{ background: "var(--surface-glass)", border: "1px solid var(--border)", color: "var(--accent)" }}>
                                    📧
                                </div>
                                <div>
                                    <span className="block text-[0.85rem] uppercase tracking-[1px] mb-1 font-medium" style={{ color: "var(--text-dim)" }}>{t.contact.labels.email}</span>
                                    <span className="block text-[1rem] font-medium" style={{ color: "var(--text)" }}>bbilgicc@gmail.com</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 flex items-center justify-center rounded-xl text-[1.5rem]" style={{ background: "var(--surface-glass)", border: "1px solid var(--border)", color: "var(--accent)" }}>
                                    📍
                                </div>
                                <div>
                                    <span className="block text-[0.85rem] uppercase tracking-[1px] mb-1 font-medium" style={{ color: "var(--text-dim)" }}>{t.contact.labels.location}</span>
                                    <span className="block text-[1rem] font-medium" style={{ color: "var(--text)" }}>{t.contact.values.location}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 flex items-center justify-center rounded-xl text-[1.5rem]" style={{ background: "var(--surface-glass)", border: "1px solid var(--border)", color: "var(--accent)" }}>
                                    💼
                                </div>
                                <div>
                                    <span className="block text-[0.85rem] uppercase tracking-[1px] mb-1 font-medium" style={{ color: "var(--text-dim)" }}>{t.contact.labels.status}</span>
                                    <span className="block text-[1rem] font-medium" style={{ color: "var(--text)" }}>{t.contact.values.status}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right side: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="p-5 md:p-8 rounded-2xl" style={{ background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(20px)", border: "1px solid var(--border)" }}>
                            <div className="mb-5">
                                <label className="block text-[0.85rem] font-medium uppercase tracking-[1px] mb-2" style={{ color: "var(--text-dim)" }}>{t.contact.form.name}</label>
                                <input name="user_name" type="text" placeholder={t.contact.form.namePlaceholder} className="w-full px-[18px] py-[14px] rounded-xl text-[0.95rem] outline-none" style={{ background: "var(--surface-glass)", border: "1px solid var(--border)", color: "var(--text)", fontFamily: "var(--font-primary)", transition: "all 0.3s ease" }} onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 20px var(--accent-dim)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }} />
                            </div>
                            <div className="mb-5">
                                <label className="block text-[0.85rem] font-medium uppercase tracking-[1px] mb-2" style={{ color: "var(--text-dim)" }}>{t.contact.form.email}</label>
                                <input name="user_email" type="email" placeholder={t.contact.form.emailPlaceholder} className="w-full px-[18px] py-[14px] rounded-xl text-[0.95rem] outline-none" style={{ background: "var(--surface-glass)", border: "1px solid var(--border)", color: "var(--text)", fontFamily: "var(--font-primary)", transition: "all 0.3s ease" }} onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 20px var(--accent-dim)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }} />
                            </div>
                            <div className="mb-6">
                                <label className="block text-[0.85rem] font-medium uppercase tracking-[1px] mb-2" style={{ color: "var(--text-dim)" }}>{t.contact.form.message}</label>
                                <textarea name="message" rows={5} placeholder={t.contact.form.messagePlaceholder} className="w-full px-[18px] py-[14px] rounded-xl text-[0.95rem] outline-none resize-y" style={{ background: "var(--surface-glass)", border: "1px solid var(--border)", color: "var(--text)", fontFamily: "var(--font-primary)", minHeight: "120px", transition: "all 0.3s ease" }} onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 20px var(--accent-dim)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }} />
                            </div>
                            <ParticleBurst>
                                <motion.button
                                    type="submit"
                                    disabled={sending}
                                    className="w-full py-[14px] rounded-xl text-[1rem] font-bold cursor-pointer"
                                    style={{
                                        background: sending ? "rgba(255, 215, 0, 0.5)" : "var(--accent)",
                                        color: "#1a1a2e",
                                        border: "none",
                                        fontFamily: "var(--font-primary)",
                                        boxShadow: "0 0 30px var(--accent-dim)",
                                        opacity: sending ? 0.7 : 1,
                                    }}
                                    whileHover={sending ? {} : { y: -2, boxShadow: "0 0 50px rgba(255,215,0,0.4), 0 8px 30px rgba(0,0,0,0.3)" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {sending ? (
                                        <span className="inline-flex items-center gap-2">
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="inline-block w-5 h-5 border-2 border-[#1a1a2e] border-t-transparent rounded-full"
                                            />
                                            {t.contact.form.sending}
                                        </span>
                                    ) : (
                                        t.contact.form.submit
                                    )}
                                </motion.button>
                            </ParticleBurst>
                        </form>
                    </motion.div>
                </div>

                {/* Social Icons inside Footer */}
                <div className="pt-10 mb-8 flex flex-wrap gap-4 justify-center" style={{ borderTop: "1px solid var(--border)" }}>
                    {socials.map((social) => {
                        const IconComp = social.icon;
                        return (
                            <ParticleBurst key={social.label}>
                                <motion.a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 flex items-center justify-center rounded-xl text-[1.2rem] cursor-pointer"
                                    style={{ background: "var(--surface-glass)", border: "1px solid var(--border)", color: "var(--text)" }}
                                    whileHover={{ borderColor: "#ffd700", boxShadow: "0 0 15px var(--accent-dim)", y: -3, color: "#ffd700" }}
                                    transition={{ duration: 0.3 }}
                                    aria-label={social.label}
                                >
                                    <IconComp size={20} />
                                </motion.a>
                            </ParticleBurst>
                        );
                    })}
                </div>

                <div className="text-center">
                    <p className="text-[0.9rem]" style={{ color: "var(--text-dim)" }}>
                        {t.contact.copyright}
                    </p>
                </div>
            </div>
        </section>
    );
}
