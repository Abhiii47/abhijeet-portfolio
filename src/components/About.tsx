export default function About() {
  return (
    <section id="about" className="space-y-8 py-16">
      <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
        01 About
      </p>
      <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            I&apos;m a final-year Computer Engineering student and Software Development Engineer at Ecovis RKCA, focused on full-stack web applications and ML-powered systems. I like taking projects from vague idea to something that actually ships and gets used.
          </p>
          <p>
            Recently, that has meant building an internal RAG knowledge assistant using Pinecone and Gemini for fast, cited answers over company documents, hosted on GCP. I&apos;m also leading product execution on PIMS, a client-facing pharmacy management system for inventory, ERP, billing, and shipment tracking.
          </p>
          <p>
            Outside of work, I experiment with ML pipelines, analytics dashboards, and game prototypes. I care about clean implementations, clear UX, and making sure every project on this page either runs in production or has a real repository or merged PR behind it.
          </p>
        </div>
        <div className="space-y-4 text-xs text-muted-foreground">
          <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Quick facts
            </p>
            <div className="mt-3 space-y-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground/70">Currently</span>
                <span className="font-medium text-foreground">Ecovis RKCA — SDE</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground/70">Status</span>
                <span className="font-medium text-foreground">Open to full-time · June 2026</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground/70">Location</span>
                <span className="font-medium text-foreground">Mumbai, IN</span>
              </div>
            </div>
          </div>
          <a
            href="/resume.pdf"
            className="inline-flex w-full items-center justify-center rounded-full border border-border/70 bg-background/60 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-foreground hover:bg-background transition-colors"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
