"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#00d4ff";
const LINKS = [
  { label: "About",      href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const ref   = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("");
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        onToggle: (self) => { if (self.isActive) setActive(href); },
      });
    });
  }, []);

  return (
    <>
      <nav
        ref={ref}
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 100,
          height: 56,
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(20px, 5vw, 64px)",
          background: scrolled ? "rgba(8,12,20,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
          transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-label="AK">
            <path d="M3 25L9 8l6 17M5 17h8" stroke="#f0ede8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 8v17M20 17l8-9M20 17l8 9" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="nav-links">
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                fontFamily: "monospace",
                fontSize: 9,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: active === href ? ACCENT : "rgba(255,255,255,0.4)",
                transition: "color 0.2s ease",
                position: "relative",
              }}
              onMouseEnter={e => { if (active !== href) e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
              onMouseLeave={e => { if (active !== href) e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            >{label}</a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "monospace", fontSize: 9, letterSpacing: "0.22em",
              textTransform: "uppercase", textDecoration: "none",
              padding: "7px 18px", borderRadius: 9999,
              border: `1px solid rgba(0,212,255,0.25)`,
              color: ACCENT,
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = "#080c14"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = ACCENT; }}
          >Resume</a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          className="nav-burger"
          style={{
            display: "none", flexDirection: "column", gap: 5,
            background: "none", border: "none", cursor: "pointer", padding: 4,
          }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: "block", width: 22, height: 1.5,
              background: open && i === 1 ? "transparent" : "rgba(255,255,255,0.7)",
              borderRadius: 1,
              transition: "transform 0.25s ease, opacity 0.25s ease",
              transform: open ? (i===0?"translateY(6.5px) rotate(45deg)": i===2?"translateY(-6.5px) rotate(-45deg)":"none") : "none",
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "rgba(8,12,20,0.97)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 40,
        }}>
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "2.5rem", fontWeight: 700,
                color: "#e8e5df", textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
              onMouseLeave={e => (e.currentTarget.style.color = "#e8e5df")}
            >{label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
