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

  // We use 4 stacked layers and crossfade their opacity 
  // to replicate the RGB interpolation perfectly on the GPU.

  // Light Mode Colors (Blue -> Purple -> Pink -> Orange)
  const lightColors = [
    "rgb(111, 172, 252)",
    "rgb(170, 145, 190)",
    "rgb(220, 120, 110)",
    "rgb(235, 140, 60)"
  ];

  // Dark Mode Colors
  const darkColors = [
    "rgb(7, 10, 25)",
    "rgb(12, 16, 34)",
    "rgb(18, 24, 46)",
    "rgb(26, 34, 68)"
  ];

  // Opacity phases corresponding to the original [0, 0.3, 0.6, 1] scroll mapping
  const opacity2 = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <>
      {/* Snow on top of everything */}
      <SnowEffect />

      {/* Navbar */}
      <Navbar />

      {/* Fixed background that changes color based on scroll using GPU friendly opacity */}

      {/* --- Light Mode Backgrounds --- */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-700 ease-in-out ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`} style={{ zIndex: -2 }}>
        <div className="absolute inset-0" style={{ backgroundColor: lightColors[0] }} />
        <motion.div className="absolute inset-0" style={{ backgroundColor: lightColors[1], opacity: opacity2, willChange: 'opacity' }} />
        <motion.div className="absolute inset-0" style={{ backgroundColor: lightColors[2], opacity: opacity3, willChange: 'opacity' }} />
        <motion.div className="absolute inset-0" style={{ backgroundColor: lightColors[3], opacity: opacity4, willChange: 'opacity' }} />
      </div>

      {/* --- Dark Mode Backgrounds --- */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-700 ease-in-out ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`} style={{ zIndex: -1 }}>
        <div className="absolute inset-0" style={{ backgroundColor: darkColors[0] }} />
        <motion.div className="absolute inset-0" style={{ backgroundColor: darkColors[1], opacity: opacity2, willChange: 'opacity' }} />
        <motion.div className="absolute inset-0" style={{ backgroundColor: darkColors[2], opacity: opacity3, willChange: 'opacity' }} />
        <motion.div className="absolute inset-0" style={{ backgroundColor: darkColors[3], opacity: opacity4, willChange: 'opacity' }} />
      </div>

      {/* Mountains - fixed, persistent, with blur on scroll */}
      <MountainScene />

      {/* Main content */}
      <div ref={containerRef} className="relative w-full" style={{ zIndex: 2 }}>
        {/* Hero section - fully transparent to show mountains */}
        <Hero />

        {/* Content sections wrapper with its own relative scope so backgrounds map correctly */}
        <div className="relative w-full">
          {/* Content sections - semi-transparent background with layered opacity */}
          <div className={`absolute inset-0 z-[-1] pointer-events-none transition-opacity duration-700 ease-in-out ${theme === 'light' ? 'opacity-[0.85]' : 'opacity-0'}`}>
            <div className="absolute inset-0" style={{ backgroundColor: lightColors[0] }} />
            <motion.div className="absolute inset-0" style={{ backgroundColor: lightColors[1], opacity: opacity2, willChange: 'opacity' }} />
            <motion.div className="absolute inset-0" style={{ backgroundColor: lightColors[2], opacity: opacity3, willChange: 'opacity' }} />
            <motion.div className="absolute inset-0" style={{ backgroundColor: lightColors[3], opacity: opacity4, willChange: 'opacity' }} />
          </div>

          <div className={`absolute inset-0 z-[-1] pointer-events-none transition-opacity duration-700 ease-in-out ${theme === 'dark' ? 'opacity-[0.70]' : 'opacity-0'}`}>
            <div className="absolute inset-0" style={{ backgroundColor: darkColors[0] }} />
            <motion.div className="absolute inset-0" style={{ backgroundColor: darkColors[1], opacity: opacity2, willChange: 'opacity' }} />
            <motion.div className="absolute inset-0" style={{ backgroundColor: darkColors[2], opacity: opacity3, willChange: 'opacity' }} />
            <motion.div className="absolute inset-0" style={{ backgroundColor: darkColors[3], opacity: opacity4, willChange: 'opacity' }} />
          </div>

          <About />
          <Skills />
          <Projects />
          <Footer />
        </div>
      </div>
    </>
  );
}
