"use client";

import { useRef, useEffect, useState } from "react";
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight } from "lucide-react";

const EMAIL = "abhijeetkadu47@gmail.com";

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" ref={containerRef} className="relative w-full py-32 px-6 md:px-12 overflow-hidden">
      {/* Ghost text */}
      <span
        className="absolute -right-4 top-8 font-serif text-[20vw] font-black select-none pointer-events-none leading-none"
        style={{ WebkitTextStroke: "1px rgba(132,204,22,0.03)", color: "transparent" }}
        aria-hidden
      >07</span>

      <div
        className="max-w-4xl mx-auto transition-all duration-1000"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
        }}
      >
        <p className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase mb-8">07 / Contact</p>

        {/* Giant heading */}
        <div className="mb-16">
          <h2
            className="font-serif font-black leading-none"
            style={{ fontSize: "clamp(4rem, 12vw, 10rem)", WebkitTextStroke: "1px rgba(240,237,232,0.12)", color: "transparent" }}
          >Let&apos;s</h2>
          <h2
            className="font-serif font-black leading-none -mt-4"
            style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
          >Talk.</h2>
        </div>

        {/* Email row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-12">
          <div>
            <p className="font-mono text-[10px] text-gray-700 tracking-widest uppercase mb-2">Email</p>
            <a
              href={`mailto:${EMAIL}`}
              className="font-mono text-lg text-white/80 hover:text-accent transition-colors"
            >
              {EMAIL}
            </a>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 font-mono text-[11px] px-4 py-2.5 rounded-full border transition-all duration-300 tracking-widest uppercase"
            style={{
              borderColor: copied ? "#84cc16" : "rgba(255,255,255,0.1)",
              color: copied ? "#84cc16" : "#666",
              background: copied ? "rgba(132,204,22,0.08)" : "transparent",
            }}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-12" style={{ background: "linear-gradient(90deg, rgba(132,204,22,0.3), transparent)" }} />

        {/* Social links */}
        <div className="flex flex-wrap gap-6">
          {[
            { icon: Github,   label: "GitHub",   href: "https://github.com/Abhiii47" },
            { icon: Linkedin, label: "LinkedIn",  href: "https://linkedin.com/in/abhijeet-kadu" },
            { icon: Mail,     label: "Email",     href: `mailto:${EMAIL}` },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-mono text-[11px] text-gray-600 hover:text-white transition-colors tracking-widest uppercase"
            >
              <Icon className="w-4 h-4" />
              {label}
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-20 font-mono text-[10px] text-gray-800 tracking-widest">
          ABHIJEET KADU · MUMBAI, IN · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}
