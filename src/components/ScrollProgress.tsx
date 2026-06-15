"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const SECTIONS = [
  { id: "hero",           label: "Intro" },
  { id: "about",          label: "About" },
  { id: "experience",     label: "Experience" },
  { id: "projects",       label: "Projects" },
  { id: "skills",         label: "Skills" },
  { id: "certifications", label: "Certs" },
  { id: "contact",        label: "Contact" },
];

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
        { threshold: 0.25, rootMargin: "-25% 0px -25% 0px" }
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
    gsap.to(lineRef.current, { height: `${pct}%`, duration: 0.35, ease: "power2.out" });
  }, [active]);

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .scroll-progress-nav { display: none !important; }
        }
      `}</style>
      <nav
        aria-label="Page sections"
        className="scroll-progress-nav"
        style={{
          position: "fixed",
          right: "clamp(24px,3vw,36px)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 9000,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          paddingRight: 12,
        }}
      >
        {/* Track line */}
        <div style={{
          position: "absolute",
          top: 8, bottom: 8, right: 0,
          width: 2,
          background: "var(--border-subtle)",
          borderRadius: 99,
          zIndex: 0,
        }}>
          {/* Fill line */}
          <div
            ref={lineRef}
            style={{
              width: "100%",
              height: "0%",
              background: "var(--accent-primary)",
              borderRadius: 99,
              transition: "height 0.35s ease-out",
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
                justifyContent: "flex-end",
                padding: "12px 0",
                textDecoration: "none",
                minWidth: 120,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Label — always visible if active, otherwise visible on hover */}
              <span style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 8,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: isActive ? "var(--accent-primary)" : "var(--text-secondary)",
                opacity: isActive || isHovered ? 1 : 0,
                transform: isActive || isHovered ? "translateX(-6px)" : "translateX(4px)",
                transition: "opacity 0.22s, transform 0.22s, color 0.22s",
                pointerEvents: "none",
                whiteSpace: "nowrap",
                userSelect: "none",
                fontWeight: isActive ? 700 : 400,
              }}>{label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
