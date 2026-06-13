"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ACCENT = "#C4400A";
const INK    = "#0E0A04";
const CREAM  = "#F5F2EB";

export default function Preloader() {
  const [count,  setCount]  = useState(0);
  const [done,   setDone]   = useState(false);
  const [hidden, setHidden] = useState(false);

  const wrapRef   = useRef<HTMLDivElement>(null);
  const logoRef   = useRef<SVGPathElement>(null);
  const logoRef2  = useRef<SVGPathElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* count 0 → 100 */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    let n = 0;
    const id = setInterval(() => {
      n += Math.floor(Math.random() * 4) + 1;
      if (n >= 100) {
        n = 100; clearInterval(id);
        setCount(100);
        setTimeout(() => setDone(true), 400);
      } else { setCount(n); }
    }, 26);
    return () => clearInterval(id);
  }, []);

  /* SVG logo draw-on */
  useEffect(() => {
    [logoRef.current, logoRef2.current].forEach(p => {
      if (!p) return;
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(p,  { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", delay: 0.2 });
    });
  }, []);

  /* Exit — iris aperture wipe */
  useEffect(() => {
    if (!done) return;
    const tl = gsap.timeline({
      onComplete: () => { document.body.style.overflow = ""; setHidden(true); },
    });

    // Step 1: fade counter out
    tl.to(".pl-counter", { opacity: 0, y: -20, duration: 0.35, ease: "power2.in" }, 0)
      .to(".pl-logo",    { opacity: 0, scale: 0.85, duration: 0.3, ease: "power2.in" }, 0)
      .to(".pl-label",   { opacity: 0, duration: 0.2 }, 0);

    // Step 2: 4 iris panels fly outward
    tl.to(".iris-top",    { yPercent: -100, duration: 0.75, ease: "expo.inOut" }, 0.25)
      .to(".iris-bottom", { yPercent:  100, duration: 0.75, ease: "expo.inOut" }, 0.25)
      .to(".iris-left",   { xPercent: -100, duration: 0.75, ease: "expo.inOut" }, 0.28)
      .to(".iris-right",  { xPercent:  100, duration: 0.75, ease: "expo.inOut" }, 0.28)

    // Step 3: fade wrapper
      .to(wrapRef.current, { opacity: 0, duration: 0.2 }, 0.85);
  }, [done]);

  if (hidden) return null;

  return (
    <div
      ref={wrapRef}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        pointerEvents: "all",
      }}
    >
      {/* ── 4 IRIS PANELS ── */}
      {/* Top */}
      <div className="iris-top" style={{
        position: "absolute", inset: "0 0 50% 0",
        background: CREAM,
        borderBottom: "1px solid rgba(14,10,4,0.06)",
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        padding: "0 clamp(24px,6vw,64px) 24px",
        zIndex: 1,
      }}>
        <span style={{ fontSize: 9, letterSpacing: "0.35em", color: "rgba(14,10,4,0.28)", textTransform: "uppercase" }}>Abhijeet Kadu</span>
        <span style={{ fontSize: 9, letterSpacing: "0.35em", color: "rgba(14,10,4,0.28)", textTransform: "uppercase" }}>SDE &amp; PM</span>
      </div>

      {/* Bottom */}
      <div className="iris-bottom" style={{
        position: "absolute", inset: "50% 0 0 0",
        background: CREAM,
        borderTop: "1px solid rgba(14,10,4,0.06)",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        padding: "24px clamp(24px,6vw,64px) 0",
        zIndex: 1,
      }}>
        <span style={{ fontSize: 9, letterSpacing: "0.35em", color: "rgba(14,10,4,0.28)", textTransform: "uppercase" }}>Mumbai, India</span>
        <span style={{ fontSize: 9, letterSpacing: "0.35em", color: "rgba(14,10,4,0.28)", textTransform: "uppercase" }}>Portfolio {new Date().getFullYear()}</span>
      </div>

      {/* Left */}
      <div className="iris-left" style={{
        position: "absolute", inset: "25% 75% 25% 0",
        background: CREAM,
        zIndex: 2,
      }} />

      {/* Right */}
      <div className="iris-right" style={{
        position: "absolute", inset: "25% 0 25% 75%",
        background: CREAM,
        zIndex: 2,
      }} />

      {/* ── CENTER CONTENT ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 24, pointerEvents: "none",
      }}>
        <svg className="pl-logo" width="72" height="72" viewBox="0 0 72 72" fill="none" aria-label="AK">
          <circle cx="36" cy="36" r="32" stroke={ACCENT} strokeWidth="0.8" strokeOpacity="0.20" />
          <path ref={logoRef}  d="M12 54 L24 20 L36 54 M16 40 H32" stroke={INK}   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path ref={logoRef2} d="M40 20 V54 M40 36 L60 20 M40 36 L60 54" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div
          className="pl-counter"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(5rem,16vw,12rem)",
            fontWeight: 900, lineHeight: 1,
            letterSpacing: "-0.04em",
            color: count === 100 ? ACCENT : INK,
            transition: "color 0.4s ease",
            userSelect: "none",
          } as React.CSSProperties}
        >
          {String(count).padStart(3, "0")}
        </div>

        {/* Progress bar */}
        <div style={{
          width: "min(320px,60vw)", height: 1,
          background: "rgba(14,10,4,0.08)", borderRadius: 99, overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${count}%`,
            background: `linear-gradient(90deg,transparent,${ACCENT})`,
            transition: "width 0.06s linear",
          }} />
        </div>

        <span className="pl-label" style={{
          fontFamily: "'Inter',monospace",
          fontSize: 9, letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: count === 100 ? ACCENT : "rgba(14,10,4,0.32)",
          transition: "color 0.4s ease",
        }}>
          {count < 100 ? "Loading" : "Ready"}
        </span>
      </div>
    </div>
  );
}
