const INK    = "var(--ink)";
const ACCENT = "var(--accent)";

const bullets = [
  "Built a RAG-based knowledge system using Pinecone and Gemini for internal document retrieval and AI-assisted querying, with streaming responses.",
  "Leading product execution for PIMS, a client-facing pharmacy management system for inventory, ERP, billing, and shipment tracking — requirements, sprint planning, and delivery — built on Node.js, React, Next.js, and Tailwind CSS.",
  "Deployed and manage two production projects on GCP — hosting, Vertex AI and Google AI Studio integrations, and API key / credential management.",
  "Set up CI/CD pipelines with GitHub Actions so changes merged to the repo deploy automatically, speeding up releases and reducing manual deployment overhead.",
];

import AnimatedHeading from "./AnimatedHeading";

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,72px)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative" }}>
        <AnimatedHeading section="02" text="Professional" italic="Experience" />

        <div style={{
          background: "var(--bg-card)",
          border: "1.5px solid rgba(14,10,4,0.10)",
          borderRadius: 12,
          padding: "clamp(20px,3vw,36px)",
        }}>
          <h2 style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1.1rem,0.9rem + 0.8vw,1.4rem)",
            fontWeight: 600,
            color: INK,
            lineHeight: 1.3,
            marginBottom: 6,
          }}>Software Development Engineer — Ecovis RKCA</h2>

          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(14,10,4,0.40)",
            marginBottom: 20,
          }}>Feb 2026 – Present · Full-time</p>

          <ul style={{ paddingLeft: 18, display: "flex", flexDirection: "column", gap: 12 }}>
            {bullets.map((b, i) => (
              <li key={i} style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.85rem,0.8rem + 0.25vw,0.95rem)",
                fontWeight: 300,
                color: "var(--ink-muted)",
                lineHeight: 1.7,
                listStyleType: "disc",
              }}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
