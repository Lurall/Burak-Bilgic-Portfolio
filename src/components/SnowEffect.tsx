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
        };
        resize();
        window.addEventListener("resize", resize);

        // Initial spawn
        for (let i = 0; i < 70; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2.5 + 0.8,
                speed: Math.random() * 0.8 + 0.3,
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
            let settledCount = 0;

            snowflakes.forEach((flake) => {
                if (flake.state === 'falling') {
                    // Only count flakes in the upper 80% as "fresh" falling snow
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
                            flake.state = 'settled';
                            flake.y = canvas.height - pileH;
                            if (binIndex >= 0 && binIndex < groundHeights.length) {
                                groundHeights[binIndex] += flake.radius * 0.4; // Pile grows
                            }
                        }
                    }
                } else if (flake.state === 'settled') {
                    settledCount++;
                    const dist = Math.hypot(flake.x - mouseX, flake.y - mouseY);
                    if (dist < 100) { // Mouse interaction radius
                        flake.state = 'scattering';
                        const angle = Math.atan2(flake.y - mouseY, flake.x - mouseX);
                        const force = (100 - dist) / 100;

                        // Scatter out and up
                        flake.vx = Math.cos(angle) * force * 8 + (Math.random() - 0.5) * 4;
                        flake.vy = Math.sin(angle) * force * 8 - Math.random() * 5 - 4;

                        // Reduce the ground pile
                        const binIndex = Math.floor(flake.x / BIN_WIDTH);
                        if (binIndex >= 0 && binIndex < groundHeights.length) {
                            groundHeights[binIndex] = Math.max(0, groundHeights[binIndex] - flake.radius * 0.4);
                        }
                    }
                } else if (flake.state === 'scattering') {
                    flake.x += flake.vx;
                    flake.y += flake.vy;
                    flake.vy += 0.15; // Gravity

                    // Allow them to bounce around a bit before transitioning back to falling
                    if (flake.vy > 1.5) { // When gravity pulls them back down strongly enough
                        flake.state = 'falling';
                        flake.vx = 0; // Reset horizontal burst velocity
                        // Keep their opacity and radius the same, just return them to the normal snow cycle
                    }
                }

                // Wrap around X axis
                if (flake.x > canvas.width) flake.x = 0;
                if (flake.x < 0) flake.x = canvas.width;

                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
                ctx.fill();
            });

            // Cap the total settled flakes to avoid performance issues
            while (settledCount > 1000) {
                const idx = snowflakes.findIndex(f => f.state === 'settled');
                if (idx !== -1) {
                    const f = snowflakes[idx];
                    const binIndex = Math.floor(f.x / BIN_WIDTH);
                    if (binIndex >= 0 && binIndex < groundHeights.length) {
                        groundHeights[binIndex] = Math.max(0, groundHeights[binIndex] - f.radius * 0.4);
                    }
                    snowflakes.splice(idx, 1);
                    settledCount--;
                } else {
                    break;
                }
            }

            // Always maintain fresh falling snowflakes from the top
            if (freshFallingCount < 80) {
                const toSpawn = Math.min(3, 80 - freshFallingCount);
                for (let i = 0; i < toSpawn; i++) {
                    snowflakes.push({
                        x: Math.random() * canvas.width,
                        y: -10,
                        radius: Math.random() * 2.5 + 0.8,
                        speed: Math.random() * 1.0 + 0.4,
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
