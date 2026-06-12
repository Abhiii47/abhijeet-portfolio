"use client";

import { useEffect, useRef, useState } from "react";

export default function TracingBeam({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beamRef      = useRef<HTMLDivElement>(null);
  const dotRef       = useRef<HTMLDivElement>(null);
  const [beamHeight, setBeamHeight] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const beam      = beamRef.current;
    const dot       = dotRef.current;
    if (!container || !beam || !dot) return;

    const onScroll = () => {
      const { top, height } = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      // progress 0→1 as the container scrolls through viewport
      const progress = Math.min(Math.max(-top / (height - windowH), 0), 1);
      const fill = progress * height;
      setBeamHeight(fill);

      // dot follows scroll
      const dotY = Math.min(fill, height - 8);
      dot.style.transform = `translateY(${dotY}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Left spine */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px hidden md:block" style={{ zIndex: 10 }}>
        {/* Track */}
        <div className="absolute inset-0 bg-white/[0.04]" />

        {/* Filled beam */}
        <div
          ref={beamRef}
          className="absolute top-0 left-0 w-full origin-top transition-none"
          style={{
            height: `${beamHeight}px`,
            background: "linear-gradient(to bottom, transparent, #84cc16 10%, #84cc16 90%, transparent)",
            boxShadow: "0 0 8px #84cc1680, 0 0 20px #84cc1630",
          }}
        />

        {/* Glowing dot */}
        <div
          ref={dotRef}
          className="absolute -left-[3px] w-[7px] h-[7px] rounded-full"
          style={{
            background: "#84cc16",
            boxShadow: "0 0 10px #84cc16, 0 0 20px #84cc1660",
            top: 0,
          }}
        />
      </div>

      {/* Content — padded to clear the beam */}
      <div className="md:pl-20">
        {children}
      </div>
    </div>
  );
}
