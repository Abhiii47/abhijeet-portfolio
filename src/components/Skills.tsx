"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeading from "./AnimatedHeading";

gsap.registerPlugin(ScrollTrigger);

interface SkillTag {
  name: string;
  level: "Expert" | "Proficient" | "Working";
}

interface DomainCluster {
  id: string;
  name: string;
  icon: string;
  primary: {
    name: string;
    level: "Expert" | "Proficient" | "Working";
    desc: string;
    levelBar: number;
    stat: string;
  };
  supporting: SkillTag[];
}

const DOMAINS: DomainCluster[] = [
  {
    id: "AI/ML",
    name: "AI/ML",
    icon: "🤖",
    primary: {
      name: "Python",
      level: "Expert",
      desc: "Primary ML and deep learning interface. Pandas, NumPy, Scikit-learn daily for end-to-end model building.",
      levelBar: 95,
      stat: "5+ Yrs Daily",
    },
    supporting: [
      { name: "XGBoost", level: "Expert" },
      { name: "PyTorch", level: "Proficient" },
      { name: "FAISS", level: "Proficient" },
      { name: "Pandas", level: "Proficient" },
      { name: "NumPy", level: "Proficient" },
      { name: "Sklearn", level: "Proficient" },
    ],
  },
  {
    id: "Full-Stack",
    name: "Full-Stack",
    icon: "💻",
    primary: {
      name: "React & Next.js",
      level: "Expert",
      desc: "Robust frontends, App Router setups, SSR/ISR optimization, and state management. 6+ years building web UIs.",
      levelBar: 95,
      stat: "6+ Yrs",
    },
    supporting: [
      { name: "TypeScript", level: "Expert" },
      { name: "FastAPI", level: "Expert" },
      { name: "Node.js", level: "Proficient" },
      { name: "Tailwind CSS", level: "Proficient" },
    ],
  },
  {
    id: "Cloud & DevOps",
    name: "Cloud & DevOps",
    icon: "☁️",
    primary: {
      name: "GCP",
      level: "Proficient",
      desc: "Vertex AI pipeline triggers, BigQuery ETLs, credential stores, and containerized Cloud Run hosting.",
      levelBar: 72,
      stat: "Vertex AI + BQ",
    },
    supporting: [
      { name: "AWS", level: "Proficient" },
      { name: "Azure", level: "Proficient" },
      { name: "Docker", level: "Proficient" },
      { name: "CI/CD", level: "Proficient" },
    ],
  },
  {
    id: "Data & Analytics",
    name: "Data & Analytics",
    icon: "📊",
    primary: {
      name: "MS Fabric",
      level: "Proficient",
      desc: "DP-600 certified setup. Medallion architecture (Bronze/Silver/Gold) ingestion, PySpark, semantic modeling.",
      levelBar: 72,
      stat: "DP-600 Certified",
    },
    supporting: [
      { name: "Power BI", level: "Proficient" },
      { name: "PostgreSQL", level: "Proficient" },
      { name: "MongoDB", level: "Proficient" },
      { name: "Spark", level: "Proficient" },
    ],
  },
  {
    id: "Systems & Design",
    name: "Systems & Design",
    icon: "⚙️",
    primary: {
      name: "Rust",
      level: "Working",
      desc: "Exploring memory safety constraints, performance-centric WASM targets, and compiled systems utilities.",
      levelBar: 40,
      stat: "Exploring",
    },
    supporting: [
      { name: "Figma", level: "Proficient" },
      { name: "JavaScript", level: "Expert" },
      { name: "DOM", level: "Expert" },
    ],
  },
];

const TINT_CLASSES: Record<string, string> = {
  "AI/ML": "glass-tint-ai",
  "Full-Stack": "glass-tint-fs",
  "Cloud & DevOps": "glass-tint-cloud",
  "Data & Analytics": "glass-tint-data",
  "Systems & Design": "glass-tint-ai",
};

function DomainCard({ domain }: { domain: DomainCluster }) {
  const [expanded, setExpanded] = useState(false);

  const visibleSupporting = expanded ? domain.supporting : domain.supporting.slice(0, 3);
  const tintClass = TINT_CLASSES[domain.id] || "";

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`domain-card glass-panel-light ${tintClass}`}
      style={{
        borderRadius: "12px",
        padding: "clamp(20px,2.4vw,28px)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{domain.icon}</span>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "var(--text-primary)",
            margin: 0,
          }}>{domain.name}</h3>
        </div>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: 8,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}>
          {expanded ? "Less ▲" : "More ▼"}
        </span>
      </div>

      {/* Primary Skill */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>
            {domain.primary.name}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--accent-primary)", fontWeight: 700 }}>
            {domain.primary.level.toUpperCase()} &bull; {domain.primary.stat}
          </span>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: 12, lineHeight: 1.5 }}>
          {domain.primary.desc}
        </p>

        {/* Progress Bar */}
        <div style={{ height: 2, background: "var(--border-subtle)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${domain.primary.levelBar}%`,
            background: "var(--accent-primary)",
            borderRadius: 99,
          }} />
        </div>
      </div>

      {/* Supporting Tags */}
      <div>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: 8,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginBottom: 8,
        }}>Supporting Skills</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {visibleSupporting.map(skill => {
            const levelColor = skill.level === "Expert" ? "var(--accent-primary)" : skill.level === "Proficient" ? "var(--text-secondary)" : "var(--text-muted)";
            const levelBg = skill.level === "Expert" ? "rgba(184, 50, 39, 0.06)" : "var(--border-subtle)";
            const borderStyle = skill.level === "Working" ? "dashed" : "solid";

            return (
              <span
                key={skill.name}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  padding: "4px 8px",
                  borderRadius: 4,
                  background: levelBg,
                  color: levelColor,
                  border: `1px ${borderStyle} var(--border-subtle)`,
                }}
              >
                {skill.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = DOMAINS.filter(domain => {
    if (activeCategory === "All") return true;
    if (activeCategory === "AI/ML") return domain.id === "AI/ML";
    if (activeCategory === "Full-Stack") return domain.id === "Full-Stack";
    if (activeCategory === "Cloud") return domain.id === "Cloud & DevOps";
    if (activeCategory === "Data") return domain.id === "Data & Analytics" || domain.id === "Systems & Design";
    return true;
  });

  useGSAP(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set(".domain-card", { y: 0, opacity: 1 });
      return;
    }

    gsap.fromTo(".domain-card",
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.20, stagger: 0.06, ease: "power1.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
      }
    );
  }, { scope: gridRef, dependencies: [activeCategory] });

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
        padding: "clamp(72px,9vw,120px) clamp(20px,5vw,72px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ghost watermark */}
      <span aria-hidden style={{
        position: "absolute", right: "-0.02em", top: 40,
        fontFamily: "var(--font-display)", fontWeight: 800,
        fontSize: "clamp(5rem,12vw,12rem)",
        color: "var(--accent-primary)",
        opacity: 0.03,
        letterSpacing: "-0.04em",
        userSelect: "none", pointerEvents: "none", lineHeight: 1,
      }}>SKILLS</span>

      <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: "clamp(28px,4vw,44px)" }}>
          <div>
            <AnimatedHeading section="04" text="Technical" italic="Arsenal" />
            <p style={{
              fontFamily: "var(--font-body)", fontWeight: 400,
              fontSize: "clamp(0.85rem,1vw,1rem)",
              color: "var(--text-secondary)", marginTop: 8, maxWidth: "48ch",
            }}>
              21 technologies across 5 domains.
            </p>
          </div>
        </div>

        {/* Stat strip */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)",
          gap: "clamp(8px,1.2vw,12px)", marginBottom: "clamp(24px,3.5vw,40px)",
        }}>
          {[
            { label: "Expert Skills", value: 7, color: "var(--accent-primary)" },
            { label: "Proficient Skills", value: 13, color: "var(--text-secondary)" },
            { label: "Total Techs", value: 21, color: "var(--text-muted)" },
          ].map(({ label, value, color }) => (
            <div key={label} className="glass-panel-light" style={{
              borderRadius: "12px", padding: "clamp(12px,1.6vw,18px) clamp(14px,2vw,22px)",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", color, letterSpacing: "-0.04em", lineHeight: 1 }}>{value}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)", lineHeight: 1.4 }}>
                {label.split(" ")[0]}<br />{label.split(" ")[1]}
              </span>
            </div>
          ))}
        </div>

        {/* Category filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "clamp(24px,3.5vw,40px)" }}>
          {["All", "AI/ML", "Full-Stack", "Cloud", "Data"].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "8px 16px",
                borderRadius: "999px",
                border: "1.5px solid var(--border-subtle)",
                background: activeCategory === cat ? "var(--accent-primary)" : "var(--bg-card)",
                color: activeCategory === cat ? "#fff" : "var(--text-secondary)",
                cursor: "pointer",
                borderColor: activeCategory === cat ? "var(--accent-primary)" : "var(--border-subtle)",
                transition: "all 0.15s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Domain Cluster Cards Grid */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))",
            gap: "clamp(16px,2vw,24px)",
          }}
        >
          {filtered.map((domain) => (
            <DomainCard key={domain.id} domain={domain} />
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 20, marginTop: "clamp(28px,3.5vw,40px)", flexWrap: "wrap", alignItems: "center" }}>
          {[
            { label: "Expert",     color: "var(--accent-primary)",               pct: 95 },
            { label: "Proficient", color: "var(--text-secondary)",               pct: 72 },
            { label: "Working",    color: "var(--text-muted)",                  pct: 40 },
          ].map(({ label, color, pct }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 2, background: "var(--border-subtle)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99 }} />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.54rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
