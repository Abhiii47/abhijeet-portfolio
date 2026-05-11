"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardSpotlight from "./CardSpotlight";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    id: "ml", title: "Machine Learning", size: "large",
    tags: ["Scikit-learn", "PyTorch", "XGBoost", "Ensemble"],
    stat: "Top 0.1%", statLabel: "Amazon ML School",
    color: "#84cc16",
    desc: "Predictive modeling, feature engineering, ensemble methods. Competed in Amazon ML Summer School — top 0.1% of applicants.",
  },
  {
    id: "dl", title: "Deep Learning", size: "medium",
    tags: ["Transformers", "CNN", "NLP", "RAG"],
    stat: "3+", statLabel: "Production Models",
    color: "#ef4444",
    desc: "Transformer architectures, fine-tuning LLMs, RAG pipelines, NLP.",
  },
  {
    id: "data", title: "Data Engineering", size: "medium",
    tags: ["Pandas", "SQL", "ETL", "MS Fabric"],
    stat: "DP-600", statLabel: "Certified",
    color: "#3b82f6",
    desc: "End-to-end pipelines, complex SQL, ETL on Microsoft Fabric & GCP.",
  },
  {
    id: "backend", title: "Backend & APIs", size: "small",
    tags: ["FastAPI", "REST", "Supabase"],
    color: "#10b981",
    desc: "High-performance async APIs, Swagger docs, Postgres.",
  },
  {
    id: "cloud", title: "Cloud", size: "small",
    tags: ["GCP", "Vertex AI", "MS Fabric"],
    color: "#4285F4",
    desc: "Vertex AI, Cloud Functions, Data Lake architectures.",
  },
  {
    id: "viz", title: "Data Viz & BI", size: "small",
    tags: ["Power BI", "Matplotlib", "Plotly"],
    color: "#eab308",
    desc: "Business intelligence dashboards, statistical visualisations.",
  },
  {
    id: "cp", title: "Competitive Programming", size: "wide",
    tags: ["C++", "DSA", "Binary Search", "Graphs"],
    stat: "500+", statLabel: "Problems Solved",
    color: "#8b5cf6",
    desc: "Algorithmic problem solving, advanced data structures, optimisation.",
  },
  {
    id: "genai", title: "Generative AI", size: "medium",
    tags: ["LLMs", "Prompt Eng", "RAG", "Agents"],
    color: "#d946ef",
    desc: "LLM orchestration, prompt engineering, agentic workflows.",
  },
];

function sizeToClass(size: string) {
  switch (size) {
    case "large":  return "md:col-span-2 md:row-span-2";
    case "wide":   return "md:col-span-2";
    case "medium": return "md:col-span-1 md:row-span-1";
    default:       return "md:col-span-1";
  }
}

export default function BentoSkills() {
  const containerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useGSAP(() => {
    gsap.from(".bento-card", {
      opacity: 0, y: 40, scale: 0.96,
      duration: 0.7, stagger: 0.08, ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
    });
  }, { scope: containerRef });

  return (
    <section id="skills" ref={containerRef} className="relative w-full py-32 px-6 md:px-12 overflow-hidden">
      {/* Ghost label */}
      <span
        className="absolute -right-4 top-16 font-serif text-[18vw] font-black select-none pointer-events-none leading-none"
        style={{ WebkitTextStroke: "1px rgba(132,204,22,0.03)", color: "transparent" }}
        aria-hidden
      >03</span>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase mb-4">03 / Skills</p>
          <h2
            className="font-serif font-black leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", WebkitTextStroke: "1px rgba(240,237,232,0.15)", color: "transparent" }}
          >
            Technical Arsenal
          </h2>
          <h2
            className="font-serif font-black leading-tight -mt-2"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Built to Ship.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
          {skills.map((skill) => (
            <CardSpotlight
              key={skill.id}
              className={`bento-card cursor-pointer ${sizeToClass(skill.size)}`}
              spotlightColor={`${skill.color}15`}
            >
              <div
                className="relative h-full p-6 flex flex-col justify-between"
                onClick={() => setActive(active === skill.id ? null : skill.id)}
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div>
                    <p
                      className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2"
                      style={{ color: skill.color }}
                    >
                      {skill.tags.join(" · ")}
                    </p>
                    <h3 className="font-serif font-bold text-white/90 text-lg leading-tight">
                      {skill.title}
                    </h3>
                  </div>

                  {/* Stat badge */}
                  {skill.stat && (
                    <div className="text-right flex-shrink-0 ml-4">
                      <div
                        className="font-mono font-black tabular-nums"
                        style={{ fontSize: "clamp(1.2rem,2.5vw,1.8rem)", color: skill.color }}
                      >
                        {skill.stat}
                      </div>
                      <div className="font-mono text-[8px] text-gray-600 uppercase tracking-widest mt-0.5">
                        {skill.statLabel}
                      </div>
                    </div>
                  )}
                </div>

                {/* Description — shows on hover/active */}
                <p
                  className="font-mono text-[11px] text-gray-500 leading-relaxed transition-all duration-300"
                  style={{
                    opacity: active === skill.id ? 1 : 0,
                    transform: active === skill.id ? "translateY(0)" : "translateY(6px)",
                    maxHeight: active === skill.id ? "80px" : "0",
                    overflow: "hidden",
                  }}
                >
                  {skill.desc}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] transition-all duration-500"
                  style={{
                    width: active === skill.id ? "100%" : "0%",
                    background: `linear-gradient(90deg, ${skill.color}, transparent)`,
                    borderRadius: "0 0 12px 12px",
                  }}
                />

                {/* Corner dot */}
                <div
                  className="absolute bottom-4 right-4 w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: skill.color,
                    boxShadow: `0 0 ${active === skill.id ? '12px' : '4px'} ${skill.color}`,
                    opacity: 0.7,
                  }}
                />
              </div>
            </CardSpotlight>
          ))}
        </div>
      </div>
    </section>
  );
}
