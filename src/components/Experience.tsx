"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const experiences = [
  {
    role: "Software Development Engineer & Product Manager",
    company: "Ecovis RKCA",
    period: "2024 – Present",
    color: "#84cc16",
    badge: "Full-Time",
    current: true,
    points: [
      "Architected and migrated legacy infrastructure to cloud (AWS/Azure), improving system uptime to 99.9%",
      "Led product roadmap end-to-end — from requirement gathering to sprint delivery across cross-functional teams",
      "Built internal tooling with Next.js + TypeScript that reduced manual reporting time by 60%",
      "Designed scalable CI/CD pipelines on cloud; automated deployments cut release cycles from 2 weeks to 2 days",
      "Collaborated with stakeholders to define KPIs, driving data-informed product decisions and revenue insights",
    ],
  },
  {
    role: "Data Science Intern",
    company: "Microsoft (MS Fabric)",
    period: "2024",
    color: "#00a4ef",
    badge: "Internship",
    current: false,
    points: [
      "Built Bronze→Silver→Gold ETL pipelines on Microsoft Fabric",
      "Automated daily refresh for 2M+ row datasets",
      "Created Power BI semantic models and executive dashboards",
      "Earned DP-600 Fabric Analytics Engineer certification",
    ],
  },
  {
    role: "ML Competition — Amazon",
    company: "Amazon ML Summer School",
    period: "2024",
    color: "#f97316",
    badge: "Achievement",
    current: false,
    points: [
      "Top 0.1% of 100,000+ participants nationally",
      "Stacked XGBoost + LightGBM + CatBoost ensemble",
      "Custom SMOTE oversampling for class imbalance",
      "Selected for Amazon ML Summer School program",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Room & Food Finder",
    period: "2023",
    color: "#a3e635",
    badge: "Project",
    current: false,
    points: [
      "Next.js + Supabase + Google Maps full-stack app",
      "Realtime DB with sub-300ms query response",
      "Auth, geo-search, filter system for student housing",
      "Live product with active user base",
    ],
  },
];

/* ── GlowCard ──────────────────────────────────────────────── */
function GlowCard({ children, color, active }: { children: React.ReactNode; color: string; active: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, ${color}25, transparent 65%)`;
  }, [color]);

  const onMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.background = "transparent";
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative rounded-xl overflow-hidden transition-all duration-400"
      style={{
        background: active ? `linear-gradient(135deg, ${color}08 0%, rgba(255,255,255,0.015) 60%)` : "rgba(255,255,255,0.02)",
        border: `1px solid ${active ? color + "30" : "rgba(255,255,255,0.06)"}`,
        boxShadow: active ? `0 0 40px ${color}10, inset 0 0 0 1px ${color}20` : "none",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div ref={glowRef} className="absolute inset-0 rounded-xl pointer-events-none" style={{ zIndex: 0, transition: "background 0.07s ease" }} />
      {/* top shimmer on active */}
      {active && (
        <div className="absolute top-0 left-[5%] right-[5%] h-px pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, ${color}80, transparent)`, zIndex: 2 }} />
      )}
      <div className="relative" style={{ zIndex: 3 }}>{children}</div>
    </div>
  );
}

/* ── Experience ────────────────────────────────────────────────── */
export default function Experience() {
  const containerRef  = useRef<HTMLElement>(null);
  const lineRef       = useRef<HTMLDivElement>(null);
  const [visible, setVisible]     = useState(false);
  const [lineH, setLineH]         = useState(0);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  /* Intersection — trigger stagger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  /* Scroll — drive line height */
  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0,
        (window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.4)
      ));
      setLineH(progress * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="experience" ref={containerRef} className="relative w-full py-32 px-6 md:px-12">

      {/* Ghost number */}
      <span
        className="absolute right-0 top-16 font-serif text-[18vw] font-black select-none pointer-events-none leading-none"
        style={{ WebkitTextStroke: "1px rgba(132,204,22,0.04)", color: "transparent" }}
        aria-hidden
      >05</span>

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase mb-4">05 / Experience</p>
          <h2
            className="font-serif font-black leading-tight"
            style={{ fontSize: "clamp(2rem,5vw,4rem)", WebkitTextStroke: "1px rgba(240,237,232,0.15)", color: "transparent" }}
          >Where I&apos;ve</h2>
          <h2 className="font-serif font-black leading-tight -mt-2" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>Shipped.</h2>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Track — static dim line */}
          <div
            className="absolute left-[5px] top-0 bottom-0 w-px"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />

          {/* Fill — scroll-driven, multi-color gradient */}
          <div
            ref={lineRef}
            className="absolute left-[5px] top-0 w-px transition-none"
            style={{
              height: `${lineH}%`,
              background: "linear-gradient(to bottom, #84cc16, #00a4ef, #f97316, #a3e635)",
              boxShadow: "0 0 8px rgba(132,204,22,0.4)",
              transition: "height 0.1s linear",
            }}
          />

          <div className="space-y-0 pl-8">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="relative group"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-40px)",
                  transition: `opacity 0.7s ease ${i * 140}ms, transform 0.7s ease ${i * 140}ms`,
                }}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[27px] top-7 w-3 h-3 rounded-full z-10 transition-all duration-400"
                  style={{
                    background: exp.color,
                    boxShadow: activeIdx === i
                      ? `0 0 0 4px ${exp.color}20, 0 0 20px ${exp.color}80, 0 0 40px ${exp.color}30`
                      : `0 0 8px ${exp.color}50`,
                    transform: activeIdx === i ? "scale(1.5)" : "scale(1)",
                  }}
                />

                {/* Beam from dot on hover */}
                {activeIdx === i && (
                  <div
                    className="absolute -left-[27px] top-7 h-px pointer-events-none"
                    style={{
                      width: "32px",
                      background: `linear-gradient(90deg, ${exp.color}80, transparent)`,
                      zIndex: 9,
                    }}
                  />
                )}

                <GlowCard color={exp.color} active={activeIdx === i}>
                  <div className="py-8 px-6">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
                      <div>
                        {exp.current && (
                          <span
                            className="inline-flex items-center gap-1.5 font-mono text-[9px] px-2.5 py-1 rounded-full mb-2.5 tracking-widest uppercase"
                            style={{ background: `${exp.color}18`, color: exp.color, border: `1px solid ${exp.color}35` }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: exp.color }} />
                            Current Role
                          </span>
                        )}
                        <h3 className="font-serif font-bold text-white leading-tight" style={{ fontSize: "clamp(1rem,2vw,1.3rem)" }}>
                          {exp.role}
                        </h3>
                        <p className="font-mono text-[11px] mt-1.5 tracking-wide" style={{ color: exp.color }}>
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span
                          className="font-mono text-[10px] px-3 py-1 rounded-full border tracking-widest"
                          style={{ borderColor: `${exp.color}35`, color: exp.color }}
                        >
                          {exp.period}
                        </span>
                        <span
                          className="font-mono text-[9px] px-2.5 py-0.5 rounded-full tracking-wider"
                          style={{ background: `${exp.color}15`, color: `${exp.color}cc` }}
                        >
                          {exp.badge}
                        </span>
                      </div>
                    </div>

                    {/* Bullet points */}
                    <ul className="space-y-2.5">
                      {exp.points.map((pt, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 transition-all duration-300"
                          style={{
                            opacity: activeIdx === i ? 1 : 0.6,
                            transform: activeIdx === i ? "translateX(0)" : "translateX(-4px)",
                            transitionDelay: `${j * 40}ms`,
                          }}
                        >
                          <span
                            className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300"
                            style={{
                              background: exp.color,
                              boxShadow: activeIdx === i ? `0 0 6px ${exp.color}` : "none",
                            }}
                          />
                          <span className="font-mono text-[11px] text-gray-400 leading-relaxed">{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Bottom accent line — fills on hover */}
                    <div
                      className="mt-6 h-px transition-all duration-700 ease-out"
                      style={{
                        width: activeIdx === i ? "100%" : "0%",
                        background: `linear-gradient(90deg, ${exp.color}, transparent)`,
                      }}
                    />
                  </div>
                </GlowCard>

                {/* Spacer between cards */}
                {i < experiences.length - 1 && <div className="h-5" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
