"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";

interface Props {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function MagneticButton({ children, strength = 0.35, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) * strength;
    const y = (e.clientY - rect.top  - rect.height / 2) * strength;
    gsap.to(el, { x, y, duration: 0.4, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1,0.4)" });
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: "inline-block", ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
