"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollToPlugin);

const ACCENT = "#00d4ff";

const NAV_ITEMS = [
  { name: "About",      href: "#about" },
  { name: "Skills",     href: "#skills" },
  { name: "Work",       href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact",    href: "#contact" },
];

/* ── AK SVG logo ── */
function Logo() {
  return (
    <a href="/" aria-label="Abhijeet Kadu home">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <circle cx="18" cy="18" r="16" stroke={ACCENT} strokeWidth="1" strokeOpacity="0.4" />
        {/* A */}
        <path d="M7 27 L13 11 L19 27 M9 21 H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* K */}
        <path d="M22 11 V27 M22 19 L30 11 M22 19 L30 27" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

export default function Navbar() {
  const navRef      = useRef<HTMLElement>(null);
  const pillRef     = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const itemRefs    = useRef<(HTMLAnchorElement | null)[]>([]);
  const [active, setActive]   = useState("");
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastY = useRef(0);

  /* ── scroll spy + hide-on-scroll-down ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const doc = document.documentElement;
      setProgress(doc.scrollHeight > doc.clientHeight ? (y / (doc.scrollHeight - doc.clientHeight)) * 100 : 0);
      /* hide pill when scrolling down fast, show when going up */
      if (y > lastY.current + 8 && y > 120) setVisible(false);
      else if (y < lastY.current - 4) setVisible(true);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── intersection observer scroll-spy ── */
  useEffect(() => {
    const sections = NAV_ITEMS.map(i => document.querySelector(i.href));
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive("#" + e.target.id); }),
      { rootMargin: "-38% 0px -50% 0px" }
    );
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  /* ── slide indicator to active item ── */
  useEffect(() => {
    const idx = NAV_ITEMS.findIndex(i => i.href === active);
    const el = itemRefs.current[idx];
    const pill = pillRef.current;
    const ind = indicatorRef.current;
    if (!el || !pill || !ind) return;
    const pillRect = pill.getBoundingClientRect();
    const elRect   = el.getBoundingClientRect();
    gsap.to(ind, {
      x: elRect.left - pillRect.left - 4,
      width: elRect.width + 8,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [active]);

  /* ── entry animation ── */
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.3, ease: "power3.out", delay: 1.6 }
    );
  }, []);

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Progress bar ── */}
      <div
        className="fixed top-0 left-0 right-0 z-[9999] h-[2px] origin-left"
        style={{ background: ACCENT, transform: `scaleX(${progress / 100})`, opacity: 0.7 }}
      />

      {/* ── Outer wrapper: positions pill ── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[9000] flex items-start justify-center pt-5 px-4 pointer-events-none"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* ── Pill container ── */}
        <div
          ref={pillRef}
          className="relative flex items-center pointer-events-auto"
          style={{
            background: "rgba(2,4,8,0.72)",
            backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",
            border: "1px solid rgba(0,212,255,0.12)",
            borderRadius: "9999px",
            padding: "6px 8px",
            gap: "2px",
            boxShadow: "0 4px 32px rgba(0,212,255,0.06), 0 1px 0 rgba(255,255,255,0.04) inset",
          }}
        >
          {/* Logo */}
          <div className="pl-2 pr-3 flex items-center">
            <Logo />
          </div>

          {/* Sliding active indicator */}
          <span
            ref={indicatorRef}
            className="absolute top-[5px] h-[calc(100%-10px)] rounded-full pointer-events-none"
            style={{
              background: "rgba(0,212,255,0.10)",
              border: "1px solid rgba(0,212,255,0.22)",
              left: 0,
              width: 80,
              transition: "none",
            }}
          />

          {/* Desktop nav items */}
          <ul className="hidden md:flex items-center">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.href}>
                <a
                  ref={el => { itemRefs.current[i] = el; }}
                  href={item.href}
                  onClick={e => handleClick(e, item.href)}
                  className="relative z-10 flex items-center px-4 py-2 font-mono text-[10px] tracking-[0.22em] uppercase transition-colors duration-200 rounded-full"
                  style={{ color: active === item.href ? ACCENT : "rgba(255,255,255,0.45)" }}
                  onMouseEnter={e => { if (active !== item.href) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)"; }}
                  onMouseLeave={e => { if (active !== item.href) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Availability badge */}
          <a
            href="mailto:abhijeetkadu007@gmail.com"
            className="hidden md:flex items-center gap-1.5 ml-2 px-4 py-2 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-200"
            style={{
              border: `1px solid rgba(0,212,255,0.2)`,
              color: "rgba(0,212,255,0.6)",
            }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = ACCENT; el.style.color = ACCENT; el.style.background = "rgba(0,212,255,0.07)"; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(0,212,255,0.2)"; el.style.color = "rgba(0,212,255,0.6)"; el.style.background = "transparent"; }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
            Hire me
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 ml-1 rounded-full transition-colors duration-200"
            style={{ color: mobileOpen ? ACCENT : "rgba(255,255,255,0.6)" }}
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              {mobileOpen ? (
                <path d="M3 3 L15 15 M15 3 L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M2 5 H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M2 9 H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M2 13 H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <div
        className="fixed inset-0 z-[8900] flex flex-col md:hidden pointer-events-none"
        style={{
          background: "rgba(2,4,8,0.96)",
          backdropFilter: "blur(24px)",
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        {/* Close area */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2 pb-16">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={e => handleClick(e, item.href)}
              className="font-serif font-bold text-white/80 hover:text-white transition-colors duration-200"
              style={{
                fontSize: "clamp(1.8rem, 7vw, 2.8rem)",
                letterSpacing: "-0.02em",
                color: active === item.href ? ACCENT : undefined,
                transitionDelay: `${i * 40}ms`,
              }}
            >
              {item.name}
            </a>
          ))}
          <a
            href="mailto:abhijeetkadu007@gmail.com"
            className="mt-8 font-mono text-[11px] tracking-[0.28em] uppercase"
            style={{ color: ACCENT }}
          >
            abhijeetkadu007@gmail.com
          </a>
        </div>
      </div>
    </>
  );
}
