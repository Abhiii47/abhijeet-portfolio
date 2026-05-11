"use client";

import { useRef, useEffect, useState } from "react";
import CardSpotlight from "./CardSpotlight";

const certs = [
  {
    title: "DP-600: Fabric Analytics Engineer",
    issuer: "Microsoft",
    year: "2024",
    color: "#00a4ef",
    icon: "🏆",
    desc: "End-to-end analytics on Microsoft Fabric — ETL, lakehouses, semantic models, Power BI.",
  },
  {
    title: "Amazon ML Summer School",
    issuer: "Amazon",
    year: "2024",
    color: "#f97316",
    icon: "🎯",
    desc: "Top 0.1% selection. Advanced ML theory: probabilistic models, deep learning, RL, sequential models.",
  },
  {
    title: "Google Data Analytics",
    issuer: "Google / Coursera",
    year: "2023",
    color: "#4285F4",
    icon: "📊",
    desc: "Data cleaning, analysis, visualisation using SQL, R, Tableau, and spreadsheets.",
  },
  {
    title: "Python for Data Science",
    issuer: "IBM / Coursera",
    year: "2023",
    color: "#84cc16",
    icon: "🐍",
    desc: "Python, Pandas, NumPy, data wrangling and exploratory data analysis workflows.",
  },
  {
    title: "Deep Learning Specialisation",
    issuer: "DeepLearning.AI",
    year: "2024",
    color: "#d946ef",
    icon: "🧠",
    desc: "Neural networks, CNNs, RNNs, structuring ML projects, optimisation algorithms.",
  },
  {
    title: "GCP Professional Data Engineer",
    issuer: "Google Cloud",
    year: "2024",
    color: "#34a853",
    icon: "☁️",
    desc: "Designing data processing systems, building pipelines, deploying ML models on Vertex AI.",
  },
];

export default function Certifications() {
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
    <section id="certifications" ref={containerRef} className="relative w-full py-32 px-6 md:px-12">
      <span
        className="absolute -right-4 top-16 font-serif text-[18vw] font-black select-none pointer-events-none leading-none"
        style={{ WebkitTextStroke: "1px rgba(132,204,22,0.03)", color: "transparent" }}
        aria-hidden
      >06</span>

      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase mb-4">06 / Certifications</p>
          <h2
            className="font-serif font-black leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", WebkitTextStroke: "1px rgba(240,237,232,0.15)", color: "transparent" }}
          >Proof of</h2>
          <h2 className="font-serif font-black leading-tight -mt-2" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>Mastery.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((cert, i) => (
            <CardSpotlight
              key={i}
              spotlightColor={`${cert.color}12`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
                transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl">{cert.icon}</span>
                  <div className="text-right">
                    <span
                      className="font-mono text-[9px] px-2 py-0.5 rounded-full border"
                      style={{ color: cert.color, borderColor: `${cert.color}30` }}
                    >{cert.year}</span>
                  </div>
                </div>
                <h3 className="font-serif font-bold text-white/90 text-sm leading-snug mb-1">{cert.title}</h3>
                <p className="font-mono text-[10px] mb-3" style={{ color: cert.color }}>{cert.issuer}</p>
                <p className="font-mono text-[10px] text-gray-600 leading-relaxed">{cert.desc}</p>
                <div
                  className="mt-4 h-px"
                  style={{ background: `linear-gradient(90deg, ${cert.color}40, transparent)` }}
                />
              </div>
            </CardSpotlight>
          ))}
        </div>
      </div>
    </section>
  );
}
