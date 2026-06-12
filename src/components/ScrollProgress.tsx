"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const SECTIONS = [
  { id: "hero",        label: "Intro" },
  { id: "about",       label: "About" },
  { id: "experience",  label: "Experience" },
  { id: "work",        label: "Projects" },
  { id: "skills",      label: "Skills" },
  { id: "certs",       label: "Certs" },
  { id: "contact",     label: "Contact" },
];

const ACCENT = "#C4400A";
const INK    = "rgba(14,10,4,0.22)";

export default function ScrollProgress() {
  const [active, setActive]   = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  /* Track active section via IntersectionObserver */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  /* Animate progress line height */
  useEffect(() => {
    if (!lineRef.current) return;
    const pct = (active / (SECTIONS.length - 1)) * 100;
    gsap.to(lineRef.current, { height: `${pct}%`, duration: 0.5, ease: "power2.out" });
  }, [active]);

  return (
    <nav
      aria-label="Page sections"
      style={{
        position: "fixed",
        right: "clamp(14px,2.5vw,28px)",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 9000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
      }}
    >
      {/* Track line */}
      <div style={{
        position: "absolute",
        top: 6, bottom: 6, left: "50%",
        transform: "translateX(-50%)",
        width: 1,
        background: "rgba(14,10,4,0.08)",
        borderRadius: 99,
        zIndex: 0,
      }}>
        {/* Fill line */}
        <div
          ref={lineRef}
          style={{
            width: "100%",
            height: "0%",
            background: `linear-gradient(to bottom, ${ACCENT}, ${ACCENT}80)`,
            borderRadius: 99,
            transition: "height 0.5s",
          }}
        />
      </div>

      {SECTIONS.map(({ id, label }, i) => {
        const isActive  = active === i;
        const isHovered = hovered === i;

        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 0",
              textDecoration: "none",
              cursor: "none",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Label — appears left of dot on hover/active */}
            <span style={{
              fontFamily: "'Inter',monospace",
              fontSize: 8, letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: isActive ? ACCENT : "rgba(14,10,4,0.35)",
              opacity: isActive || isHovered ? 1 : 0,
              transform: isActive || isHovered ? "translateX(0)" : "translateX(6px)",
              transition: "opacity 0.22s, transform 0.22s, color 0.22s",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}>{label}</span>

            {/* Dot */}
            <div style={{
              width:  isActive ? 8 : 5,
              height: isActive ? 8 : 5,
              borderRadius: "50%",
              background: isActive ? ACCENT : INK,
              flexShrink: 0,
              transition: "width 0.25s, height 0.25s, background 0.25s",
              boxShadow: isActive ? `0 0 0 3px ${ACCENT}22` : "none",
            }} />
          </a>
        );
      })}
    </nav>
  );
}
