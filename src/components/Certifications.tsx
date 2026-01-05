"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const certs = [
    "Microsoft Fabric Analytics Engineer (DP-600)",
    "Amazon ML Summer School (Top 0.1%)",
    "Design Patent: Smart Inventory System",
    "Intellectual Property: Design No. 458179-001"
];

export default function Certifications() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".cert-item", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
            });
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="w-full py-32 px-6 md:px-12 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-sm md:text-base text-accent font-sans tracking-widest uppercase mb-12">
                    05 / Achievements
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certs.map((cert, idx) => (
                        <div
                            key={idx}
                            className="cert-item group p-8 border border-white/5 bg-white/5 backdrop-blur-sm rounded hover:bg-white/10 transition-colors duration-300 flex items-start gap-4"
                        >
                            <Award className="w-6 h-6 text-gray-500 group-hover:text-accent transition-colors shrink-0" />
                            <span className="text-gray-300 font-light group-hover:text-white transition-colors">
                                {cert}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
