"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";
import { Mail, Github, Linkedin, Copy, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "abhijeetkadu10@gmail.com";

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(() => {
    gsap.from(".contact-reveal", {
      opacity: 0, y: 50,
      duration: 1, stagger: 0.15, ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
    });
  }, { scope: containerRef });

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full py-40 px-6 md:px-12 overflow-hidden"
    >
      {/* Ghost label */}
      <span
        className="absolute left-0 top-16 font-serif font-black select-none pointer-events-none leading-none"
        style={{
          fontSize: "clamp(8rem, 22vw, 18rem)",
          WebkitTextStroke: "1px rgba(132,204,22,0.03)",
          color: "transparent",
        }}
        aria-hidden
      >
        06
      </span>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Label */}
        <p className="contact-reveal font-mono text-[11px] tracking-[0.3em] text-accent uppercase mb-8">
          06 / Contact
        </p>

        {/* Big heading */}
        <div className="contact-reveal mb-16">
          <h2
            className="font-serif font-black leading-[0.9] tracking-tighter"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)", WebkitTextStroke: "1px rgba(240,237,232,0.12)", color: "transparent" }}
          >
            Let&apos;s
          </h2>
          <h2
            className="font-serif font-black leading-[0.9] tracking-tighter text-white"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            Talk.
          </h2>
        </div>

        {/* Two-col layout */}
        <div className="contact-reveal grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          {/* Left — email */}
          <div className="space-y-6">
            <p className="font-serif italic text-gray-500 text-base leading-relaxed">
              Open to AI/ML roles, research collaborations,<br />
              and interesting problems worth solving.
            </p>

            {/* Email copy button */}
            <div
              className="flex items-center gap-3 group cursor-pointer"
              onClick={copyEmail}
            >
              <div
                className="flex items-center gap-3 px-5 py-3.5 rounded-xl border transition-all duration-300"
                style={{
                  border: copied ? "1px solid rgba(132,204,22,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  background: copied ? "rgba(132,204,22,0.06)" : "#0f0f0f",
                }}
              >
                <Mail className="w-4 h-4" style={{ color: copied ? "#84cc16" : "#525252" }} />
                <span
                  className="font-mono text-sm"
                  style={{ color: copied ? "#84cc16" : "#a3a3a3" }}
                >
                  {EMAIL}
                </span>
                {copied
                  ? <Check className="w-3.5 h-3.5 text-accent ml-2" />
                  : <Copy className="w-3.5 h-3.5 text-gray-700 ml-2 group-hover:text-gray-400 transition-colors" />}
              </div>
            </div>
          </div>

          {/* Right — links + CTA */}
          <div className="flex flex-col items-start md:items-end gap-6">
            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Abhiii47"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-xs text-gray-600 hover:text-white transition-colors duration-200 tracking-widest uppercase"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <span className="text-gray-800">·</span>
              <a
                href="https://www.linkedin.com/in/abhijeet-kadu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-xs text-gray-600 hover:text-white transition-colors duration-200 tracking-widest uppercase"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>

            {/* CTA */}
            <MagneticButton
              tag="a"
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-black font-mono text-[11px] tracking-[0.25em] uppercase rounded-full font-bold hover:bg-lime-400 transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              Send a Message
            </MagneticButton>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="contact-reveal mt-24 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span className="font-mono text-[10px] text-gray-700 tracking-[0.2em] uppercase">
            Abhijeet Kadu · Mumbai, India · 2025
          </span>
          <span className="font-mono text-[10px] text-gray-700 tracking-[0.2em] uppercase">
            Built with Next.js · Deployed on Vercel
          </span>
        </div>
      </div>
    </section>
  );
}
