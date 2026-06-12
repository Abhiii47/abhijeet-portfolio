"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollZoomProps {
  children: React.ReactNode;
  /**
   * Stagger delay in seconds between siblings when used in a grid.
   * Pass the item's index × 0.06 for a staggered effect.
   */
  delay?: number;
  /**
   * rotateX angle in degrees at the start.
   * Default 10 gives a subtle "cards flying toward you" 3D feel.
   */
  rotateX?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * ScrollZoom — 3D card entrance inspired by landing.love portfolio sites.
 *
 * Cards enter with perspective rotateX (tilted away), then resolve flat
 * as they reach the center of the viewport. Combine with GSAP tilt-on-hover
 * for a fully 3D card experience.
 *
 * Usage:
 *   <ScrollZoom delay={i * 0.06}>
 *     <YourCard />
 *   </ScrollZoom>
 */
export default function ScrollZoom({
  children,
  delay = 0,
  rotateX = 10,
  className = "",
  style,
}: ScrollZoomProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 50,
        rotateX,
        scale: 0.96,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.85,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        clearProps: "transform",
      }
    );
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        willChange: "transform, opacity",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
