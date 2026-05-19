"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#C4400A";
const INK    = "#0E0A04";
const EMAIL  = "abhijeetkadu85@gmail.com";

const SOCIALS = [
  {
    label: "GitHub",
    handle: "@Abhiii47",
    href: "https://github.com/Abhiii47",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "abhijeet-kadu",
    href: "https://linkedin.com/in/abhijeet-kadu",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: "Email",
    handle: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".ct-reveal", {
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
      y: 50, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out",
    });
  }, { scope: ref });

  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          white-space: nowrap;
          animation: marquee 18s linear infinite;
          width: max-content;
        }
        .marquee-wrap:hover .marquee-track {
          animation-play-state: paused;
        }
        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 24px;
          padding-right: 24px;
        }
        .marquee-link {
          font-family: 'Inter', monospace;
          font-size: clamp(0.78rem, 1.1vw, 0.95rem);
          letter-spacing: 0.04em;
          color: rgba(14,10,4,0.32);
          text-decoration: none;
          position: relative;
          transition: color 0.22s;
        }
        .marquee-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 1px;
          background: ${ACCENT};
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.32s cubic-bezier(0.16,1,0.3,1);
        }
        .marquee-link:hover { color: ${INK}; }
        .marquee-link:hover::after { transform: scaleX(1); }
        .marquee-diamond { color: ${ACCENT}; opacity: 0.5; font-size: 0.5rem; }

        .social-item {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          padding: 12px 0;
          border-bottom: 1px solid rgba(14,10,4,0.07);
          transition: border-color 0.2s;
        }
        .social-item:hover { border-color: rgba(196,64,10,0.25); }
        .social-item:hover .social-label { color: ${INK}; }
        .social-item:hover .social-arrow { transform: translate(2px,-2px); color: ${ACCENT}; }
        .social-label {
          font-family: 'Inter', monospace;
          font-size: 11px; letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(14,10,4,0.35);
          transition: color 0.2s; flex: 1;
        }
        .social-handle { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(14,10,4,0.22); }
        .social-arrow { color: rgba(14,10,4,0.18); transition: transform 0.2s, color 0.2s; font-size: 14px; }
      `}</style>

      <section
        id="contact"
        ref={ref}
        style={{
          background: "var(--bg-base)",
          color: INK,
          padding: "clamp(80px,10vw,128px) clamp(20px,5vw,72px) clamp(48px,6vw,72px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top divider */}
        <div style={{
          height: 1,
          background: `linear-gradient(90deg,transparent,rgba(196,64,10,0.25),transparent)`,
          marginBottom: "clamp(56px,8vw,96px)",
        }} />

        <p className="ct-reveal" style={{
          fontFamily: "'Inter',monospace", fontSize: 10,
          letterSpacing: "0.38em", color: ACCENT,
          textTransform: "uppercase", marginBottom: 40,
        }}>06 / Contact</p>

        {/* Giant heading */}
        <div className="ct-reveal" style={{ marginBottom: "clamp(24px,4vw,48px)" }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: "clamp(5rem,18vw,14rem)",
            fontWeight: 700, lineHeight: 0.88,
            letterSpacing: "-0.02em",
            margin: 0,
          }}>
            <span style={{ display: "block", color: INK }}>LET&rsquo;S</span>
            <span style={{
              display: "block",
              color: "transparent",
              WebkitTextStroke: `2px ${ACCENT}`,
            }}>TALK.</span>
          </h2>
        </div>

        {/* Marquee email */}
        <div className="ct-reveal marquee-wrap" style={{
          overflow: "hidden",
          marginBottom: "clamp(48px,7vw,88px)",
        }}>
          <div className="marquee-track">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="marquee-item">
                <a href={`mailto:${EMAIL}`} className="marquee-link">{EMAIL}</a>
                <span className="marquee-diamond" aria-hidden>&#9670;</span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px,5vw,64px)",
          alignItems: "end",
        }}>
          {/* Social links */}
          <div className="ct-reveal">
            <p style={{
              fontFamily: "'Inter',monospace", fontSize: 9,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "rgba(14,10,4,0.20)", marginBottom: 16,
            }}>Find me</p>
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank" rel="noopener noreferrer"
                className="social-item"
              >
                <span style={{ color: "rgba(14,10,4,0.22)" }}>{s.icon}</span>
                <span className="social-label">{s.label}</span>
                <span className="social-handle">{s.handle}</span>
                <span className="social-arrow">&#8599;</span>
              </a>
            ))}
          </div>

          {/* Right col */}
          <div className="ct-reveal" style={{
            display: "flex", flexDirection: "column",
            alignItems: "flex-end", gap: 24,
          }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 18px",
              border: "1px solid rgba(74,222,128,0.25)",
              borderRadius: 9999,
              background: "rgba(74,222,128,0.05)",
            }}>
              <span className="avail-dot" style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#4ade80", display: "inline-block",
              }} />
              <span style={{
                fontFamily: "'Inter',monospace",
                fontSize: 9, letterSpacing: "0.28em",
                color: "rgba(34,197,94,0.85)",
                textTransform: "uppercase",
              }}>Open to opportunities</span>
            </div>

            <p style={{
              fontFamily: "'Inter',monospace",
              fontSize: 10, letterSpacing: "0.22em",
              color: "rgba(14,10,4,0.28)",
              textTransform: "uppercase", textAlign: "right",
            }}>
              Mumbai, IN&nbsp;&nbsp;·&nbsp;&nbsp;Available 2026
            </p>

            <p style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: 10, color: "rgba(14,10,4,0.18)",
              textAlign: "right",
            }}>
              &copy; {new Date().getFullYear()} Abhijeet Kadu
            </p>
          </div>
        </div>

        {/* Ghost AK watermark */}
        <div aria-hidden style={{
          position: "absolute", bottom: 0, right: 0,
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: "clamp(6rem,18vw,20rem)",
          lineHeight: 0.85, color: "transparent",
          WebkitTextStroke: "1px rgba(14,10,4,0.04)",
          pointerEvents: "none", userSelect: "none",
          letterSpacing: "0.01em",
        }}>AK</div>

        <style>{`
          @media(max-width:640px){
            .contact-grid { grid-template-columns: 1fr !important; }
            .contact-right { align-items: flex-start !important; }
          }
        `}</style>
      </section>
    </>
  );
}
