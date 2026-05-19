"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";

const ACCENT = "#C4400A";
const INK    = "#0E0A04";

type Tag = { label: string; role: string };

const TAGS: Tag[] = [
  { label: "Node.js",        role: "backend"  },
  { label: "FastAPI",        role: "backend"  },
  { label: "Docker",         role: "backend"  },
  { label: "PostgreSQL",     role: "backend"  },
  { label: "REST APIs",      role: "backend"  },
  { label: "XGBoost",        role: "ml"       },
  { label: "RAG / LLMs",     role: "ml"       },
  { label: "FAISS",          role: "ml"       },
  { label: "Scikit-learn",   role: "ml"       },
  { label: "Pandas",         role: "ml"       },
  { label: "AWS",            role: "cloud"    },
  { label: "GCP Vertex AI",  role: "cloud"    },
  { label: "CI/CD",          role: "cloud"    },
  { label: "Microsoft Fabric",role: "cloud"   },
  { label: "CloudWatch",     role: "cloud"    },
  { label: "React",          role: "frontend" },
  { label: "Next.js",        role: "frontend" },
  { label: "TypeScript",     role: "frontend" },
  { label: "GSAP",           role: "frontend" },
  { label: "Power BI",       role: "frontend" },
];

const RESULTS: Record<string, { title: string; desc: string; emoji: string }> = {
  backend:  { emoji: "⚙️",  title: "Backend Collaborator",   desc: "You care about APIs, data pipelines, and systems that don't fall over at 3 AM. We'd build something that actually scales." },
  ml:       { emoji: "🧠",  title: "ML Partner",             desc: "You're into models, vectors, and making computers do smart things. Let's train something together." },
  cloud:    { emoji: "☁️",  title: "Cloud Architect",        desc: "You think in infra. IAM roles, uptime SLAs, and deployment pipelines are your love language. Good taste." },
  frontend: { emoji: "🎨",  title: "Frontend Collaborator",  desc: "You notice when the easing curve is wrong. We'd make interfaces people actually enjoy using." },
  tie:      { emoji: "🔀",  title: "Full-Stack Wildcard",    desc: "You want all of it — backend, ML, cloud, UI. Same. Let's just build the whole thing." },
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function SkillMatcher() {
  const [pool]     = useState(() => shuffle(TAGS));
  const [picked,   setPicked]   = useState<string[]>([]);
  const [result,   setResult]   = useState<string | null>(null);
  const resultRef  = useRef<HTMLDivElement>(null);
  const MAX = 3;

  const toggle = (label: string) => {
    if (result) return;
    setPicked(prev => {
      if (prev.includes(label)) return prev.filter(l => l !== label);
      if (prev.length >= MAX) return prev;
      return [...prev, label];
    });
  };

  const reveal = () => {
    const counts: Record<string, number> = { backend: 0, ml: 0, cloud: 0, frontend: 0 };
    picked.forEach(label => {
      const tag = TAGS.find(t => t.label === label);
      if (tag) counts[tag.role]++;
    });
    const max = Math.max(...Object.values(counts));
    const winners = Object.keys(counts).filter(k => counts[k] === max);
    const res = winners.length > 1 ? "tie" : winners[0];
    setResult(res);
    setTimeout(() => {
      if (resultRef.current) {
        gsap.from(resultRef.current, { y: 24, opacity: 0, duration: 0.55, ease: "power3.out" });
      }
    }, 10);
  };

  const reset = () => { setPicked([]); setResult(null); };

  const r = result ? RESULTS[result] : null;

  return (
    <section
      id="skill-matcher"
      style={{
        background: "var(--bg-section)",
        padding: "clamp(72px,9vw,112px) clamp(20px,5vw,72px)",
        borderTop: "1px solid rgba(14,10,4,0.06)",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 10,
          letterSpacing: "0.38em", color: ACCENT,
          textTransform: "uppercase", marginBottom: 16,
        }}>Interactive</p>

        <h2 style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: "clamp(2rem,5vw,3.8rem)",
          fontWeight: 700, lineHeight: 1.05,
          letterSpacing: "-0.01em", color: INK,
          marginBottom: 12,
        }}>
          Which kind of engineer<br/>
          <span style={{ color: ACCENT, fontStyle: "italic" }}>are you?</span>
        </h2>

        <p style={{
          fontFamily: "var(--font-body)", fontSize: 14,
          color: "rgba(14,10,4,0.45)", lineHeight: 1.7,
          marginBottom: "clamp(32px,4vw,48px)", maxWidth: "52ch",
        }}>
          Pick <strong style={{ color: INK }}>3 technologies</strong> you work with (or want to). I&rsquo;ll tell you what kind of engineer you&rsquo;d be on my team.
        </p>

        {/* Tag cloud */}
        {!result && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
            {pool.map(tag => {
              const sel = picked.includes(tag.label);
              const disabled = !sel && picked.length >= MAX;
              return (
                <button
                  key={tag.label}
                  onClick={() => toggle(tag.label)}
                  disabled={disabled}
                  style={{
                    padding: "9px 18px",
                    borderRadius: 9999,
                    border: `1.5px solid ${sel ? ACCENT : "rgba(14,10,4,0.13)"}`,
                    background: sel ? ACCENT : "var(--bg-card)",
                    color: sel ? "#FFFCF6" : disabled ? "rgba(14,10,4,0.22)" : INK,
                    fontFamily: "var(--font-mono)",
                    fontSize: 11, letterSpacing: "0.04em",
                    cursor: disabled ? "not-allowed" : "pointer",
                    transition: "all 0.18s",
                    transform: sel ? "scale(1.06)" : "scale(1)",
                    opacity: disabled ? 0.45 : 1,
                  }}
                >{tag.label}</button>
              );
            })}
          </div>
        )}

        {/* Counter + CTA */}
        {!result && (
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              letterSpacing: "0.28em", textTransform: "uppercase",
              color: picked.length === MAX ? ACCENT : "rgba(14,10,4,0.30)",
              transition: "color 0.2s",
            }}>{picked.length} / {MAX} selected</span>

            <button
              onClick={reveal}
              disabled={picked.length < MAX}
              style={{
                padding: "11px 28px",
                borderRadius: 9999,
                border: "none",
                background: picked.length === MAX ? ACCENT : "rgba(14,10,4,0.07)",
                color: picked.length === MAX ? "#FFFCF6" : "rgba(14,10,4,0.25)",
                fontFamily: "var(--font-mono)",
                fontSize: 10, letterSpacing: "0.22em",
                textTransform: "uppercase", fontWeight: 600,
                cursor: picked.length === MAX ? "pointer" : "not-allowed",
                transition: "all 0.2s",
              }}
            >Reveal →</button>
          </div>
        )}

        {/* Result card */}
        {result && r && (
          <div
            ref={resultRef}
            style={{
              padding: "clamp(28px,4vw,48px)",
              border: `1.5px solid rgba(196,64,10,0.20)`,
              borderRadius: 16,
              background: "var(--bg-card)",
              boxShadow: "0 12px 48px rgba(196,64,10,0.07)",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>{r.emoji}</div>
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 9,
              letterSpacing: "0.36em", textTransform: "uppercase",
              color: ACCENT, marginBottom: 10,
            }}>Your match</p>
            <h3 style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: "clamp(1.8rem,4vw,3rem)",
              fontWeight: 700, color: INK,
              lineHeight: 1.1, marginBottom: 16,
            }}>{r.title}</h3>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 15,
              color: "rgba(14,10,4,0.55)", lineHeight: 1.75,
              maxWidth: "52ch", marginBottom: 28,
            }}>{r.desc}</p>

            {/* Picked tags recap */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
              {picked.map(label => (
                <span key={label} style={{
                  padding: "5px 12px", borderRadius: 9999,
                  background: "rgba(196,64,10,0.08)",
                  border: "1px solid rgba(196,64,10,0.20)",
                  color: ACCENT, fontFamily: "var(--font-mono)",
                  fontSize: 11,
                }}>{label}</span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a
                href="#contact"
                style={{
                  padding: "11px 26px", borderRadius: 9999,
                  background: ACCENT, color: "#FFFCF6",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10, letterSpacing: "0.22em",
                  textTransform: "uppercase", fontWeight: 600,
                  textDecoration: "none",
                  transition: "opacity 0.18s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >Let&rsquo;s work together →</a>

              <button
                onClick={reset}
                style={{
                  padding: "11px 26px", borderRadius: 9999,
                  border: "1px solid rgba(14,10,4,0.12)",
                  background: "transparent",
                  color: "rgba(14,10,4,0.40)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10, letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "color 0.18s, border-color 0.18s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = INK; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(14,10,4,0.30)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(14,10,4,0.40)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(14,10,4,0.12)"; }}
              >Try again</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
