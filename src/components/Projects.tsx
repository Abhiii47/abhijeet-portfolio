"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Lock, ExternalLink, Github } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";
import ThreeDCard from "./ThreeDCard";
import CardSpotlight from "./CardSpotlight";

const projects = [
  {
    title: "SmartResume — Resume Analysis Engine",
    meta: "featured · 2025",
    description:
      "ATS scoring engine that has processed and scored 50,000+ resumes. FastAPI backend, XGBoost classifier. Features engineered from document structure, keyword density, and section completeness. OAuth2 + JWT auth, PostgreSQL-backed.",
    stats: "50K+ resumes scored · Live in production",
    liveUrl: "https://smart-resume-orcin.vercel.app/",
    repoUrl: "https://github.com/Abhiii47/SmartResume",
    privateNote: "",
    category: "AI/ML",
  },
  {
    title: "Room & Food Finder",
    meta: "2024",
    description:
      "Hyperlocal platform prototype students use to find housing and food near campus. Multi-role system (User / Provider / Admin), real-time chat over Socket.io, map-based geo-search. Dockerized services with automated CI/CD.",
    stats: "Real-time chat · Dockerized services",
    liveUrl: "https://room-and-food.vercel.app/",
    repoUrl: "https://github.com/Abhiii47/Room_and_Food",
    privateNote: "",
    category: "Full-Stack",
  },
  {
    title: "RAG Knowledge Assistant",
    meta: "Ecovis RKCA · 2026 · proprietary",
    description:
      "Internal knowledge retrieval — ask a question, get cited answers in seconds. Document ingestion → chunking → Pinecone vector search → Gemini answer generation, streamed in real time. Hosted on GCP.",
    stats: "Deployed internally · Streaming responses",
    liveUrl: "",
    repoUrl: "",
    privateNote: "Private — built for Ecovis RKCA.",
    category: "AI/ML",
  },
  {
    title: "Amazon ML — Product Price Prediction",
    meta: "2025 · top 0.1%",
    description:
      "End-to-end regression on 150,000+ records, built during Amazon ML Summer School. EDA → feature engineering → XGBoost / LightGBM / CatBoost ensemble with hyperparameter optimization and bias–variance analysis.",
    stats: "150K+ records · Top 0.1% national selection",
    liveUrl: "",
    repoUrl: "https://github.com/Abhiii47/AmazonML_challange",
    privateNote: "",
    category: "AI/ML",
  },
  {
    title: "Fabric Lakehouse Pipeline",
    meta: "2026",
    description:
      "Bronze → Silver → Gold medallion ETL on Microsoft Fabric, built while earning the DP-600 certification. Spark-based transformations, Power BI semantic model, and an executive dashboard on top of the Gold layer.",
    stats: "Lakehouse ETL · Power BI dashboard",
    liveUrl: "",
    repoUrl: "",
    privateNote: "",
    category: "Analytics",
  },
  {
    title: "Marketing Analytics Dashboard",
    meta: "2025",
    description:
      "Power BI dashboard turning 5,000+ campaign records into ROI decisions. Star-schema model with advanced DAX — ROAS, CPA, month-over-month growth, drill-through across Facebook, Google Ads, and LinkedIn.",
    stats: "5K+ campaign records · 3 ad channels",
    liveUrl: "",
    repoUrl: "https://github.com/Abhiii47/Marketing-Analytics-Dashboard",
    privateNote: "",
    category: "Analytics",
  },
  {
    title: "Medical Triage RL Environment",
    meta: "2025",
    description:
      "OpenAI Gym-compatible environment simulating ER triage under resource constraints. Models patient arrival, severity scoring, and allocation; agents trained with Q-learning and PPO.",
    stats: "Open-source env · RL-compatible",
    liveUrl: "",
    repoUrl: "https://github.com/Abhiii47/medical-triage-env",
    privateNote: "",
    category: "AI/ML",
  },
  {
    title: "SalesVision — Sales Analytics",
    meta: "2025",
    description:
      "Full-stack sales intelligence with live dashboards and forecasting. Real-time metrics, trend forecasting, and team performance tracking via REST API and Chart.js.",
    stats: "Live dashboards · Forecasting",
    liveUrl: "https://sales-vision-ten.vercel.app/",
    repoUrl: "https://github.com/Abhiii47/SalesVision",
    privateNote: "",
    category: "Full-Stack",
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; border: string; color: string }> = {
  "AI/ML":      { bg: "rgba(184,50,39,0.06)",   border: "rgba(184,50,39,0.20)",   color: "var(--accent-primary)" },
  "Full-Stack": { bg: "rgba(59,130,246,0.06)",  border: "rgba(59,130,246,0.20)",  color: "#3B82F6" },
  "Analytics":  { bg: "rgba(74,124,89,0.06)",   border: "rgba(74,124,89,0.20)",   color: "var(--accent-success)" },
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [displayProjects, setDisplayProjects] = useState(projects);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set(".proj-card", { y: 0, opacity: 1 });
      return;
    }

    gsap.fromTo(".proj-card",
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.20, stagger: 0.06, ease: "power1.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
      }
    );
  }, { scope: gridRef, dependencies: [displayProjects] });

  const handleFilterChange = (cat: string) => {
    if (cat === activeCategory) return;
    const cards = gridRef.current?.querySelectorAll(".proj-card");
    if (cards && cards.length > 0) {
      gsap.to(cards, {
        opacity: 0, y: 10, scale: 0.98,
        duration: 0.15, stagger: 0.03, ease: "power1.in",
        onComplete: () => {
          setActiveCategory(cat);
          const filtered = cat === "All" ? projects : projects.filter(p => p.category === cat);
          setDisplayProjects(filtered);
        },
      });
    } else {
      setActiveCategory(cat);
      setDisplayProjects(cat === "All" ? projects : projects.filter(p => p.category === cat));
    }
  };

  return (
    <section id="projects" style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,72px)" }}>
      <style>{`
        .proj-live-btn {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 8px 18px;
          border-radius: 6px;
          background: var(--accent-primary);
          color: #fff;
          transition: opacity 0.15s ease, transform 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .proj-live-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .proj-git-btn {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 8px 18px;
          border-radius: 6px;
          border: 1.5px solid var(--border-subtle);
          color: var(--text-primary);
          background: var(--bg-card);
          transition: border-color 0.15s ease, background 0.15s ease, transform 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .proj-git-btn:hover {
          border-color: var(--accent-primary) !important;
          background: var(--border-subtle);
          transform: translateY(-1px);
        }
        .proj-cat-btn {
          transition: all 0.15s ease;
        }
        .proj-cat-btn:hover {
          color: var(--text-primary) !important;
          border-color: var(--text-primary) !important;
        }
        .proj-featured-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: clamp(20px, 3vw, 40px);
        }
        @media (max-width: 768px) {
          .proj-featured-grid {
            grid-template-columns: 1fr !important;
          }
          .proj-featured-img {
            aspect-ratio: 16/10 !important;
            max-height: 220px !important;
            width: 100% !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative" }}>
        <AnimatedHeading section="03" text="Selected" italic="Works" />

        {/* Category filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "clamp(20px,3vw,32px)" }}>
          {["All", "Full-Stack", "AI/ML", "Analytics"].map(cat => (
            <button
              key={cat}
              className={`proj-cat-btn`}
              onClick={() => handleFilterChange(cat)}
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
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(320px,100%), 1fr))",
            gap: "clamp(16px,2.5vw,24px)",
          }}
        >
          {displayProjects.map((project) => {
            const isFeatured = project.title.includes("SmartResume");
            const catStyle = CATEGORY_COLORS[project.category] ?? CATEGORY_COLORS["AI/ML"];

            if (isFeatured) {
              return (
                <ThreeDCard
                  key={project.title}
                  style={{
                    gridColumn: "1 / -1",
                    height: "100%",
                  }}
                >
                  <article
                    className="proj-card glass-panel-dark"
                    style={{
                      borderRadius: "12px",
                      padding: "clamp(20px,2.5vw,32px)",
                      overflow: "hidden",
                      position: "relative",
                      height: "100%",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="proj-featured-grid">
                      {/* Text content */}
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 16, transformStyle: "preserve-3d" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10, transformStyle: "preserve-3d" }}>
                          {/* Category pill + meta */}
                          <div data-z="30" style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", transformStyle: "preserve-3d" }}>
                            <span style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.55rem",
                              fontWeight: 700,
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              padding: "3px 9px",
                              borderRadius: 4,
                              background: "rgba(184, 50, 39, 0.15)",
                              border: `1.5px solid var(--accent-primary)`,
                              color: "var(--accent-primary)",
                              lineHeight: 1.6,
                            }}>{project.category}</span>
                            <span style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.55rem",
                              color: "#a09890",
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                            }}>{project.meta}</span>
                            <span style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.55rem",
                              fontWeight: 700,
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              padding: "3px 9px",
                              borderRadius: 4,
                              background: "rgba(184, 50, 39, 0.15)",
                              border: "1px solid var(--accent-primary)",
                              color: "#faf8f5",
                            }}>★ Featured</span>
                          </div>

                          <h3 data-z="45" style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "clamp(1.15rem,1.1rem + 0.5vw,1.45rem)",
                            fontWeight: 700,
                            color: "#faf8f5",
                            lineHeight: 1.3,
                          }}>{project.title}</h3>

                          <p data-z="30" style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.85rem",
                            fontWeight: 300,
                            color: "#c4bdb6",
                            lineHeight: 1.65,
                          }}>{project.description}</p>
                        </div>

                        <div data-z="50" style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8, transformStyle: "preserve-3d" }}>
                          <p style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.62rem",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "var(--accent-primary)",
                            fontWeight: 700,
                          }}>
                            {project.stats}
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                            {project.liveUrl && (
                              <Link href={project.liveUrl} target="_blank" className="proj-live-btn">
                                Live <ExternalLink size={10} />
                              </Link>
                            )}
                            {project.repoUrl && (
                              <Link href={project.repoUrl} target="_blank" className="proj-git-btn" style={{ background: "rgba(255, 255, 255, 0.05)", color: "#faf8f5", borderColor: "rgba(255, 255, 255, 0.15)" }}>
                                GitHub <Github size={10} />
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Live screenshot preview */}
                      <div
                        className="proj-featured-img"
                        data-z="60"
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          border: "1.5px solid rgba(255, 255, 255, 0.12)",
                          aspectRatio: "16/10",
                          background: "#0D0A07",
                          alignSelf: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          width: "100%",
                        }}
                      >
                        <img
                          src="/smart_resume_screenshot.png"
                          alt="SmartResume Live Dashboard Mockup"
                          className="proj-screenshot"
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                    </div>
                  </article>
                </ThreeDCard>
              );
            }

            return (
              <CardSpotlight
                key={project.title}
                className="proj-card glass-panel-light flex flex-col justify-between"
                style={{
                  padding: "clamp(20px,2.5vw,32px)",
                  minHeight: 280,
                  borderRadius: "12px",
                }}
              >
                {/* Text content */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {/* Category pill + meta */}
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        padding: "3px 9px",
                        borderRadius: 4,
                        background: catStyle.bg,
                        border: `1px solid ${catStyle.border}`,
                        color: catStyle.color,
                        lineHeight: 1.6,
                      }}>{project.category}</span>
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                      }}>{project.meta}</span>
                    </div>

                    <h3 style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(0.95rem,0.9rem + 0.2vw,1.1rem)",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      lineHeight: 1.3,
                    }}>{project.title}</h3>

                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.82rem",
                      fontWeight: 400,
                      color: "var(--text-secondary)",
                      lineHeight: 1.65,
                    }}>{project.description}</p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                  {project.stats && (
                    <p style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--accent-primary)",
                      fontWeight: 700,
                    }}>{project.stats}</p>
                  )}
                  {project.privateNote && (
                    <p style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.56rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--accent-secondary)",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}>
                      <Lock size={11} /> Private &bull; Built for Ecovis RKCA
                    </p>
                  )}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                    {project.liveUrl && (
                      <Link href={project.liveUrl} target="_blank" className="proj-live-btn">
                        Live <ExternalLink size={10} />
                      </Link>
                    )}
                    {project.repoUrl && (
                      <Link href={project.repoUrl} target="_blank" className="proj-git-btn">
                        GitHub <Github size={10} />
                      </Link>
                    )}
                  </div>
                </div>
              </CardSpotlight>
            );
          })}
        </div>
      </div>
    </section>
  );
}
