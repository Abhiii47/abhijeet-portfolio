"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────  DATA  ──────────────────── */

type Chip = { label: string; hot?: boolean };
type Group = { title: string; chips: Chip[] };

const GROUPS: Group[] = [
  {
    title: "Cloud & Infra",
    chips: [
      { label: "AWS (EC2 · S3 · IAM · CloudWatch)", hot: true },
      { label: "GCP · Vertex AI",                   hot: true },
      { label: "DP-600 Certified",                   hot: true },
      { label: "Microsoft Fabric",                   hot: true },
      { label: "Docker" },
      { label: "CI/CD · GitHub Actions" },
      { label: "Azure" },
    ],
  },
  {
    title: "Backend & Systems",
    chips: [
      { label: "Node.js",      hot: true },
      { label: "FastAPI",      hot: true },
      { label: "REST APIs",    hot: true },
      { label: "Socket.io" },
      { label: "Server-Sent Events" },
      { label: "OAuth2 · JWT" },
      { label: "RBAC" },
      { label: "PostgreSQL" },
      { label: "MongoDB" },
      { label: "MySQL" },
    ],
  },
  {
    title: "ML & Data",
    chips: [
      { label: "RAG · LLMs",             hot: true },
      { label: "XGBoost",                hot: true },
      { label: "FAISS Vector Store",     hot: true },
      { label: "LightGBM" },
      { label: "CatBoost" },
      { label: "Pandas · NumPy" },
      { label: "Scikit-learn" },
      { label: "Power BI · DAX" },
      { label: "EDA · Feature Engineering" },
    ],
  },
  {
    title: "Frontend & Product",
    chips: [
      { label: "Next.js", hot: true },
      { label: "React",   hot: true },
      { label: "Tailwind CSS" },
      { label: "GSAP" },
      { label: "TypeScript" },
      { label: "Sprint Planning" },
      { label: "KPI Definition" },
      { label: "Roadmapping" },
      { label: "Stakeholder Comms" },
    ],
  },
];

type Cert = { code: string; subtitle: string; org: string };

const CERTS: Cert[] = [
  { code: "DP-600",              subtitle: "Fabric Analytics Engineer", org: "Microsoft · 2024" },
  { code: "Top 0.1%",            subtitle: "Amazon ML Summer School",   org: "Amazon · 2024" },
  { code: "Patent 458179-001",   subtitle: "Smart Inventory System",    org: "Govt. of India · 2024" },
];

/* ────────────────────  STYLES  ──────────────────── */

const C = {
  bg:          "#F5F0E8",
  surface:     "#EDE8DF",
  border:      "#DDD7CB",
  text:        "#1A1208",
  muted:       "#6B6056",
  hint:        "#9A8F83",
  rust:        "#C4400A",
  rustHover:   "#A33508",
  hotBg:       "#FBE9E0",
  hotBorder:   "#F0C4B0",
} as const;

/* ────────────────────  COMPONENT  ──────────────────── */

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    /* ── Heading words stagger ── */
    const words = sectionRef.current?.querySelectorAll<HTMLElement>(".sk-word");
    if (words?.length) {
      gsap.from(words, {
        scrollTrigger: { trigger: ".sk-heading", start: "top 80%" },
        y: 40, opacity: 0, duration: 0.75,
        stagger: 0.1, ease: "power3.out",
      });
    }

    /* ── Group labels ── */
    gsap.from(".sk-group-label", {
      scrollTrigger: { trigger: ".sk-grid", start: "top 82%" },
      y: 20, opacity: 0, duration: 0.6,
      stagger: 0.1, ease: "power2.out",
    });

    /* ── Chips per group ── */
    gsap.utils.toArray<Element>(".sk-chips").forEach((group) => {
      const chips = group.querySelectorAll(".sk-chip");
      gsap.from(chips, {
        scrollTrigger: { trigger: group as Element, start: "top 85%" },
        y: 10, opacity: 0, duration: 0.45,
        stagger: 0.03, ease: "power2.out",
      });
    });

    /* ── Cert cards ── */
    gsap.from(".sk-cert", {
      scrollTrigger: { trigger: ".sk-certs", start: "top 85%" },
      y: 30, opacity: 0, duration: 0.65,
      stagger: 0.1, ease: "power2.out",
    });
  }, { scope: sectionRef });

  return (
    <>
      {/* Font load */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .sk-chip-hot:hover  { background: #f5d4c2 !important; border-color: #e8a882 !important; }
        .sk-chip-norm:hover { background: #E2DDD4 !important; }

        @media(max-width:1023px) { .sk-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:599px)  { .sk-grid { grid-template-columns: 1fr !important; } }
        @media(max-width:767px)  { .sk-certs-inner { flex-direction: column !important; } }
      `}</style>

      <section
        id="skills"
        ref={sectionRef}
        style={{
          background: C.bg,
          padding: "clamp(72px,9vw,120px) clamp(20px,5vw,72px)",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>

          {/* ── Section label ── */}
          <p style={{
            fontFamily: "'DM Sans',sans-serif",
            fontWeight: 400, fontSize: 10,
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: C.rust,
            marginBottom: 28,
          }}>03 / Skills</p>

          {/* ── Heading ── */}
          <h2 className="sk-heading" style={{
            display: "flex", flexWrap: "wrap", alignItems: "baseline",
            gap: "0 0.3em",
            marginBottom: "clamp(48px,6vw,80px)",
            lineHeight: 1.05,
          }}>
            {["Skills", "&"].map(w => (
              <span key={w} className="sk-word" style={{
                display: "inline-block",
                fontFamily: "'DM Serif Display',Georgia,serif",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "clamp(2.4rem,5vw,4.2rem)",
                color: C.text,
              }}>{w}</span>
            ))}
            <span className="sk-word" style={{
              display: "inline-block",
              fontFamily: "'DM Serif Display',Georgia,serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(2.4rem,5vw,4.2rem)",
              color: C.rust,
            }}>expertise</span>
          </h2>

          {/* ── 4-col skill grid ── */}
          <div
            className="sk-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 1,
              background: C.border,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              overflow: "hidden",
              marginBottom: "clamp(40px,5vw,64px)",
            }}
          >
            {GROUPS.map((group) => (
              <div
                key={group.title}
                style={{
                  background: C.bg,
                  padding: "clamp(20px,2.5vw,28px)",
                }}
              >
                {/* Group label */}
                <p
                  className="sk-group-label"
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 500, fontSize: 9,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: C.hint,
                    marginBottom: 16,
                  }}
                >{group.title}</p>

                {/* Chips */}
                <div
                  className="sk-chips"
                  style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
                >
                  {group.chips.map(chip => (
                    chip.hot ? (
                      <span
                        key={chip.label}
                        className="sk-chip sk-chip-hot"
                        style={{
                          display: "inline-block",
                          padding: "5px 10px",
                          borderRadius: 4,
                          background: C.hotBg,
                          border: `1px solid ${C.hotBorder}`,
                          color: C.rust,
                          fontFamily: "'DM Sans',sans-serif",
                          fontWeight: 500, fontSize: 11,
                          lineHeight: 1,
                          transition: "background 0.18s, border-color 0.18s",
                          cursor: "default",
                        }}
                      >{chip.label}</span>
                    ) : (
                      <span
                        key={chip.label}
                        className="sk-chip sk-chip-norm"
                        style={{
                          display: "inline-block",
                          padding: "5px 10px",
                          borderRadius: 4,
                          background: C.surface,
                          border: `1px solid ${C.border}`,
                          color: C.muted,
                          fontFamily: "'DM Sans',sans-serif",
                          fontWeight: 400, fontSize: 11,
                          lineHeight: 1,
                          transition: "background 0.18s",
                          cursor: "default",
                        }}
                      >{chip.label}</span>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Certifications row ── */}
          <div className="sk-certs">
            <div style={{
              borderTop: `1px solid ${C.border}`,
              paddingTop: "clamp(28px,4vw,40px)",
              marginBottom: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <p style={{
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 400, fontSize: 9,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: C.hint,
              }}>Certifications & Recognition</p>
              <div style={{ height: 1, flex: 1, maxWidth: 200, marginLeft: 20, background: C.border }} />
            </div>

            <div
              className="sk-certs-inner"
              style={{ display: "flex", gap: 12 }}
            >
              {CERTS.map(cert => (
                <div
                  key={cert.code}
                  className="sk-cert"
                  style={{
                    flex: 1,
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 4,
                    padding: 20,
                    transition: "box-shadow 0.22s, transform 0.22s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(26,18,8,0.08)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Code / title */}
                  <p style={{
                    fontFamily: "'DM Serif Display',Georgia,serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 20,
                    color: C.rust,
                    lineHeight: 1.1,
                    marginBottom: 8,
                  }}>{cert.code}</p>

                  {/* Subtitle */}
                  <p style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 400, fontSize: 12,
                    color: C.text,
                    marginBottom: 6,
                    lineHeight: 1.4,
                  }}>{cert.subtitle}</p>

                  {/* Org */}
                  <p style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 400, fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: C.hint,
                  }}>{cert.org}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
