"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#00d4ff";

const METRICS = [
  { value: "Top 0.1%", label: "Amazon ML School",  sub: "of 100,000+ applicants" },
  { value: "50k+",     label: "Resumes Analyzed",   sub: "SmartResume AI" },
  { value: "92%+",     label: "Model Accuracy",     sub: "XGBoost ATS classifier" },
  { value: "5+",       label: "Products Shipped",   sub: "end-to-end production" },
];

const SKILLS = [
  { label: "Next.js",  icon: "N",  color: "#000000", bg: "#ffffff" },
  { label: "AWS",      icon: "A",  color: "#ffffff", bg: "#FF9900" },
  { label: "Azure",    icon: "Az", color: "#ffffff", bg: "#0078D4" },
  { label: "PyTorch",  icon: "Pt", color: "#ffffff", bg: "#EE4C2C" },
  { label: "FastAPI",  icon: "F",  color: "#ffffff", bg: "#009688" },
  { label: "TypeScript",icon:"TS", color: "#ffffff", bg: "#3178C6" },
];

/* ── 3D Tilt Card ── */
function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;  /* -0.5 to 0.5 */
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 20}deg) rotateX(${-y * 16}deg) scale(1.03)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(0,212,255,0.12) 0%, transparent 65%)`;
    }
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)";
    if (glowRef.current) glowRef.current.style.background = "none";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        width: "clamp(280px, 30vw, 360px)",
        aspectRatio: "3/4",
        background: "#0A0F1E",
        borderRadius: "20px",
        border: "1px solid rgba(0,212,255,0.14)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.28), 0 1px 0 rgba(255,255,255,0.05) inset",
        transition: "transform 0.12s ease",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        willChange: "transform",
      }}
    >
      {/* Mouse-follow glow */}
      <div ref={glowRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, transition: "background 0.15s ease" }} />

      {/* Grain overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px", opacity: 0.025, mixBlendMode: "overlay" as const,
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, padding: "28px", height: "100%", display: "flex", flexDirection: "column" }}>

        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
          {/* AK monogram */}
          <div style={{
            width: 64, height: 64, borderRadius: "14px",
            background: `linear-gradient(135deg, #0d1526 0%, #1a2540 100%)`,
            border: `1.5px solid rgba(0,212,255,0.2)`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
              <path d="M5 27 L11 10 L17 27 M7 21 H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 10 V27 M20 19 L28 10 M20 19 L28 27" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "monospace", fontSize: "8px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>ID Verified</p>
            <p style={{ fontFamily: "monospace", color: ACCENT, fontSize: "14px", fontWeight: 700, marginTop: "4px" }}>#ABHI-01</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "5px", marginTop: "4px" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
              <span style={{ fontFamily: "monospace", fontSize: "8px", color: "#4ade80", letterSpacing: "0.2em" }}>ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Info rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontFamily: "monospace", fontSize: "10px" }}>
          {([
            ["Role",    "SDE & Product Manager"],
            ["Company", "Ecovis RKCA"],
            ["Stack",   "AWS · Azure · Next.js"],
            ["Origin",  "Mumbai, IN"],
            ["Status",  "Available"],
          ] as [string,string][]).map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "8px" }}>
              <span style={{ color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.18em" }}>{k}</span>
              <span style={{ color: k === "Status" ? "#4ade80" : "rgba(255,255,255,0.85)", fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Skill badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "18px" }}>
          {SKILLS.map(s => (
            <span key={s.label} style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              padding: "3px 8px", borderRadius: "99px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontFamily: "monospace", fontSize: "9px",
              color: "rgba(255,255,255,0.65)",
              letterSpacing: "0.1em",
            }}>
              <span style={{ width: 10, height: 10, borderRadius: "3px", background: s.bg, display: "inline-block", flexShrink: 0 }} />
              {s.label}
            </span>
          ))}
        </div>

        {/* Barcode */}
        <div style={{ marginTop: "auto", paddingTop: "18px" }}>
          <div style={{
            height: "24px", width: "100%",
            background: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
            borderRadius: "2px",
          }} />
          <p style={{ fontFamily: "monospace", fontSize: "7px", color: "rgba(255,255,255,0.18)", textAlign: "center", marginTop: "6px", letterSpacing: "0.35em", textTransform: "uppercase" }}>Authorized Personnel Only</p>
        </div>
      </div>

      {/* Cyan edge glow */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
        background: `linear-gradient(to top, rgba(0,212,255,0.04), transparent)`,
        pointerEvents: "none", zIndex: 1,
      }} />
    </div>
  );
}

/* ═══════════════════════
   ABOUT SECTION
═══════════════════════ */
export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    /* lines stagger in */
    gsap.from(".about-line", {
      scrollTrigger: { trigger: containerRef.current, start: "top 72%" },
      y: 36, opacity: 0, duration: 0.85,
      stagger: 0.11, ease: "power3.out",
    });
    /* tilt card slides from right */
    gsap.from(".tilt-card-wrap", {
      scrollTrigger: { trigger: containerRef.current, start: "top 62%" },
      x: 50, opacity: 0, duration: 1.1, ease: "power3.out", delay: 0.1,
    });
    /* metrics pop up */
    gsap.from(".metric-item", {
      scrollTrigger: { trigger: ".metrics-grid", start: "top 88%" },
      y: 28, opacity: 0, duration: 0.55,
      stagger: 0.07, ease: "back.out(1.4)",
    });
  }, { scope: containerRef });

  return (
    <section
      id="about"
      ref={containerRef}
      style={{
        background: "var(--bg-body, #F5F0E8)",
        color: "var(--color-ink, #0A0F1E)",
        position: "relative",
        overflow: "hidden",
      }}
      className="w-full min-h-screen px-6 py-28 md:px-14"
    >
      {/* Ghost section number */}
      <span
        aria-hidden
        style={{
          position: "absolute", right: "2%", top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(8rem, 18vw, 18rem)",
          fontWeight: 900, lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px rgba(10,15,30,0.06)",
          pointerEvents: "none", userSelect: "none",
        }}
      >02</span>

      {/* Subtle dot-grid texture */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(10,15,30,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)",
      }} />

      <div className="max-w-7xl mx-auto w-full">

        {/* Section label */}
        <p className="about-line font-mono text-[10px] tracking-[0.35em] uppercase mb-16" style={{ color: ACCENT }}>
          02 &nbsp;/&nbsp; About
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT — narrative text */}
          <div className="space-y-8">
            <h2
              className="about-line font-serif font-bold leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", color: "#0A0F1E", letterSpacing: "-0.02em" }}
            >
              Building systems that
              <span style={{ color: ACCENT }}> scale</span> &amp;
              <br />products that
              <span style={{ color: ACCENT }}> ship.</span>
            </h2>

            <p className="about-line leading-relaxed" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)", color: "rgba(10,15,30,0.65)", maxWidth: "52ch" }}>
              At <strong style={{ color: "#0A0F1E" }}>Ecovis RKCA</strong> I own cloud migration (AWS &amp; Azure),
              build internal tooling in Next.js that cut manual reporting by 60%, and drive product
              roadmaps from requirements to sprint delivery.
            </p>

            <p className="about-line leading-relaxed" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)", color: "rgba(10,15,30,0.65)", maxWidth: "52ch" }}>
              Previously selected for the{" "}
              <strong style={{ color: "#0A0F1E" }}>Amazon ML Summer School</strong> (top 0.1% of 100k+ applicants)
              and worked on <strong style={{ color: "#0A0F1E" }}>Microsoft Fabric</strong> data pipelines.
              I bridge the gap between engineering depth and product thinking.
            </p>

            <p className="about-line leading-relaxed" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)", color: "rgba(10,15,30,0.65)", maxWidth: "52ch" }}>
              Outside work: indie game dev, cyberpunk world-building, and automating
              real business workflows with AI agents.
            </p>

            {/* CV download */}
            <div className="about-line flex items-center gap-4 pt-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-mono text-[10px] tracking-[0.22em] uppercase transition-all duration-200"
                style={{ background: "#0A0F1E", color: "#F5F0E8" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = ACCENT; (e.currentTarget as HTMLElement).style.color = "#020408"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#0A0F1E"; (e.currentTarget as HTMLElement).style.color = "#F5F0E8"; }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M6 1 V8 M3 5.5 L6 8.5 L9 5.5 M1 10 H11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download CV
              </a>
              <a
                href="#contact"
                className="font-mono text-[10px] tracking-[0.22em] uppercase transition-colors duration-200"
                style={{ color: "rgba(10,15,30,0.4)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = ACCENT; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(10,15,30,0.4)"; }}
              >
                Get in touch &rarr;
              </a>
            </div>
          </div>

          {/* RIGHT — tilt card */}
          <div className="tilt-card-wrap hidden lg:flex flex-col items-center gap-10">
            <TiltCard />

            {/* Floating tagline below card */}
            <p
              className="font-serif italic text-center"
              style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)", color: "rgba(10,15,30,0.35)", maxWidth: "30ch" }}
            >
              &ldquo;Building products that ship,
              <br />not just ideas that sit.&rdquo;
            </p>
          </div>
        </div>

        {/* Metrics strip */}
        <div className="metrics-grid grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
          {METRICS.map(m => (
            <div
              key={m.label}
              className="metric-item group p-6 rounded-xl transition-all duration-300 cursor-default"
              style={{
                background: "rgba(10,15,30,0.04)",
                border: "1px solid rgba(10,15,30,0.07)",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(0,212,255,0.06)"; el.style.borderColor = "rgba(0,212,255,0.2)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(10,15,30,0.04)"; el.style.borderColor = "rgba(10,15,30,0.07)"; }}
            >
              <p
                className="font-serif font-black leading-none"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#0A0F1E" }}
              >{m.value}</p>
              <p className="font-mono text-[9px] tracking-[0.25em] uppercase mt-2" style={{ color: ACCENT }}>{m.label}</p>
              <p className="text-xs mt-1" style={{ color: "rgba(10,15,30,0.4)" }}>{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
