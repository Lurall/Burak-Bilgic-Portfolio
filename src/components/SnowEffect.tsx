"use client";

import { useEffect, useRef, useState } from "react";

interface Snowflake {
    x: number;
    y: number;
    radius: number;
    speed: number;
    opacity: number;
    swing: number;
    swingSpeed: number;
    state: 'falling' | 'settled' | 'scattering';
    vx: number;
    vy: number;
}

export default function SnowEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    useEffect(() => {
        // Check for reduced motion / power saving OS settings
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setIsReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setIsReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        // If reduced motion or power saving implies no background animations, return early
        if (isReducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationId: number;
        const snowflakes: Snowflake[] = [];
        let groundHeights: number[] = [];
        let BIN_WIDTH = 5;

        let mouseX = -1000;
        let mouseY = -1000;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseout", handleMouseLeave, { passive: true });

        let isMobile = window.innerWidth < 768;
        let targetFalling = isMobile ? 25 : 120; // Further reduced for mobile

        // --- CANVAS DOWNSCALING FOR MOBILE ---
        // By reducing the internal resolution of the canvas on mobile, 
        // we drastically cut down GPU pixel fill rate requirements.
        const scaleFactor = isMobile ? 0.5 : 1;

        const resize = () => {
            // Set physical CSS size
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            // Set internal render resolution
            canvas.width = window.innerWidth * scaleFactor;
            canvas.height = window.innerHeight * scaleFactor;

            // Adjust bin width based on scale to keep physical size similar
            BIN_WIDTH = 5 * scaleFactor;

            groundHeights = new Array(Math.ceil(canvas.width / BIN_WIDTH)).fill(0);

            isMobile = window.innerWidth < 768;
            targetFalling = isMobile ? 25 : 120;

            // Clean up settled snowflakes on resize
            for (let i = snowflakes.length - 1; i >= 0; i--) {
                if (snowflakes[i].state === 'settled') {
                    snowflakes.splice(i, 1);
                } else if (snowflakes[i].y > canvas.height) {
                    snowflakes[i].y = -10;
                }
            }
        };
        resize();
        window.addEventListener("resize", resize, { passive: true });

        const initialSpawn = isMobile ? 25 : 120;

        // Initial spawn
        for (let i = 0; i < initialSpawn; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: (Math.random() * 2.5 + 0.8) * scaleFactor,
                speed: (Math.random() * 0.10 + 0.04) * scaleFactor,
                opacity: Math.random() * 0.5 + 0.2,
                swing: Math.random() * Math.PI * 2,
                swingSpeed: Math.random() * 0.002 + 0.0005,
                state: 'falling',
                vx: 0,
                vy: 0,
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let freshFallingCount = 0;

            // Update and draw active flakes
            for (let i = snowflakes.length - 1; i >= 0; i--) {
                const flake = snowflakes[i];
                if (flake.state === 'falling') {
                    if (flake.y < canvas.height * 0.8) {
                        freshFallingCount++;
                    }
                    flake.y += flake.speed;
                    flake.swing += flake.swingSpeed;
                    flake.x += Math.sin(flake.swing) * 0.05 * scaleFactor;

                    if (flake.y >= canvas.height - 2) {
                        const binIndex = Math.floor(flake.x / BIN_WIDTH);
                        let pileH = 0;
                        if (binIndex >= 0 && binIndex < groundHeights.length) {
                            pileH = groundHeights[binIndex];
                        }

                        if (flake.y >= canvas.height - pileH) {
                            const maxPileHeight = (isMobile ? 30 : 150) * scaleFactor;

                            if (binIndex >= 0 && binIndex < groundHeights.length && groundHeights[binIndex] < maxPileHeight) {
                                groundHeights[binIndex] += flake.radius * 0.6;
                                if (binIndex > 0) groundHeights[binIndex - 1] += flake.radius * 0.2;
                                if (binIndex < groundHeights.length - 1) groundHeights[binIndex + 1] += flake.radius * 0.2;
                            }
                            snowflakes.splice(i, 1);
                            continue;
                        }
                    }
                } else if (!isMobile && flake.state === 'scattering') {
                    flake.x += flake.vx;
                    flake.y += flake.vy;
                    flake.vy += 0.15 * scaleFactor; // Gravity

                    if (flake.vy > 1.5 * scaleFactor) {
                        flake.state = 'falling';
                        flake.vx = 0;
                    }
                }

                // Wrap around X axis
                if (flake.x > canvas.width) flake.x = 0;
                if (flake.x < 0) flake.x = canvas.width;

                ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
                if (isMobile) {
                    // Mobile: Fast rectangle drawing, radius already scaled
                    const size = flake.radius * 2;
                    ctx.fillRect(flake.x - flake.radius, flake.y - flake.radius, size, size);
                } else {
                    ctx.beginPath();
                    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Interactive mouse scattering
            if (!isMobile && mouseX !== -1000 && mouseY !== -1000 && mouseY > (canvas.height / scaleFactor) - 100) {
                const scaledMouseX = mouseX * scaleFactor;
                const centerBin = Math.floor(scaledMouseX / BIN_WIDTH);
                const scatterRadius = 15; // Bins

                for (let i = Math.max(0, centerBin - scatterRadius); i < Math.min(groundHeights.length, centerBin + scatterRadius); i++) {
                    const distBins = Math.abs(i - centerBin);
                    const effect = (scatterRadius - distBins) / scatterRadius;

                    if (groundHeights[i] > 0 && effect > 0) {
                        if (Math.random() < 0.1 * effect) {
                            snowflakes.push({
                                x: i * BIN_WIDTH,
                                y: canvas.height - groundHeights[i],
                                radius: (Math.random() * 2 + 1) * scaleFactor,
                                speed: (Math.random() * 0.10 + 0.04) * scaleFactor,
                                opacity: Math.random() * 0.5 + 0.2,
                                swing: 0,
                                swingSpeed: 0,
                                state: 'scattering',
                                vx: (Math.random() - 0.5) * 4 * effect * scaleFactor,
                                vy: (-Math.random() * 4 - 1) * scaleFactor,
                            });
                        }
                        groundHeights[i] = Math.max(0, groundHeights[i] - 2 * effect * scaleFactor);
                    }
                }
            }

            // Draw accumulated ground
            ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);
            for (let i = 0; i < groundHeights.length; i++) {
                ctx.lineTo(i * BIN_WIDTH, canvas.height - groundHeights[i]);
            }
            ctx.lineTo(canvas.width, canvas.height);
            ctx.fill();

            // Maintain falling count
            if (freshFallingCount < targetFalling) {
                const toSpawn = Math.min(isMobile ? 2 : 5, targetFalling - freshFallingCount);
                for (let i = 0; i < toSpawn; i++) {
                    snowflakes.push({
                        x: Math.random() * canvas.width,
                        y: -10,
                        radius: (Math.random() * 2.5 + 0.8) * scaleFactor,
                        speed: (Math.random() * 0.12 + 0.05) * scaleFactor,
                        opacity: Math.random() * 0.5 + 0.2,
                        swing: Math.random() * Math.PI * 2,
                        swingSpeed: Math.random() * 0.002 + 0.0005,
                        state: 'falling',
                        vx: 0,
                        vy: 0,
                    });
                }
            }

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseout", handleMouseLeave);
            cancelAnimationFrame(animationId);
        };
    }, [isReducedMotion]);

    if (isReducedMotion) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{
                zIndex: 50,
                width: '100vw',
                height: '100vh',
                // Optional: image-rendering helps if downscaling looks too soft
                imageRendering: 'crisp-edges'
            }}
        />
    );
}
