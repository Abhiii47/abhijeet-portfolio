"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#C4400A";
const INK    = "#0E0A04";

const STATS = [
  { end: 0.1,  suffix: "%",  prefix: "Top ", label: "Amazon ML School",    note: "of 100,000+ applicants" },
  { end: 99.9, suffix: "%",  prefix: "",     label: "Cloud Uptime",         note: "post-migration at Ecovis" },
  { end: 60,   suffix: "%",  prefix: "",     label: "Reporting Time Cut",   note: "Next.js internal tooling" },
  { end: 5,    suffix: "+",  prefix: "",     label: "Products Shipped",     note: "end-to-end in production" },
];

function Counter({ end, suffix, prefix, triggered }: { end: number; suffix: string; prefix: string; triggered: boolean }) {
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    if (!triggered) return;
    const duration = 1600, startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((eased * end).toFixed(end < 1 ? 1 : 0)));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [triggered, end]);
  return <span>{prefix}{val < 1 && end < 1 ? val.toFixed(1) : Math.round(val)}{suffix}</span>;
}

export default function About() {
  const ref      = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFired(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useGSAP(() => {
    gsap.from(".ab-label", {
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
      y: 24, opacity: 0, duration: 0.7, ease: "power3.out",
    });
    gsap.from(".ab-word", {
      scrollTrigger: { trigger: ".ab-headline", start: "top 82%" },
      y: 48, opacity: 0, rotateX: 18,
      duration: 0.65, stagger: 0.07,
      ease: "power3.out", transformOrigin: "bottom center",
    });
    gsap.from(".ab-para", {
      scrollTrigger: { trigger: ".ab-body", start: "top 80%" },
      y: 28, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power2.out",
    });
    gsap.from(".ab-ident-row", {
      scrollTrigger: { trigger: ".ab-ident", start: "top 85%" },
      x: -18, opacity: 0, duration: 0.5, stagger: 0.07, ease: "power2.out",
    });
    gsap.from(".ab-stat", {
      scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
      y: 40, opacity: 0, rotateX: 25,
      duration: 0.6, stagger: 0.1,
      ease: "back.out(1.4)", transformOrigin: "bottom center",
    });
    gsap.from(".ab-divider", {
      scrollTrigger: { trigger: ".ab-divider", start: "top 90%" },
      scaleX: 0, duration: 0.8, ease: "power2.inOut", transformOrigin: "left center",
    });
  }, { scope: ref });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: "var(--bg-section)",
        color: INK,
        padding: "clamp(80px,10vw,128px) clamp(20px,5vw,72px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span aria-hidden style={{
        position: "absolute", right: "-2%", top: "50%", transform: "translateY(-50%)",
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontSize: "clamp(10rem,24vw,26rem)",
        lineHeight: 1, color: "transparent",
        WebkitTextStroke: "1px rgba(14,10,4,0.04)",
        pointerEvents: "none", userSelect: "none",
      }}>01</span>

      <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative", zIndex: 1 }}>

        <p className="ab-label" style={{
          fontFamily: "var(--font-mono)", fontSize: 10,
          letterSpacing: "0.38em", color: ACCENT,
          textTransform: "uppercase", marginBottom: 48,
        }}>01 / About</p>

        <div className="about-2col" style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "clamp(48px,7vw,100px)",
          alignItems: "start",
          marginBottom: "clamp(56px,7vw,96px)",
        }}>
          <div>
            <h2 className="ab-headline" style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: "clamp(2.8rem,5vw,5rem)",
              fontWeight: 700, lineHeight: 1.0,
              letterSpacing: "-0.01em",
              margin: 0, perspective: "600px",
            }}>
              {[
                { text: "Building", color: INK },
                { text: "systems",  color: INK },
                { text: "that",     color: INK },
                { text: "scale.",   color: ACCENT },
                { text: "Products", color: INK },
                { text: "that",     color: INK },
                { text: "ship.",    color: "transparent", stroke: `1.5px ${INK}` },
              ].map((w, i) => (
                <span key={i} className="ab-word" style={{
                  display: "inline-block", marginRight: "0.22em",
                  color: w.color,
                  WebkitTextStroke: w.stroke ?? "0px transparent",
                }}>{w.text}</span>
              ))}
            </h2>

            <div className="ab-divider" style={{
              height: 1,
              background: `linear-gradient(90deg,${ACCENT}55,transparent)`,
              margin: "32px 0", width: "70%",
            }} />

            <div className="ab-ident" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Currently",  "Ecovis RKCA — SDE & PM"],
                ["Graduating", "2026 · Computer Engineering"],
                ["Certified",  "DP-600 · Microsoft Fabric"],
                ["Selected",   "Amazon ML Summer School"],
              ].map(([k, v]) => (
                <div key={k} className="ab-ident-row" style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 8,
                    letterSpacing: "0.28em", color: ACCENT,
                    textTransform: "uppercase", flexShrink: 0, width: 72,
                  }}>{k}</span>
                  <span style={{
                    fontFamily: "var(--font-body)", fontSize: 12,
                    color: "rgba(14,10,4,0.55)",
                  }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ab-body" style={{ display: "flex", flexDirection: "column", gap: 22, paddingTop: 6 }}>
            {[
              <>I&rsquo;ve been writing code that runs in production since my second year. Not toy projects &mdash; a room-finder platform with live users, a resume analysis engine scoring <strong style={{ color: INK }}>50,000+ CVs</strong>, an OCR finance system processing receipts in real time.</>,
              <>Right now I&rsquo;m at <strong style={{ color: INK }}>Ecovis RKCA</strong>: migrating legacy infra to AWS, building a RAG assistant on GCP, and acting as PM on a client-facing product &mdash; all at the same time.</>,
              <>I graduate in 2026. I&rsquo;m looking for a backend, ML, or full-stack role where I can own something end-to-end from day one.</>,
            ].map((p, i) => (
              <p key={i} className="ab-para" style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.92rem,1.05vw,1.02rem)",
                color: "rgba(14,10,4,0.55)",
                lineHeight: 1.8, maxWidth: "52ch",
              }}>{p}</p>
            ))}

            <div className="ab-para" style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 8, flexWrap: "wrap" }}>
              <a
                href="/resume.pdf" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "11px 24px",
                  background: ACCENT, color: "#FFFCF6",
                  borderRadius: 9999,
                  fontFamily: "var(--font-mono)",
                  fontSize: 9, letterSpacing: "0.24em",
                  textTransform: "uppercase", fontWeight: 600,
                  textDecoration: "none",
                  transition: "opacity 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.82"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                  <path d="M5.5 1v7M2.5 5.5l3 3 3-3M1 9.5h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download CV
              </a>
              <a
                href="#contact"
                style={{
                  fontFamily: "var(--font-mono)", fontSize: 9,
                  letterSpacing: "0.24em", textTransform: "uppercase",
                  color: "rgba(14,10,4,0.35)", textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(14,10,4,0.35)")}
              >Get in touch &rarr;</a>
            </div>
          </div>
        </div>

        <div ref={statsRef} style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          borderTop: "1px solid rgba(14,10,4,0.08)",
          borderBottom: "1px solid rgba(14,10,4,0.08)",
        }}>
          {STATS.map((s, i) => (
            <div key={i} className="ab-stat" style={{
              padding: "clamp(24px,4vw,40px) clamp(16px,2.5vw,28px)",
              borderLeft: i === 0 ? "none" : "1px solid rgba(14,10,4,0.08)",
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "clamp(2.4rem,4.5vw,3.8rem)",
                fontWeight: 700, color: INK,
                lineHeight: 1, marginBottom: 8,
              }}>
                <Counter end={s.end} suffix={s.suffix} prefix={s.prefix} triggered={fired} />
              </p>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.26em", textTransform: "uppercase",
                color: ACCENT, marginBottom: 4,
              }}>{s.label}</p>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 11,
                color: "rgba(14,10,4,0.40)", lineHeight: 1.4,
              }}>{s.note}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:768px){ .about-2col{ grid-template-columns:1fr!important; } }
        .ab-stat{ perspective: 600px; }
      `}</style>
    </section>
  );
}
