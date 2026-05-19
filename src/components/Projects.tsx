"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#C4400A";
const INK    = "#0E0A04";

type Stat    = { num: string; label: string };
type Project = {
  number: string; org: string; name: string;
  hook: string; description: string;
  stats: Stat[]; hotTags: string[]; normalTags: string[];
  links: { github?: string; live?: string };
};

const PROJECTS: Project[] = [
  {
    number: "01", org: "Personal Project · 2023",
    name: "SmartResume — Resume Analysis Engine",
    hook: "ATS scoring engine that processes and scores 50,000+ resumes.",
    description: "FastAPI backend with XGBoost classifier. Feature extraction from structure, keyword density, and section completeness. Secure OAuth2 + JWT auth. Clean modular architecture.",
    stats: [{ num: "50K+", label: "Resumes processed" }, { num: "Live", label: "In production" }],
    hotTags: ["FastAPI", "XGBoost", "Python"],
    normalTags: ["OAuth2", "JWT", "PostgreSQL", "Clean Architecture"],
    links: { github: "https://github.com/Abhiii47", live: "https://github.com/Abhiii47" },
  },
  {
    number: "02", org: "Personal Project · 2023",
    name: "Room & Food Finder",
    hook: "Live hyperlocal platform — students use it daily to find housing and food near campus.",
    description: "Multi-role system (User/Provider/Admin) with real-time chat via Socket.io. Map-centric geo-search, Dockerized services, automated CI/CD pipeline.",
    stats: [{ num: "Live", label: "Active users" }, { num: "RT", label: "Real-time chat" }],
    hotTags: ["Node.js", "Socket.io", "Next.js"],
    normalTags: ["MongoDB", "Docker", "Maps API", "RBAC", "GitHub Actions"],
    links: { github: "https://github.com/Abhiii47" },
  },
  {
    number: "03", org: "Ecovis RKCA · GCP · 2024",
    name: "RAG Knowledge Assistant",
    hook: "Internal knowledge retrieval system — ask a question, get an answer with source citations.",
    description: "Document ingestion → chunking → FAISS vector store → LLM answer generation. Deployed on GCP Vertex AI with streaming responses via SSE.",
    stats: [{ num: "GCP", label: "Deployed live" }, { num: "SSE", label: "Streaming output" }],
    hotTags: ["RAG", "Vertex AI", "FAISS"],
    normalTags: ["LangChain", "GCP", "Python", "LLMs"],
    links: { github: "https://github.com/Abhiii47" },
  },
  {
    number: "04", org: "Amazon ML Summer School · 2024",
    name: "Product Price Prediction Pipeline",
    hook: "End-to-end regression pipeline on 150,000+ records. Built for Amazon ML School — top 0.1% program.",
    description: "EDA → feature engineering → XGBoost regressor → hyperparameter optimization. Optimized on MAE and SMAPE metrics. Ensemble approach with bias-variance analysis.",
    stats: [{ num: "150K+", label: "Records processed" }, { num: "Top 0.1%", label: "Nationally" }],
    hotTags: ["XGBoost", "Python", "Feature Engineering"],
    normalTags: ["Pandas", "Scikit-learn", "MAE/SMAPE", "EDA"],
    links: { github: "https://github.com/Abhiii47" },
  },
];

function AnimatedStat({ num, label, triggered }: Stat & { triggered: boolean }) {
  const [display, setDisplay] = useState("0");
  const raf = useRef<number | null>(null);
  useEffect(() => {
    if (!triggered) return;
    const numeric = parseFloat(num.replace(/[^0-9.]/g, ""));
    const suffix  = num.replace(/[0-9.]/g, "");
    const isNum   = !isNaN(numeric) && suffix !== num;
    if (!isNum) { setDisplay(num); return; }
    const dur = 1400, t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const v = (1 - Math.pow(1 - p, 3)) * numeric;
      setDisplay((numeric % 1 === 0 ? Math.round(v).toLocaleString() : v.toFixed(1)) + suffix);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [triggered, num]);

  return (
    <div style={{ textAlign: "right" }}>
      <p style={{
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontStyle: "italic",
        fontSize: 26, fontWeight: 700,
        color: ACCENT, lineHeight: 1, marginBottom: 4,
      }}>{display}</p>
      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: 9, letterSpacing: "0.26em",
        textTransform: "uppercase",
        color: "rgba(14,10,4,0.32)",
      }}>{label}</p>
    </div>
  );
}

function ProjectCard({ p }: { p: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numRef  = useRef<HTMLSpanElement>(null);
  const hookRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
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

  useGSAP(() => {
    const card = cardRef.current;
    const num  = numRef.current;
    const hook = hookRef.current;
    const tags = tagsRef.current?.querySelectorAll(".proj-tag");
    if (!card) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 86%", once: true } });
    tl.from(card, { y: 56, opacity: 0, duration: 0.75, ease: "power3.out" }, 0);
    if (num)  tl.from(num,  { x: -24, opacity: 0, duration: 0.5, ease: "power2.out" }, 0.1);
    if (hook) tl.from(hook, { x: 28,  opacity: 0, duration: 0.6, ease: "power3.out" }, 0.28);
    if (tags?.length) tl.from(Array.from(tags), { y: 8, opacity: 0, duration: 0.3, stagger: 0.03, ease: "power2.out" }, 0.42);
  }, { scope: cardRef });

  const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(cardRef.current, { y: -5, duration: 0.28, ease: "power2.out" });
    gsap.to(edgeRef.current, { opacity: 1, duration: 0.25 });
    const el = e.currentTarget as HTMLDivElement;
    el.style.borderColor = `rgba(196,64,10,0.22)`;
    el.style.boxShadow   = `0 12px 40px rgba(196,64,10,0.07), 0 0 0 1px rgba(196,64,10,0.08)`;
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(cardRef.current, { y: 0, duration: 0.28, ease: "power2.out" });
    gsap.to(edgeRef.current, { opacity: 0, duration: 0.25 });
    const el = e.currentTarget as HTMLDivElement;
    el.style.borderColor = "rgba(14,10,4,0.07)";
    el.style.boxShadow   = "none";
  };

  return (
    <div
      ref={cardRef}
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(14,10,4,0.07)",
        borderRadius: 10,
        padding: "clamp(18px,2.5vw,30px) clamp(18px,2.8vw,34px)",
        display: "grid",
        gridTemplateColumns: "52px 1fr",
        gap: "0 clamp(16px,2.5vw,28px)",
        transition: "border-color 0.25s, box-shadow 0.25s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Rust left edge on hover */}
      <div
        ref={edgeRef}
        aria-hidden
        style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 2,
          background: `linear-gradient(to bottom, transparent, ${ACCENT}80, transparent)`,
          opacity: 0, pointerEvents: "none",
        }}
      />

      {/* Ghost number */}
      <div style={{ paddingTop: 2 }}>
        <span ref={numRef} style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontStyle: "italic",
          fontSize: 52, fontWeight: 400,
          color: `rgba(196,64,10,0.10)`,
          lineHeight: 1, display: "block",
          userSelect: "none",
        }}>{p.number}</span>
      </div>

      {/* Content */}
      <div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(14,10,4,0.30)", marginBottom: 6 }}>{p.org}</p>
        <h3 style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, color: INK, marginBottom: 10, lineHeight: 1.3 }}>{p.name}</h3>

        <div className="card-body" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0 clamp(24px,4vw,48px)", alignItems: "start" }}>
          <div>
            <p ref={hookRef} style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontStyle: "italic",
              fontSize: 15, fontWeight: 400,
              color: ACCENT, lineHeight: 1.55, marginBottom: 10,
            }}>{p.hook}</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 300, color: "rgba(14,10,4,0.50)", lineHeight: 1.65, marginBottom: 14 }}>{p.description}</p>

            <div ref={tagsRef} style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
              {p.hotTags.map(t    => <span key={t} className="proj-tag tag-hot">{t}</span>)}
              {p.normalTags.map(t => <span key={t} className="proj-tag tag-normal">{t}</span>)}
            </div>

            <div style={{ display: "flex", gap: 18 }}>
              {p.links.github && (
                <a href={p.links.github} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: ACCENT, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, transition: "opacity 0.18s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.65")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >GitHub ↗</a>
              )}
              {p.links.live && (
                <a href={p.links.live} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(14,10,4,0.35)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, transition: "color 0.18s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(14,10,4,0.35)")}
                >Live ↗</a>
              )}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, paddingTop: 2, minWidth: 90 }}>
            {p.stats.map(s => <AnimatedStat key={s.label} {...s} triggered={triggered} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);

  return (
    <>
      <style>{`
        @media(max-width:640px){ .card-body{ grid-template-columns:1fr!important; } }
      `}</style>
      <section
        id="work"
        ref={ref}
        style={{
          background: "var(--bg-section)",
          padding: "clamp(72px,9vw,120px) clamp(20px,5vw,72px)",
        }}
      >
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <AnimatedHeading
            text="Selected"
            italic="projects"
            section="04"
            color={INK}
            accentColor={ACCENT}
            fontFamily="'Cormorant Garamond',Georgia,serif"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.number} p={p} index={i} />)}
          </div>
        </div>
      </section>
    </>
  );
}
