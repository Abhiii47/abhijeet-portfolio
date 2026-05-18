"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const ACCENT = "#00d4ff";

const ROLES = [
  "SDE & Product Manager",
  "Cloud Engineer · AWS / Azure",
  "ML · Next.js · TypeScript",
];

function useTypewriter(strings: string[], speed = 55, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"type" | "wait" | "erase">("type");
  const charIdx = useRef(0);

  useEffect(() => {
    const target = strings[idx];
    if (phase === "type") {
      if (charIdx.current <= target.length) {
        const t = setTimeout(() => {
          setDisplay(target.slice(0, charIdx.current));
          charIdx.current++;
        }, speed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("wait"), pause);
        return () => clearTimeout(t);
      }
    }
    if (phase === "wait") {
      const t = setTimeout(() => setPhase("erase"), 300);
      return () => clearTimeout(t);
    }
    if (phase === "erase") {
      if (charIdx.current > 0) {
        const t = setTimeout(() => {
          charIdx.current--;
          setDisplay(target.slice(0, charIdx.current));
        }, speed * 0.55);
        return () => clearTimeout(t);
      } else {
        setIdx((i) => (i + 1) % strings.length);
        setPhase("type");
      }
    }
  }, [phase, display, idx, strings, speed, pause]);

  return display;
}

export default function Entry() {
  const ref = useRef<HTMLElement>(null);
  const role = useTypewriter(ROLES);

  useGSAP(() => {
    gsap.from([".hero-label", ".hero-name", ".hero-role", ".hero-tagline", ".hero-cta", ".hero-meta"], {
      y: 32, opacity: 0, duration: 1,
      stagger: 0.1, ease: "power3.out", delay: 0.1,
    });
  }, { scope: ref });

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        minHeight: "100svh",
        background: "#080c14",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "clamp(80px,10vw,120px) clamp(24px,6vw,80px) clamp(40px,6vw,72px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0,212,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.015) 1px,transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 90% 80% at 50% 100%,black 20%,transparent 75%)",
      }} />

      {/* Top-right ambient */}
      <div aria-hidden style={{
        position: "absolute", top: "-10%", right: "-5%",
        width: "50vw", height: "50vh",
        background: "radial-gradient(ellipse,rgba(0,212,255,0.045) 0%,transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Top bar */}
      <div style={{
        position: "absolute", top: "clamp(20px,4vw,40px)", left: "clamp(24px,6vw,80px)", right: "clamp(24px,6vw,80px)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="AK">
          <path d="M3 25L9 8l6 17M5 17h8" stroke="#f0ede8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 8v17M20 17l8-9M20 17l8 9" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.3em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Available for work</span>
        </div>
      </div>

      {/* Main content — bottom-anchored editorial layout */}
      <div style={{ maxWidth: 980, position: "relative", zIndex: 2 }}>

        <p className="hero-label" style={{
          fontFamily: "monospace", fontSize: 10, letterSpacing: "0.35em",
          color: ACCENT, textTransform: "uppercase", marginBottom: 28,
        }}>Abhijeet Kadu &nbsp;·&nbsp; Mumbai, India</p>

        <h1 className="hero-name" style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(4.5rem, 13vw, 11rem)",
          fontWeight: 900, lineHeight: 0.9,
          letterSpacing: "-0.03em",
          color: "#f0ede8",
          margin: 0,
        }}>
          Abhijeet<br />
          <span style={{ color: ACCENT }}>Kadu.</span>
        </h1>

        <div className="hero-role" style={{
          marginTop: 28,
          display: "flex", alignItems: "center", gap: 12,
          minHeight: 22,
        }}>
          <span style={{ width: 24, height: 1, background: ACCENT, display: "inline-block", flexShrink: 0, opacity: 0.7 }} />
          <span style={{
            fontFamily: "monospace", fontSize: "clamp(0.7rem,1.2vw,0.85rem)",
            color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em",
          }}>
            {role}<span style={{ borderRight: `1.5px solid ${ACCENT}`, marginLeft: 2, animation: "blink 1s step-end infinite" }}>&nbsp;</span>
          </span>
        </div>

        <p className="hero-tagline" style={{
          marginTop: 20,
          fontFamily: "sans-serif", fontSize: "clamp(0.9rem,1.2vw,1rem)",
          color: "rgba(255,255,255,0.3)", maxWidth: "46ch", lineHeight: 1.6,
        }}>
          Building cloud systems &amp; shipping products at Ecovis RKCA.
        </p>

        <div className="hero-cta" style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <a
            href="#projects"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 28px",
              background: ACCENT, color: "#080c14",
              borderRadius: 9999, fontFamily: "monospace",
              fontSize: 10, letterSpacing: "0.22em",
              textTransform: "uppercase", fontWeight: 700,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >View Work
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="#contact"
            style={{
              display: "inline-flex", alignItems: "center",
              padding: "12px 28px",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "rgba(255,255,255,0.5)",
              borderRadius: 9999, fontFamily: "monospace",
              fontSize: 10, letterSpacing: "0.22em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
          >Get in touch</a>
        </div>

        <div className="hero-meta" style={{
          marginTop: 56, display: "flex", gap: 32, flexWrap: "wrap",
        }}>
          {[
            ["Company", "Ecovis RKCA"],
            ["Focus", "Cloud · Product"],
            ["Location", "Mumbai, IN"],
          ].map(([k, v]) => (
            <div key={k}>
              <p style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: 4 }}>{k}</p>
              <p style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: "clamp(24px,4vw,40px)", right: "clamp(24px,6vw,80px)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.3,
      }}>
        <span style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: "0.3em", color: "white", textTransform: "uppercase", writingMode: "vertical-rl" }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom,white,transparent)" }} />
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </section>
  );
}
