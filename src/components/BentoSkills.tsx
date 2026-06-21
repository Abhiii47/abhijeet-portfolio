"use client";

import { useRef, useState } from "react";
import { RMSticker, RMHr, RMSectionLabel } from "./RMDecorations";

const ACCENT  = "#C4400A";
const INK     = "#0E0A04";

type Level = "expert" | "strong" | "working";

type Skill = {
  name: string;
  icon: string;
  color: string;
  level: Level;
  desc: string;
  tags: string[];
  category: string;
  stat?: string; // optional headline metric
};

const SKILLS: Skill[] = [
  // Languages
  { name: "Python",      icon: "python",         color: "#3776AB", level: "expert",  category: "Languages", stat: "5+ yrs daily",    desc: "Primary ML/data language. Pandas, NumPy, Scikit-learn daily.",               tags: ["Pandas","NumPy","Sklearn","Jupyter"] },
  { name: "TypeScript",  icon: "typescript",     color: "#3178C6", level: "expert",  category: "Languages", stat: "Strict-mode",     desc: "Strict-mode TS across all full-stack projects. Generics, decorators.",       tags: ["Strict","Generics","ESM"] },
  { name: "JavaScript",  icon: "javascript",     color: "#F7DF1E", level: "expert",  category: "Languages", stat: "ES2024",           desc: "Modern ES2024, async patterns, browser APIs.",                               tags: ["ES2024","Async","DOM"] },
  { name: "Rust",        icon: "rust",           color: "#CE412B", level: "working", category: "Languages", stat: "Exploring",        desc: "Systems programming, CLI tools, exploring WASM targets.",                    tags: ["Systems","CLI","WASM"] },
  // Frontend
  { name: "React",       icon: "react",          color: "#61DAFB", level: "expert",  category: "Frontend",  stat: "4+ yrs",          desc: "Component-driven UIs, hooks, Zustand state, complex forms.",                tags: ["Hooks","Context","Zustand"] },
  { name: "Next.js",     icon: "nextjs",         color: "#000000", level: "expert",  category: "Frontend",  stat: "60% less reports", desc: "Full-stack apps, App Router, ISR. 60% drop in manual reporting at Ecovis.", tags: ["SSR","ISR","App Router"] },
  { name: "Tailwind",    icon: "tailwindcss",    color: "#06B6D4", level: "strong",  category: "Frontend",  stat: "v4 + JIT",         desc: "Utility-first CSS, design systems, custom tokens.",                        tags: ["v4","Tokens","JIT"] },
  { name: "Figma",       icon: "figma",          color: "#F24E1E", level: "strong",  category: "Frontend",  stat: "UI → Code",        desc: "UI/UX design, prototyping, auto-layout components.",                       tags: ["Components","Prototyping","Tokens"] },
  // Backend
  { name: "FastAPI",     icon: "fastapi",        color: "#009688", level: "expert",  category: "Backend",   stat: "<100ms latency",  desc: "High-perf async REST APIs, Swagger autodocs, Pydantic validation.",         tags: ["REST","Async","Pydantic"] },
  { name: "Node.js",     icon: "nodedotjs",      color: "#339933", level: "strong",  category: "Backend",   stat: "100+ concurrent", desc: "Express, Socket.io, real-time apps with 100+ concurrent users.",           tags: ["Express","Socket.io","WS"] },
  { name: "PostgreSQL",  icon: "postgresql",     color: "#4169E1", level: "strong",  category: "Backend",   stat: "RLS + Supabase",  desc: "Complex queries, indexing strategies, RLS with Supabase.",                  tags: ["SQL","RLS","Supabase"] },
  { name: "MongoDB",     icon: "mongodb",        color: "#47A248", level: "strong",  category: "Backend",   stat: "Geo queries",     desc: "Document modelling, aggregation pipelines, geospatial queries.",           tags: ["Aggregation","Atlas","Geo"] },
  // Cloud & DevOps
  { name: "AWS",         icon: "amazonaws",      color: "#FF9900", level: "strong",  category: "Cloud",     stat: "99.9% uptime",    desc: "Lambda, S3, RDS, EC2. 99.9% uptime post-migration at Ecovis RKCA.",       tags: ["Lambda","S3","RDS","EC2"] },
  { name: "GCP",         icon: "googlecloud",    color: "#4285F4", level: "strong",  category: "Cloud",     stat: "Vertex AI + BQ",  desc: "Vertex AI, Cloud Run, BigQuery, Pub/Sub.",                                 tags: ["Vertex AI","BigQuery","Run"] },
  { name: "Azure",       icon: "microsoftazure", color: "#0078D4", level: "strong",  category: "Cloud",     stat: "2wk → 2 days",    desc: "Azure DevOps, AKS, Functions. Release cycles cut from 2wk → 2 days.",     tags: ["AKS","DevOps","Functions"] },
  { name: "Docker",      icon: "docker",         color: "#2496ED", level: "strong",  category: "Cloud",     stat: "Multi-stage",     desc: "Containerised deployments, multi-stage builds, Compose.",                  tags: ["Compose","Registry","CI"] },
  // ML / Data
  { name: "PyTorch",     icon: "pytorch",        color: "#EE4C2C", level: "strong",  category: "ML / Data", stat: "3 prod models",   desc: "Deep learning, transformer fine-tuning, 3+ production models.",            tags: ["CNN","Transformers","CUDA"] },
  { name: "XGBoost",     icon: "python",         color: "#EA580C", level: "expert",  category: "ML / Data", stat: "Top 0.1% Amazon", desc: "Top 0.1% Amazon ML School. 92%+ accuracy ATS classifier.",                 tags: ["Ensemble","Boosting","SHAP"] },
  { name: "FAISS",       icon: "meta",           color: "#0064E0", level: "strong",  category: "ML / Data", stat: "<100ms retrieval", desc: "Vector search for RAG pipelines at Ecovis. Sub-100ms retrieval.",          tags: ["RAG","Embeddings","ANN"] },
  { name: "MS Fabric",   icon: "microsoft",      color: "#7719AA", level: "strong",  category: "ML / Data", stat: "DP-600 certified", desc: "Data pipelines, Lakehouse, DP-600 certified.",                             tags: ["Lakehouse","Spark","DP-600"] },
  { name: "Power BI",    icon: "powerbi",        color: "#F2C811", level: "strong",  category: "ML / Data", stat: "5K+ records",      desc: "DAX, star schema, 5K+ campaign records. Interactive drill-through.",       tags: ["DAX","Star Schema","KPI"] },
];

const CATEGORIES = ["All", "Languages", "Frontend", "Backend", "Cloud", "ML / Data"];

const LEVEL_BAR: Record<Level, number> = { expert: 95, strong: 72, working: 40 };
const LEVEL_LABEL: Record<Level, string> = { expert: "Expert", strong: "Proficient", working: "Working" };

function BrandIcon({ icon, color, size = 22 }: { icon: string; color: string; size?: number }) {
  const hex = color.replace("#", "");
  return (
    <img
      src={`https://cdn.simpleicons.org/${icon}/${hex}`}
      alt="" aria-hidden width={size} height={size} loading="lazy"
      style={{ display: "block", flexShrink: 0 }}
      onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
    />
  );
}

function SkillCard({ skill, index, featured }: { skill: Skill; index: number; featured?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const barWidth = LEVEL_BAR[skill.level];

  if (featured) {
    return (
      <div
        className="skill-card-reveal"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          animationDelay: `${index * 0.06}s`,
          background: "var(--bg-card)",
          border: hovered ? `1.5px solid ${skill.color}50` : "1px solid rgba(14,10,4,0.08)",
          borderRadius: 12,
          padding: "clamp(20px,2.4vw,28px)",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered
            ? `0 16px 40px ${skill.color}18, 4px 4px 0 ${skill.color}14`
            : "0 2px 8px rgba(14,10,4,0.04)",
          cursor: "default",
          gridColumn: "span 1",
        }}
      >
        {/* Radial glow background */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, borderRadius: 12, pointerEvents: "none",
          background: `radial-gradient(ellipse 80% 60% at 100% 0%, ${skill.color}0d 0%, transparent 70%)`,
          transition: "opacity 0.3s",
          opacity: hovered ? 1 : 0.5,
        }} />

        {/* Expert badge */}
        <div style={{
          position: "absolute", top: 14, right: 14,
          fontFamily: "var(--font-mono)", fontSize: "0.5rem",
          letterSpacing: "0.28em", textTransform: "uppercase",
          padding: "3px 8px", borderRadius: 3,
          background: `${ACCENT}14`, border: `1px solid ${ACCENT}40`,
          color: ACCENT, fontWeight: 700,
        }}>
          {LEVEL_LABEL[skill.level]}
        </div>

        {/* Icon */}
        <div style={{
          width: 48, height: 48, borderRadius: 10,
          background: `${skill.color}14`, border: `1.5px solid ${skill.color}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 14,
        }}>
          <BrandIcon icon={skill.icon} color={skill.color} size={24} />
        </div>

        <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.05rem,1.4vw,1.25rem)", color: INK, letterSpacing: "-0.02em" }}>
          {skill.name}
        </p>

        {skill.stat && (
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: skill.color, marginTop: 4, fontWeight: 700 }}>
            {skill.stat}
          </p>
        )}

        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 300, color: "rgba(14,10,4,0.52)", marginTop: 10, lineHeight: 1.6 }}>
          {skill.desc}
        </p>

        {/* Progress bar */}
        <div style={{ marginTop: 16 }}>
          <div style={{ height: 2, background: "rgba(14,10,4,0.07)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${barWidth}%`, borderRadius: 99,
              background: `linear-gradient(90deg, ${skill.color}90, ${skill.color})`,
              transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)",
            }} />
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 12 }}>
          {skill.tags.map(t => (
            <span key={t} className="tag-normal" style={{ fontSize: "0.52rem" }}>{t}</span>
          ))}
        </div>
      </div>
    );
  }

  // Regular compact card
  return (
    <div
      className="skill-card-reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animationDelay: `${index * 0.045}s`,
        background: "var(--bg-card)",
        border: hovered ? `1.5px solid ${skill.color}38` : "1px solid rgba(14,10,4,0.07)",
        borderRadius: 10,
        padding: "clamp(14px,1.8vw,18px)",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.22s, box-shadow 0.22s, transform 0.22s",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `0 10px 28px ${skill.color}12` : "none",
        cursor: "default",
      }}
    >
      <div aria-hidden style={{
        position: "absolute", inset: 0, borderRadius: 10, pointerEvents: "none",
        background: `radial-gradient(ellipse 70% 50% at 100% 0%, ${skill.color}09 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.25s",
      }} />

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8,
          background: `${skill.color}12`, border: `1px solid ${skill.color}25`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <BrandIcon icon={skill.icon} color={skill.color} size={17} />
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, color: INK, lineHeight: 1.2 }}>{skill.name}</p>
          {skill.stat && (
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: skill.color, marginTop: 2, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {skill.stat}
            </p>
          )}
        </div>
      </div>

      {/* Bar */}
      <div style={{ height: 2, background: "rgba(14,10,4,0.07)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${barWidth}%`, borderRadius: 99,
          background: `linear-gradient(90deg, ${skill.color}70, ${skill.color})`,
          transition: "width 0.7s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10 }}>
        {skill.tags.slice(0, 3).map(t => (
          <span key={t} className="tag-normal" style={{ fontSize: "0.5rem" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function BentoSkills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? SKILLS
    : SKILLS.filter(s => s.category === activeCategory);

  const experts = filtered.filter(s => s.level === "expert");
  const rest    = filtered.filter(s => s.level !== "expert");

  const expertCount  = SKILLS.filter(s => s.level === "expert").length;
  const strongCount  = SKILLS.filter(s => s.level === "strong").length;

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
        color: "rgba(196,64,10,0.028)", letterSpacing: "-0.04em",
        userSelect: "none", pointerEvents: "none", lineHeight: 1,
      }}>SKILLS</span>

      <style>{`
        @keyframes skillCardReveal {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .skill-card-reveal {
          opacity: 0;
          animation: skillCardReveal 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes barGrow {
          from { width: 0%; }
        }
        .skill-progress-bar {
          animation: barGrow 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .cat-btn {
          position: relative;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 4px;
          border: 1px solid rgba(14,10,4,0.12);
          background: var(--bg-card);
          color: rgba(14,10,4,0.45);
          cursor: pointer;
          transition: all 0.18s;
        }
        .cat-btn:hover { color: rgba(14,10,4,0.75); border-color: rgba(14,10,4,0.22); }
        .cat-btn.active {
          background: rgba(196,64,10,0.07);
          border-color: rgba(196,64,10,0.35);
          color: #C4400A;
        }
        .cat-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 50%; transform: translateX(-50%);
          width: 20px; height: 2px;
          background: #C4400A; border-radius: 99px;
        }
      `}</style>

      <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: "clamp(28px,4vw,44px)" }}>
          <div>
            <RMSectionLabel number="04" text="Skills" />
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(2rem,4.5vw,3.4rem)",
              color: INK, letterSpacing: "-0.02em", lineHeight: 1.05, marginTop: 8,
            }}>Technical Arsenal</h2>
            <p style={{
              fontFamily: "var(--font-body)", fontWeight: 300,
              fontSize: "clamp(0.85rem,1vw,1rem)",
              color: "rgba(14,10,4,0.48)", marginTop: 8, maxWidth: "48ch",
            }}>
              {SKILLS.length} technologies across {CATEGORIES.length - 1} domains.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <RMSticker text={`${expertCount} expert`}  accent rotate={-1.5} />
            <RMSticker text={`${strongCount} proficient`} rotate={1.5} />
          </div>
        </div>

        {/* ── Stat strip ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)",
          gap: "clamp(8px,1.2vw,12px)", marginBottom: "clamp(24px,3.5vw,40px)",
        }}>
          {[
            { label: "Expert", value: expertCount, color: ACCENT },
            { label: "Proficient", value: strongCount, color: "rgba(14,10,4,0.55)" },
            { label: "Total", value: SKILLS.length, color: "rgba(14,10,4,0.35)" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              background: "var(--bg-card)", border: "1px solid rgba(14,10,4,0.07)",
              borderRadius: 10, padding: "clamp(12px,1.6vw,18px) clamp(14px,2vw,22px)",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", color, letterSpacing: "-0.04em", lineHeight: 1 }}>{value}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(14,10,4,0.38)", lineHeight: 1.4 }}>{label}<br/>Skills</span>
            </div>
          ))}
        </div>

        {/* ── Category filter ── */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "clamp(20px,3vw,32px)" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`cat-btn${activeCategory === cat ? " active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "All" ? `All (${SKILLS.length})` : `${cat} (${SKILLS.filter(s => s.category === cat).length})`}
            </button>
          ))}
        </div>

        <RMHr label={activeCategory.toLowerCase()} />

        {/* ── Expert / Featured cards ── */}
        {experts.length > 0 && (
          <>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(196,64,10,0.5)", marginBottom: 12 }}>
              ★ Expert level
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(220px,100%), 1fr))",
              gap: "clamp(10px,1.4vw,14px)",
              marginBottom: "clamp(20px,3vw,32px)",
            }}>
              {experts.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} featured />
              ))}
            </div>
          </>
        )}

        {/* ── Proficient / Working cards ── */}
        {rest.length > 0 && (
          <>
            {experts.length > 0 && (
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(14,10,4,0.3)", marginBottom: 12 }}>
                ◆ Proficient &amp; working knowledge
              </p>
            )}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(190px,100%), 1fr))",
              gap: "clamp(8px,1.2vw,12px)",
            }}>
              {rest.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={experts.length + i} />
              ))}
            </div>
          </>
        )}

        {/* ── Legend ── */}
        <div style={{ display: "flex", gap: 20, marginTop: "clamp(28px,3.5vw,40px)", flexWrap: "wrap", alignItems: "center" }}>
          {([
            { key: "expert",  label: "Expert",     color: ACCENT, pct: 95 },
            { key: "strong",  label: "Proficient",  color: "rgba(14,10,4,0.55)", pct: 72 },
            { key: "working", label: "Working",     color: "rgba(14,10,4,0.30)", pct: 40 },
          ] as const).map(({ key, label, color, pct }) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 2, background: "rgba(14,10,4,0.06)", borderRadius: 99, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: color, borderRadius: 99 }} />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.56rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(14,10,4,0.38)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
