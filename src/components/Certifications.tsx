import AnimatedHeading from "./AnimatedHeading";

const ACCENT = "var(--accent)";

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
    <section id="certifications" style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,72px)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative" }}>
        <AnimatedHeading section="05" text="Licenses &" italic="Certifications" />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(260px,100%), 1fr))",
          gap: "clamp(10px,1.5vw,16px)",
        }}>
          {certs.map((c) => (
            <div key={c.title} className="cert-card" style={{
              background: "var(--bg-card)",
              border: "1.5px solid rgba(14,10,4,0.10)",
              borderRadius: 12,
              padding: "clamp(16px,2vw,24px)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}>
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
      </div>
    </section>
  );
}
