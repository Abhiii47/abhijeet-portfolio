"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  RMSticker, RMArrow, RMZigzag, RMHr, RMPullquote,
} from "./RMDecorations";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "var(--accent)";
const INK    = "var(--ink)";

const PAIN_POINTS = [
  { number: "01", title: "The Generalist Trap",  body: "Recruiters see \"SDE & Product Manager\" and assume you\u2019re a diluted version of both. You\u2019re actually just rare." },
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

  useGSAP(() => {
    // Hero entrance — fromTo so end state is always guaranteed
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(nameRef.current,      { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 0)
      .fromTo(badgeRef.current,     { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5  }, 0.25)
      .fromTo(headRef.current,      { y: 40,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, 0.45)
      .fromTo(subRef.current,       { y: 24,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, 0.72)
      .fromTo(arrowAreaRef.current, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5  }, 0.90)
      .fromTo(pullRef.current,      { y: 18,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 0.95)
      .fromTo(ctaRef.current,       { y: 20,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 1.0);

    // Pain-point cards
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
  }, { scope: sectionRef });

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
        padding: "clamp(80px,10vw,140px) clamp(20px,5vw,72px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(rgba(196,64,10,0.035) 1px,transparent 1px)," +
          "linear-gradient(90deg,rgba(196,64,10,0.035) 1px,transparent 1px)",
        backgroundSize: "80px 80px",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative" }}>

        {/* Name label */}
        <div ref={nameRef}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "clamp(0.62rem,1vw,0.78rem)",
            fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: ACCENT,
          }}>Abhijeet Kadu</span>
        </div>

        {/* Badges */}
        <div ref={badgeRef} style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, margin: "clamp(16px,2.5vw,24px) 0 clamp(28px,4vw,48px)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "var(--bg-card)", border: "1.5px dashed rgba(74,222,128,0.5)", borderRadius: 4, padding: "6px 14px" }}>
            <span className="avail-dot" style={{ width: 7, height: 7, background: "#4ADE80", display: "inline-block", borderRadius: "50%" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: INK }}>Open to Work</span>
          </div>
          <RMSticker text="Mumbai, IN" rotate={-1.8} />
          <RMSticker text="2026" accent rotate={2.2} wiggle />
          <RMSticker text="SDE + PM" rotate={-2.5} />
        </div>

        {/* Heading */}
        <h1 ref={headRef} style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "clamp(2.8rem,7vw,7.5rem)",
          letterSpacing: "-0.03em", lineHeight: 1.02, color: INK,
          marginBottom: "clamp(16px,2.5vw,28px)",
        }}>
          Abhijeet Kadu<br />
          <span style={{ fontStyle: "italic", color: ACCENT }}>builds things.</span>
        </h1>

        {/* Subtitle */}
        <div ref={arrowAreaRef} style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: "clamp(20px,3vw,36px)" }}>
          <RMArrow size={34} float />
          <p ref={subRef} style={{
            fontFamily: "var(--font-body)", fontWeight: 300,
            fontSize: "clamp(1rem,1.6vw,1.25rem)",
            color: "rgba(14,10,4,0.55)", lineHeight: 1.65, maxWidth: "52ch",
          }}>
            SDE &middot; Product Manager &middot; ML Engineer.<br />
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
        <div ref={ctaRef} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: "clamp(48px,7vw,96px)" }}>
          <a href="#projects"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", padding: "12px 28px", background: ACCENT, color: "#fff", borderRadius: 4, textDecoration: "none", boxShadow: "3px 3px 0 rgba(14,10,4,0.28)", transition: "transform 0.16s,box-shadow 0.16s" }}
            onMouseEnter={e => { const a = e.currentTarget; a.style.transform = "translate(-2px,-2px)"; a.style.boxShadow = "5px 5px 0 rgba(14,10,4,0.28)"; }}
            onMouseLeave={e => { const a = e.currentTarget; a.style.transform = ""; a.style.boxShadow = "3px 3px 0 rgba(14,10,4,0.28)"; }}
          >View Work ↗</a>
          <a href="#contact"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", padding: "12px 28px", background: "transparent", color: INK, border: "1.5px solid rgba(14,10,4,0.22)", borderRadius: 4, textDecoration: "none", transition: "border-color 0.18s,background 0.18s" }}
            onMouseEnter={e => { const a = e.currentTarget; a.style.borderColor = ACCENT; a.style.background = "rgba(196,64,10,0.04)"; }}
            onMouseLeave={e => { const a = e.currentTarget; a.style.borderColor = "rgba(14,10,4,0.22)"; a.style.background = "transparent"; }}
          >Let&rsquo;s Talk</a>
        </div>

        {/* Pain-point grid */}
        <div ref={painRef}>
          <RMHr label="why me though" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(280px,100%),1fr))", gap: "clamp(10px,1.5vw,16px)", marginTop: 8 }}>
            {PAIN_POINTS.map((pp) => (
              <div key={pp.number} className="pain-card" style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(14,10,4,0.07)",
                borderRadius: 12,
                padding: "clamp(16px,2vw,24px)",
                position: "relative",
                overflow: "hidden",
              }}>
                <span aria-hidden style={{
                  position: "absolute", right: 12, top: 4,
                  fontFamily: "var(--font-display)", fontWeight: 800,
                  fontSize: "3rem", color: "rgba(196,64,10,0.06)",
                  lineHeight: 1, userSelect: "none",
                }}>{pp.number}</span>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>{pp.number}</p>
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, color: INK, marginBottom: 8, lineHeight: 1.3 }}>{pp.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 300, color: "rgba(14,10,4,0.52)", lineHeight: 1.65 }}>{pp.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "clamp(48px,7vw,80px)" }}>
        <RMZigzag />
      </div>
    </section>
  );
}
