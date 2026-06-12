const INK    = "#0E0A04";
const ACCENT = "#C4400A";

const bullets = [
  "Built a RAG-based knowledge system using Pinecone and Gemini for internal document retrieval and AI-assisted querying, with streaming responses.",
  "Leading product execution for PIMS, a client-facing pharmacy management system for inventory, ERP, billing, and shipment tracking — requirements, sprint planning, and delivery — built on Node.js, React, Next.js, and Tailwind CSS.",
  "Deployed and manage two production projects on GCP — hosting, Vertex AI and Google AI Studio integrations, and API key / credential management.",
  "Set up CI/CD pipelines with GitHub Actions so changes merged to the repo deploy automatically, speeding up releases and reducing manual deployment overhead.",
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "clamp(48px,7vw,96px) 0" }}>
      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.62rem",
        letterSpacing: "0.38em",
        textTransform: "uppercase",
        color: ACCENT,
        marginBottom: "clamp(24px,3vw,40px)",
      }}>02 Experience</p>

      <div style={{
        background: "var(--bg-card)",
        border: "1.5px solid rgba(14,10,4,0.10)",
        borderRadius: 10,
        padding: "clamp(20px,3vw,36px)",
      }}>
        <div style={{ marginBottom: 6 }}>
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
          }}>Feb 2026 – Present · Full-time</p>
        </div>

        <ul style={{ marginTop: 20, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 12 }}>
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
    </section>
  );
}
