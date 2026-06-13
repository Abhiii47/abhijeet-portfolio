import Link from "next/link";
import AnimatedHeading from "./AnimatedHeading";

const prs = [
  {
    repo: "tensorflow/tensorflow",
    title: "Fix typo in XLA constants",
    url: "https://github.com/tensorflow/tensorflow/pull/107884",
  },
  {
    repo: "tensorflow/tensorflow",
    title: "Update assert_no_garbage_created docstring",
    url: "https://github.com/tensorflow/tensorflow/pull/107845",
  },
  {
    repo: "mlflow/mlflow",
    title: "Fix typo in PromoteModelButton",
    url: "https://github.com/mlflow/mlflow/pull/19820",
  },
  {
    repo: "OpenLightingProject/open-fixture-library",
    title: "Improve LabeledInput component",
    url: "https://github.com/OpenLightingProject/open-fixture-library/pull/5312",
  },
];

export default function OpenSource() {
  return (
    <section id="open-source" style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,72px)" }}>
      <style>{`
        .os-link:hover {
          color: var(--accent) !important;
        }
      `}</style>
      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative" }}>
        <AnimatedHeading section="06" text="Open Source" italic="Contributions" />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.9rem,0.85rem + 0.3vw,1.05rem)",
            fontWeight: 300,
            lineHeight: 1.7,
            color: "var(--ink-muted)",
          }}>
            4 PRs reviewed, approved, and merged by core maintainers of TensorFlow, MLflow, and OpenLightingProject.
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none", padding: 0 }}>
            {prs.map((pr) => (
              <li
                key={pr.url}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  borderBottom: "1px solid rgba(14,10,4,0.08)",
                  paddingBottom: 12,
                }}
              >
                <span style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "var(--ink)",
                }}>{pr.repo}</span>
                <Link
                  href={pr.url}
                  target="_blank"
                  className="os-link"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    color: "var(--ink-muted)",
                    textDecoration: "underline",
                    textUnderlineOffset: 4,
                    transition: "color 0.18s",
                  }}
                >
                  {pr.title} ↗
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
