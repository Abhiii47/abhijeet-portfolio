export default function Contact() {
  return (
    <section id="contact" className="space-y-6 py-16">
      <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
        07 Contact
      </p>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Let&apos;s talk.</h2>
        <p className="text-sm text-muted-foreground">
          Email works best. For roles, collaborations, or questions about any project here, reach out and I&apos;ll reply as soon as I can.
        </p>
        <a
          href="mailto:abhijeetkadu471@gmail.com"
          className="inline-flex items-center rounded-full border border-border/70 bg-background/60 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-foreground hover:bg-background"
        >
          abhijeetkadu471@gmail.com
        </a>
        <div className="pt-4 text-xs text-muted-foreground">
          <span className="rounded-full border border-border/60 bg-background/40 px-3 py-1">
            Open to full-time roles · June 2026
          </span>
        </div>
      </div>
    </section>
  );
}
