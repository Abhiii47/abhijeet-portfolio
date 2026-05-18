"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────  TYPES  ─────────────────── */

type Stat = { num: string; label: string };
type Project = {
  number: string;
  org: string;
  name: string;
  hook: string;
  description: string;
  stats: Stat[];
  hotTags: string[];
  normalTags: string[];
  links: { github?: string; live?: string };
};

/* ───────────────────  DATA  ─────────────────── */

const PROJECTS: Project[] = [
  {
    number: "01",
    org: "Personal Project · 2023",
    name: "SmartResume — Resume Analysis Engine",
    hook: "ATS scoring engine that processes and scores 50,000+ resumes.",
    description:
      "FastAPI backend with XGBoost classifier. Feature extraction from structure, keyword density, and section completeness. Secure OAuth2 + JWT auth. Clean modular architecture.",
    stats: [
      { num: "50K+", label: "Resumes processed" },
      { num: "Live", label: "In production" },
    ],
    hotTags:    ["FastAPI", "XGBoost", "Python"],
    normalTags: ["OAuth2", "JWT", "PostgreSQL", "Clean Architecture"],
    links: { github: "https://github.com/Abhiii47", live: "https://github.com/Abhiii47" },
  },
  {
    number: "02",
    org: "Personal Project · 2023",
    name: "Room & Food Finder",
    hook: "Live hyperlocal platform — students use it daily to find housing and food near campus.",
    description:
      "Multi-role system (User/Provider/Admin) with real-time chat via Socket.io. Map-centric geo-search, Dockerized services, automated CI/CD pipeline.",
    stats: [
      { num: "Live", label: "Active users" },
      { num: "RT",   label: "Real-time chat" },
    ],
    hotTags:    ["Node.js", "Socket.io", "Next.js"],
    normalTags: ["MongoDB", "Docker", "Maps API", "RBAC", "GitHub Actions"],
    links: { github: "https://github.com/Abhiii47" },
  },
  {
    number: "03",
    org: "Ecovis RKCA · GCP · 2024",
    name: "RAG Knowledge Assistant",
    hook: "Internal knowledge retrieval system — ask a question, get an answer with source citations.",
    description:
      "Document ingestion \u2192 chunking \u2192 FAISS vector store \u2192 LLM answer generation. Deployed on GCP Vertex AI with streaming responses via SSE.",
    stats: [
      { num: "GCP", label: "Deployed live" },
      { num: "SSE", label: "Streaming output" },
    ],
    hotTags:    ["RAG", "Vertex AI", "FAISS"],
    normalTags: ["LangChain", "GCP", "Python", "LLMs"],
    links: { github: "https://github.com/Abhiii47" },
  },
  {
    number: "04",
    org: "Amazon ML Summer School · 2024",
    name: "Product Price Prediction Pipeline",
    hook: "End-to-end regression pipeline on 150,000+ records. Built for Amazon ML School — top 0.1% program.",
    description:
      "EDA \u2192 feature engineering \u2192 XGBoost regressor \u2192 hyperparameter optimization. Optimized on MAE and SMAPE metrics. Ensemble approach with bias-variance analysis.",
    stats: [
      { num: "150K+",    label: "Records processed" },
      { num: "Top 0.1%", label: "Nationally" },
    ],
    hotTags:    ["XGBoost", "Python", "Feature Engineering"],
    normalTags: ["Pandas", "Scikit-learn", "MAE/SMAPE", "EDA"],
    links: { github: "https://github.com/Abhiii47" },
  },
];

/* ───────────────────  PALETTE  ─────────────────── */

const C = {
  bg:        "#F5F0E8",
  surface:   "#EDE8DF",
  border:    "#DDD7CB",
  text:      "#1A1208",
  muted:     "#6B6056",
  hint:      "#9A8F83",
  rust:      "#C4400A",
  hotBg:     "#FBE9E0",
  hotBorder: "#F0C4B0",
} as const;

/* ───────────────────  STAT COUNTER  ─────────────────── */

function AnimatedStat({ num, label, triggered }: Stat & { triggered: boolean }) {
  const [display, setDisplay] = useState("0");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!triggered) return;
    /* If the stat is numeric, count up; otherwise just reveal */
    const numeric = parseFloat(num.replace(/[^0-9.]/g, ""));
    const suffix  = num.replace(/[0-9.]/g, "");
    const isNum   = !isNaN(numeric) && suffix !== num; /* has digits */

    if (!isNum) { setDisplay(num); return; }

    const duration  = 1200;
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      const v = e * numeric;
      setDisplay(
        (numeric % 1 === 0
          ? Math.round(v).toLocaleString()
          : v.toFixed(1))
        + suffix
      );
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [triggered, num]);

  return (
    <div style={{ textAlign: "right" }}>
      <p style={{
        fontFamily: "'DM Serif Display',Georgia,serif",
        fontStyle: "italic",
        fontSize: 22, fontWeight: 400,
        color: C.rust, lineHeight: 1, marginBottom: 4,
      }}>{display}</p>
      <p style={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: 9, fontWeight: 400,
        letterSpacing: "0.26em",
        textTransform: "uppercase",
        color: C.hint,
      }}>{label}</p>
    </div>
  );
}

/* ───────────────────  CARD  ─────────────────── */

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`proj-card proj-card-${index}`}
      style={{
        background: C.surface,
        border: `0.5px solid ${C.border}`,
        borderRadius: 8,
        padding: "clamp(18px,2.5vw,28px) clamp(18px,2.8vw,32px)",
        display: "grid",
        gridTemplateColumns: "52px 1fr",
        gap: "0 clamp(16px,2.5vw,28px)",
        transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = `${C.rust}80`;
        el.style.transform   = "translateY(-2px)";
        el.style.boxShadow   = "0 8px 28px rgba(26,18,8,0.07)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = C.border;
        el.style.transform   = "translateY(0)";
        el.style.boxShadow   = "none";
      }}
    >
      {/* ── Left: italic number ── */}
      <div style={{ paddingTop: 2 }}>
        <span style={{
          fontFamily: "'DM Serif Display',Georgia,serif",
          fontStyle: "italic",
          fontSize: 52, fontWeight: 400,
          color: C.border,
          lineHeight: 1, display: "block",
          userSelect: "none",
        }}>{p.number}</span>
      </div>

      {/* ── Right: full content ── */}
      <div>
        {/* Org */}
        <p style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 9, fontWeight: 400,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: C.hint,
          marginBottom: 6,
        }}>{p.org}</p>

        {/* Project name */}
        <h3 style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 15, fontWeight: 500,
          color: C.text,
          marginBottom: 10, lineHeight: 1.3,
        }}>{p.name}</h3>

        {/* ── Desktop: hook + desc left | stats right ── */}
        <div className="card-body" style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "0 clamp(24px,4vw,48px)",
          alignItems: "start",
        }}>
          <div>
            {/* Hook — pull-quote moment */}
            <p
              className={`proj-hook proj-hook-${index}`}
              style={{
                fontFamily: "'DM Serif Display',Georgia,serif",
                fontStyle: "italic",
                fontSize: 15, fontWeight: 400,
                color: C.rust,
                lineHeight: 1.5,
                marginBottom: 10,
              }}
            >{p.hook}</p>

            {/* Description */}
            <p style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 13, fontWeight: 300,
              color: C.muted,
              lineHeight: 1.65,
              marginBottom: 14,
            }}>{p.description}</p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
              {p.hotTags.map(t => (
                <span key={t} style={{
                  padding: "4px 9px", borderRadius: 4,
                  background: C.hotBg,
                  border: `1px solid ${C.hotBorder}`,
                  color: C.rust,
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 500, fontSize: 10, lineHeight: 1,
                }}>{t}</span>
              ))}
              {p.normalTags.map(t => (
                <span key={t} style={{
                  padding: "4px 9px", borderRadius: 4,
                  background: C.bg,
                  border: `1px solid ${C.border}`,
                  color: C.hint,
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 400, fontSize: 10, lineHeight: 1,
                }}>{t}</span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: 18 }}>
              {p.links.github && (
                <a
                  href={p.links.github}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "'DM Sans',monospace",
                    fontSize: 10, fontWeight: 400,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: C.rust,
                    textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 4,
                    transition: "color 0.18s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#A33508")}
                  onMouseLeave={e => (e.currentTarget.style.color = C.rust)}
                >
                  GitHub
                  <span style={{ fontSize: 11, transition: "transform 0.18s" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLSpanElement).style.transform = "translate(2px,-2px)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLSpanElement).style.transform = "none")}
                  >↗</span>
                </a>
              )}
              {p.links.live && (
                <a
                  href={p.links.live}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "'DM Sans',monospace",
                    fontSize: 10, fontWeight: 400,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: C.hint,
                    textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 4,
                    transition: "color 0.18s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.rust)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.hint)}
                >Live ↗</a>
              )}
            </div>
          </div>

          {/* Stats column */}
          <div style={{
            display: "flex", flexDirection: "column",
            gap: 18, paddingTop: 2, minWidth: 90,
          }}>
            {p.stats.map(s => (
              <AnimatedStat key={s.label} {...s} triggered={triggered} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────  SECTION  ─────────────────── */

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    /* Cards stagger */
    gsap.from(".proj-card", {
      scrollTrigger: { trigger: ".proj-list", start: "top 85%" },
      y: 50, opacity: 0, duration: 0.8,
      stagger: 0.12, ease: "power3.out",
    });

    /* Hook pull-quote entry per card */
    gsap.utils.toArray<Element>(".proj-hook").forEach(hook => {
      gsap.from(hook, {
        scrollTrigger: { trigger: hook as Element, start: "top 88%" },
        x: 20, opacity: 0, duration: 0.7, ease: "power2.out",
      });
    });
  }, { scope: sectionRef });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        @media(max-width:640px){
          .card-body { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
        id="work"
        ref={sectionRef}
        style={{
          background: C.bg,
          padding: "clamp(72px,9vw,120px) clamp(20px,5vw,72px)",
        }}
      >
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>

          {/* Section label */}
          <p style={{
            fontFamily: "'DM Sans',sans-serif",
            fontWeight: 400, fontSize: 10,
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: C.rust, marginBottom: 28,
          }}>04 / Work</p>

          {/* Heading */}
          <h2 style={{
            display: "flex", flexWrap: "wrap",
            alignItems: "baseline", gap: "0 0.28em",
            marginBottom: "clamp(40px,5vw,64px)",
            lineHeight: 1.05,
          }}>
            <span style={{
              fontFamily: "'DM Serif Display',Georgia,serif",
              fontStyle: "normal", fontWeight: 400,
              fontSize: "clamp(2.2rem,4.5vw,3.8rem)",
              color: C.text,
            }}>Selected</span>
            <span style={{
              fontFamily: "'DM Serif Display',Georgia,serif",
              fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(2.2rem,4.5vw,3.8rem)",
              color: C.rust,
            }}>projects</span>
          </h2>

          {/* Card list */}
          <div
            className="proj-list"
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.number} p={p} index={i} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
