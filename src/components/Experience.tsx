"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#C4400A";
const INK    = "#0E0A04";

const EXP = [
  {
    role:    "Software Development Engineer & Product Manager",
    company: "Ecovis RKCA",
    period:  "2024 – Present",
    type:    "Full-Time",
    current: true,
    points:  [
      "Migrated legacy infrastructure to AWS & Azure — improved uptime to 99.9%",
      "Led product roadmap end-to-end: requirements, sprint planning, and delivery across cross-functional teams",
      "Built internal Next.js + TypeScript tooling that reduced manual reporting time by 60%",
      "Designed CI/CD pipelines that cut release cycles from two weeks to two days",
      "Defined KPIs with stakeholders and drove data-informed product decisions",
    ],
  },
  {
    role:    "Microsoft Fabric Data Engineering Intern",
    company: "Microsoft",
    period:  "2024",
    type:    "Internship",
    current: false,
    points:  [
      "Built Bronze → Silver → Gold ETL medallion pipelines on Microsoft Fabric",
      "Created Power BI semantic models and executive dashboards",
      "Earned DP-600 Fabric Analytics Engineer certification",
    ],
  },
  {
    role:    "ML Competition Finalist",
    company: "Amazon ML Summer School",
    period:  "2024",
    type:    "Achievement",
    current: false,
    points:  [
      "Top 0.1% nationally among 100,000+ applicants",
      "Ensemble of XGBoost + LightGBM + CatBoost with SMOTE oversampling",
      "Selected for Amazon ML Summer School program",
    ],
  },
];

export default function Experience() {
  const ref     = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  /* Scroll-driven timeline fill */
  useEffect(() => {
    const fn = () => {
      const el = ref.current;
      if (!el || !lineRef.current) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (r.height + window.innerHeight * 0.3)));
      lineRef.current.style.height = `${p * 100}%`;
    };
    window.addEventListener("scroll", fn, { passive: true }); fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useGSAP(() => {
    gsap.from(".ex-item", {
      scrollTrigger: { trigger: ref.current, start: "top 74%" },
      x: -24, opacity: 0, duration: 0.8, stagger: 0.14, ease: "power3.out",
    });
  }, { scope: ref });

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        background: "var(--bg-base)",
        color: INK,
        padding: "clamp(72px,10vw,120px) clamp(24px,6vw,80px)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Ghost number */}
      <span aria-hidden style={{
        position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)",
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontSize: "clamp(8rem,20vw,20rem)", fontWeight: 700, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(14,10,4,0.04)",
        pointerEvents: "none", userSelect: "none",
      }}>02</span>

      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>

        <AnimatedHeading
          text="Where I've"
          italic="shipped."
          section="02"
          color={INK}
          accentColor={ACCENT}
          fontFamily="'Cormorant Garamond',Georgia,serif"
        />

        <div style={{ position: "relative" }}>
          {/* Track */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "rgba(14,10,4,0.08)" }} />
          {/* Fill */}
          <div ref={lineRef} style={{
            position: "absolute", left: 0, top: 0, width: 1, height: "0%",
            background: ACCENT,
            transition: "height 0.1s linear",
          }} />

          <div style={{ paddingLeft: 36, display: "flex", flexDirection: "column" }}>
            {EXP.map((e, i) => (
              <div
                key={i}
                className="ex-item"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{ position: "relative", paddingBottom: i < EXP.length - 1 ? "clamp(32px,5vw,56px)" : 0 }}
              >
                {/* Dot */}
                <div style={{
                  position: "absolute", left: -40, top: 8,
                  width: 10, height: 10, borderRadius: "50%",
                  background: active === i ? ACCENT : "rgba(14,10,4,0.12)",
                  border: `1px solid ${active === i ? ACCENT : "rgba(14,10,4,0.10)"}`,
                  boxShadow: active === i ? `0 0 10px rgba(196,64,10,0.35)` : "none",
                  transition: "all 0.25s ease",
                }} />

                {/* Card */}
                <div style={{
                  padding: "clamp(20px,3vw,32px)",
                  border: `1px solid ${active === i ? "rgba(196,64,10,0.18)" : "rgba(14,10,4,0.07)"}`,
                  borderRadius: 12,
                  background: active === i ? "rgba(196,64,10,0.025)" : "var(--bg-card)",
                  transition: "border-color 0.25s, background 0.25s",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                    <div>
                      {e.current && (
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 5,
                          fontFamily: "var(--font-mono)", fontSize: 8,
                          letterSpacing: "0.3em", textTransform: "uppercase",
                          color: ACCENT, padding: "3px 10px", borderRadius: 9999,
                          border: `1px solid rgba(196,64,10,0.22)`,
                          background: "rgba(196,64,10,0.04)",
                          marginBottom: 10,
                        }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: ACCENT, animation: "pulse 2s infinite", display: "inline-block" }} />
                          Current
                        </span>
                      )}
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond',Georgia,serif",
                        fontSize: "clamp(1.05rem,2vw,1.35rem)",
                        fontWeight: 600, color: INK,
                        lineHeight: 1.2, margin: 0,
                      }}>{e.role}</h3>
                      <p style={{
                        fontFamily: "var(--font-mono)", fontSize: 10,
                        color: ACCENT, marginTop: 6, letterSpacing: "0.1em",
                      }}>{e.company}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(14,10,4,0.35)", letterSpacing: "0.15em" }}>{e.period}</span>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: 8,
                        padding: "2px 8px", borderRadius: 9999,
                        background: "rgba(14,10,4,0.05)",
                        color: "rgba(14,10,4,0.38)",
                        letterSpacing: "0.15em", textTransform: "uppercase",
                      }}>{e.type}</span>
                    </div>
                  </div>

                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                    {e.points.map((pt, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 11 }}>
                        <span style={{ marginTop: 7, width: 3, height: 3, borderRadius: "50%", background: `rgba(196,64,10,0.50)`, flexShrink: 0 }} />
                        <span style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "clamp(0.8rem,1vw,0.88rem)",
                          color: "rgba(14,10,4,0.55)", lineHeight: 1.65,
                        }}>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}`}</style>
    </section>
  );
}
