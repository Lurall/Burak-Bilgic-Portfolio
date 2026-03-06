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

  const darkBgR = [11, 16, 21, 26];
  const darkBgG = [16, 22, 28, 34];
  const darkBgB = [33, 40, 48, 56];

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

      {/* Fixed background that changes color */}
      <motion.div
        className="fixed inset-0"
        style={{ backgroundColor: bgColor, zIndex: -1 }}
      />

      {/* Mountains - fixed, persistent, with blur on scroll */}
      <MountainScene />

      {/* Main content */}
      <div ref={containerRef} className="relative w-full" style={{ zIndex: 2 }}>
        {/* Hero section - fully transparent to show mountains */}
        <Hero />

        {/* Content sections - semi-transparent so mountains show through blurred */}
        <motion.div className="w-full" style={{ backgroundColor: contentBgColor }}>
          <About />
          <Skills />
          <Projects />
          <Footer />
        </motion.div>
      </div>
    </>
  );
}
