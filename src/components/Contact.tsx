"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github, Linkedin, Mail, Copy, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "abhijeetkadu471@gmail.com";

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  useGSAP(() => {
    gsap.from(".cta-el", {
      scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
      y: 50, opacity: 0, duration: 0.9,
      stagger: 0.1, ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full min-h-[80vh] flex flex-col items-center justify-center px-6 py-28 text-center overflow-hidden"
    >
      {/* Ghost text */}
      <span
        className="absolute font-serif font-black text-[22vw] text-white/[0.025] select-none pointer-events-none leading-none top-1/2 -translate-y-1/2"
        aria-hidden
      >
        Hi.
      </span>

      <div className="relative z-10 max-w-2xl">
        <p className="cta-el font-mono text-[11px] tracking-[0.3em] text-accent uppercase mb-8">
          07 / Get In Touch
        </p>

        <h2 className="cta-el font-serif text-5xl md:text-7xl font-black text-foreground leading-none tracking-tight mb-6">
          Let&apos;s build<br />
          <span className="text-accent">something</span> great.
        </h2>

        <p className="cta-el text-base text-muted-foreground leading-relaxed mb-12 max-w-md mx-auto">
          Open to full-time AI/ML roles, research internships, and meaningful collaborations.
          I respond within 24 hours.
        </p>

        {/* Email block */}
        <div className="cta-el flex items-center justify-center gap-3 mb-10">
          <a
            href={`mailto:${EMAIL}`}
            className="font-mono text-sm md:text-base text-foreground hover:text-accent transition-colors duration-200 border-b border-foreground/20 hover:border-accent pb-0.5"
          >
            {EMAIL}
          </a>
          <button
            onClick={handleCopy}
            aria-label="Copy email"
            className="flex items-center justify-center w-8 h-8 border border-border/40 rounded-full hover:border-accent/50 hover:text-accent text-muted-foreground transition-all duration-200"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Social links */}
        <div className="cta-el flex items-center justify-center gap-4 mb-16">
          <a
            href="https://github.com/Abhiii47"
            target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 border border-border/40 rounded-full text-[12px] font-mono text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-all duration-300"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="https://linkedin.com/in/abhijeet-kadu"
            target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 border border-border/40 rounded-full text-[12px] font-mono text-muted-foreground hover:border-accent/50 hover:text-accent transition-all duration-300"
          >
            <Linkedin className="w-3.5 h-3.5" />
            LinkedIn
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 bg-accent/10 border border-accent/30 rounded-full text-[12px] font-mono text-accent hover:bg-accent/20 transition-all duration-300"
          >
            <Mail className="w-3.5 h-3.5" />
            Resume
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* Footer note */}
        <p className="cta-el font-mono text-[10px] tracking-[0.25em] text-muted-foreground/50 uppercase">
          Designed &amp; built by Abhijeet Kadu &nbsp;·&nbsp; 2026
        </p>
      </div>
    </section>
  );
}
