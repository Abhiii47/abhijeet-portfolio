import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-between py-16">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
          01 Hero
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
          Abhijeet Kadu builds things that ship.
        </h1>
        <p className="max-w-xl text-base text-muted-foreground md:text-lg">
          Full-stack & ML engineer — from Jupyter notebooks to production deployments. Mumbai-based, globally useful.
        </p>
        <p className="text-sm font-medium text-muted-foreground">
          50K+ resumes scored · 4 PRs merged into TensorFlow & MLflow · Top 0.1% — Amazon ML Summer School
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <span className="rounded-full border border-border/60 bg-background/40 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Open to full-time roles · June 2026
          </span>
          <div className="flex gap-3">
            <Link
              href="#projects"
              className="rounded-full bg-foreground px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-background"
            >
              View Work ↗
            </Link>
            <Link
              href="#contact"
              className="rounded-full border border-foreground/50 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
