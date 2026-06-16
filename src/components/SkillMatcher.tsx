"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import AnimatedHeading from "./AnimatedHeading";
import Sparkles from "./Sparkles";

interface Preset {
  title: string;
  desc: string;
  score: number;
  skills: string[];
  feedback: string;
  skillsMatch: number;
  experienceMatch: number;
  keywordsMatch: number;
}

const PRESETS: Record<string, Preset> = {
  "fullstack": {
    title: "Full-Stack Engineer (React & FastAPI)",
    desc: "We are seeking a Full-Stack Software Engineer with experience in React, Next.js, and TypeScript. The backend should utilize Python (FastAPI) and PostgreSQL. Experience containerizing applications with Docker and deploying to AWS is a big plus.",
    score: 96,
    skills: ["React", "Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Docker", "AWS"],
    feedback: "Exceptional match! Abhijeet currently works as an SDE at Ecovis RKCA using Next.js and FastAPI. He has cut manual reporting times by 60%, built strict TypeScript frontends, and managed AWS cloud instances.",
    skillsMatch: 98,
    experienceMatch: 95,
    keywordsMatch: 95,
  },
  "ml": {
    title: "Machine Learning / AI Engineer",
    desc: "Looking for an ML Engineer to design predictive pipelines and RAG applications. Candidates must be proficient in Python, PyTorch, and ensemble models like XGBoost. Experience with vector search databases (FAISS) and GCP Vertex AI is preferred.",
    score: 98,
    skills: ["Python", "PyTorch", "XGBoost", "FAISS", "GCP"],
    feedback: "Phenomenal match! Top 0.1% selection at Amazon ML School. Placed in the top 0.1% nationally for product price prediction with XGBoost/LightGBM. Active open-source contributor with 4 merged PRs in TensorFlow & MLflow.",
    skillsMatch: 99,
    experienceMatch: 97,
    keywordsMatch: 98,
  },
  "data": {
    title: "Data & Analytics Engineer",
    desc: "Seeking a Data Engineer to develop robust ETL data pipelines. Experience with Microsoft Fabric (Lakehouses), PySpark, and Power BI dashboards with complex DAX calculations is required. Knowledge of SQL databases (PostgreSQL) is key.",
    score: 89,
    skills: ["MS Fabric", "Power BI", "PostgreSQL", "Python"],
    feedback: "Strong data alignment! Abhijeet is Microsoft Certified: Fabric Analytics Engineer (DP-600) and has delivered end-to-end Gold-layer ETL pipelines and Power BI dashboards for 5,000+ campaign records.",
    skillsMatch: 90,
    experienceMatch: 88,
    keywordsMatch: 89,
  }
};

interface SkillKeyword {
  name: string;
  keywords: string[];
  color: string;
}

const DETECTABLE_SKILLS: SkillKeyword[] = [
  { name: "Python",       keywords: ["python"],                                           color: "#3776AB" },
  { name: "TypeScript",   keywords: ["typescript", "ts"],                                  color: "#3178C6" },
  { name: "JavaScript",   keywords: ["javascript", "js", "es6"],                           color: "#F7DF1E" },
  { name: "Rust",         keywords: ["rust"],                                              color: "#CE412B" },
  { name: "React",        keywords: ["react", "react.js", "reactjs"],                      color: "#61DAFB" },
  { name: "Next.js",      keywords: ["next.js", "nextjs"],                                 color: "#555555" },
  { name: "Tailwind CSS", keywords: ["tailwind", "tailwindcss"],                           color: "#06B6D4" },
  { name: "Figma",        keywords: ["figma", "ui design"],                                color: "#F24E1E" },
  { name: "FastAPI",      keywords: ["fastapi", "swagger"],                                color: "#009688" },
  { name: "Node.js",      keywords: ["node", "node.js", "nodejs", "express"],              color: "#339933" },
  { name: "PostgreSQL",   keywords: ["postgres", "postgresql", "sql"],                     color: "#4169E1" },
  { name: "MongoDB",      keywords: ["mongodb", "mongo", "nosql"],                         color: "#47A248" },
  { name: "AWS",          keywords: ["aws", "amazon web services", "lambda", "s3", "ec2"], color: "#FF9900" },
  { name: "GCP",          keywords: ["gcp", "google cloud", "vertex ai", "bigquery"],      color: "#4285F4" },
  { name: "Azure",        keywords: ["azure", "aks", "devops"],                            color: "#0078D4" },
  { name: "Docker",       keywords: ["docker", "container", "containers", "ci/cd"],        color: "#2496ED" },
  { name: "PyTorch",      keywords: ["pytorch", "deep learning", "nn"],                   color: "#EE4C2C" },
  { name: "XGBoost",      keywords: ["xgboost", "boosting", "ensemble", "lightgbm", "catboost"], color: "#EA580C" },
  { name: "FAISS",        keywords: ["faiss", "vector search", "rag", "embeddings"],       color: "#0064E0" },
  { name: "MS Fabric",    keywords: ["fabric", "microsoft fabric", "lakehouse", "spark"],  color: "#7719AA" },
  { name: "Power BI",     keywords: ["power bi", "powerbi", "dax"],                        color: "#F2C811" },
];

export default function SkillMatcher() {
  const [inputText, setInputText]     = useState("");
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [scanning, setScanning]       = useState(false);
  const [scanLogs, setScanLogs]       = useState<string[]>([]);
  const [scanResult, setScanResult]   = useState<{
    score: number;
    matched: { name: string; color: string }[];
    feedback: string;
    skillsMatch: number;
    experienceMatch: number;
    keywordsMatch: number;
  } | null>(null);
  const [animScore, setAnimScore]     = useState(0);

  const logsEndRef  = useRef<HTMLDivElement>(null);
  const resultRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logsEndRef.current) logsEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [scanLogs]);

  const selectPreset = (key: string) => {
    setActivePreset(key);
    setInputText(PRESETS[key].desc);
  };

  const handleTextChange = (text: string) => {
    setInputText(text);
    setActivePreset(null);
  };

  const runScan = () => {
    if (!inputText.trim()) return;
    setScanning(true);
    setScanResult(null);
    setAnimScore(0);

    const logs: string[] = [];
    const lower = inputText.toLowerCase();

    let finalResult: typeof scanResult = null;

    if (activePreset && PRESETS[activePreset]) {
      const p = PRESETS[activePreset];
      const matched = DETECTABLE_SKILLS.filter(s =>
        s.keywords.some(k => lower.includes(k))
      );
      finalResult = {
        score: p.score,
        matched,
        feedback: p.feedback,
        skillsMatch: p.skillsMatch,
        experienceMatch: p.experienceMatch,
        keywordsMatch: p.keywordsMatch,
      };
    } else {
      const matched = DETECTABLE_SKILLS.filter(s =>
        s.keywords.some(k => lower.includes(k))
      );
      const baseScore = Math.min(95, 40 + matched.length * 4 + (lower.length > 200 ? 10 : 0));
      finalResult = {
        score: baseScore,
        matched,
        feedback: matched.length > 0
          ? `Detected ${matched.length} matching skills. Abhijeet covers ${Math.round((matched.length / DETECTABLE_SKILLS.length) * 100)}% of the detectable stack in this description.`
          : "No specific skills detected — try pasting a real job description.",
        skillsMatch: Math.min(99, baseScore + 2),
        experienceMatch: Math.max(60, baseScore - 5),
        keywordsMatch: Math.min(99, baseScore + 1),
      };
    }

    const steps = [
      "[INIT] Parsing job description...",
      "[SCAN] Extracting skill keywords...",
      "[MATCH] Cross-referencing against resume profile...",
      "[SCORE] Calculating weighted match score...",
      "[DONE] ATS scan complete.",
    ];

    steps.forEach((step, i) => {
      setTimeout(() => {
        setScanLogs(prev => [...prev, step]);
        if (i === steps.length - 1) {
          setTimeout(() => {
            setScanning(false);
            setScanResult(finalResult);
            let start = 0;
            const target = finalResult!.score;
            const inc = () => {
              start += 2;
              setAnimScore(Math.min(start, target));
              if (start < target) requestAnimationFrame(inc);
            };
            requestAnimationFrame(inc);
          }, 300);
        }
      }, i * 420);
    });
  };

  const scoreColor = scanResult
    ? scanResult.score >= 85 ? "#4a7c59"
      : scanResult.score >= 65 ? "#d19900"
      : "#b83227"
    : "var(--text-secondary)";

  return (
    <section id="ats" style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,72px)" }}>
      <style>{`
        @keyframes onlinePulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74,124,89,0.55); }
          50%       { opacity: 0.85; box-shadow: 0 0 0 6px rgba(74,124,89,0); }
        }
        .online-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4a7c59;
          animation: onlinePulse 2.2s ease-in-out infinite;
          flex-shrink: 0;
        }
        .preset-btn {
          padding: 7px 16px;
          border-radius: 6px;
          border: 1px solid var(--border-subtle);
          background: transparent;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .preset-btn:hover {
          background: var(--bg-card);
          color: var(--text-primary);
          border-color: var(--accent-primary);
        }
        .preset-btn.active {
          background: var(--accent-primary);
          color: #fff;
          border-color: var(--accent-primary);
        }
        .scan-textarea {
          width: 100%;
          min-height: 130px;
          padding: 14px 16px;
          border-radius: 8px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-card);
          font-family: var(--font-body);
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--text-primary);
          resize: vertical;
          transition: border-color 0.15s ease;
          outline: none;
        }
        .scan-textarea:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px color-mix(in oklch, var(--accent-primary) 15%, transparent);
        }
        .scan-btn {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: var(--accent-primary);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.1s ease, opacity 0.15s ease;
        }
        .scan-btn:hover:not(:disabled) { background: var(--accent-hover); transform: translateY(-1px); }
        .scan-btn:active:not(:disabled) { transform: translateY(0); }
        .scan-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .bar-track {
          height: 5px;
          border-radius: 999px;
          background: var(--border-subtle);
          overflow: hidden;
          flex: 1;
        }
        .bar-fill {
          height: 100%;
          border-radius: 999px;
          background: var(--accent-primary);
          transition: width 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .skill-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 9px;
          border-radius: 999px;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid;
          white-space: nowrap;
        }
        .log-line {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-secondary);
          line-height: 1.8;
          opacity: 0;
          animation: logFade 0.3s ease forwards;
        }
        @keyframes logFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
      `}</style>

      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%" }}>
        <AnimatedHeading section="05" text="ATS scoring" italic="Simulator" />

        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(0.9rem,0.85rem + 0.25vw,1rem)",
          color: "var(--text-secondary)",
          maxWidth: "58ch",
          lineHeight: 1.7,
          marginBottom: "clamp(28px,3.5vw,44px)",
        }}>
          Paste a job description or try one of the predefined hiring presets to check how Abhijeet&apos;s resume scores against your requirement profile in real time.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(20px,2.5vw,32px)",
        }}>
          {/* Left — Console */}
          <div className="glass-panel-light" style={{
            borderRadius: 12,
            padding: "clamp(18px,2.2vw,26px)",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}>
            {/* Console header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="online-dot" />
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                }}>Simulator Console</span>
              </div>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.12em",
                color: "#4a7c59",
                fontWeight: 700,
              }}>v1.3.0 // ONLINE</span>
            </div>

            {/* Presets */}
            <div>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                marginBottom: 10,
              }}>Select a Hiring Profile Preset:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {(["fullstack", "ml", "data"] as const).map(key => (
                  <button
                    key={key}
                    className={`preset-btn${activePreset === key ? " active" : ""}`}
                    onClick={() => selectPreset(key)}
                  >
                    {key === "fullstack" ? "💻 Full-Stack" : key === "ml" ? "🧠 ML / AI" : "📊 Data & BI"}
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea */}
            <div>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                marginBottom: 8,
              }}>Job Description Text</p>
              <textarea
                className="scan-textarea"
                value={inputText}
                onChange={e => handleTextChange(e.target.value)}
                placeholder="Paste requirements, stack specifications, or a job post description here to calculate the match percentage..."
              />
            </div>

            {/* Scan button */}
            <button
              className="scan-btn"
              onClick={runScan}
              disabled={scanning || !inputText.trim()}
            >
              {scanning ? "Scanning..." : "Run ATS Scan →"}
            </button>
          </div>

          {/* Right — Result */}
          <div className="glass-panel-light" style={{
            borderRadius: 12,
            padding: "clamp(18px,2.2vw,26px)",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            minHeight: 320,
          }}>
            {/* Scan logs */}
            {(scanning || scanLogs.length > 0) && !scanResult && (
              <div style={{
                background: "var(--bg-card)",
                borderRadius: 8,
                padding: "14px 16px",
                border: "1px solid var(--border-subtle)",
                flex: 1,
              }}>
                {scanLogs.map((log, i) => (
                  <div key={i} className="log-line">{log}</div>
                ))}
                <div ref={logsEndRef} />
              </div>
            )}

            {/* Empty state */}
            {!scanning && !scanResult && scanLogs.length === 0 && (
              <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                color: "var(--text-secondary)",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "2rem", opacity: 0.4 }}>🗂️</div>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}>Waiting for input profile</p>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  color: "var(--text-secondary)",
                  maxWidth: "28ch",
                  lineHeight: 1.6,
                }}>Choose a preset or fill the text console and hit “Run ATS Scan” to view reports.</p>
              </div>
            )}

            {/* Results */}
            {scanResult && (
              <div ref={resultRef} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Score ring area */}
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{
                    width: 80, height: 80,
                    borderRadius: "50%",
                    border: `4px solid ${scoreColor}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: `0 0 20px ${scoreColor}22`,
                  }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: scoreColor,
                    }}>{animScore}%</span>
                  </div>
                  <div>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "var(--text-primary)",
                      marginBottom: 4,
                    }}>ATS Match Score</p>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                      maxWidth: "28ch",
                    }}>{scanResult.feedback}</p>
                  </div>
                </div>

                {/* Sub-scores */}
                {[
                  { label: "Skills Match",      val: scanResult.skillsMatch },
                  { label: "Experience Match",  val: scanResult.experienceMatch },
                  { label: "Keywords Match",    val: scanResult.keywordsMatch },
                ].map(({ label, val }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-secondary)",
                      width: 120,
                      flexShrink: 0,
                    }}>{label}</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${val}%` }} />
                    </div>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: scoreColor,
                      width: 36,
                      textAlign: "right",
                      flexShrink: 0,
                    }}>{val}%</span>
                  </div>
                ))}

                {/* Matched skills */}
                {scanResult.matched.length > 0 && (
                  <div>
                    <p style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--text-secondary)",
                      marginBottom: 10,
                    }}>Matched Skills</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {scanResult.matched.map(s => (
                        <span key={s.name} className="skill-chip" style={{
                          background: `${s.color}18`,
                          borderColor: `${s.color}44`,
                          color: s.color,
                        }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, display: "inline-block" }} />
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reset */}
                <button
                  onClick={() => { setScanResult(null); setScanLogs([]); }}
                  style={{
                    alignSelf: "flex-start",
                    padding: "7px 14px",
                    borderRadius: 6,
                    border: "1px solid var(--border-subtle)",
                    background: "transparent",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent-primary)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  ↺ New Scan
                </button>
              </div>
            )}
          </div>
        </div>

        <Sparkles />
      </div>
    </section>
  );
}
