"use client";

import { useRef, useEffect, useState } from "react";

const experiences = [
  {
    role: "Data Science Intern",
    company: "Microsoft (MS Fabric)",
    period: "2024",
    color: "#00a4ef",
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
    color: "#84cc16",
    points: [
      "Next.js + Supabase + Google Maps full-stack app",
      "Realtime DB with sub-300ms query response",
      "Auth, geo-search, filter system for student housing",
      "Live product with active user base",
    ],
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" ref={containerRef} className="relative w-full py-32 px-6 md:px-12">
      <span
        className="absolute right-0 top-16 font-serif text-[18vw] font-black select-none pointer-events-none leading-none"
        style={{ WebkitTextStroke: "1px rgba(132,204,22,0.03)", color: "transparent" }}
        aria-hidden
      >05</span>

      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase mb-4">05 / Experience</p>
          <h2
            className="font-serif font-black leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", WebkitTextStroke: "1px rgba(240,237,232,0.15)", color: "transparent" }}
          >Where I've</h2>
          <h2 className="font-serif font-black leading-tight -mt-2" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>Shipped.</h2>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="relative pl-8 border-l transition-all duration-700"
              style={{
                borderColor: `${exp.color}30`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-30px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div
                className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full"
                style={{ background: exp.color, boxShadow: `0 0 10px ${exp.color}` }}
              />
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <div>
                  <h3 className="font-serif font-bold text-white text-xl">{exp.role}</h3>
                  <p className="font-mono text-[11px] mt-0.5" style={{ color: exp.color }}>{exp.company}</p>
                </div>
                <span
                  className="font-mono text-[10px] px-3 py-1 rounded-full border tracking-widest"
                  style={{ borderColor: `${exp.color}30`, color: exp.color }}
                >{exp.period}</span>
              </div>
              <ul className="space-y-1.5">
                {exp.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                    <span className="font-mono text-[11px] text-gray-400">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
