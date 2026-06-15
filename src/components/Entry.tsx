"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RMArrow, RMZigzag, RMHr } from "./RMDecorations";

gsap.registerPlugin(ScrollTrigger);

const PAIN_POINTS = [
  { number: "01", title: "The Generalist Trap",  body: "Recruiters see \"SDE & Product Manager\" and assume you’re a diluted version of both. You’re actually just rare." },
  { number: "02", title: "The Silent Rejection", body: "A portfolio without live projects is a resume in disguise. Every repo here ships." },
  { number: "03", title: "The Experience Gap",   body: "50K resumes scored. 150K ML records processed. Top 0.1% nationally. The gap is already closed." },
];

export default function Entry() {
  const sectionRef   = useRef<HTMLElement>(null);
  const nameRef      = useRef<HTMLDivElement>(null);
  const headRef      = useRef<HTMLHeadingElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const arrowAreaRef = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const painRef      = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set([nameRef.current, badgeRef.current, headRef.current, arrowAreaRef.current, ctaRef.current, scrollIndRef.current], { y: 0, opacity: 1 });
      return;
    }

    // Hero entrance - 200ms ease-out, 20px translateY, 60ms stagger
    const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
    tl.fromTo(nameRef.current,      { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.20 }, 0)
      .fromTo(badgeRef.current,     { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.20 }, 0.06)
      .fromTo(headRef.current,      { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.20 }, 0.12)
      .fromTo(arrowAreaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.20 }, 0.18)
      .fromTo(ctaRef.current,       { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.20 }, 0.24)
      .fromTo(scrollIndRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.20 }, 0.30);

    // Pain-point cards
    const cards = gsap.utils.toArray<HTMLElement>(".pain-card");
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.20, delay: i * 0.06, ease: "power1.out",
          scrollTrigger: { trigger: painRef.current, start: "top 85%", once: true },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        background: "var(--bg-primary)",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(80px,10vw,120px) 0 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-radius: 999px;
          padding: 6px 14px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-primary);
        }
        .badge-pill--work {
          border-color: var(--accent-success) !important;
        }
        .avail-dot {
          width: 7px;
          height: 7px;
          background: var(--accent-success);
          border-radius: 50%;
        }
        @media (max-width: 768px) {
          .hero-layout {
            grid-template-columns: 1fr !important;
          }
          .hero-watermark {
            display: none !important;
          }
        }
      `}</style>

      {/* Grid background */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(rgba(184,50,39,0.02) 1px,transparent 1px)," +
          "linear-gradient(90deg,rgba(184,50,39,0.02) 1px,transparent 1px)",
        backgroundSize: "80px 80px",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative", padding: "0 clamp(20px,5vw,72px)", zIndex: 1 }}>
        <div className="hero-layout" style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 40,
          alignItems: "center",
        }}>
          {/* Left Column: Content */}
          <div>
            {/* Name label */}
            <div ref={nameRef}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--accent-secondary)",
              }}>Abhijeet Kadu</span>
            </div>

            {/* Badges */}
            <div ref={badgeRef} style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, margin: "16px 0 24px" }}>
              <div className="badge-pill badge-pill--work glass-pill">
                <span className="avail-dot pulse-green" />
                <span>Open to Work</span>
              </div>
              <div className="badge-pill glass-pill">Mumbai, IN</div>
              <div className="badge-pill glass-pill" style={{ borderColor: "var(--accent-secondary)", color: "var(--accent-primary)" }}>2026</div>
              <div className="badge-pill glass-pill">SDE + PM</div>
            </div>

            {/* Heading */}
            <h1 ref={headRef} style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6.2vw, 4.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--text-primary)",
              marginBottom: 24,
            }}>
              <div>Abhijeet Kadu</div>
              <div style={{ fontWeight: 400, color: "var(--text-secondary)" }}>engineers systems</div>
              <div style={{ fontStyle: "italic", color: "var(--accent-primary)" }}>that ship.</div>
            </h1>

            {/* Subtext and Quote block */}
            <div ref={arrowAreaRef} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p ref={subRef} style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "16px",
                color: "var(--text-secondary)",
                lineHeight: 1.65,
                margin: 0,
              }}>
                Full-stack from Jupyter notebooks to production deployments. Mumbai-based, globally useful.
              </p>

              <blockquote style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 1.4vw, 1.35rem)",
                lineHeight: 1.4,
                color: "var(--text-primary)",
                borderLeft: "3.5px solid var(--accent-primary)",
                paddingLeft: 20,
                margin: "16px 0 24px",
                textAlign: "left",
              }}>
                &ldquo;Stop guessing what good engineers look like. Here's one.&rdquo;
              </blockquote>
            </div>

            {/* CTAs */}
            <div ref={ctaRef} style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="#projects"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "0.68rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  padding: "12px 28px",
                  background: "var(--accent-primary)",
                  color: "#fff",
                  borderRadius: 6,
                  textDecoration: "none",
                  transition: "transform 0.15s ease, opacity 0.15s ease",
                  display: "inline-block",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.opacity = "0.9"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.opacity = "1"; }}
              >View Work ↗</a>
              <a href="#contact"
                className="glass-panel-light"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "0.68rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  padding: "12px 28px",
                  color: "var(--text-primary)",
                  borderRadius: "6px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >Let’s Talk</a>
            </div>
          </div>

          {/* Right Column: Watermark */}
          <div className="hero-watermark" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            userSelect: "none",
            pointerEvents: "none",
          }}>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(12rem, 20vw, 22rem)",
              fontWeight: 900,
              lineHeight: 1,
              color: "var(--accent-primary)",
              opacity: 0.08,
              letterSpacing: "-0.08em",
            }}>AK</span>
          </div>
        </div>

        {/* Proof strip marquee */}
        <div className="proof-ticker-wrap" style={{
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "12px 0",
          marginTop: 64,
          marginBottom: 32,
        }}>
          <div className="proof-ticker-list" style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
          }}>
            <span>50k+ Resumes Scored</span>
            <span>&middot;</span>
            <span>2 GCP Prod Deployments</span>
            <span>&middot;</span>
            <span>Top 0.1% Amazon ML</span>
            <span>&middot;</span>
            <span>4 OSS PRs Merged</span>
            <span>&middot;</span>
            <span>50k+ Resumes Scored</span>
            <span>&middot;</span>
            <span>2 GCP Prod Deployments</span>
            <span>&middot;</span>
            <span>Top 0.1% Amazon ML</span>
            <span>&middot;</span>
            <span>4 OSS PRs Merged</span>
            <span>&middot;</span>
            <span>50k+ Resumes Scored</span>
            <span>&middot;</span>
            <span>2 GCP Prod Deployments</span>
            <span>&middot;</span>
            <span>Top 0.1% Amazon ML</span>
            <span>&middot;</span>
            <span>4 OSS PRs Merged</span>
          </div>
        </div>
      </div>

      {/* Pain-point grid */}
      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative", padding: "0 clamp(20px,5vw,72px) clamp(48px,7vw,80px)", zIndex: 1 }}>
        <div ref={painRef}>
          <RMHr label="why me though" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(280px,100%),1fr))", gap: "clamp(10px,1.5vw,16px)", marginTop: 8 }}>
            {PAIN_POINTS.map((pp) => (
              <div key={pp.number} className="pain-card glass-panel-light" style={{
                borderRadius: "12px",
                padding: "clamp(16px,2vw,24px)",
                position: "relative",
                overflow: "hidden",
              }}
              >
                <span aria-hidden style={{
                  position: "absolute", right: 12, top: 4,
                  fontFamily: "var(--font-display)", fontWeight: 800,
                  fontSize: "3rem", color: "var(--border-subtle)",
                  opacity: 0.25,
                  lineHeight: 1, userSelect: "none",
                }}>{pp.number}</span>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--accent-primary)", marginBottom: 8 }}>{pp.number}</p>
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1.3 }}>{pp.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 400, color: "var(--text-secondary)", lineHeight: 1.65 }}>{pp.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndRef}
        style={{
          position: "absolute",
          bottom: "clamp(24px,4vw,48px)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          zIndex: 2,
        }}
      >
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.52rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}>Scroll</span>
        <div style={{
          width: 1.5,
          height: 40,
          background: "var(--border-subtle)",
          borderRadius: 99,
          overflow: "hidden",
          position: "relative",
        }}>
          <div
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%",
              height: "40%",
              background: "var(--accent-primary)",
              borderRadius: 99,
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: "clamp(48px,7vw,80px)", position: "relative", zIndex: 1 }}>
        <RMZigzag />
      </div>
    </section>
  );
}
