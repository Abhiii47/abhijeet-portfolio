import { FileText } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

export default function About() {
  return (
    <section id="about" style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,72px)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative" }}>
        <AnimatedHeading section="01" text="About" italic="Me" />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(340px,100%), 1fr))",
          gap: "clamp(24px,4vw,48px)",
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
                fontSize: "clamp(0.9rem,0.85rem + 0.3vw,1.05rem)",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "var(--ink-muted)",
              }}>{text}</p>
            ))}
          </div>

          {/* Quick Facts card */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Profile Picture */}
            <div style={{
              width: "100%",
              height: 240,
              borderRadius: 10,
              overflow: "hidden",
              border: "1.5px solid rgba(14,10,4,0.10)",
              marginBottom: 4,
              boxShadow: "0 4px 20px rgba(14,10,4,0.04)",
            }}>
              <img
                src="/profile.jpg"
                alt="Abhijeet Kadu"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
              />
            </div>

            <div style={{
              background: "var(--bg-card)",
              border: "1.5px solid rgba(14,10,4,0.10)",
              borderRadius: 10,
              padding: "clamp(16px,2vw,24px)",
            }}>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--ink-hint)",
                marginBottom: 16,
              }}>Quick Facts</p>

              {[
                { label: "Currently", value: "Ecovis RKCA — SDE" },
                { label: "Status",    value: "Open to full-time · June 2026" },
                { label: "Location",  value: "Mumbai, IN" },
              ].map(({ label, value }) => (
                <div key={label} style={{ marginBottom: 14 }}>
                  <p style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--ink-hint)",
                    marginBottom: 3,
                  }}>{label}</p>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "var(--ink)",
                    lineHeight: 1.4,
                  }}>{value}</p>
                </div>
              ))}
            </div>

            <a
              href="/resume.pdf"
              className="about-cv-btn"
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
                color: "var(--ink)",
                border: "1.5px solid rgba(14,10,4,0.18)",
                borderRadius: 4,
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
