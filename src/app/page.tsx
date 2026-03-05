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

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Background color transition: #6facfc (blue sky) → warm orange sunset
  // #6facfc = rgb(111, 172, 252)
  // orange sunset = rgb(235, 140, 60) → more orange, less red
  const bgR = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [111, 170, 220, 235]);
  const bgG = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [172, 145, 120, 140]);
  const bgB = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [252, 190, 110, 60]);
  const bgColor = useMotionTemplate`rgb(${bgR}, ${bgG}, ${bgB})`;

  // Content sections get semi-transparent bg so mountains show through with blur
  const contentBgR = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [111, 170, 220, 235]);
  const contentBgG = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [172, 145, 120, 140]);
  const contentBgB = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [252, 190, 110, 60]);
  const contentBgColor = useMotionTemplate`rgba(${contentBgR}, ${contentBgG}, ${contentBgB}, 0.85)`;

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
