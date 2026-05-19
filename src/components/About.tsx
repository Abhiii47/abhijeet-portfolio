"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";
import AnimatedHeading from "./AnimatedHeading";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#C4400A";
const INK    = "#0E0A04";

const STACK = ["Next.js","FastAPI","AWS","GCP","Python","TypeScript","PostgreSQL","Docker","RAG","XGBoost"];

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

function useTilt(strength = 8) {
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

function BentoCell({ children, style, delay = 0, className = "" }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
  className?: string;
}) {
  const tilt    = useTilt(5);
  const cellRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(cellRef.current, {
      scrollTrigger: { trigger: cellRef.current, start: "top 88%", once: true },
      y: 40, opacity: 0, scale: 0.97,
      duration: 0.65, delay, ease: "power3.out",
    });
  });

  // Single combined ref callback
  const setRef = (node: HTMLDivElement | null) => {
    (cellRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    (tilt.ref  as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  // Single combined onMouseLeave — no duplicate handlers
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    el.style.boxShadow   = "none";
    el.style.borderColor = "rgba(14,10,4,0.07)";
    tilt.onLeave();
  };

  return (
    <div
      ref={setRef}
      className={className}
      onMouseMove={tilt.onMove}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow   = "0 12px 40px rgba(196,64,10,0.07)";
        el.style.borderColor = "rgba(196,64,10,0.18)";
      }}
      onMouseLeave={handleLeave}
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(14,10,4,0.07)",
        borderRadius: 14,
        padding: "clamp(20px,2.8vw,32px)",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.25s, border-color 0.25s",
        willChange: "transform",
        transformStyle: "preserve-3d",
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
      { threshold: 0.15 }
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
      <span aria-hidden style={{
        position: "absolute", right: "-2%", top: "50%", transform: "translateY(-50%)",
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontSize: "clamp(10rem,24vw,26rem)",
        lineHeight: 1, color: "transparent",
        WebkitTextStroke: "1px rgba(14,10,4,0.04)",
        pointerEvents: "none", userSelect: "none",
      }}>01</span>

      <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative", zIndex: 1 }}>

        <AnimatedHeading
          text="Building systems"
          italic="that ship."
          section="01"
          color={INK}
          accentColor={ACCENT}
          fontFamily="'Cormorant Garamond',Georgia,serif"
        />

        <div className="about-2col" style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "clamp(48px,7vw,100px)",
          alignItems: "start",
          marginBottom: "clamp(56px,7vw,96px)",
        }}>
          <div>
            <div className="ab-divider" style={{
              height: 1,
              background: `linear-gradient(90deg,${ACCENT}55,transparent)`,
              margin: "0 0 32px", width: "70%",
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
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(14,10,4,0.55)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ab-body" style={{ display: "flex", flexDirection: "column", gap: 22, paddingTop: 6 }}>
            {[
              <>I&rsquo;ve been writing code that runs in production since my second year &mdash; a room-finder with live users, a resume engine scoring <strong style={{ color: INK }}>50,000+ CVs</strong>, an OCR finance system processing receipts in real time.</>,
              <>Right now I&rsquo;m at <strong style={{ color: INK }}>Ecovis RKCA</strong>: migrating legacy infra to AWS, building a RAG assistant on GCP, and acting as PM on a client-facing product &mdash; all at once.</>,
              <>I graduate in 2026. Looking for a backend, ML, or full-stack role where I can own something end-to-end from day one.</>,
            ].map((p, i) => (
              <p key={i} className="ab-para" style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.92rem,1.05vw,1.02rem)",
                color: "rgba(14,10,4,0.55)",
                lineHeight: 1.8, maxWidth: "52ch",
              }}>{p}</p>
            ))}

            <div className="ab-para" style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 8, flexWrap: "wrap" }}>
              <MagneticButton strength={0.28}>
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

        {/* BENTO GRID */}
        <div
          ref={bentoRef}
          className="bento-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}
        >
          <BentoCell delay={0} style={{ gridColumn: "span 2" }}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(14,10,4,0.30)", marginBottom:12 }}>Amazon ML School</p>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(3rem,6vw,5.5rem)", fontWeight:700, lineHeight:1, color:INK, marginBottom:6 }}>
              <Counter end={0.1} suffix="%" prefix="Top " triggered={fired} />
            </p>
            <p style={{ fontFamily:"var(--font-body)", fontSize:11, color:"rgba(14,10,4,0.38)", lineHeight:1.4 }}>of 100,000+ applicants nationally</p>
            <div aria-hidden style={{ position:"absolute", bottom:0, right:0, width:60, height:60, background:`radial-gradient(circle at bottom right,${ACCENT}18,transparent 70%)`, pointerEvents:"none" }} />
          </BentoCell>

          <BentoCell delay={0.06}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(14,10,4,0.30)", marginBottom:14 }}>Location</p>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill={ACCENT} fillOpacity="0.7"/>
              </svg>
              <span style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:22, fontWeight:700, color:INK }}>Mumbai</span>
            </div>
            <p style={{ fontFamily:"var(--font-body)", fontSize:11, color:"rgba(14,10,4,0.38)" }}>India · Open to remote &amp; relocation</p>
          </BentoCell>

          <BentoCell delay={0.10}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(14,10,4,0.30)", marginBottom:14 }}>Status</p>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <span style={{ width:9, height:9, background:"#4ade80", display:"inline-block", borderRadius:"50%", flexShrink:0 }} />
              <span style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:20, fontWeight:700, color:INK }}>Available</span>
            </div>
            <p style={{ fontFamily:"var(--font-body)", fontSize:11, color:"rgba(14,10,4,0.38)" }}>June 2026 · Full-time roles</p>
          </BentoCell>

          <BentoCell delay={0.04}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(14,10,4,0.30)", marginBottom:12 }}>Cloud Uptime</p>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(2.2rem,4vw,3.5rem)", fontWeight:700, lineHeight:1, color:INK, marginBottom:6 }}>
              <Counter end={99.9} suffix="%" prefix="" triggered={fired} />
            </p>
            <p style={{ fontFamily:"var(--font-body)", fontSize:11, color:"rgba(14,10,4,0.38)", lineHeight:1.4 }}>post-migration at Ecovis</p>
          </BentoCell>

          <BentoCell delay={0.14} style={{ gridColumn: "span 2" }}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(14,10,4,0.30)", marginBottom:16 }}>Tech Stack</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
              {STACK.map((t, i) => (
                <span key={t} style={{
                  fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.12em",
                  padding:"5px 11px", borderRadius:6,
                  background: i < 4 ? "rgba(196,64,10,0.08)" : "rgba(14,10,4,0.04)",
                  border: i < 4 ? "1px solid rgba(196,64,10,0.22)" : "1px solid rgba(14,10,4,0.08)",
                  color: i < 4 ? ACCENT : "rgba(14,10,4,0.45)",
                  transition:"background 0.18s,border-color 0.18s,transform 0.18s",
                  cursor:"default",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-2px)"; (e.currentTarget as HTMLElement).style.background="rgba(196,64,10,0.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform="translateY(0)"; (e.currentTarget as HTMLElement).style.background = i < 4 ? "rgba(196,64,10,0.08)" : "rgba(14,10,4,0.04)"; }}
                >{t}</span>
              ))}
            </div>
          </BentoCell>

          <BentoCell delay={0.18}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(14,10,4,0.30)", marginBottom:12 }}>Reporting Cut</p>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(2.2rem,4vw,3.5rem)", fontWeight:700, lineHeight:1, color:INK, marginBottom:6 }}>
              <Counter end={60} suffix="%" prefix="" triggered={fired} />
            </p>
            <p style={{ fontFamily:"var(--font-body)", fontSize:11, color:"rgba(14,10,4,0.38)", lineHeight:1.4 }}>via Next.js internal tooling</p>
          </BentoCell>

          <BentoCell delay={0.22}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(14,10,4,0.30)", marginBottom:12 }}>Shipped</p>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(2.2rem,4vw,3.5rem)", fontWeight:700, lineHeight:1, color:INK, marginBottom:6 }}>
              <Counter end={5} suffix="+" prefix="" triggered={fired} />
            </p>
            <p style={{ fontFamily:"var(--font-body)", fontSize:11, color:"rgba(14,10,4,0.38)", lineHeight:1.4 }}>products end-to-end in production</p>
          </BentoCell>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .about-2col{ grid-template-columns:1fr!important; }
          .bento-grid{ grid-template-columns:1fr 1fr!important; }
        }
        @media(max-width:480px){
          .bento-grid{ grid-template-columns:1fr!important; }
        }
      `}</style>
    </section>
  );
}
