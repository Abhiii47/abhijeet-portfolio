"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

export default function HUDOverlay() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".hud-text", {
            opacity: 0,
            duration: 2,
            delay: 1,
            stagger: 0.2,
            ease: "power2.out"
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50 p-6 flex flex-col justify-between hidden md:flex">
            {/* Top Left */}
            <div className="hud-text text-[10px] text-gray-500 font-mono tracking-widest uppercase flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                SYS.ONLINE
            </div>

            {/* Top Right */}
            <div className="hud-text text-[10px] text-gray-500 font-mono tracking-widest uppercase text-right">
                20°41'N 74°02'E
                <br />
                AI/ML ENGINEER
            </div>

            {/* Bottom Left */}
            <div className="hud-text text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                © 2026 ABHIJEET KADU
            </div>

            {/* Bottom Right */}
            <div className="hud-text text-[10px] text-gray-500 font-mono tracking-widest uppercase text-right">
                SCROLL VELOCITY: <span className="text-accent">NORMAL</span>
            </div>
        </div>
    );
}
