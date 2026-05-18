"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "ecovis",
    index: "01",
    title: "Cloud Migration & Internal Tooling",
    tag: "AWS · Azure · Next.js · CI/CD",
    color: "#84cc16",
    year: "2024–Present",
    company: "Ecovis RKCA",
    desc: "Migrated legacy infrastructure to AWS/Azure achieving 99.9% uptime. Built internal Next.js + TypeScript tooling that cut manual reporting time by 60%. Designed CI/CD pipelines that reduced release cycles from 2 weeks to 2 days.",
    github: "",
    live: "",
  },
  {
    id: "fabric",
    index: "02",
    title: "MS Fabric Analytics Pipeline",
    tag: "ETL · Power BI · DP-600",
    color: "#3b82f6",
    year: "2024",
    company: "Microsoft Internship",
    desc: "End-to-end lakehouse ETL on Microsoft Fabric — Bronze→Silver→Gold layers, automated daily refresh for 2M+ row datasets, Power BI semantic models and executive dashboards. DP-600 certified.",
    github: "https://github.com/Abhiii47",
    live: "",
  },
  {
    id: "mlcomp",
    index: "03",
    title: "Amazon ML Competition",
    tag: "ML · Ensemble · XGBoost",
    color: "#ef4444",
    year: "2024",
    company: "Amazon ML Summer School",
    desc: "Multi-class tabular classification with stacked XGBoost + LightGBM + CatBoost ensemble and SMOTE oversampling. Top 0.1% of 100,000+ national participants — selected for Amazon ML Summer School.",
    github: "https://github.com/Abhiii47",
    live: "",
  },
  {
    id: "roomfood",
    index: "04",
    title: "Room & Food Finder",
    tag: "Next.js · Supabase · Maps",
    color: "#8b5cf6",
    year: "2023",
    company: "Personal Project",
    desc: "Full-stack platform for students to find accommodation and food in new cities. Next.js + Supabase auth + realtime DB + Google Maps geo-search. Live product with active users, sub-300ms query response.",
    github: "https://github.com/Abhiii47",
    live: "",
  },
  {
    id: "genai",
    index: "05",
    title: "RAG Knowledge Assistant",
    tag: "LLM · RAG · GCP",
    color: "#d946ef",
    year: "2024",
    company: "Personal Project",
    desc: "RAG pipeline on GCP: document ingestion → chunking → FAISS vector store → LLM answer generation with source citation. Under 2s end-to-end latency, deployed on Vertex AI.",
    github: "https://github.com/Abhiii47",
    live: "",
  },
];

/* ── GlowCard ────────────────────────────────────────────────── */
function GlowCard({ children, color, className = "" }: { children: React.ReactNode; color: string; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current; const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    glow.style.background = `radial-gradient(380px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, ${color}28, transparent 65%)`;
    const tiltX = ((e.clientY - rect.top)  / rect.height - 0.5) * 6;
    const tiltY = ((e.clientX - rect.left) / rect.width  - 0.5) * -6;
    card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.012,1.012,1.012)`;
  }, [color]);

  const onMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.background = "transparent";
    if (cardRef.current) cardRef.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  }, []);

  return (
    <div ref={cardRef} className={`relative rounded-xl overflow-hidden group ${className}`}
      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)", willChange: "transform" }}
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
    >
      <div ref={glowRef} className="absolute inset-0 rounded-xl pointer-events-none" style={{ zIndex: 0, transition: "background 0.08s ease" }} />
      <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: `inset 0 0 0 1px ${color}40`, zIndex: 1 }} />
      <div className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${color}80, transparent)`, zIndex: 2 }} />
      <div className="relative" style={{ zIndex: 3 }}>{children}</div>
    </div>
  );
}

/* ── Single project row (Atharva-style) ─────────────────────── */
function ProjectRow({ p, index }: { p: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="project-card group relative"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        paddingBlock: "clamp(1.5rem, 3vw, 2.5rem)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* background fill on hover */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-400"
        style={{ background: `linear-gradient(90deg, ${p.color}07, transparent)`, opacity: hovered ? 1 : 0 }}
      />

      <div className="relative flex items-start gap-6 md:gap-10 px-2">
        {/* Index */}
        <span
          className="font-mono shrink-0 tabular-nums transition-colors duration-300"
          style={{
            fontSize: "clamp(0.65rem, 1vw, 0.75rem)",
            letterSpacing: "0.2em",
            color: hovered ? p.color : "rgba(255,255,255,0.15)",
            marginTop: "0.35rem",
          }}
        >
          {p.index}
        </span>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h3
              className="font-serif font-bold leading-tight transition-colors duration-300"
              style={{
                fontSize: "clamp(1.25rem, 2.5vw, 1.9rem)",
                color: hovered ? "#ffffff" : "rgba(240,237,232,0.85)",
              }}
            >
              {p.title}
            </h3>

            {/* Arrow — slides in on hover */}
            <a
              href={p.github || p.live || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 transition-all duration-300 mt-1"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translate(0, 0)" : "translate(-8px, 8px)",
                color: p.color,
              }}
              aria-label={`View ${p.title}`}
            >
              <ArrowUpRight className="w-6 h-6" />
            </a>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-3 mt-2 mb-4 flex-wrap">
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase px-2.5 py-0.5 rounded-full"
              style={{ color: p.color, background: `${p.color}12`, border: `1px solid ${p.color}25` }}
            >
              {p.tag}
            </span>
            <span className="font-mono text-[10px] text-gray-600 tracking-widest">{p.company}</span>
            <span className="font-mono text-[10px] text-gray-700 tracking-widest">{p.year}</span>
          </div>

          {/* Description — fades in */}
          <p
            className="font-mono text-[11.5px] text-gray-500 leading-relaxed transition-all duration-400 max-w-2xl"
            style={{
              opacity: hovered ? 1 : 0.45,
              transform: hovered ? "translateY(0)" : "translateY(4px)",
            }}
          >
            {p.desc}
          </p>

          {/* GitHub link */}
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase mt-4 transition-all duration-300"
              style={{
                color: hovered ? p.color : "rgba(255,255,255,0.2)",
                opacity: hovered ? 1 : 0,
              }}
            >
              <Github className="w-3 h-3" /> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Projects section ────────────────────────────────────────── */
export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".project-card", {
      opacity: 0, y: 40,
      duration: 0.7, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
    });
  }, { scope: containerRef });

  return (
    <section id="projects" ref={containerRef} className="relative w-full py-32 px-6 md:px-12">
      <span className="absolute right-0 top-16 font-serif text-[18vw] font-black select-none pointer-events-none leading-none" style={{ WebkitTextStroke: "1px rgba(132,204,22,0.03)", color: "transparent" }} aria-hidden>04</span>

      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase mb-4">04 / Work</p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="font-serif font-black leading-tight" style={{ fontSize: "clamp(2rem,5vw,4rem)", WebkitTextStroke: "1px rgba(240,237,232,0.15)", color: "transparent" }}>Selected</h2>
              <h2 className="font-serif font-black leading-tight -mt-1" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>Projects.</h2>
            </div>
            <p className="font-mono text-[10px] text-gray-700 tracking-[0.2em] uppercase max-w-xs text-right">Built to solve real problems.</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-2" style={{ background: "linear-gradient(90deg, rgba(132,204,22,0.25), transparent)" }} />

        {/* Project rows */}
        <div>
          {projects.map((p, i) => <ProjectRow key={p.id} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
