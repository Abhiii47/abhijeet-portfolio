"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { RMSticker, RMHr, RMZigzag, RMSectionLabel } from "./RMDecorations";

const ACCENT = "#C4400A";
const INK    = "#0E0A04";

type Skill = {
  name: string;
  icon: string;
  color: string;
  level: "expert" | "strong" | "working";
  desc: string;
  tags: string[];
  category: string;
};

const SKILLS: Skill[] = [
  // Languages
  { name: "Python",      icon: "python",         color: "#3776AB", level: "expert",  category: "Languages", desc: "Primary ML/data language. Pandas, NumPy, Scikit-learn daily.",               tags: ["Pandas","NumPy","Sklearn","Jupyter"] },
  { name: "TypeScript",  icon: "typescript",     color: "#3178C6", level: "expert",  category: "Languages", desc: "Strict-mode TS across all full-stack projects. Generics, decorators.",       tags: ["Strict","Generics","ESM"] },
  { name: "JavaScript", icon: "javascript",     color: "#F7DF1E", level: "expert",  category: "Languages", desc: "Modern ES2024, async patterns, browser APIs.",                               tags: ["ES2024","Async","DOM"] },
  { name: "Rust",        icon: "rust",           color: "#CE412B", level: "working", category: "Languages", desc: "Systems programming, CLI tools, exploring WASM targets.",                    tags: ["Systems","CLI","WASM"] },
  // Frontend
  { name: "React",       icon: "react",          color: "#61DAFB", level: "expert",  category: "Frontend",  desc: "Component-driven UIs, hooks, Zustand state, complex forms.",                tags: ["Hooks","Context","Zustand"] },
  { name: "Next.js",     icon: "nextjs",         color: "#000000", level: "expert",  category: "Frontend",  desc: "Full-stack apps, App Router, ISR. 60% drop in manual reporting at Ecovis.", tags: ["SSR","ISR","App Router"] },
  { name: "Tailwind",    icon: "tailwindcss",    color: "#06B6D4", level: "strong",  category: "Frontend",  desc: "Utility-first CSS, design systems, custom tokens.",                        tags: ["v4","Tokens","JIT"] },
  { name: "Figma",       icon: "figma",          color: "#F24E1E", level: "strong",  category: "Frontend",  desc: "UI/UX design, prototyping, auto-layout components.",                       tags: ["Components","Prototyping","Tokens"] },
  // Backend
  { name: "FastAPI",     icon: "fastapi",        color: "#009688", level: "expert",  category: "Backend",   desc: "High-perf async REST APIs, Swagger autodocs, Pydantic validation.",         tags: ["REST","Async","Pydantic"] },
  { name: "Node.js",     icon: "nodedotjs",      color: "#339933", level: "strong",  category: "Backend",   desc: "Express, Socket.io, real-time apps with 100+ concurrent users.",           tags: ["Express","Socket.io","WS"] },
  { name: "PostgreSQL",  icon: "postgresql",     color: "#4169E1", level: "strong",  category: "Backend",   desc: "Complex queries, indexing strategies, RLS with Supabase.",                  tags: ["SQL","RLS","Supabase"] },
  { name: "MongoDB",     icon: "mongodb",        color: "#47A248", level: "strong",  category: "Backend",   desc: "Document modelling, aggregation pipelines, geospatial queries.",           tags: ["Aggregation","Atlas","Geo"] },
  // Cloud & DevOps
  { name: "AWS",         icon: "amazonaws",      color: "#FF9900", level: "strong",  category: "Cloud",     desc: "Lambda, S3, RDS, EC2. 99.9% uptime post-migration at Ecovis RKCA.",       tags: ["Lambda","S3","RDS","EC2"] },
  { name: "GCP",         icon: "googlecloud",    color: "#4285F4", level: "strong",  category: "Cloud",     desc: "Vertex AI, Cloud Run, BigQuery, Pub/Sub.",                                 tags: ["Vertex AI","BigQuery","Run"] },
  { name: "Azure",       icon: "microsoftazure", color: "#0078D4", level: "strong",  category: "Cloud",     desc: "Azure DevOps, AKS, Functions. Release cycles cut from 2wk → 2 days.",     tags: ["AKS","DevOps","Functions"] },
  { name: "Docker",      icon: "docker",         color: "#2496ED", level: "strong",  category: "Cloud",     desc: "Containerised deployments, multi-stage builds, Compose.",                  tags: ["Compose","Registry","CI"] },
  // ML / Data
  { name: "PyTorch",     icon: "pytorch",        color: "#EE4C2C", level: "strong",  category: "ML / Data", desc: "Deep learning, transformer fine-tuning, 3+ production models.",            tags: ["CNN","Transformers","CUDA"] },
  { name: "XGBoost",     icon: "python",         color: "#EA580C", level: "expert",  category: "ML / Data", desc: "Top 0.1% Amazon ML School. 92%+ accuracy ATS classifier.",                 tags: ["Ensemble","Boosting","SHAP"] },
  { name: "FAISS",       icon: "meta",           color: "#0064E0", level: "strong",  category: "ML / Data", desc: "Vector search for RAG pipelines at Ecovis. Sub-100ms retrieval.",          tags: ["RAG","Embeddings","ANN"] },
  { name: "MS Fabric",   icon: "microsoft",      color: "#7719AA", level: "strong",  category: "ML / Data", desc: "Data pipelines, Lakehouse, DP-600 certified.",                             tags: ["Lakehouse","Spark","DP-600"] },
  { name: "Power BI",    icon: "powerbi",        color: "#F2C811", level: "strong",  category: "ML / Data", desc: "DAX, star schema, 5K+ campaign records. Interactive drill-through.",       tags: ["DAX","Star Schema","KPI"] },
];

const CATEGORIES = ["All", "Languages", "Frontend", "Backend", "Cloud", "ML / Data"];

const LEVEL_LABEL: Record<string, string> = {
  expert:  "Expert",
  strong:  "Proficient",
  working: "Working knowledge",
};

const LEVEL_COLOR: Record<string, string> = {
  expert:  ACCENT,
  strong:  "rgba(14,10,4,0.55)",
  working: "rgba(14,10,4,0.30)",
};

function BrandIcon({ icon, size = 20 }: { icon: string; size?: number }) {
  return (
    <img
      src={`https://cdn.simpleicons.org/${icon}/0E0A04`}
      alt="" aria-hidden width={size} height={size} loading="lazy"
      style={{ display: "block", flexShrink: 0, opacity: 0.7 }}
      onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
    />
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      onClick={() => setOpen(o => !o)}
      className="proj-card-reveal"
      style={{
        animationDelay: `${(index % 12) * 0.04}s`,
        background: "var(--bg-card)",
        border: open ? `1.5px solid rgba(196,64,10,0.30)` : "1px solid rgba(14,10,4,0.07)",
        borderRadius: 10,
        padding: "clamp(14px,1.8vw,20px)",
        cursor: "pointer",
        transition: "border-color 0.2s,box-shadow 0.2s,transform 0.2s",
        boxShadow: open ? "3px 3px 0 rgba(196,64,10,0.12)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        if (!open) {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,64,10,0.20)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(196,64,10,0.06)";
        }
      }}
      onMouseLeave={e => {
        if (!open) {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(14,10,4,0.07)";
          (e.currentTarget as HTMLElement).style.transform = "";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }
      }}
    >
      {/* Ghost accent bar on active */}
      {open && (
        <div aria-hidden style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
          background: `linear-gradient(to bottom,transparent,${ACCENT},transparent)`,
          borderRadius: "10px 0 0 10px",
        }} />
      )}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: `${skill.color}14`,
            border: `1px solid ${skill.color}28`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <BrandIcon icon={skill.icon} size={18} />
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, color: INK, lineHeight: 1.2 }}>{skill.name}</p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", color: LEVEL_COLOR[skill.level], marginTop: 3 }}>
              {LEVEL_LABEL[skill.level]}
            </p>
          </div>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(14,10,4,0.25)", marginTop: 2, flexShrink: 0 }}>
          {open ? "▲" : "▼"}
        </span>
      </div>

      {/* Tags always visible */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10 }}>
        {skill.tags.map(t => (
          <span key={t} className="tag-normal" style={{ fontSize: "0.55rem" }}>{t}</span>
        ))}
      </div>

      {/* Expanded description */}
      {open && (
        <p style={{
          marginTop: 10,
          fontFamily: "var(--font-body)",
          fontSize: 12,
          fontWeight: 300,
          color: "rgba(14,10,4,0.55)",
          lineHeight: 1.65,
          borderTop: "1px dashed rgba(14,10,4,0.10)",
          paddingTop: 10,
        }}>{skill.desc}</p>
      )}
    </div>
  );
}

export default function BentoSkills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? SKILLS
    : SKILLS.filter(s => s.category === activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        background: "var(--bg-section)",
        color: INK,
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
        color: "rgba(196,64,10,0.035)", letterSpacing: "-0.04em",
        userSelect: "none", pointerEvents: "none", lineHeight: 1,
      }}>SKILLS</span>

      <style>{`
        @keyframes cardReveal {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .proj-card-reveal {
          opacity: 0;
          animation: cardReveal 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
        }
      `}</style>

      <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: "clamp(28px,4vw,48px)" }}>
          <div>
            <RMSectionLabel number="03" text="Skills" />
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(2rem,4.5vw,3.4rem)",
              color: INK, letterSpacing: "-0.02em", lineHeight: 1.05,
              marginTop: 8,
            }}>Technical Arsenal</h2>
            <p style={{
              fontFamily: "var(--font-body)", fontWeight: 300,
              fontSize: "clamp(0.85rem,1vw,1rem)",
              color: "rgba(14,10,4,0.48)", marginTop: 8, maxWidth: "48ch",
            }}>Click any card to expand. {SKILLS.length} technologies across {CATEGORIES.length - 1} domains.</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <RMSticker text={`${SKILLS.filter(s=>s.level==="expert").length} expert`} accent rotate={-1.5} />
            <RMSticker text={`${SKILLS.length} total`} rotate={1.5} />
          </div>
        </div>

        {/* Category filter tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "clamp(20px,3vw,36px)" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                padding: "7px 14px",
                borderRadius: 4,
                border: activeCategory === cat
                  ? `1.5px solid ${ACCENT}`
                  : "1px solid rgba(14,10,4,0.14)",
                background: activeCategory === cat
                  ? "rgba(196,64,10,0.08)"
                  : "var(--bg-card)",
                color: activeCategory === cat ? ACCENT : "rgba(14,10,4,0.45)",
                cursor: "pointer",
                transition: "all 0.18s",
              }}
            >{cat === "All" ? `All (${SKILLS.length})` : `${cat} (${SKILLS.filter(s=>s.category===cat).length})`}</button>
          ))}
        </div>

        <RMHr label={activeCategory.toLowerCase()} />

        {/* Skill cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(min(220px,100%),1fr))",
          gap: "clamp(8px,1.2vw,12px)",
        }}>
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 20, marginTop: "clamp(24px,3vw,36px)", flexWrap: "wrap" }}>
          {Object.entries(LEVEL_LABEL).map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: LEVEL_COLOR[k], flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(14,10,4,0.38)" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "clamp(40px,6vw,72px)" }}>
        <RMZigzag color="rgba(196,64,10,0.08)" />
      </div>
    </section>
  );
}
