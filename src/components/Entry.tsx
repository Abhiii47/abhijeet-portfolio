"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import MagneticButton from "./MagneticButton";

/* ─────────────────────────────────────────────
   PHASE 1 — HERO
   Theme:  Deep space black  #020408
   Accent: Electric cyan     #00d4ff
   Type:   Outline name (giant) + solid surname
   3D:     Canvas particle sphere — pure math, no deps
───────────────────────────────────────────── */

const ACCENT = "#00d4ff";
const ROLES = [
  "SDE & Product Manager",
  "Cloud Systems @ Ecovis RKCA",
  "ML · Next.js · AWS · Azure",
  "Open to Opportunities",
];

/* ── Scramble hook ── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*";
function useScramble(target: string, autoPlay = false) {
  const [text, setText] = useState(target);
  const idRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const play = useCallback(() => {
    if (idRef.current) clearInterval(idRef.current);
    let pos = 0;
    idRef.current = setInterval(() => {
      setText(target.split("").map((ch, i) => ch === " " ? " " : i < pos ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]).join(""));
      pos += 0.45;
      if (pos > target.length) { setText(target); if (idRef.current) clearInterval(idRef.current); }
    }, 26);
  }, [target]);
  useEffect(() => { if (autoPlay) { const t = setTimeout(play, 700); return () => clearTimeout(t); } }, [autoPlay, play]);
  return { text, play };
}

/* ── 3D Particle Sphere (Canvas, pure math) ── */
function ParticleSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: 0, y: 0 });
  const frameRef  = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Build sphere points using Fibonacci lattice */
    const N = 420;
    const RADIUS = 1;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    type Point = { ox: number; oy: number; oz: number; x: number; y: number; z: number; size: number; isCyan: boolean };
    const pts: Point[] = Array.from({ length: N }, (_, i) => {
      const y  = 1 - (i / (N - 1)) * 2;
      const r  = Math.sqrt(1 - y * y);
      const th = goldenAngle * i;
      return { ox: Math.cos(th) * r * RADIUS, oy: y * RADIUS, oz: Math.sin(th) * r * RADIUS, x: 0, y: 0, z: 0, size: Math.random() * 1.4 + 0.5, isCyan: i % 9 === 0 };
    });

    let rotX = 0; let rotY = 0;
    let targetRotX = 0; let targetRotY = 0;
    let autoAngle = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const size = Math.min(window.innerWidth * 0.55, window.innerHeight * 0.72, 520);
      canvas.width  = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width  = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 };
    };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      const W = canvas.width  / (window.devicePixelRatio || 1);
      const H = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, W, H);

      /* slow auto-rotation + mouse parallax */
      autoAngle += 0.0035;
      targetRotY = autoAngle + mouseRef.current.x * 0.4;
      targetRotX = mouseRef.current.y * -0.35;
      rotX += (targetRotX - rotX) * 0.06;
      rotY += (targetRotY - rotY) * 0.06;

      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

      const sphereR = Math.min(W, H) * 0.38;
      const cx = W / 2, cy = H / 2;

      /* project + sort by z */
      pts.forEach(p => {
        /* rotate Y */
        const x1 = p.ox * cosY - p.oz * sinY;
        const z1 = p.ox * sinY + p.oz * cosY;
        /* rotate X */
        const y2 = p.oy * cosX - z1 * sinX;
        const z2 = p.oy * sinX + z1 * cosX;
        p.x = x1; p.y = y2; p.z = z2;
      });
      pts.sort((a, b) => a.z - b.z);

      /* draw lines between nearby points (back hemisphere only) */
      ctx.lineWidth = 0.3;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        if (a.z < -0.1) continue; /* skip back-face */
        for (let j = i + 1; j < Math.min(i + 7, pts.length); j++) {
          const b = pts[j];
          const dist = Math.hypot(a.ox - b.ox, a.oy - b.oy, a.oz - b.oz);
          if (dist > 0.28) continue;
          const alpha = (1 - dist / 0.28) * 0.12 * ((a.z + 1) / 2);
          ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(cx + a.x * sphereR, cy + a.y * sphereR);
          ctx.lineTo(cx + b.x * sphereR, cy + b.y * sphereR);
          ctx.stroke();
        }
      }

      /* draw dots */
      pts.forEach(p => {
        const depth = (p.z + 1) / 2; /* 0 = back, 1 = front */
        if (depth < 0.08) return;
        const sx = cx + p.x * sphereR;
        const sy = cy + p.y * sphereR;
        const r  = p.size * (0.4 + depth * 0.8);
        const alpha = 0.18 + depth * 0.75;

        if (p.isCyan) {
          /* glowing cyan dot */
          const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 3.5);
          grd.addColorStop(0, `rgba(0,212,255,${alpha})`);
          grd.addColorStop(1, "rgba(0,212,255,0)");
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(sx, sy, r * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = p.isCyan
          ? `rgba(0,212,255,${Math.min(1, alpha + 0.2)})`
          : `rgba(180,220,255,${alpha * 0.55})`;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      });

      /* equator ring glow */
      const rg = ctx.createRadialGradient(cx, cy, sphereR * 0.82, cx, cy, sphereR * 1.08);
      rg.addColorStop(0, "rgba(0,212,255,0.00)");
      rg.addColorStop(0.5, "rgba(0,212,255,0.05)");
      rg.addColorStop(1, "rgba(0,212,255,0.00)");
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereR * 1.08, 0, Math.PI * 2);
      ctx.fill();

      frameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ display: "block", imageRendering: "pixelated" }}
    />
  );
}

/* ── AK Monogram SVG ── */
function AKMonogram() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-label="Abhijeet Kadu">
      {/* outer ring */}
      <circle cx="24" cy="24" r="22" stroke={ACCENT} strokeWidth="1" strokeOpacity="0.35" />
      {/* A */}
      <path d="M10 36 L17 14 L24 36 M12.5 27 H21.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* K */}
      <path d="M27 14 V36 M27 25 L37 14 M27 25 L37 36" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ── Grid overlay ── */
function GridOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
      backgroundImage: `linear-gradient(rgba(0,212,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.018) 1px, transparent 1px)`,
      backgroundSize: "72px 72px",
      maskImage: "radial-gradient(ellipse 80% 70% at 50% 100%, black 30%, transparent 80%)",
    }} />
  );
}

/* ── Noise grain ── */
function Grain() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
      backgroundSize: "128px 128px",
      opacity: 0.028,
      mixBlendMode: "overlay",
    }} />
  );
}

/* ── Ambient glow ── */
function AmbientGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* top-right soft glow */}
      <div style={{
        position: "absolute", right: "-10%", top: "-5%",
        width: "60vw", height: "55vh",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 65%)",
        filter: "blur(40px)",
        animation: "glowPulse 8s ease-in-out infinite alternate",
      }} />
      {/* bottom-left warm fill */}
      <div style={{
        position: "absolute", left: "-5%", bottom: "5%",
        width: "45vw", height: "40vh",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(0,212,255,0.03) 0%, transparent 70%)",
        filter: "blur(60px)",
        animation: "glowPulse 12s ease-in-out infinite alternate-reverse",
      }} />
      <style>{`
        @keyframes glowPulse {
          0%   { opacity: 0.7; transform: scale(1); }
          100% { opacity: 1;   transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export default function Entry() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef      = useRef<HTMLHeadingElement>(null);
  const metaRef      = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const sphereRef    = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);

  const { text: firstName, play: playFirst } = useScramble("ABHIJEET", true);
  const { text: lastName,  play: playLast  } = useScramble("KADU",     true);

  const [roleIdx, setRoleIdx]         = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => { setRoleIdx(p => (p + 1) % ROLES.length); setRoleVisible(true); }, 360);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  useGSAP(() => {
    const els = [nameRef.current, metaRef.current, ctaRef.current, sphereRef.current, scrollRef.current];
    gsap.set(els, { opacity: 0 });
    gsap.set(nameRef.current,   { y: 70, filter: "blur(18px)" });
    gsap.set(sphereRef.current, { scale: 0.82 });
    gsap.set(ctaRef.current,    { y: 20 });

    gsap.timeline()
      .to(sphereRef.current, { opacity: 1, scale: 1, duration: 1.6, ease: "power3.out", delay: 0.1 })
      .to(nameRef.current,   { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }, "-=1.1")
      .to(metaRef.current,   { opacity: 1, duration: 0.9, ease: "power2.out" }, "-=0.6")
      .to(ctaRef.current,    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
      .to(scrollRef.current, { opacity: 0.5, duration: 0.8 }, "-=0.3");
  }, { scope: containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#020408" }}
    >
      <AmbientGlow />
      <GridOverlay />
      <Grain />

      {/* ── Top bar ── */}
      <div className="relative z-20 flex items-center justify-between px-6 md:px-12 pt-8">
        <AKMonogram />
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: ACCENT }}>Available</span>
        </div>
      </div>

      {/* ── Main layout: name left / sphere right ── */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 pb-8 gap-8 mt-4 md:mt-0">

        {/* LEFT — Name + meta */}
        <div className="flex flex-col justify-center flex-1 pt-4 md:pt-0">

          {/* Role pill */}
          <div className="mb-6 flex items-center gap-2.5">
            <div className="h-px w-8 flex-shrink-0" style={{ background: ACCENT, opacity: 0.5 }} />
            <p
              className="font-mono text-[10px] tracking-[0.28em] uppercase transition-all duration-360"
              style={{ color: roleVisible ? ACCENT : "transparent", opacity: roleVisible ? 1 : 0, transform: roleVisible ? "translateY(0)" : "translateY(5px)" }}
            >{ROLES[roleIdx]}</p>
          </div>

          {/* Name */}
          <h1 ref={nameRef} className="font-serif font-black select-none" style={{ lineHeight: 0.88 }}>
            <span
              className="block cursor-pointer"
              style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)", WebkitTextStroke: "1.5px #f0ede8", color: "transparent", letterSpacing: "-0.03em", transition: "letter-spacing 0.5s cubic-bezier(0.16,1,0.3,1), -webkit-text-stroke-color 0.3s ease" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.letterSpacing = "0.01em"; (el.style as unknown as Record<string,string>)["webkitTextStroke"] = `1.5px ${ACCENT}`; playFirst(); }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.letterSpacing = "-0.03em"; (el.style as unknown as Record<string,string>)["webkitTextStroke"] = "1.5px #f0ede8"; }}
            >{firstName}</span>
            <span
              className="relative block text-white cursor-pointer"
              style={{ fontSize: "clamp(2.8rem, 9.5vw, 8.8rem)", letterSpacing: "-0.03em", transition: "color 0.3s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = ACCENT; playLast(); }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
            >
              {lastName}
              <span className="absolute left-0 -bottom-1 h-[2.5px] w-3/5" style={{ background: `linear-gradient(90deg, ${ACCENT}, transparent)` }} />
            </span>
          </h1>

          {/* Tagline */}
          <p className="font-mono mt-6 leading-relaxed" style={{ fontSize: "clamp(0.7rem, 1vw, 0.85rem)", color: "rgba(180,220,255,0.4)", maxWidth: "32ch" }}>
            Building cloud systems &amp; shipping products that matter.
          </p>

          {/* Meta row */}
          <div ref={metaRef} className="mt-4 flex items-center gap-4 flex-wrap">
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>Mumbai, India</span>
            <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>Ecovis RKCA</span>
            <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>DP-600 Certified</span>
          </div>

          {/* CTA row */}
          <div ref={ctaRef} className="mt-8 flex items-center gap-3 flex-wrap">
            <MagneticButton
              tag="a"
              href="#projects"
              className="inline-flex items-center gap-2 px-7 py-3 font-mono font-bold tracking-[0.18em] uppercase rounded-full text-[0.65rem] transition-all duration-200"
              style={{ background: ACCENT, color: "#020408" } as React.CSSProperties}
            >
              View Work
            </MagneticButton>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3 font-mono tracking-[0.18em] uppercase rounded-full text-[0.65rem] transition-all duration-200"
              style={{ border: `1px solid rgba(0,212,255,0.2)`, color: "rgba(0,212,255,0.6)" }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = ACCENT; el.style.color = ACCENT; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(0,212,255,0.2)"; el.style.color = "rgba(0,212,255,0.6)"; }}
            >
              Contact
            </a>
          </div>
        </div>

        {/* RIGHT — 3D Sphere */}
        <div
          ref={sphereRef}
          className="flex-shrink-0 flex items-center justify-center relative"
          style={{ width: "clamp(280px, 45vw, 520px)", height: "clamp(280px, 45vw, 520px)" }}
        >
          {/* outer glow ring */}
          <div className="absolute inset-0 rounded-full" style={{
            background: `radial-gradient(ellipse at center, rgba(0,212,255,0.06) 0%, transparent 68%)`,
            filter: "blur(20px)",
          }} />
          <ParticleSphere />
          {/* floating label */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2" style={{ opacity: 0.4 }}>
            <div className="h-px w-6" style={{ background: ACCENT }} />
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: ACCENT }}>Interactive</span>
            <div className="h-px w-6" style={{ background: ACCENT }} />
          </div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div ref={scrollRef} className="relative z-20 flex items-center gap-3 px-6 md:px-12 pb-8">
        <div className="w-px h-8" style={{ background: `linear-gradient(to bottom, transparent, ${ACCENT}55)` }} />
        <span className="font-mono text-[8px] tracking-[0.32em] uppercase" style={{ color: "rgba(0,212,255,0.35)" }}>Scroll</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden className="animate-bounce">
          <path d="M5 1 V9 M2 6 L5 9 L8 6" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* ── Bottom fade to next section (cream) ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{
        background: "linear-gradient(to bottom, transparent, #020408 80%)",
      }} />
    </section>
  );
}
