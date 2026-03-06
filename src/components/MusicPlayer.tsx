"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { FaSnowflake, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const hasStartedRef = useRef(false);
    const [volume, setVolume] = useState(0.05);
    const prevVolumeRef = useRef(0.05);
    const [showVolume, setShowVolume] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
            // Blocked by browser - wait for ANY valid user interaction
            const events = ["click", "touchstart", "keydown", "pointerdown"];
            const startOnInteraction = () => {
                if (!hasStartedRef.current && audioRef.current) {
                    audioRef.current.play().then(() => {
                        hasStartedRef.current = true;
                        events.forEach(e => document.removeEventListener(e, startOnInteraction));
                    }).catch(() => {
                        // Playback prevented, keep waiting for a valid interaction
                    });
                }
            };
            events.forEach(e => document.addEventListener(e, startOnInteraction));
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
        if (v > 0) prevVolumeRef.current = v;
        if (audioRef.current) audioRef.current.volume = v;
    };

    const toggleMute = () => {
        if (volume === 0) {
            const restoredVolume = prevVolumeRef.current > 0 ? prevVolumeRef.current : 0.05;
            setVolume(restoredVolume);
            if (audioRef.current) {
                audioRef.current.volume = restoredVolume;
                if (!hasStartedRef.current) tryPlay();
            }
        } else {
            if (volume > 0) prevVolumeRef.current = volume;
            setVolume(0);
            if (audioRef.current) audioRef.current.volume = 0;
        }
    };

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setShowVolume(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowVolume(false);
        }, 1500); // 1.5 saniyelik bir gecikme ekliyoruz, 3 çok uzun gelebilir.
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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

            <div
                className={`absolute top-full mt-2 right-0 p-4 rounded-xl shadow-lg flex items-center gap-3 transition-all duration-300 ease-in-out ${showVolume ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                style={{
                    background: "rgba(20, 30, 60, 0.8)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
                    pointerEvents: showVolume ? "auto" : "none"
                }}
            >
                <FaSnowflake
                    size={22}
                    style={{
                        animation: volume > 0 ? "spin 10s linear infinite" : "none",
                        opacity: volume === 0 ? 0.3 : 1,
                        color: "#ffffff",
                        filter: volume > 0 ? "drop-shadow(0 0 8px rgba(255,255,255,0.8))" : "none"
                    }}
                />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolume}
                    className="w-28 h-2 cursor-pointer"
                    style={{ accentColor: "#ffffff", direction: "ltr" }}
                />
            </div>
        </div>
    );
}
