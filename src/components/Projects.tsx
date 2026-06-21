"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Lock, ExternalLink, Github } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";
import CardSpotlight from "./CardSpotlight";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "SmartResume — Resume Analysis Engine",
    year: "2025",
    outcome: "50K+ resumes scored in production",
    description:
      "ATS scoring engine processing 50,000+ resumes. FastAPI backend, XGBoost classifier. Features engineered from document structure, keyword density, and section completeness. OAuth2 + JWT auth, PostgreSQL-backed.",
    stack: ["FastAPI", "XGBoost", "PostgreSQL", "Next.js"],
    liveUrl: "https://smart-resume-orcin.vercel.app/",
    repoUrl: "https://github.com/Abhiii47/SmartResume",
    privateNote: "",
    category: "AI/ML",
    featured: true,
  },
  {
    title: "Room & Food Finder",
    year: "2024",
    outcome: "Real-time chat · Dockerized CI/CD",
    description:
      "Hyperlocal platform for students to find housing and food near campus. Multi-role system, real-time Socket.io chat, map-based geo-search, automated CI/CD.",
    stack: ["Next.js", "Socket.io", "Docker"],
    liveUrl: "https://room-and-food.vercel.app/",
    repoUrl: "https://github.com/Abhiii47/Room_and_Food",
    privateNote: "",
    category: "Full-Stack",
    featured: false,
  },
  {
    title: "RAG Knowledge Assistant",
    year: "2026",
    outcome: "Cited answers in < 3 seconds",
    description:
      "Internal knowledge retrieval for Ecovis RKCA. Document ingestion → chunking → Pinecone vector search → Gemini answer generation, streamed in real time on GCP.",
    stack: ["Pinecone", "Gemini", "GCP", "FastAPI"],
    liveUrl: "",
    repoUrl: "",
    privateNote: "Private — built for Ecovis RKCA.",
    category: "AI/ML",
    featured: false,
  },
  {
    title: "Amazon ML — Price Prediction",
    year: "2025",
    outcome: "Top 0.1% national · 150K records",
    description:
      "End-to-end regression built during Amazon ML Summer School. EDA → feature engineering → XGBoost / LightGBM / CatBoost ensemble with hyperparameter optimisation.",
    stack: ["XGBoost", "LightGBM", "CatBoost", "Python"],
    liveUrl: "",
    repoUrl: "https://github.com/Abhiii47/AmazonML_challange",
    privateNote: "",
    category: "AI/ML",
    featured: false,
  },
  {
    title: "Fabric Lakehouse Pipeline",
    year: "2026",
    outcome: "Bronze → Silver → Gold ETL",
    description:
      "Medallion ETL on Microsoft Fabric (DP-600 certified). Spark transformations, Power BI semantic model, executive dashboard on the Gold layer.",
    stack: ["MS Fabric", "Spark", "Power BI", "DAX"],
    liveUrl: "",
    repoUrl: "",
    privateNote: "",
    category: "Analytics",
    featured: false,
  },
  {
    title: "Marketing Analytics Dashboard",
    year: "2025",
    outcome: "5K+ campaigns · 3 ad channels",
    description:
      "Power BI dashboard turning campaign records into ROI decisions. Star-schema model with advanced DAX — ROAS, CPA, MoM growth across Facebook, Google Ads, LinkedIn.",
    stack: ["Power BI", "DAX", "SQL"],
    liveUrl: "",
    repoUrl: "https://github.com/Abhiii47/Marketing-Analytics-Dashboard",
    privateNote: "",
    category: "Analytics",
    featured: false,
  },
  {
    title: "Medical Triage RL Environment",
    year: "2025",
    outcome: "OpenAI Gym-compatible · PPO trained",
    description:
      "Simulates ER triage under resource constraints. Models patient arrival, severity scoring, allocation — agents trained with Q-learning and PPO.",
    stack: ["Python", "OpenAI Gym", "PPO", "Q-learning"],
    liveUrl: "",
    repoUrl: "https://github.com/Abhiii47/medical-triage-env",
    privateNote: "",
    category: "AI/ML",
    featured: false,
  },
  {
    title: "SalesVision — Sales Analytics",
    year: "2025",
    outcome: "Live dashboards · Forecasting",
    description:
      "Full-stack sales intelligence with real-time metrics, trend forecasting, and team performance tracking via REST API and Chart.js.",
    stack: ["React", "Node.js", "Chart.js"],
    liveUrl: "https://sales-vision-ten.vercel.app/",
    repoUrl: "https://github.com/Abhiii47/SalesVision",
    privateNote: "",
    category: "Full-Stack",
    featured: false,
  },
];

const CAT_STYLE: Record<string, { bg: string; border: string; color: string }> = {
  "AI/ML":      { bg: "rgba(184,50,39,0.07)",  border: "rgba(184,50,39,0.22)",  color: "var(--accent-primary)" },
  "Full-Stack": { bg: "rgba(59,130,246,0.07)", border: "rgba(59,130,246,0.22)", color: "#3B82F6" },
  "Analytics":  { bg: "rgba(74,124,89,0.07)",  border: "rgba(74,124,89,0.22)",  color: "var(--accent-success)" },
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [displayProjects, setDisplayProjects] = useState(projects);
  const gridRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) { gsap.set(".proj-card, .proj-featured", { y: 0, opacity: 1 }); return; }
    gsap.fromTo(".proj-featured",
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.50, ease: "power2.out",
        scrollTrigger: { trigger: featuredRef.current, start: "top 82%", once: true } }
    );
    gsap.fromTo(".proj-card",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, stagger: 0.07, ease: "power2.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 82%", once: true } }
    );
  }, { dependencies: [displayProjects] });

  const handleFilter = (cat: string) => {
    if (cat === activeCategory) return;
    gsap.to(".proj-card", {
      opacity: 0, y: 8, duration: 0.12, ease: "power1.in",
      onComplete: () => {
        setActiveCategory(cat);
        setDisplayProjects(cat === "All" ? projects : projects.filter(p => p.category === cat));
      },
    });
  };

  const featured = projects.find(p => p.featured)!;
  const rest = displayProjects.filter(p => !p.featured);

  return (
    <section id="projects" style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,72px)" }}>
      <style>{`
        .proj-live-btn {
          font-family: var(--font-mono); font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; text-decoration: none;
          padding: 9px 20px; border-radius: 6px;
          background: var(--accent-primary); color: #fff;
          display: inline-flex; align-items: center; gap: 5px;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }
        .proj-live-btn:hover { transform: translateY(-2px); opacity: 0.88; }
        .proj-git-btn {
          font-family: var(--font-mono); font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; text-decoration: none;
          padding: 9px 20px; border-radius: 6px;
          border: 1.5px solid var(--border-subtle); color: var(--text-primary);
          background: var(--bg-card);
          display: inline-flex; align-items: center; gap: 5px;
          transition: border-color 0.15s ease, transform 0.15s ease;
        }
        .proj-git-btn:hover { border-color: var(--accent-primary); transform: translateY(-2px); }
        .proj-stack-tag {
          font-family: var(--font-mono); font-size: 9px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 3px 8px; border-radius: 4px;
          background: var(--bg-primary); border: 1px solid var(--border-subtle);
          color: var(--text-muted);
        }
        /* Featured card */
        .featured-card {
          border-radius: 14px;
          padding: clamp(28px,4vw,48px);
          background: var(--bg-ink, #0E0A05);
          border: 1px solid rgba(255,255,255,0.07);
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: clamp(24px,4vw,56px);
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .featured-card::before {
          content: ""; position: absolute;
          top: -60px; right: -60px;
          width: 260px; height: 260px;
          background: radial-gradient(circle, rgba(184,50,39,0.14) 0%, transparent 70%);
          pointer-events: none;
        }
        .featured-big-num {
          position: absolute; bottom: -16px; right: clamp(20px,4vw,48px);
          font-family: var(--font-display); font-size: clamp(7rem,14vw,13rem);
          font-weight: 900; line-height: 1; letter-spacing: -0.06em;
          color: rgba(255,255,255,0.03); user-select: none; pointer-events: none;
        }
        .featured-outcome {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: clamp(1rem, 1.4vw, 1.3rem);
          color: rgba(250,248,245,0.55);
          line-height: 1.4;
          margin: 14px 0 20px;
          border-left: 2px solid var(--accent-primary);
          padding-left: 14px;
        }
        .featured-screenshot {
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.10);
          aspect-ratio: 16/10;
          background: #0D0A07;
        }
        .featured-screenshot img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        @media (max-width: 768px) {
          .featured-card { grid-template-columns: 1fr !important; }
          .featured-screenshot { display: none !important; }
        }
        /* Grid cards */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(300px,100%), 1fr));
          gap: clamp(14px,2vw,20px);
        }
        .proj-card-inner {
          padding: clamp(20px,2.5vw,28px);
          min-height: 260px;
          border-radius: 12px;
          display: flex; flex-direction: column; justify-content: space-between;
          height: 100%;
        }
        .proj-outcome {
          font-family: var(--font-mono); font-size: 0.6rem;
          font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--accent-primary); margin-bottom: 10px;
        }
        .filter-btn {
          font-family: var(--font-mono); font-size: 0.58rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          padding: 7px 16px; border-radius: 999px;
          border: 1.5px solid var(--border-subtle);
          cursor: pointer; transition: all 0.15s ease;
          background: var(--bg-card); color: var(--text-secondary);
        }
        .filter-btn:hover { border-color: var(--accent-primary); color: var(--text-primary); }
        .filter-btn--active { background: var(--accent-primary) !important; color: #fff !important; border-color: var(--accent-primary) !important; }
      `}</style>

      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%" }}>
        <AnimatedHeading section="03" text="Selected" italic="Works" />

        {/* Featured project */}
        <article ref={featuredRef} className="proj-featured featured-card" style={{ marginBottom: "clamp(24px,3.5vw,40px)" }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 14 }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "0.55rem",
                fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
                padding: "3px 9px", borderRadius: 4,
                background: "rgba(184,50,39,0.15)",
                border: "1px solid var(--accent-primary)",
                color: "var(--accent-primary)",
              }}>AI/ML</span>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "0.55rem",
                color: "rgba(250,248,245,0.35)", letterSpacing: "0.2em", textTransform: "uppercase",
              }}>Featured · {featured.year}</span>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "0.55rem",
                fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
                padding: "3px 9px", borderRadius: 4,
                background: "rgba(184,50,39,0.15)",
                border: "1px solid var(--accent-primary)",
                color: "rgba(250,248,245,0.8)",
              }}>★ Featured</span>
            </div>

            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.3rem,1.1rem + 1vw,1.9rem)",
              fontWeight: 700, color: "#faf8f5", lineHeight: 1.2, marginBottom: 0,
            }}>{featured.title}</h3>

            <p className="featured-outcome">{featured.outcome}</p>

            <p style={{
              fontFamily: "var(--font-body)", fontSize: "0.87rem",
              color: "rgba(250,248,245,0.5)", lineHeight: 1.65,
              marginBottom: 20,
            }}>{featured.description}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
              {featured.stack.map(s => (
                <span key={s} style={{
                  fontFamily: "var(--font-mono)", fontSize: "9px",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "3px 8px", borderRadius: 4,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "rgba(250,248,245,0.55)",
                }}>{s}</span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {featured.liveUrl && (
                <Link href={featured.liveUrl} target="_blank" className="proj-live-btn">
                  Live <ExternalLink size={10} />
                </Link>
              )}
              {featured.repoUrl && (
                <Link href={featured.repoUrl} target="_blank" className="proj-git-btn"
                  style={{ background: "rgba(255,255,255,0.04)", color: "rgba(250,248,245,0.7)", borderColor: "rgba(255,255,255,0.12)" }}>
                  GitHub <Github size={10} />
                </Link>
              )}
            </div>
          </div>

          <div className="featured-screenshot">
            <img
              src="/smart_resume_screenshot.png"
              alt="SmartResume dashboard"
              loading="lazy"
            />
          </div>

          <span className="featured-big-num" aria-hidden>01</span>
        </article>

        {/* Category filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "clamp(18px,2.5vw,28px)" }}>
          {["All", "Full-Stack", "AI/ML", "Analytics"].map(cat => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`filter-btn${activeCategory === cat ? " filter-btn--active" : ""}`}
            >{cat}</button>
          ))}
        </div>

        {/* Project grid */}
        <div ref={gridRef} className="proj-grid">
          {rest.map((p) => {
            const cs = CAT_STYLE[p.category] ?? CAT_STYLE["AI/ML"];
            return (
              <CardSpotlight
                key={p.title}
                className="proj-card glass-panel-light"
                style={{ borderRadius: "12px", height: "100%" }}
              >
                <div className="proj-card-inner">
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.55rem",
                        fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
                        padding: "3px 8px", borderRadius: 4,
                        background: cs.bg, border: `1px solid ${cs.border}`, color: cs.color,
                      }}>{p.category}</span>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.55rem",
                        color: "var(--text-muted)", letterSpacing: "0.18em", textTransform: "uppercase",
                      }}>{p.year}</span>
                    </div>

                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(0.95rem,0.9rem + 0.2vw,1.1rem)",
                      fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3,
                    }}>{p.title}</h3>

                    <p style={{
                      fontFamily: "var(--font-body)", fontSize: "0.82rem",
                      color: "var(--text-secondary)", lineHeight: 1.65,
                    }}>{p.description}</p>
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <p className="proj-outcome">{p.outcome}</p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
                      {p.stack.map(s => <span key={s} className="proj-stack-tag">{s}</span>)}
                    </div>

                    {p.privateNote && (
                      <p style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.56rem",
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        color: "var(--accent-secondary)", fontWeight: 700,
                        display: "flex", alignItems: "center", gap: 4, marginBottom: 10,
                      }}><Lock size={10} /> {p.privateNote}</p>
                    )}

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {p.liveUrl && (
                        <Link href={p.liveUrl} target="_blank" className="proj-live-btn">
                          Live <ExternalLink size={10} />
                        </Link>
                      )}
                      {p.repoUrl && (
                        <Link href={p.repoUrl} target="_blank" className="proj-git-btn">
                          GitHub <Github size={10} />
                        </Link>
                      )}
                    </div>
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
