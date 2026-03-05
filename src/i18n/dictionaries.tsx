import React from "react";

export const dictionaries = {
    tr: {
        nav: {
            home: "Ana Sayfa",
            skills: "Yetenekler",
            projects: "Projeler",
            contact: "İletişim",
        },
        hero: {
            greeting: "Merhaba, ben",
            role: "SDET & Geliştirici",
            description: "Modern ve yaratıcı çözümler geliştiriyorum.\nHer projede detaylara önem veriyorum.",
            viewProjects: "Projelerimi Gör",
            contactMe: "İletişime Geç",
            downloadCv: "Özgeçmiş İndir",
            cvLink: "/cv/Burak Bilgiç - Özgeçmiş CV.pdf",
            scrollDown: "Aşağı Kaydır",
        },
        about: {
            title: "Hakkımda",
            paragraphs: [
                <React.Fragment key="1">
                    <strong style={{ color: "var(--text)" }}>Merhaba, ben Burak.</strong>
                </React.Fragment>,
                <React.Fragment key="2">
                    <strong style={{ color: "var(--text)" }}>Java</strong> ve <strong style={{ color: "var(--text)" }}>Python</strong> dillerinde uygulamalı proje tecrübesine sahip <strong style={{ color: "var(--text)" }}>Yazılım Test Geliştirme (SDET)</strong> mühendisi. <strong style={{ color: "var(--text)" }}>Mersys LLC</strong>'deki 6 aylık stajımda "<strong style={{ color: "var(--text)" }}>CAMPUS</strong>" projesi için <strong style={{ color: "var(--text)" }}>Java</strong>, <strong style={{ color: "var(--text)" }}>Selenium WebDriver</strong> ve <strong style={{ color: "var(--text)" }}>Cucumber BDD</strong> kullanarak <strong style={{ color: "var(--text)" }}>uçtan uca test otomasyon süreçleri</strong> geliştirdim.
                </React.Fragment>,
                <React.Fragment key="3">
                    Bireysel projelerimde <strong style={{ color: "var(--text)" }}>Python</strong>, <strong style={{ color: "var(--text)" }}>API entegrasyonları</strong> ve <strong style={{ color: "var(--text)" }}>yerel Büyük Dil Modelleri (LLM)</strong> kullanarak kişiselleştirilmiş <strong style={{ color: "var(--text)" }}>yapay zeka asistanları</strong> tasarlıyor ve <strong style={{ color: "var(--text)" }}>veri işleme süreçlerini otomatize</strong> ediyorum.
                </React.Fragment>,
                <React.Fragment key="4">
                    <strong style={{ color: "var(--text)" }}>SDLC/STLC</strong> süreçlerine, <strong style={{ color: "var(--text)" }}>Jenkins</strong> ile <strong style={{ color: "var(--text)" }}>CI/CD</strong> entegrasyonlarına ve <strong style={{ color: "var(--text)" }}>sistem performans/donanım optimizasyonuna</strong> hakimim.
                </React.Fragment>,
                <React.Fragment key="5">
                    Amacım, <strong style={{ color: "var(--text)" }}>test otomasyonu</strong> ve <strong style={{ color: "var(--text)" }}>AI mimarilerini</strong> birleştirerek <strong style={{ color: "var(--text)" }}>yazılım hata oranlarını minimize eden</strong> projelerde görev almak.
                </React.Fragment>
            ]
        },
        skills: {
            title: "Yetenekler",
            subtitle: "Kullandığım teknolojiler ve araçlar",
            categories: {
                testQa: "Test & QA",
                programming: "Programlama",
                systemAi: "Sistem & AI",
                multimediaDesign: "Multimedya & Tasarım",
            },
        },
        projects: {
            title: "Projeler",
            subtitle: "Son dönemde geliştirdiğim bazı işler",
            viewProject: "İncele", // Adjust to match old text "İncele" or "Projeyi İncele", wait, check projects component
        },
        contact: {
            title: "İletişim",
            subtitle: "Bir projen mi var? Birlikte çalışmak ister misin? Bana ulaş!",
            infoText: "Yeni projeler, yaratıcı fikirler veya fırsatlar hakkında konuşmak isterseniz benimle iletişime geçin. Her mesajı okuyorum ve en kısa sürede dönüş yapıyorum.",
            labels: {
                email: "Email",
                location: "Konum",
                status: "Durum",
            },
            values: {
                location: "Fethiye, Muğla",
                status: "Freelance için müsait",
            },
            form: {
                name: "Adınız",
                namePlaceholder: "Adınızı girin",
                email: "E-posta",
                emailPlaceholder: "E-posta adresiniz",
                message: "Mesaj",
                messagePlaceholder: "Mesajınız...",
                submit: "Mesaj Gönder",
                sending: "Gönderiliyor...",
                success: "Mesajınız başarıyla iletildi, en kısa sürede dönüş yapacağım! ✉️",
                errorEmpty: "Lütfen tüm alanları doldurun.",
                errorSend: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.",
            },
            copyright: "© 2026 Burak Bilgiç. Tüm hakları saklıdır.",
        },
    },
    en: {
        nav: {
            home: "Home",
            skills: "Skills",
            projects: "Projects",
            contact: "Contact",
        },
        hero: {
            greeting: "Hello, I'm",
            role: "SDET & Developer",
            description: "I develop modern and creative solutions.\nI pay attention to details in every project.",
            viewProjects: "View Projects",
            contactMe: "Contact Me",
            downloadCv: "Download CV",
            cvLink: "/cv/Burak_Bilgic_CV_EN.pdf",
            scrollDown: "Scroll Down",
        },
        about: {
            title: "About Me",
            paragraphs: [
                <React.Fragment key="1">
                    <strong style={{ color: "var(--text)" }}>Hello, I'm Burak.</strong>
                </React.Fragment>,
                <React.Fragment key="2">
                    A <strong style={{ color: "var(--text)" }}>Software Development Engineer in Test (SDET)</strong> with practical project experience in <strong style={{ color: "var(--text)" }}>Java</strong> and <strong style={{ color: "var(--text)" }}>Python</strong>. During my 6-month internship at <strong style={{ color: "var(--text)" }}>Mersys LLC</strong>, I developed <strong style={{ color: "var(--text)" }}>end-to-end test automation processes</strong> for the "<strong style={{ color: "var(--text)" }}>CAMPUS</strong>" project using <strong style={{ color: "var(--text)" }}>Java</strong>, <strong style={{ color: "var(--text)" }}>Selenium WebDriver</strong>, and <strong style={{ color: "var(--text)" }}>Cucumber BDD</strong>.
                </React.Fragment>,
                <React.Fragment key="3">
                    In my personal projects, I design personalized <strong style={{ color: "var(--text)" }}>artificial intelligence assistants</strong> and <strong style={{ color: "var(--text)" }}>automate data processing</strong> using <strong style={{ color: "var(--text)" }}>Python</strong>, <strong style={{ color: "var(--text)" }}>API integrations</strong>, and <strong style={{ color: "var(--text)" }}>local Large Language Models (LLMs)</strong>.
                </React.Fragment>,
                <React.Fragment key="4">
                    I have a strong command of <strong style={{ color: "var(--text)" }}>SDLC/STLC</strong> processes, <strong style={{ color: "var(--text)" }}>CI/CD</strong> integrations with <strong style={{ color: "var(--text)" }}>Jenkins</strong>, and <strong style={{ color: "var(--text)" }}>system performance/hardware optimization</strong>.
                </React.Fragment>,
                <React.Fragment key="5">
                    My goal is to take part in projects that <strong style={{ color: "var(--text)" }}>minimize software bug rates</strong> by combining <strong style={{ color: "var(--text)" }}>test automation</strong> and <strong style={{ color: "var(--text)" }}>AI architectures</strong>.
                </React.Fragment>
            ]
        },
        skills: {
            title: "Skills",
            subtitle: "Technologies and tools I use",
            categories: {
                testQa: "Test & QA",
                programming: "Programming",
                systemAi: "System & AI",
                multimediaDesign: "Multimedia & Design",
            },
        },
        projects: {
            title: "Projects",
            subtitle: "Some of my recent work",
            viewProject: "View",
        },
        contact: {
            title: "Contact",
            subtitle: "Have a project? Want to work together? Get in touch!",
            infoText: "Contact me if you want to talk about new projects, creative ideas or opportunities. I read every message and reply as soon as possible.",
            labels: {
                email: "Email",
                location: "Location",
                status: "Status",
            },
            values: {
                location: "Fethiye, Muğla",
                status: "Available for Freelance",
            },
            form: {
                name: "Name",
                namePlaceholder: "Enter your name",
                email: "Email",
                emailPlaceholder: "Your email address",
                message: "Message",
                messagePlaceholder: "Your message...",
                submit: "Send Message",
                sending: "Sending...",
                success: "Your message has been sent successfully, I will get back to you soon! ✉️",
                errorEmpty: "Please fill in all fields.",
                errorSend: "Message could not be sent. Please try again later.",
            },
            copyright: "© 2026 Burak Bilgiç. All rights reserved.",
        },
    },
};

export type Language = "tr" | "en";
export type Dictionary = typeof dictionaries.tr;
