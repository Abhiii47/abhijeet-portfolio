"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Code2, Cpu } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            // Reveal Text
            gsap.from(".about-text", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                },
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
            });

            // ID Card Slide In
            gsap.from(".id-card", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                },
                x: 50,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                delay: 0.2
            });

            // Metrics pop in
            gsap.from(".metric-item", {
                scrollTrigger: {
                    trigger: ".metrics-grid",
                    start: "top 85%",
                },
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.7)"
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="w-full min-h-screen px-6 py-24 md:px-12 flex flex-col justify-center relative"
        >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Column: Editorial Text + Metrics */}
                <div className="space-y-10">
                    <h2 className="text-sm md:text-base text-accent font-sans tracking-widest uppercase mb-16 about-text">
                        01 / About Me
                    </h2>

                    <div className="space-y-6 text-lg md:text-2xl font-serif leading-relaxed text-gray-300">
                        <p className="about-text">
                            <span className="text-white font-semibold">AI/ML-focused</span> Computer Engineering student with hands-on experience building end-to-end machine learning systems.
                        </p>
                        <p className="about-text">
                            Specializing in <span className="text-white border-b border-accent/50">Transformer-based models</span>, ensemble learning, and production-ready service pipelines using FastAPI and Cloud infrastructure.
                        </p>
                        <p className="about-text">
                            Selected for <span className="text-white bg-white/10 px-1 rounded">Amazon ML Summer School</span> (Top 0.1%), I bridge the gap between complex research models and scalable industry applications.
                        </p>
                    </div>

                    {/* Visual Metrics Grid */}
                    <div className="metrics-grid grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                        <div className="metric-item p-4 bg-white/5 rounded-lg border border-white/5 hover:border-accent/30 transition-colors">
                            <Trophy className="w-5 h-5 text-accent mb-2" />
                            <p className="text-2xl font-bold text-white">Top 0.1%</p>
                            <p className="text-[10px] uppercase tracking-wider text-gray-500">Talent Pool</p>
                        </div>
                        <div className="metric-item p-4 bg-white/5 rounded-lg border border-white/5 hover:border-accent/30 transition-colors">
                            <Code2 className="w-5 h-5 text-accent mb-2" />
                            <p className="text-2xl font-bold text-white">50k+</p>
                            <p className="text-[10px] uppercase tracking-wider text-gray-500">Resumes Analyzed</p>
                        </div>
                        <div className="metric-item p-4 bg-white/5 rounded-lg border border-white/5 hover:border-accent/30 transition-colors">
                            <Cpu className="w-5 h-5 text-accent mb-2" />
                            <p className="text-2xl font-bold text-white">3+</p>
                            <p className="text-[10px] uppercase tracking-wider text-gray-500">AI Models</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Digital ID Card */}
                <div className="hidden lg:flex justify-end perspective-1000 z-50">
                    <div className="id-card w-80 h-[450px] relative transition-all duration-700 transform-style-3d group hover:rotate-y-180">

                        {/* FRONT FACE (Data) */}
                        <div className="absolute inset-0 backface-hidden bg-black/90 border border-white/10 rounded-xl p-6 overflow-hidden backdrop-blur-md">

                            {/* ID Header */}
                            <div className="flex justify-between items-start mb-8">
                                {/* Profile Image - Larger & Styled */}
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-white/20">
                                    <Image
                                        src="/profile.jpg"
                                        alt="Profile"
                                        fill
                                        className="object-cover grayscale"
                                    />
                                    {/* Scanline overlay on image */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-50 animate-scan-fast" />
                                </div>

                                <div className="text-right">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">ID VERIFIED</p>
                                    <p className="text-accent font-mono text-xl font-bold">#ABHI-01</p>
                                    <div className="flex items-center justify-end gap-1 mt-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] text-green-500 font-mono">ACTIVE</span>
                                    </div>
                                </div>
                            </div>

                            {/* Vertical Data Lines */}
                            <div className="space-y-4 font-mono text-sm text-gray-400">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>CLASS</span>
                                    <span className="text-white">COMPUTER ENGINEER</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>FOCUS</span>
                                    <span className="text-white">AI / ML SDE</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>ORIGIN</span>
                                    <span className="text-white">IND (20°N 74°E)</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>STATUS</span>
                                    <span className="text-emerald-400 animate-pulse">AVAILABLE</span>
                                </div>
                            </div>

                            {/* Bottom BarCode / Deco */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="h-8 w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,white_2px,white_4px)] opacity-20" />
                                <p className="text-[9px] text-gray-600 mt-2 text-center tracking-[0.2em] uppercase">Authorized Personnel Only</p>
                            </div>

                            {/* Hover Glow (Front) */}
                            <div className="absolute top-0 -right-full w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:translate-x-[-200%] transition-transform duration-1000" />
                        </div>

                        {/* BACK FACE (Full Image) */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden border border-accent/20 bg-black">
                            <Image
                                src="/profile-full.png"
                                alt="Full Profile"
                                fill
                                className="object-cover"
                            />
                            {/* Overlay Gradient for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                            {/* Back Content */}
                            <div className="absolute bottom-6 left-6 right-6 text-center">
                                <p className="text-accent font-bold font-mono text-xl tracking-widest">ABHIJEET KADU</p>
                                <p className="text-white/60 text-xs tracking-[0.3em] uppercase mt-2">System Admin</p>
                            </div>

                            {/* Holographic Sheen */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
