"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";
import HorizontalParallax from "./HorizontalParallax";

gsap.registerPlugin(ScrollTrigger);
// DrawSVGPlugin is a Club GSAP plugin — if not available, we fall back to a
// simple stroke-dashoffset approach that works without the plugin.
try { gsap.registerPlugin(DrawSVGPlugin); } catch { /* not available */ }

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
  const ref    = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGPathElement>(null);
  const [active, setActive] = useState<number | null>(null);

  /* SVG path draw on scroll — works with or without DrawSVGPlugin */
  useEffect(() => {
    const path = svgRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray  = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0,
        (window.innerHeight - r.top) / (r.height + window.innerHeight * 0.3)
      ));
      path.style.strokeDashoffset = `${len * (1 - p)}`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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
      {/* Horizontal parallax ghost text — replaces static watermark */}
      <HorizontalParallax
        text="EXPERIENCE"
        speed={-0.38}
        color="rgba(14,10,4,0.04)"
        fontSize="clamp(7rem,18vw,18rem)"
      />

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

          {/* SVG path timeline — draws itself on scroll */}
          <svg
            aria-hidden
            style={{
              position: "absolute",
              left: -1, top: 0,
              width: 2,
              height: "100%",
              overflow: "visible",
              pointerEvents: "none",
            }}
            preserveAspectRatio="none"
            viewBox="0 0 2 100"
          >
            {/* Track (faint) */}
            <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(14,10,4,0.08)" strokeWidth="1" />
            {/* Animated fill path */}
            <path
              ref={svgRef}
              d="M1,0 L1,100"
              stroke={ACCENT}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.08s linear" }}
            />
          </svg>

          <div style={{ paddingLeft: 36, display: "flex", flexDirection: "column" }}>
            {EXP.map((e, i) => (
              <div
                key={i}
                className="ex-item"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{ position: "relative", paddingBottom: i < EXP.length - 1 ? "clamp(32px,5vw,56px)" : 0 }}
              >
                {/* Animated dot */}
                <div style={{
                  position: "absolute", left: -40, top: 8,
                  width: 10, height: 10, borderRadius: "50%",
                  background: active === i ? ACCENT : "rgba(14,10,4,0.12)",
                  border: `1px solid ${active === i ? ACCENT : "rgba(14,10,4,0.10)"}`,
                  boxShadow: active === i ? `0 0 12px rgba(196,64,10,0.45)` : "none",
                  transition: "all 0.25s ease",
                  zIndex: 2,
                }} />

                {/* Card */}
                <div style={{
                  padding: "clamp(20px,3vw,32px)",
                  border: `1px solid ${active === i ? "rgba(196,64,10,0.18)" : "rgba(14,10,4,0.07)"}`,
                  borderRadius: 12,
                  background: active === i ? "rgba(196,64,10,0.025)" : "var(--bg-card)",
                  transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
                  boxShadow: active === i ? "0 8px 32px rgba(196,64,10,0.06)" : "none",
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
                          background: "rgba(196,64,10,0.04)", marginBottom: 10,
                        }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: ACCENT, animation: "pulse 2s infinite", display: "inline-block" }} />
                          Current
                        </span>
                      )}
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond',Georgia,serif",
                        fontSize: "clamp(1.05rem,2vw,1.35rem)",
                        fontWeight: 600, color: INK, lineHeight: 1.2, margin: 0,
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
                        background: "rgba(14,10,4,0.05)", color: "rgba(14,10,4,0.38)",
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
