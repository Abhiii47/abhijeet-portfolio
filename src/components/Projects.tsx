"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#00d4ff";

const PROJECTS = [
  {
    id: "ecovis",
    index: "01",
    title: "Cloud Migration & Internal Tooling",
    company: "Ecovis RKCA",
    year: "2024 — Present",
    color: "#00d4ff",
    bg: "#0A1628",
    tags: ["AWS", "Azure", "Next.js", "CI/CD", "TypeScript"],
    stats: [{ v: "99.9%", l: "Uptime" }, { v: "60%", l: "Less Manual Work" }, { v: "2 days", l: "Release Cycle" }],
    desc: "Migrated legacy infrastructure to AWS & Azure, built Next.js internal tooling cutting manual reporting by 60%, and designed CI/CD pipelines reducing release cycles from 2 weeks to 2 days.",
    github: "",
    live: "",
    icon: "☁️",
  },
  {
    id: "fabric",
    index: "02",
    title: "MS Fabric Analytics Pipeline",
    company: "Microsoft",
    year: "2024",
    color: "#7719AA",
    bg: "#120A1E",
    tags: ["MS Fabric", "ETL", "Power BI", "Spark", "DP-600"],
    stats: [{ v: "3-tier", l: "Lakehouse" }, { v: "DP-600", l: "Certified" }, { v: "2M+", l: "Rows/day" }],
    desc: "Built Bronze→Silver→Gold lakehouse ETL on Microsoft Fabric with automated refresh, Power BI semantic models, and earned the DP-600 Fabric Analytics Engineer certification.",
    github: "https://github.com/Abhiii47",
    live: "",
    icon: "📊",
  },
  {
    id: "mlcomp",
    index: "03",
    title: "Amazon ML Competition",
    company: "Amazon ML Summer School",
    year: "2024",
    color: "#FF9900",
    bg: "#16100A",
    tags: ["XGBoost", "LightGBM", "CatBoost", "SMOTE", "Python"],
    stats: [{ v: "Top 0.1%", l: "Nationally" }, { v: "92%+", l: "Accuracy" }, { v: "100k+", l: "Applicants" }],
    desc: "Stacked XGBoost + LightGBM + CatBoost ensemble with SMOTE oversampling for multi-class tabular classification. Selected top 0.1% nationally for Amazon ML Summer School.",
    github: "https://github.com/Abhiii47",
    live: "",
    icon: "🤖",
  },
  {
    id: "roomfood",
    index: "04",
    title: "Room & Food Finder",
    company: "Personal Project",
    year: "2023",
    color: "#8b5cf6",
    bg: "#100A1E",
    tags: ["Next.js", "Supabase", "Maps API", "Realtime", "Auth"],
    stats: [{ v: "Live", l: "In Production" }, { v: "Realtime", l: "Database" }, { v: "Geo", l: "Search" }],
    desc: "Full-stack platform helping students find accommodation and food near their college. Next.js + Supabase auth + realtime DB + Google Maps geo-search. Live product with an active user base.",
    github: "https://github.com/Abhiii47",
    live: "",
    icon: "🏠",
  },
  {
    id: "genai",
    index: "05",
    title: "RAG Knowledge Assistant",
    company: "Personal Project",
    year: "2024",
    color: "#d946ef",
    bg: "#160A1A",
    tags: ["LLM", "RAG", "FAISS", "Vertex AI", "GCP"],
    stats: [{ v: "RAG", l: "Pipeline" }, { v: "FAISS", l: "Vector Store" }, { v: "GCP", l: "Deployed" }],
    desc: "RAG pipeline on GCP: document ingestion → chunking → FAISS vector store → LLM answer generation with source citation. Deployed on Vertex AI with streaming responses.",
    github: "https://github.com/Abhiii47",
    live: "",
    icon: "🧠",
  },
];

/* ── CSS art mockup for each project ── */
function Mockup({ project }: { project: typeof PROJECTS[number] }) {
  return (
    <div style={{
      width: "100%", aspectRatio: "16/10",
      background: `linear-gradient(135deg, ${project.bg} 0%, rgba(2,4,8,0.95) 100%)`,
      borderRadius: "12px",
      border: `1px solid ${project.color}22`,
      overflow: "hidden",
      position: "relative",
      boxShadow: `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${project.color}10`,
    }}>
      {/* fake browser bar */}
      <div style={{
        height: 28,
        background: "rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        display: "flex", alignItems: "center", gap: 5, padding: "0 10px",
      }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => (
          <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.8 }} />
        ))}
        <div style={{ flex: 1, height: 12, marginLeft: 8, background: "rgba(255,255,255,0.05)", borderRadius: 4 }} />
      </div>

      {/* content art */}
      <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* header bar */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: `${project.color}20`, border: `1px solid ${project.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{project.icon}</div>
          <div style={{ height: 8, width: "40%", background: `${project.color}30`, borderRadius: 4 }} />
          <div style={{ marginLeft: "auto", height: 8, width: "15%", background: "rgba(255,255,255,0.07)", borderRadius: 4 }} />
        </div>
        {/* stat pills */}
        <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
          {project.stats.slice(0,3).map(s => (
            <div key={s.l} style={{
              padding: "5px 10px", borderRadius: 8,
              background: `${project.color}10`,
              border: `1px solid ${project.color}20`,
              display: "flex", flexDirection: "column", gap: 2, flex: 1,
            }}>
              <div style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, color: project.color }}>{s.v}</div>
              <div style={{ height: 5, width: "70%", background: "rgba(255,255,255,0.07)", borderRadius: 3 }} />
            </div>
          ))}
        </div>
        {/* fake content lines */}
        {["85%","70%","90%","55%"].map((w, i) => (
          <div key={i} style={{ height: 6, width: w, background: i % 2 === 0 ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)", borderRadius: 3 }} />
        ))}
        {/* tag row */}
        <div style={{ display: "flex", gap: 5, marginTop: 4 }}>
          {project.tags.slice(0,3).map(t => (
            <div key={t} style={{
              padding: "2px 7px", borderRadius: 99,
              background: `${project.color}12`,
              border: `1px solid ${project.color}22`,
              fontFamily: "monospace", fontSize: 8, color: project.color,
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>{t}</div>
          ))}
        </div>
      </div>

      {/* glow at bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
        background: `linear-gradient(to top, ${project.color}08, transparent)`,
        pointerEvents: "none",
      }} />
    </div>
  );
}

/* ── Single project slide ── */
function ProjectSlide({ project }: { project: typeof PROJECTS[number] }) {
  return (
    <div
      className="project-slide"
      style={{
        minWidth: "100vw",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 clamp(24px, 8vw, 120px)",
        flexShrink: 0,
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(32px, 5vw, 80px)",
        alignItems: "center",
        maxWidth: 1100,
        width: "100%",
      }}>
        {/* LEFT: info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* index + company */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              fontFamily: "monospace", fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: 900, lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: `1px ${project.color}40`,
              userSelect: "none",
            }}>{project.index}</span>
            <div>
              <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: project.color, marginBottom: 2 }}>{project.company}</p>
              <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)" }}>{project.year}</p>
            </div>
          </div>

          {/* title */}
          <h3 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
            fontWeight: 700, lineHeight: 1.1,
            color: "white",
            letterSpacing: "-0.02em",
          }}>{project.title}</h3>

          {/* desc */}
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "clamp(0.8rem, 1vw, 0.95rem)", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: "48ch" }}>{project.desc}</p>

          {/* stats */}
          <div style={{ display: "flex", gap: 16 }}>
            {project.stats.map(s => (
              <div key={s.l}>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.6rem", fontWeight: 800, color: project.color, lineHeight: 1 }}>{s.v}</p>
                <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginTop: 3 }}>{s.l}</p>
              </div>
            ))}
          </div>

          {/* tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tags.map(t => (
              <span key={t} style={{
                padding: "4px 10px", borderRadius: 99,
                background: `${project.color}12`,
                border: `1px solid ${project.color}25`,
                fontFamily: "monospace", fontSize: 9,
                color: project.color, letterSpacing: "0.14em", textTransform: "uppercase",
              }}>{t}</span>
            ))}
          </div>

          {/* links */}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 18px", borderRadius: 99,
                  background: project.color, color: "#020408",
                  fontFamily: "monospace", fontSize: 10,
                  fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8 L8 2 M4 2 H8 V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Live
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 18px", borderRadius: 99,
                  border: `1px solid rgba(255,255,255,0.12)`,
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "monospace", fontSize: 10,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = project.color; el.style.color = project.color; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.12)"; el.style.color = "rgba(255,255,255,0.5)"; }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* RIGHT: mockup */}
        <div style={{ position: "relative" }}>
          <Mockup project={project} />
          {/* accent line below mockup */}
          <div style={{ height: 2, marginTop: 12, background: `linear-gradient(90deg, ${project.color}60, transparent)`, borderRadius: 1 }} />
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════
   MAIN SECTION
════════════════════════════ */
export default function Projects() {
  const wrapRef    = useRef<HTMLDivElement>(null);  /* outer sticky wrapper */
  const trackRef   = useRef<HTMLDivElement>(null);  /* horizontal track */
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    const wrap  = wrapRef.current;
    if (!track || !wrap) return;

    const totalWidth = track.scrollWidth - window.innerWidth;

    /* Pin the wrapper and drive horizontal scroll */
    gsap.to(track, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    /* heading reveal */
    gsap.from(".proj-head", {
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
    });
  }, { scope: sectionRef });

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ background: "#020408", color: "white", position: "relative" }}
    >
      {/* Section header — visible before scroll begins */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 pt-28 pb-10">
        <p className="proj-head font-mono text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: ACCENT }}>04 &nbsp;/&nbsp; Work</p>
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <h2 className="proj-head font-serif font-bold leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)", color: "white", letterSpacing: "-0.02em" }}>
            Selected Projects
          </h2>
          <p className="proj-head font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.25)", maxWidth: "28ch", textAlign: "right" }}>
            Scroll right → to explore each project
          </p>
        </div>
        {/* progress dots */}
        <div className="flex gap-2 mt-6">
          {PROJECTS.map((p, i) => (
            <div key={p.id} style={{ width: 24, height: 2, borderRadius: 1, background: i === 0 ? p.color : "rgba(255,255,255,0.1)" }} />
          ))}
        </div>
      </div>

      {/* Horizontal scroll stage */}
      <div ref={wrapRef} style={{ height: "100vh", overflow: "hidden", position: "relative" }}>
        <div
          ref={trackRef}
          style={{
            display: "flex",
            height: "100%",
            willChange: "transform",
          }}
        >
          {PROJECTS.map(p => <ProjectSlide key={p.id} project={p} />)}
        </div>

        {/* ghost section number */}
        <span aria-hidden style={{
          position: "absolute", right: "2%", bottom: "10%",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(6rem,14vw,14rem)", fontWeight: 900, lineHeight: 1,
          color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.03)",
          pointerEvents: "none", userSelect: "none",
        }}>04</span>
      </div>

      {/* Mobile fallback — vertical stack */}
      <style>{`
        @media (max-width: 767px) {
          #projects .horizontal-stage { display: none; }
        }
      `}</style>
    </section>
  );
}
