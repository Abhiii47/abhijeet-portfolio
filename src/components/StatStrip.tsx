"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const ROW_A = [
  "TOP 0.1% AMAZON ML",
  "✶",
  "99.9% CLOUD UPTIME",
  "✶",
  "2M+ ROWS / DAY",
  "✶",
  "DP-600 CERTIFIED",
  "✶",
  "60% FASTER REPORTING",
  "✶",
  "5 PRODUCTS SHIPPED",
  "✶",
  "CI/CD 2-DAY CYCLES",
  "✶",
];

const ROW_B = [
  "SDE & PRODUCT MANAGER",
  "·",
  "ECOVIS RKCA",
  "·",
  "MICROSOFT MS FABRIC",
  "·",
  "AWS / AZURE",
  "·",
  "NEXT.JS + TYPESCRIPT",
  "·",
  "FASTAPI + PYTORCH",
  "·",
  "MUMBAI, INDIA",
  "·",
];

function MarqueeRow({ items, direction = 1, speed = 38 }: { items: string[]; direction?: 1 | -1; speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = trackRef.current;
    if (!el) return;
    const w = el.scrollWidth / 2;
    gsap.fromTo(
      el,
      { x: direction === 1 ? 0 : -w },
      { x: direction === 1 ? -w : 0, duration: speed, ease: "none", repeat: -1 }
    );
  });

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden w-full">
      <div ref={trackRef} className="flex items-center gap-0 whitespace-nowrap will-change-transform">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[10px] tracking-[0.28em] px-4 shrink-0"
            style={{
              color: item === "✶" ? "#84cc16" : item === "·" ? "rgba(132,204,22,0.4)" : "rgba(240,237,232,0.18)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function StatStrip() {
  return (
    <div className="relative w-full py-5 overflow-hidden select-none" aria-hidden>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(132,204,22,0.12), transparent)" }} />
      <div className="flex flex-col gap-3">
        <MarqueeRow items={ROW_A} direction={1}  speed={42} />
        <MarqueeRow items={ROW_B} direction={-1} speed={36} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(132,204,22,0.12), transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24" style={{ background: "linear-gradient(90deg, #04040F, transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24" style={{ background: "linear-gradient(270deg, #04040F, transparent)" }} />
    </div>
  );
}
