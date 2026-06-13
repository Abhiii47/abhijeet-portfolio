"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import AnimatedHeading from "./AnimatedHeading";

const ACCENT = "var(--accent)";
const INK    = "var(--ink)";
const INK_MUTED = "var(--ink-muted)";
const INK_BORDER = "var(--ink-border)";

interface Preset {
  title: string;
  desc: string;
  score: number;
  skills: string[];
  feedback: string;
}

const PRESETS: Record<string, Preset> = {
  "fullstack": {
    title: "Full-Stack Engineer (React & FastAPI)",
    desc: "We are seeking a Full-Stack Software Engineer with experience in React, Next.js, and TypeScript. The backend should utilize Python (FastAPI) and PostgreSQL. Experience containerizing applications with Docker and deploying to AWS is a big plus.",
    score: 96,
    skills: ["React", "Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Docker", "AWS"],
    feedback: "Exceptional match! Abhijeet currently works as an SDE at Ecovis RKCA using Next.js and FastAPI. He has cut manual reporting times by 60%, built strict TypeScript frontends, and managed AWS cloud instances."
  },
  "ml": {
    title: "Machine Learning / AI Engineer",
    desc: "Looking for an ML Engineer to design predictive pipelines and RAG applications. Candidates must be proficient in Python, PyTorch, and ensemble models like XGBoost. Experience with vector search databases (FAISS) and GCP Vertex AI is preferred.",
    score: 98,
    skills: ["Python", "PyTorch", "XGBoost", "FAISS", "GCP"],
    feedback: "Phenomenal match! Top 0.1% selection at Amazon ML School. Placed in the top 0.1% nationally for product price prediction with XGBoost/LightGBM. Active open-source contributor with 4 merged PRs in TensorFlow & MLflow."
  },
  "data": {
    title: "Data & Analytics Engineer",
    desc: "Seeking a Data Engineer to develop robust ETL data pipelines. Experience with Microsoft Fabric (Lakehouses), PySpark, and Power BI dashboards with complex DAX calculations is required. Knowledge of SQL databases (PostgreSQL) is key.",
    score: 89,
    skills: ["MS Fabric", "Power BI", "PostgreSQL", "Python"],
    feedback: "Strong data alignment! Abhijeet is Microsoft Certified: Fabric Analytics Engineer (DP-600) and has delivered end-to-end Gold-layer ETL pipelines and Power BI dashboards for 5,000+ campaign records."
  }
};

interface SkillKeyword {
  name: string;
  keywords: string[];
  color: string;
}

const DETECTABLE_SKILLS: SkillKeyword[] = [
  { name: "Python", keywords: ["python"], color: "#3776AB" },
  { name: "TypeScript", keywords: ["typescript", "ts"], color: "#3178C6" },
  { name: "JavaScript", keywords: ["javascript", "js", "es6"], color: "#F7DF1E" },
  { name: "Rust", keywords: ["rust"], color: "#CE412B" },
  { name: "React", keywords: ["react", "react.js", "reactjs"], color: "#61DAFB" },
  { name: "Next.js", keywords: ["next.js", "nextjs"], color: "#555555" },
  { name: "Tailwind CSS", keywords: ["tailwind", "tailwindcss"], color: "#06B6D4" },
  { name: "Figma", keywords: ["figma", "ui design"], color: "#F24E1E" },
  { name: "FastAPI", keywords: ["fastapi", "swagger"], color: "#009688" },
  { name: "Node.js", keywords: ["node", "node.js", "nodejs", "express"], color: "#339933" },
  { name: "PostgreSQL", keywords: ["postgres", "postgresql", "sql"], color: "#4169E1" },
  { name: "MongoDB", keywords: ["mongodb", "mongo", "nosql"], color: "#47A248" },
  { name: "AWS", keywords: ["aws", "amazon web services", "lambda", "s3", "ec2"], color: "#FF9900" },
  { name: "GCP", keywords: ["gcp", "google cloud", "vertex ai", "bigquery"], color: "#4285F4" },
  { name: "Azure", keywords: ["azure", "aks", "devops"], color: "#0078D4" },
  { name: "Docker", keywords: ["docker", "container", "containers", "ci/cd"], color: "#2496ED" },
  { name: "PyTorch", keywords: ["pytorch", "deep learning", "nn"], color: "#EE4C2C" },
  { name: "XGBoost", keywords: ["xgboost", "boosting", "ensemble", "lightgbm", "catboost"], color: "#EA580C" },
  { name: "FAISS", keywords: ["faiss", "vector search", "rag", "embeddings"], color: "#0064E0" },
  { name: "MS Fabric", keywords: ["fabric", "microsoft fabric", "lakehouse", "spark"], color: "#7719AA" },
  { name: "Power BI", keywords: ["power bi", "powerbi", "dax"], color: "#F2C811" }
];

export default function SkillMatcher() {
  const [inputText, setInputText] = useState("");
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [scanResult, setScanResult] = useState<{
    score: number;
    matched: { name: string; color: string }[];
    feedback: string;
  } | null>(null);
  const [animScore, setAnimScore] = useState(0);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scanLogs]);

  const selectPreset = (key: string) => {
    setActivePreset(key);
    setInputText(PRESETS[key].desc);
  };

  const handleTextChange = (text: string) => {
    setInputText(text);
    setActivePreset(null); // Deselect preset since text is customized
  };

  const runScan = () => {
    if (!inputText.trim()) return;
    setScanning(true);
    setScanResult(null);
    setAnimScore(0);
    setScanLogs([]);

    const logs = [
      "Initializing ATS parsing engine...",
      "Extracting text tokens & normalizing casing...",
      "Cross-referencing resume skills index...",
      "Analyzing semantic density & phrasing...",
      "Calculating keyword-to-experience weight distribution...",
      "Generating match scorecard..."
    ];

    // Simulate logs output sequence
    logs.forEach((log, index) => {
      setTimeout(() => {
        setScanLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setTimeout(() => {
            calculateScore();
          }, 400);
        }
      }, (index + 1) * 300);
    });
  };

  const calculateScore = () => {
    const textLower = inputText.toLowerCase();
    const matched: { name: string; color: string }[] = [];

    // Detect keywords
    DETECTABLE_SKILLS.forEach(skill => {
      const isMatched = skill.keywords.some(kw => {
        // Match word boundaries to avoid false positives (e.g. 'js' in 'jobs')
        const regex = new RegExp(`\\b${kw.replace(".", "\\.")}\\b`, "i");
        return regex.test(textLower);
      });
      if (isMatched) {
        matched.push({ name: skill.name, color: skill.color });
      }
    });

    let score = 35; // base score representing general engineering, Mumbai location, and degree
    let feedback = "";

    // If preset is active, use its exact custom feedback and highly polished preset details
    if (activePreset && PRESETS[activePreset]) {
      const preset = PRESETS[activePreset];
      score = preset.score;
      feedback = preset.feedback;
    } else {
      // Dynamic score calculation
      score += matched.length * 9;

      // Bonus points for key engineering buzzwords matched to related items
      const hasML = /machine\s*learning|ml|ai|artificial|nlp|deep\s*learning|computer\s*vision/i.test(textLower);
      const hasFullstack = /full\s*stack|backend|frontend|api|web|software\s*engineer/i.test(textLower);
      const hasData = /data\s*engineer|analytics|bi|dashboard|lakehouse|etl/i.test(textLower);

      if (hasML && matched.some(m => ["PyTorch", "XGBoost", "FAISS", "Python"].includes(m.name))) {
        score += 8;
      }
      if (hasFullstack && matched.some(m => ["React", "Next.js", "FastAPI", "Node.js", "TypeScript"].includes(m.name))) {
        score += 8;
      }
      if (hasData && matched.some(m => ["MS Fabric", "Power BI", "PostgreSQL"].includes(m.name))) {
        score += 8;
      }

      // Constrain score
      if (matched.length === 0) {
        score = Math.max(20, Math.min(score, 40));
      } else {
        score = Math.min(score, 99); // Capped at 99% since perfect 100% is extremely rare in ATS algorithms
      }

      // Build dynamic feedback
      if (score >= 90) {
        feedback = `Incredible match! abhijeet-portfolio aligns perfectly. Detected ${matched.length} core competencies matching this description, backed by production deployment experience, GitHub commits, and certified expertise.`;
      } else if (score >= 75) {
        feedback = `Strong match. High overlap with core skill sets. Abhijeet has demonstrated professional mastery in ${matched.slice(0, 3).map(m => m.name).join(", ")}${matched.length > 3 ? " and others" : ""}. Very suitable candidate for this requirements profile.`;
      } else if (score >= 50) {
        feedback = `Moderate match. Abhijeet has foundational competencies in some of the requested areas. Consider reviewing his specific work history at Ecovis and open-source contributions for supplementary alignment.`;
      } else {
        feedback = `Low match detected. While Abhijeet's core stack focuses on Full-Stack, Machine Learning, and Data/Analytics pipelines, his adaptability and fast learning speed (as shown by his Amazon ML ranking) might still bridge any technology gaps.`;
      }
    }

    setScanning(false);
    setScanResult({ score, matched, feedback });

    // GSAP count-up effect
    setTimeout(() => {
      if (resultRef.current) {
        gsap.fromTo(resultRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
        );
      }
      
      const scoreVal = { val: 0 };
      gsap.to(scoreVal, {
        val: score,
        duration: 1.6,
        ease: "power3.out",
        onUpdate: () => {
          setAnimScore(Math.round(scoreVal.val));
        }
      });
    }, 50);
  };

  return (
    <section
      id="skill-matcher"
      style={{
        background: "var(--bg-section)",
        padding: "clamp(72px,9vw,112px) clamp(20px,5vw,72px)",
        borderTop: "1px solid var(--ink-border)",
      }}
    >
      <div style={{ maxWidth: 1040, margin: "0 auto", width: "100%" }}>
        {/* Header */}
        <AnimatedHeading section="05" text="ATS scoring" italic="Simulator" />

        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "var(--ink-muted)",
          lineHeight: 1.7,
          marginBottom: "clamp(32px,4vw,48px)",
          maxWidth: "60ch",
        }}>
          Paste a job description or try one of the predefined hiring presets to check how Abhijeet&rsquo;s resume scores against your requirement profile in real time.
        </p>

        {/* Bento Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
          gap: 24,
          alignItems: "start",
        }}>
          
          {/* Left Card: Input & Controls */}
          <div style={{
            background: "var(--bg-card)",
            border: "1.5px solid var(--ink-border)",
            borderRadius: 16,
            padding: "clamp(20px, 3vw, 32px)",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            boxShadow: "0 4px 24px rgba(14,10,4,0.02)",
          }}>
            {/* Terminal Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--ink-border)", paddingBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span className="avail-dot" style={{ width: 8, height: 8, background: "#10B981" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", color: "var(--ink-muted)", textTransform: "uppercase" }}>
                  Simulator Console
                </span>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--accent)" }}>
                v1.3.0 // ONLINE
              </span>
            </div>

            {/* Presets */}
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 8 }}>
                Select a Hiring Profile Preset:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {Object.keys(PRESETS).map(key => (
                  <button
                    key={key}
                    onClick={() => selectPreset(key)}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 9999,
                      border: activePreset === key ? `1.5px solid ${ACCENT}` : "1.5px solid var(--ink-border)",
                      background: activePreset === key ? `${ACCENT}08` : "transparent",
                      color: activePreset === key ? ACCENT : "var(--ink)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {key === "fullstack" ? "💻 Full-Stack" : key === "ml" ? "🧠 ML / AI" : "📊 Data & BI"}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input Textarea */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="ats-input" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
                Job Description text
              </label>
              <textarea
                id="ats-input"
                value={inputText}
                onChange={e => handleTextChange(e.target.value)}
                placeholder="Paste requirements, stack specifications, or a job post description here to calculate the match percentage..."
                style={{
                  width: "100%",
                  height: 140,
                  borderRadius: 8,
                  border: "1.5px solid var(--ink-border)",
                  background: "var(--bg-section)",
                  color: "var(--ink)",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  padding: 14,
                  resize: "none",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => e.currentTarget.style.borderColor = ACCENT}
                onBlur={e => e.currentTarget.style.borderColor = "var(--ink-border)"}
              />
            </div>

            {/* Scan Button */}
            <button
              onClick={runScan}
              disabled={scanning || !inputText.trim()}
              style={{
                width: "100%",
                padding: "14px 28px",
                borderRadius: 8,
                border: "none",
                background: inputText.trim() ? ACCENT : "rgba(14,10,4,0.06)",
                color: inputText.trim() ? "#FFFCF6" : "rgba(14,10,4,0.25)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
                cursor: inputText.trim() && !scanning ? "pointer" : "not-allowed",
                boxShadow: inputText.trim() && !scanning ? `0 4px 14px ${ACCENT}25` : "none",
                transition: "all 0.2s",
              }}
            >
              {scanning ? "Analyzing Profile..." : "Run ATS Scan →"}
            </button>
          </div>

          {/* Right Card: Output & Report */}
          <div style={{ minHeight: 360 }}>
            {/* Terminal logs when scanning */}
            {scanning && (
              <div style={{
                background: "#0D0A07",
                border: "1.5px solid rgba(245,242,235,0.15)",
                borderRadius: 16,
                padding: "clamp(20px, 3vw, 32px)",
                height: "100%",
                minHeight: 360,
                display: "flex",
                flexDirection: "column",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "#10B981",
                boxShadow: "0 12px 48px rgba(14,10,4,0.15)",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ borderBottom: "1px solid rgba(245,242,235,0.1)", paddingBottom: 10, marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
                  <span>PARSER_LOGS.EXE</span>
                  <span style={{ animation: "pulse 1s infinite alternate" }}>SCANNING...</span>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, overflowY: "auto" }}>
                  {scanLogs.map((log, index) => (
                    <div key={index} style={{ opacity: 0.9 }}>
                      <span style={{ color: "#E8572A" }}>&gt;</span> {log}
                    </div>
                  ))}
                  <div ref={logsEndRef} />
                </div>
                <div style={{ marginTop: 16, height: 3, background: "rgba(245,242,235,0.08)", overflow: "hidden", borderRadius: 9 }}>
                  <div style={{
                    width: `${(scanLogs.length / 6) * 100}%`,
                    height: "100%",
                    background: ACCENT,
                    transition: "width 0.3s ease",
                  }} />
                </div>
              </div>
            )}

            {/* Empty state when no scan run */}
            {!scanning && !scanResult && (
              <div style={{
                background: "var(--bg-card)",
                border: "1.5px dashed var(--ink-border)",
                borderRadius: 16,
                padding: "clamp(20px, 3vw, 32px)",
                height: "100%",
                minHeight: 360,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "var(--ink-muted)",
                gap: 16,
              }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "var(--bg-section)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  color: ACCENT,
                }}>
                  📋
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 15, color: INK, marginBottom: 4 }}>
                    Waiting for input profile
                  </h4>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-muted)", maxWidth: "28ch", margin: "0 auto", lineHeight: 1.5 }}>
                    Choose a preset or fill the text console and hit &ldquo;Run ATS Scan&rdquo; to view reports.
                  </p>
                </div>
              </div>
            )}

            {/* Results Report Card */}
            {!scanning && scanResult && (
              <div
                ref={resultRef}
                style={{
                  background: "var(--bg-card)",
                  border: `1.5px solid ${scanResult.score >= 85 ? ACCENT : "var(--ink-border)"}`,
                  borderRadius: 16,
                  padding: "clamp(20px, 3vw, 32px)",
                  boxShadow: scanResult.score >= 85 ? `0 12px 48px ${ACCENT}08` : "0 4px 24px rgba(14,10,4,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                  opacity: 0,
                }}
              >
                {/* Meter + Quick Info */}
                <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                  {/* Circular Dial */}
                  <div style={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}>
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="transparent"
                        stroke="var(--bg-section)"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="transparent"
                        stroke={ACCENT}
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 42}
                        strokeDashoffset={2 * Math.PI * 42 * (1 - animScore / 100)}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                        style={{ transition: "stroke-dashoffset 0.1s" }}
                      />
                    </svg>
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: INK, lineHeight: 1 }}>
                        {animScore}%
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, textTransform: "uppercase", color: "var(--ink-muted)", letterSpacing: "0.05em", marginTop: 2 }}>
                        Match
                      </span>
                    </div>
                  </div>

                  {/* Summary labels */}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 8,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: ACCENT,
                      fontWeight: 700,
                    }}>
                      ATS Score Report
                    </span>
                    <h3 style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                      fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                      color: INK,
                      marginTop: 4,
                      lineHeight: 1.2,
                    }}>
                      {scanResult.score >= 90 ? "★ Elite Match Rate" : scanResult.score >= 75 ? "✔ Optimal Match Rate" : "◆ Moderate Match Rate"}
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                      <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "rgba(16,185,129,1)", display: "flex", alignItems: "center", gap: 4 }}>
                        ● Structure Valid
                      </span>
                      <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "rgba(16,185,129,1)", display: "flex", alignItems: "center", gap: 4 }}>
                        ● Impact Quantified
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI feedback block */}
                <div style={{
                  background: "var(--bg-section)",
                  borderLeft: `3.5px solid ${ACCENT}`,
                  borderRadius: "0 8px 8px 0",
                  padding: "14px 18px",
                }}>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    color: "var(--ink)",
                    margin: 0,
                  }}>
                    {scanResult.feedback}
                  </p>
                </div>

                {/* Matched Tags */}
                <div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 10 }}>
                    Matched Skill Tokens ({scanResult.matched.length}):
                  </p>
                  {scanResult.matched.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {scanResult.matched.map(skill => (
                        <span
                          key={skill.name}
                          style={{
                            padding: "5px 12px",
                            borderRadius: 9999,
                            background: `${skill.color}10`,
                            border: `1.5px solid ${skill.color}25`,
                            color: skill.color,
                            fontFamily: "var(--font-mono)",
                            fontSize: 10,
                            fontWeight: 600,
                          }}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, fontStyle: "italic", color: "var(--ink-hint)", margin: 0 }}>
                      No exact keyword matches found. Score based on educational background, geographic location, and baseline engineering compatibility.
                    </p>
                  )}
                </div>

                {/* Call to Actions */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", borderTop: "1px solid var(--ink-border)", paddingTop: 18, marginTop: 4 }}>
                  <a
                    href="#contact"
                    style={{
                      padding: "11px 24px",
                      borderRadius: 9999,
                      background: ACCENT,
                      color: "#FFFCF6",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      textDecoration: "none",
                      textAlign: "center",
                      transition: "opacity 0.18s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    Send Offer ↗
                  </a>
                  <button
                    onClick={() => { setScanResult(null); setInputText(""); setActivePreset(null); }}
                    style={{
                      padding: "11px 24px",
                      borderRadius: 9999,
                      border: "1.5px solid var(--ink-border)",
                      background: "transparent",
                      color: "var(--ink-muted)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.18s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = INK; e.currentTarget.style.borderColor = INK; }}
                    onMouseLeave={e => { e.currentTarget.style.color = INK_MUTED; e.currentTarget.style.borderColor = INK_BORDER; }}
                  >
                    Reset Console
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
