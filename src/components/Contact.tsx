"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#C4400A";
const INK    = "#0E0A04";
const EMAIL  = "abhijeetkadu85@gmail.com";

const CYCLE_WORDS = [
  { text: "shy about it.",   strike: true  },
  { text: "talk about it.",  strike: false },
  { text: "build with me.",  strike: false },
];

const SOCIALS = [
  {
    label: "GitHub", handle: "@Abhiii47", href: "https://github.com/Abhiii47",
    icon: (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  },
  {
    label: "LinkedIn", handle: "abhijeet-kadu", href: "https://linkedin.com/in/abhijeet-kadu",
    icon: (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>),
  },
  {
    label: "Email", handle: EMAIL, href: `mailto:${EMAIL}`,
    icon: (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  },
];

function CyclingHeading() {
  const [idx, setIdx]           = useState(0);
  const [striking, setStriking] = useState(false);
  const [visible,  setVisible]  = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setStriking(true);
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setIdx(i => (i + 1) % CYCLE_WORDS.length);
          setStriking(false);
          setVisible(true);
        }, 280);
      }, 500);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const word = CYCLE_WORDS[idx];
  return (
    <div style={{ marginBottom: "clamp(24px,4vw,48px)" }}>
      <h2 style={{
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontSize: "clamp(3.2rem,9vw,9rem)",
        fontWeight: 700, lineHeight: 1.0,
        letterSpacing: "-0.02em", margin: 0,
      }}>
        <span style={{ display: "block", color: INK }}>Don&rsquo;t be</span>
        <span style={{
          display: "block",
          color: word.strike ? "rgba(14,10,4,0.35)" : ACCENT,
          position: "relative",
          transition: "opacity 0.25s,color 0.25s",
          opacity: visible ? 1 : 0,
        }}>
          {word.text}
          <span aria-hidden style={{
            position: "absolute", left: 0, top: "52%",
            height: "2px", background: ACCENT, borderRadius: 99,
            width: striking ? "100%" : "0%",
            transition: striking ? "width 0.45s cubic-bezier(0.16,1,0.3,1)" : "width 0s",
            pointerEvents: "none",
          }} />
        </span>
        <span style={{
          display: "block", color: "transparent",
          WebkitTextStroke: `1.5px ${INK}`,
          fontSize: "clamp(3rem,8vw,8rem)",
        }}>Let&rsquo;s talk.</span>
      </h2>
    </div>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Section label + divider
    gsap.from(".ct-label", {
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      y: 20, opacity: 0, duration: 0.6, ease: "power3.out",
    });
    // Heading block
    gsap.from(".ct-heading", {
      scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
      y: 60, opacity: 0, duration: 1.0, ease: "power3.out", delay: 0.1,
    });
    // Marquee email strip
    gsap.from(".ct-marquee", {
      scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
      y: 30, opacity: 0, duration: 0.7, ease: "power2.out", delay: 0.35,
    });
    // Social links stagger
    gsap.from(".ct-social", {
      scrollTrigger: { trigger: ".ct-social", start: "top 90%", once: true },
      x: -24, opacity: 0, duration: 0.55,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.1,
    });
    // Right column fade up
    gsap.from(".ct-right", {
      scrollTrigger: { trigger: ".ct-right", start: "top 90%", once: true },
      y: 28, opacity: 0, duration: 0.65, ease: "power2.out",
    });
    // AK monogram
    gsap.from(".ct-monogram", {
      scrollTrigger: { trigger: ref.current, start: "top 60%", once: true },
      opacity: 0, scale: 1.08, duration: 1.4, ease: "power2.out", delay: 0.5,
    });
  }, { scope: ref });

  return (
    <>
      <style>{`
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .marquee-track  { display:flex;white-space:nowrap;animation:marquee 18s linear infinite;width:max-content; }
        .marquee-wrap:hover .marquee-track { animation-play-state:paused; }
        .marquee-item   { display:inline-flex;align-items:center;gap:24px;padding-right:24px; }
        .marquee-link   { font-family:var(--font-mono);font-size:clamp(0.78rem,1.1vw,0.95rem);letter-spacing:0.04em;color:rgba(14,10,4,0.32);text-decoration:none;position:relative;transition:color 0.22s; }
        .marquee-link::after { content:'';position:absolute;bottom:-2px;left:0;right:0;height:1px;background:${ACCENT};transform:scaleX(0);transform-origin:left;transition:transform 0.32s cubic-bezier(0.16,1,0.3,1); }
        .marquee-link:hover { color:${INK}; }
        .marquee-link:hover::after { transform:scaleX(1); }
        .marquee-diamond { color:${ACCENT};opacity:0.5;font-size:0.5rem; }
        .social-item  { display:flex;align-items:center;gap:10px;text-decoration:none;padding:12px 0;border-bottom:1px solid rgba(14,10,4,0.07);transition:border-color 0.2s; }
        .social-item:hover { border-color:rgba(196,64,10,0.25); }
        .social-item:hover .social-label { color:${INK}; }
        .social-item:hover .social-arrow { transform:translate(2px,-2px);color:${ACCENT}; }
        .social-label  { font-family:var(--font-mono);font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(14,10,4,0.35);transition:color 0.2s;flex:1; }
        .social-handle { font-family:var(--font-body);font-size:12px;color:rgba(14,10,4,0.22); }
        .social-arrow  { color:rgba(14,10,4,0.18);transition:transform 0.2s,color 0.2s;font-size:14px; }
        @media(max-width:640px){ .contact-grid{ grid-template-columns:1fr!important; } }
      `}</style>

      <section id="contact" ref={ref} style={{
        background: "var(--bg-base)",
        color: INK,
        padding: "clamp(80px,10vw,128px) clamp(20px,5vw,72px) clamp(48px,6vw,72px)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Divider line */}
        <div className="ct-label" style={{
          height: 1,
          background: `linear-gradient(90deg,transparent,rgba(196,64,10,0.25),transparent)`,
          marginBottom: "clamp(56px,8vw,96px)",
        }} />

        <p className="ct-label" style={{
          fontFamily: "var(--font-mono)", fontSize: 10,
          letterSpacing: "0.38em", color: ACCENT,
          textTransform: "uppercase", marginBottom: 40,
        }}>07 / Contact</p>

        <div className="ct-heading">
          <CyclingHeading />
        </div>

        <div className="ct-marquee marquee-wrap" style={{ overflow: "hidden", marginBottom: "clamp(48px,7vw,88px)" }}>
          <div className="marquee-track">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="marquee-item">
                <a href={`mailto:${EMAIL}`} className="marquee-link">{EMAIL}</a>
                <span className="marquee-diamond" aria-hidden>&#9670;</span>
              </span>
            ))}
          </div>
        </div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,64px)", alignItems: "end" }}>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(14,10,4,0.20)", marginBottom: 16 }}>Find me</p>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-item ct-social">
                <span style={{ color: "rgba(14,10,4,0.22)" }}>{s.icon}</span>
                <span className="social-label">{s.label}</span>
                <span className="social-handle">{s.handle}</span>
                <span className="social-arrow">&#8599;</span>
              </a>
            ))}
          </div>

          <div className="ct-right" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 24 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 9999, background: "rgba(74,222,128,0.05)" }}>
              <span className="avail-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.28em", color: "rgba(34,197,94,0.85)", textTransform: "uppercase" }}>Open to opportunities</span>
            </div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", color: "rgba(14,10,4,0.28)", textTransform: "uppercase", textAlign: "right" }}>Mumbai, IN &nbsp;&middot;&nbsp; Available 2026</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(14,10,4,0.18)", textAlign: "right" }}>&copy; {new Date().getFullYear()} Abhijeet Kadu</p>
          </div>
        </div>

        {/* AK monogram watermark */}
        <div aria-hidden className="ct-monogram" style={{
          position: "absolute", bottom: 0, right: 0,
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: "clamp(6rem,18vw,20rem)", lineHeight: 0.85,
          color: "transparent", WebkitTextStroke: "1px rgba(14,10,4,0.04)",
          pointerEvents: "none", userSelect: "none", letterSpacing: "0.01em",
        }}>AK</div>
      </section>
    </>
  );
}
