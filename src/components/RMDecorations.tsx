"use client";
/**
 * RMDecorations.tsx
 * Funky editorial decoration components inspired by resumematcher.fyi
 *
 * Exports:
 *  <RMSticker>        — rotated label sticker
 *  <RMArrow>          — floating curly arrow with animation
 *  <RMZigzag>         — full-width zigzag section divider
 *  <RMNumberedBlock>  — 01/02/03 pain-point callout block
 *  <RMPullquote>      — big italic left-border quote
 *  <RMHr>             — decorative horizontal rule with label
 *  <RMOffsetCard>     — brutal offset-shadow card wrapper
 *  <RMSectionLabel>   — "01 ───" style section heading
 */

import React from "react";

/* ────────────────────────────────────────────────────────────────── */

export function RMSticker({
  text,
  rotate = -2.5,
  accent = false,
  wiggle = false,
  style,
}: {
  text: string;
  rotate?: number;
  accent?: boolean;
  wiggle?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={wiggle ? "rm-sticker-wiggle" : ""}
      style={{
        display: "inline-block",
        fontFamily: "var(--font-mono)",
        fontSize: "0.58rem",
        fontWeight: 700,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        padding: "5px 12px",
        background: accent ? "var(--accent)" : "var(--bg-card)",
        color: accent ? "#fff" : "var(--ink)",
        border: accent ? "none" : "1.5px solid rgba(14,10,4,0.18)",
        borderRadius: "2px",
        transform: `rotate(${rotate}deg)`,
        boxShadow: accent
          ? "2px 2px 0 rgba(14,10,4,0.28)"
          : "2px 2px 0 rgba(14,10,4,0.12)",
        userSelect: "none",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {text}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────── */

export function RMArrow({
  size = 40,
  color = "var(--accent)",
  rotate = -15,
  float = true,
  style,
}: {
  size?: number;
  color?: string;
  rotate?: number;
  float?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={float ? "rm-arrow-float" : ""}
      style={{
        display: "inline-block",
        transform: `rotate(${rotate}deg)`,
        color,
        userSelect: "none",
        pointerEvents: "none",
        flexShrink: 0,
        ...style,
      }}
      aria-hidden
    >
      {/* Curly arrow path */}
      <path
        d="M8 48 C 8 24, 28 12, 48 20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead */}
      <path
        d="M42 14 L48 20 L40 24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────── */

export function RMZigzag({
  color = "rgba(196,64,10,0.15)",
  flip = false,
}: {
  color?: string;
  flip?: boolean;
}) {
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        lineHeight: 0,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: 24 }}
      >
        <polyline
          points="0,0 30,20 60,0 90,20 120,0 150,20 180,0 210,20 240,0 270,20 300,0 330,20 360,0 390,20 420,0 450,20 480,0 510,20 540,0 570,20 600,0 630,20 660,0 690,20 720,0 750,20 780,0 810,20 840,0 870,20 900,0 930,20 960,0 990,20 1020,0 1050,20 1080,0 1110,20 1140,0 1170,20 1200,0"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */

export function RMNumberedBlock({
  number,
  title,
  body,
  style,
}: {
  number: string;
  title: string;
  body: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="rm-dashed-black"
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Ghost number */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "-8px",
          right: "12px",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(3rem,6vw,5.5rem)",
          color: "rgba(14,10,4,0.05)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {number}
      </span>

      {/* Number label */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--accent)",
          display: "block",
          marginBottom: "10px",
        }}
      >
        {number}
      </span>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(1rem,1.8vw,1.3rem)",
          color: "var(--ink)",
          marginBottom: "8px",
          lineHeight: 1.25,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "clamp(0.85rem,1.2vw,0.95rem)",
          color: "rgba(14,10,4,0.50)",
          lineHeight: 1.65,
          maxWidth: "44ch",
        }}
      >
        {body}
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */

export function RMPullquote({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <blockquote
      className="rm-pullquote"
      style={style}
    >
      {children}
    </blockquote>
  );
}

/* ────────────────────────────────────────────────────────────────── */

export function RMHr({ label }: { label?: string }) {
  return (
    <div className="rm-hr" aria-hidden>
      <span />
      {label && <span>{label}</span>}
      <span />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */

export function RMOffsetCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className="rm-offset-card" style={{ padding: "clamp(16px,2.5vw,28px)", ...style }}>
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */

export function RMSectionLabel({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="rm-section-label">
      <span>{number}</span>
      <span>{text}</span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */

/**
 * RMPainPoints — the full "01/02/03" pain-point section from resumematcher.fyi
 * Drop directly into your hero or above-the-fold area.
 */
export function RMPainPoints({
  items,
  label,
}: {
  items: { number: string; title: string; body: string }[];
  label?: string;
}) {
  return (
    <div>
      {label && (
        <div className="rm-hr" style={{ marginBottom: "clamp(24px,4vw,48px)" }}>
          <span />
          <span>{label}</span>
          <span />
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))",
          gap: "clamp(12px,2vw,20px)",
        }}
      >
        {items.map((item) => (
          <RMNumberedBlock key={item.number} {...item} />
        ))}
      </div>
    </div>
  );
}
