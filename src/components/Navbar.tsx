"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "var(--accent)";
const INK    = "var(--ink)";

const LINKS = [
  { label: "About",      href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("");
  const [open,     setOpen]     = useState(false);
  const [theme,    setTheme]    = useState("light");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
    setTimeout(() => {
      setTheme(saved);
    }, 0);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

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
          position: "fixed",
          top: 10,
          left: 10,
          right: 10,
          width: "calc(100% - 20px)",
          zIndex: 100,
          height: 56,
          background: scrolled ? "var(--bg-navbar)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(120%)" : "none",
          borderBottom: scrolled ? "1px solid var(--ink-border)" : "1px solid transparent",
          borderRadius: scrolled ? "0 0 8px 8px" : "0",
          transition: "background 0.4s ease, border-color 0.4s ease, border-radius 0.4s ease",
        }}
      >
        <div style={{
          maxWidth: 1140,
          margin: "0 auto",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(20px, 5vw, 72px)",
        }}>
          {/* Logo */}
          <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-label="AK">
              <path d="M3 25L9 8l6 17M5 17h8" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                  color: active === href ? ACCENT : "rgba(14,10,4,0.38)",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => { if (active !== href) e.currentTarget.style.color = INK; }}
                onMouseLeave={e => { if (active !== href) e.currentTarget.style.color = "rgba(14,10,4,0.38)"; }}
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
                border: `1px solid rgba(196,64,10,0.30)`,
                color: ACCENT,
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = "var(--bg-base)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = ACCENT; }}
            >Resume</a>

            {/* Theme switcher */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 8,
                borderRadius: "50%",
                color: "var(--ink)",
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--accent-glow)"; e.currentTarget.style.transform = "scale(1.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              {theme === "dark" ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M18.36 18.36l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
              )}
            </button>
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
                background: open && i === 1 ? "transparent" : INK,
                borderRadius: 1,
                transition: "transform 0.25s ease, opacity 0.25s ease",
                transform: open ? (i===0?"translateY(6.5px) rotate(45deg)": i===2?"translateY(-6.5px) rotate(-45deg)":"none") : "none",
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: "fixed",
          inset: 10,
          borderRadius: 4,
          zIndex: 99,
          background: "var(--bg-base)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 32,
          border: "1.5px solid var(--ink-border)",
          boxShadow: "0 16px 48px rgba(14,10,4,0.1)",
        }}>
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem", fontWeight: 800,
                color: INK, textDecoration: "none",
                transition: "color 0.2s",
                letterSpacing: "-0.02em",
              }}
              onMouseEnter={e => e.currentTarget.style.color = ACCENT}
              onMouseLeave={e => e.currentTarget.style.color = INK}
            >{label}</a>
          ))}
          
          <button
            onClick={() => { toggleTheme(); setOpen(false); }}
            style={{
              marginTop: 16,
              background: "var(--bg-card)",
              border: "1.5px solid var(--ink-border)",
              borderRadius: 99,
              padding: "10px 24px",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--ink)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
          >
            {theme === "dark" ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M18.36 18.36l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
                Light Mode
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
                Dark Mode
              </>
            )}
          </button>
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
