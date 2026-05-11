"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    index: "01",
    title: "SmartResume",
    subtitle: "AI-Powered Resume Analyzer",
    tags: ["Python", "FastAPI", "XGBoost", "Gemini Pro", "React"],
    description: "Hybrid scoring engine (XGBoost + LLM) trained on 50k+ resumes. Delivers structural & semantic ATS feedback with 92%+ accuracy.",
    link: "https://smart-resume-orcin.vercel.app",
    github: "https://github.com/Abhiii47",
    year: "2024",
  },
  {
    index: "02",
    title: "Room & Food Finder",
    subtitle: "Hyperlocal Platform",
    tags: ["React", "Node.js", "MongoDB", "Socket.io", "GSAP"],
    description: "Map-centric platform for real-time accommodation & food discovery. Multi-role architecture with live provider chat via Socket.io.",
    link: "https://room-and-food.vercel.app/",
    github: "https://github.com/Abhiii47",
    year: "2024",
  },
  {
    index: "03",
    title: "Price Prediction",
    subtitle: "Transformer + Ensemble Learning",
    tags: ["PyTorch", "LightGBM", "XGBoost", "Scikit-learn"],
    description: "Transformer-based regression on high-dimensional tabular embeddings + weighted ensemble. Log-scaled target, robust against outliers.",
    link: "#",
    github: "https://github.com/Abhiii47",
    year: "2024",
  },
  {
    index: "04",
    title: "Raseed",
    subtitle: "AI-Powered Investment Assistant",
    tags: ["React", "Python", "Gemini API", "FastAPI"],
    description: "Conversational portfolio analyzer leveraging Gemini Pro to deliver research-grade insights on stocks, ETFs and mutual funds.",
    link: "#",
    github: "https://github.com/Abhiii47",
    year: "2025",
  },
  {
    index: "05",
    title: "This Portfolio",
    subtitle: "Immersive Developer Identity",
    tags: ["Next.js 16", "React 19", "GSAP", "Lenis", "Tailwind 4"],
    description: "High-performance interactive portfolio featuring cinematic GSAP animations, Lenis smooth scroll, and an Awwwards-level design language.",
    link: "https://abhijeet-portfolio-tau.vercel.app",
    github: "https://github.com/Abhiii47/abhijeet-portfolio",
    year: "2025",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const imgRef       = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId    = useRef<number | null>(null);
  const curPos   = useRef({ x: 0, y: 0 });

  // Smooth cursor-following hover image
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const loop = () => {
      curPos.current.x += (mousePos.current.x - curPos.current.x) * 0.1;
      curPos.current.y += (mousePos.current.y - curPos.current.y) * 0.1;
      if (imgRef.current) {
        imgRef.current.style.left = curPos.current.x + "px";
        imgRef.current.style.top  = curPos.current.y + "px";
      }
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, []);

  useGSAP(() => {
    gsap.from(".project-row", {
      scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
      y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full py-28 px-6 md:px-12 overflow-hidden"
    >
      {/* Section ghost number */}
      <span className="absolute right-6 top-20 font-serif text-[18vw] font-black text-white/[0.025] select-none pointer-events-none leading-none" aria-hidden>03</span>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <h2 className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase">03 / Selected Work</h2>
          <p className="hidden md:block font-mono text-[10px] text-gray-600 uppercase tracking-widest">{PROJECTS.length} Projects</p>
        </div>

        {/* Project list — Awwwards table style */}
        <div className="divide-y divide-white/[0.06]">
          {PROJECTS.map((p, i) => (
            <div
              key={p.title}
              className="project-row group relative py-7 cursor-pointer"
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              <div className="flex items-center gap-6 md:gap-10">
                {/* Index */}
                <span className="font-mono text-[10px] text-gray-700 w-6 flex-shrink-0 group-hover:text-accent transition-colors duration-300">
                  {p.index}
                </span>

                {/* Title + subtitle */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-baseline md:gap-4">
                    <h3
                      className="font-serif text-2xl md:text-4xl font-black text-white leading-none tracking-tight transition-colors duration-300 group-hover:text-accent"
                    >
                      {p.title}
                    </h3>
                    <p className="text-xs text-gray-600 font-mono mt-1 md:mt-0">{p.subtitle}</p>
                  </div>
                  {/* Description — shown on hover */}
                  <p
                    className="mt-2 text-sm text-gray-500 max-w-xl overflow-hidden transition-all duration-500 ease-out"
                    style={{ maxHeight: activeIdx === i ? "80px" : "0px", opacity: activeIdx === i ? 1 : 0 }}
                  >
                    {p.description}
                  </p>
                </div>

                {/* Tags — hidden on mobile */}
                <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
                  {p.tags.slice(0, 3).map(t => (
                    <span key={t} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.07] rounded-full text-[10px] font-mono text-gray-500">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Year */}
                <span className="hidden md:block font-mono text-[11px] text-gray-600 flex-shrink-0">{p.year}</span>

                {/* Action links */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {p.link !== "#" && (
                    <a
                      href={p.link}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 border border-white/10 rounded-full text-[10px] font-mono text-gray-400 hover:border-accent/50 hover:text-accent transition-all duration-200"
                      onClick={e => e.stopPropagation()}
                    >
                      Live <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                  <a
                    href={p.github}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 border border-white/10 rounded-full text-[10px] font-mono text-gray-400 hover:border-white/30 hover:text-white transition-all duration-200"
                    onClick={e => e.stopPropagation()}
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Hover line */}
              <div
                className="absolute bottom-0 left-0 h-px bg-accent origin-left transition-transform duration-500 ease-out"
                style={{ transform: activeIdx === i ? "scaleX(1)" : "scaleX(0)", width: "100%" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Floating cursor image */}
      <div
        ref={imgRef}
        className="fixed pointer-events-none z-[9990]"
        style={{ position: "fixed", top: 0, left: 0 }}
      >
        <div
          className="transition-all duration-400 ease-out"
          style={{
            transform: `translate(-50%, -50%) rotate(${activeIdx !== null ? -2 : -4}deg) scale(${activeIdx !== null ? 1 : 0.8})`,
            opacity: activeIdx !== null ? 1 : 0,
            width: "320px",
          }}
        >
          {activeIdx !== null && (
            <div className="relative w-80 aspect-video bg-white/5 rounded border border-white/10 overflow-hidden flex items-center justify-center">
              <div className="text-center">
                <p className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">Preview</p>
                <p className="font-serif text-white text-lg font-black mt-1">{PROJECTS[activeIdx].title}</p>
                <div className="flex justify-center gap-1 mt-2 flex-wrap px-4">
                  {PROJECTS[activeIdx].tags.map(t => (
                    <span key={t} className="text-[9px] font-mono text-accent/60">{t}</span>
                  ))}
                </div>
              </div>
              {/* Scanline */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)" }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
