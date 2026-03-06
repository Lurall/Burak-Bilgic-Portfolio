"use client";

import { useEffect, useRef } from "react";

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

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        const snowflakes: Snowflake[] = [];
        let groundHeights: number[] = [];
        const BIN_WIDTH = 5;

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

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseout", handleMouseLeave);

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            groundHeights = new Array(Math.ceil(canvas.width / BIN_WIDTH)).fill(0);

            // Clean up settled snowflakes on resize so they don't float in mid-air
            for (let i = snowflakes.length - 1; i >= 0; i--) {
                if (snowflakes[i].state === 'settled') {
                    snowflakes.splice(i, 1);
                } else if (snowflakes[i].y > canvas.height) {
                    snowflakes[i].y = -10;
                }
            }
        };
        resize();
        window.addEventListener("resize", resize);

        const isMobile = window.innerWidth < 768;
        const initialSpawn = isMobile ? 34 : 120; // Reduced amount by 40%
        const targetFalling = isMobile ? 34 : 120; // Reduced amount by 40%

        // Initial spawn
        for (let i = 0; i < initialSpawn; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2.5 + 0.8,
                speed: (Math.random() * 0.4 + 0.15) * (isMobile ? 0.8 : 1), // 50% slower, 20% slower on mobile
                opacity: Math.random() * 0.5 + 0.2,
                swing: Math.random() * Math.PI * 2,
                swingSpeed: Math.random() * 0.008 + 0.003,
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
                    flake.x += Math.sin(flake.swing) * 0.4;

                    if (flake.y >= canvas.height - 2) {
                        const binIndex = Math.floor(flake.x / BIN_WIDTH);
                        let pileH = 0;
                        if (binIndex >= 0 && binIndex < groundHeights.length) {
                            pileH = groundHeights[binIndex];
                        }

                        if (flake.y >= canvas.height - pileH) {
                            // Accumulate height only if under limit
                            const maxPileHeight = isMobile ? 45 : 150; // "One finger" on mobile, taller on desktop

                            if (binIndex >= 0 && binIndex < groundHeights.length && groundHeights[binIndex] < maxPileHeight) {
                                // Add to current bin and slightly to neighbors for smoothing
                                groundHeights[binIndex] += flake.radius * 0.6;
                                if (binIndex > 0) groundHeights[binIndex - 1] += flake.radius * 0.2;
                                if (binIndex < groundHeights.length - 1) groundHeights[binIndex + 1] += flake.radius * 0.2;
                            }
                            // Remove flake from array completely - no longer rendered individually
                            snowflakes.splice(i, 1);
                            continue;
                        }
                    }
                } else if (flake.state === 'scattering') {
                    flake.x += flake.vx;
                    flake.y += flake.vy;
                    flake.vy += 0.15; // Gravity

                    if (flake.vy > 1.5) {
                        flake.state = 'falling';
                        flake.vx = 0;
                    }
                }

                // Wrap around X axis
                if (flake.x > canvas.width) flake.x = 0;
                if (flake.x < 0) flake.x = canvas.width;

                // Use fast rectangle drawing instead of expensive arc drawing
                ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
                // Render as small 2x2 or 3x3 squares (looks identical to circles on hi-dpi screens but 10x faster)
                const size = flake.radius * 2;
                ctx.fillRect(flake.x - flake.radius, flake.y - flake.radius, size, size);
            }

            // Interactive mouse scattering against the accumulated ground
            if (!isMobile && mouseX !== -1000 && mouseY !== -1000 && mouseY > canvas.height - 100) {
                const centerBin = Math.floor(mouseX / BIN_WIDTH);
                const scatterRadius = 15; // Bins

                for (let i = Math.max(0, centerBin - scatterRadius); i < Math.min(groundHeights.length, centerBin + scatterRadius); i++) {
                    const distBins = Math.abs(i - centerBin);
                    const effect = (scatterRadius - distBins) / scatterRadius;

                    if (groundHeights[i] > 0 && effect > 0) {
                        // Throw some snow back up
                        if (Math.random() < 0.1 * effect) {
                            snowflakes.push({
                                x: i * BIN_WIDTH,
                                y: canvas.height - groundHeights[i],
                                radius: Math.random() * 2 + 1,
                                speed: (Math.random() * 0.4 + 0.15) * (isMobile ? 0.8 : 1), // 50% slower
                                opacity: Math.random() * 0.5 + 0.2,
                                swing: 0,
                                swingSpeed: 0,
                                state: 'scattering',
                                vx: (Math.random() - 0.5) * 6 * effect,
                                vy: -Math.random() * 6 - 2,
                            });
                        }
                        // Erode ground
                        groundHeights[i] = Math.max(0, groundHeights[i] - 2 * effect);
                    }
                }
            }

            // Draw the accumulated ground as a single continuous polygon
            ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);
            for (let i = 0; i < groundHeights.length; i++) {
                ctx.lineTo(i * BIN_WIDTH, canvas.height - groundHeights[i]);
            }
            ctx.lineTo(canvas.width, canvas.height);
            ctx.fill();

            // Always maintain fresh falling snowflakes
            if (freshFallingCount < targetFalling) {
                const toSpawn = Math.min(5, targetFalling - freshFallingCount);
                for (let i = 0; i < toSpawn; i++) {
                    snowflakes.push({
                        x: Math.random() * canvas.width,
                        y: -10,
                        radius: Math.random() * 2.5 + 0.8,
                        speed: (Math.random() * 0.5 + 0.2) * (isMobile ? 0.8 : 1), // 50% slower, 20% slower on mobile
                        opacity: Math.random() * 0.5 + 0.2,
                        swing: Math.random() * Math.PI * 2,
                        swingSpeed: Math.random() * 0.008 + 0.003,
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
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 50 }}
        />
    );
}
