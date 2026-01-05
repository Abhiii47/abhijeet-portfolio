"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

export default function Entry() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const subTextRef = useRef<HTMLParagraphElement>(null);
    const softDevRef = useRef<HTMLHeadingElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Playful Scramble Effect Hook
    const useScramble = (targetHeader: string) => {
        // ... hook implementation same ...
        const [text, setText] = useState(targetHeader);
        const intervalRef = useRef<NodeJS.Timeout | null>(null);

        const scramble = () => {
            let pos = 0;
            clearInterval(intervalRef.current!);

            intervalRef.current = setInterval(() => {
                const scrambled = targetHeader.split("").map((char, index) => {
                    if (index < pos) {
                        return targetHeader[index];
                    }
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join("");

                setText(scrambled);
                pos += 1 / 3;

                if (pos > targetHeader.length) {
                    clearInterval(intervalRef.current!);
                }
            }, 30);
        };

        return { text, scramble };
    };

    const { text: nameText, scramble: scrambleName } = useScramble("ABHIJEET KADU");

    useGSAP(
        () => {
            const tl = gsap.timeline();

            // Initial state
            gsap.set(textRef.current, { filter: "blur(10px)", opacity: 0, y: 20 });
            gsap.set(nameRef.current, { opacity: 0, scale: 0.9 });
            gsap.set(softDevRef.current, { opacity: 0, y: 20 });
            gsap.set(lineRef.current, { scaleX: 0, opacity: 0 });
            gsap.set(subTextRef.current, { opacity: 0, y: 10 });
            gsap.set(scrollRef.current, { opacity: 0 });

            // Cinematic Entry Sequence
            tl.to(textRef.current, {
                duration: 1.5,
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
                ease: "power3.out",
            })
                .to(nameRef.current, {
                    duration: 0.5,
                    opacity: 1,
                    scale: 1,
                    ease: "back.out(1.7)",
                    onStart: scrambleName // Trigger scramble on reveal
                }, "-=0.5")
                .to(softDevRef.current, { // NEW: Software Dev Text
                    duration: 0.8,
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                }, "-=0.2")
                .to(lineRef.current, { // NEW: Line
                    duration: 0.8,
                    scaleX: 1,
                    opacity: 1,
                    ease: "power2.inOut",
                }, "-=0.6")
                .to(
                    subTextRef.current,
                    {
                        duration: 1,
                        opacity: 0.8,
                        y: 0,
                        ease: "power2.out",
                    },
                    "-=0.4"
                )
                .to(
                    scrollRef.current,
                    {
                        duration: 1,
                        opacity: 0.5,
                        ease: "power2.out",
                    },
                    "-=0.5"
                );
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            <div className="text-center z-10 px-4">
                <p
                    ref={textRef}
                    className="text-sm md:text-xl text-gray-400 font-serif italic mb-4"
                >
                    Hello, I am
                </p>

                <h1
                    ref={nameRef}
                    onMouseEnter={scrambleName}
                    className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 mix-blend-difference cursor-pointer"
                >
                    {nameText}
                </h1>

                <h2
                    ref={softDevRef}
                    className="text-lg md:text-2xl text-gray-400 font-mono tracking-widest uppercase mb-6"
                >
                    SOFTWARE DEVELOPER
                </h2>

                <div
                    ref={lineRef}
                    className="h-[1px] w-24 bg-accent mb-8 mx-auto"
                />
                <p
                    ref={subTextRef}
                    className="text-base md:text-lg text-accent font-sans tracking-widest uppercase"
                >
                    AI / ML Engineer &middot; Applied Data Science
                </p>
            </div>

            {/* Scroll Indicator */}
            <div
                ref={scrollRef}
                className="absolute bottom-12 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-widest text-gray-500">
                    Scroll
                </span>
                <ArrowDown className="w-4 h-4 text-accent animate-bounce" />
            </div>
        </section>
    );
}
