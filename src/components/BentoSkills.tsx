"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#00d4ff";
const INK    = "#0A0F1E";

/* ──────────────────────────────────────
   SKILL DATA
────────────────────────────────────── */
const RINGS: {
  label: string;
  icon: string;
  color: string;
  ring: 1 | 2 | 3;
  angle: number;
  desc: string;
  tags: string[];
}[] = [
  /* Ring 1 — closest */
  { label: "Next.js",    icon: "nextjs",    color: "#000000", ring: 1, angle: 0,    desc: "Full-stack apps, internal tooling. 60% drop in manual reporting at Ecovis.",  tags: ["SSR","App Router","TypeScript"] },
  { label: "AWS",        icon: "amazonaws", color: "#FF9900", ring: 1, angle: 90,   desc: "Cloud migrations, Lambda, S3, RDS. 99.9% uptime at Ecovis RKCA.",             tags: ["Lambda","S3","RDS","EC2"] },
  { label: "Azure",      icon: "microsoftazure", color: "#0078D4", ring: 1, angle: 180,  desc: "Azure DevOps, AKS, CI/CD pipelines. Release cycles cut from 2 weeks to 2 days.", tags: ["AKS","DevOps","Functions"] },
  { label: "PyTorch",    icon: "pytorch",   color: "#EE4C2C", ring: 1, angle: 270,  desc: "Deep learning, transformer fine-tuning, 3+ production models.",               tags: ["CNN","Transformers","CUDA"] },
  /* Ring 2 */
  { label: "TypeScript", icon: "typescript",color: "#3178C6", ring: 2, angle: 36,   desc: "Strict-mode TS across all full-stack projects.",                              tags: ["Strict","Generics","Decorators"] },
  { label: "FastAPI",    icon: "fastapi",   color: "#009688", ring: 2, angle: 108,  desc: "High-perf async REST APIs, Swagger autodocs, Postgres.",                     tags: ["REST","Async","Pydantic"] },
  { label: "Python",     icon: "python",    color: "#3776AB", ring: 2, angle: 180,  desc: "Primary ML/data language. Pandas, NumPy, Scikit-learn.",                     tags: ["Pandas","NumPy","Sklearn"] },
  { label: "React",      icon: "react",     color: "#61DAFB", ring: 2, angle: 252,  desc: "Component-driven UIs, hooks, state management.",                              tags: ["Hooks","Context","Zustand"] },
  { label: "PostgreSQL", icon: "postgresql",color: "#4169E1", ring: 2, angle: 324,  desc: "Complex queries, indexing, RLS with Supabase.",                               tags: ["SQL","RLS","Supabase"] },
  /* Ring 3 — outer */
  { label: "Docker",     icon: "docker",    color: "#2496ED", ring: 3, angle: 20,   desc: "Containerised deployments, multi-stage builds.",                              tags: ["Compose","Registry","CI"] },
  { label: "Tailwind",   icon: "tailwindcss",color:"#06B6D4",ring: 3, angle: 80,   desc: "Utility-first CSS, design systems.",                                          tags: ["v4","Tokens","JIT"] },
  { label: "MS Fabric",  icon: "microsoft", color: "#7719AA", ring: 3, angle: 140,  desc: "Data pipelines, Lakehouse, DP-600 certified.",                                tags: ["Lakehouse","Spark","DP-600"] },
  { label: "XGBoost",    icon: "python",    color: "#EA580C", ring: 3, angle: 200,  desc: "Top 0.1% at Amazon ML School. 92%+ accuracy ATS classifier.",                tags: ["Ensemble","Boosting","SHAP"] },
  { label: "Figma",      icon: "figma",     color: "#F24E1E", ring: 3, angle: 260,  desc: "UI/UX design, prototyping, design systems.",                                  tags: ["Components","Prototyping","Tokens"] },
  { label: "Git",        icon: "git",       color: "#F05032", ring: 3, angle: 320,  desc: "Git flow, PR reviews, monorepo experience.",                                  tags: ["GitHub","CI/CD","Mono"] },
];

const RING_RADII = { 1: 130, 2: 215, 3: 300 }; /* px from center, desktop */
const RING_RADII_SM = { 1: 88, 2: 148, 3: 205 };

type SkillNode = typeof RINGS[number];

/* ── Simple Icons CDN helper ── */
function BrandIcon({ icon, color, size = 18 }: { icon: string; color: string; size?: number }) {
  return (
    <img
      src={`https://cdn.simpleicons.org/${icon}/${color.replace("#", "")}`}
      alt=""
      aria-hidden
      width={size}
      height={size}
      loading="lazy"
      style={{ display: "block", flexShrink: 0 }}
      onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
    />
  );
}

/* ── Central core ── */
function Core() {
  return (
    <div style={{
      position: "absolute",
      top: "50%", left: "50%",
      transform: "translate(-50%,-50%)",
      width: 76, height: 76,
      borderRadius: "50%",
      background: `radial-gradient(circle, rgba(0,212,255,0.18) 0%, rgba(0,212,255,0.04) 60%, transparent 100%)`,
      border: `1.5px solid rgba(0,212,255,0.35)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: `0 0 32px rgba(0,212,255,0.15)`,
      animation: "corePulse 3s ease-in-out infinite",
      zIndex: 10,
    }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M4 24 L10 8 L16 24 M6 17.5 H14" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 8 V24 M19 17 L27 8 M19 17 L27 24" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ── Orbit ring SVG ── */
function OrbitRing({ r, dashed = false }: { r: number; dashed?: boolean }) {
  const size = r * 2 + 4;
  return (
    <svg
      width={size} height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden
      style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none", overflow: "visible" }}
    >
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={`rgba(10,15,30,${dashed ? 0.07 : 0.09})`}
        strokeWidth={dashed ? 1 : 0.8}
        strokeDasharray={dashed ? "4 8" : undefined}
      />
    </svg>
  );
}

/* ── Skill node button ── */
function SkillNode({ skill, radius, isActive, onClick, isMobile }: {
  skill: SkillNode;
  radius: number;
  isActive: boolean;
  onClick: () => void;
  isMobile: boolean;
}) {
  const rad = (skill.angle - 90) * (Math.PI / 180);
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return (
    <button
      onClick={onClick}
      aria-label={skill.label}
      style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        width: isMobile ? 36 : 44,
        height: isMobile ? 36 : 44,
        borderRadius: "50%",
        background: isActive ? `rgba(0,212,255,0.12)` : "rgba(245,240,232,0.9)",
        border: isActive ? `1.5px solid ${ACCENT}` : `1px solid rgba(10,15,30,0.12)`,
        boxShadow: isActive
          ? `0 0 18px rgba(0,212,255,0.3), 0 4px 12px rgba(0,0,0,0.08)`
          : `0 2px 8px rgba(0,0,0,0.07)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
        zIndex: isActive ? 20 : 5,
        padding: 0,
      }}
      onMouseEnter={e => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.background = `rgba(0,212,255,0.08)`;
          (e.currentTarget as HTMLElement).style.borderColor = `rgba(0,212,255,0.4)`;
          (e.currentTarget as HTMLElement).style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.15)`;
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.background = "rgba(245,240,232,0.9)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(10,15,30,0.12)";
          (e.currentTarget as HTMLElement).style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`;
        }
      }}
    >
      <BrandIcon icon={skill.icon} color={isActive ? "00d4ff" : skill.color.replace("#","")} size={isMobile ? 16 : 20} />
    </button>
  );
}

/* ── Detail panel ── */
function DetailPanel({ skill, onClose }: { skill: SkillNode; onClose: () => void }) {
  return (
    <div
      style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "clamp(220px, 30vw, 300px)",
        background: "#0A0F1E",
        border: `1px solid rgba(0,212,255,0.2)`,
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
        zIndex: 30,
        animation: "panelIn 0.28s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <BrandIcon icon={skill.icon} color={skill.color.replace("#","")} size={22} />
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700, fontSize: "1.1rem", color: "white" }}>{skill.label}</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"; }}
        >&#x2715;</button>
      </div>
      <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.55)", lineHeight: 1.65, marginBottom: "12px" }}>{skill.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {skill.tags.map(t => (
          <span key={t} style={{
            padding: "2px 8px", borderRadius: "99px",
            background: `${skill.color}18`,
            border: `1px solid ${skill.color}30`,
            fontFamily: "monospace", fontSize: "9px",
            color: skill.color, letterSpacing: "0.12em", textTransform: "uppercase",
          }}>{t}</span>
        ))}
      </div>
      {/* connector dot at center */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 6, height: 6, borderRadius: "50%",
        background: ACCENT, transform: "translate(-50%,-50%)",
        boxShadow: `0 0 12px ${ACCENT}`,
        pointerEvents: "none",
      }} />
    </div>
  );
}

/* ═══════════════════════════
   MAIN SECTION
═══════════════════════════ */
export default function BentoSkills() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef   = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(() => {
    /* heading reveal */
    gsap.from(".skills-head", {
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
    });
    /* orbit scales in */
    gsap.from(orbitRef.current, {
      scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      scale: 0.78, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.1,
    });
    /* ring nodes fade in staggered */
    gsap.from(".skill-node-wrap", {
      scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      scale: 0, opacity: 0, duration: 0.5,
      stagger: { each: 0.04, from: "random" },
      ease: "back.out(1.6)",
      delay: 0.3,
    });
  }, { scope: sectionRef });

  const radii = isMobile ? RING_RADII_SM : RING_RADII;
  const orbitSize = (radii[3] + 52) * 2;
  const activeSkill = RINGS.find(s => s.label === active) ?? null;

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ background: "var(--bg-body, #F5F0E8)", color: INK, position: "relative", overflow: "hidden" }}
      className="w-full py-28 px-6 md:px-14"
    >
      {/* ghost number */}
      <span aria-hidden style={{
        position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(8rem,18vw,18rem)", fontWeight: 900, lineHeight: 1,
        color: "transparent", WebkitTextStroke: "1px rgba(10,15,30,0.05)",
        pointerEvents: "none", userSelect: "none",
      }}>03</span>

      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="mb-16">
          <p className="skills-head font-mono text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: ACCENT }}>03 &nbsp;/&nbsp; Skills</p>
          <h2 className="skills-head font-serif font-bold leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)", color: INK, letterSpacing: "-0.02em" }}>
            Technical Arsenal
          </h2>
          <p className="skills-head mt-3" style={{ fontSize: "clamp(0.85rem,1vw,1rem)", color: "rgba(10,15,30,0.5)", maxWidth: "48ch" }}>
            Click any node to explore. Hover to preview. Built across cloud, ML, and full-stack.
          </p>
        </div>

        {/* orbit stage */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            ref={orbitRef}
            style={{
              position: "relative",
              width: orbitSize, height: orbitSize,
              flexShrink: 0,
            }}
          >
            {/* rings */}
            <OrbitRing r={radii[1]} />
            <OrbitRing r={radii[2]} dashed />
            <OrbitRing r={radii[3]} />

            {/* center core */}
            <Core />

            {/* nodes */}
            {RINGS.map(skill => (
              <div key={skill.label} className="skill-node-wrap" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "auto" }}>
                  <SkillNode
                    skill={skill}
                    radius={radii[skill.ring]}
                    isActive={active === skill.label}
                    onClick={() => setActive(active === skill.label ? null : skill.label)}
                    isMobile={isMobile}
                  />
                </div>
              </div>
            ))}

            {/* detail panel overlaid at center */}
            {activeSkill && (
              <DetailPanel skill={activeSkill} onClose={() => setActive(null)} />
            )}
          </div>
        </div>

        {/* legend row */}
        <div className="flex items-center justify-center gap-8 mt-12 flex-wrap">
          {([1,2,3] as const).map(r => (
            <div key={r} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: 24, height: 1, background: r === 2 ? `repeating-linear-gradient(90deg, rgba(10,15,30,0.25) 0, rgba(10,15,30,0.25) 4px, transparent 4px, transparent 12px)` : `rgba(10,15,30,0.22)` }} />
              <span style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(10,15,30,0.4)" }}>
                {r === 1 ? "Core Stack" : r === 2 ? "Extended" : "Tooling"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes corePulse {
          0%,100% { box-shadow: 0 0 32px rgba(0,212,255,0.12); }
          50%      { box-shadow: 0 0 52px rgba(0,212,255,0.25); }
        }
        @keyframes panelIn {
          from { opacity:0; transform: translate(-50%,-50%) scale(0.88); }
          to   { opacity:1; transform: translate(-50%,-50%) scale(1); }
        }
      `}</style>
    </section>
  );
}
