"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#00d4ff";

const EXPERIENCES = [
  {
    role: "Software Development Engineer & Product Manager",
    company: "Ecovis RKCA",
    period: "2024 – Present",
    type: "Full-Time",
    current: true,
    points: [
      "Migrated legacy infrastructure to AWS & Azure — improved uptime to 99.9%",
      "Led product roadmap end-to-end: requirements, sprint planning, and delivery across cross-functional teams",
      "Built internal Next.js + TypeScript tooling that reduced manual reporting time by 60%",
      "Designed CI/CD pipelines that cut release cycles from two weeks to two days",
      "Defined KPIs with stakeholders and drove data-informed product decisions",
    ],
  },
  {
    role: "Microsoft Fabric Data Engineering Intern",
    company: "Microsoft",
    period: "2024",
    type: "Internship",
    current: false,
    points: [
      "Built Bronze → Silver → Gold ETL medallion pipelines on Microsoft Fabric",
      "Created Power BI semantic models and executive dashboards",
      "Earned DP-600 Fabric Analytics Engineer certification",
    ],
  },
  {
    role: "ML Competition Finalist",
    company: "Amazon ML Summer School",
    period: "2024",
    type: "Achievement",
    current: false,
    points: [
      "Top 0.1% nationally among 100,000+ applicants",
      "Ensemble of XGBoost + LightGBM + CatBoost with SMOTE oversampling",
      "Selected for Amazon ML Summer School program",
    ],
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  /* Scroll-driven line fill */
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el || !lineRef.current) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0,
        (window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.3)
      ));
      lineRef.current.style.height = `${progress * 100}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    gsap.from(".exp-item", {
      scrollTrigger: { trigger: ref.current, start: "top 72%" },
      x: -24, opacity: 0, duration: 0.8,
      stagger: 0.15, ease: "power3.out",
    });
  }, { scope: ref });

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        background: "#080c14",
        color: "#e8e5df",
        padding: "clamp(64px,10vw,120px) clamp(24px,6vw,80px)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Ghost number */}
      <span aria-hidden style={{
        position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)",
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontSize: "clamp(8rem,20vw,20rem)", fontWeight: 900, lineHeight: 1,
        color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.03)",
        pointerEvents: "none", userSelect: "none",
      }}>02</span>

      <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.35em", color: ACCENT, textTransform: "uppercase", marginBottom: 40 }}>02 / Experience</p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: "clamp(2.2rem,4.5vw,3.5rem)",
          fontWeight: 700, lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "#e8e5df",
          marginBottom: "clamp(40px,6vw,72px)",
        }}>Where I&apos;ve shipped.</h2>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Track */}
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: 1, background: "rgba(255,255,255,0.06)",
          }} />
          {/* Fill */}
          <div ref={lineRef} style={{
            position: "absolute", left: 0, top: 0,
            width: 1, height: "0%",
            background: ACCENT,
            boxShadow: `0 0 6px ${ACCENT}`,
            transition: "height 0.12s linear",
          }} />

          <div style={{ paddingLeft: 32, display: "flex", flexDirection: "column", gap: 0 }}>
            {EXPERIENCES.map((exp, i) => (
              <div
                key={i}
                className="exp-item"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{ position: "relative", paddingBottom: i < EXPERIENCES.length - 1 ? "clamp(32px,5vw,56px)" : 0 }}
              >
                {/* Dot */}
                <div style={{
                  position: "absolute", left: -36, top: 6,
                  width: 10, height: 10, borderRadius: "50%",
                  background: active === i ? ACCENT : "rgba(255,255,255,0.15)",
                  border: `1px solid ${active === i ? ACCENT : "rgba(255,255,255,0.1)"}`,
                  boxShadow: active === i ? `0 0 12px ${ACCENT}` : "none",
                  transition: "all 0.25s ease",
                }} />

                {/* Card */}
                <div
                  style={{
                    padding: "clamp(20px,3vw,32px)",
                    border: `1px solid ${active === i ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.05)"}`,
                    borderRadius: 12,
                    background: active === i ? "rgba(0,212,255,0.03)" : "transparent",
                    transition: "border-color 0.25s, background 0.25s",
                  }}
                >
                  {/* Top row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                    <div>
                      {exp.current && (
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 5,
                          fontFamily: "monospace", fontSize: 8,
                          letterSpacing: "0.3em", textTransform: "uppercase",
                          color: ACCENT,
                          padding: "3px 10px", borderRadius: 9999,
                          border: `1px solid rgba(0,212,255,0.25)`,
                          marginBottom: 10,
                        }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: ACCENT, animation: "pulse 2s infinite", display: "inline-block" }} />
                          Current
                        </span>
                      )}
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond',Georgia,serif",
                        fontSize: "clamp(1.1rem,2vw,1.4rem)",
                        fontWeight: 600, color: "#e8e5df",
                        lineHeight: 1.2, margin: 0,
                      }}>{exp.role}</h3>
                      <p style={{ fontFamily: "monospace", fontSize: 10, color: ACCENT, marginTop: 6, letterSpacing: "0.1em" }}>{exp.company}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                      <span style={{
                        fontFamily: "monospace", fontSize: 9,
                        color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em",
                      }}>{exp.period}</span>
                      <span style={{
                        fontFamily: "monospace", fontSize: 8,
                        padding: "2px 8px", borderRadius: 9999,
                        background: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.3)",
                        letterSpacing: "0.15em", textTransform: "uppercase",
                      }}>{exp.type}</span>
                    </div>
                  </div>

                  {/* Points */}
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {exp.points.map((pt, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <span style={{ marginTop: 7, width: 3, height: 3, borderRadius: "50%", background: "rgba(0,212,255,0.5)", flexShrink: 0 }} />
                        <span style={{ fontFamily: "sans-serif", fontSize: "clamp(0.82rem,1vw,0.9rem)", color: "rgba(232,229,223,0.55)", lineHeight: 1.65 }}>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </section>
  );
}
