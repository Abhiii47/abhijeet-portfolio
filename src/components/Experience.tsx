"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiencePoints = [
    {
        year: "2025",
        title: "Amazon ML Summer School",
        role: "Machine Learning Trainee",
        desc: "Selected for Amazon's competitive program. Studied industry-scale ML systems, recommendation engines, and decision automation. Strengthened fundamentals in Deep Learning and Generative AI.",
    },
    {
        year: "2022-26",
        title: "Sanjivani College of Engineering",
        role: "B.Tech Computer Engineering",
        desc: "Focused on Applied Data Science and System Design. Built foundation in C++, Python, and Scalable Backend Architecture.",
    },
];

export default function Experience() {
    const containerRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Draw Timeline
            gsap.fromTo(
                lineRef.current,
                { scaleY: 0, transformOrigin: "top" },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 1,
                    },
                    scaleY: 1,
                    ease: "none",
                }
            );

            // Cards Snap In
            gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                    x: -50,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out", // "Precise, not bouncy"
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="relative w-full py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto relative">
                <h2 className="text-sm md:text-base text-accent font-sans tracking-widest uppercase mb-16">
                    04 / Experience & Hackathons
                </h2>

                {/* Timeline Line */}
                <div
                    ref={lineRef}
                    className="absolute left-0 top-20 bottom-0 w-[1px] bg-white/20 origin-top"
                ></div>

                <div className="space-y-16">
                    {experiencePoints.map((exp, idx) => (
                        <div key={idx} className="exp-card relative pl-12 grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4 md:gap-12">
                            {/* Dot */}
                            <div className="absolute left-[-5px] top-2 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(132,204,22,0.5)]"></div>

                            <div className="text-gray-500 font-serif text-lg">{exp.year}</div>

                            <div>
                                <h3 className="text-2xl font-serif text-foreground mb-1">{exp.title}</h3>
                                <h4 className="text-sm text-accent uppercase tracking-wide mb-4">{exp.role}</h4>
                                <p className="text-gray-400 leading-relaxed font-light">{exp.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
