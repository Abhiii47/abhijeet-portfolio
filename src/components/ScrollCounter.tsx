"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",           label: "Intro" },
  { id: "about",          label: "About" },
  { id: "skills",         label: "Skills" },
  { id: "projects",       label: "Work" },
  { id: "experience",     label: "Exp" },
  { id: "contact",        label: "Contact" },
];

export default function ScrollCounter() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((sec, i) => {
      const el = document.getElementById(sec.id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-[200] hidden lg:flex flex-col items-end gap-3"
      aria-hidden
    >
      {SECTIONS.map((sec, i) => {
        const isActive = i === active;
        return (
          <button
            key={sec.id}
            onClick={() =>
              document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex items-center gap-2"
            title={sec.label}
          >
            {/* Label */}
            <span
              className="font-mono text-[9px] tracking-[0.25em] uppercase transition-all duration-300"
              style={{
                color: isActive ? "#84cc16" : "transparent",
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateX(0)" : "translateX(8px)",
              }}
            >
              {sec.label}
            </span>

            {/* Dot */}
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width:  isActive ? "20px" : "4px",
                height: "3px",
                background: isActive ? "#84cc16" : "rgba(240,237,232,0.2)",
              }}
            />
          </button>
        );
      })}

      {/* Fraction counter */}
      <div className="mt-4 font-mono text-[10px] text-gray-700 tabular-nums text-right">
        <span style={{ color: "#84cc16" }}>
          {String(active + 1).padStart(2, "0")}
        </span>
        <span className="mx-0.5">/</span>
        <span>{String(SECTIONS.length).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
