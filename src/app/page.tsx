"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import SnowEffect from "@/components/SnowEffect";
import MountainScene from "@/components/MountainSVG";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();

  // Background color transition
  // Light mode: #6facfc (blue sky) → warm orange sunset (rgb(235, 140, 60))
  // Dark mode: #0b1021 (deep night) → #1a2238 (slightly lighter night)
  const lightBgR = [111, 170, 220, 235];
  const lightBgG = [172, 145, 120, 140];
  const lightBgB = [252, 190, 110, 60];

  const darkBgR = [7, 12, 18, 26];
  const darkBgG = [10, 16, 24, 34];
  const darkBgB = [25, 34, 46, 68];

  const targetBgR = theme === "light" ? lightBgR : darkBgR;
  const targetBgG = theme === "light" ? lightBgG : darkBgG;
  const targetBgB = theme === "light" ? lightBgB : darkBgB;

  const bgR = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], targetBgR);
  const bgG = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], targetBgG);
  const bgB = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], targetBgB);

  const bgColor = useMotionTemplate`rgb(${bgR}, ${bgG}, ${bgB})`;
  const contentBgColor = useMotionTemplate`rgba(${bgR}, ${bgG}, ${bgB}, ${theme === 'light' ? 0.85 : 0.70})`;

  return (
    <>
      {/* Snow on top of everything */}
      <SnowEffect />

      {/* Navbar */}
      <Navbar />

      {/* Fixed background that changes color based on scroll */}
      {/* Light Mode Layer */}
      <motion.div
        className="fixed inset-0"
        style={{
          backgroundColor: useMotionTemplate`rgb(${useTransform(scrollYProgress, [0, 0.3, 0.6, 1], lightBgR)}, ${useTransform(scrollYProgress, [0, 0.3, 0.6, 1], lightBgG)}, ${useTransform(scrollYProgress, [0, 0.3, 0.6, 1], lightBgB)})`,
          zIndex: -2
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: theme === 'light' ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Dark Mode Layer */}
      <motion.div
        className="fixed inset-0"
        style={{
          backgroundColor: useMotionTemplate`rgb(${useTransform(scrollYProgress, [0, 0.3, 0.6, 1], darkBgR)}, ${useTransform(scrollYProgress, [0, 0.3, 0.6, 1], darkBgG)}, ${useTransform(scrollYProgress, [0, 0.3, 0.6, 1], darkBgB)})`,
          zIndex: -1
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: theme === 'dark' ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Mountains - fixed, persistent, with blur on scroll */}
      <MountainScene />

      {/* Main content */}
      <div ref={containerRef} className="relative w-full" style={{ zIndex: 2 }}>
        {/* Hero section - fully transparent to show mountains */}
        <Hero />

        {/* Content sections - semi-transparent so mountains show through blurred */}
        {/* We use two overlapping backgrounds for the content section as well to crossfade cleanly */}
        <div className="relative w-full">
          <motion.div
            className="absolute inset-0 z-[-1]"
            style={{ backgroundColor: useMotionTemplate`rgba(${useTransform(scrollYProgress, [0, 0.3, 0.6, 1], lightBgR)}, ${useTransform(scrollYProgress, [0, 0.3, 0.6, 1], lightBgG)}, ${useTransform(scrollYProgress, [0, 0.3, 0.6, 1], lightBgB)}, 0.85)` }}
            initial={{ opacity: 1 }}
            animate={{ opacity: theme === 'light' ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 z-[-1]"
            style={{ backgroundColor: useMotionTemplate`rgba(${useTransform(scrollYProgress, [0, 0.3, 0.6, 1], darkBgR)}, ${useTransform(scrollYProgress, [0, 0.3, 0.6, 1], darkBgG)}, ${useTransform(scrollYProgress, [0, 0.3, 0.6, 1], darkBgB)}, 0.70)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: theme === 'dark' ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <About />
          <Skills />
          <Projects />
          <Footer />
        </div>
      </div>
    </>
  );
}
