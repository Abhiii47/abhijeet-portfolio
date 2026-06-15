"use client";

import { FileText } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

export default function About() {
  return (
    <section id="about" style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,72px)" }}>
      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
      
      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative" }}>
        <AnimatedHeading section="01" text="About" italic="Me" />

        <div className="about-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px,5vw,64px)",
          alignItems: "start",
        }}>
          {/* Bio text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              "I'm a final-year Computer Engineering student and Software Development Engineer at Ecovis RKCA, focused on full-stack web applications and ML-powered systems. I like taking projects from vague idea to something that actually ships and gets used.",
              "Recently, that has meant building an internal RAG knowledge assistant using Pinecone and Gemini for fast, cited answers over company documents, hosted on GCP. I'm also leading product execution on PIMS, a client-facing pharmacy management system for inventory, ERP, billing, and shipment tracking.",
              "Outside of work, I experiment with ML pipelines, analytics dashboards, and game prototypes. I care about clean implementations, clear UX, and making sure every project on this page either runs in production or has a real repository or merged PR behind it.",
            ].map((text, i) => (
              <p key={i} style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: 1.65,
                color: "var(--text-secondary)",
              }}>{text}</p>
            ))}
          </div>

          {/* Quick Facts card */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Profile Picture - portrait ratio */}
            <div style={{
              width: "100%",
              height: "auto",
              aspectRatio: "3/4",
              maxHeight: 320,
              borderRadius: 12,
              overflow: "hidden",
              border: "1.5px solid var(--border-subtle)",
              position: "relative",
              boxShadow: "0 8px 24px rgba(26,23,20,0.06), 0 2px 8px rgba(26,23,20,0.04)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(26,23,20,0.12), 0 4px 12px rgba(26,23,20,0.08)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(26,23,20,0.06), 0 2px 8px rgba(26,23,20,0.04)";
              }}
            >
              <img
                src="/profile.jpg"
                alt="Abhijeet Kadu"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 20%",
                  display: "block",
                }}
              />
              {/* Warm accent gradient overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 55%, rgba(184,50,39,0.08))",
                borderRadius: 12,
                pointerEvents: "none",
              }} />
            </div>

            {/* Quick Facts */}
            <div className="glass-panel-light" style={{
              borderRadius: "12px",
              padding: "clamp(16px,2vw,24px)",
            }}>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--accent-primary)",
                marginBottom: 16,
                fontWeight: 700,
              }}>Quick Facts</p>

              {[
                { label: "Currently",     value: "Ecovis RKCA — SDE" },
                { label: "Status",        value: "Open to full-time · June 2026" },
                { label: "Location",      value: "Mumbai, IN" },
                { label: "Response Time", value: "Within 24 hours" },
                { label: "Timezone",      value: "IST (UTC+5:30)" },
              ].map(({ label, value }) => (
                <div key={label} style={{ marginBottom: 14 }}>
                  <p style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: 3,
                  }}>{label}</p>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    lineHeight: 1.4,
                  }}>{value}</p>
                </div>
              ))}
            </div>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel-light"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "var(--text-primary)",
                borderRadius: "6px",
                padding: "11px 20px",
              }}
            >
              <FileText size={12} style={{ display: "inline-block", flexShrink: 0 }} />
              Download CV ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
