"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeading from "./AnimatedHeading";

gsap.registerPlugin(ScrollTrigger);

const certs = [
  {
    issuer: "Microsoft",
    date: "Feb 2026",
    title: "Fabric Analytics Engineer Associate",
    sub: "DP-600 · MS Fabric · Spark · Lakehouse · Power BI · ETL",
    badge: "🏅",
    highlight: true,
  },
  {
    issuer: "Amazon",
    date: "2025",
    title: "Amazon ML Summer School",
    sub: "Supervised learning · XGBoost · Feature engineering · Model evaluation",
    badge: "⭐",
    highlight: true,
    tag: "Top 0.1%",
  },
  {
    issuer: "Govt. of India",
    date: "2025",
    title: "Design Patent № 458179-001",
    sub: "Smart Inventory System",
    badge: "📜",
    highlight: false,
  },
];

export default function Certifications() {
  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".cert-card");
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 32, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.6, delay: i * 0.10,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        }
      );
    });
  }, []);

  return (
    <section id="certifications" style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,72px)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%" }}>
        <AnimatedHeading section="05" text="Licenses &" italic="Certifications" />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(280px,100%), 1fr))",
          gap: "clamp(12px,1.8vw,20px)",
        }}>
          {certs.map((c) => (
            <div key={c.title} className="cert-card" style={{
              background: c.highlight ? "var(--bg-card)" : "var(--bg-surface)",
              border: c.highlight
                ? "1.5px solid rgba(196,64,10,0.18)"
                : "1.5px solid rgba(14,10,4,0.10)",
              borderRadius: 12,
              padding: "clamp(18px,2.2vw,28px)",
              display: "flex", flexDirection: "column", gap: 10,
              position: "relative", overflow: "hidden",
            }}>
              {/* Glow top-right on highlighted */}
              {c.highlight && (
                <div aria-hidden style={{
                  position: "absolute", top: -20, right: -20,
                  width: 100, height: 100, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(196,64,10,0.10) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{c.badge}</span>
                {c.tag && (
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.52rem", letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    padding: "3px 8px", borderRadius: 3,
                    background: "rgba(196,64,10,0.08)",
                    border: "1px solid rgba(196,64,10,0.25)",
                    color: "var(--accent)", fontWeight: 700,
                  }}>{c.tag}</span>
                )}
              </div>

              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem", letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(14,10,4,0.38)",
              }}>{c.issuer} · {c.date}</p>

              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.9rem,0.85rem+0.2vw,1.05rem)",
                fontWeight: 600, color: "var(--ink)", lineHeight: 1.3,
              }}>{c.title}</p>

              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem", fontWeight: 300,
                color: "var(--ink-muted)", lineHeight: 1.55,
              }}>{c.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
