"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#00d4ff";

const ITEMS = [
  {
    title:   "Amazon ML Summer School",
    issuer:  "Amazon",
    year:    "2024",
    desc:    "Selected in the top 0.1% of 100,000+ applicants nationally.",
    accent:  ACCENT,
    featured: true,
    badge:   "Top 0.1%",
  },
  {
    title:   "DP-600 Fabric Analytics Engineer",
    issuer:  "Microsoft",
    year:    "2024",
    desc:    "Bronze→Silver→Gold ETL pipelines on Microsoft Fabric lakehouses.",
    accent:  "#7a5af8",
    featured: false,
    badge:   null,
  },
  {
    title:   "Design Patent · Smart Inventory",
    issuer:  "IP India",
    year:    "2024",
    desc:    "Intellectual Property Design No. 458179-001.",
    accent:  ACCENT,
    featured: false,
    badge:   null,
  },
  {
    title:   "Google Cloud Fundamentals",
    issuer:  "Google",
    year:    "2023",
    desc:    "Core infrastructure, compute, networking on GCP.",
    accent:  "#34a853",
    featured: false,
    badge:   null,
  },
];

export default function Certifications() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    /* Section heading reveal */
    gsap.from(".cert-label", {
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
      y: 20, opacity: 0, duration: 0.6, ease: "power3.out",
    });
    gsap.from(".cert-heading", {
      scrollTrigger: { trigger: ref.current, start: "top 76%" },
      y: 32, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.08,
    });

    /* Featured card — slides in from left with scale */
    gsap.from(".cert-featured", {
      scrollTrigger: { trigger: ".cert-featured", start: "top 82%" },
      x: -48, opacity: 0, scale: 0.97, duration: 0.9, ease: "power3.out",
    });

    /* Normal cards — staggered fan from bottom */
    gsap.from(".cert-card", {
      scrollTrigger: { trigger: ".cert-grid", start: "top 82%" },
      y: 40, opacity: 0, rotateX: 6,
      duration: 0.65, stagger: 0.1, ease: "power3.out",
      transformOrigin: "center bottom",
    });

    /* Accent lines draw in */
    gsap.from(".cert-bar", {
      scrollTrigger: { trigger: ".cert-grid", start: "top 80%" },
      scaleX: 0, duration: 0.5, stagger: 0.08, ease: "power2.out",
      transformOrigin: "left center",
    });
  }, { scope: ref });

  const [featured, ...rest] = ITEMS;

  return (
    <section
      id="certifications"
      ref={ref}
      className="section-grid"
      style={{
        background: "var(--bg-section)",
        color: "var(--ink)",
        padding: "clamp(72px,10vw,120px) clamp(24px,6vw,80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ghost number */}
      <span aria-hidden style={{
        position: "absolute", right: "2%", top: "50%",
        transform: "translateY(-50%)",
        fontFamily: "'Bebas Neue','Arial Black',sans-serif",
        fontSize: "clamp(8rem,18vw,18rem)",
        fontWeight: 900, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(0,212,255,0.04)",
        pointerEvents: "none", userSelect: "none",
      }}>05</span>

      {/* Ambient glow */}
      <div aria-hidden style={{
        position: "absolute", top: "-15%", left: "30%",
        width: "50vw", height: "50vh",
        background: "radial-gradient(ellipse,rgba(0,212,255,0.04) 0%,transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <p className="cert-label" style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10, letterSpacing: "0.38em",
          color: ACCENT, textTransform: "uppercase", marginBottom: 18,
        }}>05 / Achievements</p>

        <h2 className="cert-heading" style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: "clamp(2rem,3.8vw,3.4rem)",
          fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em",
          color: "var(--ink)",
          marginBottom: "clamp(44px,6vw,64px)",
        }}>Credentials &amp; recognition.</h2>

        {/* ── Featured card ── */}
        <div
          className="cert-featured cert-shimmer"
          style={{
            marginBottom: 20,
            padding: "clamp(28px,4vw,44px)",
            background: "var(--bg-card)",
            border: `1px solid ${ACCENT}30`,
            borderRadius: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(20px,3vw,40px)",
            alignItems: "flex-start",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Left glow edge */}
          <div aria-hidden style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: 3,
            background: `linear-gradient(to bottom, transparent, ${ACCENT}, transparent)`,
            borderRadius: "12px 0 0 12px",
          }} />

          <div style={{ flex: "1 1 280px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div className="cert-bar" style={{ width: 40, height: 3, borderRadius: 9999, background: ACCENT }} />
              <span style={{
                padding: "3px 10px",
                borderRadius: 9999,
                background: "rgba(0,212,255,0.12)",
                border: `1px solid ${ACCENT}40`,
                fontFamily: "var(--font-mono)",
                fontSize: 9, letterSpacing: "0.24em",
                color: ACCENT, textTransform: "uppercase",
              }}>{featured.badge}</span>
            </div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: "clamp(1.2rem,2.2vw,1.6rem)",
              fontWeight: 700, color: "var(--ink)", lineHeight: 1.2, marginBottom: 10,
            }}>{featured.title}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: ACCENT }}>{featured.issuer}</span>
              <span style={{ width: 1, height: 10, background: "var(--ink-border)" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", color: "var(--ink-hint)" }}>{featured.year}</span>
            </div>
            <p style={{ fontSize: "clamp(0.85rem,1.1vw,0.95rem)", color: "var(--ink-muted)", lineHeight: 1.7 }}>{featured.desc}</p>
          </div>

          {/* Right stat */}
          <div style={{
            flexShrink: 0,
            display: "flex", flexDirection: "column", alignItems: "flex-end",
            gap: 6, paddingTop: 4,
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontStyle: "italic",
              fontSize: "clamp(2.4rem,4vw,3.6rem)",
              fontWeight: 700, lineHeight: 1,
              color: ACCENT,
            }}>100K+</p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-hint)" }}>Applicants beat</p>
          </div>
        </div>

        {/* ── Normal cards grid ── */}
        <div className="cert-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(280px,100%), 1fr))",
          gap: 14,
        }}>
          {rest.map((item, i) => (
            <div
              key={i}
              className="cert-card"
              style={{
                padding: "clamp(22px,2.8vw,32px)",
                background: "var(--bg-card)",
                border: "1px solid var(--ink-border)",
                borderRadius: 10,
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
                cursor: "default",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = `${item.accent}35`;
                el.style.boxShadow = `0 16px 40px rgba(0,0,0,0.35), 0 0 0 1px ${item.accent}18`;
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "var(--ink-border)";
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Subtle corner glow on hover via ::before would need CSS — accent bar serves same purpose */}
              <div className="cert-bar" style={{ width: 28, height: 2.5, borderRadius: 9999, background: item.accent, marginBottom: 18 }} />
              <h3 style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "clamp(0.95rem,1.5vw,1.1rem)",
                fontWeight: 700, color: "var(--ink)", lineHeight: 1.25, marginBottom: 8,
              }}>{item.title}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: item.accent }}>{item.issuer}</span>
                <span style={{ width: 1, height: 10, background: "var(--ink-border)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", color: "var(--ink-hint)" }}>{item.year}</span>
              </div>
              <p style={{ fontSize: "clamp(0.78rem,0.95vw,0.86rem)", color: "var(--ink-hint)", lineHeight: 1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
