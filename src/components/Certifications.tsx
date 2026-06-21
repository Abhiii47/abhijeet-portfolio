"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Award, Star, ExternalLink } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set(".cert-card", { y: 0, opacity: 1 });
      return;
    }

    gsap.fromTo(".cert-card",
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.20, stagger: 0.06, ease: "power1.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="certifications" style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,72px)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%" }}>
        <AnimatedHeading section="05" text="Licenses &" italic="Certifications" />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(280px,100%), 1fr))",
          gap: "clamp(16px,2vw,24px)",
        }}>
          {/* Card 1 — Microsoft */}
          <div className="cert-card glass-panel-light" style={{
            borderRadius: "12px",
            padding: "clamp(20px,2.4vw,28px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent-primary)" }}>
                  <Award size={18} />
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}>Microsoft &bull; Feb 2026</span>
                </div>
              </div>
              
              <h3 style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem,1.1rem,1.3rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1.3,
                marginBottom: 8,
              }}>Fabric Analytics Engineer Associate</h3>
              
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                fontWeight: 400,
                color: "var(--text-secondary)",
                lineHeight: 1.55,
                marginBottom: 20,
              }}>DP-600 &bull; MS Fabric &bull; Spark &bull; Lakehouse &bull; Power BI &bull; ETL</p>
            </div>

            <a
              href="https://learn.microsoft.com/en-us/users/abhijeetkadu-8743/credentials/a8e0f5be8e5ee684"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-pill"
              style={{
                alignSelf: "flex-start",
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 700,
                padding: "8px 16px",
                borderRadius: "6px",
                color: "var(--text-primary)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Verify Credential <ExternalLink size={10} />
            </a>
          </div>

          {/* Card 2 — Amazon */}
          <div className="cert-card glass-panel-light" style={{
            borderRadius: "12px",
            padding: "clamp(20px,2.4vw,28px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent-primary)" }}>
                  <Star size={18} />
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}>Amazon &bull; 2025</span>
                </div>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.52rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "3px 8px",
                  borderRadius: 4,
                  background: "rgba(184, 50, 39, 0.08)",
                  border: "1px solid rgba(184, 50, 39, 0.25)",
                  color: "var(--accent-primary)",
                  fontWeight: 700,
                }}>Top 0.1%</span>
              </div>

              <h3 style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem,1.1rem,1.3rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1.3,
                marginBottom: 8,
              }}>Amazon ML Summer School</h3>

              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                fontWeight: 400,
                color: "var(--text-secondary)",
                lineHeight: 1.55,
                marginBottom: 20,
              }}>Supervised learning &bull; XGBoost &bull; Feature engineering &bull; Model evaluation</p>
            </div>

            <a
              href="#"
              className="glass-pill"
              style={{
                alignSelf: "flex-start",
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 700,
                padding: "8px 16px",
                borderRadius: "6px",
                color: "var(--text-primary)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
              onClick={e => e.preventDefault()}
            >
              Top 0.1% Nationally
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
