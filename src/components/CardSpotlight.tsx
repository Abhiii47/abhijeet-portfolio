"use client";

import { useRef } from "react";

interface CardSpotlightProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  spotlightColor?: string;
}

export default function CardSpotlight({ children, className = "", style, spotlightColor = "rgba(132,204,22,0.08)" }: CardSpotlightProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !spotRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotRef.current.style.background = `radial-gradient(300px circle at ${x}px ${y}px, ${spotlightColor}, transparent 70%)`;
  };

  const handleMouseLeave = () => {
    if (spotRef.current) spotRef.current.style.background = "transparent";
  };

  return (
    <div
      ref={cardRef}
      className={`relative rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02] ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight overlay */}
      <div ref={spotRef} className="absolute inset-0 pointer-events-none transition-none z-10" />
      {/* Top shimmer on hover */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {children}
    </div>
  );
}
