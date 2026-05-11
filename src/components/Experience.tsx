"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  {
    year: "2024",
    role: "Amazon ML Summer School",
    org: "Amazon",
    type: "Selective Program",
    tags: ["Deep Learning", "NLP", "Probabilistic Graphical Models", "Reinforcement Learning"],
    detail: "Selected in the top 0.1% of 100,000+ applicants. Completed 5 intensive ML modules covering advanced deep learning, NLP, PGMs and RL — directly from Amazon scientists.",
  },
  {
    year: "2022–2026",
    role: "B.E. Computer Engineering",
    org: "Sanjivani College of Engineering",
    type: "Education",
    tags: ["AI/ML", "DSA", "Cloud Computing", "DBMS"],
    detail: "CGPA 8.3 · Core coursework in machine learning, algorithms, cloud computing, and database systems. Active in hackathons and competitive programming.",
  },
  {
    year: "2024–25",
    role: "Microsoft Fabric Analytics Engineer",
    org: "Microsoft",
    type: "Certification",
    tags: ["DP-600", "Microsoft Fabric", "Data Lake", "ETL"],
    detail: "Industry-certified in Microsoft Fabric Analytics Engineering (DP-600). Hands-on with big data analytics, semantic models, and enterprise ETL pipelines.",
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".exp-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      y: 40, opacity: 0, duration: 0.8,
      stagger: 0.15, ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full py-28 px-6 md:px-12"
    >
      {/* Ghost number */}
      <span
        className="absolute right-6 top-20 font-serif text-[18vw] font-black text-white/[0.025] select-none pointer-events-none leading-none"
        aria-hidden
      >
        04
      </span>

      <div className="max-w-7xl mx-auto">
        <h2 className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase mb-16">
          04 / Experience &amp; Education
        </h2>

        <div className="space-y-0 divide-y divide-white/[0.05]">
          {EXPERIENCE.map((item, i) => (
            <div
              key={i}
              className="exp-card group py-10 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-12"
            >
              {/* Year */}
              <div className="font-mono text-[11px] text-gray-600 pt-1">{item.year}</div>

              {/* Content */}
              <div>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-black text-white group-hover:text-accent transition-colors duration-300">
                      {item.role}
                    </h3>
                    <p className="font-mono text-[11px] text-gray-500 mt-0.5">{item.org}</p>
                  </div>
                  <span className="px-2.5 py-1 border border-white/10 rounded-full font-mono text-[9px] text-gray-600 uppercase tracking-widest self-start">
                    {item.type}
                  </span>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mb-4">
                  {item.detail}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-full text-[10px] font-mono text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
