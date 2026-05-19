"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";
import { useProjectPreview, ProjectPreviewCard } from "./ProjectPreview";
import { RMSticker, RMZigzag, RMHr, RMSectionLabel } from "./RMDecorations";

const ACCENT = "#C4400A";
const INK    = "#0E0A04";

type Stat    = { num: string; label: string };
type Project = {
  number: string; org: string; name: string;
  hook: string; description: string;
  stats: Stat[]; hotTags: string[]; normalTags: string[];
  links: { github?: string; live?: string };
  image?: string;
};

const PROJECTS: Project[] = [
  {
    number: "01", org: "Personal Project · 2023",
    name: "SmartResume — Resume Analysis Engine",
    hook: "ATS scoring engine that processes and scores 50,000+ resumes.",
    description: "FastAPI backend with XGBoost classifier. Feature extraction from structure, keyword density, and section completeness. Secure OAuth2 + JWT auth.",
    stats: [{ num: "50K+", label: "Resumes" }, { num: "Live", label: "Production" }],
    hotTags: ["FastAPI", "XGBoost", "Python"],
    normalTags: ["OAuth2", "JWT", "PostgreSQL"],
    links: { github: "https://github.com/Abhiii47/SmartResume", live: "https://smart-resume-orcin.vercel.app/" },
    image: "https://api.microlink.io/?url=https%3A%2F%2Fsmart-resume-orcin.vercel.app%2F&screenshot=true&meta=false&embed=screenshot.url",
  },
  {
    number: "02", org: "Personal Project · 2023",
    name: "Room & Food Finder",
    hook: "Live hyperlocal platform — students use it daily to find housing and food near campus.",
    description: "Multi-role system (User/Provider/Admin) with real-time chat via Socket.io. Map-centric geo-search, Dockerized services, automated CI/CD.",
    stats: [{ num: "Live", label: "Active users" }, { num: "RT", label: "Real-time" }],
    hotTags: ["Node.js", "Socket.io", "Next.js"],
    normalTags: ["MongoDB", "Docker", "Maps API", "RBAC"],
    links: { github: "https://github.com/Abhiii47/Room_and_Food", live: "https://room-and-food.vercel.app/" },
    image: "https://api.microlink.io/?url=https%3A%2F%2Froom-and-food.vercel.app%2F&screenshot=true&meta=false&embed=screenshot.url",
  },
  {
    number: "03", org: "Ecovis RKCA · GCP · 2024",
    name: "RAG Knowledge Assistant",
    hook: "Internal knowledge retrieval — ask a question, get cited answers in seconds.",
    description: "Doc ingestion → chunking → FAISS vector store → LLM answer generation. Deployed on GCP Vertex AI with streaming responses via SSE.",
    stats: [{ num: "GCP", label: "Deployed" }, { num: "SSE", label: "Streaming" }],
    hotTags: ["RAG", "Vertex AI", "FAISS"],
    normalTags: ["LangChain", "GCP", "Python", "LLMs"],
    links: { github: "https://github.com/Abhiii47" },
  },
  {
    number: "04", org: "Amazon ML Summer School · 2024",
    name: "Amazon ML — Product Price Prediction",
    hook: "End-to-end regression on 150,000+ records. Top 0.1% nationally.",
    description: "EDA → feature engineering → XGBoost → hyperparameter optimization. Ensemble approach with bias-variance analysis. Optimized on MAE and SMAPE.",
    stats: [{ num: "150K+", label: "Records" }, { num: "Top 0.1%", label: "National" }],
    hotTags: ["XGBoost", "Python", "Feature Eng."],
    normalTags: ["Pandas", "Scikit-learn", "EDA"],
    links: { github: "https://github.com/Abhiii47/AmazonML_challange" },
    image: "https://opengraph.githubassets.com/1/Abhiii47/AmazonML_challange",
  },
  {
    number: "05", org: "Personal Project · 2024",
    name: "Marketing Analytics Dashboard",
    hook: "Power BI dashboard for CMOs — 5,000+ campaign records → actionable ROI.",
    description: "Star schema data model with advanced DAX. ROAS, CPA, MoM growth. Interactive drill-through across Facebook, Google Ads, LinkedIn.",
    stats: [{ num: "5K+", label: "Campaigns" }, { num: "4", label: "Ad channels" }],
    hotTags: ["Power BI", "DAX", "Data Modeling"],
    normalTags: ["Star Schema", "ROAS", "CPA"],
    links: { github: "https://github.com/Abhiii47/Marketing-Analytics-Dashboard" },
    image: "https://opengraph.githubassets.com/1/Abhiii47/Marketing-Analytics-Dashboard",
  },
  {
    number: "06", org: "Personal Project · 2026",
    name: "Medical Triage RL Environment",
    hook: "RL environment simulating emergency room triage decisions under constraint.",
    description: "Custom OpenAI Gym-compatible environment modeling patient arrival, severity scoring, and resource allocation. Agents learn via Q-learning and PPO.",
    stats: [{ num: "RL", label: "Policy" }, { num: "Gym", label: "Compatible" }],
    hotTags: ["Reinforcement Learning", "Python", "OpenAI Gym"],
    normalTags: ["PPO", "Q-Learning", "Healthcare AI"],
    links: { github: "https://github.com/Abhiii47/medical-triage-env" },
    image: "https://opengraph.githubassets.com/1/Abhiii47/medical-triage-env",
  },
  {
    number: "07", org: "Personal Project · 2026",
    name: "SalesVision — Sales Analytics",
    hook: "Full-stack sales intelligence with live dashboards and forecasting.",
    description: "Real-time sales metrics, trend forecasting, and team performance tracking. Built for sales managers to cut through noise and act on signal.",
    stats: [{ num: "Live", label: "Dashboard" }, { num: "RT", label: "Updates" }],
    hotTags: ["JavaScript", "Analytics", "Dashboard"],
    normalTags: ["Charts.js", "REST API", "Forecasting"],
    links: { github: "https://github.com/Abhiii47/SalesVision" },
    image: "https://opengraph.githubassets.com/1/Abhiii47/SalesVision",
  },
];

function AnimatedStat({ num, label }: Stat) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(num);
  const [ready,   setReady]   = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setReady(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;
    const numeric = parseFloat(num.replace(/[^0-9.]/g, ""));
    const suffix  = num.replace(/[0-9.,]/g, "");
    if (isNaN(numeric) || suffix === num) { setDisplay(num); return; }
    const dur = 1200, t0 = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const v = (1 - Math.pow(1 - p, 3)) * numeric;
      setDisplay((numeric % 1 === 0 ? Math.round(v).toLocaleString() : v.toFixed(1)) + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, num]);

  return (
    <div ref={wrapRef} style={{ textAlign: "right" }}>
      <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: 24, fontWeight: 700, color: ACCENT, lineHeight: 1, marginBottom: 3 }}>{display}</p>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(14,10,4,0.32)" }}>{label}</p>
    </div>
  );
}

function ProjectCard({ p, index, onEnter, onLeave, onMouseMove }: {
  p: Project; index: number;
  onEnter: (id: string) => void;
  onLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLDivElement>(null);

  // CSS-based reveal — no ScrollTrigger per card (eliminates lag)
  const delay = `${index * 0.06}s`;

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(cardRef.current, { y: -4, duration: 0.22, ease: "power2.out" });
    gsap.to(edgeRef.current, { opacity: 1, duration: 0.2 });
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1.03, duration: 0.35, ease: "power2.out" });
    const el = e.currentTarget as HTMLDivElement;
    el.style.borderColor = "rgba(196,64,10,0.22)";
    el.style.boxShadow   = "0 10px 36px rgba(196,64,10,0.07)";
    onEnter(p.number);
  };
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(cardRef.current, { y: 0, duration: 0.22, ease: "power2.out" });
    gsap.to(edgeRef.current, { opacity: 0, duration: 0.2 });
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1, duration: 0.35, ease: "power2.out" });
    const el = e.currentTarget as HTMLDivElement;
    el.style.borderColor = "rgba(14,10,4,0.07)";
    el.style.boxShadow   = "none";
    onLeave();
  };

  return (
    <div
      ref={cardRef}
      data-cursor="view"
      className="proj-card-reveal"
      style={{
        animationDelay: delay,
        background: "var(--bg-card)",
        border: "1px solid rgba(14,10,4,0.07)",
        borderRadius: 10,
        padding: "clamp(18px,2.5vw,28px) clamp(18px,2.8vw,32px)",
        display: "grid",
        gridTemplateColumns: "48px 1fr",
        gap: "0 clamp(14px,2vw,24px)",
        transition: "border-color 0.22s,box-shadow 0.22s",
        position: "relative", overflow: "hidden",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={onMouseMove}
    >
      {/* Accent edge */}
      <div ref={edgeRef} aria-hidden style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 2,
        background: `linear-gradient(to bottom,transparent,${ACCENT}80,transparent)`,
        opacity: 0, pointerEvents: "none",
      }} />

      {/* Number */}
      <div style={{ paddingTop: 2 }}>
        <span style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontStyle: "italic", fontSize: 48, fontWeight: 400,
          color: "rgba(196,64,10,0.10)", lineHeight: 1,
          display: "block", userSelect: "none",
        }}>{p.number}</span>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(14,10,4,0.30)" }}>{p.org}</p>
          {index === 0 && <RMSticker text="featured" accent rotate={-1.5} />}
          {index === 3 && <RMSticker text="top 0.1%" accent rotate={1.5} />}
        </div>

        <h3 style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, color: INK, marginBottom: 10, lineHeight: 1.3 }}>{p.name}</h3>

        {/* Screenshot */}
        {p.image && (
          <div style={{ marginBottom: 14, borderRadius: 7, overflow: "hidden", border: "1px solid rgba(14,10,4,0.07)", maxHeight: 180 }}>
            <div ref={imgRef} style={{ transformOrigin: "center center" }}>
              <img src={p.image} alt={`${p.name} preview`} width={900} height={180} loading="lazy" decoding="async"
                style={{ width: "100%", height: 180, objectFit: "cover", objectPosition: "top", display: "block" }} />
            </div>
          </div>
        )}

        <div className="card-body" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0 clamp(20px,3vw,40px)", alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: 15, color: ACCENT, lineHeight: 1.55, marginBottom: 9 }}>{p.hook}</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 300, color: "rgba(14,10,4,0.50)", lineHeight: 1.65, marginBottom: 12 }}>{p.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
              {p.hotTags.map(t    => <span key={t} className="proj-tag tag-hot">{t}</span>)}
              {p.normalTags.map(t => <span key={t} className="proj-tag tag-normal">{t}</span>)}
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {p.links.github && (
                <a href={p.links.github} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: ACCENT, textDecoration: "none", transition: "opacity 0.18s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.65")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >GitHub ↗</a>
              )}
              {p.links.live && (
                <a href={p.links.live} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(14,10,4,0.35)", textDecoration: "none", transition: "color 0.18s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(14,10,4,0.35)")}
                >Live ↗</a>
              )}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 2, minWidth: 84 }}>
            {p.stats.map(s => <AnimatedStat key={s.label} {...s} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { previewRef, active, onMouseMove, onEnter, onLeave } = useProjectPreview();

  return (
    <>
      <style>{`
        @keyframes cardReveal {
          from { opacity:0; transform:translateY(40px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .proj-card-reveal {
          opacity: 0;
          animation: cardReveal 0.55s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @media(max-width:640px){ .card-body{ grid-template-columns:1fr!important; } }
      `}</style>

      <ProjectPreviewCard previewRef={previewRef} active={active} />

      <section id="work" style={{
        background: "var(--bg-section)",
        padding: "clamp(72px,9vw,120px) clamp(20px,5vw,72px)",
        position: "relative",
      }}>
        {/* Funky ghost text */}
        <span aria-hidden style={{
          position: "absolute", right: "clamp(12px,3vw,40px)", top: 60,
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "clamp(4rem,9vw,9rem)",
          color: "rgba(196,64,10,0.04)", letterSpacing: "-0.04em",
          userSelect: "none", pointerEvents: "none", lineHeight: 1,
        }}>WORK</span>

        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: "clamp(32px,5vw,56px)" }}>
            <AnimatedHeading
              text="Selected"
              italic="projects"
              section="04"
              color={INK}
              accentColor={ACCENT}
              fontFamily="'Cormorant Garamond',Georgia,serif"
            />
            <RMSticker text={`${PROJECTS.length} projects`} rotate={-1.2} />
          </div>

          <RMHr label="all projects" />

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "clamp(20px,3vw,32px)" }}>
            {PROJECTS.map((p, i) => (
              <ProjectCard
                key={p.number}
                p={p}
                index={i}
                onEnter={onEnter}
                onLeave={onLeave}
                onMouseMove={onMouseMove}
              />
            ))}
          </div>
        </div>

        <div style={{ marginTop: "clamp(40px,6vw,72px)" }}>
          <RMZigzag color="rgba(196,64,10,0.10)" />
        </div>
      </section>
    </>
  );
}
