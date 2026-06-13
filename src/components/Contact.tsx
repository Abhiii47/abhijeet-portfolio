"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Copy, Check, ArrowUpRight, FileText } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

const ACCENT = "var(--accent)";
const INK    = "var(--ink)";
const EMAIL  = "abhijeetkadu85@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="contact"
      style={{
        padding: "clamp(80px,12vw,140px) clamp(20px,5vw,72px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ghost text */}
      <span aria-hidden style={{
        position: "absolute",
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: "22vw",
        color: "rgba(14,10,4,0.025)",
        userSelect: "none",
        pointerEvents: "none",
        lineHeight: 1,
        top: "50%",
        transform: "translateY(-50%)",
        whiteSpace: "nowrap",
      }}>Hi.</span>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 600, width: "100%" }}>

        {/* Section label & Heading */}
        <AnimatedHeading section="07" text="Let's build something" italic="great." />

        {/* Subtext */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(0.9rem,0.85rem + 0.3vw,1.05rem)",
          fontWeight: 300,
          color: "var(--ink-muted)",
          lineHeight: 1.7,
          marginBottom: 40,
          maxWidth: 420,
          margin: "0 auto 40px",
        }}>
          Open to full-time AI/ML roles, research internships, and meaningful collaborations.
          I respond within 24 hours.
        </p>

        {/* Email row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 32 }}>
          <a
            href={`mailto:${EMAIL}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(0.75rem,0.7rem + 0.4vw,0.95rem)",
              color: INK,
              textDecoration: "none",
              borderBottom: `1px solid rgba(14,10,4,0.22)`,
              paddingBottom: 2,
              transition: "color 0.18s, border-color 0.18s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = ACCENT; e.currentTarget.style.borderColor = ACCENT; }}
            onMouseLeave={e => { e.currentTarget.style.color = INK; e.currentTarget.style.borderColor = "rgba(14,10,4,0.22)"; }}
          >{EMAIL}</a>
          <button
            onClick={handleCopy}
            aria-label="Copy email"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32,
              border: "1.5px solid rgba(14,10,4,0.14)",
              borderRadius: "50%",
              background: "transparent",
              cursor: "pointer",
              color: copied ? ACCENT : "var(--ink-hint)",
              transition: "border-color 0.18s, color 0.18s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(14,10,4,0.14)"; e.currentTarget.style.color = copied ? ACCENT : "var(--ink-hint)"; }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
          </button>
        </div>

        {/* Social links */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 56 }}>
          {[
            { href: "https://github.com/Abhiii47",          icon: <Github size={13} />,   label: "GitHub" },
            { href: "https://linkedin.com/in/abhijeet-kadu", icon: <Linkedin size={13} />, label: "LinkedIn" },
            { href: "/resume.pdf",                          icon: <FileText size={13} />,     label: "Resume", accent: true },
          ].map(({ href, icon, label, accent }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "8px 18px",
                borderRadius: 4,
                border: accent ? `1.5px solid rgba(196,64,10,0.35)` : "1.5px solid rgba(14,10,4,0.14)",
                background: accent ? "rgba(196,64,10,0.06)" : "transparent",
                color: accent ? ACCENT : "var(--ink-muted)",
                transition: "border-color 0.18s, background 0.18s, color 0.18s",
              }}
              onMouseEnter={e => {
                const a = e.currentTarget;
                a.style.borderColor = ACCENT;
                a.style.color = ACCENT;
                a.style.background = "rgba(196,64,10,0.08)";
              }}
              onMouseLeave={e => {
                const a = e.currentTarget;
                a.style.borderColor = accent ? "rgba(196,64,10,0.35)" : "rgba(14,10,4,0.14)";
                a.style.color = accent ? ACCENT : "var(--ink-muted)";
                a.style.background = accent ? "rgba(196,64,10,0.06)" : "transparent";
              }}
            >
              {icon}{label}<ArrowUpRight size={10} />
            </a>
          ))}
        </div>

        {/* Footer */}
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--ink-hint)",
        }}>Designed &amp; built by Abhijeet Kadu &nbsp;·&nbsp; 2026</p>
      </div>
    </section>
  );
}
