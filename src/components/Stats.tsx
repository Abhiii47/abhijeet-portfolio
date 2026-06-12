"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const stats = [
  {
    label: "Amazon ML Summer School",
    value: "Top 0.1%",
    detail: "of 100,000+ applicants nationally · 2025",
  },
  {
    label: "Status",
    value: "Open to full-time roles",
    detail: "June 2026 · remote & relocation",
  },
  {
    label: "Resumes scored",
    value: "50K+",
    detail: "via SmartResume ATS engine",
  },
  {
    label: "GCP projects",
    value: "2",
    detail: "deployed & managed in production — Vertex AI, Google AI Studio",
  },
  {
    label: "Shipped",
    value: "7",
    detail: "projects in production",
  },
];

export function Stats() {
  const prefersReducedMotion = useReducedMotion();
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;
    // your existing count-up logic can read from stats[].value as the target
  }, [prefersReducedMotion]);

  return (
    <section className="py-16">
      <div className="grid gap-8 md:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-1">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {stat.label}
            </p>
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
