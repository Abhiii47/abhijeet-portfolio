"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CERTS = [
  {
    title: "Microsoft Fabric Analytics Engineer",
    issuer: "Microsoft",
    code: "DP-600",
    year: "2024",
    link: "#",
    color: "#00a4ef",
  },
  {
    title: "Amazon ML Summer School",
    issuer: "Amazon",
    code: "Top 0.1%",
    year: "2024",
    link: "#",
    color: "#ff9900",
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    code: "Coursera",
    year: "2023",
    link: "#",
    color: "#06b6d4",
  },
  {
    title: "Google Cloud Fundamentals",
    issuer: "Google Cloud",
    code: "GCP",
    year: "2023",
    link: "#",
    color: "#4285F4",
  },
];

export default function Certifications() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".cert-item", {
      scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      y: 30, opacity: 0, duration: 0.6,
      stagger: 0.08, ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="relative w-full py-28 px-6 md:px-12 bg-white/[0.015]"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase mb-16">
          05 / Certifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CERTS.map((cert) => (
            <a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-item group flex items-start gap-5 p-6 border border-white/[0.06] rounded-xl bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300"
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: cert.color + "18", border: `1px solid ${cert.color}30` }}
              >
                <Award className="w-5 h-5" style={{ color: cert.color }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-base font-bold text-white group-hover:text-accent transition-colors duration-200 leading-snug">
                    {cert.title}
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-accent flex-shrink-0 mt-0.5 transition-colors duration-200" />
                </div>
                <p className="font-mono text-[10px] text-gray-600 mt-1">{cert.issuer}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className="px-2 py-0.5 rounded text-[9px] font-mono"
                    style={{ background: cert.color + "18", color: cert.color }}
                  >
                    {cert.code}
                  </span>
                  <span className="font-mono text-[10px] text-gray-700">{cert.year}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
