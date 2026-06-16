"use client";

import Link from "next/link";
import { GitMerge } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

const prs = [
  {
    repo: "tensorflow/tensorflow",
    title: "Fix typo in XLA constants",
    url: "https://github.com/tensorflow/tensorflow/pull/107884",
    diff: "+3 / -3",
    dotColor: "#EA580C",
  },
  {
    repo: "tensorflow/tensorflow",
    title: "Update assert_no_garbage_created docstring",
    url: "https://github.com/tensorflow/tensorflow/pull/107845",
    diff: "+8 / -4",
    dotColor: "#EA580C",
  },
  {
    repo: "mlflow/mlflow",
    title: "Fix typo in PromoteModelButton",
    url: "https://github.com/mlflow/mlflow/pull/19820",
    diff: "+1 / -1",
    dotColor: "#3B82F6",
  },
  {
    repo: "OpenLightingProject/open-fixture-library",
    title: "Improve LabeledInput component",
    url: "https://github.com/OpenLightingProject/open-fixture-library/pull/5312",
    diff: "+42 / -18",
    dotColor: "#10B981",
  },
];

export default function OpenSource() {
  return (
    <section id="open-source" style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,72px)" }}>
      <style>{`
        .os-row {
          display: grid;
          grid-template-columns: 10px 1fr auto auto;
          align-items: center;
          gap: 14px;
          padding: 14px 20px;
          border-radius: 10px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-card);
          text-decoration: none;
          transition: background 0.18s ease, border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
          cursor: pointer;
        }
        .os-row:hover {
          background: var(--bg-card-hover);
          border-color: color-mix(in oklch, var(--accent-primary) 35%, var(--border-subtle));
          transform: translateX(5px);
          box-shadow: 0 4px 20px rgba(26,23,20,0.08);
        }
        .os-merged-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          border-radius: 999px;
          background: rgba(74,124,89,0.10);
          border: 1px solid rgba(74,124,89,0.28);
          color: #4a7c59;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
          flex-shrink: 0;
        }
        [data-theme="dark"] .os-merged-chip {
          background: rgba(74,124,89,0.18);
          border-color: rgba(74,124,89,0.4);
          color: #7dba97;
        }
        .os-diff {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-secondary);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .os-repo-name {
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .os-pr-title {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-secondary);
          margin-top: 2px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .os-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        @media (max-width: 640px) {
          .os-row { grid-template-columns: 10px 1fr; grid-template-rows: auto auto; row-gap: 8px; }
          .os-diff { grid-column: 2; }
          .os-merged-chip { display: none; }
        }
      `}</style>

      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative" }}>
        <AnimatedHeading section="06" text="Open" italic="Source" />

        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(0.9rem,0.85rem + 0.3vw,1.05rem)",
          color: "var(--text-secondary)",
          maxWidth: "58ch",
          lineHeight: 1.7,
          marginBottom: "clamp(24px,3vw,36px)",
        }}>
          4 PRs reviewed, approved, and merged by core maintainers of TensorFlow, MLflow, and OpenLightingProject.
        </p>

        <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0 }}>
          {prs.map((pr) => (
            <li key={pr.url}>
              <Link href={pr.url} target="_blank" rel="noopener noreferrer" className="os-row">
                <span className="os-dot" style={{ background: pr.dotColor }} />
                <div style={{ overflow: "hidden" }}>
                  <div className="os-repo-name">{pr.repo}</div>
                  <div className="os-pr-title">
                    <span>{pr.title}</span>
                    <span style={{ opacity: 0.5 }}>↗</span>
                  </div>
                </div>
                <span className="os-diff">{pr.diff}</span>
                <span className="os-merged-chip">
                  <GitMerge size={10} />
                  Merged
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
