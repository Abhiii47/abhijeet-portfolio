"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";

gsap.registerPlugin(ScrollTrigger);

type Stat    = { num: string; label: string };
type Project = {
  number: string; org: string; name: string;
  hook: string; description: string;
  stats: Stat[]; hotTags: string[]; normalTags: string[];
  links: { github?: string; live?: string };
};

const PROJECTS: Project[] = [
  {
    number: "01", org: "Personal Project \u00b7 2023",
    name: "SmartResume \u2014 Resume Analysis Engine",
    hook: "ATS scoring engine that processes and scores 50,000+ resumes.",
    description: "FastAPI backend with XGBoost classifier. Feature extraction from structure, keyword density, and section completeness. Secure OAuth2 + JWT auth. Clean modular architecture.",
    stats: [{ num: "50K+", label: "Resumes processed" }, { num: "Live", label: "In production" }],
    hotTags: ["FastAPI", "XGBoost", "Python"],
    normalTags: ["OAuth2", "JWT", "PostgreSQL", "Clean Architecture"],
    links: { github: "https://github.com/Abhiii47", live: "https://github.com/Abhiii47" },
  },
  {
    number: "02", org: "Personal Project \u00b7 2023",
    name: "Room & Food Finder",
    hook: "Live hyperlocal platform \u2014 students use it daily to find housing and food near campus.",
    description: "Multi-role system (User/Provider/Admin) with real-time chat via Socket.io. Map-centric geo-search, Dockerized services, automated CI/CD pipeline.",
    stats: [{ num: "Live", label: "Active users" }, { num: "RT", label: "Real-time chat" }],
    hotTags: ["Node.js", "Socket.io", "Next.js"],
    normalTags: ["MongoDB", "Docker", "Maps API", "RBAC", "GitHub Actions"],
    links: { github: "https://github.com/Abhiii47" },
  },
  {
    number: "03", org: "Ecovis RKCA \u00b7 GCP \u00b7 2024",
    name: "RAG Knowledge Assistant",
    hook: "Internal knowledge retrieval system \u2014 ask a question, get an answer with source citations.",
    description: "Document ingestion \u2192 chunking \u2192 FAISS vector store \u2192 LLM answer generation. Deployed on GCP Vertex AI with streaming responses via SSE.",
    stats: [{ num: "GCP", label: "Deployed live" }, { num: "SSE", label: "Streaming output" }],
    hotTags: ["RAG", "Vertex AI", "FAISS"],
    normalTags: ["LangChain", "GCP", "Python", "LLMs"],
    links: { github: "https://github.com/Abhiii47" },
  },
  {
    number: "04", org: "Amazon ML Summer School \u00b7 2024",
    name: "Product Price Prediction Pipeline",
    hook: "End-to-end regression pipeline on 150,000+ records. Built for Amazon ML School \u2014 top 0.1% program.",
    description: "EDA \u2192 feature engineering \u2192 XGBoost regressor \u2192 hyperparameter optimization. Optimized on MAE and SMAPE metrics. Ensemble approach with bias-variance analysis.",
    stats: [{ num: "150K+", label: "Records processed" }, { num: "Top 0.1%", label: "Nationally" }],
    hotTags: ["XGBoost", "Python", "Feature Engineering"],
    normalTags: ["Pandas", "Scikit-learn", "MAE/SMAPE", "EDA"],
    links: { github: "https://github.com/Abhiii47" },
  },
];

const C = {
  bg: "#F5F0E8", surface: "#EDE8DF", border: "#DDD7CB",
  text: "#1A1208", muted: "#6B6056", hint: "#9A8F83",
  rust: "#C4400A", hotBg: "#FBE9E0", hotBorder: "#F0C4B0",
} as const;

/* ── Animated stat ── */
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
      <p style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontStyle: "italic", fontSize: 22, fontWeight: 400, color: C.rust, lineHeight: 1, marginBottom: 4 }}>{display}</p>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 400, letterSpacing: "0.26em", textTransform: "uppercase", color: C.hint }}>{label}</p>
    </div>
  );
}

/* ── Card ── */
function ProjectCard({ p, index }: { p: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numRef  = useRef<HTMLSpanElement>(null);
  const hookRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  /* IntersectionObserver for stat count-up */
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

  /* GSAP card reveal */
  useGSAP(() => {
    const card = cardRef.current;
    const num  = numRef.current;
    const hook = hookRef.current;
    const tags = tagsRef.current?.querySelectorAll(".proj-tag");
    if (!card) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: "top 85%", once: true },
    });

    /* Card body */
    tl.from(card, { y: 60, opacity: 0, duration: 0.7, ease: "power3.out" }, 0);
    /* Number slides in from left while card is rising */
    if (num)  tl.from(num,  { x: -20, opacity: 0, duration: 0.5, ease: "power2.out" }, 0.1);
    /* Hook slides from right after card lands */
    if (hook) tl.from(hook, { x: 30,  opacity: 0, duration: 0.6, ease: "power3.out" }, 0.3);
    /* Tags stagger */
    if (tags?.length) tl.from(Array.from(tags), { y: 8, opacity: 0, duration: 0.3, stagger: 0.03, ease: "power2.out" }, 0.45);
  }, { scope: cardRef });

  /* Hover via GSAP */
  const onEnter = () => gsap.to(cardRef.current, { y: -4, duration: 0.3, ease: "power2.out" });
  const onLeave = () => gsap.to(cardRef.current, { y: 0,  duration: 0.3, ease: "power2.out" });

  return (
    <div
      ref={cardRef}
      style={{
        background: C.surface, border: `0.5px solid ${C.border}`,
        borderRadius: 8, padding: "clamp(18px,2.5vw,28px) clamp(18px,2.8vw,32px)",
        display: "grid", gridTemplateColumns: "52px 1fr",
        gap: "0 clamp(16px,2.5vw,28px)",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={e => { onEnter(); (e.currentTarget as HTMLDivElement).style.borderColor = `${C.rust}80`; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(26,18,8,0.07)"; }}
      onMouseLeave={e => { onLeave(); (e.currentTarget as HTMLDivElement).style.borderColor = C.border; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
      {/* Number */}
      <div style={{ paddingTop: 2 }}>
        <span ref={numRef} style={{
          fontFamily: "'DM Serif Display',Georgia,serif", fontStyle: "italic",
          fontSize: 52, fontWeight: 400, color: C.border, lineHeight: 1,
          display: "block", userSelect: "none",
        }}>{p.number}</span>
      </div>

      {/* Content */}
      <div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: C.hint, marginBottom: 6 }}>{p.org}</p>
        <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 500, color: C.text, marginBottom: 10, lineHeight: 1.3 }}>{p.name}</h3>

        <div className="card-body" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0 clamp(24px,4vw,48px)", alignItems: "start" }}>
          <div>
            <p ref={hookRef} style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontStyle: "italic", fontSize: 15, fontWeight: 400, color: C.rust, lineHeight: 1.5, marginBottom: 10 }}>{p.hook}</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 300, color: C.muted, lineHeight: 1.65, marginBottom: 14 }}>{p.description}</p>
            <div ref={tagsRef} style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
              {p.hotTags.map(t => (
                <span key={t} className="proj-tag" style={{ padding: "4px 9px", borderRadius: 4, background: C.hotBg, border: `1px solid ${C.hotBorder}`, color: C.rust, fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 10, lineHeight: 1 }}>{t}</span>
              ))}
              {p.normalTags.map(t => (
                <span key={t} className="proj-tag" style={{ padding: "4px 9px", borderRadius: 4, background: C.bg, border: `1px solid ${C.border}`, color: C.hint, fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 10, lineHeight: 1 }}>{t}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 18 }}>
              {p.links.github && (
                <a href={p.links.github} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'DM Sans',monospace", fontSize: 10, fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: C.rust, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, transition: "color 0.18s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#A33508")}
                  onMouseLeave={e => (e.currentTarget.style.color = C.rust)}
                >GitHub &#8599;</a>
              )}
              {p.links.live && (
                <a href={p.links.live} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'DM Sans',monospace", fontSize: 10, fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: C.hint, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, transition: "color 0.18s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.rust)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.hint)}
                >Live &#8599;</a>
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
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        @media(max-width:640px){ .card-body{ grid-template-columns:1fr!important; } }
      `}</style>
      <section id="work" ref={ref} style={{ background: C.bg, padding: "clamp(72px,9vw,120px) clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <AnimatedHeading text="Selected" italic="projects" section="04" />
          <div className="proj-list" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.number} p={p} index={i} />)}
          </div>
        </div>
      </section>
    </>
  );
}
