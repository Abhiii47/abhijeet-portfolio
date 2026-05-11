"use client";

import { useRef, useState, type ReactNode } from "react";

interface CardSpotlightProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function CardSpotlight({
  children,
  className = "",
  spotlightColor = "rgba(132,204,22,0.08)",
}: CardSpotlightProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos]         = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0f0f0f] transition-all duration-300 group ${className}`}
      style={{
        boxShadow: isHover
          ? "0 0 0 1px rgba(132,204,22,0.15), 0 20px 60px rgba(0,0,0,0.5)"
          : "0 1px 1px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.3)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Spotlight radial gradient that follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHover ? 1 : 0,
          background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 50%)`,
        }}
      />

      {/* Subtle top edge highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: isHover
            ? "linear-gradient(90deg, transparent, rgba(132,204,22,0.3), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
          transition: "background 0.3s ease",
        }}
      />

      {children}
    </div>
  );
}
