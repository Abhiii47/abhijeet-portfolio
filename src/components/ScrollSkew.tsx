"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface Props {
  children: React.ReactNode;
  maxSkew?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollSkew({ children, maxSkew = 5, className, style }: Props) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const lastY    = useRef(0);
  const skewVal  = useRef(0);

  useEffect(() => {
    const proxy  = { skewY: 0 };
    const setter = gsap.quickSetter(wrapRef.current, "skewY", "deg");

    const ticker = () => {
      const currentY = window.scrollY;
      const delta    = currentY - lastY.current;
      lastY.current  = currentY;

      // Clamp velocity to maxSkew
      const target = Math.max(-maxSkew, Math.min(maxSkew, delta * 0.08));
      // Lerp toward target
      skewVal.current += (target - skewVal.current) * 0.12;
      setter(skewVal.current);
    };

    gsap.ticker.add(ticker);
    return () => gsap.ticker.remove(ticker);
  }, [maxSkew]);

  return (
    <div ref={wrapRef} className={className} style={{ willChange: "transform", ...style }}>
      {children}
    </div>
  );
}
