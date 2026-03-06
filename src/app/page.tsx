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

  // We will no longer animate backgroundColor directly.
  // Instead, we will keep two static backgrounds and animate their opacity.

  // Light Mode Static Colors
  const lightBgTop = "rgb(111, 172, 252)"; // start color
  const lightBgBottom = "rgb(235, 140, 60)"; // target color

  // Dark Mode Static Colors
  const darkBgTop = "rgb(7, 10, 25)";
  const darkBgBottom = "rgb(26, 34, 68)";

  // The content sections need semi-transparent backgrounds
  const lightContentBgTop = "rgba(111, 172, 252, 0.85)";
  const lightContentBgBottom = "rgba(235, 140, 60, 0.85)";

  const darkContentBgTop = "rgba(7, 10, 25, 0.70)";
  const darkContentBgBottom = "rgba(26, 34, 68, 0.70)";

  // We animate opacity from 0 to 1 as user scrolls down
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  // And the reverse for the top layer
  const scrollOpacityReverse = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      {/* Snow on top of everything */}
      <SnowEffect />

      {/* Navbar */}
      <Navbar />

      {/* Fixed background that changes color based on scroll using GPU friendly opacity */}

      {/* --- Light Mode Backgrounds --- */}
      {theme === 'light' && (
        <>
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{ backgroundColor: lightBgTop, zIndex: -2, opacity: scrollOpacityReverse, willChange: 'opacity' }}
          />
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{ backgroundColor: lightBgBottom, zIndex: -2, opacity: scrollOpacity, willChange: 'opacity' }}
          />
        </>
      )}

      {/* --- Dark Mode Backgrounds --- */}
      {theme === 'dark' && (
        <>
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{ backgroundColor: darkBgTop, zIndex: -1, opacity: scrollOpacityReverse, willChange: 'opacity' }}
          />
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{ backgroundColor: darkBgBottom, zIndex: -1, opacity: scrollOpacity, willChange: 'opacity' }}
          />
        </>
      )}

      {/* Mountains - fixed, persistent, with blur on scroll */}
      <MountainScene />

      {/* Main content */}
      <div ref={containerRef} className="relative w-full" style={{ zIndex: 2 }}>
        {/* Hero section - fully transparent to show mountains */}
        <Hero />

        {/* Content sections - semi-transparent so mountains show through blurred */}
        {/* We use two overlapping backgrounds for the content section as well to crossfade cleanly via opacity */}

        {theme === 'light' && (
          <>
            <motion.div
              className="absolute inset-0 z-[-1] pointer-events-none"
              style={{ backgroundColor: lightContentBgTop, opacity: scrollOpacityReverse, willChange: 'opacity' }}
            />
            <motion.div
              className="absolute inset-0 z-[-1] pointer-events-none"
              style={{ backgroundColor: lightContentBgBottom, opacity: scrollOpacity, willChange: 'opacity' }}
            />
          </>
        )}

        {theme === 'dark' && (
          <>
            <motion.div
              className="absolute inset-0 z-[-1] pointer-events-none"
              style={{ backgroundColor: darkContentBgTop, opacity: scrollOpacityReverse, willChange: 'opacity' }}
            />
            <motion.div
              className="absolute inset-0 z-[-1] pointer-events-none"
              style={{ backgroundColor: darkContentBgBottom, opacity: scrollOpacity, willChange: 'opacity' }}
            />
          </>
        )}
        <About />
        <Skills />
        <Projects />
        <Footer />
      </div>
    </>
  );
}
