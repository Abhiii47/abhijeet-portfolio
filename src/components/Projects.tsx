"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github } from "lucide-react";
import CardSpotlight from "./CardSpotlight";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "smartresume",
    index: "01",
    title: "SmartResume ATS",
    tag: "AI · NLP · FastAPI",
    color: "#84cc16",
    problem: "Candidates were getting rejected by ATS systems before humans ever read their resumes.",
    solution: "Built a FastAPI + NLP pipeline that parses JDs, scores resume-JD semantic match, and generates targeted suggestions.",
    result: "92% ATS pass-rate on test set. 50k+ resumes analyzed.",
    github: "https://github.com/Abhiii47",
    live: "",
  },
  {
    id: "mlcomp",
    index: "02",
    title: "Amazon ML Competition",
    tag: "ML · Ensemble · XGBoost",
    color: "#ef4444",
    problem: "Multi-class classification on noisy, high-dimensional tabular data with class imbalance.",
    solution: "Stacked ensemble: XGBoost + LightGBM + CatBoost with SMOTE oversampling and custom feature engineering.",
    result: "Top 0.1% of 100,000+ participants. Amazon ML Summer School selection.",
    github: "https://github.com/Abhiii47",
    live: "",
  },
  {
    id: "roomfood",
    index: "03",
    title: "Room & Food Finder",
    tag: "Next.js · Supabase · Maps",
    color: "#3b82f6",
    problem: "Students relocating to new cities had no unified platform to find accommodation and food together.",
    solution: "Full-stack Next.js app with Supabase auth + realtime DB, Google Maps integration, and filter-based search.",
    result: "Live product with active users. Sub-300ms query response on Supabase edge.",
    github: "https://github.com/Abhiii47",
    live: "",
  },
  {
    id: "fabric",
    index: "04",
    title: "MS Fabric Analytics Pipeline",
    tag: "ETL · Power BI · DP-600",
    color: "#8b5cf6",
    problem: "Business data was siloed across 6 systems with no unified reporting layer.",
    solution: "Built end-to-end ETL on Microsoft Fabric: Bronze→Silver→Gold lakehouse, automated refresh, Power BI semantic model.",
    result: "DP-600 certified. Pipeline processes 2M+ rows daily.",
    github: "https://github.com/Abhiii47",
    live: "",
  },
  {
    id: "genai",
    index: "05",
    title: "RAG Knowledge Assistant",
    tag: "LLM · RAG · GCP",
    color: "#d946ef",
    problem: "Internal documents were unsearchable — teams wasted hours digging through PDFs.",
    solution: "RAG pipeline on GCP: document ingestion → chunking → vector store (FAISS) → LLM answer generation with source citation.",
    result: "< 2s end-to-end latency. Deployed on Vertex AI.",
    github: "https://github.com/Abhiii47",
    live: "",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".project-card", {
      opacity: 0, y: 60,
      duration: 0.8, stagger: 0.12, ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
    });
  }, { scope: containerRef });

  return (
    <section id="projects" ref={containerRef} className="relative w-full py-32 px-6 md:px-12">
      {/* Ghost label */}
      <span
        className="absolute right-0 top-16 font-serif text-[18vw] font-black select-none pointer-events-none leading-none"
        style={{ WebkitTextStroke: "1px rgba(132,204,22,0.03)", color: "transparent" }}
        aria-hidden
      >04</span>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase mb-4">04 / Work</p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2
                className="font-serif font-black leading-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)", WebkitTextStroke: "1px rgba(240,237,232,0.15)", color: "transparent" }}
              >
                Selected
              </h2>
              <h2
                className="font-serif font-black leading-tight -mt-1"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                Projects.
              </h2>
            </div>
            <p className="font-mono text-[10px] text-gray-700 tracking-[0.2em] uppercase max-w-xs text-right">
              Each built to solve a real problem.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First card — full width featured */}
          <CardSpotlight
            className="project-card md:col-span-2 group"
            spotlightColor={`${projects[0].color}10`}
          >
            <ProjectCardContent project={projects[0]} featured />
          </CardSpotlight>

          {/* Rest — 2-col */}
          {projects.slice(1).map((p) => (
            <CardSpotlight
              key={p.id}
              className="project-card group"
              spotlightColor={`${p.color}10`}
            >
              <ProjectCardContent project={p} />
            </CardSpotlight>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCardContent({ project: p, featured = false }: { project: typeof projects[0]; featured?: boolean }) {
  return (
    <div className={`p-7 md:p-9 ${featured ? "md:flex md:gap-14" : ""}`}>

      {/* Left col */}
      <div className={featured ? "md:w-1/2" : ""}>

        {/* Index + tag row */}
        <div className="flex items-center justify-between mb-5">
          {/* Index — animates to accent color on group hover */}
          <span
            className="font-mono text-[11px] tracking-[0.3em] transition-all duration-500"
            style={{ color: "#374151" }}
            onMouseEnter={undefined}
          >
            <span
              className="group-hover:scale-110 inline-block transition-transform duration-500"
              style={{
                /* handled via CSS group-hover below via style tag workaround */
              }}
            >
              {p.index}
            </span>
          </span>

          {/* Tag pill — border brightens on hover */}
          <span
            className="font-mono text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full transition-all duration-400"
            style={{
              color: p.color,
              background: `${p.color}12`,
              border: `1px solid ${p.color}25`,
            }}
          >
            {p.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-white leading-tight mb-3"
          style={{ fontSize: featured ? "clamp(1.6rem, 3vw, 2.5rem)" : "clamp(1.3rem, 2vw, 1.9rem)" }}
        >
          {p.title}
        </h3>

        {/* Animated accent line — expands on group hover */}
        <div className="overflow-hidden mb-6">
          <div
            className="h-px transition-all duration-700 ease-out"
            style={{
              width: "3rem",
              background: `linear-gradient(90deg, ${p.color}, transparent)`,
            }}
            /* JS-free width expansion via data-group pattern */
          />
        </div>
      </div>

      {/* Right col — problem/solution/result with stagger reveal */}
      <div className={`space-y-5 ${featured ? "md:w-1/2" : ""}`}>
        {[
          { label: "Problem",  text: p.problem,  delay: "0ms"   },
          { label: "Solution", text: p.solution, delay: "60ms"  },
          { label: "Result",   text: p.result,   delay: "120ms" },
        ].map(({ label, text, delay }) => (
          <div
            key={label}
            className="transform transition-all duration-500"
            style={{ transitionDelay: delay }}
          >
            <p
              className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1 transition-colors duration-300"
              style={{ color: "#374151" }}
            >
              {label}
            </p>
            <p className="font-mono text-[11.5px] text-gray-400 leading-relaxed">{text}</p>
          </div>
        ))}

        {/* Links — always visible but accent-color on hover */}
        <div className="flex items-center gap-5 pt-3 border-t border-white/[0.04]">
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors duration-300"
            style={{ color: "#4b5563" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#4b5563")}
          >
            <Github className="w-3.5 h-3.5" /> GitHub
          </a>
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-300"
              style={{ color: p.color }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.gap = "8px";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.gap = "6px";
              }}
            >
              <ArrowUpRight className="w-3.5 h-3.5" /> Live
            </a>
          )}

          {/* Hover cue — arrow that appears on hover */}
          <div className="ml-auto flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0"
            style={{ color: p.color }}
          >
            <ArrowUpRight className="w-3 h-3" />
            <span>View</span>
          </div>
        </div>
      </div>

      {/* Inline style for group-hover effects that can't be done via Tailwind alone */}
      <style jsx>{`
        .group:hover .accent-line-${p.id} {
          width: 100% !important;
        }
        .group:hover .index-${p.id} {
          color: ${p.color} !important;
          transform: scale(1.15);
        }
        .group:hover .tag-border-${p.id} {
          border-color: ${p.color}60 !important;
        }
        .group:hover .row-label-${p.id} {
          color: ${p.color}80 !important;
        }
      `}</style>
    </div>
  );
}
