"use client";

import { useRef } from "react";
import SystemDeck from "./SystemDeck";

export default function SkillStack() {
    const containerRef = useRef<HTMLElement>(null);

    return (
        <section
            ref={containerRef}
            className="w-full px-6 py-24 md:px-12 bg-black/20"
        >
            <div className="max-w-7xl mx-auto">
                <h2 className="text-sm md:text-base text-accent font-sans tracking-widest uppercase mb-16">
                    02 / System Control Deck
                </h2>

                {/* Replaced the static grid with the interactive deck */}
                <SystemDeck />

            </div>
        </section>
    );
}
