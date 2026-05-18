"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  { value: "Top 0.1%",  label: "Amazon ML School",    sub: "of 100k+ applicants" },
  { value: "50k+",      label: "Resumes Analyzed",     sub: "by SmartResume AI" },
  { value: "92%+",      label: "Model Accuracy",       sub: "XGBoost ATS classifier" },
  { value: "5",         label: "Projects Shipped",     sub: "end-to-end in production" },
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Stagger text lines
    gsap.from(".about-line", {
      scrollTrigger: { trigger: containerRef.current, start: "top 72%" },
      y: 40, opacity: 0, duration: 0.9,
      stagger: 0.12, ease: "power3.out",
    });

    // ID card
    gsap.from(".id-card", {
      scrollTrigger: { trigger: containerRef.current, start: "top 60%" },
      x: 60, opacity: 0, duration: 1.1, ease: "power3.out", delay: 0.15,
    });

    // Metrics
    gsap.from(".metric-item", {
      scrollTrigger: { trigger: ".metrics-grid", start: "top 88%" },
      y: 30, opacity: 0, duration: 0.6,
      stagger: 0.08, ease: "back.out(1.5)",
    });
  }, { scope: containerRef });

  return (
    <section
      id="about"
      ref={containerRef}
      className="w-full min-h-screen px-6 py-28 md:px-12 flex flex-col justify-center relative"
    >
      {/* Section ghost number */}
      <span className="absolute right-6 top-1/2 -translate-y-1/2 font-serif text-[18vw] font-black text-white/[0.025] select-none pointer-events-none leading-none" aria-hidden>02</span>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* ── LEFT: text ── */}
        <div className="space-y-12">
          <h2 className="about-line font-mono text-[11px] tracking-[0.3em] text-accent uppercase">
            01 / About Me
          </h2>

          <div className="space-y-6">
            <p className="about-line font-serif text-2xl md:text-3xl leading-snug text-white">
              <span className="text-accent">SDE &amp; Product Manager</span> at Ecovis RKCA &mdash;
              shipping cloud infrastructure and AI-powered products from architecture to production.
            </p>
            <p className="about-line text-base text-gray-400 leading-relaxed max-w-lg">
              At <span className="text-white font-medium">Ecovis RKCA</span>, I lead cloud migration on AWS/Azure, build internal tooling in Next.js, and drive product strategy across engineering teams.
              Previously selected for <span className="text-white font-medium">Amazon ML Summer School</span> (Top 0.1% of 100,000+ applicants) and interned at Microsoft on MS Fabric pipelines.
            </p>
            <p className="about-line text-base text-gray-400 leading-relaxed max-w-lg">
              When I&apos;m not building products, I&apos;m prototyping indie games, designing web experiences,
              or exploring AI tooling that automates real business workflows.
            </p>
          </div>

          {/* Metrics grid */}
          <div className="metrics-grid grid grid-cols-2 gap-3">
            {METRICS.map(m => (
              <div
                key={m.label}
                className="metric-item p-5 bg-white/[0.03] rounded-lg border border-white/[0.06] hover:border-accent/25 transition-colors duration-300"
              >
                <p className="text-2xl md:text-3xl font-black text-white font-serif">{m.value}</p>
                <p className="text-[11px] font-mono tracking-widest uppercase text-accent mt-1">{m.label}</p>
                <p className="text-xs text-gray-600 mt-0.5">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: ID card ── */}
        <div className="hidden lg:flex justify-center perspective-1000">
          <div className="id-card w-80 h-[460px] relative transition-all duration-700 transform-style-3d group hover:rotate-y-180">

            {/* FRONT */}
            <div className="absolute inset-0 backface-hidden bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 overflow-hidden noise-overlay">
              <div className="flex justify-between items-start mb-8">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/15">
                  <Image src="/profile.jpg" alt="Abhijeet Kadu" fill className="object-cover grayscale" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/8 to-transparent animate-scan-fast" />
                </div>
                <div className="text-right">
                  <p className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">ID Verified</p>
                  <p className="font-mono text-accent text-lg font-bold mt-1">#ABHI-01</p>
                  <div className="flex items-center justify-end gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[9px] text-emerald-400">ACTIVE</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 font-mono text-[11px] text-gray-500">
                {[
                  ["Class",   "Computer Engineer"],
                  ["Role",    "SDE & Product Manager"],
                  ["Company", "Ecovis RKCA"],
                  ["Origin",  "Mumbai, IN"],
                  ["Status",  "Available"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-white/[0.05] pb-2">
                    <span>{k}</span>
                    <span className={k === "Status" ? "text-emerald-400 animate-pulse" : "text-white"}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Skill tags */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {["Next.js", "AWS", "Azure", "PyTorch", "FastAPI"].map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-5 left-6 right-6">
                <div className="h-7 w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.12)_2px,rgba(255,255,255,0.12)_4px)]" />
                <p className="text-[8px] font-mono text-gray-700 mt-1.5 text-center tracking-[0.3em] uppercase">Authorized Personnel Only</p>
              </div>
            </div>

            {/* BACK */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden border border-accent/15 bg-black">
              <Image src="/profile-full.png" alt="Abhijeet Kadu Full" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono font-bold text-accent tracking-widest text-sm">ABHIJEET KADU</p>
                <p className="font-mono text-gray-500 text-[10px] tracking-[0.3em] uppercase mt-1">SDE &amp; Product Manager</p>
                <a
                  href="mailto:abhijeetkadu007@gmail.com"
                  className="inline-block mt-3 px-3 py-1.5 bg-accent/10 border border-accent/30 rounded text-[10px] font-mono text-accent hover:bg-accent/20 transition-colors"
                >
                  abhijeetkadu007@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
