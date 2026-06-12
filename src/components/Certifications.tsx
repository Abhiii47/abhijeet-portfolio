export default function Certifications() {
  return (
    <section id="certifications" className="space-y-8 py-16">
      <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
        05 Certifications
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-background/40 p-5 space-y-2">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">Microsoft · Feb 2026</p>
          <p className="text-base font-medium text-foreground leading-snug">
            Fabric Analytics Engineer Associate
          </p>
          <p className="text-xs text-muted-foreground">DP-600 · MS Fabric · Spark · Lakehouse · Power BI · ETL</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-background/40 p-5 space-y-2">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">Amazon · 2025</p>
          <p className="text-base font-medium text-foreground leading-snug">
            Amazon ML Summer School
          </p>
          <p className="text-xs text-muted-foreground">Top 0.1% national selection · Supervised learning · XGBoost · Feature engineering · Model evaluation</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-background/40 p-5 space-y-2">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">Govt. of India · 2025</p>
          <p className="text-base font-medium text-foreground leading-snug">
            Design Patent № 458179-001
          </p>
          <p className="text-xs text-muted-foreground">Smart Inventory System</p>
        </div>
      </div>
    </section>
  );
}
