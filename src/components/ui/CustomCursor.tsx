"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Move cursor logic
        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out",
            });
            gsap.to(followerRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", moveCursor);

        // Hover effects
        const handleMouseEnter = () => {
            gsap.to(cursorRef.current, { scale: 0, duration: 0.2 });
            gsap.to(followerRef.current, {
                scale: 3,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(190, 242, 100, 0.5)", // Accent color mix
                duration: 0.2
            });
        };

        const handleMouseLeave = () => {
            gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
            gsap.to(followerRef.current, {
                scale: 1,
                backgroundColor: "transparent",
                borderColor: "rgba(255, 255, 255, 0.5)",
                duration: 0.2
            });
        };

        // Attach listeners to interactive elements
        const interactiveElements = document.querySelectorAll("a, button, .cursor-pointer");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        // Clean up
        return () => {
            window.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, { scope: cursorRef }); // Scope mainly for cleanup safety, though refs are global here

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-colors duration-200"
            />
        </>
    );
}
