"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#00d4ff";

type Chip  = { label: string; hot?: boolean };
type Group = { title: string; color: string; chips: Chip[] };

const GROUPS: Group[] = [
  {
    title: "Cloud & Infra", color: ACCENT,
    chips: [
      { label: "AWS (EC2 · S3 · IAM · CloudWatch)", hot: true },
      { label: "GCP · Vertex AI",   hot: true },
      { label: "DP-600 Certified",  hot: true },
      { label: "Microsoft Fabric",  hot: true },
      { label: "Docker" },
      { label: "CI/CD · GitHub Actions" },
      { label: "Azure" },
    ],
  },
  {
    title: "Backend & Systems", color: "#a78bfa",
    chips: [
      { label: "Node.js",   hot: true },
      { label: "FastAPI",   hot: true },
      { label: "REST APIs", hot: true },
      { label: "Socket.io" },
      { label: "Server-Sent Events" },
      { label: "OAuth2 · JWT" },
      { label: "RBAC" },
      { label: "PostgreSQL" },
      { label: "MongoDB" },
    ],
  },
  {
    title: "ML & Data", color: "#fb923c",
    chips: [
      { label: "RAG · LLMs",          hot: true },
      { label: "XGBoost",             hot: true },
      { label: "FAISS Vector Store",  hot: true },
      { label: "LightGBM" },
      { label: "CatBoost" },
      { label: "Pandas · NumPy" },
      { label: "Scikit-learn" },
      { label: "Power BI · DAX" },
    ],
  },
  {
    title: "Frontend & Product", color: "#4ade80",
    chips: [
      { label: "Next.js", hot: true },
      { label: "React",   hot: true },
      { label: "Tailwind CSS" },
      { label: "GSAP" },
      { label: "TypeScript" },
      { label: "Sprint Planning" },
      { label: "KPI Definition" },
      { label: "Roadmapping" },
    ],
  },
];

type Cert = { code: string; subtitle: string; org: string; color: string };
const CERTS: Cert[] = [
  { code: "DP-600",            subtitle: "Fabric Analytics Engineer", org: "Microsoft · 2024",    color: "#7a5af8" },
  { code: "Top 0.1%",          subtitle: "Amazon ML Summer School",   org: "Amazon · 2024",       color: ACCENT },
  { code: "Patent 458179-001", subtitle: "Smart Inventory System",    org: "Govt. of India · 2024", color: "#4ade80" },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    /* Group labels */
    gsap.from(".sk-group-label", {
      scrollTrigger: { trigger: ".sk-grid", start: "top 75%" },
      y: 20, opacity: 0, duration: 0.5, stagger: 0.15, ease: "power2.out",
    });

    /* Divider lines draw */
    gsap.from(".sk-divider", {
      scrollTrigger: { trigger: ".sk-grid", start: "top 75%" },
      scaleX: 0, duration: 0.6, ease: "power2.inOut",
      transformOrigin: "left", stagger: 0.15,
    });

    /* Chips stagger per group */
    gsap.utils.toArray<Element>(".sk-chips").forEach((group, gi) => {
      const chips = Array.from(group.querySelectorAll(".sk-chip"));
      gsap.from(chips, {
        scrollTrigger: { trigger: group as Element, start: "top 82%" },
        y: 12, opacity: 0, duration: 0.4, stagger: 0.04,
        ease: "power2.out", delay: gi * 0.1 + 0.1,
      });
    });

    /* Cert cards 3D pop */
    gsap.from(".sk-cert", {
      scrollTrigger: { trigger: ".sk-certs", start: "top 85%" },
      y: 40, opacity: 0, rotateX: 18, scale: 0.95,
      duration: 0.65, stagger: 0.12, ease: "back.out(1.6)",
      transformOrigin: "bottom center",
    });

    gsap.from(".sk-cert-code", {
      scrollTrigger: { trigger: ".sk-certs", start: "top 85%" },
      scale: 0.7, opacity: 0, duration: 0.45,
      ease: "back.out(2)", stagger: 0.12, delay: 0.28,
    });
  }, { scope: ref });

  return (
    <section
      id="skills"
      ref={ref}
      className="section-grid"
      style={{
        background: "var(--bg-base)",
        padding: "clamp(72px,9vw,120px) clamp(20px,5vw,72px)",
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>

        <AnimatedHeading text="Skills &" italic="expertise" section="03" />

        {/* 4-col chip grid */}
        <div className="sk-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 1,
          background: "var(--ink-border)",
          border: "1px solid var(--ink-border)",
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: "clamp(40px,5vw,64px)",
        }}>
          {GROUPS.map(group => (
            <div key={group.title} style={{ background: "var(--bg-card)", padding: "clamp(20px,2.5vw,28px)" }}>
              <div className="sk-divider" style={{
                height: 1,
                background: `${group.color}35`,
                marginBottom: 14, borderRadius: 1,
              }} />
              <p className="sk-group-label" style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 500, fontSize: 9,
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: group.color, marginBottom: 14,
              }}>{group.title}</p>
              <div className="sk-chips" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {group.chips.filter(c => c.hot).map(chip => (
                  <span key={chip.label} className="sk-chip sk-chip-hot" style={{
                    display: "inline-block", padding: "5px 10px", borderRadius: 4,
                    background: `${group.color}14`,
                    border: `1px solid ${group.color}30`,
                    color: group.color,
                    fontFamily: "var(--font-body)",
                    fontWeight: 500, fontSize: 11, lineHeight: 1,
                    transition: "background 0.18s", cursor: "default",
                  }}>{chip.label}</span>
                ))}
                {group.chips.filter(c => !c.hot).map(chip => (
                  <span key={chip.label} className="sk-chip sk-chip-norm" style={{
                    display: "inline-block", padding: "5px 10px", borderRadius: 4,
                    background: "rgba(240,237,232,0.04)",
                    border: "1px solid var(--ink-border)",
                    color: "var(--ink-hint)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 400, fontSize: 11, lineHeight: 1,
                    transition: "background 0.18s", cursor: "default",
                  }}>{chip.label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cert mini-cards */}
        <div className="sk-certs">
          <div style={{
            borderTop: "1px solid var(--ink-border)",
            paddingTop: "clamp(28px,4vw,40px)",
            marginBottom: 20,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 9,
              letterSpacing: "0.32em", textTransform: "uppercase",
              color: "var(--ink-hint)",
            }}>Certifications & Recognition</p>
          </div>
          <div className="sk-certs-inner" style={{ display: "flex", gap: 12 }}>
            {CERTS.map(cert => (
              <div
                key={cert.code}
                className="sk-cert"
                style={{
                  flex: 1,
                  background: "var(--bg-card)",
                  border: "1px solid var(--ink-border)",
                  borderRadius: 6, padding: 22,
                  transition: "box-shadow 0.22s, transform 0.22s, border-color 0.22s",
                  transformStyle: "preserve-3d",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${cert.color}22`;
                  el.style.borderColor = `${cert.color}30`;
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = "none";
                  el.style.borderColor = "var(--ink-border)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <p className="sk-cert-code" style={{
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                  fontStyle: "italic", fontWeight: 700,
                  fontSize: 22, color: cert.color,
                  lineHeight: 1.1, marginBottom: 8,
                }}>{cert.code}</p>
                <p style={{
                  fontFamily: "var(--font-body)", fontWeight: 400,
                  fontSize: 12, color: "var(--ink)",
                  marginBottom: 6, lineHeight: 1.4,
                }}>{cert.subtitle}</p>
                <p style={{
                  fontFamily: "var(--font-mono)", fontWeight: 400,
                  fontSize: 10, letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--ink-hint)",
                }}>{cert.org}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:1023px){ .sk-grid{ grid-template-columns:repeat(2,1fr)!important; } }
        @media(max-width:599px) { .sk-grid{ grid-template-columns:1fr!important; } }
        @media(max-width:767px) { .sk-certs-inner{ flex-direction:column!important; } }
      `}</style>
    </section>
  );
}
