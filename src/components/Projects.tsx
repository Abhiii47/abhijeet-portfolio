"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#00d4ff";

const PROJECTS = [
  {
    index: "01",
    name: "SmartResume",
    hook: "ATS scoring engine for 50,000+ resumes.",
    description:
      "FastAPI backend with an XGBoost classifier. Feature extraction from structure, keyword density, and section completeness. Production-grade with OAuth2 + JWT auth and clean architecture.",
    stats: ["50,000+ resumes processed", "XGBoost + cross-validation", "OAuth2 / JWT auth"],
    stack: ["Python", "FastAPI", "XGBoost", "OAuth2", "PostgreSQL"],
    github: "https://github.com/Abhiii47",
    live: "",
    accent: ACCENT,
  },
  {
    index: "02",
    name: "Room & Food Finder",
    hook: "Live hyperlocal platform with real-time chat.",
    description:
      "Multi-role system (User / Provider / Admin) with real-time Socket.io messaging, map-centric search, and full RBAC. Dockerized with GitHub Actions CI/CD. Students use it daily.",
    stats: ["Live in production", "Multi-role RBAC", "Real-time messaging"],
    stack: ["Node.js", "Socket.io", "MongoDB", "Docker", "GitHub Actions"],
    github: "https://github.com/Abhiii47",
    live: "",
    accent: "#a78bfa",
  },
  {
    index: "03",
    name: "Raseed",
    hook: "Receipt → structured expense data in seconds.",
    description:
      "Google Cloud Vision OCR ingestion pipeline, async background workers for categorisation, Server-Sent Events for real-time dashboard updates, and burn-rate analytics.",
    stats: ["Real-time SSE updates", "GCP Vision OCR", "Auto-categorisation"],
    stack: ["Python", "GCP Vision", "SSE", "PostgreSQL", "FastAPI"],
    github: "https://github.com/Abhiii47",
    live: "",
    accent: "#fb923c",
  },
  {
    index: "04",
    name: "RAG Assistant",
    hook: "Company knowledge retrieval, deployed on GCP.",
    description:
      "Document ingestion → chunking → FAISS vector store → LLM generation with citations. Deployed on Vertex AI with streaming responses. Built at Ecovis RKCA.",
    stats: ["Vertex AI deployment", "FAISS vector store", "Streaming responses"],
    stack: ["Python", "LangChain", "FAISS", "Vertex AI", "GCP"],
    github: "https://github.com/Abhiii47",
    live: "",
    accent: "#4ade80",
  },
  {
    index: "05",
    name: "Price Prediction",
    hook: "75k-record regression pipeline. Built for Amazon ML School.",
    description:
      "End-to-end ML pipeline: EDA → feature engineering → XGBoost → hyperparameter optimisation. Optimised on MAE and SMAPE across 75,000+ train and test records. Top 0.1% programme.",
    stats: ["75,000+ records", "Top 0.1% Amazon ML", "MAE / SMAPE optimised"],
    stack: ["Python", "XGBoost", "Pandas", "Scikit-learn", "NumPy"],
    github: "https://github.com/Abhiii47",
    live: "",
    accent: "#f472b6",
  },
];

export default function Projects() {
  const sectionRef  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const cursorRef   = useRef<HTMLDivElement>(null);

  /* GSAP horizontal scroll */
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const track  = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const totalWidth = track.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth + window.innerHeight * 0.5}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      tl.to(track, { x: -totalWidth, ease: "none" });

      /* Stagger card reveals */
      gsap.utils.toArray<Element>(".proj-card").forEach((card, i) => {
        gsap.from(card.querySelector(".proj-content"), {
          scrollTrigger: {
            trigger: section,
            start: () => `top+=${i * (totalWidth / PROJECTS.length) * 0.6} top`,
            end: () => `top+=${i * (totalWidth / PROJECTS.length) * 0.6 + 200} top`,
            scrub: 1,
            containerAnimation: tl,
          },
          y: 30,
          opacity: 0,
        });
      });
    });

    return () => mm.revert();
  }, []);

  /* Custom drag cursor */
  useEffect(() => {
    const section = sectionRef.current;
    const cursor  = cursorRef.current;
    if (!section || !cursor) return;

    let mouseX = 0, mouseY = 0;
    let curX   = 0, curY   = 0;
    let rafId: number;

    const follow = () => {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      cursor.style.transform = `translate(${curX}px,${curY}px) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(follow);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onEnter = () => { cursor.style.opacity = "1"; follow(); };
    const onLeave = () => { cursor.style.opacity = "0"; cancelAnimationFrame(rafId); };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500&display=swap');

        .proj-track { display:flex; will-change:transform; }

        .proj-card {
          flex-shrink:0;
          width:100vw;
          height:100vh;
          display:flex;
          align-items:flex-end;
          padding:clamp(28px,5vw,72px);
          position:relative;
          overflow:hidden;
          cursor:none;
        }

        .proj-bg-name {
          position:absolute;
          inset:0;
          display:flex;
          align-items:center;
          justify-content:flex-end;
          padding-right:clamp(24px,4vw,56px);
          pointer-events:none;
          user-select:none;
        }

        .proj-tag {
          display:inline-flex;
          padding:4px 11px;
          border-radius:9999px;
          font-family:'Inter',monospace;
          font-size:10px;
          letter-spacing:0.1em;
          transition:background 0.2s,color 0.2s;
        }

        /* Mobile: vertical stack */
        @media(max-width:768px){
          .proj-track { flex-direction:column!important; width:100%!important; }
          .proj-card  { width:100%!important; height:auto!important; min-height:100svh; padding:clamp(24px,6vw,48px) clamp(18px,5vw,36px)!important; }
        }
      `}</style>

      {/* DRAG cursor */}
      <div
        ref={cursorRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 88, height: 88,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          transition: "opacity 0.25s",
          fontFamily: "'Inter',monospace",
          fontSize: 9,
          letterSpacing: "0.22em",
          color: "white",
          textTransform: "uppercase",
        }}
      >DRAG</div>

      <section
        id="projects"
        ref={sectionRef}
        style={{ background: "#080c14", overflow: "hidden", position: "relative" }}
      >
        {/* Section label (fixed during pin) */}
        <div style={{
          position: "absolute",
          top: "clamp(24px,3vw,36px)",
          left: "clamp(20px,5vw,72px)",
          zIndex: 10,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <p style={{
            fontFamily: "'Inter',monospace", fontSize: 10,
            letterSpacing: "0.38em", color: ACCENT,
            textTransform: "uppercase",
          }}>02 / Work</p>
          <span style={{
            fontFamily: "'Inter',monospace", fontSize: 9,
            letterSpacing: "0.18em", color: "rgba(255,255,255,0.2)",
          }}>— {PROJECTS.length} projects</span>
        </div>

        {/* Progress dots */}
        <div style={{
          position: "absolute",
          top: "clamp(24px,3vw,36px)",
          right: "clamp(20px,5vw,72px)",
          zIndex: 10,
          display: "flex", gap: 6, alignItems: "center",
        }}>
          {PROJECTS.map((_, i) => (
            <div key={i} style={{
              width: 5, height: 5, borderRadius: "50%",
              background: `rgba(255,255,255,${i === 0 ? 0.7 : 0.15})`,
            }} />
          ))}
        </div>

        {/* Horizontal track */}
        <div ref={trackRef} className="proj-track" style={{ height: "100vh" }}>
          {PROJECTS.map((p) => (
            <div
              key={p.index}
              className="proj-card"
              style={{ background: "#080c14" }}
            >
              {/* Giant bg name */}
              <div className="proj-bg-name">
                <span style={{
                  fontFamily: "'Bebas Neue','Arial Black',sans-serif",
                  fontSize: "clamp(8rem,18vw,22rem)",
                  fontWeight: 400,
                  lineHeight: 0.85,
                  color: "transparent",
                  WebkitTextStroke: `1px ${p.accent}18`,
                  whiteSpace: "nowrap",
                }}>{p.name}</span>
              </div>

              {/* Left edge accent line */}
              <div aria-hidden style={{
                position: "absolute",
                left: 0, top: "15%", bottom: "15%",
                width: 1,
                background: `linear-gradient(to bottom,transparent,${p.accent}50,transparent)`,
              }} />

              {/* Card content */}
              <div className="proj-content" style={{
                position: "relative", zIndex: 2,
                maxWidth: 560,
              }}>
                {/* Index + accent dot */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "clamp(3rem,6vw,5.5rem)",
                    color: p.accent,
                    lineHeight: 1,
                    opacity: 0.25,
                  }}>{p.index}</span>
                  <div style={{
                    flex: 1, height: 1,
                    background: `linear-gradient(90deg,${p.accent}40,transparent)`,
                  }} />
                </div>

                {/* Project name */}
                <h3 style={{
                  fontFamily: "'Bebas Neue','Arial Black',sans-serif",
                  fontSize: "clamp(2rem,4vw,3.6rem)",
                  fontWeight: 400,
                  color: "#f0ede8",
                  lineHeight: 1.0,
                  marginBottom: 14,
                  letterSpacing: "0.02em",
                }}>{p.name}</h3>

                {/* Hook */}
                <p style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "clamp(0.92rem,1.1vw,1rem)",
                  color: p.accent,
                  marginBottom: 14,
                  fontWeight: 400,
                  lineHeight: 1.5,
                }}>{p.hook}</p>

                {/* Description */}
                <p style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "clamp(0.8rem,0.9vw,0.88rem)",
                  color: "rgba(255,255,255,0.38)",
                  lineHeight: 1.75,
                  marginBottom: 20,
                  maxWidth: "46ch",
                }}>{p.description}</p>

                {/* Stats */}
                <div style={{
                  display: "flex", gap: 16, flexWrap: "wrap",
                  marginBottom: 22,
                }}>
                  {p.stats.map(s => (
                    <span key={s} style={{
                      fontFamily: "'Inter',monospace",
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.28)",
                      display: "flex", alignItems: "center", gap: 5,
                    }}>
                      <span style={{ color: p.accent, fontSize: 12 }}>—</span>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Tech stack */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 28 }}>
                  {p.stack.map(t => (
                    <span key={t} className="proj-tag" style={{
                      background: `${p.accent}12`,
                      border: `1px solid ${p.accent}28`,
                      color: `${p.accent}cc`,
                    }}>{t}</span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <a
                    href={p.github}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 7,
                      padding: "10px 22px",
                      border: `1px solid ${p.accent}40`,
                      borderRadius: 9999,
                      fontFamily: "'Inter',monospace",
                      fontSize: 9, letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: p.accent,
                      textDecoration: "none",
                      transition: "background 0.2s,transform 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${p.accent}18`; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    GitHub
                  </a>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank" rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Inter',monospace",
                        fontSize: 9, letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.22)",
                        textDecoration: "none",
                        display: "flex", alignItems: "center", gap: 6,
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "white")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}
                    >
                      Live &rarr;
                    </a>
                  )}
                </div>
              </div>

              {/* Bottom accent line */}
              <div aria-hidden style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: 1,
                background: `linear-gradient(90deg,transparent,${p.accent}30,transparent)`,
              }} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
