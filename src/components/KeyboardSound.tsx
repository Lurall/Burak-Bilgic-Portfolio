"use client";

import { useEffect, useRef } from "react";

export default function KeyboardSound() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio("/audio/creamy-switch.mp3");
        audioRef.current.volume = 0.3;

        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            const isInput =
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable;

            if (isInput && audioRef.current) {
                const sound = audioRef.current.cloneNode() as HTMLAudioElement;
                sound.volume = 0.054;
                sound.play().catch(() => { });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return null;
}
