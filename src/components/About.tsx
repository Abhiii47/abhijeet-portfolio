"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";
import AnimatedHeading from "./AnimatedHeading";
import HorizontalParallax from "./HorizontalParallax";
import { RMHr, RMSticker, RMZigzag } from "./RMDecorations";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#C4400A";
const INK    = "#0E0A04";

const STACK = ["Next.js","FastAPI","AWS","GCP","Python","TypeScript","PostgreSQL","Docker","RAG","XGBoost","PyTorch","MS Fabric"];

function Counter({ end, suffix, prefix, triggered }: { end: number; suffix: string; prefix: string; triggered: boolean }) {
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    if (!triggered) return;
    const duration = 1600, t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const v = (1 - Math.pow(1 - p, 3)) * end;
      setVal(parseFloat(v.toFixed(end < 1 ? 1 : 0)));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [triggered, end]);
  return <span>{prefix}{end < 1 ? val.toFixed(1) : Math.round(val)}{suffix}</span>;
}

function useTilt(strength = 5) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) *  strength;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -strength;
    gsap.to(el, { rotateX: y, rotateY: x, duration: 0.25, ease: "power2.out", transformPerspective: 800 });
  };
  const onLeave = () => gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.55, ease: "elastic.out(1,0.5)" });
  return { ref, onMove, onLeave };
}

function BentoCell({ children, style, delay = 0, span = 1 }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
  span?: number;
}) {
  const tilt    = useTilt(4);
  const cellRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(cellRef.current, {
      scrollTrigger: { trigger: cellRef.current, start: "top 90%", once: true },
      y: 36, opacity: 0, scale: 0.97,
      duration: 0.6, delay, ease: "power3.out",
    });
  });

  const setRef = (node: HTMLDivElement | null) => {
    (cellRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    (tilt.ref  as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  return (
    <div
      ref={setRef}
      onMouseMove={tilt.onMove}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow   = "0 12px 40px rgba(196,64,10,0.07)";
        el.style.borderColor = "rgba(196,64,10,0.18)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow   = "none";
        el.style.borderColor = "rgba(14,10,4,0.07)";
        tilt.onLeave();
      }}
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(14,10,4,0.07)",
        borderRadius: 14,
        padding: "clamp(18px,2.4vw,28px)",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.25s,border-color 0.25s",
        willChange: "transform",
        transformStyle: "preserve-3d",
        gridColumn: span > 1 ? `span ${span}` : undefined,
        minHeight: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function About() {
  const ref      = useRef<HTMLElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const el = bentoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFired(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useGSAP(() => {
    gsap.from(".ab-label", {
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
      y: 24, opacity: 0, duration: 0.7, ease: "power3.out",
    });
    gsap.from(".ab-para", {
      scrollTrigger: { trigger: ".ab-body", start: "top 80%" },
      y: 28, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power2.out",
    });
    gsap.from(".ab-ident-row", {
      scrollTrigger: { trigger: ".ab-ident", start: "top 85%" },
      x: -18, opacity: 0, duration: 0.5, stagger: 0.07, ease: "power2.out",
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
        position: "relative", overflow: "hidden",
      }}
    >
      <HorizontalParallax text="ABOUT" speed={0.32} color="rgba(14,10,4,0.035)" fontSize="clamp(10rem,24vw,26rem)" />

      <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative", zIndex: 1 }}>

        <AnimatedHeading
          text="Building systems"
          italic="that ship."
          section="01"
          color={INK}
          accentColor={ACCENT}
          fontFamily="'Cormorant Garamond',Georgia,serif"
        />

        {/* 2-col bio */}
        <div className="about-2col" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: "clamp(40px,6vw,80px)",
          alignItems: "start",
          marginBottom: "clamp(48px,7vw,80px)",
        }}>
          <div>
            <div className="ab-divider" style={{
              height: 1,
              background: `linear-gradient(90deg,${ACCENT}55,transparent)`,
              margin: "0 0 28px", width: "70%",
            }} />
            <div className="ab-ident" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                ["Currently",  "Ecovis RKCA — SDE & PM"],
                ["Graduating", "2026 · Computer Engineering"],
                ["Certified",  "DP-600 · Microsoft Fabric"],
                ["Selected",   "Amazon ML Summer School"],
                ["Location",   "Mumbai, IN · Open to remote"],
                ["Seeking",    "SDE / ML / Full-stack roles"],
              ].map(([k, v]) => (
                <div key={k} className="ab-ident-row" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 8,
                    letterSpacing: "0.28em", color: ACCENT,
                    textTransform: "uppercase", flexShrink: 0, width: 76,
                    paddingTop: 2,
                  }}>{k}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(14,10,4,0.60)", lineHeight: 1.5 }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <RMSticker text="Available June 2026" accent rotate={-1.5} />
            </div>
          </div>

          <div className="ab-body" style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 4 }}>
            {[
              <>I&rsquo;ve been writing code that runs in production since my second year &mdash; a room-finder with live users, a resume engine scoring <strong style={{ color: INK, fontWeight: 600 }}>50,000+ CVs</strong>, an OCR finance system processing receipts in real time.</>,
              <>Right now I&rsquo;m at <strong style={{ color: INK, fontWeight: 600 }}>Ecovis RKCA</strong>: migrating legacy infra to AWS, building a RAG assistant on GCP Vertex AI, and acting as PM on a client-facing product &mdash; all at once.</>,
              <>I graduate in 2026. Looking for a backend, ML, or full-stack role where I can own something end-to-end from day one. I don&rsquo;t wait to be assigned work &mdash; I find what&rsquo;s broken and fix it.</>,
            ].map((p, i) => (
              <p key={i} className="ab-para" style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.9rem,1.05vw,1.02rem)",
                color: "rgba(14,10,4,0.58)",
                lineHeight: 1.82, maxWidth: "54ch",
              }}>{p}</p>
            ))}

            <div className="ab-para" style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 6, flexWrap: "wrap" }}>
              <MagneticButton strength={0.28}>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    padding: "11px 24px",
                    background: ACCENT, color: "#FFFCF6",
                    borderRadius: 9999,
                    fontFamily: "var(--font-mono)",
                    fontSize: 9, letterSpacing: "0.24em",
                    textTransform: "uppercase", fontWeight: 600,
                    textDecoration: "none", transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                    <path d="M5.5 1v7M2.5 5.5l3 3 3-3M1 9.5h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download CV
                </a>
              </MagneticButton>
              <a href="#contact"
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

        <RMHr label="by the numbers" />

        {/* BENTO STATS GRID */}
        <div
          ref={bentoRef}
          className="bento-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "clamp(10px,1.5vw,14px)",
          }}
        >
          {/* Top 0.1% — wide */}
          <BentoCell delay={0} span={2}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(14,10,4,0.30)", marginBottom:10 }}>Amazon ML School &middot; 2024</p>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(2.8rem,5.5vw,5rem)", fontWeight:700, lineHeight:1, color:INK, marginBottom:6 }}>
              <Counter end={0.1} suffix="%" prefix="Top " triggered={fired} />
            </p>
            <p style={{ fontFamily:"var(--font-body)", fontSize:12, color:"rgba(14,10,4,0.38)", lineHeight:1.5 }}>of 100,000+ applicants nationally &mdash; selected for Amazon&rsquo;s ML Summer School program</p>
            <div aria-hidden style={{ position:"absolute", bottom:0, right:0, width:80, height:80, background:`radial-gradient(circle at bottom right,${ACCENT}14,transparent 70%)`, pointerEvents:"none" }} />
          </BentoCell>

          {/* Status */}
          <BentoCell delay={0.06}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(14,10,4,0.30)", marginBottom:12 }}>Status</p>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              <span className="avail-dot" style={{ width:9, height:9, background:"#4ade80", display:"inline-block", borderRadius:"50%", flexShrink:0 }} />
              <span style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:22, fontWeight:700, color:INK }}>Available</span>
            </div>
            <p style={{ fontFamily:"var(--font-body)", fontSize:12, color:"rgba(14,10,4,0.42)", lineHeight:1.5 }}>June 2026 · Full-time roles · Open to remote &amp; relocation</p>
          </BentoCell>

          {/* Cloud uptime */}
          <BentoCell delay={0.08}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(14,10,4,0.30)", marginBottom:10 }}>Cloud Uptime</p>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:700, lineHeight:1, color:INK, marginBottom:6 }}>
              <Counter end={99.9} suffix="%" prefix="" triggered={fired} />
            </p>
            <p style={{ fontFamily:"var(--font-body)", fontSize:12, color:"rgba(14,10,4,0.38)", lineHeight:1.5 }}>post-migration at Ecovis RKCA (AWS)</p>
          </BentoCell>

          {/* Resumes */}
          <BentoCell delay={0.12}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(14,10,4,0.30)", marginBottom:10 }}>Resumes Scored</p>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:700, lineHeight:1, color:INK, marginBottom:6 }}>
              <Counter end={50} suffix="K+" prefix="" triggered={fired} />
            </p>
            <p style={{ fontFamily:"var(--font-body)", fontSize:12, color:"rgba(14,10,4,0.38)", lineHeight:1.5 }}>via SmartResume ATS engine</p>
          </BentoCell>

          {/* Reporting cut */}
          <BentoCell delay={0.14}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(14,10,4,0.30)", marginBottom:10 }}>Reporting Cut</p>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:700, lineHeight:1, color:INK, marginBottom:6 }}>
              <Counter end={60} suffix="%" prefix="" triggered={fired} />
            </p>
            <p style={{ fontFamily:"var(--font-body)", fontSize:12, color:"rgba(14,10,4,0.38)", lineHeight:1.5 }}>via Next.js internal tooling at Ecovis</p>
          </BentoCell>

          {/* Shipped */}
          <BentoCell delay={0.16}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(14,10,4,0.30)", marginBottom:10 }}>Shipped</p>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:700, lineHeight:1, color:INK, marginBottom:6 }}>
              <Counter end={7} suffix="+" prefix="" triggered={fired} />
            </p>
            <p style={{ fontFamily:"var(--font-body)", fontSize:12, color:"rgba(14,10,4,0.38)", lineHeight:1.5 }}>products end-to-end in production</p>
          </BentoCell>

          {/* Tech Stack — full width */}
          <BentoCell delay={0.18} span={3}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(14,10,4,0.30)", marginBottom:14 }}>Tech Stack Snapshot</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
              {STACK.map((t, i) => (
                <span key={t}
                  className={i < 5 ? "tag-hot" : "tag-normal"}
                  style={{ cursor: "default" }}
                >{t}</span>
              ))}
            </div>
          </BentoCell>
        </div>
      </div>

      <div style={{ marginTop: "clamp(40px,6vw,72px)" }}>
        <RMZigzag color="rgba(196,64,10,0.07)" />
      </div>

      <style>{`
        @media(max-width:900px){
          .about-2col{ grid-template-columns:1fr!important; }
          .bento-grid{ grid-template-columns:1fr 1fr!important; }
          .bento-grid > div[style*="span 2"],
          .bento-grid > div[style*="span 3"] { grid-column: span 2!important; }
        }
        @media(max-width:540px){
          .bento-grid{ grid-template-columns:1fr!important; }
          .bento-grid > div[style*="span 2"],
          .bento-grid > div[style*="span 3"] { grid-column: span 1!important; }
        }
      `}</style>
    </section>
  );
}
