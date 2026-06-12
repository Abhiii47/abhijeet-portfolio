const ACCENT = "#C4400A";

const certs = [
  {
    issuer: "Microsoft · Feb 2026",
    title: "Fabric Analytics Engineer Associate",
    sub: "DP-600 · MS Fabric · Spark · Lakehouse · Power BI · ETL",
  },
  {
    issuer: "Amazon · 2025",
    title: "Amazon ML Summer School",
    sub: "Top 0.1% national selection · Supervised learning · XGBoost · Feature engineering · Model evaluation",
  },
  {
    issuer: "Govt. of India · 2025",
    title: "Design Patent № 458179-001",
    sub: "Smart Inventory System",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" style={{ padding: "clamp(48px,7vw,96px) 0" }}>
      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.62rem",
        letterSpacing: "0.38em",
        textTransform: "uppercase",
        color: ACCENT,
        marginBottom: "clamp(24px,3vw,40px)",
      }}>05 Certifications</p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(260px,100%), 1fr))",
        gap: "clamp(10px,1.5vw,16px)",
      }}>
        {certs.map((c) => (
          <div key={c.title} style={{
            background: "var(--bg-card)",
            border: "1.5px solid rgba(14,10,4,0.10)",
            borderRadius: 10,
            padding: "clamp(16px,2vw,24px)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            transition: "border-color 0.22s, box-shadow 0.22s",
          }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "rgba(196,64,10,0.30)"; el.style.boxShadow = "0 8px 32px rgba(196,64,10,0.06)"; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(14,10,4,0.10)"; el.style.boxShadow = "none"; }}
          >
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(14,10,4,0.38)",
            }}>{c.issuer}</p>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.9rem,0.85rem + 0.2vw,1rem)",
              fontWeight: 600,
              color: "var(--ink)",
              lineHeight: 1.35,
            }}>{c.title}</p>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              fontWeight: 300,
              color: "var(--ink-muted)",
              lineHeight: 1.55,
            }}>{c.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
