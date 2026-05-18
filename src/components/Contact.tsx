"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#00d4ff";
const EMAIL  = "abhijeetkadu47@gmail.com";

const SOCIALS = [
  {
    label: "GitHub",
    handle: "@Abhiii47",
    href: "https://github.com/Abhiii47",
    color: "#ffffff",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "abhijeet-kadu",
    href: "https://linkedin.com/in/abhijeet-kadu",
    color: "#0A66C2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    handle: EMAIL,
    href: `mailto:${EMAIL}`,
    color: ACCENT,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
];

/* ── Magnetic button ── */
function MagneticCTA() {
  const btnRef  = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) * 0.35;
    const dy = (e.clientY - (r.top  + r.height / 2)) * 0.35;
    gsap.to(el,     { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
    gsap.to(textRef.current, { x: dx * 0.5, y: dy * 0.5, duration: 0.4, ease: "power2.out" });
  }, []);

  const onLeave = useCallback(() => {
    gsap.to(btnRef.current,  { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
    gsap.to(textRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
    setHovered(false);
  }, []);

  return (
    <a
      ref={btnRef}
      href={`mailto:${EMAIL}`}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        gap: 10, padding: "20px 48px",
        borderRadius: 99,
        background: hovered ? ACCENT : "transparent",
        border: `1.5px solid ${hovered ? ACCENT : "rgba(255,255,255,0.15)"}`,
        color: hovered ? "#020408" : "white",
        fontFamily: "monospace",
        fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
        fontWeight: 700,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        textDecoration: "none",
        cursor: "pointer",
        transition: "background 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease",
        boxShadow: hovered ? `0 0 40px ${ACCENT}40` : "none",
        willChange: "transform",
        position: "relative",
        zIndex: 1,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
      </svg>
      <span ref={textRef} style={{ display: "inline-block" }}>Send a message</span>
      {/* rotating arrow */}
      <svg
        width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden
        style={{ transition: "transform 0.3s ease", transform: hovered ? "rotate(45deg)" : "rotate(0deg)" }}
      >
        <path d="M2 10 L10 2 M4 2 H10 V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

/* ── Social card ── */
function SocialCard({ s }: { s: typeof SOCIALS[number] }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "16px 20px",
        borderRadius: 14,
        background: hov ? `${s.color}08` : "rgba(255,255,255,0.025)",
        border: `1px solid ${hov ? s.color + "40" : "rgba(255,255,255,0.06)"}`,
        textDecoration: "none",
        transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hov ? `0 8px 24px rgba(0,0,0,0.2)` : "none",
        minWidth: 200, flex: "1 1 200px",
      }}
    >
      <span style={{ color: hov ? s.color : "rgba(255,255,255,0.35)", transition: "color 0.2s ease" }}>{s.icon}</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, overflow: "hidden" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.95rem", fontWeight: 700, color: "white", lineHeight: 1.2 }}>{s.label}</span>
        <span style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.handle}</span>
      </div>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden style={{ marginLeft: "auto", opacity: hov ? 1 : 0, transition: "opacity 0.2s ease", color: s.color }}>
        <path d="M2 8 L8 2 M4 2 H8 V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

/* ════════════════════════════
   MAIN SECTION
════════════════════════════ */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const year = new Date().getFullYear();

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  useGSAP(() => {
    gsap.from(".contact-line", {
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      y: 50, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
    });
    gsap.from(".social-card-wrap", {
      scrollTrigger: { trigger: ".social-card-wrap", start: "top 85%" },
      y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
    });
  }, { scope: sectionRef });

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ background: "#020408", color: "white", position: "relative", overflow: "hidden" }}
      className="w-full"
    >
      {/* ─── Top border fade ─── */}
      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${ACCENT}30, transparent)` }} />

      <div className="max-w-5xl mx-auto px-6 md:px-14 pt-28 pb-0">

        {/* section label */}
        <p className="contact-line font-mono text-[10px] tracking-[0.35em] uppercase mb-8" style={{ color: ACCENT }}>05 &nbsp;/&nbsp; Contact</p>

        {/* availability badge */}
        <div className="contact-line inline-flex items-center gap-2 mb-10" style={{ padding: "6px 14px", borderRadius: 99, background: "rgba(0,212,255,0.07)", border: `1px solid ${ACCENT}25` }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", animation: "badgePulse 2s ease-in-out infinite", display: "inline-block" }} />
          <span style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Available for opportunities</span>
        </div>

        {/* Giant heading */}
        <div className="mb-14" style={{ overflow: "hidden" }}>
          <h2 className="contact-line font-serif font-bold leading-[0.95]" style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", letterSpacing: "-0.03em", color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.12)" }}>Let&apos;s</h2>
          <h2 className="contact-line font-serif font-bold leading-[0.95]" style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", letterSpacing: "-0.03em", color: "white" }}>Talk.</h2>
        </div>

        {/* CTA row */}
        <div className="contact-line flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-16">
          <MagneticCTA />

          {/* copy email */}
          <button
            onClick={handleCopy}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 20px", borderRadius: 99,
              background: "transparent",
              border: `1px solid ${copied ? "#22c55e" : "rgba(255,255,255,0.1)"}`,
              color: copied ? "#22c55e" : "rgba(255,255,255,0.4)",
              fontFamily: "monospace", fontSize: "9px",
              letterSpacing: "0.2em", textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            {copied
              ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M2 6 L5 9 L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><rect x="1" y="3" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" /><path d="M4 3V2a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H9" stroke="currentColor" strokeWidth="1.2" /></svg>
            }
            {copied ? "Copied!" : EMAIL}
          </button>
        </div>

        {/* divider */}
        <div className="contact-line mb-12" style={{ height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.06), transparent)" }} />

        {/* Social cards */}
        <div className="flex flex-wrap gap-3 mb-20">
          {SOCIALS.map(s => <div key={s.label} className="social-card-wrap"><SocialCard s={s} /></div>)}
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "28px clamp(24px, 5vw, 56px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 12,
      }}>
        {/* logo mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-label="AK" style={{ flexShrink: 0 }}>
            <path d="M4 24 L10 8 L16 24 M6 17.5 H14" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
            <path d="M19 8 V24 M19 17 L27 8 M19 17 L27 24" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>Abhijeet Kadu</span>
        </div>

        <span style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase" }}>
          Mumbai, IN &nbsp;&middot;&nbsp; {year}
        </span>

        <span style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.1)", textTransform: "uppercase" }}>
          Built with Next.js &amp; GSAP
        </span>
      </footer>

      {/* ghost section number */}
      <span aria-hidden style={{
        position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(8rem,18vw,18rem)", fontWeight: 900, lineHeight: 1,
        color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.025)",
        pointerEvents: "none", userSelect: "none",
      }}>05</span>

      <style>{`
        @keyframes badgePulse {
          0%,100% { opacity:1; box-shadow: 0 0 8px #22c55e; }
          50%      { opacity:0.6; box-shadow: 0 0 16px #22c55e; }
        }
      `}</style>
    </section>
  );
}
