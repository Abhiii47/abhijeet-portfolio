"use client";

/**
 * Entry.tsx — Main hero / landing section
 * ResumeMatcher-style: Space Grotesk font, funky stickers, dashed borders,
 * curly arrow, zigzag divider, 01/02/03 pain-point blocks
 */

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  RMSticker,
  RMArrow,
  RMZigzag,
  RMPainPoints,
  RMHr,
  RMPullquote,
} from "./RMDecorations";

const ACCENT = "#C4400A";
const INK    = "#0E0A04";

const PAIN_POINTS = [
  {
    number: "01",
    title: "The Generalist Trap",
    body: "Recruiters see \"SDE & Product Manager\" and assume you\u2019re a diluted version of both. You\u2019re actually just rare.",
  },
  {
    number: "02",
    title: "The Silent Rejection",
    body: "A portfolio without live projects is a resume in disguise. Every repo here ships.",
  },
  {
    number: "03",
    title: "The Experience Gap",
    body: "50K resumes scored. 150K ML records processed. Top 0.1% nationally. The gap is already closed.",
  },
];

export default function Entry() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headRef      = useRef<HTMLHeadingElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const arrowAreaRef = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(badgeRef.current, { y: -16, opacity: 0, duration: 0.5 }, 0.2)
      .from(headRef.current, { y: 40, opacity: 0, duration: 0.85 }, 0.4)
      .from(subRef.current,  { y: 24, opacity: 0, duration: 0.65 }, 0.72)
      .from(arrowAreaRef.current, { x: -20, opacity: 0, duration: 0.5 }, 0.95)
      .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.55 }, 1.05);
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
      {/* ─ Background grid lines ─ */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "linear-gradient(rgba(196,64,10,0.04) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(196,64,10,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative" }}>

        {/* ─ Top row: availability badge + stickers ─ */}
        <div
          ref={badgeRef}
          style={{
            display: "flex", alignItems: "center", flexWrap: "wrap",
            gap: 12, marginBottom: "clamp(28px,4vw,48px)",
          }}
        >
          {/* Available badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "var(--bg-card)",
            border: "1.5px dashed rgba(74,222,128,0.5)",
            borderRadius: 4, padding: "6px 14px",
          }}>
            <span
              className="avail-dot"
              style={{ width: 7, height: 7, background: "#4ADE80", display: "inline-block" }}
            />
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.6rem",
              fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase",
              color: INK,
            }}>Open to Work</span>
          </div>

          {/* Funky stickers */}
          <RMSticker text="Mumbai, IN" rotate={-1.8} />
          <RMSticker text="2026" accent rotate={2.2} wiggle />
          <RMSticker text="SDE + PM" rotate={-2.5} />
        </div>

        {/* ─ Main heading ─ */}
        <h1
          ref={headRef}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(2.8rem,7vw,7.5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            color: INK,
            marginBottom: "clamp(16px,2.5vw,28px)",
          }}
        >
          Building things
          <br />
          <span style={{ color: ACCENT, fontStyle: "italic" }}>that ship.</span>
        </h1>

        {/* ─ Subtitle row with curly arrow ─ */}
        <div
          ref={arrowAreaRef}
          style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: "clamp(24px,3.5vw,40px)" }}
        >
          <RMArrow size={36} float />
          <p
            ref={subRef}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "clamp(1rem,1.6vw,1.3rem)",
              color: "rgba(14,10,4,0.55)",
              lineHeight: 1.65,
              maxWidth: "54ch",
            }}
          >
            SDE · Product Manager · ML Engineer.
            Full-stack from Jupyter notebooks to
            production deployments.
            Mumbai-based, globally useful.
          </p>
        </div>

        {/* ─ Pullquote ─ */}
        <RMPullquote style={{ maxWidth: 540, marginBottom: "clamp(28px,4vw,48px)" }}>
          &ldquo;Stop guessing what good engineers look like. Here’s one.”
        </RMPullquote>

        {/* ─ CTA row ─ */}
        <div
          ref={ctaRef}
          style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: "clamp(48px,7vw,96px)" }}
        >
          <a
            href="#work"
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: "0.68rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              padding: "12px 28px",
              background: ACCENT,
              color: "#fff",
              borderRadius: 4,
              textDecoration: "none",
              boxShadow: `3px 3px 0 rgba(14,10,4,0.30)`,
              transition: "transform 0.18s, box-shadow 0.18s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translate(-2px,-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "5px 5px 0 rgba(14,10,4,0.30)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "3px 3px 0 rgba(14,10,4,0.30)";
            }}
          >
            View Work ↗
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: "0.68rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              padding: "12px 28px",
              background: "transparent",
              color: INK,
              border: "1.5px solid rgba(14,10,4,0.22)",
              borderRadius: 4,
              textDecoration: "none",
              transition: "border-color 0.18s, background 0.18s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = ACCENT;
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(196,64,10,0.04)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(14,10,4,0.22)";
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}
          >
            Let’s Talk
          </a>
        </div>

        {/* ─ Pain point blocks (RM 01/02/03 style) ─ */}
        <RMHr label="why me though" />
        <RMPainPoints items={PAIN_POINTS} />
      </div>

      {/* ─ Zigzag bottom edge ─ */}
      <div style={{ marginTop: "clamp(48px,7vw,80px)" }}>
        <RMZigzag />
      </div>
    </section>
  );
}
