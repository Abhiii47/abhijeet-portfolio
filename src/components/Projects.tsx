"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import AnimatedHeading from "./AnimatedHeading";

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

function screenshotUrl(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
}

function getPreviewUrl(repoUrl?: string, liveUrl?: string) {
  if (liveUrl) return screenshotUrl(liveUrl);
  if (repoUrl) {
    const path = repoUrl.replace("https://github.com/", "");
    return `https://opengraph.githubassets.com/1/${path}`;
  }
  return "";
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [displayProjects, setDisplayProjects] = useState(projects);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (cat: string) => {
    if (cat === activeCategory) return;

    const cards = gridRef.current?.querySelectorAll(".proj-card");
    if (cards && cards.length > 0) {
      gsap.to(cards, {
        opacity: 0,
        y: 12,
        scale: 0.98,
        duration: 0.22,
        stagger: 0.03,
        ease: "power2.in",
        onComplete: () => {
          setActiveCategory(cat);
          const filtered = cat === "All" ? projects : projects.filter(p => p.category === cat);
          setDisplayProjects(filtered);
          
          setTimeout(() => {
            const newCards = gridRef.current?.querySelectorAll(".proj-card");
            if (newCards) {
              gsap.fromTo(newCards,
                { opacity: 0, y: 16, scale: 0.97 },
                { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.05, ease: "power3.out" }
              );
            }
          }, 20);
        }
      });
    } else {
      setActiveCategory(cat);
      const filtered = cat === "All" ? projects : projects.filter(p => p.category === cat);
      setDisplayProjects(filtered);
    }
  };

  return (
    <section id="projects" style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,72px)" }}>
      <style>{`
        .proj-card {
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
        }
        .proj-card:hover {
          border-color: rgba(196,64,10,0.30) !important;
          box-shadow: 0 8px 32px rgba(196,64,10,0.06), 4px 4px 0 rgba(196,64,10,0.08);
          transform: translateY(-2px);
        }
        .proj-live-btn {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 7px 18px;
          border-radius: 4px;
          background: var(--accent);
          color: #fff;
          box-shadow: 2px 2px 0 rgba(14,10,4,0.20);
          transition: transform 0.16s, box-shadow 0.16s;
          display: inline-block;
        }
        .proj-live-btn:hover {
          transform: translate(-1px,-1px);
          box-shadow: 3px 3px 0 rgba(14,10,4,0.20);
        }
        .proj-git-btn {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 7px 18px;
          border-radius: 4px;
          border: 1.5px solid rgba(14,10,4,0.18);
          color: var(--ink);
          background: transparent;
          transition: border-color 0.18s, background 0.18s;
          display: inline-block;
        }
        .proj-git-btn:hover {
          border-color: var(--accent) !important;
          background: rgba(196,64,10,0.04) !important;
        }
        .proj-cat-btn:hover {
          color: var(--ink) !important;
          border-color: var(--ink) !important;
        }
        .proj-cat-btn.active {
          background: rgba(196,64,10,0.06) !important;
        }
        html[data-theme='dark'] .proj-cat-btn.active {
          background: rgba(249,115,22,0.12) !important;
        }
      `}</style>

      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative" }}>
        <AnimatedHeading section="03" text="Selected" italic="Works" />

        {/* Category filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "clamp(20px,3vw,32px)" }}>
          {["All", "Full-Stack", "AI/ML", "Analytics"].map(cat => (
            <button
              key={cat}
              className={`proj-cat-btn${activeCategory === cat ? " active" : ""}`}
              onClick={() => handleFilterChange(cat)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                fontWeight: 750,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "8px 16px",
                borderRadius: 4,
                border: "1.5px solid var(--ink-border)",
                background: "var(--bg-card)",
                color: activeCategory === cat ? "var(--accent)" : "var(--ink-muted)",
                cursor: "pointer",
                transition: "all 0.18s",
                borderColor: activeCategory === cat ? "var(--accent)" : "var(--ink-border)",
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
            gridTemplateColumns: "repeat(auto-fill, minmax(min(340px,100%), 1fr))",
            gap: "clamp(16px,2.5vw,24px)",
          }}
        >
          {displayProjects.map((project) => {
            const previewUrl = getPreviewUrl(project.repoUrl, project.liveUrl);
            return (
              <article
                key={project.title}
                data-preview={previewUrl || undefined}
                className="proj-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: "var(--bg-card)",
                  border: "1.5px solid rgba(14,10,4,0.10)",
                  borderRadius: 12,
                  padding: "clamp(16px,2.5vw,24px)",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <p style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(14,10,4,0.38)",
                  }}>
                    {project.meta}
                  </p>
                  <h3 style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(0.95rem,0.9rem + 0.2vw,1.1rem)",
                    fontWeight: 600,
                    color: "var(--ink)",
                    lineHeight: 1.3,
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.82rem",
                    fontWeight: 300,
                    color: "var(--ink-muted)",
                    lineHeight: 1.6,
                  }}>
                    {project.description}
                  </p>
                </div>
                <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  {project.stats && (
                    <p style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.56rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      fontWeight: 700,
                    }}>
                      {project.stats}
                    </p>
                  )}
                  {project.privateNote && (
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.78rem",
                      fontStyle: "italic",
                      color: "rgba(14,10,4,0.45)",
                    }}>
                      {project.privateNote}
                    </p>
                  )}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        className="proj-live-btn"
                      >
                        Live ↗
                      </Link>
                    )}
                    {project.repoUrl && (
                      <Link
                        href={project.repoUrl}
                        target="_blank"
                        className="proj-git-btn"
                      >
                        GitHub
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
