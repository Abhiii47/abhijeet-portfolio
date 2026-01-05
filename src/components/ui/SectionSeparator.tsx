"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface SectionSeparatorProps {
    label?: string;
}

export default function SectionSeparator({ label }: SectionSeparatorProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineLeftRef = useRef<HTMLDivElement>(null);
    const lineRightRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Lines expand
        gsap.to([lineLeftRef.current, lineRightRef.current], {
            scaleX: 1,
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                once: true
            }
        });

        // Pop the center element
        gsap.fromTo(centerRef.current,
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    once: true
                }
            }
        );



    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full flex items-center justify-center py-16 opacity-50">

            {/* Left Line */}
            <div ref={lineLeftRef} className="h-[2px] w-full max-w-sm bg-gradient-to-r from-transparent to-white origin-right scale-x-0" />

            {/* Center Checkpoint Node */}
            <div ref={centerRef} className="mx-4 flex flex-col items-center">
                <div
                    ref={iconRef}
                    className="relative flex items-center justify-center w-8 h-8 border-2 border-white rounded-full bg-black transition-colors"
                >
                    <Plus className="w-4 h-4 text-accent" />
                    <div className="absolute inset-0 border border-white rounded-full animate-ping opacity-20" />
                </div>
                {label && (
                    <span className="absolute mt-10 text-[9px] tracking-[0.3em] text-gray-500 font-mono uppercase">
                        {label}
                    </span>
                )}
            </div>

            {/* Right Line */}
            <div ref={lineRightRef} className="h-[2px] w-full max-w-sm bg-gradient-to-l from-transparent to-white origin-left scale-x-0" />

        </div>
    );
}
