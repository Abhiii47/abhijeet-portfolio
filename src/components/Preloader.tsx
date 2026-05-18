"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ACCENT = "#00d4ff";

export default function Preloader() {
  const [count, setCount]   = useState(0);
  const [done, setDone]     = useState(false);
  const [hidden, setHidden] = useState(false);
  const topRef    = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const lineRef   = useRef<HTMLDivElement>(null);
  const logoRef   = useRef<SVGPathElement>(null);
  const logoRef2  = useRef<SVGPathElement>(null);

  /* count 0 → 100 */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    let n = 0;
    const id = setInterval(() => {
      n += Math.floor(Math.random() * 4) + 1;
      if (n >= 100) {
        n = 100;
        clearInterval(id);
        setCount(100);
        setTimeout(() => setDone(true), 320);
      } else {
        setCount(n);
      }
    }, 26);
    return () => clearInterval(id);
  }, []);

  /* SVG logo draw-on animation */
  useEffect(() => {
    const paths = [logoRef.current, logoRef2.current];
    paths.forEach(p => {
      if (!p) return;
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(p, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", delay: 0.2 });
    });
  }, []);

  /* exit animation */
  useEffect(() => {
    if (!done) return;
    const tl = gsap.timeline({ onComplete: () => { document.body.style.overflow = ""; setHidden(true); } });
    tl.to(lineRef.current,   { scaleX: 1, duration: 0.4, ease: "expo.inOut" })
      .to(topRef.current,    { yPercent: -100, duration: 0.85, ease: "expo.inOut" }, "+=0.05")
      .to(bottomRef.current, { yPercent:  100, duration: 0.85, ease: "expo.inOut" }, "<")
      .to(wrapRef.current,   { opacity: 0, duration: 0.25 }, "-=0.15");
  }, [done]);

  if (hidden) return null;

  return (
    <div
      ref={wrapRef}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        pointerEvents: "all",
        fontFamily: "monospace",
      }}
    >
      {/* Top panel */}
      <div
        ref={topRef}
        style={{
          position: "absolute", inset: "0 0 50% 0",
          background: "#040810",
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          padding: "0 clamp(24px,6vw,64px) 24px",
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: "0.35em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>Abhijeet Kadu</span>
        <span style={{ fontSize: 9, letterSpacing: "0.35em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>SDE &amp; Product Manager</span>
      </div>

      {/* Bottom panel */}
      <div
        ref={bottomRef}
        style={{
          position: "absolute", inset: "50% 0 0 0",
          background: "#040810",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          padding: "24px clamp(24px,6vw,64px) 0",
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: "0.35em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>Mumbai, India</span>
        <span style={{ fontSize: 9, letterSpacing: "0.35em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>Portfolio {new Date().getFullYear()}</span>
      </div>

      {/* Center */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 24, pointerEvents: "none",
      }}>

        {/* AK SVG logo — draws on */}
        <svg
          width="72" height="72" viewBox="0 0 72 72" fill="none"
          aria-label="AK"
          style={{ marginBottom: 4 }}
        >
          <circle cx="36" cy="36" r="32" stroke={ACCENT} strokeWidth="0.8" strokeOpacity="0.18" />
          {/* A */}
          <path
            ref={logoRef}
            d="M12 54 L24 20 L36 54 M16 40 H32"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          />
          {/* K */}
          <path
            ref={logoRef2}
            d="M40 20 V54 M40 36 L60 20 M40 36 L60 54"
            stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>

        {/* Counter */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(5rem,16vw,12rem)",
            fontWeight: 900, lineHeight: 1,
            letterSpacing: "-0.04em",
            color: count === 100 ? ACCENT : "#e8e5df",
            transition: "color 0.4s ease",
            userSelect: "none",
            tabularNums: true,
          } as React.CSSProperties}
        >
          {String(count).padStart(3, "0")}
        </div>

        {/* Expanding line */}
        <div
          ref={lineRef}
          style={{
            width: "min(320px, 60vw)", height: 1,
            transformOrigin: "center",
            transform: `scaleX(${count / 100})`,
            background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
            transition: "transform 0.05s linear",
          }}
        />

        {/* Label */}
        <span style={{
          fontSize: 9, letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: count === 100 ? ACCENT : "rgba(255,255,255,0.25)",
          transition: "color 0.4s ease",
        }}>
          {count < 100 ? "Loading" : "Ready"}
        </span>
      </div>
    </div>
  );
}
