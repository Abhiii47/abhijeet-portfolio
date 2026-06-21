"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";
import TracingBeam from "./TracingBeam";

gsap.registerPlugin(ScrollTrigger);

const bullets = [
  { icon: "🤖", tag: "AI/ML",      text: "Built a RAG knowledge system using Pinecone + Gemini for internal document retrieval — streaming responses, cited answers in seconds." },
  { icon: "📦", tag: "Product",   text: "Leading product execution for PIMS — a pharmacy management system covering inventory, ERP, billing and shipment tracking." },
  { icon: "☁️", tag: "Cloud",      text: "Deployed and manage two production projects on GCP — Vertex AI integrations, Google AI Studio, credential management, 99.9% uptime." },
  { icon: "📈", tag: "Impact",     text: "60% drop in manual reporting at Ecovis via Next.js ISR automation." },
];

const METRICS = [
  { value: "2",   label: "Prod Deployments" },
  { value: "GCP", label: "Cloud Platform" },
  { value: "RAG", label: "AI System" },
  { value: "4+",  label: "Months" },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set(".exp-bullet", { y: 0, opacity: 1 });
      gsap.set(".exp-metric", { y: 0, opacity: 1 });
      return;
    }

    // Enter animations: 200ms duration, 60ms stagger, trigger 80% viewport
    gsap.fromTo(".exp-metric",
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.20, stagger: 0.06, ease: "power1.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      }
    );

    gsap.fromTo(".exp-bullet",
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.20, stagger: 0.06, ease: "power1.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="experience" style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,72px)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative" }}>
        <AnimatedHeading section="02" text="Professional" italic="Experience" />

        {/* Company header */}
        <div style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: "clamp(24px,3vw,36px)",
          borderBottom: "1px solid var(--border-subtle)",
          paddingBottom: 16,
        }}>
          <div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.2rem,1rem + 1.2vw,1.65rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.2,
            }}>
              Software Development Engineer &middot; <span style={{ color: "var(--accent-primary)" }}>Ecovis RKCA</span>
            </h2>
          </div>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}>
            Feb 2026 – Present &bull; Full-time
          </span>
        </div>

        {/* Metric chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: "clamp(28px,4vw,40px)" }}>
          {METRICS.map(m => (
            <div key={m.label} className="exp-metric glass-pill" style={{
              borderRadius: "8px",
              padding: "10px 18px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.1rem,1vw + 0.6rem,1.35rem)",
                fontWeight: 800,
                color: "var(--accent-primary)",
                lineHeight: 1,
              }}>{m.value}</span>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Tracing Beam timeline wrapping the bullets */}
        <div ref={containerRef}>
          <TracingBeam>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,2.5vw,24px)" }}>
              {bullets.map((b, i) => (
                <div key={i} className="exp-bullet" style={{
                  display: "flex", gap: 16, alignItems: "flex-start",
                  position: "relative",
                }}>
                  <div className="glass-panel-light" style={{
                    borderRadius: "12px",
                    padding: "clamp(16px,1.8vw,22px) clamp(18px,2.2vw,26px)",
                    flex: 1,
                  }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>{b.icon}</span>
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem", letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        padding: "3px 8px", borderRadius: 4,
                        background: "rgba(184,50,39,0.06)",
                        border: "1px solid rgba(184,50,39,0.18)",
                        color: "var(--accent-primary)",
                        fontWeight: 700,
                      }}>{b.tag}</span>
                    </div>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(0.85rem,0.8rem + 0.2vw,0.95rem)",
                      fontWeight: 400, color: "var(--text-secondary)", lineHeight: 1.65,
                    }}>{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </TracingBeam>
        </div>
      </div>
    </section>
  );
}
