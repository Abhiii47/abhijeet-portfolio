"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RMSticker, RMArrow, RMZigzag, RMHr, RMPullquote,
} from "./RMDecorations";

gsap.registerPlugin(ScrollTrigger);

const ROLES = ["SDE", "PM", "ML Engineer", "Builder"];

const PAIN_POINTS = [
  { number: "01", title: "The Generalist Trap",  body: "Recruiters see \"SDE & Product Manager\" and assume you\u2019re diluted. You\u2019re actually just rare." },
  { number: "02", title: "The Silent Rejection", body: "A portfolio without live projects is a resume in disguise. Every repo here ships." },
  { number: "03", title: "The Experience Gap",   body: "50K resumes scored. 150K ML records processed. Top 0.1% nationally. The gap is already closed." },
];

export default function Entry() {
  const sectionRef   = useRef<HTMLElement>(null);
  const nameRef      = useRef<HTMLDivElement>(null);
  const headRef      = useRef<HTMLHeadingElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const arrowAreaRef = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const painRef      = useRef<HTMLDivElement>(null);
  const pullRef      = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);
  const orb1Ref      = useRef<HTMLDivElement>(null);
  const orb2Ref      = useRef<HTMLDivElement>(null);
  const orb3Ref      = useRef<HTMLDivElement>(null);
  const roleRef      = useRef<HTMLSpanElement>(null);

  const [roleIdx, setRoleIdx] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);

  // Role typewriter cycling
  useEffect(() => {
    const cycle = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIdx(i => (i + 1) % ROLES.length);
        setRoleVisible(true);
      }, 350);
    }, 2400);
    return () => clearInterval(cycle);
  }, []);

  // All entrance + ambient animations fire AFTER preloader fires "preloader:done"
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Hide everything initially
    const entranceEls = [
      nameRef.current, badgeRef.current, headRef.current,
      subRef.current, arrowAreaRef.current, pullRef.current,
      ctaRef.current, scrollIndRef.current,
    ];
    gsap.set(entranceEls, { opacity: 0, y: 32 });
    gsap.set(orb1Ref.current, { opacity: 0 });
    gsap.set(orb2Ref.current, { opacity: 0 });
    gsap.set(orb3Ref.current, { opacity: 0 });

    const start = () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Staggered entrance
      tl.to(nameRef.current,      { y: 0, opacity: 1, duration: 0.6  }, 0)
        .to(badgeRef.current,     { y: 0, opacity: 1, duration: 0.55 }, 0.15)
        .to(headRef.current,      { y: 0, opacity: 1, duration: 0.9  }, 0.30)
        .to(subRef.current,       { y: 0, opacity: 1, duration: 0.65 }, 0.55)
        .to(arrowAreaRef.current, { y: 0, opacity: 1, duration: 0.55 }, 0.62)
        .to(pullRef.current,      { y: 0, opacity: 1, duration: 0.55 }, 0.70)
        .to(ctaRef.current,       { y: 0, opacity: 1, duration: 0.55 }, 0.78)
        .to(scrollIndRef.current, { y: 0, opacity: 1, duration: 0.5  }, 1.0);

      // Orbs fade in
      tl.to(orb1Ref.current, { opacity: 1, duration: 1.2, ease: "power1.out" }, 0.4)
        .to(orb2Ref.current, { opacity: 1, duration: 1.4, ease: "power1.out" }, 0.6)
        .to(orb3Ref.current, { opacity: 1, duration: 1.0, ease: "power1.out" }, 0.8);

      // Continuous ambient: orbs float
      tl.add(() => {
        gsap.to(orb1Ref.current, {
          y: "-=28", x: "+=14",
          duration: 6, ease: "sine.inOut",
          yoyo: true, repeat: -1,
        });
        gsap.to(orb2Ref.current, {
          y: "+=22", x: "-=18",
          duration: 7.5, ease: "sine.inOut",
          yoyo: true, repeat: -1, delay: 1,
        });
        gsap.to(orb3Ref.current, {
          y: "-=16", x: "+=10",
          duration: 5, ease: "sine.inOut",
          yoyo: true, repeat: -1, delay: 0.5,
        });
      }, ">-0.3");

      // Scroll indicator bounce loop
      tl.add(() => {
        gsap.to(".scroll-dot", {
          y: 10, duration: 0.8, ease: "power1.inOut",
          yoyo: true, repeat: -1,
        });
      }, ">-0.1");
    };

    // Listen for preloader:done — if already missed (dev HMR), start immediately
    let fired = false;
    const handler = () => { if (!fired) { fired = true; start(); } };
    window.addEventListener("preloader:done", handler);

    // Fallback: if preloader is already gone or we're in dev without it
    const fallback = setTimeout(() => { if (!fired) { fired = true; start(); } }, 3500);

    // Pain card scroll triggers
    const cards = gsap.utils.toArray<HTMLElement>(".pain-card");
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 44, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.65, delay: i * 0.12, ease: "power3.out",
          scrollTrigger: { trigger: painRef.current, start: "top 88%", once: true },
        }
      );
    });

    return () => {
      window.removeEventListener("preloader:done", handler);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        background: "var(--bg-base)",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "calc(56px + clamp(24px,5vw,72px)) clamp(20px,5vw,72px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .hero-name-shimmer {
          background: linear-gradient(
            90deg,
            var(--ink) 0%, var(--ink) 35%,
            var(--accent) 50%,
            var(--ink) 65%, var(--ink) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
          animation-delay: 2s;
        }
        .role-cycle {
          display: inline-block;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .role-cycle.visible  { opacity: 1; transform: translateY(0); }
        .role-cycle.hidden   { opacity: 0; transform: translateY(-8px); }
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        .scroll-line-anim {
          animation: scrollLine 1.8s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient floating orbs */}
      <div ref={orb1Ref} aria-hidden style={{
        position: "absolute", top: "10%", right: "8%",
        width: "clamp(200px,28vw,400px)",
        height: "clamp(200px,28vw,400px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,64,10,0.13) 0%, transparent 70%)",
        filter: "blur(48px)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div ref={orb2Ref} aria-hidden style={{
        position: "absolute", bottom: "20%", left: "-4%",
        width: "clamp(160px,22vw,320px)",
        height: "clamp(160px,22vw,320px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,64,10,0.08) 0%, transparent 70%)",
        filter: "blur(56px)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div ref={orb3Ref} aria-hidden style={{
        position: "absolute", top: "55%", right: "30%",
        width: "clamp(100px,14vw,200px)",
        height: "clamp(100px,14vw,200px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(253,186,116,0.10) 0%, transparent 70%)",
        filter: "blur(32px)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Grid background */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(rgba(196,64,10,0.035) 1px,transparent 1px)," +
          "linear-gradient(90deg,rgba(196,64,10,0.035) 1px,transparent 1px)",
        backgroundSize: "80px 80px",
        pointerEvents: "none",
      }} />

      {/* Large AK watermark */}
      <span aria-hidden style={{
        position: "absolute",
        right: "-2%", top: "8%",
        fontFamily: "var(--font-display)",
        fontWeight: 900,
        fontSize: "clamp(6rem,18vw,18rem)",
        color: "rgba(196,64,10,0.045)",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        letterSpacing: "-0.05em",
        zIndex: 0,
      }}>AK</span>

      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>

        {/* Name label */}
        <div ref={nameRef}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.62rem,1vw,0.78rem)",
            fontWeight: 700, letterSpacing: "0.35em",
            textTransform: "uppercase", color: "var(--accent)",
          }}>Abhijeet Kadu</span>
        </div>

        {/* Badges */}
        <div ref={badgeRef} style={{
          display: "flex", alignItems: "center",
          flexWrap: "wrap", gap: 10,
          margin: "clamp(16px,2.5vw,24px) 0 clamp(28px,4vw,48px)",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(74,222,128,0.08)",
            border: "1.5px solid rgba(74,222,128,0.45)",
            borderRadius: 99, padding: "8px 18px",
            boxShadow: "0 0 20px rgba(74,222,128,0.12)",
          }}>
            <span className="avail-dot" style={{
              width: 9, height: 9, background: "#4ADE80",
              display: "inline-block", borderRadius: "50%", flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.65rem",
              fontWeight: 700, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#22C55E",
            }}>Open to Work</span>
          </div>
          <RMSticker text="Mumbai, IN" rotate={-1.8} />
          <RMSticker text="2026" accent rotate={2.2} wiggle />
          <RMSticker text="SDE + PM" rotate={-2.5} />
        </div>

        {/* Heading — shimmer on name, cycling role */}
        <h1 ref={headRef} style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "clamp(2.8rem,7vw,7.5rem)",
          letterSpacing: "-0.03em", lineHeight: 1.02,
          marginBottom: "clamp(16px,2.5vw,28px)",
        }}>
          <span className="hero-name-shimmer">Abhijeet Kadu</span>
          <br />
          <span style={{ color: "var(--ink)", fontStyle: "normal" }}>is a{" "}</span>
          <span
            ref={roleRef}
            className={`role-cycle ${roleVisible ? "visible" : "hidden"}`}
            style={{ color: "var(--accent)", fontStyle: "italic" }}
          >{ROLES[roleIdx]}</span>
        </h1>

        {/* Subtitle */}
        <div ref={arrowAreaRef} style={{
          display: "flex", alignItems: "flex-start",
          gap: 16, marginBottom: "clamp(20px,3vw,36px)",
        }}>
          <RMArrow size={34} float />
          <p ref={subRef} style={{
            fontFamily: "var(--font-body)", fontWeight: 300,
            fontSize: "clamp(1rem,1.6vw,1.25rem)",
            color: "rgba(14,10,4,0.60)", lineHeight: 1.65, maxWidth: "52ch",
          }}>
            Full-stack from Jupyter notebooks to production deployments.<br />
            Mumbai-based, globally useful.
          </p>
        </div>

        {/* Pullquote */}
        <div ref={pullRef}>
          <RMPullquote style={{ maxWidth: 520, marginBottom: "clamp(24px,3.5vw,40px)" }}>
            &ldquo;Stop guessing what good engineers look like. Here&rsquo;s one.&rdquo;
          </RMPullquote>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} style={{
          display: "flex", flexWrap: "wrap", gap: 12,
          marginBottom: "clamp(48px,7vw,96px)",
        }}>
          <a
            href="#projects"
            style={{
              fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.68rem",
              letterSpacing: "0.22em", textTransform: "uppercase",
              padding: "12px 28px", background: "var(--accent)", color: "#fff",
              borderRadius: 4, textDecoration: "none",
              boxShadow: "3px 3px 0 rgba(14,10,4,0.28)",
              transition: "transform 0.16s, box-shadow 0.16s",
            }}
            onMouseEnter={e => { const a = e.currentTarget; a.style.transform = "translate(-2px,-2px)"; a.style.boxShadow = "5px 5px 0 rgba(14,10,4,0.28)"; }}
            onMouseLeave={e => { const a = e.currentTarget; a.style.transform = ""; a.style.boxShadow = "3px 3px 0 rgba(14,10,4,0.28)"; }}
          >View Work ↗</a>
          <a
            href="#contact"
            style={{
              fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.68rem",
              letterSpacing: "0.22em", textTransform: "uppercase",
              padding: "12px 28px", background: "transparent", color: "var(--ink)",
              border: "1.5px solid rgba(14,10,4,0.28)",
              borderRadius: 4, textDecoration: "none",
              transition: "border-color 0.18s, background 0.18s",
            }}
            onMouseEnter={e => { const a = e.currentTarget; a.style.borderColor = "var(--accent)"; a.style.background = "rgba(196,64,10,0.04)"; }}
            onMouseLeave={e => { const a = e.currentTarget; a.style.borderColor = "rgba(14,10,4,0.28)"; a.style.background = "transparent"; }}
          >Let&rsquo;s Talk</a>
        </div>

        {/* Pain-point grid */}
        <div ref={painRef}>
          <RMHr label="why me though" />
          <div
            className="pain-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "clamp(10px,1.5vw,16px)",
              marginTop: 8,
            }}
          >
            {PAIN_POINTS.map((pp) => (
              <div
                key={pp.number}
                className="pain-card"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(14,10,4,0.09)",
                  borderRadius: 12,
                  padding: "clamp(16px,2vw,24px)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.22s, box-shadow 0.22s",
                }}
              >
                <span aria-hidden style={{
                  position: "absolute", right: 12, top: 4,
                  fontFamily: "var(--font-display)", fontWeight: 800,
                  fontSize: "4rem",
                  color: "rgba(196,64,10,0.10)",
                  lineHeight: 1, userSelect: "none",
                }}>{pp.number}</span>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>{pp.number}</p>
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, color: "var(--ink)", marginBottom: 8, lineHeight: 1.3 }}>{pp.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 300, color: "rgba(14,10,4,0.56)", lineHeight: 1.65 }}>{pp.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndRef}
        style={{
          position: "absolute",
          bottom: "clamp(24px,4vw,48px)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          zIndex: 2,
          opacity: 0,
        }}
      >
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.52rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgba(14,10,4,0.30)",
        }}>Scroll</span>
        <div style={{
          width: 1.5,
          height: 40,
          background: "rgba(14,10,4,0.10)",
          borderRadius: 99,
          overflow: "hidden",
          position: "relative",
        }}>
          <div
            className="scroll-dot scroll-line-anim"
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%",
              height: "100%",
              background: "var(--accent)",
              borderRadius: 99,
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: "clamp(48px,7vw,80px)" }}>
        <RMZigzag />
      </div>
    </section>
  );
}
