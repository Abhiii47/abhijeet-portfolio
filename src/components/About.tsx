"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#00d4ff";

const METRICS = [
  { value: "Top 0.1%", label: "Amazon ML School",  note: "of 100,000+ applicants" },
  { value: "99.9%",    label: "Cloud Uptime",        note: "post-migration at Ecovis" },
  { value: "60%",      label: "Reporting Time Saved", note: "internal Next.js tooling" },
  { value: "5+",       label: "Products Shipped",    note: "end-to-end production" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".about-el", {
      scrollTrigger: { trigger: ref.current, start: "top 72%" },
      y: 30, opacity: 0, duration: 0.9,
      stagger: 0.1, ease: "power3.out",
    });
    gsap.from(".metric-card", {
      scrollTrigger: { trigger: ".metrics-row", start: "top 88%" },
      y: 24, opacity: 0, duration: 0.65,
      stagger: 0.08, ease: "power2.out",
    });
  }, { scope: ref });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: "#f7f5f0",
        color: "#0d0f14",
        padding: "clamp(64px,10vw,120px) clamp(24px,6vw,80px)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Ghost number */}
      <span aria-hidden style={{
        position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)",
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontSize: "clamp(8rem,20vw,20rem)", fontWeight: 900, lineHeight: 1,
        color: "transparent", WebkitTextStroke: "1px rgba(13,15,20,0.05)",
        pointerEvents: "none", userSelect: "none",
      }}>01</span>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Label */}
        <p className="about-el" style={{
          fontFamily: "monospace", fontSize: 10, letterSpacing: "0.35em",
          color: ACCENT, textTransform: "uppercase", marginBottom: 40,
        }}>01 / About</p>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,96px)", alignItems: "start" }} className="about-grid">

          {/* Left — headline */}
          <div>
            <h2 className="about-el" style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: "clamp(2.2rem,4vw,3.5rem)",
              fontWeight: 700, lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#0d0f14",
              marginBottom: 0,
            }}>
              Building systems that scale &amp; products that ship.
            </h2>
          </div>

          {/* Right — text body */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p className="about-el" style={{ fontSize: "clamp(0.95rem,1.1vw,1.05rem)", color: "rgba(13,15,20,0.6)", lineHeight: 1.75, maxWidth: "52ch" }}>
              At <strong style={{ color: "#0d0f14" }}>Ecovis RKCA</strong> I lead cloud migration to AWS &amp; Azure,
              build internal tooling in Next.js that cut manual reporting by 60%, and own the product roadmap
              from requirement gathering to sprint delivery across cross-functional teams.
            </p>
            <p className="about-el" style={{ fontSize: "clamp(0.95rem,1.1vw,1.05rem)", color: "rgba(13,15,20,0.6)", lineHeight: 1.75, maxWidth: "52ch" }}>
              Selected for the <strong style={{ color: "#0d0f14" }}>Amazon ML Summer School</strong> (top 0.1%
              of 100k+ applicants). Worked on Microsoft Fabric ETL pipelines and earned the
              DP-600 Analytics Engineer certification.
            </p>
            <p className="about-el" style={{ fontSize: "clamp(0.95rem,1.1vw,1.05rem)", color: "rgba(13,15,20,0.6)", lineHeight: 1.75, maxWidth: "52ch" }}>
              I bridge the gap between engineering depth and product thinking — comfortable
              writing infra-level code and presenting roadmaps to stakeholders.
            </p>

            {/* CTAs */}
            <div className="about-el" style={{ display: "flex", gap: 20, alignItems: "center", marginTop: 8, flexWrap: "wrap" }}>
              <a
                href="/resume.pdf"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "10px 22px",
                  background: "#0d0f14", color: "#f7f5f0",
                  borderRadius: 9999, fontFamily: "monospace",
                  fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = "#0d0f14"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#0d0f14"; e.currentTarget.style.color = "#f7f5f0"; }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                  <path d="M5.5 1v7M2.5 5.5l3 3 3-3M1 9.5h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download CV
              </a>
              <a
                href="#contact"
                style={{
                  fontFamily: "monospace", fontSize: 9, letterSpacing: "0.22em",
                  textTransform: "uppercase", color: "rgba(13,15,20,0.4)",
                  textDecoration: "none", transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(13,15,20,0.4)")}
              >Get in touch &rarr;</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(13,15,20,0.08)", margin: "clamp(40px,6vw,72px) 0" }} />

        {/* Metrics */}
        <div className="metrics-row" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2 }}>
          {METRICS.map((m, i) => (
            <div
              key={i}
              className="metric-card"
              style={{
                padding: "clamp(20px,3vw,32px) clamp(16px,2.5vw,28px)",
                borderLeft: i === 0 ? "none" : "1px solid rgba(13,15,20,0.08)",
              }}
            >
              <p style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 700, color: "#0d0f14", lineHeight: 1, marginBottom: 8,
              }}>{m.value}</p>
              <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: ACCENT, marginBottom: 4 }}>{m.label}</p>
              <p style={{ fontSize: 12, color: "rgba(13,15,20,0.4)", lineHeight: 1.4 }}>{m.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile grid override */}
      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .metrics-row { grid-template-columns: 1fr 1fr !important; }
          .metrics-row > div { border-left: none !important; border-top: 1px solid rgba(13,15,20,0.08); }
        }
      `}</style>
    </section>
  );
}
