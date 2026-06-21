"use client";

const ACCENT = "#C4400A";
const INK    = "rgba(14,10,4,0.30)";

const ROW1 = [
  "FastAPI", "Next.js", "AWS", "GCP", "XGBoost", "PostgreSQL",
  "TypeScript", "Docker", "RAG", "Vertex AI", "FAISS", "Socket.io",
  "LangChain", "OAuth2", "CI/CD", "Python",
];

const ROW2 = [
  "Building systems that scale",
  "Open to 2026 roles",
  "Mumbai · India",
  "Top 0.1% · Amazon ML",
  "50K+ resumes processed",
  "99.9% cloud uptime",
  "SDE & Product Manager",
  "Available June 2026",
];

function MarqueeTrack({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div style={{
      overflow: "hidden", width: "100%",
      maskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
    }}>
      <div
        className={reverse ? "marquee-track-rev" : "marquee-track"}
        style={{ display: "flex", alignItems: "center", width: "max-content", willChange: "transform" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex", alignItems: "center", gap: 0,
              fontFamily: "var(--font-mono)",
              fontSize: 11, letterSpacing: "0.20em",
              fontWeight: 700,
              textTransform: "uppercase",
              color: INK, whiteSpace: "nowrap",
              padding: "0 22px",
              transition: "color 0.18s", cursor: "default",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
            onMouseLeave={e => (e.currentTarget.style.color = INK)}
          >
            {item}
            <span style={{
              display: "inline-block", marginLeft: 22,
              width: 4, height: 4, borderRadius: "50%",
              background: "rgba(196,64,10,0.40)", flexShrink: 0,
            }} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <>
      <style>{`
        @keyframes marquee-left  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .marquee-track     { animation: marquee-left  30s linear infinite; }
        .marquee-track-rev { animation: marquee-right 26s linear infinite; }
        .marquee-section:hover .marquee-track,
        .marquee-section:hover .marquee-track-rev { animation-play-state: paused; }
      `}</style>

      <div
        className="marquee-section"
        style={{
          background: "var(--bg-base)",
          borderTop: "1px solid rgba(14,10,4,0.07)",
          borderBottom: "1px solid rgba(14,10,4,0.07)",
          padding: "20px 0",
          display: "flex", flexDirection: "column", gap: 16,
          overflow: "hidden", userSelect: "none",
        }}
      >
        <MarqueeTrack items={ROW1} reverse={false} />
        <MarqueeTrack items={ROW2} reverse={true}  />
      </div>
    </>
  );
}
