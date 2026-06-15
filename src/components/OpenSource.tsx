"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

const prs = [
  {
    repo: "tensorflow/tensorflow",
    title: "Fix typo in XLA constants",
    url: "https://github.com/tensorflow/tensorflow/pull/107884",
    dotColor: "#EA580C",
  },
  {
    repo: "tensorflow/tensorflow",
    title: "Update assert_no_garbage_created docstring",
    url: "https://github.com/tensorflow/tensorflow/pull/107845",
    dotColor: "#EA580C",
  },
  {
    repo: "mlflow/mlflow",
    title: "Fix typo in PromoteModelButton",
    url: "https://github.com/mlflow/mlflow/pull/19820",
    dotColor: "#3B82F6",
  },
  {
    repo: "OpenLightingProject/open-fixture-library",
    title: "Improve LabeledInput component",
    url: "https://github.com/OpenLightingProject/open-fixture-library/pull/5312",
    dotColor: "#10B981",
  },
];

export default function OpenSource() {
  return (
    <section id="open-source" style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,72px)" }}>
      <style>{`
        .os-link {
          transition: color 0.15s ease, transform 0.15s ease;
        }
        .os-link:hover {
          color: var(--accent-primary) !important;
          transform: translateX(2px);
        }
      `}</style>
      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative" }}>
        <AnimatedHeading section="06" text="Open Source" italic="Contributions" />
        
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.9rem,0.85rem + 0.3vw,1.05rem)",
            fontWeight: 400,
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            maxWidth: "60ch",
          }}>
            4 PRs reviewed, approved, and merged by core maintainers of TensorFlow, MLflow, and OpenLightingProject.
          </p>
          
          <ul style={{ display: "flex", flexDirection: "column", gap: 14, listStyle: "none", padding: 0 }}>
            {prs.map((pr) => (
              <li
                key={pr.url}
                className="glass-panel-light"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  borderRadius: "8px",
                  padding: "12px 18px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {/* Org Color Dot */}
                  <span style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: pr.dotColor,
                    display: "inline-block",
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "var(--text-primary)",
                  }}>{pr.repo}</span>
                </div>
                
                <Link
                  href={pr.url}
                  target="_blank"
                  className="os-link"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {pr.title} <ExternalLink size={11} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
