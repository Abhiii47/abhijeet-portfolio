"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type ModuleData = {
    id: string;
    label: string;
    status: "active" | "standby" | "warning";
    desc: string;
    color: string; 
};

const modules: ModuleData[] = [
    // ROW 1: CORE
    { id: "Py", label: "PYTHON", status: "active", desc: "Core Language. Data Science Stack.", color: "#3b82f6" }, 
    { id: "Sql", label: "SQL", status: "active", desc: "Complex Querying. Database Management.", color: "#f97316" }, 
    { id: "Dsa", label: "DSA", status: "active", desc: "Algorithmic Efficiency. Optimization.", color: "#8b5cf6" },
    { id: "Cpp", label: "C++", status: "active", desc: "Low-level Systems. Memory Mgmt.", color: "#60a5fa" }, 
    { id: "Git", label: "GIT", status: "active", desc: "Version Control. CI/CD Workflows.", color: "#f43f5e" }, 

    // ROW 2: ML
    { id: "Ml", label: "ML", status: "active", desc: "Predictive Modeling. Feature Eng.", color: "#10b981" }, 
    { id: "Reg", label: "REGRESSION", status: "active", desc: "Linear/Logistic. Trend Analysis.", color: "#14b8a6" }, 
    { id: "Clf", label: "CLASSIFY", status: "active", desc: "Decision Trees. SVM. Random Forest.", color: "#06b6d4" }, 
    { id: "Pt", label: "PYTORCH", status: "active", desc: "Deep Learning. Neural Networks.", color: "#ef4444" }, 
    { id: "Nlp", label: "NLP", status: "active", desc: "Text Processing. Tokenization. Spacy.", color: "#d946ef" }, 

    // ROW 3: DATA
    { id: "Pd", label: "PANDAS", status: "active", desc: "Data Manipulation. Analysis.", color: "#150458" }, 
    { id: "Np", label: "NUMPY", status: "active", desc: "Numerical Computing. Matrix Ops.", color: "#38bdf8" }, 
    { id: "Pbi", label: "POWER BI", status: "active", desc: "Visual Analytics. Business Intel.", color: "#eab308" }, 
    { id: "Da", label: "DATA ANALYSIS", status: "active", desc: "EDA. Statistical Inference.", color: "#a855f7" }, 
    { id: "Skl", label: "SKI-LEARN", status: "active", desc: "Classic ML Algorithms. Tools.", color: "#f97316" }, 

    // ROW 4: BACKEND / CLOUD
    { id: "Api", label: "FASTAPI", status: "active", desc: "High-perf Async APIs. Swagger.", color: "#009688" }, 
    { id: "Rst", label: "REST API", status: "active", desc: "Standard Protocol. Integration.", color: "#64748b" }, 
    { id: "Gcp", label: "G-CLOUD", status: "active", desc: "Vertex AI. Cloud Functions.", color: "#4285F4" }, 
    { id: "Fab", label: "MS FABRIC", status: "active", desc: "Big Data Analytics. Data Lake.", color: "#00a4ef" }, 
    { id: "Dp", label: "DP-600", status: "active", desc: "Fabric Analytics Engineer Cert.", color: "#ffd700" }, 

    // ROW 5: ADVANCED 
    { id: "Gai", label: "GEN AI", status: "active", desc: "LLMs. RAG. Prompt Engineering.", color: "#a855f7" }, 
    { id: "Rl", label: "RL", status: "standby", desc: "Reinforcement Learning. Agents.", color: "#ec4899" }, 
    { id: "Etl", label: "ETL", status: "active", desc: "Extract Transform Load Pipelines.", color: "#84cc16" }, 
    { id: "Pg", label: "POSTGRESS", status: "active", desc: "Adv Relational DB. Extensions.", color: "#336791" },
    { id: "Sb", label: "SUPABASE", status: "active", desc: "Open Source Firebase. Realtime.", color: "#3ecf8e" },

export default function SystemDeck() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeModule, setActiveModule] = useState<ModuleData | null>(null);

  \
    useGSAP(() => {
       
        gsap.fromTo(".deck-container",
            {
                rotationX: 60,
                rotationZ: 45,
                rotationY: -30,
                y: 100,
                opacity: 0,
                scale: 0.8
            },
            {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    end: "top 20%",
                    scrub: 1.5, // Smooth scrub interaction
                },
                rotationX: 20, 
                rotationZ: 0, 
                rotationY: 0, 
                y: 0,
                opacity: 1,
                scale: 1,
                ease: "power3.out"
            }
        );

      
        gsap.from(".module-key", {
            scrollTrigger: {
                trigger: ".deck-container",
                start: "top 60%",
            },
            z: -50,
            opacity: 0,
            duration: 0.5,
            stagger: {
                amount: 0.5,
                from: "center",
                grid: [5, 5]
            },
            ease: "back.out(1.5)",
        });
    }, {});


    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(".deck-container", {
            rotationY: x * 15, 
            rotationX: -y * 15,
            duration: 0.5,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(".deck-container", {
            rotationY: 0,
            rotationX: 0,
            duration: 1,
            ease: "power2.out",
        });
    };

    return (
        <div
            className="w-full min-h-[800px] flex flex-col md:flex-row items-center justify-center gap-12 perspective-1000 py-24"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
            style={{
                
                "--active-color": activeModule ? activeModule.color : "#84cc16"
            }}
        >
            {/* 3D Isometric Deck */}
            <div
                className="deck-container relative grid grid-cols-2 md:grid-cols-5 gap-4 p-8 bg-[#1a1a1a] border border-white/5 rounded-2xl shadow-2xl [transform-style:preserve-3d] will-change-transform" // Removed transition-transform to let GSAP handle it
                style={{
                    // Initial State set by CSS, GSAP overrides
                    transform: "rotateX(45deg) rotateZ(45deg) rotateY(-20deg)",
                    boxShadow: activeModule ? `0 30px 60px -15px ${activeModule.color}30` : "0 30px 60px -15px rgba(0,0,0,0.5)"
                }}
            >
                {/* Base Plate Metallic Look */}
                <div className="absolute inset-0 bg-neutral-900 rounded-2xl transform translate-z-[-10px] border-b-4 border-l-4 border-r-4 border-neutral-800" />

                {modules.map((mod) => (
                    <div
                        key={mod.id}
                        onClick={() => setActiveModule(mod)}
                        className="module-key group relative w-16 h-16 md:w-20 md:h-20 cursor-pointer [transform-style:preserve-3d] transition-transform duration-100 active:scale-95" // Sizing for keycaps
                        style={{ transform: activeModule?.id === mod.id ? "translateZ(5px)" : "translateZ(20px)" }} // Depress effect on click
                    >
                        {/* KEYCAP SHAPE CONSTRUCTION */}

                        {/* 1. Main Key Body (Cube-like) */}
                        <div className="absolute inset-0 bg-[#222] rounded-[4px] [transform-style:preserve-3d]">
                            {/* Sides (Thickness) */}
                            <div className="absolute top-full left-0 w-full h-[12px] bg-[#111] origin-top transform rotate-x-[-90deg]" />
                            <div className="absolute top-0 right-[-12px] w-[12px] h-full bg-[#0a0a0a] origin-left transform rotate-y-[90deg]" />
                            <div className="absolute top-0 left-[-12px] w-[12px] h-full bg-[#1a1a1a] origin-right transform rotate-y-[-90deg]" />
                            <div className="absolute bottom-full left-0 w-full h-[12px] bg-[#2a2a2a] origin-bottom transform rotate-x-[90deg]" />

                            {/* 2. Key Face (Top) - Inset slightly for "dish" effect */}
                            <div
                                className={cn(
                                    "absolute inset-[2px] bg-[#1e1e1e] rounded-[3px] flex flex-col items-center justify-center border border-white/5 transition-all duration-300 transform translate-z-[1px]",
                                    activeModule?.id === mod.id ? "bg-[#151515]" : "group-hover:bg-[#252525]"
                                )}
                                style={{
                                    boxShadow: activeModule?.id === mod.id ? `inset 0 0 10px ${mod.color}40, 0 0 15px ${mod.color}40` : ""
                                }}
                            >
                                <div
                                    className="w-1.5 h-1.5 rounded-full mb-1 shadow-[0_0_5px_currentColor] transition-colors duration-300"
                                    style={{ backgroundColor: mod.color, color: mod.color }}
                                />
                                <span
                                    className="text-[9px] md:text-[10px] font-bold tracking-wider text-gray-400 group-hover:text-white transition-colors text-center"
                                    style={{ color: activeModule?.id === mod.id ? mod.color : "" }}
                                >
                                    {mod.label}
                                </span>
                            </div>
                        </div>

                        {/* 3. Underglow/Shadow just for this key */}
                        {activeModule?.id === mod.id && (
                            <div
                                className="absolute inset-0 transform translate-z-[-15px] blur-md opacity-60 pointer-events-none"
                                style={{ backgroundColor: mod.color }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Terminal / Info Panel */}
            <div
                className="monitor-panel w-full max-w-lg h-56 bg-black border rounded font-mono p-6 relative overflow-hidden shadow-2xl mt-12 md:mt-0 transition-colors duration-500"
                style={{ borderColor: activeModule ? activeModule.color : "rgba(255,255,255,0.2)" }}
            >
                <div className="absolute top-0 left-0 w-full h-6 bg-white/10 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <span className="ml-auto text-xs text-gray-500"></span>
                </div>

                <div className="mt-8 space-y-4">
                    {!activeModule ? (
                        <>
                            <p className="text-accent text-sm animate-pulse">{">"} WAITING FOR INPUT...</p>
                            <p className="text-gray-600 text-sm">SELECT A MODULE TO INSPECT PARAMETERS.</p>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: `${activeModule.color}40` }}>
                                <p className="text-gray-400 text-xs">{">"} DETECTED: <span className="font-bold text-base" style={{ color: activeModule.color }}>{activeModule.label}</span></p>
                                <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 uppercase" style={{ color: activeModule.color }}>
                                    {activeModule.status}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-gray-500 text-[10px] uppercase tracking-widest">Description</p>
                                <p className="text-sm typing-effect text-gray-200" key={activeModule.id}>{activeModule.desc}</p>
                            </div>

                            {/* Fake data lines */}
                            <div className="text-[10px] text-gray-600 font-mono mt-4 flex gap-4">
                                <span>MEM: {Math.floor(Math.random() * 1000)}MB</span>
                                <span>CPU: {Math.floor(Math.random() * 100)}%</span>
                                <span>LTC: {Math.floor(Math.random() * 20)}ms</span>
                            </div>
                        </>
                    )}
                </div>

                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
            </div>
        </div>
    );
}
