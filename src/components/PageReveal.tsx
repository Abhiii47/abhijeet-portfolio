"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * PageReveal
 * Landing.love signature: the entire viewport starts slightly zoomed-in
 * (scale 1.06) and eases out to 1.0 over 1.2s on first load.
 * Wrap your page root with this once.
 */
export default function PageReveal({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // Kill immediately if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      el,
      { scale: 1.055, opacity: 0.92 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.35,
        ease: "power3.out",
        clearProps: "all", // Remove inline style after animation so nothing breaks
      }
    );
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        transformOrigin: "center top",
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
