"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Room & Food Finder",
        subtitle: "Hyperlocal Platform for Accommodation & Daily Essentials",
        stack: ["React", "Node.js", "MongoDB", "Socket.io", "GSAP"],
        problem: "Finding reliable local accommodation and food services is often fragmented and tedious.",
        solution: "A map-centric platform enabling visual discovery and real-time provider communication.",
        results: ["Multi-role architecture (User, Provider, Admin)", "Real-time chat with Socket.io", "High-performance interactive maps"],
        link: "https://room-and-food.vercel.app/",
    },
    {
        title: "Personal Portfolio",
        subtitle: "Immersive Developer Identity",
        stack: ["Next.js 16", "React 19", "GSAP", "Lenis", "Tailwind 4"],
        problem: "Generic portfolios fail to capture unique developer personality and technical depth.",
        solution: "A high-performance, interactive experience featuring fluid animations and modern design patterns.",
        results: ["Built with Next.js 16 & React 19", "Smooth Inertia Scrolling (Lenis)", "Advanced GSAP Animations"],
        link: "https://github.com/Abhiii47/abhijeet-portfolio",
    },
    {
        title: "SmartResume",
        subtitle: "AI-Powered Resume Analyzer",
        stack: ["Python", "FastAPI", "XGBoost", "Gemini Pro", "React"],
        problem: "Job seekers struggle with ATS filters and unclear feedback.",
        solution: "Hybrid scoring engine (XGBoost + LLM) for structural & semantic analysis.",
        results: ["Trained on 50k+ resumes", "Actionable semantic feedback", "Secure OAuth2 & Encrypted Storage"],
        link: "https://smart-resume-orcin.vercel.app",
    },
    {
        title: "Price Prediction",
        subtitle: "Transformer & Ensemble Learning",
        stack: ["PyTorch", "LightGBM", "XGBoost", "Scikit-learn"],
        problem: "Real-world pricing data is noisy and high-dimensional.",
        solution: "Transformer-based regression on embeddings + Weighted Ensemble.",
        results: ["Log-scaled target optimization", "Robust against outliers", "Evaluated via SMAPE & MAE"],
        link: "https://github.com/Abhiii47/AmazonML_challange",
    },
    {
        title: "Raseed",
        subtitle: "AI Personal Financial Twin",
        stack: ["FastAPI", "React", "GCloud Vision", "SSE"],
        problem: "Manual expense tracking is tedious and decentralized.",
        solution: "OCR pipeline for physical receipts & Financial Twin dashboard.",
        results: ["Real-time SSE updates", "Automated burn rate analysis", "Async background processing"],
        link: "#",
    },
];

export default function Projects() {
    const containerRef = useRef<HTMLElement>(null);


    useGSAP(
        () => {


            // Projects Parallax / Fade
            gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="relative w-full py-32 overflow-hidden">
            {/* Wipe element (Background transition) - Making it subtle, maybe a slightly lighter bg or line */}


            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <h2 className="text-sm md:text-base text-accent font-sans tracking-widest uppercase mb-16">
                    03 / Selected Works
                </h2>

                <div className="space-y-24">
                    {projects.map((project, idx) => (
                        <div key={idx} className="project-card grid grid-cols-1 lg:grid-cols-2 gap-12">

                            {/* Project Info */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-xl text-gray-400 font-light">{project.subtitle}</p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {project.stack.map((tech) => (
                                        <span key={tech} className="px-3 py-1 text-xs border border-white/10 rounded-full text-gray-400">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <a href={project.link} className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors group">
                                    View Project <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                                </a>
                            </div>

                            {/* Case Study Details */}
                            <div className="space-y-8 border-l border-white/10 pl-8">
                                <div>
                                    <h4 className="text-sm text-gray-500 uppercase tracking-widest mb-2">The Problem</h4>
                                    <p className="text-gray-300 leading-relaxed">{project.problem}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-2">The Solution</h4>
                                    <p className="text-gray-300 leading-relaxed">{project.solution}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-2">Key Results</h4>
                                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                                        {project.results.map((res, i) => (
                                            <li key={i}>{res}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
