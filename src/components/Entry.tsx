"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(TextPlugin);

const ACCENT = "#00d4ff";
const ROLES = [
  "SDE",
  "ML Engineer",
  "Cloud Engineer",
  "Product Manager",
  "Builder",
];

/* ── Typewriter cycling through ROLES ── */
function useRoleCycler() {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const role = ROLES[roleIdx];
    let i = 0;
    let erasing = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!erasing) {
        setText(role.slice(0, i + 1));
        i++;
        if (i === role.length) {
          timeout = setTimeout(() => { erasing = true; tick(); }, 1800);
          return;
        }
      } else {
        setText(role.slice(0, i - 1));
        i--;
        if (i === 0) {
          setRoleIdx(idx => (idx + 1) % ROLES.length);
          return;
        }
      }
      timeout = setTimeout(tick, erasing ? 40 : 68);
    };

    timeout = setTimeout(tick, 120);
    return () => clearTimeout(timeout);
  }, [roleIdx]);

  return text;
}

/* ── SVG noise filter ID ── */
const NOISE_ID = "hero-noise";

export default function Entry() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef    = useRef<HTMLHeadingElement>(null);
  const role       = useRoleCycler();

  /* Scramble + reveal animation on mount */
  useGSAP(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const el    = nameRef.current;
    if (!el) return;

    /* Scramble the first line "ABHIJEET" */
    const scrambleLine = (node: Element, final: string, delay = 0) => {
      let frame = 0;
      const total = 18;
      const id = setInterval(() => {
        if (frame >= total) {
          (node as HTMLElement).textContent = final;
          clearInterval(id);
          return;
        }
        const progress = frame / total;
        const revealed  = Math.floor(progress * final.length);
        const scrambled = final
          .split("")
          .map((ch, idx) =>
            idx < revealed
              ? ch
              : ch === " "
              ? " "
              : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("");
        (node as HTMLElement).textContent = scrambled;
        frame++;
      }, 55);
    };

    /* Stagger scramble on both name lines */
    const lines = el.querySelectorAll(".name-line");
    lines.forEach((line, i) => {
      const final = (line as HTMLElement).dataset.text || "";
      setTimeout(() => scrambleLine(line, final), 200 + i * 320);
    });

    /* Reveal everything else */
    gsap.from(".h-reveal", {
      y: 40, opacity: 0, duration: 1,
      stagger: 0.1, ease: "power3.out", delay: 0.3,
    });
  }, { scope: sectionRef });

  return (
    <>
      {/* Google Font — Bebas Neue + Inter */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500&display=swap');

        /* ── Noise grain overlay ── */
        .hero-grain::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.032;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px 160px;
        }

        /* ── Pulse badge ── */
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
          50%       { box-shadow: 0 0 0 6px rgba(74,222,128,0); }
        }
        .avail-dot {
          animation: badgePulse 2s ease-in-out infinite;
          border-radius: 50%;
        }

        /* ── Cursor blink ── */
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* ── Subtle lines animation ── */
        @keyframes slideRight {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }
      `}</style>

      <section
        id="hero"
        ref={sectionRef}
        className="hero-grain"
        style={{
          minHeight: "100svh",
          background: "#080c14",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "100px clamp(20px,5vw,72px) clamp(44px,6vw,72px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Subtle grid ── */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: [
            "linear-gradient(rgba(0,212,255,0.016) 1px,transparent 1px)",
            "linear-gradient(90deg,rgba(0,212,255,0.016) 1px,transparent 1px)",
          ].join(","),
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 100% 85% at 50% 100%,black 30%,transparent 80%)",
        }} />

        {/* ── Top-right ambient glow ── */}
        <div aria-hidden style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: "60vw", height: "60vh",
          background: "radial-gradient(ellipse,rgba(0,212,255,0.036) 0%,transparent 65%)",
          pointerEvents: "none",
        }} />

        {/* ── Top bar ── */}
        <div style={{
          position: "absolute",
          top: "clamp(20px,3.5vw,36px)",
          left: "clamp(20px,5vw,72px)",
          right: "clamp(20px,5vw,72px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          {/* Logo mark */}
          <a href="#hero" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-label="AK">
              <path d="M3 25L9 8l6 17M5 17h8" stroke="#f0ede8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 8v17M20 17l8-9M20 17l8 9" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Available badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "6px 14px",
            border: "1px solid rgba(74,222,128,0.25)",
            borderRadius: 9999,
            background: "rgba(74,222,128,0.06)",
          }}>
            <span
              className="avail-dot"
              style={{ width: 7, height: 7, background: "#4ade80", display: "inline-block" }}
            />
            <span style={{
              fontFamily: "'Inter', monospace",
              fontSize: 9, letterSpacing: "0.28em",
              color: "rgba(74,222,128,0.85)",
              textTransform: "uppercase",
            }}>Available · June 2026</span>
          </div>
        </div>

        {/* ── Main content ── */}
        <div style={{ maxWidth: 1100, position: "relative", zIndex: 2 }}>

          {/* Location label */}
          <p className="h-reveal" style={{
            fontFamily: "'Inter', monospace",
            fontSize: 10, letterSpacing: "0.42em",
            color: ACCENT, textTransform: "uppercase",
            marginBottom: "clamp(16px,2.5vw,28px)",
          }}>Mumbai, India &nbsp;·&nbsp; CE Student · 2026</p>

          {/* ── GIANT NAME ── */}
          <h1
            ref={nameRef}
            style={{
              fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
              fontSize: "clamp(5rem, 16vw, 14rem)",
              fontWeight: 400,
              lineHeight: 0.88,
              letterSpacing: "0.01em",
              margin: 0,
              color: "#f0ede8",
            }}
          >
            <span className="name-line" data-text="ABHIJEET" style={{ display: "block" }}>ABHIJEET</span>
            <span
              className="name-line"
              data-text="KADU"
              style={{
                display: "block",
                color: "transparent",
                WebkitTextStroke: `2px ${ACCENT}`,
              }}
            >KADU</span>
          </h1>

          {/* ── Role cycling ── */}
          <div className="h-reveal" style={{
            marginTop: "clamp(20px,3vw,32px)",
            display: "flex", alignItems: "center", gap: 14,
            minHeight: 24,
          }}>
            <div style={{
              width: 32, height: 1,
              background: `linear-gradient(90deg,${ACCENT},transparent)`,
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "'Inter', monospace",
              fontSize: "clamp(0.7rem, 1.3vw, 0.92rem)",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}>
              {role}
              <span style={{
                display: "inline-block",
                width: 1.5, height: "1em",
                background: ACCENT,
                marginLeft: 3,
                verticalAlign: "middle",
                animation: "blink 1s step-end infinite",
              }} />
            </span>
          </div>

          {/* ── Tagline ── */}
          <p className="h-reveal" style={{
            marginTop: "clamp(16px,2vw,24px)",
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
            color: "rgba(255,255,255,0.28)",
            maxWidth: "50ch",
            lineHeight: 1.65,
            fontWeight: 300,
          }}>
            Final-year CE student. I build systems that ship.
          </p>

          {/* ── CTAs ── */}
          <div className="h-reveal" style={{
            marginTop: "clamp(32px,4vw,48px)",
            display: "flex", alignItems: "center",
            gap: 16, flexWrap: "wrap",
          }}>
            <a
              href="#projects"
              style={{
                display: "inline-flex", alignItems: "center", gap: 9,
                padding: "13px 30px",
                background: ACCENT, color: "#080c14",
                borderRadius: 9999,
                fontFamily: "'Inter', monospace",
                fontSize: 10, letterSpacing: "0.24em",
                textTransform: "uppercase", fontWeight: 600,
                textDecoration: "none",
                transition: "opacity 0.18s, transform 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.82"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.transform = "translateY(0)"; }}
            >
              View Work
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <a
              href="#contact"
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "13px 30px",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.45)",
                borderRadius: 9999,
                fontFamily: "'Inter', monospace",
                fontSize: 10, letterSpacing: "0.24em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "border-color 0.18s, color 0.18s, transform 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >Get in Touch</a>
          </div>

          {/* ── Meta row ── */}
          <div className="h-reveal" style={{
            marginTop: "clamp(40px,5vw,64px)",
            display: "flex", gap: 40, flexWrap: "wrap",
          }}>
            {[
              ["Role",     "SDE & Product Manager"],
              ["Company",  "Ecovis RKCA"],
              ["Stack",    "AWS · GCP · Next.js · ML"],
              ["Status",   "Open to 2026 roles"],
            ].map(([k, v]) => (
              <div key={k}>
                <p style={{
                  fontFamily: "'Inter', monospace",
                  fontSize: 8, letterSpacing: "0.32em",
                  color: "rgba(255,255,255,0.18)",
                  textTransform: "uppercase", marginBottom: 5,
                }}>{k}</p>
                <p style={{
                  fontFamily: "'Inter', monospace",
                  fontSize: 11, color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.04em",
                }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div style={{
          position: "absolute",
          bottom: "clamp(24px,4vw,40px)",
          right: "clamp(20px,5vw,72px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 8, opacity: 0.25,
        }}>
          <span style={{
            fontFamily: "'Inter', monospace",
            fontSize: 8, letterSpacing: "0.32em",
            color: "white", textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}>Scroll</span>
          <div style={{
            width: 1, height: 44,
            background: "linear-gradient(to bottom,rgba(255,255,255,0.6),transparent)",
          }} />
        </div>

        {/* ── Horizontal accent line ── */}
        <div aria-hidden style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent 0%, ${ACCENT}40 30%, ${ACCENT}40 70%, transparent 100%)`,
        }} />
      </section>
    </>
  );
}
