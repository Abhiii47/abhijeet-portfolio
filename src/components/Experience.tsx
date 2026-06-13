"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeading from "./AnimatedHeading";

gsap.registerPlugin(ScrollTrigger);

const bullets = [
  { icon: "🤖", tag: "AI/ML",      text: "Built a RAG knowledge system using Pinecone + Gemini for internal document retrieval — streaming responses, cited answers in seconds." },
  { icon: "📦", tag: "Product",   text: "Leading product execution for PIMS — a pharmacy management system covering inventory, ERP, billing and shipment tracking. Requirements, sprint planning, delivery." },
  { icon: "☁️", tag: "Cloud",      text: "Deployed and manage two production projects on GCP — Vertex AI integrations, Google AI Studio, credential management, 99.9% uptime." },
  { icon: "⚡", tag: "DevOps",    text: "Set up GitHub Actions CI/CD so every merge auto-deploys — eliminated manual deployment overhead and cut release time." },
];

const METRICS = [
  { value: "2",   label: "Prod deployments" },
  { value: "GCP", label: "Cloud platform" },
  { value: "RAG", label: "AI system built" },
  { value: "4+",  label: "Months full-time" },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>(".exp-bullet");
    items.forEach((el, i) => {
      gsap.fromTo(el,
        { x: -24, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.55, delay: i * 0.10,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        }
      );
    });

    const metrics = gsap.utils.toArray<HTMLElement>(".exp-metric");
    metrics.forEach((el, i) => {
      gsap.fromTo(el,
        { y: 20, opacity: 0, scale: 0.92 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.5, delay: i * 0.08,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} id="experience" style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,72px)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative" }}>
        <AnimatedHeading section="02" text="Professional" italic="Experience" />

        {/* Company header */}
        <div style={{
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          flexWrap: "wrap", gap: 16,
          marginBottom: "clamp(24px,3vw,36px)",
        }}>
          <div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.2rem,1rem+1vw,1.6rem)",
              fontWeight: 700, color: "var(--ink)", lineHeight: 1.2,
            }}>Software Development Engineer</h2>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.9rem,0.85rem+0.2vw,1rem)",
              fontWeight: 400, color: "var(--accent)",
              marginTop: 4,
            }}>Ecovis RKCA</p>
          </div>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem", letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(14,10,4,0.38)",
            paddingTop: 4,
          }}>Feb 2026 – Present · Full-time</span>
        </div>

        {/* Metric chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: "clamp(28px,4vw,40px)" }}>
          {METRICS.map(m => (
            <div key={m.label} className="exp-metric" style={{
              background: "var(--bg-card)",
              border: "1.5px solid rgba(196,64,10,0.18)",
              borderRadius: 8,
              padding: "10px 18px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            }}>
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.1rem,1vw+0.6rem,1.5rem)",
                fontWeight: 800, color: "var(--accent)", lineHeight: 1,
              }}>{m.value}</span>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.52rem", letterSpacing: "0.2em",
                textTransform: "uppercase", color: "var(--ink-hint)",
              }}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Timeline bullets */}
        <div style={{ position: "relative", paddingLeft: 28 }}>
          {/* Vertical accent line */}
          <div style={{
            position: "absolute", left: 0, top: 8, bottom: 8,
            width: 2,
            background: "linear-gradient(180deg, var(--accent) 0%, rgba(196,64,10,0.10) 100%)",
            borderRadius: 99,
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,2.5vw,24px)" }}>
            {bullets.map((b, i) => (
              <div key={i} className="exp-bullet" style={{
                display: "flex", gap: 16, alignItems: "flex-start",
                position: "relative",
              }}>
                {/* Timeline dot */}
                <div style={{
                  position: "absolute", left: -33,
                  top: 4, width: 8, height: 8,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  boxShadow: "0 0 0 3px rgba(196,64,10,0.15)",
                  flexShrink: 0,
                }} />

                <div style={{
                  background: "var(--bg-card)",
                  border: "1.5px solid rgba(14,10,4,0.08)",
                  borderRadius: 10,
                  padding: "clamp(12px,1.5vw,18px) clamp(14px,2vw,22px)",
                  flex: 1,
                  transition: "border-color 0.22s, box-shadow 0.22s",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,64,10,0.28)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(196,64,10,0.07)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(14,10,4,0.08)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: "1rem", lineHeight: 1 }}>{b.icon}</span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem", letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      padding: "2px 8px", borderRadius: 3,
                      background: "rgba(196,64,10,0.07)",
                      border: "1px solid rgba(196,64,10,0.18)",
                      color: "var(--accent)",
                    }}>{b.tag}</span>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(0.85rem,0.8rem+0.2vw,0.95rem)",
                    fontWeight: 300, color: "var(--ink-muted)", lineHeight: 1.7,
                  }}>{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
