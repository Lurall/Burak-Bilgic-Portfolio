"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const hasStartedRef = useRef(false);
    const [volume, setVolume] = useState(0.05);
    const [showVolume, setShowVolume] = useState(false);

    const tryPlay = useCallback(() => {
        if (hasStartedRef.current) return;
        if (audioRef.current) {
            audioRef.current.play().then(() => {
                hasStartedRef.current = true;
            }).catch(() => { });
        }
    }, []);

    useEffect(() => {
        const audio = new Audio("/audio/lofi.mp3");
        audio.loop = true;
        audio.volume = volume;
        audioRef.current = audio;

        // Try to auto-play immediately
        audio.play().then(() => {
            hasStartedRef.current = true;
        }).catch(() => {
            // Blocked by browser - wait for ANY user interaction
            const events = ["click", "touchstart", "scroll", "keydown", "mousemove"];
            const startOnInteraction = () => {
                if (!hasStartedRef.current && audioRef.current) {
                    audioRef.current.play().then(() => {
                        hasStartedRef.current = true;
                    }).catch(() => { });
                }
                events.forEach(e => document.removeEventListener(e, startOnInteraction));
            };
            events.forEach(e => document.addEventListener(e, startOnInteraction, { once: true }));
        });

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = parseFloat(e.target.value);
        setVolume(v);
        if (audioRef.current) audioRef.current.volume = v;
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(0.05);
            if (audioRef.current) {
                audioRef.current.volume = 0.05;
                if (!hasStartedRef.current) tryPlay();
            }
        } else {
            setVolume(0);
            if (audioRef.current) audioRef.current.volume = 0;
        }
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
        >
            <button
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                style={{
                    background: volume === 0 ? "var(--surface-glass)" : "var(--accent)",
                    color: volume === 0 ? "var(--text)" : "#1a1a2e",
                    border: volume === 0 ? "1px solid var(--border)" : "none",
                    boxShadow: volume > 0 ? "0 0 15px var(--accent-dim)" : "none",
                }}
                onClick={toggleMute}
                aria-label="Ses Kontrolü"
            >
                {volume === 0 ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
            </button>

            {showVolume && (
                <div
                    className="absolute top-full mt-2 right-0 p-3 rounded-xl shadow-lg"
                    style={{
                        background: "rgba(30, 40, 80, 0.9)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid var(--border)",
                    }}
                >
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolume}
                        className="w-20"
                        style={{ accentColor: "#ffd700", direction: "ltr" }}
                    />
                </div>
            )}
        </div>
    );
}
