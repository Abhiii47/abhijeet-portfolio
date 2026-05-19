"use client";

import { useRef, useEffect } from "react";
import AnimatedHeading from "./AnimatedHeading";
import { RMHr, RMSticker, RMZigzag } from "./RMDecorations";

const ACCENT = "#C4400A";
const INK    = "#0E0A04";

type Contribution = {
  pr: string;
  url: string;
  description: string;
};

type OSSProject = {
  org: string;
  repo: string;
  repoUrl: string;
  color: string;       // brand accent
  contributions: Contribution[];
  featured?: boolean;
};

const OSS: OSSProject[] = [
  {
    org: "tensorflow",
    repo: "tensorflow",
    repoUrl: "https://github.com/tensorflow/tensorflow",
    color: "#FF6F00",
    featured: true,
    contributions: [
      {
        pr: "Fix typo in XLA constants",
        url: "https://github.com/tensorflow/tensorflow/pulls?q=is%3Apr+author%3AAbhiii47",
        description: "Corrected a typo in XLA kernel constant naming — merged into main.",
      },
      {
        pr: "Update assert_no_garbage_created docstring",
        url: "https://github.com/tensorflow/tensorflow/pulls?q=is%3Apr+author%3AAbhiii47",
        description: "Improved docstring clarity for the garbage-collection test helper.",
      },
    ],
  },
  {
    org: "mlflow",
    repo: "mlflow",
    repoUrl: "https://github.com/mlflow/mlflow",
    color: "#0194E2",
    featured: true,
    contributions: [
      {
        pr: "Fix typo in PromoteModelButton",
        url: "https://github.com/mlflow/mlflow/pulls?q=is%3Apr+author%3AAbhiii47",
        description: "Fixed a UI label typo in the Model Registry promote button.",
      },
    ],
  },
  {
    org: "OpenLightingProject",
    repo: "ola",
    repoUrl: "https://github.com/OpenLightingProject/ola",
    color: "#6366F1",
    contributions: [
      {
        pr: "Improve LabeledInput component",
        url: "https://github.com/OpenLightingProject/ola/pulls?q=is%3Apr+author%3AAbhiii47",
        description: "Enhanced the LabeledInput UI component with better accessibility.",
      },
    ],
  },
];

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("is-visible"); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

function OSSCard({ project, index }: { project: OSSProject; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  useReveal(cardRef as React.RefObject<HTMLElement>);

  return (
    <div
      ref={cardRef}
      className="reveal-card"
      style={{
        animationDelay: `${index * 0.10}s`,
        background: "var(--bg-card)",
        border: "1px solid rgba(14,10,4,0.08)",
        borderRadius: 10,
        overflow: "hidden",
        position: "relative",
        transition: "border-color 0.22s, box-shadow 0.22s",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = `${project.color}44`;
        el.style.boxShadow   = `0 10px 36px ${project.color}12, 4px 4px 0 ${project.color}18`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(14,10,4,0.08)";
        el.style.boxShadow   = "none";
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      <div style={{ padding: "clamp(18px,2.5vw,28px)" }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Org avatar via unavatar */}
            <img
              src={`https://unavatar.io/github/${project.org}?fallback=https://github.com/${project.org}.png`}
              alt={project.org}
              width={28} height={28}
              style={{ borderRadius: 6, border: `1px solid rgba(14,10,4,0.10)`, flexShrink: 0 }}
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: INK, textDecoration: "none", transition: "color 0.18s" }}
                onMouseEnter={e => (e.currentTarget.style.color = project.color)}
                onMouseLeave={e => (e.currentTarget.style.color = INK)}
              >
                {project.org}/{project.repo}
              </a>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(14,10,4,0.30)", marginTop: 1 }}>
                {project.contributions.length} merged PR{project.contributions.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          {project.featured && <RMSticker text="merged" accent rotate={-1.5} />}
        </div>

        {/* Contributions list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {project.contributions.map((c, ci) => (
            <div
              key={ci}
              style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "10px 12px",
                background: "var(--bg-section)",
                borderRadius: 6,
                border: "1px dashed rgba(14,10,4,0.08)",
              }}
            >
              {/* Merged checkmark */}
              <span style={{
                marginTop: 1, flexShrink: 0,
                width: 16, height: 16, borderRadius: "50%",
                background: "rgba(74,222,128,0.15)",
                border: "1px solid rgba(74,222,128,0.40)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                  <path d="M1.5 4L3 5.5L6.5 2" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
                    color: INK, textDecoration: "none", lineHeight: 1.35,
                    display: "block", transition: "color 0.18s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = project.color)}
                  onMouseLeave={e => (e.currentTarget.style.color = INK)}
                >
                  {c.pr}
                </a>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 300, color: "rgba(14,10,4,0.45)", lineHeight: 1.55, marginTop: 3 }}>{c.description}</p>
              </div>
              <span style={{
                flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 8,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(74,222,128,0.70)", border: "1px solid rgba(74,222,128,0.28)",
                borderRadius: 99, padding: "2px 8px", background: "rgba(74,222,128,0.06)",
              }}>Merged</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OpenSource() {
  const sectionRef = useRef<HTMLElement>(null);
  const totalPRs   = OSS.reduce((sum, p) => sum + p.contributions.length, 0);

  return (
    <section
      id="opensource"
      ref={sectionRef}
      style={{
        background: "var(--bg-section)",
        padding: "clamp(72px,9vw,120px) clamp(20px,5vw,72px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Watermark */}
      <span aria-hidden style={{
        position: "absolute", right: "-0.02em", top: 40,
        fontFamily: "var(--font-display)", fontWeight: 800,
        fontSize: "clamp(3.5rem,8vw,8rem)",
        color: "rgba(196,64,10,0.04)", letterSpacing: "-0.04em",
        userSelect: "none", pointerEvents: "none", lineHeight: 1,
      }}>OSS</span>

      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        {/* Heading row */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: "clamp(28px,4vw,48px)" }}>
          <AnimatedHeading
            text="Open Source"
            italic="contributions"
            section="06"
            color={INK}
            accentColor={ACCENT}
            fontFamily="'Cormorant Garamond',Georgia,serif"
          />
          <RMSticker text={`${totalPRs} merged PRs`} rotate={-1.5} />
        </div>

        <RMHr label="merged into production" />

        {/* Pull-quote callout */}
        <p style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontStyle: "italic",
          fontSize: "clamp(0.95rem,1.2vw,1.15rem)",
          color: "rgba(14,10,4,0.45)",
          lineHeight: 1.75,
          maxWidth: "60ch",
          marginBottom: "clamp(24px,4vw,40px)",
          borderLeft: `2px solid ${ACCENT}44`,
          paddingLeft: "clamp(12px,2vw,20px)",
        }}>
          Real-world contributions to codebases used by millions &mdash;
          TensorFlow, MLflow, and OpenLightingProject.
          Every PR was reviewed, approved, and merged by core maintainers.
        </p>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(min(340px,100%),1fr))",
          gap: "clamp(10px,1.5vw,16px)",
        }}>
          {OSS.map((p, i) => <OSSCard key={p.repo} project={p} index={i} />)}
        </div>
      </div>

      <div style={{ marginTop: "clamp(40px,6vw,72px)" }}>
        <RMZigzag color="rgba(196,64,10,0.07)" />
      </div>
    </section>
  );
}
