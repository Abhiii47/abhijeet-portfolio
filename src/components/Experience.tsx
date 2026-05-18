"use client";

import { useRef, useEffect, useState } from "react";

const experiences = [
  {
    role: "Software Development Engineer & Product Manager",
    company: "Ecovis RKCA",
    period: "2024 – Present",
    color: "#a78bfa",
    badge: "Full-Time",
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
    badge: "Project",
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
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full py-32 px-6 md:px-12"
    >
      {/* Ghost section number */}
      <span
        className="absolute right-0 top-16 font-serif text-[18vw] font-black select-none pointer-events-none leading-none"
        style={{
          WebkitTextStroke: "1px rgba(167,139,250,0.04)",
          color: "transparent",
        }}
        aria-hidden
      >
        05
      </span>

      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase mb-4">
            05 / Experience
          </p>
          <h2
            className="font-serif font-black leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              WebkitTextStroke: "1px rgba(240,237,232,0.15)",
              color: "transparent",
            }}
          >
            Where I&apos;ve
          </h2>
          <h2
            className="font-serif font-black leading-tight -mt-2"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Shipped.
          </h2>
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {experiences.map((exp, i) => {
            const isFirst = i === 0;
            return (
              <div
                key={i}
                className="relative pl-8 group cursor-pointer"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-30px)",
                  transition: `opacity 0.7s ease ${i * 120}ms, transform 0.7s ease ${i * 120}ms`,
                }}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                {/* Vertical line */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-px"
                  style={{
                    background:
                      activeIdx === i
                        ? `linear-gradient(to bottom, ${exp.color}80, ${exp.color}20)`
                        : `${exp.color}22`,
                    transition: "background 0.35s ease",
                  }}
                />

                {/* Timeline dot */}
                <div
                  className="absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full z-10 transition-all duration-300"
                  style={{
                    background: exp.color,
                    boxShadow:
                      activeIdx === i
                        ? `0 0 16px ${exp.color}, 0 0 6px ${exp.color}`
                        : `0 0 8px ${exp.color}60`,
                    transform: activeIdx === i ? "scale(1.3)" : "scale(1)",
                  }}
                />

                {/* Card */}
                <div
                  className="py-8 px-6 mb-px rounded-xl transition-all duration-300"
                  style={{
                    background:
                      activeIdx === i
                        ? `linear-gradient(135deg, ${exp.color}08 0%, transparent 60%)`
                        : "transparent",
                    border:
                      activeIdx === i
                        ? `1px solid ${exp.color}20`
                        : "1px solid transparent",
                  }}
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                    <div>
                      {isFirst && (
                        <span
                          className="inline-block font-mono text-[9px] px-2 py-0.5 rounded-full mb-2 tracking-widest uppercase"
                          style={{
                            background: `${exp.color}18`,
                            color: exp.color,
                            border: `1px solid ${exp.color}30`,
                          }}
                        >
                          ● Current Role
                        </span>
                      )}
                      <h3 className="font-serif font-bold text-white text-xl leading-tight">
                        {exp.role}
                      </h3>
                      <p
                        className="font-mono text-[11px] mt-1"
                        style={{ color: exp.color }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className="font-mono text-[10px] px-3 py-1 rounded-full border tracking-widest"
                        style={{ borderColor: `${exp.color}30`, color: exp.color }}
                      >
                        {exp.period}
                      </span>
                      <span
                        className="font-mono text-[9px] px-2 py-0.5 rounded-full tracking-wider"
                        style={{
                          background: `${exp.color}12`,
                          color: `${exp.color}cc`,
                        }}
                      >
                        {exp.badge}
                      </span>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span
                          className="mt-[6px] w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: exp.color }}
                        />
                        <span className="font-mono text-[11px] text-gray-400 leading-relaxed">
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
