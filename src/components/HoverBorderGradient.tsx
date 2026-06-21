"use client";

import React from "react";

interface HoverBorderGradientProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
}

export default function HoverBorderGradient({
  children,
  className = "",
  containerClassName = "",
  style,
}: HoverBorderGradientProps) {
  return (
    <div
      className={`relative p-[1.5px] rounded-[12px] overflow-hidden group/border bg-[var(--ink-border)] ${containerClassName}`}
      style={style}
    >
      {/* Rotating gradient element, visible only on hover */}
      <div
        className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_40%,var(--accent-bright)_50%,transparent_60%)] opacity-0 group-hover/border:opacity-100 transition-opacity duration-300 pointer-events-none z-0 animate-[spin_4s_linear_infinite]"
      />
      
      {/* Inner card content wrapper */}
      <div className={`relative w-full h-full rounded-[10.5px] bg-[var(--bg-card)] z-10 ${className}`}>
        {children}
      </div>
    </div>
  );
}
