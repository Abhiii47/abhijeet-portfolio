"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PROOF_ITEMS = [
  { number: "50K+", label: "Resumes Scored" },
  { number: "0.1%", label: "Amazon ML National" },
  { number: "99.9%", label: "GCP Uptime" },
  { number: "4",    label: "OSS PRs Merged" },
];

const STORY_LINES = [
  { num: "01", headline: "The Generalist Trap",  body: "SDE + PM looks diluted on paper. In practice it means I ship the product, own the stack, and talk to users. Every project here does all three." },
  { num: "02", headline: "The Silent Rejection",  body: "A portfolio without shipped code is a résumé in disguise. Every repo on this page is live, deployed, or has a merged PR behind it." },
  { num: "03", headline: "The Experience Gap",    body: "50K resumes scored. 150K ML records. Top 0.1% nationally. The gap closed before you opened this page." },
];

export default function Entry() {
  const sectionRef    = useRef<HTMLElement>(null);
  const headlineRef   = useRef<HTMLHeadingElement>(null);
  const badgesRef     = useRef<HTMLDivElement>(null);
  const proofRef      = useRef<HTMLDivElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);
  const storyRef      = useRef<HTMLDivElement>(null);
  const scrollIndRef  = useRef<HTMLDivElement>(null);
  const nameRef       = useRef<HTMLSpanElement>(null);

  // Scramble-to-settle on name
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const target = "ABHIJEET KADU";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let iteration = 0;
    const maxIterations = target.length * 3;
    const interval = setInterval(() => {
      el.textContent = target.split("").map((letter, i) => {
        if (letter === " ") return " ";
        if (i < Math.floor(iteration / 3)) return letter;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join("");
      iteration++;
      if (iteration >= maxIterations) {
        el.textContent = target;
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) {
      gsap.set([headlineRef.current, badgesRef.current, proofRef.current, ctaRef.current, scrollIndRef.current], { y: 0, opacity: 1 });
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(headlineRef.current,  { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 0)
      .fromTo(badgesRef.current,    { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.40 }, 0.15)
      .fromTo(proofRef.current,     { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.40 }, 0.28)
      .fromTo(ctaRef.current,       { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, 0.40)
      .fromTo(scrollIndRef.current, { opacity: 0 },        { opacity: 1, duration: 0.30 },        0.60);

    gsap.fromTo(".story-row",
      { x: -20, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.45, stagger: 0.10, ease: "power2.out",
        scrollTrigger: { trigger: storyRef.current, start: "top 82%", once: true },
      }
    );
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
        padding: "clamp(88px,11vw,128px) 0 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .entry-grid { display: grid; grid-template-columns: 1fr; gap: 0; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          border-radius: 999px; padding: 5px 13px;
          font-family: var(--font-mono); font-size: 10px;
          font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--text-primary); border: 1px solid var(--border-subtle);
          background: var(--bg-card);
        }
        .hero-badge--open { border-color: var(--accent-success) !important; }
        .avail-dot {
          width: 7px; height: 7px;
          background: var(--accent-success); border-radius: 50%;
        }
        .proof-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          overflow: hidden;
          margin: clamp(28px,4vw,44px) 0;
        }
        .proof-cell {
          padding: clamp(14px,2vw,20px) clamp(12px,1.5vw,18px);
          background: var(--bg-card);
          display: flex; flex-direction: column; gap: 4px;
          position: relative;
        }
        .proof-cell + .proof-cell::before {
          content: ""; position: absolute; left: 0; top: 20%; bottom: 20%;
          width: 1px; background: var(--border-subtle);
        }
        .proof-num {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.4rem, 2.2vw, 2rem);
          color: var(--accent-primary); line-height: 1;
          letter-spacing: -0.03em;
        }
        .proof-label {
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--text-muted); font-weight: 600;
        }
        .cta-primary {
          font-family: var(--font-mono); font-weight: 700;
          font-size: 0.65rem; letter-spacing: 0.20em; text-transform: uppercase;
          padding: 13px 28px; background: var(--accent-primary);
          color: #fff; border-radius: 6px; text-decoration: none;
          display: inline-block; transition: transform 0.15s ease, opacity 0.15s ease;
        }
        .cta-primary:hover { transform: translateY(-2px); opacity: 0.88; }
        .cta-secondary {
          font-family: var(--font-mono); font-weight: 700;
          font-size: 0.65rem; letter-spacing: 0.20em; text-transform: uppercase;
          padding: 13px 28px; background: transparent;
          color: var(--text-primary); border-radius: 6px; text-decoration: none;
          display: inline-block; border: 1.5px solid var(--border-subtle);
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .cta-secondary:hover { border-color: var(--accent-primary); background: var(--bg-card); }
        .story-divider {
          height: 1px; background: var(--border-subtle);
          margin: clamp(40px,6vw,72px) 0 clamp(28px,4vw,44px);
        }
        .story-label {
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--accent-secondary); font-weight: 700;
          margin-bottom: clamp(16px,2.5vw,28px);
        }
        .story-rows { display: flex; flex-direction: column; gap: 0; }
        .story-row {
          display: grid; grid-template-columns: 52px 1fr;
          gap: clamp(16px, 2.5vw, 28px);
          padding: clamp(16px,2vw,22px) 0;
          border-bottom: 1px solid var(--border-subtle);
          align-items: start;
        }
        .story-row:first-child { border-top: 1px solid var(--border-subtle); }
        .story-num {
          font-family: var(--font-mono); font-size: 11px;
          font-weight: 700; letter-spacing: 0.22em;
          color: var(--border-subtle); padding-top: 3px;
        }
        .story-headline {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(0.9rem, 0.85rem + 0.3vw, 1.05rem);
          color: var(--text-primary); margin-bottom: 5px; line-height: 1.25;
        }
        .story-body {
          font-family: var(--font-body); font-size: 13px;
          color: var(--text-secondary); line-height: 1.65; font-weight: 400;
        }
        @media (max-width: 640px) {
          .proof-strip { grid-template-columns: repeat(2, 1fr); }
          .proof-cell + .proof-cell::before { display: none; }
          .hero-watermark { display: none !important; }
        }
      `}</style>

      {/* Subtle grid background */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(rgba(184,50,39,0.018) 1px,transparent 1px)," +
          "linear-gradient(90deg,rgba(184,50,39,0.018) 1px,transparent 1px)",
        backgroundSize: "80px 80px",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Watermark */}
      <div className="hero-watermark" aria-hidden style={{
        position: "absolute", right: "clamp(20px,6vw,80px)", top: "50%",
        transform: "translateY(-50%)",
        fontFamily: "var(--font-display)",
        fontSize: "clamp(9rem,18vw,20rem)", fontWeight: 900,
        lineHeight: 1, color: "var(--accent-primary)",
        opacity: 0.04, letterSpacing: "-0.08em",
        userSelect: "none", pointerEvents: "none", zIndex: 0,
      }}>AK</div>

      <div style={{
        maxWidth: 860,
        margin: "0 auto", width: "100%",
        padding: "0 clamp(20px,5vw,64px)",
        position: "relative", zIndex: 1,
      }}>

        {/* Scramble name label */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "11px",
          fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase",
          color: "var(--accent-secondary)", marginBottom: 20,
        }}>
          <span ref={nameRef}>ABHIJEET KADU</span>
        </div>

        {/* Headline — the story's first line */}
        <h1 ref={headlineRef} style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.8rem, 7vw, 5.2rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.04,
          color: "var(--text-primary)",
          marginBottom: 0,
        }}>
          <div>Engineers</div>
          <div style={{ color: "var(--text-secondary)", fontWeight: 400 }}>systems</div>
          <div style={{ fontStyle: "italic", color: "var(--accent-primary)" }}>that ship.</div>
        </h1>

        {/* Badges row */}
        <div ref={badgesRef} style={{
          display: "flex", alignItems: "center",
          flexWrap: "wrap", gap: 8,
          marginTop: "clamp(22px,3vw,32px)",
        }}>
          <div className="hero-badge hero-badge--open">
            <span className="avail-dot pulse-green" />
            Open to Work
          </div>
          <div className="hero-badge">Mumbai, IN</div>
          <div className="hero-badge" style={{ color: "var(--accent-primary)", borderColor: "var(--accent-secondary)" }}>2026</div>
          <div className="hero-badge">SDE + PM</div>
        </div>

        {/* Proof strip — 4 numbers */}
        <div ref={proofRef} className="proof-strip">
          {PROOF_ITEMS.map(p => (
            <div key={p.label} className="proof-cell">
              <span className="proof-num">{p.number}</span>
              <span className="proof-label">{p.label}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div ref={ctaRef} style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a href="#projects" className="cta-primary">View Work ↗</a>
          <a href="#contact" className="cta-secondary">Let's Talk</a>
        </div>

        {/* Story divider */}
        <div className="story-divider" />

        {/* Story rows — editorial narrative */}
        <div ref={storyRef}>
          <p className="story-label">Why me though</p>
          <div className="story-rows">
            {STORY_LINES.map(s => (
              <div key={s.num} className="story-row">
                <span className="story-num">{s.num}</span>
                <div>
                  <div className="story-headline">{s.headline}</div>
                  <div className="story-body">{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndRef} style={{
        position: "absolute", bottom: "clamp(24px,4vw,44px)",
        left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 6, zIndex: 2,
      }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.5rem",
          letterSpacing: "0.38em", textTransform: "uppercase",
          color: "var(--text-muted)",
        }}>Scroll</span>
        <div style={{
          width: 1.5, height: 40,
          background: "var(--border-subtle)",
          borderRadius: 99, overflow: "hidden", position: "relative",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0,
            width: "100%", height: "40%",
            background: "var(--accent-primary)", borderRadius: 99,
          }} />
        </div>
      </div>

    </section>
  );
}
